<template>
  <section class="management">
    <header class="grid pr-2 dtc-page-header dtc-page-header__grid">
      <div>退庫單明細</div>
    </header>
    <nav class="mt-2 ml-1 dtc-search-filters" style="margin-bottom: 1.5rem !important">
      <DtxInputGroup prepend="退庫日期">
        <el-input readonly :value="his.tiDrgApplyDate" />
      </DtxInputGroup>
      <DtxInputGroup prepend="退庫單號">
        <el-input readonly :value="his.chDrgApplyId" />
      </DtxInputGroup>
      <DtxInputGroup prepend="退庫人員">
        <el-input readonly :value="his.chDrgApplyPersonName" />
      </DtxInputGroup>
      <DtxInputGroup prepend="退庫藥房">
        <el-input readonly :value="his.chDrgApplyStoreName" />
      </DtxInputGroup>
    </nav>

    <header class="relative mx-1 my-title dtc-grid-grumanagement-header dtc-grid-header dtc-grid-header__divs dtc-template-columns">
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
      class="mx-1 ml-1 text-black dtc-grid-header dtc-grid-body dtc-template-columns"
      v-for="(item, k) in list"
      :key="k"
      :style="k % 2 == 0 ? 'background-color: #F5F5F5;' : 'background-color: #E0E0E0;'"
    >
      <div class="flex flex-none space-x-2">
        {{ k + 1 }}
      </div>

      <div>{{ item.nhiCode || '暫無資料' }}</div>
      <div>{{ item.medCname || '暫無資料' }}</div>
      <div>{{ item.medEname || '暫無資料' }}</div>
      <div>{{ item.medicineId || '暫無資料' }}</div>
      <div><el-input v-model="item.shippingAmount" type="number" placeholder="請輸入" @change="update(item)" /></div>
      <div><el-input v-model="item.quantity" type="number" placeholder="請輸入" @change="update(item)" /></div>
    </main>
    <footer class="mt-10">
      <Button label="返回藥品申領管理" class="" @click="$router.go(-1)" />
    </footer>
  </section>
</template>

<script>
import { toRefs, ref, reactive, inject, computed } from 'vue';
import Pagination from 'cps/Pagination.vue';
import { clone } from 'ramda';
import { useList } from '/@/hooks/useHis.js';
import { isEmpty } from 'ramda';
import queryString from 'qs';
import { ElMessage } from 'element-plus';
import dayjs from 'dayjs';

let headers = [
  { name: '健保代碼', key: 'nhiCode', sortDesc: null },
  { name: '中文藥名', key: 'medCname', sortDesc: null },
  { name: '英文藥名', key: 'medEname', sortDesc: null },
  { name: '院內代碼', key: 'medicineId', sortDesc: null },
  { name: '完成數量', key: 'shippingAmount', sortDesc: null },
  { name: '退庫數量', key: 'quantity', sortDesc: null },
];

export default {
  //
  name: 'modifyDrgWarehousePOrder46ww',
  components: {
    Pagination,
  },
  inject: ['global', 'actions'],
  data() {
    return {
      his: { tiDrgApplyDate: '' },
      disableBtn: false,
    };
  },
  methods: {
    async update(item) {
      this.disableBtn = true;
      try {
        await this.actions.editPharmacyOrder(item);
        ElMessage.success('編輯退庫單明細成功: ' + item.nhiCode);
        this.disableBtn = false;
      } catch (e) {
        ElMessage.error('編輯退庫單明細');
        this.disableBtn = false;
      }
    },
  },
  setup() {
    const searchOrderId = ref('');
    const searchOrderPerson = ref('');
    const searchStatus = ref('');
    const global = inject('global');
    const time1 = ref('');
    const time2 = ref('');
    const caseClosedOptions = reactive([
      { value: 'closed', text: '已到貨' },
      { value: 'unclosed', text: '未到貨' },
    ]);

    headers = ref(headers);
    const { state, getList, sort, clearFilters, removeItem, getItemDetail, twTime } = useList(
      '/med/pharmacyOrderItems',
      1200,
      '&pharmacyOrderId=' + global.editItem.pharmacyOrderId
    );

    const cleanFilter = () => {
      searchOrderId.value = searchOrderPerson.value = searchStatus.value = time1.value = time2.value = '';
      clearFilters();
    };
    const search = () => {
      let filters = {};
      let s,
        e,
        dateQuery = '';
      if (time1.value && time2.value) {
        s = dayjs(time1.value).format('YYYY-MM-DDT00:00:00');
        e = dayjs(time2.value).format('YYYY-MM-DDT23:59:59');
        dateQuery = queryString.stringify({
          _where: [{ tiDrgApplyDate_gte: s }, { tiDrgApplyDate_lt: e }],
        });
      }
      if (searchOrderId.value) {
        filters.chDrgApplyId_contains = searchOrderId.value;
      }
      if (searchOrderPerson.value) {
        filters.chDrgApplyPerson_contains = searchOrderPerson.value;
      }
      filters = isEmpty(filters) ? '' : '&' + queryString.stringify(filters);
      state.listQuery.filter = dateQuery + filters;
      getList();
    };

    return {
      ...toRefs(state),
      getList,
      headers,
      searchOrderId,
      searchOrderPerson,
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
      cleanFilter,
    };
  },
  mounted() {
    this.his = clone(this.global.editItem);
  },
};
</script>

<style lang="scss" scoped>
.dtc-template-columns {
  width: calc(100vw - 162px) !important;
  max-width: calc(100vw - 162px) !important;
  // grid-template-columns: 100px 120px 150px repeat(9, minmax(90px, 1fr));
  grid-template-columns: 60px repeat(5, 180px) 1fr;
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
