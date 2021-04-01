<template>
  <div class="pr-1">
    <header class="dtc-page-header dtc-page-header-grid grid text-white">
      <div>本國國人基本資料</div>
    </header>
    <main class="grid gap-1 lg:grid-cols-5 grid-cols-3">
      <DtxInputGroup prepend="身分證字號" labelWidth="120">
        <el-input v-model="nativeIdNumber" />
      </DtxInputGroup>
      <DtxInputGroup prepend="姓名" labelWidth="120">
        <el-input v-model="nativeName" />
      </DtxInputGroup>
      <DtxInputGroup prepend="出生日期" labelWidth="100">
        <Calendar
          class="h-10"
          v-model="nativeBirthday"
          placeholder="輸入日期"
          :showIcon="true"
          dateFormat="yy-mm-dd"
        />
      </DtxInputGroup>
      <DtxInputGroup prepend="性別" labelWidth="120">
        <el-select v-model="nativeGender" class="border-l-0">
          <el-option
            v-for="item in genderOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="學歷" labelWidth="120">
        <el-input v-model="nativeEducation" />
      </DtxInputGroup>
      <DtxInputGroup prepend="國籍" labelWidth="120">
        <el-input v-model="nativeCitizenship" />
      </DtxInputGroup>
      <DtxInputGroup
        prepend="戶籍地址"
        labelWidth="120"
        style="
          grid-column: span 3;
          display: grid;
          grid-template-columns: 120px 104px 1fr;
          grid-column-gap: 5px;
        "
      >
        <el-input v-model="nativeAddress.postalCode" placeholder="郵遞區號" />
        <el-input v-model="nativeAddress.completeAddress" />
      </DtxInputGroup>
      <DtxInputGroup prepend="語言" labelWidth="120">
        <el-input v-model="nativeLanguage" />
      </DtxInputGroup>
      <DtxInputGroup
        prepend="通訊地址"
        labelWidth="120"
        style="
          grid-column: span 3;
          display: grid;
          grid-template-columns: 120px 104px 1fr;
          grid-column-gap: 5px;
        "
      >
        <el-input
          v-model="nativeaContactAddress.postalCode"
          placeholder="郵遞區號"
        />
        <el-input v-model="nativeaContactAddress.completeAddress" />
      </DtxInputGroup>
      <DtxInputGroup prepend="婚姻狀況" labelWidth="120">
        <el-input v-model="nativeMarriage" />
      </DtxInputGroup>
      <DtxInputGroup prepend="手機號碼" labelWidth="120">
        <el-input v-model="nativeMobilePhone" />
      </DtxInputGroup>
      <DtxInputGroup
        prepend="電話號碼"
        labelWidth="120"
        style="
          grid-column: span 3;
          display: grid;
          grid-template-columns: 120px 80px 1fr 1fr;
          grid-column-gap: 5px;
        "
      >
        <el-input v-model="nativeTelPhone.district" placeholder="區號" />
        <el-input v-model="nativeTelPhone.number" placeholder="號碼" />
        <el-input v-model="nativeTelPhone.ext" placeholder="分機" />
      </DtxInputGroup>
      <DtxInputGroup prepend="ABO血型" labelWidth="120">
        <el-select v-model="aboBlood" class="border-l-0">
          <el-option
            v-for="item in aboBloodOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="RH血型" labelWidth="120">
        <el-select v-model="rhBlood" class="border-l-0">
          <el-option
            v-for="item in rhBloodOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </DtxInputGroup>
    </main>

    <header class="mt-5 dtc-page-header dtc-page-header-grid grid text-white">
      <div>工作單位資訊</div>
    </header>
    <main class="grid gap-1 grid-cols-2" labelWidth="120">
      <DtxInputGroup prepend="職業類別">
        <el-input v-model="occupation" />
      </DtxInputGroup>
      <DtxInputGroup prepend="單位名稱" labelWidth="120">
        <el-input v-model="occupationUnit" />
      </DtxInputGroup>
      <DtxInputGroup prepend="工作單位地址">
        <el-input v-model="occupationAddress" />
      </DtxInputGroup>
      <DtxInputGroup prepend="單位電話號碼">
        <el-input v-model="occupationPhone" />
      </DtxInputGroup>
    </main>
  </div>
</template>

<script>
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
      nativeIdNumber: "",
      nativeName: "",
      nativeBirthday: "",
      nativeGender: "male",
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
      nativeEducation: "",
      nativeCitizenship: "",
      nativeAddress: {
        postalCode: "",
        completeAddress: "",
      },
      nativeLanguage: "",
      nativeaContactAddress: {
        postalCode: "",
        completeAddress: "",
      },
      nativeMarriage: "",
      nativeMobilePhone: "",
      nativeTelPhone: {
        district: "",
        number: "",
        ext: "",
      },
      aboBlood: "A",
      aboBloodOptions: [
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
      rhBlood: "negative",
      rhBloodOptions: [
        {
          value: "positive",
          label: "Rh陽性",
        },
        {
          value: "negative",
          label: "Rh陰性",
        },
      ],
      occupation: "",
      occupationUnit: "",
      occupationAddress: "",
      occupationPhone: "",
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
</style>
