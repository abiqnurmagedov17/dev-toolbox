/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        krem: {
          50: '#fcf6ed',
          100: '#f5ede0',
          200: '#eaddca',
          300: '#dac8b4',
          400: '#c9b09a',
          500: '#b0957a',
          600: '#967a60',
          700: '#7d644b',
          800: '#5f4a36',
          900: '#3d2e1e',
        }
      }
    },
  },
  plugins: [],
}