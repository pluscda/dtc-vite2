<template>
  <div v-for="(item, i) in titles" :key="item" class="cursor-pointer" :class="activeTab == i ? 'text-orange-400' : ''">
    {{ item }}
  </div>
</template>

<script setup lang="ts">
const titles = ["庫存查詢作業", "採購單管理", "入庫單管理", "藥品申請管理", "藥房退庫管理"];
let activeTab = 0;
</script>

<style scoped></style>
