/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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
