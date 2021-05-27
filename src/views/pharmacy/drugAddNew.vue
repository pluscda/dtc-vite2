<template>
  <div>
    <header class="grid text-white dtc-page-header dtc-page-header-grid button-2">
      <div>新增藥品資料/藥理資料</div>
      <Button label="再次新增品資料/藥理資料" style="margin: 4px 0" @click="reset" v-show="showAddNew" class="p-button-info" />
    </header>

    <h1 class="my-3 drgu-add-title dtc-text">藥品資料</h1>

    <main class="grid dtc-list-grid">
      <DtxInputGroup prepend="健保代碼" labelWidth="120">
        <el-input v-model="his.nhi_code" placeholder="請輸入健保代碼" />
      </DtxInputGroup>
      <DtxInputGroup prepend="藥品分類" labelWidth="120">
        <el-select filterable v-model="his.pharmacology_code" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in ddl.parhs" :key="item.categoryCode" :label="item.categoryName" :value="item.categoryCode"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="管制用藥" labelWidth="120">
        <el-select filterable v-model="his.controlled_code" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in ddl.controlls" :key="item.controlledCode" :label="item.controlledName" :value="item.controlledCode"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="原核定價" labelWidth="120">
        <el-input v-model="his.origin_price" placeholder="請輸入原核定價" />
      </DtxInputGroup>
      <DtxInputGroup prepend="院內代碼" labelWidth="120">
        <el-input v-model="his.medicine_id" placeholder="請輸入院內代碼" />
      </DtxInputGroup>
      <DtxInputGroup prepend="用藥單位" labelWidth="120">
        <el-select filterable v-model="his.medication_unit_code" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in ddl.unit" :key="item.unitCode" :label="item.unitName" :value="item.unitCode"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="皮試標誌" labelWidth="120">
        <el-select filterable v-model="his.skin_test_flag" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in ddl.yesno" :key="item.label" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="新核定價" labelWidth="120">
        <el-input v-model="his.new_price" placeholder="請輸入新核定價" />
      </DtxInputGroup>
      <DtxInputGroup prepend="中文藥名" labelWidth="120">
        <el-input v-model="his.c_name" placeholder="請輸入中文藥名" />
      </DtxInputGroup>
      <DtxInputGroup prepend="用藥頻率" labelWidth="120">
        <el-select filterable v-model="his.frequency_code" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in ddl.freqs" :key="item.frequencyCode" :label="item.frequencyName" :value="item.frequencyCode"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="抗生素藥物" labelWidth="120">
        <el-select filterable v-model="his.antibiotics_flag" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in ddl.yesno" :key="item.label" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="自費價格" labelWidth="120">
        <el-input v-model="his.self_pay" placeholder="請輸入自費價格" />
      </DtxInputGroup>

      <DtxInputGroup prepend="英文藥名" labelWidth="120">
        <el-input v-model="his.e_name" placeholder="請輸入英文藥名" />
      </DtxInputGroup>
      <DtxInputGroup prepend="給藥途徑" labelWidth="120">
        <el-select filterable v-model="his.route_code" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in ddl.routes" :key="item.routeCode" :label="item.routeName" :value="item.routeCode"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="抗生素等級" labelWidth="120">
        <el-select filterable v-model="his.antibiotics_code" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in ddl.antiCodes" :key="item.antibioticsCode" :label="item.antibioticsName" :value="item.antibioticsCode"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="生效日期" labelWidth="120">
        <Calendar class="h-10 w-full" v-model="his.effective_date" placeholder="請輸入生效日期" :showIcon="true" dateFormat="yy-mm-dd" />
      </DtxInputGroup>

      <DtxInputGroup prepend="藥品學名" labelWidth="120">
        <el-input v-model="his.scientific_name" placeholder="請輸入藥品學名" />
      </DtxInputGroup>

      <DtxInputGroup prepend="主成分及含量" labelWidth="120">
        <el-input v-model="his.ingredient_desc" placeholder="請輸入主成分及含量" />
      </DtxInputGroup>

      <DtxInputGroup prepend="現有庫存量" labelWidth="120">
        <el-input v-model="his.chDrgForbidden" placeholder="請輸入現有庫存量" />
      </DtxInputGroup>

      <DtxInputGroup prepend="發文號" labelWidth="120">
        <el-input v-model="his.issue_number" placeholder="請輸入發文號" />
      </DtxInputGroup>

      <DtxInputGroup prepend="藥品劑型" labelWidth="120">
        <el-select filterable v-model="his.dosage_form_code" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in ddl.doges" :key="item.dosageFormCode" :label="item.dosageFormName" :value="item.dosageFormCode"> </el-option>
        </el-select>
      </DtxInputGroup>

      <DtxInputGroup prepend="產地" labelWidth="120">
        <el-select filterable v-model="his.made_in_code" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in ddl.froms" :key="item.numCode" :label="item.cname" :value="item.numCode"> </el-option>
        </el-select>
      </DtxInputGroup>

      <DtxInputGroup prepend="存放位置" labelWidth="120">
        <el-input v-model="his.store_place_code" placeholder="請輸入存放位置" />
      </DtxInputGroup>

      <DtxInputGroup prepend="ATC碼" labelWidth="120">
        <el-input v-model="his.atc_code" placeholder="請輸入ATC碼" />
      </DtxInputGroup>

      <DtxInputGroup prepend="藥品類別" labelWidth="120">
        <el-select filterable v-model="his.category_code" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in ddl.cates" :key="item.categoryCode" :label="item.categoryName" :value="item.categoryCode"> </el-option>
        </el-select>
      </DtxInputGroup>

      <DtxInputGroup prepend="藥商名稱" labelWidth="120">
        <el-select filterable v-model="his.chDrgMakerName" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in chDrgFactoryList" :key="item" :label="item" :value="item"> </el-option>
        </el-select>
      </DtxInputGroup>

      <DtxInputGroup prepend="庫存上限" labelWidth="120">
        <el-input v-model="his.intDrgStockMin" placeholder="請輸入庫存上限" />
      </DtxInputGroup>

      <DtxInputGroup prepend="收費項目" labelWidth="120">
        <el-input v-model="his.charge_code" placeholder="請輸入收費項目" />
      </DtxInputGroup>

      <DtxInputGroup prepend="藥品規格" labelWidth="120">
        <el-input v-model="his.chDrgStandard" placeholder="請輸入藥品規格" />
      </DtxInputGroup>

      <DtxInputGroup prepend="保存期限" labelWidth="120">
        <Calendar class="h-10 w-full" v-model="his.expired_date" placeholder="請輸入保存期限" :showIcon="true" dateFormat="yy-mm-dd" />
      </DtxInputGroup>

      <DtxInputGroup prepend="庫存下限" labelWidth="120">
        <el-input v-model="his.intDrgStockMin" placeholder="請輸入庫存下限" />
      </DtxInputGroup>
      <DtxInputGroup prepend="單/複方" labelWidth="120">
        <el-select filterable v-model="his.compound_desc" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in ddl.formulas" :key="item.value" :label="item.value" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
    </main>
    <h1 class="my-3 drgu-add-title dtc-text">藥理資料</h1>
    <main class="grid dtc-list-grid2">
      <DtxInputGroup prepend="適應症" labelWidth="144">
        <el-input type="textarea" autosize v-model="his.indication" placeholder="請輸入適應症" />
      </DtxInputGroup>
      <DtxInputGroup prepend="不良反應/副作用" labelWidth="144">
        <el-input type="textarea" autosize v-model="his.adverse_reaction" placeholder="請輸入不良反應/副作用" />
      </DtxInputGroup>
      <DtxInputGroup prepend="警語" labelWidth="144">
        <el-input type="textarea" autosize v-model="his.warning" placeholder="請輸入警語" />
      </DtxInputGroup>
      <DtxInputGroup prepend="用法與用量" labelWidth="144">
        <el-input type="textarea" autosize v-model="his.dosage" placeholder="請輸入用法與用量" />
      </DtxInputGroup>
      <DtxInputGroup prepend="使用禁忌" labelWidth="144">
        <el-input type="textarea" autosize v-model="his.contraindication" placeholder="請輸入使用禁忌" />
      </DtxInputGroup>
      <DtxInputGroup prepend="懷孕相關" labelWidth="144">
        <el-input type="textarea" autosize v-model="his.pregnant_notes" placeholder="請輸入懷孕相關" />
      </DtxInputGroup>
      <DtxInputGroup prepend="交互作用" labelWidth="144">
        <el-input type="textarea" autosize v-model="his.interaction_effect" placeholder="請輸入交互作用" />
      </DtxInputGroup>
      <DtxInputGroup prepend="藥品外觀" labelWidth="144">
        <el-input type="textarea" autosize v-model="his.look" placeholder="請輸入藥品外觀" />
      </DtxInputGroup>
      <div class="dtc-grid-fileupload dtc-text">
        <DtxInputGroup prepend="圖片名稱" labelWidth="144">
          <el-input v-model="his.chDrgImgName" readonly placeholder="請輸入圖片名稱 (先選擇右方圖片)" />
        </DtxInputGroup>
        <label for="file-upload" class="custom-file-upload">
          <i-ri:upload-cloud-fill style="font-size: 24px"></i-ri:upload-cloud-fill>
          <div>選擇圖片</div>
          <input id="file-upload" type="file" @change="fileChange" accept="image/x-png,image/gif,image/jpeg" />
        </label>

        <div style="padding-top: 6px" class="hidden">
          {{ uploadFileName }}
        </div>
      </div>
    </main>
    <nav class="mt-2 ml-3" v-if="newImg" style="width: auto; height: auto">
      <img :src="newImg" class="object-cover rounded" />
    </nav>
    <footer class="mt-6 mb-4 space-x-4">
      <Button :disabled="loading" label="確認儲存" v-if="!showAddNew" class="p-button-success footer-btn" @click="subject.next()" />
      <ProgressSpinner v-if="loading" style="width: 30px; height: 30px" strokeWidth="8" fill="#EEEEEE" animationDuration=".5s"></ProgressSpinner>
    </footer>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import { Subject } from "rxjs";
import { throttleTime, exhaustMap } from "rxjs/operators";
let subscribe = "";
export default {
  name: "drugAddNew",
  inject: ["global", "actions"],
  data() {
    return {
      his: {},
      uploadFileName: "",
      fileUpload: "",
      showAddNew: false,
      subject: new Subject(),
      loading: false,
      newImg: "",
      filteredHisIds: [],
      ddl: {},
    };
  },
  methods: {
    async getDDL() {
      this.ddl.unit = await this.actions.getUnitCode();
      this.ddl.cates = await this.actions.getDrgCategoryCode();
      this.ddl.freqs = await this.actions.getfrequencyCode();
      this.ddl.routes = await this.actions.getRouteCode();
      this.ddl.doges = await this.actions.getDosageFormCode();
      this.ddl.parhs = await this.actions.getPharmacologyCode();
      this.ddl.controlls = await this.actions.getControlledCode();
      this.ddl.antiCodes = await this.actions.getAntibioticsCode();
      this.ddl.froms = await this.actions.getISO3166Code();
      this.ddl.yesno = this.global.answers;
      this.ddl.formulas = this.global.formulas;
    },
    reset() {
      this.his = {};
      this.showAddNew = false;
    },
    async saveItem() {
      this.loading = true;
      try {
        const ret = await this.actions.addDrg(this.his);
        ElMessage.success("新增藥品成功");
        this.showAddNew = true;
      } catch (e) {
        alert(e);
        ElMessage.error("新增藥品失敗!!");
      }
    },
    fileChange(e) {
      this.fileUpload = e.target.files[0];
      this.uploadFileName = e.target.files[0].name;
      this.his.chDrgImgName = this.uploadFileName;
      this.his.image = URL.createObjectURL(this.fileUpload);
      this.newImg = this.his.image;
    },
  },
  mounted() {
    this.$primevue.config.locale = primeVueDateFormat;
  },
  created() {
    this.getDDL();
    this.his = {};
    subscribe = this.subject.pipe(throttleTime(3000), exhaustMap(this.saveItem)).subscribe(() => (this.loading = false));
  },

  beforeUnmount() {
    subscribe.unsubscribe();
    this.his = {};

    /*


    */
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

.dtc-list-grid,
.dtc-list-grid2 {
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  padding: 0 12px;
}
.dtc-list-grid2 {
  grid-template-columns: repeat(1, 1fr);
}
.dtc-grid-fileupload {
  // position: relative;
  display: grid;
  grid-template-columns: 500px 202px max-content;
  grid-column-gap: 20px;
}
.button-2 {
  grid-template-columns: max-content max-content;
  gap: 1.5rem;
}
:deep(.el-textarea__inner) {
  min-height: 40px !important;
  height: 40px;
}
</style>
