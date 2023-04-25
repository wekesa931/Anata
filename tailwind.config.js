const scribeTheme = require('./src/styles/theme.js')

/** @type {import('tailwindcss').Config} */
module.exports = {
  jit: true,
  important: true,
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: scribeTheme,
  plugins: [],
}
