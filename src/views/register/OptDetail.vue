<template>
  <section class="w-screen">
    <header class="flex pr-2 dtc-page-header space-x-6 transform -translate-y-0.5">
      <div>目前診號: 01</div>
      <div>病歷號: 322324</div>
      <div>姓名: 立證明</div>
      <div>性別: 8</div>
      <div>年齡: 37</div>
      <div>生日: 20/20/20</div>
      <div>身分證號: A128873654</div>
      <div>身份別: XXX</div>
      <div>過敏: X</div>
    </header>
    <header class="grid pr-2 dtc-page-header dtc-page-header__grid w-screen" style="margin: 0">
      <Button>預約掛號</Button>
      <Button>預約住院</Button>
      <Button>開立證明</Button>
      <Button>雲端藥歷</Button>
      <Button>手術排程</Button>
      <Button>檢驗報告</Button>
      <Button>檢查報告</Button>
      <Button>病史紀錄</Button>
    </header>
    <header class="grid pr-2 dtc-page-header dtc-page-header__grid w-screen relative" style="margin: 0">
      <Button>遠端視訊</Button>
      <Button>過敏紀錄</Button>
      <Button>檢查治療列印</Button>
      <Button>DITTO</Button>
      <Button>科常用組套</Button>
      <Button>開立轉診單</Button>
      <div class="absolute right-6 top-0 space-x-4">
        <Button style="height: 34px" class="p-button-help">完成醫囑</Button>
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
    <main class="grid grid-cols-12 mt-2 mb-11 relative">
      <Set6></Set6>
      <main class="grid grid-cols-[1fr,repeat(3,max-content)] space-x-3 mt-4 mb-4 w-screen pr-5">
        <div></div>
        <Button class="p-button-help">完成醫囑</Button>
        <Button>暫存</Button>
        <Button class="p-button-success">回門診清單</Button>
      </main>
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
  name: "inquerylist_383",
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
