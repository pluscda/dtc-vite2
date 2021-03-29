<template>
  <div class="flex relative">
    <div class="flex -mr-px">
      <span class="flex px-4 items-center bg-gray-500 text-white rounded rounded-r-none text-sm">{{ prepend }}</span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["prepend"],
};
</script>

<style lang="scss" scoped></style>
