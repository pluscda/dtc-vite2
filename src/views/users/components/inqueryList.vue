<template>
  <section>
    <header class="dtc-grid-header dtc-grid-header__divs dtc-template-columns ml-1">
      <div>查閱清單</div>
      <div>序號</div>
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
      class="dtc-grid-header dtc-grid-body dtc-template-columns text-black ml-1"
      v-for="(item, i) in list"
      :key="i"
      :style="i % 2 == 0 ? 'background-color: #F5F5F5;' : 'background-color: #E0E0E0;'"
    >
      <div><van-switch v-model="item.review" size="small" /></div>
      <div>{{ i + 1 }}</div>
      <div>{{ item.id || "暫無資料" }}</div>
      <div>{{ item.name || "暫無資料" }}</div>
      <div>{{ item.age || "暫無資料" }}</div>
      <div>{{ item.id || "暫無資料" }}</div>
      <div>{{ item.name || "暫無資料" }}</div>
      <div>{{ item.age || "暫無資料" }}</div>
      <div>{{ item.id || "暫無資料" }}</div>
      <div>{{ item.name || "暫無資料" }}</div>
      <div>{{ item.age || "暫無資料" }}</div>
      <div>{{ item.id || "暫無資料" }}</div>
      <div>{{ item.name || "暫無資料" }}</div>
    </main>

    <!-- 分頁 -->
    <pagination v-show="total > 0" :total="total" v-model:page="listQuery.page" v-model:limit="listQuery.limit" @pagination="getList"></pagination>
  </section>
</template>

<script>
import { toRefs, ref } from "vue";
import { useRouter } from "vue-router";
import { Message } from "element3";
import Pagination from "cps/Pagination.vue";
import DtxInputGroup from "cps/DtxInputGroup.vue";
import { useList } from "../model/userModel";
//查閱清單
let headers = [
  { name: "掛號日期", key: "id", sortDesc: null },
  { name: "看診時段", key: "name", sortDesc: null },
  { name: "診間號碼", key: "name", sortDesc: null },
  { name: "診間名稱", key: "age", sortDesc: null },
  { name: "診間別名", key: "age", sortDesc: null },
  { name: "科別", key: "age", sortDesc: null },
  { name: "醫師代號", key: "age", sortDesc: null },
  { name: "醫師姓名", key: "age", sortDesc: null },
  { name: "掛號人數", key: "age", sortDesc: null },
  { name: "已看診數", key: "age", sortDesc: null },
  { name: "待看診數", key: "age", sortDesc: null },
];

let subHeaders = [
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
  components: { DtxInputGroup },
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
    // 玩家列表數據
    const router = useRouter();
    headers = ref(headers);
    subHeaders = ref(subHeaders);
    const { state, getList, delItem } = useList();

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

    return {
      ...toRefs(state),
      getList,
      handleEdit,
      handleDelete,
      headers,
      subHeaders,
    };
  },
};
</script>

<style lang="scss" scoped>
.dtc-template-columns {
  grid-template-columns: 65px 60px repeat(10, 95px) 1fr;
}
</style>
