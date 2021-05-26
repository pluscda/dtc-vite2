import { reactive } from "vue";
import axios from "utils/request";
import websocketService from "utils/websock.js";
import { logout$ } from "/@/store";

const init = {
  userDefaultBgColor: "dark",
  editItem: "",
  showICD9Item: false,
  dataICD9Index: 0,
};

export let global = reactive({ ...init });
export const actions = {
  async login(obj) {
    // ref:https://strapi.io/documentation/developer-docs/latest/development/plugins/users-permissions.html
    //The identifier param can either be an email or a username
    const { identifier, password } = obj;
    try {
      return await axios.post("auth/local", { identifier, password });
    } catch (e) {
      return e;
    }
  },
  async resetPwd(obj) {
    //https://strapi.io/documentation/developer-docs/latest/development/plugins/users-permissions.html#forgotten-reset-password
    try {
      const ret = await axios.post("auth/forgot-password", obj);
      return ret;
    } catch (e) {
      return e;
    }
  },
  async resetPwdEx(obj) {
    //https://strapi.io/documentation/developer-docs/latest/development/plugins/users-permissions.html#forgotten-reset-password
    try {
      const ret = await axios.post("auth/reset-password", obj);
      return ret;
    } catch (e) {
      return e;
    }
  },
  async registerNewUser(obj) {
    // must have three of them, if no username. one can set username = email
    // if no email, can set: useranme@noreplay.com.tw
    const { username, email, password } = obj;
    try {
      return await axios.post("auth/local/register", obj);
    } catch (e) {
      return e;
    }
  },
  // 取得健保卡資訊
  async getIcCardInfo() {
    return await websocketService("ws://localhost:8888/Chat", "checkNhiCard");
  },
  async addDrug(obj) {
    // for route /pharmacy/drugadd
    return await axios.post("/drgadds", obj);
  },
  async editDrug(obj) {
    // for route /pharmacy/modifydrug
    return await axios.put(`/drgadds/${obj.id}`, obj);
  },
  async editImg(obj) {
    return await axios.post("/upload", obj);
  },
  async addItem(url, obj) {
    return await axios.post(url, obj);
  },
  async editItem(url, obj) {
    return await axios.put(url + "/" + obj.id, obj);
  },
  async deleteItem(url, obj) {
    return await axios.delete(url + "/" + obj.id, obj);
  },
};

actions.adam =  {
  //新增藥品資料
  async addDrg(obj){ //2
    return await post("/med/usualMed", obj);
  },
  async editDrg(obj){//3
    return await put("/med/usualMed", obj);
  },
  async deleteDrg(id){//4
    return await delete("/med/usualMed?medicineId=" + id);
  },
  //新增藥品採購單
  async addDrgOrder(obj){ //5
    return await axios.post("/med/medOrder", obj);
  },
  async editDrgOrder(obj){ //6
     return await axios.put("/med/medOrder", obj);
  },
  //新增藥品盤點單
  async addDrgInventory(obj){ //7
     return await axios.post("/med/medInventory", obj);
  },
  //新增藥品採購明細
  async addDrgOrderItem(obj){ //8
     return await axios.post("/med/medOrderItmes", obj);
  },
  async editDrgOrderItem(obj){ //9
    return await axios.put("/med/medOrderItmes", obj);
  },
  //新增藥房藥品申領單
  async addPharmacyOrder(obj){ //10
     return await axios.post("/med/pharmacyOrder", obj);
  },
  async editPharmacyOrder(obj){ //11
    return await axios.put("/med/pharmacyOrder", obj);
  },
  //新增藥房藥品退庫單
  async addPharmacyRejectOrder(obj){ //12
     return await axios.post("/med/pharmacyOrder", obj);
  },
  async editPharmacyRejectOrder(obj){ //13
     return await axios.put("/med/pharmacyOrder", obj);
  },
  //新增藥房申退明細
  async addPharmacyRejectOrderDetails(obj){ //14
     return await axios.post("/med/pharmacyOrderItems", obj);
  },
  async editPharmacyRejectOrderDetails(obj){ //15
     return await axios.put("/med/pharmacyOrderItems", obj);
  },
  //新增藥房
  async addPharmacyStore(obj){ //16
     return await axios.post("/med/pharmacyStore", obj);
  },
  async editPharmacyStore(obj){ //17
     return await axios.post("/med/pharmacyStore", obj);
  },
  async deletePharmacyStore(id){ //18
     return await axios.delete("/med/pharmacyStore?pharmacyId=");
  },
  async getPharmacyStoreDetail(qs){ //19
     return await axios.get("/med/pharmacyStore?" + qs);
  },
  //查詢總庫pharmacyId
  async getDrgMainStore(qs){ //20
     return await axios.get("/med/mainStoreId?" + qs);
  },
  //新增藥品廠商
  async addDrgVendor(obj){ //21
     return await axios.post("/med/medVendor", obj);
  },
  async editDrgVendor(obj){ //22
     return await axios.put("/med/medVendor", obj);
  },
  async deleteDrgVendor(id){ //23
     return await axios.delete("/med/medVendor?vendorId=", id);
  },
  // 24 ~ 29 UI did not use it
  //查詢 id in used or not
  async checkUUID(qs){ //30
     return await axios.get("/med/querySeq?" + qs);
  },
  async getNhiDrg(qs){ //31
     return await axios.get("/med/nhiMed?" + qs);
  },
  async getDrgInfo(qs){//32
     return await axios.get("/med/usualMed?" + qs);
  },
  //修改藥品庫存
  async editDrgStock(obj){ //33
     return await axios.put("/med/medStock", obj);
  },
  async getDrgStockWatermark(qs){//34
     return await axios.get("/med/medStock?" + qs);
  },
  async getDrgStoreWatermark(qs){//35
     return await axios.get("/med/storeLimit?" + qs);
  },
  async getDrgOrder(qs){//36
     return await axios.get("/med/medOrder?" + qs);
  },
  async getDrgPharmacyOrder(qs){//37
     return await axios.get("/med/pharmacyOrder?" + qs);
  },
  async getDrgPharmacyRejectOrder(qs){//38
     return await axios.get("/med/pharmacyOrder?" + qs);
  },
  async getDrgOrderItemDetail(qs){//39
     return await axios.get("/med/medOrderItems?" + qs);
  },
  async getDrgStoreItemDetail(qs){//40
     return await axios.get("/med/pharmacyOrderItems?" + qs);
  },
  async getDrgRejectItemDetail(qs){//41
     return await axios.get("/med/pharmacyOrderItems?" + qs);
  },
  async getDrgCategoryCode(){//42
     return await axios.get("/med/categoryCode");
  },
  async getUnitCode(){//43
     return await axios.get("/med/unitCode");
  },
  async getfrequencyCode(){//44
     return await axios.get("/med/frequencyCode");
  },
  async getRouteCode(){//45
     return await axios.get("/med/routeCode");
  },
  async getControlledCode(){//46
     return await axios.get("/med/controlledCode");
  },
  async getAntibioticsCode(){//47
     return await axios.get("/med/antibioticsCode");
  },
  async getDosageFormCode(){//48
     return await axios.get("/med/dosageFormCode");
  },
  async getISO3166Code(){//49
     return await axios.get("/med/ISO3166_1_countryCode");
  },
  async getPharmacologyCode(){//50
     return await axios.get("/med/pharmacologyCode");
  },
  async getPlaceCode(){//51
     return await axios.get("/med/placeCode");
  },
  async getChargeCode(){//52
     return await axios.get("/med/chargeCode");
  },
  async getOrderStatusCode(){//53
     return await axios.get("/med/orderStatusCode");
  },



}

export const mutations = {
  logout() {
    sessionStorage.token = "";
    global = reactive({ ...init });
  },
};

logout$.subscribe(mutations.logout);
