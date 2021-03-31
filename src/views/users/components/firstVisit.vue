<template>
  <div class="p-3">
    <header class="dtc-page-header dtc-page-header-grid grid text-white mt-2">
      <div>初診病患基本資料卡</div>
    </header>
    <main class="grid gap-1">
      <DtxInputGroup prepend="病歷號碼" labelWidth="94">
        <el-input v-model="medicalNumber" />
      </DtxInputGroup>
      <DtxInputGroup prepend="初診日期" labelWidth="94">
        <input v-model="firstCheckedDate" type="date" class="date-style" />
      </DtxInputGroup>
      <DtxInputGroup prepend="姓名" labelWidth="94">
        <el-input v-model="name" />
      </DtxInputGroup>
      <DtxInputGroup prepend="身分證號" labelWidth="94">
        <el-input v-model="idNumber" />
      </DtxInputGroup>
      <DtxInputGroup prepend="出生日期" labelWidth="94">
        <input v-model="birthday" type="date" class="date-style" />
      </DtxInputGroup>
      <DtxInputGroup prepend="性別" labelWidth="94">
        <el-select v-model="gender" class="border-l-0">
          <el-option
            v-for="item in genderOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="手機號碼" labelWidth="94">
        <el-input v-model="mobilePhone" />
      </DtxInputGroup>
      <DtxInputGroup
        prepend="電話號碼"
        labelWidth="94"
        style="
          grid-column: span 3;
          display: grid;
          grid-template-columns: 94px 80px 1fr 1fr;
          grid-column-gap: 5px;
        "
      >
        <el-input v-model="telPhone.district" placeholder="區號" />
        <el-input v-model="telPhone.number" placeholder="號碼" />
        <el-input v-model="telPhone.ext" placeholder="分機" />
      </DtxInputGroup>
      <DtxInputGroup prepend="職業" labelWidth="94">
        <el-input v-model="occupation" />
      </DtxInputGroup>
      <DtxInputGroup prepend="婚姻狀況" labelWidth="94">
        <el-input v-model="marriage" />
      </DtxInputGroup>
      <DtxInputGroup prepend="血型" labelWidth="94">
        <el-select v-model="bloodType" class="border-l-0">
          <el-option
            v-for="item in bloodTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="藥物過敏史" labelWidth="94">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="國籍" labelWidth="94">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="通訊地址" labelWidth="94">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="訂閱健康報" labelWidth="94">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="是否同意收到本院簡訊">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="電子信箱" labelWidth="94">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="緊急聯絡人" labelWidth="94">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="與病患關係" labelWidth="94">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="連絡電話" labelWidth="94">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="行動電話" labelWidth="94">
        <el-input v-model="input1" />
      </DtxInputGroup>
    </main>
    <header class="dtc-page-header dtc-page-header-grid grid text-white mt-2">
      <div>病患健康自評表 (病患填寫)</div>
    </header>
    <main class="grid gap-1 grid-cols-2">
      <DtxInputGroup prepend="身高" append="cm">
        <el-input v-model="input1" placeholder="cm" />
      </DtxInputGroup>
      <DtxInputGroup prepend="體重">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="BMI">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="腰圍">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="血壓">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="脈搏">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="體重">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="菸">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="量">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="頻率">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="已戒菸">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="接觸二手菸">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="檳榔">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="酒">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="量">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="頻率">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="喝酒種類">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="運動">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="運動時間約">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="頻率">
        <el-input v-model="input1" />
      </DtxInputGroup>
    </main>
    <header class="dtc-page-header dtc-page-header-grid grid text-white mt-2">
      <div>健康追蹤項目 (專業人員填寫)</div>
    </header>
    <main class="grid gap-1 grid-cols-2">
      <DtxInputGroup prepend="掛號費用">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="部分攤額">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="欠卡押金">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="優免金額">
        <el-input placeholder="搜尋檢查狀態" v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="累積應繳">
        <el-input v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="預收金額">
        <el-input v-model="input1" />
      </DtxInputGroup>
    </main>
  </div>
</template>

<script>
//健康追蹤項目專業人員
import DtxInputGroup from "cps/DtxInputGroup.vue";
let headers = [
  { name: "ID", key: "id", sortDesc: null },
  { name: "建立者", key: "name", sortDesc: null },
  { name: "建立者", key: "name", sortDesc: null },
  { name: "年齡", key: "age", sortDesc: null },
];

export default {
  name: "payhis",
  components: { DtxInputGroup },
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
      medicalNumber: "",
      firstCheckedDate: "",
      name: "",
      idNumber: "",
      birthday: "",
      gender: "male",
      genderOptions: [
        {
          value: "male",
          label: "男",
        },

        {
          value: "female",
          label: "女",
        },
      ],
      mobilePhone: "",
      telPhone: {
        district: "",
        number: "",
        ext: "",
      },
      occupation: "",
      marriage: "",
      bloodType: "A",
      bloodTypeOptions: [
        {
          value: "A",
          label: "A",
        },
        {
          value: "B",
          label: "B",
        },
        {
          value: "AB",
          label: "AB",
        },
        {
          value: "O",
          label: "O",
        },
      ],
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
.dtc-template-columns {
  grid-template-columns: 180px repeat(2, 160px) 1fr;
}

.dtc-autoflow-grid {
  grid-template-columns: repeat(auto-fill, minmax(120px, 200px));
  @apply bg-info;
}
.dtc-page-header-grid {
  grid-template-columns: max-content 1rem max-content max-content;
  overflow: hidden;
  @apply bg-info;
}

main {
  grid-template-columns: repeat(auto-fill, minmax(160px, 220px));
}
.date-style {
  border: 1px solid #dcdfe6;
  width: 140px;
  font-size: 10px;
  padding-left: 5px;
}
</style>
