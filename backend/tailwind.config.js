/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Catalan flag colors (blood red and gold)
        'catalan': {
          'red': 'oklch(0.5 0.2 25)',
          'red-dark': 'oklch(0.4 0.2 25)',
          'red-light': 'oklch(0.6 0.18 25)',
          'gold': 'oklch(0.85 0.16 85)',
          'gold-dark': 'oklch(0.55 0.14 70)',
          'gold-light': 'oklch(0.92 0.12 90)',
        }
      },
      animation: {
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
