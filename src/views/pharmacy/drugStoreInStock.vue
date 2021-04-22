<template>
  <section class="management">
    <header class="dtc-page-header grid dtc-page-header__grid pr-2">
      <div>藥房庫存查詢</div>
    </header>
    <nav class="ml-1 dtc-search-filters mt-4" style="margin-bottom: 1.5rem !important">
      <DtxInputGroup prepend="藥房">
        <el-input placeholder="搜尋藥房" v-model="searchDrugId" />
      </DtxInputGroup>
      <DtxInputGroup prepend="藥品名稱">
        <el-input placeholder="搜尋藥品名稱" v-model="searchDrugName" />
      </DtxInputGroup>
      <Button label="進行查詢" icon="pi pi-search" />
      <Button label="清除查詢" class="p-button-secondary" icon="pi pi-undo" />
    </nav>

    <header class="my-title relative dtc-grid-grumanagement-header dtc-grid-header dtc-grid-header__divs dtc-template-columns mx-1">
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
      :style="i % 2 == 0 ? 'background-color: #F5F5F5;' : 'background-color: #E0E0E0;'"
    >
      <div>{{ item.name || '暫無資料' }}</div>
      <div>{{ item.age || '暫無資料' }}</div>
      <div>{{ item.id || '暫無資料' }}</div>
      <div>{{ item.name || '暫無資料' }}</div>
      <div>{{ item.age || '暫無資料' }}</div>
      <div>{{ item.id || '暫無資料' }}</div>
      <div>{{ item.name || '暫無資料' }}</div>
      <div>{{ item.age || '暫無資料' }}</div>
      <div>{{ item.id || '暫無資料' }}</div>
      <div>{{ item.name || '暫無資料' }}</div>
    </main>
    <!-- 分頁 -->
    <pagination v-show="total > 0" :total="total" v-model:page="listQuery.page" v-model:limit="listQuery.limit" @pagination="getList"></pagination>
  </section>
</template>

<script>
import { toRefs, ref, inject, computed } from 'vue';
import Pagination from 'cps/Pagination.vue';
import { useList } from '/@/hooks/useHis.js';

//身分證號
let headers = [
  { name: '健保代碼', key: 'name', sortDesc: null },
  { name: '院內代碼', key: 'name', sortDesc: null },
  { name: '藥品中文', key: 'age', sortDesc: null },
  { name: '藥品英文', key: 'age', sortDesc: null },
  { name: '單位', key: 'age', sortDesc: null },
  { name: '規格', key: 'age', sortDesc: null },
  { name: '原核定價', key: 'age', sortDesc: null },
  { name: '存量', key: 'age', sortDesc: null },
  { name: '產地', key: 'age', sortDesc: null },
  { name: '劑型', key: 'age', sortDesc: null },
];

export default {
  name: 'inquerylist',
  components: {
    Pagination,
  },
  setup() {
    const global = inject('global');
    global.pharmacyTab$.next('0');
    const searchDrugId = ref('');
    const searchDrugName = ref('');
    headers = ref(headers);
    const { state, getList, delItem } = useList();
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
      isOpenAddDrugDialog,
      openAddDialog,
      toggleDetail,
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
  // grid-template-columns: repeat(10, minmax(90px, 1fr));
  grid-template-columns: repeat(10, 1fr);
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
