<template>
  <section style="width: 99vw">
    <header class="ml-1 dtc-grid-header dtc-grid-header__divs dtc-template-columns">
      <div>序號</div>

      <div v-for="(item, i) in headers" :key="i" @click="sort(headers, item)">
        {{ item.name }}
      </div>
      <div>操作</div>
    </header>
    <main
      class="ml-1 text-black cursor-pointer dtc-grid-header dtc-grid-body dtc-template-columns"
      v-for="(item, i) in 5"
      style="max-height: 48px"
      :key="i"
      :style="i % 2 == 0 ? 'background-color: #F5F5F5;' : 'background-color: #E0E0E0;'"
    >
      <div>{{ i + 1 }}</div>

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
          style="max-height: 40px; width: clamp(100%, 100%, 100%) !important"
          v-model="item.icdWords2"
          :suggestions="item.filteredICDWords2"
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
        <el-input placeholder="" v-model="input" clearable> </el-input>
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
        <el-input placeholder="" v-model="input" clearable> </el-input>
      </div>
      <div>
        <Checkbox v-model="checked" :binary="true" class="transform -translate-y-2" />
      </div>
      <div>
        <el-input placeholder="" v-model="input" clearable> </el-input>
      </div>
      <div>
        <el-input placeholder="" v-model="input" clearable> </el-input>
      </div>
      <div class="flex space-x-2">
        <Button label="藥典" class="p-button-sm" @click.stop="editItem(item)" />
        <el-popconfirm title="確定刪除嗎？" confirmButtonText="好的" cancelButtonText="不用了" @confirm="removeItem(item)">
          <template #reference>
            <Button label="刪除" class="p-button-sm p-button-warning" />
          </template>
        </el-popconfirm>
      </div>
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
  { name: "代碼", key: "registerTimestamp", sortDesc: null },
  { name: "藥品名稱", key: "registerSection", sortDesc: null },
  { name: "日劑量", key: "registerNo", sortDesc: null },
  { name: "次劑量", key: "registerName", sortDesc: null },
  { name: "頻率", key: "registerAlias", sortDesc: null },
  { name: "途徑", key: "category", sortDesc: null },
  { name: "日份", key: "doctorNo", sortDesc: null },
  { name: "單位", key: "doctorName", sortDesc: null },
  { name: "調劑", key: "totalRegisterNum", sortDesc: null },
  { name: "總量", key: "totalCheckedNum", sortDesc: null },
  { name: "慢簽", key: "doctorName", sortDesc: null },
  { name: "健保單價", key: "totalRegisterNum", sortDesc: null },
  { name: "自費單價", key: "totalCheckedNum", sortDesc: null },
];

export default {
  data() {
    return {
      checked: false,
      input: "",
    };
  },
  components: {
    Pagination,
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
  grid-template-columns: 60px 200px 1fr 120px repeat(10, minmax(67px, 90px)) 120px;
}

#app .dtc-grid-header__divs {
  > div {
    height: 34px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    line-height: 30px;
  }
}
:deep(.p-autocomplete-input) {
  width: 100%;
  display: block;
  border-color: transparent;
}
</style>
