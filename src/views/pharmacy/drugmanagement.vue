<template>
  <section class="management">
    <header class="dtc-page-header grid dtc-page-header__grid pr-2">
      <div>藥品資料維護</div>
    </header>
    <nav class="ml-1 dtc-search-filters mt-4" style="margin-bottom: 1.5rem !important">
      <DtxInputGroup prepend="院內代碼">
        <el-input placeholder="搜尋院內代碼" v-model="searchHospitalId" />
      </DtxInputGroup>
      <DtxInputGroup prepend="藥品名稱">
        <el-input placeholder="搜尋藥品名稱" v-model="searchDrugName" />
      </DtxInputGroup>
      <DtxInputGroup prepend="藥品學名" hidden>
        <el-input placeholder="搜尋藥品學名" v-model="searchDrugName" />
      </DtxInputGroup>
      <DtxInputGroup prepend="藥商名稱">
        <el-input placeholder="搜尋藥商名稱" v-model="searchDrgMaker" />
      </DtxInputGroup>
      <Button label="進行查詢" icon="pi pi-search" @click="search" />
      <Button label="清除查詢" class="p-button-secondary" icon="pi pi-undo" @click="cleanFilter" />
    </nav>

    <header data-msg="" class="my-title relative dtc-grid-grumanagement-header dtc-grid-header dtc-grid-header__divs dtc-template-columns mx-1">
      <!-- <div title="" class="title-word1">採購單(註1)</div> -->
      <div>操作</div>
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
      <div class="flex flex-none space-x-2">
        <Button label="編輯" class="p-button-sm" @click.stop="editItem(item)" />
        <el-popconfirm title="確定刪除嗎？" confirmButtonText="好的" cancelButtonText="不用了" @confirm="removeItem(item)">
          <template #reference>
            <Button label="刪除" class="p-button-sm p-button-warning" />
          </template>
        </el-popconfirm>
      </div>

      <div>{{ item.hisId || "暫無資料" }}</div>
      <div>{{ item.chHospitalId || "暫無資料" }}</div>

      <div :title="item.chDrgEnName">{{ item.chDrgEnName || "暫無資料" }}</div>
      <div>{{ item.chDrgUnit || "暫無資料" }}</div>
      <div>{{ item.chDrgStandard || "暫無資料" }}</div>
      <div>{{ item.rlDrgOriginalPrice || "暫無資料" }}</div>
      <div>{{ item.rlDrgNewPrice || "暫無資料" }}</div>
      <div :title="item.chDrgMakerName">{{ item.chDrgMakerName || "暫無資料" }}</div>
      <div>{{ item.intDrgStockMax || "暫無資料" }}</div>
      <div>{{ item.intDrgStockMin || "暫無資料" }}</div>
      <div>{{ item.chDrgCountryFrom || "暫無資料" }}</div>
      <div>{{ item.chDrgDoseType || "暫無資料" }}</div>
      <div>{{ item.chDrgChargeBy || "暫無資料" }}</div>
    </main>
    <!-- 分頁 -->
    <pagination v-show="total > 0" :total="total" v-model:page="listQuery.page" v-model:limit="listQuery.limit" @pagination="getList"></pagination>
  </section>
</template>

<script>
import queryString from "qs";
import { isEmpty } from "ramda";
import { toRefs, ref, inject } from "vue";
import { useRouter } from "vue-router";
import Pagination from "cps/Pagination.vue";
import { useList } from "/@/hooks/useHis.js";
import { pharmacyTab$ } from "/@/store";

//身分證號
let headers = [
  { name: "健保代碼", key: "hisId", sortDesc: null },
  { name: "院內代碼", key: "chHospitalId", sortDesc: null },
  { name: "藥品名稱", key: "chDrgEnName", sortDesc: null },
  { name: "用藥單位", key: "chDrgUnit", sortDesc: null },
  { name: "規格", key: "chDrgStandard", sortDesc: null },
  { name: "原核定價", key: "rlDrgOriginalPrice", sortDesc: null },
  { name: "新核定價", key: "rlDrgNewPrice", sortDesc: null },
  { name: "藥商名稱", key: "chDrgMakerName", sortDesc: null },
  { name: "庫存上限", key: "intDrgStockMax", sortDesc: null },
  { name: "庫存下限", key: "intDrgStockMin", sortDesc: null },
  { name: "產地", key: "chDrgCountryFrom", sortDesc: null },
  { name: "劑型", key: "chDrgDoseType", sortDesc: null },
  { name: "收費項目", key: "chDrgChargeBy", sortDesc: null },
];

export default {
  name: "drugmanagementaddlist",
  components: {
    Pagination,
  },
  setup() {
    const router = useRouter();
    const searchHospitalId = ref("");
    const searchDrugName = ref("");
    const searchDrgMaker = ref("");
    const global = inject("global");
    pharmacyTab$.next("0");

    headers = ref(headers);
    const { state, getList, sort, clearFilters, removeItem, getItemDetail } = useList("drgadds");

    const cleanFilter = () => {
      searchHospitalId.value = searchDrugName.value = chDrgMakerName.value = "";
      clearFilters();
    };
    const search = () => {
      let filters = {};
      if (searchHospitalId.value) {
        filters.chHospitalId_contains = searchHospitalId.value;
      }
      if (searchDrugName.value) {
        filters.chDrgEnName_contains = searchDrugName.value;
      }
      if (searchDrgMaker.value) {
        filters.chDrgMakerName_contains = searchDrgMaker.value;
      }
      filters = isEmpty(filters) ? "" : queryString.stringify(filters);
      state.listQuery.filter = filters;
      getList();
    };

    const editItem = async (item) => {
      const detail = await getItemDetail(item);
      global.editItem = { ...detail };
      router.push("/pharmacy/modifydrug");
    };

    return {
      ...toRefs(state),
      getList,
      headers,
      searchHospitalId,
      searchDrugName,
      searchDrgMaker,
      sort,
      cleanFilter,
      search,
      removeItem,
      editItem,
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
  grid-template-columns: 100px 150px 100px 200px repeat(9, 100px) 1fr;
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
