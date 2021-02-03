/*
 * @Descripttion:
 * @version:
 * @Author: ShiRuiCe
 * @Date: 2020-10-26 15:59:37
 */
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import home from "./modules/home";
import user from "./modules/user";
import order from "./modules/order";
import cart from "./modules/cart";
import librarygoods from "./modules/librarygoods";
import bill from "./modules/bill";
import Invoice from "./modules/invoice";
import Approval from "./modules/approval";
import ReportForm from "./modules/reportform";
import notice from "./modules/notice";
import feedback from "./modules/feedback";
import afterSale from "./modules/afterSale";

const routes = [
  {
    path: "/",
    name: "Index",
    redirect: "/home",
    component: () => import("@/views/Index.vue"),
    children: [
      ...home,
      ...user,
      ...order,
      ...cart,
      ...librarygoods,
      ...bill,
      ...Invoice,
      ...Approval,
      ...ReportForm,
      ...notice,
      ...feedback,
      ...afterSale,
    ],
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录",
      index: 0,
    },
    component: () => import("@/views/Login/Login.vue"),
  },
  {
    path: "/privacypolicy",
    name: "PrivacyPolicy",
    meta: {
      title: "隐私政策",
      index: 9,
    },
    component: () => import("@/views/Login/PrivacyPolicy.vue"),
  },
  {
    path: "/serviceagreement",
    name: "ServiceAgreement",
    meta: {
      title: "服务协议",
      index: 9,
    },
    component: () => import("@/views/Login/ServiceAgreement.vue"),
  },
  {
    path: "*",
    name: "404",
    meta: {
      title: "404",
    },
    component: () => import("@/views/Error/Error.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
