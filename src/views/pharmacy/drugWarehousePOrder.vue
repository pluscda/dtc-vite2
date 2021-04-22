<template>
  <section class="management">
    <header class="dtc-page-header grid dtc-page-header__grid pr-2">
      <div>採購單管理</div>
    </header>
    <nav class="ml-1 dtc-search-filters mt-4" style="margin-bottom: 1.5rem !important">
      <DtxInputGroup prepend="採購日期">
        <Calendar class="h-10" v-model="time1" placeholder="輸入日期" :showIcon="true" dateFormat="yy-mm-dd" />
      </DtxInputGroup>
      <div class="mx-1 pt-2 dtc-text">至</div>
      <Calendar class="h-10" v-model="time2" placeholder="輸入日期" :showIcon="true" dateFormat="yy-mm-dd" />
      <DtxInputGroup prepend="採購單號">
        <el-input placeholder="搜尋採購單號" v-model="searchOrderId" />
      </DtxInputGroup>

      <Button label="進行查詢" icon="pi pi-search" @click.stop="search" />
      <Button label="清除查詢" class="p-button-secondary" icon="pi pi-undo" />
    </nav>
    <nav class="ml-1 dtc-search-filters mt-4" style="margin-bottom: 1.5rem !important">
      <DtxInputGroup prepend="申請人員">
        <el-input placeholder="搜尋申請人員" v-model="searchOrderPerson" />
      </DtxInputGroup>
      <DtxInputGroup prepend="結案狀態">
        <el-select v-model="searchStatus" placeholder="請選擇結案狀態" class="border-l-0">
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
        <Button label="編輯" class="p-button-sm" />
        <el-popconfirm title="確定刪除嗎？" confirmButtonText="好的" cancelButtonText="不用了" @confirm="removeItem(item)">
          <template #reference>
            <Button label="刪除" class="p-button-sm p-button-warning" />
          </template>
        </el-popconfirm>
      </div>

      <div>{{ item.chDrgPurchaseId || "暫無資料" }}</div>
      <div>{{ twTime(item.tiDrgPurchaseDate) || "暫無資料" }}</div>
      <div>{{ item.status || "暫無資料" }}</div>
      <div>{{ item.chDrgPurchasePerson || "暫無資料" }}</div>
      <div>{{ item.chDrgHisId || "暫無資料" }}</div>
      <div>{{ item.chDrgHospitalId || "暫無資料" }}</div>
      <div>{{ item.chDrgCnName || "暫無資料" }}</div>
      <div>{{ item.chDrgEnName || "暫無資料" }}</div>
      <div>{{ item.chDrgUnitBy || "暫無資料" }}</div>
      <div>{{ item.intDrugApplyNum || "暫無資料" }}</div>
      <div>{{ item.chDrgDoseType || "暫無資料" }}</div>
    </main>
    <!-- 分頁 -->
    <pagination v-show="total > 0" :total="total" v-model:page="listQuery.page" v-model:limit="listQuery.limit" @pagination="getList"></pagination>
  </section>
</template>

<script>
import { toRefs, ref, reactive, inject, computed } from "vue";
import Pagination from "cps/Pagination.vue";
import { useList } from "/@/hooks/useHis.js";
import { isEmpty } from "ramda";
import queryString from "qs";
import dayjs from "dayjs";

//身分證號
let headers = [
  { name: "採購單號", key: "chDrgPurchaseId", sortDesc: null },
  { name: "採購日期", key: "tiDrgPurchaseDate", sortDesc: null },
  { name: "結案狀態", key: "status", sortDesc: null },
  { name: "申請人員", key: "chDrgPurchasePerson", sortDesc: null },
  { name: "健保代碼", key: "chDrgHisId", sortDesc: null },
  { name: "院內代碼", key: "chDrgHospitalId", sortDesc: null },
  { name: "藥品中文", key: "chDrgCnName", sortDesc: null },
  { name: "藥品英文", key: "chDrgEnName", sortDesc: null },
  { name: "單位", key: "chDrgUnitBy", sortDesc: null },
  { name: "申請數量", key: "intDrugApplyNum", sortDesc: null },
  { name: "劑型", key: "chDrgDoseType", sortDesc: null },
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
    const searchOrderId = ref("");
    const searchOrderPerson = ref("");
    const searchStatus = ref("");
    const time1 = ref("");
    const time2 = ref("");

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
    const { state, getList, sort, clearFilters, removeItem, getItemDetail, twTime } = useList("drg-warehouse-order-adds");

    const cleanFilter = () => {
      searchDrugName.value = searchDrugName.value = searchOrderId.value = searchOrderPerson.value = searchStatus.value = "";
      getList();
    };
    const search = () => {
      let filters = {};
      let s, e, dateQuery;
      if (time1.value && time2.value) {
        s = dayjs(time1.value).format("YYYY-MM-DDT00:00:00");
        e = dayjs(time2.value).format("YYYY-MM-DDT23:59:59");
        dateQuery = queryString.stringify({
          _where: [{ orderDate_gte: s }, { orderDate_lt: e }],
        });
      }
      if (searchOrderId.value) {
        filters.orderId = searchOrderId.value;
      }
      if (searchOrderPerson.value) {
        filters.orderPerson = searchOrderPerson.value;
      }

      state.listQuery.filter = dateQuery;
      getList();
      //https://strapi.io/documentation/developer-docs/latest/developer-resources/content-api/content-api.html#filters
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
      caseClosedOptions,
      sort,
      clearFilters,
      removeItem,
      getItemDetail,
      search,
      twTime,
    };
  },
  mounted() {
    this.$primevue.config.locale = twDate;
  },
};
</script>

<style lang="scss" scoped>
.dtc-template-columns {
  width: calc(100vw - 162px) !important;
  max-width: calc(100vw - 162px) !important;
  // grid-template-columns: 100px 120px 150px repeat(9, minmax(90px, 1fr));
  grid-template-columns: 100px 120px 150px repeat(9, 1fr);
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
