<template>
  <section class="relative top-section">
    <main class="warning-idle" v-if="idle1 && !$route.path.includes('login')">
      <nav>
        <header>基本醫療服務系統資訊</header>
        <p style="margin-top: 35px">系統已閒置一段期間,會將您自動登出帳戶</p>
        <p style="margin-top: 12px">
          將在
          <CountDown class="text-black text-lg inline-block" :secs="60"></CountDown>
          秒鐘之後自動登出
        </p>
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
import { watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import CountDown from "cps/Countdown.vue";
const { idle: idle1 } = useIdle(9 * 60 * 1000); // 9 min
const { idle: idle2 } = useIdle(10 * 60 * 1000); // 10 min
const router = useRouter();
const route = useRoute();
watch(idle2, () => {
  if (idle2.value && !route.path.includes("login")) {
    router.push("login");
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

<style lang="scss">
#app.dark-mode {
  background: var(--dark) !important;
  .top-section {
    box-shadow: 100vw 100vh 0 var(--dark) !important;
    background: var(--dark) !important;
  }
  .bg-white {
    background: none !important;
  }

  .dtc-page-header,
  .dtc-grid-header__divs > div {
    background-image: none !important;
    background: #646b74 !important;
    box-shadow: 100vw 0 0 #646b74;
    color: #fff;
    border-color: var(--light) !important;
  }
  .dtc-grid-body {
    > div {
      background: var(--bs-gray-dark) !important;
      color: var(--light) !important;
      border-color: var(--light) !important;
    }
  }
  .dtc-label {
    background: none !important;
    background: #646b74 !important;
    box-shadow: 100vw 0 0 #646b74;
    color: #fff;
  }
  input,
  .el-radio,
  .dtc-text {
    color: white !important;
    background: var(--gray-dark) !important;
    border: none !important;
    @apply ring-2 ring-coolGray-600;
  }
  .el-radio,
  .dtc-text {
    @apply ring-0;
  }
  .dtc-tabs {
    > * {
      background-image: none !important;
      background: #646b74 !important;
      box-shadow: 100vw 0 0 #646b74 !important;
      color: #fff !important;
    }
    .active {
      color: orange !important;
    }
    &::after {
      background: #646b74 !important;
    }
  }
  main .basic-info {
    // fix for ray
    background: none !important;
    background: #898b8d !important;
  }
}
</style>
