<template>
  <div>
    <header class="dtc-page-header dtc-page-header-grid grid text-white">
      <div>新增藥品申領單</div>
    </header>
    <main class="grid dtc-list-grid">
      <DtxInputGroup prepend="申請日期" labelWidth="120">
        <Calendar class="h-10 w-full" v-model="applyTime" placeholder="輸入申請日期" :showIcon="true" dateFormat="yy-mm-dd" />
      </DtxInputGroup>
      <DtxInputGroup prepend="申請單號" labelWidth="120">
        <el-input v-model="input1" placeholder="輸入申請單號" />
      </DtxInputGroup>
      <DtxInputGroup prepend="申請人員" labelWidth="120">
        <el-input v-model="input1" placeholder="輸入申請人員" />
      </DtxInputGroup>
      <DtxInputGroup prepend="申請藥房" labelWidth="120">
        <el-input v-model="input1" placeholder="輸入申請藥房" />
      </DtxInputGroup>
      <DtxInputGroup prepend="健保代碼" labelWidth="120">
        <el-select v-model="isControlledDrug" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in dummyList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="院內代碼" labelWidth="120">
        <el-select v-model="isControlledDrug" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in dummyList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="藥品中文" labelWidth="120">
        <el-input v-model="input1" placeholder="輸入藥品中文" />
      </DtxInputGroup>
      <DtxInputGroup prepend="藥品英文" labelWidth="120">
        <el-input v-model="input1" placeholder="輸入藥品英文" />
      </DtxInputGroup>
      <DtxInputGroup prepend="單位" labelWidth="120">
        <el-input v-model="input1" placeholder="輸入單位" />
      </DtxInputGroup>
      <DtxInputGroup prepend="申請數量" labelWidth="120">
        <el-input v-model="input1" placeholder="輸入申請數量" />
      </DtxInputGroup>
      <DtxInputGroup prepend="撥補數量" labelWidth="120">
        <el-input v-model="input1" placeholder="輸入撥補數量" />
      </DtxInputGroup>
      <DtxInputGroup prepend="撥補人員" labelWidth="120">
        <el-input v-model="input1" placeholder="輸入撥補人員" />
      </DtxInputGroup>
      <DtxInputGroup labelWidth="120" prepend="結案狀態" style="grid-column: span 1; display: grid; grid-template-columns: 120px 1fr; grid-column-gap: 5px">
        <div style="text-align: start">
          <el-radio v-model="healthReport" label="已結案" style="margin: 13px 35px 0px 50px">已結案</el-radio>
          <el-radio v-model="healthReport" label="未結案" style="margin-top: 13px; margin-left: 5px">未結案</el-radio>
        </div>
      </DtxInputGroup>
      <DtxInputGroup prepend="備註" labelWidth="120">
        <el-input v-model="input1" placeholder="輸入備註" />
      </DtxInputGroup>
    </main>

    <footer class="mt-6 mb-4">
      <Button label="確認儲存" class="p-button-success footer-btn" />
    </footer>
  </div>
</template>

<script>
import { ref, inject } from "vue";
let headers = [
  { name: "ID", key: "id", sortDesc: null },
  { name: "建立者", key: "name", sortDesc: null },
  { name: "建立者", key: "name", sortDesc: null },
  { name: "年齡", key: "age", sortDesc: null },
];

export default {
  name: "drugAddNew",
  setup() {
    //allVariable
    const isControlledDrug = ref("121");
    let uploadFileName = ref("");
    const applyTime = ref("");
    //option

    //global
    const global = inject("global");
    //function

    const fileChange = (e) => {
      console.log("----", e.target.files[0]);
      uploadFileName.value = e.target.files[0].name;
    };

    return {
      //allVariable
      isControlledDrug,
      uploadFileName,

      applyTime,
      //function
      fileChange,
    };
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
