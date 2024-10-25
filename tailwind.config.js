/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customPurple: '#652d96',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      dropShadow: {
        '3xl': '0 35px 35px rgba(245,206,206,0.75)',
      },
      keyframes: {
        fold: {
          '0%': {
            backgroundColor: 'red',
            transform: 'rotateX(0deg)',
          },
          '25%': {
            backgroundColor: 'yellow',
            transform: 'rotateX(180deg)',
          },
          '50%': {
            backgroundColor: 'green',
            transform: 'rotateX(360deg)',
          },
          '75%': {
            backgroundColor: 'blue',
            transform: 'rotateX(540deg)',
          },
          '100%': {
            backgroundColor: 'red',
            transform: 'rotateX(720deg)',
          },
        },
      },
      animation: {
        fold: 'fold 4s infinite',
      },
    },
  },
  plugins: [],
}
