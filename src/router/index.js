import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "layouts/index.vue";
import LayoutWithSideBar from "layouts/indexWithSidebar.vue";
/**
 * Note: 子菜單僅當路由的children.length >= 1時才出現
 *
 * hidden: true                   設置為true時路由將顯示在sidebar中(默認false)
 * alwaysShow: true               如果設置為true則總是顯示在菜單根目錄
 *                                如果不設置alwaysShow, 當路由有超過一個子路由時,
 *                                將會變為嵌套模式, 否則不會顯示根菜單
 * redirect: noRedirect           如果設置noRedirect時，breadcrumb中點擊將不會跳轉
 * name:'router-name'             name用於<keep-alive> (必須設置!!!)
 * meta : {
    roles: ['admin','editor']    頁面可訪問角色設置 
    title: 'title'               sidebar和breadcrumb顯示的標題 
    icon: 'svg-name'/'el-icon-x' sidebar中顯示的圖標
    breadcrumb: false            設置為false，將不會出現在麵包屑中
    activeMenu: '/example/list'  如果設置一個path, sidebar將會在高亮匹配項
  }
 */
export const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("/@/views/DtcLogin.vue"),
  },
  {
    path: "/dtcregister",
    name: "dtcregister",
    component: () => import("/@/views/DtcRegister.vue"),
  },
  {
    path: "/resetpwd",
    name: "resetpwd",
    component: () => import("/@/views/DtcResetPwd.vue"),
  },
  {
    path: "/resetpwdex",
    name: "resetpwdex",
    component: () => import("/@/views/DtcResetPwdEx.vue"),
  },
  {
    path: "/",
    redirect: "/home",
    component: Layout,
    meta: { title: "導航", icon: "el-icon-s-home" },
    children: [
      {
        path: "home",
        component: () => import("views/home.vue"),
        name: "Home",
        meta: { title: "首頁", icon: "el-icon-s-home" },
        children: [
          {
            path: ":id",
            component: () => import("views/detail.vue"),
            name: "Detail",
            hidden: true,
            meta: {
              title: "詳情",
              icon: "el-icon-s-home",
              activeMenu: "/home",
            },
          },
        ],
      },
    ],
  },
  {
    path: "/register",
    redirect: "/register/list",
    component: Layout,
    meta: { title: "掛號總覽清單", icon: "el-icon-s-home" },
    children: [
      {
        path: "list",
        component: () => import("/@/views/register/registerList.vue"),
        name: "regsiterlist",
        meta: { title: "清單", icon: "el-icon-s-home" },
      },
    ],
  },
  {
    path: "/diagnosis",
    redirect: "/diagnosis/diseasecodemanagement",
    component: Layout,
    meta: { title: "診斷", icon: "el-icon-s-home" },
    children: [
      {
        path: "diseasecodemanagement",
        component: () => import("/@/views/diagnosis/diseaseCodeManagement.vue"),
        name: "diseasecodemanagement",
        meta: { title: "疾病代碼管理", icon: "el-icon-s-home" },
      },
    ],
  },
  {
    path: "/pharmacy",
    redirect: "/pharmacy/drugmanagement",
    component: LayoutWithSideBar,
    meta: { title: "基本資料設定", icon: "el-icon-s-home" },
    children: [
      {
        path: "drugmanagement",
        component: () => import("/@/views/pharmacy/drugmanagement.vue"),
        name: "drugmanagement",
        meta: { title: "藥品資料維護", icon: "el-icon-s-home" },
      },
      {
        path: "drugadd",
        component: () => import("/@/views/pharmacy/drugAddNew.vue"),
        name: "drugadd",
        meta: { title: "新增藥品資料", icon: "el-icon-s-home" },
      },
      {
        path: "drugaddmaker",
        component: () => import("/@/views/pharmacy/drugAddMaker.vue"),
        name: "drugaddmaker",
        meta: { title: "新增藥品廠商", icon: "el-icon-s-home" },
      },
      {
        path: "drugaddstore",
        component: () => import("/@/views/pharmacy/drugAddStore.vue"),
        name: "drugaddstore",
        meta: { title: "新增藥房資料", icon: "el-icon-s-home" },
      },
      {
        path: "drgWarehouseOut",
        component: () => import("/@/views/pharmacy/drgWarehouseOut.vue"),
        name: "drgWarehouseOut",
        meta: { title: "drgWarehouseOut", icon: "el-icon-s-home" },
      },
      {
        path: "modifydrug",
        component: () => import("/@/views/pharmacy/modifyDrug.vue"),
        name: "modifyDrag",
        meta: { title: "編輯藥品資料", icon: "el-icon-s-home" },
      },
      {
        path: "modifyDrgWatermark",
        component: () => import("/@/views/pharmacy/modifyDrgWatermark.vue"),
        name: "modifyDrgWatermark",
        meta: { title: "modifyDrgWatermark", icon: "el-icon-s-home" },
      },
      {
        path: "modifyDrgWarehousePOrder",
        component: () =>
          import("/@/views/pharmacy/modifyDrgWarehousePOrder.vue"),
        name: "modifyDrgWarehousePOrder",
        meta: {
          title: "編輯藥品資料modifyDrgWarehousePOrder",
          icon: "el-icon-s-home",
        },
      },
      {
        path: "modifyDrgWarehousePRequest",
        component: () =>
          import("/@/views/pharmacy/modifyDrgWarehousePRequest.vue"),
        name: "modifyDrgWarehousePRequest",
        meta: {
          title: "編輯藥品資料modifyDrgWarehousePRequest",
          icon: "el-icon-s-home",
        },
      },
      {
        path: "modifydrgstore",
        component: () => import("/@/views/pharmacy/modifyDrgStore.vue"),
        name: "modifyDragstore",
        meta: { title: "編輯藥品資料2", icon: "el-icon-s-home" },
      },
      {
        path: "dtcmodifydrgwarehouse",
        component: () => import("/@/views/pharmacy/modifyDrgWarehouse.vue"),
        name: "dtcmodifydrgwarehouse",
        meta: { title: "dtcmodifydrgwarehouse", icon: "el-icon-s-home" },
      },
      {
        path: "dtcmodifydrgwarehouseinventory",
        component: () =>
          import("/@/views/pharmacy/modifyDrgWarehouseInventory.vue"),
        name: "dtcmodifydrgwarehouseinventory",
        meta: {
          title: "dtcmodifydrgwarehouseinventory",
          icon: "el-icon-s-home",
        },
      },
      {
        path: "dtcmodifydrgstoreclaim",
        component: () => import("/@/views/pharmacy/modifyDrgStoreClaim.vue"),
        name: "dtcmodifydrgstoreclaim",
        meta: {
          title: "dtcmodifydrgstoreclaim",
          icon: "el-icon-s-home",
        },
      },
      {
        path: "modifydrgmaker",
        component: () => import("/@/views/pharmacy/modifyDrgMaker.vue"),
        name: "modifyDragMaker",
        meta: { title: "編輯藥品Maker資料", icon: "el-icon-s-home" },
      },
      {
        path: "modifydrgstorewatermark",
        component: () =>
          import("/@/views/pharmacy/modifyDrgStoreWatermark.vue"),
        name: "modifydrgstorewatermark",
        meta: { title: "modifydrgstorewatermark", icon: "el-icon-s-home" },
      },
      {
        path: "drugvendormanagement",
        component: () => import("/@/views/pharmacy/drugVendorManagement.vue"),
        name: "drugvendormanagement",
        meta: { title: "藥品廠商維護", icon: "el-icon-s-home" },
      },
      {
        path: "drugstoremanagement",
        component: () => import("/@/views/pharmacy/drugStoreManagement.vue"),
        name: "drugstoremanagement",
        meta: { title: "藥房資料維護", icon: "el-icon-s-home" },
      },
      {
        path: "drugwarehouseinquire",
        component: () => import("/@/views/pharmacy/drugWarehouseInquire.vue"),
        name: "drugwarehouseinquire",
        meta: { title: "庫存查詢作業", icon: "el-icon-s-home" },
      },
      {
        path: "drugwarehouseporder",
        component: () => import("/@/views/pharmacy/drugWarehousePOrder.vue"),
        name: "drugwarehouseporder",
        meta: { title: "採購單管理", icon: "el-icon-s-home" },
      },
      {
        path: "drugwarehouseporderadd",
        component: () => import("/@/views/pharmacy/drugWarehousePOrderAdd.vue"),
        name: "drugwarehouseporderadd",
        meta: { title: "新增採購單", icon: "el-icon-s-home" },
      },
      {
        path: "drugWarehouserejectadd",
        component: () => import("/@/views/pharmacy/drugWarehouseRejectAdd.vue"),
        name: "drugWarehouserejectadd",
        meta: { title: "drugWarehouserejectadd", icon: "el-icon-s-home" },
      },
      //drugWarehouseRejectAdd
      {
        path: "drugwarehousing",
        component: () => import("/@/views/pharmacy/drugWarehousing.vue"),
        name: "drugwarehousing",
        meta: { title: "入庫單管理", icon: "el-icon-s-home" },
      },
      {
        path: "drugwarehouseinventory",
        component: () => import("/@/views/pharmacy/drugWarehouseInventory.vue"),
        name: "drugwarehouseinventory",
        meta: { title: "藥庫盤點管理", icon: "el-icon-s-home" },
      },
      {
        path: "drugwarehouserequest",
        component: () => import("/@/views/pharmacy/drugWarehouseRequest.vue"),
        name: "drugwarehouserequest",
        meta: { title: "藥品申領管理", icon: "el-icon-s-home" },
      },
      {
        path: "drugwarehouserequestadd",
        component: () =>
          import("/@/views/pharmacy/drugWarehouseRequestAdd.vue"),
        name: "drugwarehouserequestadd",
        meta: { title: "新增申請單", icon: "el-icon-s-home" },
      },
      {
        path: "drugwarehousewithdrawal",
        component: () =>
          import("/@/views/pharmacy/drugWarehouseWithdrawal.vue"),
        name: "drugwarehousewithdrawal",
        meta: { title: "藥房退庫管理", icon: "el-icon-s-home" },
      },
      {
        path: "drugstoreinstock",
        component: () => import("/@/views/pharmacy/drugStoreInStock.vue"),
        name: "drugstoreinstock",
        meta: { title: "藥房庫存查詢作業", icon: "el-icon-s-home" },
      },
      {
        path: "drugstoreclaim",
        component: () => import("/@/views/pharmacy/drugStoreClaim.vue"),
        name: "drugstoreclaim",
        meta: { title: "藥品申領單維護", icon: "el-icon-s-home" },
      },
      {
        path: "drugstoreclaimadd",
        component: () => import("/@/views/pharmacy/drugStoreClaimAdd.vue"),
        name: "drugstoreclaimadd",
        meta: { title: "新增藥品申領單", icon: "el-icon-s-home" },
      },
      {
        path: "drugstorewithdrawal",
        component: () => import("/@/views/pharmacy/drugStoreWithdrawal.vue"),
        name: "drugstorewithdrawal",
        meta: { title: "藥房退庫單維護", icon: "el-icon-s-home" },
      },
    ],
  },

  {
    path: "/users",
    component: Layout,
    meta: {
      title: "用戶管理",
      icon: "el-icon-user-solid",
    },
    redirect: "/users/list",
    children: [
      {
        path: "list",
        component: () => import("/@/views/users/list.vue"),
        meta: {
          title: "用戶列表",
          icon: "el-icon-document",
        },
      },
      {
        path: "create",
        component: () => import("/@/views/users/create.vue"),
        hidden: true,
        meta: {
          title: "創建新用戶",
          activeMenu: "/users/list",
        },
      },
      {
        path: "edit/:id(\\d+)",
        name: "userEdit",
        component: () => import("/@/views/users/edit.vue"),
        hidden: true,
        meta: {
          title: "編輯用戶信息",
          activeMenu: "/users/list",
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
