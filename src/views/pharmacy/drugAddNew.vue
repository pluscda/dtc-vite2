<template>
  <div>
    <header class="grid h-40 text-white py-9 dtc-page-header dtc-page-header-grid button-2">
      <div class="transform -translate-y-4">新增藥品資料/藥理資料</div>
      <DtxInputGroup prepend="健保藥品名稱" labelWidth="120" class="transform -translate-y-7">
        <AutoComplete
          class="inline-block transform border-transparent"
          style="width: clamp(620px, 100%, 100%)"
          placeholder="搜尋健保藥品名稱"
          v-model="his.name"
          :delay="300"
          :spellcheck="false"
          :suggestions="medIds"
          @complete="searchMedId($event)"
          @item-select="selectedMedId()"
        />
      </DtxInputGroup>

      <Button label="再次新增品資料/藥理資料" style="margin: 4px 0" @click="reset" v-show="showAddNew" class="transform -translate-y-4 p-button-info" />
    </header>

    <h1 class="my-3 drgu-add-title dtc-text">藥品資料</h1>
    <main class="grid dtc-list-grid">
      <DtxInputGroup prepend="健保代碼" labelWidth="120">
        <el-input v-model="his.nhiCode" placeholder="請輸入健保代碼" />
      </DtxInputGroup>
      <DtxInputGroup prepend="藥品分類" labelWidth="120">
        <el-select filterable v-model="his.pharmacologyCode" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in ddl.parhs" :key="item.categoryCode" :label="item.categoryName" :value="item.categoryCode"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="管制用藥" labelWidth="120">
        <el-select filterable v-model="his.controlledCode" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in ddl.controlls" :key="item.controlledCode" :label="item.controlledName" :value="item.controlledCode"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="原核定價" labelWidth="120">
        <InputNumber class="w-full" v-model="his.originPrice" placeholder="請輸入原核定價"></InputNumber>
      </DtxInputGroup>
      <DtxInputGroup prepend="院內代碼" labelWidth="120">
        <el-input v-model="his.medicineId" placeholder="請輸入院內代碼" />
      </DtxInputGroup>
      <DtxInputGroup prepend="用藥單位" labelWidth="120">
        <el-select filterable v-model="his.medicationUnitCode" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in ddl.unit" :key="item.unitCode" :label="item.unitName" :value="item.unitCode"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="皮試標誌" labelWidth="120">
        <el-select filterable v-model="his.skinTestFlag" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in ddl.yesno" :key="item.label" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="新核定價" labelWidth="120">
        <InputNumber class="w-full" v-model="his.newPrice" placeholder="請輸入新核定價"></InputNumber>
      </DtxInputGroup>
      <DtxInputGroup prepend="中文藥名" labelWidth="120">
        <el-input v-model="his.cname" placeholder="請輸入中文藥名" />
      </DtxInputGroup>
      <DtxInputGroup prepend="用藥頻率" labelWidth="120">
        <el-select filterable v-model="his.frequencyCode" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in ddl.freqs" :key="item.frequencyCode" :label="item.frequencyName" :value="item.frequencyCode"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="抗生素藥物" labelWidth="120">
        <el-select filterable v-model="his.antibioticsFlag" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in ddl.yesno" :key="item.label" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="自費價格" labelWidth="120">
        <InputNumber class="w-full" v-model="his.selfPay" placeholder="請輸入自費價格"></InputNumber>
      </DtxInputGroup>

      <DtxInputGroup prepend="英文藥名" labelWidth="120">
        <el-input v-model="his.ename" placeholder="請輸入英文藥名" />
      </DtxInputGroup>
      <DtxInputGroup prepend="給藥途徑" labelWidth="120">
        <el-select filterable v-model="his.routeCode" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in ddl.routes" :key="item.routeCode" :label="item.routeName" :value="item.routeCode"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="抗生素等級" labelWidth="120">
        <el-select filterable v-model="his.antibioticsCode" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in ddl.antiCodes" :key="item.antibioticsCode" :label="item.antibioticsName" :value="item.antibioticsCode"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="生效日期" labelWidth="120">
        <Calendar class="w-full h-10" v-model="his.effectiveDate" placeholder="請輸入生效日期" :showIcon="true" dateFormat="yy-mm-dd" />
      </DtxInputGroup>

      <DtxInputGroup prepend="藥品學名" labelWidth="120">
        <el-input v-model="his.scientificName" placeholder="請輸入藥品學名" />
      </DtxInputGroup>

      <DtxInputGroup prepend="主成分及含量" labelWidth="120">
        <el-input v-model="his.ingredientDesc" placeholder="請輸入主成分及含量" />
      </DtxInputGroup>

      <DtxInputGroup prepend="現有庫存量" labelWidth="120">
        <InputNumber class="w-full" v-model="his.chDrgForbidden" placeholder="請輸入現有庫存量"></InputNumber>
      </DtxInputGroup>

      <DtxInputGroup prepend="發文號" labelWidth="120">
        <el-input v-model="his.issueNumber" placeholder="請輸入發文號" />
      </DtxInputGroup>

      <DtxInputGroup prepend="藥品劑型" labelWidth="120">
        <el-select filterable v-model="his.dosageFormCode" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in ddl.doges" :key="item.dosageFormCode" :label="item.dosageFormName" :value="item.dosageFormCode"> </el-option>
        </el-select>
      </DtxInputGroup>

      <DtxInputGroup prepend="產地" labelWidth="120">
        <el-select filterable v-model="his.madeInCode" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in ddl.froms" :key="item.numCode" :label="item.cname" :value="item.numCode"> </el-option>
        </el-select>
      </DtxInputGroup>

      <DtxInputGroup prepend="存放位置" labelWidth="120">
        <el-input v-model="his.storePlaceCode" placeholder="請輸入存放位置" />
      </DtxInputGroup>

      <DtxInputGroup prepend="ATC碼" labelWidth="120">
        <el-input v-model="his.atcCode" placeholder="請輸入ATC碼" />
      </DtxInputGroup>

      <DtxInputGroup prepend="藥品類別" labelWidth="120">
        <el-select filterable v-model="his.categoryCode" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in ddl.cates" :key="item.categoryCode" :label="item.categoryName" :value="item.categoryCode"> </el-option>
        </el-select>
      </DtxInputGroup>

      <DtxInputGroup prepend="藥商名稱" labelWidth="120">
        <el-select filterable v-model="his.vendorId" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in chDrgFactoryList" :key="item" :label="item" :value="item"> </el-option>
        </el-select>
      </DtxInputGroup>

      <DtxInputGroup prepend="庫存上限" labelWidth="120">
        <InputNumber class="w-full" v-model="his.upperLimit" placeholder="請輸入庫存上限"></InputNumber>
      </DtxInputGroup>

      <DtxInputGroup prepend="收費項目" labelWidth="120">
        <el-input v-model="his.chargeCode" placeholder="請輸入收費項目" />
      </DtxInputGroup>

      <DtxInputGroup prepend="藥品規格" labelWidth="120">
        <el-input v-model="his.standardDesc" placeholder="請輸入藥品規格" />
      </DtxInputGroup>

      <DtxInputGroup prepend="保存期限" labelWidth="120">
        <Calendar class="w-full h-10" v-model="his.expiredDate" placeholder="請輸入保存期限" :showIcon="true" dateFormat="yy-mm-dd" />
      </DtxInputGroup>

      <DtxInputGroup prepend="庫存下限" labelWidth="120">
        <InputNumber class="w-full" v-model="his.lowerLimit" placeholder="請輸入庫存下限"></InputNumber>
      </DtxInputGroup>
      <DtxInputGroup prepend="單/複方" labelWidth="120">
        <el-select filterable v-model="his.compoundDesc" placeholder="請選擇" class="border-l-0">
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
        <el-input type="textarea" autosize v-model="his.adverseReaction" placeholder="請輸入不良反應/副作用" />
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
        <el-input type="textarea" autosize v-model="his.pregnantNotes" placeholder="請輸入懷孕相關" />
      </DtxInputGroup>
      <DtxInputGroup prepend="交互作用" labelWidth="144">
        <el-input type="textarea" autosize v-model="his.interactionEffect" placeholder="請輸入交互作用" />
      </DtxInputGroup>
      <DtxInputGroup prepend="藥品外觀" labelWidth="144">
        <el-input type="textarea" autosize v-model="his.look" placeholder="請輸入藥品外觀" />
      </DtxInputGroup>
      <div class="dtc-grid-fileupload dtc-text">
        <DtxInputGroup prepend="圖片名稱" labelWidth="144">
          <label for="file-upload" class="custom-file-upload">
            <i-ri:upload-cloud-fill style="font-size: 24px"></i-ri:upload-cloud-fill>
            <div>選擇圖片</div>
            <input id="file-upload" type="file" @change="fileChange" accept="image/x-png,image/gif,image/jpeg" />
          </label>
        </DtxInputGroup>
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
import { ElMessage } from 'element-plus';
import { clone } from 'ramda';
import { Subject, from, of } from 'rxjs';
import toBase64 from 'utils/base64';
import { exhaustMap, throttleTime, mergeMap, distinctUntilChanged, switchMap, catchError, tap } from 'rxjs/operators';
import dayjs from 'dayjs';
let subscribe = '';
let subscribe2 = '';

export default {
  name: 'drugAddNew',
  inject: ['global', 'actions'],
  data() {
    return {
      his: {},
      uploadFileName: '',
      fileUpload: '',
      showAddNew: false,
      subject: new Subject(),
      med$: new Subject(),
      loading: false,
      newImg: '',
      filteredHisIds: [],
      ddl: {},
      medIds: [],
      top20s: [],
    };
  },
  methods: {
    async selectedMedId() {
      this.meds = [];
      const obj = this.top20s.find((s) => s.display === this.his.name);
      this.his = { ...obj };
      this.his.dosageFormCode = this.ddl.doges?.find((s) => s.dosageFormName == obj.dosageForm)?.dosageFormCode;
    },
    async getDrgNameList(event) {
      if (event?.query?.length) {
        const ret = await this.actions.getTop20Items(event.query);
        this.top20s = ret?.length ? [...ret] : [];
        const mySet = new Set(ret.map((s) => s.display));
        this.medIds = [...mySet];
      } else {
        this.medIds = [];
        this.meds = [];
      }
    },
    searchMedId(event) {
      this.med$.next(event);
    },
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
        // Object.keys(this.his).forEach((s) => {
        //   !isNaN(+this.his[s]) ? (this.his[s] = +this.his.s) : "";
        // });
        const ret = await this.actions.addDrg(this.his);
        ElMessage.success('新增藥品成功');
        this.showAddNew = true;
      } catch (e) {
        alert(e);
        ElMessage.error('新增藥品失敗!!');
      }
    },
    async fileChange(e) {
      this.fileUpload = e.target.files[0];
      this.uploadFileName = e.target.files[0].name;
      this.his.chDrgImgName = this.uploadFileName;
      this.newImg = URL.createObjectURL(this.fileUpload);
      this.his.image = await toBase64(this.fileUpload);
    },
  },
  mounted() {
    this.$primevue.config.locale = primeVueDateFormat;
  },
  created() {
    this.getDDL();
    this.his = {};
    subscribe = this.subject.pipe(throttleTime(3000), exhaustMap(this.saveItem)).subscribe(() => (this.loading = false));
    subscribe2 = this.med$
      .pipe(
        switchMap(this.getDrgNameList),
        catchError((s) => of(''))
      )
      .subscribe();
  },

  beforeUnmount() {
    subscribe.unsubscribe();
    subscribe2.unsubscribe();
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
