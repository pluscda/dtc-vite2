<template>
  <h2 class="pt-3 text-gray-400 font-thin text-base">藥局 / 基本資料設定</h2>
  <div
    v-for="(item, i) in titles"
    :key="item"
    class="cursor-pointer py-3"
    :class="activeTab == i ? 'active-tab' : ''"
    @click="handleChangeTab(item, i)"
  >
    {{ item }}
  </div>
  <!-- <DrugAdd /> -->
</template>

<script>
import { ref, reactive, inject, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
// import DrugAdd from "/@/views/pharmacy/drugAddNew.vue";

export default {
  name: "sidebar",
  components: {
    // DrugAdd,
  },
  setup() {
    ///allVariable
    const activeTab = ref(0);
    const router = useRouter();
    const titles = reactive([
      "藥房庫存查詢作業",
      "藥品申請單維護",
      "藥房退庫單",
    ]);
    //option

    //global

    //function
    const handleChangeTab = (item, i) => {
      activeTab.value = i;
      switch (item) {
        case "藥房庫存查詢作業":
          router.push("/pharmacy/drugstoreinstock");
          break;
        case "藥品申請單維護":
          router.push("/pharmacy/drugstoreclaim");
          break;
        case "藥房退庫單":
          // router.push("/pharmacy/drugvendormanagement");
          break;
      }
    };

    return {
      titles,
      handleChangeTab,
      activeTab,
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
