<template>
  <section class="app-main">
    <!-- 内部应该显示子路由页面信息 -->
    <div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
      <div class="flex-shrink-0">
        <img class="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo" />
      </div>
      <div>
        <div class="text-xl font-medium text-black">ChitChat</div>
        <p class="text-gray-500">You have a new message!</p>
      </div>
    </div>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </section>
</template>

<script>
export default {
  name: "AppMain",
};
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>
