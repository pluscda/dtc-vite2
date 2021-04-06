<template>
  <div class="text-lg">
    {{ timestamp }}
  </div>
</template>

<script setup>
import { ref, onUnmounted } from "vue";
import { timer } from "rxjs";
import dayjs from "dayjs";

const timestamp = ref("");
const converToCurrentTime = () => (timestamp.value = dayjs().format("YYYY-MM-DD HH-mm-ss"));

const sub = timer(0, 1000).subscribe(converToCurrentTime);

onUnmounted(){
  sub.unsubscribe();
}
</script>

<style lang="scss" scoped></style>
