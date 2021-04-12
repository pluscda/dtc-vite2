import { reactive } from "vue";
import axios from "utils/request";

const websocketService = (wsurl, command) => {
  return new Promise((resolve, reject) => {
    const CONNECTION = new WebSocket(wsurl);
    if (!CONNECTION) {
      CONNECTION.close();
      reject({
        ErrorMessage: "An error occured",
      });
    }

    CONNECTION.onerror = function (e) {
      reject({
        ErrorMessage: "An error occured",
      });
    };

    // When the connection is open
    CONNECTION.onopen = function () {
      // console.log("State: " + CONNECTION.readyState);
      // console.log({ command });
      CONNECTION.send(command);
    };

    CONNECTION.onclose = function () {
      console.log("WEBSOCKET_CLOSE");
    };

    CONNECTION.onmessage = function (e) {
      //debugger
      if (e.data.indexOf("Error") >= 0) {
        reject({
          ErrorMessage: e.data,
        });
      } else {
        resolve({
          message: e.data,
        });
      }
      CONNECTION.close();
    };
  });
};

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
