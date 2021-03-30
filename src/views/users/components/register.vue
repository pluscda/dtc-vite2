<template>
  <div>
    <header class="dtc-page-header dtc-page-header-grid grid text-white py-1">
      <div>掛號作業</div>
      <div></div>
      <el-button type="primary"><i-mdi:check></i-mdi:check>現場取號</el-button>
      <el-button type="success">預約掛號</el-button>
    </header>
  </div>
</template>

<script>
import DtxInputGroup from "cps/DtxInputGroup.vue";

let headers = [
  { name: "ID", key: "id", sortDesc: null },
  { name: "建立者", key: "name", sortDesc: null },
  { name: "年齡", key: "age", sortDesc: null },
];

export default {
  name: "regsiter",
  components: {
    DtxInputGroup,
  },
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
}
.dtc-page-header-grid {
  grid-template-columns: max-content 1rem max-content max-content;
  overflow: hidden;
}
.dtc-page-header {
  button {
    transform: scale(0.9);
    font-size: 16px;
  }
}
</style>
