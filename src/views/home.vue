<template>
  <div>
    <HelloWorld msg="hello vue3 + vite"></HelloWorld>
    <router-link to="/home/1">detail1</router-link>
    <router-link to="/home/2">detail2</router-link>
    <icon-accessibility />
    <icon-account-box style="font-size: 2em; color: red" />
    <router-view></router-view>
  </div>
</template>

<script setup>
import HelloWorld from "/@/components/HelloWorld.vue";
import IconAccessibility from "virtual:vite-icons/carbon/accessibility";
import IconAccountBox from "virtual:vite-icons/mdi/account-box";
</script>

<style scoped></style>
