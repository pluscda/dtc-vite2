import { reactive } from "vue";
import axios from "utils/request";
import queryString from "qs";
import { forkJoin, of } from 'rxjs';
import { catchError } from "rxjs/operators";
import { ElMessage } from "element-plus";


export function useList(url,__limit__, extra) {
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
      limit : limit,
      pageStart: page > 1 ? (page - 1) * limit : 0,
    }
    if(state.listQuery.filter){
      queryObj.pageStart = 0;
      state.listQuery.page = 1;
    }
    sort.length ? queryObj.sort = sort.join(",") : '';
    const str =  queryString.stringify(queryObj);
    let qs = state.listQuery.filter? str + "&" + state.listQuery.filter : str ;
    if(extra){
      qs += extra;
    }
    forkJoin(
      {
        data: axios.get(`${url}?` + qs)
      }
    ).pipe( catchError( error => {
      //ElMessage.error(`AJAX ${url} get list fail!!`);
      of({data:{count:0, entry:[]}})
    })).subscribe( ({data}) => {
       const  {count, entry} = data;
       state.total = count;
       state.list = entry;
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
  async function removeItem(qs){
    try{
      await axios.delete(`${url}?` + qs);
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

