<template>
  <div class="text-lg">
    {{ timestamp }}
  </div>
</template>

<script setup>
import { ref } from "vue";
import { timer } from "rxjs";
import dayjs from "dayjs";
import { useSubscription } from "@vueuse/rxjs";
const timestamp = ref("");
const converToCurrentTime = () => (timestamp.value = dayjs().format("YYYY-MM-DD HH-mm-ss"));

useSubscription(timer(0, 1000).subscribe(converToCurrentTime));
</script>

<style lang="scss" scoped></style>
