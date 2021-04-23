<template>
  <nav class="text-blue-200 bg-gradient-to-r from-blue-900 to-blue-700 dtc-nav-bar">
    <span> <i-uim:layer-group class="pt-2 text-5xl"></i-uim:layer-group></span>
    <div class="pt-5 text-xl transform -translate-x-4 cursor-pointer" @click="$router.push('/home')">基本醫療服務</div>
    <section class="flex items-center gap-8 -mt-3 cursor-pointer">
      <div @click="$router.push('/home')">門診</div>
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
            <el-dropdown-item @click="updatePharmacyRouter('/pharmacy/drugmanagement', 1)">基本資料設定</el-dropdown-item>
            <el-dropdown-item @click="updatePharmacyRouter('/pharmacy/drugwarehouseinquire', 2)">藥庫管理</el-dropdown-item>
            <el-dropdown-item @click="updatePharmacyRouter('/pharmacy/drugstoreinstock', 3)">藥房管理</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </section>
    <div class="relative grid grid-cols-2 cursor-pointer" @click="toggleBg">
      <CurrentTime class="absolute inset-x-0 mt-3 -ml-80"></CurrentTime>
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
        <header class="absolute inset-x-0 inset-y-0 h-10 pt-2 text-lg text-center text-white bg-coolGray-500">個人中心</header>
        <ul class="relative grid grid-cols-2 gap-2 pt-10">
          <div class="p-field-radiobutton" style="margin: 0 auto">
            <Button label="登出" class="p-button" style="font-size: 0.9rem" @click="logout" />
          </div>
          <div class="p-field-radiobutton">
            <Button label="更改密碼" class="px-10 p-button p-button-warning" style="font-size: 0.9rem" />
          </div>
        </ul>
      </OverlayPanel>
    </div>
  </nav>
</template>

<script>
import { logout$, leftSideBar$ } from "/@/store";
export default {
  name: "navbar2",
  inject: ["mutations"],
  methods: {
    logout() {
      logout$.next("logout");
      this.$router.push("/login");
    },
    updatePharmacyRouter(url, tabNum) {
      leftSideBar$.next(tabNum);
      this.$router.push(url);
    },
  },
  created() {
    if (location.href.includes("/pharmacy")) {
      this.$router.push("/pharmacy/drugmanagement");
    }
  },
};
</script>

<script setup>
import { ref, inject, watch } from "vue";
import CurrentTime from "cps/CurrentTime.vue";
import { tryOnMounted } from "@vueuse/shared";
const bgPanel = ref(null);
const avatarPanel = ref(null);
const bgColor = ref("dark");

const toggleAvatar = (event) => avatarPanel.value.toggle(event);
const global = inject("global");

watch(bgColor, (v) => {
  document.querySelector("#app").className = v ? "dark" : "light";
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
