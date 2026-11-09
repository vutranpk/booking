// Booking Module Data Store (Aligned with Google Sheets Tab Schemas)
const BookingData = {
  // Granular System Permissions
  ALL_PERMISSIONS: [
    { key: 'view_schedule', label: 'Xem lịch kỹ sư', group: 'Lịch & Timeline', desc: 'Xem bảng lịch ca trực' },
    { key: 'drag_reschedule', label: 'Kéo thả dời lịch', group: 'Lịch & Timeline', desc: 'Kéo thả đổi ngày trực tiếp trên lịch' },
    { key: 'create_booking', label: 'Đặt lịch mới', group: 'Đặt Lịch', desc: 'Gửi yêu cầu ca trực mới' },
    { key: 'cancel_own_booking', label: 'Hủy đơn của mình', group: 'Đặt Lịch', desc: 'Chủ động hủy yêu cầu do mình tạo' },
    { key: 'edit_booking', label: 'Chỉnh sửa ca trực', group: 'Đặt Lịch', desc: 'Sửa ngày hoặc nội dung ca trực' },
    { key: 'view_approval_queue', label: 'Xem danh sách duyệt', group: 'Phê Duyệt', desc: 'Xem danh sách ca chờ duyệt' },
    { key: 'approve_booking', label: 'Phê duyệt ca trực', group: 'Phê Duyệt', desc: 'Chấp thuận đơn booking' },
    { key: 'reject_booking', label: 'Từ chối ca trực', group: 'Phê Duyệt', desc: 'Từ chối đơn kèm lý do' },
    { key: 'view_technicians', label: 'Xem danh sách kỹ sư', group: 'Quản Lý Kỹ Sư', desc: 'Xem hồ sơ kỹ sư' },
    { key: 'manage_technicians', label: 'Thêm & Sửa kỹ sư', group: 'Quản Lý Kỹ Sư', desc: 'Thêm mới, sửa thông tin, bật/tắt kỹ sư' },
    { key: 'view_users', label: 'Xem danh sách người dùng', group: 'Quản Trị Người Dùng', desc: 'Xem danh sách tài khoản thành viên' },
    { key: 'manage_users', label: 'Thêm & Sửa người dùng', group: 'Quản Trị Người Dùng', desc: 'Thêm mới hoặc sửa thông tin user' },
    { key: 'manage_permissions', label: 'Phân quyền chi tiết', group: 'Quản Trị Người Dùng', desc: 'Tùy biến checkbox ma trận quyền' },
    { key: 'debug_role_switcher', label: 'Debug phân quyền vai trò', group: 'Quản Trị Người Dùng', desc: 'Bật bong bóng chuyển đổi nhanh các vai trò để kiểm thử phân quyền giao diện' }
  ],

  // 3-Tier Default Role Permissions Presets + Technician
  ROLE_PERMISSIONS: {
    technician: ['view_schedule'],
    requester: ['view_schedule', 'create_booking', 'cancel_own_booking'],
    approver: [
      'view_schedule', 'drag_reschedule', 'create_booking', 'cancel_own_booking',
      'edit_booking', 'view_approval_queue', 'approve_booking', 'reject_booking',
      'view_technicians', 'manage_technicians'
    ],
    admin: [
      'view_schedule', 'drag_reschedule', 'create_booking', 'cancel_own_booking',
      'edit_booking', 'view_approval_queue', 'approve_booking', 'reject_booking',
      'view_technicians', 'manage_technicians', 'view_users', 'manage_users', 'manage_permissions',
      'debug_role_switcher'
    ]
  },

  // Default System Password
  DEFAULT_PASSWORD: '',

  syncGoogleCalendarBooking(bookingId) {
    const client = window.SupabaseConfig?.getClient();
    if (!client) return;
    client.functions.invoke('google-calendar', { body: { action: 'sync_booking', booking_id: bookingId } })
      .then(({ error, data }) => { if (error || data?.error) console.warn('Google Calendar sync warning:', error || data.error); })
      .catch((error) => console.warn('Google Calendar sync warning:', error));
  },

  // Original authenticated admin email while using the local role preview.
  originalAdminEmail: null,

  // Admin identity is loaded from the authenticated Supabase profile.
  isSuperAdmin() {
    return this.currentUser?.auth_role === 'admin';
  },

  // Only users who have been granted debug_role_switcher capability can open the role switcher preview.
  canAccessDebugRoleSwitcher() {
    if (!this.currentUser) return false;
    // When in role test mode, check original session capability so tester can switch back
    if (this.currentUser.test_mode && this.originalUserSession) {
      if (Array.isArray(this.originalUserSession.permissions)) {
        return this.originalUserSession.permissions.includes('debug_role_switcher');
      }
      return this.originalUserSession.role === 'admin';
    }
    // Strictly respect granular permission setting (whether admin or any user)
    return this.hasPermission('debug_role_switcher');
  },

  // Check if current user has a specific granular capability
  hasPermission(permKey, targetUser = this.currentUser) {
    if (!targetUser) return false;
    // 1. If explicit permissions are configured for this user, enforce them 100% strictly
    // This ensures any checkbox toggled in "Người Dùng & Phân Quyền" matches reality immediately!
    if (Array.isArray(targetUser.permissions)) {
      return targetUser.permissions.includes(permKey);
    }
    // 2. Otherwise fall back to the preset permissions for their current role
    const perms = this.ROLE_PERMISSIONS[targetUser.role] || [];
    return perms.includes(permKey);
  },

  // Current Active User (null when not logged in; strictly restored from session or Google login)
  currentUser: null,
  passwordRecoverySession: false,

  // Clean user display name (strip any residual '(Super Admin)' tag)
  cleanUserName(name) {
    if (!name) return 'User';
    return name.replace(/\s*\((?:super\s*)?admin\)/gi, '').trim();
  },

  // User profiles are loaded from Supabase; never seed identities in the browser.
  users: [],

  // Technicians (Synchronized live from Supabase PostgreSQL table 'technicians')
  technicians: [],

  // Initial Bookings (Synchronized live from Supabase PostgreSQL table 'bookings')
  bookings: [],

  // System Notifications with Dynamic Real-World Scoping
  notifications: [],

  // Load notifications from local storage if available, or dynamically generate from actual bookings
  initNotificationsData() {
    try {
      const stored = localStorage.getItem('kcoffee_notifications_v4');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.notifications = parsed;
          return;
        }
      }
    } catch (e) {
      console.warn('Failed to load notifications from storage:', e);
    }

    // Generate authentic notifications dynamically from existing real bookings
    this.notifications = this.generateLiveNotificationsFromBookings();
    this.saveNotificationsData();
  },

  generateLiveNotificationsFromBookings() {
    const list = [];
    const bookings = this.bookings || [];

    bookings.forEach((b, idx) => {
      const tech = this.technicians.find(t => t.tech_id === b.tech_id);
      const techName = tech ? tech.name : b.tech_id;

      if (b.status === 'PENDING') {
        list.push({
          id: `notif-pending-${b.booking_id}`,
          type: 'new_request',
          title: 'Yêu cầu booking ca trực cần duyệt',
          message: `${b.requester_name || 'Quản lý dự án'} yêu cầu điều phối Kỹ sư ${techName} cho "${b.title}" (${b.booking_date}).`,
          time: 'Gần đây',
          read: false,
          tab: 'approval',
          booking_id: b.booking_id,
          tech_id: b.tech_id,
          required_perm: 'approve_booking',
          target_roles: ['admin', 'approver']
        });
      } else if (b.status === 'APPROVED') {
        list.push({
          id: `notif-approved-${b.booking_id}`,
          type: 'approval_success',
          title: 'Ca trực đã được phê duyệt',
          message: `Ca trực "${b.title}" của Kỹ sư ${techName} (${b.booking_date}) đã được duyệt thành công.`,
          time: 'Hôm nay',
          read: idx > 0,
          tab: 'my-bookings',
          booking_id: b.booking_id,
          tech_id: b.tech_id,
          target_user: b.requester_email,
          target_roles: ['admin', 'approver', 'requester', 'technician']
        });
      }
    });

    return list;
  },

  saveNotificationsData() {
    try {
      localStorage.setItem('kcoffee_notifications_v4', JSON.stringify(this.notifications));
    } catch (e) {
      console.warn('Failed to save notifications to storage:', e);
    }
  },

  getUserReadNotificationIds(userEmail) {
    if (!userEmail) return [];
    try {
      const stored = localStorage.getItem(`k_notif_read_${userEmail.toLowerCase()}`);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  },

  getNotifications(filter = 'all', user = this.currentUser) {
    if (!user) return [];

    const userEmail = (user.email || '').toLowerCase();
    const userRole = user.role || 'requester';
    const isTechnician = userRole === 'technician' || Boolean(user.is_technician);
    const isSuper = this.isSuperAdmin ? this.isSuperAdmin() : (userRole === 'admin');

    // Contextual Permission Filtering for Notifications
    const userNotifs = this.notifications.filter(n => {
      // 0. Exclusive scoping for Technician: ONLY see notifications for their own assigned shifts (tech_id)
      if (isTechnician) {
        if (!user.tech_id) return false;
        if (n.tech_id && n.tech_id === user.tech_id) return true;
        if (n.booking_id) {
          const b = this.bookings.find(item => item.booking_id === n.booking_id);
          return Boolean(b && b.tech_id === user.tech_id);
        }
        return false;
      }

      // 1. Direct recipient check
      if (n.target_user) {
        if (n.target_user.toLowerCase() === userEmail) return true;
        // If targeted to a specific user and not shared with roles/perms, hide from others
        if (!n.target_roles && !n.required_perm) return false;
      }

      // 2. Explicit permission requirement check
      if (n.required_perm) {
        if (isSuper) return true;
        return this.hasPermission(n.required_perm, user);
      }

      // 3. Role-based scoping check
      if (Array.isArray(n.target_roles)) {
        if (n.target_roles.includes('all')) return true;
        if (n.target_roles.includes(userRole)) return true;
        if (isSuper && n.target_roles.includes('admin')) return true;
        return false;
      }

      // 4. Booking creator relationship check
      if (n.booking_id) {
        const b = this.bookings.find(item => item.booking_id === n.booking_id);
        if (b) {
          const bReqEmail = ((b.requester_email || b.created_by || '').toLowerCase().trim());
          if (bReqEmail === userEmail) return true;
        }
        if (n.type === 'new_request') {
          return isSuper || this.hasPermission('approve_booking', user) || this.hasPermission('view_approval_queue', user);
        }
        if (n.type === 'conflict_alert') {
          return isSuper || this.hasPermission('manage_technicians', user);
        }
      }

      // 5. Default fallback: Admins and Approvers receive operational items, Requesters only receive their own/all
      return isSuper || userRole === 'approver';
    });

    // Check user-specific read status
    const readIds = this.getUserReadNotificationIds(userEmail);
    const formatted = userNotifs.map(n => {
      const isRead = Boolean(n.read) || readIds.includes(n.id);
      return {
        ...n,
        read: isRead
      };
    });

    if (filter === 'unread') {
      return formatted.filter(n => !n.read);
    }
    return formatted;
  },

  getUnreadNotificationsCount(user = this.currentUser) {
    return this.getNotifications('unread', user).length;
  },

  markAllNotificationsRead() {
    if (!this.currentUser) return;
    const userEmail = (this.currentUser.email || '').toLowerCase();
    const visibleNotifs = this.getNotifications('all', this.currentUser);
    const readIds = this.getUserReadNotificationIds(userEmail);

    visibleNotifs.forEach(n => {
      if (!readIds.includes(n.id)) readIds.push(n.id);
      if (n.target_user && n.target_user.toLowerCase() === userEmail) {
        const original = this.notifications.find(item => item.id === n.id);
        if (original) original.read = true;
      }
    });

    try {
      localStorage.setItem(`k_notif_read_${userEmail}`, JSON.stringify(readIds));
    } catch (e) {
      console.warn('Failed to save read notifs:', e);
    }
    this.saveNotificationsData();
  },

  markNotificationRead(id) {
    if (!this.currentUser) return;
    const userEmail = (this.currentUser.email || '').toLowerCase();
    const readIds = this.getUserReadNotificationIds(userEmail);

    if (!readIds.includes(id)) {
      readIds.push(id);
      try {
        localStorage.setItem(`k_notif_read_${userEmail}`, JSON.stringify(readIds));
      } catch (e) {
        console.warn('Failed to save read notif:', e);
      }
    }

    const notif = this.notifications.find(n => n.id === id);
    if (notif && notif.target_user && notif.target_user.toLowerCase() === userEmail) {
      notif.read = true;
    }
    this.saveNotificationsData();
  },

  deleteNotification(id) {
    if (!id) return;
    const idx = this.notifications.findIndex(n => n.id === id);
    if (idx !== -1) {
      this.notifications.splice(idx, 1);
      this.saveNotificationsData();
    }
  },

  clearAllNotifications() {
    if (!this.currentUser) return;
    const userEmail = (this.currentUser.email || '').toLowerCase();
    const visibleIds = new Set(this.getNotifications('all', this.currentUser).map(n => n.id));
    this.notifications = this.notifications.filter(n => !visibleIds.has(n.id));
    this.saveNotificationsData();
  },

  addNotification(notif) {
    const newNotif = {
      id: 'notif-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      time: 'Vừa xong',
      read: false,
      ...notif
    };
    this.notifications.unshift(newNotif);
    this.saveNotificationsData();
    return newNotif;
  },

  // Helper to format Date to YYYY-MM-DD
  formatDateStr(d) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },

  // Helper to get Date offset from today
  getDateOffset(offsetDays = 0) {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return this.formatDateStr(d);
  },

  init() {
    // Never trust cached profiles or roles as authentication.
    localStorage.removeItem('kcoffee_users_data_v3');
    this.users = [];

    // Initialize Session (Strict: Only authorized users can be logged in)
    this.initSession();

    // Discard legacy local snapshots; cloud tables are authoritative.
    localStorage.removeItem('kcoffee_technicians_data_v3');
    localStorage.removeItem('kcoffee_bookings_data_28days_v7');
    this.technicians = [];
    this.bookings = [];

    // Initialize Email & Google Calendar Notification Settings
    this.initEmailSettings();

    // Synchronize live with Supabase Cloud Database (Zero mock data)
    this.syncWithSupabase();
  },

  supabaseRealtimeChannel: null,

  updateCloudStatus(isLive, message = '') {
    const el = document.getElementById('cloud-sync-status');
    const dot = document.getElementById('cloud-sync-dot');
    const text = document.getElementById('cloud-sync-text');
    if (!el || !dot || !text) return;

    if (isLive) {
      el.className = 'hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/90 text-[10px] font-bold shadow-2xs transition-all cursor-default select-none';
      dot.className = 'w-2 h-2 rounded-full bg-emerald-500 animate-pulse';
      text.textContent = 'Supabase Cloud Live';
      el.title = 'Đã kết nối và đồng bộ trực tiếp với Supabase Cloud Database (Realtime Sync Live)';
    } else {
      el.className = 'hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200/90 text-[10px] font-bold shadow-2xs transition-all cursor-default select-none';
      dot.className = 'w-2 h-2 rounded-full bg-amber-500';
      text.textContent = 'Chế độ Cục bộ (Offline)';
      el.title = message || 'Đang dùng dữ liệu cục bộ (Chưa kết nối Cloud)';
    }
  },

  _initialSyncCompleted: false,

  async syncWithSupabase(options = {}) {
    const client = window.SupabaseConfig ? window.SupabaseConfig.getClient() : null;
    if (!client) {
      this.updateCloudStatus(false, 'Chưa tải được Supabase SDK');
      return;
    }

    const shouldShowLoader = (!this._initialSyncCompleted && !options.silent && !window.location.pathname.endsWith('login.html')) || options.showLoader;
    if (shouldShowLoader && window.SystemLoader) {
      window.SystemLoader.show();
    }

    try {
      // 1. Fetch Technicians from Supabase Cloud (deduplicated by tech_id)
      const { data: remoteTechs, error: techError } = await client.from('technicians').select('tech_id,name,email,skills,phone,avatar,is_active,created_at').order('tech_id', { ascending: true });
      if (!techError && Array.isArray(remoteTechs)) {
        const uniqueTechMap = new Map();
        remoteTechs.forEach(t => {
          if (t && t.tech_id) uniqueTechMap.set(t.tech_id, t);
        });
        this.technicians = Array.from(uniqueTechMap.values());
        this.saveTechnicians();

        // Refresh currentUser context if logged-in user is a Technician
        if (this.currentUser && (this.currentUser.role === 'technician' || this.currentUser.is_technician)) {
          const matchedTech = this.technicians.find(t =>
            (this.currentUser.tech_id && t.tech_id === this.currentUser.tech_id) ||
            (t.email && t.email.toLowerCase() === (this.currentUser.email || '').toLowerCase())
          );
          if (matchedTech) {
            this.currentUser.tech_id = matchedTech.tech_id;
            this.currentUser.full_name = this.cleanUserName(matchedTech.name || this.currentUser.full_name);
            this.currentUser.avatar = matchedTech.avatar || this.currentUser.avatar || '';
            this.currentUser.phone = matchedTech.phone || this.currentUser.phone || '';
            this.currentUser.skills = matchedTech.skills || [];
            this.persistSession(this.currentUser);
            if (window.App && typeof App.updateUserBadge === 'function') {
              App.updateUserBadge();
            }
            if (window.BookingUI && typeof BookingUI.applyRolePermissions === 'function') {
              BookingUI.applyRolePermissions();
            }
          }
        }
      }

      // 2. Fetch Users from Supabase Cloud
      const { data: remoteUsers, error: userError } = await client.from('users').select('*');
      if (!userError && Array.isArray(remoteUsers) && remoteUsers.length > 0) {
        remoteUsers.forEach(ru => {
          const idx = this.users.findIndex(u => u.email.toLowerCase() === ru.email.toLowerCase());
          if (idx !== -1) {
            const localUser = this.users[idx];
            const localAvatar = localUser.avatar;
            const localAvatarTimestamp = localUser.avatar_updated_at || 0;
            const remoteTimestamp = ru.updated_at ? new Date(ru.updated_at).getTime() : 0;

            // Preserve local avatar if it has been updated locally and is newer than remote, or if remote is empty
            let finalAvatar = ru.avatar;
            if (localAvatar && (localAvatarTimestamp >= remoteTimestamp || !ru.avatar)) {
              finalAvatar = localAvatar;
            } else if (!finalAvatar) {
              finalAvatar = localAvatar || '';
            }

            // CRITICAL: Preserve local referrer_email if remote doesn't have it or is null/empty
            const finalReferrer = (ru.referrer_email !== undefined && ru.referrer_email !== null && ru.referrer_email !== '')
              ? ru.referrer_email
              : (localUser.referrer_email || '');

            let finalPerms = ru.permissions;
            if (typeof finalPerms === 'string') {
              try { finalPerms = JSON.parse(finalPerms); } catch (e) { finalPerms = finalPerms.split(',').map(s => s.trim()); }
            }
            if (!Array.isArray(finalPerms)) {
              finalPerms = localUser.permissions || this.ROLE_PERMISSIONS[ru.role || localUser.role] || [];
            }

            this.users[idx] = {
              ...this.users[idx],
              ...ru,
              full_name: this.cleanUserName(ru.full_name || localUser.full_name),
              referrer_email: finalReferrer,
              permissions: finalPerms,
              avatar: finalAvatar,
              avatar_updated_at: localAvatarTimestamp
            };
          } else {
            let addPerms = ru.permissions;
            if (typeof addPerms === 'string') {
              try { addPerms = JSON.parse(addPerms); } catch (e) { addPerms = addPerms.split(',').map(s => s.trim()); }
            }
            if (!Array.isArray(addPerms)) {
              addPerms = this.ROLE_PERMISSIONS[ru.role] || [];
            }
            this.users.push({
              ...ru,
              full_name: this.cleanUserName(ru.full_name),
              referrer_email: ru.referrer_email || '',
              permissions: addPerms
            });
          }
        });
        this.saveUsers();

        // Refresh currentUser context if matched
        if (this.currentUser) {
          const matched = this.users.find(u => u.email.toLowerCase() === this.currentUser.email.toLowerCase());
          if (matched && !this.currentUser.test_mode) {
            if (matched.full_name) this.currentUser.full_name = this.cleanUserName(matched.full_name);
            if (matched.avatar) this.currentUser.avatar = matched.avatar;
            if (matched.phone) this.currentUser.phone = matched.phone;
            if (matched.department) this.currentUser.department = matched.department;
            if (matched.referrer_email !== undefined) this.currentUser.referrer_email = matched.referrer_email;
            if (matched.role) {
              this.currentUser.role = matched.role;
              this.currentUser.auth_role = matched.role;
              this.currentUser.role_label = this.getRoleLabel(matched.role);
            }
            if (Array.isArray(matched.permissions)) {
              this.currentUser.permissions = [...matched.permissions];
            } else if (matched.role && this.ROLE_PERMISSIONS[matched.role]) {
              this.currentUser.permissions = [...this.ROLE_PERMISSIONS[matched.role]];
            }
            this.persistSession(this.currentUser);
            if (window.App && typeof App.updateUserBadge === 'function') {
              App.updateUserBadge();
            }
            if (window.BookingUI && typeof BookingUI.applyRolePermissions === 'function') {
              BookingUI.applyRolePermissions();
            }
          }
        }
      }

      // 3. Fetch Bookings from Supabase Cloud
      const { data: remoteBookings, error: bkError } = await client.from('bookings').select('*').order('created_at', { ascending: false });
      if (!bkError && Array.isArray(remoteBookings)) {
        this.bookings = remoteBookings.map(b => {
          const reqEmail = (b.requester_email || b.created_by || '').trim().toLowerCase();
          const userObj = this.users.find(u => (u.email || '').toLowerCase() === reqEmail);
          const reqName = userObj ? this.cleanUserName(userObj.full_name) : this.cleanUserName(b.requester_name || reqEmail || 'Người dùng');
          return {
            ...b,
            booking_date: b.booking_date || b.date,
            end_date: b.end_date || b.booking_date || b.date,
            tech_id: b.tech_id || b.technician_id,
            booking_id: b.booking_id || b.id,
            requester_email: reqEmail,
            requester_name: reqName
          };
        });
        this.save();
        if (window.BookingUI) {
          if (typeof BookingUI.render === 'function') BookingUI.render();
          if (typeof BookingUI.renderUsers === 'function') BookingUI.renderUsers();
          if (typeof BookingUI.renderTechnicians === 'function') BookingUI.renderTechnicians();
        }
        if (window.App && typeof App.updateStats === 'function') {
          App.updateStats();
        }
      }

      // 4. Setup Realtime Listener for All Core Tables (Bookings, Technicians, Users)
      if (!this.supabaseRealtimeChannel) {
        this.supabaseRealtimeChannel = client
          .channel('public:system_changes')
          .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, (payload) => {
            console.log('⚡ Realtime sync [bookings]:', payload);
            this.syncWithSupabase({ silent: true });
          })
          .on('postgres_changes', { event: '*', schema: 'public', table: 'technicians' }, (payload) => {
            console.log('⚡ Realtime sync [technicians]:', payload);
            this.syncWithSupabase({ silent: true });
          })
          .on('postgres_changes', { event: '*', schema: 'public', table: 'users' }, (payload) => {
            console.log('⚡ Realtime sync [users]:', payload);
            this.syncWithSupabase({ silent: true });
          })
          .subscribe();
      }

      this._initialSyncCompleted = true;
      this.updateCloudStatus(true);
      console.log('✅ Supabase Cloud connected & synced successfully (' + (remoteBookings?.length || 0) + ' bookings).');
    } catch (err) {
      console.warn('Supabase sync warning:', err);
      this.updateCloudStatus(false, err?.message);
    } finally {
      if (shouldShowLoader && window.SystemLoader) {
        window.SystemLoader.hide();
      }
    }
  },

  save() {
    localStorage.removeItem('kcoffee_bookings_data_28days_v7');
  },

  checkConflict(tech_id, start_date, end_date = null, exclude_booking_id = null) {
    const sDate = start_date;
    const eDate = end_date || start_date;

    if (eDate < sDate) {
      return {
        hasConflict: true,
        message: 'Ngày kết thúc không thể trước ngày bắt đầu!'
      };
    }

    const techBookings = this.bookings.filter(b =>
      b.tech_id === tech_id &&
      (b.status === 'APPROVED' || b.status === 'PENDING') &&
      b.booking_id !== exclude_booking_id
    );

    for (const b of techBookings) {
      const bStart = b.booking_date;
      const bEnd = b.end_date || b.booking_date;

      // Overlap: sDate <= bEnd && eDate >= bStart
      if (sDate <= bEnd && eDate >= bStart) {
        const tech = this.technicians.find(t => t.tech_id === tech_id);
        const statusLabel = b.status === 'APPROVED' ? 'Đã duyệt' : 'Đang chờ duyệt';
        const dateRangeText = bStart === bEnd ? bStart : `${bStart} đến ${bEnd}`;
        return {
          hasConflict: true,
          conflictingBooking: b,
          message: `Kỹ sư ${tech ? tech.name : tech_id} đã có lịch [${dateRangeText}] (${statusLabel}) cho nhiệm vụ "${b.title}". Vui lòng chọn kỹ sư khác hoặc đổi ngày!`
        };
      }
    }

    return { hasConflict: false };
  },

  createBooking(data) {
    if (!this.isAuthenticated()) return { success: false, error: 'Vui lòng đăng nhập để đặt lịch.' };
    if (!this.hasPermission('create_booking')) return { success: false, error: 'Tài khoản kỹ sư chỉ được xem ca trực được phân công, không có quyền đặt lịch.' };
    const startDate = data.booking_date;
    const endDate = data.end_date || data.booking_date;

    const todayStr = this.formatDateStr(new Date());
    if (startDate < todayStr) {
      return { success: false, error: 'Không thể đặt lịch cho ngày trong quá khứ! Vui lòng chọn từ hôm nay trở đi.' };
    }

    const conflict = this.checkConflict(data.tech_id, startDate, endDate);
    if (conflict.hasConflict) {
      return { success: false, error: conflict.message };
    }

    const newBooking = {
      booking_id: `BK-${Date.now().toString().slice(-6)}`,
      tech_id: data.tech_id,
      requester_email: this.currentUser.email,
      requester_name: this.cleanUserName(this.currentUser.full_name),
      title: data.title,
      location: data.location,
      booking_date: startDate,
      end_date: endDate,
      status: 'PENDING',
      approver_email: '',
      reject_reason: '',
      notes: data.notes || '',
      created_at: new Date().toISOString()
    };

    this.bookings.unshift(newBooking);
    this.save();

    // Live Notification for approvers & admins
    this.addNotification({
      type: 'new_request',
      title: 'Yêu cầu booking ca trực mới',
      message: `${newBooking.requester_name} đã gửi yêu cầu: "${newBooking.title}" (${newBooking.booking_date}).`,
      tab: 'approval',
      booking_id: newBooking.booking_id,
      tech_id: newBooking.tech_id,
      required_perm: 'approve_booking',
      target_roles: ['admin', 'approver']
    });

    // Push to Supabase with SystemLoader action lock
    const client = window.SupabaseConfig ? window.SupabaseConfig.getClient() : null;
    if (client) {
      const insertPromise = client.from('bookings').insert([newBooking]).then(({ error }) => {
        if (error) console.warn('Supabase insert booking warning:', error);
      });
      if (window.SystemLoader) {
        window.SystemLoader.track(insertPromise, 'Đang lưu yêu cầu đặt lịch…', 'Đang ghi dữ liệu ca trực lên máy chủ Supabase');
      }
    }

    return { success: true, booking: newBooking };
  },

  approveBooking(booking_id, approver_email) {
    approver_email = approver_email || this.currentUser?.email || '';
    const booking = this.bookings.find(b => b.booking_id === booking_id);
    if (!booking) return { success: false, error: 'Không tìm thấy booking!' };

    booking.status = 'APPROVED';
    booking.approver_email = approver_email;
    booking.reject_reason = '';
    this.save();

    const tech = this.technicians.find(t => t.tech_id === booking.tech_id);
    const techName = tech ? tech.name : booking.tech_id;

    // Live Notification for requester & assigned technician
    this.addNotification({
      type: 'approval_success',
      title: 'Ca trực đã được phê duyệt',
      message: `Ca trực "${booking.title}" của Kỹ sư ${techName} (${booking.booking_date}) đã được duyệt thành công.`,
      tab: 'my-bookings',
      booking_id: booking.booking_id,
      tech_id: booking.tech_id,
      target_user: booking.requester_email,
      target_roles: ['admin', 'approver', 'requester', 'technician']
    });

    const client = window.SupabaseConfig ? window.SupabaseConfig.getClient() : null;
    if (client) {
      const approvePromise = client.from('bookings').update({ status: 'APPROVED', approver_email, reject_reason: '' }).eq('booking_id', booking_id).then(({ error }) => {
        if (error) console.warn('Supabase approve warning:', error); else this.syncGoogleCalendarBooking(booking_id);
      });
      if (window.SystemLoader) {
        window.SystemLoader.track(approvePromise, 'Đang phê duyệt ca trực…', 'Đang khóa khung giờ và đồng bộ lịch máy chủ');
      }
    }

    return { success: true, booking };
  },

  rejectBooking(booking_id, reason, approver_email) {
    approver_email = approver_email || this.currentUser?.email || '';
    const booking = this.bookings.find(b => b.booking_id === booking_id);
    if (!booking) return { success: false, error: 'Không tìm thấy booking!' };
    if (!reason || !reason.trim()) return { success: false, error: 'Vui lòng nhập lý do từ chối!' };

    booking.status = 'REJECTED';
    booking.approver_email = approver_email;
    booking.reject_reason = reason.trim();
    this.save();

    // Live Notification for requester
    this.addNotification({
      type: 'approval_result',
      title: 'Yêu cầu booking bị từ chối',
      message: `Đơn "${booking.title}" đã bị từ chối. Lý do: ${reason.trim()}`,
      tab: 'my-bookings',
      booking_id: booking.booking_id,
      tech_id: booking.tech_id,
      target_user: booking.requester_email,
      target_roles: ['admin', 'approver', 'requester']
    });

    const client = window.SupabaseConfig ? window.SupabaseConfig.getClient() : null;
    if (client) {
      const rejectPromise = client.from('bookings').update({ status: 'REJECTED', approver_email, reject_reason: reason.trim() }).eq('booking_id', booking_id).then(({ error }) => {
        if (error) console.warn('Supabase reject warning:', error); else this.syncGoogleCalendarBooking(booking_id);
      });
      if (window.SystemLoader) {
        window.SystemLoader.track(rejectPromise, 'Đang cập nhật từ chối…', 'Đang ghi trạng thái và giải phóng khung giờ trên máy chủ');
      }
    }

    return { success: true, booking };
  },

  cancelBooking(booking_id) {
    const booking = this.bookings.find(b => b.booking_id === booking_id);
    if (!booking) return { success: false, error: 'Không tìm thấy booking!' };

    booking.status = 'CANCELLED';
    this.save();

    // Live Notification for approvers & admins
    this.addNotification({
      type: 'shift_reminder',
      title: 'Yêu cầu booking đã được hủy',
      message: `Ca trực "${booking.title}" (${booking.booking_date}) đã được hủy bởi người yêu cầu.`,
      tab: 'timeline',
      booking_id: booking.booking_id,
      tech_id: booking.tech_id,
      target_roles: ['admin', 'approver']
    });

    const client = window.SupabaseConfig ? window.SupabaseConfig.getClient() : null;
    if (client) {
      const cancelPromise = client.rpc('cancel_my_booking', { p_booking_id: booking_id }).then(({ data, error }) => {
        if (error || !data) console.warn('Supabase cancel rejected:', error || 'Booking is not owned by the authenticated user or is no longer cancellable.'); else this.syncGoogleCalendarBooking(booking_id);
      });
      if (window.SystemLoader) {
        window.SystemLoader.track(cancelPromise, 'Đang hủy yêu cầu đặt lịch…', 'Đang cập nhật trạng thái hủy trên máy chủ');
      }
    }

    return { success: true, booking };
  },

  rescheduleBooking(booking_id, new_start_date) {
    if (!this.hasPermission('drag_reschedule')) {
      return { success: false, error: 'Bạn không có quyền kéo thả điều chỉnh ngày trực!' };
    }

    const booking = this.bookings.find(b => b.booking_id === booking_id);
    if (!booking) return { success: false, error: 'Không tìm thấy booking!' };

    if (booking.status === 'CANCELLED' || booking.status === 'REJECTED') {
      return { success: false, error: 'Không thể kéo thả ca đã hủy hoặc đã từ chối!' };
    }

    // 🛡️ CHẶN DỜI LỊCH VÀO QUÁ KHỨ
    const todayStr = this.formatDateStr(new Date());
    if (new_start_date < todayStr) {
      return { success: false, error: 'Không thể dời ca trực vào ngày trong quá khứ! Vui lòng chọn từ hôm nay trở đi.' };
    }

    // Calculate duration in days safely without UTC offset issues
    const [oy, om, od] = booking.booking_date.split('-').map(Number);
    const oldStart = new Date(oy, om - 1, od);
    const endDateStr = booking.end_date || booking.booking_date;
    const [ey, em, ed] = endDateStr.split('-').map(Number);
    const oldEnd = new Date(ey, em - 1, ed);
    const durationDays = Math.max(0, Math.round((oldEnd - oldStart) / (1000 * 60 * 60 * 24)));

    const [ny, nm, nd] = new_start_date.split('-').map(Number);
    const newStart = new Date(ny, nm - 1, nd);
    const newEnd = new Date(ny, nm - 1, nd + durationDays);

    const newStartDateStr = this.formatDateStr(newStart);
    const newEndDateStr = this.formatDateStr(newEnd);

    // If dates didn't change, no-op
    if (newStartDateStr === booking.booking_date && newEndDateStr === (booking.end_date || booking.booking_date)) {
      return { success: false, isSameDate: true };
    }

    // Check conflict excluding this booking
    const conflict = this.checkConflict(booking.tech_id, newStartDateStr, newEndDateStr, booking_id);
    if (conflict.hasConflict) {
      return { success: false, error: conflict.message };
    }

    // Update booking
    booking.booking_date = newStartDateStr;
    booking.end_date = newEndDateStr;
    this.save();

    const tech = this.technicians.find(t => t.tech_id === booking.tech_id);
    const techName = tech ? tech.name : booking.tech_id;
    const dateRangeLabel = durationDays > 0 ? `${newStartDateStr} → ${newEndDateStr}` : newStartDateStr;

    // Live Notification for requester & assigned technician
    if (booking.requester_email || booking.tech_id) {
      this.addNotification({
        type: 'shift_reminder',
        title: 'Lịch ca trực đã được dời ngày',
        message: `Ca trực "${booking.title}" của Kỹ sư ${techName} đã được dời sang ngày ${dateRangeLabel}.`,
        tab: 'my-bookings',
        booking_id: booking.booking_id,
        tech_id: booking.tech_id,
        target_user: booking.requester_email
      });
    }

    const client = window.SupabaseConfig ? window.SupabaseConfig.getClient() : null;
    if (client) {
      const reschedulePromise = client.from('bookings').update({ booking_date: newStartDateStr, end_date: newEndDateStr }).eq('booking_id', booking_id).then(({ error }) => {
        if (error) console.warn('Supabase reschedule warning:', error); else this.syncGoogleCalendarBooking(booking_id);
      });
      if (window.SystemLoader) {
        window.SystemLoader.track(reschedulePromise, 'Đang cập nhật lịch trực…', 'Đang lưu thay đổi ngày trực lên máy chủ');
      }
    }

    return {
      success: true,
      booking,
      newStartDateStr,
      newEndDateStr,
      durationDays
    };
  },

  switchRole(role) {
    if (!this.canAccessDebugRoleSwitcher()) return;

    if (!this.originalUserSession) {
      this.originalUserSession = {
        role: this.currentUser.role,
        auth_role: this.currentUser.auth_role,
        permissions: Array.isArray(this.currentUser.permissions) ? [...this.currentUser.permissions] : (this.ROLE_PERMISSIONS[this.currentUser.role] || []),
        full_name: this.currentUser.full_name,
        email: this.currentUser.email,
        avatar: this.currentUser.avatar,
        avatar_text: this.currentUser.avatar_text
      };
    }

    const isRoot = this.currentUser.auth_role === 'admin' || !!this.originalAdminEmail;
    const effectiveRole = ['admin', 'approver', 'requester'].includes(role) ? role : 'admin';
    const isTestMode = effectiveRole !== (this.originalUserSession?.role || 'admin');

    if (isRoot && !this.originalAdminEmail) {
      this.originalAdminEmail = this.currentUser.email;
    }

    const baseEmail = this.originalUserSession?.email || this.currentUser.email;
    const baseUser = this.users.find(u => (u.email || '').toLowerCase() === baseEmail.toLowerCase());
    const baseName = this.cleanUserName(baseUser?.full_name || this.currentUser.full_name);
    const baseAvatar = baseUser?.avatar || this.currentUser.avatar || '';
    const baseInitials = baseUser?.avatar_text || this.currentUser.avatar_text || baseName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

    // Default permissions for target role
    let nextPerms = this.ROLE_PERMISSIONS[effectiveRole] ? [...this.ROLE_PERMISSIONS[effectiveRole]] : [...this.ROLE_PERMISSIONS.admin];
    // If switching back to original role and had custom permissions, restore them
    if (this.originalUserSession && effectiveRole === this.originalUserSession.role && Array.isArray(this.originalUserSession.permissions)) {
      nextPerms = [...this.originalUserSession.permissions];
    }

    this.currentTestRole = effectiveRole;
    this.currentUser = {
      ...this.currentUser,
      email: baseEmail,
      full_name: baseName,
      avatar: baseAvatar,
      avatar_text: baseInitials,
      role: effectiveRole,
      test_mode: isTestMode,
      role_label: this.getRoleLabel(effectiveRole),
      permissions: nextPerms
    };

    // Note: Do NOT mutate this.users so the permanent user directory record
    // remains authentic and never flips between roles when testing.
    this.persistSession(this.currentUser);
  },

  getRoleLabel(role) {
    switch (role) {
      case 'admin': return 'Admin cấp cao';
      case 'approver': return 'Người vận hành';
      case 'requester': return 'User PM';
      case 'technician': return 'Kỹ Sư Hiện Trường';
      default: return 'Người dùng';
    }
  },

  ROLE_LABELS: {
    admin: 'Admin cấp cao',
    approver: 'Người vận hành',
    requester: 'User PM',
    technician: 'Kỹ Sư Hiện Trường'
  },

  ROLE_BADGES: {
    admin: 'bg-amber-50 text-amber-800 border border-amber-300',
    approver: 'bg-brand-50 text-brand-700 border border-brand-200',
    requester: 'bg-slate-100 text-slate-700 border border-slate-200',
    technician: 'bg-accent-50 text-accent-800 border border-accent-300'
  },

  // ==========================================
  // REFERRER & PROFILE MANAGEMENT HELPERS
  // ==========================================
  getReferrer(userOrEmail) {
    if (!userOrEmail) return null;
    const refEmail = typeof userOrEmail === 'string' ? userOrEmail : userOrEmail.referrer_email;
    if (!refEmail) return null;
    return this.users.find(u => u.email.toLowerCase() === refEmail.toLowerCase()) || null;
  },

  getReferrersSummary() {
    const list = [];
    this.users.forEach(u => {
      const children = this.users.filter(x => x.referrer_email && x.referrer_email.toLowerCase() === u.email.toLowerCase());
      if (children.length > 0 || u.role === 'admin') {
        list.push({
          referrer: u,
          count: children.length,
          children
        });
      }
    });
    return list;
  },

  async updateUserProfile(email, profileData) {
    const cleanEmail = (email || '').trim().toLowerCase();
    let user = this.users.find(u => u.email.toLowerCase() === cleanEmail);
    const isCurrentTech = !user && this.currentUser && (this.currentUser.email || '').toLowerCase() === cleanEmail && (this.currentUser.role === 'technician' || this.currentUser.is_technician);

    if (!user && !isCurrentTech) return { success: false, error: 'Không tìm thấy người dùng' };
    if (!user && isCurrentTech) {
      user = this.currentUser;
    }

    // Email changes must be performed through Supabase Auth and a server-side profile operation.
    if (profileData.new_email && profileData.new_email.trim().toLowerCase() !== cleanEmail) {
      return { success: false, error: 'Đổi email qua Supabase Auth để đồng bộ danh tính.' };
    }

    // 1. Personal info
    if (profileData.full_name) user.full_name = profileData.full_name.trim();
    if (profileData.phone !== undefined) user.phone = profileData.phone.trim();
    if (profileData.department && !isCurrentTech) user.department = profileData.department.trim();
    if (profileData.avatar !== undefined) {
      user.avatar = profileData.avatar.trim();
      user.avatar_updated_at = Date.now(); // Record update timestamp so sync won't revert
    }

    if (isCurrentTech) {
      const techIdx = this.technicians.findIndex(t => t.tech_id === user.tech_id || (t.email && t.email.toLowerCase() === cleanEmail));
      if (techIdx !== -1) {
        if (profileData.full_name) this.technicians[techIdx].name = profileData.full_name.trim();
        if (profileData.phone !== undefined) this.technicians[techIdx].phone = profileData.phone.trim();
        if (profileData.avatar !== undefined) this.technicians[techIdx].avatar = profileData.avatar.trim();
      }
    }

    // 2. ONLY Admin Cấp Cao can modify user's email or referrer_email!
    const isCallerAdmin = this.isSuperAdmin();
    if (isCallerAdmin && !isCurrentTech) {
      if (profileData.new_email && profileData.new_email.toLowerCase() !== cleanEmail) {
        const newEmailClean = profileData.new_email.trim().toLowerCase();
        if (this.users.some(u => u.email.toLowerCase() === newEmailClean && u.email.toLowerCase() !== cleanEmail)) {
          return { success: false, error: 'Địa chỉ email mới đã tồn tại trên hệ thống!' };
        }
        user.email = newEmailClean;
      }
      if (profileData.referrer_email !== undefined) {
        user.referrer_email = profileData.referrer_email.trim().toLowerCase();
      }
    }

    // Password changes are re-authenticated and handled by Supabase Auth only.
    if (profileData.new_password) {
      if (!this.isAuthenticated() || this.currentUser.email.toLowerCase() !== cleanEmail) {
        return { success: false, error: 'Chỉ có thể đổi mật khẩu cho tài khoản đang đăng nhập.' };
      }
      const authClient = window.SupabaseConfig ? window.SupabaseConfig.getClient() : null;
      if (!authClient?.auth) return { success: false, error: 'Dịch vụ xác thực hiện không khả dụng.' };
      if (!this.passwordRecoverySession) {
        const { error: reauthError } = await authClient.auth.signInWithPassword({
          email: cleanEmail,
          password: (profileData.old_password || '').trim()
        });
        if (reauthError) return { success: false, error: 'Mật khẩu hiện tại không chính xác.' };
      }
      const { error: passwordError } = await authClient.auth.updateUser({ password: profileData.new_password.trim() });
      if (passwordError) return { success: false, error: passwordError.message || 'Không thể đổi mật khẩu.' };
      this.passwordRecoverySession = false;
    }

    this.saveUsers();

    // If updating currently logged in user, refresh context
    if (this.currentUser && (this.currentUser.email.toLowerCase() === cleanEmail || this.currentUser.email.toLowerCase() === user.email.toLowerCase())) {
      const initials = (user.full_name || 'U').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
      this.currentUser = {
        ...this.currentUser,
        email: user.email,
        full_name: user.full_name,
        department: user.department,
        phone: user.phone,
        avatar: user.avatar,
        avatar_text: initials,
        avatar_updated_at: user.avatar_updated_at,
        referrer_email: user.referrer_email
      };
      this.persistSession(this.currentUser);
    }

    // Remote cloud update to Supabase public.users / public.technicians
    const client = window.SupabaseConfig ? window.SupabaseConfig.getClient() : null;
    if (client) {
      try {
        const { error } = await client.rpc('update_my_profile', {
          p_full_name: user.full_name,
          p_phone: user.phone,
          p_department: user.department,
          p_avatar: user.avatar
        });

        if (error) {
          console.warn('Supabase profile update warning:', error);
        } else {
          console.log('☁️ Synced updated user profile to Supabase');
        }
      } catch (err) {
        console.warn('Supabase profile update error:', err);
      }
    }

    return { success: true, user };
  },

  // ==========================================
  // TECHNICIAN MANAGEMENT (CRUD)
  // ==========================================
  saveTechnicians() {
    localStorage.removeItem('kcoffee_technicians_data_v3');
  },

  getResetRedirectUrl() {
    if (
      typeof window === 'undefined' ||
      window.location.protocol === 'file:' ||
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1'
    ) {
      return 'https://vutranpk.github.io/booking/reset-password.html';
    }
    return new URL('reset-password.html', window.location.href).href;
  },

  async addTechnician(tech) {
    let nextNum = this.technicians.length + 1;
    let techId = `TECH-${String(nextNum).padStart(3, '0')}`;
    while (this.technicians.some(t => t.tech_id === techId)) {
      nextNum++;
      techId = `TECH-${String(nextNum).padStart(3, '0')}`;
    }
    const email = (tech.email || '').trim().toLowerCase();
    if (!email) return { success: false, error: 'Email kỹ sư là bắt buộc để gửi lời mời đăng nhập.' };
    if (this.technicians.some(t => (t.email || '').toLowerCase() === email)) {
      return { success: false, error: 'Email này đã tồn tại trong danh sách kỹ sư!' };
    }
    if (this.users.some(u => (u.email || '').toLowerCase() === email)) {
      return { success: false, error: 'Email này đã được sử dụng cho tài khoản người dùng!' };
    }
    const skills = Array.isArray(tech.skills) ? tech.skills : String(tech.skills || '').split(',').map(s => s.trim()).filter(Boolean);
    const client = window.SupabaseConfig ? window.SupabaseConfig.getClient() : null;
    if (!client?.functions) return { success: false, error: 'Không kết nối được Supabase Functions.' };
    try {
      const { data, error } = await client.functions.invoke('admin-create-user', {
        body: {
          action: 'create',
          account_type: 'technician', tech_id: techId, name: (tech.name || '').trim(), email,
          phone: (tech.phone || '').trim(), skills, avatar: (tech.avatar || '').trim(),
          password: (tech.password || '').trim(),
          is_active: tech.is_active !== undefined ? Boolean(tech.is_active) : true,
          redirect_to: this.getResetRedirectUrl()
        }
      });
      if (error) {
        let message = data?.error || error.message || 'Không thể tạo tài khoản kỹ sư.';
        try {
          const response = error.context instanceof Response ? error.context : null;
          const details = response ? await response.json() : null;
          message = details?.error || message;
        } catch (readError) {}
        return { success: false, error: message };
      }
      if (!data?.success || !data.profile) return { success: false, error: data?.error || 'Supabase không tạo được tài khoản kỹ sư.' };
      // Prevent duplicate entry if Realtime sync already inserted this tech_id while awaiting Edge Function
      const existingIdx = this.technicians.findIndex(t => t.tech_id === data.profile.tech_id || (t.email && t.email.toLowerCase() === email));
      if (existingIdx !== -1) {
        this.technicians[existingIdx] = { ...this.technicians[existingIdx], ...data.profile };
      } else {
        this.technicians.push(data.profile);
      }
      this.saveTechnicians();
      return {
        success: true,
        technician: data.profile,
        invitationSent: Boolean(data.invitationSent),
        passwordSet: Boolean(data.passwordSet),
      };
    } catch (error) {
      return { success: false, error: error?.message || 'Không thể gửi lời mời Supabase Auth.' };
    }
  },

  async updateTechnician(tech_id, updatedData) {
    const idx = this.technicians.findIndex(t => t.tech_id === tech_id);
    if (idx === -1) return { success: false, error: 'Không tìm thấy hồ sơ kỹ sư.' };

    const normalized = { ...updatedData };
    const newPassword = (normalized.password || '').trim();
    delete normalized.password;

    if (normalized.skills !== undefined && typeof normalized.skills === 'string') {
      normalized.skills = normalized.skills.split(',').map(s => s.trim()).filter(Boolean);
    }
    if (normalized.email !== undefined) {
      normalized.email = normalized.email.trim().toLowerCase();
      if (normalized.email) {
        const dupTech = this.technicians.find((t, i) => i !== idx && (t.email || '').toLowerCase() === normalized.email);
        if (dupTech) return { success: false, error: `Email này đã thuộc về kỹ sư ${dupTech.name} (${dupTech.tech_id}).` };
        const dupUser = this.users.find(u => (u.email || '').toLowerCase() === normalized.email);
        if (dupUser) return { success: false, error: 'Email này đã được sử dụng cho tài khoản người dùng.' };
      }
    }

    const client = window.SupabaseConfig ? window.SupabaseConfig.getClient() : null;
    if (!client) {
      return { success: false, error: 'Không có kết nối Supabase.' };
    }

    const allowed = ['name', 'email', 'phone', 'skills', 'avatar', 'is_active'];
    const dbPayload = {};
    allowed.forEach(k => {
      if (normalized[k] !== undefined) dbPayload[k] = normalized[k];
    });

    try {
      const { error } = await client.from('technicians').update(dbPayload).eq('tech_id', tech_id);
      if (error) {
        console.error('❌ Supabase update technician error:', error);
        return { success: false, error: error.message || 'Database từ chối cập nhật kỹ sư.' };
      }

      if (newPassword) {
        if (newPassword.length < 6) {
          return { success: false, error: 'Mật khẩu mới phải có tối thiểu 6 ký tự.' };
        }
        const targetEmail = normalized.email || this.technicians[idx].email;
        const { data: pwData, error: pwErr } = await client.functions.invoke('admin-create-user', {
          body: {
            action: 'set_password',
            account_type: 'technician',
            email: targetEmail,
            password: newPassword,
            name: normalized.name || this.technicians[idx].name
          }
        });
        if (pwErr || !pwData?.success) {
          return { success: false, error: pwData?.error || pwErr?.message || 'Không thể cập nhật mật khẩu kỹ sư.' };
        }
      }
    } catch (err) {
      return { success: false, error: err?.message || 'Không thể đồng bộ dữ liệu kỹ sư lên Supabase.' };
    }

    this.technicians[idx] = { ...this.technicians[idx], ...normalized };
    this.saveTechnicians();
    return { success: true, technician: this.technicians[idx], passwordUpdated: Boolean(newPassword) };
  },

  async toggleTechnicianStatus(tech_id) {
    const tech = this.technicians.find(t => t.tech_id === tech_id);
    if (!tech) return { success: false, error: 'Không tìm thấy hồ sơ kỹ sư.' };
    return await this.updateTechnician(tech_id, { is_active: !tech.is_active });
  },

  async deleteTechnician(tech_id) {
    const idx = this.technicians.findIndex(t => t.tech_id === tech_id);
    if (idx === -1) return { success: false, error: 'Không tìm thấy kỹ sư cần xóa.' };
    const tech = this.technicians[idx];

    const client = window.SupabaseConfig ? window.SupabaseConfig.getClient() : null;
    if (!client?.functions) {
      return { success: false, error: 'Không kết nối được Supabase Functions để xóa tài khoản.' };
    }

    try {
      const { data, error } = await client.functions.invoke('admin-create-user', {
        body: {
          action: 'delete',
          account_type: 'technician',
          tech_id,
          email: (tech.email || '').trim().toLowerCase()
        }
      });
      if (error) {
        let message = data?.error || error.message || 'Không thể xóa kỹ sư.';
        try {
          const response = error.context instanceof Response ? error.context : null;
          const details = response ? await response.json() : null;
          message = details?.error || message;
        } catch (readError) {}
        return { success: false, error: message };
      }
      if (!data?.success) {
        return { success: false, error: data?.error || 'Supabase không thể xóa kỹ sư.' };
      }
    } catch (err) {
      return { success: false, error: err?.message || 'Lỗi kết nối khi xóa tài khoản kỹ sư.' };
    }

    const removedIdx = this.technicians.findIndex(t => t.tech_id === tech_id);
    if (removedIdx !== -1) this.technicians.splice(removedIdx, 1);
    this.saveTechnicians();
    return { success: true };
  },

  // ==========================================
  // USER & GRANULAR RBAC MANAGEMENT (CRUD)
  // ==========================================
  saveUsers() {
    this.users = this.users.map(({ password, ...profile }) => profile);
    localStorage.removeItem('kcoffee_users_data_v3');
  },

  async addUser(userData) {
    const email = (userData.email || '').trim().toLowerCase();
    if (!email) return { success: false, error: 'Email là bắt buộc' };
    if (this.users.some(u => (u.email || '').toLowerCase() === email)) {
      return { success: false, error: 'Email này đã tồn tại trong danh sách người dùng!' };
    }
    if (this.technicians.some(t => (t.email || '').toLowerCase() === email)) {
      return { success: false, error: 'Email này đã được gán cho tài khoản kỹ sư!' };
    }

    const client = window.SupabaseConfig ? window.SupabaseConfig.getClient() : null;
    if (!client?.functions) return { success: false, error: 'Không kết nối được Supabase Functions.' };

    try {
      const { data, error } = await client.functions.invoke('admin-create-user', {
        body: {
          action: 'create',
          account_type: 'user',
          email,
          full_name: (userData.full_name || '').trim(),
          role: userData.role || 'requester',
          department: (userData.department || '').trim(),
          phone: (userData.phone || '').trim(),
          referrer_email: (userData.referrer_email || '').trim().toLowerCase(),
          avatar: (userData.avatar || '').trim(),
          password: (userData.password || '').trim(),
          redirect_to: this.getResetRedirectUrl(),
          permissions: Array.isArray(userData.permissions) ? userData.permissions : []
        }
      });
      if (error) {
        let message = data?.error || error.message || 'Không thể tạo tài khoản.';
        try {
          const response = error.context instanceof Response ? error.context : null;
          const details = response ? await response.json() : null;
          message = details?.error || message;
        } catch (readError) {}
        return { success: false, error: message };
      }
      if (!data?.success || !data.profile) return { success: false, error: data?.error || 'Supabase không tạo được tài khoản.' };

      const existingIdx = this.users.findIndex(u => (u.email || '').toLowerCase() === email);
      if (existingIdx !== -1) {
        this.users[existingIdx] = { ...this.users[existingIdx], ...data.profile };
      } else {
        this.users.push(data.profile);
      }
      this.saveUsers();
      return {
        success: true,
        user: data.profile,
        invitationSent: Boolean(data.invitationSent),
        passwordSet: Boolean(data.passwordSet),
      };
    } catch (error) {
      return { success: false, error: error?.message || 'Không thể gửi lời mời Supabase Auth.' };
    }
  },

  async updateUser(email, updatedData) {
    const cleanEmail = (email || '').trim().toLowerCase();
    const user = this.users.find(u => u.email.toLowerCase() === cleanEmail);
    if (!user) return { success: false, error: 'Không tìm thấy người dùng' };

    const client = window.SupabaseConfig ? window.SupabaseConfig.getClient() : null;
    if (!client) return { success: false, error: 'Không có kết nối Supabase.' };

    // Never persist passwords in user profile records.
    const nextData = { ...updatedData };
    const newPassword = (nextData.password || '').trim();
    delete nextData.password;
    delete nextData.new_email;

    const nextRole = nextData.role || user.role || 'requester';
    const nextPerms = Array.isArray(nextData.permissions)
      ? [...new Set(nextData.permissions)]
      : (Array.isArray(user.permissions) ? user.permissions : (this.ROLE_PERMISSIONS[nextRole] || []));

    const payload = {
      full_name: (nextData.full_name !== undefined ? nextData.full_name : user.full_name || '').trim(),
      role: nextRole,
      department: (nextData.department !== undefined ? nextData.department : user.department || '').trim(),
      phone: (nextData.phone !== undefined ? nextData.phone : user.phone || '').trim(),
      avatar: (nextData.avatar !== undefined ? nextData.avatar : user.avatar || '').trim(),
      referrer_email: (nextData.referrer_email !== undefined ? nextData.referrer_email : user.referrer_email || '').trim().toLowerCase(),
      permissions: nextPerms,
      updated_at: new Date().toISOString()
    };

    try {
      let { error } = await client.from('users').update(payload).eq('email', cleanEmail);
      if (error && error.message && error.message.includes('referrer_email')) {
        const fallbackPayload = { ...payload };
        delete fallbackPayload.referrer_email;
        const retry = await client.from('users').update(fallbackPayload).eq('email', cleanEmail);
        error = retry.error;
      }
      if (error) {
        return { success: false, error: error.message || 'Không thể lưu thay đổi lên Supabase.' };
      }

      if (newPassword) {
        if (newPassword.length < 6) {
          return { success: false, error: 'Mật khẩu mới phải có tối thiểu 6 ký tự.' };
        }
        const { data: pwData, error: pwErr } = await client.functions.invoke('admin-create-user', {
          body: {
            action: 'set_password',
            account_type: 'user',
            email: cleanEmail,
            password: newPassword,
            full_name: payload.full_name
          }
        });
        if (pwErr || !pwData?.success) {
          return { success: false, error: pwData?.error || pwErr?.message || 'Không thể cập nhật mật khẩu trên Supabase Auth.' };
        }
      }
    } catch (err) {
      return { success: false, error: err?.message || 'Lỗi kết nối khi lưu thông tin người dùng.' };
    }

    Object.assign(user, {
      full_name: payload.full_name,
      role: payload.role,
      department: payload.department,
      phone: payload.phone,
      avatar: payload.avatar,
      referrer_email: payload.referrer_email,
      permissions: payload.permissions,
      updated_at: payload.updated_at
    });
    this.saveUsers();

    // If active user is updated, refresh active user context
    if (this.currentUser && this.currentUser.email.toLowerCase() === cleanEmail) {
      this.currentUser = {
        ...this.currentUser,
        full_name: this.cleanUserName(user.full_name),
        role: user.role,
        role_label: this.getRoleLabel(user.role),
        department: user.department,
        phone: user.phone,
        avatar: user.avatar,
        referrer_email: user.referrer_email,
        permissions: user.permissions || this.ROLE_PERMISSIONS[user.role]
      };
      this.persistSession(this.currentUser);
    }

    return { success: true, user };
  },

  async deleteUser(email) {
    const cleanEmail = (email || '').trim().toLowerCase();
    if (this.currentUser?.email?.toLowerCase() === cleanEmail) {
      return { success: false, error: 'Không thể xóa tài khoản đang đăng nhập.' };
    }

    const idx = this.users.findIndex(u => u.email.toLowerCase() === cleanEmail);
    if (idx === -1) return { success: false, error: 'Không tìm thấy người dùng' };

    const client = window.SupabaseConfig ? window.SupabaseConfig.getClient() : null;
    if (!client?.functions) {
      return { success: false, error: 'Không kết nối được Supabase Functions để xóa tài khoản.' };
    }

    try {
      const { data, error } = await client.functions.invoke('admin-create-user', {
        body: {
          action: 'delete',
          account_type: 'user',
          email: cleanEmail
        }
      });
      if (error) {
        let message = data?.error || error.message || 'Không thể xóa tài khoản người dùng.';
        try {
          const response = error.context instanceof Response ? error.context : null;
          const details = response ? await response.json() : null;
          message = details?.error || message;
        } catch (readError) {}
        return { success: false, error: message };
      }
      if (!data?.success) {
        return { success: false, error: data?.error || 'Supabase không thể xóa người dùng.' };
      }
    } catch (err) {
      return { success: false, error: err?.message || 'Lỗi kết nối khi xóa tài khoản người dùng.' };
    }

    const removedIdx = this.users.findIndex(u => u.email.toLowerCase() === cleanEmail);
    if (removedIdx !== -1) this.users.splice(removedIdx, 1);
    this.saveUsers();

    return { success: true };
  },

  initSession() {
    // Authentication is restored only from the Supabase Auth session at app startup.
    this.currentUser = null;
    this.originalAdminEmail = null;
    localStorage.removeItem('k_workspace_session');
    localStorage.removeItem('kcoffee_current_role');
    localStorage.removeItem('kcoffee_current_email');
  },

  persistSession(user) {
    if (!user) return;
    try {
      const sessionData = {
        tech_id: user.tech_id || null,
        is_technician: !!user.is_technician,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
        role_label: user.role_label || this.getRoleLabel(user.role),
        avatar: user.avatar || '',
        avatar_text: user.avatar_text || '',
        phone: user.phone || '',
        department: user.department || '',
        referrer_email: user.referrer_email || '',
        permissions: Array.isArray(user.permissions) ? user.permissions : (this.ROLE_PERMISSIONS[user.role] || []),
        originalAdminEmail: this.originalAdminEmail || (user.auth_role === 'admin' ? user.email : null),
        test_mode: !!user.test_mode,
        timestamp: Date.now()
      };
      localStorage.setItem('k_workspace_session', JSON.stringify(sessionData));
      localStorage.setItem('kcoffee_current_role', user.role);
      localStorage.setItem('kcoffee_current_email', user.email);
      localStorage.removeItem('k_workspace_logged_out');
    } catch (e) {
      console.warn('persistSession error:', e);
    }
  },

  async logout() {
    this.currentUser = null;
    this.originalAdminEmail = null;
    try {
      localStorage.setItem('k_workspace_logged_out', 'true');
      localStorage.removeItem('k_workspace_session');
      localStorage.removeItem('kcoffee_current_email');
      localStorage.removeItem('kcoffee_current_role');
      // Clear Supabase client tokens from localStorage
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('sb-') && key.endsWith('-auth-token')) {
          localStorage.removeItem(key);
        }
      });
    } catch (e) {}

    const client = window.SupabaseConfig ? window.SupabaseConfig.getClient() : null;
    if (client && client.auth) {
      try {
        await client.auth.signOut();
      } catch (_) {}
    }
  },

  isAuthenticated() {
    return !!this.currentUser?.auth_verified && !!this.currentUser.email;
  },

  DEFAULT_PASSWORD: '',

  async establishAuthenticatedUser(authUser) {
    const email = (authUser?.email || '').trim().toLowerCase();
    if (!email) return { success: false, message: 'Tài khoản Supabase không có email hợp lệ.' };
    const client = window.SupabaseConfig ? window.SupabaseConfig.getClient() : null;
    if (!client?.auth) return { success: false, message: 'Không kết nối được Supabase Auth.' };
    const { data: { session } = {} } = await client.auth.getSession();
    if (!session?.user?.id || session.user.id !== authUser.id || session.user.email?.toLowerCase() !== email) {
      return { success: false, message: 'Phiên đăng nhập Supabase không hợp lệ.' };
    }
    const { data: profile, error } = await client.from('users').select('email,full_name,role,department,phone,avatar,referrer_email,permissions,created_at,updated_at').eq('email', email).maybeSingle();
    if (error) return { success: false, message: 'Không đọc được hồ sơ tài khoản.' };
    if (!profile) {
      const { data: technician, error: technicianError } = await client.from('technicians')
        .select('tech_id,name,email,skills,phone,avatar,is_active,created_at')
        .ilike('email', email).maybeSingle();
      if (technicianError || !technician || technician.is_active === false) {
        return { success: false, message: 'Tài khoản chưa được cấp quyền trong hệ thống.' };
      }
      this.currentUser = {
        tech_id: technician.tech_id,
        email,
        full_name: this.cleanUserName(technician.name || email),
        role: 'technician', auth_role: 'technician', role_label: this.getRoleLabel('technician'),
        avatar: technician.avatar || '', phone: technician.phone || '', skills: technician.skills || [],
        department: 'Đội Ngũ Kỹ Thuật Hiện Trường', is_technician: true,
        permissions: ['view_schedule'], auth_verified: true
      };
      this.originalAdminEmail = null;
      this.persistSession(this.currentUser);
      return { success: true, user: this.currentUser };
    }
    const safeProfile = { ...profile };
    delete safeProfile.password;
    this.users = [...this.users.filter(u => (u.email || '').toLowerCase() !== email), safeProfile];
    const role = profile.role || 'requester';
    let userPerms = profile.permissions;
    if (typeof userPerms === 'string') {
      try { userPerms = JSON.parse(userPerms); } catch (e) { userPerms = userPerms.split(',').map(s => s.trim()); }
    }
    const finalUserPerms = Array.isArray(userPerms) ? userPerms : (this.ROLE_PERMISSIONS[role] || []);

    this.currentUser = {
      email, full_name: this.cleanUserName(profile.full_name || email), role, auth_role: role,
      role_label: this.getRoleLabel(role), avatar: profile.avatar || '', phone: profile.phone || '',
      department: profile.department || '', referrer_email: profile.referrer_email || '',
      permissions: finalUserPerms,
      auth_verified: true
    };
    this.originalAdminEmail = role === 'admin' ? email : null;
    this.persistSession(this.currentUser);
    return { success: true, user: this.currentUser };
  },

  async loginWithEmailPassword(email, password) {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();
    if (!cleanEmail || !cleanPass) return { success: false, message: 'Vui lòng nhập email và mật khẩu.' };
    const client = window.SupabaseConfig ? window.SupabaseConfig.getClient() : null;
    if (!client?.auth) return { success: false, message: 'Dịch vụ đăng nhập hiện không khả dụng.' };
    const { data, error } = await client.auth.signInWithPassword({ email: cleanEmail, password: cleanPass });
    if (error || !data?.user) return { success: false, error: 'wrong_password', message: 'Đăng nhập thất bại. Kiểm tra email và mật khẩu.' };
    const result = await this.establishAuthenticatedUser(data.user);
    if (!result.success) await client.auth.signOut();
    return result;
  },

  async loginWithGoogle(email) {
    const client = window.SupabaseConfig ? window.SupabaseConfig.getClient() : null;
    const { data: { session } = {} } = client?.auth ? await client.auth.getSession() : {};
    if (!session?.user || session.user.email?.toLowerCase() !== (email || '').toLowerCase()) {
      return { success: false, message: 'Không tìm thấy phiên đăng nhập đã xác thực.' };
    }
    return this.establishAuthenticatedUser(session.user);
  },

  // ==========================================
  // EMAIL NOTIFICATION & GOOGLE CALENDAR DISPATCH SYSTEM
  // ==========================================
  emailSettings: {
    senderEmail: 'dispatch.kcoffee@gmail.com',
    senderName: 'Hệ Thống Điều Phối K-Coffee Workspace',
    autoInviteOnApprove: true,
    autoNotifyRequester: true,
    includeGoogleMapsLink: true,
    calendarReminderMinutes: 60,
    templates: {
      tech_invite: {
        title: 'Lời mời Google Calendar gửi Kỹ Sư',
        subject: '[Lịch Trực Kỹ Thuật] #{booking_id} - {title}',
        body: 'Xin chào {tech_name},\n\nBạn vừa được phân công ca trực kỹ thuật mới từ Hệ thống Điều phối K-Coffee:\n\n• Mã ca trực: {booking_id}\n• Nhiệm vụ: {title}\n• Thời gian: {date_range}\n• Địa điểm: {location}\n• Người tạo yêu cầu: {requester_name} ({requester_email})\n• Ghi chú: {notes}\n\n👉 Vui lòng nhấn [CÓ / YES] trên email lời mời Google Calendar này để ca trực được tự động đưa vào ứng dụng Lịch trên điện thoại và nhận chuông báo thức trước 1 giờ.'
      },
      requester_approved: {
        title: 'Email duyệt ca trực gửi Người Đặt (PM)',
        subject: '[Duyệt Ca Trực] #{booking_id} - Đơn của bạn đã được phê duyệt',
        body: 'Xin chào {requester_name},\n\nYêu cầu điều phối kỹ thuật "#{booking_id} - {title}" của bạn đã được Lead vận hành phê duyệt thành công.\n\n• Kỹ sư phụ trách: {tech_name} (SĐT: {tech_phone})\n• Thời gian: {date_range}\n• Địa điểm: {location}\n• Người duyệt đơn: {approver_name}\n\nKỹ sư sẽ chủ động liên hệ và có mặt đúng giờ theo lịch hẹn.'
      },
      requester_rejected: {
        title: 'Email từ chối ca trực gửi Người Đặt (PM)',
        subject: '[Thông Báo] #{booking_id} - Yêu cầu chưa thể phê duyệt',
        body: 'Xin chào {requester_name},\n\nRất tiếc, yêu cầu điều phối "#{booking_id} - {title}" (Dự kiến ngày {date_range}) hiện chưa thể phê duyệt do lý do sau:\n\n👉 Lý do: {reject_reason}\n\nBạn vui lòng điều chỉnh ngày giờ hoặc liên hệ trực tiếp với Lead kỹ thuật để được hỗ trợ sắp xếp ca phù hợp.'
      }
    }
  },

  initEmailSettings() {
    try {
      const stored = localStorage.getItem('kcoffee_email_settings_v2');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object') {
          this.emailSettings = {
            ...this.emailSettings,
            ...parsed,
            templates: {
              ...this.emailSettings.templates,
              ...(parsed.templates || {})
            }
          };
        }
      }
    } catch (e) {
      console.warn('Could not load email settings from storage:', e);
    }
  },

  saveEmailSettings(newSettings) {
    this.emailSettings = {
      ...this.emailSettings,
      ...newSettings
    };
    try {
      localStorage.setItem('kcoffee_email_settings_v2', JSON.stringify(this.emailSettings));
    } catch (e) {
      console.warn('Could not save email settings:', e);
    }
    return { success: true };
  },

  // Generate standard RFC 5545 .ics Calendar File content
  generateIcsContent(booking) {
    if (!booking) return '';
    const bId = booking.booking_id || 'BK-UNKNOWN';
    const tech = this.technicians.find(t => t.tech_id === (booking.tech_id || booking.technician_id));
    const techName = tech ? tech.name : 'Kỹ sư K-Coffee';
    const techEmail = tech?.email || `${(booking.tech_id || 'tech').toLowerCase()}@kcoffee.vn`;
    const sender = this.emailSettings.senderEmail || 'dispatch.kcoffee@gmail.com';

    // Format Start & End Dates to YYYYMMDD
    const startStr = (booking.booking_date || booking.date || '').replace(/-/g, '');
    const endRaw = booking.end_date || booking.booking_date || booking.date;
    const endDateObj = new Date(endRaw);
    endDateObj.setDate(endDateObj.getDate() + 1); // ICS inclusive end date rule
    const y = endDateObj.getFullYear();
    const m = String(endDateObj.getMonth() + 1).padStart(2, '0');
    const d = String(endDateObj.getDate()).padStart(2, '0');
    const endStr = `${y}${m}${d}`;

    const nowUtc = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const cleanNotes = (booking.notes || 'Ca trực điều phối kỹ thuật K-Coffee').replace(/\n/g, '\\n');
    const cleanLocation = (booking.location || 'Tại công trình').replace(/\n/g, ', ');

    return [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//K-Coffee Workspace//Dispatch System//VI',
      'CALSCALE:GREGORIAN',
      'METHOD:REQUEST',
      'BEGIN:VEVENT',
      `UID:${bId}@kcoffee.vn`,
      `DTSTAMP:${nowUtc}`,
      `DTSTART;VALUE=DATE:${startStr}`,
      `DTEND;VALUE=DATE:${endStr}`,
      `SUMMARY:[Ca Trực Kỹ Thuật] ${booking.title || 'Ca trực'} (${bId})`,
      `DESCRIPTION:${cleanNotes}\\nKỹ sư: ${techName} (${tech?.phone || 'Chưa có SĐT'})\\nNgười đặt: ${booking.requester_name || 'PM'}`,
      `LOCATION:${cleanLocation}`,
      'STATUS:CONFIRMED',
      `ORGANIZER;CN=K-Coffee Dispatch:mailto:${sender}`,
      `ATTENDEE;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;CN=${techName}:mailto:${techEmail}`,
      'BEGIN:VALARM',
      'ACTION:DISPLAY',
      'DESCRIPTION:Nhắc lịch ca trực kỹ thuật K-Coffee (Trước 1 giờ)',
      'TRIGGER:-PT60M',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');
  },

  // 1-Click Web Intent URL for Google Calendar
  getGoogleCalendarUrl(booking) {
    if (!booking) return '#';
    const tech = this.technicians.find(t => t.tech_id === (booking.tech_id || booking.technician_id));
    const techName = tech ? tech.name : 'Kỹ sư K-Coffee';
    const techEmail = tech?.email || `${(booking.tech_id || 'tech').toLowerCase()}@kcoffee.vn`;

    const startStr = (booking.booking_date || booking.date || '').replace(/-/g, '');
    const endRaw = booking.end_date || booking.booking_date || booking.date;
    const endDateObj = new Date(endRaw);
    endDateObj.setDate(endDateObj.getDate() + 1);
    const y = endDateObj.getFullYear();
    const m = String(endDateObj.getMonth() + 1).padStart(2, '0');
    const d = String(endDateObj.getDate()).padStart(2, '0');
    const endStr = `${y}${m}${d}`;

    const title = `[Ca Trực] ${booking.title || 'Ca trực'} (${booking.booking_id || ''})`;
    const details = `Mã ca: ${booking.booking_id || ''}\nKỹ sư: ${techName} (${tech?.phone || ''})\nNgười đặt: ${booking.requester_name || ''}\nGhi chú: ${booking.notes || ''}`;
    const location = booking.location || '';

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: title,
      dates: `${startStr}/${endStr}`,
      details: details,
      location: location,
      add: techEmail
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  }
};

window.BookingData = BookingData;
BookingData.init();
