<template>
  <section style="width: 99vw">
    <header class="ml-1 dtc-grid-header dtc-grid-header__divs dtc-template-columns">
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
      class="ml-1 text-black cursor-pointer dtc-grid-header dtc-grid-body dtc-template-columns"
      v-for="(item, i) in list"
      :key="i"
      :style="i % 2 == 0 ? 'background-color: #F5F5F5;' : 'background-color: #E0E0E0;'"
    >
      <div class="flex flex-none space-x-2">
        <Button label="藥典" class="p-button-sm" @click.stop="editItem(item)" />
        <el-popconfirm title="確定刪除嗎？" confirmButtonText="好的" cancelButtonText="不用了" @confirm="removeItem(item)">
          <template #reference>
            <Button label="刪除" class="p-button-sm p-button-warning" />
          </template>
        </el-popconfirm>
      </div>
      <div>{{ i + 1 }}</div>
      <div>{{ item.registerTimestamp.split("T")[0] }}</div>
      <div>{{ item.registerSection || "暫無資料" }}</div>
      <div>{{ item.registerNo || "暫無資料" }}</div>
      <div>{{ item.registerName || "暫無資料" }}</div>
      <div>{{ item.registerAlias || "暫無資料" }}</div>
      <div>{{ item.category || "暫無資料" }}</div>
      <div>{{ item.doctorNo || "暫無資料" }}</div>
      <div>{{ item.doctorName || "暫無資料" }}</div>
      <div>{{ item.totalRegisterNum || "暫無資料" }}</div>
    </main>

    <!-- 分頁 -->
    <!-- <pagination v-show="total > 0" :total="total" v-model:page="listQuery.page" v-model:limit="listQuery.limit" @pagination="getList"></pagination> -->
  </section>
</template>

<script>
import { toRefs, ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import Pagination from "cps/Pagination.vue";
import queryString from "qs";
import { useList } from "/@/hooks/useHis.js";
let headers = [
  { name: "藥品名稱", key: "registerTimestamp", sortDesc: null },
  { name: "藥品類型", key: "registerSection", sortDesc: null },
  { name: "給藥方式", key: "registerNo", sortDesc: null },
  { name: "煎藥方式", key: "registerName", sortDesc: null },
  { name: "單一用量", key: "registerAlias", sortDesc: null },
  { name: "單位名稱", key: "category", sortDesc: null },
  { name: "頻率代碼", key: "doctorNo", sortDesc: null },
  { name: "頻率名稱", key: "doctorName", sortDesc: null },
  { name: "天數", key: "totalRegisterNum", sortDesc: null },
  { name: "總量", key: "totalCheckedNum", sortDesc: null },
];
export default {
  data() {
    return {};
  },
  components: {
    Pagination,
  },
  setup() {
    const router = useRouter();
    headers = ref(headers);
    const { state, getList, sort, clearFilters } = useList("his-histories");

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
      toggleDetail,
      sort,
    };
  },
};
</script>

<style lang="scss" scoped>
.dtc-tabs::after {
  all: unset;
}
.dtc-template-columns {
  grid-template-columns: 110px 250px repeat(8, minmax(90px, 120px)) minmax(90px, 1fr);
}

#app .dtc-grid-header__divs {
  > div {
    height: 34px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    line-height: 30px;
  }
}
</style>
