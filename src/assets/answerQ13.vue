<template>
  <div class="px-4 py-4 flex space-x-4 relative">
    <Slider>
      <div id="1"><img /></div>
      <div id="2"><img /></div>
      <div id="3"><img /></div>
      <div id="4"><img /></div>
      <div id="5"><img /></div>
      <div id="6"><img /></div>
    </Slider>
    <component :is="cmp"></component>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cmp: Item1,
    };
  },
  methods: {},
};
</script>

<style></style>
