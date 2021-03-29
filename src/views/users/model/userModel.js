import { reactive, onMounted, ref } from "vue";
import request from "utils/request";

export function useList() {
  // 列表數據
  const state = reactive({
    loading: true, // 加載狀態
    list: [], // 列表數據
    total: 0,
    listQuery: {
      page: 1,
      limit: 10,
    },
  });

  // 獲取列表
  function getList() {
    state.loading = true;

    return request({
      url: "/getUsers",
      method: "get",
      params: state.listQuery,
    })
      .then(({ data, total }) => {
        // 設置列表數據
        state.list = data;
        state.total = total;
      })
      .finally(() => {
        state.loading = false;
      });
  }

  // 刪除項
  function delItem(id) {
    state.loading = true;

    return request({
      url: "/deleteUser",
      method: "get",
      params: { id },
    }).finally(() => {
      state.loading = false;
    });
  }

  // 首次獲取數據
  getList();

  return { state, getList, delItem };
}

const defaultData = {
  name: "",
  age: undefined,
};

export function useItem(isEdit, id) {
  const model = ref(Object.assign({}, defaultData));

  // 初始化時，根據isEdit判定是否需要獲取玩家詳情
  onMounted(() => {
    if (isEdit && id) {
      // 獲取玩家詳情
      request({
        url: "/getUser",
        method: "get",
        params: { id },
      }).then(({ data }) => {
        model.value = data;
      });
    }
  });

  const updateUser = () => {
    return request({
      url: "/updateUser",
      method: "post",
      data: model.value,
    });
  };

  const addUser = () => {
    return request({
      url: "/addUser",
      method: "post",
      data: model.value,
    });
  };

  return { model, updateUser, addUser };
}
