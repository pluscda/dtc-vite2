<template>
  <div class="inline-block">{{ timestamp }}</div>
</template>

<script setup>
import { defineProps, ref, toRefs } from "vue";
import { timer } from "rxjs";
import { tryOnUnmounted } from "@vueuse/core";

const props = defineProps({
  secs: Number,
});

const timestamp = ref(props.secs);
const converToCurrentTime = (i) => (timestamp.value ? (timestamp.value -= i) : timestamp.value);

const sub = timer(0, 1000).subscribe(converToCurrentTime);

tryOnUnmounted(() => {
  sub.unsubscribe();
});
</script>

<style lang="scss" scoped></style>
