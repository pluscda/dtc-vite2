<template>
  <section>
    <header class="ml-1 dtc-grid-header dtc-grid-header__divs dtc-template-columns">
      <div>查閱清單</div>
      <div>序號</div>
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
      class="ml-1 text-black cursor-pointer dtc-grid-header dtc-grid-body dtc-template-columns"
      v-for="(item, i) in list"
      :key="i"
      :style="i % 2 == 0 ? 'background-color: #F5F5F5;' : 'background-color: #E0E0E0;'"
      @click.stop="toggleDetail(item)"
    >
      <div>
        <InputSwitch class="transform translate-y-1.5" v-model="item.review" size="small" @click.stop="toggleDetail(item)"></InputSwitch>
      </div>
      <div>{{ i + 1 }}</div>
      <div>{{ "暫無資料" }}</div>
      <div>{{ item.registerSection || "暫無資料" }}</div>
      <div>{{ item.registerNo || "暫無資料" }}</div>
      <div>{{ item.registerName || "暫無資料" }}</div>
      <div>{{ item.registerAlias || "暫無資料" }}</div>
      <div>{{ item.category || "暫無資料" }}</div>
      <div>{{ item.doctorNo || "暫無資料" }}</div>
      <div>{{ item.doctorName || "暫無資料" }}</div>
      <div>{{ item.totalRegisterNum || "暫無資料" }}</div>
      <div>{{ item.totalCheckedNum || "暫無資料" }}</div>
      <div>{{ item.totalWaitNum || "暫無資料" }}</div>
      <div class="view-details" v-if="item.review">
        <header class="dtc-grid-header">
          <div v-for="(item, i) in subHeaders" :key="i" @click.stop="sort(item)">
            {{ item.name }}
            <span v-show="item.sortDesc === null" style="display: inline-block; transform: translateY(4px)">
              <i-typcn:arrow-unsorted></i-typcn:arrow-unsorted>
            </span>
            <span v-show="item.sortDesc === false" style="display: inline-block; transform: translateY(4px)">
              <i-typcn:arrow-sorted-down></i-typcn:arrow-sorted-down>
            </span>
            <span v-show="item.sortDesc" style="display: inline-block; transform: translateY(4px)">
              <i-typcn:arrow-sorted-up></i-typcn:arrow-sorted-up>
            </span>
          </div>
        </header>

        <!-- <label v-for="(row, rowId) in item.rows" :key="rowId">
          -->
        <label v-for="(row, rowId) in 2" :key="rowId">
          <div :title="item.id">{{ item.id || "暫無資料" }}</div>
          <div :title="item.name">{{ item.name || "暫無資料" }}</div>
          <div :title="item.age">{{ item.age || "暫無資料" }}</div>
          <div :title="item.id">{{ item.id || "暫無資料" }}</div>
          <div :title="item.name">{{ item.name || "暫無資料" }}</div>
          <div :title="item.age">{{ item.age || "暫無資料" }}</div>
          <div :title="item.id">{{ item.id || "暫無資料" }}</div>
          <div :title="item.name">{{ item.name || "暫無資料" }}</div>
          <div :title="item.age">{{ item.age || "暫無資料" }}</div>
          <div :title="item.id">{{ item.id || "暫無資料" }}</div>
          <div :title="item.name">{{ item.name || "暫無資料" }}</div>
          <div :title="item.age">{{ item.age || "暫無資料" }}</div>
        </label>
      </div>
    </main>

    <!-- 分頁 -->
    <pagination v-show="total > 0" :total="total" v-model:page="listQuery.page" v-model:limit="listQuery.limit" @pagination="getList"></pagination>
  </section>
</template>

<script>
import { toRefs, ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import Pagination from "cps/Pagination.vue";
import queryString from "qs";

import { useList } from "/@/hooks/useHis.js";
//查閱清單
let headers = [
  { name: "掛號日期", key: "registerTimestamp", sortDesc: null },
  { name: "看診時段", key: "registerSection", sortDesc: null },
  { name: "診間號碼", key: "registerNo", sortDesc: null },
  { name: "診間名稱", key: "registerName", sortDesc: null },
  { name: "診間別名", key: "registerAlias", sortDesc: null },
  { name: "科別", key: "category", sortDesc: null },
  { name: "醫師代號", key: "doctorNo", sortDesc: null },
  { name: "醫師姓名", key: "doctorName", sortDesc: null },
  { name: "掛號人數", key: "totalRegisterNum", sortDesc: null },
  { name: "已看診數", key: "totalCheckedNum", sortDesc: null },
  { name: "待看診數", key: "totalWaitNum", sortDesc: null },
];

let subHeaders = [
  { name: "掛號清單", key: "name", sortDesc: null },
  { name: "掛號/預約日期", key: "name", sortDesc: null },
  { name: "看診時段", key: "name", sortDesc: null },
  { name: "看診號", key: "age", sortDesc: null },
  { name: "看診狀態", key: "age", sortDesc: null },
  { name: "就醫類別", key: "age", sortDesc: null },
  { name: "科別", key: "age", sortDesc: null },
  { name: "病歷號碼", key: "age", sortDesc: null },
  { name: "病患姓名", key: "age", sortDesc: null },
  { name: "身分證號", key: "age", sortDesc: null },
  { name: "醫師姓名", key: "age", sortDesc: null },
  { name: "診間", key: "age", sortDesc: null },
];

export default {
  name: "inquerylist",
  components: {},
  data() {
    return {
      input1: "J120092876",
      value: "",
    };
  },
  components: {
    Pagination,
  },

  setup() {
    const router = useRouter();
    headers = ref(headers);
    subHeaders = ref(subHeaders);
    const { state, getList, sort, clearFilters } = useList("drgadds");

    function handleEdit({ row }) {
      router.push({
        name: "userEdit",
        params: { id: row.id },
      });
    }

    function handleDelete({ row }) {
      // delItem(row.id).then(() => {
      //   Message.success("刪除成功！");
      // });
    }

    const toggleDetail = (item) => {
      const review = item.review;
      state.list.forEach((s) => (s.review = false));
      item.review = !review;
    };

    return {
      ...toRefs(state),
      getList,
      handleEdit,
      handleDelete,
      headers,
      subHeaders,
      toggleDetail,
      sort,
    };
  },
};
</script>

<style lang="scss" scoped>
.dtc-template-columns {
  grid-template-columns: 80px 60px repeat(10, minmax(90px, 120px)) minmax(90px, 1fr);
}
.dtc-door-way-section header > div {
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  line-height: 50px;
}
</style>
