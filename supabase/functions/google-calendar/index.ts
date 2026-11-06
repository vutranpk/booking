import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const cors = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info", "Access-Control-Allow-Methods": "GET, POST, OPTIONS" };
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });
const enc = new TextEncoder();
const b64 = (bytes: Uint8Array) => btoa(String.fromCharCode(...bytes));
const unb64 = (text: string) => Uint8Array.from(atob(text), (c) => c.charCodeAt(0));

async function keyFromEnv(name: string) {
  const raw = Deno.env.get(name) || "";
  if (!raw) throw new Error(`${name} is not configured`);
  return crypto.subtle.importKey("raw", unb64(raw), { name: "AES-GCM" }, false, ["encrypt", "decrypt"]);
}
async function seal(value: string) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const cipher = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, await keyFromEnv("GOOGLE_TOKEN_ENCRYPTION_KEY"), enc.encode(value));
  return `${b64(iv)}.${b64(new Uint8Array(cipher))}`;
}
async function unseal(value: string) {
  const [iv, cipher] = value.split(".");
  const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv: unb64(iv) }, await keyFromEnv("GOOGLE_TOKEN_ENCRYPTION_KEY"), unb64(cipher));
  return new TextDecoder().decode(plain);
}
async function sign(payload: string) {
  const secret = Deno.env.get("GOOGLE_OAUTH_STATE_SECRET") || "";
  if (!secret) throw new Error("GOOGLE_OAUTH_STATE_SECRET is not configured");
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return b64(new Uint8Array(await crypto.subtle.sign("HMAC", key, enc.encode(payload))));
}
async function verifyState(state: string) {
  const [payload, signature] = state.split(".");
  if (!payload || !signature || !(await crypto.subtle.verify("HMAC", await crypto.subtle.importKey("raw", enc.encode(Deno.env.get("GOOGLE_OAUTH_STATE_SECRET") || ""), { name: "HMAC", hash: "SHA-256" }, false, ["verify"]), unb64(signature), enc.encode(payload)))) throw new Error("Liên kết OAuth không hợp lệ.");
  const data = JSON.parse(new TextDecoder().decode(unb64(payload)));
  if (!data.uid || !data.tech || data.exp < Date.now()) throw new Error("Liên kết OAuth đã hết hạn.");
  return data;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  const url = Deno.env.get("SUPABASE_URL")!, anonKey = Deno.env.get("SUPABASE_ANON_KEY")!, serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const admin = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const callbackUrl = `${url}/functions/v1/google-calendar`;

  // Google redirects here; signed state binds the callback to the authenticated engineer.
  if (req.method === "GET") {
    const params = new URL(req.url).searchParams;
    const returnTo = Deno.env.get("GOOGLE_OAUTH_RETURN_URL") || "https://vutranpk.github.io/booking/";
    try {
      if (params.get("error")) throw new Error("Bạn đã hủy kết nối Google Calendar.");
      const state = await verifyState(params.get("state") || "");
      const tokenRes = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ code: params.get("code") || "", client_id: Deno.env.get("GOOGLE_CLIENT_ID") || "", client_secret: Deno.env.get("GOOGLE_CLIENT_SECRET") || "", redirect_uri: callbackUrl, grant_type: "authorization_code" }) });
      const token = await tokenRes.json();
      if (!tokenRes.ok || !token.refresh_token) throw new Error("Google không cấp refresh token. Hãy ngắt kết nối ứng dụng cũ rồi thử lại.");
      const infoRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", { headers: { Authorization: `Bearer ${token.access_token}` } });
      const profile = await infoRes.json();
      const { data: authUser } = await admin.auth.admin.getUserById(state.uid);
      if (!authUser?.user?.email || authUser.user.email.toLowerCase() !== state.email.toLowerCase()) throw new Error("Phiên tài khoản không hợp lệ.");
      const { data: tech } = await admin.from("technicians").select("tech_id,email,is_active").eq("tech_id", state.tech).maybeSingle();
      if (!tech?.is_active || !tech.email || tech.email.toLowerCase() !== state.email.toLowerCase()) throw new Error("Tài khoản kỹ sư không còn hợp lệ.");
      const { error } = await admin.from("google_calendar_connections").upsert({ tech_id: tech.tech_id, google_email: profile.email, encrypted_refresh_token: await seal(token.refresh_token), updated_at: new Date().toISOString() });
      if (error) throw error;
      const { data: approved } = await admin.from("bookings").select("booking_id,title,location,notes,booking_date,end_date,start_time,end_time").eq("tech_id", tech.tech_id).eq("status", "APPROVED").gte("end_date", new Date().toISOString().slice(0, 10)).order("booking_date").limit(250);
      for (const booking of approved || []) {
        const { data: existing } = await admin.from("google_calendar_events").select("google_event_id").eq("booking_id", booking.booking_id).maybeSingle();
        const endpoint = existing?.google_event_id ? `https://www.googleapis.com/calendar/v3/calendars/primary/events/${encodeURIComponent(existing.google_event_id)}` : "https://www.googleapis.com/calendar/v3/calendars/primary/events";
        const eventRes = await fetch(endpoint, { method: existing?.google_event_id ? "PATCH" : "POST", headers: { Authorization: `Bearer ${token.access_token}`, "Content-Type": "application/json" }, body: JSON.stringify({ summary: `Ca trực: ${booking.title || "Kỹ sư"}`, description: booking.notes || "Ca trực đã được phê duyệt.", location: booking.location || undefined, start: { dateTime: `${booking.booking_date}T${booking.start_time}`, timeZone: "Asia/Ho_Chi_Minh" }, end: { dateTime: `${booking.end_date || booking.booking_date}T${booking.end_time}`, timeZone: "Asia/Ho_Chi_Minh" } }) });
        const event = await eventRes.json();
        if (eventRes.ok) await admin.from("google_calendar_events").upsert({ booking_id: booking.booking_id, tech_id: tech.tech_id, google_event_id: event.id, updated_at: new Date().toISOString() });
      }
      return Response.redirect(`${returnTo}?calendar=connected`, 302);
    } catch (error) {
      const msg = encodeURIComponent(error instanceof Error ? error.message : "Không thể kết nối Calendar.");
      return Response.redirect(`${returnTo}?calendar_error=${msg}`, 302);
    }
  }

  const authHeader = req.headers.get("Authorization") || "";
  const caller = createClient(url, anonKey, { auth: { persistSession: false }, global: { headers: { Authorization: authHeader } } });
  const { data: { user }, error: authError } = await caller.auth.getUser();
  if (authError || !user?.email) return json({ error: "Cần đăng nhập." }, 401);
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return json({ error: "Dữ liệu không hợp lệ." }, 400); }
  const { data: tech } = await admin.from("technicians").select("tech_id,email,is_active").ilike("email", user.email).maybeSingle();
  if (["connect", "status", "disconnect"].includes(String(body.action)) && !tech?.is_active) return json({ error: "Tài khoản này chưa được gắn với kỹ sư đang hoạt động." }, 403);

  if (body.action === "connect") {
    const payload = b64(enc.encode(JSON.stringify({ uid: user.id, email: user.email.toLowerCase(), tech: tech.tech_id, exp: Date.now() + 10 * 60_000 })));
    const state = `${payload}.${await sign(payload)}`;
    const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    authUrl.search = new URLSearchParams({ client_id: Deno.env.get("GOOGLE_CLIENT_ID") || "", redirect_uri: callbackUrl, response_type: "code", scope: "openid email https://www.googleapis.com/auth/calendar.events", access_type: "offline", prompt: "consent", state }).toString();
    return json({ url: authUrl.toString() });
  }
  if (body.action === "status") {
    const { data } = await admin.from("google_calendar_connections").select("google_email,connected_at").eq("tech_id", tech.tech_id).maybeSingle();
    return json({ connected: !!data, email: data?.google_email || null, connected_at: data?.connected_at || null });
  }
  if (body.action === "disconnect") {
    const { data: connection } = await admin.from("google_calendar_connections").select("encrypted_refresh_token").eq("tech_id", tech.tech_id).maybeSingle();
    if (connection?.encrypted_refresh_token) {
      const refresh = await unseal(connection.encrypted_refresh_token);
      await fetch("https://oauth2.googleapis.com/revoke", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ token: refresh }) });
    }
    const { error } = await admin.from("google_calendar_connections").delete().eq("tech_id", tech.tech_id);
    return error ? json({ error: "Không thể ngắt kết nối." }, 500) : json({ success: true });
  }
  if (body.action === "sync_booking") {
    const id = String(body.booking_id || "");
    const { data: booking } = await admin.from("bookings").select("booking_id,tech_id,title,booking_date,end_date,start_time,end_time,status,location,notes").eq("booking_id", id).maybeSingle();
    const { data: profile } = await admin.from("users").select("role").ilike("email", user.email).maybeSingle();
    if (!booking || ((!tech?.is_active || booking.tech_id !== tech.tech_id) && !["admin", "approver"].includes(profile?.role || ""))) return json({ error: "Không có quyền cập nhật ca này." }, 403);
    const { data: connection } = await admin.from("google_calendar_connections").select("encrypted_refresh_token").eq("tech_id", booking.tech_id).maybeSingle();
    if (!connection) return json({ skipped: true, reason: "Kỹ sư chưa kết nối Google Calendar." });
    const oldEvent = await admin.from("google_calendar_events").select("google_event_id").eq("booking_id", id).maybeSingle();
    const deleting = !["APPROVED"].includes(booking.status);
    const refresh = await unseal(connection.encrypted_refresh_token);
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ client_id: Deno.env.get("GOOGLE_CLIENT_ID") || "", client_secret: Deno.env.get("GOOGLE_CLIENT_SECRET") || "", refresh_token: refresh, grant_type: "refresh_token" }) });
    const token = await tokenRes.json();
    if (!tokenRes.ok) return json({ error: "Phiên Google hết hạn. Hãy kết nối lại." }, 409);
    const access = token.access_token;
    if (deleting) {
      if (oldEvent.data) await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${encodeURIComponent(oldEvent.data.google_event_id)}`, { method: "DELETE", headers: { Authorization: `Bearer ${access}` } });
      await admin.from("google_calendar_events").delete().eq("booking_id", id);
      return json({ success: true, deleted: !!oldEvent.data });
    }
    const start = `${booking.booking_date}T${booking.start_time}`;
    const endDate = booking.end_date || booking.booking_date;
    const end = `${endDate}T${booking.end_time}`;
    const event = { summary: `Ca trực: ${booking.title || "Kỹ sư"}`, description: booking.notes || "Ca trực đã được phê duyệt.", location: booking.location || undefined, start: { dateTime: start, timeZone: "Asia/Ho_Chi_Minh" }, end: { dateTime: end, timeZone: "Asia/Ho_Chi_Minh" } };
    const eventUrl = oldEvent.data ? `https://www.googleapis.com/calendar/v3/calendars/primary/events/${encodeURIComponent(oldEvent.data.google_event_id)}` : "https://www.googleapis.com/calendar/v3/calendars/primary/events";
    const evRes = await fetch(eventUrl, { method: oldEvent.data ? "PATCH" : "POST", headers: { Authorization: `Bearer ${access}`, "Content-Type": "application/json" }, body: JSON.stringify(event) });
    const ev = await evRes.json();
    if (!evRes.ok) return json({ error: "Google Calendar không cập nhật được sự kiện." }, 502);
    await admin.from("google_calendar_events").upsert({ booking_id: id, tech_id: booking.tech_id, google_event_id: ev.id, updated_at: new Date().toISOString() });
    return json({ success: true });
  }
  return json({ error: "Thao tác không hỗ trợ." }, 400);
});
