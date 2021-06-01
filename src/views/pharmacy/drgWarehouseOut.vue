<template>
  <sction class="grid gap-2 my-2-grid">
    <div class="left">
      <header class="dtc-page-header dtc-page-header-grid grid text-white button-2">
        <div>藥房退庫單申請</div>
      </header>
      <main class="grid dtc-list-grid mt-5">
        <DtxInputGroup prepend="退庫日期" labelWidth="100">
          <Calendar class="h-10 w-full" v-model="his.orderDate" placeholder="請輸入退庫日期" :showIcon="true" dateFormat="yy-mm-dd" />
        </DtxInputGroup>
        <DtxInputGroup prepend="退庫單號" labelWidth="100">
          <el-input v-model="his.pharmacyOrderId" placeholder="請輸入退庫單號" />
        </DtxInputGroup>
        <DtxInputGroup prepend="院內代碼" labelWidth="100">
          <AutoComplete
            class="inline-block border-transparent transform"
            style="width: clamp(100%, 100%, 100%)"
            placeholder="請輸入院內代碼"
            v-model="his.pharmacyId"
            :delay="300"
            :spellcheck="false"
            :suggestions="medIds"
            @complete="searchMedId($event)"
            @item-select="selectedMedId()"
          />
        </DtxInputGroup>
        <DtxInputGroup prepend="退庫人員" labelWidth="100">
          <el-input v-model="his.staff" placeholder="請輸入退庫人員" />
        </DtxInputGroup>
        <DtxInputGroup prepend="退庫數量" labelWidth="100">
          <InputNumber v-model="his.intDrugApplyNum" placeholder="請輸入藥品退庫數量" class="w-full" />
        </DtxInputGroup>
        <DtxInputGroup prepend="健保代碼" labelWidth="100" v-if="his.nhiCode">
          <el-input v-model="his.nhiCode" readonly />
        </DtxInputGroup>
        <DtxInputGroup prepend="中文藥名" labelWidth="100" v-if="his.nhiCode">
          <el-input v-model="his.cname" readonly />
        </DtxInputGroup>
        <DtxInputGroup prepend="英文藥名" labelWidth="100" v-if="his.nhiCode">
          <el-input v-model="his.ename" readonly />
        </DtxInputGroup>
        <DtxInputGroup prepend="藥品劑型" labelWidth="100" v-if="his.nhiCode">
          <el-input v-model="his.dosageFormCode" readonly />
        </DtxInputGroup>
        <DtxInputGroup prepend="藥品單位" labelWidth="100" v-if="his.nhiCode">
          <el-input v-model="his.medicationUnitName" readonly />
        </DtxInputGroup>
        <DtxInputGroup prepend="退庫藥房" labelWidth="100">
          <el-input v-model="his.vendorName" placeholder="請輸入退庫藥房" />
        </DtxInputGroup>
        <DtxInputGroup prepend="退庫備註" labelWidth="100">
          <el-input v-model="his.note" placeholder="請輸入退庫備註" />
        </DtxInputGroup>
      </main>

      <footer class="mt-6 mb-4">
        <Button :disabled="!enabledSave" label="加入藥房退庫單列表" @click="addItem" class="footer-btn" />
      </footer>
    </div>
    <div class="right bg-gray-700">
      <header class="dtc-page-header text-white button-2 flex justify-between pr-2">
        <div>藥房退庫單列表 {{ totalAdded }}</div>
        <Button v-if="items.length" class="p-button-success self-end transform -translate-y-1" @click="subject.next()" style="height: 30px">確定藥房退庫</Button>
      </header>
      <div style="flex: 1" class="rounded-md overflow-y-auto grid my-3-grid px-4 mb-10" v-if="items.length">
        <nav v-for="(item, i) in items" :key="i" class="grid my-car-grid list-none" :class="!i ? 'mt-4' : 'mt-2'">
          <header style="grid-column: 1/-1" class="bg-blueGray-900 relative text-blueGray-100 text-left px-2 py-2 text-lg grid rounded-sm my-header">
            <div>退庫日期: {{ item.chDrgPurchaseId }}</div>
            <div class="transform translate-x-7">退庫單號: {{ item.chDrgPurchaseId }}</div>
            <div></div>
            <Button class="p-button-danger self-end" @click="removeItem(i)">移除</Button>
          </header>
          <li>退庫人員: {{ item.chDrgPurchasePerson }}</li>
          <li>健保代碼: {{ item.chDrgHisId }}</li>
          <li>院內代碼: {{ item.chDrgHospitalId }}</li>
          <li>中文藥名: {{ item.chDrgCnName }}</li>
          <li>英文藥名: {{ item.chDrgEnName }}</li>
          <li>退庫藥房: {{ item.chDrgDoseType }}</li>
          <li>藥品單位: {{ item.chDrgUnitBy }}</li>
          <li class="flex space-x-2">
            <div>退庫數量:</div>
            <InputNumber style="width: 150px" class="transform -translate-y-2" v-model="item.intDrugApplyNum" placeholder="請輸入退庫數量" />
          </li>
          <li>退庫備註: {{ item.chDrgMakerName }}</li>
        </nav>
      </div>
      <div style="flex: 1" class="!bg-gray-900 rounded-md overflow-y-auto text-2xl dtc-text grid place-items-center h-full" v-else>
        <p class="transform -translate-y-14 text-2xl">暫無藥房退庫單,請填寫左邊表格後加入</p>
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
      //const keys = ["quantity", "medicinedId", "nhiCode", "cname", "ename", "dosageFormCode", "medicationUnitName", "vendorName"];
      const keys = [];
      return true;
      //return keys.every((s) => this.his[s]);
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
    async selectedMedId() {
      this.meds = [];
      const obj = await this.actions.getDrgDetail(this.his.pharmacyOrderId);
      this.his.cname = obj.cname;
      this.his.ename = obj.ename;
      this.his.medicationUnitName = obj.medicationUnitName;
      this.his.dosageFormCode = obj.dosageFormCode;
      this.his.nhiCode = obj.nhiCode;
      this.his.quantity = 13;
      if (!this.his.staffId) this.his.staffId = "Adam";
    },
    searchMedId(event) {
      this.med$.next(event);
    },
    confirm() {
      this.loading = true;
      const observer = {
        next: (x) => console.log("Observer got a next value: " + x),
        error: () => ElMessage.error("新增藥房退庫單 Fail"),
        complete: () => {
          ElMessage.success("新增藥房退庫單成功");
          this.items = [];
          this.his.pharmacyOrderId = this.actions.getRandomId();
        },
      };
      const items = this.items.map((s) =>
        Object.assign(
          {
            pharmacyOrderId: s.pharmacyOrderId,
            medicineId: s.medicineId,
            quantity: +s.quantity,
          },
          {
            orderId: s.orderId,
            staffId: s.staffId,
            orderDate: dayjs(s.orderDate).format("YYYY-MM-DD") + "T00:00:00.000Z",
          }
        )
      );
      from(items)
        .pipe(mergeMap((s) => this.actions.addDrgOrderItem(s)))
        .subscribe(observer);
    },
    async getMedIdList(event) {
      if (event?.query?.length > 1) {
        const ret = await this.actions.getTop20MedIds(event.query, "PharmacyStore");
        this.medIds = ret.map((s) => s.seq);
      } else {
        this.medIds = [];
        this.meds = [];
      }
    },
    removeItem(idx) {
      this.items.splice(idx, 1);
    },
    addItem() {
      //this.his.medicinedId = this.his.medicinedId.seq;
      this.items.unshift(clone(this.his));
      const keys = ["quantity", "medicinedId", "nhiCode", "cname", "ename", "dosageFormCode", "medicationUnitName", "vendorName"];
      keys.forEach((s) => {
        this.his[s] = null;
      });
      this.his.orderDate = dayjs().format("YYYY-MM-DD");
    },
  },
  mounted() {
    this.$primevue.config.locale = primeVueDateFormat;
  },
  beforeUnmount() {
    subscribe.unsubscribe();
    subscribe2.unsubscribe();
  },
  created() {
    this.his.orderDate = dayjs().format("YYYY-MM-DD");
    this.his.pharmacyOrderId = this.actions.getRandomId();
    subscribe = this.subject.pipe(throttleTime(3000), exhaustMap(this.confirm)).subscribe(() => (this.loading = false));
    subscribe2 = this.med$
      .pipe(
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
