/**
 * 🎨 CENTRALIZED DESIGN SYSTEM ENGINE (WCAG 2.2 AA COMPLIANT)
 * ==============================================================
 * Quản lý Single Source of Truth cho toàn bộ ứng dụng.
 * Hỗ trợ lưu trữ localStorage để đồng bộ thời gian thực giữa
 * trang `design-system.html` (trực quan) và `index.html`.
 */

// Bảng màu mặc định chuẩn WCAG 2.2 AA xoay quanh 2 màu chủ đạo #213664 và #569c43
const DEFAULT_DESIGN_TOKENS = {
  themeName: 'Phúc Sinh Corporate (Navy & Botanical Green)',
  brand: {
    50: '#f0f4fb',   // Nền thẻ nhạt tinh khiết
    100: '#dbe5f5',  // Viền nhẹ, badge background
    200: '#bed0ee',  // Viền active
    300: '#93b1df',
    400: '#618dcb',
    500: '#396bb2',  // Accent phụ
    600: '#213664',  // PRIMARY NAVY (Seed 1: Phúc Sinh Corporate Navy - Tương phản 12.0:1 trên nền trắng - Đạt AAA)
    700: '#192b52',  // Hover nút chính (Tương phản 14.8:1 - Đạt AAA)
    800: '#132140',  // Active / Pressed (Tương phản 17.5:1 - Đạt AAA)
    900: '#0d172e',
    950: '#070c19',
  },
  accent: {
    50: '#f2f8ef',   // Nền thẻ xanh nhạt
    100: '#e0f0da',  // Viền xanh nhạt
    200: '#c4e3b9',  // Viền xanh active
    300: '#9ccf8c',
    400: '#73b65e',
    500: '#569c43',  // SIGNATURE BOTANICAL GREEN (Seed 2: Phúc Sinh Nature Green - Biểu tượng, accent, status dot)
    600: '#39772a',  // HIGH-CONTRAST GREEN (Đã tinh chỉnh tương phản WCAG 5.17:1 trên nền trắng & chữ trắng)
    700: '#2b5c1f',  // Text / Hover (Tương phản 7.55:1 - Đạt AAA)
    800: '#1f4316',  // Active (Tương phản 10.8:1 - Đạt AAA)
    900: '#142b0e',
    950: '#0a1707',
  },
  status: {
    pending: {
      bg: '#fffbeb',     // amber-50
      border: '#fcd34d', // amber-300
      text: '#78350f',   // amber-900 (Đạt chuẩn WCAG AA >= 7.1:1 trên nền #fffbeb)
      dot: '#d97706',    // amber-600
      label: 'Chờ duyệt'
    },
    approved: {
      bg: '#f2f8ef',     // Green-50 (tương thích hoàn toàn với hệ thống màu xanh #569c43)
      border: '#c4e3b9', // Green-200
      text: '#2b5c1f',   // Green-700 (Đạt chuẩn WCAG AAA >= 7.55:1 trên nền #f2f8ef)
      dot: '#569c43',    // Exact signature seed green #569c43
      label: 'Đã duyệt'
    },
    rejected: {
      bg: '#fdf2f4',     // burgundy-50
      border: '#f6d0d6', // burgundy-200
      text: '#800020',   // burgundy-800 ĐỎ ĐÔ (Tương phản 10.84:1 trên #fff và 9.8:1 trên #fdf2f4 - Đạt AAA)
      dot: '#800020',    // burgundy-800 Đỏ đô chuẩn
      label: 'Từ chối'
    },
    cancelled: {
      bg: '#f8fafc',     // slate-50
      border: '#cbd5e1', // slate-300
      text: '#334155',   // slate-700 (Đạt chuẩn WCAG AA >= 7.3:1 trên nền #f8fafc)
      dot: '#64748b',    // slate-500
      label: 'Đã hủy'
    }
  },
  burgundy: {
    50: '#fdf2f4',   // Nền thẻ nhạt
    100: '#fbe6e9',  // Viền nhẹ, badge background
    200: '#f6d0d6',  // Viền active
    300: '#efaab6',
    400: '#e3788b',
    500: '#cf4d66',
    600: '#b2314b',
    700: '#942239',
    800: '#800020',  // ĐỎ ĐÔ CHUẨN (Classic Burgundy: Chủ nhật, Từ chối, Cảnh báo xung đột - Tương phản 10.84:1 - Đạt AAA)
    900: '#68001a',  // Hover nút đỏ đô
    950: '#3d000f',
  },
  radii: {
    btn: '0.75rem',    // 12px
    card: '1rem',      // 16px
    modal: '1.25rem',  // 20px
    pill: '9999px',
    slot: '0.5rem',    // 8px
  },
  fonts: {
    sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
    condensed: ['"Roboto Condensed"', 'Inter', 'system-ui', 'sans-serif'],
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
        // Tự động nâng cấp sang hệ thống màu mới Phúc Sinh (#213664 & #569c43) nếu đang lưu token cũ
        if (!this.tokens.brand || this.tokens.brand[600] === '#4338ca' || (this.tokens.themeName && this.tokens.themeName.includes('Indigo'))) {
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
        background-color: #213664 !important;
        background: linear-gradient(125deg, #0b1428 0%, #17274b 52%, #213664 100%) !important;
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

      /* 🔤 DUAL-FONT TYPOGRAPHY SYSTEM (INTER + ROBOTO CONDENSED) */
      .font-sans {
        font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
        font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11';
      }
      .font-condensed {
        font-family: 'Roboto Condensed', 'Inter', system-ui, sans-serif !important;
        font-variant-numeric: tabular-nums;
      }

      /* 🌿 SYSTEM BOTANICAL GREEN INPUT FOCUS (#569c43) */
      input:not([type="checkbox"]):not([type="radio"]):not([type="range"]):focus,
      input:not([type="checkbox"]):not([type="radio"]):not([type="range"]):focus-visible,
      select:focus,
      select:focus-visible,
      textarea:focus,
      textarea:focus-visible {
        border-color: var(--color-accent-500, #569c43) !important;
        outline: none !important;
        box-shadow: 0 0 0 3px rgba(86, 156, 67, 0.2) !important;
        background-color: #ffffff !important;
      }
      input[type="checkbox"]:focus-visible,
      input[type="radio"]:focus-visible {
        outline: 2px solid var(--color-accent-500, #569c43) !important;
        outline-offset: 2px !important;
      }

      /* 🔒 STANDARDIZED COMPONENT TOKENS (ĐẢM BẢO TƯƠNG PHẢN TUYỆT ĐỐI) */
      .k-brand-badge {
        background-color: var(--color-brand-600) !important;
        color: #ffffff !important;
        font-weight: 800;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
      }
      .k-btn-primary {
        background-color: var(--color-brand-600) !important;
        color: #ffffff !important;
        font-weight: 600;
        transition: all 0.2s ease-in-out;
      }
      .k-btn-primary:hover {
        background-color: var(--color-brand-700) !important;
      }
      .k-btn-primary:active {
        background-color: var(--color-brand-800) !important;
      }

      /* Bulletproof Text Selection (#213664) */
      ::selection {
        background-color: var(--color-brand-600, #213664) !important;
        color: #ffffff !important;
      }
      ::-moz-selection {
        background-color: var(--color-brand-600, #213664) !important;
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
          },
          boxShadow: {
            '2xs': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
            xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            card: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
            hover: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.04)',
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
 * ⏳ GLOBAL SYSTEM BUSY & SERVER ACTION GUARD (SystemLoader)
 * ==============================================================
 * Chặn thao tác chồng chéo (double-click / spam submit) và hiển thị
 * trạng thái đang ghi / lấy / xuất dữ liệu từ máy chủ trên mọi trang.
 */
const SystemLoader = {
  activeCount: 0,
  shownAt: 0,
  hideTimer: null,
  overlayEl: null,

  ensureDOM() {
    if (this.overlayEl && document.body && document.body.contains(this.overlayEl)) {
      return this.overlayEl;
    }
    if (!document.body) return null;

    const overlay = document.createElement('div');
    overlay.id = 'k-system-loader-overlay';
    overlay.setAttribute('role', 'alertdialog');
    overlay.setAttribute('aria-live', 'assertive');
    overlay.setAttribute('aria-busy', 'true');
    overlay.className = 'fixed inset-0 z-[9998] hidden items-center justify-center bg-slate-900/25 backdrop-blur-[2px] p-4 select-none cursor-wait transition-opacity duration-150 opacity-0';

    overlay.innerHTML = `
      <div class="fixed top-0 left-0 right-0 h-1 bg-brand-100/80 overflow-hidden">
        <div class="h-full w-1/2 bg-accent-500 rounded-full animate-pulse"></div>
      </div>
      <div class="bg-white border border-slate-200/90 rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3.5 max-w-sm w-full sm:w-auto pointer-events-auto">
        <div class="relative w-8 h-8 shrink-0 flex items-center justify-center">
          <span class="w-8 h-8 rounded-full border-[3px] border-slate-100 border-t-accent-500 border-r-brand-600 animate-spin block"></span>
          <span class="w-2 h-2 rounded-full bg-accent-500 absolute"></span>
        </div>
        <div class="min-w-0 flex-1">
          <p id="k-system-loader-title" class="font-condensed text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 leading-tight">
            Đang đồng bộ máy chủ…
          </p>
          <p id="k-system-loader-subtitle" class="text-[11px] font-medium text-slate-500 mt-0.5 leading-snug">
            Vui lòng chờ trong giây lát, hệ thống đang xử lý dữ liệu…
          </p>
        </div>
      </div>
    `;

    // Chặn toàn bộ click/keydown xuyên qua lớp phủ khi đang xử lý
    overlay.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
    }, true);

    document.body.appendChild(overlay);
    this.overlayEl = overlay;
    return overlay;
  },

  isBusy() {
    return this.activeCount > 0;
  },

  show(title = 'Đang xử lý dữ liệu máy chủ…', subtitle = 'Vui lòng chờ trong giây lát, hệ thống đang đồng bộ…') {
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }
    this.activeCount++;
    if (this.activeCount === 1) {
      this.shownAt = Date.now();
    }

    const overlay = this.ensureDOM();
    if (!overlay) return;

    const titleEl = document.getElementById('k-system-loader-title');
    const subEl = document.getElementById('k-system-loader-subtitle');
    if (titleEl && title) titleEl.textContent = title;
    if (subEl && subtitle) subEl.textContent = subtitle;

    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
    requestAnimationFrame(() => {
      overlay.classList.remove('opacity-0');
      overlay.classList.add('opacity-100');
    });
  },

  hide(minDurationMs = 320) {
    this.activeCount = Math.max(0, this.activeCount - 1);
    if (this.activeCount > 0) return;

    const elapsed = Date.now() - this.shownAt;
    const remaining = Math.max(0, minDurationMs - elapsed);

    if (this.hideTimer) clearTimeout(this.hideTimer);
    this.hideTimer = setTimeout(() => {
      if (this.activeCount > 0) return;
      const overlay = this.overlayEl || document.getElementById('k-system-loader-overlay');
      if (!overlay) return;
      overlay.classList.remove('opacity-100');
      overlay.classList.add('opacity-0');
      setTimeout(() => {
        if (this.activeCount === 0 && overlay) {
          overlay.classList.add('hidden');
          overlay.classList.remove('flex');
        }
      }, 150);
    }, remaining);
  },

  async track(promiseOrFn, title = 'Đang xử lý dữ liệu máy chủ…', subtitle = 'Vui lòng chờ trong giây lát, hệ thống đang đồng bộ…', minDurationMs = 320) {
    this.show(title, subtitle);
    try {
      const target = typeof promiseOrFn === 'function' ? promiseOrFn() : promiseOrFn;
      return await Promise.resolve(target);
    } finally {
      this.hide(minDurationMs);
    }
  }
};

window.SystemLoader = SystemLoader;

