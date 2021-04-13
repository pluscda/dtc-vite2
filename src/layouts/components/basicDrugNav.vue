<template>
  <div v-for="(item, i) in titles" :key="item" class="cursor-pointer" :class="i == 0 ? 'text-orange-400' : ''">
    {{ item }}
  </div>
</template>

<script setup lang="ts">
const titles = ["藥品訊息維護", "藥品廠商維護", "藥品訊息維護"];
</script>

<style scoped></style>
