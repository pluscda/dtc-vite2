<template>
  <sction class="grid gap-2 my-2-grid">
    <div class="left">
      <header class="dtc-page-header dtc-page-header-grid grid text-white button-2">
        <div>新增採購單</div>
      </header>
      <main class="grid dtc-list-grid mt-5">
        <DtxInputGroup prepend="採購日期" labelWidth="120">
          <Calendar class="h-10 w-full" v-model="his.tiDrgPurchaseDate" placeholder="請輸入採購日期" :showIcon="true" dateFormat="yy-mm-dd" />
        </DtxInputGroup>
        <DtxInputGroup prepend="採購單號" labelWidth="120">
          <el-input v-model="his.chDrgPurchaseId" placeholder="請輸入採購單號" />
        </DtxInputGroup>
        <DtxInputGroup prepend="採購人員" labelWidth="120">
          <el-input v-model="his.chDrgPurchasePerson" placeholder="請輸入申請人員" />
        </DtxInputGroup>
        <DtxInputGroup prepend="健保代碼" labelWidth="120">
          <el-input v-model="his.chDrgHisId" placeholder="請輸入健保代碼" />
        </DtxInputGroup>
        <DtxInputGroup prepend="院內代碼" labelWidth="120">
          <el-input v-model="his.chDrgHospitalId" placeholder="請輸入院內代碼" />
        </DtxInputGroup>
        <DtxInputGroup prepend="中文藥名" labelWidth="120">
          <el-input v-model="his.chDrgCnName" placeholder="請輸入中文藥名" />
        </DtxInputGroup>
        <DtxInputGroup prepend="英文藥名" labelWidth="120">
          <el-input v-model="his.chDrgEnName" placeholder="請輸入英文藥名" />
        </DtxInputGroup>
        <DtxInputGroup prepend="劑型" labelWidth="120">
          <el-input v-model="his.chDrgDoseType" placeholder="請輸入劑型" />
        </DtxInputGroup>
        <DtxInputGroup prepend="單位" labelWidth="120">
          <el-input v-model="his.chDrgUnitBy" placeholder="請輸入單位" />
        </DtxInputGroup>
        <DtxInputGroup prepend="採購數量" labelWidth="120">
          <el-input v-model="his.intDrugApplyNum" placeholder="請輸入申請數量" />
        </DtxInputGroup>
        <DtxInputGroup prepend="藥商名稱" labelWidth="120">
          <el-input v-model="his.chDrgMakerName" placeholder="請輸入藥商名稱" />
        </DtxInputGroup>
      </main>

      <footer class="mt-6 mb-4">
        <Button :disabled="addNewItem || loading" label="加入採購車" @click="subject.next()" class="p-button-success footer-btn" />
      </footer>
    </div>
    <div class="right flex flex-col pr-1">
      <header class="dtc-page-header text-white button-2">
        <div>採購單車</div>
      </header>
      <div style="flex: 1" class="bg-gray-700 rounded-md overflow-y-auto" v-if="items.length"></div>
      <div style="flex: 1" class="!bg-gray-900 rounded-md overflow-y-auto grid place-items-center text-2xl dtc-text" v-else>您現在沒有任何新的採購項目</div>
      <div class="h-2"></div>
    </div>
  </sction>
</template>

<script>
import { ElMessage } from "element-plus";
import { Subject } from "rxjs";
import { exhaustMap, throttleTime } from "rxjs/operators";
import dayjs from "dayjs";
let subscribe = "";
export default {
  name: "drugAddNew",
  inject: ["actions"],
  data() {
    return {
      his: {},
      addNewItem: false,
      subject: new Subject(),
      loading: false,
      items: [],
    };
  },
  computed: {
    enabledSave() {
      const keys = ["tiDrgPurchaseDate", "chDrgPurchaseId", "chDrgPurchasePerson", "chDrgHisId"];
      return keys.every((s) => this.his[s]);
    },
  },
  methods: {
    reset() {
      this.his = {};
      this.addNewItem = false;
    },
    async addItem() {
      // this.loading = true;
      // try {
      //   await this.actions.addItem("drg-warehouse-order-adds", this.his);
      //   ElMessage.success("新增採購單成功");
      //   this.addNewItem = true;
      // } catch (e) {
      //   ElMessage.error("新增採購單 fail");
      //   this.loading = false;
      // }
    },
  },
  mounted() {
    this.$primevue.config.locale = twDate;
  },
  created() {
    this.his = {};
    this.his.tiDrgPurchaseDate = dayjs().format("YYYY-MM-DD");
    subscribe = this.subject.pipe(throttleTime(3000), exhaustMap(this.addItem)).subscribe(() => (this.loading = false));
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

.my-2-grid {
  grid-template-columns: 380px 1fr;
}
</style>
