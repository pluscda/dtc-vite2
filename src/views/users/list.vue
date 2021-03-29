<template>
  <div class="app-container">
    <div class="btn-container">
      <!-- 新增按钮 -->
      <router-link to="/users/create">
        <el-button type="success" icon="el-icon-edit">创建用户</el-button>
      </router-link>
    </div>
    <header class="grid m-0 text-center border-white">
      <div class="w-32 boder border-r-0 text-sm">操作</div>
      <div v-for="(item, i) in headers" :key="i" @click="sort(item)">
        {{ item.name }}
        <span v-show="item.sortDesc === null">
          <i class="fas fa-sort"></i>
        </span>
        <span v-show="item.sortDesc === false">
          <i class="fas fa-sort-up"></i>
        </span>
        <span v-show="item.sortDesc">
          <i class="fas fa-sort-down"></i>
        </span>
      </div>
    </header>
    <el-table v-loading="loading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" prop="id"></el-table-column>
      <el-table-column align="center" label="账户名" prop="name"> </el-table-column>
      <el-table-column align="center" label="年龄" prop="age"> </el-table-column>
      <!-- 操作列 -->
      <el-table-column label="操作" align="center">
        <template v-slot="scope">
          <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope)">更新</el-button>
          <el-button type="danger" icon="el-icon-remove" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

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
