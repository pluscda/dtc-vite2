<template>
  <section class="management">
    <header class="dtc-page-header grid dtc-page-header__grid pr-2">
      <div>藥房退庫單維護</div>
    </header>
    <nav class="ml-1 dtc-search-filters mt-4" style="margin-bottom: 1.5rem !important">
      <DtxInputGroup prepend="退庫日期">
        <Calendar class="h-10" v-model="time1" placeholder="請輸入日期" :showIcon="true" dateFormat="yy-mm-dd" />
      </DtxInputGroup>
      <div class="mx-1 pt-2 dtc-text">至</div>
      <Calendar class="h-10" v-model="time2" placeholder="請輸入日期" :showIcon="true" dateFormat="yy-mm-dd" />
      <DtxInputGroup prepend="退庫單號">
        <el-input placeholder="搜尋退庫單號" v-model="searchDrugId" />
      </DtxInputGroup>

      <Button label="進行查詢" icon="pi pi-search" />
      <Button label="清除查詢" class="p-button-secondary" icon="pi pi-undo" />
    </nav>
    <nav class="ml-1 dtc-search-filters mt-4" style="margin-bottom: 1.5rem !important">
      <DtxInputGroup prepend="退庫人員">
        <el-input placeholder="搜尋申請人員" v-model="searchDrugName" />
      </DtxInputGroup>

      <DtxInputGroup prepend="訂單狀態">
        <el-select filterable v-model="searchStatus" placeholder="請選擇訂單狀態" class="border-l-0">
          <el-option v-for="item in caseClosedOptions" :key="item.value" :label="item.text" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
    </nav>

    <header class="my-title relative dtc-grid-grumanagement-header dtc-grid-header dtc-grid-header__divs dtc-template-columns mx-1">
      <div v-for="(item, i) in headers" :key="i" @click="sort(headers, item)">
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
      <div>{{ item.pharmacyOrderId || "暫無資料" }}</div>
      <div>{{ item.orderDate?.split("T")[0] || "暫無資料" }}</div>
      <div>{{ item.isClosed ? "已結案" : "未結案" }}</div>
      <div>{{ item.staffId || "暫無資料" }}</div>
      <div><InputNumber v-model="item.quantity" @input="updateQuantity(item)" placeholder="請輸入藥品退庫數量" class="w-full" /></div>
    </main>
    <!-- 分頁 -->
    <pagination v-show="total > 0" :total="total" v-model:page="listQuery.page" v-model:limit="listQuery.limit" @pagination="getList"></pagination>
  </section>
</template>

<script>
import queryString from "qs";
import { ElMessage } from "element-plus";
import { isEmpty } from "ramda";
import { toRefs, ref, inject } from "vue";
import { useRouter } from "vue-router";
import Pagination from "cps/Pagination.vue";
import { useList } from "/@/hooks/useHis.js";
import { pharmacyTab$ } from "/@/store";
import { Subject } from "rxjs";
import { debounceTime, exhaustMap, tap, filter } from "rxjs/operators";

let headers = [
  { name: "退庫單號", key: "pharmacyOrderId", sortDesc: null },
  { name: "退庫日期", key: "orderDate", sortDesc: null },
  { name: "訂單狀態", key: "isClosed", sortDesc: null },
  { name: "退庫人員", key: "staffId", sortDesc: null },
  { name: "退庫數量", key: "quantity", sortDesc: null },
];

const q$ = new Subject();
export default {
  name: "inqueryliststoredrg",
  components: {
    Pagination,
  },
  methods: {
    async update(item) {
      if (!item.quantity) {
        return;
      }
      ElMessage.success("變更藥品退庫數量成功: " + item.pharmacyOrderId);
    },
  },
  setup() {
    const searchHospitalId = ref("");
    const searchDrugName = ref("");
    const searchSci = ref("");
    const searchDrgMaker = ref("");
    const global = inject("global");
    pharmacyTab$.next("0");

    headers = ref(headers);
    const { state, getList, sort, clearFilters, removeItem, getItemDetail } = useList("/med/pharmacyOrder");
    const updateQuantity = (item) => {
      q$.next(item);
    };
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

    return {
      ...toRefs(state),
      getList,
      headers,
      searchHospitalId,
      searchDrugName,
      searchDrgMaker,
      searchSci,
      sort,
      cleanFilter,
      search,
      updateQuantity,
    };
  },
  beforeUnmount() {
    q$.unsubscribe();
  },
  mounted() {
    this.$primevue.config.locale = this.zh;
    q$.pipe(debounceTime(1000), exhaustMap(this.update)).subscribe();
  },
};
</script>

<style lang="scss" scoped>
.dtc-template-columns {
  width: calc(100vw - 162px) !important;
  max-width: calc(100vw - 162px) !important;
  grid-template-columns: repeat(3, minmax(90px, 180px)) 120px 1fr;
}
.management {
  position: relative;
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
