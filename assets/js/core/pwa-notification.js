// ========================================================
// 📱 K-WORKSPACE PWA & PUSH NOTIFICATION MANAGER
// Quản lý thông báo đẩy trên điện thoại (iOS / Android) & Cài đặt App
// ========================================================

const PWANotificationManager = {
  swRegistration: null,
  deferredInstallPrompt: null,
  audioCtx: null,

  async init() {
    this.registerServiceWorker();
    this.initPwaInstallPrompt();
    this.initServiceWorkerMessageListener();
    this.checkAndRenderPermissionPrompt();
  },

  // 1. Đăng ký Service Worker
  async registerServiceWorker() {
    if (!('serviceWorker' in navigator)) {
      console.log('ℹ️ Trình duyệt không hỗ trợ Service Worker.');
      return;
    }

    try {
      const reg = await navigator.serviceWorker.register('./sw.js', { scope: './' });
      this.swRegistration = reg;
      console.log('⚡ PWA Service Worker đã sẵn sàng:', reg.scope);

      // Lắng nghe khi có bản cập nhật mới
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('🔄 Đã tải phiên bản Service Worker mới.');
              PWANotificationManager.showUpdateBanner();
            }
          });
        }
      });
    } catch (err) {
      console.warn('⚠️ Lỗi đăng ký Service Worker:', err);
    }
  },

  isStandalone() {
    try {
      return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    } catch (_) {
      return false;
    }
  },

  // 2. Lắng nghe tương tác từ Service Worker (khi người dùng bấm thông báo ngoài màn hình)
  initServiceWorkerMessageListener() {
    if (!('serviceWorker' in navigator)) return;

    navigator.serviceWorker.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'OPEN_BOOKING_MODAL' && event.data.bookingId) {
        if (window.BookingUI && typeof BookingUI.openBookingFromDeepLink === 'function') {
          BookingUI.openBookingFromDeepLink(event.data.bookingId);
        } else if (window.BookingUI && typeof BookingUI.openDetailModal === 'function') {
          BookingUI.openDetailModal(event.data.bookingId);
        }
      }
    });
  },

  // 3. Xử lý sự kiện Cài đặt PWA (Add to Home Screen)
  initPwaInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Ngăn chặn prompt mặc định của Chrome để hiển thị nút tùy biến đẹp hơn
      e.preventDefault();
      this.deferredInstallPrompt = e;
      this.renderInstallBanner();
    });

    window.addEventListener('appinstalled', () => {
      this.deferredInstallPrompt = null;
      this.hideInstallBanner();
      this.closeInstallGuideModal();
      if (window.Toast) {
        Toast.show('Ứng dụng K-Workspace đã được cài đặt thành công!', 'success', 'Cài đặt thành công');
      }
    });
  },

  renderInstallBanner() {
    if (this.isStandalone()) return;
    // Chỉ hiển thị banner nếu chưa từng bấm "Để sau" trong phiên này
    if (sessionStorage.getItem('k_workspace_dismiss_install') === 'true') return;

    let banner = document.getElementById('pwa-install-banner');
    if (!banner) {
      banner = document.createElement('div');
      banner.id = 'pwa-install-banner';
      banner.className = 'fixed bottom-[5.25rem] left-3 right-3 sm:left-auto sm:right-6 lg:bottom-6 sm:w-96 z-[9990] bg-white border border-slate-200/90 rounded-2xl p-3.5 shadow-2xl flex items-center gap-3 transition-all';
      banner.innerHTML = `
        <div class="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200/80 flex items-center justify-center shrink-0">
          <img src="images/symbol.png" alt="Logo" class="w-7 h-7 object-contain">
        </div>
        <div class="flex-1 min-w-0">
          <h4 class="text-xs font-semibold text-slate-900">Cài ứng dụng K-Workspace</h4>
          <p class="text-[11px] text-slate-500 mt-0.5 leading-snug">Mở nhanh từ màn hình chính &amp; nhận thông báo ca trực tức thì.</p>
          <div class="flex items-center gap-2 mt-2">
            <button type="button" onclick="PWANotificationManager.triggerInstall()" class="h-8 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer shadow-xs transition-colors">
              Cài đặt ngay
            </button>
            <button type="button" onclick="PWANotificationManager.dismissInstallBanner()" class="h-8 px-2.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 text-xs font-medium cursor-pointer transition-colors">
              Để sau
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(banner);
    }
  },

  hideInstallBanner() {
    const banner = document.getElementById('pwa-install-banner');
    if (banner) banner.remove();
  },

  dismissInstallBanner() {
    sessionStorage.setItem('k_workspace_dismiss_install', 'true');
    this.hideInstallBanner();
  },

  closeInstallGuideModal() {
    const modal = document.getElementById('pwa-install-guide-modal');
    if (modal) {
      modal.remove();
      if (window.App && typeof App.syncBodyScrollLock === 'function') {
        App.syncBodyScrollLock();
      } else {
        document.body.classList.remove('overflow-hidden');
      }
    }
  },

  openInstallGuideModal() {
    this.closeInstallGuideModal();

    const ua = navigator.userAgent || '';
    const isIos = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
    const isAndroid = /Android/i.test(ua);
    const standalone = this.isStandalone();

    let title = 'Cài ứng dụng K-Workspace';
    let subtitle = 'Truy cập nhanh như app native trên PC & điện thoại';
    let stepsHtml = '';

    if (standalone) {
      title = 'Đang chạy ở chế độ Ứng dụng';
      subtitle = 'K-Workspace đã được cài đặt trên thiết bị này';
      stepsHtml = `
        <div class="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-start gap-3">
          <span class="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M5 13l4 4L19 7"/></svg>
          </span>
          <div class="text-xs text-emerald-950 leading-relaxed">
            <p class="font-semibold">Bạn đang sử dụng phiên bản App độc lập</p>
            <p class="text-[11px] text-emerald-800 mt-0.5">Thông báo ca trực, phím tắt mở nhanh và tự động đồng bộ đang hoạt động.</p>
          </div>
        </div>
      `;
    } else if (isIos) {
      stepsHtml = `
        <ol class="space-y-2.5 text-xs text-slate-700">
          <li class="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#f7f8fa] border border-slate-200/70">
            <span class="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-semibold flex items-center justify-center shrink-0">1</span>
            <span>Mở trang bằng trình duyệt <strong>Safari</strong> trên iPhone / iPad.</span>
          </li>
          <li class="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#f7f8fa] border border-slate-200/70">
            <span class="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-semibold flex items-center justify-center shrink-0">2</span>
            <span>Nhấn nút <strong>Chia sẻ (Share)</strong> ở thanh công cụ phía dưới màn hình.</span>
          </li>
          <li class="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#f7f8fa] border border-slate-200/70">
            <span class="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-semibold flex items-center justify-center shrink-0">3</span>
            <span>Cuộn xuống và chọn <strong>Thêm vào MH chính (Add to Home Screen)</strong> ➔ bấm <strong>Thêm</strong>.</span>
          </li>
        </ol>
      `;
    } else if (isAndroid) {
      stepsHtml = `
        <ol class="space-y-2.5 text-xs text-slate-700">
          <li class="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#f7f8fa] border border-slate-200/70">
            <span class="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-semibold flex items-center justify-center shrink-0">1</span>
            <span>Nhấn biểu tượng menu <strong>⋮ (3 chấm)</strong> ở góc trên bên phải trình duyệt Chrome / Edge.</span>
          </li>
          <li class="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#f7f8fa] border border-slate-200/70">
            <span class="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-semibold flex items-center justify-center shrink-0">2</span>
            <span>Chọn <strong>Cài đặt ứng dụng</strong> hoặc <strong>Thêm vào màn hình chính</strong>.</span>
          </li>
        </ol>
      `;
    } else {
      stepsHtml = `
        <ol class="space-y-2.5 text-xs text-slate-700">
          <li class="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#f7f8fa] border border-slate-200/70">
            <span class="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-semibold flex items-center justify-center shrink-0">1</span>
            <span>Nhìn ở góc phải thanh địa chỉ trình duyệt (<strong>Chrome / Edge</strong>), nhấn biểu tượng <strong>Cài đặt ứng dụng</strong> (màn hình có mũi tên xuống).</span>
          </li>
          <li class="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#f7f8fa] border border-slate-200/70">
            <span class="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-semibold flex items-center justify-center shrink-0">2</span>
            <span>Nếu đã cài trước đó, bạn có thể mở trực tiếp <strong>K-Workspace</strong> từ Desktop, Start Menu hoặc Launchpad.</span>
          </li>
        </ol>
      `;
    }

    const modal = document.createElement('div');
    modal.id = 'pwa-install-guide-modal';
    modal.className = 'fixed inset-0 z-[9995] flex items-end sm:items-center justify-center bg-slate-900/45 backdrop-blur-sm p-0 sm:p-4 overflow-y-auto';
    modal.onclick = (e) => {
      if (e.target === modal) this.closeInstallGuideModal();
    };
    modal.innerHTML = `
      <div class="bg-white rounded-t-3xl sm:rounded-2xl max-w-md w-full px-4 pt-2.5 pb-[max(1rem,env(safe-area-inset-bottom))] sm:p-5 border-t sm:border border-slate-200/80 shadow-xl relative my-0 sm:my-auto">
        <div class="w-10 h-1 bg-slate-300/80 rounded-full mx-auto mb-2.5 sm:hidden"></div>
        <div class="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4 gap-3">
          <div class="flex items-center gap-2.5 min-w-0">
            <span class="w-9 h-9 rounded-xl bg-[#f7f8fa] border border-slate-200/80 flex items-center justify-center shrink-0">
              <img src="images/symbol.png" alt="K-Workspace" class="w-5 h-5 object-contain">
            </span>
            <div class="min-w-0">
              <h3 class="text-sm font-semibold text-slate-900 truncate">${title}</h3>
              <p class="text-[11px] text-slate-500 truncate">${subtitle}</p>
            </div>
          </div>
          <button type="button" onclick="PWANotificationManager.closeInstallGuideModal()" class="w-9 h-9 rounded-xl bg-[#f7f8fa] hover:bg-slate-100 border border-slate-200/80 text-slate-400 hover:text-slate-700 flex items-center justify-center cursor-pointer transition-colors shrink-0" aria-label="Đóng">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        ${stepsHtml}
        <div class="pt-4 mt-4 border-t border-slate-100 flex justify-end">
          <button type="button" onclick="PWANotificationManager.closeInstallGuideModal()" class="w-full sm:w-auto h-11 sm:h-9 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors cursor-pointer">
            Đã hiểu
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    document.body.classList.add('overflow-hidden');
  },

  async triggerInstall() {
    if (!this.deferredInstallPrompt) {
      this.openInstallGuideModal();
      return;
    }

    this.deferredInstallPrompt.prompt();
    const { outcome } = await this.deferredInstallPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('✅ Người dùng đồng ý cài đặt PWA.');
    }
    this.deferredInstallPrompt = null;
    this.hideInstallBanner();
  },

  // ==========================================
  // 4. QUẢN LÝ CẬP NHẬT ỨNG DỤNG (FORCE UPDATE)
  // ==========================================
  showUpdateBanner() {
    if (document.getElementById('pwa-update-banner')) return;
    const banner = document.createElement('div');
    banner.id = 'pwa-update-banner';
    banner.className = 'fixed top-3 left-3 right-3 sm:left-auto sm:right-6 sm:w-96 z-[99999] bg-slate-900 text-white rounded-2xl p-3.5 shadow-2xl flex items-center justify-between gap-3 border border-slate-700 animate-in fade-in slide-in-from-top-4 duration-300';
    banner.innerHTML = `
      <div class="flex items-center gap-2.5 min-w-0">
        <span class="w-8 h-8 rounded-xl bg-white/10 text-white flex items-center justify-center shrink-0">
          <svg class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
        </span>
        <div class="min-w-0">
          <p class="text-xs font-bold text-white font-condensed uppercase tracking-wider">Có phiên bản mới</p>
          <p class="text-[11px] text-slate-300 truncate">Hệ thống có bản cập nhật mới nhất.</p>
        </div>
      </div>
      <div class="flex items-center gap-1.5 shrink-0">
        <button type="button" onclick="PWANotificationManager.forceUpdateApp()" class="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 text-xs font-bold font-condensed uppercase tracking-wider cursor-pointer shadow-xs transition-colors">
          Cập Nhật
        </button>
        <button type="button" onclick="document.getElementById('pwa-update-banner')?.remove()" class="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
    `;
    document.body.appendChild(banner);
  },

  async forceUpdateApp() {
    if (window.Toast) {
      Toast.show('Đang làm mới hệ thống và tải bản cập nhật mới nhất...', 'info', 'Đang cập nhật');
    }

    try {
      if ('serviceWorker' in navigator && this.swRegistration) {
        await this.swRegistration.update();
        if (this.swRegistration.waiting) {
          this.swRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });
        }
      }

      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
      }

      setTimeout(() => {
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('_v', Date.now().toString());
        window.location.href = currentUrl.toString();
      }, 500);
    } catch (err) {
      console.warn('⚠️ Lỗi khi cập nhật:', err);
      window.location.reload(true);
    }
  },

  // 4. Kiểm tra và hiển thị nút Bật thông báo
  checkAndRenderPermissionPrompt() {
    if (!('Notification' in window)) return;

    // Nếu quyền đang ở trạng thái 'default', đợi splash screen ẩn hẳn mới hiển thị gọn gàng
    if (Notification.permission === 'default') {
      setTimeout(() => {
        if (Notification.permission === 'default') {
          this.renderNotificationPromptBanner();
        }
      }, 1200);
    }
  },

  renderNotificationPromptBanner() {
    if (localStorage.getItem('k_workspace_notif_prompt_dismissed') === 'true') return;

    let promptEl = document.getElementById('pwa-notif-permission-banner');
    if (!promptEl) {
      promptEl = document.createElement('div');
      promptEl.id = 'pwa-notif-permission-banner';
      promptEl.className = 'fixed top-[4.25rem] left-3 right-3 sm:left-auto sm:right-6 lg:top-6 sm:w-96 z-[9980] bg-white border border-slate-200/90 rounded-2xl p-3.5 shadow-xl flex items-start gap-3 transition-all';
      promptEl.innerHTML = `
        <div class="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
        </div>
        <div class="flex-1 min-w-0">
          <h5 class="text-xs font-semibold text-slate-900">Bật thông báo ca trực</h5>
          <p class="text-[11px] text-slate-500 mt-0.5 leading-relaxed">Nhận thông báo tức thì khi có lịch làm việc mới hoặc ca được duyệt.</p>
          <div class="flex items-center gap-2 mt-2">
            <button type="button" onclick="PWANotificationManager.requestPermission()" class="h-8 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold cursor-pointer shadow-xs transition-colors">
              Bật thông báo
            </button>
            <button type="button" onclick="PWANotificationManager.dismissNotificationPrompt()" class="h-8 px-2.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 text-xs font-medium cursor-pointer transition-colors">
              Bỏ qua
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(promptEl);
    }
  },

  dismissNotificationPrompt() {
    localStorage.setItem('k_workspace_notif_prompt_dismissed', 'true');
    const el = document.getElementById('pwa-notif-permission-banner');
    if (el) el.remove();
  },

  // 5. Yêu cầu cấp quyền Notification
  async requestPermission() {
    if (!('Notification' in window)) {
      if (window.Toast) {
        Toast.show('Trình duyệt hiện tại chưa hỗ trợ thông báo đẩy hệ thống. Trên iPhone/iPad, hãy cài ứng dụng ra Màn hình chính trước.', 'info', 'Chưa hỗ trợ');
      }
      return false;
    }

    try {
      const perm = await Notification.requestPermission();
      this.dismissNotificationPrompt();

      if (perm === 'granted') {
        this.playNotificationChime();
        if (window.Toast) {
          Toast.show('Đã bật thông báo ca trực thành công! Bạn sẽ nhận được thông báo ngay khi có task mới.', 'success', 'Đã Bật Thông Báo');
        }
        // Gửi thử một thông báo chào mừng
        this.showNotification({
          title: 'K-Workspace • Thông Báo Đã Sẵn Sàng',
          body: 'Bạn sẽ nhận được thông báo khi có phân công task hoặc thay đổi lịch trực.',
          tag: 'welcome-notification'
        });
        return true;
      } else {
        if (window.Toast) {
          Toast.show('Bạn đã từ chối nhận thông báo. Bạn có thể bật lại trong cài đặt trang web của trình duyệt.', 'warning', 'Chưa Cấp Quyền');
        }
        return false;
      }
    } catch (e) {
      console.warn('Lỗi xin quyền notification:', e);
      return false;
    }
  },

  // 6. Phát âm thanh chuông thông báo (Sử dụng Web Audio API tổng hợp, không cần file mp3)
  playNotificationChime() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      if (!this.audioCtx) {
        this.audioCtx = new AudioContext();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const now = this.audioCtx.currentTime;
      const osc1 = this.audioCtx.createOscillator();
      const osc2 = this.audioCtx.createOscillator();
      const gainNode = this.audioCtx.createGain();

      osc1.type = 'sine';
      osc2.type = 'sine';

      // Nốt 1: E5 (659.25Hz), Nốt 2: A5 (880Hz)
      osc1.frequency.setValueAtTime(659.25, now);
      osc1.frequency.setValueAtTime(880, now + 0.1);

      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.2, now + 0.03);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc1.connect(gainNode);
      gainNode.connect(this.audioCtx.destination);

      osc1.start(now);
      osc1.stop(now + 0.45);
    } catch (_) {}
  },

  // 7. Gửi thông báo hệ thống ra điện thoại / màn hình khóa
  showNotification(payload = {}) {
    const title = payload.title || 'Thông Báo Ca Trực K-Workspace';
    const body = payload.body || '';
    const tag = payload.tag || ('kcoffee-shift-' + Date.now());
    const bookingId = payload.booking_id || null;
    const type = payload.type || 'info';

    // 1. Luôn phát âm thanh chuông
    this.playNotificationChime();

    // 2. Hiển thị Toast trong app nếu app đang mở
    if (window.Toast && body) {
      Toast.show(body, type === 'error' ? 'error' : (type === 'success' ? 'success' : 'info'), title);
    }

    // 3. Đẩy ra thanh thông báo hệ điều hành / màn hình khóa nếu có quyền
    if ('Notification' in window && Notification.permission === 'granted') {
      const notifOptions = {
        body,
        icon: 'images/symbol.png',
        badge: 'images/favicon.png',
        tag,
        renotify: true,
        vibrate: [200, 100, 200],
        data: {
          url: 'index.html',
          booking_id: bookingId
        }
      };

      if (navigator.serviceWorker && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: 'SHOW_NOTIFICATION',
          title,
          options: notifOptions
        });
      } else if (this.swRegistration && this.swRegistration.showNotification) {
        this.swRegistration.showNotification(title, notifOptions);
      } else {
        try {
          new Notification(title, notifOptions);
        } catch (_) {}
      }
    }
  },

  // 8. Tự động kiểm tra và bắn thông báo khi có sự kiện Realtime từ Supabase
  handleBookingRealtimeNotification(table, payload) {
    if (table !== 'bookings' || !payload) return;

    const currentUser = window.BookingData?.currentUser;
    if (!currentUser) return;

    const { eventType, new: newRec, old: oldRec } = payload;
    const booking = newRec || oldRec;
    if (!booking) return;

    const curEmail = (currentUser.email || '').toLowerCase().trim();
    const curTechId = currentUser.tech_id;
    const isAssignedTech = curTechId && String(curTechId) === String(booking.tech_id);
    const isOwner = (booking.requester_email || '').toLowerCase().trim() === curEmail;
    const isApproverOrAdmin = currentUser.role === 'admin' || currentUser.role === 'approver' || currentUser.is_admin;

    // A. DÀNH CHO KỸ SƯ ĐƯỢC PHÂN CÔNG
    if (isAssignedTech) {
      if (eventType === 'INSERT') {
        this.showNotification({
          title: 'Bạn có ca trực mới!',
          body: `Ca "${booking.title || 'Nhiệm vụ mới'}" ngày ${booking.booking_date} vừa được tạo.`,
          booking_id: booking.booking_id,
          tag: `assigned-${booking.booking_id}`,
          type: 'info'
        });
      } else if (eventType === 'UPDATE') {
        if (oldRec && oldRec.status !== 'APPROVED' && newRec.status === 'APPROVED') {
          this.showNotification({
            title: 'Ca trực đã được phê duyệt!',
            body: `Ca "${booking.title}" ngày ${booking.booking_date} đã chính thức được duyệt.`,
            booking_id: booking.booking_id,
            tag: `approved-${booking.booking_id}`,
            type: 'success'
          });
        } else if (oldRec && (oldRec.booking_date !== newRec.booking_date || oldRec.start_time !== newRec.start_time)) {
          this.showNotification({
            title: 'Lịch ca trực đã được cập nhật!',
            body: `Ca "${booking.title}" đã được dời sang ngày ${newRec.booking_date} (${newRec.start_time || '08:00'}).`,
            booking_id: booking.booking_id,
            tag: `rescheduled-${booking.booking_id}`,
            type: 'info'
          });
        }
      }
    }

    // B. DÀNH CHO ADMIN / QUẢN LÝ ĐIỀU PHỐI
    else if (isApproverOrAdmin) {
      if (eventType === 'INSERT' && booking.status === 'PENDING') {
        this.showNotification({
          title: 'Yêu cầu ca trực mới cần duyệt',
          body: `Đơn từ ${booking.requester_email || 'User'}: "${booking.title}" ngày ${booking.booking_date}.`,
          booking_id: booking.booking_id,
          tag: `pending-${booking.booking_id}`,
          type: 'info'
        });
      } else if (eventType === 'UPDATE' && oldRec?.status === 'APPROVED' && newRec?.status === 'IN_PROGRESS') {
        this.showNotification({
          title: 'Kỹ sư đã bắt đầu ca trực',
          body: `Kỹ sư ${booking.tech_id} đã nhấn bắt đầu ca "${booking.title}".`,
          booking_id: booking.booking_id,
          tag: `started-${booking.booking_id}`,
          type: 'info'
        });
      }
    }

    // C. DÀNH CHO NGƯỜI ĐẶT LỊCH (REQUESTER)
    else if (isOwner && eventType === 'UPDATE') {
      if (oldRec?.status === 'PENDING' && newRec?.status === 'APPROVED') {
        this.showNotification({
          title: 'Yêu cầu của bạn đã được duyệt!',
          body: `Ca "${booking.title}" ngày ${booking.booking_date} đã được phê duyệt thành công.`,
          booking_id: booking.booking_id,
          tag: `user-approved-${booking.booking_id}`,
          type: 'success'
        });
      } else if (oldRec?.status === 'PENDING' && newRec?.status === 'REJECTED') {
        this.showNotification({
          title: 'Yêu cầu của bạn bị từ chối',
          body: `Lý do: ${booking.reject_reason || 'Không có lý do cụ thể'}.`,
          booking_id: booking.booking_id,
          tag: `user-rejected-${booking.booking_id}`,
          type: 'error'
        });
      }
    }
  }
};

window.PWANotificationManager = PWANotificationManager;

// Tự động khởi tạo khi trang đã sẵn sàng
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => PWANotificationManager.init());
} else {
  PWANotificationManager.init();
}
