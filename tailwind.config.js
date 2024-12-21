/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand': {
          100: '#FFF5E9',
          200: '#FFE0B2',
          300: '#FFB74D',
          400: '#FF9800',
          500: '#F57C00',
        },
        'accent': {
          100: '#F3E5F5',
          200: '#CE93D8',
          300: '#AB47BC',
          400: '#8E24AA',
        }
      },
      fontFamily: {
        'display': ['var(--font-playfair-display)'],
        'body': ['var(--font-poppins)'],
      }
    },
  },
  plugins: [],
} 