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
        my-title
        relative
        dtc-grid-grumanagement-header dtc-grid-header dtc-grid-header__divs
        dtc-template-columns
        mx-1
        mt-4
      "
    >
      <div
        v-for="(item, i) in headers"
        :key="i"
        @click="sort(headers, item)"
        :title="item.name"
      >
        {{ item.name }}
        <span v-show="item.sortDesc === null">
          <i-typcn:arrow-unsorted></i-typcn:arrow-unsorted>
        </span>
        <span v-show="item.sortDesc === false">
          <i-typcn:arrow-sorted-down></i-typcn:arrow-sorted-down>
        </span>
        <span v-show="item.sortDesc">
          <i-typcn:arrow-sorted-up></i-typcn:arrow-sorted-up>
        </span>
      </div>
    </header>
    <main
      class="
        dtc-grid-header dtc-grid-body dtc-template-columns
        text-black
        ml-1
        mx-1
      "
      v-for="(item, i) in list"
      :key="i"
      :style="
        i % 2 == 0 ? 'background-color: #F5F5F5;' : 'background-color: #E0E0E0;'
      "
    >
      <div class="flex flex-none space-x-2">
        <Button
          label="入庫單明細"
          class="p-button-sm"
          @click="editItem(item)"
        />
      </div>
      <div>{{ item.name || "暫無資料" }}</div>
      <div>{{ item.name || "暫無資料" }}</div>
      <div>{{ item.name || "暫無資料" }}</div>
      <div>{{ item.name || "暫無資料" }}</div>
    </main>
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
    const global = inject("global");
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
      { value: "Retinitis Pigmentosa", text: "Retinitis Pigmentosa" },
      { value: "Retinitis Pigmentosa", text: "Retinitis Pigmentosa" },
      { value: "Retinitis Pigmentosa", text: "Retinitis Pigmentosa" },
      { value: "Retinitis Pigmentosa", text: "Retinitis Pigmentosa" },
    ]);

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
  border-radius: 5px;
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
.word1,
.word2 {
  cursor: pointer;
}
</style>
