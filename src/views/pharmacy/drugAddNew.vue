<template>
  <div>
    <header class="dtc-page-header dtc-page-header-grid grid text-white button-2">
      <div>新增藥品資料/藥理資料</div>
      <Button label="再次新增" style="margin: 4px 0" @click="reset" v-show="showAddNew" class="p-button-rounded p-button-warning" />
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
      <Button :disabled="!his.imgName || loading" label="確認儲存" v-if="!showAddNew" class="p-button-rounded p-button-success footer-btn" @click="subject.next()" />
      <ProgressSpinner v-if="loading" style="width: 30px; height: 30px" strokeWidth="8" fill="#EEEEEE" animationDuration=".5s"></ProgressSpinner>
    </footer>
  </div>
</template>

<script>
import { ref, inject } from "vue";
import { ElMessage } from "element-plus";
import { forkJoin, of, Subject } from "rxjs";
import { catchError, exhaustMap, takeUntil, throttleTime } from "rxjs/operators";

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
    };
  },
  methods: {
    reset() {
      this.his = {};
      this.showAddNew = false;
    },
    async saveItem() {
      //https://strapi.io/documentation/developer-docs/latest/development/plugins/upload.html#upload
      this.loading = true;
      const formData = new FormData();
      formData.append("files.drugImg", this.fileUpload, this.his.imgName);
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
      this.his.imgName = this.uploadFileName;
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
