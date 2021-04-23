<template>
  <section class="relative top-section">
    <main class="warning-idle" v-if="idle1 && !$route.path.includes('login')">
      <nav>
        <header>基本醫療服務系統資訊</header>
        <p style="margin-top: 35px">系統已閒置一段期間,會將您自動登出帳戶</p>
        <p style="margin-top: 12px">
          將在
          <CountDown class="inline-block text-lg text-black" :secs="60"></CountDown>
          秒鐘之後自動登出
        </p>
      </nav>
    </main>
    <NavBar v-if="!withinLogoutPages"></NavBar>
    <router-view></router-view>
  </section>
</template>

<script>
import { global, actions, mutations } from "/@/store/global";
import { logout$ } from "/@/store";
import NavBar from "/@/layouts/components/Navbar.vue";
import CountDown from "cps/Countdown.vue";
export default {
  name: "App",
  provide: {
    global,
    actions,
    mutations,
  },
  components: {
    NavBar,
    CountDown,
  },
  computed: {
    withinLogoutPages() {
      return this.$route.path.includes("/login"); // || this.$route.path.includes('dtcregister') || this.$route.path.includes('resetpwd');
    },
  },
  mounted() {
    // Mousetrap.init();
    // Mousetrap.bind('4', function () {
    //   alert('4');
    // });
    // Mousetrap.record(function (sequence) {
    //   // sequence is an array like ['ctrl+k', 'c']
    //   alert('You pressed: ' + sequence.join(' '));
    // });
  },
  watch: {
    $route(v) {
      if (!v.path.includes("/login") && !sessionStorage.token) {
        this.$router.replace("/login");
      }
    },
  },
};
</script>

<script setup>
import { useIdle } from "@vueuse/core";
import { watch } from "vue";
import { useRouter } from "vue-router";
const { idle: idle1 } = useIdle(9 * 60 * 1000); // 9 min
const { idle: idle2 } = useIdle(10 * 60 * 1000); // 10 min
const router = useRouter();
watch(idle2, () => {
  //const withinLogoutPages2 = route.path.includes('login'); //|| route.path.includes('dtcregister') || route.path.includes('resetpwd');
  if (idle2.value && sessionStorage.token) {
    logout$.next("logout");
    router.push("/login");
    setTimeout(location.reload(true), 400);
  }
});
</script>

<style lang="scss">
#app {
  font-family: "Microsoft JhengHei", Helvetica, Arial, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  overflow: hidden !important;
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

<style lang="scss"></style>
