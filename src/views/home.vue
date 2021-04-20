<template>
  <section>
    <header class="grid pr-2 dtc-page-header dtc-page-header__grid">
      <div>門診</div>
      <Button class="p-button-rounded p-button-secondary">預約掛號</Button>
      <Button class="p-button-rounded p-button-success">預約住院</Button>
      <Button class="p-button-rounded p-button-info">慢行紀錄</Button>
      <Button class="p-button-rounded p-button-warning">開立證明</Button>
      <Button class="p-button-rounded p-button-help">跨院調閱</Button>
      <Button class="p-button-rounded p-button-danger">手術排程</Button>
      <Button class="p-button-rounded">檢驗報告</Button>
    </header>
  </section>
</template>
<script>
export default {
  data() {
    return {
      value: "",
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
</style>
