import { createApp } from "vue";
import "./constance.js"
import App from "./App.vue";
import axios from "utils/request";
import "styles/index.scss";
import ElementPlus from 'element-plus'
import 'dayjs/locale/zh-tw'
import locale from 'element-plus/lib/locale/lang/zh-tw'
import "element-plus/lib/theme-chalk/index.css";
import router from "/@/router";

import DtxInputGroup from "cps/DtxInputGroup.vue";
import PrimeVue from 'primevue/config';
import Calendar from 'primevue/calendar';
import Button from "primevue/button";
import InputSwitch from 'primevue/inputswitch';
import OverlayPanel from 'primevue/overlaypanel';
import RadioButton from 'primevue/radiobutton';
import ProgressSpinner from 'primevue/progressspinner';


import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';   


const app = createApp(App);


app.use(ElementPlus, { locale }).use(PrimeVue).use(router);
// PrimeVue UI components
app.component('Calendar', Calendar );
app.component("Button", Button);
app.component("InputSwitch", InputSwitch);
app.component('OverlayPanel',OverlayPanel);
app.component('RadioButton',RadioButton );
app.component('ProgressSpinner', ProgressSpinner);
// DTC Custom UI components
app.component('DtxInputGroup',DtxInputGroup);
// Global setting
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
