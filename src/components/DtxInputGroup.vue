<template>
  <div class="flex relative my-flex">
    <div class="grid max-content" :style="labelWidth ? `grid-template-columns: ${labelWidth}px !important;` : ''">
      <span class="flex dtc-label px-3 items-center rounded rounded-r-none text-base">{{ prepend }}</span>
    </div>
    <slot></slot>
    <div class="grid max-content" v-if="append">
      <span class="flex dtc-label px-1 items-center rounded rounded-l-none text-xs">{{ append }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["prepend", "append", "labelWidth"],
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
.dtc-label {
  @apply bg-light-pattern text-black;
}
</style>
