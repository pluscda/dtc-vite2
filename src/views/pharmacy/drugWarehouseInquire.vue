<template>
  <section class="management">
    <header class="dtc-page-header grid dtc-page-header__grid pr-2 my-long-header">
      <div>庫存查詢作業</div>
    </header>
    <nav class="ml-1 dtc-search-filters mt-4" style="margin-bottom: 1.5rem !important">
      <DtxInputGroup prepend="藥品編號">
        <el-input placeholder="搜尋藥品編號" v-model="searchDrugId" />
      </DtxInputGroup>
      <DtxInputGroup prepend="藥品名稱">
        <el-input placeholder="搜尋藥品名稱" v-model="searchDrugName" />
      </DtxInputGroup>
      <DtxInputGroup prepend="藥商名稱">
        <el-input placeholder="搜尋藥商名稱" v-model="searchDrgMaker" />
      </DtxInputGroup>
      <DtxInputGroup prepend="現有庫存">
        <el-input placeholder="搜尋現有庫存" v-model="searchDrgMaker" />
      </DtxInputGroup>

      <Button label="進行查詢" icon="pi pi-search" />
      <Button label="清除查詢" class="p-button-secondary" icon="pi pi-undo" />
    </nav>

    <header data-msg="註1:低於安全存量轉採購單" class="my-title relative dtc-grid-grumanagement-header dtc-grid-header dtc-grid-header__divs dtc-template-columns mx-1">
      <div title="" class="title-word1">採購單(註1)</div>
      <div v-for="(item, i) in headers" :key="i" @click="sort(headers, item)" :title="item.name">
        {{ item.name }}
        <span v-show="item.sortDesc === null">
          <i-typcn:arrow-unsorted></i-typcn:arrow-unsorted>
        </span>
        <span v-show="item.sortDesc === false">
          <i-typcn:arrow-sorted-down></i-typcn:arrow-sorted-down>
        </span>
        <span v-show="item.sortDesc">
          <i-typcn:arrow-sorted-up></i-typcn:arrow-sorted-up>
        </span>
      </div>
    </header>
    <main
      class="dtc-grid-header dtc-grid-body dtc-template-columns text-black ml-1 mx-1"
      v-for="(item, i) in list"
      :key="i"
      :style="i % 2 == 0 ? 'background-color: #F5F5F5;' : 'background-color: #E0E0E0;'"
    >
      <div>
        <InputSwitch class="transform translate-y-1.5" v-model="item.review" size="small" @click.stop="toggleDetail(item)"></InputSwitch>
      </div>
      <div><el-input placeholder="請輸入" v-model="item.upperLimit" @input="change(item)" min="0" type="number" /></div>
      <div><el-input placeholder="請輸入" v-model="item.lowerLimit" @input="change(item)" min="0" type="number" /></div>
      <div>{{ item.nhiCode || "暫無資料" }}</div>
      <div>{{ item.medicineId || "暫無資料" }}</div>
      <div :title="item.medCname">{{ item.medCname || "暫無資料" }}</div>
      <div :title="item.medEname">{{ item.medEname || "暫無資料" }}</div>
      <div>{{ item.scientificName || "暫無資料" }}</div>
      <div>{{ item.atcCode || "暫無資料" }}</div>
      <div>{{ item.newPrice || "暫無資料" }}</div>
      <div>{{ item.selfPrice || "暫無資料" }}</div>
      <div>{{ item.effectiveDate?.split("T")[0] || "暫無資料" }}</div>

      <div>{{ item.id || "暫無資料" }}</div>
      <div>{{ item.id || "暫無資料" }}</div>
      <div :title="item.vendorName">{{ item.vendorName || "暫無資料" }}</div>
      <div>{{ item.id || "暫無資料" }}</div>
      <div>{{ item.id || "暫無資料" }}</div>
    </main>
    <!-- 分頁 -->
    <pagination v-show="total > 0" :total="total" v-model:page="listQuery.page" v-model:limit="listQuery.limit" @pagination="getList"></pagination>
  </section>
</template>

<script>
import { toRefs, ref, inject, computed } from "vue";
import Pagination from "cps/Pagination.vue";
import { useList } from "/@/hooks/useHis.js";
import { ElMessage } from "element-plus";
import { Subject } from "rxjs";
import { debounceTime, exhaustMap } from "rxjs/operators";

let headers = [
  { name: "庫存上限", key: "upperLimit", sortDesc: null },
  { name: "庫存下限", key: "lowerLimit", sortDesc: null },
  { name: "中文藥名", key: "medCname", sortDesc: null },
  { name: "英文藥名", key: "medEname", sortDesc: null },
  { name: "藥品學名", key: "scientificName", sortDesc: null },
  { name: "ATC碼", key: "atcCode", sortDesc: null },
  { name: "新核定價", key: "newPrice", sortDesc: null },
  { name: "自費價格", key: "selfPay", sortDesc: null },
  { name: "生效日期", key: "effectiveDate", sortDesc: null },
  { name: "健保代碼", key: "nhiCode", sortDesc: null },
  { name: "院內代碼", key: "medicineId", sortDesc: null },
  { name: "現有庫存", key: "age", sortDesc: null },
  { name: "儲存位置", key: "age", sortDesc: null },
  { name: "藥商名稱", key: "vendorName", sortDesc: null },
  { name: "藥品分類", key: "age", sortDesc: null },
  { name: "產地", key: "age", sortDesc: null },
];

export default {
  name: "inquerylist",
  components: {
    Pagination,
  },
  inject: ["actions"],
  data() {
    return {
      subject$: new Subject(),
    };
  },
  methods: {
    change(item) {
      this.subject$.next(item);
    },
    async update(item) {
      if (!item.upperLimit || item.lowerLimit < 0) return;
      if (item.lowerLimit > item.upperLimit) return;
      try {
        await this.actions.editDrgStock(item);
        ElMessage.success("修改成功: " + item.medicineId);
      } catch (e) {
        alert(e);
      }
      return;
    },
  },
  setup() {
    const global = inject("global");
    const searchDrugId = ref("");
    const searchDrugName = ref("");
    headers = ref(headers);
    const { state, getList, sort, clearFilters, removeItem, getItemDetail, twTime } = useList("/med/medStock");
    const cleanFilter = () => {
      searchHospitalId.value = searchDrugName.value = searchDrgMaker.value = "";
      clearFilters();
    };
    const search = () => {
      let filters = {};
      if (searchHospitalId.value) {
        filters.medicineId = searchHospitalId.value;
      }
      if (searchDrugName.value) {
        filters.name = searchDrugName.value;
      }
      if (searchSci.value) {
        filters.scientificName = searchSci.value;
      }
      if (searchDrgMaker.value) {
        filters.vendorName = searchDrgMaker.value;
      }
      filters = isEmpty(filters) ? "" : queryString.stringify(filters);
      state.listQuery.filter = filters;
      getList();
    };

    const toggleDetail = (item) => {
      const review = item.review;
      state.list.forEach((s) => (s.review = false));
      item.review = !review;
    };

    return {
      ...toRefs(state),
      getList,
      headers,
      searchDrugId,
      searchDrugName,
      toggleDetail,
      sort,
      clearFilters,
      removeItem,
      getItemDetail,
      twTime,
      cleanFilter,
      search,
    };
  },
  beforeUnmount() {
    this.subject$.unsubscribe();
  },
  mounted() {
    //this.$primevue.config.locale =
    this.subject$.pipe(debounceTime(1000), exhaustMap(this.update)).subscribe();
  },
};
</script>

<style lang="scss" scoped>
.dtc-template-columns {
  width: calc(103px + 120px * 16) !important;
  max-width: calc(103px + 120px * 16) !important;
  // grid-template-columns: 100px repeat(15, minmax(90px, 1fr));
  grid-template-columns: 100px repeat(16, 120px);
}
#app .management {
  position: relative;
  overflow-y: auto !important;
  .comment {
    position: absolute;
    bottom: 70px;
    left: 0;
  }
}
.my-title::before {
  content: attr(data-msg);
  position: absolute;
  top: -20px;
  left: -20px;
  width: 210px;
  font-size: 13px;
}
</style>
