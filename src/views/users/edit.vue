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
      <div class="ml-6 -mt-1.5">
        <van-button type="success" icon="arrow-left" round size="small" @click="$router.replace('/users')">返回門急診掛號</van-button>
      </div>
      <div></div>
      <div class="-mt-1"><van-button type="success" round size="small">補卡取號</van-button></div>
      <div class="-mt-1"><van-button type="default" round size="small">讀取健保卡</van-button></div>
      <div class="-mt-1"><van-button type="warning" round size="small">清除/重整</van-button></div>
      <div class="-mt-1"><van-button type="primary" round size="small">確認掛號</van-button></div>
    </header>
    <nav class="grid nav__grid ml-1 rounded-lg bg-gray-500 cursor-pointer">
      <div class="bg-blue-500 text-white">初診單</div>
      <div class="bg-gray-500 text-white">基本資料</div>
      <div class="bg-gray-500 text-white">疾病史</div>
    </nav>
  </div>
</template>

<script>
import { toRefs, ref } from "vue";
import { useRouter } from "vue-router";
import { Message } from "element3";
import { useList } from "./model/userModel";
//初診單基本資料疾病史
let headers = [
  { name: "ID", key: "id", sortDesc: null },
  { name: "建立者", key: "name", sortDesc: null },
  { name: "年齡", key: "age", sortDesc: null },
];

export default {
  name: "editUser",
  components: {},
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
    // 玩家列表數據
    const router = useRouter();
    headers = ref(headers);
    const { state, getList, delItem } = useList();

    // 用戶更新
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

<style lang="scss" scoped>
.nav__grid {
  width: calc(120px * 3 + 2px);
  grid-template-columns: repeat(3, 120px);
  > div {
    border-right: 1px solid white;
    @apply rounded-lg;
  }
  > div:last-child {
    border: none;
  }
}
.dtc-template-columns {
  grid-template-columns: 180px repeat(2, 160px) 1fr;
}

.dtc-autoflow-grid {
  grid-template-columns: repeat(auto-fill, minmax(120px, 200px));
}
.dtc-page-header__grid {
  grid-template-columns: max-content max-content max-content max-content 1fr repeat(4, max-content);
  gap: 1rem;
}
</style>
