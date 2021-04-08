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
      title:"#646b74",
      bsGray:"#6c757d",
      ...colors,
    },
    extend: {
      textColor:{
        skin:{
          base: 'var(--bs-orange)'
        }
      },
      backgroundImage: theme => ({ //bg-light-pattern  , bg-footer-texture, bg-xxxx all start with bg in scss or css files
         'light-pattern': "linear-gradient(180deg, #E2E5FD 0%, #E8EAFF 47%, #C0C7F5 100%)",
         'light-pattern-active': "linear-gradient(180deg, #CED5FF 0%, #ABB8FF 100%)",
         'dark-pattern': 'linear-gradient(rgb(33, 35, 37) 0%, rgb(30, 33, 34) 47%, rgb(45, 48, 50) 100%);',
         'footer-texture': "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(168,15,213,1) 35%, rgba(0,212,255,1) 100%)",
      })
     
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
