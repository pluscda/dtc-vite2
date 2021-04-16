<template>
  <nav class="text-blue-200 bg-gradient-to-r from-blue-900 to-blue-700 dtc-nav-bar">
    <span> <i-uim:layer-group class="pt-2 text-5xl"></i-uim:layer-group></span>
    <div class="pt-5 text-xl transform -translate-x-4 cursor-pointer" @click="$router.push('/home')">基本醫療服務</div>
    <section class="flex gap-8 cursor-pointer items-center -mt-3">
      <div @click="$router.push('/home')">首頁</div>
      <el-dropdown class="" :show-timeout="1">
        <span class="text-blue-200">門急診掛號<i class="el-icon-arrow-down el-icon--right"></i></span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="$router.push('/users/list')">掛號</el-dropdown-item>
            <el-dropdown-item @click="$router.push('/register')">掛號總覽清單</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <el-dropdown class="" :show-timeout="1">
        <span class="text-blue-200">藥局<i class="el-icon-arrow-down el-icon--right"></i> </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="$router.push('/pharmacy/drugmanagement')">基本資料設定</el-dropdown-item>
            <el-dropdown-item @click="$router.push('/pharmacy/drugwarehouseinquire')">藥庫管理</el-dropdown-item>
            <el-dropdown-item @click="$router.push('/pharmacy/drugstoreinstock')">藥房管理</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-dropdown class="" :show-timeout="1">
        <span class="text-blue-200">線上諮詢<i class="el-icon-arrow-down el-icon--right"></i> </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>諮詢-1</el-dropdown-item>
            <el-dropdown-item>諮詢-2</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </section>
    <div class="grid grid-cols-2 cursor-pointer relative" @click="toggleBg">
      <CurrentTime class="absolute inset-x-0 -ml-80 mt-3"></CurrentTime>
      <div class="mt-2.5 relative">
        <el-tooltip content="切換主題顏色" placement="bottom" effect="light">
          <InputSwitch v-model="bgColor" class="transform translate-x-6 translate-y-2" />
        </el-tooltip>
      </div>
    </div>
    <div class="grid grid-cols-1 cursor-pointer" @click="toggleAvatar" style="margin-right: 18px">
      <div class="mt-1">
        <i-carbon:user-avatar-filled-alt style="font-size: 28px; margin-top: 24px"></i-carbon:user-avatar-filled-alt>
      </div>

      <OverlayPanel ref="avatarPanel" showCloseIcon="true" :dismissable="true" class="relative">
        <header class="bg-coolGray-500 text-center text-lg pt-2 absolute inset-x-0 inset-y-0 h-10 text-white">個人中心</header>
        <ul class="grid grid-cols-2 gap-2 pt-10 relative">
          <div class="p-field-radiobutton" style="margin: 0 auto">
            <Button label="登出" class="p-button" style="font-size: 0.9rem" @click="logout" />
          </div>
          <div class="p-field-radiobutton">
            <Button label="更改密碼" class="p-button p-button-warning px-10" style="font-size: 0.9rem" />
          </div>
        </ul>
      </OverlayPanel>
    </div>
  </nav>
</template>

<script>
export default {
  name: "navbar2",
  inject: ["mutations"],
  methods: {
    logout() {
      this.mutations.logout();
      this.$router.push("/login");
    },
  },
};
</script>

<script setup>
import { ref, inject, computed, onMounted, watch } from "vue";
import CurrentTime from "cps/CurrentTime.vue";
import { tryOnMounted } from "@vueuse/shared";
const bgPanel = ref(null);
const avatarPanel = ref(null);
const bgColor = ref("light");

const toggleAvatar = (event) => avatarPanel.value.toggle(event);
const global = inject("global");
const axios = inject("axios");
//const userColor = computed(() => global.userDefaultBgColor);
// alert(global.userDefaultBgColor);
// onMounted(() => {
//   axios.get("/getUsers");
// });
watch(bgColor, (v) => {
  document.querySelector("#app").className = v ? "light" : "dark";
  global.userDefaultBgColor = v;
});
tryOnMounted(() => {
  document.querySelector("#app").className = bgColor.value;
});
</script>

<style lang="scss" scoped>
.dtc-nav-bar {
  width: 100vw;
  height: 70px;
  display: grid;
  padding: 0 1rem;
  line-height: 70px;
  font-size: 1rem;
  grid-template-columns: max-content 160px 1fr max-content max-content;
}
</style>
