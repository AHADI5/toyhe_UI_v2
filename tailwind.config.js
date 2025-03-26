/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1c75bc',
        'primary-dark': '#2b3990',
        'input-gray': '#f5f5ff',
      },
      fontFamily: {
        gothic: ['"League Gothic"', 'Roboto', 'Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

