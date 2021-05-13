<template>
  <section>
    <header class="flex pr-2 dtc-page-header space-x-3 py-1">
      <div class="transform -translate-y-1">掛號總覽清單</div>
      <Button>預約掛號</Button>
      <Button class="p-button-success">預約住院</Button>
      <Button class="p-button-info">慢病紀錄</Button>
      <Button class="p-button-warning">開立證明</Button>
      <Button class="p-button-help">跨院調閱</Button>
      <Button class="p-button-danger">手術排程</Button>
      <Button>檢驗報告</Button>
      <div style="flex: 1"></div>
      <div class="justify-end flex space-x-4 pr-2">
        <div>掛號: 2</div>
        <div>已看: 4</div>
        <div>未看: 6</div>
        <div>保留: 8</div>
      </div>
    </header>
    <header class="flex pr-2 dtc-page-header space-x-3 transform -translate-y-0.5">
      <div class="py-1 flex">
        <Button class="p-button-warning">同科換診</Button>
      </div>
      <div style="width: 210px" class="py-1">
        <el-input size="small" class="transform -translate-y-1.5" placeholder="請輸入病歷號碼"></el-input>
      </div>
      <!--  -->
      <div style="flex: 1"></div>
      <div class="justify-end flex space-x-7 pr-2">
        <div>一般內科</div>
        <div>第一診</div>
      </div>
    </header>
    <header class="flex pr-2 dtc-page-header space-x-6 transform -translate-y-0.5">
      <div>目前診號: 02</div>
      <div>病歷號: 322324</div>
      <div>姓名: 立證明</div>
      <div>性別: 8</div>
      <div>年齡: 37</div>
      <div>生日: 20/20/20</div>
      <div>身分證號: A128873654</div>
    </header>

    <nav class="mt-3 mb-2 ml-1 dtc-search-filters relative">
      <DtxInputGroup prepend="序號搜尋">
        <el-input placeholder="搜尋序號" v-model="input2" />
      </DtxInputGroup>
      <DtxInputGroup prepend="病歷號碼">
        <el-input placeholder="搜尋病歷號碼" v-model="input2" />
      </DtxInputGroup>
      <DtxInputGroup prepend="病患身份">
        <el-input placeholder="搜尋病患身份" v-model="input2" />
      </DtxInputGroup>
      <Button label="進行查詢" icon="pi pi-search" />
      <Button label="清除查詢" class="p-button-secondary" icon="pi pi-undo" />
      <div class="absolute right-4">
        <Button :disabled="!checked" class="p-button-help">確認上傳</Button>
      </div>
    </nav>

    <header class="mx-1 dtc-grid-header dtc-grid-header__divs dtc-template-columns">
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
      <div>上傳</div>
    </header>
    <main
      class="dtc-grid-header dtc-grid-body dtc-template-columns text-black ml-1 mx-1 animate__fadeInUp"
      v-for="(item, i) in list"
      :key="i"
      style="animation-duration: 0.3s"
      :style="i % 2 == 0 ? 'background-color: #F5F5F5;' : 'background-color: #E0E0E0;'"
    >
      <div>{{ i + 1 }}</div>
      <div>暫無資料</div>
      <div>暫無資料</div>
      <div>暫無資料</div>
      <div>暫無資料</div>
      <div>暫無資料</div>
      <div>暫無資料</div>
      <div>暫無資料</div>
      <div>暫無資料</div>
      <div>暫無資料</div>
      <div>暫無資料</div>
      <div><Checkbox v-model="checked" :binary="true" class="transform -translate-y-2" /></div>
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
  { name: "病歷號碼", key: "id", sortDesc: null },
  { name: "病患姓名", key: "registerTimestamp", sortDesc: null },
  { name: "病患性別", key: "registerSection", sortDesc: null },
  { name: "病患年齡", key: "registerNo", sortDesc: null },
  { name: "病患身份", key: "registerAlias", sortDesc: null },
  { name: "英文姓名", key: "registerAlias", sortDesc: null },
  { name: "報到", key: "category", sortDesc: null },
  { name: "狀態", key: "totalWaitNum", sortDesc: null },
  { name: "時間", key: "doctorName", sortDesc: null },
  { name: "備註", key: "id", sortDesc: null },
];

let tabs = ["預約掛號", "預約住院", "慢行紀錄", "開立證明", "跨院調閱", "醫療影像", "手術排程", "檢驗報告"];

export default {
  name: "inquerylist",

  data() {
    return {
      input1: "J120092876",
      value: "",
      value2: "",
      tabs,
      headers,
      checked: false,
    };
  },
  components: {
    Pagination,
  },
  setup() {
    // 玩家列表數據
    const router = useRouter();
    const { state, getList, sort, clearFilters, removeItem, getItemDetail } = useList("drgadds");

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
  grid-template-columns: 60px repeat(9, 120px) 1fr 120px;
}
</style>
