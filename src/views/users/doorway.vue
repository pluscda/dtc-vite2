<template>
  <div class="bg-skin-color">abc</div>
</template>

<script>
let headers = [
  { name: "ID", key: "id", sortDesc: null },
  { name: "建立者", key: "name", sortDesc: null },
  { name: "年齡", key: "age", sortDesc: null },
];

export default {
  name: "UserListHISddsww",
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
    const { state, getList, delItem } = useList();
    const actions = inject("actions");
    headers = ref(headers);
    const personBasicInfo = reactive({ name: "", id: "", birthday: "" });

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
      patientInfo = patientInfo.filter((s) => Boolean(s));

      personBasicInfo.name = patientInfo[0].replace(/\d/g, "");
      personBasicInfo.id = patientInfo[1].slice(0, 9);
      personBasicInfo.birthday = patientInfo[1].slice(10, -1);
    }

    return {
      ...toRefs(state),
      getList,
      handleEdit,
      handleDelete,
      headers,
      readHealthCard,
      personBasicInfo,
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
