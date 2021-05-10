<template>
  <section style="background: #4b5563" class="dtc-door-way-section">
    <header class="flex gap-4 dtc-text pl-0s dtc-tabs" style="">
      <section style="background: none !important" class="dtc-text cursor-auto">S 主訴</section>
      <div>組套</div>
      <div>設為組套</div>
      <div>清除</div>
    </header>
    <nav class="w-full border-b-4" style="border-color: #646b74 !important"></nav>
    <Textarea class="w-full" style="height: 250px" spellcheck="false" placeholder="請輸入主訴..."></Textarea>
    <keep-alive>
      <component :is="Textarea"> </component>
    </keep-alive>
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
