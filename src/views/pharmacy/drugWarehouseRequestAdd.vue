<template>
  <div>
    <header class="grid text-white dtc-page-header dtc-page-header-grid button-2">
      <div>新增藥品申領單</div>
      <Button label="再次新增藥品申領單" style="margin: 4px 0" @click="reset" v-show="showAddNew" class="p-button-info" />
    </header>
    <main class="grid dtc-list-grid mt-3">
      <DtxInputGroup prepend="申請日期" labelWidth="120">
        <Calendar class="h-10 w-full" v-model="his.tiDrgApplyDate" placeholder="請輸入申請日期" :showIcon="true" dateFormat="yy-mm-dd" />
      </DtxInputGroup>
      <DtxInputGroup prepend="申請單號" labelWidth="120">
        <el-input v-model="his.chDrgApplyId" placeholder="請輸入申請單號" />
      </DtxInputGroup>
      <DtxInputGroup prepend="申請人員" labelWidth="120">
        <el-input v-model="his.chDrgApplyPersonName" placeholder="請輸入申請人員" />
      </DtxInputGroup>
      <DtxInputGroup prepend="申請藥房" labelWidth="120">
        <el-input v-model="his.chDrgApplyStoreName" placeholder="請輸入申請藥房" />
      </DtxInputGroup>
      <DtxInputGroup prepend="健保代碼" labelWidth="120">
        <el-select filterable v-model="his.chDrgHisId" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in dummyList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="院內代碼" labelWidth="120">
        <el-select filterable v-model="his.chDrgHospitalId" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in dummyList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="藥品中文" labelWidth="120">
        <el-input v-model="his.chDrgCnName" placeholder="請輸入藥品中文" />
      </DtxInputGroup>
      <DtxInputGroup prepend="藥品英文" labelWidth="120">
        <el-input v-model="his.chDrgEnName" placeholder="請輸入藥品英文" />
      </DtxInputGroup>
      <DtxInputGroup prepend="單位" labelWidth="120">
        <el-input v-model="his.chDrgUnitBy" placeholder="請輸入單位" />
      </DtxInputGroup>
      <DtxInputGroup prepend="申請數量" labelWidth="120">
        <el-input v-model="his.intDrgApplyNum" placeholder="請輸入申請數量" />
      </DtxInputGroup>
      <DtxInputGroup prepend="撥補數量" labelWidth="120">
        <el-input v-model="his.intDrgCatchNum" placeholder="請輸入撥補數量" />
      </DtxInputGroup>
      <DtxInputGroup prepend="撥補人員" labelWidth="120">
        <el-input v-model="his.chDrgCatchPerson" placeholder="請輸入撥補人員" />
      </DtxInputGroup>
      <DtxInputGroup labelWidth="120" prepend="結案狀態" style="grid-column: span 1; display: grid; grid-template-columns: 120px 1fr; grid-column-gap: 5px">
        <div class="flex space-x-10 h-10">
          <div class="p-field-radiobutton dtc-text mt-2 ml-2">
            <RadioButton value="Y" id="close1" v-model="his.chDrgStatus" />
            <label for="close1">已結案</label>
          </div>
          <div class="p-field-radiobutton dtc-text mt-2">
            <RadioButton value="N" id="close2" v-model="his.chDrgStatus" />
            <label for="close2">未結案</label>
          </div>
        </div>
      </DtxInputGroup>
      <DtxInputGroup prepend="備註" labelWidth="120">
        <el-input v-model="his.chDrgNote" placeholder="請輸入備註" />
      </DtxInputGroup>
    </main>

    <footer class="mt-6 mb-4 space-x-6">
      <Button :disabled="loading" label="確認儲存" v-if="!showAddNew" class="p-button-success footer-btn" @click="subject.next()" />
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
  name: "dtcadddrkkdkname",
  inject: ["actions"],
  data() {
    return {
      his: {},
      uploadFileName: "",
      fileUpload: "",
      showAddNew: false,
      subject: new Subject(),
      loading: false,
      newImg: "",
    };
  },
  methods: {
    reset() {
      this.his = {};
      this.showAddNew = false;
    },
    async saveItem() {
      this.loading = true;
      try {
        const ret = await this.actions.addItem("drg-warehouse-request-adds", this.his);
        ElMessage.success("新增藥品申領單成功");
        this.showAddNew = true;
      } catch (e) {
        ElMessage.error("新增藥品申領單失敗!!");
        this.loading = false;
      }
    },
  },
  created() {
    this.his = {};
    subscribe = this.subject.pipe(throttleTime(3000), exhaustMap(this.saveItem)).subscribe(() => (this.loading = false));
    this.$primevue.config.locale = twDate;
  },

  beforeUnmount() {
    subscribe.unsubscribe();
    this.his = {};
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
