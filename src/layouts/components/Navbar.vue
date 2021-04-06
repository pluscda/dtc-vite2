<template>
  <nav
    class="text-blue-200 bg-gradient-to-r from-blue-900 to-blue-700 dtc-nav-bar"
  >
    <i-uim:layer-group class="pt-2 text-5xl"></i-uim:layer-group>
    <div
      class="pt-5 text-xl transform -translate-x-4 cursor-pointer"
      @click="$router.push('/home')"
    >
      基本醫療服務
    </div>
    <section class="flex gap-8 cursor-pointer">
      <div @click="$router.push('/home')">首頁</div>
      <el-dropdown class="max-h-10" :show-timeout="1">
        <span class="text-blue-200"
          >門急診掛號<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu>
          <el-dropdown-item @click="$router.push('/users/list')"
            >掛號</el-dropdown-item
          >
          <el-dropdown-item @click="$router.push('/register')"
            >掛號總覽清單</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown class="max-h-10" :show-timeout="1">
        <span class="text-blue-200"
          >線上諮詢<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu>
          <el-dropdown-item>諮詢-1</el-dropdown-item>
          <el-dropdown-item>諮詢-2</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div>歷史報告</div>
      <div>所得明細</div>
    </section>
    <div class="grid grid-cols-2 cursor-pointer" @click="toggleBg">
      <div class="mt-1">
        <i class="pi pi-cog" style="font-size: 18px"></i>
        <span class="text-blue-200 inline-block -mt-7">背景顏色</span>
      </div>
      <OverlayPanel ref="bgPanel" showCloseIcon="true" :dismissable="true">
        <ul class="grid grid-cols-2 gap-8">
          <div class="p-field-radiobutton">
            <RadioButton id="bgColor1" value="New York" v-model="bgColor" />
            <label for="bgColor1" class="pl-2">New York</label>
          </div>
          <div class="p-field-radiobutton">
            <RadioButton id="bgColor2" value="Taipei" v-model="bgColor" />
            <label for="bgColor2" class="pl-2">Taipei</label>
          </div>
          <div class="p-field-radiobutton">
            <RadioButton id="bgColor3" value="Havaii" v-model="bgColor" />
            <label for="bgColor3" class="pl-2">Hawaii</label>
          </div>
          <div class="p-field-radiobutton">
            <RadioButton id="bgColor4" value="Los Angeles" v-model="bgColor" />
            <label for="bgColor4" class="pl-2">洛杉矶</label>
          </div>
        </ul>
      </OverlayPanel>
    </div>
    <div
      class="grid grid-cols-1 cursor-pointer"
      @click="toggleAvatar"
      style="margin-right: 18px"
    >
      <div class="mt-1">
        <i-carbon:user-avatar-filled-alt
          style="font-size: 24px; margin-top: 22px"
        ></i-carbon:user-avatar-filled-alt>
      </div>
      <OverlayPanel ref="avatarPanel" showCloseIcon="true" :dismissable="true">
        <ul class="grid grid-cols-2 gap-2">
          <div class="p-field-radiobutton" style="margin: 0 auto">
            <Button label="登出" class="p-button" style="font-size: 0.9rem" />
          </div>
          <div class="p-field-radiobutton">
            <Button
              label="更改密碼"
              class="p-button p-button-warning px-10"
              style="font-size: 0.9rem"
            />
          </div>
        </ul>
      </OverlayPanel>
    </div>
  </nav>
</template>

<script setup>
import { ref, inject, computed, onMounted } from "vue";
const bgPanel = ref(null);
const avatarPanel = ref(null);
const bgColor = ref("Taipei");
const toggleBg = (event) => bgPanel.value.toggle(event);
const toggleAvatar = (event) => avatarPanel.value.toggle(event);
const global = inject("global");
const axios = inject("axios");
//const userColor = computed(() => global.userDefaultBgColor);
// alert(global.userDefaultBgColor);
// onMounted(() => {
//   axios.get("/getUsers");
// });
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
