/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pop: 'Poppins, sans-serif',
        noto: 'Noto Sans, sans-serif'
      },
      colors: {
        mblue: '#2F80ED'
      }
    },
  },
  plugins: [],
}

