<template>
  <section style="background: #4b5563; grid-column: 1/-1" class="dtc-door-way-section grid">
    <header class="flex gap-4 dtc-text pl-1 dtc-tabs" style="grid-column: 1/-1">
      <div>用藥</div>
      <div>套組</div>
      <div>設為套組</div>
    </header>

    <InqueryList></InqueryList>
  </section>
</template>

<script>
import InqueryList from "/@/views/users/components/inqueryList.vue";
let headers = [
  { name: "藥品名稱", key: "registerTimestamp", sortDesc: null },
  { name: "藥品類型", key: "registerSection", sortDesc: null },
  { name: "給藥方式", key: "registerNo", sortDesc: null },
  { name: "煎藥方式", key: "registerName", sortDesc: null },
  { name: "單一用量", key: "registerAlias", sortDesc: null },
  { name: "單位名稱", key: "category", sortDesc: null },
  { name: "頻率代碼", key: "doctorNo", sortDesc: null },
  { name: "頻率名稱", key: "doctorName", sortDesc: null },
  { name: "天數", key: "totalRegisterNum", sortDesc: null },
  { name: "總量", key: "totalCheckedNum", sortDesc: null },
  { name: "待看診數", key: "totalWaitNum", sortDesc: null },
];
export default {
  data() {
    return {};
  },
  components: {
    InqueryList,
  },
};
</script>

<style lang="scss" scoped>
.dtc-tabs::after {
  all: unset;
}
</style>
