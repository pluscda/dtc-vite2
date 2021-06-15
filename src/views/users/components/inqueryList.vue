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
      <div>{{ regDate || "暫無資料" }}</div>
      <div>{{ item.opdtimeName || "暫無資料" }}</div>
      <div>{{ item.roomId || "暫無資料" }}</div>
      <div>{{ item.roomName || "暫無資料" }}</div>
      <div>{{ item.departmentName || "暫無資料" }}</div>
      <div>{{ item.specialtyName || "暫無資料" }}</div>
      <div>{{ item.unkown || "暫無資料" }}</div>
      <div>{{ item.doctorName }}</div>
      <div>{{ item.regCount }}</div>
      <div>{{ item.doneCount }}</div>
      <div>{{ item.totalWaitNum }}</div>
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
        <label v-for="(row, rowId) in 2" :key="rowId">
          <div :title="item.opdDate">{{ item.id || "暫無資料" }}</div>
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
import { toRefs, ref, inject } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import Pagination from "cps/Pagination.vue";
import queryString from "qs";
import dayjs from "dayjs";
import { opdDate$ } from "/@/store";
import { from, interval, timer } from "rxjs";
import { useList } from "/@/hooks/useHis.js";
import { delay, exhaustMap, mergeMap, repeat, switchMap, concatMap } from "rxjs/operators";
//查閱清單
let headers = [
  { name: "掛號日期", key: "opdDate", sortDesc: null },
  { name: "看診時段", key: "opdtimeName", sortDesc: null },
  { name: "診間號碼", key: "roomId", sortDesc: null },
  { name: "診間名稱", key: "roomName", sortDesc: null },
  { name: "診間別名", key: "departmentName", sortDesc: null },
  { name: "科別", key: "specialtyName", sortDesc: null },
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

let subscribe = "",
  subscribe2 = "";
export default {
  name: "inquerylist",
  components: {},
  inject: ["actions"],
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
    headers = ref(headers);
    subHeaders = ref(subHeaders);
    const { state, getList, sort } = useList("/opd/opdShiftList");
    const regDate = ref(dayjs().format("YYYY-MM-DD"));
    subscribe = opdDate$.subscribe((t) => {
      state.listQuery.filter = "opdDate=" + t;
      regDate.value = t.split("T")[0];
      getList();
    });
    const getItem = async (item) => {
      let qs = "shiftId=" + item.shiftId;
      regDate.value.includes("T") ? (qs += "&opdDate=" + regDate.value) : "";
      const { doneCount, regCount } = await actions.getOpdProgress(qs);
      item.doneCount = doneCount;
      item.regCount = regCount;
      item.totalWaitNum = regCount - doneCount;
      return { item, doneCount, regCount };
    };
    const actions = inject("actions");

    timer(500, 5000)
      .pipe(
        switchMap((_) => {
          return from(state.list).pipe(mergeMap(getItem));
        })
      )
      .subscribe(console.log);

    return {
      ...toRefs(state),
      getList,
      headers,
      subHeaders,
      sort,
      regDate,
    };
  },
  beforeUnmount() {
    subscribe.unsubscribe();
    //subscribe2.unsubscribe();
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
