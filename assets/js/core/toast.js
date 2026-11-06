// Toast Notification Utility (Vanilla JS + TailwindCSS)
const Toast = {
  container: null,

  init() {
    this.container = document.getElementById('toast-container');
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'toast-container';
      this.container.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0';
      document.body.appendChild(this.container);
    }
  },

  show(message, type = 'info', title = '') {
    if (!this.container) this.init();

    const types = {
      success: {
        bg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
        iconBg: 'bg-emerald-500 text-white',
        icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>',
        defaultTitle: 'Thành công'
      },
      error: {
        bg: 'bg-rose-50 border-rose-200 text-rose-800',
        iconBg: 'bg-rose-500 text-white',
        icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>',
        defaultTitle: 'Xung đột / Lỗi'
      },
      warning: {
        bg: 'bg-amber-50 border-amber-200 text-amber-800',
        iconBg: 'bg-amber-500 text-white',
        icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>',
        defaultTitle: 'Chú ý'
      },
      info: {
        bg: 'bg-brand-50 border-brand-200 text-brand-800',
        iconBg: 'bg-brand-500 text-white',
        icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
        defaultTitle: 'Thông báo'
      }
    };

    const cfg = types[type] || types.info;
    const toast = document.createElement('div');
    toast.className = `pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-lg ${cfg.bg} transform transition-all duration-300 translate-y-3 opacity-0`;

    toast.innerHTML = `
      <div class="flex-shrink-0 w-7 h-7 rounded-lg ${cfg.iconBg} flex items-center justify-center">
        ${cfg.icon}
      </div>
      <div class="flex-1 min-w-0 pt-0.5">
        <p class="text-xs font-bold leading-none mb-1">${title || cfg.defaultTitle}</p>
        <p class="text-xs leading-relaxed opacity-90">${message}</p>
      </div>
      <button class="flex-shrink-0 text-slate-400 hover:text-slate-600 p-1 -mr-1 -mt-1 rounded-md transition-colors" onclick="this.parentElement.remove()">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    `;

    // Keep max 3 toasts to avoid clutter
    while (this.container.children.length >= 3) {
      this.container.removeChild(this.container.firstChild);
    }

    this.container.appendChild(toast);

    // Trigger enter animation
    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-3', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');
    });

    // Auto dismiss after 4s
    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-x-full');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
};

window.Toast = Toast;
