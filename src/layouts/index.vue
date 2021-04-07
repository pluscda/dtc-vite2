<template>
  <section class="index-position overflow-x-hidden">
    <NavBar></NavBar>
    <main class="overflow-x-hidden overflow-y-hidden">
      <router-view></router-view>
    </main>
    <el-backtop
      target=".index-position"
      :visibility-height="100"
      style="color: rgb(147 68 59)"
    >
      <i-mdi:clipboard-arrow-up-outline
        style="font-size: 24px"
      ></i-mdi:clipboard-arrow-up-outline>
    </el-backtop>
  </section>
</template>

<script setup>
import NavBar from "/@/layouts/components/Navbar.vue";
</script>

<style lang="scss" scoped>
.index-position {
  height: 100vh;
  //overflow-x: auto;
  overflow-y: auto;
}
</style>
