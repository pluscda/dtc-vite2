<template>
  <section class="dtc-text text-xl">set5</section>
</template>

<script>
import { useList } from "/@/hooks/useHis.js";
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
  components: {},
};
</script>

<style lang="scss" scoped>
.dtc-tabs::after {
  all: unset;
}
</style>
