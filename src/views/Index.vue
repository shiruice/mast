<template>
  <div class="index-wrap">
    <!-- <van-pull-refresh v-model="isLoading" success-text="刷新成功" :disabled="flag" @refresh="onRefresh"> -->
    <!-- <loading v-if="$store.state.isShow" :name="transitionName" /> -->

    <!-- <div v-else> -->
    <transition :name="transitionName">
      <keep-alive :include="$store.getters.includePages.toString()">
        <router-view></router-view>
      </keep-alive>
    </transition>

    <!-- </van-pull-refresh> -->
    <navfooter v-show="$store.state.havefoot"></navfooter>
  </div>
  <!-- </div> -->
</template>
<script>
import navfooter from "@/components/Footer";
import loading from "@/components/Loading";
import { PullRefresh } from "vant";
import router from "@/router";

export default {
  name: "Index",

  components: {
    [PullRefresh.name]: PullRefresh,
    navfooter,
    loading,
  },
  data() {
    return {
      isLoading: false,
      flag: false,
      list: [],
      transitionName: "",
      urlPuth: [{ name: "Home", path: "/" }],
      toPuthUrl: "",
      loading: false,
    };
  },
  created() {
    // this.Puth();
    // console.log(this.$store.state, "this.$store.state.isShow");
  },
  methods: {
    Puth() {
      localStorage.setItem("urlPath", JSON.stringify(this.urlPuth));
      console.log(this.urlPuth);
    },
    onRefresh() {
      this.$store.dispatch("getUserInfo", this.$auth.token).then((res) => {
        if (res.code == "000000") {
          this.isLoading = false;
        }
      });
    },
    add(val) {},
    del(val) {},
  },
  watch: {
    $route: function (to, from) {
      // this.$store.commit("loading", false);
      // console.log(to, from, "/***/**");
      var pathData = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem("urlPathClass"))));
      // console.log(pathData.indexOf(to.name), "pathData");
      var  indexPath = pathData.indexOf(to.name);
      if (
        (to.name == "Home"&&(from.name=='Home'||from.name=='LibraryGoods'||from.name=='Cart'||from.name=='User')) ||
        (to.name == "LibraryGoods"&&(from.name=='Home'||from.name=='LibraryGoods'||from.name=='Cart'||from.name=='User')) ||
        // (to.name == "Cart"&&(from.name=='Home'||from.name=='LibraryGoods'||from.name=='Cart'||from.name=='User')) ||
        (to.name == "User"&&(from.name=='Home'||from.name=='LibraryGoods'||from.name=='Cart'||from.name=='User'))
      ) {
        this.transitionName = "slide-center";
      } else {
        if (indexPath == -1) {
          pathData.push(to.name);
          localStorage.setItem("urlPathClass", JSON.stringify(pathData));
          this.$store.commit("ADD_INCLUDE_PAGE", to.name);
          this.transitionName = "slide-left";
        } else {
          pathData = pathData.slice(0, indexPath+1);
          localStorage.setItem("urlPathClass", JSON.stringify(pathData));
          this.$store.commit("DEL_INCLUDE_PAGE", from.name);
          from.meta.y = 0
          this.transitionName = "slide-right";
        }
      }

      // if (to.name == "ProductDetails") {
      //   this.add(to.name, "/*************");
      //   this.$store.commit("ADD_INCLUDE_PAGE", to.name);
      // } else if (to.meta.index != from.meta.index) {
      //   if (to.meta.index > from.meta.index) {
      //     // 设置动画名称
      //     this.add(to.name, "/*************");
      //     this.$store.commit("ADD_INCLUDE_PAGE", to.name);

      //     this.transitionName = "slide-left";
      //   } else {
      //     this.del(from.name);
      //     this.$store.commit("DEL_INCLUDE_PAGE", from.name);

      //     this.transitionName = "slide-right";
      //   }
      // } else {
      //   this.$store.commit("ADD_INCLUDE_PAGE", to.name);
      //   this.transitionName = "slide-center";
      // }

      // if (this.list.includes(to.path)) {
      //   this.flag = true;
      // } else {
      //   this.flag = false;
      // }
    },
  },
  
};
</script>

<style scope lang="less">
.index-wrap {
  width: 100%;
  height: 100%;
  background: #f8f8f8;
}
// .slide-center-enter-active,
// .slide-center-leave-active {
//   will-change: transform;
//   transition: all 0.1ms;
//   position: absolute;
// }
// .slide-right-enter-active,
// .slide-right-leave-active,
// .slide-left-enter-active,
// .slide-left-leave-active {
//   will-change: transform;
//   transition: all 300ms;
//   position: absolute;
// }
// .slide-right-enter {
//   opacity: 0;
//   transform: translate3d(-100%, 0, 0);
// }
// .slide-right-leave-active {
//   opacity: 0;
//   transform: translate3d(100%, 0, 0);
// }
// .slide-left-enter {
//   opacity: 0;
//   transform: translate3d(100%, 0, 0);
// }
// .slide-left-leave-active {
//   opacity: 0;
//   transform: translate3d(-100%, 0, 0);
// }
// .slide-center {
//   opacity: 0;
//   transform: translate3d(100%, 0, 0);
// }
.slide-left,
.slide-right {
  position: absolute;
  left: 0;
  right: 0;
}
.slide-left-enter-active,
.slide-right-enter-active {
  transition: all 0.2s ease;
}
.slide-left-leave-active,
.slide-right-leave-active {
  transition: all 0.1s cubic-bezier(2, 0.5, 0.8, 1);
}
.slide-left-enter,
.slide-left-leave-to {
  left: 0;
  right: 0;
  transform: translateX(100px);
  opacity: 0;
}
.slide-right-enter,
.slide-right-leave-to {
  left: 0;
  right: 0;
  transform: translateX(-100px);
  opacity: 0;
}
.slide-center-enter,
.slide-center-leave-to {
  left: 0;
  right: 0;
  transform: translateX(0px);
  opacity: 0;
}
</style>
