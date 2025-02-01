/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors:{
        background: '#f7f7f7',
        primaryLight:'#ff8f00',
        primary: '#0cab51',
        accent: '#0e79a3',
        accentDark: '#094e69',
        mutedText: '#c0c0c0',
        textDefault: '#010101',
        textPrimary:'#ff8f00',
        textAccent:'880e4f'
      }
    },
  },
  plugins: [],
}

