<template>
  <div :class="{ hidden: hidden }" class="pagination-container bg-white py-10">
    <el-pagination
      :background="background"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :layout="layout"
      :total="total"
      v-bind="$attrs"
      @current-change="handleCurrentChange"
    />
    <el-select v-model="pageSize">
      <el-option v-for="item in [10, 20, 50]" :key="item" :label="item + ' 條/頁'" :value="item"> </el-option>
    </el-select>
    <div class="pt-2">共 {{ total }} 筆</div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    total: {
      required: true,
      type: Number,
    },
    page: {
      type: Number,
      default: 1,
    },
    limit: {
      type: Number,
      default: 20,
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 50];
      },
    },
    layout: {
      type: String,
      default: "prev, pager, next",
    },
    background: {
      type: Boolean,
      default: true,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:page", "update:limit", "pagination"],
  computed: {
    currentPage: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit("update:page", val);
      },
    },
    pageSize: {
      get() {
        return this.limit;
      },
      set(val) {
        this.$emit("update:limit", val);
      },
    },
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit("pagination", { page: val, limit: this.pageSize });
    },
  },
  watch: {
    pageSize(val) {
      this.currentPage = 1;
      this.$emit("pagination", { page: 1, limit: val });
    },
  },
};
</script>

<style scoped>
.pagination-container {
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(1, max-content) 100px max-content;
  gap: 1rem;
  width: 100vw;
  font-family: Arial, Helvetica, sans-serif, "Microsoft JhengHei" !important;
}
.pagination-container.hidden {
  display: none;
}
</style>
