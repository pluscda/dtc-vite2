<template>
  <section class="new-grug">
    <div class="my-wrapper">
      <header>新增藥品</header>
      <div class="pl-1 pr-1 pt-2 inputs-dvs">
        <h1>新增藥品資料</h1>
        <main class="grid dtc-grid-cols">
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
            <el-select v-model="isControlledDrug" placeholder="請選擇" class="border-l-0">
              <el-option v-for="item in yesNoOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
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
          <div></div>
          <DtxInputGroup prepend="規格" labelWidth="120">
            <el-input v-model="input1" />
          </DtxInputGroup>
          <DtxInputGroup prepend="收費項目" labelWidth="120">
            <el-input v-model="input1" />
          </DtxInputGroup>
          <div></div>
          <DtxInputGroup prepend="進價" labelWidth="120">
            <el-input v-model="input1" />
          </DtxInputGroup>
          <DtxInputGroup prepend="抗生素藥物" labelWidth="120">
            <el-input v-model="input1" />
          </DtxInputGroup>
          <div></div>
          <DtxInputGroup prepend="售價" labelWidth="120">
            <el-input v-model="input1" />
          </DtxInputGroup>
          <DtxInputGroup prepend="抗生素等級" labelWidth="120">
            <el-input v-model="input1" />
          </DtxInputGroup>
        </main>
      </div>
      <div class="pl-1 pr-1 inputs-dvs">
        <h1>新增藥品資料</h1>
        <main class="grid dtc-grid-cols2">
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
      </div>
      <footer>
        <Button label="重新填寫" class="p-button-rounded p-button-info footer-btn" />
        <Button label="儲存" class="p-button-rounded p-button-success footer-btn" />
        <Button label="取消" class="p-button-rounded p-button-warning footer-btn" @click="closeAddDialog" />
      </footer>
    </div>
  </section>
</template>

<script>
import { ref, inject } from "vue";

//身分證號
let yesNoOptions = [
  {
    value: "Y",
    label: "是",
  },
  {
    value: "N",
    label: "否",
  },
];
export default {
  name: "drugAdd",
  setup() {
    //allVariable
    const isControlledDrug = ref("n");
    //option

    //global
    const global = inject("global");
    //function
    const closeAddDialog = () => {
      global.openAddDrugDialog = false;
    };

    return {
      isControlledDrug,
      yesNoOptions,
      closeAddDialog,
    };
  },
};
</script>

<style lang="scss" scoped>
.new-grug {
  position: fixed;
  top: 0px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(#000, 0.6);
  display: grid;
  place-items: center;
  z-index: 999;
  .my-wrapper {
    width: 1010px;
    min-height: 220px;
    background: white;
    border-radius: 10px;

    header {
      background: #4482e9;
      color: white;
      height: 50px;
      line-height: 50px;
      padding-left: 10px;
      font-size: 24px;
      border-radius: 5px 5px 0 0;
    }
    .inputs-dvs {
      padding: 0 10px;

      h1 {
        font-size: 1.5rem;
        text-align: start;
        font-weight: bold;
      }
      .dtc-grid-cols {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        grid-column-gap: 16px;
        grid-row-gap: 5px;
        div {
          margin-bottom: 2px;
        }
      }
      .dtc-grid-cols2 {
        grid-template-columns: repeat(1, minmax(0, 1fr));
        grid-row-gap: 7px;
      }
    }

    footer {
      width: 230px;
      margin: 0 auto;
      padding: 10px;
      display: grid;
      margin-top: 5px;
      padding-bottom: 20px;
      grid-template-columns: max-content max-content max-content;
      .footer-btn {
        margin-right: 8px;
      }
    }
  }
}
</style>
