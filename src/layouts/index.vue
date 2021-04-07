<template>
  <section style="overflow-x: hidden">
    <NavBar></NavBar>
    <router-view></router-view>
  </section>
</template>

<script setup>
import NavBar from "/@/layouts/components/Navbar.vue";
</script>

<style lang="scss" scoped></style>
