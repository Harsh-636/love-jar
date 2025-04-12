/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          poppins: ['Poppins', 'sans-serif'],
          pacifico: ['Pacifico', 'cursive'],
        },
        colors: {
          'love-peach': '#FFE4E1',
          'love-lavender': '#E6E6FA',
          'love-pink': '#FFC0CB',
          'love-blue': '#B0E0E6',
        },
        animation: {
          'float': 'float 3s ease-in-out infinite',
          'float-delayed': 'float 3s ease-in-out infinite 1.5s',
        },
        keyframes: {
          float: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' },
          }
        },
        scale: {
          '102': '1.02',
        },
        transformStyle: {
          '3d': 'preserve-3d',
        },
        perspective: {
          '1000': '1000px',
        },
      },
    },
    plugins: [],
  } 