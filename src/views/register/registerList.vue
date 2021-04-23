<template>
  <section>
    <header class="grid pr-2 dtc-page-header dtc-page-header__grid">
      <div>掛號總覽清單</div>
    </header>
    <nav class="mt-3 mb-2 ml-1 dtc-search-filters">
      <DtxInputGroup prepend="掛號日期">
        <Calendar class="h-10" v-model="value" placeholder="請輸入日期" :showIcon="true" dateFormat="yy-mm-dd" />
      </DtxInputGroup>
      <div class="pt-2 mx-1 dtc-text">至</div>
      <Calendar class="h-10" v-model="value2" placeholder="請輸入日期" :showIcon="true" dateFormat="yy-mm-dd" />
      <DtxInputGroup prepend="身分證號">
        <el-input placeholder="搜尋身份證字號" v-model="input2" />
      </DtxInputGroup>
      <DtxInputGroup prepend="醫師姓名">
        <el-input placeholder="搜尋醫師姓名" v-model="input2" />
      </DtxInputGroup>
      <Button label="進行查詢" icon="pi pi-search" />
      <Button label="清除查詢" class="p-button-secondary" icon="pi pi-undo" />
    </nav>
    <nav class="mb-2 ml-1 dtc-search-filters">
      <DtxInputGroup prepend="病歷號碼">
        <el-input placeholder="搜尋病歷號碼" v-model="input2" />
      </DtxInputGroup>
    </nav>

    <header class="mx-1 dtc-grid-header dtc-grid-header__divs dtc-template-columns">
      <div>操作</div>
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
      class="mx-1 ml-1 text-black dtc-grid-header dtc-grid-body dtc-template-columns"
      v-for="(item, i) in list"
      :key="i"
      :style="i % 2 == 0 ? 'background-color: #F5F5F5;' : 'background-color: #E0E0E0;'"
    >
      <div class="flex flex-none space-x-2">
        <Button label="編輯" class="p-button-sm" />
        <Button label="取消掛號" class="p-button-sm p-button-warning" />
      </div>

      <div>{{ item.id.slice(0, 6) || "暫無資料" }}</div>
      <div>{{ item.registerTimestamp.split("T")[0] || "暫無資料" }}</div>
      <div>{{ item.registerSection || "暫無資料" }}</div>
      <div>{{ item.registerNo || "暫無資料" }}</div>
      <div>{{ item.doctorName || "暫無資料" }}</div>
      <div>{{ item.registerAlias || "暫無資料" }}</div>
      <div>{{ item.registerAlias || "暫無資料" }}</div>
      <div>{{ item.category || "暫無資料" }}</div>
      <div>{{ item.totalWaitNum || "暫無資料" }}</div>
      <div>{{ item.totalWaitNum || "暫無資料" }}</div>
      <div>{{ item.registerSection || "暫無資料" }}</div>
      <div>{{ item.registerSection || "暫無資料" }}</div>
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

import { useList } from "/@/hooks/useHis.js";
//身分證號
let headers = [
  { name: "掛號清單", key: "id", sortDesc: null },
  { name: "掛號/預約日期", key: "registerTimestamp", sortDesc: null },
  { name: "看診時段", key: "registerSection", sortDesc: null },
  { name: "看診號", key: "registerNo", sortDesc: null },
  { name: "看診狀態", key: "registerAlias", sortDesc: null },
  { name: "就醫類別", key: "registerAlias", sortDesc: null },
  { name: "科別", key: "category", sortDesc: null },
  { name: "病歷號碼", key: "totalWaitNum", sortDesc: null },
  { name: "病換姓名", key: "doctorName", sortDesc: null },
  { name: "身分證號", key: "id", sortDesc: null },
  { name: "醫師姓名", key: "doctorName", sortDesc: null },
  { name: "診間", key: "registerAlias", sortDesc: null },
];

export default {
  name: "inquerylist",

  data() {
    return {
      input1: "J120092876",
      value: "",
      value2: "",
      zh: {
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
      },
    };
  },
  components: {
    Pagination,
  },
  setup() {
    // 玩家列表數據
    const router = useRouter();
    headers = ref(headers);
    const { state, getList, sort, clearFilters, removeItem, getItemDetail } = useList("his-histories");

    // 用戶更新
    function handleEdit({ row }) {
      router.push({
        name: "userEdit",
        params: { id: row.id },
      });
    }

    // 刪除玩家
    function handleDelete({ row }) {
      delItem(row.id).then(() => {
        // todo:刪除這一行，或者重新獲取數據
        // 通知用戶
        Message.success("刪除成功！");
      });
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
      toggleDetail,
      sort,
    };
  },
  mounted() {
    this.$primevue.config.locale = this.zh;
  },
};
</script>

<style lang="scss" scoped>
.dtc-template-columns {
  grid-template-columns: 140px 90px 126px repeat(8, minmax(90px, 120px)) 120px minmax(90px, 1fr);
}
</style>
