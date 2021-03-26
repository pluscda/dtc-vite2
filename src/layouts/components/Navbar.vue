<template>
  <nav class="dtc-nav-bar">
    <i class="text-5xl pt-2"><i-uim:apple-alt></i-uim:apple-alt></i>
    <div class="text-lg pt-5">掛號門診 DTC</div>
    <section class="flex gap-8 cursor-pointer">
      <div>首頁</div>
      <el-dropdown>
        <span class="text-white">診斷報告<i class="el-icon-arrow-down el-icon--right"></i> </span>
        <el-dropdown-menu>
          <el-dropdown-item>報告-1</el-dropdown-item>
          <el-dropdown-item>報告-2</el-dropdown-item>
          <el-dropdown-item>報告-3</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div>線上諮詢<i class="el-icon-arrow-down el-icon--right"></i></div>
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
  background: #10579b;
  color: var(--bs-light);
  display: grid;
  padding: 0 1rem;
  line-height: 70px;
  font-size: 1rem;
  grid-template-columns: max-content 160px 1fr max-content;
}
</style>
