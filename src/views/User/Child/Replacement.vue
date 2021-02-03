<template>
  <div class="replacement">
    <!-- <div class="detaill_top">
      <div @click="goBack" class="div_goBack">
        <img src="@/assets/img/goBack.png" height="20px" />
      </div>
      <div class="toptitle">重置密码</div>
    </div>-->
    <inputTop :type="3"></inputTop>

    <van-form @submit="onSubmit">
      <van-field
        v-model="dataList.oldPassword"
        label="旧密码："
        placeholder="旧密码"
        type="password"
        required
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="dataList.newPasswrod"
        label="新密码："
        placeholder="新密码"
        required
        type="password"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="dataList.newPasswrodtwo"
        label="再次输入："
        placeholder="再次输入"
        required
        type="password"
        :rules="[{ validator, message: messageTxt }]"
        show-error-message="true"
      />
      <div style="margin-top: 16px" class="editer_sub">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import {
  Switch,
  Toast,
  Field,
  Cell,
  CellGroup,
  Form,
  Popup,
  Button,
  Dialog,
} from "vant";
import {
  getFunction,
  postFunction,
  putFunction,
  deleteFunction,
} from "@/utils/request";
import inputTop from "@/components/topTitle";

export default {
  name: "Replacement",
  data() {
    return {
      value: "",
      areaList: {},
      show: false,
      searchResult: [],
      switchChecked: true,
      pageShow: false,
      cityDates: "",
      showPicker: false,
      api: {
        detail: `/api/shoppe-api-service/mobile/user/setup/reset/password`,
      },
      messageTxt: "请再次确认",
      dataList: {
        oldPassword: "",
        newPasswrod: "",
        newPasswrodtwo: "",
      },
      passwrodShow: false,
    };
  },
  components: {
    [Toast.name]: Toast,
    [Switch.name]: Switch,
    [Field.name]: Field,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Form.name]: Form,
    [Popup.name]: Popup,
    [Button.name]: Button,
    [Dialog.name]: Dialog,
    inputTop,
  },

  created() {
    console.log(JSON.parse(localStorage.getItem("UserInfo")).id);
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
      var data = {
        userId: JSON.parse(localStorage.getItem("UserInfo")).userInfo
          .customerUserId,
        newPasswrod: this.dataList.newPasswrod,
        oldPassword: this.dataList.oldPassword,
      };
      if (this.passwrodShow) {
        putFunction(this.api.detail, data).then((res) => {
          if (res.code == "000000") {
            Dialog.confirm({
              title: "提示",
              message: "修改密码成功请重新登录",
              confirmButtonColor: "#1BBF97",
            })
              .then(() => {
                this.$store.dispatch("logOut").then((res) => {
                  this.$router.push("/login");
                });
              })
              .catch(() => {
                // on cancel
              });
          }
        });
      } else {
        Toast("两次密码不一致");
      }
    },
    validator(val) {
      if (val != this.dataList.newPasswrod) {
        Toast("两次密码不一致");
        this.passwrodShow = false;
      } else {
        this.passwrodShow = true;
      }
    },
    editer() {
      this.$router.push({
        name: "Editer",
      });
    },
    getList() {
      getFunction(this.api.detail)
        .then((res) => {
          if (res.code == "000000") {
            this.dataList = res.data;
          }
        })
        .error((res) => {
          console.log(res, "sd");
        });
    },
    goBack() {
      this.$router.push({
        name: "UserDetail",
      });
    },
  },
};
</script>

<style scoped lang="less">
.replacement {
  font-size: 16px;
  background: #fff;
  height: 100%;
  .detaill_top {
    padding-top: 10px;
    .div_goBack {
      margin-left: 10px;
    }
    .toptitle {
      margin-top: -20px;
      text-align: center;
    }
  }
  .editer_sub {
    width: 300px;
    margin-left: 40px;
    // margin: 0 auto;
    margin-top: 50px;
    .van-button--info {
      background: linear-gradient(180deg, #3ae1c8 0%, #1bbf97 100%);
      border: none;
      height: 37px;
      line-height: 37px;
      font-size: 18px;
    }
    ._submit {
      width: 50%;
      height: 20px;
      border-radius: 3px;

      background: #1bbf97;
      // margin: 0 auto;
      text-align: center;
    }
  }
  /deep/.van-cell {
    .van-field__error-message {
      display: none;
    }
  }
}
</style>