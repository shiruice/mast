/*
 * @Descripttion: 
 * @version: 
 * @Author: ShiRuiCe
 * @Date: 2020-09-04 15:00:28
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import auth from './utils/auth'
// import 'vant/lib/index.css';
import './style/adaptation.less'
import './directive/antiShake'
import loading from "@/components/Loading";

import {
  initTheme
} from "./theme";

import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  loading: require('@/assets/img/noSome.png'),//加载中图片，一定要有，不然会一直重复加载占位图
  error: require('@/assets/img/noSome.png')  //加载失败图片
});

let apps = ['DingTalk', 'WeChat'],
  userAgent = navigator.userAgent;
let isApp = apps.filter((app, index) => {
  if (userAgent.indexOf(app) !== -1) {
    return app;
  }
})
if (isApp[0] == null) {
  initTheme('defaultTheme');
} else {
  initTheme(isApp[0]);
}

//引入导航守卫
import './permission'
Vue.use(loading)
Vue.component('loading', loading)//初始化组件
// 设置全局属性auth
Vue.prototype.$auth = auth;

Vue.config.productionTip = false
Vue.prototype.bus = new Vue();

Vue.prototype.addObserve = function (key, fallback) {
  this.$bus.off(key);
  this.$bus.on(key, fallback);
}

import FastClick from 'fastclick'

FastClick.attach(document.body);

FastClick.prototype.onTouchEnd = function (event) {
  if (event.target.hasAttribute("type") && event.target.getAttribute("type") == "text") {
    event.preventDefault();
    return false;
  }
}
//网页title设置
router.beforeEach((to, from, next) => {
  if (to.meta.title) { //判断是否有标题
    document.title = to.meta.title
  } else if (to.query.name) {
    document.title = to.query.name;
  } else {
    document.title = '详情';
  }

  next() //执行进入路由，如果不写就不会进入目标页
});

new Vue({
  router,
  store,
  mounted() {
    window.addEventListener('scroll', this.justifyPos)
  },
  methods: {
    justifyPos() {
      if (this.timerId) { clearTimeout(this.timerId) }
      // this.timerId = setTimeout(() => {
      this.$route.meta.y = window.pageYOffset
      // }, 300)
    }
  },

  components: {
    loading
  },
  render: h => h(App)
}).$mount('#app')