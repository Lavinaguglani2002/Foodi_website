/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust the path if necessary
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
}
