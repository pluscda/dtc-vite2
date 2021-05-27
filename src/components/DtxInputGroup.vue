<template>
  <div class="relative flex my-flex items-stretch">
    <div class="grid max-content" :style="labelWidth ? `grid-template-columns: ${labelWidth}px !important;` : ''">
      <span class="flex items-center px-3 text-base rounded rounded-r-none dtc-label dtx-prepend">{{ prepend }}</span>
    </div>
    <div class="w-full"><slot></slot></div>
    <div class="grid max-content" v-if="append">
      <span class="flex items-center px-1 text-xs rounded rounded-l-none dtc-label">{{ append }}</span>
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
  height: clamp(40px, auto, 400vh);
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
