<template>
  <div class="pr-1">
    <header class="grid text-white dtc-page-header dtc-page-header-grid">
      <div>本國國人基本資料</div>
    </header>
    <main class="grid grid-cols-2 gap-3 lg:grid-cols-5">
      <DtxInputGroup prepend="身分證字號" labelWidth="120">
        <el-input v-model="nativeIdNumber" />
      </DtxInputGroup>
      <DtxInputGroup prepend="姓名" labelWidth="120">
        <el-input v-model="nativeName" />
      </DtxInputGroup>
      <DtxInputGroup prepend="出生日期" :labelWidth="pageWidth ? 100 : 155">
        <Calendar class="h-10" v-model="nativeBirthday" placeholder="請輸入日期" :showIcon="true" dateFormat="yy-mm-dd" />
      </DtxInputGroup>
      <DtxInputGroup prepend="性別" labelWidth="120">
        <el-select filterable v-model="nativeGender" class="border-l-0">
          <el-option v-for="item in genderOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="學歷" labelWidth="120">
        <el-input v-model="nativeEducation" />
      </DtxInputGroup>
      <DtxInputGroup prepend="國籍" labelWidth="120">
        <el-input v-model="nativeCitizenship" />
      </DtxInputGroup>
      <DtxInputGroup prepend="戶籍地址" labelWidth="120" style="grid-column: span 3">
        <div class="flex gap-2">
          <el-input v-model="nativeAddress.postalCode" placeholder="郵遞區號" />
          <el-input v-model="nativeAddress.completeAddress" placeholder="請輸入地址" />
        </div>
      </DtxInputGroup>
      <DtxInputGroup prepend="語言" labelWidth="120">
        <el-input v-model="nativeLanguage" />
      </DtxInputGroup>
      <DtxInputGroup prepend="通訊地址" labelWidth="120" style="grid-column: span 3">
        <div class="flex gap-2">
          <el-input v-model="nativeContactAddress.postalCode" placeholder="郵遞區號" />
          <el-input v-model="nativeContactAddress.completeAddress" placeholder="請輸入地址" />
        </div>
      </DtxInputGroup>
      <DtxInputGroup prepend="婚姻狀況" labelWidth="120">
        <el-input v-model="nativeMarriage" />
      </DtxInputGroup>
      <DtxInputGroup prepend="手機號碼" labelWidth="120">
        <el-input v-model="nativeMobilePhone" />
      </DtxInputGroup>
      <DtxInputGroup prepend="電話號碼" labelWidth="120" style="grid-column: span 3">
        <div class="flex gap-2">
          <el-input v-model="nativeTelPhone.district" placeholder="區號" />
          <el-input v-model="nativeTelPhone.number" placeholder="號碼" />
          <el-input v-model="nativeTelPhone.ext" placeholder="分機" />
        </div>
      </DtxInputGroup>
      <DtxInputGroup prepend="ABO血型" labelWidth="120">
        <el-select filterable v-model="aboBlood" class="border-l-0">
          <el-option v-for="item in aboBloodOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="RH血型" labelWidth="120">
        <el-select filterable v-model="rhBlood" class="border-l-0">
          <el-option v-for="item in rhBloodOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
    </main>
    <header class="grid mt-5 text-white dtc-page-header dtc-page-header-grid">
      <div>外國國人基本資料</div>
    </header>
    <main class="grid grid-cols-2 gap-3 lg:grid-cols-5">
      <DtxInputGroup prepend="護照/身分證/居留證號碼" class="col-span-2">
        <el-input v-model="foreignIdNumber" />
      </DtxInputGroup>
      <DtxInputGroup prepend="姓名" labelWidth="120">
        <el-input v-model="foreignName" />
      </DtxInputGroup>
      <DtxInputGroup prepend="出生日期" :labelWidth="pageWidth ? 100 : 155">
        <Calendar class="h-10" v-model="foreignBirthday" placeholder="請輸入日期" :showIcon="true" dateFormat="yy-mm-dd" />
      </DtxInputGroup>
      <DtxInputGroup prepend="性別" labelWidth="120">
        <el-select filterable v-model="foreignGender" class="border-l-0">
          <el-option v-for="item in genderOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="學歷" labelWidth="120">
        <el-input v-model="foreignEducation" />
      </DtxInputGroup>
      <DtxInputGroup prepend="國籍" labelWidth="120">
        <el-input v-model="foreignCitizenship" />
      </DtxInputGroup>
      <DtxInputGroup prepend="通訊地址" labelWidth="120" style="grid-column: span 3">
        <div class="flex gap-2">
          <el-input v-model="foreignContactAddress.postalCode" placeholder="郵遞區號" />
          <el-input v-model="foreignContactAddress.completeAddress" placeholder="請輸入地址" />
        </div>
      </DtxInputGroup>
      <DtxInputGroup prepend="語言" labelWidth="120">
        <el-input v-model="foreignLanguage" />
      </DtxInputGroup>

      <DtxInputGroup prepend="婚姻狀況" labelWidth="120">
        <el-input v-model="foreignMarriage" />
      </DtxInputGroup>
      <DtxInputGroup prepend="手機號碼" labelWidth="120">
        <el-input v-model="foreignMobilePhone" />
      </DtxInputGroup>
      <DtxInputGroup prepend="電話號碼" labelWidth="120" style="grid-column: span 3">
        <div class="flex gap-2">
          <el-input v-model="foreignTelPhone.district" placeholder="區號" />
          <el-input v-model="foreignTelPhone.number" placeholder="號碼" />
          <el-input v-model="foreignTelPhone.ext" placeholder="分機" />
        </div>
      </DtxInputGroup>
      <DtxInputGroup prepend="ABO血型" labelWidth="120">
        <el-select filterable v-model="foreignAboBlood" class="border-l-0">
          <el-option v-for="item in aboBloodOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="RH血型" labelWidth="120">
        <el-select filterable v-model="foreignRhBlood" class="border-l-0">
          <el-option v-for="item in rhBloodOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
    </main>

    <header class="grid mt-5 text-white dtc-page-header dtc-page-header-grid">
      <div>工作單位資訊</div>
    </header>
    <main class="grid grid-cols-2 gap-3">
      <DtxInputGroup prepend="職業類別" labelWidth="120">
        <el-input v-model="occupation" />
      </DtxInputGroup>
      <DtxInputGroup prepend="單位名稱" labelWidth="120">
        <el-input v-model="occupationUnit" />
      </DtxInputGroup>
      <DtxInputGroup prepend="工作單位地址" labelWidth="120" style="grid-column: span 1">
        <div class="flex gap-2">
          <el-input v-model="occupationAddress.postalCode" placeholder="郵遞區號" />
          <el-input v-model="occupationAddress.completeAddress" placeholder="請輸入地址" />
        </div>
      </DtxInputGroup>

      <DtxInputGroup prepend="單位電話號碼" style="grid-column: span 1">
        <div class="flex gap-2">
          <el-input v-model="occupationPhone.district" placeholder="區號" />
          <el-input v-model="occupationPhone.number" placeholder="號碼" />
          <el-input v-model="occupationPhone.ext" placeholder="分機" />
        </div>
      </DtxInputGroup>
    </main>
    <footer class="mt-5 mb-10">
      <Button class="p-button-info" style="margin: 4px 0">儲存基本資料</Button>
    </footer>
  </div>
</template>

<script>
let headers = [
  { name: 'ID', key: 'id', sortDesc: null },
  { name: '建立者', key: 'name', sortDesc: null },
  { name: '建立者', key: 'name', sortDesc: null },
  { name: '年齡', key: 'age', sortDesc: null },
];

export default {
  name: 'basicinfo',
  components: {},
  data() {
    return {
      nativeIdNumber: null,
      nativeName: null,
      nativeBirthday: null,
      nativeGender: 'male',
      genderOptions: [
        {
          value: 'male',
          label: '男',
        },

        {
          value: 'female',
          label: '女',
        },
      ],
      nativeEducation: '',
      nativeCitizenship: '',
      nativeAddress: {
        postalCode: '',
        completeAddress: '',
      },
      nativeLanguage: '',
      nativeContactAddress: {
        postalCode: '',
        completeAddress: '',
      },
      nativeMarriage: '',
      nativeMobilePhone: '',
      nativeTelPhone: {
        district: '',
        number: '',
        ext: '',
      },
      aboBlood: 'A',
      aboBloodOptions: [
        {
          value: 'A',
          label: 'A',
        },
        {
          value: 'B',
          label: 'B',
        },
        {
          value: 'AB',
          label: 'AB',
        },
        {
          value: 'O',
          label: 'O',
        },
      ],
      rhBlood: 'negative',
      rhBloodOptions: [
        {
          value: 'positive',
          label: 'Rh+',
        },
        {
          value: 'negative',
          label: 'Rh-',
        },
      ],
      foreignIdNumber: '',
      foreignName: '',
      foreignBirthday: '',
      foreignGender: 'male',
      foreignEducation: '',
      foreignCitizenship: '',
      foreignContactAddress: {
        postalCode: '',
        completeAddress: '',
      },
      foreignLanguage: '',
      foreignMarriage: '',
      foreignMobilePhone: '',
      foreignTelPhone: {
        district: '',
        number: '',
        ext: '',
      },
      foreignAboBlood: 'A',
      foreignRhBlood: 'negative',
      occupation: '',
      occupationUnit: '',
      occupationAddress: {
        postalCode: '',
        completeAddress: '',
      },
      occupationPhone: {
        district: '',
        number: '',
        ext: '',
      },
    };
  },
  computed: {
    pageWidth() {
      return Boolean(window.innerWidth <= 1280);
    },
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
}
.dtc-page-header-grid {
  grid-template-columns: max-content 1rem max-content max-content;
  overflow: hidden;
}
</style>
