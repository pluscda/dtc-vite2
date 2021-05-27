<template>
  <div>
    <header class="grid text-white dtc-page-header dtc-page-header-grid button-2">
      <div>編輯藥品廠商</div>
    </header>

    <main class="grid dtc-list-grid">
      <DtxInputGroup prepend="廠商編號" labelWidth="120">
        <el-input v-model="his.vendorId" readonly placeholder="請輸入廠商編號" />
      </DtxInputGroup>
      <DtxInputGroup prepend="廠商名稱" labelWidth="120">
        <el-input v-model="his.name" placeholder="請輸入廠商名稱" />
      </DtxInputGroup>
      <DtxInputGroup prepend="廠商地址" labelWidth="120">
        <el-input v-model="his.address" placeholder="請輸入廠商地址" />
      </DtxInputGroup>
      <DtxInputGroup prepend="廠商電話" labelWidth="120">
        <el-input v-model="his.phone" placeholder="請輸入廠商電話" />
      </DtxInputGroup>
      <DtxInputGroup prepend="廠商聯絡人" labelWidth="120">
        <el-input placeholder="請輸入廠商聯絡人" v-model="his.contact" />
      </DtxInputGroup>
      <DtxInputGroup prepend="統一發票編號" labelWidth="120">
        <el-input v-model="his.taxId" placeholder="請輸入廠商統一發票編號" />
      </DtxInputGroup>
    </main>
    <nav class="w-16 h-16 mt-2 ml-3" v-if="newImg">
      <img :src="newImg" class="object-cover rounded" />
    </nav>
    <footer class="mt-6 mb-4 space-x-4">
      <Button :disabled="loading" label="確認儲存" class="p-button-success footer-btn" @click="subject.next()" />
      <Button label="返回" class="footer-btn" @click="$router.go(-1)" />
      <ProgressSpinner v-if="loading" style="width: 30px; height: 30px" strokeWidth="8" fill="#EEEEEE" animationDuration=".5s"></ProgressSpinner>
    </footer>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import { of, Subject } from "rxjs";
import { exhaustMap, throttleTime } from "rxjs/operators";
import { clone } from "ramda";

let subscribe = "";
export default {
  name: "drugModMaker",
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
        await this.actions.editDrgVendor(this.his);
        ElMessage.success("編輯藥品廠商成功");
        this.showAddNew = true;
      } catch (e) {
        ElMessage.error("編輯藥品廠商失敗!!");
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

.dtc-list-grid,
.dtc-list-grid2 {
  grid-template-columns: repeat(1, 1fr);
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
