<template>
  <div class="SetPage">
    <inputTop :type="3"></inputTop>
    <van-cell title="账号信息" is-link @click="goUserDetail" />
    <van-cell title="关于" is-link @click="goAboutApp" v-if="show" />
    <div class="body_tabbar">
      <div class="body_bottom" @click="logout">
        <div class="search_button">退出登录</div>
      </div>
    </div>
  </div>
</template>

<script>
import inputTop from "@/components/topTitle";
import { Cell, CellGroup, Tabbar, Dialog } from "vant";
export default {
  name: "SetPage",
  data() {
    return {
      show: this.$auth.os.lxapp,
    };
  },
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Tabbar.name]: Tabbar,
    [Dialog.name]: Dialog,
    inputTop,
  },
  created() {
    this.$auth.os.lxapp && this.initplus();
  },
  activated(){
    this.$store.commit("changefoot", false);
  },
  methods: {
    initplus() {
      if (window.plus) {
        this.plusReady();
      } else {
        document.addEventListener("plusready", this.plusReady, false);
      }
    },
    plusReady() {
      plus.navigator.setStatusBarBackground("#f8f8f8");
      plus.navigator.setStatusBarStyle("dark");
    },
    goBack() {
      this.$router.push({
        name: "User",
      });
    },
    goAboutApp() {
      this.$router.push({
        name: "AboutApp",
      });
    },
    goUserDetail() {
      this.$router.push({
        name: "UserDetail",
      });
    },
    logout() {
      Dialog.confirm({
        title: "提示",
        message: "确定退出登录吗?",
        confirmButtonColor: "#1BBF97",
      })
        .then(() => {
          this.$store.dispatch("logOut").then((res) => {
            this.$router.push("/login");
            localStorage.removeItem("UserInfo");
          });
        })
        .catch(() => {
          // on cancel
        });
    },
  },
  beforeCreate() {
    this.$store.commit("changefoot", false);
  },
};
</script>

<style scoped lang="less">
.SetPage {
  font-size: 16px;
  height: 100%;
  background: #fff;
  .body_tabbar {
    // background: #f8f8f8;
    // margin-bottom: 65px;
    border-color: #fff !important;
    position: absolute;
    width: 100%;
    bottom: 0;
    .body_bottom {
      border-radius: 28px;
      margin: 10px auto;
      margin-top: 10px;
      // position: absolute;
      // bottom: 60px;
      // left: 40px;
      width: 300px;
      height: 37px;
      line-height: 37px;
      // background: #1bbf97;
      background: linear-gradient(180deg, #3ae1c8 0%, #1bbf97 100%);
      // box-shadow: 0px 4px 6px 0px rgba(5, 216, 165, 0.4);
      .search_button {
        color: #fff;
        width: 100px;
        margin: 0 auto;
        font-size: 18px;
        font-weight: 400;
      }
      text-align: center;
    }
  }
  .van-tabbar--fixed {
    border: none !important;
  }
}
</style>