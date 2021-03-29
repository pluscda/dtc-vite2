import path from "path";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { viteMockServe } from "vite-plugin-mock";
import ViteIcons, { ViteIconsResolver } from 'vite-plugin-icons'
import Components from 'vite-plugin-components'
// 导入插件
import vueI18n from '@intlify/vite-plugin-vue-i18n'
const server =  {
    proxy: {
      // string shorthand
      '/foo': 'http://localhost:4567/foo',
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
    },
  },
  build:{
    assetsDir: "./"
  },
  plugins: [
    vue(), 
    vueJsx(),
    Components({
      customComponentResolvers: ViteIconsResolver(),//https://icones.js.org/collection/uim
    }),
    ViteIcons(),
    viteMockServe({ supportTs: false,localEnabled: (process.env.NODE_ENV === 'development' ? true: false)}), 
    vueI18n({
    include: path.resolve(__dirname, './src/locales/**')
  })],
};
