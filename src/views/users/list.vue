<template>
  <div class="bg-skin-color">
    <header class="grid pr-2 dtc-page-header dtc-page-header__grid">
      <div class="">掛號{{ msg }}</div>
      <div class="flex items-center ml-4">
        <InputSwitch v-model="takeCard" class="mt-0"></InputSwitch>
        <span @click="takeCard = !takeCard">初診</span>
      </div>
      <div class="flex items-center ml-2">
        <InputSwitch v-model="takeCard2" class="mt-0"></InputSwitch>
        <span @click="takeCard = !takeCard2">複診</span>
      </div>
      <Button style="margin: 4px 0" class="p-button-rounded p-button-help" @click="$router.replace('/users/edit/1')">編輯個人資料/初診單</Button>
      <div></div>
      <Button class="p-button-rounded" style="margin: 4px 0">補卡取號</Button>
      <Button class="p-button-rounded p-button-success" style="margin: 4px 0" @click="readHealthCard">讀取健保卡</Button>
      <Button class="p-button-rounded p-button-info" style="margin: 4px 0">清除/重整</Button>
      <Button class="p-button-rounded p-button-warning" style="margin: 4px 0">確認掛號</Button>
    </header>
    <div class="grid gap-1 mb-3 ml-1 dtc-autoflow-grid">
      <DtxInputGroup prepend="身份證號">
        <AutoComplete
          class="transform -translate-y-1 border-transparent"
          placeholder="請輸入"
          v-model="item.personId"
          :delay="300"
          :suggestions="item.personIds"
          @complete="searchItems('personId', $event)"
          field="personId"
          @item-select="selectedPersonItem(item)"
        />
      </DtxInputGroup>
      <DtxInputGroup prepend="病患姓名">
        <AutoComplete
          class="transform -translate-y-1 border-transparent"
          placeholder="請輸入"
          v-model="item.cname"
          :delay="300"
          :suggestions="item.cnames"
          @complete="searchItems('cname', $event)"
          field="cname"
          @item-select="selectedPersonItem(item)"
        />
      </DtxInputGroup>
      <DtxInputGroup prepend="手機號碼">
        <AutoComplete
          class="transform -translate-y-1 border-transparent"
          placeholder="請輸入"
          v-model="item.phone"
          :delay="300"
          :suggestions="item.phones"
          @complete="searchItems('phone', $event)"
          field="phone"
          @item-select="selectedPersonItem(item)"
        />
      </DtxInputGroup>
      <DtxInputGroup prepend="出生日期">
        <Calendar class="w-full h-10" v-model="item.birthDate" placeholder="請輸入出生日期" :showIcon="true" dateFormat="yy-mm-dd" />
      </DtxInputGroup>
      <DtxInputGroup prepend="病歷號碼">
        <el-input placeholder="請輸入病歷號碼" v-model="item.patientId" />
      </DtxInputGroup>

      <DtxInputGroup prepend="病患性別">
        <el-select filterable v-model="item.genderCode" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in genders" :key="item.genderCode" :label="item.genderName" :value="item.genderCode"> </el-option>
        </el-select>
      </DtxInputGroup>

      <DtxInputGroup prepend="就診身份">
        <el-select filterable v-model="item.categoryId" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in personCates" :key="item.categoryId" :label="item.categoryName" :value="item.categoryId"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="折扣身份">
        <el-select filterable v-model="value" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="部分負擔">
        <el-select filterable v-model="value" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="就醫類別">
        <el-select filterable v-model="value" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="預防保健">
        <el-select filterable v-model="value" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="健保卡序">
        <el-input placeholder="搜尋檢查狀態" v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="掛號取卡" class="h-10">
        <InputSwitch v-model="takeCard" class="mt-2 ml-0 transform translate-x-2"></InputSwitch>
        <span class="ml-0.5 mt-0 inline-block transform translate-x-2 -translate-y-2 text-gray-600 text-base dtc-text" @click="takeCard = !takeCard">掛號後取卡</span>
        <!-- <el-checkbox class="mt-2 ml-2 h-9" v-model="checked">掛號後取卡</el-checkbox> -->
      </DtxInputGroup>
    </div>
    <section class="flex flex-col-reverse mb-2 space-x-1 xl:flex xl:flex-row">
      <Regsiter class="xl:w-1/2"></Regsiter>
      <Pay class="mt-2 mb-2 xl:w-1/2 xl:mt-0 x:mb-0"></Pay>
    </section>
    <InqueryList></InqueryList>
  </div>
</template>

<script>
import { inject, toRefs, ref, reactive } from "vue";
import { Subject, of } from "rxjs";
import { distinctUntilChanged, switchMap, catchError } from "rxjs/operators";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { useList } from "/@/hooks/useHis.js";
import Regsiter from "./components/register.vue";
import Pay from "./components/hisPay.vue";
import InqueryList from "./components/inqueryList.vue";
import { opdAddPerson$ } from "/@/store";
let headers = [
  { name: "ID", key: "id", sortDesc: null },
  { name: "建立者", key: "name", sortDesc: null },
  { name: "年齡", key: "age", sortDesc: null },
];

export default {
  name: "UserListHIS",
  components: {
    Regsiter,
    Pay,
    InqueryList,
  },
  inject: ["actions"],
  data() {
    return {
      takeCard: true,
      input1: "J120092876",
      value: "",
      autoCompe$: new Subject(),
      item: {},
      genders: [],
      personCates: [],
    };
  },
  methods: {
    async checkExistPerson() {
      const his = opdAddPerson$.getValue();
      opdAddPerson$.next("");
      if (!his) return;
      const qs = "personId=" + his.personId;
      this.item = await this.actions.getOpdPatient(qs)[0];
    },
    async getDLL() {
      this.genders = await this.actions.getOpdGender();
      this.personCates = await this.actions.getPersonCates();
    },
    selectedPersonItem(item) {
      const key = Object.keys(item)[0];
      this.item = item[key];
      console.log(JSON.stringify(item, null, 2));
    },
    async getAutoCompeItems({ item, event }) {
      if (event?.query?.length) {
        const qs = `${item}=` + event.query;
        const ret = await this.actions.getOpdPatient(qs);
        this.item[`${item}s`] = ret;
      } else {
        this.item[`${item}s`] = [];
      }
      return "";
    },
    searchItems(item, event) {
      this.autoCompe$.next({ item, event });
    },
  },
  beforeUnmount() {
    this.autoCompe$.unsubscribe();
  },

  mounted() {
    this.getDLL();
    this.autoCompe$
      .pipe(
        switchMap(this.getAutoCompeItems),
        catchError((s) => of(""))
      )
      .subscribe();
    // this.checkExistPerson();
  },
  setup() {
    const router = useRouter();
    const { state, getList, delItem } = useList("/opd/opdDepartment");
    const actions = inject("actions");
    headers = ref(headers);
    const info = reactive({ name: "", id: "", birthday: "" });

    function handleEdit({ row }) {
      router.push({
        name: "userEdit",
        params: { id: row.id },
      });
    }

    // 刪除玩家
    function handleDelete({ row }) {
      delItem(row.id).then(() => {
        // todo:刪除這一行，或者重新獲取數據
        // 通知用戶
        Message.success("刪除成功！");
      });
    }

    //讀取健保卡
    async function readHealthCard() {
      const data = await actions.getIcCardInfo();
      let patientInfo = data.message.split(" ");
      patientInfo = patientitem.filter((s) => Boolean(s));

      item.name = patientInfo[0].replace(/\d/g, "");
      item.id = patientInfo[1].slice(0, 9);
      item.birthday = patientInfo[1].slice(10, -1);
    }

    return {
      ...toRefs(state),
      getList,
      handleEdit,
      handleDelete,
      headers,
      readHealthCard,
      info,
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
.dtc-autoflow-grid {
  grid-template-columns: repeat(auto-fill, minmax(200px, 220px));
  grid-template-rows: 40px;
  gap: 8px;
}
.dtc-page-header__grid {
  grid-template-columns: max-content max-content max-content max-content 1fr repeat(4, max-content);
  gap: 1rem;
}
</style>
