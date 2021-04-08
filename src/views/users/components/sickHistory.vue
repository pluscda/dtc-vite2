<template>
  <div class="pr-1">
    <header class="dtc-page-header dtc-page-header-grid grid text-white">
      <div>應付金額</div>
    </header>
    <main class="grid gap-1 grid-cols-2">
      <DtxInputGroup prepend="掛號費用">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="部分攤額">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="欠卡押金">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="優免金額">
        <el-input placeholder="搜尋檢查狀態" v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="累積應繳">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="預收金額">
        <el-input v-model="input1" />
      </DtxInputGroup>
    </main>
  </div>
</template>

<script>
let headers = [
  { name: "ID", key: "id", sortDesc: null },
  { name: "建立者", key: "name", sortDesc: null },
  { name: "建立者", key: "name", sortDesc: null },
  { name: "年齡", key: "age", sortDesc: null },
];

export default {
  name: "payhis",

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
</style>
