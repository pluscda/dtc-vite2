<template>
  <section style="background: #4b5563" class="dtc-door-way-section">
    <header class="flex gap-4 dtc-text pl-0s dtc-tabs" style="">
      <div>主訴</div>
      <div>組套</div>
      <div>設為組套</div>
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
.dtc-template-columns {
  grid-template-columns: repeat(11, minmax(90px, 120px)) minmax(90px, 1fr);
}

#app .dtc-grid-header__divs {
  > div {
    height: 34px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    line-height: 30px;
  }
}
</style>
