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
    <main class="grid pb-2 pl-1 header-grid-x1 bg-yellow-100 pt-1">
      <DtxInputGroup prepend="診間號碼">
        <el-input v-model="dd" readonly class="bg-gray-300" />
      </DtxInputGroup>
      <DtxInputGroup prepend="病歷號碼">
        <el-input v-model="dd" readonly class="bg-gray-300" />
      </DtxInputGroup>
      <DtxInputGroup prepend="病患姓名">
        <el-input v-model="dd" readonly class="bg-gray-300" />
      </DtxInputGroup>
      <DtxInputGroup prepend="病患年齡">
        <el-input v-model="dd" readonly class="bg-gray-300" />
      </DtxInputGroup>
      <DtxInputGroup prepend="病患生日">
        <el-input v-model="dd" readonly class="bg-gray-300" />
      </DtxInputGroup>
      <DtxInputGroup prepend="身分證號">
        <el-input v-model="dd" readonly class="bg-gray-300" />
      </DtxInputGroup>

      <div style="grid-column: 1/-1" class="h-9 grid ibr-grid">
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
      </div>
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
.header-grid-x1 {
  grid-template-columns: repeat(auto-fill, 200px);
  gap: 6px;
}
.ibr-grid {
  grid-template-columns: max-content 1fr repeat(32, max-content);
  gap: 6px;
}
</style>
