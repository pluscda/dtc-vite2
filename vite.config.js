//https://vitejs.dev/guide/env-and-mode.html#modes

import path from "path";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import ViteIcons, { ViteIconsResolver } from 'vite-plugin-icons'
import Components from 'vite-plugin-components'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
//import replaceHtmlVars from 'rollup-plugin-replace-html-vars'
import dayjs from "dayjs"

const buildTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
// need to be included for server proxy if server did not support cros
const server =  {
    proxy: {
      // string shorthand
      '/ymhis': 'http://192.168.22.4/ymhis/rest',
      // with options
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      // with RegEx
      '^/fallback/.*': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fallback/, '')
      }
    }
}
export default {
  // server : {
  //   proxy: {
  //     // string shorthand
  //     'ymhis': 'http://192.168.22.4/ymhis/rest',
  //   },
  // },
  resolve: {
    alias: {
      "/@": path.resolve(__dirname, "src"),
      cps: path.resolve(__dirname, "src/components"),
      styles: path.resolve(__dirname, "src/styles"),
      plugins: path.resolve(__dirname, "src/plugins"),
      views: path.resolve(__dirname, "src/views"),
      layouts: path.resolve(__dirname, "src/layouts"),
      utils: path.resolve(__dirname, "src/utils"),
      apis: path.resolve(__dirname, "src/apis"),
      dirs: path.resolve(__dirname, "src/directives"),
      hooks: path.resolve(__dirname, "src/hooks"),
    },
  },
  // server:{
  //   proxy: {
  //       // string shorthand
  //       '/ymhis': 'http://192.168.22.4/ymhis/rest',
  //   }
  // },
  build:{
    assetsDir: "./" ,// at publish root folder, when running prod mode
    chunkSizeWarningLimit: 1024 * 1024 * 50,
  },
  plugins: [
    vue(), 
    vueJsx(),
    Components({
      customComponentResolvers: ViteIconsResolver(),//https://icones.js.org/collection/uim
    }),
    ViteIcons(),
    // replaceHtmlVars({
    //     files: process.env.NODE_ENV === 'production' ? path.resolve(__dirname, './index.html') : '',
    //     from: '_THIS_IS_THE_VARIABLE_',
    //     to: `${buildTime}`,
    // }),
    vueI18n({
      include: path.resolve(__dirname, './src/locales/**')
  })],
};
