<template>
  <h2 class="pt-3 text-gray-400 font-thin text-base">藥局 / 基本資料設定</h2>
  <div
    v-for="(item, i) in titles"
    :key="item"
    class="cursor-pointer py-3 flex space-x-3 pl-2"
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
// import DrugAdd from "/@/views/pharmacy/drugAddNew.vue";

export default {
  name: "sidebar",
  components: {
    // DrugAdd,
  },
  setup() {
    //allVariable
    const activeTab = ref(0);
    const router = useRouter();
    const titles = reactive(["藥品資料維護", "新增藥品資料", "藥品廠商維護", "新增藥品廠商", "藥房資料維護", "新增藥房資料"]);
    const icons = reactive(["el-icon-edit", "el-icon-circle-plus", "el-icon-s-tools", "el-icon-folder-add", "el-icon-pie-chart", "el-icon-plus"]);
    //option

    //global

    //function
    const handleChangeTab = (item, i) => {
      activeTab.value = i;
      switch (item) {
        case "藥品資料維護":
          router.push("/pharmacy/drugmanagement");
          break;
        case "新增藥品資料":
          router.push("/pharmacy/drugadd");
          break;
        case "藥品廠商維護":
          router.push("/pharmacy/drugvendormanagement");
          break;
        case "新增藥品廠商":
          router.push("/pharmacy/drugaddmaker");
          break;
        case "藥房資料維護":
          router.push("/pharmacy/drugstoremanagement");
          break;
        case "新增藥房資料":
          router.push("/pharmacy/drugaddstore");
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
