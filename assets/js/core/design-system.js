/**
 * 🎨 CENTRALIZED DESIGN SYSTEM ENGINE (WCAG 2.2 AA COMPLIANT)
 * ==============================================================
 * Quản lý Single Source of Truth cho toàn bộ ứng dụng.
 * Hỗ trợ lưu trữ localStorage để đồng bộ thời gian thực giữa
 * trang `design-system.html` (trực quan) và `index.html`.
 */

// Bảng màu mặc định chuẩn Orven SaaS Light Mode (Slate-900, Emerald-500 & Rose-600)
const DEFAULT_DESIGN_TOKENS = {
  themeName: 'Orven Modern SaaS (Slate-900 & High-Tech Emerald)',
  brand: {
    50: '#f8fafc',   // Slate-50: Nền thẻ nhạt tinh khiết
    100: '#f1f5f9',  // Slate-100: Viền nhẹ, badge background
    200: '#e2e8f0',  // Slate-200: Viền active, divider
    300: '#cbd5e1',  // Slate-300
    400: '#94a3b8',  // Slate-400
    500: '#64748b',  // Slate-500: Text phụ
    600: '#0f172a',  // Slate-900: Primary Action & Brand Identity
    700: '#020617',  // Slate-950: Hover nút chính
    800: '#000000',  // Pure Black: Active / Pressed
    900: '#000000',
    950: '#000000',
  },
  accent: {
    50: '#ecfdf5',   // Emerald-50: Nền thẻ xanh nhạt
    100: '#d1fae5',  // Emerald-100: Viền xanh nhạt
    200: '#a7f3d0',  // Emerald-200: Viền xanh active
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',  // Emerald-500: Orven Signature Accent Green
    600: '#059669',  // Emerald-600: High-contrast
    700: '#047857',  // Emerald-700: Text / Hover
    800: '#065f46',  // Emerald-800: Active
    900: '#064e3b',
    950: '#022c22',
  },
  status: {
    pending: {
      bg: '#fffbeb',     // amber-50
      border: '#fde68a', // amber-200
      text: '#b45309',   // amber-700
      dot: '#f59e0b',    // amber-500
      label: 'Chờ duyệt'
    },
    approved: {
      bg: '#ecfdf5',     // emerald-50
      border: '#a7f3d0', // emerald-200
      text: '#047857',   // emerald-700
      dot: '#10b981',    // emerald-500
      label: 'Đã duyệt'
    },
    in_progress: {
      bg: '#f0fdf4',     // green-50
      border: '#86efac', // green-300
      text: '#15803d',   // green-700
      dot: '#22c55e',    // green-500
      label: 'Đang thực hiện'
    },
    completed: {
      bg: '#f8fafc',     // slate-50
      border: '#e2e8f0', // slate-200
      text: '#334155',   // slate-700
      dot: '#64748b',    // slate-500
      label: 'Hoàn thành'
    },
    rejected: {
      bg: '#fff1f2',     // rose-50
      border: '#fecdd3', // rose-200
      text: '#be123c',   // rose-700
      dot: '#f43f5e',    // rose-500
      label: 'Từ chối'
    },
    cancelled: {
      bg: '#f8fafc',     // slate-50
      border: '#e2e8f0', // slate-200
      text: '#64748b',   // slate-500
      dot: '#94a3b8',    // slate-400
      label: 'Đã hủy'
    }
  },
  burgundy: {
    50: '#fff1f2',   // rose-50
    100: '#ffe4e6',  // rose-100
    200: '#fecdd3',  // rose-200
    300: '#fda4af',
    400: '#fb7185',
    500: '#f43f5e',
    600: '#e11d48',  // rose-600: Chuẩn nguy hiểm / Cảnh báo / Chủ nhật
    700: '#be123c',  // rose-700
    800: '#9f1239',  // rose-800
    900: '#881337',
    950: '#4c0519',
  },
  radii: {
    btn: '0.75rem',    // 12px (rounded-xl)
    card: '1rem',      // 16px (rounded-2xl)
    modal: '1rem',     // 16px (rounded-2xl)
    pill: '9999px',
    slot: '0.5rem',    // 8px
  },
  fonts: {
    sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
    condensed: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
  }
};

// PRESET THEMES CÓ SẴN (ĐÃ KIỂM TRA ĐỘ TƯƠNG PHẢN WCAG 2.2 AA)
const THEME_PRESETS = {
  'phucsinh-navy': {
    name: 'Phúc Sinh Corporate Navy (Mặc định - #213664)',
    brand: {
      50: '#f0f4fb', 100: '#dbe5f5', 200: '#bed0ee', 300: '#93b1df', 400: '#618dcb',
      500: '#396bb2', 600: '#213664', 700: '#192b52', 800: '#132140', 900: '#0d172e', 950: '#070c19'
    },
    accent: {
      50: '#f2f8ef', 100: '#e0f0da', 200: '#c4e3b9', 300: '#9ccf8c', 400: '#73b65e',
      500: '#569c43', 600: '#39772a', 700: '#2b5c1f', 800: '#1f4316', 900: '#142b0e', 950: '#0a1707'
    }
  },
  'phucsinh-green': {
    name: 'Phúc Sinh Botanical Green (#569c43 / #39772a Tương Phản)',
    brand: {
      50: '#f2f8ef', 100: '#e0f0da', 200: '#c4e3b9', 300: '#9ccf8c', 400: '#73b65e',
      500: '#569c43', 600: '#39772a', 700: '#2b5c1f', 800: '#1f4316', 900: '#142b0e', 950: '#0a1707'
    },
    accent: {
      50: '#f0f4fb', 100: '#dbe5f5', 200: '#bed0ee', 300: '#93b1df', 400: '#618dcb',
      500: '#396bb2', 600: '#213664', 700: '#192b52', 800: '#132140', 900: '#0d172e', 950: '#070c19'
    }
  },
  'indigo-tech': {
    name: 'Indigo Enterprise (Màu Công Nghệ Cũ)',
    brand: {
      50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe', 300: '#a5b4fc', 400: '#818cf8',
      500: '#6366f1', 600: '#4338ca', 700: '#3730a3', 800: '#312e81', 900: '#1e1b4b', 950: '#0f0e26'
    }
  },
  'ocean-blue': {
    name: 'Ocean Tech (Xanh Biển Hiện Đại)',
    brand: {
      50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd', 300: '#7dd3fc', 400: '#38bdf8',
      500: '#0ea5e9', 600: '#0369a1', 700: '#075985', 800: '#0c4a6e', 900: '#082f49', 950: '#041826'
    }
  },
  'warm-amber': {
    name: 'Roasted Coffee Amber (Màu Cà Phê Nồng Ấm)',
    brand: {
      50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d', 400: '#fbbf24',
      500: '#f59e0b', 600: '#b45309', 700: '#92400e', 800: '#78350f', 900: '#451a03', 950: '#260e02'
    }
  }
};

const DesignSystem = {
  tokens: null,

  init() {
    // 1. Kiểm tra localStorage để lấy token tùy chỉnh nếu có
    const saved = localStorage.getItem('k_workspace_design_tokens');
    if (saved) {
      try {
        this.tokens = JSON.parse(saved);
        // Tự động nâng cấp sang hệ thống màu Executive Luxury mới (#16284f & #2c6e20)
        if (!this.tokens.brand || this.tokens.brand[600] !== '#16284f' || (this.tokens.themeName && !this.tokens.themeName.includes('Executive Luxury'))) {
          this.tokens = JSON.parse(JSON.stringify(DEFAULT_DESIGN_TOKENS));
          localStorage.setItem('k_workspace_design_tokens', JSON.stringify(this.tokens));
        }
        if (!this.tokens.fonts || !this.tokens.fonts.condensed) {
          this.tokens.fonts = JSON.parse(JSON.stringify(DEFAULT_DESIGN_TOKENS.fonts));
        }
        if (!this.tokens.accent) {
          this.tokens.accent = JSON.parse(JSON.stringify(DEFAULT_DESIGN_TOKENS.accent));
        }
        if (!this.tokens.burgundy || !this.tokens.status.rejected || this.tokens.status.rejected.dot === '#e11d48') {
          this.tokens.burgundy = JSON.parse(JSON.stringify(DEFAULT_DESIGN_TOKENS.burgundy));
          this.tokens.status.rejected = JSON.parse(JSON.stringify(DEFAULT_DESIGN_TOKENS.status.rejected));
          localStorage.setItem('k_workspace_design_tokens', JSON.stringify(this.tokens));
        }
      } catch (e) {
        this.tokens = JSON.parse(JSON.stringify(DEFAULT_DESIGN_TOKENS));
      }
    } else {
      this.tokens = JSON.parse(JSON.stringify(DEFAULT_DESIGN_TOKENS));
    }

    this.applyToDOM();
    this.configureTailwind();
  },

  applyToDOM() {
    const root = document.documentElement;

    // 1. Inject Brand CSS Variables (#213664)
    Object.keys(this.tokens.brand).forEach(key => {
      root.style.setProperty(`--color-brand-${key}`, this.tokens.brand[key]);
    });

    // 2. Inject Accent CSS Variables (#569c43)
    const accentTokens = this.tokens.accent || DEFAULT_DESIGN_TOKENS.accent;
    Object.keys(accentTokens).forEach(key => {
      root.style.setProperty(`--color-accent-${key}`, accentTokens[key]);
    });

    // 3. Inject Status CSS Variables
    Object.keys(this.tokens.status).forEach(st => {
      const s = this.tokens.status[st];
      root.style.setProperty(`--status-${st}-bg`, s.bg);
      root.style.setProperty(`--status-${st}-border`, s.border);
      root.style.setProperty(`--status-${st}-text`, s.text);
      root.style.setProperty(`--status-${st}-dot`, s.dot);
    });

    // 3.5 Inject Burgundy CSS Variables (#800020 - Đỏ Đô)
    const burgundyTokens = this.tokens.burgundy || DEFAULT_DESIGN_TOKENS.burgundy;
    Object.keys(burgundyTokens).forEach(key => {
      root.style.setProperty(`--color-burgundy-${key}`, burgundyTokens[key]);
    });

    // 4. Inject Radii CSS Variables
    Object.keys(this.tokens.radii).forEach(r => {
      root.style.setProperty(`--radius-${r}`, this.tokens.radii[r]);
    });

    // 5. INJECT BULLETPROOF DIRECT CSS RULES
    let styleTag = document.getElementById('k-design-system-core-style');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'k-design-system-core-style';
      document.head.appendChild(styleTag);
    }

    styleTag.innerHTML = `
      /* =================================================== */
      /* K-WORKSPACE CORE DESIGN SYSTEM - BULLETPROOF STYLES */
      /* =================================================== */
      :root {
        --color-brand-50: ${this.tokens.brand[50]};
        --color-brand-100: ${this.tokens.brand[100]};
        --color-brand-200: ${this.tokens.brand[200]};
        --color-brand-300: ${this.tokens.brand[300]};
        --color-brand-400: ${this.tokens.brand[400]};
        --color-brand-500: ${this.tokens.brand[500]};
        --color-brand-600: ${this.tokens.brand[600]};
        --color-brand-700: ${this.tokens.brand[700]};
        --color-brand-800: ${this.tokens.brand[800]};
        --color-brand-900: ${this.tokens.brand[900]};
        --color-brand-950: ${this.tokens.brand[950]};

        --color-accent-50: ${accentTokens[50]};
        --color-accent-100: ${accentTokens[100]};
        --color-accent-200: ${accentTokens[200]};
        --color-accent-300: ${accentTokens[300]};
        --color-accent-400: ${accentTokens[400]};
        --color-accent-500: ${accentTokens[500]};
        --color-accent-600: ${accentTokens[600]};
        --color-accent-700: ${accentTokens[700]};
        --color-accent-800: ${accentTokens[800]};
        --color-accent-900: ${accentTokens[900]};

        --color-burgundy-50: ${burgundyTokens[50]};
        --color-burgundy-100: ${burgundyTokens[100]};
        --color-burgundy-200: ${burgundyTokens[200]};
        --color-burgundy-800: ${burgundyTokens[800]};
        --color-burgundy-900: ${burgundyTokens[900]};

        --radius-btn: ${this.tokens.radii.btn};
        --radius-card: ${this.tokens.radii.card};
        --radius-modal: ${this.tokens.radii.modal};
        --radius-slot: ${this.tokens.radii.slot};
      }

      /* Bulletproof Corporate Navy Gradient */
      .bg-phucsinh-navy-gradient {
        background-color: ${this.tokens.brand[600]} !important;
        background: linear-gradient(135deg, #071328 0%, #0e2145 52%, ${this.tokens.brand[600]} 100%) !important;
        box-shadow: 0 4px 20px rgba(7, 19, 40, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.08) !important;
      }

      /* Solid Brand Backgrounds (#213664) */
      .bg-brand-50  { background-color: var(--color-brand-50) !important; }
      .bg-brand-100 { background-color: var(--color-brand-100) !important; }
      .bg-brand-200 { background-color: var(--color-brand-200) !important; }
      .bg-brand-300 { background-color: var(--color-brand-300) !important; }
      .bg-brand-400 { background-color: var(--color-brand-400) !important; }
      .bg-brand-500 { background-color: var(--color-brand-500) !important; }
      .bg-brand-600 { background-color: var(--color-brand-600) !important; }
      .bg-brand-700 { background-color: var(--color-brand-700) !important; }
      .bg-brand-800 { background-color: var(--color-brand-800) !important; }
      .bg-brand-900 { background-color: var(--color-brand-900) !important; }

      /* Solid Accent Backgrounds (#569c43) */
      .bg-accent-50  { background-color: var(--color-accent-50) !important; }
      .bg-accent-100 { background-color: var(--color-accent-100) !important; }
      .bg-accent-200 { background-color: var(--color-accent-200) !important; }
      .bg-accent-500 { background-color: var(--color-accent-500) !important; }
      .bg-accent-600 { background-color: var(--color-accent-600) !important; }
      .bg-accent-700 { background-color: var(--color-accent-700) !important; }

      /* Burgundy Backgrounds (#800020 - Đỏ Đô) */
      .bg-burgundy-50  { background-color: var(--color-burgundy-50, #fdf2f4) !important; }
      .bg-burgundy-100 { background-color: var(--color-burgundy-100, #fbe6e9) !important; }
      .bg-burgundy-200 { background-color: var(--color-burgundy-200, #f6d0d6) !important; }
      .bg-burgundy-800 { background-color: var(--color-burgundy-800, #800020) !important; }
      .bg-burgundy-900 { background-color: var(--color-burgundy-900, #68001a) !important; }

      /* Brand Typography (WCAG AA Compliant) */
      .text-brand-50  { color: var(--color-brand-50) !important; }
      .text-brand-100 { color: var(--color-brand-100) !important; }
      .text-brand-500 { color: var(--color-brand-500) !important; }
      .text-brand-600 { color: var(--color-brand-600) !important; }
      .text-brand-700 { color: var(--color-brand-700) !important; }
      .text-brand-800 { color: var(--color-brand-800) !important; }
      .text-brand-900 { color: var(--color-brand-900) !important; }

      /* Accent Typography (WCAG AA Compliant) */
      .text-accent-500 { color: var(--color-accent-500) !important; }
      .text-accent-600 { color: var(--color-accent-600) !important; }
      .text-accent-700 { color: var(--color-accent-700) !important; }

      /* Burgundy Typography (#800020 - Đỏ Đô) */
      .text-burgundy-700 { color: var(--color-burgundy-700, #942239) !important; }
      .text-burgundy-800 { color: var(--color-burgundy-800, #800020) !important; }
      .text-burgundy-900 { color: var(--color-burgundy-900, #68001a) !important; }

      /* Brand Borders */
      .border-brand-100 { border-color: var(--color-brand-100) !important; }
      .border-brand-200 { border-color: var(--color-brand-200) !important; }
      .border-brand-300 { border-color: var(--color-brand-300) !important; }
      .border-brand-500 { border-color: var(--color-brand-500) !important; }
      .border-brand-600 { border-color: var(--color-brand-600) !important; }
      .border-brand-700 { border-color: var(--color-brand-700) !important; }

      /* Accent Borders */
      .border-accent-100 { border-color: var(--color-accent-100) !important; }
      .border-accent-200 { border-color: var(--color-accent-200) !important; }
      .border-accent-600 { border-color: var(--color-accent-600) !important; }

      /* Burgundy Borders */
      .border-burgundy-100 { border-color: var(--color-burgundy-100, #fbe6e9) !important; }
      .border-burgundy-200 { border-color: var(--color-burgundy-200, #f6d0d6) !important; }
      .border-burgundy-800 { border-color: var(--color-burgundy-800, #800020) !important; }

      /* Standard Interactive Hover States */
      .hover\\:bg-brand-50:hover  { background-color: var(--color-brand-50) !important; }
      .hover\\:bg-brand-100:hover { background-color: var(--color-brand-100) !important; }
      .hover\\:bg-brand-600:hover { background-color: var(--color-brand-600) !important; }
      .hover\\:bg-brand-700:hover { background-color: var(--color-brand-700) !important; }
      .hover\\:bg-brand-800:hover { background-color: var(--color-brand-800) !important; }
      .hover\\:bg-burgundy-50:hover { background-color: var(--color-burgundy-50, #fdf2f4) !important; }
      .hover\\:bg-burgundy-900:hover { background-color: var(--color-burgundy-900, #68001a) !important; }
      .hover\\:text-brand-600:hover { color: var(--color-brand-600) !important; }
      .hover\\:text-brand-700:hover { color: var(--color-brand-700) !important; }
      .hover\\:text-burgundy-800:hover { color: var(--color-burgundy-800, #800020) !important; }
      .hover\\:border-brand-500:hover { border-color: var(--color-brand-500) !important; }

      /* Group Hover */
      .group:hover .group-hover\\:bg-brand-50 { background-color: var(--color-brand-50) !important; }
      .group:hover .group-hover\\:bg-brand-100 { background-color: var(--color-brand-100) !important; }
      .group:hover .group-hover\\:bg-brand-700 { background-color: var(--color-brand-700) !important; }
      .group:hover .group-hover\\:text-brand-600 { color: var(--color-brand-600) !important; }
      .group:hover .group-hover\\:text-brand-700 { color: var(--color-brand-700) !important; }

      /* Standard Border Radius */
      .rounded-btn   { border-radius: var(--radius-btn) !important; }
      .rounded-card  { border-radius: var(--radius-card) !important; }
      .rounded-modal { border-radius: var(--radius-modal) !important; }
      .rounded-slot  { border-radius: var(--radius-slot) !important; }

      /* ⚡ TOP PROGRESS BAR & SKELETON SHIMMER (PROPOSAL 2 - STRIPE / GITHUB / LINEAR STYLE) */
      @keyframes k-progress-indeterminate {
        0% { transform: translateX(-100%); }
        50% { transform: translateX(10%); }
        100% { transform: translateX(105%); }
      }

      @keyframes k-skeleton-shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }

      .k-progress-bar-active {
        animation: k-progress-indeterminate 1.4s cubic-bezier(0.4, 0, 0.2, 1) infinite !important;
      }

      .k-skeleton-shimmer {
        background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%) !important;
        background-size: 200% 100% !important;
        animation: k-skeleton-shimmer 1.5s infinite ease-in-out !important;
      }

      /* 🔤 ORVEN GEOMETRIC TYPOGRAPHY SYSTEM (INTER + PLUS JAKARTA SANS) */
      .font-sans {
        font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
        font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11';
      }
      .font-condensed,
      .font-display {
        font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif !important;
        font-variant-numeric: tabular-nums;
      }

      /* 🌿 SYSTEM MODERN INPUT FOCUS */
      input:not([type="checkbox"]):not([type="radio"]):not([type="range"]):focus,
      input:not([type="checkbox"]):not([type="radio"]):not([type="range"]):focus-visible,
      select:focus,
      select:focus-visible,
      textarea:focus,
      textarea:focus-visible {
        border-color: #94a3b8 !important;
        outline: none !important;
        box-shadow: 0 0 0 3px rgba(15, 23, 42, 0.08) !important;
        background-color: #ffffff !important;
      }
      input[type="checkbox"]:focus-visible,
      input[type="radio"]:focus-visible {
        outline: 2px solid #0f172a !important;
        outline-offset: 2px !important;
      }

      /* 🔒 STANDARDIZED COMPONENT TOKENS (SLATE-900 ORVEN PALETTE) */
      .k-brand-badge {
        background-color: #0f172a !important;
        color: #ffffff !important;
        font-weight: 700;
        box-shadow: 0 1px 2px 0 rgba(15, 23, 42, 0.05);
      }
      .k-btn-primary {
        background-color: #0f172a !important;
        color: #ffffff !important;
        font-weight: 600;
        box-shadow: 0 1px 2px 0 rgba(15, 23, 42, 0.06) !important;
        transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .k-btn-primary:hover {
        background-color: #1e293b !important;
        box-shadow: 0 4px 12px -2px rgba(15, 23, 42, 0.12) !important;
      }
      .k-btn-primary:active {
        background-color: #020617 !important;
      }

      /* Bulletproof Text Selection (Slate-900) */
      ::selection {
        background-color: #0f172a !important;
        color: #ffffff !important;
      }
      ::-moz-selection {
        background-color: #0f172a !important;
        color: #ffffff !important;
      }
    `;
  },

  configureTailwind() {
    window.tailwind = window.tailwind || {};
    window.tailwind.config = {
      theme: {
        extend: {
          colors: {
            brand: this.tokens.brand,
            accent: this.tokens.accent || DEFAULT_DESIGN_TOKENS.accent,
            burgundy: this.tokens.burgundy || DEFAULT_DESIGN_TOKENS.burgundy,
            status: this.tokens.status,
          },
          borderRadius: {
            btn: this.tokens.radii.btn,
            card: this.tokens.radii.card,
            modal: this.tokens.radii.modal,
            slot: this.tokens.radii.slot,
          },
          fontFamily: {
            sans: this.tokens.fonts.sans,
            condensed: this.tokens.fonts.condensed,
            display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
          },
          backdropBlur: {
            xs: '2px',
          },
          boxShadow: {
            '2xs': '0 1px 2px 0 rgba(15, 23, 42, 0.03)',
            xs: '0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.03)',
            card: '0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 4px 12px -2px rgba(15, 23, 42, 0.03)',
            hover: '0 8px 20px -4px rgba(15, 23, 42, 0.08), 0 2px 6px -2px rgba(15, 23, 42, 0.04)',
          }
        }
      }
    };
  },

  // Lưu tokens mới và đồng bộ tức thì
  saveTokens(newTokens) {
    this.tokens = newTokens;
    localStorage.setItem('k_workspace_design_tokens', JSON.stringify(newTokens));
    this.applyToDOM();
    this.configureTailwind();
  },

  // Reset về mặc định
  resetTokens() {
    localStorage.removeItem('k_workspace_design_tokens');
    this.tokens = JSON.parse(JSON.stringify(DEFAULT_DESIGN_TOKENS));
    this.applyToDOM();
    this.configureTailwind();
  },

  // Áp dụng Preset Theme
  applyPreset(presetKey) {
    if (THEME_PRESETS[presetKey]) {
      this.tokens.themeName = THEME_PRESETS[presetKey].name;
      this.tokens.brand = THEME_PRESETS[presetKey].brand;
      if (THEME_PRESETS[presetKey].accent) {
        this.tokens.accent = THEME_PRESETS[presetKey].accent;
      }
      this.saveTokens(this.tokens);
    }
  },

  // Tính toán độ tương phản WCAG Contrast Ratio (L1 + 0.05) / (L2 + 0.05)
  calculateContrast(hex1, hex2) {
    const getLuminance = (hex) => {
      const rgb = parseInt(hex.replace('#', ''), 16);
      const r = (rgb >> 16) & 0xff;
      const g = (rgb >> 8) & 0xff;
      const b = (rgb >> 0) & 0xff;

      const a = [r, g, b].map(v => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    };

    const l1 = getLuminance(hex1);
    const l2 = getLuminance(hex2);
    const brightest = Math.max(l1, l2);
    const darkest = Math.min(l1, l2);
    const ratio = (brightest + 0.05) / (darkest + 0.05);
    return Math.round(ratio * 10) / 10;
  }
};

// Bootstrap engine immediately
DesignSystem.init();
window.DesignSystem = DesignSystem;
window.THEME_PRESETS = THEME_PRESETS;

/**
 * ⚡ GLOBAL SYSTEM PROGRESS & ACTION GUARD (Proposal 2: Top Progress Line + Micro-HUD)
 * ====================================================================================
 * - Loại bỏ hoàn toàn màn xám phủ kín màn hình và card popup thô kệch.
 * - Thanh tiến trình mỏng 2.5px chạy ở đỉnh viewport (Stripe / GitHub / Linear style).
 * - Tấm khiên chống click đúp hoàn toàn trong suốt (chỉ kích hoạt khi ghi/lưu dữ liệu).
 * - Micro-HUD hạt đậu nổi siêu nhỏ (24px) trượt từ trên xuống khi lưu/xóa/phê duyệt.
 */
const SystemLoader = {
  activeCount: 0,
  shownAt: 0,
  hideTimer: null,
  progressBarEl: null,
  progressInnerEl: null,
  clickShieldEl: null,
  floatingHudEl: null,

  ensureDOM() {
    if (this.progressBarEl && document.body && document.body.contains(this.progressBarEl)) {
      return;
    }
    if (!document.body) return;

    // 1. Top Indeterminate Progress Bar (Ultra-slim 2.5px pinned to top)
    const progressBar = document.createElement('div');
    progressBar.id = 'k-system-progress-bar';
    progressBar.setAttribute('role', 'progressbar');
    progressBar.setAttribute('aria-valuemin', '0');
    progressBar.setAttribute('aria-valuemax', '100');
    progressBar.className = 'fixed top-0 left-0 right-0 h-[2.5px] z-[99999] pointer-events-none opacity-0 transition-opacity duration-200 overflow-hidden bg-slate-200/40 select-none';
    progressBar.innerHTML = `
      <div id="k-system-progress-inner" class="h-full w-full bg-gradient-to-r from-slate-900 via-emerald-500 to-emerald-400 rounded-full transition-transform duration-200 origin-left"></div>
    `;

    // 2. Invisible Click Shield (Only active during mutations to prevent double-click / spam, ZERO grey veil!)
    const clickShield = document.createElement('div');
    clickShield.id = 'k-system-click-shield';
    clickShield.className = 'fixed inset-0 z-[99990] bg-transparent cursor-wait hidden pointer-events-auto select-none';
    clickShield.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
    }, true);

    // 3. Compact Floating Dynamic Island / HUD (Only for saving/mutating actions, slides smoothly from top)
    const floatingHud = document.createElement('div');
    floatingHud.id = 'k-system-floating-hud';
    floatingHud.className = 'fixed top-3 left-1/2 -translate-x-1/2 z-[99999] hidden items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 text-white shadow-lg backdrop-blur-md border border-white/10 pointer-events-none transition-all duration-200 opacity-0 -translate-y-2 select-none';
    floatingHud.innerHTML = `
      <span class="relative flex h-2 w-2 shrink-0">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-2 w-2 bg-accent-500"></span>
      </span>
      <span id="k-system-hud-title" class="font-condensed text-[11px] font-bold uppercase tracking-wider text-slate-100 whitespace-nowrap">Đang xử lý…</span>
    `;

    document.body.appendChild(progressBar);
    document.body.appendChild(clickShield);
    document.body.appendChild(floatingHud);

    this.progressBarEl = progressBar;
    this.progressInnerEl = progressBar.querySelector('#k-system-progress-inner');
    this.clickShieldEl = clickShield;
    this.floatingHudEl = floatingHud;
  },

  isBusy() {
    return this.activeCount > 0;
  },

  show(title = '', subtitle = '', isMutation = false) {
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }
    this.activeCount++;
    if (this.activeCount === 1) {
      this.shownAt = Date.now();
    }

    this.ensureDOM();
    if (!this.progressBarEl) return;

    // Detect if this is a mutating action (e.g. Save, Delete, Approve, Reject, Logout, Reset Password)
    const isMutatingAction = isMutation || /lưu|xóa|duyệt|từ chối|hủy|tạo|đổi|khôi phục|đăng xuất/i.test(title || subtitle || '');

    // 1. Activate Top Progress Bar
    this.progressBarEl.classList.remove('opacity-0');
    this.progressBarEl.classList.add('opacity-100');
    if (this.progressInnerEl) {
      this.progressInnerEl.classList.add('k-progress-bar-active');
    }

    // 2. If mutating action, activate transparent click barrier to prevent spam double-clicking
    if (isMutatingAction && this.clickShieldEl) {
      this.clickShieldEl.classList.remove('hidden');
    }

    // 3. If mutating action with title, show the sleek micro-HUD pill at top
    if (isMutatingAction && title && this.floatingHudEl) {
      const hudTitle = this.floatingHudEl.querySelector('#k-system-hud-title');
      if (hudTitle) hudTitle.textContent = title.replace(/…|\.\.\./g, '');
      this.floatingHudEl.classList.remove('hidden');
      this.floatingHudEl.classList.add('flex');
      requestAnimationFrame(() => {
        this.floatingHudEl.classList.remove('opacity-0', '-translate-y-2');
        this.floatingHudEl.classList.add('opacity-100', 'translate-y-0');
      });
    }
  },

  hide(minDurationMs = 240) {
    this.activeCount = Math.max(0, this.activeCount - 1);
    if (this.activeCount > 0) return;

    const elapsed = Date.now() - this.shownAt;
    const remaining = Math.max(0, minDurationMs - elapsed);

    if (this.hideTimer) clearTimeout(this.hideTimer);
    this.hideTimer = setTimeout(() => {
      if (this.activeCount > 0) return;

      // Deactivate click shield
      if (this.clickShieldEl) {
        this.clickShieldEl.classList.add('hidden');
      }

      // Hide micro floating HUD
      if (this.floatingHudEl) {
        this.floatingHudEl.classList.remove('opacity-100', 'translate-y-0');
        this.floatingHudEl.classList.add('opacity-0', '-translate-y-2');
        setTimeout(() => {
          if (this.activeCount === 0 && this.floatingHudEl) {
            this.floatingHudEl.classList.add('hidden');
            this.floatingHudEl.classList.remove('flex');
          }
        }, 150);
      }

      // Complete progress bar to 100% then fade out smoothly
      if (this.progressInnerEl) {
        this.progressInnerEl.classList.remove('k-progress-bar-active');
        this.progressInnerEl.style.transform = 'translateX(0)';
      }
      setTimeout(() => {
        if (this.progressBarEl) {
          this.progressBarEl.classList.remove('opacity-100');
          this.progressBarEl.classList.add('opacity-0');
        }
      }, 100);
    }, remaining);
  },

  async track(promiseOrFn, title = '', subtitle = '', minDurationMs = 240) {
    this.show(title, subtitle, true);
    try {
      const target = typeof promiseOrFn === 'function' ? promiseOrFn() : promiseOrFn;
      return await Promise.resolve(target);
    } finally {
      this.hide(minDurationMs);
    }
  }
};

window.SystemLoader = SystemLoader;

