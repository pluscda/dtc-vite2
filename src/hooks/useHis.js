import { reactive, ref } from "vue";
import axios from "utils/request";
import queryString from "qs";
import { forkJoin, of } from 'rxjs';
import { catchError } from "rxjs/operators";
import { ElMessage } from "element-plus";


export function useList(url,__limit__) {
  const init =  { 
    loading: true, 
    list: [], 
    total: 0,
    listQuery: {
      page: 1,
      limit: __limit__ > 0 ? __limit__ : 10,
      sort:[],
      filter:''
    }
  };
  const state = reactive({
         ...init
  });
  function twTime(iso) {
      if(!iso) return "暫無資料";
      let s = dayjs(iso).format("YYYY-MM-DDT00:00:00.000Z");
      return s ? s : "";
  }
  function getList() {
    if(!url) return;
    state.list = [];
    state.loading = true;
    const {limit, page, sort} =  state.listQuery;
    let queryObj = {
      _limit : limit,
      _start: page > 1 ? (page - 1) * limit : 0,
    }
    sort.length ? queryObj._sort = sort.join(",") : '';
    let qs = queryString.stringify(queryObj) + "&" + state.listQuery.filter;
   
    forkJoin(
      {
        total: axios.get(`${url}/count?` + qs ),
        data: axios.get(`${url}?` + qs)
      }
    ).pipe( catchError( error => {
      //ElMessage.error(`AJAX ${url} get list fail!!`);
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
  async function getItemDetail(item){
    return item;
    // try{
    //   return await axios.get(`${url}/${item.id}`);
    // }catch(e){
    //    ElMessage.error(`AJAX ${url} get item detail faill!!`);
    // }
  }
  async function removeItem(item){
    try{
      await axios.delete(`${url}/${item.id}`);
      getList();
    }catch(e){
       ElMessage.error(`AJAX ${url} delete item faill!!`);
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
          orderBy.push(s.sortDesc ? `${s.key}:desc` : `${s.key}:asc`);
        }
      });
      state.listQuery.sort = orderBy;
      getList();
  }
  // 首次獲取數據
  getList();

  return { state, getList, sort, clearFilters,removeItem,getItemDetail,twTime};
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
