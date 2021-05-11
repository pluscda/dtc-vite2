<template>
  <section class="index-position overflow-hidden">
    <main class="overflow-x-hidden overflow-hidden">
      <transition name="fade"> <router-view></router-view> </transition>
    </main>
    <el-backtop target=".index-position" :visibility-height="100" style="color: rgb(58 142 229)">
      <i-mdi:arrow-up style="font-size: 24px"></i-mdi:arrow-up>
    </el-backtop>
  </section>
</template>

<script setup>
import NavBar from "/@/layouts/components/Navbar.vue";
</script>

<style lang="scss" scoped>
.index-position {
  min-height: calc(100vh - 70px) !important;
}
</style>
