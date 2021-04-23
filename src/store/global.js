import { reactive } from "vue";
import axios from "utils/request";
import websocketService from "utils/websock.js";
import { logout$ } from "/@/store";

const init = {
  userDefaultBgColor: "dark",
  editItem: '',
};

export let global = reactive({ ...init });
export const actions = {
  async login(obj) {
    // ref:https://strapi.io/documentation/developer-docs/latest/development/plugins/users-permissions.html
    //The identifier param can either be an email or a username
    const {identifier, password} = obj;
    try{
       return await axios.post('auth/local',  {identifier, password});
    }catch(e){
      return e;
    }
  },
  async resetPwd(obj){
    //https://strapi.io/documentation/developer-docs/latest/development/plugins/users-permissions.html#forgotten-reset-password
    try{
       const ret = await axios.post('auth/forgot-password', obj);
       return ret;
    }catch(e){
      return e;
    }
  },
  async resetPwdEx(obj){
    //https://strapi.io/documentation/developer-docs/latest/development/plugins/users-permissions.html#forgotten-reset-password
    try{
       const ret = await axios.post('auth/reset-password', obj);
       return ret;
    }catch(e){
      return e;
    }
  },
  async registerNewUser(obj){
    // must have three of them, if no username. one can set username = email
    // if no email, can set: useranme@noreplay.com.tw
    const {username,email, password } = obj;
    try{
       return await axios.post('auth/local/register', obj);
    }catch(e){
      return e;
    }

  },
  // 取得健保卡資訊
  async getIcCardInfo() {
    return await websocketService("ws://localhost:8888/Chat", "checkNhiCard");
  },
  async addBasicInfo(obj){ // for route users/edit/:id
     return await axios.post('/his-basics', obj);
  },
  async addDrug(obj){ // for route /pharmacy/drugadd
     return await axios.post('/drgadds', obj);
  },
  async editDrug(obj){ // for route /pharmacy/modifydrug
     return await axios.put(`/drgadds/${obj.id}`, obj);
  },
  async editImg(obj){ 
    //https://strapi.io/documentation/developer-docs/latest/development/plugins/upload.html#upload-files-related-to-an-entry
     return await axios.post('/upload', obj);
  },
  async addItem(url,obj){
    return await axios.post(url, obj);
  },
  async editItem(url,obj){
    return await axios.put(url + "/" + obj.id, obj);
  },
  async deleteItem(url,obj){
    return await axios.delete(url + "/" + obj.id, obj);
  },
};

export const mutations = {
   logout(){
     sessionStorage.token = "";
     global = reactive({ ...init });
   }
};

logout$.subscribe(mutations.logout);
