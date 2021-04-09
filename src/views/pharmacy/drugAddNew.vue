<template>
  <div>
    <header class="dtc-page-header dtc-page-header-grid grid text-white">
      <div>新增藥品資料/藥理資料</div>
    </header>
    <h1 class="my-3 drgu-add-title dtc-text">藥品資料</h1>
    <main class="grid dtc-list-grid">
      <DtxInputGroup prepend="衛統編號" labelWidth="120">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="庫存上限" labelWidth="120">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="皮試標誌" labelWidth="120">
        <el-input placeholder="" v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="藥品編號" labelWidth="120">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="庫存下限" labelWidth="120">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="是否為管制藥" labelWidth="120">
        <el-select
          v-model="isControlledDrug"
          placeholder="請選擇"
          class="border-l-0"
        >
          <el-option
            v-for="item in yesNoOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="藥品名稱" labelWidth="120">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="產地" labelWidth="120">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="絕對禁忌" labelWidth="120">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="學名" labelWidth="120">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="廠商" labelWidth="120">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="醫保等級" labelWidth="120">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="劑量" labelWidth="120">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="藥品類型" labelWidth="120">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="給藥方式" labelWidth="120">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="類別" labelWidth="120">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="適應症狀1" labelWidth="120">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="煎藥方式" labelWidth="120">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="用藥單位" labelWidth="120">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="適應症狀2" labelWidth="120">
        <el-input v-model="input1" />
      </DtxInputGroup>

      <DtxInputGroup prepend="規格" labelWidth="120">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="收費項目" labelWidth="120">
        <el-input v-model="input1" />
      </DtxInputGroup>

      <DtxInputGroup prepend="進價" labelWidth="120">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="抗生素藥物" labelWidth="120">
        <el-input v-model="input1" />
      </DtxInputGroup>

      <DtxInputGroup prepend="售價" labelWidth="120">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="抗生素等級" labelWidth="120">
        <el-input v-model="input1" />
      </DtxInputGroup>
    </main>
    <h1 class="my-3 drgu-add-title dtc-text">藥理資料</h1>
    <main class="grid dtc-list-grid2">
      <DtxInputGroup prepend="警語(副作用)" labelWidth="120">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="用前注意" labelWidth="120">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="不良反應" labelWidth="120">
        <el-input placeholder="" v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="儲存條件" labelWidth="120">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="圖片名稱" labelWidth="120">
        <el-input v-model="input1" />
      </DtxInputGroup>
    </main>
    <footer class="mt-6 mb-4">
      <Button
        label="重新填寫"
        class="p-button-rounded p-button-info footer-btn"
        style="margin-right: 20px"
      />
      <Button
        label="儲存"
        class="p-button-rounded p-button-success footer-btn"
      />
    </footer>
  </div>
</template>

<script>
let headers = [
  { name: "ID", key: "id", sortDesc: null },
  { name: "建立者", key: "name", sortDesc: null },
  { name: "建立者", key: "name", sortDesc: null },
  { name: "年齡", key: "age", sortDesc: null },
];

export default {
  name: "payhis",

  data() {
    return {
      input1: "J120092876",
      options: [
        {
          value: "選項1",
          label: "牙科就診",
        },

        {
          value: "選項3",
          label: "身心障礙",
        },
        {
          value: "選項4",
          label: "發展遲緩兒童",
        },
        {
          value: "選項5",
          label: "失能老人",
        },
      ],
      value: "",
    };
  },
};
</script>

<style scoped>
.btn-container {
  text-align: left;
  padding: 0px 10px 20px 0px;
}
</style>

<style lang="scss" scoped>
.dtc-page-header-grid {
  grid-template-columns: max-content 1rem max-content max-content;
  overflow: hidden;
}

.drgu-add-title {
  text-align: left;
  font-size: 18px;
  margin-left: 12px;
}

.dtc-list-grid,
.dtc-list-grid2 {
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  padding: 0 12px;
}
.dtc-list-grid2 {
  grid-template-columns: repeat(1, 1fr);
}
</style>
