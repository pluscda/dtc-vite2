<template>
  <section class="overflow-x-hidden index-position">
    <NavBar></NavBar>
    <main class="grid overflow-x-hidden overflow-y-hidden my-main-part">
      <aside></aside>
      <router-view></router-view>
    </main>
    <el-backtop target=".index-position" :visibility-height="100" style="color: rgb(58 142 229)">
      <i-mdi:arrow-up style="font-size: 24px"></i-mdi:arrow-up>
    </el-backtop>
  </section>
</template>

<script setup>
import NavBar from '/@/layouts/components/Navbar.vue';
</script>

<style lang="scss" scoped>
.index-position {
  height: 100vh;
  //overflow-x: auto;
  overflow-y: auto;
}

aside {
  background: var(--primary) !important;
  min-height: 100vh;
  height: 100vh;
}

.my-main-part {
  grid-template-columns: 150px 1fr;
}
</style>
