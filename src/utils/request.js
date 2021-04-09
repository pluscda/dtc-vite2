//https://www.mdeditor.tw/pl/gc7t/zh-hk
import axios from "axios";
//'development' for dev, 'production' for build; staging is defined by DTC 
//alert(process.env.NODE_ENV) it is the same as:    import.meta.env.MODE
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 720 * 1000, // Timeout
});
// 發起請求之前的攔截器
service.interceptors.request.use(
  config => {
    // 如果有token 就攜帶tokon
    if(sessionStorage.token)
       config.headers.Authorization = "Bearer " + sessionStorage.token;
    return config;
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