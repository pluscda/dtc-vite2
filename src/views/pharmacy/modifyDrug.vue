<template>
  <div>
    <header class="dtc-page-header dtc-page-header-grid grid text-white">
      <div>編輯藥品資料</div>
    </header>
    <h1 class="my-3 drgu-add-title dtc-text">藥品資料</h1>
    <main class="grid dtc-list-grid">
      <DtxInputGroup prepend="衛統編號" labelWidth="120">
        <el-input v-model="his.hisId" placeholder="輸入衛統編號" />
      </DtxInputGroup>
      <DtxInputGroup prepend="庫存上限" labelWidth="120">
        <el-input v-model="his.stockMax" placeholder="輸入庫存上限" />
      </DtxInputGroup>
      <DtxInputGroup prepend="庫存下限" labelWidth="120">
        <el-input v-model="his.stockMin" placeholder="輸入庫存下限" />
      </DtxInputGroup>
      <DtxInputGroup prepend="皮試標誌" labelWidth="120">
        <el-input placeholder="輸入皮試標誌" v-model="his.skinMark" />
      </DtxInputGroup>
      <DtxInputGroup prepend="藥品編號" labelWidth="120">
        <el-input v-model="his.drugId" placeholder="輸入藥品編號" />
      </DtxInputGroup>
      <DtxInputGroup prepend="是否為管制藥" labelWidth="120">
        <el-select v-model="his.underControl" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in yesNoOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="藥品名稱" labelWidth="120">
        <el-input v-model="his.drugName" placeholder="輸入藥品名稱" />
      </DtxInputGroup>
      <DtxInputGroup prepend="產地" labelWidth="120">
        <el-input v-model="his.countryFrom" placeholder="輸入產地" />
      </DtxInputGroup>
      <DtxInputGroup prepend="絕對禁忌" labelWidth="120">
        <el-input v-model="his.tabu" placeholder="輸入絕對禁忌" />
      </DtxInputGroup>
      <DtxInputGroup prepend="學名" labelWidth="120">
        <el-input v-model="his.drugAlias" placeholder="輸入學名" />
      </DtxInputGroup>
      <DtxInputGroup prepend="廠商" labelWidth="120">
        <el-input v-model="his.maker" placeholder="輸入廠商" />
      </DtxInputGroup>
      <DtxInputGroup prepend="醫保等級" labelWidth="120">
        <el-input v-model="his.insuranceLevael" placeholder="輸入醫保等級" />
      </DtxInputGroup>
      <DtxInputGroup prepend="劑量" labelWidth="120">
        <el-input v-model="his.drugDose" placeholder="輸入劑量" />
      </DtxInputGroup>
      <DtxInputGroup prepend="藥品類型" labelWidth="120">
        <el-input v-model="his.drugCate" placeholder="輸入藥品類型" />
      </DtxInputGroup>
      <DtxInputGroup prepend="給藥方式" labelWidth="120">
        <el-input v-model="his.giveDrugBy" placeholder="輸入給藥方式" />
      </DtxInputGroup>
      <DtxInputGroup prepend="類別" labelWidth="120">
        <el-input v-model="his.drugType" placeholder="輸入類別" />
      </DtxInputGroup>
      <DtxInputGroup prepend="適應症狀1" labelWidth="120">
        <el-input v-model="his.adpot1" placeholder="輸入適應症狀1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="適應症狀2" labelWidth="120">
        <el-input v-model="his.adpot2" placeholder="輸入適應症狀2" />
      </DtxInputGroup>
      <DtxInputGroup prepend="煎藥方式" labelWidth="120">
        <el-input v-model="his.cookDrugBy" placeholder="輸入煎藥方式" />
      </DtxInputGroup>
      <DtxInputGroup prepend="用藥單位" labelWidth="120">
        <el-input v-model="his.drugUnit" placeholder="輸入用藥單位" />
      </DtxInputGroup>

      <DtxInputGroup prepend="規格" labelWidth="120">
        <el-input v-model="his.drugStandard" placeholder="輸入規格" />
      </DtxInputGroup>
      <DtxInputGroup prepend="收費項目" labelWidth="120">
        <el-input v-model="his.chargeCate" placeholder="輸入收費項目" />
      </DtxInputGroup>

      <DtxInputGroup prepend="進價" labelWidth="120">
        <el-input v-model="his.buyPrice" placeholder="輸入進價" />
      </DtxInputGroup>
      <DtxInputGroup prepend="抗生素藥物" labelWidth="120">
        <el-input v-model="his.antiBioDrug" placeholder="輸入抗生素藥物" />
      </DtxInputGroup>

      <DtxInputGroup prepend="售價" labelWidth="120">
        <el-input v-model="his.sellPrice" placeholder="輸入售價" />
      </DtxInputGroup>
      <DtxInputGroup prepend="抗生素等級" labelWidth="120">
        <el-input v-model="his.antiDrugLevel" placeholder="輸入抗生素等級" />
      </DtxInputGroup>
    </main>
    <h1 class="my-3 drgu-add-title dtc-text">藥理資料</h1>
    <main class="grid dtc-list-grid2">
      <DtxInputGroup prepend="警語(副作用)" labelWidth="120">
        <el-input v-model="his.warning" placeholder="輸入警語(副作用)" />
      </DtxInputGroup>
      <DtxInputGroup prepend="用前注意" labelWidth="120">
        <el-input v-model="his.presteps" placeholder="輸入用前注意" />
      </DtxInputGroup>
      <DtxInputGroup prepend="不良反應" labelWidth="120">
        <el-input v-model="his.badreact" placeholder="輸入不良反應" />
      </DtxInputGroup>
      <DtxInputGroup prepend="儲存條件" labelWidth="120">
        <el-input v-model="his.storeBy" placeholder="輸入儲存條件" />
      </DtxInputGroup>
      <div class="dtc-grid-fileupload dtc-text">
        <DtxInputGroup prepend="圖片名稱" labelWidth="120">
          <el-input v-model="his.imgName" placeholder="輸入圖片名稱" />
        </DtxInputGroup>
        <label for="file-upload" class="custom-file-upload">
          <i-ri:upload-cloud-fill style="font-size: 24px"></i-ri:upload-cloud-fill>
          <div>Upload Image File</div>
          <input id="file-upload" type="file" @change="fileChange" />
        </label>

        <div style="padding-top: 6px">
          {{ uploadFileName }}
        </div>
      </div>
    </main>
    <nav class="w-36 h-36 mt-2 ml-3">
      <img src="//unsplash.it/500/500" class="object-cover rounded" />
    </nav>

    <footer class="mt-6 mb-4 space-x-4">
      <Button label="確認儲存" class="p-button-rounded p-button-success footer-btn" @click="saveItem" />
      <Button label="返回列表" @click="$router.push('/pharmacy')" class="p-button-rounded p-button-info footer-btn" style="margin-right: 20px" />
    </footer>
  </div>
</template>

<script>
import { ref, inject } from "vue";
import { clone } from "ramda";

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
    };
  },
  methods: {
    async saveItem() {
      //https://strapi.io/documentation/developer-docs/latest/development/plugins/upload.html#upload-files-related-to-an-entry
      const formData = new FormData();
      formData.append("files.drugImg", this.fileUpload, this.his.imgName);
      formData.append("data", JSON.stringify(this.his));
      const ret = await this.actions.editDrug(formData);
    },
    fileChange(e) {
      this.fileUpload = e.target.files[0];
      this.uploadFileName = e.target.files[0].name;
      this.his.imgName = this.uploadFileName;
    },
  },
  mounted() {
    this.his = clone(this.global.editItem);
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
