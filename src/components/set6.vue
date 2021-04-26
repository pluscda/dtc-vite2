<template>
  <section style="background: #4b5563; grid-column: 1/-1" class="dtc-door-way-section grid">
    <header class="flex gap-4 dtc-text pl-1 dtc-tabs" style="grid-column: 1/-1">
      <div style="background: none !important" class="dtc-text cursor-auto">E 檢查治療</div>
      <div>組套</div>
      <div>設為組套</div>
      <div>列印</div>
    </header>

    <Set6List></Set6List>
  </section>
</template>

<script>
import Set6List from "./set6List.vue";
export default {
  data() {
    return {};
  },
  components: {
    Set6List,
  },
};
</script>

<style lang="scss" scoped>
.dtc-tabs::after {
  all: unset;
}
</style>
