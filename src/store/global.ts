import axios from "utils/request";
import {reactive} from "vue";

const init = {
  count:999,
};

export let gstate = reactive({...init});
export const actions = {
  async sayHi() {
    return await axios.get('http://www.google.com');
  }

}

export const mutations = {
  
};