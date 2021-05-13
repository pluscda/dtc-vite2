const colors = require('tailwindcss/colors')
module.exports = {
  mode: 'jit',
  corePlugins: {
     fontFamily: false,
  },
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
     screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      ...colors,// includes all the tailwind build-in colors here; by default, it only includes part of colors 
    },
    extend: {
      textColor:{
        skin:{
          base: 'var(--bs-orange)'
        }
      },
      lineClamp: {
        7: '7',
        8: '8',
        9: '9',
        10: '10',
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
  plugins: [require('@tailwindcss/line-clamp')],
}
