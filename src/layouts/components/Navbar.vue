<template>
  <nav class="text-blue-200 bg-blue-800 dtc-nav-bar">
    <i class="pt-2 text-5xl"><i-uim:apple-alt></i-uim:apple-alt></i>
    <div class="pt-5 text-lg">掛號門診 DTC</div>
    <section class="flex gap-8 cursor-pointer">
      <div>首頁</div>
      <el-dropdown class="max-h-10">
        <span class="text-blue-200">診斷報告<i class="el-icon-arrow-down el-icon--right"></i> </span>
        <el-dropdown-menu>
          <el-dropdown-item>報告-1</el-dropdown-item>
          <el-dropdown-item>報告-2</el-dropdown-item>
          <el-dropdown-item>報告-3</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown class="max-h-10">
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
