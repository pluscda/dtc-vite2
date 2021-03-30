<template>
  <div class="pl-1">
    <header class="dtc-page-header dtc-page-header-grid grid text-white py-1 relative">
      <div class="transform -translate-y-1">掛號作業</div>
      <div></div>
      <el-button type="danger"><i-mdi:check class="inline"></i-mdi:check>現場取號</el-button>
      <el-button type="success">預約掛號</el-button>
      <footer class="absolute inset-0 justify-end flex items-center space-x-2">
        <button class="dtc-warning-btn__xs">進行查詢</button>
        <button class="dtc-danger-btn__xs">清除查詢</button>
      </footer>
    </header>
    <main class="grid gap-1 grid-cols-2">
      <DtxInputGroup prepend="掛號日期">
        <el-input placeholder="搜尋身份證字號" v-model="input1" readonly class="bg-gray-300" />
      </DtxInputGroup>
      <DtxInputGroup prepend="看診科別">
        <el-input placeholder="搜尋身份證字號" v-model="input1" readonly class="bg-gray-300" />
      </DtxInputGroup>
      <DtxInputGroup prepend="項次科別">
        <el-input placeholder="搜尋身份證字號" v-model="input1" readonly class="bg-gray-300" />
      </DtxInputGroup>
      <DtxInputGroup prepend="看診醫師">
        <el-input placeholder="搜尋檢查狀態" v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="看診時段">
        <el-input placeholder="搜尋身份證字號" v-model="input1" readonly class="bg-gray-300" />
      </DtxInputGroup>
      <DtxInputGroup prepend="調閱病歷">
        <el-input placeholder="搜尋身份證字號" v-model="input1" readonly class="bg-gray-300" />
      </DtxInputGroup>
    </main>
  </div>
</template>

<script>
import DtxInputGroup from "cps/DtxInputGroup.vue";

let headers = [
  { name: "ID", key: "id", sortDesc: null },
  { name: "建立者", key: "name", sortDesc: null },
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

<style lang="scss" scoped>
.dtc-template-columns {
  grid-template-columns: 180px repeat(2, 160px) 1fr;
}

.dtc-autoflow-grid {
  grid-template-columns: repeat(auto-fill, minmax(120px, 200px));
}
.dtc-page-header-grid {
  grid-template-columns: max-content 0.2rem max-content max-content;
  overflow: hidden;
  @apply bg-primay;
}
.dtc-page-header {
  button {
    transform: scale(0.9);
    font-size: 16px;
  }
}
</style>
