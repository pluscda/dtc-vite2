<template>
  <div>
    <header class="grid text-white dtc-page-header dtc-page-header-grid button-2">
      <div>編輯藥房資料</div>
    </header>

    <main class="grid px-3 mt-4 space-y-4">
      <DtxInputGroup prepend="藥房編號" labelWidth="120">
        <el-input v-model="his.pharmacyId" readonly placeholder="請輸入藥房編號" />
      </DtxInputGroup>
      <DtxInputGroup prepend="藥房名稱" labelWidth="120">
        <el-input v-model="his.cname" placeholder="請輸入藥房名稱" />
      </DtxInputGroup>
      <DtxInputGroup prepend="藥房位置" labelWidth="120">
        <el-input style="min-width: 500px" v-model="his.place" placeholder="請輸入藥房位置" />
      </DtxInputGroup>
    </main>
    <nav class="w-16 h-16 mt-2 ml-3" v-if="newImg">
      <img :src="newImg" class="object-cover rounded" />
    </nav>
    <footer class="mt-6 mb-4 space-x-10">
      <Button :disabled="loading" label="確認儲存" class="p-button-success footer-btn" @click="subject.next()" />
      <Button label="返回" class="footer-btn" @click="$router.go(-1)" />
      <ProgressSpinner v-if="loading" style="width: 30px; height: 30px" strokeWidth="8" fill="#EEEEEE" animationDuration=".5s"></ProgressSpinner>
    </footer>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import { Subject } from "rxjs";
import { exhaustMap, throttleTime } from "rxjs/operators";
import { clone } from "ramda";

let subscribe = "";
export default {
  name: "drugModMakerStore2",
  inject: ["actions", "global"],
  data() {
    return {
      his: {},
      showAddNew: false,
      subject: new Subject(),
      loading: false,
    };
  },
  methods: {
    async editItem() {
      this.loading = true;
      try {
        await this.actions.editPharmacyStore(this.his);
        ElMessage.success("編輯藥房資料成功");
        this.showAddNew = true;
      } catch (e) {
        ElMessage.error("編輯藥房資料失敗!!");
        this.loading = false;
      }
    },
  },
  created() {
    this.his = clone(this.global.editItem);
    subscribe = this.subject.pipe(throttleTime(3000), exhaustMap(this.editItem)).subscribe(() => (this.loading = false));
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
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  padding: 6px;
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
