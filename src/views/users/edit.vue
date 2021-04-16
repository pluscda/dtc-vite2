<template>
  <div>
    <header class="dtc-page-header grid dtc-page-header__grid pr-2">
      <div>病患基本資料 / 就醫身份</div>
      <div class="ml-4 flex items-center">
        <InputSwitch v-model="takeCard" class="mt-0"></InputSwitch>
        <span @click="takeCard = !takeCard">初診</span>
      </div>
      <div class="ml-2 flex items-center">
        <InputSwitch v-model="takeCard2" class="mt-0"></InputSwitch>
        <span @click="takeCard = !takeCard2">複診</span>
      </div>

      <Button style="margin: 4px 0" class="p-button-rounded p-button-help" @click="$router.replace('/users')">返回門急診掛號</Button>
      <div></div>
      <Button class="p-button-rounded" style="margin: 4px 0">補卡取號</Button>
      <Button class="p-button-rounded p-button-success" style="margin: 4px 0">讀取健保卡</Button>
      <Button class="p-button-rounded p-button-info" style="margin: 4px 0">清除/重整</Button>
      <Button class="p-button-rounded p-button-warning" style="margin: 4px 0">確認掛號</Button>
    </header>
    <Button @click="printImg('dtc-form')" style="display: none" note="demo has to print img">Print</Button>
    <nav class="m-3 dtc-tabs">
      <div @click="activeTab = 0" :class="!activeTab ? 'active' : ''">初診單</div>
      <div @click="activeTab = 1" :class="1 == activeTab ? 'active' : ''">基本資料</div>
      <div @click="activeTab = 2" :class="2 == activeTab ? 'active' : ''">疾病史</div>
    </nav>

    <component id="dtc-form" :is="cps" class="mx-4 pt-2"></component>
  </div>
</template>

<script>
import domtoimage from "dom-to-image";
import FirstVisit from "./components/firstVisit.vue";
import BasicInfo from "./components/basicInfo.vue";
import SickHistory from "./components/sickHistory.vue";
//初診單基本資料疾病史
let headers = [
  { name: "ID", key: "id", sortDesc: null },
  { name: "建立者", key: "name", sortDesc: null },
  { name: "年齡", key: "age", sortDesc: null },
];

const CPS = [FirstVisit, BasicInfo, SickHistory];
export default {
  name: "editUser",
  components: {
    FirstVisit,
    BasicInfo,
    SickHistory,
  },
  data() {
    return {
      cps: FirstVisit,
      activeTab: 0,
      takeCard: true,
    };
  },
  methods: {
    async printImg(id) {
      const el = document.getElementById(id);
      const dataUrl = await domtoimage.toPng(el);
      const img = new Image();
      img.src = dataUrl;
      document.body.appendChild(img);
    },
  },
  watch: {
    activeTab(v) {
      this.cps = CPS[v];
    },
  },
};
</script>

<style lang="scss" scoped>
.nav__grid {
  width: calc(120px * 3 + 2px);
  grid-template-columns: repeat(3, 120px);
  > div {
    border-right: 1px solid white;
    @apply rounded-lg;
  }
  > div:last-child {
    border: none;
  }
}
.dtc-template-columns {
  grid-template-columns: 180px repeat(2, 160px) 1fr;
}

.dtc-autoflow-grid {
  grid-template-columns: repeat(auto-fill, minmax(120px, 200px));
}
.dtc-page-header__grid {
  grid-template-columns: max-content max-content max-content max-content 1fr repeat(4, max-content);
  gap: 1rem;
}
</style>
