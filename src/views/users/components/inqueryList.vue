<template>
  <div></div>
</template>

<script>
import DtxInputGroup from "cps/DtxInputGroup.vue";
//查閱清單
let headers = [
  { name: "掛號日期", key: "id", sortDesc: null },
  { name: "看診時段", key: "name", sortDesc: null },
  { name: "診間號碼", key: "name", sortDesc: null },
  { name: "診間名稱", key: "age", sortDesc: null },
  { name: "診間別名", key: "age", sortDesc: null },
  { name: "科別", key: "age", sortDesc: null },
  { name: "醫師代號", key: "age", sortDesc: null },
  { name: "醫師姓名", key: "age", sortDesc: null },
  { name: "掛號人數", key: "age", sortDesc: null },
  { name: "已看診數", key: "age", sortDesc: null },
  { name: "待看診數", key: "age", sortDesc: null },
];

export default {
  name: "payhis",
  components: { DtxInputGroup },
  data() {
    return {
      input1: "J120092876",
      options: [
        {
          value: "選項1",
          label: "牙科就診",
        },

        {
          value: "選項3",
          label: "身心障礙",
        },
        {
          value: "選項4",
          label: "發展遲緩兒童",
        },
        {
          value: "選項5",
          label: "失能老人",
        },
      ],
      value: "",
    };
  },
};
</script>

<style scoped>
.btn-container {
  text-align: left;
  padding: 0px 10px 20px 0px;
}
</style>

<style lang="scss" scoped>
.dtc-template-columns {
  grid-template-columns: 180px repeat(2, 160px) 1fr;
}

.dtc-autoflow-grid {
  grid-template-columns: repeat(auto-fill, minmax(120px, 200px));
  @apply bg-info;
}
.dtc-page-header-grid {
  grid-template-columns: max-content 1rem max-content max-content;
  overflow: hidden;
  @apply bg-info;
}
</style>
