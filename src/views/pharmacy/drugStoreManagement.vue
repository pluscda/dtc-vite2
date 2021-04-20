<template>
  <section class="management">
    <header class="dtc-page-header grid dtc-page-header__grid pr-2">
      <div>藥房資料維護</div>
    </header>
    <nav
      class="ml-1 dtc-search-filters mt-4"
      style="margin-bottom: 1.5rem !important"
    >
      <DtxInputGroup prepend="藥房編號">
        <el-input placeholder="搜尋藥房編號" v-model="searchDrugId" />
      </DtxInputGroup>
      <DtxInputGroup prepend="藥房名稱">
        <el-input placeholder="搜尋藥房名稱" v-model="searchDrugName" />
      </DtxInputGroup>
      <Button label="進行查詢" icon="pi pi-search" />
      <Button label="清除查詢" class="p-button-secondary" icon="pi pi-undo" />
    </nav>

    <header
      class="my-title relative dtc-grid-grumanagement-header dtc-grid-header dtc-grid-header__divs dtc-template-columns mx-1"
    >
      <div>操作</div>
      <div v-for="(item, i) in headers" :key="i" @click="sort(item)">
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
      :style="
        i % 2 == 0 ? 'background-color: #F5F5F5;' : 'background-color: #E0E0E0;'
      "
    >
      <div class="flex flex-none space-x-2">
        <Button label="編輯" class="p-button-sm" />
        <Button label="刪除" class="p-button-sm p-button-warning" />
      </div>

      <div>{{ item.name || "暫無資料" }}</div>
      <div>{{ item.age || "暫無資料" }}</div>
      <div>{{ item.age || "暫無資料" }}</div>
    </main>
    <!-- 分頁 -->
    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="listQuery.page"
      v-model:limit="listQuery.limit"
      @pagination="getList"
    ></pagination>
  </section>
</template>

<script>
import { toRefs, ref, inject, computed } from "vue";
import Pagination from "cps/Pagination.vue";
import { useList } from "../users/model/userModel";
//身分證號
let headers = [
  { name: "藥房編號", key: "name", sortDesc: null },
  { name: "藥房名稱", key: "name", sortDesc: null },
  { name: "地址", key: "name", sortDesc: null },
];

export default {
  name: "inquerylist",
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
    const { state, getList, delItem } = useList();
    const isOpenAddDrugDialog = computed(() => {
      return global.openAddDrugDialog;
    });

    return {
      ...toRefs(state),
      getList,
      headers,
      searchDrugId,
      searchDrugName,
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
