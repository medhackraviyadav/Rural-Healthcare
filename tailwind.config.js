/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#1A936F',
        'brand-secondary': '#114B5F',
        'brand-accent': '#F3A712',
        'brand-light': '#F7F9F9',
        'brand-dark': '#071A21',
        'brand-text': '#333333',
      },
      fontFamily: {
        sans: ['"Poppins"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
