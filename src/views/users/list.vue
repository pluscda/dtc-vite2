<template>
  <div>
    <header class="dtc-page-header grid dtc-page-header__grid pr-2">
      <div>病患基本資料 / 就醫身份</div>
      <div class="ml-4">
        <van-switch v-model="takeCard" size="small" class="ml-2 h-9 mt-3" />
        <span class="ml-2 inline-block transform -translate-y-0.5 text-base text-white-600" @click="takeCard = !takeCard">初診</span>
      </div>
      <div class="ml-2">
        <van-switch v-model="takeCard2" size="small" class="ml-2 h-9 mt-3" />
        <span class="ml-2 inline-block transform -translate-y-0.5 text-base text-white-600" @click="takeCard = !takeCard">複診</span>
      </div>
      <Button style="margin: 4px 0" class="p-button-rounded" @click="$router.replace('/users/edit/1')">編輯個人資料/初診單</Button>
      <div></div>
      <Button class="p-button-rounded" style="margin: 4px 0">補卡取號</Button>
      <Button class="p-button-rounded p-button-success" style="margin: 4px 0">讀取健保卡</Button>
      <Button class="p-button-rounded p-button-info" style="margin: 4px 0">清除/重整</Button>
      <Button class="p-button-rounded p-button-warning" style="margin: 4px 0">確認掛號</Button>
    </header>
    <div class="dtc-autoflow-grid ml-1 grid gap-1 mb-3">
      <DtxInputGroup prepend="身份證號">
        <el-input placeholder="搜尋身份證字號" v-model="input1" readonly class="bg-gray-300" />
      </DtxInputGroup>
      <DtxInputGroup prepend="病患姓名">
        <el-input placeholder="搜尋身份證字號" v-model="input1" readonly class="bg-gray-300" />
      </DtxInputGroup>
      <DtxInputGroup prepend="出生日期">
        <el-input placeholder="搜尋身份證字號" v-model="input1" readonly class="bg-gray-300" />
      </DtxInputGroup>
      <DtxInputGroup prepend="病歷號碼">
        <el-input placeholder="搜尋檢查狀態" v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="手機號碼">
        <el-input placeholder="搜尋檢查狀態" v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="病患性別">
        <el-select v-model="value" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>

      <DtxInputGroup prepend="就診身份">
        <el-select v-model="value" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="折扣身份">
        <el-select v-model="value" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="部分負擔">
        <el-select v-model="value" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="就醫類別">
        <el-select v-model="value" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="預防保健">
        <el-select v-model="value" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="健保卡序">
        <el-input placeholder="搜尋檢查狀態" v-model="input1" />
      </DtxInputGroup>
      <DtxInputGroup prepend="掛號取卡" class="h-10">
        <van-switch v-model="takeCard" size="small" class="ml-2 h-9 mt-3" />
        <span class="ml-2 mt-2 text-sm text-gray-600" @click="takeCard = !takeCard">掛號後取卡</span>
        <!-- <el-checkbox class="ml-2 h-9 mt-2" v-model="checked">掛號後取卡</el-checkbox> -->
      </DtxInputGroup>
    </div>
    <section class="space-x-1 mb-2 flex flex-col-reverse xl:flex xl:flex-row">
      <Regsiter class="xl:w-1/2"></Regsiter>
      <Pay class="mt-2 mb-2 xl:w-1/2 xl:mt-0 x:mb-0"></Pay>
    </section>
    <InqueryList></InqueryList>
  </div>
</template>

<script>
import { toRefs, ref } from "vue";
import { useRouter } from "vue-router";
import { Message } from "element3";
import Pagination from "cps/Pagination.vue";
import { useList } from "./model/userModel";
import Regsiter from "./components/register.vue";
import Pay from "./components/hisPay.vue";
import InqueryList from "./components/inqueryList.vue";
let headers = [
  { name: "ID", key: "id", sortDesc: null },
  { name: "建立者", key: "name", sortDesc: null },
  { name: "年齡", key: "age", sortDesc: null },
];

export default {
  name: "UserList2",
  components: {
    Regsiter,
    Pay,
    InqueryList,
  },
  data() {
    return {
      takeCard: true,
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
    };
  },
  setup() {
    const router = useRouter();
    headers = ref(headers);
    const { state, getList, delItem } = useList();

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

    return {
      ...toRefs(state),
      getList,
      handleEdit,
      handleDelete,
      headers,
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
  grid-template-columns: repeat(auto-fill, minmax(200px, 220px));
}
.dtc-page-header__grid {
  grid-template-columns: max-content max-content max-content max-content 1fr repeat(4, max-content);
  gap: 1rem;
}
</style>
