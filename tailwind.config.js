
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{css}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B35',
          dark: '#E85D2E',
          light: '#FF8C69',
        },
        coral: '#FF8C69',
        peach: {
          DEFAULT: '#FF9F80',
          light: '#FFC0B3',
        },
        pink: {
          DEFAULT: '#FFB8C5',
          light: '#FFD1DA',
        },
        beige: {
          DEFAULT: '#E8DED5',
          light: '#F9F9F9',
        },
        neutral: {
          50: '#FAFAFA',
          100: '#F9F9F9',
          200: '#E5E5E5',
          300: '#D3D3D3',
          400: '#999999',
          500: '#757575',
          600: '#666666',
          700: '#2B2B2B',
          800: '#1A1A1A',
          900: '#2F3640',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['56px', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['40px', { lineHeight: '1.3', fontWeight: '700' }],
        'h3': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '20px',
        '4xl': '24px',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0,0,0,0.08)',
        'card-hover': '0 4px 16px rgba(0,0,0,0.12)',
        'elevated': '0 8px 24px rgba(0,0,0,0.15)',
      },
    },
  },
  plugins: [],
}