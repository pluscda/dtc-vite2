import { createApp } from "vue";
import App from "./App.vue";
import "styles/index.scss";
import element3 from "plugins/element3";
import router from "/@/router";
import Particles from "particles.vue3";
import DtxInputGroup from "cps/DtxInputGroup.vue";
import Vant from 'vant';
import 'vant/lib/index.css';

createApp(App).use(element3).use(Particles).use(router).use(Vant).use(DtxInputGroup).mount("#app");



// i18n; not use it now
// import { createI18n } from "vue-i18n";
// import messages from "@intlify/vite-plugin-vue-i18n/messages";
// const i18n = createI18n({
//   legacy: false,
//   locale: "en",
//   messages,
// });
