<template>
  <section class="management">
    <header
      class="dtc-page-header grid dtc-page-header__grid pr-2 my-long-header"
    >
      <div>診斷碼管理</div>
    </header>
    <main class="section-1">
      <div>
        <DtxInputGroup prepend="科別" labelWidth="120">
          <el-select
            filterable
            v-model="searchDivision"
            placeholder="請選擇"
            class="border-l-0"
          >
            <el-option
              v-for="item in divisionOptions"
              :key="item"
              :label="item.text"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </DtxInputGroup>
        <div>
          <header class="disease-header dtc-label mt-3">
            <div class="word-1">疾病類別 (190)</div>
            <div></div>
            <div class="word-2">加入</div>
          </header>
          <div class="content">
            <main
              class="disease-header disease-content"
              v-for="(item, i) in diseaseOptions"
              :key="i"
              :title="item.name"
            >
              <div></div>
              <div class="word-1">{{ item.value }}</div>
              <div></div>
              <div class="word-2" style="color: #6da8e2">
                <i class="el-icon-plus inline-block mt-0.5"></i>
              </div>
            </main>
          </div>
        </div>
      </div>
      <div>
        <header class="disease-header2 dtc-label">
          <div class="word-1">常用疾病類別 (95)</div>
          <div></div>
          <div class="word-2">編輯</div>
          <div class="word-2">刪除</div>
          <div></div>
        </header>
        <div class="content content2">
          <main
            class="disease-header2 disease-content2"
            v-for="(item, i) in diseaseOptions"
            :key="i"
            :title="item.name"
          >
            <div></div>
            <div class="word-1">{{ item.value }}</div>
            <div></div>
            <div style="color: #16b57f">
              <i class="el-icon-edit inline-block mt-0.5"></i>
            </div>
            <div class="word-2" style="color: #f15555">
              <i class="el-icon-delete inline-block mt-0.5"></i>
            </div>
            <div></div>
          </main>
        </div>
      </div>
    </main>
    <header
      class="
        dtc-grid-grumanagement-header dtc-grid-header dtc-grid-header__divs
        dtc-template-columns
        mx-2
        mt-4
      "
    >
      <div v-for="(item, i) in headers" :key="i" :title="item.name">
        {{ item.name }}
      </div>
    </header>
    <main
      class="dtc-grid-header dtc-grid-body dtc-template-columns text-black mx-2"
      style="background-color: #f5f5f5"
    >
      <div style="padding-top: 0px">
        <Checkbox :binary="true" v-model="slow['one']" class="inline-block" />
      </div>
      <div style="padding-top: 12px; padding-bottom: 0px">
        <InputSwitch v-model="ro['one']"></InputSwitch>
      </div>
      <div>
        <el-select
          filterable
          v-model="selectedICD9['one']"
          placeholder="請選擇"
          class="border-l-0"
        >
          <el-option
            v-for="item in divisionOptions"
            :key="item"
            :label="item.text"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div>
        <el-select
          filterable
          v-model="selectedICD10['one']"
          placeholder="請選擇"
          class="border-l-0"
        >
          <el-option
            v-for="item in divisionOptions"
            :key="item"
            :label="item.text"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div>主診斷碼</div>
      <div>
        <el-input placeholder="" v-model="internationEngName['one']" clearable>
        </el-input>
      </div>
      <div>
        <el-input
          placeholder=""
          v-model="internationChineName['one']"
          clearable
        >
        </el-input>
      </div>
    </main>
    <main
      class="dtc-grid-header dtc-grid-body dtc-template-columns text-black mx-2"
      style="background-color: #e0e0e0"
    >
      <div style="padding-top: 0px">
        <Checkbox :binary="true" v-model="slow['two']" class="inline-block" />
      </div>
      <div style="padding-top: 12px; padding-bottom: 0px">
        <InputSwitch v-model="ro['two']"></InputSwitch>
      </div>
      <div>
        <el-select
          filterable
          v-model="selectedICD9['two']"
          placeholder="請選擇"
          class="border-l-0"
        >
          <el-option
            v-for="item in divisionOptions"
            :key="item"
            :label="item.text"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div>
        <el-select
          filterable
          v-model="selectedICD10['two']"
          placeholder="請選擇"
          class="border-l-0"
        >
          <el-option
            v-for="item in divisionOptions"
            :key="item"
            :label="item.text"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div>副診斷碼1</div>
      <div>
        <el-input placeholder="" v-model="internationEngName['two']" clearable>
        </el-input>
      </div>
      <div>
        <el-input
          placeholder=""
          v-model="internationChineName['two']"
          clearable
        >
        </el-input>
      </div>
    </main>
    <main
      class="dtc-grid-header dtc-grid-body dtc-template-columns text-black mx-2"
      style="background-color: #f5f5f5"
    >
      <div style="padding-top: 0px">
        <Checkbox :binary="true" v-model="slow['three']" class="inline-block" />
      </div>
      <div style="padding-top: 12px; padding-bottom: 0px">
        <InputSwitch v-model="ro['three']"></InputSwitch>
      </div>
      <div>
        <el-select
          filterable
          v-model="selectedICD9['three']"
          placeholder="請選擇"
          class="border-l-0"
        >
          <el-option
            v-for="item in divisionOptions"
            :key="item"
            :label="item.text"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div>
        <el-select
          filterable
          v-model="selectedICD10['three']"
          placeholder="請選擇"
          class="border-l-0"
        >
          <el-option
            v-for="item in divisionOptions"
            :key="item"
            :label="item.text"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div>副診斷碼2</div>
      <div>
        <el-input
          placeholder=""
          v-model="internationEngName['three']"
          clearable
        >
        </el-input>
      </div>
      <div>
        <el-input
          placeholder=""
          v-model="internationChineName['three']"
          clearable
        >
        </el-input>
      </div>
    </main>
    <main
      class="dtc-grid-header dtc-grid-body dtc-template-columns text-black mx-2"
      style="background-color: #e0e0e0"
    >
      <div style="padding-top: 0px">
        <Checkbox :binary="true" v-model="slow['four']" class="inline-block" />
      </div>
      <div style="padding-top: 12px; padding-bottom: 0px">
        <InputSwitch v-model="ro['four']"></InputSwitch>
      </div>
      <div>
        <el-select
          filterable
          v-model="selectedICD9['four']"
          placeholder="請選擇"
          class="border-l-0"
        >
          <el-option
            v-for="item in divisionOptions"
            :key="item"
            :label="item.text"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div>
        <el-select
          filterable
          v-model="selectedICD10['four']"
          placeholder="請選擇"
          class="border-l-0"
        >
          <el-option
            v-for="item in divisionOptions"
            :key="item"
            :label="item.text"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div>副診斷碼3</div>
      <div>
        <el-input placeholder="" v-model="internationEngName['four']" clearable>
        </el-input>
      </div>
      <div>
        <el-input
          placeholder=""
          v-model="internationChineName['four']"
          clearable
        >
        </el-input>
      </div>
    </main>
    <div class="section-3">
      <span class="dtc-label section-3-word">診斷說明:</span>
      <el-input
        type="textarea"
        autosize
        v-model="illu"
        placeholder="請輸入診斷說明"
      />
    </div>
    <Button
      label="回門診"
      @click="$router.push('/home')"
      class="p-button-md p-button-info mr-3"
    />
    <Button label="確認" class="p-button-md p-button-warning" />
  </section>
</template>

<script>
import { toRefs, ref, inject, computed, reactive } from "vue";
import Pagination from "cps/Pagination.vue";
import { useList } from "/@/hooks/useHis.js";

let headers = [
  { name: "慢性" },
  { name: "R/0" },
  { name: "ICD9" },
  { name: "ICD10" },
  { name: "" },
  { name: "國際級病名稱(英)" },
  { name: "國際級病名稱(中)" },
];

export default {
  name: "inquerylist",
  components: {
    Pagination,
  },
  setup() {
    const searchDivision = ref("");
    const divisionOptions = reactive([
      { value: "Nephrology", text: "Nephrology" },
      { value: "Urology", text: "Urology" },
      { value: "Psychiatry", text: "Psychiatry" },
      { value: "Obstetrics & Gynecology", text: "Obstetrics & Gynecology" },
      { value: "Orthopedics", text: "Orthopedics" },
    ]);
    const diseaseOptions = reactive([
      { value: "Aarskog Scott Syndrome", text: "Aarskog Scott Syndrome" },
      {
        value: "Familial Amyloidotic Polyneuropathy",
        text: "Familial Amyloidotic Polyneuropathy",
      },
      {
        value: "3-methylcrotonyl-CoA-carboxylase deficiency, 3MCC",
        text: "3-methylcrotonyl-CoA-carboxylase deficiency, 3MCC",
      },
      {
        value: "Paroxysmal Nocturnal Hemoglobinuria, PNH",
        text: "Paroxysmal Nocturnal Hemoglobinuria, PNH",
      },
      { value: "Retinitis Pigmentosa", text: "Retinitis Pigmentosa" },
      { value: "Retinitis Pigmentosa", text: "Retinitis Pigmentosa" },
      { value: "Retinitis Pigmentosa", text: "Retinitis Pigmentosa" },
    ]);
    //secrion3 variable
    const slow = reactive({});
    const ro = reactive({});
    const selectedICD9 = reactive({});
    const selectedICD10 = reactive({});
    const internationEngName = reactive({});
    const internationChineName = reactive({});
    const illu = ref("");
    headers = ref(headers);
    const {
      state,
      getList,
      sort,
      clearFilters,
      removeItem,
      getItemDetail,
      twTime,
    } = useList("drg-warehouse-request-adds");

    return {
      ...toRefs(state),
      getList,
      headers,
      searchDivision,
      divisionOptions,
      diseaseOptions,
      sort,
      slow,
      ro,
      selectedICD9,
      selectedICD10,
      internationEngName,
      internationChineName,
      illu,
    };
  },
  mounted() {
    this.$primevue.config.locale = this.zh;
  },
};
</script>

<style lang="scss" scoped>
.dtc-template-columns {
  // width: calc(103px + 120px * 16) !important;
  // max-width: calc(103px + 120px * 16) !important;
  grid-template-columns: 80px 100px 120px 120px 220px 1fr 1fr;
}
#app .management {
  position: relative;
  overflow-y: auto !important;
  min-height: calc(100vh);
  .comment {
    position: absolute;
    bottom: 70px;
    left: 0;
  }
}
.section-1 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(1, 300px);
  gap: 6px;
  padding: 10px;
}
.disease-header,
.disease-content,
.disease-header2 {
  display: grid;
  grid-template-columns: 120px 1fr 106px;
  border-radius: 5px 5px 0 0;
  height: 32px;
  line-height: 32px;
}
.content {
  height: 230px;
  overflow: auto;
  .disease-content {
    grid-template-columns: 10px max-content 1fr 80px;
    border-radius: 0px;
  }
}

.disease-header2 {
  grid-template-columns: 140px 1fr 60px 60px 15px;
}
.content2 {
  height: 283px;
  overflow: auto;
  .disease-content2 {
    grid-template-columns: 10px max-content 1fr 60px 60px 2px;
    border-radius: 0px;
  }
}
.section-3 {
  text-align: initial;
  margin: 10px 10px;
  .section-3-word {
    display: inline-block;
    padding: 5px;
    border-radius: 5px 5px 0 0;
  }
}
</style>
