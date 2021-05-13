//https://www.mdeditor.tw/pl/gc7t/zh-hk
import axios from "axios";
//'development' for dev, 'production' for build; staging is defined by DTC 
// process.env.NODE_ENV ==  import.meta.env.MODE
// if running in prodctuion, we can use import.meta.env.PROD  it is boolean
//ref: https://vitejs.dev/guide/env-and-mode.html

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 720 * 1000, // Timeout
});
// 發起請求之前的攔截器
service.interceptors.request.use(
  config => {
     const CancelToken = axios.CancelToken;
    // 如果有token 就攜帶tokon
    if(sessionStorage.token && sessionStorage.token.length > 9)
       config.headers.Authorization = "Bearer " + sessionStorage.token;
   
    return {...config, cancelToken: new CancelToken(() => {})} ;
  },
  error => Promise.reject(error)
);
// 響應攔截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (response.status !== 200) {
       const ret = response?.data ? response.data : '' + "error Ajax";
       return Promise.reject(ret);
    } else {
      return res;
    }
  },
  error => {
    return Promise.reject(error);
  }
);
export default service;