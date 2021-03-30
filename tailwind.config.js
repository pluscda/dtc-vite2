const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primay:"#1f7cd3",
      info:"#0f579b",
      ...colors,
    },
    extend: {
     
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
