<template>
  <section class="management">
    <header class="dtc-page-header grid dtc-page-header__grid pr-2">
      <div>採購單明細</div>
    </header>
    <nav class="ml-1 dtc-search-filters mt-2" style="margin-bottom: 1.5rem !important">
      <DtxInputGroup prepend="採購日期">
        <Calendar class="h-10" v-model="searchOrderTime" placeholder="請輸入日期" :showIcon="true" dateFormat="yy-mm-dd" />
      </DtxInputGroup>
      <DtxInputGroup prepend="採購單號">
        <el-input v-model="searchOrderId" />
      </DtxInputGroup>
      <DtxInputGroup prepend="採購人員">
        <el-input v-model="searchOrderPerson" />
      </DtxInputGroup>
      <Button label="進行查詢" icon="pi pi-search" @click="search" />
      <Button label="清除查詢" class="p-button-secondary" icon="pi pi-undo" @click="cleanFilter" />
    </nav>

    <header class="my-title relative dtc-grid-grumanagement-header dtc-grid-header dtc-grid-header__divs dtc-template-columns mx-1">
      <div>序號</div>
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
      v-for="(item, k) in list"
      :key="k"
      :style="k % 2 == 0 ? 'background-color: #F5F5F5;' : 'background-color: #E0E0E0;'"
    >
      <div class="flex flex-none space-x-2">
        {{ k + 1 }}
      </div>

      <div>{{ item.nhiCode || "暫無資料" }}</div>
      <div>{{ item.medicineId || "暫無資料" }}</div>
      <div>{{ item.medCname || "暫無資料" }}</div>
      <div>{{ item.medEname || "暫無資料" }}</div>
      <div>{{ item.vendorName || "暫無資料" }}</div>
      <div>{{ item.currentStock || "暫無資料" }}</div>
      <div><el-input v-model="item.quantity" type="number" min="1" placeholder="請輸入" @change="update(item)" /></div>
      <div><el-input v-model="item.shippingAmount" type="number" min="1" placeholder="請輸入" @change="update(item)" /></div>
      <div>
        <el-select filterable v-model="item.closed" @change="update(item)" placeholder="未到貨" class="border-l-0">
          <el-option v-for="item in caseClosedOptions" :key="item.text" :label="item.text" :value="item.value"> </el-option>
        </el-select>
      </div>
      <div><el-input v-model="item.note" @change="update(item)" placeholder="請輸入採購單備註" /></div>
    </main>
    <footer class="mt-10">
      <Button label="返回採購單管理" @click="$router.go(-1)" :disabled="disableBtn" />
    </footer>
  </section>
</template>

<script>
import { toRefs, ref, reactive, inject, computed } from "vue";
import Pagination from "cps/Pagination.vue";
import { clone } from "ramda";
import { useList } from "/@/hooks/useHis.js";
import { isEmpty } from "ramda";
import queryString from "qs";
import dayjs from "dayjs";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

//身分證號
let headers = [
  { name: "健保代碼", key: "nhiCode", sortDesc: null },
  { name: "院內代碼", key: "medicineId", sortDesc: null },
  { name: "中文藥名", key: "medCname", sortDesc: null },
  { name: "英文藥名", key: "medEname", sortDesc: null },
  { name: "藥商名稱", key: "vendorName", sortDesc: null },
  { name: "現有存量", key: "currentStock", sortDesc: null },
  { name: "採購數量", key: "quantity", sortDesc: null },
  { name: "到貨數量", key: "shippingAmount", sortDesc: null },
  { name: "是否到貨", key: "isClosed", sortDesc: null },
  { name: "備註", key: "note", sortDesc: null },
];

export default {
  name: "modifyDrgWarehousePOrder",
  components: {
    Pagination,
  },
  inject: ["global", "actions"],
  data() {
    return {
      disableBtn: false,
    };
  },
  methods: {
    async update(item) {
      this.disableBtn = true;
      try {
        await this.actions.editDrgOrderItem(item);
        ElMessage.success("編輯採購單明細成功: " + item.nhiCode);
        this.disableBtn = false;
      } catch (e) {
        ElMessage.error("編輯採購單明細");
        this.disableBtn = false;
      }
    },
  },
  setup() {
    const global = inject("global");
    const router = useRouter();
    const searchOrderTime = ref("");
    const searchOrderId = ref("");
    const searchOrderPerson = ref("");
    const searchStatus = ref("");

    const caseClosedOptions = reactive([
      { value: "1", text: "已到貨" },
      { value: "0", text: "未到貨" },
    ]);

    headers = ref(headers);
    const { state, getList, sort, clearFilters, removeItem, getItemDetail, twTime } = useList("/med/medOrderItems", 100000, "&orderId=" + global.editItem.orderId);

    const cleanFilter = () => {
      searchOrderId.value = searchOrderPerson.value = searchStatus.value = time1.value = time2.value = "";
      clearFilters();
    };
    const search = () => {
      let filters = {};
      let s;
      if (searchOrderTime.value) {
        s = dayjs(searchOrderTime.value).format("YYYY-MM-DD");
        filter.orderDate = s;
      }
      if (searchOrderId.value) {
        filters.orderId = searchOrderId.value;
      }
      if (searchOrderPerson.value) {
        filters.staffId = searchOrderPerson.value;
      }
      filters = isEmpty(filters) ? "" : "&" + queryString.stringify(filters);
      state.listQuery.filter = filters;
      getList();
    };

    return {
      ...toRefs(state),
      getList,
      headers,
      searchOrderId,
      searchOrderPerson,
      searchStatus,
      caseClosedOptions,
      sort,
      clearFilters,
      removeItem,
      getItemDetail,
      search,
      twTime,
      cleanFilter,
      searchOrderTime,
    };
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.dtc-template-columns {
  width: calc(100vw - 162px) !important;
  max-width: calc(100vw - 162px) !important;
  // grid-template-columns: 100px 120px 150px repeat(9, minmax(90px, 1fr));
  grid-template-columns: 60px repeat(9, 120px) 1fr;
}
.management {
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
