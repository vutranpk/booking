// Toast Notification Utility (Vanilla JS + TailwindCSS)
const Toast = {
  container: null,

  init() {
    this.container = document.getElementById('toast-container');
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'toast-container';
      document.body.appendChild(this.container);
    }
    this.container.className = 'fixed top-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-md w-full pointer-events-none px-4 sm:px-0';
  },

  show(message, type = 'info', title = '') {
    if (!this.container) this.init();

    const types = {
      success: {
        bg: 'bg-emerald-50 border-emerald-300 text-emerald-900 ring-2 ring-emerald-500/20',
        iconBg: 'bg-emerald-600 text-white',
        icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>',
        defaultTitle: 'Thành công'
      },
      error: {
        bg: 'bg-rose-50 border-rose-300 text-rose-900 ring-2 ring-rose-500/20',
        iconBg: 'bg-rose-600 text-white',
        icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>',
        defaultTitle: 'Xung đột / Lỗi'
      },
      warning: {
        bg: 'bg-amber-50 border-amber-300 text-amber-900 ring-2 ring-amber-500/20',
        iconBg: 'bg-amber-500 text-white',
        icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>',
        defaultTitle: 'Chú ý'
      },
      info: {
        bg: 'bg-white border-brand-300 text-slate-900 ring-2 ring-brand-500/20',
        iconBg: 'bg-brand-600 text-white',
        icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
        defaultTitle: 'Thông báo hệ thống'
      }
    };

    const cfg = types[type] || types.info;
    const toast = document.createElement('div');
    toast.className = `pointer-events-auto flex items-start gap-3 p-4 rounded-2xl border shadow-2xl ${cfg.bg} transform transition-all duration-300 -translate-y-3 opacity-0`;

    toast.innerHTML = `
      <div class="flex-shrink-0 w-8 h-8 rounded-xl ${cfg.iconBg} flex items-center justify-center shadow-xs">
        ${cfg.icon}
      </div>
      <div class="flex-1 min-w-0 pt-0.5">
        <p class="text-xs font-extrabold leading-none mb-1">${title || cfg.defaultTitle}</p>
        <p class="text-xs font-medium leading-relaxed">${message}</p>
      </div>
      <button type="button" class="flex-shrink-0 text-slate-400 hover:text-slate-700 p-1 -mr-1 -mt-1 rounded-lg transition-colors cursor-pointer" onclick="this.parentElement.remove()">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    `;

    // Keep max 4 toasts to avoid clutter
    while (this.container.children.length >= 4) {
      this.container.removeChild(this.container.firstChild);
    }

    this.container.appendChild(toast);

    // Trigger enter animation
    requestAnimationFrame(() => {
      toast.classList.remove('-translate-y-3', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');
    });

    // Auto dismiss after 6s
    setTimeout(() => {
      if (!toast.parentElement) return;
      toast.classList.add('opacity-0', 'translate-x-full');
      setTimeout(() => toast.remove(), 300);
    }, 6000);
  }
};

window.Toast = Toast;
