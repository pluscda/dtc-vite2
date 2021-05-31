<template>
  <sction class="grid gap-2 my-2-grid">
    <div class="left">
      <header class="dtc-page-header dtc-page-header-grid grid text-white button-2">
        <div>新增採購單</div>
      </header>
      <main class="grid dtc-list-grid mt-5">
        <DtxInputGroup prepend="採購日期" labelWidth="100">
          <Calendar class="h-10 w-full" :readonly="items.length" v-model="his.orderDate" placeholder="請輸入採購日期" :showIcon="true" dateFormat="yy-mm-dd" />
        </DtxInputGroup>
        <DtxInputGroup prepend="採購單號" labelWidth="100">
          <el-input v-model="his.orderId" :readonly="items.length" placeholder="請輸入採購單號" />
        </DtxInputGroup>
        <DtxInputGroup prepend="院內代碼" labelWidth="100">
          <AutoComplete
            class="inline-block border-transparent transform"
            style="width: clamp(100%, 100%, 100%)"
            placeholder="請輸入院內代碼"
            v-model="his.medicinedId"
            :delay="300"
            :suggestions="medIds"
            @complete="searchMedId($event)"
            @item-select="selectedMedId(item)"
            field="seq"
          />
        </DtxInputGroup>
        <DtxInputGroup prepend="採購數量" labelWidth="100">
          <InputNumber v-model="his.quantity" placeholder="請輸入藥品採購數量" class="w-full" />
          <!-- <el-input v-model="his.intDrugApplyNum" placeholder="請輸入藥品採購數量" /> -->
        </DtxInputGroup>
        <DtxInputGroup prepend="採購人員" labelWidth="100">
          <el-input v-model="his.staffId" placeholder="請輸入採購人員" />
        </DtxInputGroup>
        <DtxInputGroup prepend="健保代碼" labelWidth="100">
          <el-input v-model="his.nhiCode" readonly />
        </DtxInputGroup>
        <DtxInputGroup prepend="中文藥名" labelWidth="100">
          <el-input v-model="his.cname" readonly />
        </DtxInputGroup>
        <DtxInputGroup prepend="英文藥名" labelWidth="100">
          <el-input v-model="his.ename" readonly />
        </DtxInputGroup>
        <DtxInputGroup prepend="藥品劑型" labelWidth="100">
          <el-input v-model="his.dosageFormCode" readonly />
        </DtxInputGroup>
        <DtxInputGroup prepend="藥品單位" labelWidth="100">
          <el-input v-model="his.medicationUnitName" readonly />
        </DtxInputGroup>
        <DtxInputGroup prepend="藥商名稱" labelWidth="100">
          <el-input v-model="his.vendorName" readonly />
        </DtxInputGroup>
      </main>

      <footer class="mt-6 mb-4">
        <Button :disabled="!enabledSave" label="加入採購單列表" @click="addItem" class="footer-btn" />
      </footer>
    </div>
    <div class="right bg-gray-700">
      <header class="dtc-page-header text-white button-2 flex justify-between pr-2">
        <div>採購單列表 {{ totalAdded }}</div>
        <Button v-if="items.length" class="p-button-success self-end transform -translate-y-1" @click="subject.next()" style="height: 30px">確定完成採購</Button>
      </header>
      <div style="flex: 1" class="rounded-md overflow-y-auto grid my-3-grid px-4 mb-10" v-if="items.length">
        <nav v-for="(item, i) in items" :key="i" class="grid my-car-grid list-none" :class="!i ? 'mt-4' : 'mt-2'">
          <header style="grid-column: 1/-1" class="bg-blueGray-900 relative text-blueGray-100 text-left px-2 py-2 text-lg grid rounded-sm my-header">
            <div>採購日期: {{ item.chDrgPurchaseId }}</div>
            <div class="transform translate-x-7">採購單號: {{ item.chDrgPurchaseId }}</div>
            <div></div>
            <Button class="p-button-danger self-end" @click="removeItem(i)">移除</Button>
          </header>
          <li>採購人員: {{ item.staffId }}</li>
          <li>院內代碼: {{ item.medicinedId }}</li>
          <li>健保代碼: {{ item.nhiCode }}</li>
          <li class="flex space-x-2">
            <div>採購數量:</div>
            <InputNumber style="width: 150px" class="transform -translate-y-2" v-model="item.intDrugApplyNum" placeholder="請輸入採購數量" />
          </li>
          <li>中文藥名: {{ item.cname }}</li>
          <li>英文藥名: {{ item.ename }}</li>
          <li>藥品劑型: {{ item.dosageFormCode }}</li>
          <li>藥品單位: {{ item.medicationUnitName }}</li>
          <li>藥商名稱: {{ item.vendorName }}</li>
        </nav>
      </div>
      <div style="flex: 1" class="!bg-gray-900 rounded-md overflow-y-auto text-2xl dtc-text grid place-items-center h-full" v-else>
        <p class="transform -translate-y-14 text-2xl">暫無採購單,請填寫左邊表格後加入</p>
      </div>
      <div class="h-2"></div>
    </div>
  </sction>
</template>

<script>
import { ElMessage } from "element-plus";
import { clone } from "ramda";
import { Subject, from, of } from "rxjs";
import { exhaustMap, throttleTime, mergeMap, distinctUntilChanged, switchMap, catchError, tap } from "rxjs/operators";
import dayjs from "dayjs";
let subscribe = "";
let subscribe2 = "";
export default {
  name: "drugAddNewOrderAdded",
  inject: ["actions"],
  data() {
    return {
      his: {},
      addNewItem: false,
      subject: new Subject(),
      med$: new Subject(),
      loading: false,
      items: [],
      medIds: [],
    };
  },
  computed: {
    enabledSave() {
      const keys = ["orderDate", "orderId", "medicinedId", "quantity", "staffId"];
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
    async selectedMedId(item) {
      const obj = await this.actions.getDrgDetail(this.his.medicinedId.seq);
      this.his.cname = obj.cname;
      this.his.ename = obj.ename;
      this.his.medicationUnitName = obj.medicationUnitName;
      this.his.dosageFormCode = obj.dosageFormCode;
      this.his.nhiCode = obj.nhiCode;
    },
    async getMedIdList(event) {
      if (event?.query?.length > 1) {
        const ret = await this.actions.getTop20MedIds(event.query, "UsualMed");
        this.medIds = ret;
      } else {
        this.medIds = [];
        this.meds = [];
      }
    },
    searchMedId(event) {
      this.med$.next(event);
    },
    confirm() {
      this.loading = true;
      const observer = {
        next: (x) => console.log("Observer got a next value: " + x),
        error: () => ElMessage.error("新增採購單 Fail"),
        complete: () => {
          ElMessage.success("新增採購單成功");
          this.items = [];
        },
      };
      const items = this.items.map((s) =>
        Object.assign(
          {
            pharmacyOrderId: s.orderId,
            medicineId: s.medicineId,
            quantity: +s.quantity,
          },
          {
            orderId: s.orderId,
            staffId: s.staffId,
            orderDate: days(s.orderDate).format("YYY-MM-DDT") + ":00.000Z",
          }
        )
      );
      from(items)
        .pipe(mergeMap((s) => this.actions.addDrgOrderItem(s)))
        .subscribe(observer);
    },
    removeItem(idx) {
      this.items.splice(idx, 1);
    },
    addItem() {
      this.his.medicinedId = this.his.medicinedId.seq;
      this.items.unshift(clone(this.his));
      const keys = ["orderId", "quantity", "medicinedId"];
      keys.forEach((s) => {
        this.his[s] = null;
      });
      this.his.orderId = this.actions.getRandomId();
      this.his.orderDate = dayjs().format("YYYY-MM-DD");
    },
  },
  mounted() {
    this.$primevue.config.locale = primeVueDateFormat;
  },
  beforeMount() {
    subscribe.unsubscribe();
  },
  created() {
    this.his = {};
    this.his.orderDate = dayjs().format("YYYY-MM-DD");
    this.his.orderId = this.actions.getRandomId();
    subscribe = this.subject.pipe(throttleTime(3000), exhaustMap(this.confirm)).subscribe(() => (this.loading = false));
    this.med$
      .pipe(
        //tap((s) => alert(s.query)),
        distinctUntilChanged((pre, cur) => {
          const eq = !!(pre.query === cur.query);
          if (eq) this.meds = [];
          return eq;
        }),
        switchMap(this.getMedIdList),
        catchError((s) => of(""))
      )
      .subscribe();
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
