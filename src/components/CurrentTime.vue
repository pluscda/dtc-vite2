<template>
  <div style="contain: layout">當前時間: {{ timestamp }}</div>
</template>

<script setup>
import { ref } from "vue";
import { timer } from "rxjs";
import dayjs from "dayjs";
import { tryOnUnmounted } from "@vueuse/core";

const timestamp = ref("");
const converToCurrentTime = () => (timestamp.value = dayjs().format("YYYY-MM-DD HH:mm:ss"));

const sub = timer(0, 1000).subscribe(converToCurrentTime);

tryOnUnmounted(() => {
  sub.unsubscribe();
});
</script>

<style lang="scss" scoped></style>
