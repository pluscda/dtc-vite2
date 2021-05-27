<template>
  <section style="width: 99vw">
    <header class="ml-1 dtc-grid-header dtc-grid-header__divs dtc-template-columns">
      <div>序號</div>
      <div>操作</div>
      <div v-for="(item, i) in headers" :key="i" @click="sort(headers, item)">
        {{ item.name }}
      </div>
    </header>
    <main
      class="ml-1 text-black cursor-pointer dtc-grid-header dtc-grid-body dtc-template-columns"
      v-for="(item, i) in 3"
      :key="i"
      :style="i % 2 == 0 ? 'background-color: #F5F5F5;' : 'background-color: #E0E0E0;'"
    >
      <div>{{ i + 1 }}</div>
      <div class="flex flex-none space-x-2">
        <el-popconfirm title="確定刪除嗎？" confirmButtonText="好的" cancelButtonText="不用了" @confirm="removeItem(item)">
          <template #reference>
            <Button label="刪除" class="p-button-sm p-button-warning" />
          </template>
        </el-popconfirm>
      </div>
      <div class="flex">
        <AutoComplete
          class="transform"
          style="max-height: 40px"
          v-model="item.icdWords"
          :suggestions="item.filteredICDWords"
          @complete="searchICDWords(item, $event)"
          field="name"
        />
      </div>
      <div class="flex">
        <AutoComplete
          class="transform"
          style="max-height: 40px"
          v-model="item.icdWords"
          :suggestions="item.filteredICDWords"
          @complete="searchICDWords(item, $event)"
          field="name"
        />
      </div>
      <div>
        <el-input placeholder="" v-model="input" clearable> </el-input>
      </div>
      <div>
        <el-input placeholder="" v-model="input" clearable> </el-input>
      </div>
      <div>
        <el-input placeholder="" v-model="input" clearable> </el-input>
      </div>
      <div>
        <Checkbox v-model="checked" :binary="true" class="transform -translate-y-2" />
      </div>
      <div>
        <Checkbox v-model="checked" :binary="true" class="transform -translate-y-2" />
      </div>
      <div>
        <Checkbox v-model="checked" :binary="true" class="transform -translate-y-2" />
      </div>
      <div>
        <Calendar class="h-10 w-full" v-model="tiDrgEffectTime" placeholder="請輸入" :showIcon="true" dateFormat="yy-mm-dd" />
      </div>
      <div><el-input placeholder="" v-model="input" clearable> </el-input></div>
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
  { name: "治療處理代碼", key: "registerTimestamp", sortDesc: null },
  { name: "治療處理名稱", key: "registerSection", sortDesc: null },
  { name: "體檢/部位", key: "registerNo", sortDesc: null },
  { name: "檢查摘要", key: "category", sortDesc: null },
  { name: "數量", key: "doctorNo", sortDesc: null },
  { name: " 緊急", key: "doctorName", sortDesc: null },
  { name: "計價", key: "doctorName", sortDesc: null },
  { name: "自費", key: "totalRegisterNum", sortDesc: null },
  { name: "時間", key: "totalCheckedNum", sortDesc: null },
  { name: "地點", key: "totalCheckedNum", sortDesc: null },
];

export default {
  data() {
    return {
      input: "",
      checked: "",
      tiDrgEffectTime: "",
    };
  },
  components: {
    Pagination,
  },
  mounted() {
    this.$primevue.config.locale = primeVueDateFormat;
  },
  setup() {
    const router = useRouter();
    headers = ref(headers);
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
  grid-template-columns: 60px 70px 190px 190px repeat(6, 110px) 160px 1fr;
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
