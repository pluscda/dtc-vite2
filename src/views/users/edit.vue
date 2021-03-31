<template>
  <div>
    <header class="dtc-page-header grid dtc-page-header__grid pr-2">
      <div>病患基本資料 / 就醫身份</div>
      <div class="ml-4">
        <van-switch v-model="takeCard" size="small" class="ml-2 h-9 mt-3" />
        <span class="ml-2 inline-block transform -translate-y-0.5 text-base text-white-600" @click="takeCard = !takeCard">初診</span>
      </div>
      <div class="ml-2">
        <van-switch v-model="takeCard2" size="small" class="ml-2 h-9 mt-3" />
        <span class="ml-2 inline-block transform -translate-y-0.5 text-base text-white-600" @click="takeCard = !takeCard">複診</span>
      </div>
      <div class="ml-6 -mt-1.5">
        <van-button type="success" icon="arrow-left" round size="small" @click="$router.replace('/users')">返回門急診掛號</van-button>
      </div>
      <div></div>
      <div class="-mt-1"><van-button type="success" round size="small">補卡取號</van-button></div>
      <div class="-mt-1"><van-button type="default" round size="small">讀取健保卡</van-button></div>
      <div class="-mt-1"><van-button type="warning" round size="small">清除/重整</van-button></div>
      <div class="-mt-1"><van-button type="primary" round size="small">確認掛號</van-button></div>
    </header>
    <nav class="flex flex-none cursor-pointer dtc-tabs space-x-0.5 m-3">
      <div @click="activeTab = 0" :class="!activeTab ? 'active' : ''">初診單</div>
      <div @click="activeTab = 1" :class="1 == activeTab ? 'active' : ''">基本資料</div>
      <div @click="activeTab = 2" :class="2 == activeTab ? 'active' : ''">疾病史</div>
    </nav>

    <component :is="cps" class="mx-4 pt-2"></component>
  </div>
</template>

<script>
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
    };
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
