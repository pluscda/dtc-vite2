<template>
  <div>
    <HelloWorld msg="hello vue3 + vite"></HelloWorld>
    <router-link to="/home/1">detail1</router-link>
    <router-link to="/home/2">detail2</router-link>
    <i-carbon-accessibility />
    <i-mdi-account-box style="font-size: 2em; color: red" />
    <i-uim:google-play></i-uim:google-play>

    <i-uim:behance></i-uim:behance>
    <router-view></router-view>
  </div>
</template>

<script setup>
import HelloWorld from "/@/components/HelloWorld.vue";
</script>

<style scoped></style>
