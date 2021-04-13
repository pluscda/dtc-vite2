<template>
  <div v-for="(item, i) in titles" :key="item" class="cursor-pointer" :class="activeTab == i ? 'text-orange-400' : ''">
    {{ item }}
  </div>
</template>

<script setup lang="ts">
const titles = ["藥房庫存查詢作業", "藥品申請單", "藥房退庫單"];
let activeTab = 0;
</script>

<style scoped></style>
