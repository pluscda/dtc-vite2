<template>
  <section class="management">
    <header class="dtc-page-header grid dtc-page-header__grid pr-2">
      <div>藥品申領管理</div>
    </header>
    <nav class="ml-1 dtc-search-filters mt-4" style="margin-bottom: 1.5rem !important">
      <DtxInputGroup prepend="申請日期">
        <Calendar class="h-10" v-model="time1" placeholder="請輸入日期" :showIcon="true" dateFormat="yy-mm-dd" />
      </DtxInputGroup>
      <div class="mx-1 pt-2 dtc-text">至</div>
      <Calendar class="h-10" v-model="time2" placeholder="請輸入日期" :showIcon="true" dateFormat="yy-mm-dd" />
      <DtxInputGroup prepend="申請單號">
        <el-input placeholder="搜尋申請單號" v-model="searchOrderId" />
      </DtxInputGroup>
      <DtxInputGroup prepend="申請人員">
        <el-input placeholder="搜尋申請人員" v-model="searchOrderPerson" />
      </DtxInputGroup>

      <Button label="進行查詢" icon="pi pi-search" @click="search" />
      <Button label="清除查詢" class="p-button-secondary" icon="pi pi-undo" @click="cleanFilter" />
    </nav>
    <nav class="ml-1 dtc-search-filters mt-4" style="margin-bottom: 1.5rem !important">
      <DtxInputGroup prepend="撥補人員">
        <el-input placeholder="搜尋撥補人員" v-model="searchCatchPerson" />
      </DtxInputGroup>
      <DtxInputGroup prepend="結案狀態">
        <el-select filterable v-model="searchStatus" placeholder="請選擇結案狀態" class="border-l-0" @change="search">
          <el-option v-for="item in ['全部', '未結案', '已結案']" :key="item" :label="item" :value="item"> </el-option>
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
        <Button label="編輯" class="p-button-sm" @click="editItem(item)" />
        <el-popconfirm title="確定刪除嗎？" confirmButtonText="好的" cancelButtonText="不用了" @confirm="removeItem(item)">
          <template #reference>
            <Button label="刪除" class="p-button-sm p-button-warning" />
          </template>
        </el-popconfirm>
      </div>
      <div>{{ item.chDrgApplyId || "暫無資料" }}</div>
      <div>{{ twTime(item.tiDrgApplyDate) || "暫無資料" }}</div>
      <div>{{ item.chDrgStatus }}</div>
      <div>{{ item.chDrgApplyPersonName || "暫無資料" }}</div>
      <div>{{ item.chDrgHisId || "暫無資料" }}</div>
      <div>{{ item.chDrgHospitalId || "暫無資料" }}</div>
      <div>{{ item.chDrgCnName || "暫無資料" }}</div>
      <div>{{ item.chDrgEnName || "暫無資料" }}</div>
      <div>{{ item.chDrgUnitBy || "暫無資料" }}</div>
      <div>{{ item.intDrgApplyNum || "暫無資料" }}</div>
      <div>{{ item.intDrgCatchNum || "暫無資料" }}</div>
      <div>{{ item.chDrgCatchPerson || "暫無資料" }}</div>
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
import { useRouter } from "vue-router";

let headers = [
  { name: "申請單號", key: "chDrgApplyId", sortDesc: null },
  { name: "申請日期", key: "tiDrgApplyDate", sortDesc: null },
  { name: "結案狀態", key: "chDrgStatus", sortDesc: null },
  { name: "申請人員", key: "chDrgApplyPersonName", sortDesc: null },
  { name: "健保代碼", key: "chDrgHisId", sortDesc: null },
  { name: "院內代碼", key: "chDrgHospitalId", sortDesc: null },
  { name: "藥品中文", key: "chDrgCnName", sortDesc: null },
  { name: "藥品英文", key: "chDrgEnName", sortDesc: null },
  { name: "藥品單位", key: "chDrgUnitBy", sortDesc: null },
  { name: "申請數量", key: "intDrgApplyNum", sortDesc: null },
  { name: "撥補數量", key: "intDrgCatchNum", sortDesc: null },
  { name: "撥補人員", key: "chDrgCatchPerson", sortDesc: null },
];

export default {
  name: "inquerylistxxxx",
  components: {
    Pagination,
  },
  setup() {
    const global = inject("global");
    const router = useRouter();
    const searchOrderId = ref("");
    const searchOrderPerson = ref("");
    const searchCatchPerson = ref("");
    const searchDrgStore = ref("");
    const searchStatus = ref("全部");
    const time1 = ref("");
    const time2 = ref("");

    headers = ref(headers);
    const { state, getList, sort, clearFilters, removeItem, getItemDetail, twTime } = useList("drg-warehouse-request-adds");

    const cleanFilter = () => {
      searchOrderId.value = searchOrderPerson.value = time1.value = time2.value = "";
      searchStatus.value = "全部";
      searchDrgStore.value = "";
      searchCatchPerson.value = "";
      clearFilters();
    };
    const search = () => {
      let filters = {};
      let s,
        e,
        dateQuery = "";
      if (time1.value && time2.value) {
        s = dayjs(time1.value).format("YYYY-MM-DDT00:00:00");
        e = dayjs(time2.value).format("YYYY-MM-DDT23:59:59");
        dateQuery = queryString.stringify({
          _where: [{ tiDrgApplyDate_gte: s }, { tiDrgApplyDate_lt: e }],
        });
      }
      if (searchOrderId.value) {
        filters.chDrgApplyId_contains = searchOrderId.value;
      }
      if (searchOrderPerson.value) {
        filters.chDrgApplyPersonName_contains = searchOrderPerson.value;
      }
      if (searchCatchPerson.value) {
        filters.chDrgCatchPerson_contains = searchCatchPerson;
      }

      if (searchStatus.value != "全部") {
        filters.chDrgStatus_contains = searchStatus.value;
      }

      filters = isEmpty(filters) ? "" : "&" + queryString.stringify(filters);
      state.listQuery.filter = dateQuery + filters;
      getList();
    };
    const editItem = async (item) => {
      const detail = await getItemDetail(item);
      global.editItem = { ...detail };
      router.push("/pharmacy/modifydrgwarehouseporderadd");
    };

    return {
      ...toRefs(state),
      getList,
      headers,
      searchOrderId,
      searchOrderPerson,
      searchDrgStore,
      searchStatus,
      searchCatchPerson,
      time1,
      time2,
      sort,
      clearFilters,
      removeItem,
      getItemDetail,
      search,
      twTime,
      cleanFilter,
      editItem,
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
  grid-template-columns: 110px repeat(11, 120px) 1fr;
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
