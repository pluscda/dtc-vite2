<template>
  <sction class="grid gap-2 my-2-grid">
    <div class="left">
      <header class="grid text-white dtc-page-header dtc-page-header-grid button-2">
        <div>新增藥品申領單</div>
      </header>
      <main class="grid dtc-list-grid mt-3">
        <DtxInputGroup prepend="申請日期" labelWidth="120">
          <Calendar class="h-10 w-full" v-model="his.tiDrgApplyDate" placeholder="請輸入申請日期" :showIcon="true" dateFormat="yy-mm-dd" />
        </DtxInputGroup>
        <DtxInputGroup prepend="申請單號" labelWidth="120">
          <el-input v-model="his.chDrgApplyId" placeholder="請輸入申請單號" />
        </DtxInputGroup>
        <DtxInputGroup prepend="申請人員" labelWidth="120">
          <el-input v-model="his.chDrgApplyPersonName" placeholder="請輸入申請人員" />
        </DtxInputGroup>
        <DtxInputGroup prepend="申請藥房" labelWidth="120">
          <el-input v-model="his.chDrgApplyStoreName" placeholder="請輸入申請藥房" />
        </DtxInputGroup>
        <DtxInputGroup prepend="健保代碼" labelWidth="120">
          <el-input v-model="his.chDrgHisId" placeholder="請輸入健保代碼" />
        </DtxInputGroup>
        <DtxInputGroup prepend="院內代碼" labelWidth="120">
          <el-input v-model="his.chDrgHospitalId" placeholder="請輸入院內代碼" />
        </DtxInputGroup>
        <DtxInputGroup prepend="中文藥名" labelWidth="120">
          <el-input v-model="his.chDrgCnName" placeholder="請輸入中文藥名" />
        </DtxInputGroup>
        <DtxInputGroup prepend="英文藥名" labelWidth="120">
          <el-input v-model="his.chDrgEnName" placeholder="請輸入英文藥名" />
        </DtxInputGroup>
        <DtxInputGroup prepend="藥品單位" labelWidth="120">
          <el-input v-model="his.chDrgUnitBy" placeholder="請輸入藥品單位" />
        </DtxInputGroup>
        <DtxInputGroup prepend="申請數量" labelWidth="120">
          <InputNumber class="w-full" v-model="his.intDrgApplyNum" placeholder="請輸入申請數量" />
        </DtxInputGroup>
        <DtxInputGroup prepend="申領備註" labelWidth="120">
          <el-input v-model="his.chDrgNote" placeholder="請輸入申領備註" />
        </DtxInputGroup>
      </main>

      <footer class="mt-6 mb-4 space-x-6">
        <Button :disabled="!enabledSave" label="加入申領單" class="footer-btn" @click="addItem" />
      </footer>
    </div>
    <div class="right bg-gray-700">
      <header class="dtc-page-header text-white button-2 flex justify-between pr-2">
        <div>申領單列表 {{ totalAdded }}</div>
        <Button v-if="items.length" class="self-end transform -translate-y-1" @click="subject.next()" style="height: 30px">確定完成申領單</Button>
      </header>
      <div style="flex: 1" class="rounded-md overflow-y-auto grid my-3-grid px-4 mb-10" v-if="items.length">
        <nav v-for="(item, i) in items" :key="i" class="grid my-car-grid list-none" :class="!i ? 'mt-4' : 'mt-2'">
          <header style="grid-column: 1/-1" class="bg-blueGray-900 relative text-blueGray-100 text-left px-2 py-2 text-lg grid rounded-sm my-header">
            <div>申請日期: {{ "暫無資料" }}</div>
            <div class="transform translate-x-7">申請單號: {{ item.chDrgApplyId }}</div>
            <div>申請人員:{{ item.chDrgApplyPersonName }}</div>
            <Button class="p-button-danger self-end" @click="removeItem(i)">移除</Button>
          </header>
          <li>健保代碼: {{ item.chDrgHisId }}</li>
          <li>院內代碼: {{ item.chDrgHospitalId }}</li>
          <li>申請藥房: {{ item.chDrgApplyPersonName }}</li>
          <li>中文藥名: {{ item.chDrgCnName }}</li>
          <li>英文藥名: {{ item.chDrgEnName }}</li>
          <li>藥品單位: {{ item.chDrgUnitBy }}</li>
          <li class="flex space-x-2">
            <div>申請數量:</div>
            <InputNumber style="width: 150px" class="transform -translate-y-2" v-model="item.intDrgApplyNum" placeholder="請輸入申請數量" />
          </li>
        </nav>
      </div>
      <div style="flex: 1" class="!bg-gray-900 rounded-md overflow-y-auto text-2xl dtc-text grid place-items-center h-full" v-else>
        <p class="transform -translate-y-14 text-2xl">暫無申領單,請填寫左邊表格後加入</p>
      </div>
      <div class="h-2"></div>
    </div>
  </sction>
</template>

<script>
import { ElMessage } from "element-plus";
import { clone } from "ramda";
import { Subject, from } from "rxjs";
import { exhaustMap, throttleTime, mergeMap } from "rxjs/operators";
import dayjs from "dayjs";

let subscribe = "";
export default {
  name: "dtcadddrkkdkname",
  inject: ["actions"],
  data() {
    return {
      his: {},
      subject: new Subject(),
      loading: false,
      items: [],
    };
  },
  computed: {
    enabledSave() {
      const keys = [
        "tiDrgApplyDate",
        "chDrgApplyId",
        "chDrgApplyPersonName",
        "chDrgApplyStoreName",
        "chDrgHisId",
        "chDrgHospitalId",
        "chDrgCnName",
        "chDrgEnName",
        "chDrgUnitBy",
        "intDrgApplyNum",
        "intDrgCatchNum",
        "chDrgCatchPerson",
      ];
      return keys.every((s) => this.his[s]);
    },
    totalAdded() {
      let str = "";
      if (this.items.length) {
        str += `(共${this.items.length}筆)`;
      }
      return str;
    },
  },

  methods: {
    confirm() {
      this.loading = true;
      const observer = {
        next: (x) => console.log("Observer got a next value: " + x),
        error: () => ElMessage.error("新增藥品申領單 Fail"),
        complete: () => {
          ElMessage.success("新增藥品申領單成功");
          this.items = [];
        },
      };
      from(this.items)
        .pipe(mergeMap((s) => this.actions.addItem("drg-warehouse-request-adds", s)))
        .subscribe(observer);
    },
    removeItem(idx) {
      this.items.splice(idx, 1);
    },
    addItem() {
      this.items.unshift(clone(this.his));
      const keys = ["chDrgApplyStoreName", "chDrgCnName", "chDrgEnName", "chDrgUnitBy", "intDrgApplyNum", "intDrgCatchNum", "chDrgCatchPerson", "chDrgNote"];
      keys.forEach((s) => {
        this.his[s] = null;
      });
      this.his.tiDrgApplyDate = dayjs().format("YYYY-MM-DD");
    },
  },
  created() {
    this.his = {};
    this.his.tiDrgApplyDate = dayjs().format("YYYY-MM-DD");
    subscribe = this.subject.pipe(throttleTime(3000), exhaustMap(this.confirm)).subscribe(() => (this.loading = false));
    this.$primevue.config.locale = primeVueDateFormat;
  },

  beforeUnmount() {
    subscribe.unsubscribe();
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
.my-2-grid {
  grid-template-columns: 380px 1fr;
}
.my-car-grid {
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 40px;
  height: 160px;
  gap: 10px;
  > li {
    color: var(--light);
    text-align: left;
    padding-left: 10px;
  }
  border: 1px solid #64748b;
  border-radius: 10px;
}
.my-header {
  grid-template-columns: repeat(3, 1fr) max-content;
  button {
    height: 30px;
    transform: translateY(-3px);
  }
}
</style>
