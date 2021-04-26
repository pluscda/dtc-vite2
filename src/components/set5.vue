<template>
  <section style="background: #4b5563; grid-column: 1/-1" class="dtc-door-way-section grid">
    <header class="flex gap-4 dtc-text pl-1 dtc-tabs" style="grid-column: 1/-1">
      <div style="background: none !important" class="dtc-text cursor-auto">M 用藥</div>
      <div>組套</div>
      <div>設為組套</div>
    </header>

    <Set5List></Set5List>
  </section>
</template>

<script>
import Set5List from "./set5List.vue";
export default {
  data() {
    return {};
  },
  components: {
    Set5List,
  },
};
</script>

<style lang="scss" scoped>
.dtc-tabs::after {
  all: unset;
}
</style>
