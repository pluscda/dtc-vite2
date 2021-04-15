import { reactive, onMounted, ref } from "vue";
import axios from "utils/request";
import queryString from "qs";
import { forkJoin, of } from 'rxjs';
import { catchError } from "rxjs/operators";
import { ElMessage } from "element-plus";

export function useList(url) {
  const state = reactive({
    loading: true, 
    list: [], 
    total: 0,
    listQuery: {
      page: 1,
      limit: 10,
      sort:[],
      filter:''
    },
  });

  function getList() {
    if(!url) return;
    state.loading = true;
    const {limit, page, sort} =  state.listQuery;
    let queryObj = {
      _limit : limit,
      _start: page > 1 ? page * limit : 0,
    }
    sort.length ? queryObj._sort = sort.join(",") : '';
    let qs = queryString.stringify(queryObj);
    //todo: if any filter , please added below
    forkJoin(
      {
        total: axios.get(`${url}/count?` + qs ),
        data: axios.get(`${url}?` + qs)
      }
    ).pipe( catchError( error => {
      ElMessage.error({ message: "AJAX ${url} get list fail!!", type: "error" });
      of({total:0, data:[]})
    })).subscribe( ({total, data}) => {
       state.total = total;
       state.list = data;
       state.loading = false;
    })
  }
  function sort(headers,item) {
      if (item.sortDesc) {
        item.sortDesc = null;
      } else if (false === item.sortDesc) {
        item.sortDesc = true;
      } else if (null === item.sortDesc) {
        item.sortDesc = false;
      }
      const orderBy = [];
      headers.forEach((s) => {
        if (s.sortDesc !== null) {
          //ref: https://strapi.io/documentation/developer-docs/latest/developer-resources/content-api/content-api.html#sort
          orderBy.push(s.sortDesc ? `${s.key}:desc` : `${s.key}:asc`);
        }
      });
      state.listQuery.sort = orderBy;
      getList();
  }
  // 首次獲取數據
  getList();

  return { state, getList, sort};
}

const defaultData = {
  name: "",
  age: undefined,
};

export function useItem(isEdit, id) {
  const model = ref(Object.assign({}, defaultData));

  const updateUser = () => {
    return axios({
      url: "/updateUser",
      method: "post",
      data: model.value,
    });
  };

  const addUser = () => {
    return axios({
      url: "/addUser",
      method: "post",
      data: model.value,
    });
  };

  return { model, updateUser, addUser };
}
