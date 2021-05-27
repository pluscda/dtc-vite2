<template>
  <section class="w-screen">
    <header class="grid pr-2 dtc-page-header dtc-page-header__grid w-screen" style="margin: 0">
      <div>門診</div>
      <Button>預約掛號</Button>
      <Button class="p-button-success">預約住院</Button>
      <Button class="p-button-info">慢病紀錄</Button>
      <Button class="p-button-warning">開立證明</Button>
      <Button class="p-button-help">跨院調閱</Button>
      <Button class="p-button-danger">手術排程</Button>
      <Button>檢驗報告</Button>
    </header>
    <main class="grid pb-2 pl-1 pt-1 section1-grid w-screen">
      <DtxInputGroup prepend="診間號碼">
        <el-input v-model="dd" style="width: 130px" readonly />
      </DtxInputGroup>
      <DtxInputGroup prepend="病歷號碼">
        <el-input v-model="dd" readonly style="width: 130px" />
      </DtxInputGroup>
      <DtxInputGroup prepend="病患姓名">
        <el-input v-model="dd" style="width: 130px" readonly />
      </DtxInputGroup>
      <DtxInputGroup prepend="病患年齡">
        <el-input v-model="dd" style="width: 130px" readonly />
      </DtxInputGroup>
      <DtxInputGroup prepend="病患生日">
        <el-input v-model="dd" readonly style="width: 130px" />
      </DtxInputGroup>

      <nav style="grid-column: 1/-1" class="section1-grid grid dtc-text space-x-5">
        <DtxInputGroup prepend="身分證號">
          <el-input v-model="dd" readonly style="width: 130px" />
        </DtxInputGroup>
        <div class="p-field-checkbox text-black mt-2">
          <Checkbox v-model="checked" :binary="true" class="-mt-2 inline-block" />
          <label for="binary" class="inline-block tran dtc-text">過敏</label>
        </div>
        <el-input v-model="dd"></el-input>
        <div class="p-field-checkbox text-black mt-2 dtc-text">
          <Checkbox v-model="checked" :binary="true" class="-mt-2 inline-block ml-5" />
          <label for="binary" class="inline-block tran">IBR</label>
        </div>
        <div class="p-field-checkbox text-black mt-2 dtc-text">
          <Checkbox v-model="checked" :binary="true" class="-mt-2 inline-block" />
          <label for="binary" class="inline-block tran">DNR</label>
        </div>
        <div class="p-field-checkbox text-black mt-2 dtc-text">
          <Checkbox v-model="checked" :binary="true" class="-mt-2 inline-block" />
          <label for="binary" class="inline-block tran">器捐</label>
        </div>
        <div class="p-field-checkbox text-black mt-2 dtc-text">
          <Checkbox v-model="checked" :binary="true" class="-mt-2 inline-block" />
          <label for="binary" class="inline-block tran">重大</label>
        </div>
      </nav>
    </main>
    <header class="grid pr-2 dtc-page-header dtc-page-header__grid relative" style="margin: 0; padding-left: 2px">
      <Button class="p-button-success">遠端視訊</Button>
      <Button class="p-button-info">過敏疾病紀錄</Button>
      <Button class="p-button-warning">DITTO</Button>
      <Button class="p-button-help">完成醫囑</Button>
      <Button class="p-button-danger">科常用組套</Button>
      <div class="absolute right-6 top-0 space-x-4">
        <Button style="height: 34px">暫存</Button>
        <Button class="p-button-success" style="height: 34px">回門診清單</Button>
      </div>
    </header>
    <main class="grid grid-of-2 mt-2 pl-1" style="width: 99vw">
      <Set1></Set1>
      <Set2></Set2>
      <Set3></Set3>
      <Set4></Set4>
    </main>
    <main class="grid grid-cols-12 mt-2">
      <Set5></Set5>
    </main>
    <main class="grid grid-cols-12 mt-2 mb-11">
      <Set6></Set6>
    </main>
  </section>
</template>
<script>
import Set1 from "/@/components/set1.vue";
import Set2 from "/@/components/set2.vue";
import Set3 from "/@/components/set3.vue";
import Set4 from "/@/components/set4.vue";
import Set5 from "/@/components/set5.vue";
import Set6 from "/@/components/set6.vue";
export default {
  data() {
    return {
      value: "",
      dd: "A120019876",
      checked: true,
    };
  },
  components: {
    Set1,
    Set2,
    Set3,
    Set4,
    Set5,
    Set6,
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
  grid-template-columns: repeat(34, minmax(max-content, 1fr));
  gap: 6px;
}
.grid-of-2 {
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(2, 300px);
  gap: 4px;
}
</style>
