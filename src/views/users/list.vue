<template>
  <div class="app-container">
    <div class="btn-container">
      <!-- 新增按钮 -->
      <router-link to="/users/create">
        <el-button type="success" icon="el-icon-edit">创建用户</el-button>
      </router-link>
    </div>
    <header class="dtc-grid-header dtc-headers dtc-template-columns">
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
      class="dtc-grid-header dtc-grid-body dtc-template-columns text-black"
      v-for="(item, i) in list"
      :key="i"
      :style="i % 2 == 0 ? 'background-color: #F5F5F5;' : 'background-color: #E0E0E0;'"
    >
      <div>
        <b-button variant="success" size="sm" @click="edit(item)">查詢</b-button>
      </div>
      <div>{{ item.Seq || "暫無資料" }}</div>
      <div>{{ item.ScheduleTime || "暫無資料" }}</div>
      <div>{{ item.Seq || "暫無資料" }}</div>
    </main>

    <!-- 分页 -->
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
  { name: "年龄", key: "age", sortDesc: null },
];

export default {
  name: "UserList",
  components: {
    Pagination,
  },
  setup() {
    // 玩家列表数据
    const router = useRouter();
    headers = ref(headers);
    const { state, getList, delItem } = useList();

    // 用户更新
    function handleEdit({ row }) {
      router.push({
        name: "userEdit",
        params: { id: row.id },
      });
    }

    // 删除玩家
    function handleDelete({ row }) {
      delItem(row.id).then(() => {
        // todo:删除这一行，或者重新获取数据
        // 通知用户
        Message.success("删除成功！");
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
