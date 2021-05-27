<template>
  <h2 class="pt-3 text-base font-thin text-gray-400">
    <span
      @click="
        open(
          'https://xd.adobe.com/view/29fb97b8-9810-491b-b03f-96951dd35f75-7ca8/'
        )
      "
      >藥</span
    >
    <!-- 門診藥局設計圖 -->
    <span
      @click="
        open(
          'https://xd.adobe.com/view/acb6b4a0-7b02-4ff9-9975-48e18266ae47-f9e5/'
        )
      "
      >局</span
    >
    /
    <!-- 醫院藥局設計圖 -->
    <span
      @click="
        open(
          'https://xd.adobe.com/view/4905a95e-4e64-4311-9351-8e8eff2225a6-1c56/'
        )
      "
      >基</span
    >本資料設定
  </h2>
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
import { useRouter } from "vue-router";
import { pharmacyTab$ } from "/@/store";

export default {
  name: "sidebar",
  components: {},
  methods: {
    open(url) {
      window.open(url);
    },
  },
  setup() {
    const activeTab = ref(0);
    const router = useRouter();
    const titles = reactive([
      "藥品資料維護",
      "新增藥品資料",
      "藥品廠商維護",
      "新增藥品廠商",
      "藥房資料維護",
      "新增藥房資料",
    ]);
    const icons = reactive([
      "el-icon-edit",
      "el-icon-circle-plus-outline",
      "el-icon-s-tools",
      "el-icon-folder-add",
      "el-icon-pie-chart",
      "el-icon-plus",
    ]);
    const global = inject("global");
    pharmacyTab$.subscribe((v) => (activeTab.value = v));
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
