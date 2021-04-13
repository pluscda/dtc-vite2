<template>
  <div v-for="(item, i) in titles" :key="item" class="cursor-pointer" :class="activeTab == i ? 'text-orange-400' : ''">
    {{ item }}
  </div>
</template>

<script setup lang="ts">
const titles = ["藥品訊息維護", "新增藥品資料", "藥品廠商維護", "藥品訊息維護"];
let activeTab = 0;
</script>

<style scoped></style>
