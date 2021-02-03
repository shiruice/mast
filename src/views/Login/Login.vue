<template>
  <div class="login-wrap">
    <div class="logo">
      <img src="@/assets/img/login_1.png" alt="logo" />
    </div>
    <div class="login_body">
      <van-form @submit="onSubmit('formName')">
        <van-field
          v-model="userForm.username"
          name="用户名"
          placeholder="请输入账号"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="userForm.password"
          type="password"
          name="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div class="btn-wrap">
          <van-button round block type="info" native-type="submit"
            >登录</van-button
          >
        </div>
      </van-form>
    </div>
    <van-dialog
      v-model="showApp"
      title="服务协议和隐私政策"
      v-if="showApp"
      :show-cancel-button="showconfirm"
      :show-confirm-button="showconfirm"
    >
      <!-- <img src="https://img.yzcdn.cn/vant/apple-3.jpg" width="200px" /> -->
      <div class="dialog_body">
        <p>您通过我们的客服或参加我们举办的活动时所提交的信息</p>
        <p>
          例如，您参与我们线上活动时填写的调查问卷中可能包含您的姓名、电话、家庭地址等信息。
        </p>
        <p>
          我们的部分服务可能需要您提供特定的个人敏感信息来实现特定功能。若您选择不提供该类信息，则可能无法正常使用服务中的特定功能，但不影响您你可阅读
          <span @click="gotoServiceAgreement">《服务协议》</span>
          和
          <span @click="gotoPrivacyPolicy">《隐私政策》</span>
          了解详细信息。如您同意，请点击“同意”开始接受我们的服务。
        </p>
      </div>
      <div class="dialog_div">
        <van-button type="default" @click="returnApp" class="dialog_no"
          >不同意</van-button
        >
        <van-button type="default" @click="goApp">同意并继续</van-button>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import Qs from "qs";
import { Form, Button, Field, Notify, Dialog } from "vant";
import { request } from "@/utils/request";
import { getUserAuthorities } from "@/api/login/login";
export default {
  name: "Login",
  components: {
    [Button.name]: Button,
    [Form.name]: Form,
    [Field.name]: Field,
    [Notify.name]: Notify,
    [Dialog.namne]: Dialog,
    [Dialog.Component.name]: Dialog.Component,
  },
  data() {
    return {
      userForm: {
        password: "",
        username: "",
      },
      mac: "NIBUSHIZHENZHENGDEKUAILE",
      active: "PASSWORD",
      time: 60,
      timeout: null,
      loading: false,
      showApp: false,
      showconfirm: false,
    };
  },
  created() {
    this.$auth.token = null;
    this.$auth.user = null;
    // localStorage.clear()
    localStorage.removeItem("usergroup");
    localStorage.removeItem("goods");
    localStorage.removeItem("address");
    localStorage.removeItem("amount");
    localStorage.removeItem("invoicedata");
    localStorage.removeItem("jurisdiction");
    this.$auth.os.lxapp && this.initplus();
  },
  activated() {
    this.$auth.os.lxapp && this.initplus();
  },
  computed: {
    message() {
      return this.time > 0 && this.time < 60
        ? `${this.time}秒后重新获取`
        : `获取短信验证码`;
    },
  },
  methods: {
    gotoPrivacyPolicy() {
      this.$router.push("/privacypolicy");
    },
    gotoServiceAgreement() {
      this.$router.push("/serviceagreement");
    },
    returnApp() {
      plus.runtime.disagreePrivacy();
      this.showApp = false;

      plus.runtime.quit();
    },
    goApp() {
      plus.runtime.agreePrivacy();
      this.showApp = false;
      // var url =
      //   "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2542638243,4168351909&fm=26&gp=0.jpg";
      // void plus.runtime.openWeb(url);
    },
    initplus() {
      if (window.plus) {
        this.plusReady();
      } else {
        document.addEventListener("plusready", this.plusReady, false);
      }
    },
    plusReady() {
      plus.navigator.setStatusBarBackground("#fff");
      plus.navigator.setStatusBarStyle("dark");
      // this.userForm.username =plus.runtime.isAgreePrivacy()
      if (!plus.runtime.isAgreePrivacy()) {
        this.showApp = true;
      }
    },
    loginType(type) {
      this.active = type;
    },
    onSubmit() {
      // console.log(
      //   plus.runtime.isAgreePrivacy(),
      //   "      console.log(plus.runtime.isAgreePrivacy())    "
      // );

      let loginData = Qs.stringify({
        grant_type: "password",
        username: this.userForm.username,
        password: this.userForm.password,
      });
      let information = {
        user: loginData,
        mac: this.mac,
        type: this.active,
      };
      if (this.mac) {
        this.$store.dispatch("getToken", information).then((res) => {
          this.$store.dispatch("getUserInfo", res).then((res) => {
            if (res.code == "000000") {
              window.localStorage.setItem("projectId", res.data.projectId);
              this.$router.push("/");
            }
          });
          let jurisdiction = {};
          getUserAuthorities().then((res) => {
            jurisdiction = Object.assign(
              res.data.authorities,
              res.data.functions
            );
            Vue.prototype.$authorities = jurisdiction;
            window.localStorage.setItem(
              "jurisdiction",
              JSON.stringify(jurisdiction)
            );
          });
          // this.$router.push("/");
        });
        // .catch((rej) => {
        //   this.$auth.token = null;
        //   if (rej.response.status == "401") {
        //     Notify({
        //       type: "danger",
        //       message: rej.response.data.data.error_description,
        //     });
        //   } else {
        //     Notify({ type: "danger", message: rej.response.data.message });
        //   }
        // });
      } else {
        alert("请稍后正在获取mac码");
      }
    },
    getMessage() {
      this.timeout = setInterval(() => {
        this.time--;
        if (this.time === 0) {
          clearInterval(this.timeout);
          this.time = 60;
        }
      }, 1000);
    },
  },
};
</script>

<style scoped lang="less">
.login-wrap {
  height: 100%;
  display: block;
  .logo {
    width: 100px;
    height: 45px;
    padding: 76px 135px 66.5px 140px;
    img {
      display: flex;
      width: 75px;
    }
  }
  .login_body {
    margin-top: 67px;
  }
  /deep/.van-cell {
    padding: 0;
    margin: 0 38px 31px 35px;
    width: 302px;
    height: 40px;
    .van-field__value {
      border: 1px solid #d6d6d6;
      border-radius: 22.25px;
      .van-field__body {
        padding: 0 14px;
        .van-field__control {
          height: 37px;
          line-height: 37px;
        }
      }
    }
    input:-internal-autofill-selected {
      transition: background-color 5000s ease-in-out 0s !important;
    }
  }
  .btn-wrap {
    width: 302px;
    height: 37px;
    margin: 47px 38px 0 35px;
    bottom: 0px;
    .van-button--info {
      background: linear-gradient(180deg, #3ae1c8 0%, #1bbf97 100%);
      border: none;
      .van-button__text {
        font-size: 18px;
        font-weight: 400;
      }
    }
  }
  .van-dialog {
    width: 260px;
  }
  .van-dialog__header {
    font-weight: bold !important;
  }
  .dialog_body {
    font-size: 12px;
    margin: 10px 20px;
    span {
      color: #1887f0;
    }
  }
  .dialog_div {
    border-top: 1px solid #ccc;
    text-align: center;
    .van-button {
      width: 130px;
      text-align: center;
    }
    .dialog_no {
      border-right: 1px solid #ccc;
    }
  }
}
</style>
