/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FBF6E9',
          100: '#F7EFD3',
          200: '#EFDF9F',
          300: '#E7CF6B',
          400: '#DFBF37',
          500: '#D4AF37',
          600: '#A88B2C',
          700: '#7D6721',
          800: '#524316',
          900: '#27200B',
        },
        charcoal: {
          50: '#F6F6F7',
          100: '#E2E2E5',
          200: '#C4C4CA',
          300: '#9A9AA3',
          400: '#6E6E78',
          500: '#4A4A52',
          600: '#36363C',
          700: '#25252A',
          800: '#161618',
          900: '#0A0A0B',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', '"Playfair Display"', 'Georgia', 'serif'],
        cormorant: ['var(--font-cormorant)', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['var(--font-jost)', '"Jost"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.2em',
        ultra: '0.35em',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fade-down': 'fadeDown 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'shimmer': 'shimmer 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(30px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fadeDown: { '0%': { opacity: '0', transform: 'translateY(-30px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        scaleIn: { '0%': { opacity: '0', transform: 'scale(0.95)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        shimmer: { '0%': { backgroundPosition: '-200% center' }, '100%': { backgroundPosition: '200% center' } },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
      },
    },
  },
  plugins: [],
};
