import { createApp } from "vue";
import App from "./App.vue";

// 全局 CSS
import "styles/index.scss";
// element3
import element3 from "plugins/element3";
// router
import router from "/@/router";
// store
import store from "/@/store";
//partical js
import Particles from "particles.vue3";

// i18n; not use it now
import { createI18n } from "vue-i18n";
import messages from "@intlify/vite-plugin-vue-i18n/messages";
const i18n = createI18n({
  legacy: false,
  locale: "en",
  messages,
});

createApp(App).use(element3).use(Particles).use(router).use(store).mount("#app");
