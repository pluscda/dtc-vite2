<template>
  <section style="background: #4b5563" class="dtc-door-way-section">
    <header class="flex gap-4 dtc-text pl-0s dtc-tabs" style="">
      <section style="background: none !important" class="dtc-text cursor-auto">A 診斷</section>
      <div>組套</div>
      <div>設為組套</div>
      <div>診斷碼搜尋</div>
      <div>清除</div>
    </header>
    <nav class="w-full border-b-4" style="border-color: #646b74 !important"></nav>
    <header class="my-title relative dtc-grid-header dtc-grid-header__divs dtc-template-columns">
      <div>操作</div>
      <div v-for="(item, i) in headers" :key="i" @click="sort(headers, item)" :title="item.name">
        {{ item.name }}
      </div>
    </header>
    <main class="my-title relative dtc-grid-header dtc-template-columns" style="height: 50px" v-for="(item, i) in 4" :key="i">
      <div style="border-color: #9ca3af !important">
        <Button label="刪除" class="p-button-sm p-button-warning w-11" />
      </div>
      <div class="no-ring" style="border-color: #9ca3af !important">
        <el-select v-model="input" filterable placeholder="請選擇"></el-select>
      </div>
      <div class="no-ring">
        <el-input style="max-height: 20px" placeholder="請輸入診斷內容" v-model="input" clearable> </el-input>
      </div>
    </main>
  </section>
</template>

<script>
let headers = [
  { name: "ICD10", key: "chDrgId", sortDesc: null },
  { name: "診斷內容", key: "chHospitalId", sortDesc: null },
];
export default {
  data() {
    return {
      headers,
      input: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.dtc-tabs::after {
  all: unset;
}
.dtc-template-columns {
  height: 40px;
  > div {
    border-radius: 0px !important;
    line-height: 34px;
  }
  width: 100%;
  grid-template-columns: 70px 180px 1fr;
}
</style>
