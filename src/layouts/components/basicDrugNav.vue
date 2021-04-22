<template>
  <h2 class="pt-3 text-gray-400 font-thin text-base">
    <span @click="open('https://xd.adobe.com/view/29fb97b8-9810-491b-b03f-96951dd35f75-7ca8/')">藥</span>
    <span @click="open('https://xd.adobe.com/view/328ab644-faa3-4edd-8357-61fea2a57a5a-67d9/')">局</span>
    / 基本資料設定
  </h2>
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
// import DrugAdd from "/@/views/pharmacy/drugAddNew.vue";

export default {
  name: "sidebar",
  components: {
    // DrugAdd,
  },
  methods: {
    open(url) {
      window.open(url);
    },
  },
  setup() {
    const activeTab = ref(0);
    const router = useRouter();
    const titles = reactive(["藥品資料維護", "新增藥品資料", "藥品廠商維護", "新增藥品廠商", "藥房資料維護", "新增藥房資料"]);
    const icons = reactive(["el-icon-edit", "el-icon-circle-plus-outline", "el-icon-s-tools", "el-icon-folder-add", "el-icon-pie-chart", "el-icon-plus"]);
    router.push("/pharmacy/drugmanagement");
    const global = inject("global");
    global.tabSubject.subscribe((v) => (activeTab.value = v));
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
