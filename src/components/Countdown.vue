<template>
  <div class="inline-block">{{ timestamp }}</div>
</template>

<script setup>
import { ref } from "vue";
import { timer } from "rxjs";
import { tryOnUnmounted } from "@vueuse/core";

const timestamp = ref(60);
const converToCurrentTime = (i) => (timestamp.value -= i);

const sub = timer(0, 1000).subscribe(converToCurrentTime);

tryOnUnmounted(() => {
  sub.unsubscribe();
});
</script>

<style lang="scss" scoped></style>
