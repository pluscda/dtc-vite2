import { reactive } from "vue";
import axios from "utils/request";
import { logout$ } from "/@/store";
import websocketService from "utils/websock.js";
import {from,firstValueFrom} from "rxjs"
import {shareReplay}  from "rxjs/operators";
//用藥單位
const unit$ = from(axios.get("/med/unitCode")).pipe(shareReplay(1));
//藥品類別
const cates$ = from(axios.get("/med/categoryCode")).pipe(shareReplay(1));
// 用藥頻率
const feqCodes$ = from(axios.get("/med/frequencyCode")).pipe(shareReplay(1));
//給藥途徑
const routeCodes$ = from(axios.get("/med/routeCode")).pipe(shareReplay(1));
//藥品劑型
const dogses$ = from(axios.get("/med/dosageFormCode")).pipe(shareReplay(1));
//藥品分類
const parhCodes$ = from(axios.get("/med/pharmacologyCode")).pipe(shareReplay(1));
//管制用藥
const controlls$ = from(axios.get("/med/controlledCode")).pipe(shareReplay(1));
//抗生素藥物
const antiCodes$ = from(axios.get("/med/antibioticsCode")).pipe(shareReplay(1));
//make at
const contries$ = from(axios.get("/med/ISO3166_1_countryCode")).pipe(shareReplay(1));

const answers = [ {value:1, label:'是'},{value:0, label:'否'},]

const init = {
  userDefaultBgColor: "dark",
  editItem: "",
  showICD9Item: false,
  dataICD9Index: 0,
  answers,
};

export let global = reactive({ ...init });
export const actions = {
   //新增藥品資料
  async addDrg(obj){ //2
    return await axios.post("/med/usualMed", obj);
  },
  async editDrg(obj){//3
    return await axios.put("/med/usualMed", obj);
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
     return firstValueFrom(cates$);
  },
  async getUnitCode(){//43
      return firstValueFrom(unit$);
  },
  async getfrequencyCode(){//44
     return firstValueFrom(feqCodes$);
  },
  async getRouteCode(){//45
     return firstValueFrom(routeCodes$);
  },
  async getControlledCode(){//46
     return firstValueFrom(controlls$);
  },
  async getAntibioticsCode(){//47
     return firstValueFrom(antiCodes$);
  },
  async getDosageFormCode(){//48
     return firstValueFrom(dogses$);
  },
  async getISO3166Code(){//49
     return firstValueFrom(contries$);
  },
  async getPharmacologyCode(){//50
     return firstValueFrom(parhCodes$);
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

};

export const mutations = {
  logout() {
    sessionStorage.token = "";
    global = reactive({ ...init });
  },
};

logout$.subscribe(mutations.logout);
