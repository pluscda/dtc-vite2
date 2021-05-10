<template>
  <div class="pr-1 -mt-2">
    <header class="dtc-page-header dtc-page-header-grid grid text-white mt-2">
      <div>初診病患基本資料卡</div>
    </header>
    <main class="grid gap-3">
      <DtxInputGroup prepend="病歷號碼" labelWidth="104">
        <el-input v-model="basicCard.hisId" />
      </DtxInputGroup>
      <div class="flex relative my-flex">
        <div class="grid max-content" style="grid-template-columns: 104px">
          <span
            class="flex dtc-label px-3 items-center rounded rounded-r-none text-base"
            >初診日期</span
          >
        </div>
        <Calendar
          class="h-10"
          v-model="basicCard.firstVisit"
          placeholder="請輸入日期"
          :showIcon="true"
          dateFormat="yy-mm-dd"
        />
      </div>
      <DtxInputGroup prepend="姓名" labelWidth="104">
        <el-input v-model="basicCard.name" />
      </DtxInputGroup>
      <DtxInputGroup prepend="身分證號" labelWidth="104">
        <el-input v-model="basicCard.personId" />
      </DtxInputGroup>

      <div class="flex relative my-flex">
        <div class="grid max-content" style="grid-template-columns: 104px">
          <span
            class="flex dtc-label px-3 items-center rounded rounded-r-none text-base"
            >出生日期</span
          >
        </div>
        <Calendar
          class="h-10"
          v-model="basicCard.birthday"
          placeholder="請輸入日期"
          :showIcon="true"
          dateFormat="yy-mm-dd"
        />
      </div>
      <DtxInputGroup prepend="性別" labelWidth="104">
        <el-select filterable v-model="basicCard.sex" class="border-l-0">
          <el-option
            v-for="item in genderOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="手機號碼" labelWidth="104">
        <el-input v-model="basicCard.mobile" />
      </DtxInputGroup>
      <DtxInputGroup
        prepend="電話號碼"
        labelWidth="104"
        style="grid-column: span 3"
      >
        <div class="flex gap-3">
          <el-input v-model="basicCard.phone1" placeholder="區號" />
          <el-input v-model="basicCard.phone1_1" placeholder="號碼" />
          <el-input v-model="basicCard.phone1_1_1" placeholder="分機" />
        </div>
      </DtxInputGroup>
      <DtxInputGroup prepend="職業" labelWidth="104">
        <el-input v-model="basicCard.carrer" />
      </DtxInputGroup>
      <DtxInputGroup prepend="婚姻狀況" labelWidth="104">
        <el-input v-model="basicCard.married" />
      </DtxInputGroup>
      <DtxInputGroup prepend="血型" labelWidth="104">
        <el-select filterable v-model="basicCard.blood" class="border-l-0">
          <el-option
            v-for="item in bloodTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup
        prepend="藥物過敏史"
        labelWidth="104"
        style="grid-column: span 2"
      >
        <div class="flex gap-2">
          <el-select filterable v-model="basicCard.allergy" class="border-l-0">
            <el-option
              v-for="item in medicalHistoryOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-input v-model="basicCard.allergyTxt" />
        </div>
      </DtxInputGroup>
      <DtxInputGroup prepend="國籍" labelWidth="104">
        <el-input v-model="basicCard.nationality" />
      </DtxInputGroup>
      <DtxInputGroup
        prepend="通訊地址"
        labelWidth="104"
        style="grid-column: span 4"
      >
        <div class="flex gap-2">
          <el-input v-model="basicCard.address1" placeholder="郵遞區號" />
          <el-input v-model="basicCard.address2" placeholder="請輸入地址" />
        </div>
      </DtxInputGroup>

      <DtxInputGroup
        labelWidth="104"
        prepend="訂閱健康報"
        style="grid-column: span 2"
      >
        <div class="flex gap-2">
          <el-radio
            v-model="basicCard.bookPaper"
            value="true"
            label="願意"
            style="margin: 13px 35px 0px 50px"
            >願意</el-radio
          >
          <el-radio
            v-model="basicCard.bookPaper"
            value="false"
            label="不願意"
            style="margin-top: 13px; margin-left: 5px"
            >不願意</el-radio
          >
        </div>
      </DtxInputGroup>
      <DtxInputGroup prepend="是否同意收到本院簡訊" style="grid-column: span 2">
        <div class="flex gap-2">
          <el-radio
            v-model="basicCard.sms"
            value="true"
            label="願意"
            style="margin: 9px 35px 0px 50px"
            >願意</el-radio
          >
          <el-radio
            v-model="basicCard.sms"
            value="false"
            label="不願意"
            style="margin-top: 9px; margin-left: 5px"
            >不願意</el-radio
          >
        </div>
      </DtxInputGroup>

      <DtxInputGroup
        prepend="電子信箱"
        labelWidth="104"
        style="grid-column: span 2"
      >
        <el-input v-model="basicCard.email" />
      </DtxInputGroup>
      <DtxInputGroup prepend="緊急聯絡人" labelWidth="104">
        <el-input v-model="basicCard.contactName" />
      </DtxInputGroup>
      <DtxInputGroup prepend="與病患關係" labelWidth="104">
        <el-input v-model="basicCard.relationship" />
      </DtxInputGroup>
      <DtxInputGroup prepend="連絡電話" labelWidth="104">
        <el-input v-model="basicCard.contactPhone" />
      </DtxInputGroup>
      <DtxInputGroup prepend="行動電話" labelWidth="104">
        <el-input v-model="basicCard.contactMobile" />
      </DtxInputGroup>
    </main>
    <header class="dtc-page-header dtc-page-header-grid grid text-white mt-2">
      <div>病患健康自評表 (病患填寫)</div>
    </header>
    <main class="grid gap-3 grid-cols-2">
      <div class="basic-info basic-info-secion1">
        <DtxInputGroup prepend="身高" append="cm" labelWidth="104">
          <el-input v-model="selfFillForm.height" />
        </DtxInputGroup>
        <DtxInputGroup prepend="體重" append="kg" labelWidth="104">
          <el-input v-model="selfFillForm.weight" />
        </DtxInputGroup>
        <DtxInputGroup prepend="BMI" labelWidth="104">
          <el-input v-model="selfFillForm.BMINumber" />
        </DtxInputGroup>
        <DtxInputGroup prepend="腰圍" labelWidth="104" append="cm">
          <el-input v-model="selfFillForm.waist" />
        </DtxInputGroup>
        <DtxInputGroup prepend="血壓" labelWidth="104" append="mmHg">
          <el-input v-model="selfFillForm.bloodPressure" />
        </DtxInputGroup>
        <DtxInputGroup prepend="脈搏" labelWidth="104" append="次/分">
          <el-input v-model="selfFillForm.pulse" />
        </DtxInputGroup>
        <DtxInputGroup
          prepend="體重"
          labelWidth="104"
          style="grid-column: 2/-1"
        >
          <div class="flex gap-2">
            <el-select
              filterable
              v-model="selfFillForm.weightGain.answer1"
              class="border-l-0"
            >
              <el-option
                v-for="item in weightGainOptions1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-select
              filterable
              v-model="selfFillForm.weightGain.answer2"
              class="border-l-0"
            >
              <el-option
                v-for="item in weightGainOptions2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-input v-model="selfFillForm.weightGain.answer3" />
            <div style="padding-top: 8px; min-width: 100px">kg，期間:</div>
            <el-input
              v-model="selfFillForm.weightGain.answer4"
              placeholder="請請輸入日期"
            />
          </div>
        </DtxInputGroup>
      </div>

      <div class="basic-info basic-info-secion3">
        <DtxInputGroup prepend="菸" labelWidth="104">
          <el-select filterable v-model="selfFillForm.smoke" class="border-l-0">
            <el-option
              v-for="item in smokeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </DtxInputGroup>
        <DtxInputGroup prepend="量" labelWidth="104" append="支/天">
          <el-input v-model="selfFillForm.smokeNumber" />
        </DtxInputGroup>
        <DtxInputGroup prepend="頻率" labelWidth="104" append="天/周">
          <el-input v-model="selfFillForm.smokeFrequency" />
        </DtxInputGroup>
        <DtxInputGroup prepend="已戒菸" labelWidth="104" append="年">
          <el-input v-model="selfFillForm.quitSmokingDays" />
        </DtxInputGroup>
        <DtxInputGroup prepend="接觸二手菸" labelWidth="104">
          <el-select
            filterable
            v-model="selfFillForm.exposureSecondHandSmoke"
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
      </div>
      <div class="basic-info">
        <DtxInputGroup
          prepend="檳榔"
          labelWidth="104"
          style="grid-column: span 5"
        >
          <el-select
            filterable
            v-model="selfFillForm.betelNut"
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
      </div>
      <div class="basic-info basic-info-secion4">
        <DtxInputGroup prepend="酒" labelWidth="104">
          <el-select
            filterable
            v-model="selfFillForm.liqueur"
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
        <DtxInputGroup prepend="量" labelWidth="104" append="ml/天">
          <el-input v-model="selfFillForm.liqueurNumber" />
        </DtxInputGroup>
        <DtxInputGroup prepend="頻率" labelWidth="104" append="天/周">
          <el-input v-model="selfFillForm.liqueurFrequency" />
        </DtxInputGroup>
        <DtxInputGroup prepend="喝酒種類" labelWidth="104">
          <el-input v-model="selfFillForm.liqueurTypes" />
        </DtxInputGroup>
      </div>
      <div class="basic-info basic-info-secion5">
        <DtxInputGroup prepend="運動" labelWidth="104">
          <el-select
            filterable
            v-model="selfFillForm.exercise"
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
        <DtxInputGroup prepend="運動時間約" labelWidth="104" append="分鐘/天">
          <el-input v-model="selfFillForm.exerciseTime" />
        </DtxInputGroup>
        <DtxInputGroup prepend="頻率" labelWidth="104" append="天/周">
          <el-input v-model="selfFillForm.exerciseFrequency" />
        </DtxInputGroup>
      </div>
    </main>
    <header class="dtc-page-header dtc-page-header-grid grid text-white mt-2">
      <div>健康追蹤項目 (專業人員填寫)</div>
    </header>
    <main class="grid gap-2 grid-cols-2">
      <div
        class="flex relative my-flex health-tracking health-tracking-secion1"
      >
        <div class="grid max-content">
          <span
            class="flex dtc-label px-3 items-center rounded rounded-r-none text-sm"
            >醫師</span
          >
        </div>
        <div class="question-for-doctor">
          <div class="grid" style="grid-template-columns: 130px 1fr">
            <div class="mr-1 w-28 text-right dtc-text">健康促進需求:</div>
            <div>
              <el-radio
                v-model="doctorQA1"
                label="無"
                style="margin-right: 10px"
                >無</el-radio
              >
              <el-radio v-model="doctorQA1" label="有"
                >有，但尚無須轉介(提供手冊-成人預防、銀髮族、疾病飲食)</el-radio
              >
            </div>
          </div>
          <div class="grid mt-2" style="grid-template-columns: 130px 1fr">
            <div class="mr-1 w-28 text-right dtc-text">戒菸門診:</div>
            <div>
              <el-checkbox-group v-model="doctorQA2">
                <el-checkbox label="照會"></el-checkbox>
                <el-checkbox label="預約就診日期"></el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="grid mt-2" style="grid-template-columns: 130px 1fr">
            <div class="mr-1 w-28 text-right dtc-text">轉介營養諮詢:</div>
            <div>
              <el-checkbox-group v-model="doctorQA3">
                <el-checkbox label="照會"></el-checkbox>
                <el-checkbox label="預約就診日期"></el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="grid mt-2" style="grid-template-columns: 130px 520px 1fr">
            <div class="mr-1 w-28 text-right dtc-text">未轉介原因:</div>
            <div>
              <el-checkbox-group v-model="doctorQA4">
                <el-checkbox label="病人無意願"></el-checkbox>
                <el-checkbox label="醫院離家太遠"></el-checkbox>
                <el-checkbox label="時間無法配合"></el-checkbox>
                <el-checkbox label="其他"></el-checkbox>
              </el-checkbox-group>
            </div>
            <el-input v-model="medicalNumber" style="background-color: #fff" />
          </div>
          <div class="mt-2 dtc-text">(提供手冊-成人預防、銀髮族、疾病飲食)</div>
          <div
            class="mt-4 text-right flex flex-row pr-10"
            style="justify-content: flex-end"
          >
            <div class="mr-3 dtc-text">醫師:</div>
            <div style="color: #888">請蓋章</div>
          </div>
        </div>
      </div>
      <div
        class="flex relative my-flex health-tracking health-tracking-secion2"
      >
        <div class="grid max-content">
          <span
            class="flex dtc-label px-3 items-center rounded rounded-r-none text-sm"
            >衛教師</span
          >
        </div>
        <div class="question-for-doctor">
          <div class="grid mt-2" style="grid-template-columns: 130px 530px">
            <div class="mr-1 w-28 text-right dtc-text">衛教指導:</div>
            <div>
              <el-checkbox-group v-model="healthTeacherQA">
                <el-checkbox label="戒菸"></el-checkbox>
                <el-checkbox label="戒檳榔"></el-checkbox>
                <el-checkbox label="節制飲酒"></el-checkbox>
                <el-checkbox label="肥胖"></el-checkbox>
                <el-checkbox label="維持正常體重"></el-checkbox>
                <el-checkbox label="健康飲食"></el-checkbox>
                <el-checkbox label="規律運動"></el-checkbox>
                <el-checkbox label="高血壓"></el-checkbox>
                <el-checkbox label="糖尿病"></el-checkbox>
                <el-checkbox label="其它"></el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div
            class="mt-4 text-right flex flex-row pr-10"
            style="justify-content: flex-end"
          >
            <div class="mr-3 dtc-text">衛教師:</div>
            <div style="color: #888">請蓋章</div>
          </div>
          <hr class="mt-8 mb-3" size="8px" align="center" width="100%" />
          <div class="dtc-text">
            本院配合國建署推動全民健康生活政策，協助您關心及記錄自己的健康狀況與您該知道的健康訊息及相關資源，讓您的自我健康管理可以做得更好!
            以上衛教說明，如果您了解，請幫我們簽名:<span
              class="inline-block px-10 pt-2 pb-2"
              style="color: #888; border-bottom: 1px solid #cbcbcb"
              >請蓋章</span
            >謝謝!
          </div>
        </div>
      </div>
    </main>
    <footer class="mt-5 mb-10">
      <Button class="p-button-info" style="margin: 4px 0" @click="createItem"
        >建立初診資料</Button
      >
    </footer>
  </div>
</template>

<script lang="ts">
//健康追蹤項目專業人員
let hisId,
  sex = "male",
  carrer,
  nationality,
  bookPaper = true,
  email,
  mobile,
  firstVisit,
  married,
  address1,
  address2,
  name,
  phone1,
  phone1_1,
  phone1_1_1,
  blood,
  allergy,
  allergyTxt,
  personId,
  birthday,
  sms = true,
  contactName,
  relationship,
  contactPhone,
  contactMobile;

const selfFillForm = {
  weightGain: {},
  weightGainOptions1: {},
  weightGainOptions2: {},
};
let basicCard = {
  hisId,
  sex,
  carrer,
  nationality,
  bookPaper,
  email,
  mobile,
  firstVisit,
  married,
  address1,
  address2,
  name,
  phone1,
  phone1_1,
  phone1_1_1,
  blood,
  allergy,
  allergyTxt,
  personId,
  birthday,
  sms,
  contactName,
  relationship,
  contactPhone,
  contactMobile,
};

let headers = [
  { name: "ID", key: "id", sortDesc: null },
  { name: "建立者", key: "name", sortDesc: null },
  { name: "建立者", key: "name", sortDesc: null },
  { name: "年齡", key: "age", sortDesc: null },
];

export default {
  name: "firstvisit",
  components: {},
  inject: ["actions"],
  data() {
    return {
      basicCard,
      selfFillForm,
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
      medicalHistoryOptions: [
        {
          value: "y",
          label: "是",
        },
        {
          value: "n",
          label: "否",
        },
      ],
      medicalHistory: {
        whether: "y",
        medicalName: "",
      },
      citizenship: "",
      address: {
        postalCode: "",
        completeAddress: "",
      },
      healthReport: "願意",
      recieveText: "願意",
      email: "",
      emergencyContact: "",
      relationship: "",
      contactNumber: "",
      secondMobileNumber: "",
      height: "",
      weight: "",
      BMINumber: "",
      waist: "",
      bloodPressure: "",
      pulse: "",
      weightGain: {
        answer1: "y",
        answer2: "plus",
        answer3: "",
        answer4: "",
      },
      weightGainOptions1: [
        {
          value: "y",
          label: "有",
        },
        {
          value: "n",
          label: "無明顯改變",
        },
      ],
      weightGainOptions2: [
        {
          value: "plus",
          label: "增加",
        },
        {
          value: "minus",
          label: "減輕",
        },
      ],
      smoke: "n",
      smokeOptions: [
        {
          value: "y",
          label: "有",
        },
        {
          value: "n",
          label: "無",
        },
        {
          value: "c",
          label: "電子菸",
        },
      ],
      smokeNumber: "",
      smokeFrequency: "",
      quitSmokingDays: "",
      exposureSecondHandSmoke: "n",
      yesNoOptions: [
        {
          value: "y",
          label: "有",
        },
        {
          value: "n",
          label: "無",
        },
      ],
      betelNut: "n",
      liqueur: "n",
      liqueurNumber: "",
      liqueurFrequency: "",
      liqueurTypes: "",
      exercise: "y",
      exerciseTime: "",
      exerciseFrequency: "",
      doctorQA1: "",
      doctorQA2: [],
      doctorQA3: [],
      doctorQA4: [],
      healthTeacherQA: [],
    };
  },
  methods: {
    async createItem() {
      const _selfFillForm = JSON.stringify(this.selfFillForm);
      await this.actions.addBasicInfo({
        ...this.basicCard,
        selfFillForm: _selfFillForm,
      });
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

main {
  grid-template-columns: repeat(auto-fill, minmax(160px, 250px));
  .basic-info {
    grid-column: span 5;
    display: grid;
    grid-gap: 5px;
    background: #f9f9f9;
    border: 1px solid #d7dce1;
    padding: 10px;
    grid-gap: 10px;
    width: 96vw;
    border-radius: 10px;
  }
  .basic-info-secion1 {
    grid-template-columns: 190px 190px 180px 200px 210px;
    height: auto;
    > div {
      height: 40px;
    }
  }
  .basic-info-secion2 {
    grid-template-columns: 104px 120px 104px 104px 104px 140px;
  }
  .basic-info-secion3 {
    grid-template-columns: 180px repeat(4, 200px);
  }
  .basic-info-secion4 {
    grid-template-columns: 180px repeat(3, 200px);
  }
  .basic-info-secion5 {
    grid-template-columns: 180px repeat(2, 200px);
  }
  .health-tracking {
    display: grid;
    grid-column: span 5;
    grid-gap: 5px;
    padding: 5px;
    border: 1px solid #d7dce1;
  }
  .health-tracking-secion1 {
    grid-template-columns: 104px 1fr;
    grid-template-rows: 240px;
  }
  .health-tracking-secion2 {
    grid-template-columns: 104px 1fr;
    grid-template-rows: 240px;
  }
  @media only screen and (max-width: 1024px) {
    .basic-info-secion1 {
      grid-template-columns: repeat(3, 200px);
    }
    .basic-info-secion3 {
      grid-template-columns: 180px repeat(2, 200px);
    }
  }
}

.date-style {
  border: 1px solid #dcdfe6;
  width: 140px;
  font-size: 10px;
  padding-left: 5px;
}
.question-for-doctor {
  display: flex;
  // height: 300px;
  padding: 15px;
  text-align: left;
  // 修改以下值試試看 row | row-reverse | column | column-reverse;
  flex-direction: column;
}
.dtc-label {
  background: transparent
    linear-gradient(180deg, #e2e5fd 0%, #e8eaff 47%, #c0c7f5 100%) 0% 0%
    no-repeat padding-box;
  color: black;
}
</style>
