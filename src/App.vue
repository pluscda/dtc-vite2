<template>
  <router-view></router-view>
</template>

<script>
import { gstate, actions, mutations } from "/@/store/global";

export default {
  name: "App",
  provide: {
    gstate,
    actions,
    mutations,
  },
};
</script>

<style>
#app {
  font-family: "Microsoft JhengHei", Helvetica, Arial, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
}
</style>
