<template>
  <section style="background: #64748b">
    <header class="flex space-x-5 dtc-text pl-0s dtc-tabs" style="">
      <div>主訴</div>
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
