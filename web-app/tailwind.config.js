/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: { 
      height: {
        '460': '460px', 
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        roboto: ['Roboto', 'sans-serif'],
        roboto_bold: ['Roboto', 'sans-serif', 'bold'],
        poppins: ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

