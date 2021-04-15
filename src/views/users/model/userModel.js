import { reactive, onMounted, ref } from "vue";
import axios from "utils/request";
import queryString from "qs";
import { forkJoin, of } from 'rxjs';
import { catchError } from "rxjs/operators";
import { ElMessage } from "element-plus";

const init =  { 
  loading: true, 
  list: [], 
  total: 0,
  listQuery: {
    page: 1,
    limit: 10,
    sort:[],
    filter:''
  }
};
export function useList(url) {
  const state = reactive({
         ...init
  });
  function getList() {
    if(!url) return;
    state.list = [];
    state.loading = true;
    const {limit, page, sort} =  state.listQuery;
    let queryObj = {
      _limit : limit,
      _start: page > 1 ? page * limit : 0,
    }
    sort.length ? queryObj._sort = sort.join(",") : '';
    let qs = queryString.stringify(queryObj) + "&" + state.listQuery.filter;
   
    forkJoin(
      {
        total: axios.get(`${url}/count?` + qs ),
        data: axios.get(`${url}?` + qs)
      }
    ).pipe( catchError( error => {
      ElMessage.error("AJAX ${url} get list fail!!");
      of({total:0, data:[]})
    })).subscribe( ({total, data}) => {
       state.total = total;
       state.list = data;
       state.loading = false;
    })
  }
  function clearFilters(){
    state.listQuery.filter = "";
    getList();
  }

  async function removeItem(item){
    try{
      await axios.delete(`${url}/${item.id}`);
      getList();
    }catch(e){
       ElMessage.error("AJAX ${url} delete item faill!!");
    }
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

  return { state, getList, sort, clearFilters,removeItem};
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
