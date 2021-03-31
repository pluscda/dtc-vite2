<template>
  <div class="pl-1">
    <header class="dtc-page-header dtc-page-header-grid grid text-white py-1 relative">
      <div class="transform -translate-y-1">掛號作業</div>

      <van-tabs v-model:active="active" type="card" class="mt-2 z-50">
        <van-tab title="标签 1">内容 1</van-tab>
        <van-tab title="标签 2">内容 2</van-tab>
      </van-tabs>
      <footer class="absolute inset-0 justify-end flex items-center space-x-1 mr-2">
        <button class="dtc-warning-btn__xs relative"><i-eva:search-fill class="absolute left-1 top:1"></i-eva:search-fill>&nbsp; 進行查詢</button>
        <button class="dtc-danger-btn__xs"><i-fluent:eraser-20-regular class="absolute left-1 top:1"></i-fluent:eraser-20-regular>&nbsp;&nbsp;清除查詢</button>
      </footer>
    </header>
    <main class="grid gap-1 grid-cols-2">
      <DtxInputGroup prepend="掛號日期">
        <el-input placeholder="搜尋身份證字號" v-model="input1" readonly class="bg-gray-300" />
      </DtxInputGroup>
      <DtxInputGroup prepend="看診科別">
        <el-select v-model="value" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="項次科別">
        <el-select v-model="value" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="看診醫師">
        <el-select v-model="value" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="看診時段">
        <el-select v-model="value" placeholder="請選擇" class="border-l-0">
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
  grid-template-columns: max-content 240px max-content;
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
