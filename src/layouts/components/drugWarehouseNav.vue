<template>
  <h2 class="pt-3 text-gray-400 font-thin text-base">藥局 / 藥庫管理</h2>
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
import { ref, reactive, inject, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// import DrugAdd from "/@/views/pharmacy/drugAddNew.vue";

export default {
  name: 'sidebar1029',
  components: {
    // DrugAdd,
  },
  setup() {
    const activeTab = ref(0);
    const router = useRouter();
    const titles = reactive(['庫存查詢作業', '採購單管理', '新增採購單', '藥品申領管理', '新增藥品申領單', '入庫單管理', '藥房退庫管理']);
    const icons = reactive([
      'el-icon-zoom-in',
      'el-icon-s-order',
      'el-icon-folder-add',
      'el-icon-document-copy',
      'el-icon-plus',
      'el-icon-pie-chart',
      'el-icon-c-scale-to-original',
    ]);
    const global = inject('global');
    global.pharmacyTab$.subscribe((v) => (activeTab.value = v));
    router.push('/pharmacy/drugwarehouseinquire');
    const handleChangeTab = (item, i) => {
      activeTab.value = i;
      switch (item) {
        case '庫存查詢作業':
          router.push('/pharmacy/drugwarehouseinquire');
          break;
        case '採購單管理':
          router.push('/pharmacy/drugwarehouseporder');
          break;
        case '新增採購單':
          router.push('/pharmacy/drugwarehouseporderadd');
          break;
        case '入庫單管理':
          router.push('/pharmacy/drugwarehousing');
          break;
        case '藥品申領管理':
          router.push('/pharmacy/drugwarehouserequest');
          break;
        case '新增藥品申領單':
          router.push('/pharmacy/drugwarehouserequestadd');
          break;
        case '藥房退庫管理':
          router.push('/pharmacy/drugwarehousewithdrawal');
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
