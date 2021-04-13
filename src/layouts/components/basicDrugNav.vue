<template>
  <div
    v-for="(item, i) in titles"
    :key="item"
    class="cursor-pointer"
    :class="activeTab == i ? 'text-orange-400' : ''"
  >
    {{ item }}
  </div>
  <!-- <DrugAdd /> -->
</template>

<script>
import { ref, reactive, inject, computed, onMounted, watch } from "vue";
// import DrugAdd from "/@/views/pharmacy/drugAddNew.vue";

export default {
  name: "sidebar",
  components: {
    // DrugAdd,
  },
  setup() {
    //allVariable
    const titles = reactive([
      "藥品訊息維護",
      "新增藥品資料",
      "藥品廠商維護",
      "藥品訊息維護",
    ]);
    //option

    //global

    //function

    return {
      titles,
    };
  },
};
</script>

<style scoped></style>
