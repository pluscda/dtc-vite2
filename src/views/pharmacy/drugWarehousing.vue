<template>
  <section class="management">
    <header class="dtc-page-header grid dtc-page-header__grid pr-2">
      <div>藥房入庫單管理</div>
    </header>
    <nav class="ml-1 dtc-search-filters">
      <DtxInputGroup prepend="採號日期">
        <Calendar class="h-10" v-model="time1" placeholder="請輸入日期" :showIcon="true" dateFormat="yy-mm-dd" />
      </DtxInputGroup>
      <div class="mx-1 pt-2 dtc-text">至</div>
      <Calendar class="h-10" v-model="time2" placeholder="請輸入日期" :showIcon="true" dateFormat="yy-mm-dd" />
      <DtxInputGroup prepend="採購單號">
        <el-input placeholder="搜尋採購單號" v-model="searchDrugId" />
      </DtxInputGroup>

      <Button label="進行查詢" icon="pi pi-search" />
      <Button label="清除查詢" class="p-button-secondary" icon="pi pi-undo" />
    </nav>
    <nav class="ml-1 dtc-search-filters">
      <DtxInputGroup prepend="申請人員">
        <el-input placeholder="搜尋申請人員" v-model="searchDrugName" />
      </DtxInputGroup>
      <DtxInputGroup prepend="訂單狀態">
        <el-select filterable v-model="searchStatus" placeholder="請選擇訂單狀態" class="border-l-0">
          <el-option v-for="item in caseClosedOptions" :key="item.value" :label="item.text" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
    </nav>

    <header class="my-title relative dtc-grid-grumanagement-header dtc-grid-header dtc-grid-header__divs dtc-template-columns mx-1">
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
        <Button label="入庫單明細" class="p-button-sm" @click="editItem(item)" />
      </div>
      <div>{{ item.name || "暫無資料" }}</div>
      <div>{{ item.name || "暫無資料" }}</div>
      <div>{{ item.name || "暫無資料" }}</div>
      <div>{{ item.name || "暫無資料" }}</div>
    </main>
    <!-- 分頁 -->
    <pagination v-show="total > 0" :total="total" v-model:page="listQuery.page" v-model:limit="listQuery.limit" @pagination="getList"></pagination>
  </section>
</template>

<script>
import { toRefs, ref, reactive, inject, computed } from "vue";
import Pagination from "cps/Pagination.vue";
import { useList } from "/@/hooks/useHis.js";
import { useRouter } from "vue-router";
//身分證號
let headers = [
  { name: "採購單號", key: "name", sortDesc: null },
  { name: "採購日期", key: "name", sortDesc: null },
  { name: "訂單狀態", key: "age", sortDesc: null },
  { name: "申請人員", key: "age", sortDesc: null },
];

export default {
  name: "inquerylist98373",
  components: {
    Pagination,
  },
  setup() {
    const global = inject("global");
    const router = useRouter();
    const searchDrugId = ref("");
    const searchDrugName = ref("");
    const time1 = ref("");
    const time2 = ref("");
    const searchStatus = ref("");

    const caseClosedOptions = reactive([
      {
        value: null,
        text: "全部",
      },
      { value: "closed", text: "已結案" },
      { value: "unclosed", text: "未結案" },
    ]);

    // 列表數據
    headers = ref(headers);
    const { state, getList, sort, clearFilters, removeItem, getItemDetail, twTime } = useList("drg-warehouse-order-adds");

    const editItem = async (item) => {
      const detail = await getItemDetail(item);
      global.editItem = { ...detail };
      router.push("/pharmacy/dtcmodifydrgwarehouse");
    };

    return {
      ...toRefs(state),
      getList,
      headers,
      searchDrugId,
      searchDrugName,
      searchStatus,
      time1,
      time2,
      editItem,
      sort,
      clearFilters,
      removeItem,
      twTime,
    };
  },
  mounted() {
    this.$primevue.config.locale = primeVueDateFormat;
  },
};
</script>

<style lang="scss" scoped>
.dtc-template-columns {
  width: calc(100vw - 162px) !important;
  max-width: calc(100vw - 162px) !important;
  // grid-template-columns: 100px repeat(14, minmax(90px, 1fr));
  grid-template-columns: 110px repeat(3, 150px) 1fr;
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
