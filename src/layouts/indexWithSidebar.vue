<template>
  <section class="overflow-x-hidden index-position">
    <main class="grid overflow-x-hidden overflow-y-hidden my-main-part">
      <aside class="flex flex-col space-y-2 text-white left-nav">
        <component :is="dtcCurrentCmp"></component>
      </aside>
      <transition name="fade"> <router-view></router-view> </transition>
    </main>
    <el-backtop target=".index-position" :visibility-height="100" style="color: rgb(58 142 229)">
      <i-mdi:arrow-up style="font-size: 24px"></i-mdi:arrow-up>
    </el-backtop>
  </section>
</template>

<script>
import BasicNav from "/@/layouts/components/basicDrugNav.vue";
import WsNav from "/@/layouts/components/drugWarehouseNav.vue";
import StoreNav from "./components/drugStoreNav.vue";
import { leftSideBar$ } from "/@/store";

export default {
  name: "indexwidthbar2",
  data() {
    return {
      dtcCurrentCmp: "",
    };
  },
  components: {
    BasicNav,
    WsNav,
    StoreNav,
  },
  mounted() {
    leftSideBar$.subscribe((v) => {
      if (v == 1) {
        this.dtcCurrentCmp = BasicNav;
      } else if (v == 2) {
        this.dtcCurrentCmp = WsNav;
      } else if (v == 3) {
        this.dtcCurrentCmp = StoreNav;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.index-position {
  max-height: calc(100vh - 70px);
}

.left-nav {
  background: darken(#10579b, $amount: 5) !important;
  min-height: calc(100vh - 70px);
  color: lighten(#10579b, $amount: 55) !important;
  div {
    padding: 4px;
  }
}

.my-main-part {
  grid-template-columns: 150px 1fr;
}
</style>
