<template>
  <section>
    <header class="grid pr-2 dtc-page-header dtc-page-header__grid" style="margin: 0">
      <div>門診</div>
      <Button class="p-button-rounded p-button-secondary">預約掛號</Button>
      <Button class="p-button-rounded p-button-success">預約住院</Button>
      <Button class="p-button-rounded p-button-info">慢行紀錄</Button>
      <Button class="p-button-rounded p-button-warning">開立證明</Button>
      <Button class="p-button-rounded p-button-help">跨院調閱</Button>
      <Button class="p-button-rounded p-button-danger">手術排程</Button>
      <Button class="p-button-rounded">檢驗報告</Button>
    </header>
    <main class="grid pb-2 pl-1 bg-yellow-100 pt-1 section1-grid">
      <DtxInputGroup prepend="診間號碼">
        <el-input v-model="dd" style="width: 120px" readonly />
      </DtxInputGroup>
      <DtxInputGroup prepend="病歷號碼">
        <el-input v-model="dd" readonly style="width: 120px" />
      </DtxInputGroup>
      <DtxInputGroup prepend="病患姓名">
        <el-input v-model="dd" style="width: 100px" readonly />
      </DtxInputGroup>
      <DtxInputGroup prepend="病患年齡">
        <el-input v-model="dd" style="width: 60px" readonly class="bg-gray-300" />
      </DtxInputGroup>
      <DtxInputGroup prepend="病患生日">
        <el-input v-model="dd" readonly style="width: 120px" class="bg-gray-300" />
      </DtxInputGroup>
      <DtxInputGroup prepend="身分證號">
        <el-input v-model="dd" readonly style="width: 120px" class="bg-gray-300" />
      </DtxInputGroup>

      <nav style="grid-column: 1/-1" class="section1-grid grid">
        <div class="p-field-checkbox text-black mt-2">
          <Checkbox v-model="checked" :binary="true" class="-mt-2 inline-block" />
          <label for="binary" class="inline-block tran">過敏</label>
        </div>
        <el-input v-model="dd"></el-input>
        <div class="p-field-checkbox text-black mt-2">
          <Checkbox v-model="checked" :binary="true" class="-mt-2 inline-block" />
          <label for="binary" class="inline-block tran">IBR</label>
        </div>
        <div class="p-field-checkbox text-black mt-2">
          <Checkbox v-model="checked" :binary="true" class="-mt-2 inline-block" />
          <label for="binary" class="inline-block tran">DNR</label>
        </div>
        <div class="p-field-checkbox text-black mt-2">
          <Checkbox v-model="checked" :binary="true" class="-mt-2 inline-block" />
          <label for="binary" class="inline-block tran">器捐</label>
        </div>
        <div class="p-field-checkbox text-black mt-2">
          <Checkbox v-model="checked" :binary="true" class="-mt-2 inline-block" />
          <label for="binary" class="inline-block tran">重大</label>
        </div>
      </nav>
    </main>
  </section>
</template>
<script>
export default {
  data() {
    return {
      value: "",
      dd: "A120019876",
      checked: true,
    };
  },
};
</script>

<style lang="scss" scoped>
.dtc-page-header__grid {
  grid-template-columns: repeat(24, max-content);
  gap: 22px;
}
.dtc-page-header {
  button {
    margin: 3px;
  }
}

.section1-grid {
  grid-template-columns: repeat(34, max-content);
  gap: 6px;
}
</style>
