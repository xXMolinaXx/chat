/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'regal-blue': '#69696980',
      },
      minHeight: {
        'min-w-20rem': '20 rem',
      }
    },
  },
  plugins: [],
}
