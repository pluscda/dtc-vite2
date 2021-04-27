<template>
  <div>
    <header class="grid text-white dtc-page-header dtc-page-header-grid button-2">
      <div>新增藥品資料/藥理資料</div>
      <Button label="再次新增品資料/藥理資料" style="margin: 4px 0" @click="reset" v-show="showAddNew" class="p-button-info" />
    </header>

    <h1 class="my-3 drgu-add-title dtc-text">藥品資料</h1>

    <main class="grid dtc-list-grid">
      <DtxInputGroup prepend="健保代碼" labelWidth="120">
        <el-select v-model="his.hisId" filterable remote reserve-keyword placeholder="請輸入健保代碼" :remote-method="searchHisId" :loading="loading">
          <el-option v-for="item in filteredHisIds" :key="item" :label="item" :value="item"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="用藥單位" labelWidth="120">
        <el-select filterable v-model="his.chDrgUnit" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in chDrgUnitList" :key="item" :label="item" :value="item"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="主成分及含量" labelWidth="120">
        <el-input v-model="his.chDrgContain" placeholder="請輸入主成分及含量" />
      </DtxInputGroup>
      <DtxInputGroup prepend="適應症狀1" labelWidth="120">
        <el-input v-model="his.chSymptom1" placeholder="請輸入適應症狀1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="院內代碼" labelWidth="120">
        <el-input v-model="his.chHospitalId" placeholder="請輸入院內代碼" />
      </DtxInputGroup>
      <DtxInputGroup prepend="用藥頻率" labelWidth="120">
        <el-select filterable v-model="his.chDrgFrequency" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in chDrgFreqNoList" :key="item" :label="item" :value="item"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="庫存上限" labelWidth="120">
        <el-input v-model="his.intDrgStockMax" placeholder="請輸入庫存上限" />
      </DtxInputGroup>
      <DtxInputGroup prepend="適應症狀2" labelWidth="120">
        <el-input v-model="his.chSymptom2" placeholder="請輸入適應症狀2" />
      </DtxInputGroup>
      <DtxInputGroup prepend="藥品中文" labelWidth="120">
        <el-input v-model="his.chDrgCnName" placeholder="請輸入藥品中文" />
      </DtxInputGroup>
      <DtxInputGroup prepend="原核定價" labelWidth="120">
        <el-input v-model="his.rlDrgOriginalPrice" placeholder="請輸入原核定價" />
      </DtxInputGroup>
      <DtxInputGroup prepend="庫存下限" labelWidth="120">
        <el-input v-model="his.intDrgStockMin" placeholder="請輸入庫存下限" />
      </DtxInputGroup>
      <DtxInputGroup prepend="抗生素藥物" labelWidth="120">
        <el-select filterable v-model="his.chDrgAntibiotics" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in dummyList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="藥品英文" labelWidth="120">
        <el-input v-model="his.chDrgEnName" placeholder="請輸入藥品英文" />
      </DtxInputGroup>
      <DtxInputGroup prepend="新核定價" labelWidth="120">
        <el-input v-model="his.rlDrgNewPrice" placeholder="請輸入新核定價" />
      </DtxInputGroup>
      <DtxInputGroup prepend="產地" labelWidth="120">
        <el-select filterable v-model="his.chDrgCountryFrom" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in dummyList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="抗生素等級" labelWidth="120">
        <el-select filterable v-model="his.chDrgAntibioticsLevel" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in dummyList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="學名" labelWidth="120">
        <el-input v-model="his.chDrgAlias" placeholder="請輸入學名" />
      </DtxInputGroup>
      <DtxInputGroup prepend="自費價格" labelWidth="120">
        <el-input v-model="his.rlDrgSelfPayPrice" placeholder="請輸入自費價格" />
      </DtxInputGroup>
      <DtxInputGroup prepend="藥商名稱" labelWidth="120">
        <el-select filterable v-model="his.chDrgMakerName" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in chDrgFactoryList" :key="item" :label="item" :value="item"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="管制用藥" labelWidth="120">
        <el-select filterable v-model="his.chDrgControlType" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in chDrgCtrlTypeList" :key="item" :label="item" :value="item"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="劑型" labelWidth="120">
        <el-select filterable v-model="his.chDrgDoseType" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in dummyList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="生效日期" labelWidth="120">
        <el-input v-model="his.tiDrgEffectTime" placeholder="請輸入生效日期" />
      </DtxInputGroup>
      <DtxInputGroup prepend="藥品分類" labelWidth="120">
        <el-select filterable v-model="his.chDrgClassified" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in dummyList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="絕對禁忌" labelWidth="120">
        <el-input v-model="his.chDrgForbidden" placeholder="請輸入絕對禁忌" />
      </DtxInputGroup>
      <DtxInputGroup prepend="類別" labelWidth="120">
        <el-select filterable v-model="his.chDrgType" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in dummyList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="發文號" labelWidth="120">
        <el-input v-model="his.chDrgIssueId" placeholder="請輸入發文號" />
      </DtxInputGroup>
      <DtxInputGroup prepend="收費項目" labelWidth="120">
        <el-select filterable v-model="his.chDrgChargeBy" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in dummyList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="給藥方式" labelWidth="120">
        <el-select filterable v-model="his.chDrgGivenBy" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in dummyList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="規格" labelWidth="120">
        <el-input v-model="his.chDrgStandard" placeholder="請輸入規格" />
      </DtxInputGroup>
      <DtxInputGroup prepend="ATC碼" labelWidth="120">
        <el-input v-model="his.chDrgAtcCode" placeholder="請輸入ATC碼" />
      </DtxInputGroup>
      <DtxInputGroup prepend="皮膚試驗" labelWidth="120">
        <el-select filterable v-model="his.chDrgSkinTest" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in dummyList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="煎藥方式" labelWidth="120">
        <el-select filterable v-model="his.chDrgSteamBy" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in dummyList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
    </main>
    <h1 class="my-3 drgu-add-title dtc-text">藥理資料</h1>
    <main class="grid dtc-list-grid2">
      <DtxInputGroup prepend="警語(副作用)" labelWidth="120">
        <el-input v-model="his.chDrgWarningMsg" placeholder="請輸入警語(副作用)" />
      </DtxInputGroup>
      <DtxInputGroup prepend="用藥須知" labelWidth="120">
        <el-input v-model="his.chDrgTakePreStepMsg" placeholder="請輸入用藥須知" />
      </DtxInputGroup>
      <DtxInputGroup prepend="不良反應" labelWidth="120">
        <el-input v-model="his.chDrgSideEffectMsg" placeholder="請輸入不良反應" />
      </DtxInputGroup>
      <DtxInputGroup prepend="用途" labelWidth="120">
        <el-input v-model="his.chDrgSideEffectMsg" placeholder="請輸入用途" />
      </DtxInputGroup>
      <DtxInputGroup prepend="儲存條件" labelWidth="120">
        <el-input v-model="his.chDrgKeepSafeMsg" placeholder="請輸入儲存條件" />
      </DtxInputGroup>
      <div class="dtc-grid-fileupload dtc-text">
        <DtxInputGroup prepend="圖片名稱" labelWidth="120">
          <el-input v-model="his.chDrgImgName" placeholder="請輸入圖片名稱 (先選擇右方圖片)" />
        </DtxInputGroup>
        <label for="file-upload" class="custom-file-upload">
          <i-ri:upload-cloud-fill style="font-size: 24px"></i-ri:upload-cloud-fill>
          <div>選擇圖片</div>
          <input id="file-upload" type="file" @change="fileChange" accept="image/*" />
        </label>

        <div style="padding-top: 6px" class="hidden">
          {{ uploadFileName }}
        </div>
      </div>
    </main>
    <nav class="w-16 h-16 mt-2 ml-3" v-if="newImg">
      <img :src="newImg" class="object-cover rounded" />
    </nav>
    <footer class="mt-6 mb-4 space-x-4">
      <Button :disabled="!his.chDrgImgName || loading" label="確認儲存" v-if="!showAddNew" class="p-button-success footer-btn" @click="subject.next()" />
      <ProgressSpinner v-if="loading" style="width: 30px; height: 30px" strokeWidth="8" fill="#EEEEEE" animationDuration=".5s"></ProgressSpinner>
    </footer>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import { Subject } from "rxjs";
import { from } from "rxjs";
import { concatMap, throttleTime, tap, exhaustMap, delay } from "rxjs/operators";
import { drgSample } from "/@/constance.js";
let subscribe = "";
export default {
  name: "drugAddNew",
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
      filteredHisIds: [],
    };
  },
  methods: {
    reset() {
      this.his = {};
      this.showAddNew = false;
    },
    searchHisId(query) {
      if (!query) {
        this.filteredHisIds = [];
        return;
      }
      const qs = query.toLowerCase();
      this.filteredHisIds = this.drgList.filter((s) => s.chDrgPriceNo && s.chDrgPriceNo.toLowerCase().startsWith(qs)).map((s) => s.chDrgPriceNo);
    },
    async saveDtcItem(obj) {
      const ret = this.convertItemToSample(obj);
      return await this.actions.addItem("drgadds", ret);
    },
    async loadItem() {
      from(this.drgList)
        .pipe(
          //take(3),
          concatMap((s) => this.saveDtcItem(s)),
          tap(console.log),
          delay(500)
        )
        .subscribe();
    },
    convertItemToSample(s) {
      let obj = { ...drgSample };
      for (let [k, v] of Object.entries(obj)) {
        if (v && s[v]) {
          obj[k] = s[v];
          if (!isNaN(+s[v])) {
            obj[k] = +obj[k];
          }
        }

        if (v == "chDrgGrpType1") {
          obj[k] = s[v] + s["chDrgGrpType2"] + s["chDrgGrpType3"];
        }
      } // end of for loop
      return obj;
    },
    async saveItem() {
      //return this.loadItem();
      this.loading = true;
      const formData = new FormData();
      formData.append("files.s3DrgImg", this.fileUpload, this.his.imgName);
      formData.append("data", JSON.stringify(this.his));
      try {
        const ret = await this.actions.addDrug(formData);
        ElMessage.success("新增藥品成功");
        this.showAddNew = true;
      } catch (e) {
        ElMessage.error("新增藥品失敗!!");
      }
    },
    fileChange(e) {
      this.fileUpload = e.target.files[0];
      this.uploadFileName = e.target.files[0].name;
      this.his.chDrgImgName = this.uploadFileName;
      this.newImg = URL.createObjectURL(this.fileUpload);
    },
  },
  created() {
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
</style>
