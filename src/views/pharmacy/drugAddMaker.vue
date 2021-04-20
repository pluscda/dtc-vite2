<template>
  <div>
    <header class="grid text-white dtc-page-header dtc-page-header-grid button-2">
      <div>新增藥品廠商</div>
      <Button label="再次新增藥品廠商" style="margin: 4px 0" @click="reset" v-show="showAddNew" class="p-button-rounded p-button-info" />
    </header>

    <main class="grid dtc-list-grid">
      <DtxInputGroup prepend="廠商編號" labelWidth="120">
        <el-input v-model="his.hisId" placeholder="輸入廠商編號" />
      </DtxInputGroup>
      <DtxInputGroup prepend="廠商名稱" labelWidth="120">
        <el-input v-model="his.stockMax" placeholder="輸入廠商名稱" />
      </DtxInputGroup>
      <DtxInputGroup prepend="聯絡人" labelWidth="120">
        <el-input v-model="his.stockMin" placeholder="輸入聯絡人" />
      </DtxInputGroup>
      <DtxInputGroup prepend="聯絡地址" labelWidth="120">
        <el-input v-model="his.stockMin" placeholder="輸入聯絡地址" />
      </DtxInputGroup>
      <DtxInputGroup prepend="聯絡電話" labelWidth="120">
        <el-input placeholder="輸入電話" v-model="his.skinMark" />
      </DtxInputGroup>
      <DtxInputGroup prepend="統一發票號碼" labelWidth="120">
        <el-input v-model="his.drugId" placeholder="輸入藥統一發票號碼" />
      </DtxInputGroup>
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
  padding: 6px;
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
