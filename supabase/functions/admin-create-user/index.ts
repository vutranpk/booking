import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const rolePermissions: Record<string, string[]> = {
  requester: ["view_schedule", "create_booking", "cancel_own_booking"],
  approver: ["view_schedule", "drag_reschedule", "create_booking", "cancel_own_booking", "edit_booking", "view_approval_queue", "approve_booking", "reject_booking", "view_technicians", "manage_technicians"],
  admin: ["view_schedule", "drag_reschedule", "create_booking", "cancel_own_booking", "edit_booking", "view_approval_queue", "approve_booking", "reject_booking", "view_technicians", "manage_technicians", "view_users", "manage_users", "manage_permissions"],
};
const allPermissions = new Set(Object.values(rolePermissions).flat());
function keySet(envName: string): string | undefined {
  try { const keys = JSON.parse(Deno.env.get(envName) || "{}"); return keys.default || Object.values(keys)[0] as string | undefined; }
  catch { return undefined; }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  if (req.method !== "POST") return json({ success: false, error: "Method not allowed" }, 405);

  const url = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY") || keySet("SUPABASE_PUBLISHABLE_KEYS");
  const secretKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || keySet("SUPABASE_SECRET_KEYS");
  if (!url || !anonKey || !secretKey) return json({ success: false, error: "Supabase server keys are not configured." }, 500);

  const authHeader = req.headers.get("Authorization") || "";
  const token = authHeader.replace(/^Bearer\s+/i, "");
  if (!token) return json({ success: false, error: "Authentication required." }, 401);
  const callerClient = createClient(url, anonKey, { auth: { persistSession: false, autoRefreshToken: false }, global: { headers: { Authorization: authHeader } } });
  const admin = createClient(url, secretKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data: { user: caller }, error: authError } = await callerClient.auth.getUser(token);
  if (authError || !caller?.email) return json({ success: false, error: "Invalid session." }, 401);

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return json({ success: false, error: "Invalid JSON body." }, 400); }
  const action = body.action === "delete" ? "delete" : (body.action === "set_password" ? "set_password" : "create");
  const accountType = body.account_type === "technician" ? "technician" : "user";
  const { data: callerProfile } = await admin.from("users").select("role").ilike("email", caller.email.toLowerCase()).maybeSingle();
  if (accountType === "user" && callerProfile?.role !== "admin") return json({ success: false, error: "Chỉ Admin mới có quyền quản lý người dùng." }, 403);
  if (accountType === "technician" && !["admin", "approver"].includes(callerProfile?.role || "")) return json({ success: false, error: "Chỉ Admin hoặc Người vận hành mới có quyền quản lý kỹ sư." }, 403);

  // Helper: find an Auth user by email (paginated up to 1000 per page)
  async function findAuthUserByEmail(targetEmail: string) {
    const normalized = targetEmail.trim().toLowerCase();
    let page = 1;
    while (page <= 10) {
      const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 1000 });
      if (error || !data?.users?.length) break;
      const found = data.users.find((u) => (u.email || "").toLowerCase() === normalized);
      if (found) return found;
      if (data.users.length < 1000) break;
      page++;
    }
    return null;
  }

  // ==========================================
  // ACTION: SET / RESET PASSWORD OR PROVISION MISSING AUTH ACCOUNT
  // ==========================================
  if (action === "set_password") {
    const targetEmail = String(body.email || "").trim().toLowerCase();
    const newPassword = String(body.password || "").trim();
    const fullName = String(body.full_name || body.name || "").trim();
    if (!targetEmail || newPassword.length < 6) {
      return json({ success: false, error: "Email và mật khẩu (tối thiểu 6 ký tự) là bắt buộc." }, 400);
    }
    const existingAuth = await findAuthUserByEmail(targetEmail);
    if (existingAuth?.id) {
      const { error: updateErr } = await admin.auth.admin.updateUserById(existingAuth.id, {
        password: newPassword,
        email_confirm: true,
        user_metadata: fullName ? { ...(existingAuth.user_metadata || {}), full_name: fullName } : existingAuth.user_metadata,
      });
      if (updateErr) return json({ success: false, error: updateErr.message }, 400);
      return json({ success: true, action: "set_password", created: false, email: targetEmail });
    } else {
      const { data: createdAuth, error: createErr } = await admin.auth.admin.createUser({
        email: targetEmail,
        password: newPassword,
        email_confirm: true,
        user_metadata: { full_name: fullName || targetEmail.split("@")[0] },
      });
      if (createErr || !createdAuth?.user) {
        return json({ success: false, error: createErr?.message || "Không thể khởi tạo tài khoản Auth." }, 400);
      }
      return json({ success: true, action: "set_password", created: true, email: targetEmail });
    }
  }

  // ==========================================
  // ACTION: DELETE ACCOUNT (PROFILE + AUTH)
  // ==========================================
  if (action === "delete") {
    let targetEmail = String(body.email || "").trim().toLowerCase();

    if (accountType === "technician") {
      const techId = String(body.tech_id || "").trim();
      if (!techId && !targetEmail) {
        return json({ success: false, error: "Thiếu mã kỹ sư (tech_id) hoặc email cần xóa." }, 400);
      }
      const query = admin.from("technicians").select("tech_id, email");
      const { data: techRow, error: techFetchErr } = techId
        ? await query.eq("tech_id", techId).maybeSingle()
        : await query.ilike("email", targetEmail).maybeSingle();
      if (techFetchErr) return json({ success: false, error: techFetchErr.message }, 500);
      if (!techRow && !targetEmail) {
        return json({ success: false, error: "Không tìm thấy hồ sơ kỹ sư cần xóa." }, 404);
      }
      if (techRow?.email) targetEmail = String(techRow.email).trim().toLowerCase();
      if (targetEmail && targetEmail === caller.email.toLowerCase()) {
        return json({ success: false, error: "Không thể xóa tài khoản đang đăng nhập." }, 400);
      }
      if (techRow?.tech_id) {
        const { error: delTechErr } = await admin.from("technicians").delete().eq("tech_id", techRow.tech_id);
        if (delTechErr) return json({ success: false, error: delTechErr.message }, 400);
      }
    } else {
      if (!targetEmail) return json({ success: false, error: "Thiếu địa chỉ email người dùng cần xóa." }, 400);
      if (targetEmail === caller.email.toLowerCase()) {
        return json({ success: false, error: "Không thể xóa tài khoản đang đăng nhập." }, 400);
      }
      const { error: delUserErr } = await admin.from("users").delete().ilike("email", targetEmail);
      if (delUserErr) return json({ success: false, error: delUserErr.message }, 400);
    }

    let authDeleted = false;
    if (targetEmail) {
      const authUser = await findAuthUserByEmail(targetEmail);
      if (authUser?.id) {
        const { error: authDelErr } = await admin.auth.admin.deleteUser(authUser.id);
        if (authDelErr) {
          return json({ success: false, error: `Đã xóa hồ sơ nhưng không thể xóa tài khoản Auth: ${authDelErr.message}` }, 500);
        }
        authDeleted = true;
      }
    }

    return json({ success: true, action: "delete", account_type: accountType, email: targetEmail, authDeleted });
  }

  // ==========================================
  // ACTION: CREATE ACCOUNT + AUTH PROVISIONING
  // ==========================================
  const email = String(body.email || "").trim().toLowerCase();
  const name = String(body.full_name || body.name || "").trim();
  const rawPassword = String(body.password || "").trim();
  // Ensure ASCII-only valid email format so Supabase Auth never rejects with "Unable to validate email address"
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) || !name) {
    return json({ success: false, error: "Email không đúng định dạng chuẩn (không chứa dấu tiếng Việt hoặc khoảng trắng) hoặc thiếu Họ tên." }, 400);
  }
  if (rawPassword && rawPassword.length < 6) {
    return json({ success: false, error: "Mật khẩu khởi tạo phải có tối thiểu 6 ký tự (hoặc để trống để gửi email mời)." }, 400);
  }

  // 1. Cross-table & Auth uniqueness check BEFORE inserting any profile row
  const [{ data: existingUser, error: userCheckErr }, { data: existingTechByEmail, error: techEmailCheckErr }] = await Promise.all([
    admin.from("users").select("email").ilike("email", email).maybeSingle(),
    admin.from("technicians").select("tech_id, email").ilike("email", email).maybeSingle(),
  ]);
  if (userCheckErr || techEmailCheckErr) {
    return json({ success: false, error: "Không thể kiểm tra dữ liệu trùng lặp trên hệ thống." }, 500);
  }
  if (existingUser) {
    return json({ success: false, error: "Email này đã tồn tại trong danh sách Người dùng (public.users)." }, 409);
  }
  if (existingTechByEmail) {
    return json({ success: false, error: `Email này đã được gán cho Kỹ sư (${existingTechByEmail.tech_id}).` }, 409);
  }
  const existingAuthUser = await findAuthUserByEmail(email);
  if (existingAuthUser) {
    return json({ success: false, error: "Email này đã tồn tại trong Supabase Authentication. Hãy xóa tài khoản cũ trước khi tạo lại." }, 409);
  }

  let profile: Record<string, unknown>;
  let cleanup: () => Promise<unknown>;
  if (accountType === "technician") {
    const techId = String(body.tech_id || "").trim();
    if (!techId) return json({ success: false, error: "Thiếu mã kỹ sư (tech_id)." }, 400);
    const { data: existingById, error: idError } = await admin.from("technicians").select("tech_id").eq("tech_id", techId).maybeSingle();
    if (idError) return json({ success: false, error: "Không thể kiểm tra mã kỹ sư." }, 500);
    if (existingById) return json({ success: false, error: `Mã kỹ sư ${techId} đã tồn tại.` }, 409);
    profile = {
      tech_id: techId, name, email,
      phone: String(body.phone || "").trim(),
      skills: Array.isArray(body.skills) ? body.skills.map(String) : [],
      avatar: String(body.avatar || "").trim(),
      is_active: body.is_active !== false,
    };
    const { error: insertError } = await admin.from("technicians").insert(profile);
    if (insertError) return json({ success: false, error: insertError.message }, 400);
    cleanup = async () => admin.from("technicians").delete().eq("tech_id", techId);
  } else {
    const role = String(body.role || "requester");
    if (!rolePermissions[role]) return json({ success: false, error: "Vai trò không hợp lệ." }, 400);
    const requested = Array.isArray(body.permissions) ? body.permissions.map(String) : [];
    const permissions = requested.length ? [...new Set(requested.filter((permission) => allPermissions.has(permission)))] : rolePermissions[role];
    profile = {
      email, full_name: name, role,
      department: String(body.department || "Phòng Ban Chung").trim(),
      phone: String(body.phone || "").trim(),
      referrer_email: String(body.referrer_email || "").trim().toLowerCase(),
      avatar: String(body.avatar || "").trim(), permissions,
    };
    const { error: insertError } = await admin.from("users").insert(profile);
    if (insertError) return json({ success: false, error: insertError.message }, 400);
    cleanup = async () => admin.from("users").delete().eq("email", email);
  }

  // Helper: trigger the PostgreSQL sync trigger so auth.users.phone & raw_user_meta_data are 100% synced
  async function syncProfileToAuth() {
    if (accountType === "technician") {
      await admin.from("technicians").update({ name, phone: String(body.phone || "").trim() }).eq("tech_id", String(profile.tech_id));
    } else {
      await admin.from("users").update({ full_name: name, phone: String(body.phone || "").trim(), updated_at: new Date().toISOString() }).eq("email", email);
    }
  }

  const userMetadata = {
    full_name: name,
    name,
    display_name: name,
    phone: String(body.phone || "").trim(),
    role: accountType === "technician" ? "technician" : String(body.role || "requester"),
    department: accountType === "technician" ? String(body.tech_id || "") : String(body.department || ""),
    account_type: accountType,
  };

  // 2. Create the account in Supabase Authentication
  // Case A: Admin provided an initial password -> create confirmed Auth user directly (no email rate-limit dependency)
  if (rawPassword) {
    const { data: createdAuth, error: createErr } = await admin.auth.admin.createUser({
      email,
      password: rawPassword,
      email_confirm: true,
      user_metadata: userMetadata,
    });
    if (createErr || !createdAuth?.user) {
      await cleanup();
      return json({ success: false, error: createErr?.message || "Không thể tạo tài khoản trong Supabase Authentication." }, 400);
    }
    await syncProfileToAuth();
    return json({
      success: true,
      account_type: accountType,
      profile,
      authCreated: true,
      invitationSent: false,
      passwordSet: true,
    });
  }

  // Case B: No password provided. The user sets one from the invitation email.
  const redirectTo = String(body.redirect_to || Deno.env.get("APP_INVITE_REDIRECT_URL") || "");
  const options = redirectTo ? { redirectTo, data: userMetadata } : { data: userMetadata };
  const { data: invitation, error: inviteError } = await admin.auth.admin.inviteUserByEmail(email, options);

  if (inviteError || !invitation?.user) {
    const errMsg = (inviteError?.message || "").toLowerCase();
    const isRateLimit = errMsg.includes("rate limit") || errMsg.includes("over_email_send_rate_limit") || (inviteError as { status?: number })?.status === 429;
    await cleanup();
    return json({ success: false, error: isRateLimit ? "Supabase đang giới hạn email mời. Chờ rồi thử lại." : (inviteError?.message || "Không thể gửi email mời đăng nhập.") }, isRateLimit ? 429 : 400);
  }

  await syncProfileToAuth();
  return json({ success: true, account_type: accountType, profile, authCreated: true, invitationSent: true });
});
