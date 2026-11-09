// Global App Shell & Multi-App Router Controller
const App = {
  currentView: 'intro-hub', // 'intro-hub' | 'booking-module'

  async init() {
    this.bindGlobalEvents();
    await this.checkSupabaseAuthCallback();
    this.checkAuthGate();
    this.startClock();

    // Initialize Toast
    if (window.Toast) Toast.init();

    // Initialize Custom Role Dropdown
    this.initRoleDropdown();

    // Initialize Booking UI
    if (window.BookingUI) BookingUI.init();

    // Trigger Supabase Cloud Sync
    if (window.BookingData && typeof window.BookingData.syncWithSupabase === 'function') {
      window.BookingData.syncWithSupabase();
    }
  },

  checkAuthGate() {
    const isAuth = BookingData.isAuthenticated();
    const isLoginPage = window.location.pathname.endsWith('login.html');

    if (!isAuth) {
      if (!isLoginPage) {
        window.location.replace('login.html');
      }
      return;
    }

    if (isLoginPage) {
      window.location.replace('index.html');
      return;
    }

    const appLayout = document.getElementById('app-layout');
    if (appLayout) {
      appLayout.classList.add('app-authenticated');
      appLayout.classList.remove('hidden');
      appLayout.classList.add('flex');
      appLayout.style.display = 'flex';
    }
    this.updateUserBadge();
    this.updateStats();
    if (window.BookingUI) {
      BookingUI.applyRolePermissions();
      BookingUI.render();
    }
  },

  async checkSupabaseAuthCallback() {
    const client = window.SupabaseConfig ? window.SupabaseConfig.getClient() : null;
    if (client && client.auth) {
      try {
        const { data: { session }, error } = await client.auth.getSession();
        if (session && session.user && session.user.email) {
          const recoveryFromUrl = new URLSearchParams(window.location.hash.slice(1)).get('type') === 'recovery';
          BookingData.passwordRecoverySession = recoveryFromUrl || sessionStorage.getItem('k_password_recovery') === '1';
          sessionStorage.removeItem('k_password_recovery');
          const googleEmail = session.user.email;
          const googleName = session.user.user_metadata?.full_name || session.user.email.split('@')[0];
          // STRICT CHECK against database:
          const result = await BookingData.loginWithGoogle(googleEmail);
          if (!result.success) {
            await client.auth.signOut();
            const gateErrBox = document.getElementById('gatekeeper-error-box');
            const gateErrMsg = document.getElementById('gatekeeper-error-msg');
            if (gateErrBox && gateErrMsg) {
              gateErrMsg.textContent = result.message;
              gateErrBox.classList.remove('hidden');
            }
            if (window.Toast) Toast.show(result.message, 'error', 'Từ Chối Truy Cập');
          } else {
            if (window.history && window.history.replaceState) {
              window.history.replaceState(null, '', window.location.pathname);
            }
            this.checkAuthGate();
            if (BookingData.passwordRecoverySession && window.Toast) {
              Toast.show('Mở Hồ sơ cá nhân để đặt mật khẩu mới. Trong phiên khôi phục, có thể bỏ trống mật khẩu hiện tại.', 'info', 'Khôi phục mật khẩu');
            }
          }
        }
      } catch (err) {
        console.warn('Supabase auth session check notice:', err);
      }
    }
  },

  startClock() {
    const clockEl = document.getElementById('clock-display');
    const updateTime = () => {
      if (!clockEl) return;
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      clockEl.textContent = `${h}:${m}`;
    };
    updateTime();
    setInterval(updateTime, 1000);
  },

  bindGlobalEvents() {
    // App Launcher Toggle (9-dots menu)
    const launcherBtn = document.getElementById('btn-app-launcher');
    const launcherDropdown = document.getElementById('app-launcher-dropdown');

    if (launcherBtn && launcherDropdown) {
      launcherBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        launcherDropdown.classList.toggle('hidden');
      });

      document.addEventListener('click', (e) => {
        if (!launcherDropdown.contains(e.target) && !launcherBtn.contains(e.target)) {
          launcherDropdown.classList.add('hidden');
        }
      });
    }

    // Global Shortcut: Ctrl+K or Cmd+K to focus search input
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        const searchInput = document.getElementById('global-search-input');
        if (searchInput && searchInput.type !== 'hidden') {
          e.preventDefault();
          searchInput.focus();
          searchInput.select();
        }
      }
    });

    // Role Switcher Select
    const roleSelector = document.getElementById('role-select-input');
    if (roleSelector) {
      roleSelector.addEventListener('change', (e) => {
        const newRole = e.target.value;
        BookingData.switchRole(newRole);
        this.updateUserBadge();
        this.updateStats();
        Toast.show(`Đã chuyển vai trò sang: ${BookingData.currentUser.role_label}`, 'info');

        // Apply role permissions to tabs and views, and re-render calendar with new permissions!
        if (window.BookingUI) {
          BookingUI.applyRolePermissions();
          BookingUI.switchTab(BookingUI.activeTab);
          BookingUI.render();
          BookingUI.renderOverview();
          BookingUI.renderNotifications();
        }
      });
    }

    // Mobile Navigation Drawer Toggle (< 1024px)
    const drawerOpenBtn = document.getElementById('btn-mobile-menu-open');
    const drawerCloseBtn = document.getElementById('btn-mobile-menu-close');
    const drawerBackdrop = document.getElementById('mobile-drawer-backdrop');
    const drawerPanel = document.getElementById('mobile-drawer-panel');
    const dockMenuBtn = document.getElementById('btn-bottom-dock-menu');

    const openDrawer = () => {
      if (drawerBackdrop && drawerPanel) {
        drawerBackdrop.classList.remove('hidden');
        drawerPanel.classList.remove('-translate-x-full');
      }
    };

    const closeDrawer = () => {
      if (drawerBackdrop && drawerPanel) {
        drawerPanel.classList.add('-translate-x-full');
        setTimeout(() => {
          drawerBackdrop.classList.add('hidden');
        }, 250);
      }
    };

    this.toggleMobileDrawer = (open) => {
      if (open) openDrawer();
      else closeDrawer();
    };

    if (drawerOpenBtn) drawerOpenBtn.addEventListener('click', openDrawer);
    if (dockMenuBtn) dockMenuBtn.addEventListener('click', openDrawer);
    if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', (e) => {
      if (e.target === drawerBackdrop) closeDrawer();
    });
  },

  // ROUTER: Switch between Overview Hub and Booking Modules
  navigateTo(viewName) {
    if (viewName === 'intro-hub' || viewName === 'overview') {
      if (window.BookingUI) BookingUI.switchTab('overview');
    } else {
      if (window.BookingUI) BookingUI.switchTab('timeline');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  updateStats() {
    const totalTechs = BookingData.technicians.length;
    const todayStr = BookingData.formatDateStr(new Date());

    // Active bookings today
    const busyTodayTechIds = new Set(
      BookingData.bookings
        .filter(b => b.booking_date === todayStr && (b.status === 'APPROVED' || b.status === 'PENDING'))
        .map(b => b.tech_id)
    );

    const availableCount = totalTechs - busyTodayTechIds.size;
    const pendingCount = BookingData.bookings.filter(b => b.status === 'PENDING').length;
    const userRole = BookingData.currentUser?.role;
    const isTechnician = userRole === 'technician' || Boolean(BookingData.currentUser?.is_technician);
    const isApprover = userRole === 'approver' || userRole === 'admin' || userRole === 'manager';
    const curEmailLower = (BookingData.currentUser?.email || '').toLowerCase().trim();
    const myBookingsCount = isTechnician
      ? (BookingData.bookings || []).filter(b => b.tech_id === BookingData.currentUser?.tech_id).length
      : isApprover
        ? (BookingData.bookings || []).length
        : (BookingData.bookings || []).filter(b =>
            ((b.requester_email || '').toLowerCase().trim() === curEmailLower) ||
            ((b.created_by || '').toLowerCase().trim() === curEmailLower)
          ).length;

    const elAvail = document.getElementById('stat-available-techs');
    const elPending = document.getElementById('stat-pending-approvals');
    const elMy = document.getElementById('stat-my-bookings');

    if (elAvail) elAvail.textContent = `${availableCount}/${totalTechs}`;
    if (elPending) elPending.textContent = pendingCount;
    if (elMy) elMy.textContent = myBookingsCount;

    // Hub mini indicator
    const elHubBadge = document.getElementById('hub-booking-badge');
    if (elHubBadge) {
      elHubBadge.textContent = `${availableCount} Kỹ sư sẵn sàng`;
    }
  },

  updateUserBadge() {
    const u = BookingData.currentUser;
    if (!u) return;

    const nameEl = document.getElementById('user-display-name');
    const roleEl = document.getElementById('user-display-role');
    const avatarEl = document.getElementById('user-avatar-badge');

    const topNameEl = document.getElementById('top-user-name');
    const topRoleEl = document.getElementById('top-user-role');
    const topAvatarEl = document.getElementById('top-user-avatar-badge');

    // Check if current user is root admin (eligible to see debug bubble and preserve identity during tests)
    const canAccessBubble = (typeof BookingData !== 'undefined' && BookingData.canAccessDebugRoleSwitcher)
      ? BookingData.canAccessDebugRoleSwitcher()
      : false;

    const isSuper = (typeof BookingData !== 'undefined' && BookingData.isSuperAdmin)
      ? BookingData.isSuperAdmin()
      : (u.role === 'admin');
    const isAdmin = u.role === 'admin';
    const isApprover = u.role === 'approver';
    const isTechnician = u.role === 'technician' || Boolean(u.is_technician);
    const isTestMode = Boolean(u.test_mode);

    let roleLabel = 'User PM';
    let displayName = BookingData.cleanUserName ? BookingData.cleanUserName(u.full_name) : (u.full_name || 'Người dùng');
    let avatarInitials = u.avatar_text || (displayName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'U');

    if (canAccessBubble) {
      if (isAdmin) {
        roleLabel = 'Admin';
      } else if (isApprover) {
        roleLabel = 'Test: Vận hành';
      } else {
        roleLabel = 'Test: User PM';
      }
    } else if (isAdmin) {
      roleLabel = 'Admin';
    } else if (isApprover) {
      roleLabel = 'Vận hành';
      avatarInitials = u.avatar_text || (displayName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'AT');
    } else if (isTechnician) {
      roleLabel = u.tech_id ? `Kỹ Sư (${u.tech_id})` : 'Kỹ Sư Hiện Trường';
      avatarInitials = u.avatar_text || (displayName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'KS');
    } else {
      roleLabel = 'User PM';
      avatarInitials = u.avatar_text || (displayName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'PM');
    }

    if (nameEl) nameEl.textContent = displayName;
    if (avatarEl) {
      if (u.avatar) {
        avatarEl.innerHTML = `<img src="${u.avatar}" alt="" class="w-full h-full rounded-full object-cover">`;
      } else {
        avatarEl.textContent = avatarInitials;
      }
      if (isSuper || isAdmin) {
        avatarEl.className = 'w-8 h-8 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center text-xs border border-amber-600 flex-shrink-0 shadow-2xs overflow-hidden';
      } else if (isApprover) {
        avatarEl.className = 'w-8 h-8 rounded-full bg-brand-50 text-brand-700 font-bold flex items-center justify-center text-xs border border-brand-200 flex-shrink-0 shadow-2xs overflow-hidden';
      } else if (isTechnician) {
        avatarEl.className = 'w-8 h-8 rounded-full bg-accent-600 text-white font-bold flex items-center justify-center text-xs border border-accent-700 flex-shrink-0 shadow-2xs overflow-hidden';
      } else {
        avatarEl.className = 'w-8 h-8 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-xs border border-slate-300 flex-shrink-0 shadow-2xs overflow-hidden';
      }
    }

    if (roleEl) {
      if (isTestMode) {
        roleEl.textContent = isApprover ? 'Test: Người vận hành' : 'Test: User bình thường';
        roleEl.className = 'text-[10px] font-extrabold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full inline-block mt-0.5 border border-amber-300 animate-pulse';
      } else if (isAdmin) {
        roleEl.textContent = 'Admin cấp cao';
        roleEl.className = 'text-[10px] font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full inline-block mt-0.5 border border-amber-300';
      } else if (isApprover) {
        roleEl.textContent = 'Người vận hành';
        roleEl.className = 'text-[10px] font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full inline-block mt-0.5 border border-brand-200';
      } else if (isTechnician) {
        roleEl.textContent = roleLabel;
        roleEl.className = 'text-[10px] font-bold text-accent-800 bg-accent-50 px-2 py-0.5 rounded-full inline-block mt-0.5 border border-accent-300';
      } else {
        roleEl.textContent = 'User bình thường';
        roleEl.className = 'text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full inline-block mt-0.5 border border-slate-200';
      }
    }

    if (topNameEl) topNameEl.textContent = displayName;
    if (topAvatarEl) {
      if (u.avatar) {
        topAvatarEl.innerHTML = `<img src="${u.avatar}" alt="" class="w-full h-full rounded-full object-cover">`;
      } else {
        topAvatarEl.textContent = avatarInitials;
      }
      if (isSuper || isAdmin) {
        topAvatarEl.className = 'w-9 h-9 rounded-full bg-amber-500 text-white font-condensed font-bold flex items-center justify-center text-xs flex-shrink-0 ring-2 ring-white shadow-xs overflow-hidden transition-transform group-hover:scale-105';
      } else if (isApprover) {
        topAvatarEl.className = 'w-9 h-9 rounded-full bg-brand-700 text-white font-condensed font-bold flex items-center justify-center text-xs flex-shrink-0 ring-2 ring-white shadow-xs overflow-hidden transition-transform group-hover:scale-105';
      } else if (isTechnician) {
        topAvatarEl.className = 'w-9 h-9 rounded-full bg-accent-600 text-white font-condensed font-bold flex items-center justify-center text-xs flex-shrink-0 ring-2 ring-white shadow-xs overflow-hidden transition-transform group-hover:scale-105';
      } else {
        topAvatarEl.className = 'w-9 h-9 rounded-full bg-slate-200 text-slate-700 font-condensed font-bold flex items-center justify-center text-xs flex-shrink-0 ring-2 ring-white shadow-xs overflow-hidden transition-transform group-hover:scale-105';
      }
    }
    if (topRoleEl) {
      topRoleEl.textContent = roleLabel;
      if (isAdmin) {
        topRoleEl.className = 'text-[11px] font-condensed font-bold uppercase tracking-wider text-amber-600 leading-none';
      } else if (isApprover) {
        topRoleEl.className = 'text-[11px] font-condensed font-bold uppercase tracking-wider text-brand-600 leading-none';
      } else if (isTechnician) {
        topRoleEl.className = 'text-[11px] font-condensed font-bold uppercase tracking-wider text-accent-700 leading-none';
      } else {
        topRoleEl.className = 'text-[11px] font-condensed font-semibold uppercase tracking-wider text-slate-500 leading-none';
      }
    }

    const roleSelector = document.getElementById('role-select-input');
    if (roleSelector) roleSelector.value = u.role;

    // Toggle Floating Debug Bubble on right side of screen (CHỈ DÀNH RIÊNG CHO SUPER ADMIN)
    const bubbleContainer = document.getElementById('admin-role-bubble-container');
    if (bubbleContainer) {
      bubbleContainer.classList.toggle('hidden', !canAccessBubble);
      bubbleContainer.classList.toggle('flex', canAccessBubble);
    }

    // Sync Floating Bubble Active Role Name & Checkmarks
    const bubbleActiveRole = document.getElementById('bubble-active-role-name');
    if (bubbleActiveRole) {
      bubbleActiveRole.textContent = isAdmin ? 'Admin' : (isApprover ? 'Vận hành' : 'User PM');
    }
    const bubbleCheckAdmin = document.getElementById('bubble-check-admin');
    const bubbleCheckApp = document.getElementById('bubble-check-approver');
    const bubbleCheckReq = document.getElementById('bubble-check-requester');
    if (bubbleCheckAdmin) bubbleCheckAdmin.classList.toggle('hidden', !isAdmin);
    if (bubbleCheckApp) bubbleCheckApp.classList.toggle('hidden', !isApprover);
    if (bubbleCheckReq) bubbleCheckReq.classList.toggle('hidden', isAdmin || isApprover);

    // Update Top Menu Flyout User Card
    const topMenuAvatar = document.getElementById('top-menu-user-avatar');
    const topMenuName = document.getElementById('top-menu-user-name');
    const topMenuEmail = document.getElementById('top-menu-user-email');
    const topMenuRole = document.getElementById('top-menu-user-role');
    if (topMenuAvatar) {
      if (u.avatar) {
        topMenuAvatar.innerHTML = `<img src="${u.avatar}" alt="" class="w-full h-full rounded-full object-cover">`;
      } else {
        topMenuAvatar.textContent = avatarInitials;
      }
    }
    if (topMenuName) topMenuName.textContent = displayName;
    if (topMenuEmail) topMenuEmail.textContent = u.email;
    if (topMenuRole) topMenuRole.textContent = roleLabel;

    // Update Mobile Drawer User Card
    const mobAvatar = document.getElementById('mobile-user-avatar-badge');
    const mobName = document.getElementById('mobile-user-name');
    const mobRole = document.getElementById('mobile-user-role');
    const mobEmail = document.getElementById('mobile-user-email');
    if (mobAvatar) {
      if (u.avatar) {
        mobAvatar.innerHTML = `<img src="${u.avatar}" alt="" class="w-full h-full rounded-full object-cover">`;
      } else {
        mobAvatar.textContent = avatarInitials;
      }
    }
    if (mobName) mobName.textContent = displayName;
    if (mobRole) mobRole.textContent = roleLabel;
    if (mobEmail) mobEmail.textContent = u.email;

    // Sync Custom Role Dropdown Trigger Label with SVG Line Icons
    const roleLabelEl = document.getElementById('role-selected-label');
    if (roleLabelEl) {
      if (isAdmin) {
        roleLabelEl.innerHTML = '<svg class="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg> <span>Admin cấp cao</span>';
      } else if (isApprover) {
        roleLabelEl.innerHTML = '<svg class="w-4 h-4 text-brand-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg> <span>Người vận hành (Lead)</span>';
      } else if (isTechnician) {
        roleLabelEl.innerHTML = '<svg class="w-4 h-4 text-accent-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg> <span>' + roleLabel + '</span>';
      } else {
        roleLabelEl.innerHTML = '<svg class="w-4 h-4 text-slate-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg> <span>User bình thường (PM)</span>';
      }
    }

    // Sync Bottom Sidebar Checkmarks (admin, approver, requester)
    const checkAdmin = document.getElementById('role-check-admin');
    const checkApp = document.getElementById('role-check-approver');
    const checkReq = document.getElementById('role-check-requester');

    if (checkAdmin) checkAdmin.classList.toggle('hidden', !isAdmin);
    if (checkApp) checkApp.classList.toggle('hidden', !isApprover);
    if (checkReq) checkReq.classList.toggle('hidden', isAdmin || isApprover);

    // Sync permissions count badge
    const permBadge = document.getElementById('top-perm-count-badge');
    if (permBadge) {
      const perms = u.permissions || BookingData.ROLE_PERMISSIONS[u.role] || [];
      permBadge.textContent = `${perms.length}/${BookingData.ALL_PERMISSIONS.length} quyền`;
    }
  },

  toggleTopUserMenu(forceOpen = null) {
    const dropdown = document.getElementById('top-user-menu-dropdown');
    const chevron = document.getElementById('top-user-chevron');
    if (!dropdown) return;

    const isHidden = dropdown.classList.contains('hidden');
    const shouldOpen = forceOpen !== null ? forceOpen : isHidden;

    if (shouldOpen) {
      dropdown.classList.remove('hidden');
      if (chevron) chevron.classList.add('rotate-180');
    } else {
      dropdown.classList.add('hidden');
      if (chevron) chevron.classList.remove('rotate-180');
    }
  },

  initRoleDropdown() {
    const btn = document.getElementById('btn-role-dropdown');
    const menu = document.getElementById('role-custom-menu');
    const chevron = document.getElementById('role-chevron');
    const wrapper = document.getElementById('role-dropdown-wrapper');

    // Close top user menu on outside click
    document.addEventListener('click', (e) => {
      const topWrapper = document.getElementById('top-user-menu-wrapper');
      if (topWrapper && !topWrapper.contains(e.target)) {
        this.toggleTopUserMenu(false);
      }
      const bubbleContainer = document.getElementById('admin-role-bubble-container');
      if (bubbleContainer && !bubbleContainer.contains(e.target)) {
        if (window.BookingUI && typeof BookingUI.toggleRoleBubble === 'function') {
          BookingUI.toggleRoleBubble(false);
        }
      }
    });

    if (btn && menu) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = menu.classList.contains('hidden');
        if (isHidden) {
          menu.classList.remove('hidden');
          btn.setAttribute('aria-expanded', 'true');
          if (chevron) chevron.classList.add('rotate-180');
        } else {
          menu.classList.add('hidden');
          btn.setAttribute('aria-expanded', 'false');
          if (chevron) chevron.classList.remove('rotate-180');
        }
      });

      document.addEventListener('click', (e) => {
        if (wrapper && !wrapper.contains(e.target)) {
          menu.classList.add('hidden');
          btn.setAttribute('aria-expanded', 'false');
          if (chevron) chevron.classList.remove('rotate-180');
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !menu.classList.contains('hidden')) {
          menu.classList.add('hidden');
          btn.setAttribute('aria-expanded', 'false');
          if (chevron) chevron.classList.remove('rotate-180');
        }
      });
    }
  },

  selectRoleCustom(role) {
    const roleSelector = document.getElementById('role-select-input');
    if (roleSelector) {
      roleSelector.value = role;
      roleSelector.dispatchEvent(new Event('change'));
    }

    const menu = document.getElementById('role-custom-menu');
    const btn = document.getElementById('btn-role-dropdown');
    const chevron = document.getElementById('role-chevron');
    if (menu) menu.classList.add('hidden');
    if (btn) btn.setAttribute('aria-expanded', 'false');
    if (chevron) chevron.classList.remove('rotate-180');

    // Also close role bubble popover and top user dropdown if open
    if (window.BookingUI && typeof BookingUI.toggleRoleBubble === 'function') {
      BookingUI.toggleRoleBubble(false);
    }
    App.toggleTopUserMenu(false);
  },

  // Live Tool Filtering in Intro Hub
  filterHubTools(query) {
    const q = (query || '').trim().toLowerCase();
    const shortcuts = document.querySelectorAll('.hub-tool-shortcut');
    const noResults = document.getElementById('hub-no-results');
    let visibleCount = 0;

    shortcuts.forEach(el => {
      const keywords = (el.getAttribute('data-keywords') || '').toLowerCase();
      const title = (el.querySelector('.hub-tool-title')?.textContent || '').toLowerCase();
      const match = !q || keywords.includes(q) || title.includes(q);

      if (match) {
        el.classList.remove('hidden');
        visibleCount++;
      } else {
        el.classList.add('hidden');
      }
    });

    if (noResults) {
      if (visibleCount === 0 && q.length > 0) {
        noResults.classList.remove('hidden');
        const queryDisplay = document.getElementById('hub-search-query-display');
        if (queryDisplay) queryDisplay.textContent = query;
      } else {
        noResults.classList.add('hidden');
      }
    }
  },

  // Handle Enter or Click Search
  handleHubSearchSubmit() {
    const input = document.getElementById('hub-search-input');
    const q = (input ? input.value : '').trim().toLowerCase();
    if (!q) {
      this.navigateTo('booking-module');
      return;
    }

    const shortcuts = Array.from(document.querySelectorAll('.hub-tool-shortcut:not(.hidden)'));
    if (shortcuts.length > 0) {
      // Click first matched shortcut
      shortcuts[0].click();
    } else {
      if (window.Toast) Toast.show(`Không tìm thấy tiện ích phù hợp với "${q}"`, 'info');
    }
  },

  openToolPreview(toolKey) {
    const modal = document.getElementById('tool-preview-modal');
    const titleEl = document.getElementById('preview-tool-title');
    const descEl = document.getElementById('preview-tool-desc');
    const badgeEl = document.getElementById('preview-tool-badge');
    const iconContainer = document.getElementById('preview-tool-icon-container');

    const tools = {
      signature: {
        title: 'Tạo Chữ Ký Email - Đa Công Ty Con',
        badge: 'Đang phát triển • Sắp ra mắt',
        iconSvg: `<svg class="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>`,
        desc: 'Công cụ giúp nhân viên tạo chữ ký email chuẩn nhận diện thương hiệu theo từng công ty con, xuất file hình ảnh (PNG) hoặc mã HTML nhúng trực tiếp vào Outlook/Gmail. Module này đang trong giai đoạn phát triển và sẽ sớm sẵn sàng.'
      },
      welcome: {
        title: 'Tạo Hình Chào Đón Nhân Sự Mới',
        badge: 'Đang phát triển • Sắp ra mắt',
        iconSvg: `<svg class="w-10 h-10 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>`,
        desc: 'Tự động ghép avatar, chức danh và thông điệp chào mừng vào các khung hình thiết kế sẵn, xuất ảnh chất lượng cao để đăng tải nội bộ và mạng xã hội. Module này đang trong giai đoạn phát triển và sẽ sớm sẵn sàng.'
      }
    };

    const target = tools[toolKey];
    if (target && modal) {
      if (titleEl) titleEl.textContent = target.title;
      if (descEl) descEl.textContent = target.desc;
      if (badgeEl) badgeEl.textContent = target.badge;
      if (iconContainer) iconContainer.innerHTML = target.iconSvg;

      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }

    const launcherDropdown = document.getElementById('app-launcher-dropdown');
    if (launcherDropdown) launcherDropdown.classList.add('hidden');
  },

  closeToolPreview() {
    const modal = document.getElementById('tool-preview-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }
};

window.App = App;

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
