import { reactive } from "vue";
import axios from "utils/request";
import websocketService from "utils/websock.js";


const init = {
  userDefaultBgColor: "black",
  openAddDrugDialog: false,
};

export let global = reactive({ ...init });
export const actions = {
  async sayHi() {
    return await axios.get("http://www.google.com");
  },
  // 取得健保卡資訊
  async getIcCardInfo() {
    return await websocketService("ws://localhost:8888/Chat", "checkNhiCard");
  },
};

export const mutations = {};
