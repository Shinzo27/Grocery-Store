/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    fontFamily: {
      'Dosis': ['Dosis']
    },
    extend: {
      colors:{
        peru: "#cd9452",
        black: "#222",
        white: "#fff",
        lightBlack: "#666",
        lightWhite: "#ccc",
        lightBg: "#f5f5f5"
      },
      container: {
        center: true,
        padding:{
          DEFAULT: '1rem',
          sm: '3rem',
        }
      }
    },
  },
  plugins: [],
}

