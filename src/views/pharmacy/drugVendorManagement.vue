<template>
  <section class="management">
    <header class="dtc-page-header grid dtc-page-header__grid pr-2">
      <div>藥品廠商維護</div>
    </header>
    <nav class="ml-1 dtc-search-filters mt-4" style="margin-bottom: 1.5rem !important">
      <DtxInputGroup prepend="廠商編號">
        <el-input placeholder="搜尋廠商編號" v-model="searchDrugId" />
      </DtxInputGroup>
      <DtxInputGroup prepend="廠商名稱">
        <el-input placeholder="搜尋廠商名稱" v-model="searchDrugName" />
      </DtxInputGroup>
      <Button label="進行查詢" icon="pi pi-search" />
      <Button label="清除查詢" class="p-button-secondary" icon="pi pi-undo" />
    </nav>

    <header class="my-title relative dtc-grid-grumanagement-header dtc-grid-header dtc-grid-header__divs dtc-template-columns mx-1">
      <div>操作</div>
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
      <div class="flex flex-none space-x-2">
        <Button label="編輯" class="p-button-sm" />
        <Button label="刪除" class="p-button-sm p-button-warning" />
      </div>

      <div>{{ item.chDrgMakerId || "暫無資料" }}</div>
      <div>{{ item.chDrgMakerName || "暫無資料" }}</div>
      <div>{{ item.chDrgMakerAddress || "暫無資料" }}</div>
      <div>{{ item.chDrgMakerPhone || "暫無資料" }}</div>
      <div>{{ item.chDrgMakerContactPerson || "暫無資料" }}</div>
      <div>{{ item.chDrgMakerBusinessId || "暫無資料" }}</div>
    </main>
    <!-- 分頁 -->
    <pagination v-show="total > 0" :total="total" v-model:page="listQuery.page" v-model:limit="listQuery.limit" @pagination="getList"></pagination>
  </section>
</template>

<script>
import { toRefs, ref, inject, computed } from "vue";
import Pagination from "cps/Pagination.vue";
import { useList } from "/@/hooks/useHis.js";
//身分證號
let headers = [
  { name: "廠商編號", key: "chDrgMakerId", sortDesc: null },
  { name: "廠商名稱", key: "chDrgMakerName", sortDesc: null },
  { name: "廠商地址", key: "chDrgMakerAddress", sortDesc: null },
  { name: "廠商聯絡人", key: "chDrgMakerPhone ", sortDesc: null },
  { name: "廠商電話", key: "chDrgMakerContactPerson", sortDesc: null },
  { name: "統一發票號碼", key: "hDrgMakerBusinessId", sortDesc: null },
];

export default {
  name: "drg-add-makers-list",
  components: {
    Pagination,
  },
  setup() {
    //global
    const global = inject("global");
    //搜尋變數
    const searchDrugId = ref("");
    const searchDrugName = ref("");
    // 列表數據
    headers = ref(headers);
    const { state, getList, sort, clearFilters, removeItem, getItemDetail } = useList("drg-add-makers");

    return {
      ...toRefs(state),
      getList,
      sort,
      clearFilters,
      removeItem,
      getItemDetail,
      headers,
      searchDrugId,
      searchDrugName,
    };
  },
  mounted() {
    this.$primevue.config.locale = this.zh;
  },
};
</script>

<style lang="scss" scoped>
.dtc-template-columns {
  width: calc(100vw - 162px) !important;
  max-width: calc(100vw - 162px) !important;
  grid-template-columns: 100px repeat(6, minmax(90px, 1fr));
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
