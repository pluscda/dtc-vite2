<template>
  <section class="overflow-x-hidden">
    <NavBar></NavBar>
    <main class="overflow-x-hidden overflow-y-hidden">
      <router-view></router-view>
    </main>
  </section>
</template>

<script setup>
import NavBar from "/@/layouts/components/Navbar.vue";
</script>

<style lang="scss" scoped></style>
