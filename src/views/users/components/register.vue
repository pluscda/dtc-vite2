<template>
  <div class="pl-1 pr-1">
    <header class="dtc-page-header dtc-page-header-grid grid text-white relative">
      <div>掛號作業</div>
      <div></div>
      <Button label="進行查詢" icon="pi pi-search" class="p-button-small" style="margin: 4px" />
      <Button label="清除查詢" class="p-button-warning p-button-small" style="margin: 4px" icon="pi pi-undo" />
    </header>
    <main class="grid gap-2 grid-cols-2" style="grid-template-rows: 40px">
      <DtxInputGroup prepend="掛號日期">
        <el-input placeholder="搜尋身份證字號" v-model="input1" readonly class="bg-gray-300" />
      </DtxInputGroup>
      <DtxInputGroup prepend="看診科別">
        <el-select filterable v-model="value" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="項次科別">
        <el-select filterable v-model="value" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="看診醫師">
        <el-select filterable v-model="value" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="看診時段">
        <el-select filterable v-model="value" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="調閱病歷">
        <el-input placeholder="搜尋身份證字號" v-model="input1" readonly class="bg-gray-300" />
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
  name: "regsiter",
  components: {},
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

.dtc-page-header-grid {
  grid-template-columns: max-content 1fr max-content max-content;
  overflow: hidden;
  gap: 1rem;
}
</style>
