<template>
  <div class="flex relative">
    <div class="grid max-content">
      <span class="flex px-3 items-center bg-gray-500 text-white rounded rounded-r-none text-sm">{{ prepend }}</span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["prepend"],
};
</script>

<style lang="scss" scoped>
.max-content {
  grid-template-columns: max-content;
}
</style>
