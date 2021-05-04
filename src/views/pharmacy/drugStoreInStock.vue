<template>
  <section class="management">
    <header class="dtc-page-header grid dtc-page-header__grid pr-2 my-long-header">
      <div>藥房庫存查詢</div>
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

    <header class="my-title relative dtc-grid-grumanagement-header dtc-grid-header dtc-grid-header__divs dtc-template-columns mx-1">
      <div v-for="(item, i) in headers" :key="i" @click="sort(item)" :title="item.name">
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
      <div>{{ item.name || "暫無資料" }}</div>
      <div>{{ item.age || "暫無資料" }}</div>
      <div>{{ item.id || "暫無資料" }}</div>
      <div>{{ item.name || "暫無資料" }}</div>
      <div>{{ item.age || "暫無資料" }}</div>
      <div>{{ item.id || "暫無資料" }}</div>
      <div>{{ item.name || "暫無資料" }}</div>
      <div>{{ item.age || "暫無資料" }}</div>
      <div>{{ item.id || "暫無資料" }}</div>
      <div>{{ item.name || "暫無資料" }}</div>
      <div>{{ item.age || "暫無資料" }}</div>
      <div>{{ item.id || "暫無資料" }}</div>
      <div>{{ item.id || "暫無資料" }}</div>
      <div>{{ item.id || "暫無資料" }}</div>
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
import { pharmacyTab$ } from "/@/store";

let headers = [
  { name: "健保代碼", key: "hisId", sortDesc: null },
  { name: "院內代碼", key: "chHospitalId", sortDesc: null },
  { name: "中文藥名", key: "chDrgCnName", sortDesc: null },
  { name: "英文藥名", key: "chDrgEnName", sortDesc: null },
  { name: "藥品學名", key: "chDrgAlias", sortDesc: null },
  { name: "ATC碼", key: "age", sortDesc: null },
  { name: "新核定價", key: "age", sortDesc: null },
  { name: "自費價格", key: "age", sortDesc: null },
  { name: "生效日期", key: "age", sortDesc: null },
  { name: "庫存上限", key: "age", sortDesc: null },
  { name: "庫存下限", key: "age", sortDesc: null },
  { name: "現有庫存", key: "age", sortDesc: null },
  { name: "儲存位置", key: "age", sortDesc: null },
  { name: "藥商名稱", key: "age", sortDesc: null },
  { name: "藥品分類", key: "age", sortDesc: null },
  { name: "產地", key: "age", sortDesc: null },
];

export default {
  name: "inquerylist",
  components: {
    Pagination,
  },
  setup() {
    const global = inject("global");
    pharmacyTab$.next("0");
    const searchDrugId = ref("");
    const searchDrugName = ref("");

    headers = ref(headers);
    const { state, getList, sort, clearFilters, removeItem, getItemDetail, twTime } = useList("drg-warehouse-request-adds");

    return {
      ...toRefs(state),
      getList,
      headers,
      searchDrugId,
      searchDrugName,
      sort,
      clearFilters,
      removeItem,
      getItemDetail,
      twTime,
    };
  },
  mounted() {
    this.$primevue.config.locale = this.zh;
  },
};
</script>

<style lang="scss" scoped>
.dtc-template-columns {
  width: calc(120px * 16) !important;
  max-width: calc(120px * 16) !important;
  // grid-template-columns: 100px repeat(15, minmax(90px, 1fr));
  grid-template-columns: repeat(16, 120px);
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
