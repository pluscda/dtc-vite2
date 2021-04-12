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
      sort:[]
    },
  });

  // 獲取列表
  function getList() {
    state.loading = true;
    const {limit, page, sort} =  state.listQuery;
    let queryObj = {
      _limit : limit,
      _start: page > 1 ? page * limit : 0,
    }
    sort.length ? queryObj._sort = sort.join(",") : '';

    return request({
      url: "his-histories",
      method: "get",
      params: queryObj,
    })
      .then( data => {
        // 設置列表數據
        state.list = data;
        state.total = 200;
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
