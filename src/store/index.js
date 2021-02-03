import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import shoppingCart from "./modules/shoppingCart";
import afterSales from "./modules/afterSales";
import user from "./modules/user";
import app from "./modules/app";
import loading from "./modules/loading";
import auth from "@/utils/auth";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    havefoot: auth.footerstatus,
    shopList: [],
    defaultAddress: {},
    cartList: [],
    cartnum: 0,
    isShow: false,
    includePages: app.includePages,
    dataListHeight: app.dataListHeight,
  },
  mutations: {
    changefoot(state, status) {
      state.havefoot = status;
      window.localStorage.setItem("HaveFooter", status);
    },
    loading(state, status) {
      state.isShow = status;
    },
    cartNum(state, step) {
      state.cartnum = step;
    },
  },
  actions: {},
  getters,
  modules: {
    shoppingCart,
    afterSales,
    user,
    app,
    loading,
  },
});
