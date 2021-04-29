<template>
  <section class="management">
    <header class="dtc-page-header grid dtc-page-header__grid pr-2">
      <div>藥房退庫管理</div>
    </header>
    <nav class="ml-1 dtc-search-filters mt-2">
      <DtxInputGroup prepend="退庫日期">
        <Calendar class="h-10" v-model="time1" placeholder="請輸入日期" :showIcon="true" dateFormat="yy-mm-dd" />
      </DtxInputGroup>
      <div class="mx-1 pt-2 dtc-text">至</div>
      <Calendar class="h-10" v-model="time2" placeholder="請輸入日期" :showIcon="true" dateFormat="yy-mm-dd" />
      <DtxInputGroup prepend="退庫單號">
        <el-input placeholder="搜尋退庫單號" v-model="searchDrugId" />
      </DtxInputGroup>
      <DtxInputGroup prepend="退庫人員">
        <el-input placeholder="搜尋申請人員" v-model="searchDrugName" />
      </DtxInputGroup>

      <Button label="進行查詢" icon="pi pi-search" />
      <Button label="清除查詢" class="p-button-secondary" icon="pi pi-undo" />
    </nav>
    <nav class="ml-1 dtc-search-filters" hidden>
      <DtxInputGroup prepend="退庫藥房">
        <el-input placeholder="搜尋退庫藥房" v-model="searchDrugName" />
      </DtxInputGroup>
      <DtxInputGroup prepend="點收人員">
        <el-input placeholder="搜尋點收人員" v-model="searchDrugName" />
      </DtxInputGroup>
    </nav>

    <header class="my-title relative dtc-grid-grumanagement-header dtc-grid-header dtc-grid-header__divs dtc-template-columns mx-1">
      <div>操作</div>
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
      <div class="flex flex-none space-x-2">
        <Button label="退庫明細" class="p-button-sm" />
      </div>
      <div>{{ item.name || "暫無資料" }}</div>
      <div>{{ item.name || "暫無資料" }}</div>
      <div>{{ item.name || "暫無資料" }}</div>
      <div>{{ item.age || "暫無資料" }}</div>
    </main>
    <!-- 分頁 -->
    <pagination v-show="total > 0" :total="total" v-model:page="listQuery.page" v-model:limit="listQuery.limit" @pagination="getList"></pagination>
  </section>
</template>

<script>
import { toRefs, ref, reactive, inject, computed } from "vue";
import Pagination from "cps/Pagination.vue";
import { useList } from "/@/hooks/useHis.js";

//身分證號
let headers = [
  { name: "退庫單號", key: "name", sortDesc: null },
  { name: "退庫日期", key: "name", sortDesc: null },
  { name: "訂單狀態", key: "age", sortDesc: null },
  { name: "退庫人員", key: "age", sortDesc: null },
];

export default {
  name: "inquerylist3038373",
  components: {
    Pagination,
  },
  setup() {
    //global
    const global = inject("global");
    //搜尋變數
    const searchDrugId = ref("");
    const searchDrugName = ref("");
    const searchStatus = ref("");
    const time1 = ref("");
    const time2 = ref("");
    const zh = reactive({
      firstDayOfWeek: 0,
      dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
      dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
      dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
      monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
      monthNamesShort: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
      today: "今天",
      clear: "清空",
      dateFormat: "yy-mm-dd",
      weekHeader: "周",
    });

    //Options
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
    const { state, getList, sort, clearFilters, removeItem, getItemDetail, twTime } = useList("drg-warehouse-request-adds");
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

    return {
      ...toRefs(state),
      getList,
      headers,
      searchDrugId,
      searchDrugName,
      searchStatus,
      caseClosedOptions,
      isOpenAddDrugDialog,
      openAddDialog,
      toggleDetail,
      zh,
      time1,
      time2,
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
  width: calc(100vw - 162px) !important;
  max-width: calc(100vw - 162px) !important;
  // grid-template-columns: 100px repeat(14, minmax(90px, 1fr));
  grid-template-columns: 100px repeat(3, 180px) 1fr;
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
