<template>
  <section class="relative">
    <main class="warning-idle" v-if="idle && !$route.path.includes('login')">
      <nav>
        <header>基本醫療服務系統資訊</header>
        <p style="margin-top: 35px">系統已閒置一段期間,會將您自動登出帳戶</p>
        <p style="margin-top: 12px">將在 {{ 60 - idledFor }} 秒鐘之後自動登出</p>
      </nav>
    </main>
    <router-view></router-view>
  </section>
</template>

<script>
import { global, actions, mutations } from "/@/store/global";

export default {
  name: "App",
  provide: {
    global,
    actions,
    mutations,
  },
};
</script>

<script setup>
import { useIdle } from "@vueuse/core";
import { useTimestamp } from "@vueuse/core";
import { computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
const { idle, lastActive } = useIdle(9 * 60 * 1000); // 9 min
//const { idle, lastActive } = useIdle(1 * 1000); // 9 min
const { timestamp: now } = useTimestamp();
const router = useRouter();
const route = useRoute();
const idledFor = computed(() => Math.floor((now.value - lastActive.value) / 1000));
watch(idledFor, () => {
  if (idledFor.value > 59 && !route.path.includes("login")) {
    router.push("/login");
  }
});
</script>

<style lang="scss">
#app {
  font-family: "Microsoft JhengHei", Helvetica, Arial, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.warning-idle {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(#000, 0.8);
  display: grid;
  place-items: center;
  z-index: 99999;
  > nav {
    width: 500px;
    height: 200px;
    border-radius: 5px;
    color: black;
    background: var(--light);
    display: flex;
    flex-direction: column;
    text-align: center;
    header {
      height: 40px;
      color: white;
      background: var(--danger);
      font-size: 20px;
      padding-left: 5px;
      line-height: 40px;
    }
  }
}
</style>
