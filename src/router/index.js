import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "layouts/index.vue";

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
    path: "/pharmacy",
    redirect: "/pharmacy/drugmanagement",
    component: Layout,
    meta: { title: "藥品總覽清單", icon: "el-icon-s-home" },
    children: [
      {
        path: "drugmanagement",
        component: () => import("/@/views/pharmacy/drugmanagement.vue"),
        name: "drugmanagement",
        meta: { title: "清單", icon: "el-icon-s-home" },
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("/@/views/DtcLogin.vue"),
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
