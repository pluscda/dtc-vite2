<template>
  <section class="management">
    <header class="dtc-page-header grid dtc-page-header__grid pr-2">
      <div>藥房資料維護</div>
    </header>
    <nav class="ml-1 dtc-search-filters mt-4" style="margin-bottom: 1.5rem !important">
      <DtxInputGroup prepend="藥房編號">
        <el-input placeholder="搜尋藥房編號" v-model="searchStoreId" />
      </DtxInputGroup>
      <DtxInputGroup prepend="藥房名稱">
        <el-input placeholder="搜尋藥房名稱" v-model="searchStoreName" />
      </DtxInputGroup>
      <Button label="進行查詢" icon="pi pi-search" @click="search" />
      <Button label="清除查詢" class="p-button-secondary" icon="pi pi-undo" @click="cleanFilter" />
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
        <Button label="編輯" class="p-button-sm" @click="editItem(item)" />
        <el-popconfirm title="確定刪除嗎？" confirmButtonText="好的" cancelButtonText="不用了" @confirm="removeItem(item)">
          <template #reference>
            <Button label="刪除" class="p-button-sm p-button-warning" />
          </template>
        </el-popconfirm>
      </div>

      <div>{{ item.chDrgStoreId || "暫無資料" }}</div>
      <div>{{ item.chDrgStoreName || "暫無資料" }}</div>
      <div>{{ item.chDrgStoreAddress || "暫無資料" }}</div>
    </main>
    <!-- 分頁 -->
    <pagination v-show="total > 0" :total="total" v-model:page="listQuery.page" v-model:limit="listQuery.limit" @pagination="getList"></pagination>
  </section>
</template>

<script>
import { toRefs, ref, inject, computed } from "vue";
import Pagination from "cps/Pagination.vue";
import { useList } from "/@/hooks/useHis.js";
import queryString from "qs";
import { isEmpty } from "ramda";
import { useRouter } from "vue-router";
//身分證號
let headers = [
  { name: "藥房編號", key: "chDrgStoreId", sortDesc: null },
  { name: "藥房名稱", key: "chDrgStoreName", sortDesc: null },
  { name: "藥房位置", key: "chDrgStoreAddress", sortDesc: null },
];

export default {
  name: "inquerylistStore",
  components: {
    Pagination,
  },

  setup() {
    const global = inject("global");
    const router = useRouter();
    const searchStoreId = ref("");
    const searchStoreName = ref("");

    headers = ref(headers);
    const { state, getList, sort, clearFilters, removeItem, getItemDetail } = useList("drg-add-stores");
    const cleanFilter = () => {
      searchStoreId.value = searchStoreName.value = "";
      clearFilters();
    };
    const search = () => {
      let filters = {};
      if (searchStoreId.value) {
        filters.chDrgStoreId_contains = searchStoreId.value;
      }
      if (searchStoreName.value) {
        filters.chDrgStoreName_contains = searchStoreName.value;
      }

      filters = isEmpty(filters) ? "" : queryString.stringify(filters);
      state.listQuery.filter = filters;
      getList();
    };

    const editItem = async (item) => {
      const detail = await getItemDetail(item);
      global.editItem = { ...detail };
      router.push("/pharmacy/modifydrgstore");
    };

    return {
      ...toRefs(state),
      getList,
      headers,
      sort,
      search,
      editItem,
      clearFilters,
      cleanFilter,
      removeItem,
      searchStoreId,
      searchStoreName,
    };
  },
};
</script>

<style lang="scss" scoped>
.dtc-template-columns {
  width: calc(100vw - 162px) !important;
  max-width: calc(100vw - 162px) !important;
  grid-template-columns: 100px 160px 160px 1fr;
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
