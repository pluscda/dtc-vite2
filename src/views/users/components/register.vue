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
        <Calendar class="h-10 w-full" v-model="regTime" placeholder="請輸入日期" :showIcon="true" dateFormat="yy-mm-dd" />
      </DtxInputGroup>
      <DtxInputGroup prepend="看診科別">
        <el-select filterable v-model="dept" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in deptt" :key="item.departmentId" :label="item.departmentName" :value="item.departmentId"> </el-option>
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
import dayjs from "dayjs";
import { useRouter } from "vue-router";
let headers = [
  { name: "ID", key: "id", sortDesc: null },
  { name: "建立者", key: "name", sortDesc: null },
  { name: "建立者", key: "name", sortDesc: null },
  { name: "年齡", key: "age", sortDesc: null },
];

export default {
  name: "regsiter",
  components: {},
  inject: ["actions", "global"],
  data() {
    return {
      dept: "",
      deptt: [],
      regTime: dayjs().format("YYYY-MM-DD"),
      input1: "J120092876",
      options: [],
      value: "",
    };
  },
  async mounted() {
    const { entry } = await this.actions.getOptDepartmentByDate(this.regTime + this.global.zeros);
    alert(entry.length);
    this.deptt = entry;
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
