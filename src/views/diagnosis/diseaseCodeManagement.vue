<template>
  <section class="management">
    <header
      class="dtc-page-header grid dtc-page-header__grid pr-2 my-long-header"
    >
      <div>診斷碼管理</div>
    </header>
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
    const {
      state,
      getList,
      sort,
      clearFilters,
      removeItem,
      getItemDetail,
      twTime,
    } = useList("drg-warehouse-request-adds");

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
    };
  },
  mounted() {
    this.$primevue.config.locale = this.zh;
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
