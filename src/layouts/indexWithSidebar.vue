<template>
  <section class="overflow-x-hidden index-position">
    <main class="grid overflow-x-hidden overflow-y-hidden my-main-part">
      <aside class="flex flex-col space-y-6 text-white pt-8 left-nav">
        <!-- <component :is="dtcCurrentCmp"></component> -->
        <BasicNav v-if="isBasicTab" />
        <WsNav v-if="isWarehouseTab" />
      </aside>
      <router-view></router-view>
    </main>
    <el-backtop target=".index-position" :visibility-height="100" style="color: rgb(58 142 229)">
      <i-mdi:arrow-up style="font-size: 24px"></i-mdi:arrow-up>
    </el-backtop>
  </section>
</template>

<script>
import { useRoute } from "vue-router";
import { ref, reactive, computed } from "vue";
import BasicNav from "/@/layouts/components/basicDrugNav.vue";
import WsNav from "/@/layouts/components/drugWarehouseNav.vue";
import StoreNav from "./components/drugStoreNav.vue";

export default {
  name: "indexwidthbar",
  components: {
    BasicNav,
    WsNav,
    StoreNav,
  },
  setup() {
    let dtcCurrentCmp = ref("basicNav");
    const tabs = reactive(["basicNav", "wsNav", "storeNav"]);
    const r = useRoute();

    const isBasicTab = computed(() => {
      return (
        r.path.includes("drugmanagement") ||
        r.path.includes("pharmacy/drugadd") ||
        r.path.includes("pharmacy/drugvendormanagement") ||
        r.path.includes("pharmacy/drugstoremanagement")
      );
    });

    const isWarehouseTab = computed(() => {
      return r.path.includes("pharmacy/drugwarehouseinquire");
    });

    return {
      dtcCurrentCmp,
      tabs,
      isBasicTab,
      isWarehouseTab,
    };
  },
};
</script>

<style lang="scss" scoped>
.index-position {
  max-height: calc(100vh - 70px);
}

.left-nav {
  background: darken(#10579b, $amount: 5) !important;
  height: calc(100% - 70px);
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
