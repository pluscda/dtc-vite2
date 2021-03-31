<template>
  <div class="flex relative my-flex">
    <div class="grid max-content">
      <span class="flex px-3 items-center bg-gray-500 text-white rounded rounded-r-none text-sm">{{ prepend }}</span>
    </div>
    <slot></slot>
    <div class="grid max-content" v-if="append">
      <span class="flex px-1 items-center bg-gray-500 text-white rounded rounded-l-none text-xs">{{ append }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["prepend", "append"],
};
</script>

<style lang="scss" scoped>
.max-content {
  grid-template-columns: max-content;
  max-height: 40px;
}
.my-flex {
  flex-basis: 100%;
}

:deep(.el-select) {
  width: 100%;
}
</style>
