<template>
  <div class="app-container">
    <header class="dtc-page-header">役男清冊查詢</header>
    <div class="dtc-search-filters ml-1">
      <el-input placeholder="搜尋身份證字號" v-model="input1">
        <template #prepend>身份證號</template>
      </el-input>
      <el-input placeholder="請輸入檢查狀態" v-model="input1">
        <template #prepend>檢查狀態</template>
      </el-input>
      <el-input placeholder="請輸入體檢時間" v-model="input1">
        <template #prepend>體檢時間</template>
      </el-input>
    </div>
    <header class="dtc-grid-header dtc-headers dtc-template-columns ml-1">
      <div>操作</div>
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
      <div class="flex space-x-1">
        <el-button type="primary" size="mini">查詢1</el-button>
        <el-button type="info" size="mini">查詢2</el-button>
      </div>
      <div>{{ item.id || "暫無資料" }}</div>
      <div>{{ item.name || "暫無資料" }}</div>
      <div>{{ item.age || "暫無資料" }}</div>
    </main>

    <!-- 分頁 -->
    <pagination v-show="total > 0" :total="total" v-model:page="listQuery.page" v-model:limit="listQuery.limit" @pagination="getList"></pagination>
  </div>
</template>

<script>
import { toRefs, ref } from "vue";
import { useRouter } from "vue-router";
import { Message } from "element3";
import Pagination from "cps/Pagination.vue";
import { useList } from "./model/userModel";

let headers = [
  { name: "ID", key: "id", sortDesc: null },
  { name: "建立者", key: "name", sortDesc: null },
  { name: "年齡", key: "age", sortDesc: null },
];

export default {
  name: "UserList",
  components: {
    Pagination,
  },
  setup() {
    // 玩家列表數據
    const router = useRouter();
    headers = ref(headers);
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
    };
  },
};
</script>

<style scoped>
.btn-container {
  text-align: left;
  padding: 0px 10px 20px 0px;
}
</style>

<style lang="scss" scoped>
.dtc-template-columns {
  grid-template-columns: 180px repeat(2, 160px) 1fr;
}
</style>
