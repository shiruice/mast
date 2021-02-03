<template>
  <div id="app" ref="indexWrap">
    <loading v-if="$store.state.isShow" />
    <!-- <transition :name="transitionName"> -->
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import Vue from 'vue'
import loading from "@/components/Loading";
import { getFunction } from "@/utils/request";
import { parseTime } from "@/utils/c_methods";
import { Dialog } from "vant";
import router from "@/router";
export default {
  name: "App",
  components: {
    [loading.name]: loading,
  },
  provide: {
    ifHead: true,
  },
  data() {
    return {
      urlPuth: [{ name: "Home", path: "/" }],
      urlPathClass: ["Home"],
      transitionName: "",
      appVer: "",
      waiting: null,
      forcedUpdating: false,
      detterCautiondating: false,
      weakCautlonDating: false,
    };
  },
  created() {
    this.Puth();
    this._authorities();
    this.$auth.os.lxapp && this.initplus();
    this.$nextTick(() => {
      // console.log(this.$refs.indexWrap.clientHeight, ",aaaaa");
      this.$store.commit(
        "SET_DATALISTHEIGHT",
        this.$refs.indexWrap.clientHeight
      );
    });
    var url =
      "https://lxerp.66123123.com/imd/sldkfjsldf/sdfjksdfhkl/sdlfhksldhf.apk";
    // console.log(url.indexOf("https://"));
    // for (var key in url) {
    //   console.log(`${key} = ${url[key]}`);
    // }
    //测试代码
    // this.appVer = "0.2.1";
    // this.getAppVersion();
  },
  mounted() {
    // window.addEventListener("scroll", this.justifyPos);
  },
  methods: {
    _authorities() {
      let authorities = JSON.parse(window.localStorage.getItem("jurisdiction"));
      console.log(authorities, "*//");
      Vue.prototype.$authorities = authorities;
    },
    initplus() {
      if (window.plus) {
        this.plusReady();
      } else {
        document.addEventListener("plusready", this.plusReady, false);
      }
    },
    Puth() {
      // localStorage.setItem("urlPath", JSON.stringify(this.urlPuth));
      // localStorage.setItem("urlPathClass", JSON.stringify(this.urlPathClass));
    },
    plusReady() {
      this.appVer = plus.runtime.version;
      //获取更新版本
      this.getAppVersion();
      let _this = this;
      // Android处理返回键
      // nw.close();
      plus.key.addEventListener(
        "backbutton",
        function () {
          //获取所有窗口数量
          let webviewLebgth = plus.webview.all().length;
          let webview = plus.webview.all();
          //App中没有内置网页时
          if (webviewLebgth == 1) {
            var PuthUrl = JSON.parse(localStorage.getItem("urlPath"));
            var toPuthUrl = "";
            if (PuthUrl.length > 1) {
              var index = PuthUrl.length;
              toPuthUrl = PuthUrl[index - 2].path;
            }
            if (PuthUrl.length == 1) {
              if (_this.forcedUpdating) {
                Dialog.alert({
                  title: "领先智采",
                  message: "确定退出",
                  confirmButtonColor: "#1BBF97",
                }).then(() => {
                  plus.runtime.quit();
                });
              } else {
                Dialog.confirm({
                  title: "领先智采",
                  message: "确定退出",
                  confirmButtonColor: "#1BBF97",
                })
                  .then(() => {
                    plus.runtime.quit();
                  })
                  .catch(() => {
                    // on cancel
                  });
              }
            } else {
              router.push(toPuthUrl);
            }
          } else {
            //关闭App中的内置网页
            var service_comfirm = plus.webview.getWebviewById(webview[1].id);
            plus.webview.close(service_comfirm);
          }
        },
        false
      );
    },
    getAppVersion() {
      var _this = this;
      getFunction(
        `/api/shoppe-api-service/mobile/version/latest/v1.0.0`,
        true
      ).then((res) => {
        if (res.code == "000000") {
          let newVer = res.data;
          // FORCED_UPDATING    强制更新
          // BETTER_CAUTION    强提示更新
          // WEAK_CAUTION      弱提示更新
          if (this.appVer != newVer.latestVersion) {
            if (this.compareVersion(newVer.latestVersion, this.appVer)) {
              if (
                //当前版本小于最小支持的版本直接强制更新
                newVer.minimumVersion &&
                this.compareVersion(newVer.minimumVersion, this.appVer)
              ) {
                _this.forcedUpdating = true;
                this.alertTips(newVer);
              } else {
                if (newVer.updateType === "FORCED_UPDATING") {
                  //强制更新
                  _this.forcedUpdating = true;
                  this.alertTips(newVer);
                } else if (newVer.updateType === "BETTER_CAUTION") {
                  this.detterCautiondating = true;
                  if (this.detterCautiondating) {
                    this.confirmTips(newVer);
                  }
                } else if (newVer.updateType === "WEAK_CAUTION") {
                  // if(this.appVer != newVer.latestVersion){
                  //弱提示更新记录版本
                  var latestVersion = newVer.latestVersion;
                  if (localStorage.getItem("latestVersion")) {
                    if (
                      localStorage.getItem("latestVersion") != latestVersion
                    ) {
                      this.weakCautlonDating = true;
                      this.weakCautlon(newVer);
                      localStorage.setItem("latestVersion", latestVersion);
                    }
                  } else {
                    this.weakCautlonDating = true;
                    this.weakCautlon(newVer);
                    localStorage.setItem("latestVersion", latestVersion);
                  }
                  // }
                }
              }
            }
          }

          //当前版本小于最小支持的版本直接强制更新
          // if (
          //   newVer.minimumVersion &&
          //   this.compareVersion(newVer.minimumVersion, this.appVer)
          // ) {
          //   this.forcedUpdating = true;
          //   this.alertTips(newVer);
          // } else if (this.compareVersion(newVer.latestVersion, this.appVer)) {
          //   this.checkAppVersion(newVer);
          // }
        }
      });
    },
    weakCautlon(info) {
      Dialog.confirm({
        title: "有新版本更新啦！",
        message: info.updateDocument,
        confirmButtonText: "立即更新",
        confirmButtonColor: "#1bbf97",
        cancelButtonText: "下次再升",
      })
        .then(() => {
          this.downloadApk(info.appUrl);
        })
        .catch(() => {
          localStorage.setItem("latestVersion", latestVersion);
        });
    },
    checkAppVersion(info) {
      //强制更新
      if (info.forcedUpate) {
        this.alertTips(info);
      } else {
        //获取是否有最新版本的缓存信息
        let storage = this.getInfo(
          "Lxwl_Shoppe_App_Version_" + info.latestVersion
        );
        if (storage) {
          let appVerinfo = JSON.parse(storage);
          let diff =
            parseInt(new Date() - new Date(appVerinfo.date)) / 3600000 / 24;
          //最新版本等于缓存版本且已超出缓存时间=半个月
          if (diff > 15) {
            this.confirmTips(info);
          }
        } else {
          this.confirmTips(info);
        }
      }
    },
    alertTips(info) {
      Dialog.alert({
        title: "有新版本更新啦！",
        message: info.updateDocument,
        confirmButtonText: "立即更新",
        confirmButtonColor: "#1bbf97",
      }).then(() => {
        this.downloadApk(info.appUrl);
      });
    },
    confirmTips(info) {
      Dialog.confirm({
        title: "有新版本更新啦！",
        message: info.updateDocument,
        confirmButtonText: "立即更新",
        confirmButtonColor: "#1bbf97",
        cancelButtonText: "暂不升级",
      })
        .then(() => {
          this.downloadApk(info.appUrl);
        })
        .catch(() => {
          this.cacheUpdateVersion(info);
        });
    },
    cacheUpdateVersion(info) {
      info.date = parseTime(new Date());
      // console.log(info.date);
      this.detterCautiondating = false;
      //缓存要更新的版本信息
      this.setInfo(
        "Lxwl_Shoppe_App_Version_" + info.latestVersion,
        JSON.stringify(info)
      );
    },
    downloadApk(url) {
      if (url.indexOf("https://" == -1)) {
        url = process.env.VUE_APP_BASE_API + "/image" + url;
      }
      this.waiting = plus.nativeUI.showWaiting("开始下载");
      //创建下载管理对象
      var dtask = plus.downloader.createDownload(url, {}, function (d, status) {
        // 下载完成
        if (status == 200) {
          plus.nativeUI.closeWaiting();
          //下载成功,d.filename是文件在保存在本地的相对路径，使用下面的API可转为平台绝对路径
          let fileSaveUrl = plus.io.convertLocalFileSystemURL(d.filename);
          //下载成功后的回调函数
          plus.nativeUI.toast("下载成功，准备安装" + d.filename);
          //安装程序，第一个参数是路径，默认的下载路径在_downloads里面
          plus.runtime.install(
            fileSaveUrl, //"_downloads/ksd.apk"
            {},
            function () {
              plus.nativeUI.toast("安装成功");
              plus.runtime.restart();
            },
            function () {
              plus.nativeUI.toast("安装失败");
            }
          );
        } else {
          alert("下载失败 " + status);
        }
      });
      dtask.addEventListener("statechanged", this.onStateChanged, false);
      dtask.start(); //开始下载任务
    },
    onStateChanged(task, status) {
      switch (task.state) {
        case 1:
          console.log("开始");
          break;
        case 2:
          console.log("已连接到服务器");
          break;
        case 3:
          let progress =
            "下载" +
            Math.floor((task.downloadedSize / task.totalSize) * 100) +
            "%";
          this.waiting.setTitle(progress);
          break;
        case 4:
          console.log("下载完成");
          break;
      }
    },
    compareVersion(newV, oldV) {
      var arr1 = newV.toString().split(".");
      var arr2 = oldV.toString().split(".");
      var minL = Math.min(arr1.length, arr2.length);
      var pos = 0; //当前比较位
      var diff = 0; //当前位比较是否相等
      var flag = false; //逐个比较如果当前位相等则继续比较下一位
      while (pos < minL) {
        diff = parseInt(arr1[pos]) - parseInt(arr2[pos]);
        if (diff == 0) {
          pos++;
          continue;
        } else if (diff > 0) {
          flag = true;
          break;
        } else {
          flag = false;
          break;
        }
      }
      return flag;
    },
    getInfo(key) {
      if (this.$auth.os.lxapp) {
        return plus.storage.getItem(key);
      } else {
        return localStorage.getItem(key);
      }
    },
    setInfo(key, val) {
      if (this.$auth.os.lxapp) {
        plus.storage.setItemAsync(key, val);
      } else {
        localStorage.setItem(key, val);
      }
    },
  },
  watch: {
    $route(to, from) {
      // console.log(parseInt(this.$route.meta.y), "]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]");
      // document.body.scrollTop = parseInt(this.$route.meta.y);
      // document.documentElement.scrollTop = parseInt(this.$route.meta.y);
      // var goto = document.getElementsByClassName("index-wrap");
      // goto.scrollTop(to.meta.y);
      // console.log(document.body.scrollTop,  document.documentElement.scrollTop, "*////*");
      let topheight = parseInt(this.$route.meta.y);
      window.onload = setTimeout(function () {
        window.scrollTo(0, topheight); //记录缓存高度
        // window.scrollTo(0,0)//回滚顶部
      });
      var pathData = JSON.parse(localStorage.getItem("urlPath"));
      var urlPuth = JSON.parse(localStorage.getItem("urlPath"));
      if (to.name == "OrderDetail" && from.name == "SubmittedSuccessfully") {
        var urlArr = [{ name: "Home", path: "/" }, {}];
        localStorage.setItem("urlPath", JSON.stringify(urlArr));
      } else {
        if (to.path == "/login") {
          var pathUrl = [
            {
              name: to.name,
              path: to.path,
              query: to.query,
            },
          ];
          localStorage.setItem("urlPath", JSON.stringify(pathUrl));
        } else {
          if (to.path == "/") {
            localStorage.setItem("urlPath", JSON.stringify(this.urlPuth));
            localStorage.setItem(
              "urlPathClass",
              JSON.stringify(this.urlPathClass)
            );
          } else {
            if (
              to.path == "/librarygoods" ||
              // to.path == "/cart" ||
              to.path == "/user"
            ) {
              var urlArr = [{ name: to.name, path: to.path }];
              var urlArrClass = [to.name];
              localStorage.setItem("urlPath", JSON.stringify(urlArr));
              localStorage.setItem("urlPathClass", JSON.stringify(urlArrClass));
            } else {
              var pathIndex = -1;
              pathData.forEach((res, index) => {
                if (res.path === to.path) {
                  pathIndex = index;
                }
              });
              if (pathIndex === -1) {
                var pathUrl = {
                  name: to.name,
                  path: to.path,
                  query: to.query,
                };
                urlPuth.push(pathUrl);
                localStorage.setItem("urlPath", JSON.stringify(urlPuth));
              }
            }
          }
        }
      }
      var urlPuthIndex = 0;
      for (var i = 0; i < pathData.length; i++) {
        if (to.name == pathData[i].name) {
          urlPuthIndex = i + 1;
        }
      }
      if (urlPuthIndex > 0) {
        var newDataUrl = [];
        for (var i = 0; i < urlPuthIndex; i++) {
          newDataUrl[i] = pathData[i];
        }
        // console.log(newDataUrl, "newDataUrl");
        localStorage.setItem("urlPath", JSON.stringify(newDataUrl));
      }

      // console.log(urlPuthIndex,'/***---**/')

      if (to.meta.index != from.meta.index) {
        if (to.meta.index > from.meta.index) {
          // 设置动画名称
          this.transitionName = "slide-left";
        } else {
          this.transitionName = "slide-right";
        }
      } else {
        this.transitionName = "slide-center";
      }
    },
  },
};
</script>                                              

<style lang="less">
@import "./style/common.less";
@import "./style/theme.less";
@import url("./style/diy.less");
.van-progress {
  position: absolute;
  z-index: 9;
  top: 50%;
  left: 10%;
  right: 10%;
  border-radius: 10px;
}

#app {
  width: 100%;
  height: 100%;
  .van-info {
    background: linear-gradient(180deg, #3ae1c8 0%, #1bbf97 100%);
    margin-top: 5px;
  }
  ::-webkit-scrollbar {
    display: none; /*隐藏滚动条*/
  }
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
}
</style>

