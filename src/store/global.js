import { reactive, registerRuntimeCompiler } from "vue";
import axios from "utils/request";
import websocketService from "utils/websock.js";


const init = {
  userDefaultBgColor: "dark",
  openAddDrugDialog: false,
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
       const obj = await axios.post('auth/forgot-password', obj);
       alert("please check your email for reseting the password");
       return obj;
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
};

export const mutations = {};
