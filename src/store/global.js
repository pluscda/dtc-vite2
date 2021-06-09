import { reactive } from "vue";
import axios from "utils/request";
import { logout$ } from "/@/store";
import checkNhiCard from "utils/websock.js";
import {firstValueFrom,defer,ReplaySubject} from "rxjs"
import { share } from "rxjs/operators";
import dayjs from "dayjs";

const delyAjax = (url) => defer( _ => axios.get(url)).pipe( share({connector: () => new ReplaySubject(1)}) );
//DTC API DOC : https://drive.google.com/drive/folders/1LcbHvvxXy9AuJ6RiZ3rEqMVATtMWf-gy
//用藥單位
const unit$ = delyAjax("/med/unitCode");
//藥品類別
const cates$ = delyAjax("/med/categoryCode");
// 用藥頻率
const feqCodes$ = delyAjax("/med/frequencyCode");
//給藥途徑
const routeCodes$ = delyAjax("/med/routeCode");
//藥品劑型
const dogses$ = delyAjax("/med/dosageFormCode");
//藥品分類
const parhCodes$ = delyAjax("/med/pharmacologyCode");
//管制用藥
const controlls$ = delyAjax("/med/controlledCode");
//抗生素藥物
const antiCodes$ = delyAjax("/med/antibioticsCode");
//make at
const contries$ =  delyAjax("/med/ISO3166_1_countryCode");
//藥房清單
const drgStoreList$ =  delyAjax("/med/pharmacyStoreList");

const ddlObs = [unit$, cates$,feqCodes$,routeCodes$,dogses$,parhCodes$,controlls$,antiCodes$,contries$,drgStoreList$];

const answers = [ {value:1, label:'是'},{value:0, label:'否'},]
const formulas = [{value:'單方', label:'單方'},{value:'複方', label:'複方'}]
const closes = [{value:null, label:'全部'},{value:1, label:'已結案'},{value:0, label:'未結案'}]
const init = {
  editItem: "",
  answers,
  formulas,
  closes,
  zeros:'T00:00:00.000Z'
};

export let global = reactive({ ...init });
export const actions = {
  getRandomId(){
   return dayjs().format("HHmmssYYYYMMDD");
  },
  async getIcCardInfo() {
    //return await checkNhiCard("ws://localhost:8888/Chat", "checkNhiCard");
  },
  getAllDDL(){
    ddlObs.forEach(s => firstValueFrom(s))
  },
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
     return await axios.post("/med/medOrderItems", obj);
  },
  async editDrgOrderItem(obj){ //9
    return await axios.put("/med/medOrderItems", obj);
  },
  //新增藥房藥品申領單
  async addPharmacyOrder(obj){ //10
    return await axios.post("/med/pharmacyOrderItems", obj);
  },
  async editPharmacyOrder(obj){ //11
     return await axios.put("/med/pharmacyOrderItems", obj);
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
     return await axios.post("/med/pharmacyOrderItems?orderType=-1", obj);
  },
  async editPharmacyRejectOrderDetails(obj){ //15
     return await axios.put("/med/pharmacyOrderItems?orderType=-1", obj);
  },
  //新增藥房
  async addPharmacyStore(obj){ //16
     return await axios.post("/med/pharmacyStore", obj);
  },
  async editPharmacyStore(obj){ //17
     return await axios.post("/med/pharmacyStore", obj);
  },
  async deletePharmacyStore(id){ //18
     return await axios.delete("/med/pharmacyStore?pharmacyId=" +id);
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
  async editDrgStock2(obj){ //33-1
     return await axios.put("/med/pharmacyStock", obj);
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
  async getDrgStoreList(){
    return firstValueFrom(drgStoreList$);
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
  async getTop20MedIds(id, table = 'UsualMed'){
    return await axios.get(`/med/querySeq?table=${table}&limit=20&startWith=1&seqId=${id}`);
  },
  async getTop20DrgName(name){
    const t1 =  axios.get(`/med/searchUsualMed?limit=10&returnLimit=10&startWith=1&name=${name}`);
    const t2 =  axios.get(`/med/searchUsualMed?limit=10&returnLimit=10&startWith=0&name=${name}`);
    const [r1, r2] = await Promise.all([t1, t2]);
    const total = r1?.length ? r1.concat(r2) : r2;
    total?.forEach( s => {
      s.display = `${s.cname}(${s.ename})`;
    })
    return total?.slice(0,20) || [];
  },
   async getTop20Items(name){
    const t1 =  axios.get(`/med/searchNhiMed?limit=10&returnLimit=10&startWith=1&name=${name}`);
    const t2 =  axios.get(`/med/searchNhiMed?limit=10&returnLimit=10&startWith=0&name=${name}`);
    const [r1, r2] = await Promise.all([t1, t2]);
    const total = r1?.length ? r1.concat(r2) : r2;
    total?.forEach( s => {
      s.display = `${s.cname}(${s.ename})`;
    })
    return total?.slice(0,20) || [];
  },
  async getDrgDetail(id){
     const {entry} = await axios.get(`/med/usualMed?medicineId=` + id);
     return entry && entry.length  ? entry[0] : "";
  },
  async updateDrgInventoryItem(item){
    return await axios.put("/med/medInventoryItems", item)
  },
  async getOptDepartmentByDate(date){
    //const str = "limit=20&returnLimit=20&pageStart=0&opdDate=" + date;
    const str ="limit=20&pageStart=0";
    return await axios.get("/opd/opdDepartment?" + str);
  }

};

export const mutations = {
  logout() {
    sessionStorage.token = "";
    global = reactive({ ...init });
  },
};

logout$.subscribe(mutations.logout);
