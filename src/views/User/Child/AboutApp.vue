<template>
  <div class="AboutApp">
    <inputTop :type="3"></inputTop>
    <div class="app_img">
      <span>
        <img src="@/assets/img/logo-01.png" />
      </span>
    </div>
    <van-cell title="版本号" :value="versionCode" />
    <van-cell title="隐私政策" is-link @click="gotoPrivacyPolicy" />
    <van-cell title="服务协议" is-link @click="gotoServiceAgreement" />
  </div>
</template>

<script>
import inputTop from "@/components/topTitle";
import { Cell, CellGroup } from "vant";
export default {
  name: "AboutApp",
  data() {
    return {
      versionCode: "V1.0.0",
    };
  },
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    inputTop,
  },
  created() {
    this.$auth.os.lxapp && this.initplus();
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
      this.versionCode = "V " + plus.runtime.version;
    },
    gotoPrivacyPolicy() {
      this.$router.push({
        name: "PrivacyPolicy",
        query: { type: 1 },
      });
    },
    gotoServiceAgreement() {
      this.$router.push({
        name: "ServiceAgreement",
        query: { type: 1 },
      });
    },
    goBack() {
      this.$router.push({
        name: "SetPage",
      });
    },
  },
  beforeCreate() {
    this.$store.commit("changefoot", false);
  },
};
</script>
<style scoped lang="less">
.AboutApp {
  font-size: 16px;
  height: 100%;
  background: #fff;
  .app_img{
      margin-top: 20px;
      width: 375px;
      text-align: center;
      height: 100px;
      line-height: 100px;
      img{
          width: 150px;
      }
  }
}
</style>