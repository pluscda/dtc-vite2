import { createApp } from "vue";
import App from "./App.vue";
import "styles/index.scss";
import element3 from "plugins/element3";
import router from "/@/router";
import Particles from "particles.vue3";
import DtxInputGroup from "cps/DtxInputGroup.vue";
import Vant from 'vant';
import 'vant/lib/index.css';

import { Locale } from 'vant';
import zhTw from 'vant/es/locale/lang/zh-TW';
Locale.use('zh-TW', zhTw);

import PrimeVue from 'primevue/config';
import Calendar from 'primevue/calendar';
import Button from "primevue/button";
import InputSwitch from 'primevue/inputswitch';

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';   


const app = createApp(App);
app.use(element3).use(Particles).use(router).use(Vant).use(PrimeVue);
app.component('Calendar', Calendar );
app.component("Button", Button);
app.component("InputSwitch", InputSwitch);
app.component('DtxInputGroup',DtxInputGroup)
app.mount("#app");




// i18n; not use it now
// import { createI18n } from "vue-i18n";
// import messages from "@intlify/vite-plugin-vue-i18n/messages";
// const i18n = createI18n({
//   legacy: false,
//   locale: "en",
//   messages,
// });
