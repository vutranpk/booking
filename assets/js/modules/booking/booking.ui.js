// Unified Lucide Line Icons (2px stroke, 100% SVG line icons)
const Lucide = {
  check: `<svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>`,
  clock: `<svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  calendar: `<svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>`,
  mapPin: `<svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
  user: `<svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  x: `<svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
  plus: `<svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`,
  phone: `<svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  fileText: `<svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>`,
  arrowRight: `<svg class="w-3.5 h-3.5 flex-shrink-0 inline-block" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
  tool: `<svg class="w-3.5 h-3.5 flex-shrink-0 inline-block" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
  shield: `<svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  pencil: `<svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>`
};
window.Lucide = Lucide;

// Booking Module UI Controller (Full Month Calendar + Horizontal Technicians + Approvals)
const BookingUI = {
  icons: Lucide,
  activeTab: 'overview', // 'overview' | 'timeline' | 'approval' | 'my-bookings' | 'technicians' | 'users'

  // Helper: Render User Avatar or Initials Badge consistently across all tabs
  getUserAvatarHtml(email, name = '', size = 'w-6 h-6', textSize = 'text-[9px]') {
    const u = (BookingData.users || []).find(x => (x.email || '').toLowerCase() === (email || '').toLowerCase());
    const isCurrentUser = BookingData.currentUser && (BookingData.currentUser.email || '').toLowerCase() === (email || '').toLowerCase();
    const avatarUrl = (isCurrentUser && BookingData.currentUser.avatar) ? BookingData.currentUser.avatar : (u?.avatar || '');
    const cleanName = name || u?.full_name || (isCurrentUser ? BookingData.currentUser.full_name : '') || email || 'User';
    const initials = cleanName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

    if (avatarUrl) {
      return `<img src="${avatarUrl}" alt="${cleanName}" class="${size} rounded-full object-cover border border-slate-200 shadow-2xs flex-shrink-0">`;
    }
    const isSuper = BookingData.ROOT_ADMIN_EMAILS ? BookingData.ROOT_ADMIN_EMAILS.includes((email || '').toLowerCase()) : false;
    const isApprover = u?.role === 'approver';
    const bgClass = isSuper ? 'bg-amber-500 text-white' : (isApprover ? 'bg-brand-50 text-brand-700' : 'bg-slate-200 text-slate-700');
    return `<div class="${size} rounded-full ${bgClass} font-bold ${textSize} flex items-center justify-center flex-shrink-0 shadow-2xs border border-black/5">${initials}</div>`;
  },
  currentYear: 2026,
  currentMonth: 10, // 0-indexed (10 = Tháng 11)
  selectedTechId: 'all', // 'all' | 'TECH-001' | ...
  selectedSkill: 'all',
  searchQuery: '',

  // Unified Pagination State for All List-based Pages
  pagination: {
    approval: { page: 1, pageSize: 5 },
    myBookings: { page: 1, pageSize: 6 },
    technicians: { page: 1, pageSize: 5 },
    users: { page: 1, pageSize: 6 }
  },

  setPage(moduleName, newPage) {
    if (!this.pagination[moduleName]) return;
    this.pagination[moduleName].page = Math.max(1, newPage);
    if (moduleName === 'approval') this.renderApprovalBoard();
    else if (moduleName === 'myBookings') this.renderMyBookings();
    else if (moduleName === 'technicians') this.renderTechnicians();
    else if (moduleName === 'users') this.renderUsers();
  },

  renderPaginationHtml(moduleName, totalItems, currentPage, pageSize) {
    if (!totalItems || totalItems <= 0) return '';
    const totalPages = Math.ceil(totalItems / pageSize) || 1;
    if (currentPage > totalPages) currentPage = totalPages;
    const startIdx = (currentPage - 1) * pageSize + 1;
    const endIdx = Math.min(currentPage * pageSize, totalItems);

    let pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push('...');
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }

    const pagesHtml = pages.map(p => {
      if (p === '...') {
        return `<span class="px-2 py-1 text-slate-400 font-bold text-xs select-none">…</span>`;
      }
      const isActive = p === currentPage;
      return `
        <button type="button" onclick="BookingUI.setPage('${moduleName}', ${p})"
                class="min-w-[34px] h-8 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }">
          ${p}
        </button>
      `;
    }).join('');

    const hasPrev = currentPage > 1;
    const hasNext = currentPage < totalPages;

    return `
      <div class="px-4 py-3 bg-white border-t border-slate-100 rounded-b-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div class="text-slate-500 font-medium text-center sm:text-left">
          Hiển thị <strong class="text-slate-800 font-condensed font-bold">${startIdx}–${endIdx}</strong> trên tổng số <strong class="text-slate-800 font-condensed font-bold">${totalItems}</strong> bản ghi
        </div>
        <div class="flex items-center gap-1.5 flex-wrap justify-center">
          <button type="button" 
                  ${hasPrev ? `onclick="BookingUI.setPage('${moduleName}', ${currentPage - 1})"` : 'disabled'}
                  class="px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors flex items-center gap-1 font-semibold disabled:opacity-40 disabled:pointer-events-none cursor-pointer">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
            <span class="hidden sm:inline">Trước</span>
          </button>
          <div class="flex items-center gap-1">
            ${pagesHtml}
          </div>
          <button type="button" 
                  ${hasNext ? `onclick="BookingUI.setPage('${moduleName}', ${currentPage + 1})"` : 'disabled'}
                  class="px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors flex items-center gap-1 font-semibold disabled:opacity-40 disabled:pointer-events-none cursor-pointer">
            <span class="hidden sm:inline">Sau</span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    `;
  },

  init() {
    this.initDates();
    this.bindEvents();
    this.applyRolePermissions();
    this.initNotifications();
    this.initCalendarPicker();
    this.initCustomTechDropdown();
    this.initCustomDatePicker();
    // Render initial active tab (default 'overview') immediately on first load
    this.switchTab(this.activeTab || 'overview');
  },

  initDates() {
    const now = new Date();
    this.currentYear = now.getFullYear();
    this.currentMonth = now.getMonth();
  },

  bindEvents() {
    // Navigation (28 Days / 4 Weeks)
    const prevBtn = document.getElementById('btn-prev-period');
    const nextBtn = document.getElementById('btn-next-period');
    const todayBtn = document.getElementById('btn-period-today');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.prevPeriod());
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.nextPeriod());
    }

    if (todayBtn) {
      todayBtn.addEventListener('click', () => this.todayPeriod());
    }

    // Search technician & shifts (Global Search & Table Search)
    const handleSearch = (e) => {
      this.searchQuery = e.target.value.toLowerCase().trim();
      this.render();
    };

    const globalSearch = document.getElementById('global-search-input');
    if (globalSearch) globalSearch.addEventListener('input', handleSearch);

    const searchInput = document.getElementById('tech-search-input');
    if (searchInput) searchInput.addEventListener('input', handleSearch);

    // Booking Form Submission
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
      bookingForm.addEventListener('submit', (e) => this.handleBookingSubmit(e));
    }

    // Live conflict checker in form (Date Range)
    const techSelect = document.getElementById('modal-tech-id');
    const startDateField = document.getElementById('modal-booking-date');
    const endDateField = document.getElementById('modal-end-date');

    const checkFormConflict = () => {
      const techId = techSelect?.value;
      const sDate = startDateField?.value;
      const eDate = endDateField?.value || sDate;
      const alertBox = document.getElementById('modal-conflict-alert');

      if (techId && sDate) {
        const res = BookingData.checkConflict(techId, sDate, eDate);
        if (res.hasConflict) {
          alertBox.classList.remove('hidden');
          alertBox.querySelector('p').textContent = res.message;
        } else {
          alertBox.classList.add('hidden');
        }
      }
    };

    if (techSelect) {
      techSelect.addEventListener('change', (e) => {
        this.updateModalTechCard(e.target.value);
        checkFormConflict();
      });
    }
    if (startDateField) {
      startDateField.addEventListener('change', () => {
        if (endDateField && (!endDateField.value || endDateField.value < startDateField.value)) {
          endDateField.value = startDateField.value;
        }
        checkFormConflict();
      });
    }
    if (endDateField) {
      endDateField.addEventListener('change', checkFormConflict);
    }
  },

  prevPeriod() {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.render();
  },

  nextPeriod() {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.render();
  },

  todayPeriod() {
    this.initDates();
    this.render();
  },

  updateModalTechCard(techId) {
    const tech = BookingData.technicians.find(t => t.tech_id === techId) || BookingData.technicians[0];
    if (!tech) return;

    const avatarEl = document.getElementById('modal-tech-avatar');
    const labelEl = document.getElementById('modal-tech-selected-label');
    const nameEl = document.getElementById('modal-tech-name');
    const phoneEl = document.getElementById('modal-tech-phone');

    if (avatarEl) {
      avatarEl.src = tech.avatar;
      avatarEl.alt = tech.name;
    }
    if (labelEl) {
      labelEl.textContent = `${tech.name} • ${tech.phone}`;
    }
    if (nameEl) nameEl.textContent = tech.name;
    if (phoneEl) phoneEl.innerHTML = `<span class="inline-flex items-center gap-1.5 text-slate-500 font-medium">${Lucide.phone} SĐT: <strong class="text-slate-800 font-semibold">${tech.phone}</strong></span>`;
  },

  // Context-aware Tab Permissions (3 Roles + Granular Capabilities)
  applyRolePermissions() {
    const canViewSchedule = BookingData.hasPermission('view_schedule');
    const canViewApproval = BookingData.hasPermission('view_approval_queue');
    const canViewTechs = BookingData.hasPermission('view_technicians');
    const canViewUsers = BookingData.hasPermission('view_users');
    const canCreateBooking = BookingData.hasPermission('create_booking');
    const canManageTechs = BookingData.hasPermission('manage_technicians');
    const canManageUsers = BookingData.hasPermission('manage_users');

    const setElemVisible = (el, visible) => {
      if (!el) return;
      if (visible) {
        el.classList.remove('hidden');
        el.classList.add('flex');
      } else {
        el.classList.add('hidden');
        el.classList.remove('flex');
      }
    };

    const tabTimeline = document.getElementById('sidebar-tab-timeline');
    const tabApproval = document.getElementById('sidebar-tab-approval');
    const tabMyBookings = document.getElementById('sidebar-tab-my-bookings');
    const tabTechnicians = document.getElementById('sidebar-tab-technicians');
    const tabUsers = document.getElementById('sidebar-tab-users');
    const tabEmailSettings = document.getElementById('sidebar-tab-email-settings');

    const mobileTimeline = document.getElementById('mobile-tab-timeline');
    const mobileApproval = document.getElementById('mobile-tab-approval');
    const mobileTechnicians = document.getElementById('mobile-tab-technicians');
    const mobileUsers = document.getElementById('mobile-tab-users');
    const mobileEmailSettings = document.getElementById('mobile-tab-email-settings');

    const isAdmin = BookingData.currentUser?.role === 'admin';
    const canViewExtensions = isAdmin;

    // 1. Sidebar & Mobile Tabs Visibility
    setElemVisible(tabTimeline, canViewSchedule);
    setElemVisible(mobileTimeline, canViewSchedule);

    setElemVisible(tabMyBookings, true);

    setElemVisible(tabApproval, canViewApproval);
    setElemVisible(mobileApproval, canViewApproval);

    setElemVisible(tabTechnicians, canViewTechs);
    setElemVisible(mobileTechnicians, canViewTechs);

    setElemVisible(tabUsers, canViewUsers && isAdmin);
    setElemVisible(mobileUsers, canViewUsers && isAdmin);

    setElemVisible(tabEmailSettings, canViewExtensions);
    setElemVisible(mobileEmailSettings, canViewExtensions);

    const sideSettings = document.getElementById('sidebar-settings-group');
    const mobileSettings = document.getElementById('mobile-settings-group');
    const canSeeSettings = isAdmin && (canViewUsers || canManageUsers || BookingData.hasPermission('manage_permissions'));
    if (sideSettings) sideSettings.classList.toggle('hidden', !canSeeSettings);
    if (mobileSettings) mobileSettings.classList.toggle('hidden', !canSeeSettings);

    const topEmailBtn = document.getElementById('top-menu-email-settings-btn');
    if (topEmailBtn) topEmailBtn.classList.toggle('hidden', !isAdmin);

    // 2. Action Buttons Visibility across panels
    const btnQuickNew = document.getElementById('btn-quick-new-booking');
    if (btnQuickNew) btnQuickNew.classList.toggle('hidden', !canCreateBooking);

    const btnOpenTech = document.getElementById('btn-open-tech-modal');
    if (btnOpenTech) btnOpenTech.classList.toggle('hidden', !canManageTechs);

    const btnOpenUser = document.getElementById('btn-open-user-modal');
    if (btnOpenUser) btnOpenUser.classList.toggle('hidden', !canManageUsers);

    // 3. Fallback if current active tab is not permitted for this user
    let targetTab = this.activeTab;
    if (targetTab === 'timeline' && !canViewSchedule) targetTab = 'my-bookings';
    if (targetTab === 'approval' && !canViewApproval) targetTab = canViewSchedule ? 'timeline' : 'my-bookings';
    if (targetTab === 'technicians' && !canViewTechs) targetTab = canViewSchedule ? 'timeline' : 'my-bookings';
    if (targetTab === 'users' && (!canViewUsers || !isAdmin)) targetTab = canViewSchedule ? 'timeline' : 'my-bookings';
    if (targetTab === 'email-settings' && !canViewExtensions) targetTab = 'my-bookings';
    if (targetTab !== this.activeTab) {
      this.switchTab(targetTab);
    }

    // 4. Extensions Visibility (User bình thường không thấy - chuẩn bị phân quyền tương lai)
    const sideExt = document.getElementById('sidebar-extensions-group');
    const overExt = document.getElementById('overview-extensions-group');
    if (sideExt) sideExt.classList.toggle('hidden', !canViewExtensions);
    if (overExt) overExt.classList.toggle('hidden', !canViewExtensions);

    if (targetTab === 'email-settings' && !canViewExtensions) {
      this.switchTab('my-bookings');
    }
  },

  // ==========================================
  // NOTIFICATION CENTER SYSTEM
  // ==========================================
  notificationFilter: 'all',

  initNotifications() {
    if (typeof BookingData !== 'undefined' && BookingData.initNotificationsData) {
      BookingData.initNotificationsData();
    }

    const btnBell = document.getElementById('btn-notification-bell');
    const dropdown = document.getElementById('notification-dropdown');
    const btnMarkAll = document.getElementById('btn-mark-all-read');
    const filterAll = document.getElementById('notif-filter-all');
    const filterUnread = document.getElementById('notif-filter-unread');
    const btnViewAll = document.getElementById('btn-view-all-notifications');

    if (btnBell && dropdown) {
      btnBell.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = dropdown.classList.contains('hidden');
        if (isHidden) {
          dropdown.classList.remove('hidden');
          btnBell.setAttribute('aria-expanded', 'true');
        } else {
          dropdown.classList.add('hidden');
          btnBell.setAttribute('aria-expanded', 'false');
        }
      });

      // Close dropdown on click outside
      document.addEventListener('click', (e) => {
        const wrapper = document.getElementById('notification-wrapper');
        if (wrapper && !wrapper.contains(e.target)) {
          dropdown.classList.add('hidden');
          btnBell.setAttribute('aria-expanded', 'false');
        }
      });

      // Close on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !dropdown.classList.contains('hidden')) {
          dropdown.classList.add('hidden');
          btnBell.setAttribute('aria-expanded', 'false');
        }
      });
    }

    if (btnMarkAll) {
      btnMarkAll.addEventListener('click', () => {
        BookingData.markAllNotificationsRead();
        this.renderNotifications();
        if (typeof Toast !== 'undefined') {
          Toast.show('Đã đánh dấu tất cả thông báo là đã đọc.', 'info', 'Đã đọc');
        }
      });
    }

    const btnClearAll = document.getElementById('btn-clear-all-notifs');
    if (btnClearAll) {
      btnClearAll.addEventListener('click', (e) => {
        e.stopPropagation();
        this.clearAllNotificationsAction();
      });
    }

    if (filterAll) {
      filterAll.addEventListener('click', () => {
        this.notificationFilter = 'all';
        this.renderNotifications();
      });
    }

    if (filterUnread) {
      filterUnread.addEventListener('click', () => {
        this.notificationFilter = 'unread';
        this.renderNotifications();
      });
    }

    if (btnViewAll) {
      btnViewAll.addEventListener('click', () => {
        if (dropdown) dropdown.classList.add('hidden');
        const canApprove = BookingData.hasPermission('view_approval_queue');
        this.switchTab(canApprove ? 'approval' : 'my-bookings');
      });
    }

    this.renderNotifications();
  },

  deleteNotificationItem(notifId, event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    BookingData.deleteNotification(notifId);
    this.renderNotifications();
    if (typeof Toast !== 'undefined') {
      Toast.show('Đã xóa thông báo.', 'info', 'Đã xóa');
    }
  },

  clearAllNotificationsAction() {
    BookingData.clearAllNotifications();
    this.renderNotifications();
    if (typeof Toast !== 'undefined') {
      Toast.show('Đã xóa tất cả thông báo.', 'info', 'Đã dọn sạch');
    }
  },

  renderNotifications() {
    const listEl = document.getElementById('notification-list');
    const badgeDot = document.getElementById('notification-badge-dot');
    const unreadCountEl = document.getElementById('notification-unread-count');
    const filterAllBtn = document.getElementById('notif-filter-all');
    const filterUnreadBtn = document.getElementById('notif-filter-unread');

    const allNotifications = BookingData.getNotifications('all');
    const unreadCount = BookingData.getUnreadNotificationsCount();
    const filteredNotifications = BookingData.getNotifications(this.notificationFilter);

    // Update red unread dot on bell
    if (badgeDot) {
      if (unreadCount > 0) {
        badgeDot.classList.remove('hidden');
      } else {
        badgeDot.classList.add('hidden');
      }
    }

    // Update unread count badge in header
    if (unreadCountEl) {
      if (unreadCount > 0) {
        unreadCountEl.textContent = `${unreadCount} mới`;
        unreadCountEl.className = 'px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-burgundy-100 text-burgundy-800 font-condensed';
      } else {
        unreadCountEl.textContent = '0 mới';
        unreadCountEl.className = 'px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 font-condensed';
      }
    }

    // Update filter tabs styling
    if (filterAllBtn) {
      filterAllBtn.textContent = `Tất cả (${allNotifications.length})`;
      if (this.notificationFilter === 'all') {
        filterAllBtn.className = 'px-2.5 py-1 rounded-lg bg-white shadow-2xs border border-slate-200 text-brand-600 font-semibold cursor-pointer transition-all';
      } else {
        filterAllBtn.className = 'px-2.5 py-1 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-white/60 transition-all cursor-pointer';
      }
    }
    if (filterUnreadBtn) {
      filterUnreadBtn.textContent = `Chưa đọc (${unreadCount})`;
      if (this.notificationFilter === 'unread') {
        filterUnreadBtn.className = 'px-2.5 py-1 rounded-lg bg-white shadow-2xs border border-slate-200 text-brand-600 font-semibold cursor-pointer transition-all';
      } else {
        filterUnreadBtn.className = 'px-2.5 py-1 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-white/60 transition-all cursor-pointer';
      }
    }

    if (!listEl) return;

    if (filteredNotifications.length === 0) {
      const isRequester = BookingData.currentUser?.role === 'requester';
      const emptyDesc = isRequester
        ? 'Mọi cập nhật trạng thái đơn đặt lịch của bạn sẽ hiển thị tại đây.'
        : 'Mọi cập nhật điều phối ca và phê duyệt sẽ hiển thị tại đây.';

      listEl.innerHTML = `
        <div class="py-8 px-4 text-center">
          <div class="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-2.5">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
          </div>
          <p class="text-xs font-bold text-slate-700">Không có thông báo nào</p>
          <p class="text-[11px] text-slate-400 mt-0.5">${emptyDesc}</p>
        </div>
      `;
      return;
    }

    listEl.innerHTML = filteredNotifications.map(item => {
      let iconMarkup = '';
      if (item.type === 'approval_success') {
        iconMarkup = `
          <div class="w-8 h-8 rounded-xl bg-accent-50 text-accent-700 border border-accent-100 flex items-center justify-center flex-shrink-0">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
          </div>`;
      } else if (item.type === 'new_request') {
        iconMarkup = `
          <div class="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center flex-shrink-0">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>`;
      } else if (item.type === 'conflict_alert') {
        iconMarkup = `
          <div class="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center flex-shrink-0">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          </div>`;
      } else {
        iconMarkup = `
          <div class="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center flex-shrink-0">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          </div>`;
      }

      const unreadBg = !item.read ? 'bg-slate-50/70 hover:bg-slate-100/80' : 'bg-white hover:bg-slate-50';

      return `
        <div onclick="BookingUI.handleNotificationClick('${item.id}', '${item.booking_id || ''}', '${item.tab || ''}')" 
             class="group p-3.5 flex items-start gap-3 transition-colors cursor-pointer relative ${unreadBg}">
          ${iconMarkup}
          <div class="flex-1 min-w-0 pr-1">
            <div class="flex items-center justify-between gap-1 mb-0.5">
              <h4 class="text-xs font-bold text-slate-800 truncate">${item.title}</h4>
              <span class="text-[10px] text-slate-400 font-medium whitespace-nowrap">${item.time}</span>
            </div>
            <p class="text-[11px] text-slate-600 leading-relaxed line-clamp-2">${item.message}</p>
          </div>
          <div class="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
            ${!item.read ? '<span class="w-2 h-2 rounded-full bg-brand-500 flex-shrink-0"></span>' : ''}
            <button type="button" onclick="BookingUI.deleteNotificationItem('${item.id}', event)" class="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer opacity-70 hover:opacity-100" title="Xóa thông báo">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </div>
        </div>
      `;
    }).join('');
  },

  handleNotificationClick(notifId, bookingId, targetTab) {
    BookingData.markNotificationRead(notifId);
    this.renderNotifications();

    const dropdown = document.getElementById('notification-dropdown');
    if (dropdown) dropdown.classList.add('hidden');

    if (bookingId) {
      const canViewSchedule = BookingData.hasPermission('view_schedule');
      const isSuper = BookingData.isSuperAdmin ? BookingData.isSuperAdmin() : (BookingData.currentUser?.role === 'admin');
      if (canViewSchedule || isSuper) {
        this.openDetailModal(bookingId);
      } else {
        this.switchTab('my-bookings');
        this.openDetailModal(bookingId);
      }
    } else if (targetTab) {
      if (targetTab === 'approval' && !BookingData.hasPermission('view_approval_queue')) {
        this.switchTab('my-bookings');
        return;
      }
      if (targetTab === 'technicians' && !BookingData.hasPermission('view_technicians')) {
        this.switchTab('my-bookings');
        return;
      }
      if (targetTab === 'users' && (!BookingData.hasPermission('view_users') || BookingData.currentUser?.role !== 'admin')) {
        this.switchTab('my-bookings');
        return;
      }
      if (targetTab === 'email-settings' && BookingData.currentUser?.role !== 'admin') {
        this.switchTab('my-bookings');
        return;
      }
      this.switchTab(targetTab);
    }
  },

  // ==========================================
  // CALENDAR MONTH/YEAR DROPDOWN PICKER
  // ==========================================
  pickerYear: 2026,

  initCalendarPicker() {
    const btn = document.getElementById('btn-calendar-month-dropdown');
    const dropdown = document.getElementById('calendar-month-dropdown');
    const chevron = document.getElementById('calendar-dropdown-chevron');
    const wrapper = document.getElementById('calendar-month-picker-wrapper');
    const prevYearBtn = document.getElementById('btn-picker-prev-year');
    const nextYearBtn = document.getElementById('btn-picker-next-year');
    const todayBtn = document.getElementById('btn-picker-today');

    if (btn && dropdown) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = dropdown.classList.contains('hidden');
        if (isHidden) {
          this.pickerYear = this.currentYear;
          this.renderPickerMonths();
          dropdown.classList.remove('hidden');
          btn.setAttribute('aria-expanded', 'true');
          if (chevron) chevron.classList.add('rotate-180');
          // Close notification dropdown if open
          const notifDropdown = document.getElementById('notification-dropdown');
          if (notifDropdown) notifDropdown.classList.add('hidden');
        } else {
          dropdown.classList.add('hidden');
          btn.setAttribute('aria-expanded', 'false');
          if (chevron) chevron.classList.remove('rotate-180');
        }
      });

      document.addEventListener('click', (e) => {
        if (wrapper && !wrapper.contains(e.target)) {
          dropdown.classList.add('hidden');
          btn.setAttribute('aria-expanded', 'false');
          if (chevron) chevron.classList.remove('rotate-180');
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !dropdown.classList.contains('hidden')) {
          dropdown.classList.add('hidden');
          btn.setAttribute('aria-expanded', 'false');
          if (chevron) chevron.classList.remove('rotate-180');
        }
      });
    }

    if (prevYearBtn) {
      prevYearBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.pickerYear--;
        this.renderPickerMonths();
      });
    }

    if (nextYearBtn) {
      nextYearBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.pickerYear++;
        this.renderPickerMonths();
      });
    }

    if (todayBtn) {
      todayBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.todayPeriod();
        if (dropdown) dropdown.classList.add('hidden');
        if (btn) btn.setAttribute('aria-expanded', 'false');
        if (chevron) chevron.classList.remove('rotate-180');
      });
    }
  },

  renderPickerMonths() {
    const yearEl = document.getElementById('picker-year-display');
    const gridEl = document.getElementById('picker-months-grid');
    if (yearEl) yearEl.textContent = this.pickerYear;
    if (!gridEl) return;

    const monthNames = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
    gridEl.innerHTML = monthNames.map((name, idx) => {
      const isSelected = this.currentMonth === idx && this.currentYear === this.pickerYear;
      const activeClass = isSelected 
        ? 'bg-brand-600 text-white font-bold shadow-xs' 
        : 'text-slate-700 hover:bg-slate-100 font-semibold hover:text-slate-900';
      return `
        <button type="button" onclick="BookingUI.selectCalendarMonth(${this.pickerYear}, ${idx})" class="py-2.5 px-1.5 rounded-xl text-center text-xs transition-all cursor-pointer ${activeClass}">
          ${name}
        </button>
      `;
    }).join('');
  },

  selectCalendarMonth(year, monthIdx) {
    this.currentYear = year;
    this.currentMonth = monthIdx;
    this.render();

    const dropdown = document.getElementById('calendar-month-dropdown');
    const btn = document.getElementById('btn-calendar-month-dropdown');
    const chevron = document.getElementById('calendar-dropdown-chevron');
    if (dropdown) dropdown.classList.add('hidden');
    if (btn) btn.setAttribute('aria-expanded', 'false');
    if (chevron) chevron.classList.remove('rotate-180');
  },

  // ==========================================
  // CUSTOM TECHNICIAN DROPDOWN IN MODAL
  // ==========================================
  initCustomTechDropdown() {
    const trigger = document.getElementById('modal-tech-custom-trigger');
    const menu = document.getElementById('modal-tech-custom-menu');
    const chevron = document.getElementById('modal-tech-chevron');
    const wrapper = document.getElementById('modal-tech-dropdown-wrapper');

    if (trigger && menu) {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = menu.classList.contains('hidden');
        if (isHidden) {
          const currentId = document.getElementById('modal-tech-id')?.value;
          this.renderCustomTechOptions(currentId);
          menu.classList.remove('hidden');
          trigger.setAttribute('aria-expanded', 'true');
          if (chevron) chevron.classList.add('rotate-180');
        } else {
          menu.classList.add('hidden');
          trigger.setAttribute('aria-expanded', 'false');
          if (chevron) chevron.classList.remove('rotate-180');
        }
      });

      document.addEventListener('click', (e) => {
        if (wrapper && !wrapper.contains(e.target)) {
          menu.classList.add('hidden');
          trigger.setAttribute('aria-expanded', 'false');
          if (chevron) chevron.classList.remove('rotate-180');
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !menu.classList.contains('hidden')) {
          menu.classList.add('hidden');
          trigger.setAttribute('aria-expanded', 'false');
          if (chevron) chevron.classList.remove('rotate-180');
        }
      });
    }
  },

  renderCustomTechOptions(selectedTechId) {
    const menu = document.getElementById('modal-tech-custom-menu');
    if (!menu) return;

    menu.innerHTML = BookingData.technicians.map(t => {
      const isSelected = t.tech_id === selectedTechId;
      return `
        <div onclick="BookingUI.selectCustomTech('${t.tech_id}')" 
             class="p-2.5 flex items-center justify-between gap-3 hover:bg-slate-50 cursor-pointer transition-colors ${isSelected ? 'bg-brand-50/70 font-semibold' : ''}">
          <div class="flex items-center gap-2.5 min-w-0">
            <img src="${t.avatar}" class="w-8 h-8 rounded-full object-cover border border-slate-200 shadow-2xs flex-shrink-0" alt="${t.name}">
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <h5 class="text-xs font-bold text-slate-900 truncate">${t.name}</h5>
                <span class="text-[10px] text-slate-500 font-medium">${t.phone}</span>
              </div>
              <p class="text-[10px] text-slate-400 truncate mt-0.5">${t.skills.join(' • ')}</p>
            </div>
          </div>
          ${isSelected ? `<svg class="w-4 h-4 text-brand-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>` : ''}
        </div>
      `;
    }).join('');
  },

  selectCustomTech(techId) {
    const techSelect = document.getElementById('modal-tech-id');
    if (techSelect) {
      techSelect.value = techId;
      techSelect.dispatchEvent(new Event('change'));
    }

    this.updateModalTechCard(techId);

    const menu = document.getElementById('modal-tech-custom-menu');
    const trigger = document.getElementById('modal-tech-custom-trigger');
    const chevron = document.getElementById('modal-tech-chevron');

    if (menu) menu.classList.add('hidden');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
    if (chevron) chevron.classList.remove('rotate-180');
  },

  // ==========================================
  // CUSTOM DATE RANGE PICKER COMPONENT
  // ==========================================
  dpTarget: 'start', // 'start' | 'end'
  dpYear: 2026,
  dpMonth: 10,

  formatDateDisplay(dateStr) {
    if (!dateStr) return '--/--/----';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateStr;
  },

  updateModalDateRangeDisplay(startDate, endDate) {
    const sDate = startDate || BookingData.formatDateStr(new Date());
    const eDate = (endDate && endDate >= sDate) ? endDate : sDate;

    const startInput = document.getElementById('modal-booking-date');
    const endInput = document.getElementById('modal-end-date');
    if (startInput) startInput.value = sDate;
    if (endInput) endInput.value = eDate;

    const d1 = new Date(sDate);
    const d2 = new Date(eDate);
    const diffDays = Math.max(1, Math.round((d2 - d1) / (1000 * 60 * 60 * 24)) + 1);

    const rangeLabel = document.getElementById('label-modal-daterange');
    const rangeSublabel = document.getElementById('sublabel-modal-daterange');
    const durationTag = document.getElementById('label-modal-duration-tag');

    if (diffDays === 1) {
      if (rangeLabel) rangeLabel.textContent = this.formatDateDisplay(sDate);
      if (rangeSublabel) rangeSublabel.textContent = 'Ca 1 ngày • Nhấp để đổi hoặc chọn dải ngày';
      if (durationTag) {
        durationTag.textContent = '1 ngày';
        durationTag.className = 'text-[11px] font-bold text-brand-600 font-condensed bg-brand-50 px-2 py-0.5 rounded-full border border-brand-100';
      }
    } else {
      if (rangeLabel) rangeLabel.textContent = `${this.formatDateDisplay(sDate)} → ${this.formatDateDisplay(eDate)}`;
      if (rangeSublabel) rangeSublabel.textContent = `Ca liên ngày (${diffDays} ngày) • Nhấp để đổi lịch`;
      if (durationTag) {
        durationTag.textContent = `${diffDays} ngày`;
        durationTag.className = 'text-[11px] font-bold text-brand-700 font-condensed bg-brand-50 px-2 py-0.5 rounded-full border border-brand-100';
      }
    }

    // Keep hidden fallback labels in sync for backward compatibility
    const labelStart = document.getElementById('label-modal-start-date');
    const labelEnd = document.getElementById('label-modal-end-date');
    if (labelStart) labelStart.textContent = this.formatDateDisplay(sDate);
    if (labelEnd) labelEnd.textContent = this.formatDateDisplay(eDate);

    // Trigger conflict check & change listeners
    if (startInput) startInput.dispatchEvent(new Event('change'));
    if (endInput) endInput.dispatchEvent(new Event('change'));
  },

  initCustomDatePicker() {
    const btnRange = document.getElementById('btn-modal-daterange');
    const btnStart = document.getElementById('btn-modal-start-date');
    const btnEnd = document.getElementById('btn-modal-end-date');
    const dropdown = document.getElementById('modal-datepicker-dropdown');
    const wrapper = document.getElementById('modal-daterange-picker-wrapper');
    const prevMonthBtn = document.getElementById('btn-dp-prev-month');
    const nextMonthBtn = document.getElementById('btn-dp-next-month');

    this.rangeStep = 0;
    this.hoverDate = null;

    if (btnRange) {
      btnRange.addEventListener('click', (e) => {
        e.stopPropagation();
        this.openCustomDatePicker();
      });
    }

    if (btnStart) {
      btnStart.addEventListener('click', (e) => {
        e.stopPropagation();
        this.openCustomDatePicker();
      });
    }

    if (btnEnd) {
      btnEnd.addEventListener('click', (e) => {
        e.stopPropagation();
        this.openCustomDatePicker();
      });
    }

    if (prevMonthBtn) {
      prevMonthBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.dpMonth--;
        if (this.dpMonth < 0) {
          this.dpMonth = 11;
          this.dpYear--;
        }
        this.renderDatePickerGrid();
      });
    }

    if (nextMonthBtn) {
      nextMonthBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.dpMonth++;
        if (this.dpMonth > 11) {
          this.dpMonth = 0;
          this.dpYear++;
        }
        this.renderDatePickerGrid();
      });
    }

    document.addEventListener('click', (e) => {
      // Ignore clicks on elements that got detached during execution (e.g. innerHTML updates)
      if (e.target && !e.target.isConnected) return;
      if (wrapper && !wrapper.contains(e.target)) {
        this.closeCustomDatePicker();
      }
      const detailWrapper = document.getElementById('detail-daterange-picker-wrapper');
      if (detailWrapper && !detailWrapper.contains(e.target)) {
        this.closeDetailDatePicker();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeCustomDatePicker();
        this.closeDetailDatePicker();
      }
    });
  },

  openCustomDatePicker() {
    const dropdown = document.getElementById('modal-datepicker-dropdown');
    if (!dropdown) return;

    // Close tech dropdown if open
    const techMenu = document.getElementById('modal-tech-custom-menu');
    const techTrigger = document.getElementById('modal-tech-custom-trigger');
    const techChevron = document.getElementById('modal-tech-chevron');
    if (techMenu) techMenu.classList.add('hidden');
    if (techTrigger) techTrigger.setAttribute('aria-expanded', 'false');
    if (techChevron) techChevron.classList.remove('rotate-180');

    const currentVal = document.getElementById('modal-booking-date')?.value || BookingData.formatDateStr(new Date());
    const [y, m] = currentVal.split('-').map(Number);
    if (y && m) {
      this.dpYear = y;
      this.dpMonth = m - 1;
    }

    this.rangeStep = 0;
    this.rangeStart = currentVal;
    this.hoverDate = null;
    this.renderDatePickerGrid();
    dropdown.classList.remove('hidden');
  },

  closeCustomDatePicker() {
    const dropdown = document.getElementById('modal-datepicker-dropdown');
    if (dropdown) dropdown.classList.add('hidden');

    // If user clicked 1 date and then closed/pressed Done, finalize as a 1-day shift
    if (this.rangeStep === 1) {
      const sDate = this.rangeStart || document.getElementById('modal-booking-date')?.value;
      if (sDate) {
        this.updateModalDateRangeDisplay(sDate, sDate);
      }
    }
    this.rangeStep = 0;
    this.rangeStart = null;
    this.hoverDate = null;
  },

  renderDatePickerGrid() {
    const badge = document.getElementById('datepicker-target-badge');
    const headerTitle = document.getElementById('datepicker-month-year');
    const gridEl = document.getElementById('datepicker-days-grid');
    const instructionText = document.getElementById('datepicker-instruction-text');
    const instructionDot = document.getElementById('datepicker-instruction-dot');
    if (!gridEl) return;

    const monthNames = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
    if (headerTitle) {
      headerTitle.textContent = `${monthNames[this.dpMonth]}, ${this.dpYear}`;
    }

    const startDateVal = document.getElementById('modal-booking-date')?.value || '';
    const endDateVal = document.getElementById('modal-end-date')?.value || '';
    const todayStr = BookingData.formatDateStr(new Date());

    if (badge && instructionText) {
      if (this.rangeStep === 1) {
        badge.textContent = 'Mốc thứ 2';
        badge.className = 'px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-50 text-amber-700 font-condensed border border-amber-200/80';
        instructionText.textContent = `Đã chọn: ${this.formatDateDisplay(startDateVal)}. Nhấp ngày thứ 2 để đặt ca liên ngày, hoặc nhấp lại để xong.`;
        if (instructionDot) instructionDot.className = 'w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0 animate-ping';
      } else {
        badge.textContent = '1 Lịch chọn dải ngày';
        badge.className = 'px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-brand-50 text-brand-700 font-condensed border border-brand-100';
        instructionText.textContent = 'Nhấp 1 ngày để chọn ca 1 ngày. Nhấp ngày thứ 2 để đặt ca liên ngày.';
        if (instructionDot) instructionDot.className = 'w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0 animate-pulse';
      }
    }

    const firstDayOfMonth = new Date(this.dpYear, this.dpMonth, 1);
    const daysInMonth = new Date(this.dpYear, this.dpMonth + 1, 0).getDate();

    // Monday-based offset (0: Monday -> 6: Sunday)
    const dayOfWeek = firstDayOfMonth.getDay();
    const startOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    let html = '';

    // Empty lead cells
    for (let i = 0; i < startOffset; i++) {
      html += `<div class="py-2"></div>`;
    }

    // Days in current month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayStr = `${this.dpYear}-${String(this.dpMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isPast = dayStr < todayStr;
      const isToday = dayStr === todayStr;

      let cellClass = 'py-2 text-center font-bold text-xs transition-all ';

      if (isPast) {
        cellClass += 'opacity-25 text-slate-400 cursor-not-allowed pointer-events-none rounded-xl ';
      } else if (this.rangeStep === 1) {
        // Range selection mode in progress
        const isStart = dayStr === startDateVal;
        const isHover = this.hoverDate && this.hoverDate > startDateVal && dayStr > startDateVal && dayStr < this.hoverDate;
        const isHoverEnd = this.hoverDate && dayStr === this.hoverDate && dayStr > startDateVal;

        if (isStart) {
          cellClass += 'bg-brand-600 text-white font-extrabold shadow-xs cursor-pointer rounded-xl ring-2 ring-brand-300 ';
        } else if (isHoverEnd) {
          cellClass += 'bg-brand-600 text-white font-extrabold shadow-xs cursor-pointer rounded-r-xl ';
        } else if (isHover) {
          cellClass += 'bg-brand-50 text-brand-700 font-bold hover:bg-brand-100 cursor-pointer rounded-none ';
        } else {
          cellClass += 'text-slate-800 hover:bg-slate-100 rounded-xl cursor-pointer ';
          if (isToday) cellClass += 'ring-1 ring-brand-500/50 text-brand-600 ';
        }
      } else {
        // Idle mode (confirmed range)
        const isStart = dayStr === startDateVal;
        const isEnd = dayStr === endDateVal;
        const isSingle = isStart && isEnd;
        const isInRange = startDateVal && endDateVal && dayStr > startDateVal && dayStr < endDateVal;

        if (isSingle) {
          cellClass += 'bg-brand-600 text-white font-extrabold shadow-xs cursor-pointer rounded-xl ';
        } else if (isStart) {
          cellClass += 'bg-brand-600 text-white font-extrabold shadow-xs cursor-pointer rounded-l-xl rounded-r-none ';
        } else if (isEnd) {
          cellClass += 'bg-brand-600 text-white font-extrabold shadow-xs cursor-pointer rounded-r-xl rounded-l-none ';
        } else if (isInRange) {
          cellClass += 'bg-brand-50 text-brand-700 font-bold hover:bg-brand-100 cursor-pointer rounded-none ';
        } else {
          cellClass += 'text-slate-800 hover:bg-slate-100 rounded-xl cursor-pointer ';
          if (isToday) cellClass += 'ring-1 ring-brand-500/50 text-brand-600 ';
        }
      }

      html += `
        <button type="button" 
                data-date="${dayStr}"
                onclick="event.stopPropagation(); BookingUI.selectDatePickerDate('${dayStr}', event)" 
                onmouseenter="BookingUI.handleDatePickerHover('${dayStr}')"
                class="${cellClass}" 
                ${isPast ? 'disabled' : ''}>
          ${day}
        </button>
      `;
    }

    gridEl.innerHTML = html;
  },

  handleDatePickerHover(dateStr) {
    if (this.rangeStep !== 1) return;
    const currentStart = this.rangeStart || document.getElementById('modal-booking-date')?.value;
    if (!currentStart || dateStr <= currentStart) {
      if (this.hoverDate) {
        this.hoverDate = null;
        this.renderDatePickerGrid();
      }
      return;
    }
    if (this.hoverDate === dateStr) return;
    this.hoverDate = dateStr;
    this.renderDatePickerGrid();
  },

  handleDatePickerMouseLeave() {
    if (this.rangeStep === 1 && this.hoverDate) {
      this.hoverDate = null;
      this.renderDatePickerGrid();
    }
  },

  selectDatePickerDate(dateStr, event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const todayStr = BookingData.formatDateStr(new Date());
    if (dateStr < todayStr) return;

    const dropdown = document.getElementById('modal-datepicker-dropdown');

    if (this.rangeStep === 0) {
      // First click: select 1 day, keep dropdown open and wait for 2nd click!
      this.rangeStep = 1;
      this.rangeStart = dateStr;
      this.hoverDate = null;
      this.updateModalDateRangeDisplay(dateStr, dateStr);
      this.renderDatePickerGrid();
      if (dropdown) dropdown.classList.remove('hidden');
    } else {
      // Second click:
      const currentStart = this.rangeStart || document.getElementById('modal-booking-date')?.value || todayStr;
      if (dateStr === currentStart) {
        // User clicked the exact same date again -> Confirms 1-day shift!
        this.updateModalDateRangeDisplay(dateStr, dateStr);
        this.rangeStep = 0;
        this.rangeStart = null;
        this.hoverDate = null;
        this.closeCustomDatePicker();
        Toast.show(`Đã xác nhận ca 1 ngày: ${this.formatDateDisplay(dateStr)}`, 'info', 'Thời gian');
      } else if (dateStr > currentStart) {
        // User clicked a later date -> Range shift from currentStart to dateStr!
        this.updateModalDateRangeDisplay(currentStart, dateStr);
        this.rangeStep = 0;
        this.rangeStart = null;
        this.hoverDate = null;
        this.closeCustomDatePicker();
        const d1 = new Date(currentStart);
        const d2 = new Date(dateStr);
        const diffDays = Math.max(1, Math.round((d2 - d1) / (1000 * 60 * 60 * 24)) + 1);
        Toast.show(`Đã chọn ca liên ngày (${diffDays} ngày): ${this.formatDateDisplay(currentStart)} → ${this.formatDateDisplay(dateStr)}`, 'info', 'Thời gian');
      } else {
        // User clicked an earlier date -> Reset start date to this earlier date
        this.rangeStart = dateStr;
        this.updateModalDateRangeDisplay(dateStr, dateStr);
        this.rangeStep = 1;
        this.hoverDate = null;
        this.renderDatePickerGrid();
        if (dropdown) dropdown.classList.remove('hidden');
      }
    }
  },

  setDatePickerQuick(type) {
    const today = new Date();
    const todayStr = BookingData.formatDateStr(today);
    let sDate = todayStr;
    let eDate = todayStr;

    if (type === 'today') {
      sDate = todayStr;
      eDate = todayStr;
    } else if (type === 'tomorrow') {
      const d = new Date(today);
      d.setDate(d.getDate() + 1);
      sDate = BookingData.formatDateStr(d);
      eDate = sDate;
    } else if (type === 'plus3') {
      sDate = todayStr;
      const d = new Date(today);
      d.setDate(d.getDate() + 2); // 3 days: today, today+1, today+2
      eDate = BookingData.formatDateStr(d);
    } else if (type === 'plus7') {
      sDate = todayStr;
      const d = new Date(today);
      d.setDate(d.getDate() + 6); // 7 days (1 week)
      eDate = BookingData.formatDateStr(d);
    }

    this.rangeStep = 0;
    this.hoverDate = null;
    this.updateModalDateRangeDisplay(sDate, eDate);
    this.closeCustomDatePicker();
  },

  switchTab(tabName) {
    const canViewSchedule = BookingData.hasPermission('view_schedule');
    const canViewApproval = BookingData.hasPermission('view_approval_queue');
    const canViewTechs = BookingData.hasPermission('view_technicians');
    const canViewUsers = BookingData.hasPermission('view_users');

    // 🛡️ BẢO VỆ PHÂN QUYỀN
    if (tabName === 'timeline' && !canViewSchedule) tabName = 'my-bookings';
    if (tabName === 'approval' && !canViewApproval) tabName = canViewSchedule ? 'timeline' : 'my-bookings';
    if (tabName === 'technicians' && !canViewTechs) tabName = canViewSchedule ? 'timeline' : 'my-bookings';
    if (tabName === 'users' && (!canViewUsers || BookingData.currentUser?.role !== 'admin')) tabName = canViewSchedule ? 'timeline' : 'my-bookings';
    if (tabName === 'email-settings' && BookingData.currentUser?.role !== 'admin') tabName = 'my-bookings';

    this.activeTab = tabName;

    // 1. Cập nhật trạng thái Active tab mà KHÔNG ghi đè làm mất class 'hidden'
    document.querySelectorAll('.booking-nav-tab').forEach(btn => {
      const isCurrent = btn.dataset.tab === tabName;
      if (isCurrent) {
        btn.classList.add('bg-brand-600', 'text-white', 'shadow-xs', 'font-semibold');
        btn.classList.remove('bg-slate-900', 'text-slate-600', 'hover:text-slate-900', 'hover:bg-slate-100', 'font-medium');
      } else {
        btn.classList.remove('bg-brand-600', 'bg-slate-900', 'text-white', 'shadow-xs', 'font-semibold');
        btn.classList.add('text-slate-600', 'hover:text-slate-900', 'hover:bg-slate-100', 'font-medium');
      }
    });

    this.applyRolePermissions();

    // 2. Dynamic Page Titles & Subtitles matching Monty Style
    const titleEl = document.getElementById('page-main-title');
    const breadcrumbCurrentEl = document.getElementById('page-breadcrumb-current');

    if (tabName === 'overview') {
      if (titleEl) titleEl.textContent = 'Tổng Quan Workspace';
      if (breadcrumbCurrentEl) breadcrumbCurrentEl.textContent = 'Tổng Quan';
    } else if (tabName === 'timeline') {
      if (titleEl) titleEl.textContent = 'Lịch Kỹ Thuật';
      if (breadcrumbCurrentEl) breadcrumbCurrentEl.textContent = 'Lịch Kỹ Thuật';
    } else if (tabName === 'approval') {
      if (titleEl) titleEl.textContent = 'Duyệt Yêu Cầu';
      if (breadcrumbCurrentEl) breadcrumbCurrentEl.textContent = 'Duyệt Yêu Cầu';
    } else if (tabName === 'my-bookings') {
      if (titleEl) titleEl.textContent = 'Lịch Sử Điều Phối';
      if (breadcrumbCurrentEl) breadcrumbCurrentEl.textContent = 'Lịch Sử Điều Phối';
    } else if (tabName === 'technicians') {
      if (titleEl) titleEl.textContent = 'Đội Ngũ Kỹ Sư';
      if (breadcrumbCurrentEl) breadcrumbCurrentEl.textContent = 'Kỹ Sư & Năng Lực';
    } else if (tabName === 'users') {
      if (titleEl) titleEl.textContent = 'Người Dùng & Phân Quyền';
      if (breadcrumbCurrentEl) breadcrumbCurrentEl.textContent = 'Quản Trị Người Dùng';
    } else if (tabName === 'email-settings') {
      if (titleEl) titleEl.textContent = 'Mẫu Email & Lịch Invite';
      if (breadcrumbCurrentEl) breadcrumbCurrentEl.textContent = 'Cấu Hình Email & ICS';
    }

    const overviewPanel = document.getElementById('panel-overview');
    const timelinePanel = document.getElementById('panel-timeline');
    const approvalPanel = document.getElementById('panel-approval');
    const myBookingsPanel = document.getElementById('panel-my-bookings');
    const techniciansPanel = document.getElementById('panel-technicians');
    const usersPanel = document.getElementById('panel-users');
    const emailSettingsPanel = document.getElementById('panel-email-settings');

    if (overviewPanel) overviewPanel.classList.toggle('hidden', tabName !== 'overview');
    if (timelinePanel) timelinePanel.classList.toggle('hidden', tabName !== 'timeline');
    if (approvalPanel) approvalPanel.classList.toggle('hidden', tabName !== 'approval');
    if (myBookingsPanel) myBookingsPanel.classList.toggle('hidden', tabName !== 'my-bookings');
    if (techniciansPanel) techniciansPanel.classList.toggle('hidden', tabName !== 'technicians');
    if (usersPanel) usersPanel.classList.toggle('hidden', tabName !== 'users');
    if (emailSettingsPanel) emailSettingsPanel.classList.toggle('hidden', tabName !== 'email-settings');

    // Update Mobile Bottom Bar Active States
    const mobActionBtn = document.getElementById('mobile-bottom-tab-action');
    const mobActionIcon = document.getElementById('mobile-bottom-action-icon');
    const mobActionLabel = document.getElementById('mobile-bottom-action-label');
    const mobPendingDot = document.getElementById('mobile-bottom-pending-dot');
    const canApprove = BookingData.hasPermission('view_approval_queue');

    if (mobActionBtn && mobActionLabel) {
      if (canApprove) {
        mobActionBtn.setAttribute('onclick', "BookingUI.switchTab('approval')");
        mobActionBtn.setAttribute('data-mobile-tab', 'approval');
        mobActionLabel.textContent = 'Duyệt đơn';
        if (mobActionIcon) {
          mobActionIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>`;
        }
        const pendingCount = (BookingData.bookings || []).filter(b => b.status === 'PENDING').length;
        if (mobPendingDot) mobPendingDot.classList.toggle('hidden', pendingCount === 0);
      } else {
        mobActionBtn.setAttribute('onclick', "BookingUI.switchTab('my-bookings')");
        mobActionBtn.setAttribute('data-mobile-tab', 'my-bookings');
        mobActionLabel.textContent = 'Đơn tôi';
        if (mobActionIcon) {
          mobActionIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>`;
        }
        if (mobPendingDot) mobPendingDot.classList.add('hidden');
      }
    }

    document.querySelectorAll('.mobile-bottom-tab').forEach(btn => {
      const t = btn.getAttribute('data-mobile-tab');
      const isActive = t === tabName;
      btn.classList.toggle('text-brand-600', isActive);
      btn.classList.toggle('font-bold', isActive);
      btn.classList.toggle('text-slate-500', !isActive);
    });

    this.render();
  },

  selectTech(techId) {
    this.selectedTechId = techId;
    this.renderHorizontalTechList();
    this.render28DaysView();
  },

  setSkillFilter(skill) {
    this.selectedSkill = skill;
    this.render28DaysView();
  },

  render() {
    this.updateCounters();

    if (this.activeTab === 'overview') {
      this.renderOverview();
    } else if (this.activeTab === 'timeline') {
      this.renderHorizontalTechList();
      this.render28DaysView();
    } else if (this.activeTab === 'approval') {
      this.renderApprovalBoard();
    } else if (this.activeTab === 'my-bookings') {
      this.renderMyBookings();
    } else if (this.activeTab === 'technicians') {
      this.renderTechnicians();
    } else if (this.activeTab === 'users') {
      this.renderUsers();
    } else if (this.activeTab === 'email-settings') {
      this.renderEmailSettings();
    }

    this.renderNotifications();
  },

  // 0. OVERVIEW DASHBOARD VIEW CONTROLLER
  renderOverview() {
    const user = BookingData.currentUser;
    if (!user) return;

    // 1. Personalized Greeting & Role-Aware Subtitle
    const greetingNameEl = document.getElementById('overview-user-name');
    if (greetingNameEl) {
      greetingNameEl.textContent = BookingData.cleanUserName(user.full_name) || 'Người dùng';
    }

    const greetingSubEl = document.getElementById('overview-user-subtitle');
    if (greetingSubEl) {
      if (user.role === 'admin') {
        greetingSubEl.textContent = 'Hệ thống vận hành ổn định. Bạn có toàn quyền quản trị kỹ sư, người dùng và điều phối ca trực.';
      } else if (user.role === 'approver') {
        greetingSubEl.textContent = 'Chào mừng Trưởng nhóm kỹ thuật. Bạn có thể duyệt các đơn booking và theo dõi tiến độ ca trực.';
      } else {
        greetingSubEl.textContent = 'Chào mừng bạn quay lại. Tạo đơn đặt lịch và theo dõi tiến độ ca trực kỹ thuật viên dễ dàng.';
      }
    }

    // 2. Today's Date Badge
    const todayBadge = document.getElementById('overview-today-badge');
    const now = new Date();
    const dayNames = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    const todayStr = BookingData.formatDateStr(now);
    const dateFormatted = `${dayNames[now.getDay()]}, ${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
    if (todayBadge) {
      todayBadge.textContent = dateFormatted;
    }

    // 3. Stats Calculation (Role-aware)
    const totalTechs = (BookingData.technicians || []).length;
    const totalUsers = (BookingData.users || []).length;
    const busyTodayTechIds = new Set(
      BookingData.bookings
        .filter(b => b.booking_date === todayStr && (b.status === 'APPROVED' || b.status === 'PENDING'))
        .map(b => b.tech_id)
    );
    const availableTechs = Math.max(totalTechs - busyTodayTechIds.size, 0);
    const pendingCount = BookingData.bookings.filter(b => b.status === 'PENDING').length;

    // 30-Day Rolling Window for Dispatched Shifts
    const nowTime = Date.now();
    const thirtyDaysAgoTime = nowTime - (30 * 24 * 60 * 60 * 1000);
    const thirtyDaysFutureTime = nowTime + (30 * 24 * 60 * 60 * 1000);
    const shifts30Days = BookingData.bookings.filter(b => {
      if (b.status !== 'APPROVED') return false;
      const dStr = b.booking_date || b.date;
      if (!dStr) return false;
      const bTime = new Date(dStr).getTime();
      if (isNaN(bTime)) return true;
      return bTime >= thirtyDaysAgoTime && bTime <= thirtyDaysFutureTime;
    });
    const approvedCount = shifts30Days.length;
    const userEmailLower = (user?.email || '').toLowerCase().trim();
    const myBookings = BookingData.bookings.filter(b => 
      ((b.requester_email || '').toLowerCase().trim() === userEmailLower) ||
      ((b.created_by || '').toLowerCase().trim() === userEmailLower)
    );
    const myPendingCount = myBookings.filter(b => b.status === 'PENDING').length;

    const canViewApproval = BookingData.hasPermission('view_approval_queue');
    const canViewUsers = BookingData.hasPermission('view_users');

    const elAvail = document.getElementById('overview-stat-available');
    const elPending = document.getElementById('overview-stat-pending');
    const elPendingLabel = document.getElementById('overview-stat-pending-label');
    const elPendingSub = document.getElementById('overview-stat-pending-sub');
    const cardPending = document.getElementById('overview-card-pending');

    const elApproved = document.getElementById('overview-stat-approved');
    const elUsers = document.getElementById('overview-stat-users');
    const elUsersLabel = document.getElementById('overview-stat-users-label');
    const elUsersSub = document.getElementById('overview-stat-users-sub');
    const cardUsers = document.getElementById('overview-card-users');

    if (elAvail) elAvail.textContent = `${availableTechs}/${totalTechs}`;

    // Metric 2: If user can approve, show all pending. If requester, show their pending.
    if (canViewApproval) {
      if (elPending) elPending.textContent = pendingCount;
      if (elPendingLabel) elPendingLabel.textContent = 'Chờ Phê Duyệt';
      if (elPendingSub) elPendingSub.textContent = 'Đơn cần Lead/Admin xử lý';
      if (cardPending) cardPending.setAttribute('onclick', "BookingUI.switchTab('approval')");
    } else {
      if (elPending) elPending.textContent = myPendingCount;
      if (elPendingLabel) elPendingLabel.textContent = 'Đơn Đang Chờ Duyệt';
      if (elPendingSub) elPendingSub.textContent = 'Đơn của bạn đang đợi duyệt';
      if (cardPending) cardPending.setAttribute('onclick', "BookingUI.switchTab('my-bookings')");
    }

    if (elApproved) elApproved.textContent = approvedCount;

    // Metric 4: If user can view users, show total users. If requester, show their total bookings.
    if (canViewUsers) {
      if (elUsers) elUsers.textContent = totalUsers;
      if (elUsersLabel) elUsersLabel.textContent = 'Thành Viên Hệ Thống';
      if (elUsersSub) elUsersSub.textContent = 'Phân quyền 3 cấp bậc';
      if (cardUsers) cardUsers.setAttribute('onclick', "BookingUI.switchTab('users')");
    } else {
      if (elUsers) elUsers.textContent = myBookings.length;
      if (elUsersLabel) elUsersLabel.textContent = 'Đơn Của Bạn Đã Tạo';
      if (elUsersSub) elUsersSub.textContent = 'Tổng số ca bạn đã yêu cầu';
      if (cardUsers) cardUsers.setAttribute('onclick', "BookingUI.switchTab('my-bookings')");
    }

    // Role-Aware Quick Modules Card 2 (Approval vs My Bookings)
    const quickMod2 = document.getElementById('overview-quick-mod-approval');
    if (quickMod2) {
      if (canViewApproval) {
        quickMod2.innerHTML = `
          <div class="flex items-center gap-3 min-w-0">
            <div class="w-9 h-9 rounded-xl bg-accent-600 text-white flex items-center justify-center flex-shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <div class="min-w-0">
              <p class="text-xs font-bold text-slate-900 group-hover:text-accent-700">Duyệt Yêu Cầu Booking</p>
              <p class="text-[10px] text-slate-500">Quy trình phê duyệt 1-click cho Lead</p>
            </div>
          </div>
          <span class="text-xs text-accent-600 font-bold group-hover:translate-x-0.5 transition-transform">→</span>
        `;
        quickMod2.setAttribute('onclick', "BookingUI.switchTab('approval')");
      } else {
        quickMod2.innerHTML = `
          <div class="flex items-center gap-3 min-w-0">
            <div class="w-9 h-9 rounded-xl bg-brand-600 text-white flex items-center justify-center flex-shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
            </div>
            <div class="min-w-0">
              <p class="text-xs font-bold text-slate-900 group-hover:text-brand-700">Lịch Sử Đặt Lịch Của Bạn</p>
              <p class="text-[10px] text-slate-500">Theo dõi trạng thái & chi tiết đơn đã tạo</p>
            </div>
          </div>
          <span class="text-xs text-brand-600 font-bold group-hover:translate-x-0.5 transition-transform">→</span>
        `;
        quickMod2.setAttribute('onclick', "BookingUI.switchTab('my-bookings')");
      }
    }



    // 5. Today's and Upcoming Shifts List
    const shiftsContainer = document.getElementById('overview-shifts-list');
    if (!shiftsContainer) return;

    // Filter shifts for today or upcoming (active bookings)
    const upcomingBookings = BookingData.bookings
      .filter(b => b.status !== 'CANCELLED' && b.status !== 'REJECTED' && (b.end_date || b.booking_date) >= todayStr)
      .sort((a, b) => a.booking_date.localeCompare(b.booking_date))
      .slice(0, 5);

    if (upcomingBookings.length === 0) {
      shiftsContainer.innerHTML = `
        <div class="py-10 text-center">
          <div class="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 border border-slate-200 flex items-center justify-center mx-auto mb-2.5">
            <svg class="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          </div>
          <p class="text-xs font-bold text-slate-700">Chưa có ca trực nào hôm nay & sắp tới</p>
          <p class="text-[11px] text-slate-400 mt-0.5">Nhấp nút "Đặt Lịch Mới" để lên lịch làm việc cho kỹ sư.</p>
          <button onclick="BookingUI.openBookingModal()" class="mt-3 px-3 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-2xs">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
            <span>Tạo Ca Trực Mới</span>
          </button>
        </div>
      `;
      return;
    }

    shiftsContainer.innerHTML = upcomingBookings.map(b => {
      const tech = BookingData.technicians.find(t => t.tech_id === b.tech_id);
      const isApproved = b.status === 'APPROVED';
      const isTodayShift = b.booking_date <= todayStr && (b.end_date || b.booking_date) >= todayStr;
      const bDurationStr = b.end_date && b.end_date !== b.booking_date ? `${b.booking_date} → ${b.end_date}` : b.booking_date;

      return `
        <div onclick="BookingUI.openDetailModal('${b.booking_id}')" class="py-3 px-2 flex items-center justify-between gap-3 hover:bg-slate-50/80 rounded-xl transition-colors cursor-pointer group">
          <div class="flex items-center gap-3 min-w-0">
            <div class="relative flex-shrink-0">
              <img src="${tech ? tech.avatar : ''}" alt="${tech ? tech.name : ''}" class="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-2xs">
              ${isTodayShift ? '<span class="w-2.5 h-2.5 rounded-full bg-accent-500 border-2 border-white absolute bottom-0 right-0" title="Đang trong ca trực"></span>' : ''}
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-2 mb-0.5">
                <p class="text-xs font-bold text-slate-900 group-hover:text-brand-700 truncate">${b.title}</p>
                ${isTodayShift ? '<span class="px-1.5 py-0.2 rounded-md text-[9px] font-extrabold bg-accent-100 text-accent-800 uppercase font-condensed">Hôm nay</span>' : ''}
              </div>
              <div class="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                <span class="text-slate-800 font-semibold truncate">${tech ? tech.name : b.tech_id}</span>
                <span>•</span>
                <span class="font-mono text-slate-600">${bDurationStr}</span>
                <span>•</span>
                <span class="truncate text-slate-400">${b.location || 'Văn phòng'}</span>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-2 flex-shrink-0">
            ${isApproved 
              ? '<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-accent-50 text-accent-700 border border-accent-200 flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-accent-500"></span> Đã duyệt</span>' 
              : '<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Chờ duyệt</span>'}
            <span class="text-slate-400 text-xs group-hover:text-slate-700 group-hover:translate-x-0.5 transition-transform">→</span>
          </div>
        </div>
      `;
    }).join('');
  },

  updateCounters() {
    const user = BookingData.currentUser;
    const userRole = user?.role;
    const isApprover = userRole === 'approver' || userRole === 'admin' || userRole === 'manager';
    const userEmailLower = (user?.email || '').toLowerCase().trim();
    const pendingCount = (BookingData.bookings || []).filter(b => b.status === 'PENDING').length;
    const approvedCount = (BookingData.bookings || []).filter(b => b.status === 'APPROVED').length;
    const totalCount = (BookingData.bookings || []).filter(b => b.status !== 'CANCELLED' && b.status !== 'REJECTED').length;
    const myBookings = (BookingData.bookings || []).filter(b => 
      ((b.requester_email || '').toLowerCase().trim() === userEmailLower) ||
      ((b.created_by || '').toLowerCase().trim() === userEmailLower)
    );
    const dispatchHistoryCount = isApprover ? (BookingData.bookings || []).length : myBookings.length;
    const totalTechs = (BookingData.technicians || []).length;
    const activeTechs = (BookingData.technicians || []).filter(t => t.is_active).length;

    // Sidebar badges
    const pendingBadge = document.getElementById('sidebar-pending-badge');
    if (pendingBadge) {
      pendingBadge.textContent = pendingCount;
      pendingBadge.classList.toggle('hidden', pendingCount === 0);
    }

    const myBadge = document.getElementById('sidebar-my-bookings-badge');
    if (myBadge) {
      myBadge.textContent = dispatchHistoryCount;
      myBadge.classList.toggle('hidden', dispatchHistoryCount === 0);
    }

    const techsBadge = document.getElementById('sidebar-techs-badge');
    if (techsBadge) {
      techsBadge.textContent = totalTechs;
      techsBadge.classList.toggle('hidden', totalTechs === 0);
    }

    // Technician tab stats
    const techStatTotal = document.getElementById('tech-stat-total');
    if (techStatTotal) techStatTotal.textContent = totalTechs;

    const techStatActive = document.getElementById('tech-stat-active');
    if (techStatActive) techStatActive.textContent = activeTechs;

    const techStatShifts = document.getElementById('tech-stat-shifts');
    if (techStatShifts) techStatShifts.textContent = totalCount;

    // Card 1 Metrics Strip (Monty Style)
    const metricTotal = document.getElementById('metric-total-shifts');
    const metricApproved = document.getElementById('metric-approved-shifts');
    const metricPending = document.getElementById('metric-pending-shifts');

    if (metricTotal) metricTotal.textContent = totalCount;
    if (metricApproved) metricApproved.textContent = approvedCount;
    if (metricPending) metricPending.textContent = pendingCount;
  },

  // 1. HORIZONTAL TECHNICIAN AVATAR BAR (ABOVE 28-DAY CALENDAR)
  renderHorizontalTechList() {
    const container = document.getElementById('tech-horizontal-list');
    if (!container) return;

    const techs = BookingData.technicians.filter(t => t.is_active);
    const isAllActive = this.selectedTechId === 'all';

    let html = `
      <!-- "Tất cả kỹ sư" Button -->
      <button onclick="BookingUI.selectTech('all')" 
              class="h-8 sm:h-10 px-3 sm:px-3.5 rounded-full text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center flex-shrink-0 shadow-xs cursor-pointer ${
                isAllActive 
                  ? 'bg-brand-600 text-white shadow-sm' 
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }"
              title="Xem lịch tất cả kỹ sư">
        Tất cả kỹ sư
      </button>
    `;

    techs.forEach(tech => {
      const isSelected = this.selectedTechId === tech.tech_id;

      html += `
        <button onclick="BookingUI.selectTech('${tech.tech_id}')"
                class="relative rounded-full transition-all hover:scale-110 flex-shrink-0 group cursor-pointer ${
                  isSelected 
                    ? 'ring-2 sm:ring-3 ring-brand-600 ring-offset-1 sm:ring-offset-2 scale-105 shadow-md' 
                    : 'opacity-90 hover:opacity-100 hover:ring-2 hover:ring-slate-300 hover:ring-offset-1'
                }"
                title="${tech.name} • ${tech.skills.join(', ')} (Click để lọc riêng)">
          <img src="${tech.avatar}" alt="${tech.name}" 
               class="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border sm:border-2 border-white shadow-xs">
          <!-- Active Dot -->
          ${isSelected ? `
            <span class="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-brand-600 border-2 border-white absolute -top-0.5 -right-0.5 shadow-2xs"></span>
          ` : ''}
        </button>
      `;
    });

    container.innerHTML = html;
  },

  // 2. FULL MONTH CALENDAR MATRIX (Google Calendar Standard 5/6 WEEKS x 7 DAYS) WITH LANE ALLOCATION
  renderMonthView() {
    const periodLabel = document.getElementById('period-display-label');
    const container = document.getElementById('grid-28days-cells');
    if (!container) return;

    // First day of current selected month
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();

    // Format Period Label (Google Calendar style: "Tháng 11, 2026")
    const monthNames = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
    if (periodLabel) {
      periodLabel.textContent = `${monthNames[this.currentMonth]}, ${this.currentYear}`;
    }

    const todayStr = BookingData.formatDateStr(new Date());

    // Monday-based offset (Monday is 0, Sunday is 6)
    const startDayOfWeek = firstDayOfMonth.getDay();
    const startOffset = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

    // Grid start date (may be in previous month)
    const gridStartDate = new Date(this.currentYear, this.currentMonth, 1 - startOffset);

    // Dynamic number of weeks: 5 or 6 weeks depending on days in month and start offset
    const numWeeks = Math.ceil((startOffset + daysInMonth) / 7);
    const totalDays = numWeeks * 7;

    // Prepare dates
    const allDates = [];
    for (let i = 0; i < totalDays; i++) {
      const d = new Date(gridStartDate);
      d.setDate(gridStartDate.getDate() + i);
      const isCurrentMonth = d.getMonth() === this.currentMonth;
      allDates.push({
        dateObj: d,
        dateStr: BookingData.formatDateStr(d),
        dayNum: d.getDate(),
        monthNum: d.getMonth() + 1,
        dayOfWeek: d.getDay(),
        isSunday: d.getDay() === 0,
        isToday: BookingData.formatDateStr(d) === todayStr,
        isCurrentMonth: isCurrentMonth,
        globalIndex: i
      });
    }

    // Process week by week (numWeeks x 7 days) to assign consistent lanes
    let html = '';

    for (let w = 0; w < numWeeks; w++) {
      const weekDays = allDates.slice(w * 7, (w + 1) * 7);
      const weekDateStrs = weekDays.map(d => d.dateStr);

      // 1. Collect all active bookings that appear on at least one day in this week
      let weekBookings = BookingData.bookings.filter(b => {
        if (b.status === 'CANCELLED' || b.status === 'REJECTED') return false;
        const bStart = b.booking_date;
        const bEnd = b.end_date || b.booking_date;
        // Overlaps with this week if bStart <= weekEnd && bEnd >= weekStart
        return bStart <= weekDateStrs[6] && bEnd >= weekDateStrs[0];
      });

      // Filter by selected tech
      if (this.selectedTechId !== 'all') {
        weekBookings = weekBookings.filter(b => b.tech_id === this.selectedTechId);
      }

      // Filter by search query
      if (this.searchQuery) {
        weekBookings = weekBookings.filter(b => {
          const t = BookingData.technicians.find(tech => tech.tech_id === b.tech_id);
          const techName = t ? t.name.toLowerCase() : '';
          const title = (b.title || '').toLowerCase();
          const notes = (b.notes || '').toLowerCase();
          return techName.includes(this.searchQuery) || title.includes(this.searchQuery) || notes.includes(this.searchQuery);
        });
      }

      // 2. Sort bookings: multi-day first (longer first), then single day by start date
      weekBookings.sort((a, b) => {
        const aStart = a.booking_date;
        const aEnd = a.end_date || a.booking_date;
        const bStart = b.booking_date;
        const bEnd = b.end_date || b.booking_date;
        const aDuration = (new Date(aEnd) - new Date(aStart)) / 86400000;
        const bDuration = (new Date(bEnd) - new Date(bStart)) / 86400000;

        if (bDuration !== aDuration) {
          return bDuration - aDuration; // longer multi-day first
        }
        return aStart.localeCompare(bStart);
      });

      // 3. Lane Allocation Algorithm for this week
      // laneOccupancy[laneIndex] = Set of day indices (0..6) in this week
      const laneOccupancy = [];
      const bookingLaneMap = new Map();

      weekBookings.forEach(b => {
        const bStart = b.booking_date;
        const bEnd = b.end_date || b.booking_date;

        const coveredDayIndices = [];
        weekDateStrs.forEach((dStr, idx) => {
          if (bStart <= dStr && bEnd >= dStr) {
            coveredDayIndices.push(idx);
          }
        });

        // Find lowest laneIndex that is completely free on all coveredDayIndices
        let laneIndex = 0;
        while (true) {
          if (!laneOccupancy[laneIndex]) {
            laneOccupancy[laneIndex] = new Set();
          }
          const hasConflict = coveredDayIndices.some(dayIdx => laneOccupancy[laneIndex].has(dayIdx));
          if (!hasConflict) {
            coveredDayIndices.forEach(dayIdx => laneOccupancy[laneIndex].add(dayIdx));
            bookingLaneMap.set(b.booking_id, laneIndex);
            break;
          }
          laneIndex++;
        }
      });

      const maxLanes = Math.max(laneOccupancy.length, 1);

      // 4. Render 7 day cells for this week
      weekDays.forEach((dayInfo, dayIdx) => {
        const dateStr = dayInfo.dateStr;
        const isToday = dayInfo.isToday;
        const isSunday = dayInfo.isSunday;
        const dayNum = dayInfo.dayNum;
        const monthNum = dayInfo.monthNum;
        const showMonthTag = dayInfo.globalIndex === 0 || dayNum === 1;

        // Find bookings on this specific day
        const dayBookings = weekBookings.filter(b => {
          const bStart = b.booking_date;
          const bEnd = b.end_date || b.booking_date;
          return bStart <= dateStr && bEnd >= dateStr;
        });

        // Map of lane -> booking for this day
        const laneToBooking = new Map();
        dayBookings.forEach(b => {
          const lane = bookingLaneMap.get(b.booking_id);
          if (lane !== undefined) {
            laneToBooking.set(lane, b);
          }
        });

        // Highest lane used in this cell
        let cellMaxLane = -1;
        for (let l = 0; l < maxLanes; l++) {
          if (laneToBooking.has(l)) cellMaxLane = l;
        }

        html += `
          <div onclick="BookingUI.openBookingModal('${this.selectedTechId !== 'all' ? this.selectedTechId : ''}', '${dateStr}')"
               ondragover="BookingUI.handleDragOver(event, '${dateStr}')"
               ondragenter="BookingUI.handleDragEnter(event, this, '${dateStr}')"
               ondragleave="BookingUI.handleDragLeave(event, this)"
               ondrop="BookingUI.handleDrop(event, '${dateStr}', this)"
               class="min-h-[85px] sm:min-h-[142px] p-0.5 sm:p-2 flex flex-col justify-start gap-0.5 sm:gap-1 transition-all relative group/cell cursor-pointer ${
                 isToday 
                   ? 'bg-blue-50/20 ring-1 ring-inset ring-blue-300 z-10' 
                   : dayInfo.isCurrentMonth 
                     ? 'bg-white hover:bg-slate-50/60' 
                     : 'bg-slate-50/40 hover:bg-slate-100/50'
               }">
            
            <!-- Date Number (Compact on Mobile, Full on Desktop) -->
            <div class="h-5 sm:h-7 flex items-center justify-center select-none mb-0.5 sm:mb-1">
              ${isToday ? `
                <span class="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#1a73e8] text-white flex items-center justify-center text-[10px] sm:text-xs font-bold shadow-2xs">
                  ${dayNum}
                </span>
              ` : `
                <span class="px-1 sm:px-2 py-0.5 rounded-full flex items-center justify-center text-[10px] sm:text-xs ${
                  !dayInfo.isCurrentMonth
                    ? 'text-slate-400 font-normal'
                    : isSunday 
                      ? 'text-burgundy-800 font-bold' 
                      : 'text-slate-700 font-medium'
                } hover:bg-slate-100 transition-colors">
                  ${showMonthTag ? `<span class="sm:hidden">${dayNum}</span><span class="hidden sm:inline">${dayNum} thg ${monthNum}</span>` : dayNum}
                </span>
              `}
            </div>

            <!-- Shifts Container with Fixed Height Lanes -->
            <div class="flex-1 flex flex-col gap-1 sm:gap-1.5 relative">
              ${cellMaxLane >= 0 ? Array.from({ length: cellMaxLane + 1 }).map((_, laneIdx) => {
                const b = laneToBooking.get(laneIdx);
                if (!b) {
                  // Transparent spacer to preserve exact lane row alignment
                  return `<div class="h-7 sm:h-10 w-full invisible pointer-events-none"></div>`;
                }

                const tech = BookingData.technicians.find(t => t.tech_id === b.tech_id);
                const isApproved = b.status === 'APPROVED';
                const bStart = b.booking_date;
                const bEnd = b.end_date || b.booking_date;
                const isStart = bStart === dateStr;
                const isEnd = bEnd === dateStr;
                const isSingleDay = isStart && isEnd;
                const techShortName = tech ? tech.name.split(' ').slice(-2).join(' ') : b.tech_id;

                // Phân quyền: Kiểm tra granular capability 'drag_reschedule' (Người vận hành & Admin cấp cao)
                const canDrag = BookingData.hasPermission('drag_reschedule');
                const dragAttrs = canDrag ? `draggable="true" ondragstart="BookingUI.handleDragStart(event, '${b.booking_id}')" ondragend="BookingUI.handleDragEnd(event)"` : '';
                const dragCursorClass = canDrag ? 'cursor-grab active:cursor-grabbing hover:scale-[1.01]' : 'cursor-pointer';
                const dragHint = canDrag ? ' • Kéo thả để dời ngày' : '';

                // Check week row boundaries
                const isFirstCol = dayIdx === 0;
                const isLastCol = dayIdx === 6;

                const baseBg = isApproved ? 'bg-accent-600 hover:bg-accent-700' : 'bg-orange-500 hover:bg-orange-600';
                const borderColor = isApproved ? 'border-accent-500/60' : 'border-orange-400/60';

                const statusIndicator = isApproved 
                  ? `<span class="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-accent-700/80 flex items-center justify-center text-white flex-shrink-0 shadow-2xs pointer-events-none" title="Đã duyệt"><svg class="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg></span>` 
                  : `<span class="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-orange-600/80 flex items-center justify-center text-white flex-shrink-0 shadow-2xs pointer-events-none" title="Chờ duyệt"><svg class="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3"/></svg></span>`;

                const endStatusIndicator = isApproved 
                  ? `<span class="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-accent-700/80 mr-0.5 sm:mr-1 flex items-center justify-center text-white flex-shrink-0 shadow-2xs pointer-events-none" title="Đã duyệt"><svg class="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg></span>` 
                  : `<span class="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-orange-600/80 mr-0.5 sm:mr-1 flex items-center justify-center text-white flex-shrink-0 shadow-2xs pointer-events-none" title="Chờ duyệt"><svg class="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3"/></svg></span>`;

                const extendRight = !isLastCol && !isEnd;
                const extendLeft = !isFirstCol && !isStart;

                if (isSingleDay) {
                  // Single-day shift: compact pill on mobile (avatar + mini status), full on desktop
                  return `
                    <div onclick="if (BookingUI.justDropped) return; event.stopPropagation(); BookingUI.openDetailModal('${b.booking_id}')"
                         ${dragAttrs}
                         class="h-7 sm:h-10 w-full px-1 sm:px-2 rounded-full ${baseBg} border ${borderColor} text-white transition-all flex items-center justify-between gap-1 shadow-xs hover:shadow-md group/b ${dragCursorClass}"
                         title="${tech ? tech.name : ''}: ${b.title} (${b.location}) • ${isApproved ? 'Đã duyệt' : 'Chờ duyệt'}${dragHint}">
                      <div class="flex items-center gap-1 sm:gap-2 min-w-0">
                        <img src="${tech ? tech.avatar : ''}" class="w-5 h-5 sm:w-8 sm:h-8 rounded-full object-cover flex-shrink-0 border sm:border-2 border-white shadow-xs ring-1 ring-black/10 pointer-events-none">
                        <span class="hidden sm:inline text-xs font-bold font-condensed tracking-tight text-white drop-shadow-2xs truncate leading-tight select-none">${techShortName}</span>
                      </div>
                      ${statusIndicator}
                    </div>
                  `;
                } else if (isStart || (isFirstCol && !isEnd)) {
                  // Start or continued from last week: seamless ribbon extending right
                  const isWeekContinuation = isFirstCol && !isStart;
                  const rightMargin = extendRight ? 'w-[calc(100%+0.125rem+2px)] sm:w-[calc(100%+0.5rem+2px)] -mr-[calc(0.125rem+2px)] sm:-mr-[calc(0.5rem+2px)] rounded-r-none border-r-0' : 'w-full mr-0 rounded-r-full border-r';
                  return `
                    <div onclick="if (BookingUI.justDropped) return; event.stopPropagation(); BookingUI.openDetailModal('${b.booking_id}')"
                         ${dragAttrs}
                         class="h-7 sm:h-10 ${rightMargin} pl-0.5 sm:pl-1.5 pr-1 sm:pr-2 rounded-l-full ${baseBg} border-y border-l ${borderColor} text-white flex items-center gap-1 sm:gap-2 z-20 shadow-xs hover:shadow-md transition-all ${dragCursorClass}"
                         title="${tech ? tech.name : ''}: ${b.title} (${bStart} đến ${bEnd}) • ${isApproved ? 'Đã duyệt' : 'Chờ duyệt'}${dragHint}">
                      <img src="${tech ? tech.avatar : ''}" class="w-5 h-5 sm:w-8 sm:h-8 rounded-full object-cover flex-shrink-0 border sm:border-2 border-white shadow-xs ring-1 ring-black/10 pointer-events-none">
                      <span class="hidden sm:inline text-xs font-bold font-condensed tracking-tight text-white drop-shadow-2xs truncate flex-1 leading-tight select-none">
                        ${isWeekContinuation ? `(Tiếp) ${techShortName}` : techShortName}
                      </span>
                    </div>
                  `;
                } else if (isEnd || (isLastCol && !isStart)) {
                  // End or wrapping to next week: seamless ribbon ending in rounded-r-full
                  const leftMargin = extendLeft ? 'w-[calc(100%+0.125rem+2px)] sm:w-[calc(100%+0.5rem+2px)] -ml-[calc(0.125rem+2px)] sm:-ml-[calc(0.5rem+2px)] rounded-l-none border-l-0' : 'w-full ml-0 rounded-l-full border-l';
                  return `
                    <div onclick="if (BookingUI.justDropped) return; event.stopPropagation(); BookingUI.openDetailModal('${b.booking_id}')"
                         ${dragAttrs}
                         class="h-7 sm:h-10 ${leftMargin} px-1 sm:px-2.5 rounded-r-full ${baseBg} border-y border-r ${borderColor} text-white flex items-center justify-end z-20 shadow-xs hover:shadow-md transition-all ${dragCursorClass}"
                         title="${tech ? tech.name : ''}: ${b.title} (${isEnd ? `Hết ca lúc ${bEnd}` : 'Tiếp tục tuần sau'}) • ${isApproved ? 'Đã duyệt' : 'Chờ duyệt'}${dragHint}">
                      ${endStatusIndicator}
                    </div>
                  `;
                } else {
                  // Middle day of multi-day shift: pure continuous ribbon
                  let spanClass = 'w-full rounded-none border-x-0';
                  if (extendLeft && extendRight) {
                    spanClass = 'w-[calc(100%+0.25rem+4px)] sm:w-[calc(100%+1rem+4px)] -ml-[calc(0.125rem+2px)] sm:-ml-[calc(0.5rem+2px)] -mr-[calc(0.125rem+2px)] sm:-mr-[calc(0.5rem+2px)] rounded-none border-x-0';
                  } else if (extendLeft) {
                    spanClass = 'w-[calc(100%+0.125rem+2px)] sm:w-[calc(100%+0.5rem+2px)] -ml-[calc(0.125rem+2px)] sm:-ml-[calc(0.5rem+2px)] mr-0 rounded-none border-l-0 border-r';
                  } else if (extendRight) {
                    spanClass = 'w-[calc(100%+0.125rem+2px)] sm:w-[calc(100%+0.5rem+2px)] ml-0 -mr-[calc(0.125rem+2px)] sm:-mr-[calc(0.5rem+2px)] rounded-none border-l border-r-0';
                  }
                  return `
                    <div onclick="if (BookingUI.justDropped) return; event.stopPropagation(); BookingUI.openDetailModal('${b.booking_id}')"
                         ${dragAttrs}
                         class="h-7 sm:h-10 ${spanClass} ${baseBg} border-y ${borderColor} text-white flex items-center justify-center z-20 shadow-xs hover:shadow-md transition-all ${dragCursorClass}"
                         title="${tech ? tech.name : ''}: ${b.title} (${bStart} đến ${bEnd}) • ${isApproved ? 'Đã duyệt' : 'Chờ duyệt'}${dragHint}">
                    </div>
                  `;
                }
              }).join('') : `
                <div class="flex-1 min-h-[28px] sm:min-h-[36px]"></div>
              `}
            </div>

          </div>
        `;
      });
    }

    container.innerHTML = html;
  },

  // Alias for backward compatibility
  render28DaysView() {
    this.renderMonthView();
  },

  // APPROVAL BOARD (STANDARDIZED SAAS TABLE/LIST MATCHING MY-BOOKINGS & USERS)
  renderApprovalBoard() {
    const container = document.getElementById('approval-list-container');
    const headerCount = document.getElementById('approval-header-count-container');
    if (!container) return;

    const pendingList = BookingData.bookings.filter(b => b.status === 'PENDING');

    if (headerCount) {
      headerCount.innerHTML = `
        <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-300 font-condensed">
          ${pendingList.length} yêu cầu chờ duyệt
        </span>
      `;
    }

    if (pendingList.length === 0) {
      container.innerHTML = `
        <div class="py-16 text-center">
          <div class="w-12 h-12 rounded-full bg-accent-50 text-accent-700 mx-auto flex items-center justify-center mb-3">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
          </div>
          <h4 class="text-base font-bold text-slate-900">Không có yêu cầu nào chờ duyệt</h4>
          <p class="text-xs text-slate-500 mt-1">Tất cả các đơn booking đã được xử lý xong.</p>
        </div>
      `;
      return;
    }

    const { page, pageSize } = this.pagination.approval;
    const totalPages = Math.ceil(pendingList.length / pageSize) || 1;
    const curPage = Math.min(Math.max(1, page), totalPages);
    this.pagination.approval.page = curPage;
    const pagedList = pendingList.slice((curPage - 1) * pageSize, curPage * pageSize);

    const cardsHtml = pagedList.map(b => {
      const tech = BookingData.technicians.find(t => t.tech_id === b.tech_id);
      const reqUser = (BookingData.users || []).find(u => (u.email || '').toLowerCase() === (b.requester_email || '').toLowerCase());
      const reqName = reqUser ? BookingData.cleanUserName(reqUser.full_name) : (b.requester_name || b.requester_email || 'Hệ thống');
      const bStart = b.booking_date;
      const bEnd = b.end_date || b.booking_date;

      return `
        <div class="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3">
          <div class="flex items-center justify-between gap-2">
            <span class="font-bold font-condensed text-brand-600 text-xs">${b.booking_id}</span>
            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-300">
              ${Lucide.clock} Chờ duyệt
            </span>
          </div>
          <div>
            <h4 class="font-bold text-slate-900 text-sm leading-snug">${b.title}</h4>
            <p class="text-slate-500 text-xs mt-1 flex items-center gap-1">${Lucide.mapPin} ${b.location}</p>
            ${b.notes ? `<p class="mt-1 text-[11px] text-slate-500 flex items-start gap-1 bg-slate-50 rounded-lg p-2 border border-slate-100">${Lucide.fileText} <span class="break-words">${b.notes}</span></p>` : ''}
          </div>
          <div class="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
            <div>
              <span class="text-[10px] font-bold uppercase text-slate-400 block mb-1">Người yêu cầu</span>
              <div class="flex items-center gap-1.5 min-w-0">
                ${this.getUserAvatarHtml(b.requester_email, reqName, 'w-6 h-6', 'text-[9px]')}
                <span class="font-medium text-slate-800 text-xs truncate">${reqName}</span>
              </div>
            </div>
            <div>
              <span class="text-[10px] font-bold uppercase text-slate-400 block mb-1">Kỹ sư đề xuất</span>
              <div class="flex items-center gap-1.5 min-w-0">
                <img src="${tech ? tech.avatar : ''}" class="w-6 h-6 rounded-full object-cover border border-slate-200">
                <span class="font-medium text-slate-800 text-xs truncate">${tech ? tech.name : b.tech_id}</span>
              </div>
            </div>
          </div>
          <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <div class="font-condensed">
              <span class="text-[10px] font-bold uppercase text-slate-400 block">Thời gian trực</span>
              <p class="font-bold text-slate-800 flex items-center mt-0.5">${bStart === bEnd ? bStart : `<span>${bStart}</span><span class="inline-flex items-center mx-1 text-slate-400">${Lucide.arrowRight}</span><span>${bEnd}</span>`}</p>
            </div>
            <span class="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">${bStart === bEnd ? 'Trong ngày' : 'Liên ngày'}</span>
          </div>
          <div class="pt-3 border-t border-slate-100 grid grid-cols-3 gap-2">
            <button onclick="BookingUI.handleApprove('${b.booking_id}')" class="h-11 rounded-xl bg-accent-600 hover:bg-accent-700 active:bg-accent-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1 shadow-2xs active:scale-95 cursor-pointer">
              ${Lucide.check} Duyệt
            </button>
            <button onclick="BookingUI.openRejectModal('${b.booking_id}', 'list')" class="h-11 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 font-bold text-xs transition-colors flex items-center justify-center gap-1 active:scale-95 cursor-pointer">
              ${Lucide.x} Từ chối
            </button>
            <button onclick="BookingUI.openDetailModal('${b.booking_id}')" class="h-11 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs transition-colors flex items-center justify-center active:scale-95 cursor-pointer">
              Chi tiết
            </button>
          </div>
        </div>
      `;
    }).join('');

    const tableRowsHtml = pagedList.map(b => {
      const tech = BookingData.technicians.find(t => t.tech_id === b.tech_id);
      const reqUser = (BookingData.users || []).find(u => (u.email || '').toLowerCase() === (b.requester_email || '').toLowerCase());
      const reqName = reqUser ? BookingData.cleanUserName(reqUser.full_name) : (b.requester_name || b.requester_email || 'Hệ thống');
      const bStart = b.booking_date;
      const bEnd = b.end_date || b.booking_date;

      return `
        <tr class="hover:bg-slate-50/60 transition-colors">
          <td class="py-3 px-3.5 font-bold font-condensed text-brand-600 whitespace-nowrap">${b.booking_id}</td>
          <td class="py-3 px-3.5 min-w-[200px]">
            <p class="font-bold text-slate-900 text-sm leading-snug">${b.title}</p>
            <p class="text-slate-500 mt-0.5 flex items-center gap-1">${Lucide.mapPin} ${b.location}</p>
            ${b.notes ? `<p class="mt-0.5 text-[11px] text-slate-400 flex items-center gap-1 truncate max-w-xs leading-normal">${Lucide.fileText} <span class="truncate">${b.notes}</span></p>` : ''}
          </td>
          <td class="py-3 px-3.5 whitespace-nowrap">
            <div class="flex items-center gap-2">
              ${this.getUserAvatarHtml(b.requester_email, reqName, 'w-7 h-7', 'text-[10px]')}
              <div class="min-w-0">
                <p class="font-bold text-slate-900 text-xs truncate leading-tight">${reqName}</p>
                <p class="text-slate-400 text-[10px] font-mono truncate">${b.requester_email}</p>
              </div>
            </div>
          </td>
          <td class="py-3 px-3.5 whitespace-nowrap">
            <div class="flex items-center gap-2">
              <img src="${tech ? tech.avatar : ''}" class="w-6 h-6 rounded-full object-cover border border-slate-200">
              <span class="font-medium text-slate-800">${tech ? tech.name : b.tech_id}</span>
            </div>
          </td>
          <td class="py-3 px-3.5 font-condensed whitespace-nowrap">
            <p class="font-bold text-slate-800 flex items-center">${bStart === bEnd ? bStart : `<span>${bStart}</span><span class="inline-flex items-center mx-1 text-slate-400">${Lucide.arrowRight}</span><span>${bEnd}</span>`}</p>
            <p class="text-slate-500 text-[10px]">${bStart === bEnd ? 'Trong ngày' : 'Liên ngày'}</p>
          </td>
          <td class="py-3 px-3.5 whitespace-nowrap">
            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-300">
              ${Lucide.clock} Chờ duyệt
            </span>
          </td>
          <td class="py-3 px-3.5 text-right whitespace-nowrap">
            <div class="flex items-center justify-end gap-1.5">
              <button onclick="BookingUI.handleApprove('${b.booking_id}')" class="px-3 py-1.5 rounded-lg bg-accent-600 hover:bg-accent-700 active:bg-accent-800 text-white font-semibold text-xs transition-colors flex items-center gap-1 shadow-2xs cursor-pointer">
                ${Lucide.check} Duyệt
              </button>
              <button onclick="BookingUI.openRejectModal('${b.booking_id}', 'list')" class="px-2.5 py-1.5 rounded-lg border border-rose-200 text-rose-700 hover:bg-rose-50 font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer">
                ${Lucide.x} Từ chối
              </button>
              <button onclick="BookingUI.openDetailModal('${b.booking_id}')" class="px-2.5 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 font-medium text-xs transition-colors cursor-pointer">
                Chi tiết
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    let html = `
      <!-- Mobile View (Cards) -->
      <div class="lg:hidden space-y-3 pt-3">
        ${cardsHtml}
      </div>

      <!-- Desktop View (Table) -->
      <div class="hidden lg:block overflow-x-auto pt-3">
        <table class="w-full text-left text-xs text-slate-600" style="min-width: 840px;">
          <thead class="text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50/70 border-b border-slate-100">
            <tr>
              <th class="py-3 px-3.5 rounded-l-xl">Mã Đơn</th>
              <th class="py-3 px-3.5">Nhiệm Vụ & Địa Điểm</th>
              <th class="py-3 px-3.5">Người Yêu Cầu</th>
              <th class="py-3 px-3.5">Kỹ Sư Đề Xuất</th>
              <th class="py-3 px-3.5">Thời Gian</th>
              <th class="py-3 px-3.5">Trạng Thái</th>
              <th class="py-3 px-3.5 text-right rounded-r-xl">Thao Tác</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            ${tableRowsHtml}
          </tbody>
        </table>
      </div>
      ${this.renderPaginationHtml('approval', pendingList.length, curPage, pageSize)}
    `;
    container.innerHTML = html;
  },

  // MY BOOKINGS (CONTEXT-AWARE: PM SEES OWN, MANAGER/ADMIN SEES ALL)
  renderMyBookings() {
    const container = document.getElementById('my-bookings-container');
    const headerCount = document.getElementById('my-bookings-header-count-container');
    if (!container) return;

    const role = BookingData.currentUser?.role;
    const isApprover = role === 'approver' || role === 'manager' || role === 'admin';
    const curEmailLower = (BookingData.currentUser?.email || '').toLowerCase().trim();
    const list = isApprover 
      ? BookingData.bookings 
      : BookingData.bookings.filter(b => 
          ((b.requester_email || '').toLowerCase().trim() === curEmailLower) ||
          ((b.created_by || '').toLowerCase().trim() === curEmailLower)
        );

    if (headerCount) {
      headerCount.innerHTML = `
        <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200 font-condensed">
          Tổng cộng: ${list.length} đơn
        </span>
      `;
    }

    if (list.length === 0) {
      container.innerHTML = `
        <div class="py-16 text-center">
          <p class="text-sm font-semibold text-slate-800">${isApprover ? 'Chưa có dữ liệu đơn đặt lịch nào trong hệ thống.' : 'Bạn chưa tạo yêu cầu booking nào.'}</p>
        </div>
      `;
      return;
    }

    const { page, pageSize } = this.pagination.myBookings;
    const totalPages = Math.ceil(list.length / pageSize) || 1;
    const curPage = Math.min(Math.max(1, page), totalPages);
    this.pagination.myBookings.page = curPage;
    const pagedList = list.slice((curPage - 1) * pageSize, curPage * pageSize);

    const cardsHtml = pagedList.map(b => {
      const tech = BookingData.technicians.find(t => t.tech_id === b.tech_id);
      const reqUser = (BookingData.users || []).find(u => (u.email || '').toLowerCase() === (b.requester_email || '').toLowerCase());
      const reqName = reqUser ? BookingData.cleanUserName(reqUser.full_name) : (b.requester_name || b.requester_email || 'Hệ thống');
      let badge = '';
      if (b.status === 'APPROVED') {
        badge = `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-accent-50 text-accent-800 border border-accent-300">${Lucide.check} Đã duyệt</span>`;
      } else if (b.status === 'PENDING') {
        badge = `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-300">${Lucide.clock} Chờ duyệt</span>`;
      } else if (b.status === 'REJECTED') {
        badge = `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-burgundy-50 text-burgundy-800 border border-burgundy-200">${Lucide.x} Từ chối</span>`;
      } else {
        badge = `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-300">Đã hủy</span>`;
      }

      return `
        <div class="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3">
          <div class="flex items-center justify-between gap-2">
            <span class="font-bold font-condensed text-brand-600 text-xs">${b.booking_id}</span>
            ${badge}
          </div>
          <div>
            <h4 class="font-bold text-slate-900 text-sm leading-snug">${b.title}</h4>
            <p class="text-slate-500 text-xs mt-1 flex items-center gap-1">${Lucide.mapPin} ${b.location}</p>
            ${b.status === 'REJECTED' && b.reject_reason ? `
              <div class="mt-2 text-rose-600 text-xs font-medium flex items-start gap-1.5 bg-rose-50 rounded-lg p-2.5 border border-rose-200/60 leading-normal">
                <span class="flex-shrink-0 mt-0.5">${Lucide.x}</span>
                <span><strong>Lý do từ chối:</strong> ${b.reject_reason}</span>
              </div>
            ` : ''}
          </div>
          <div class="grid ${isApprover ? 'grid-cols-2' : 'grid-cols-1'} gap-2 pt-2 border-t border-slate-100 text-xs">
            ${isApprover ? `
              <div>
                <span class="text-[10px] font-bold uppercase text-slate-400 block mb-1">Người yêu cầu</span>
                <div class="flex items-center gap-1.5 min-w-0">
                  ${this.getUserAvatarHtml(b.requester_email, reqName, 'w-6 h-6', 'text-[9px]')}
                  <span class="font-medium text-slate-800 text-xs truncate">${reqName}</span>
                </div>
              </div>
            ` : ''}
            <div>
              <span class="text-[10px] font-bold uppercase text-slate-400 block mb-1">Kỹ sư phụ trách</span>
              <div class="flex items-center gap-1.5 min-w-0">
                <img src="${tech ? tech.avatar : ''}" class="w-6 h-6 rounded-full object-cover border border-slate-200">
                <span class="font-medium text-slate-800 text-xs truncate">${tech ? tech.name : b.tech_id}</span>
              </div>
            </div>
          </div>
          <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <div class="font-condensed">
              <span class="text-[10px] font-bold uppercase text-slate-400 block">Thời gian</span>
              <p class="font-bold text-slate-800 flex items-center mt-0.5">${b.booking_date === (b.end_date || b.booking_date) ? b.booking_date : `<span>${b.booking_date}</span><span class="inline-flex items-center mx-1 text-slate-400">${Lucide.arrowRight}</span><span>${b.end_date}</span>`}</p>
            </div>
            <span class="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">${b.booking_date === (b.end_date || b.booking_date) ? 'Trong ngày' : 'Liên ngày'}</span>
          </div>
          <div class="pt-3 border-t border-slate-100 flex items-center gap-2">
            <button onclick="BookingUI.openDetailModal('${b.booking_id}')" class="h-11 flex-1 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center active:scale-95 cursor-pointer">
              Chi tiết
            </button>
            ${b.status === 'PENDING' ? `
              <button onclick="BookingUI.handleCancel('${b.booking_id}')" class="h-11 flex-1 rounded-xl border border-rose-200 hover:bg-rose-50 text-rose-600 font-semibold text-xs transition-colors flex items-center justify-center active:scale-95 cursor-pointer">
                Hủy đơn
              </button>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');

    const tableRowsHtml = pagedList.map(b => {
      const tech = BookingData.technicians.find(t => t.tech_id === b.tech_id);
      const reqUser = (BookingData.users || []).find(u => (u.email || '').toLowerCase() === (b.requester_email || '').toLowerCase());
      const reqName = reqUser ? BookingData.cleanUserName(reqUser.full_name) : (b.requester_name || b.requester_email || 'Hệ thống');
      let badge = '';
      if (b.status === 'APPROVED') {
        badge = `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-accent-50 text-accent-800 border border-accent-300">${Lucide.check} Đã duyệt</span>`;
      } else if (b.status === 'PENDING') {
        badge = `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-300">${Lucide.clock} Chờ duyệt</span>`;
      } else if (b.status === 'REJECTED') {
        badge = `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-burgundy-50 text-burgundy-800 border border-burgundy-200">${Lucide.x} Từ chối</span>`;
      } else {
        badge = `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-300">Đã hủy</span>`;
      }

      return `
        <tr class="hover:bg-slate-50/60 transition-colors">
          <td class="py-3 px-3.5 font-bold font-condensed text-brand-600 whitespace-nowrap">${b.booking_id}</td>
          <td class="py-3 px-3.5 min-w-[200px]">
            <p class="font-bold text-slate-900 text-sm">${b.title}</p>
            <p class="text-slate-500 mt-0.5 flex items-center gap-1">${Lucide.mapPin} ${b.location}</p>
            ${b.status === 'REJECTED' && b.reject_reason ? `
              <p class="text-rose-600 text-[11px] mt-0.5 font-medium flex items-center gap-1 leading-normal">
                ${Lucide.x} <span><strong>Lý do:</strong> ${b.reject_reason}</span>
              </p>
            ` : ''}
          </td>
          ${isApprover ? `
            <td class="py-3 px-3.5 whitespace-nowrap">
              <div class="flex items-center gap-2">
                ${this.getUserAvatarHtml(b.requester_email, reqName, 'w-7 h-7', 'text-[10px]')}
                <div class="min-w-0">
                  <p class="font-bold text-slate-900 text-xs truncate leading-tight">${reqName}</p>
                  <p class="text-slate-400 text-[10px] font-mono truncate">${b.requester_email}</p>
                </div>
              </div>
            </td>
          ` : ''}
          <td class="py-3 px-3.5 whitespace-nowrap">
            <div class="flex items-center gap-2">
              <img src="${tech ? tech.avatar : ''}" class="w-6 h-6 rounded-full object-cover border border-slate-200">
              <span class="font-medium text-slate-800">${tech ? tech.name : b.tech_id}</span>
            </div>
          </td>
          <td class="py-3 px-3.5 font-condensed whitespace-nowrap">
            <p class="font-bold text-slate-800 flex items-center">${b.booking_date === (b.end_date || b.booking_date) ? b.booking_date : `<span>${b.booking_date}</span><span class="inline-flex items-center mx-1 text-slate-400">${Lucide.arrowRight}</span><span>${b.end_date}</span>`}</p>
            <p class="text-slate-500 text-[10px]">${b.booking_date === (b.end_date || b.booking_date) ? 'Trong ngày' : 'Liên ngày'}</p>
          </td>
          <td class="py-3 px-3.5 whitespace-nowrap">${badge}</td>
          <td class="py-3 px-3.5 text-right whitespace-nowrap">
            <div class="flex items-center justify-end gap-1.5">
              <button onclick="BookingUI.openDetailModal('${b.booking_id}')" class="px-2.5 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 font-medium text-xs transition-colors cursor-pointer">Chi tiết</button>
              ${b.status === 'PENDING' ? `
                <button onclick="BookingUI.handleCancel('${b.booking_id}')" class="px-2.5 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 font-medium text-xs transition-colors cursor-pointer">Hủy đơn</button>
              ` : ''}
            </div>
          </td>
        </tr>
      `;
    }).join('');

    let html = `
      <!-- Mobile View (Cards) -->
      <div class="lg:hidden space-y-3 pt-3">
        ${cardsHtml}
      </div>

      <!-- Desktop View (Table) -->
      <div class="hidden lg:block overflow-x-auto pt-3">
        <table class="w-full text-left text-xs text-slate-600" style="min-width: 840px;">
          <thead class="text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50/70 border-b border-slate-100">
            <tr>
              <th class="py-3 px-3.5 rounded-l-xl">Mã Đơn</th>
              <th class="py-3 px-3.5">Nhiệm Vụ & Địa Điểm</th>
              ${isApprover ? '<th class="py-3 px-3.5">Người Yêu Cầu</th>' : ''}
              <th class="py-3 px-3.5">Kỹ Sư Phụ Trách</th>
              <th class="py-3 px-3.5">Thời Gian</th>
              <th class="py-3 px-3.5">Trạng Thái</th>
              <th class="py-3 px-3.5 text-right rounded-r-xl">Thao Tác</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            ${tableRowsHtml}
          </tbody>
        </table>
      </div>
      ${this.renderPaginationHtml('myBookings', list.length, curPage, pageSize)}
    `;
    container.innerHTML = html;
  },

  // MODAL ACTIONS
  openBookingModal(prefillTechId = '', prefillDate = '', prefillEndDate = '') {
    if (!BookingData.hasPermission('create_booking')) {
      Toast.show('Tài khoản của bạn không được cấp quyền "Đặt lịch mới"!', 'error', 'Từ chối quyền');
      return;
    }

    const todayStr = BookingData.formatDateStr(new Date());
    if (prefillDate && prefillDate < todayStr) {
      Toast.show('Không thể đặt lịch cho ngày trong quá khứ! Vui lòng chọn từ hôm nay trở đi.', 'warning', 'Lịch quá khứ');
      return;
    }

    const modal = document.getElementById('booking-modal');
    if (!modal) return;

    const techSelect = document.getElementById('modal-tech-id');
    const defaultTechId = prefillTechId || (BookingData.technicians[0] ? BookingData.technicians[0].tech_id : '');

    if (techSelect) {
      techSelect.innerHTML = BookingData.technicians.map(t => `
        <option value="${t.tech_id}" ${t.tech_id === defaultTechId ? 'selected' : ''}>${t.name} • ${t.phone}</option>
      `).join('');
      techSelect.value = defaultTechId;
    }

    // Update Visual Technician Card with Avatar & Custom Dropdown Options
    this.updateModalTechCard(defaultTechId);
    this.renderCustomTechOptions(defaultTechId);

    const startDate = (prefillDate && prefillDate >= todayStr) ? prefillDate : todayStr;
    const endDate = (prefillEndDate && prefillEndDate >= startDate) ? prefillEndDate : startDate;

    this.updateModalDateRangeDisplay(startDate, endDate);

    const alertBox = document.getElementById('modal-conflict-alert');
    if (alertBox) alertBox.classList.add('hidden');

    modal.classList.remove('hidden');
    modal.classList.add('flex');
  },

  closeBookingModal() {
    const modal = document.getElementById('booking-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
    const menu = document.getElementById('modal-tech-custom-menu');
    const trigger = document.getElementById('modal-tech-custom-trigger');
    const chevron = document.getElementById('modal-tech-chevron');
    if (menu) menu.classList.add('hidden');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
    if (chevron) chevron.classList.remove('rotate-180');

    this.closeCustomDatePicker();
  },

  handleBookingSubmit(e) {
    e.preventDefault();

    const techId = document.getElementById('modal-tech-id').value;
    const bDate = document.getElementById('modal-booking-date').value;
    const endDate = document.getElementById('modal-end-date').value || bDate;
    const title = document.getElementById('modal-title').value;
    const location = document.getElementById('modal-location').value;
    const notes = document.getElementById('modal-notes').value;

    const res = BookingData.createBooking({
      tech_id: techId,
      booking_date: bDate,
      end_date: endDate,
      title: title,
      location: location,
      notes: notes
    });

    if (!res.success) {
      Toast.show(res.error, 'error', 'Trùng lịch / Lỗi');
      return;
    }

    Toast.show(`Đã tạo yêu cầu ${res.booking.booking_id} thành công! Đang chờ duyệt.`, 'success');

    // 1. Thông báo cho người phê duyệt / Quản trị viên (Cần quyền approve_booking)
    BookingData.addNotification({
      type: 'new_request',
      title: 'Yêu cầu booking mới cần duyệt',
      message: `${BookingData.currentUser?.full_name || 'Người dùng'} vừa gửi yêu cầu đặt lịch đơn ${res.booking.booking_id} (${res.booking.title}).`,
      tab: 'approval',
      booking_id: res.booking.booking_id,
      required_perm: 'approve_booking',
      target_roles: ['admin', 'approver']
    });

    // 2. Thông báo xác nhận riêng cho người gửi yêu cầu (Requester)
    BookingData.addNotification({
      type: 'shift_reminder',
      title: 'Đã gửi yêu cầu đặt lịch',
      message: `Đơn ${res.booking.booking_id} (${res.booking.title}) đã được tạo và đang chờ Ban điều phối phê duyệt.`,
      tab: 'my-bookings',
      booking_id: res.booking.booking_id,
      target_user: res.booking.requester_email
    });

    this.renderNotifications();
    this.closeBookingModal();
    this.render();
  },

  handleApprove(bookingId) {
    if (!BookingData.hasPermission('approve_booking')) {
      Toast.show('Tài khoản của bạn không có quyền "Phê duyệt ca trực"!', 'error', 'Từ chối quyền');
      return;
    }
    const booking = BookingData.bookings.find(b => b.booking_id === bookingId);
    const res = BookingData.approveBooking(bookingId, BookingData.currentUser.email);
    if (res.success) {
      Toast.show(`Đã phê duyệt đơn ${bookingId}! Khung giờ đã được khóa bảo vệ.`, 'success', 'Duyệt thành công');
      
      const reqEmail = booking ? booking.requester_email : '';
      const bTitle = booking ? booking.title : '';

      // 1. Gửi thông báo trực tiếp cho người đặt lịch (Requester)
      if (reqEmail) {
        BookingData.addNotification({
          type: 'approval_success',
          title: 'Booking của bạn đã được phê duyệt',
          message: `Đơn đặt lịch ${bookingId} (${bTitle}) của bạn đã được phê duyệt thành công. Khung giờ ca trực đã được khóa.`,
          tab: 'my-bookings',
          booking_id: bookingId,
          target_user: reqEmail
        });
      }

      // 2. Gửi thông báo vận hành cho Ban điều phối / Admin
      BookingData.addNotification({
        type: 'approval_success',
        title: 'Đã duyệt ca trực',
        message: `Đơn booking ${bookingId} (${bTitle}) đã được phê duyệt thành công. Khung giờ ca trực đã được khóa bảo vệ.`,
        tab: 'timeline',
        booking_id: bookingId,
        required_perm: 'approve_booking',
        target_roles: ['admin', 'approver']
      });

      this.renderNotifications();
      this.render();
    } else {
      Toast.show(res.error, 'error');
    }
  },

  handleRejectPrompt(bookingId) {
    if (!BookingData.hasPermission('reject_booking')) {
      Toast.show('Tài khoản của bạn không có quyền "Từ chối ca trực"!', 'error', 'Từ chối quyền');
      return;
    }
    this.openRejectModal(bookingId, 'list');
  },

  handleCancel(bookingId) {
    if (!BookingData.hasPermission('cancel_own_booking')) {
      Toast.show('Tài khoản của bạn không có quyền "Hủy đơn của mình"!', 'error', 'Từ chối quyền');
      return;
    }
    if (confirm(`Bạn có chắc chắn muốn hủy đơn ${bookingId}?`)) {
      const booking = BookingData.bookings.find(b => b.booking_id === bookingId);
      const res = BookingData.cancelBooking(bookingId);
      if (res.success) {
        Toast.show(`Đã hủy đơn ${bookingId}.`, 'info', 'Đã hủy');
        
        const reqEmail = booking ? booking.requester_email : BookingData.currentUser?.email;
        const bTitle = booking ? booking.title : '';

        // 1. Thông báo cho người hủy đơn
        if (reqEmail) {
          BookingData.addNotification({
            type: 'conflict_alert',
            title: 'Đơn booking đã hủy',
            message: `Đơn booking ${bookingId} (${bTitle}) đã được hủy theo yêu cầu.`,
            tab: 'my-bookings',
            booking_id: bookingId,
            target_user: reqEmail
          });
        }

        // 2. Thông báo cho Ban điều phối / Admin
        BookingData.addNotification({
          type: 'conflict_alert',
          title: 'Ca trực bị hủy',
          message: `Đơn booking ${bookingId} (${bTitle}) đã bị hủy bởi ${BookingData.currentUser?.full_name || 'Người dùng'}. Khung giờ đã được giải phóng.`,
          tab: 'timeline',
          booking_id: bookingId,
          required_perm: 'manage_technicians',
          target_roles: ['admin', 'approver']
        });

        this.renderNotifications();
        this.render();
      }
    }
  },

  // DRAG & DROP RESCHEDULING (LEAD ONLY)
  draggedBookingId: null,
  activeDragBookingId: null,
  isDragging: false,
  justDropped: false,

  handleDragStart(e, bookingId) {
    this.activeDragBookingId = bookingId;
    this.draggedBookingId = bookingId;
    window._activeDragBookingId = bookingId;
    this.isDragging = true;
    e.dataTransfer.setData('text/plain', bookingId);
    e.dataTransfer.setData('text', bookingId);
    e.dataTransfer.effectAllowed = 'move';
    if (e.currentTarget) {
      setTimeout(() => {
        if (e.currentTarget) e.currentTarget.classList.add('opacity-40');
      }, 0);
    }
  },

  handleDragEnd(e) {
    if (e.currentTarget) e.currentTarget.classList.remove('opacity-40');
    document.querySelectorAll('.cell-drag-over, .cell-drag-invalid').forEach(cell => {
      cell.classList.remove('cell-drag-over', 'cell-drag-invalid', 'bg-amber-100/70', 'bg-rose-50/70', 'ring-2', 'ring-amber-500', 'ring-rose-400', 'ring-inset');
    });
    setTimeout(() => {
      this.activeDragBookingId = null;
      this.draggedBookingId = null;
      window._activeDragBookingId = null;
      this.isDragging = false;
    }, 400);
  },

  handleDragOver(e, dateStr) {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
  },

  handleDragEnter(e, cellEl, dateStr) {
    e.preventDefault();
    if (cellEl && !cellEl.classList.contains('cell-drag-over')) {
      cellEl.classList.add('cell-drag-over', 'bg-amber-100/70', 'ring-2', 'ring-amber-500', 'ring-inset');
    }
  },

  handleDragLeave(e, cellEl) {
    if (cellEl && (!e.relatedTarget || !cellEl.contains(e.relatedTarget))) {
      cellEl.classList.remove('cell-drag-over', 'cell-drag-invalid', 'bg-amber-100/70', 'bg-rose-50/70', 'ring-2', 'ring-amber-500', 'ring-rose-400', 'ring-inset');
    }
  },

  handleDrop(e, targetDateStr, cellEl) {
    e.preventDefault();
    e.stopPropagation();
    if (cellEl) {
      cellEl.classList.remove('cell-drag-over', 'cell-drag-invalid', 'bg-amber-100/70', 'bg-rose-50/70', 'ring-2', 'ring-amber-500', 'ring-rose-400', 'ring-inset');
    }

    const bookingId = e.dataTransfer.getData('text/plain') 
                   || e.dataTransfer.getData('text') 
                   || this.activeDragBookingId 
                   || this.draggedBookingId 
                   || window._activeDragBookingId;

    this.activeDragBookingId = null;
    this.draggedBookingId = null;
    window._activeDragBookingId = null;
    this.isDragging = false;
    this.justDropped = true;
    setTimeout(() => { this.justDropped = false; }, 300);

    if (!bookingId || !targetDateStr) return;

    // 🛡️ CHẶN DỜI LỊCH VÀO QUÁ KHỨ
    const todayStr = BookingData.formatDateStr(new Date());
    if (targetDateStr < todayStr) {
      Toast.show('Không thể dời ca trực vào ngày trong quá khứ! Vui lòng chọn từ hôm nay trở đi.', 'warning', 'Thao tác không hợp lệ');
      return;
    }

    // Check permission to reschedule
    if (!BookingData.hasPermission('drag_reschedule')) {
      Toast.show('Bạn không có quyền dời lịch ca trực!', 'error');
      return;
    }

    const res = BookingData.rescheduleBooking(bookingId, targetDateStr);
    if (res.isSameDate) {
      return;
    }

    if (!res.success) {
      Toast.show(res.error, 'warning', 'Xung đột lịch');
      return;
    }

    const tech = BookingData.technicians.find(t => t.tech_id === res.booking.tech_id);
    const techName = tech ? tech.name : res.booking.tech_id;
    const dateRangeLabel = res.durationDays > 0 ? `${res.newStartDateStr} → ${res.newEndDateStr}` : res.newStartDateStr;
    Toast.show(`Đã dời lịch Kỹ sư ${techName} sang ${dateRangeLabel}!`, 'success', 'Dời lịch thành công');

    // Thông báo điều chỉnh ngày trực gửi đến người đặt lịch
    if (res.booking && res.booking.requester_email) {
      BookingData.addNotification({
        type: 'shift_reminder',
        title: 'Lịch trực đã được điều chỉnh',
        message: `Đơn booking ${bookingId} (${res.booking.title}) của bạn đã được dời sang ngày ${dateRangeLabel}.`,
        tab: 'my-bookings',
        booking_id: bookingId,
        target_user: res.booking.requester_email
      });
      this.renderNotifications();
    }

    this.render();
  },

  openDetailModal(bookingId) {
    const b = BookingData.bookings.find(item => item.booking_id === bookingId);
    if (!b) return;

    const modal = document.getElementById('detail-modal');
    const content = document.getElementById('detail-modal-content');
    const footer = document.getElementById('detail-modal-footer');
    const tech = BookingData.technicians.find(t => t.tech_id === b.tech_id);

    let statusText = '';
    if (b.status === 'APPROVED') {
      statusText = `<span class="inline-flex items-center gap-1.5 whitespace-nowrap text-accent-800 font-bold font-condensed bg-accent-50 px-3 py-1 rounded-full border border-accent-200 text-xs tracking-wide shadow-2xs">${Lucide.check} ĐÃ DUYỆT</span>`;
    } else if (b.status === 'PENDING') {
      statusText = `<span class="inline-flex items-center gap-1.5 whitespace-nowrap text-amber-800 font-bold font-condensed bg-amber-50 px-3 py-1 rounded-full border border-amber-200 text-xs tracking-wide shadow-2xs">${Lucide.clock} CHỜ DUYỆT</span>`;
    } else if (b.status === 'REJECTED') {
      statusText = `<span class="inline-flex items-center gap-1.5 whitespace-nowrap text-burgundy-800 font-bold font-condensed bg-burgundy-50 px-3 py-1 rounded-full border border-burgundy-200 text-xs tracking-wide shadow-2xs">${Lucide.x} TỪ CHỐI</span>`;
    } else {
      statusText = `<span class="inline-flex items-center gap-1.5 whitespace-nowrap text-slate-700 font-bold font-condensed bg-slate-100 px-3 py-1 rounded-full border border-slate-200 text-xs tracking-wide shadow-2xs">ĐÃ HỦY</span>`;
    }

    const bStart = b.booking_date;
    const bEnd = b.end_date || b.booking_date;
    const d1 = new Date(bStart);
    const d2 = new Date(bEnd);
    const diffDays = Math.max(1, Math.round((d2 - d1) / (1000 * 60 * 60 * 24)) + 1);
    const isSingleDay = diffDays === 1;
    const canApprove = BookingData.hasPermission('approve_booking');
    const canReject = BookingData.hasPermission('reject_booking');
    const canEdit = BookingData.hasPermission('edit_booking');
    const curEmailLower = (BookingData.currentUser?.email || '').toLowerCase().trim();
    const isOwner = ((b.requester_email || '').toLowerCase().trim() === curEmailLower) ||
                    ((b.created_by || '').toLowerCase().trim() === curEmailLower);

    content.innerHTML = `
      <div class="space-y-4">
        <!-- Header: ID, Title & Non-Wrapping Badge -->
        <div class="flex items-start justify-between gap-3 pb-3.5 border-b border-slate-100">
          <div class="min-w-0 flex-1">
            <span class="text-xs font-extrabold font-condensed text-brand-600 tracking-wider block">${b.booking_id}</span>
            <h3 class="text-lg font-bold text-slate-900 mt-1 leading-snug break-words">${b.title}</h3>
          </div>
          <div class="flex-shrink-0 pt-0.5">${statusText}</div>
        </div>

        <!-- 2 Information Cards Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <!-- Card 1: Technician -->
          <div class="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200/80 flex flex-col justify-between">
            <span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2.5">Kỹ sư phụ trách</span>
            <div class="bg-white rounded-xl p-3 border border-slate-200/90 shadow-2xs flex items-center gap-3">
              <img src="${tech ? tech.avatar : ''}" class="w-10 h-10 rounded-full object-cover flex-shrink-0 border-2 border-white shadow-2xs ring-1 ring-slate-100">
              <div class="min-w-0 flex-1">
                <strong class="text-xs font-bold text-slate-900 block truncate leading-tight">${tech ? tech.name : b.tech_id}</strong>
                <span class="text-[11px] text-slate-500 font-medium block mt-1 flex items-center gap-1">
                  ${Lucide.phone} ${tech ? tech.phone : 'Chưa có SĐT'}
                </span>
              </div>
            </div>
          </div>

          <!-- Card 2: Date & Shift Duration (Editable on PENDING and APPROVED shifts) -->
          <div class="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200/80 flex flex-col justify-between relative">
            <div class="flex items-center justify-between mb-2.5">
              <span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Thời gian thực hiện</span>
              ${canEdit && (b.status === 'PENDING' || b.status === 'APPROVED') ? `
                <span class="inline-flex items-center gap-1 text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full font-bold border border-amber-200 shadow-2xs">
                  ${Lucide.pencil} Có thể đổi ngày
                </span>
              ` : ''}
            </div>

            ${canEdit && (b.status === 'PENDING' || b.status === 'APPROVED') ? `
              <!-- Unified Single-Calendar Trigger for Detail Modal -->
              <div class="relative" id="detail-daterange-picker-wrapper">
                <button id="btn-detail-daterange" type="button" onclick="BookingUI.openDetailDatePicker('${b.booking_id}')" class="w-full bg-white hover:bg-slate-50/90 hover:border-brand-400 border border-slate-200/90 rounded-xl p-3 text-left shadow-2xs cursor-pointer transition-all focus:outline-hidden focus:ring-2 focus:ring-brand-500/20 group">
                  <div class="flex items-center justify-between gap-2 mb-1.5">
                    <div class="flex items-center gap-1.5 min-w-0">
                      <span class="text-brand-600 flex-shrink-0">${Lucide.calendar}</span>
                      <span id="label-detail-daterange" class="text-xs font-bold text-slate-900 font-condensed tracking-tight truncate group-hover:text-brand-700 transition-colors">
                        ${diffDays === 1 ? BookingUI.formatDateDisplay(bStart) : `${BookingUI.formatDateDisplay(bStart)} → ${BookingUI.formatDateDisplay(bEnd)}`}
                      </span>
                    </div>
                    <span id="label-detail-duration-tag" class="text-[10px] font-extrabold text-brand-700 font-condensed bg-brand-50 px-2 py-0.5 rounded-full border border-brand-200/70 flex-shrink-0">
                      ${diffDays} ngày
                    </span>
                  </div>
                  <div class="flex items-center justify-between text-[11px] text-slate-500 pt-1.5 border-t border-slate-100/90">
                    <span id="sublabel-detail-daterange" class="text-[10px] text-slate-500 font-medium truncate">
                      ${diffDays === 1 ? 'Ca trong ngày' : `Ca liên ngày (${diffDays} ngày)`}
                    </span>
                    <span class="inline-flex items-center gap-1 text-[10px] font-bold text-brand-600 group-hover:text-brand-700 flex-shrink-0 ml-1">
                      ${Lucide.pencil} Đổi lịch
                    </span>
                  </div>
                </button>

                <!-- Hidden inputs maintaining compatibility with handleApproveFromDetail -->
                <input type="hidden" id="detail-edit-start-date" value="${bStart}">
                <input type="hidden" id="detail-edit-end-date" value="${bEnd}">

                <!-- Floating Custom Date Picker Dropdown Popover for Detail Modal -->
                <div id="detail-datepicker-dropdown" onclick="event.stopPropagation()" class="hidden absolute right-0 top-full mt-2 w-[310px] sm:w-[330px] bg-white rounded-2xl border border-slate-200 shadow-2xl z-50 p-3.5 transform transition-all duration-200 origin-top-right">
                  <!-- Header -->
                  <div class="flex items-center justify-between pb-2.5 border-b border-slate-100">
                    <div class="flex items-center gap-2">
                      <span id="detail-dp-target-badge" class="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-brand-50 text-brand-700 font-condensed border border-brand-100">1 Lịch chọn dải ngày</span>
                      <span id="detail-dp-month-year" class="text-xs font-bold text-slate-900">Tháng 11, 2026</span>
                    </div>
                    <div class="flex items-center gap-1">
                      <button type="button" onclick="BookingUI.changeDetailDpMonth(-1)" class="w-6 h-6 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer" title="Tháng trước">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
                      </button>
                      <button type="button" onclick="BookingUI.changeDetailDpMonth(1)" class="w-6 h-6 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer" title="Tháng sau">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                      </button>
                    </div>
                  </div>

                  <!-- Dynamic Instruction Banner -->
                  <div id="detail-dp-instruction-banner" class="mt-2 px-2.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[10px] text-slate-600 flex items-center gap-1.5">
                    <span id="detail-dp-instruction-dot" class="w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0 animate-pulse"></span>
                    <span id="detail-dp-instruction-text" class="truncate font-medium">Nhấp 1 ngày để chọn ca 1 ngày. Nhấp ngày thứ 2 để đặt ca liên ngày.</span>
                  </div>

                  <!-- Weekdays -->
                  <div class="grid grid-cols-7 text-center text-[9px] font-bold text-slate-400 uppercase py-1.5">
                    <div>T2</div><div>T3</div><div>T4</div><div>T5</div><div>T6</div><div>T7</div><div>CN</div>
                  </div>

                  <!-- Calendar Days Grid -->
                  <div id="detail-dp-days-grid" class="grid grid-cols-7 gap-1 text-xs" onmouseleave="BookingUI.handleDetailDpMouseLeave()">
                    <!-- Injected via JS -->
                  </div>

                  <!-- Footer -->
                  <div class="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between gap-1 flex-wrap">
                    <div class="flex items-center gap-1 flex-wrap">
                      <button type="button" onclick="BookingUI.setDetailDpQuick('today')" class="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold transition-colors cursor-pointer">Hôm nay</button>
                      <button type="button" onclick="BookingUI.setDetailDpQuick('tomorrow')" class="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold transition-colors cursor-pointer">Ngày mai</button>
                      <button type="button" onclick="BookingUI.setDetailDpQuick('plus3')" class="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold transition-colors cursor-pointer">3 ngày</button>
                      <button type="button" onclick="BookingUI.setDetailDpQuick('plus7')" class="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold transition-colors cursor-pointer">1 tuần</button>
                    </div>
                    <button type="button" onclick="BookingUI.closeDetailDatePicker()" class="px-2.5 py-0.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-[10px] font-bold shadow-xs transition-colors cursor-pointer ml-auto">Xong</button>
                  </div>
                </div>
              </div>
            ` : `
              <div class="bg-white rounded-xl p-3 border border-slate-200/90 shadow-2xs">
                <div class="flex items-center justify-between gap-2 mb-1.5">
                  <div class="flex items-center gap-1.5 min-w-0">
                    <span class="text-slate-500 flex-shrink-0">${Lucide.calendar}</span>
                    <span class="text-xs font-bold text-slate-900 font-condensed tracking-tight truncate">
                      ${diffDays === 1 ? BookingUI.formatDateDisplay(bStart) : `${BookingUI.formatDateDisplay(bStart)} → ${BookingUI.formatDateDisplay(bEnd)}`}
                    </span>
                  </div>
                  <span class="text-[10px] font-extrabold text-slate-700 font-condensed bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200 flex-shrink-0">
                    ${diffDays} ngày
                  </span>
                </div>
                <div class="flex items-center justify-between text-[10px] text-slate-500 pt-1.5 border-t border-slate-100/90">
                  <span>${diffDays === 1 ? 'Ca trong ngày' : `Ca liên ngày (${diffDays} ngày)`}</span>
                  <span class="font-medium text-slate-400">Đã chốt lịch</span>
                </div>
              </div>
            `}
          </div>
        </div>

        <!-- Detailed Properties -->
        <div class="text-xs space-y-2.5 pt-1">
          <p class="flex items-center gap-2 text-slate-600">
            <span class="text-slate-400 flex-shrink-0">${Lucide.mapPin}</span>
            <strong class="text-slate-700 min-w-[70px]">Địa điểm:</strong>
            <span class="text-slate-900 font-medium">${b.location}</span>
          </p>
          <div class="flex items-center gap-2 text-slate-600">
            <span class="text-slate-400 flex-shrink-0">${Lucide.user}</span>
            <strong class="text-slate-700 min-w-[70px]">Người book:</strong>
            <div class="inline-flex items-center gap-1.5">
              ${(() => {
                const reqUser = (BookingData.users || []).find(u => (u.email || '').toLowerCase() === (b.requester_email || '').toLowerCase());
                const reqName = reqUser ? BookingData.cleanUserName(reqUser.full_name) : (b.requester_name || b.requester_email || 'Hệ thống');
                return `
                  ${this.getUserAvatarHtml(b.requester_email, reqName, 'w-5 h-5', 'text-[9px]')}
                  <span class="text-slate-900 font-semibold">${reqName} <span class="text-slate-400 text-xs font-normal">(${b.requester_email})</span></span>
                `;
              })()}
            </div>
          </div>
          ${b.approver_email ? `
            <div class="flex items-center gap-2 text-slate-600">
              <span class="text-accent-600 flex-shrink-0">${Lucide.check}</span>
              <strong class="text-slate-700 min-w-[70px]">Người duyệt:</strong>
              <div class="inline-flex items-center gap-1.5">
                ${(() => {
                  const appUser = (BookingData.users || []).find(u => (u.email || '').toLowerCase() === (b.approver_email || '').toLowerCase());
                  const appName = appUser ? BookingData.cleanUserName(appUser.full_name) : b.approver_email;
                  return `
                    ${this.getUserAvatarHtml(b.approver_email, appName, 'w-5 h-5', 'text-[9px]')}
                    <span class="text-slate-900 font-semibold">${appName} <span class="text-slate-400 text-xs font-normal">(${b.approver_email})</span></span>
                  `;
                })()}
              </div>
            </div>
          ` : ''}
          ${b.reject_reason ? `
            <div class="p-3 rounded-xl bg-burgundy-50 border border-burgundy-200 text-burgundy-800 flex items-start gap-2">
              <span class="mt-0.5 text-burgundy-800 flex-shrink-0">${Lucide.x}</span>
              <div>
                <strong class="block text-burgundy-900 font-semibold mb-0.5">Lý do từ chối:</strong>
                <span class="text-burgundy-800 leading-relaxed">${b.reject_reason}</span>
              </div>
            </div>
          ` : ''}
          ${b.notes ? `
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 flex items-start gap-2">
              <span class="mt-0.5 text-slate-400 flex-shrink-0">${Lucide.fileText}</span>
              <div>
                <strong class="block text-slate-800 font-semibold mb-0.5">Ghi chú công việc:</strong>
                <span class="text-slate-600 leading-relaxed">${b.notes}</span>
              </div>
            </div>
          ` : ''}
        </div>

        ${b.status === 'APPROVED' ? `
          <!-- Google Calendar & ICS Sync Section (Chỉ hiển thị cho ca ĐÃ DUYỆT) -->
          <div class="mt-4 p-3.5 bg-gradient-to-br from-brand-50/70 via-white to-slate-50/50 rounded-2xl border border-brand-100 shadow-2xs">
            <div class="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-brand-100/70">
              <div class="flex items-center gap-2">
                <span class="w-6 h-6 rounded-lg bg-brand-600 text-white flex items-center justify-center flex-shrink-0 shadow-2xs">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                </span>
                <div>
                  <h4 class="text-xs font-bold text-slate-900 leading-tight">Đồng Bộ Lịch & Lời Mời KTV</h4>
                  <span class="text-[10px] text-slate-500">Google Calendar & Tải File .ICS Offline</span>
                </div>
              </div>
              <span class="inline-flex items-center gap-1 text-[10px] font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full border border-brand-200/80">
                <span class="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse"></span> Sẵn sàng đồng bộ
              </span>
            </div>
            
            <p class="text-[11px] text-slate-600 leading-relaxed mb-3">
              Gửi sự kiện ca trực đến email kỹ sư <strong class="text-slate-800">${tech?.email || tech?.name || 'KTV'}</strong> hoặc mở trực tiếp trên Google Calendar cá nhân.
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <!-- 1-Click Google Calendar Intent -->
              <a href="${BookingData.getGoogleCalendarUrl(b)}" target="_blank" rel="noopener noreferrer"
                 class="px-2.5 py-2 rounded-xl text-[11px] font-bold bg-white hover:bg-slate-50 text-brand-700 border border-brand-200 shadow-2xs flex items-center justify-center gap-1.5 transition-all text-center">
                <svg class="w-3.5 h-3.5 flex-shrink-0 text-brand-600" viewBox="0 0 24 24" fill="currentColor"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/></svg>
                <span>Google Calendar</span>
              </a>

              <!-- Download ICS File -->
              <button type="button" onclick="BookingUI.downloadIcs('${b.booking_id}')"
                      class="px-2.5 py-2 rounded-xl text-[11px] font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-2xs flex items-center justify-center gap-1.5 transition-all cursor-pointer">
                <svg class="w-3.5 h-3.5 flex-shrink-0 text-slate-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                <span>Tải file .ics</span>
              </button>

              <!-- Resend / Send Email Invite -->
              <button type="button" onclick="BookingUI.resendInvite('${b.booking_id}')"
                      class="px-2.5 py-2 rounded-xl text-[11px] font-bold bg-brand-600 hover:bg-brand-700 text-white shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer">
                <svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                <span>Gửi lại lời mời</span>
              </button>
            </div>
          </div>
        ` : ''}
      </div>
    `;

    // Render Context-Aware Action Footer
    if (footer) {
      if (b.status === 'PENDING') {
        const actionButtons = [];
        if (canCancel && isOwner) {
          actionButtons.push(`
            <button onclick="BookingUI.handleCancelFromDetail('${b.booking_id}')" type="button" class="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 shadow-2xs flex items-center gap-1 transition-all cursor-pointer">
              ${Lucide.x} Hủy Yêu Cầu
            </button>
          `);
        }
        if (canReject) {
          actionButtons.push(`
            <button onclick="BookingUI.openRejectModal('${b.booking_id}', 'detail')" type="button" class="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 shadow-2xs flex items-center gap-1 transition-all cursor-pointer">
              ${Lucide.x} Từ Chối
            </button>
          `);
        }
        if (canApprove) {
          actionButtons.push(`
            <button onclick="BookingUI.handleApproveFromDetail('${b.booking_id}')" type="button" class="px-4 py-2 rounded-xl text-xs font-bold bg-accent-600 hover:bg-accent-700 active:bg-accent-800 text-white shadow-xs flex items-center gap-1.5 transition-all cursor-pointer">
              ${Lucide.check} Duyệt
            </button>
          `);
        }
        footer.innerHTML = `
          <div class="flex items-center justify-end w-full gap-2">
            <button onclick="BookingUI.closeDetailModal()" type="button" class="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer">
              Đóng
            </button>
            ${actionButtons.join('')}
          </div>
        `;
      } else if (b.status === 'APPROVED') {
        footer.innerHTML = `
          <div class="flex items-center justify-end w-full gap-2">
            <button onclick="BookingUI.closeDetailModal()" type="button" class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer">
              Đóng
            </button>
            ${canEdit ? `
              <button onclick="BookingUI.handleSaveApprovedDates('${b.booking_id}')" type="button" class="px-4 py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white shadow-xs flex items-center gap-1.5 transition-all cursor-pointer">
                ${Lucide.check} Lưu Đổi Lịch
              </button>
            ` : ''}
          </div>
        `;
      } else {
        footer.innerHTML = `
          <div class="flex items-center justify-end w-full">
            <button onclick="BookingUI.closeDetailModal()" type="button" class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors">
              Đóng
            </button>
          </div>
        `;
      }
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
  },

  openDetailDatePicker(bookingId) {
    const dropdown = document.getElementById('detail-datepicker-dropdown');
    if (!dropdown) return;

    this.detailBookingId = bookingId;
    const startVal = document.getElementById('detail-edit-start-date')?.value || BookingData.formatDateStr(new Date());
    const [y, m] = startVal.split('-').map(Number);
    if (y && m) {
      this.detailDpYear = y;
      this.detailDpMonth = m - 1;
    }

    this.detailRangeStep = 0;
    this.detailRangeStart = startVal;
    this.detailHoverDate = null;
    this.renderDetailDpGrid();
    dropdown.classList.remove('hidden');
  },

  closeDetailDatePicker() {
    const dropdown = document.getElementById('detail-datepicker-dropdown');
    if (dropdown) dropdown.classList.add('hidden');

    if (this.detailRangeStep === 1) {
      const sDate = this.detailRangeStart || document.getElementById('detail-edit-start-date')?.value;
      if (sDate) {
        this.updateDetailDateRangeDisplay(sDate, sDate);
      }
    }
    this.detailRangeStep = 0;
    this.detailRangeStart = null;
    this.detailHoverDate = null;
  },

  changeDetailDpMonth(delta) {
    this.detailDpMonth += delta;
    if (this.detailDpMonth < 0) {
      this.detailDpMonth = 11;
      this.detailDpYear--;
    } else if (this.detailDpMonth > 11) {
      this.detailDpMonth = 0;
      this.detailDpYear++;
    }
    this.renderDetailDpGrid();
  },

  updateDetailDateRangeDisplay(startDate, endDate) {
    const sDate = startDate || BookingData.formatDateStr(new Date());
    const eDate = (endDate && endDate >= sDate) ? endDate : sDate;

    const startInput = document.getElementById('detail-edit-start-date');
    const endInput = document.getElementById('detail-edit-end-date');
    if (startInput) startInput.value = sDate;
    if (endInput) endInput.value = eDate;

    const d1 = new Date(sDate);
    const d2 = new Date(eDate);
    const diffDays = Math.max(1, Math.round((d2 - d1) / (1000 * 60 * 60 * 24)) + 1);

    const rangeLabel = document.getElementById('label-detail-daterange');
    const rangeSublabel = document.getElementById('sublabel-detail-daterange');
    const durationTag = document.getElementById('label-detail-duration-tag');

    if (diffDays === 1) {
      if (rangeLabel) rangeLabel.textContent = this.formatDateDisplay(sDate);
      if (rangeSublabel) rangeSublabel.textContent = 'Ca trong ngày';
      if (durationTag) durationTag.textContent = '1 ngày';
    } else {
      if (rangeLabel) rangeLabel.textContent = `${this.formatDateDisplay(sDate)} → ${this.formatDateDisplay(eDate)}`;
      if (rangeSublabel) rangeSublabel.textContent = `Ca liên ngày (${diffDays} ngày)`;
      if (durationTag) durationTag.textContent = `${diffDays} ngày`;
    }
  },

  renderDetailDpGrid() {
    const badge = document.getElementById('detail-dp-target-badge');
    const headerTitle = document.getElementById('detail-dp-month-year');
    const gridEl = document.getElementById('detail-dp-days-grid');
    const instructionText = document.getElementById('detail-dp-instruction-text');
    const instructionDot = document.getElementById('detail-dp-instruction-dot');
    if (!gridEl) return;

    const monthNames = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
    if (headerTitle) {
      headerTitle.textContent = `${monthNames[this.detailDpMonth]}, ${this.detailDpYear}`;
    }

    const startDateVal = document.getElementById('detail-edit-start-date')?.value || '';
    const endDateVal = document.getElementById('detail-edit-end-date')?.value || '';
    const todayStr = BookingData.formatDateStr(new Date());

    if (badge && instructionText) {
      if (this.detailRangeStep === 1) {
        badge.textContent = 'Mốc thứ 2';
        badge.className = 'px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-50 text-amber-700 font-condensed border border-amber-200/80';
        instructionText.textContent = `Đã chọn: ${this.formatDateDisplay(startDateVal)}. Nhấp ngày thứ 2 để đặt ca liên ngày, hoặc nhấp lại để xong.`;
        if (instructionDot) instructionDot.className = 'w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0 animate-ping';
      } else {
        badge.textContent = '1 Lịch chọn dải ngày';
        badge.className = 'px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-brand-50 text-brand-700 font-condensed border border-brand-100';
        instructionText.textContent = 'Nhấp 1 ngày để chọn ca 1 ngày. Nhấp ngày thứ 2 để đặt ca liên ngày.';
        if (instructionDot) instructionDot.className = 'w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0 animate-pulse';
      }
    }

    const firstDayOfMonth = new Date(this.detailDpYear, this.detailDpMonth, 1);
    const daysInMonth = new Date(this.detailDpYear, this.detailDpMonth + 1, 0).getDate();
    const dayOfWeek = firstDayOfMonth.getDay();
    const startOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    let html = '';
    for (let i = 0; i < startOffset; i++) {
      html += `<div class="py-1.5"></div>`;
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayStr = `${this.detailDpYear}-${String(this.detailDpMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isPast = dayStr < todayStr;
      const isToday = dayStr === todayStr;

      let cellClass = 'py-1.5 text-center font-bold text-xs transition-all ';

      if (isPast) {
        cellClass += 'opacity-25 text-slate-400 cursor-not-allowed pointer-events-none rounded-xl ';
      } else if (this.detailRangeStep === 1) {
        const isStart = dayStr === startDateVal;
        const isHover = this.detailHoverDate && this.detailHoverDate > startDateVal && dayStr > startDateVal && dayStr < this.detailHoverDate;
        const isHoverEnd = this.detailHoverDate && dayStr === this.detailHoverDate && dayStr > startDateVal;

        if (isStart) {
          cellClass += 'bg-brand-600 text-white font-extrabold shadow-xs cursor-pointer rounded-xl ring-2 ring-brand-300 ';
        } else if (isHoverEnd) {
          cellClass += 'bg-brand-600 text-white font-extrabold shadow-xs cursor-pointer rounded-r-xl ';
        } else if (isHover) {
          cellClass += 'bg-brand-50 text-brand-700 font-bold hover:bg-brand-100 cursor-pointer rounded-none ';
        } else {
          cellClass += 'text-slate-800 hover:bg-slate-100 rounded-xl cursor-pointer ';
          if (isToday) cellClass += 'ring-1 ring-brand-500/50 text-brand-600 ';
        }
      } else {
        const isStart = dayStr === startDateVal;
        const isEnd = dayStr === endDateVal;
        const isSingle = isStart && isEnd;
        const isInRange = startDateVal && endDateVal && dayStr > startDateVal && dayStr < endDateVal;

        if (isSingle) {
          cellClass += 'bg-brand-600 text-white font-extrabold shadow-xs cursor-pointer rounded-xl ';
        } else if (isStart) {
          cellClass += 'bg-brand-600 text-white font-extrabold shadow-xs cursor-pointer rounded-l-xl rounded-r-none ';
        } else if (isEnd) {
          cellClass += 'bg-brand-600 text-white font-extrabold shadow-xs cursor-pointer rounded-r-xl rounded-l-none ';
        } else if (isInRange) {
          cellClass += 'bg-brand-50 text-brand-700 font-bold hover:bg-brand-100 cursor-pointer rounded-none ';
        } else {
          cellClass += 'text-slate-800 hover:bg-slate-100 rounded-xl cursor-pointer ';
          if (isToday) cellClass += 'ring-1 ring-brand-500/50 text-brand-600 ';
        }
      }

      html += `
        <button type="button" 
                data-date="${dayStr}"
                onclick="event.stopPropagation(); BookingUI.selectDetailDpDate('${dayStr}', event)" 
                onmouseenter="BookingUI.handleDetailDpHover('${dayStr}')"
                class="${cellClass}" 
                ${isPast ? 'disabled' : ''}>
          ${day}
        </button>
      `;
    }

    gridEl.innerHTML = html;
  },

  handleDetailDpHover(dateStr) {
    if (this.detailRangeStep !== 1) return;
    const currentStart = this.detailRangeStart || document.getElementById('detail-edit-start-date')?.value;
    if (!currentStart || dateStr <= currentStart) {
      if (this.detailHoverDate) {
        this.detailHoverDate = null;
        this.renderDetailDpGrid();
      }
      return;
    }
    if (this.detailHoverDate === dateStr) return;
    this.detailHoverDate = dateStr;
    this.renderDetailDpGrid();
  },

  handleDetailDpMouseLeave() {
    if (this.detailRangeStep === 1 && this.detailHoverDate) {
      this.detailHoverDate = null;
      this.renderDetailDpGrid();
    }
  },

  selectDetailDpDate(dateStr, event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const todayStr = BookingData.formatDateStr(new Date());
    if (dateStr < todayStr) return;

    const dropdown = document.getElementById('detail-datepicker-dropdown');

    if (this.detailRangeStep === 0) {
      this.detailRangeStep = 1;
      this.detailRangeStart = dateStr;
      this.detailHoverDate = null;
      this.updateDetailDateRangeDisplay(dateStr, dateStr);
      this.renderDetailDpGrid();
      if (dropdown) dropdown.classList.remove('hidden');
    } else {
      const currentStart = this.detailRangeStart || document.getElementById('detail-edit-start-date')?.value || todayStr;
      if (dateStr === currentStart) {
        this.updateDetailDateRangeDisplay(dateStr, dateStr);
        this.detailRangeStep = 0;
        this.detailRangeStart = null;
        this.detailHoverDate = null;
        this.closeDetailDatePicker();
        Toast.show(`Đã chọn ca 1 ngày: ${this.formatDateDisplay(dateStr)}`, 'info', 'Thời gian');
      } else if (dateStr > currentStart) {
        this.updateDetailDateRangeDisplay(currentStart, dateStr);
        this.detailRangeStep = 0;
        this.detailRangeStart = null;
        this.detailHoverDate = null;
        this.closeDetailDatePicker();
        const d1 = new Date(currentStart);
        const d2 = new Date(dateStr);
        const diffDays = Math.max(1, Math.round((d2 - d1) / (1000 * 60 * 60 * 24)) + 1);
        Toast.show(`Đã chọn ca liên ngày (${diffDays} ngày): ${this.formatDateDisplay(currentStart)} → ${this.formatDateDisplay(dateStr)}`, 'info', 'Thời gian');
      } else {
        this.detailRangeStart = dateStr;
        this.updateDetailDateRangeDisplay(dateStr, dateStr);
        this.detailRangeStep = 1;
        this.detailHoverDate = null;
        this.renderDetailDpGrid();
        if (dropdown) dropdown.classList.remove('hidden');
      }
    }
  },

  setDetailDpQuick(type) {
    const today = new Date();
    const todayStr = BookingData.formatDateStr(today);
    let sDate = todayStr;
    let eDate = todayStr;

    if (type === 'today') {
      sDate = todayStr;
      eDate = todayStr;
    } else if (type === 'tomorrow') {
      const d = new Date(today);
      d.setDate(d.getDate() + 1);
      sDate = BookingData.formatDateStr(d);
      eDate = sDate;
    } else if (type === 'plus3') {
      sDate = todayStr;
      const d = new Date(today);
      d.setDate(d.getDate() + 2);
      eDate = BookingData.formatDateStr(d);
    } else if (type === 'plus7') {
      sDate = todayStr;
      const d = new Date(today);
      d.setDate(d.getDate() + 6);
      eDate = BookingData.formatDateStr(d);
    }

    this.detailRangeStep = 0;
    this.detailHoverDate = null;
    this.updateDetailDateRangeDisplay(sDate, eDate);
    this.closeDetailDatePicker();
  },

  handleApproveFromDetail(bookingId) {
    const b = BookingData.bookings.find(item => item.booking_id === bookingId);
    if (!b) return;

    const startInput = document.getElementById('detail-edit-start-date');
    const endInput = document.getElementById('detail-edit-end-date');

    if (startInput && endInput) {
      const newStart = startInput.value;
      const newEnd = endInput.value || newStart;

      if (!newStart) {
        Toast.show('Vui lòng chọn ngày bắt đầu hợp lệ!', 'warning');
        return;
      }
      if (newEnd < newStart) {
        Toast.show('Ngày kết thúc không được trước ngày bắt đầu!', 'warning');
        return;
      }

      // If dates were modified
      if (newStart !== b.booking_date || newEnd !== (b.end_date || b.booking_date)) {
        // Check conflict for technician
        const conflict = BookingData.checkConflict(b.tech_id, newStart, newEnd, bookingId);
        if (conflict.hasConflict) {
          Toast.show(conflict.message, 'warning', 'Xung đột lịch');
          return;
        }

        // Update dates
        b.booking_date = newStart;
        b.end_date = newEnd;
        BookingData.save();
      }
    }

    this.closeDetailModal();
    this.handleApprove(bookingId);
  },

  handleSaveApprovedDates(bookingId) {
    const b = BookingData.bookings.find(item => item.booking_id === bookingId);
    if (!b) return;

    const startInput = document.getElementById('detail-edit-start-date');
    const endInput = document.getElementById('detail-edit-end-date');
    if (!startInput || !endInput) return;

    const newStart = startInput.value;
    const newEnd = endInput.value || newStart;

    const todayStr = BookingData.formatDateStr(new Date());
    if (newStart < todayStr) {
      Toast.show('Không thể dời ca trực vào ngày trong quá khứ! Vui lòng chọn từ hôm nay trở đi.', 'warning', 'Thao tác không hợp lệ');
      return;
    }
    if (newEnd < newStart) {
      Toast.show('Ngày kết thúc không được trước ngày bắt đầu!', 'warning');
      return;
    }

    if (newStart === b.booking_date && newEnd === (b.end_date || b.booking_date)) {
      this.closeDetailModal();
      return;
    }

    // Check conflict
    const conflict = BookingData.checkConflict(b.tech_id, newStart, newEnd, bookingId);
    if (conflict.hasConflict) {
      Toast.show(conflict.message, 'warning', 'Xung đột lịch');
      return;
    }

    // Update dates
    b.booking_date = newStart;
    b.end_date = newEnd;
    BookingData.save();

    const tech = BookingData.technicians.find(t => t.tech_id === b.tech_id);
    const techName = tech ? tech.name : b.tech_id;
    const dateLabel = newStart === newEnd ? newStart : `${newStart} → ${newEnd}`;

    if (b.requester_email) {
      BookingData.addNotification({
        type: 'shift_reminder',
        title: 'Ca trực đã được điều chỉnh ngày',
        message: `Ca trực "${b.title}" của Kỹ sư ${techName} đã được cập nhật sang ngày ${dateLabel}.`,
        tab: 'my-bookings',
        booking_id: b.booking_id,
        target_user: b.requester_email
      });
      this.renderNotifications();
    }

    const client = window.SupabaseConfig ? window.SupabaseConfig.getClient() : null;
    if (client) {
      client.from('bookings').update({ booking_date: newStart, end_date: newEnd }).eq('booking_id', bookingId).then(({ error }) => {
        if (error) console.warn('Supabase update dates warning:', error);
      });
    }

    Toast.show(`Đã cập nhật lịch ca trực sang ${dateLabel}!`, 'success', 'Cập nhật thành công');
    this.closeDetailModal();
    this.render();
  },

  // REJECTION VIEW SWAP (NO BROWSER PROMPT, WITH BACK NAVIGATION)
  openRejectModal(bookingId, from = 'detail') {
    const b = BookingData.bookings.find(item => item.booking_id === bookingId);
    if (!b) return;

    const modal = document.getElementById('detail-modal');
    const content = document.getElementById('detail-modal-content');
    const footer = document.getElementById('detail-modal-footer');
    if (!modal || !content || !footer) return;

    const backAction = from === 'detail' 
      ? `BookingUI.openDetailModal('${bookingId}')` 
      : `BookingUI.closeDetailModal()`;

    content.innerHTML = `
      <div class="space-y-4">
        <!-- Rejection Header with Alert Pill -->
        <div class="flex items-start gap-3 pb-3.5 border-b border-burgundy-100">
          <div class="w-10 h-10 rounded-xl bg-burgundy-50 border border-burgundy-200 text-burgundy-800 flex items-center justify-center flex-shrink-0 shadow-2xs">
            ${Lucide.x}
          </div>
          <div class="min-w-0 flex-1">
            <span class="text-xs font-extrabold font-condensed text-burgundy-800 tracking-wider block">TỪ CHỐI YÊU CẦU</span>
            <h3 class="text-base font-bold text-slate-900 mt-0.5 leading-snug break-words">${b.booking_id}: ${b.title}</h3>
            <p class="text-xs text-slate-500 mt-0.5">Vui lòng cung cấp lý do từ chối để thông báo cho người đặt (${b.requester_name}).</p>
          </div>
        </div>

        <!-- Quick Reason Tags -->
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1.5">Gợi ý lý do nhanh:</label>
          <div class="flex flex-wrap gap-1.5">
            <button type="button" onclick="BookingUI.selectRejectReason('Kỹ sư bận ca ưu tiên')" class="px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium transition-colors shadow-2xs">
              Kỹ sư bận ca ưu tiên
            </button>
            <button type="button" onclick="BookingUI.selectRejectReason('Trùng lịch bảo trì định kỳ')" class="px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium transition-colors shadow-2xs">
              Trùng lịch bảo trì
            </button>
            <button type="button" onclick="BookingUI.selectRejectReason('Sai địa điểm / Cần bổ sung thông tin')" class="px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium transition-colors shadow-2xs">
              Sai địa điểm / Cần bổ sung
            </button>
            <button type="button" onclick="BookingUI.selectRejectReason('Không đủ thiết bị chuyên dụng')" class="px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium transition-colors shadow-2xs">
              Thiếu thiết bị
            </button>
          </div>
        </div>

        <!-- Reason Textarea -->
        <div>
          <label for="reject-reason-input" class="block text-xs font-semibold text-slate-700 mb-1">
            Nội dung lý do từ chối <span class="text-burgundy-800">*</span>
          </label>
          <textarea id="reject-reason-input" rows="3" placeholder="Nhập lý do chi tiết từ chối yêu cầu này..." class="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-xl p-3 focus:border-burgundy-800 focus:ring-1 focus:ring-burgundy-800 outline-none transition-all shadow-2xs resize-none"></textarea>
          <p class="text-[11px] text-slate-400 mt-1">Lý do từ chối sẽ được lưu và gửi đến hộp thông báo của người book.</p>
        </div>
      </div>
    `;

    footer.innerHTML = `
      <div class="flex items-center justify-between w-full">
        <button onclick="${backAction}" type="button" class="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1.5">
          ${Lucide.arrowLeft} Quay lại
        </button>
        <button onclick="BookingUI.confirmReject('${bookingId}')" type="button" class="px-4 py-2 rounded-xl text-xs font-bold bg-burgundy-800 hover:bg-burgundy-900 active:bg-burgundy-950 text-white shadow-xs flex items-center gap-1.5 transition-all">
          ${Lucide.x} Xác Nhận Từ Chối
        </button>
      </div>
    `;

    modal.classList.remove('hidden');
    modal.classList.add('flex');

    setTimeout(() => {
      const textarea = document.getElementById('reject-reason-input');
      if (textarea) textarea.focus();
    }, 50);
  },

  selectRejectReason(reasonText) {
    const input = document.getElementById('reject-reason-input');
    if (input) {
      input.value = reasonText;
      input.focus();
    }
  },

  confirmReject(bookingId) {
    const input = document.getElementById('reject-reason-input');
    const reason = input ? input.value.trim() : '';
    if (!reason) {
      Toast.show('Vui lòng nhập lý do từ chối yêu cầu!', 'warning', 'Thiếu lý do');
      if (input) input.focus();
      return;
    }

    const booking = BookingData.bookings.find(b => b.booking_id === bookingId);
    const res = BookingData.rejectBooking(bookingId, reason, BookingData.currentUser.email);
    if (res.success) {
      this.closeDetailModal();
      Toast.show(`Đã từ chối đơn ${bookingId}. Khung giờ đã được giải phóng.`, 'info', 'Đã từ chối');

      const reqEmail = booking ? booking.requester_email : '';
      const bTitle = booking ? booking.title : '';

      // 1. Thông báo trực tiếp cho người đặt lịch (Requester)
      if (reqEmail) {
        BookingData.addNotification({
          type: 'conflict_alert',
          title: 'Yêu cầu đặt lịch bị từ chối',
          message: `Đơn booking ${bookingId} (${bTitle}) của bạn đã bị từ chối với lý do: "${reason}". Khung giờ đã được giải phóng.`,
          tab: 'my-bookings',
          booking_id: bookingId,
          target_user: reqEmail
        });
      }

      // 2. Thông báo cho Ban điều phối / Admin
      BookingData.addNotification({
        type: 'conflict_alert',
        title: 'Đã từ chối ca trực',
        message: `Đơn booking ${bookingId} (${bTitle}) đã bị từ chối bởi ${BookingData.currentUser?.full_name || 'Người vận hành'}. Lý do: "${reason}".`,
        tab: 'approval',
        booking_id: bookingId,
        required_perm: 'approve_booking',
        target_roles: ['admin', 'approver']
      });

      this.renderNotifications();
      this.render();
    } else {
      Toast.show(res.error, 'error');
    }
  },

  handleRejectFromDetail(bookingId) {
    this.openRejectModal(bookingId, 'detail');
  },

  handleCancelFromDetail(bookingId) {
    this.closeDetailModal();
    this.handleCancel(bookingId);
  },

  closeDetailModal() {
    const modal = document.getElementById('detail-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
    this.closeDetailDatePicker();
  },

  // ==========================================
  // TECHNICIAN MANAGEMENT (UI CONTROLLER)
  // ==========================================
  techSearchQuery: '',

  renderTechnicians() {
    const container = document.getElementById('tech-list-grid');
    const headerCount = document.getElementById('techs-header-count-container');
    const totalEl = document.getElementById('tech-stat-total');
    const activeEl = document.getElementById('tech-stat-active');
    const shiftsEl = document.getElementById('tech-stat-shifts');
    const sidebarBadge = document.getElementById('sidebar-techs-badge');

    const allTechs = BookingData.technicians || [];
    const activeTechs = allTechs.filter(t => t.is_active);

    // 30-day rolling window for dispatched shifts
    const nowTime = Date.now();
    const thirtyDaysAgoTime = nowTime - (30 * 24 * 60 * 60 * 1000);
    const thirtyDaysFutureTime = nowTime + (30 * 24 * 60 * 60 * 1000);
    const shifts30Days = (BookingData.bookings || []).filter(b => {
      if (b.status !== 'APPROVED') return false;
      const dStr = b.booking_date || b.date;
      if (!dStr) return false;
      const bTime = new Date(dStr).getTime();
      if (isNaN(bTime)) return true;
      return bTime >= thirtyDaysAgoTime && bTime <= thirtyDaysFutureTime;
    });

    if (totalEl) totalEl.textContent = allTechs.length;
    if (activeEl) activeEl.textContent = activeTechs.length;
    if (shiftsEl) shiftsEl.textContent = shifts30Days.length;
    if (sidebarBadge) sidebarBadge.textContent = allTechs.length;

    if (!container) return;

    const q = (this.techSearchQuery || '').toLowerCase().trim();
    const filtered = allTechs.filter(t => {
      if (!q) return true;
      const name = (t.name || '').toLowerCase();
      const phone = (t.phone || '').toLowerCase();
      const skills = (Array.isArray(t.skills) ? t.skills.join(' ') : String(t.skills || '')).toLowerCase();
      return name.includes(q) || phone.includes(q) || skills.includes(q);
    });

    if (headerCount) {
      headerCount.innerHTML = `
        <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-800 border border-brand-200 font-condensed">
          ${filtered.length} kỹ sư
        </span>
      `;
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="py-16 text-center">
          <div class="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
          </div>
          <h4 class="text-base font-bold text-slate-900">Không tìm thấy kỹ sư nào phù hợp</h4>
          <p class="text-xs text-slate-500 mt-1">Thử đổi từ khóa tìm kiếm hoặc bấm nút "Thêm Kỹ Sư".</p>
        </div>
      `;
      return;
    }

    const canManageTechs = BookingData.hasPermission('manage_technicians');

    const { page, pageSize } = this.pagination.technicians;
    const totalPages = Math.ceil(filtered.length / pageSize) || 1;
    const curPage = Math.min(Math.max(1, page), totalPages);
    this.pagination.technicians.page = curPage;
    const pagedList = filtered.slice((curPage - 1) * pageSize, curPage * pageSize);

    const cardsHtml = pagedList.map(t => {
      const skillsList = Array.isArray(t.skills) ? t.skills : String(t.skills || '').split(',');
      const assignedCount = BookingData.bookings.filter(b => b.tech_id === t.tech_id && b.status !== 'CANCELLED' && b.status !== 'REJECTED').length;
      const isActive = t.is_active;

      return `
        <div class="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3">
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-center gap-3 min-w-0">
              <img src="${t.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80'}" alt="${t.name}" class="w-11 h-11 rounded-full object-cover border border-slate-200 shadow-2xs flex-shrink-0">
              <div class="min-w-0">
                <h4 class="font-bold text-slate-900 text-sm leading-tight truncate">${t.name}</h4>
                <span class="text-[10px] font-extrabold font-condensed text-brand-600 uppercase tracking-wider block mt-0.5">${t.tech_id}</span>
              </div>
            </div>
            ${canManageTechs ? `
              <button type="button" onclick="BookingUI.toggleTechStatus('${t.tech_id}')" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all cursor-pointer ${isActive ? 'bg-accent-50 text-accent-700 border-accent-200' : 'bg-slate-100 text-slate-600 border-slate-200'}">
                <span class="w-1.5 h-1.5 rounded-full ${isActive ? 'bg-accent-500' : 'bg-slate-400'}"></span>
                <span>${isActive ? 'Hoạt động' : 'Tạm dừng'}</span>
              </button>
            ` : `
              <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${isActive ? 'bg-accent-50 text-accent-700 border-accent-200' : 'bg-slate-100 text-slate-600 border-slate-200'}">
                <span class="w-1.5 h-1.5 rounded-full ${isActive ? 'bg-accent-500' : 'bg-slate-400'}"></span>
                <span>${isActive ? 'Hoạt động' : 'Tạm dừng'}</span>
              </span>
            `}
          </div>

          <div class="flex flex-wrap gap-1">
            ${skillsList.map(s => `
              <span class="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200/60">${s.trim()}</span>
            `).join('')}
          </div>

          <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span class="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold font-condensed bg-brand-50 text-brand-700 border border-brand-100">
              ${assignedCount} ca trực
            </span>
            <a href="tel:${t.phone}" class="h-9 px-3 rounded-lg bg-slate-50 border border-slate-200 hover:border-brand-500 text-slate-800 hover:text-brand-600 inline-flex items-center gap-1.5 font-bold font-condensed text-xs transition-colors">
              <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              <span>${t.phone || 'Chưa có SĐT'}</span>
            </a>
          </div>

          ${canManageTechs ? `
            <div class="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
              <button type="button" onclick="BookingUI.openTechModal('${t.tech_id}')" class="h-10 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer">
                <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                Sửa
              </button>
              <button type="button" onclick="BookingUI.deleteTech('${t.tech_id}')" class="h-10 rounded-lg border border-rose-200 hover:bg-rose-50 text-rose-600 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                Xóa
              </button>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    const tableRowsHtml = pagedList.map(t => {
      const skillsList = Array.isArray(t.skills) ? t.skills : String(t.skills || '').split(',');
      const assignedCount = BookingData.bookings.filter(b => b.tech_id === t.tech_id && b.status !== 'CANCELLED' && b.status !== 'REJECTED').length;
      const isActive = t.is_active;

      return `
        <tr class="hover:bg-slate-50/60 transition-colors">
          <td class="py-3 px-3.5 whitespace-nowrap">
            <div class="flex items-center gap-3">
              <img src="${t.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80'}" alt="${t.name}" class="w-9 h-9 rounded-full object-cover border border-slate-200 shadow-2xs flex-shrink-0">
              <div class="min-w-0">
                <p class="font-bold text-slate-900 text-sm leading-tight">${t.name}</p>
                <p class="text-[10px] font-extrabold font-condensed text-brand-600 uppercase tracking-wider mt-0.5">${t.tech_id}</p>
              </div>
            </div>
          </td>
          <td class="py-3 px-3.5 whitespace-nowrap">
            <a href="tel:${t.phone}" class="inline-flex items-center gap-1.5 font-bold text-slate-700 hover:text-brand-600 font-condensed tracking-wide">
              <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              <span>${t.phone || 'Chưa cập nhật'}</span>
            </a>
          </td>
          <td class="py-3 px-3.5 min-w-[200px]">
            <div class="flex flex-wrap gap-1">
              ${skillsList.map(s => `
                <span class="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200/60">${s.trim()}</span>
              `).join('')}
            </div>
          </td>
          <td class="py-3 px-3.5 whitespace-nowrap">
            <span class="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold font-condensed bg-brand-50 text-brand-700 border border-brand-100">
              ${assignedCount} ca trực
            </span>
          </td>
          <td class="py-3 px-3.5 whitespace-nowrap">
            ${canManageTechs ? `
              <button type="button" onclick="BookingUI.toggleTechStatus('${t.tech_id}')" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all cursor-pointer ${isActive ? 'bg-accent-50 text-accent-700 border-accent-200 hover:bg-accent-100' : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'}" title="Nhấp để đổi trạng thái">
                <span class="w-1.5 h-1.5 rounded-full ${isActive ? 'bg-accent-500' : 'bg-slate-400'}"></span>
                <span>${isActive ? 'Hoạt động' : 'Tạm dừng'}</span>
              </button>
            ` : `
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${isActive ? 'bg-accent-50 text-accent-700 border-accent-200' : 'bg-slate-100 text-slate-600 border-slate-200'}">
                <span class="w-1.5 h-1.5 rounded-full ${isActive ? 'bg-accent-500' : 'bg-slate-400'}"></span>
                <span>${isActive ? 'Hoạt động' : 'Tạm dừng'}</span>
              </span>
            `}
          </td>
          ${canManageTechs ? `
            <td class="py-3 px-3.5 text-right whitespace-nowrap">
              <div class="flex items-center justify-end gap-1.5">
                <button type="button" onclick="BookingUI.openTechModal('${t.tech_id}')" class="p-1.5 rounded-lg text-slate-600 hover:text-brand-600 hover:bg-brand-50 transition-colors cursor-pointer" title="Sửa thông tin">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                </button>
                <button type="button" onclick="BookingUI.deleteTech('${t.tech_id}')" class="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer" title="Xóa kỹ sư">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </button>
              </div>
            </td>
          ` : ''}
        </tr>
      `;
    }).join('');

    let html = `
      <!-- Mobile View (Cards) -->
      <div class="lg:hidden space-y-3 pt-3">
        ${cardsHtml}
      </div>

      <!-- Desktop View (Table) -->
      <div class="hidden lg:block overflow-x-auto pt-3">
        <table class="w-full text-left text-xs text-slate-600" style="min-width: 840px;">
          <thead class="text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50/70 border-b border-slate-100">
            <tr>
              <th class="py-3 px-3.5 rounded-l-xl">Kỹ Sư</th>
              <th class="py-3 px-3.5">Liên Hệ</th>
              <th class="py-3 px-3.5">Chuyên Môn & Năng Lực</th>
              <th class="py-3 px-3.5">Khối Lượng Ca</th>
              <th class="py-3 px-3.5">Trạng Thái</th>
              ${canManageTechs ? '<th class="py-3 px-3.5 text-right rounded-r-xl">Thao Tác</th>' : ''}
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            ${tableRowsHtml}
          </tbody>
        </table>
      </div>
      ${this.renderPaginationHtml('technicians', filtered.length, curPage, pageSize)}
    `;
    container.innerHTML = html;
  },

  filterTechnicians(query) {
    this.techSearchQuery = query;
    if (this.pagination.technicians) this.pagination.technicians.page = 1;
    this.renderTechnicians();
  },

  openTechModal(techId = null) {
    if (!BookingData.hasPermission('manage_technicians')) {
      Toast.show('Tài khoản của bạn không được cấp quyền "Thêm & Sửa kỹ sư"!', 'error', 'Từ chối quyền');
      return;
    }

    const modal = document.getElementById('tech-modal');
    const titleEl = document.getElementById('tech-modal-title');
    const submitTextEl = document.getElementById('tech-modal-submit-text');
    const idInput = document.getElementById('tech-modal-id');
    const nameInput = document.getElementById('tech-modal-name');
    const phoneInput = document.getElementById('tech-modal-phone');
    const emailInput = document.getElementById('tech-modal-email');
    const passwordInput = document.getElementById('tech-modal-password');
    const skillsInput = document.getElementById('tech-modal-skills');
    const avatarInput = document.getElementById('tech-modal-avatar');
    const avatarFileInput = document.getElementById('tech-modal-avatar-file');
    const avatarPreview = document.getElementById('tech-modal-avatar-preview');
    const activeCheckbox = document.getElementById('tech-modal-active');

    if (avatarFileInput) avatarFileInput.value = '';
    if (passwordInput) passwordInput.value = '';

    if (!modal) return;

    if (techId) {
      const tech = BookingData.technicians.find(t => t.tech_id === techId);
      if (tech) {
        if (titleEl) titleEl.textContent = `Chỉnh Sửa Kỹ Sư (${tech.tech_id})`;
        if (submitTextEl) submitTextEl.textContent = 'Cập Nhật Kỹ Sư';
        if (idInput) idInput.value = tech.tech_id;
        if (nameInput) nameInput.value = tech.name;
        if (phoneInput) phoneInput.value = tech.phone;
        if (emailInput) { emailInput.value = tech.email || ''; emailInput.readOnly = true; }
        if (skillsInput) skillsInput.value = Array.isArray(tech.skills) ? tech.skills.join(', ') : tech.skills;
        if (avatarInput) avatarInput.value = tech.avatar || '';
        if (avatarPreview) avatarPreview.src = tech.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80';
        if (activeCheckbox) activeCheckbox.checked = tech.is_active;
      }
    } else {
      if (titleEl) titleEl.textContent = 'Thêm Mới Kỹ Thuật Viên';
      if (submitTextEl) submitTextEl.textContent = 'Lưu Kỹ Sư';
      if (idInput) idInput.value = '';
      if (nameInput) nameInput.value = '';
      if (phoneInput) phoneInput.value = '';
      if (emailInput) { emailInput.value = ''; emailInput.readOnly = false; }
      if (skillsInput) skillsInput.value = '';
      if (avatarInput) avatarInput.value = '';
      if (avatarPreview) avatarPreview.src = 'https://ui-avatars.com/api/?name=%3F&background=f1f5f9&color=94a3b8';
      if (activeCheckbox) activeCheckbox.checked = true;
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    if (nameInput) nameInput.focus();
  },

  closeTechModal() {
    const modal = document.getElementById('tech-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  },

  updateTechAvatarPreview(url) {
    const preview = document.getElementById('tech-modal-avatar-preview');
    if (preview) {
      preview.src = url ? url : 'https://ui-avatars.com/api/?name=%3F&background=f1f5f9&color=94a3b8';
    }
  },

  handleTechAvatarUpload(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      Toast.show('Vui lòng chọn file hình ảnh hợp lệ (PNG, JPG, WebP)!', 'error');
      e.target.value = '';
      return;
    }

    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      Toast.show(`Dung lượng ảnh gốc quá lớn (${(file.size / (1024 * 1024)).toFixed(1)} MB)! Vui lòng chọn ảnh nhỏ hơn 5MB.`, 'error');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const img = new Image();
      img.onload = () => {
        const targetSize = 256;
        const canvas = document.createElement('canvas');
        canvas.width = targetSize;
        canvas.height = targetSize;
        const ctx = canvas.getContext('2d');

        const w = img.width;
        const h = img.height;
        let sWidth, sHeight, sx, sy;

        if (w > h) {
          sHeight = h;
          sWidth = h;
          sx = (w - h) / 2;
          sy = 0;
        } else {
          sWidth = w;
          sHeight = w;
          sx = 0;
          sy = (h - w) / 2;
        }

        ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, targetSize, targetSize);
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.88);

        const avatarInput = document.getElementById('tech-modal-avatar');
        if (avatarInput) avatarInput.value = compressedBase64;
        this.updateTechAvatarPreview(compressedBase64);
        Toast.show('Đã tải và nén ảnh đại diện kỹ sư thành công!', 'success');
      };
      img.onerror = () => {
        Toast.show('Không thể đọc file ảnh. Vui lòng thử lại!', 'error');
      };
      img.src = uploadEvent.target.result;
    };
    reader.readAsDataURL(file);
  },

  clearTechAvatar() {
    const avatarInput = document.getElementById('tech-modal-avatar');
    const avatarFileInput = document.getElementById('tech-modal-avatar-file');
    if (avatarInput) avatarInput.value = '';
    if (avatarFileInput) avatarFileInput.value = '';
    this.updateTechAvatarPreview('');
  },

  addSkillTag(skill) {
    const input = document.getElementById('tech-modal-skills');
    if (!input) return;
    const current = input.value.trim();
    if (!current) {
      input.value = skill;
    } else {
      const parts = current.split(',').map(s => s.trim());
      if (!parts.includes(skill)) {
        input.value = `${current}, ${skill}`;
      }
    }
  },

  async saveTech(e) {
    e.preventDefault();
    const idInput = document.getElementById('tech-modal-id');
    const nameInput = document.getElementById('tech-modal-name');
    const phoneInput = document.getElementById('tech-modal-phone');
    const emailInput = document.getElementById('tech-modal-email');
    const passwordInput = document.getElementById('tech-modal-password');
    const skillsInput = document.getElementById('tech-modal-skills');
    const avatarInput = document.getElementById('tech-modal-avatar');
    const activeCheckbox = document.getElementById('tech-modal-active');
    const submitBtn = document.getElementById('btn-tech-modal-submit');
    const submitTextEl = document.getElementById('tech-modal-submit-text');

    const techId = idInput ? idInput.value : '';
    const name = nameInput ? nameInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const password = passwordInput ? passwordInput.value.trim() : '';
    const skills = skillsInput ? skillsInput.value.trim() : '';
    const avatar = avatarInput ? avatarInput.value.trim() : '';
    const isActive = activeCheckbox ? activeCheckbox.checked : true;

    if (!name) {
      Toast.show('Vui lòng nhập họ tên kỹ sư!', 'error');
      return;
    }

    if (!techId && !email) {
      Toast.show('Vui lòng nhập Email đăng nhập cho kỹ sư!', 'error');
      return;
    }

    if (password && password.length < 6) {
      Toast.show('Mật khẩu phải có ít nhất 6 ký tự!', 'error');
      return;
    }

    const origText = submitTextEl ? submitTextEl.textContent : 'Lưu Kỹ Sư';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.add('opacity-70', 'cursor-wait');
    }
    if (submitTextEl) {
      submitTextEl.textContent = techId ? 'Đang cập nhật...' : 'Đang tạo kỹ sư...';
    }

    try {
      if (techId) {
        // Update existing
        const result = await BookingData.updateTechnician(techId, {
          name,
          phone,
          email,
          password,
          skills,
          avatar,
          is_active: isActive
        });
        if (!result || !result.success) {
          Toast.show(result?.error || 'Không thể cập nhật thông tin kỹ sư.', 'error');
          return;
        }
        Toast.show(
          password
            ? `Đã cập nhật kỹ sư ${name} và đổi mật khẩu đăng nhập thành công!`
            : `Đã cập nhật thông tin kỹ sư ${name} thành công!`,
          'success'
        );
      } else {
        // Create new
        const result = await BookingData.addTechnician({
          name, phone, email, password, skills, avatar, is_active: isActive
        });
        if (!result.success) {
          Toast.show(result.error, 'error');
          return;
        }
        if (result.rateLimitedFallback) {
          Toast.show(
            `Đã tạo kỹ sư ${name} (${result.technician.tech_id}) trên Supabase Auth! Do hạn mức gửi mail, mật khẩu tạm là: ${result.tempPassword}`,
            'warning',
            'Tạo kỹ sư thành công'
          );
        } else if (result.passwordSet || password) {
          Toast.show(
            `Đã tạo kỹ sư ${name} (${result.technician.tech_id}) và kích hoạt tài khoản đăng nhập trên Authentication!`,
            'success',
            'Tạo kỹ sư thành công'
          );
        } else {
          Toast.show(
            `Đã tạo kỹ sư ${name} (${result.technician.tech_id}) trên Authentication và gửi email mời đặt mật khẩu!`,
            'success',
            'Tạo kỹ sư thành công'
          );
        }
      }

      this.closeTechModal();
      this.renderTechnicians();
      this.renderHorizontalTechList();
      this.initCustomTechDropdown();
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('opacity-70', 'cursor-wait');
      }
      if (submitTextEl) {
        submitTextEl.textContent = origText;
      }
    }
  },

  async toggleTechStatus(techId) {
    const res = await BookingData.toggleTechnicianStatus(techId);
    if (res && res.success && res.technician) {
      Toast.show(`Kỹ sư ${res.technician.name} đã chuyển sang trạng thái: ${res.technician.is_active ? 'Hoạt động' : 'Tạm dừng'}`, 'info');
      this.renderTechnicians();
      this.renderHorizontalTechList();
    } else if (res && !res.success) {
      Toast.show(res.error || 'Không thể đổi trạng thái kỹ sư.', 'error');
    }
  },

  async deleteTech(techId) {
    const tech = BookingData.technicians.find(t => t.tech_id === techId);
    if (!tech) return;

    if (!confirm(`Bạn có chắc chắn muốn xóa kỹ sư ${tech.name} (${tech.tech_id}) khỏi hệ thống? Tài khoản đăng nhập của kỹ sư cũng sẽ bị xóa.`)) {
      return;
    }

    const res = await BookingData.deleteTechnician(techId);
    if (!res || !res.success) {
      Toast.show(res?.error || 'Không thể xóa kỹ sư.', 'error');
      return;
    }
    Toast.show(`Đã xóa kỹ sư ${tech.name} và thu hồi tài khoản đăng nhập.`, 'info');
    this.renderTechnicians();
    this.renderHorizontalTechList();
    this.initCustomTechDropdown();
  },

  // ==========================================
  // USER & GRANULAR RBAC MANAGEMENT (UI CONTROLLER)
  // ==========================================
  userFilter: 'all',
  userSearchQuery: '',
  userReferrerFilter: 'all',
  profileTargetEmail: null,

  setReferrerFilter(refEmail) {
    if (this.userReferrerFilter === refEmail) {
      this.userReferrerFilter = 'all';
    } else {
      this.userReferrerFilter = refEmail;
    }
    if (this.pagination.users) this.pagination.users.page = 1;
    this.renderUsers();
  },

  renderReferrers() {
    const container = document.getElementById('referrers-chips-container');
    if (!container) return;

    const summary = BookingData.getReferrersSummary();
    const isAll = this.userReferrerFilter === 'all';

    let html = `
      <button type="button" onclick="BookingUI.setReferrerFilter('all')" class="px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${isAll ? 'bg-brand-600 text-white shadow-2xs' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'}">
        Tất cả (${BookingData.users.length})
      </button>
    `;

    summary.forEach(item => {
      const u = item.referrer;
      const isActive = this.userReferrerFilter.toLowerCase() === u.email.toLowerCase();
      html += `
        <button type="button" onclick="BookingUI.setReferrerFilter('${u.email}')" class="px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${isActive ? 'bg-amber-500 text-slate-950 shadow-2xs font-extrabold' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'}">
          <svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${u.role === 'admin' ? 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' : 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'}"/></svg>
          <span>${BookingData.cleanUserName(u.full_name)}</span>
          <span class="px-1.5 py-0.2 rounded-full text-[9px] ${isActive ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-600 font-bold'}">${item.count} user</span>
        </button>
      `;
    });

    container.innerHTML = html;
  },

  renderUsers() {
    const tbody = document.getElementById('user-table-tbody');
    const countAll = document.getElementById('user-count-all');
    const countAdmin = document.getElementById('user-count-admin');
    const countApprover = document.getElementById('user-count-approver');
    const countRequester = document.getElementById('user-count-requester');

    const users = BookingData.users || [];
    const admins = users.filter(u => u.role === 'admin');
    const approvers = users.filter(u => u.role === 'approver');
    const requesters = users.filter(u => u.role === 'requester');

    if (countAll) countAll.textContent = users.length;
    if (countAdmin) countAdmin.textContent = admins.length;
    if (countApprover) countApprover.textContent = approvers.length;
    if (countRequester) countRequester.textContent = requesters.length;

    // Render referrers chips
    this.renderReferrers();

    // Update filter tab active styles
    ['all', 'admin', 'approver', 'requester'].forEach(f => {
      const btn = document.getElementById(`user-filter-${f}`);
      if (!btn) return;
      if (this.userFilter === f) {
        btn.className = 'px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-slate-900 shadow-2xs transition-all cursor-pointer';
      } else {
        btn.className = 'px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 transition-all cursor-pointer';
      }
    });

    if (!tbody) return;

    const q = (this.userSearchQuery || '').toLowerCase().trim();
    const filtered = users.filter(u => {
      if (this.userFilter !== 'all' && u.role !== this.userFilter) return false;
      if (this.userReferrerFilter !== 'all') {
        const refMatch = (u.referrer_email || '').toLowerCase() === this.userReferrerFilter.toLowerCase();
        if (!refMatch) return false;
      }
      if (!q) return true;
      const email = (u.email || '').toLowerCase();
      const name = (u.full_name || '').toLowerCase();
      const dept = (u.department || '').toLowerCase();
      const refEmail = (u.referrer_email || '').toLowerCase();
      return email.includes(q) || name.includes(q) || dept.includes(q) || refEmail.includes(q);
    });

    const mobileContainer = document.getElementById('user-mobile-cards-container');

    if (filtered.length === 0) {
      if (tbody) {
        tbody.innerHTML = `
          <tr>
            <td colspan="6" class="py-10 text-center text-slate-400">
              <p class="text-xs font-bold text-slate-600">Không tìm thấy tài khoản người dùng nào</p>
              <p class="text-[11px] text-slate-400 mt-1">Thử đổi bộ lọc hoặc thêm tài khoản mới.</p>
            </td>
          </tr>
        `;
      }
      if (mobileContainer) {
        mobileContainer.innerHTML = `
          <div class="py-12 text-center text-slate-400 bg-white rounded-xl border border-slate-200/80 p-4">
            <p class="text-xs font-bold text-slate-600">Không tìm thấy tài khoản người dùng nào</p>
            <p class="text-[11px] text-slate-400 mt-1">Thử đổi bộ lọc hoặc thêm tài khoản mới.</p>
          </div>
        `;
      }
      const pagContainer = document.getElementById('user-pagination-container');
      if (pagContainer) pagContainer.innerHTML = '';
      return;
    }

    // ⭐ Root Admin luôn xếp đầu tiên trong bảng admin
    filtered.sort((a, b) => {
      const aEmail = (a.email || '').toLowerCase();
      const bEmail = (b.email || '').toLowerCase();
      const aIsSuper = BookingData.ROOT_ADMIN_EMAILS ? BookingData.ROOT_ADMIN_EMAILS.includes(aEmail) : (aEmail === 'vutranpk@gmail.com' || aEmail === 'louisdang.design@gmail.com');
      const bIsSuper = BookingData.ROOT_ADMIN_EMAILS ? BookingData.ROOT_ADMIN_EMAILS.includes(bEmail) : (bEmail === 'vutranpk@gmail.com' || bEmail === 'louisdang.design@gmail.com');

      if (aIsSuper && !bIsSuper) return -1;
      if (!aIsSuper && bIsSuper) return 1;
      if (aIsSuper && bIsSuper) {
        return aEmail === 'vutranpk@gmail.com' ? -1 : 1;
      }
      return 0;
    });

    const canManageUsers = BookingData.hasPermission('manage_users');
    const canManagePerms = BookingData.hasPermission('manage_permissions');

    const { page, pageSize } = this.pagination.users;
    const totalPages = Math.ceil(filtered.length / pageSize) || 1;
    const curPage = Math.min(Math.max(1, page), totalPages);
    this.pagination.users.page = curPage;

    const pagedUsers = filtered.slice((curPage - 1) * pageSize, curPage * pageSize);

    // Build Mobile Cards
    const cardsHtml = pagedUsers.map(u => {
      const uEmail = (u.email || '').toLowerCase();
      const isSuper = (typeof BookingData !== 'undefined' && BookingData.ROOT_ADMIN_EMAILS)
        ? BookingData.ROOT_ADMIN_EMAILS.includes(uEmail)
        : (uEmail === 'vutranpk@gmail.com' || uEmail === 'louisdang.design@gmail.com');
      const initials = (u.full_name || 'U').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
      const perms = u.permissions || BookingData.ROLE_PERMISSIONS[u.role] || [];
      const totalPerms = BookingData.ALL_PERMISSIONS.length;

      let roleBadge = '';
      if (u.role === 'admin') {
        roleBadge = `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs">👑 Admin cấp cao</span>`;
      } else if (u.role === 'approver') {
        roleBadge = `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-brand-50 text-brand-800 border border-brand-200 shadow-2xs">🛡️ Người vận hành</span>`;
      } else {
        roleBadge = `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">👤 User bình thường</span>`;
      }

      const ref = BookingData.getReferrer(u);
      let refDisplay = '';
      if (isSuper) {
        refDisplay = `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">👑 Gốc hệ thống</span>`;
      } else if (ref) {
        refDisplay = `<span class="text-xs font-semibold text-slate-800 truncate">${BookingData.cleanUserName(ref.full_name)}</span>`;
      } else if (u.referrer_email) {
        refDisplay = `<span class="text-[11px] font-mono text-slate-600 truncate">${u.referrer_email}</span>`;
      } else {
        refDisplay = `<span class="text-[10px] text-slate-400 italic">Chưa liên kết</span>`;
      }

      const cleanName = BookingData.cleanUserName(u.full_name);

      return `
        <div onclick="BookingUI.openUserDetail('${u.email}')" class="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 cursor-pointer hover:border-brand-300 active:scale-[0.99] transition-all">
          <div class="flex items-start justify-between gap-2">
            <div class="flex items-center gap-2.5 min-w-0">
              ${u.avatar ? `
                <img src="${u.avatar}" alt="" class="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-2xs flex-shrink-0">
              ` : `
                <div class="w-10 h-10 rounded-full ${isSuper ? 'bg-amber-500 text-white' : (u.role === 'approver' ? 'bg-brand-50 text-brand-700' : 'bg-slate-200 text-slate-700')} font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-2xs">
                  ${initials}
                </div>
              `}
              <div class="min-w-0">
                <h4 class="font-bold text-slate-900 text-sm truncate leading-tight">${cleanName}</h4>
                <p class="text-[11px] text-slate-400 font-mono truncate mt-0.5">${u.email}</p>
              </div>
            </div>
            ${roleBadge}
          </div>

          <div class="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
            <div>
              <span class="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">Phòng ban</span>
              <span class="text-slate-700 font-medium truncate block">${u.department || 'Phòng Dự án'}</span>
            </div>
            <div>
              <span class="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">Quyền hạn</span>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold ${perms.length === totalPerms ? 'bg-amber-100 text-amber-800' : (perms.length >= 8 ? 'bg-brand-50 text-brand-700' : 'bg-slate-100 text-slate-600')} font-condensed inline-block">
                ${perms.length}/${totalPerms} quyền
              </span>
            </div>
          </div>

          <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <div class="min-w-0 flex-1">
              <span class="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">Người giới thiệu</span>
              <div class="truncate">${refDisplay}</div>
            </div>
            ${canManagePerms ? `
              <button type="button" onclick="event.stopPropagation(); BookingUI.openUserDetail('${u.email}')" class="h-9 px-3 rounded-xl bg-slate-100 hover:bg-brand-50 text-slate-700 hover:text-brand-600 font-bold text-xs transition-colors flex items-center gap-1.5 ml-2 cursor-pointer flex-shrink-0">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
                <span>Phân quyền</span>
              </button>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');

    // Build Desktop Table Rows
    const tableRowsHtml = pagedUsers.map(u => {
      const uEmail = (u.email || '').toLowerCase();
      const isSuper = (typeof BookingData !== 'undefined' && BookingData.ROOT_ADMIN_EMAILS)
        ? BookingData.ROOT_ADMIN_EMAILS.includes(uEmail)
        : (uEmail === 'vutranpk@gmail.com' || uEmail === 'louisdang.design@gmail.com');
      const initials = (u.full_name || 'U').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
      const perms = u.permissions || BookingData.ROLE_PERMISSIONS[u.role] || [];
      const totalPerms = BookingData.ALL_PERMISSIONS.length;

      let roleBadge = '';
      if (u.role === 'admin') {
        roleBadge = `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs">👑 Admin cấp cao</span>`;
      } else if (u.role === 'approver') {
        roleBadge = `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-brand-50 text-brand-800 border border-brand-200 shadow-2xs">🛡️ Người vận hành</span>`;
      } else {
        roleBadge = `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">👤 User bình thường</span>`;
      }

      // Referrer display
      const ref = BookingData.getReferrer(u);
      let refDisplay = '';
      if (isSuper) {
        refDisplay = `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 shadow-2xs">👑 Gốc hệ thống</span>`;
      } else if (ref) {
        const refInitials = (ref.full_name || 'R').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
        refDisplay = `
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold text-[9px] flex items-center justify-center flex-shrink-0">
              ${refInitials}
            </div>
            <div class="min-w-0">
              <p class="font-bold text-slate-800 text-[11px] truncate leading-tight">${BookingData.cleanUserName(ref.full_name)}</p>
              <p class="text-[10px] text-brand-600 font-mono truncate">${ref.email}</p>
            </div>
          </div>
        `;
      } else if (u.referrer_email) {
        refDisplay = `<span class="text-[11px] font-mono text-slate-600 truncate">${u.referrer_email}</span>`;
      } else {
        refDisplay = `<span class="text-[10px] text-slate-400 italic">Chưa liên kết</span>`;
      }

      const cleanName = BookingData.cleanUserName(u.full_name);

      return `
        <tr onclick="BookingUI.openUserDetail('${u.email}')" class="hover:bg-slate-50/70 transition-colors cursor-pointer group">
          <!-- Người dùng -->
          <td class="py-3 px-3.5">
            <div class="flex items-center gap-2.5">
              ${u.avatar ? `
                <img src="${u.avatar}" alt="" class="w-8 h-8 rounded-full object-cover border border-slate-200 shadow-2xs flex-shrink-0">
              ` : `
                <div class="w-8 h-8 rounded-full ${isSuper ? 'bg-amber-500 text-white' : (u.role === 'approver' ? 'bg-brand-50 text-brand-700' : 'bg-slate-200 text-slate-700')} font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-2xs">
                  ${initials}
                </div>
              `}
              <div class="min-w-0">
                <div class="flex items-center gap-1.5">
                  <p class="font-bold text-slate-900 group-hover:text-brand-600 transition-colors truncate">${cleanName}</p>
                </div>
                <p class="text-[11px] text-slate-400 truncate">${u.email}</p>
              </div>
            </div>
          </td>

          <!-- Người Giới Thiệu -->
          <td class="py-3 px-3.5">
            ${refDisplay}
          </td>

          <!-- Phòng ban -->
          <td class="py-3 px-3.5 text-slate-700 font-medium">
            ${u.department || 'Phòng Dự án'}
          </td>

          <!-- Cấp bậc -->
          <td class="py-3 px-3.5">
            ${roleBadge}
          </td>

          <!-- Quyền hạn chi tiết -->
          <td class="py-3 px-3.5">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold ${perms.length === totalPerms ? 'bg-amber-100 text-amber-800' : (perms.length >= 8 ? 'bg-brand-50 text-brand-700' : 'bg-slate-100 text-slate-600')} font-condensed">
                ${perms.length}/${totalPerms} quyền
              </span>
              <span class="text-[10px] text-slate-400">(${perms.length === totalPerms ? 'Toàn quyền' : 'Theo chức năng'})</span>
            </div>
          </td>

          <!-- Thao tác -->
          <td class="py-3 px-3.5 text-right whitespace-nowrap">
            <div class="flex items-center justify-end gap-1.5">
              ${canManagePerms ? `
                <button type="button" onclick="event.stopPropagation(); BookingUI.openUserDetail('${u.email}')" class="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 hover:bg-brand-50 text-slate-700 hover:text-brand-600 transition-colors cursor-pointer flex items-center gap-1">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
                  <span>Chi tiết & Phân quyền</span>
                </button>
              ` : ''}

              ${canManageUsers && !isSuper ? `
                <button type="button" onclick="event.stopPropagation(); BookingUI.deleteUser('${u.email}')" class="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer" title="Xóa tài khoản">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </button>
              ` : ''}
            </div>
          </td>
        </tr>
      `;
    }).join('');

    if (tbody) tbody.innerHTML = tableRowsHtml;
    if (mobileContainer) mobileContainer.innerHTML = cardsHtml;

    const pagContainer = document.getElementById('user-pagination-container');
    if (pagContainer) {
      pagContainer.innerHTML = this.renderPaginationHtml('users', filtered.length, curPage, pageSize);
    }
  },

  setUserFilter(filter) {
    this.userFilter = filter;
    if (this.pagination.users) this.pagination.users.page = 1;
    this.renderUsers();
  },

  filterUsers(query) {
    this.userSearchQuery = query;
    if (this.pagination.users) this.pagination.users.page = 1;
    this.renderUsers();
  },

  renderReferrerSelectOptions(selectedEmail = '') {
    this.renderDetailReferrerOptions(selectedEmail);
  },

  // ==========================================
  // DEDICATED USER DETAIL PAGE CONTROLLER (NOT A MODAL)
  // ==========================================
  openUserDetail(email = null) {
    if (!email) {
      this.openUserAdd();
      return;
    }

    if (!BookingData.hasPermission('manage_permissions') && !BookingData.hasPermission('manage_users')) {
      Toast.show('Bạn không có quyền quản trị hoặc phân quyền người dùng!', 'error', 'Từ chối quyền');
      return;
    }

    const listView = document.getElementById('users-list-view');
    const detailView = document.getElementById('user-detail-view');
    const addView = document.getElementById('user-add-view');
    if (!detailView) return;

    if (listView) listView.classList.add('hidden');
    if (addView) addView.classList.add('hidden');
    detailView.classList.remove('hidden');

    const breadcrumbName = document.getElementById('user-detail-breadcrumb-name');
    const pageTitle = document.getElementById('user-detail-page-title');
    const isEditInput = document.getElementById('user-detail-is-edit');
    const emailInput = document.getElementById('user-detail-email');
    const emailHint = document.getElementById('user-detail-email-hint');
    const nameInput = document.getElementById('user-detail-name');
    const deptInput = document.getElementById('user-detail-dept');
    const phoneInput = document.getElementById('user-detail-phone');
    const passwordInput = document.getElementById('user-detail-password');
    const passHint = document.getElementById('user-detail-pass-lock-hint');
    const refLockHint = document.getElementById('user-detail-ref-lock-hint');
    const avatarUrlInput = document.getElementById('user-detail-avatar-url');

    // Identity Banner elements
    const nameDisplay = document.getElementById('user-detail-name-display');
    const emailDisplay = document.getElementById('user-detail-email-display');
    const deptDisplay = document.getElementById('user-detail-dept-display');
    const roleBadge = document.getElementById('user-detail-role-badge');
    const superBadge = document.getElementById('user-detail-super-badge');

    const callerIsAdmin = BookingData.isSuperAdmin();
    let selectedRole = null;
    let selectedPerms = [];

    const user = BookingData.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      const cleanName = BookingData.cleanUserName(user.full_name);
      if (breadcrumbName) breadcrumbName.textContent = cleanName;
      if (pageTitle) pageTitle.textContent = `Hồ Sơ & Phân Quyền: ${cleanName}`;
      if (isEditInput) isEditInput.value = 'true';

      if (emailInput) {
        emailInput.value = user.email;
        emailInput.readOnly = !callerIsAdmin;
        emailInput.className = callerIsAdmin
          ? 'w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-500/20 font-mono'
          : 'w-full text-xs bg-slate-100 border border-slate-200 rounded-xl p-2.5 text-slate-500 font-mono cursor-not-allowed';
      }
      if (emailHint) {
        emailHint.textContent = callerIsAdmin
          ? 'Admin cấp cao có quyền điều chỉnh địa chỉ email.'
          : 'Chỉ Admin cấp cao mới có thể thay đổi địa chỉ email.';
      }

      if (nameInput) nameInput.value = cleanName;
      if (deptInput) deptInput.value = user.department || '';
      if (phoneInput) phoneInput.value = user.phone || '';

      if (passwordInput) {
        passwordInput.value = '';
        passwordInput.placeholder = callerIsAdmin ? 'Nhập mật khẩu mới nếu muốn đặt lại...' : 'Chỉ Admin được phép đặt mật khẩu';
        passwordInput.disabled = !callerIsAdmin;
        passwordInput.readOnly = !callerIsAdmin;
        passwordInput.className = callerIsAdmin
          ? 'w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-500/20 font-medium'
          : 'w-full text-xs bg-slate-100 border border-slate-200 rounded-xl p-2.5 text-slate-500 font-medium cursor-not-allowed';
      }
      if (passHint) passHint.classList.toggle('hidden', callerIsAdmin);

      if (avatarUrlInput) avatarUrlInput.value = user.avatar || '';
      this.previewDetailAvatar(user.avatar, cleanName);

      this.renderDetailReferrerOptions(user.referrer_email || '');
      const refSelect = document.getElementById('user-detail-referrer');
      if (refSelect) refSelect.disabled = !callerIsAdmin;
      if (refLockHint) refLockHint.classList.toggle('hidden', callerIsAdmin);

      // Banner
      if (nameDisplay) nameDisplay.textContent = cleanName;
      if (emailDisplay) emailDisplay.textContent = user.email;
      if (deptDisplay) deptDisplay.innerHTML = `<svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg> <span>Phòng Ban: ${user.department || 'Chưa cập nhật'}</span>`;
      const isTargetSuper = BookingData.ROOT_ADMIN_EMAILS.includes((user.email || '').toLowerCase()) || Boolean(user.is_super_admin);
      if (superBadge) {
        superBadge.classList.toggle('hidden', !isTargetSuper);
      }

      let userRole = (user.role || '').toLowerCase().trim();
      if (isTargetSuper) {
        userRole = 'admin';
      } else if (userRole === 'manager' || userRole === 'lead') {
        userRole = 'approver';
      } else if (userRole === 'super_admin' || userRole === 'root_admin') {
        userRole = 'admin';
      } else if (!['admin', 'approver', 'requester'].includes(userRole)) {
        userRole = 'requester';
      }
      selectedRole = userRole;

      if (roleBadge) {
        roleBadge.textContent = BookingData.ROLE_LABELS[selectedRole] || selectedRole;
        roleBadge.className = `px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${BookingData.ROLE_BADGES[selectedRole] || 'bg-slate-100 text-slate-700'}`;
      }

      // Parse permissions safely (handle JSON string, array, or fallback preset)
      let permsList = user.permissions;
      if (typeof permsList === 'string') {
        try {
          permsList = JSON.parse(permsList);
        } catch (e) {
          permsList = permsList.split(',').map(s => s.trim());
        }
      }
      if (isTargetSuper) {
        selectedPerms = [...BookingData.ROLE_PERMISSIONS.admin];
      } else if (Array.isArray(permsList) && permsList.length > 0) {
        selectedPerms = [...permsList];
      } else {
        selectedPerms = [...(BookingData.ROLE_PERMISSIONS[selectedRole] || BookingData.ROLE_PERMISSIONS.requester)];
      }

      this.renderUserDetailBookings(user.email);
    }

    // Role radio selection
    document.querySelectorAll('input[name="user-detail-role-radio"]').forEach(r => {
      r.checked = (r.value === selectedRole);
    });

    // Render granular checkboxes
    this.renderDetailPermCheckboxes(selectedPerms);
    this.updateDetailPermCountBadge();

    // Scroll to top of window
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  showUsersList() {
    const listView = document.getElementById('users-list-view');
    const detailView = document.getElementById('user-detail-view');
    const addView = document.getElementById('user-add-view');
    if (detailView) detailView.classList.add('hidden');
    if (addView) addView.classList.add('hidden');
    if (listView) listView.classList.remove('hidden');
    this.renderUsers();
    this.renderReferrers();
  },

  openUserModal(email = null) {
    if (email) {
      this.openUserDetail(email);
    } else {
      this.openUserAdd();
    }
  },

  closeUserModal() {
    this.showUsersList();
  },

  // ==========================================
  // DEDICATED USER ADD PAGE CONTROLLER
  // ==========================================
  openUserAdd() {
    if (!BookingData.hasPermission('manage_users')) {
      Toast.show('Bạn không có quyền thêm mới người dùng!', 'error', 'Từ chối quyền');
      return;
    }

    const listView = document.getElementById('users-list-view');
    const detailView = document.getElementById('user-detail-view');
    const addView = document.getElementById('user-add-view');
    if (!addView) return;

    if (listView) listView.classList.add('hidden');
    if (detailView) detailView.classList.add('hidden');
    addView.classList.remove('hidden');

    // Reset form fields
    const nameEl = document.getElementById('user-add-name');
    const emailEl = document.getElementById('user-add-email');
    const phoneEl = document.getElementById('user-add-phone');
    const deptEl = document.getElementById('user-add-dept');
    const passEl = document.getElementById('user-add-password');
    const avatarEl = document.getElementById('user-add-avatar-url') || document.getElementById('user-add-avatar');

    if (nameEl) nameEl.value = '';
    if (emailEl) emailEl.value = '';
    if (phoneEl) phoneEl.value = '';
    if (deptEl) deptEl.value = '';
    if (passEl) passEl.value = '';
    if (avatarEl) avatarEl.value = '';

    this.previewAddAvatar('', 'U');
    this.renderAddReferrerOptions('');

    // Default to requester role
    const reqRadio = document.querySelector('input[name="user-add-role-radio"][value="requester"]');
    if (reqRadio) reqRadio.checked = true;
    this.onAddRolePresetChange('requester');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  previewAddAvatar(url, fallbackName = 'U') {
    const container = document.getElementById('user-add-avatar-container');
    if (!container) return;
    if (url && (url.startsWith('data:image') || url.startsWith('http://') || url.startsWith('https://'))) {
      container.innerHTML = `<img src="${url}" alt="Avatar" class="w-full h-full object-cover">`;
    } else {
      const initial = (fallbackName || 'U').charAt(0).toUpperCase();
      container.innerHTML = `<span class="text-slate-700 font-bold text-xl">${initial}</span>`;
    }
  },

  renderAddReferrerOptions(selectedEmail = '') {
    const select = document.getElementById('user-add-referrer');
    if (!select) return;
    const users = (BookingData.users || []).filter(u => u.email);
    select.innerHTML = `
      <option value="">-- Không có người giới thiệu (Tài khoản gốc) --</option>
      ${users.map(u => `
        <option value="${u.email}" ${u.email.toLowerCase() === (selectedEmail || '').toLowerCase() ? 'selected' : ''}>
          ${BookingData.cleanUserName(u.full_name)} (${u.email})
        </option>
      `).join('')}
    `;
  },

  onAddRolePresetChange(role) {
    const presetPerms = BookingData.ROLE_PERMISSIONS[role] || [];
    this.renderAddPermCheckboxes(presetPerms);
    this.updateAddPermCountBadge();

    // Update banner badge
    const roleBadge = document.getElementById('user-add-role-badge');
    if (roleBadge) {
      roleBadge.textContent = BookingData.ROLE_LABELS[role] || role;
      roleBadge.className = `px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${BookingData.ROLE_BADGES[role] || 'bg-slate-100 text-slate-700'}`;
    }
  },

  renderAddPermCheckboxes(selectedKeys = []) {
    const container = document.getElementById('user-add-perm-grid');
    if (!container) return;

    const groups = {};
    BookingData.ALL_PERMISSIONS.forEach(p => {
      if (!groups[p.group]) groups[p.group] = [];
      groups[p.group].push(p);
    });

    container.innerHTML = Object.keys(groups).map(grpName => {
      const perms = groups[grpName];
      return `
        <div class="p-3 bg-white rounded-xl border border-slate-200/90 shadow-2xs space-y-2">
          <p class="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 flex items-center justify-between">
            <span>${grpName}</span>
            <span class="text-[10px] text-slate-400 font-normal">(${perms.length} chức năng)</span>
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-slate-100">
            ${perms.map(p => {
              const checked = selectedKeys.includes(p.key) ? 'checked' : '';
              return `
                <label class="flex items-start gap-2.5 p-1.5 rounded-lg hover:bg-slate-50 cursor-pointer text-xs">
                  <input type="checkbox" name="user-add-perm-checkbox" value="${p.key}" ${checked} onchange="BookingUI.updateAddPermCountBadge()" class="mt-0.5 w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300 cursor-pointer">
                  <div class="min-w-0">
                    <span class="font-bold text-slate-900 block leading-tight">${p.label}</span>
                    <span class="text-[10px] text-slate-400 block">${p.desc}</span>
                  </div>
                </label>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }).join('');
  },

  toggleAllAddPermCheckboxes(checked) {
    document.querySelectorAll('input[name="user-add-perm-checkbox"]').forEach(cb => {
      cb.checked = checked;
    });
    this.updateAddPermCountBadge();
  },

  updateAddPermCountBadge() {
    const total = BookingData.ALL_PERMISSIONS.length;
    const checked = document.querySelectorAll('input[name="user-add-perm-checkbox"]:checked').length;
    const badge = document.getElementById('user-add-perm-count-badge');
    if (badge) {
      badge.textContent = `${checked}/${total} quyền`;
    }
  },

  async saveUserFromAdd() {
    const email = document.getElementById('user-add-email')?.value.trim().toLowerCase();
    const name = document.getElementById('user-add-name')?.value.trim();
    const dept = document.getElementById('user-add-dept')?.value.trim();
    const phone = document.getElementById('user-add-phone')?.value.trim();
    const password = document.getElementById('user-add-password')?.value.trim() || '';
    const referrerEmail = document.getElementById('user-add-referrer')?.value.trim().toLowerCase();
    const avatarUrl = (document.getElementById('user-add-avatar-url') || document.getElementById('user-add-avatar'))?.value.trim();
    const roleRadio = document.querySelector('input[name="user-add-role-radio"]:checked');
    const role = roleRadio ? roleRadio.value : '';

    if (!email || !name) {
      Toast.show('Vui lòng điền đầy đủ Email và Họ tên!', 'error');
      return;
    }

    if (!role) {
      Toast.show('Vui lòng chọn 1 cấp bậc phân quyền cho tài khoản!', 'error');
      return;
    }

    if (password && password.length < 6) {
      Toast.show('Mật khẩu khởi tạo phải có ít nhất 6 ký tự!', 'error');
      return;
    }

    // Collect checked permissions
    const checkedPerms = [];
    document.querySelectorAll('input[name="user-add-perm-checkbox"]:checked').forEach(cb => {
      checkedPerms.push(cb.value);
    });

    const btnTop = document.getElementById('btn-user-add-top');
    const btnBottom = document.getElementById('btn-user-add-bottom');
    const btnTopText = document.getElementById('btn-user-add-top-text');
    const btnBottomText = document.getElementById('btn-user-add-bottom-text');

    if (btnTop) { btnTop.disabled = true; btnTop.classList.add('opacity-70', 'cursor-wait'); }
    if (btnBottom) { btnBottom.disabled = true; btnBottom.classList.add('opacity-70', 'cursor-wait'); }
    if (btnTopText) btnTopText.textContent = 'Đang tạo tài khoản...';
    if (btnBottomText) btnBottomText.textContent = 'Đang tạo tài khoản...';

    try {
      const res = await BookingData.addUser({
        email,
        full_name: name,
        department: dept,
        phone,
        password,
        referrer_email: referrerEmail || '',
        role,
        permissions: checkedPerms,
        avatar: avatarUrl || ''
      });

      if (res.success) {
        if (res.rateLimitedFallback) {
          Toast.show(
            `Đã tạo tài khoản ${email} trên Supabase Auth! Do hạn mức gửi mail, mật khẩu tạm là: ${res.tempPassword}`,
            'warning',
            'Tạo người dùng thành công'
          );
        } else if (res.passwordSet || password) {
          Toast.show(
            `Đã tạo tài khoản ${email} và kích hoạt đăng nhập trên Supabase Authentication!`,
            'success',
            'Tạo người dùng thành công'
          );
        } else {
          Toast.show(
            `Đã tạo tài khoản ${email} trên Authentication và gửi email mời đặt mật khẩu!`,
            'success',
            'Tạo người dùng thành công'
          );
        }
        this.showUsersList();
        if (window.App) App.updateUserBadge();
        this.applyRolePermissions();
      } else {
        Toast.show(res.error || 'Không thể tạo người dùng.', 'error');
      }
    } finally {
      if (btnTop) { btnTop.disabled = false; btnTop.classList.remove('opacity-70', 'cursor-wait'); }
      if (btnBottom) { btnBottom.disabled = false; btnBottom.classList.remove('opacity-70', 'cursor-wait'); }
      if (btnTopText) btnTopText.textContent = 'Tạo Tài Khoản Ngay';
      if (btnBottomText) btnBottomText.textContent = 'Xác Nhận Tạo Người Dùng';
    }
  },

  previewDetailAvatar(url, fallbackName = 'U') {
    const container = document.getElementById('user-detail-avatar-container');
    if (!container) return;
    if (url && (url.startsWith('data:image') || url.startsWith('http://') || url.startsWith('https://'))) {
      container.innerHTML = `<img src="${url}" alt="Avatar" class="w-full h-full object-cover">`;
    } else {
      const initial = (fallbackName || 'U').charAt(0).toUpperCase();
      container.innerHTML = `<span class="text-slate-700 font-bold text-xl">${initial}</span>`;
    }
  },

  renderDetailReferrerOptions(selectedEmail = '') {
    const select = document.getElementById('user-detail-referrer');
    if (!select) return;
    const users = (BookingData.users || []).filter(u => u.email);
    select.innerHTML = `
      <option value="">-- Không có người giới thiệu (Tài khoản gốc) --</option>
      ${users.map(u => `
        <option value="${u.email}" ${u.email.toLowerCase() === (selectedEmail || '').toLowerCase() ? 'selected' : ''}>
          ${BookingData.cleanUserName(u.full_name)} (${u.email})
        </option>
      `).join('')}
    `;
  },

  onDetailRolePresetChange(role) {
    const presetPerms = BookingData.ROLE_PERMISSIONS[role] || [];
    this.renderDetailPermCheckboxes(presetPerms);
    this.updateDetailPermCountBadge();

    // Update banner badge
    const roleBadge = document.getElementById('user-detail-role-badge');
    if (roleBadge) {
      roleBadge.textContent = BookingData.ROLE_LABELS[role] || role;
      roleBadge.className = `px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${BookingData.ROLE_BADGES[role] || 'bg-slate-100 text-slate-700'}`;
    }
  },

  renderDetailPermCheckboxes(selectedKeys = []) {
    const container = document.getElementById('user-detail-perm-grid');
    if (!container) return;

    const groups = {};
    BookingData.ALL_PERMISSIONS.forEach(p => {
      if (!groups[p.group]) groups[p.group] = [];
      groups[p.group].push(p);
    });

    container.innerHTML = Object.keys(groups).map(grpName => {
      const perms = groups[grpName];
      return `
        <div class="p-3 bg-white rounded-xl border border-slate-200/90 shadow-2xs space-y-2">
          <p class="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 flex items-center justify-between">
            <span>${grpName}</span>
            <span class="text-[10px] text-slate-400 font-normal">(${perms.length} chức năng)</span>
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-slate-100">
            ${perms.map(p => {
              const checked = selectedKeys.includes(p.key) ? 'checked' : '';
              return `
                <label class="flex items-start gap-2.5 p-1.5 rounded-lg hover:bg-slate-50 cursor-pointer text-xs">
                  <input type="checkbox" name="user-detail-perm-checkbox" value="${p.key}" ${checked} onchange="BookingUI.updateDetailPermCountBadge()" class="mt-0.5 w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300 cursor-pointer">
                  <div class="min-w-0">
                    <span class="font-bold text-slate-900 block leading-tight">${p.label}</span>
                    <span class="text-[10px] text-slate-400 block">${p.desc}</span>
                  </div>
                </label>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }).join('');
  },

  toggleAllDetailPermCheckboxes(checked) {
    document.querySelectorAll('input[name="user-detail-perm-checkbox"]').forEach(cb => {
      cb.checked = checked;
    });
    this.updateDetailPermCountBadge();
  },

  updateDetailPermCountBadge() {
    const total = BookingData.ALL_PERMISSIONS.length;
    const checked = document.querySelectorAll('input[name="user-detail-perm-checkbox"]:checked').length;
    const badge = document.getElementById('user-detail-perm-count-badge');
    if (badge) {
      badge.textContent = `${checked}/${total} quyền`;
    }
  },

  renderUserDetailBookings(email) {
    const tbody = document.getElementById('user-detail-bookings-tbody') || document.getElementById('user-detail-booking-tbody');
    const countBadge = document.getElementById('user-detail-booking-count');
    if (!tbody) return;

    if (!email) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="py-8 text-center text-slate-400 text-xs">
            Tài khoản mới chưa có lịch sử ca trực nào.
          </td>
        </tr>
      `;
      if (countBadge) countBadge.textContent = '0 đơn';
      return;
    }

    const emailLower = email.toLowerCase().trim();
    const bookings = (BookingData.bookings || []).filter(b => 
      ((b.created_by || '').toLowerCase().trim() === emailLower) ||
      ((b.requester_email || '').toLowerCase().trim() === emailLower)
    );

    if (countBadge) countBadge.textContent = `${bookings.length} đơn`;

    if (bookings.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="py-8 text-center">
            <div class="flex flex-col items-center justify-center gap-2">
              <div class="w-10 h-10 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
              </div>
              <p class="text-xs font-semibold text-slate-700">Chưa có ca trực nào do người dùng này tạo</p>
              <p class="text-[11px] text-slate-400">Tài khoản này chưa phát sinh yêu cầu booking hoặc điều phối kỹ thuật nào trên hệ thống.</p>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = bookings.map(b => {
      const bTechId = b.tech_id || b.technician_id;
      const tech = (BookingData.technicians || []).find(t => t.tech_id === bTechId || t.id === bTechId);
      const bDate = b.booking_date || b.date;
      const bId = b.booking_id || b.id || 'BK-xxx';
      const isMulti = b.end_date && b.end_date !== bDate;
      const dateText = isMulti ? `${bDate} → ${b.end_date}` : bDate;
      const statusClass = BookingData.STATUS_CLASSES[b.status] || 'bg-slate-100 text-slate-600';
      const statusLabel = BookingData.STATUS_LABELS[b.status] || b.status;

      const techAvatarHtml = tech && tech.avatar 
        ? `<img src="${tech.avatar}" alt="${tech.name}" class="w-6 h-6 rounded-full object-cover flex-shrink-0 border border-slate-200 shadow-2xs">`
        : `<span class="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[10px] font-bold flex-shrink-0">${tech ? tech.name.slice(0, 1) : '?'}</span>`;

      return `
        <tr onclick="BookingUI.openDetailModal('${bId}')" class="hover:bg-slate-50/80 transition-colors cursor-pointer group">
          <td class="py-2.5 px-3">
            <span class="font-bold text-slate-900 font-condensed tracking-wide text-xs bg-slate-100 group-hover:bg-brand-50 group-hover:text-brand-700 px-2 py-0.5 rounded-md border border-slate-200/60 transition-colors">${bId}</span>
          </td>
          <td class="py-2.5 px-3">
            <div class="font-bold text-slate-900 text-xs">${b.title || 'Ca trực kỹ thuật'}</div>
            ${b.location ? `<div class="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5"><svg class="w-3 h-3 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg><span class="truncate">${b.location}</span></div>` : ''}
          </td>
          <td class="py-2.5 px-3">
            <div class="flex items-center gap-2">
              ${techAvatarHtml}
              <span class="font-medium text-slate-700 text-xs truncate">${tech ? tech.name : 'Chưa phân công'}</span>
            </div>
          </td>
          <td class="py-2.5 px-3 font-mono text-[11px] text-slate-600 font-medium">${dateText}</td>
          <td class="py-2.5 px-3">
            <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${statusClass}">
              ${statusLabel}
            </span>
          </td>
          <td class="py-2.5 px-3 text-right">
            <button type="button" onclick="event.stopPropagation(); BookingUI.openDetailModal('${bId}')" class="px-2.5 py-1 rounded-lg text-xs font-bold text-brand-600 hover:text-brand-700 hover:bg-brand-50 border border-brand-200/60 hover:border-brand-300 transition-all cursor-pointer inline-flex items-center gap-1 shadow-2xs">
              <span>Chi tiết</span>
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </button>
          </td>
        </tr>
      `;
    }).join('');
  },

  async saveUserFromDetail() {
    const isEdit = document.getElementById('user-detail-is-edit')?.value === 'true';
    const email = document.getElementById('user-detail-email')?.value.trim().toLowerCase();
    const name = document.getElementById('user-detail-name')?.value.trim();
    const dept = document.getElementById('user-detail-dept')?.value.trim();
    const phone = document.getElementById('user-detail-phone')?.value.trim();
    const password = document.getElementById('user-detail-password')?.value.trim() || '';
    const referrerEmail = document.getElementById('user-detail-referrer')?.value.trim().toLowerCase();
    const avatarUrl = (document.getElementById('user-detail-avatar-url') || document.getElementById('user-detail-avatar'))?.value.trim();
    const roleRadio = document.querySelector('input[name="user-detail-role-radio"]:checked');
    const role = roleRadio ? roleRadio.value : '';

    if (!email || !name) {
      Toast.show('Vui lòng điền đầy đủ Email và Họ tên!', 'error');
      return;
    }

    if (!role) {
      Toast.show('Vui lòng chọn 1 cấp bậc phân quyền cho tài khoản!', 'error');
      return;
    }

    if (password && password.length < 6) {
      Toast.show('Mật khẩu phải có ít nhất 6 ký tự!', 'error');
      return;
    }

    // Collect checked permissions
    const checkedPerms = [];
    document.querySelectorAll('input[name="user-detail-perm-checkbox"]:checked').forEach(cb => {
      checkedPerms.push(cb.value);
    });

    if (isEdit) {
      const payload = {
        full_name: name,
        department: dept,
        phone,
        password,
        role,
        permissions: checkedPerms,
        referrer_email: referrerEmail || ''
      };
      if (avatarUrl) payload.avatar = avatarUrl;
      const res = await BookingData.updateUser(email, payload);
      if (res.success) {
        Toast.show(
          password
            ? `Đã cập nhật hồ sơ & đổi mật khẩu người dùng ${email} thành công!`
            : `Đã cập nhật hồ sơ & phân quyền người dùng ${email} thành công!`,
          'success'
        );
      } else {
        Toast.show(res.error, 'error');
        return;
      }
    } else {
      const res = await BookingData.addUser({
        email,
        full_name: name,
        department: dept,
        phone,
        password,
        referrer_email: referrerEmail || '',
        role,
        permissions: checkedPerms,
        avatar: avatarUrl || ''
      });
      if (res.success) {
        Toast.show(`Đã thêm mới người dùng ${email}`, 'success');
      } else {
        Toast.show(res.error, 'error');
        return;
      }
    }

    this.showUsersList();
    if (window.App) App.updateUserBadge();
    this.applyRolePermissions();
  },

  // Backward compatible methods
  onUserRolePresetChange(role) {
    this.onDetailRolePresetChange(role);
  },

  renderUserPermCheckboxes(selectedKeys = []) {
    this.renderDetailPermCheckboxes(selectedKeys);
  },

  toggleAllPermCheckboxes(checked) {
    this.toggleAllDetailPermCheckboxes(checked);
  },

  saveUser(e) {
    if (e) e.preventDefault();
    this.saveUserFromDetail();
  },

  async deleteUser(email) {
    if (!confirm(`Bạn có chắc chắn muốn xóa tài khoản ${email} khỏi hệ thống? Tài khoản đăng nhập Supabase Auth cũng sẽ bị xóa.`)) {
      return;
    }
    const res = await BookingData.deleteUser(email);
    if (res.success) {
      Toast.show(`Đã xóa người dùng ${email} và thu hồi tài khoản đăng nhập.`, 'info');
      this.renderUsers();
    } else {
      Toast.show(res.error, 'error');
    }
  },

  // ==========================================
  // USER PROFILE & SECURITY MODAL CONTROLLER
  // ==========================================
  openProfileModal(targetEmail = null) {
    const modal = document.getElementById('user-profile-modal');
    if (!modal) return;

    const callerIsAdmin = BookingData.isSuperAdmin();
    const emailToLoad = (targetEmail && callerIsAdmin) ? targetEmail : (BookingData.currentUser?.email || 'vutranpk@gmail.com');
    const user = BookingData.users.find(u => u.email.toLowerCase() === emailToLoad.toLowerCase()) || BookingData.currentUser;
    if (!user) return;

    this.profileTargetEmail = user.email;

    // Avatar preview & input
    const avatarInput = document.getElementById('profile-avatar-input');
    if (avatarInput) avatarInput.value = user.avatar || '';
    const fileInput = document.getElementById('profile-avatar-file-input');
    if (fileInput) fileInput.value = '';
    const cleanName = BookingData.cleanUserName(user.full_name);
    this.updateProfileAvatarPreview(user.avatar, cleanName);

    // Personal info
    const nameInput = document.getElementById('profile-name-input');
    const phoneInput = document.getElementById('profile-phone-input');
    const deptInput = document.getElementById('profile-dept-input');
    if (nameInput) nameInput.value = cleanName || '';
    if (phoneInput) phoneInput.value = user.phone || '';
    if (deptInput) deptInput.value = user.department || '';

    // Fixed Security Fields: Email & Referrer (CHỈ HIỂN THỊ KHI LÀ TÀI KHOẢN ADMIN - Hình 4)
    const fixedGroup = document.getElementById('profile-fixed-info-group');
    if (fixedGroup) {
      fixedGroup.classList.toggle('hidden', !callerIsAdmin);
    }

    const emailInput = document.getElementById('profile-email-input');
    const referrerInput = document.getElementById('profile-referrer-input');
    const adminIndicator = document.getElementById('profile-admin-badge-indicator');
    const fixedNotice = document.getElementById('profile-fixed-notice');

    if (emailInput) emailInput.value = user.email;
    if (referrerInput) {
      const ref = BookingData.getReferrer(user);
      referrerInput.value = ref ? `${BookingData.cleanUserName(ref.full_name)} (${ref.email})` : (user.referrer_email || 'Gốc hệ thống (Chưa có)');
    }

    if (callerIsAdmin) {
      // Admin can edit email & referrer
      if (emailInput) {
        emailInput.readOnly = false;
        emailInput.disabled = false;
        emailInput.className = 'w-full text-xs bg-white border border-slate-200 rounded-xl p-2.5 text-slate-800 font-medium focus:ring-2 focus:ring-brand-500/20';
      }
      if (referrerInput) {
        referrerInput.readOnly = false;
        referrerInput.disabled = false;
        referrerInput.className = 'w-full text-xs bg-white border border-slate-200 rounded-xl p-2.5 text-slate-800 font-medium focus:ring-2 focus:ring-brand-500/20';
        referrerInput.value = user.referrer_email || '';
        referrerInput.placeholder = 'Nhập email người giới thiệu';
      }
      if (adminIndicator) adminIndicator.textContent = 'Quyền Quản Trị: Được Phép Sửa';
      if (fixedNotice) fixedNotice.innerHTML = '👑 <strong>Chế độ Admin:</strong> Bạn có quyền điều chỉnh email đăng nhập và người giới thiệu cho tài khoản này.';
    } else {
      if (emailInput) {
        emailInput.readOnly = true;
        emailInput.disabled = true;
        emailInput.className = 'w-full text-xs bg-slate-100/90 border border-slate-200 rounded-xl p-2.5 text-slate-600 font-medium cursor-not-allowed';
      }
      if (referrerInput) {
        referrerInput.readOnly = true;
        referrerInput.disabled = true;
        referrerInput.className = 'w-full text-xs bg-slate-100/90 border border-slate-200 rounded-xl p-2.5 text-slate-600 font-medium cursor-not-allowed';
      }
      if (adminIndicator) adminIndicator.textContent = 'Bảo vệ quyền Admin';
      if (fixedNotice) fixedNotice.innerHTML = '* <strong>Chính sách hệ thống:</strong> Địa chỉ email người dùng và email người giới thiệu là dữ liệu liên kết cố định, chỉ <strong>Admin cấp cao</strong> mới có quyền điều chỉnh.';
    }

    // Reset password fields
    const oldPassGroup = document.getElementById('profile-old-pass-group');
    if (oldPassGroup) oldPassGroup.style.display = callerIsAdmin ? 'none' : 'block';
    const oldPassInput = document.getElementById('profile-old-password');
    const newPassInput = document.getElementById('profile-new-password');
    const confirmPassInput = document.getElementById('profile-confirm-password');
    if (oldPassInput) oldPassInput.value = '';
    if (newPassInput) newPassInput.value = '';
    if (confirmPassInput) confirmPassInput.value = '';

    modal.classList.remove('hidden');
    modal.classList.add('flex');
  },

  closeProfileModal() {
    const modal = document.getElementById('user-profile-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  },

  updateProfileAvatarPreview(url, name = '') {
    const previewEl = document.getElementById('profile-avatar-preview');
    if (!previewEl) return;
    if (url && (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:image/'))) {
      previewEl.innerHTML = `<img src="${url}" alt="Avatar" class="w-full h-full object-cover">`;
    } else {
      const initials = (name || BookingData.currentUser?.full_name || 'U').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
      previewEl.innerHTML = `<span>${initials}</span>`;
    }
  },

  handleAvatarFileUpload(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    // Check size limit: Max 5MB raw image
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      Toast.show(`Dung lượng ảnh gốc quá lớn (${(file.size / (1024 * 1024)).toFixed(1)} MB)! Vui lòng chọn ảnh nhỏ hơn 5MB.`, 'error');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const img = new Image();
      img.onload = () => {
        // Smart Canvas Resize & Center Square Crop (256x256)
        const targetSize = 256;
        const canvas = document.createElement('canvas');
        canvas.width = targetSize;
        canvas.height = targetSize;
        const ctx = canvas.getContext('2d');

        // Center square crop calculations (object-fit: cover)
        const w = img.width;
        const h = img.height;
        let sWidth, sHeight, sx, sy;

        if (w > h) {
          sHeight = h;
          sWidth = h;
          sx = (w - h) / 2;
          sy = 0;
        } else {
          sWidth = w;
          sHeight = w;
          sx = 0;
          sy = (h - w) / 2;
        }

        ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, targetSize, targetSize);

        // Export to optimized JPEG (quality 0.88 -> ~20KB)
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.88);
        const approxKb = (compressedBase64.length * 0.75 / 1024).toFixed(1);

        const input = document.getElementById('profile-avatar-input');
        if (input) input.value = compressedBase64;
        this.updateProfileAvatarPreview(compressedBase64);
        Toast.show(`Đã nén và tối ưu ảnh avatar sắc nét (~${approxKb} KB)! Bấm "Lưu Thay Đổi" để hoàn tất.`, 'success');
      };
      img.onerror = () => {
        Toast.show('Không thể xử lý định dạng ảnh này. Vui lòng chọn file PNG, JPG hoặc WebP!', 'error');
      };
      img.src = uploadEvent.target.result;
    };
    reader.onerror = () => {
      Toast.show('Không thể đọc file ảnh, vui lòng thử lại!', 'error');
    };
    reader.readAsDataURL(file);
  },

  onProfileAvatarInput(url) {
    this.updateProfileAvatarPreview(url);
  },

  selectProfilePresetAvatar(url) {
    const input = document.getElementById('profile-avatar-input');
    if (input) input.value = url;
    this.updateProfileAvatarPreview(url);
  },

  clearProfileAvatar() {
    const input = document.getElementById('profile-avatar-input');
    if (input) input.value = '';
    const fileInput = document.getElementById('profile-avatar-file-input');
    if (fileInput) fileInput.value = '';
    this.updateProfileAvatarPreview('');
  },

  async saveUserProfile(e) {
    if (e && e.preventDefault) e.preventDefault();
    const email = this.profileTargetEmail || BookingData.currentUser?.email;
    if (!email) return;

    const name = document.getElementById('profile-name-input')?.value.trim();
    const phone = document.getElementById('profile-phone-input')?.value.trim();
    const dept = document.getElementById('profile-dept-input')?.value.trim();
    const avatar = document.getElementById('profile-avatar-input')?.value.trim();

    if (!name) {
      Toast.show('Họ và tên không được để trống!', 'error');
      return;
    }

    const payload = {
      full_name: name,
      phone,
      department: dept,
      avatar
    };

    // If admin edited email or referrer
    if (BookingData.isSuperAdmin()) {
      const emailInput = document.getElementById('profile-email-input');
      const refInput = document.getElementById('profile-referrer-input');
      if (emailInput && emailInput.value.trim()) payload.new_email = emailInput.value.trim().toLowerCase();
      if (refInput && refInput.value !== undefined) payload.referrer_email = refInput.value.trim().toLowerCase();
    }

    // Password change check
    const oldPass = document.getElementById('profile-old-password')?.value || '';
    const newPass = document.getElementById('profile-new-password')?.value || '';
    const confirmPass = document.getElementById('profile-confirm-password')?.value || '';

    if (newPass) {
      if (newPass.length < 6) {
        Toast.show('Mật khẩu mới phải có tối thiểu 6 ký tự!', 'error');
        return;
      }
      if (newPass !== confirmPass) {
        Toast.show('Mật khẩu mới và xác nhận mật khẩu không trùng khớp!', 'error');
        return;
      }
      payload.old_password = oldPass;
      payload.new_password = newPass;
    }

    // UI Loading indicator on submit button
    const submitBtn = document.querySelector('#profile-form button[type="submit"]');
    const origBtnHtml = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.add('opacity-75', 'cursor-not-allowed');
    }

    try {
      const res = await BookingData.updateUserProfile(email, payload);
      if (!res.success) {
        Toast.show(res.error, 'error');
        return;
      }

      Toast.show('Đã cập nhật ảnh đại diện & thông tin hồ sơ thành công!', 'success');
      this.closeProfileModal();
      this.renderUsers();
      this.render(); // Re-render calendar, timeline, my-bookings & approval cards
      if (window.App) {
        App.updateUserBadge();
        App.updateStats();
      }
    } catch (err) {
      Toast.show('Có lỗi xảy ra khi lưu: ' + (err?.message || err), 'error');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
        submitBtn.innerHTML = origBtnHtml;
      }
    }
  },

  // ==========================================
  // FLOATING ROLE BUBBLE FOR ADMIN
  // ==========================================
  toggleRoleBubble(forceState = null) {
    const menu = document.getElementById('admin-role-bubble-menu');
    const chevron = document.getElementById('bubble-chevron');
    if (!menu) return;

    const willOpen = forceState !== null ? forceState : menu.classList.contains('hidden');
    if (willOpen) {
      menu.classList.remove('hidden');
      if (chevron) chevron.classList.add('rotate-180');
    } else {
      menu.classList.add('hidden');
      if (chevron) chevron.classList.remove('rotate-180');
    }
  },

  // ==========================================
  // GOOGLE SIGN-IN SYSTEM & SUPER ADMIN
  // ==========================================
  openGoogleLoginModal() {
    const modal = document.getElementById('google-login-modal');
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
  },

  closeGoogleLoginModal() {
    const modal = document.getElementById('google-login-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  },

  async executeLogin(email, password) {
    const result = await BookingData.loginWithEmailPassword(email, password);
    if (!result.success) {
      // Display error on Gatekeeper Login Screen
      const gateErrBox = document.getElementById('gatekeeper-error-box');
      const gateErrMsg = document.getElementById('gatekeeper-error-msg');
      if (gateErrBox && gateErrMsg) {
        gateErrMsg.textContent = result.message;
        gateErrBox.classList.remove('hidden');
      }

      Toast.show(result.message, 'error', 'Từ Chối Đăng Nhập');
      return false;
    }

    // Success: Hide errors and hide gatekeeper screen immediately
    const gateErrBox = document.getElementById('gatekeeper-error-box');
    if (gateErrBox) gateErrBox.classList.add('hidden');

    const gatekeeper = document.getElementById('login-gatekeeper-screen');
    if (gatekeeper) {
      gatekeeper.classList.add('hidden');
      gatekeeper.classList.remove('flex');
      gatekeeper.style.display = 'none';
      gatekeeper.style.pointerEvents = 'none';
    }

    const appLayout = document.getElementById('app-layout');
    if (appLayout) {
      appLayout.classList.remove('hidden');
      appLayout.classList.add('flex');
      appLayout.style.display = 'flex';
    }

    if (window.App) {
      App.checkAuthGate();
      App.updateUserBadge();
      App.updateStats();
    }
    this.applyRolePermissions();
    this.switchTab('timeline');
    const authBadge = result.user?.auth_verified ? ' (🔒 Đã xác thực Supabase Auth)' : '';
    Toast.show(`Đăng nhập thành công: ${result.user.full_name}${authBadge}`, 'success', 'K-Workspace');
    return true;
  },

  async handleGatekeeperSubmit(event) {
    if (event && event.preventDefault) event.preventDefault();
    const emailInput = document.getElementById('gatekeeper-email-input');
    const passInput = document.getElementById('gatekeeper-password-input');

    const email = emailInput ? emailInput.value.trim().toLowerCase() : '';
    let password = passInput ? passInput.value.trim() : '';

    if (!email) {
      Toast.show('Vui lòng nhập địa chỉ email!', 'error');
      if (emailInput) emailInput.focus();
      return;
    }
    if (!password) {
      Toast.show('Vui lòng nhập mật khẩu tài khoản!', 'error');
      if (passInput) passInput.focus();
      return;
    }

    await this.executeLogin(email, password);
  },

  async quickLogin(email, password = '') {
    const emailInput = document.getElementById('gatekeeper-email-input');
    const passInput = document.getElementById('gatekeeper-password-input');
    if (emailInput) emailInput.value = email;
    if (passInput) passInput.value = password;
    if (!password) {
      Toast.show('Vui lòng nhập mật khẩu!', 'info');
      if (passInput) passInput.focus();
      return;
    }
    await this.executeLogin(email, password);
  },

  togglePasswordVisibility(inputId = 'gatekeeper-password-input', iconId = 'gatekeeper-eye-icon') {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    if (!input) return;

    if (input.type === 'password') {
      input.type = 'text';
      if (icon) {
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"/>';
      }
    } else {
      input.type = 'password';
      if (icon) {
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>';
      }
    }
  },

  executeGatekeeperCustomLogin() {
    this.handleGatekeeperSubmit();
  },

  async loginWithSupabaseGoogleOAuth() {
    // 1. Check if running on local file:/// protocol
    if (window.location.protocol === 'file:') {
      const notice = 'Lưu ý: Google OAuth không thể chuyển hướng về giao thức mở file cục bộ (file:///). Bạn hãy nhập email Google vào ô trên để hệ thống xác thực trực tiếp với Database, hoặc mở dự án qua Live Server (http://localhost:5500).';
      const gateErrBox = document.getElementById('gatekeeper-error-box');
      const gateErrMsg = document.getElementById('gatekeeper-error-msg');
      if (gateErrBox && gateErrMsg) {
        gateErrMsg.textContent = notice;
        gateErrBox.classList.remove('hidden');
      }
      Toast.show(notice, 'warning', 'Chế Độ Cục Bộ (file:///)');
      const input = document.getElementById('gatekeeper-email-input');
      if (input) input.focus();
      return;
    }

    const client = window.SupabaseConfig ? window.SupabaseConfig.getClient() : null;
    if (client && client.auth) {
      try {
        const { error } = await client.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: window.location.origin + window.location.pathname
          }
        });
        if (error) throw error;
        return;
      } catch (err) {
        console.warn('OAuth redirect notice:', err);
        const notice = 'Chưa cấu hình Google Provider trên Supabase Dashboard. Vui lòng nhập email Google vào ô trên để đăng nhập trực tiếp.';
        const gateErrBox = document.getElementById('gatekeeper-error-box');
        const gateErrMsg = document.getElementById('gatekeeper-error-msg');
        if (gateErrBox && gateErrMsg) {
          gateErrMsg.textContent = notice;
          gateErrBox.classList.remove('hidden');
        }
        Toast.show(notice, 'error', 'Supabase Provider Notice');
        const input = document.getElementById('gatekeeper-email-input');
        if (input) input.focus();
      }
    } else {
      const input = document.getElementById('gatekeeper-email-input');
      if (input) input.focus();
    }
  },

  // ==========================================
  // EMAIL & GOOGLE CALENDAR CONFIGURATION CONTROLLER
  // ==========================================
  selectedEmailTemplateKey: 'tech_invite',

  renderEmailSettings() {
    const cfg = BookingData.emailSettings || {};
    const senderEmailInput = document.getElementById('email-cfg-sender-email');
    const senderNameInput = document.getElementById('email-cfg-sender-name');
    const autoInviteCb = document.getElementById('email-cfg-auto-invite');
    const autoNotifyCb = document.getElementById('email-cfg-auto-notify');
    const mapsLinkCb = document.getElementById('email-cfg-maps-link');
    const reminderSelect = document.getElementById('email-cfg-reminder-minutes');

    if (senderEmailInput) senderEmailInput.value = cfg.senderEmail || 'dispatch.kcoffee@gmail.com';
    if (senderNameInput) senderNameInput.value = cfg.senderName || 'Hệ Thống Điều Phối K-Coffee Workspace';
    if (autoInviteCb) autoInviteCb.checked = cfg.autoInviteOnApprove !== false;
    if (autoNotifyCb) autoNotifyCb.checked = cfg.autoNotifyRequester !== false;
    if (mapsLinkCb) mapsLinkCb.checked = cfg.includeGoogleMapsLink !== false;
    if (reminderSelect) reminderSelect.value = String(cfg.calendarReminderMinutes || 60);

    this.selectEmailTemplate(this.selectedEmailTemplateKey || 'tech_invite');
  },

  selectEmailTemplate(key) {
    this.selectedEmailTemplateKey = key;
    const cfg = BookingData.emailSettings || {};
    const tpl = (cfg.templates && cfg.templates[key]) || {};

    // 1. Update Template Tab Buttons
    ['tech_invite', 'requester_approved', 'requester_rejected'].forEach(k => {
      const btn = document.getElementById(`tpl-tab-${k}`);
      if (btn) {
        if (k === key) {
          btn.className = 'px-2.5 py-1 rounded-lg text-xs font-bold bg-white text-slate-900 shadow-2xs transition-all cursor-pointer';
        } else {
          btn.className = 'px-2.5 py-1 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 transition-all cursor-pointer';
        }
      }
    });

    // 2. Fill inputs
    const subjectInput = document.getElementById('email-tpl-subject');
    const bodyTextarea = document.getElementById('email-tpl-body');
    if (subjectInput) subjectInput.value = tpl.subject || '';
    if (bodyTextarea) bodyTextarea.value = tpl.body || '';

    // 3. Update Preview
    this.updateLiveEmailPreview();
  },

  insertTagIntoTemplate(tag) {
    const bodyTextarea = document.getElementById('email-tpl-body');
    if (!bodyTextarea) return;
    const start = bodyTextarea.selectionStart;
    const end = bodyTextarea.selectionEnd;
    const val = bodyTextarea.value;
    bodyTextarea.value = val.substring(0, start) + tag + val.substring(end);
    bodyTextarea.focus();
    bodyTextarea.setSelectionRange(start + tag.length, start + tag.length);
    this.updateLiveEmailPreview();
  },

  updateLiveEmailPreview() {
    const senderEmail = document.getElementById('email-cfg-sender-email')?.value || 'dispatch.kcoffee@gmail.com';
    const senderName = document.getElementById('email-cfg-sender-name')?.value || 'Hệ Thống Điều Phối K-Coffee';
    const subjectRaw = document.getElementById('email-tpl-subject')?.value || '';
    const bodyRaw = document.getElementById('email-tpl-body')?.value || '';

    const senderEmailLabel = document.getElementById('preview-sender-email-label');
    const senderNameLabel = document.getElementById('preview-sender-name-label');
    const mockSubject = document.getElementById('preview-mock-subject');
    const mockBody = document.getElementById('preview-mock-body');
    const calCard = document.getElementById('preview-calendar-invite-card');

    if (senderEmailLabel) senderEmailLabel.textContent = senderEmail;
    if (senderNameLabel) senderNameLabel.textContent = senderName;

    // Sample substitution values
    const sampleVals = {
      booking_id: 'BK-187897',
      title: 'Bảo dưỡng định kỳ hệ thống POS & Espresso',
      tech_name: 'Nguyễn Văn An',
      tech_phone: '0901234567',
      date_range: '20/11/2026 - 21/11/2026 (2 ngày)',
      location: 'K-Coffee Flagship Quận 1, 128 Hai Bà Trưng, TP.HCM',
      requester_name: 'Trần Minh Quân (PM)',
      requester_email: 'pm.quan@kcoffee.vn',
      approver_name: 'Phạm Hoàng Long (Lead Tech)',
      notes: 'Mang theo bộ dụng cụ áp suất và linh kiện van thay thế dự phòng.',
      reason: 'Trùng lịch bảo trì đột xuất tại khu vực trung tâm.'
    };

    const replaceTags = (text) => {
      let res = text;
      Object.keys(sampleVals).forEach(k => {
        res = res.split(`{${k}}`).join(sampleVals[k]);
      });
      return res;
    };

    if (mockSubject) mockSubject.textContent = replaceTags(subjectRaw);
    if (mockBody) mockBody.textContent = replaceTags(bodyRaw);

    if (calCard) {
      calCard.classList.toggle('hidden', this.selectedEmailTemplateKey !== 'tech_invite');
    }
  },

  saveEmailSettingsFromForm() {
    const senderEmail = document.getElementById('email-cfg-sender-email')?.value?.trim();
    const senderName = document.getElementById('email-cfg-sender-name')?.value?.trim();
    const autoInviteOnApprove = document.getElementById('email-cfg-auto-invite')?.checked;
    const autoNotifyRequester = document.getElementById('email-cfg-auto-notify')?.checked;
    const includeGoogleMapsLink = document.getElementById('email-cfg-maps-link')?.checked;
    const reminderMinutes = parseInt(document.getElementById('email-cfg-reminder-minutes')?.value || '60', 10);

    const subject = document.getElementById('email-tpl-subject')?.value?.trim();
    const body = document.getElementById('email-tpl-body')?.value?.trim();

    if (!senderEmail || !senderName) {
      Toast.show('Vui lòng điền đầy đủ Email và Tên hiển thị người gửi!', 'error');
      return;
    }

    const currentKey = this.selectedEmailTemplateKey || 'tech_invite';
    const currentTemplates = { ...(BookingData.emailSettings?.templates || {}) };
    if (!currentTemplates[currentKey]) currentTemplates[currentKey] = {};
    currentTemplates[currentKey].subject = subject;
    currentTemplates[currentKey].body = body;

    BookingData.saveEmailSettings({
      senderEmail,
      senderName,
      autoInviteOnApprove,
      autoNotifyRequester,
      includeGoogleMapsLink,
      calendarReminderMinutes: reminderMinutes,
      templates: currentTemplates
    });

    Toast.show('Đã lưu cấu hình email và mẫu lời mời Google Calendar thành công!', 'success', 'Cấu hình hoàn tất');
  },

  openSendTestModal() {
    const modal = document.getElementById('email-test-modal');
    const targetEmailInput = document.getElementById('email-test-target-email');
    const selectTpl = document.getElementById('email-test-template-select');
    if (selectTpl) selectTpl.value = this.selectedEmailTemplateKey || 'tech_invite';
    if (targetEmailInput) targetEmailInput.value = BookingData.currentUser?.email || '';
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
  },

  closeSendTestModal() {
    const modal = document.getElementById('email-test-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  },

  sendTestEmail(e) {
    if (e && e.preventDefault) e.preventDefault();
    const targetEmail = document.getElementById('email-test-target-email')?.value?.trim();
    const tplKey = document.getElementById('email-test-template-select')?.value || 'tech_invite';

    if (!targetEmail) {
      Toast.show('Vui lòng nhập email người nhận thử nghiệm!', 'error');
      return;
    }

    const tplNames = {
      tech_invite: 'Lời mời Google Calendar (.ics) cho KTV',
      requester_approved: 'Thông báo Duyệt Ca Trực gửi PM',
      requester_rejected: 'Thông báo Từ Chối Ca Trực gửi PM'
    };

    this.closeSendTestModal();
    Toast.show(`Đã phát thư thử nghiệm [${tplNames[tplKey]}] tới hộp thư ${targetEmail} thành công!`, 'success', 'Đã gửi mô phỏng');
  },

  downloadIcs(bookingId) {
    const b = BookingData.bookings.find(item => item.booking_id === bookingId);
    if (!b) {
      Toast.show('Không tìm thấy dữ liệu ca trực để xuất file .ics!', 'error');
      return;
    }
    const icsContent = BookingData.generateIcsContent(b);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `${b.booking_id || 'booking'}-invite.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);

    Toast.show(`Đã tải file lịch ${b.booking_id}-invite.ics thành công! Mở trên máy để thêm vào Calendar.`, 'success', 'Tải file ICS');
  },

  resendInvite(bookingId) {
    const b = BookingData.bookings.find(item => item.booking_id === bookingId);
    const tech = b ? BookingData.technicians.find(t => t.tech_id === b.tech_id) : null;
    const recipient = tech?.email || tech?.name || 'Kỹ sư';
    Toast.show(`Đã gửi lại lời mời Google Calendar tới ${recipient} thành công!`, 'success', 'Đã phát lời mời');
  },

  logout() {
    BookingData.logout();
    if (window.App) {
      App.toggleTopUserMenu(false);
    }
    window.location.replace('login.html');
  }
};

window.BookingUI = BookingUI;
