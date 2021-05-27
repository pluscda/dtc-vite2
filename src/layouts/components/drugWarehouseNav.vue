<template>
  <h2 class="pt-3 text-base font-thin text-gray-400">藥局 / 藥庫管理</h2>
  <div
    v-for="(item, i) in titles"
    :key="item"
    class="flex py-3 pl-2 space-x-2 cursor-pointer"
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
  name: "sidebar1029modifyDrgWatermark",
  components: {},
  setup() {
    const activeTab = ref(0);
    const router = useRouter();
    const titles = reactive([
      "庫存查詢作業",
      "庫存安全管制",
      "採購單管理",
      "新增採購單",
      "入庫單管理",
      "藥庫盤點管理",
      "藥品申領管理",
      "藥房退庫管理",
    ]);
    const icons = reactive([
      "el-icon-zoom-in",
      "el-icon-help",
      "el-icon-s-order",
      "el-icon-folder-add",
      "el-icon-document-copy",
      "el-icon-s-grid",
      "el-icon-pie-chart",
      "el-icon-c-scale-to-original",
      "el-icon-s-grid",
    ]);
    const global = inject("global");
    pharmacyTab$.subscribe((v) => (activeTab.value = v));
    const handleChangeTab = (item, i) => {
      activeTab.value = i;
      switch (item) {
        case "庫存查詢作業":
          router.push("/pharmacy/drugwarehouseinquire");
          break;
        case "庫存安全管制":
          router.push("/pharmacy/modifyDrgWatermark");
          break;
        case "採購單管理":
          router.push("/pharmacy/drugwarehouseporder");
          break;
        case "新增採購單":
          router.push("/pharmacy/drugwarehouseporderadd");
          break;
        case "入庫單管理":
          router.push("/pharmacy/drugwarehousing");
          break;
        case "藥庫盤點管理":
          router.push("/pharmacy/drugwarehouseinventory");
          break;
        case "藥品申領管理":
          router.push("/pharmacy/drugwarehouserequest");
          break;
        case "新增藥品申領單":
          router.push("/pharmacy/drugwarehouserequestadd");
          break;
        case "藥房退庫管理":
          router.push("/pharmacy/drugwarehousewithdrawal");
          break;
        case "藥房退庫單申請":
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
