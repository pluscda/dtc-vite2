import { createApp } from "vue";
import App from "./App.vue";
import axios from "utils/request";
import "styles/index.scss";
import element3 from "plugins/element3";
import router from "/@/router";
import Particles from "particles.vue3";
import DtxInputGroup from "cps/DtxInputGroup.vue";
import PrimeVue from 'primevue/config';
import Calendar from 'primevue/calendar';
import Button from "primevue/button";
import InputSwitch from 'primevue/inputswitch';
import OverlayPanel from 'primevue/overlaypanel';
import RadioButton from 'primevue/radiobutton';

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';   


const app = createApp(App);

app.use(element3).use(Particles).use(router).use(PrimeVue);
app.component('Calendar', Calendar );
app.component("Button", Button);
app.component("InputSwitch", InputSwitch);
app.component('DtxInputGroup',DtxInputGroup);
app.component('OverlayPanel',OverlayPanel);
app.component('RadioButton',RadioButton );

app.config.globalProperties.axios = axios;
app.provide('axios', app.config.globalProperties.axios);//https://v3.vuejs.org/api/application-config.html#iscustomelement
app.mount("#app");




// i18n; not use it now
// import { createI18n } from "vue-i18n";
// import messages from "@intlify/vite-plugin-vue-i18n/messages";
// const i18n = createI18n({
//   legacy: false,
//   locale: "en",
//   messages,
// });
