/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        gothic: ['"League Gothic"', 'Roboto', 'Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

