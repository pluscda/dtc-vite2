<template>
  <div>
    <header class="dtc-page-header dtc-page-header-grid grid text-white button-2">
      <div>編輯採購單</div>
    </header>
    <main class="grid dtc-list-grid mt-5">
      <DtxInputGroup prepend="採購日期" labelWidth="120">
        <Calendar class="h-10 w-full" v-model="his.tiDrgPurchaseDate" placeholder="輸入採購日期" :showIcon="true" dateFormat="yy-mm-dd" />
      </DtxInputGroup>
      <DtxInputGroup prepend="採購單號" labelWidth="120">
        <el-input v-model="his.chDrgPurchaseId" placeholder="輸入採購單號" />
      </DtxInputGroup>
      <DtxInputGroup prepend="申請人員" labelWidth="120">
        <el-input v-model="his.chDrgPurchasePerson" placeholder="輸入申請人員" />
      </DtxInputGroup>
      <DtxInputGroup prepend="健保代碼" labelWidth="120">
        <el-input v-model="his.chDrgHisId" placeholder="輸入健保代碼" />
      </DtxInputGroup>
      <DtxInputGroup prepend="院內代碼" labelWidth="120">
        <el-input v-model="his.chDrgHospitalId" placeholder="輸入院內代碼" />
      </DtxInputGroup>
      <DtxInputGroup prepend="藥品中文" labelWidth="120">
        <el-input v-model="his.chDrgCnName" placeholder="輸入藥品中文" />
      </DtxInputGroup>
      <DtxInputGroup prepend="藥品英文" labelWidth="120">
        <el-input v-model="his.chDrgEnName" placeholder="輸入藥品英文" />
      </DtxInputGroup>
      <DtxInputGroup prepend="劑型" labelWidth="120">
        <el-input v-model="his.chDrgDoseType" placeholder="輸入劑型" />
      </DtxInputGroup>
      <DtxInputGroup prepend="單位" labelWidth="120">
        <el-input v-model="his.chDrgUnitBy" placeholder="輸入單位" />
      </DtxInputGroup>
      <DtxInputGroup prepend="藥商名稱" labelWidth="120">
        <el-input v-model="his.chDrgMakerName" placeholder="輸入藥商名稱" />
      </DtxInputGroup>
      <DtxInputGroup prepend="申請數量" labelWidth="120">
        <el-input v-model="his.intDrugApplyNum" placeholder="輸入申請數量" />
      </DtxInputGroup>
    </main>

    <footer class="mt-6 mb-4 space-x-4">
      <Button :disabled="!enabledSave || loading" label="確認儲存" @click="subject.next()" class="p-button-success footer-btn" />
      <Button label="返回" class="footer-btn" @click="$router.go(-1)" />
      <ProgressSpinner v-if="loading" style="width: 30px; height: 30px" strokeWidth="8" fill="#EEEEEE" animationDuration=".5s"></ProgressSpinner>
    </footer>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import { Subject } from "rxjs";
import { exhaustMap, throttleTime } from "rxjs/operators";

let subscribe = "";
export default {
  name: "drug1223432434",
  inject: ["actions"],
  data() {
    return {
      his: {},
      addNewItem: false,
      subject: new Subject(),
      loading: false,
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
    async editItem() {
      this.loading = true;
      try {
        await this.actions.editItem("drg-warehouse-order-adds", this.his);
        ElMessage.success("編輯採購單成功");
        this.addNewItem = true;
      } catch (e) {
        ElMessage.error("編輯採購單 fail");
        this.loading = false;
      }
    },
  },
  mounted() {
    this.$primevue.config.locale = twDate;
  },
  created() {
    this.his = {};
    subscribe = this.subject.pipe(throttleTime(3000), exhaustMap(this.editItem)).subscribe(() => (this.loading = false));
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
