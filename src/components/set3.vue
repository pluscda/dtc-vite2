<template>
  <section style="background: #4b5563" class="dtc-door-way-section">
    <header class="flex gap-4 dtc-text pl-0s dtc-tabs" style="">
      <section style="background: none !important" class="dtc-text cursor-auto">A 診斷</section>
      <div>組套</div>
      <div>設為組套</div>
      <div @click="$router.push('/diagnosis/diseasecodemanagement')">診斷碼搜尋</div>
      <div>清除</div>
    </header>
    <nav class="w-full border-b-4" style="border-color: #646b74 !important"></nav>
    <header class="my-title relative dtc-grid-header dtc-grid-header__divs dtc-template-columns">
      <div>操作</div>
      <div v-for="(item, i) in headers" :key="i" @click="sort(headers, item)" :title="item.name">
        {{ item.name }}
      </div>
    </header>
    <main class="my-title relative dtc-grid-header dtc-template-columns" style="height: 50px" v-for="(item, i) in items" :key="i">
      <div style="border-color: #9ca3af !important">
        <el-popconfirm title="確定刪除嗎？" confirmButtonText="好的" cancelButtonText="不用了" @confirm="removeItem(item)">
          <template #reference>
            <Button label="刪除" class="p-button-sm p-button-warning" />
          </template>
        </el-popconfirm>
      </div>
      <div class="no-ring">
        <AutoComplete
          class="border-transparent transform -translate-y-1"
          placeholder="請輸入"
          v-model="item.icd10"
          :delay="300"
          :suggestions="item.filteredICD10"
          @complete="searchICD10(item, $event)"
          field="chDrgCnName"
          @item-select="selectedICD10(item)"
        />
      </div>
      <div class="no-ring flex">
        <AutoComplete
          class="inline-block border-transparent transform -translate-y-1"
          style="width: clamp(100%, 100%, 100%)"
          placeholder="請輸入診斷內容"
          v-model="item.icdWords"
          :suggestions="item.filteredICDWords"
          @complete="searchICDWords(item, $event)"
          field="name"
        />
      </div>
    </main>
  </section>
</template>

<script>
import { Subject, of } from "rxjs";
import axios from "utils/request";
import { distinctUntilChanged, switchMap, catchError } from "rxjs/operators";
let headers = [
  { name: "ICD10", key: "chDrgId", sortDesc: null },
  { name: "診斷內容", key: "chHospitalId", sortDesc: null },
];
const items = [{}, {}, {}, {}];
export default {
  data() {
    return {
      headers,
      input: "",
      items,
      icd10$: new Subject(),
    };
  },
  methods: {
    selectedICD10(item) {
      const obj = item?.filteredICD10?.find((s) => s.chDrgCnName == item?.icd10?.chDrgCnName);
      item.icdWords = obj?.chDrgMakerName;
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
    searchICD10(item, event) {
      this.icd10$.next({ item, event });
    },
    searchICDWords(item, event) {
      // item.filteredICDWords = [];
    },
  },
  beforeUnmount() {
    this.icd10$.unsubscribe();
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
  },
};
</script>

<style lang="scss" scoped>
.dtc-tabs::after {
  all: unset;
}
.dtc-template-columns {
  height: 40px;
  > div {
    border-radius: 0px !important;
    line-height: 34px;
  }
  width: 100%;
  grid-template-columns: 70px 180px 1fr;
}
</style>
