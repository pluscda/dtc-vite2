<template>
  <div>
    <header class="grid text-white dtc-page-header dtc-page-header-grid button-2">
      <div>編輯藥品資料/藥理資料</div>
    </header>

    <h1 class="my-3 drgu-add-title dtc-text">編輯藥品資料</h1>

    <main class="grid dtc-list-grid">
      <DtxInputGroup prepend="健保代碼" labelWidth="120">
        <el-input v-model="his.hisId" placeholder="輸入健保代碼" />
      </DtxInputGroup>
      <DtxInputGroup prepend="用藥單位" labelWidth="120">
        <el-select v-model="his.chDrgUnit" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in yesNoOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="主成分及含量" labelWidth="120">
        <el-input v-model="his.chDrgContain" placeholder="輸入主成分及含量" />
      </DtxInputGroup>
      <DtxInputGroup prepend="適應症狀1" labelWidth="120">
        <el-input v-model="his.chSymptom1" placeholder="輸入適應症狀1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="院內代碼" labelWidth="120">
        <el-input v-model="his.chHospitalId" placeholder="輸入院內代碼" />
      </DtxInputGroup>
      <DtxInputGroup prepend="用藥頻率" labelWidth="120">
        <el-select v-model="his.chDrgFrequency" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in yesNoOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="庫存上限" labelWidth="120">
        <el-input v-model="his.intDrgStockMax" placeholder="輸入庫存上限" />
      </DtxInputGroup>
      <DtxInputGroup prepend="適應症狀2" labelWidth="120">
        <el-input v-model="his.chSymptom2" placeholder="輸入適應症狀2" />
      </DtxInputGroup>
      <DtxInputGroup prepend="藥品中文" labelWidth="120">
        <el-input v-model="his.chDrgCnName" placeholder="輸入藥品中文" />
      </DtxInputGroup>
      <DtxInputGroup prepend="原核定價" labelWidth="120">
        <el-input v-model="his.rlDrgOriginalPrice" placeholder="輸入原核定價" />
      </DtxInputGroup>
      <DtxInputGroup prepend="庫存下限" labelWidth="120">
        <el-input v-model="his.intDrgStockMin" placeholder="輸入庫存下限" />
      </DtxInputGroup>
      <DtxInputGroup prepend="抗生素藥物" labelWidth="120">
        <el-select v-model="his.chDrgAntibiotics" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in yesNoOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="藥品英文" labelWidth="120">
        <el-input v-model="his.chDrgEnName" placeholder="輸入藥品中文" />
      </DtxInputGroup>
      <DtxInputGroup prepend="新核定價" labelWidth="120">
        <el-input v-model="his.rlDrgNewPrice" placeholder="輸入原核定價" />
      </DtxInputGroup>
      <DtxInputGroup prepend="產地" labelWidth="120">
        <el-select v-model="his.chDrgCountryFrom" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in yesNoOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="抗生素等級" labelWidth="120">
        <el-select v-model="his.chDrgAntibioticsLevel" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in yesNoOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="學名" labelWidth="120">
        <el-input v-model="his.chDrgAlias" placeholder="輸入學名" />
      </DtxInputGroup>
      <DtxInputGroup prepend="自費價格" labelWidth="120">
        <el-input v-model="his.rlDrgSelfPayPrice" placeholder="輸入自費價格" />
      </DtxInputGroup>
      <DtxInputGroup prepend="藥商名稱" labelWidth="120">
        <el-select v-model="his.chDrgMakerName" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in yesNoOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="管制用藥" labelWidth="120">
        <el-select v-model="his.chDrgControlType" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in yesNoOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="劑型" labelWidth="120">
        <el-select v-model="his.chDrgDoseType" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in yesNoOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="生效日期" labelWidth="120">
        <el-input v-model="his.tiDrgEffectTime" placeholder="輸入生效日期" />
      </DtxInputGroup>
      <DtxInputGroup prepend="藥品分類" labelWidth="120">
        <el-select v-model="his.chDrgClassified" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in yesNoOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="絕對禁忌" labelWidth="120">
        <el-input v-model="his.chDrgForbidden" placeholder="輸入絕對禁忌" />
      </DtxInputGroup>
      <DtxInputGroup prepend="類別" labelWidth="120">
        <el-select v-model="his.chDrgType" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in yesNoOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="發文號" labelWidth="120">
        <el-input v-model="his.chDrgIssueId" placeholder="輸入發文號" />
      </DtxInputGroup>
      <DtxInputGroup prepend="收費項目" labelWidth="120">
        <el-select v-model="his.chDrgChargeBy" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in yesNoOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="給藥方式" labelWidth="120">
        <el-select v-model="his.chDrgGivenBy" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in yesNoOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="規格" labelWidth="120">
        <el-input v-model="his.chDrgStandard" placeholder="輸入規格" />
      </DtxInputGroup>
      <DtxInputGroup prepend="ATC碼" labelWidth="120">
        <el-input v-model="his.chDrgAtcCode" placeholder="輸入ATC碼" />
      </DtxInputGroup>
      <DtxInputGroup prepend="皮膚試驗" labelWidth="120">
        <el-select v-model="his.chDrgSkinTest" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in yesNoOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="煎藥方式" labelWidth="120">
        <el-select v-model="his.chDrgSteamBy" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in yesNoOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
    </main>
    <h1 class="my-3 drgu-add-title dtc-text">藥理資料</h1>
    <main class="grid dtc-list-grid2">
      <DtxInputGroup prepend="警語(副作用)" labelWidth="120">
        <el-input v-model="his.chDrgWarningMsg" placeholder="輸入警語(副作用)" />
      </DtxInputGroup>
      <DtxInputGroup prepend="用前注意" labelWidth="120">
        <el-input v-model="his.chDrgTakePreStepMsg" placeholder="輸入用前注意" />
      </DtxInputGroup>
      <DtxInputGroup prepend="不良反應" labelWidth="120">
        <el-input v-model="his.chDrgSideEffectMsg" placeholder="輸入不良反應" />
      </DtxInputGroup>
      <DtxInputGroup prepend="儲存條件" labelWidth="120">
        <el-input v-model="his.chDrgKeepSafeMsg" placeholder="輸入儲存條件" />
      </DtxInputGroup>
      <div class="dtc-grid-fileupload dtc-text">
        <DtxInputGroup prepend="圖片名稱" labelWidth="120">
          <el-input v-model="his.chDrgImgName" placeholder="輸入圖片名稱 (先選擇右方圖片)" />
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
      <Button :disabled="loading" label="確認儲存" v-if="!showAddNew" class="p-button-success footer-btn" @click="subject.next()" />
      <Button label="返回" class="footer-btn" @click="$router.push('/pharmacy/drugmanagement')" />
      <ProgressSpinner v-if="loading" style="width: 30px; height: 30px" strokeWidth="8" fill="#EEEEEE" animationDuration=".5s"></ProgressSpinner>
    </footer>
  </div>
</template>

<script>
import { ref, inject } from "vue";
import { clone } from "ramda";
import { ElMessage } from "element-plus";

let yesNoOptions = [
  {
    value: "y",
    label: "是",
  },
  {
    value: "n",
    label: "否",
  },
];

export default {
  name: "drugModify",
  inject: ["global", "actions"],
  data() {
    return {
      his: {},
      uploadFileName: "",
      fileUpload: "",
      newImg: "",
      loading: false,
    };
  },
  methods: {
    async updateImg() {
      //https://strapi.io/documentation/developer-docs/latest/development/plugins/upload.html#upload-files-related-to-an-entry
      const formData = new FormData();
      formData.append("ref", "drgadd");
      formData.append("refId", this.his.id);
      formData.append("field", "s3DrgImg");
      formData.append("files", this.fileUpload, this.his.imgName);
      const ret = await this.actions.editImg(formData);
    },
    async saveItem() {
      this.loading = true;
      try {
        this.fileUpload ? await this.updateImg() : "";
        // normal update without img here
        const { s3DrgImg, ...hisObj } = this.his;
        await this.actions.editDrug(hisObj);
        ElMessage.success("編輯藥品成功");
        this.loading = false;
      } catch (e) {
        ElMessage.error("編輯藥品失敗");
        this.loading = false;
      }
    },
    fileChange(e) {
      this.fileUpload = e.target.files[0];
      this.uploadFileName = e.target.files[0].name;
      this.his.imgName = this.uploadFileName;
      this.newImg = URL.createObjectURL(this.fileUpload);
    },
  },
  mounted() {
    this.his = clone(this.global.editItem);
    this.newImg = this.his.s3DrgImg[0].url;
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
</style>
