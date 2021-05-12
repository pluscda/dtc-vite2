<template>
  <h2 class="pt-3 text-gray-400 font-thin text-base">藥局 / 藥房管理</h2>
  <div
    v-for="(item, i) in titles"
    :key="item"
    class="cursor-pointer py-3 flex space-x-2 pl-2"
    :class="activeTab == i ? 'active-tab' : ''"
    @click="handleChangeTab(item, i)"
  >
    <i :class="icons[i]" class="inline-block mt-0.5"></i>
    <p class="text-left">{{ item }}</p>
  </div>
  <!-- <DrugAdd /> -->
</template>

<script>
import { ref, reactive, inject, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { pharmacyTab$ } from "/@/store";
export default {
  name: "sidebar22",
  components: {
    // DrugAdd,
  },
  setup() {
    const activeTab = ref(0);
    const router = useRouter();
    const titles = reactive([
      "藥房庫存查詢",
      "庫存安全管制",
      "藥品申請單維護",
      "新增藥品申領單",
      "藥房退庫單維護",
      "新增藥房退庫單",
    ]);
    const icons = reactive([
      "el-icon-zoom-in",
      "el-icon-help",
      "el-icon-s-tools",
      "el-icon-folder-add",
      "el-icon-s-grid",
      "el-icon-c-scale-to-original",
    ]);
    const global = inject("global");
    pharmacyTab$.subscribe((v) => (activeTab.value = v));
    const handleChangeTab = (item, i) => {
      activeTab.value = i;
      switch (item) {
        case "藥房庫存查詢":
          router.push("/pharmacy/drugstoreinstock");
          break;
        case "庫存安全管制":
          router.push("/pharmacy/modifydrgstorewatermark");
          break;
        case "藥品申請單維護":
          router.push("/pharmacy/drugstoreclaim");
          break;
        case "新增藥品申領單":
          router.push("/pharmacy/drugstoreclaimadd");
          break;
        case "藥房退庫單維護":
          router.push("/pharmacy/drugstorewithdrawal");
          break;
        case "新增藥房退庫單":
          router.push("/pharmacy/drgWarehouseOut");
          break;
      }
    };

    return {
      titles,
      handleChangeTab,
      activeTab,
      icons,
    };
  },
};
</script>

<style scoped>
.active-tab {
  background: var(--gray);
  color: var(--light);
}
</style>
