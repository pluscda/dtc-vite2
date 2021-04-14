import { reactive } from "vue";
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
    try{
       return await axios.post('auth/local',  {identifier, password});
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
