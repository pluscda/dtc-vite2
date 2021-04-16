<template>
  <div>
    <header class="dtc-page-header dtc-page-header-grid grid text-white">
      <div>新增採購單</div>
      <Button label="再次新增採購單" style="margin: 4px 0" @click="reset" v-show="showAddNew" class="p-button-rounded p-button-info" />
    </header>
    <main class="grid dtc-list-grid">
      <DtxInputGroup prepend="採購日期" labelWidth="120">
        <Calendar class="h-10 w-full" v-model="his.orderDate" placeholder="輸入採購日期" :showIcon="true" dateFormat="yy-mm-dd" />
      </DtxInputGroup>
      <DtxInputGroup prepend="採購單號" labelWidth="120">
        <el-input v-model="his.orderId" placeholder="輸入採購單號" />
      </DtxInputGroup>
      <DtxInputGroup prepend="申請人員" labelWidth="120">
        <el-input v-model="his.orderPerson" placeholder="輸入申請人員" />
      </DtxInputGroup>
      <DtxInputGroup prepend="藥品編號" labelWidth="120">
        <!-- <el-select v-model="his.drugId" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in yesNoOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select> -->
        <el-input v-model="his.drugId" placeholder="輸入申請人員" />
      </DtxInputGroup>
      <DtxInputGroup prepend="藥品名稱" labelWidth="120">
        <el-input v-model="his.drugName" placeholder="輸入藥品名稱" />
      </DtxInputGroup>

      <DtxInputGroup prepend="單位" labelWidth="120">
        <el-input v-model="his.drugUnit" placeholder="輸入單位" />
      </DtxInputGroup>
      <DtxInputGroup prepend="申請數量" labelWidth="120">
        <el-input v-model="his.drugNum" placeholder="輸入申請數量" />
      </DtxInputGroup>
    </main>

    <footer class="mt-6 mb-4">
      <Button :disabled="!enabledSave" label="確認儲存" @click="addItem" class="p-button-rounded p-button-success footer-btn" />
    </footer>
  </div>
</template>

<script>
import { ref, inject } from "vue";
import { ElMessage } from "element-plus";
let headers = [
  { name: "ID", key: "id", sortDesc: null },
  { name: "建立者", key: "name", sortDesc: null },
  { name: "建立者", key: "name", sortDesc: null },
  { name: "年齡", key: "age", sortDesc: null },
];

export default {
  name: "drugAddNew",
  inject: ["actions"],
  data() {
    return {
      his: {},
    };
  },
  computed: {
    enabledSave() {
      const ret = this.his.orderDate && this.his.orderId && this.his.orderPerson && this.his.drugId && this.his.drugName && this.his.drugUnit && this.his.drugNum;
      return ret;
    },
  },
  methods: {
    async addItem() {
      try {
        await this.actions.addItem("hisbuys", this.his);
        ElMessage.success("新增採購單 ok");
      } catch (e) {
        ElMessage.error("新增採購單 fail");
      }
    },
  },
  mounted() {
    this.$primevue.config.locale = twDate;
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
.dtc-page-header-grid {
  grid-template-columns: max-content 1rem max-content max-content;
  overflow: hidden;
}

.drgu-add-title {
  text-align: left;
  font-size: 18px;
  margin-left: 12px;
}

.dtc-list-grid {
  grid-template-columns: repeat(1, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  padding: 0 12px;
}

.dtc-grid-fileupload {
  // position: relative;
  display: grid;
  grid-template-columns: 500px 202px max-content;
  grid-column-gap: 20px;
}
</style>
