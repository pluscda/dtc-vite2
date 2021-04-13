<template>
  <section class="overflow-x-hidden index-position">
    <main class="grid overflow-x-hidden overflow-y-hidden my-main-part">
      <aside class="flex flex-col space-y-6 text-white pt-8 left-nav">
        <component :is="dtcCmp"></component>
      </aside>
      <router-view></router-view>
    </main>
    <el-backtop target=".index-position" :visibility-height="100" style="color: rgb(58 142 229)">
      <i-mdi:arrow-up style="font-size: 24px"></i-mdi:arrow-up>
    </el-backtop>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { watch, ref } from "vue";
import NavBar from "/@/layouts/components/Navbar.vue";
import basicNav from "./components/basicDrugNav.vue";
import wsNav from "./components/drugWarehouseNav.vue";
import storeNav from "./components/drugStoreNav.vue";
import addDrag from "/@/views/pharmacy/drugAdd.vue";
const dtcCmp = ref(basicNav);
const r = useRoute();
watch(r, () => {
  if (r.path.includes("drugmanagement") || r.path.includes("pharmacy/drugadd") || r.path.includes("pharmacy/drugvendormanagement")) {
    dtcCmp.value = basicNav;
  } else if (r.path.includes("drugWarehouse")) {
    dtcCmp.value = wsNav;
  } else {
    dtcCmp.value = storeNav;
  }
});
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
