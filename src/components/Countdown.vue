<template>
  <div class="">{{ timestamp }}</div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import { timer } from 'rxjs';
import { tryOnUnmounted } from '@vueuse/core';

const props = defineProps({
  secs: Number,
});

const timestamp = props.secs ? ref(props.secs) : ref(60);
const converToCurrentTime = (i) => (timestamp.value ? (timestamp.value -= 1) : timestamp.value);

const sub = timer(0, 1000).subscribe(converToCurrentTime);

tryOnUnmounted(() => {
  sub.unsubscribe();
});
</script>

<style lang="scss" scoped>
.test {
  font-size: 1rem;
}
</style>
