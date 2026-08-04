/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        emerald: {
          950: '#062017',
          900: '#0b3829',
          800: '#0f4c3a',
          700: '#14634d',
          600: '#1a7f64',
          500: '#22a07e',
          400: '#34d399',
        },
        gold: {
          500: '#D4AF37',
          400: '#F59E0B',
          300: '#FCD34D',
        },
        cream: {
          50: '#FDFBF7',
          100: '#F7F4EC',
          200: '#EFEBE0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
        'glass-hover': '0 12px 40px 0 rgba(0, 0, 0, 0.15)',
        'glow': '0 0 25px rgba(212, 175, 55, 0.3)',
      }
    },
  },
  plugins: [],
}
