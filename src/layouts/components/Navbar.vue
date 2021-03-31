<template>
  <nav class="text-blue-200 bg-gradient-to-r from-blue-900 to-blue-700 dtc-nav-bar">
    <i-uim:layer-group class="pt-2 text-5xl"></i-uim:layer-group>
    <div class="pt-5 text-lg transform -translate-x-7">基本醫療服務</div>
    <section class="flex gap-8 cursor-pointer">
      <div>首頁</div>
      <el-dropdown class="max-h-10" :show-timeout="100">
        <span class="text-blue-200">門急診掛號<i class="el-icon-arrow-down el-icon--right"></i> </span>
        <el-dropdown-menu>
          <el-dropdown-item @click="$router.push('/users')">掛號</el-dropdown-item>
          <el-dropdown-item @click="$router.replace('/register')">掛號總覽清單</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown class="max-h-10" :show-timeout="100">
        <span class="text-blue-200">線上諮詢<i class="el-icon-arrow-down el-icon--right"></i> </span>
        <el-dropdown-menu>
          <el-dropdown-item>諮詢-1</el-dropdown-item>
          <el-dropdown-item>諮詢-2</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <div>歷史報告</div>
      <div>所得明細</div>
    </section>
    <div></div>
  </nav>
</template>

<script setup></script>

<style lang="scss" scoped>
.dtc-nav-bar {
  width: 100vw;
  height: 70px;
  display: grid;
  padding: 0 1rem;
  line-height: 70px;
  font-size: 1rem;
  grid-template-columns: max-content 160px 1fr max-content;
}
</style>
