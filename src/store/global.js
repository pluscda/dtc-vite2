import {reactive} from "vue";
import axios from "utils/request";

const init = {
   userDefaultBgColor: 'black'
};

export let global = reactive({...init});
export const actions = {
  async sayHi() {
    return await axios.get('http://www.google.com');
  }

}

export const mutations = {
  
};