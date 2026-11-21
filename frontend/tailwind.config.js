/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ── Typography scale: moderate, farmer-friendly ──────────────────────
      fontSize: {
        'xs':   ['0.8125rem', { lineHeight: '1.5' }],   // 13px (was 12px)
        'sm':   ['0.9375rem', { lineHeight: '1.6' }],   // 15px (was 14px)
        'base': ['1rem',      { lineHeight: '1.65' }],  // 16px
        'lg':   ['1.125rem',  { lineHeight: '1.6' }],   // 18px
        'xl':   ['1.25rem',   { lineHeight: '1.5' }],   // 20px
        '2xl':  ['1.5rem',    { lineHeight: '1.4' }],   // 24px
        '3xl':  ['1.875rem',  { lineHeight: '1.3' }],   // 30px
        '4xl':  ['2.25rem',   { lineHeight: '1.2' }],   // 36px
      },
      // ── Custom shadows ────────────────────────────────────────────────────
      boxShadow: {
        'subtle':   '0 1px 3px 0 rgba(0,0,0,0.07), 0 1px 2px 0 rgba(0,0,0,0.04)',
        'floating': '0 8px 24px 0 rgba(0,0,0,0.12)',
      },
      colors: {
        forest: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534', // Brand Forest Green #166534
          900: '#14532d',
        },
        leaf: {
          50: '#f7fee7',
          100: '#ecfccb',
          500: '#84cc16',
          600: '#65a30d', // Brand Leaf Green #65A30D
          700: '#4d7c0f',
        },
        agriBg: '#F7FAF5',
        agriDark: '#1F2937',
        km: {
          bg: '#F7FAF5',
          surface: '#FFFFFF',
          card: '#FFFFFF',
          border: '#E5E7EB',
          borderLight: '#F3F4F6',
          deep: '#166534',
          sage: '#65A30D',
          dark: '#1F2937',
          subtext: '#6B7280',
          accent: '#F59E0B',
          muted: '#E5E7EB',
        },
      },
    },
  },
  plugins: [],
}
