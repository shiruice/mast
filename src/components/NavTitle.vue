// 导航栏

<template>
  <div class="demo-nav">
    <div class="nav-msg widt">
      <van-icon name="arrow-left" size="20px" @touchstart.native="goBack" v-if="iconShow" />
    </div>
    <div class="demo-nav__title">{{navTit}}</div>
    <div class="nav-msg widt">
      <div class="nav-cont" v-if="btnShow" @touchstart.prevent="btnClick">
        <slot>保存</slot>
      </div>
    </div>
  </div>
</template>

<script>
import { icon } from "vant";

export default {
  name: "navTitle",
  components: {
    [icon.name]: icon
  },
  props: {
    iconShow: {
      type: Boolean,
      default: true
    },
    navTit: {
      type: String,
      default: "请输入标题"
    },
    btnShow: {
      type: Boolean,
      default: false
    },
    btnClick: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      path: ""
    };
  },
  watch: {
    $route(val, val2) {
      console.log(val, val2);
    }
  },
  methods: {
    goBack() {
      // if (this.$route.path == "/cart/confirmation") {
      //   this.$router.push({
      //     path: "/cart/shopList",
      //     name: "CartShopList"
      //   });
      // } else if (
      //   this.$route.path == "/cart/payOrder" ||
      //   this.$route.path == "/cart/deal/finish" ||
      //   this.$route.path == "/cart/deal/fail"
      // ) {
      //   this.$router.push({
      //     path: "/order",
      //     name: "Order"
      //   });
      // } else if (this.$route.path == "/order") {
      //   this.$router.push({
      //     path: "/user",
      //     name: "User"
      //   });
      // } else {
      //   this.$router.go(-1);
      // }
    }
  },
 
};
</script>

<style lang="less" scoped>
.demo-nav {
  width: 100%;
  height: 44px;
  -webkit-tap-highlight-color: transparent;
  color: #323233;
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica,
    Segoe UI, Arial, Roboto, "PingFang SC", "Hiragino Sans GB",
    "Microsoft Yahei", sans-serif;
  -webkit-font-smoothing: antialiased;
  position: relative;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: space-between;
  background-color: white;

  .demo-nav__title {
    font-size: 17px;
    font-weight: 400 !important;
    color: rgba(51, 51, 51, 1);
    text-align: center;
  }

  .nav-msg {
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500 !important;
    color: rgba(51, 51, 51, 1);
    margin: 0 15px;
  }

  .widt {
    width: 10px !important;
  }

  .nav-cont {
    width: 30.5px;
    height: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    white-space: nowrap;
    margin-right: 14.5px;
  }
}
</style>