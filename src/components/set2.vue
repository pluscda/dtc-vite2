<template>
  <section style="background: #4b5563" class="dtc-door-way-section">
    <header class="flex gap-4 dtc-text pl-0s dtc-tabs" style="">
      <section style="background: none !important" class="dtc-text cursor-auto">O 客觀檢查</section>
      <div>組套</div>
      <div>設為組套</div>
      <div hidden>清除</div>
    </header>
    <nav class="w-full border-b-4" style="border-color: #646b74 !important"></nav>
    <footer class="grid grid-rows-[1fr,42px] h-[250px]">
      <Textarea class="w-full" spellcheck="false" placeholder="請輸入客觀檢查..."></Textarea>
      <div class="grid grid-cols-[repeat(200,max-content)] dtc-text py-0.5">
        <span class="px-2 leading-[40px]">血壓</span>
        <input class="w-20" />
        <span class="px-2 leading-[40px]">/</span>
        <input class="w-20" />
        <span class="px-2 leading-[40px]">脈搏</span>
        <input class="w-20" />
        <span class="px-2 leading-[40px]">身高</span>
        <input class="w-20" />
        <span class="px-2 leading-[40px]">體重</span>
        <input class="w-20" />
        <span class="px-2 leading-[40px]">疼痛評估</span>
        <input class="w-24" />
      </div>
    </footer>
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
