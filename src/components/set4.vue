<template>
  <section style="background: #4b5563" class="dtc-door-way-section">
    <header class="flex gap-4 dtc-text pl-0s dtc-tabs">
      <div>計畫</div>
      <div>套組</div>
      <div>設為套組</div>
      <div>清除</div>
    </header>
    <nav class="w-full border-b-4" style="border-color: #646b74 !important"></nav>
  </section>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.dtc-tabs::after {
  all: unset;
}
</style>
