window.twDate = {
    firstDayOfWeek: 0,
    dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
    dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
    monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    monthNamesShort: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
    today: "今天",
    clear: "清空",
    dateFormat: "yy-mm-dd",
    weekHeader: "周",
};
 
export const drgSample = {
    "hisId": "chInsuNoB", //健保代碼
    "chDrgUnit": "unit",//用藥單位
    "chDrgContain": "chContain", //成分
    "chSymptom1": "", //適應症狀
    "chHospitalId": "",//院內碼
    "chDrgFrequency": "",//用藥頻率
    "intDrgStockMax": 0,
    "chDrgSymptom2": "",
    "chDrgCnName": "chDrgPriceName2",
    "rlDrgOriginalPrice": 0, //原核定價
    "intDrgStockMin": 0,
    "chDrgAntibiotics": "",
    "chDrgEnName": "chDrgPriceName",//藥品英文
    "rlDrgNewPrice": 0,//新核定價
    "chDrgCountryFrom": "",
    "chDrgAntibioticsLevel": "",
    "chDrgAlias": "",
    "rlDrgSelfPayPrice": 0,//自費價格
    "chDrgMakerName": "chDrgFactory",//藥商名稱
    "chDrgControlType": "",//管制用藥
    "chDrgDoseType": "chDrgDoseType2",//劑型
    "tiDrgEffectTime": "2021-04-26T09:04:34.271Z",
    "chDrgClassified": "",
    "chDrgForbidden": "",
    "chDrgType": "",
    "chDrgIssueId": "",
    "chDrgChargeBy": "",
    "chDrgGivenBy": "",
    "chDrgStandard": "",
    "chDrgAtcCode": "ATC_CODE",
    "chDrgSkinTest": "",
    "chDrgSteamBy": "",
    "chDrgWarningMsg": "",
    "chDrgTakePreStepMsg": "",
    "chDrgBadSideEffectMsg": "chDrgWarning",
    "chDrgKeepSafeMsg": "",
    "chDrgImgName": "",
}

export const getDDL = (key,objList) => {
    const arr = objList.map( s => s[key]);
    const mySet = new Set(arr);
    return [...mySet].filter(s => s).sort();
}