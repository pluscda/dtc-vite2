<template>
  <section class="management">
    <header class="dtc-page-header grid dtc-page-header__grid pr-2">
      <div>藥品資料維護</div>
    </header>
    <nav class="ml-1 dtc-search-filters mt-4" style="margin-bottom: 1.5rem !important">
      <DtxInputGroup prepend="藥品編號">
        <el-input placeholder="搜尋藥品編號" v-model="searchDrugId" />
      </DtxInputGroup>
      <DtxInputGroup prepend="藥品名稱">
        <el-input placeholder="搜尋藥品名稱" v-model="searchDrugName" />
      </DtxInputGroup>
      <Button label="進行查詢" icon="pi pi-search" @click="search" />
      <Button label="清除查詢" class="p-button-secondary" icon="pi pi-undo" @click="cleanFilter" />
    </nav>

    <header data-msg="註1:限低於庫存下可轉採購單" class="my-title relative dtc-grid-grumanagement-header dtc-grid-header dtc-grid-header__divs dtc-template-columns mx-1">
      <div title="" class="title-word1">採購單(註1)</div>
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
      <div>
        <InputSwitch class="transform translate-y-1.5" v-model="item.review" size="small" @click.stop="toggleDetail(item)"></InputSwitch>
      </div>
      <div class="flex flex-none space-x-2">
        <Button label="編輯" class="p-button-sm" @click.stop="editItem(item)" />
        <el-popconfirm title="確定刪除嗎？" confirmButtonText="好的" cancelButtonText="不用了" @confirm="removeItem(item)">
          <template #reference>
            <Button label="刪除" class="p-button-sm p-button-warning" />
          </template>
        </el-popconfirm>
      </div>

      <div>{{ item.drugId || "暫無資料" }}</div>
      <div>{{ item.drugName || "暫無資料" }}</div>
      <div>{{ item.drugUnit || "暫無資料" }}</div>
      <div>{{ item.drugStandard || "暫無資料" }}</div>
      <div>{{ item.buyPrice || "暫無資料" }}</div>
      <div>{{ item.sellPrice || "暫無資料" }}</div>
      <div>{{ item.unknow || "暫無資料" }}</div>
      <div>{{ item.stockMax || "暫無資料" }}</div>
      <div>{{ item.stockMin || "暫無資料" }}</div>
      <div>{{ item.countryFrom || "暫無資料" }}</div>
      <div>{{ item.drugDose || "暫無資料" }}</div>
      <div>{{ item.unknow || "暫無資料" }}</div>
    </main>
    <!-- 分頁 -->
    <pagination v-show="total > 0" :total="total" v-model:page="listQuery.page" v-model:limit="listQuery.limit" @pagination="getList"></pagination>
  </section>
</template>

<script>
import queryString from "qs";
import { isEmpty } from "ramda";
import { toRefs, ref, inject, computed, provide } from "vue";
import { useRouter } from "vue-router";
import Pagination from "cps/Pagination.vue";
import { useList } from "../users/model/userModel";

//身分證號
let headers = [
  { name: "藥品編號", key: "drugId", sortDesc: null },
  { name: "藥品名稱", key: "drugName", sortDesc: null },
  { name: "單位", key: "drugUnit", sortDesc: null },
  { name: "規格", key: "drugStandard", sortDesc: null },
  { name: "進價", key: "buyPrice", sortDesc: null },
  { name: "售價", key: "sellPrice", sortDesc: null },
  { name: "存量", key: "unknown", sortDesc: null },
  { name: "庫存上限", key: "stockMax", sortDesc: null },
  { name: "庫存下限", key: "stockMin", sortDesc: null },
  { name: "產地", key: "countryFrom", sortDesc: null },
  { name: "劑量", key: "drugDose", sortDesc: null },
  { name: "收費項目", key: "unknown", sortDesc: null },
];

export default {
  name: "drugmanagement1",
  components: {
    Pagination,
  },
  setup() {
    //global
    const global = inject("global");
    const router = useRouter();
    //搜尋變數
    const searchDrugId = ref("");
    const searchDrugName = ref("");
    // 列表數據
    headers = ref(headers);
    const { state, getList, sort, clearFilters, removeItem, getItemDetail } = useList("his-drugs");
    const isOpenAddDrugDialog = computed(() => {
      return global.openAddDrugDialog;
    });

    const openAddDialog = () => {
      global.openAddDrugDialog = true;
    };

    const toggleDetail = (item) => {
      const review = item.review;
      state.list.forEach((s) => (s.review = false));
      item.review = !review;
    };

    const cleanFilter = () => {
      searchDrugId.value = searchDrugName.value = "";
      clearFilters();
    };
    const search = () => {
      let filters = {};
      if (searchDrugId.value) {
        filters.drugId = searchDrugId.value;
      }
      //https://strapi.io/documentation/developer-docs/latest/developer-resources/content-api/content-api.html#filters
      if (searchDrugName.value) {
        filters.drugName_contains = searchDrugName.value;
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
      searchDrugId,
      searchDrugName,
      isOpenAddDrugDialog,
      openAddDialog,
      toggleDetail,
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
  grid-template-columns: 100px 100px 100px repeat(8, minmax(80px, 1fr)) 90px repeat(2, minmax(80px, 1fr));
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
