<template>
  <section class="management">
    <header class="dtc-page-header grid dtc-page-header__grid pr-2 my-long-header">
      <div>診斷碼管理</div>
    </header>
    <main class="section-1">
      <div>
        <DtxInputGroup prepend="科別" labelWidth="120">
          <el-select filterable v-model="searchDivision" placeholder="請選擇" class="border-l-0">
            <el-option v-for="item in divisionOptions" :key="`${item}divisionOption`" :label="item.text" :value="item.value"> </el-option>
          </el-select>
        </DtxInputGroup>
        <div>
          <header class="disease-header dtc-label mt-3">
            <div class="word-1">疾病類別 (190)</div>
            <div></div>
            <div class="word-2">加入</div>
          </header>
          <div class="content">
            <main class="disease-header disease-content" v-for="(item, i) in diseaseOptions" :key="`${item}${i}diseaseOption`" :title="item.name">
              <div></div>
              <div class="word-1">{{ item.value }}</div>
              <div></div>
              <div class="word-2" style="color: #6da8e2" @click="addDisease(item)">
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
          <div v-if="usuallyDiseaseOptions.length > 0">編輯</div>
          <div v-if="usuallyDiseaseOptions.length > 0">刪除</div>
          <div></div>
        </header>
        <div class="content content2">
          <main class="disease-header2 disease-content2" v-for="(item, i) in usuallyDiseaseOptions" :key="`${item}${i}usuallydisease-header`" :title="item.name">
            <div></div>
            <div class="word-1">
              <input v-if="item.edit" v-model="item.value" @blur="item.edit = false" @keyup.enter="item.edit = false" style="min-width: 420px" />
              <div v-else style="cursor: pointer">
                <span @click="item.edit = true">{{ item.value }}</span>
              </div>
            </div>
            <div></div>
            <div class="word-2" style="color: #16b57f">
              <i class="el-icon-edit inline-block mt-0.5"></i>
            </div>
            <div class="word-2" style="color: #f15555" @click="deleteDisease(item)">
              <i class="el-icon-delete inline-block mt-0.5"></i>
            </div>
            <div></div>
          </main>
        </div>
      </div>
    </main>
    <header class="dtc-grid-grumanagement-header dtc-grid-header dtc-grid-header__divs dtc-template-columns mx-2 mt-4">
      <div v-for="(item, i) in headers" :key="`${item}${i}dtc-grid-header`" :title="item.name">
        {{ item.name }}
      </div>
    </header>
    <main v-for="(item, rowIdx) in icdRows" :key="'ritem' + rowIdx" class="dtc-grid-header dtc-grid-body dtc-template-columns text-black mx-2">
      <div style="padding-top: 0px">
        <Checkbox :binary="true" v-model="item.slow" class="inline-block" />
      </div>
      <div style="padding-top: 12px; padding-bottom: 0px">
        <InputSwitch v-model="item.ro"></InputSwitch>
      </div>
      <div class="">
        <AutoComplete
          class="border-transparent transform"
          placeholder="請輸入"
          v-model="item.icd9"
          :delay="300"
          :suggestions="item.filteredICD9"
          @complete="searchICD9(item, $event)"
          field="chDrgCnName"
          @item-select="selectedICD9(item)"
        />
      </div>
      <div class="">
        <AutoComplete
          class="border-transparent transform"
          placeholder="請輸入"
          v-model="item.icd10"
          :delay="300"
          :suggestions="item.filteredICD10"
          @complete="searchICD10(item, $event)"
          field="chDrgCnName"
          @item-select="selectedICD10(item)"
        />
      </div>
      <div>{{ rowIdx == 0 ? "主診斷碼" : "副診斷碼" + rowIdx }}</div>
      <div>
        <el-input placeholder="" v-model="item.internationEngName" clearable> </el-input>
      </div>
      <div>
        <el-input placeholder="" v-model="item.internationChineName" clearable> </el-input>
      </div>
    </main>

    <div class="flex flex-col space-y-1 px-2 mt-2 mb-2">
      <span class="dtc-label inline-block w-24 py-3">診斷說明:</span>
      <Textarea autosize v-model="illu" placeholder="請輸入診斷說明"></Textarea>
    </div>
    <Button label="確認診斷碼管理" class="p-button-md p-button-warning mt-3 mr-4" />
    <Button label="回門診" @click="$router.push('/home')" class="p-button-md p-button-info mr-3 mt-3" />
  </section>
</template>

<script>
import { toRefs, ref, inject, computed, reactive, watch } from "vue";
import { Subject, of, pipe } from "rxjs";
import axios from "utils/request";
import { distinctUntilChanged, switchMap, catchError } from "rxjs/operators";

import { useList } from "/@/hooks/useHis.js";
import allIDC9Data from "/@/dataIDC9.js";

let headers = [{ name: "慢性" }, { name: "R/0" }, { name: "ICD9" }, { name: "ICD10" }, { name: "" }, { name: "國際級病名稱(英)" }, { name: "國際級病名稱(中)" }];

export default {
  name: "inquerylistcodevi",
  components: {},
  data() {
    return {
      icd10$: new Subject(),
      icd9$: new Subject(),
    };
  },
  methods: {
    selectedICD10(item) {
      const obj = item?.filteredICD10?.find((s) => s.chDrgCnName == item?.icd10?.chDrgCnName);
      item.internationChineName = obj?.chDrgMakerName;
    },
    selectedICD9(item) {
      const obj = item?.filteredICD9?.find((s) => s.chDrgCnName == item?.icd9?.chDrgCnName);
      item.internationChineName = obj?.chDrgMakerName;
    },
    async getICD10List({ item, event }) {
      if (event?.query?.length > 1) {
        const atc = "chDrgId_contains=" + event.query;
        const ret = await axios.get("drg-infos?_limit=20&" + atc);
        item.filteredICD10 = ret;
      } else {
        item.filteredICD10 = [];
      }
      return "";
    },
    async getICD9List({ item, event }) {
      if (event?.query?.length > 1) {
        const atc = "chDrgId_contains=" + event.query;
        const ret = await axios.get("drg-infos?_limit=20&" + atc);
        item.filteredICD9 = ret;
      } else {
        item.filteredICD9 = [];
      }
      return "";
    },
    searchICD10(item, event) {
      this.icd10$.next({ item, event });
    },
    searchICD9(item, event) {
      this.icd9$.next({ item, event });
    },
  },
  beforeUnmount() {
    this.icd10$.unsubscribe();
    this.icd9$.unsubscribe();
  },
  mounted() {
    this.icd10$
      .pipe(
        distinctUntilChanged((pre, cur) => {
          const eq = !!pre.event.query === cur.event.query;
          if (eq) cur.item.filteredICD10 = [];
          return eq;
        }),
        switchMap(this.getICD10List),
        catchError((s) => of(""))
      )
      .subscribe();
    this.icd9$
      .pipe(
        distinctUntilChanged((pre, cur) => {
          const eq = !!pre.event.query === cur.event.query;
          if (eq) cur.item.filteredICD9 = [];
          return eq;
        }),
        switchMap(this.getICD9List),
        catchError((s) => of(""))
      )
      .subscribe();
  },
  setup() {
    const global = inject("global");
    let displayBasic = ref(false);
    const searchDivision = ref("");
    const divisionOptions = reactive([
      { value: "Nephrology", text: "Nephrology" },
      { value: "Urology", text: "Urology" },
      { value: "Psychiatry", text: "Psychiatry" },
      { value: "Obstetrics & Gynecology", text: "Obstetrics & Gynecology" },
      { value: "Orthopedics", text: "Orthopedics" },
    ]);
    let diseaseOptions = reactive([
      {
        value: "3-methylcrotonyl-CoA-carboxylase deficiency, 3MCC",
        text: "3-methylcrotonyl-CoA-carboxylase deficiency, 3MCC",
        edit: false,
      },
      {
        value: "Aarskog Scott Syndrome",
        text: "Aarskog Scott Syndrome",
        edit: false,
      },
      {
        value: "Argininosuccinic aciduria",
        text: "Argininosuccinic aciduria",
        edit: false,
      },
      {
        value: "Aromatic L-amino acid decarboxylase deficiency,AADC",
        text: "Aromatic L-amino acid decarboxylase deficiency,AADC",
        edit: false,
      },
      {
        value: "Familial Amyloidotic Polyneuropathy",
        text: "Familial Amyloidotic Polyneuropathy",
        edit: false,
      },
      {
        value: "Paroxysmal Nocturnal Hemoglobinuria, PNH",
        text: "Paroxysmal Nocturnal Hemoglobinuria, PNH",
        edit: false,
      },
      {
        value: "Retinitis Pigmentosa",
        text: "Retinitis Pigmentosa",
        edit: false,
      },
    ]);
    let usuallyDiseaseOptions = reactive([]);
    const icdRows = reactive([{}, {}, {}, {}]);
    //section3 variable
    const slow = reactive({});
    const ro = reactive({});

    const internationEngName = reactive({});
    const internationChineName = reactive({});
    let allICD9Optopns = reactive([]);
    allICD9Optopns = allIDC9Data.map((s) => {
      s.combine = `${s.value}${s.text}`;
      return s;
    });

    const allICD10Optopns = reactive(["C00", "C01", "C02", "C03", "C04"]);
    const illu = ref("");
    headers = ref(headers);
    const { state, getList, sort, clearFilters, removeItem, getItemDetail, twTime } = useList("drg-warehouse-request-adds");

    const addDisease = (item) => {
      let index = diseaseOptions.findIndex((s) => s == item);
      diseaseOptions.splice(index, 1);
      usuallyDiseaseOptions.push(item);
      usuallyDiseaseOptions.sort((a, b) => {
        if (a.value > b.value) return 1;
        if (a.value < b.value) return -1;
      });
    };
    const deleteDisease = (item) => {
      let index = usuallyDiseaseOptions.findIndex((s) => s == item);
      usuallyDiseaseOptions.splice(index, 1);
      diseaseOptions.push(item);
      diseaseOptions.sort((a, b) => {
        if (a.value > b.value) return 1;
        if (a.value < b.value) return -1;
      });
    };

    const showICD9Option = (item, index) => {
      if (!Boolean(item)) {
        return;
      }
      global.dataICD9Index = index;
      global.editItem = item;
      global.showICD9Item = true;
    };
    const openBasic = (item) => {
      displayBasic.value = true;
    };

    const showICD10Option = (item) => {
      console.log("ShowICD10Option");
    };

    watch(
      () => global.showICD9Item,
      (idx, prevIdx) => {
        let isClose = idx;
        if (!idx && Boolean(global.editItem) && (+global.dataICD9Index == 1 || +global.dataICD9Index == 2 || +global.dataICD9Index == 3 || +global.dataICD9Index == 4)) {
          switch (global.dataICD9Index) {
            case 1:
              selectedICD9["one"] = global.editItem;
              global.dataICD9Index = 0;
              break;
            case 2:
              selectedICD9["two"] = global.editItem;
              global.dataICD9Index = 0;
              break;
            case 3:
              selectedICD9["three"] = global.editItem;
              global.dataICD9Index = 0;
              break;
            case 4:
              selectedICD9["four"] = global.editItem;
              global.dataICD9Index = 0;
              break;
            default:
              console.log(`Sorry, no data`);
          }
        }
      }
    );

    return {
      ...toRefs(state),
      getList,
      headers,
      searchDivision,
      divisionOptions,
      diseaseOptions,
      usuallyDiseaseOptions,
      sort,
      slow,
      ro,
      allICD9Optopns,
      allICD10Optopns,
      internationEngName,
      internationChineName,
      illu,
      addDisease,
      deleteDisease,
      showICD9Option,
      showICD10Option,
      displayBasic,
      openBasic,
      icdRows,
    };
  },
};
</script>

<style lang="scss" scoped>
.dtc-template-columns {
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
  grid-template-columns: 120px 1fr 82px;
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
  grid-template-columns: 140px 1fr 60px 60px 2px;
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
.word-2 {
  cursor: pointer;
}
.p-dialog-content {
  overflow: hidden !important;
}
.p-dialog-content {
  overflow-y: hidden;
}
</style>
