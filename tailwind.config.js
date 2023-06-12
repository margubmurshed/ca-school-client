/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ca-primary':'rgb(200, 11, 62)',
        'ca-secondary':'rgb(248, 51, 116)',
        'ca-dark':'rgb(140, 4, 44)'
      }
    },
  },
  plugins: [require("daisyui")],
}

