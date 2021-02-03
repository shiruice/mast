<template>
  <div class="editer">
    <!-- <div class="detaill_top"> -->
    <!-- <van-icon name="arrow-left" @click="goBack" /> -->
    <!-- <div @click="goBack" class="div_goBack">
        <img src="@/assets/img/goBack.png" height="20px" />
      </div>
      <div class="toptitle">编辑个人信息</div>
    </div>-->
    <inputTop :type="3"></inputTop>

    <van-form @submit="onSubmit">
      <van-field v-model="dataList.userName" label="账号：" placeholder="请输入用户账号" disabled />
      <van-field
        v-model="dataList.realName"
        label="姓名："
        placeholder="请输入用户名"
        required
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="dataList.phone"
        label="手机："
        placeholder="请输入联系电话"
        required
        :rules="[{ validator, message: '请输入正确联系电话' }]"
      />
      <van-field
        v-model="dataList.email"
        label="邮箱："
        placeholder="请输入用户名邮箱"
        :rules="[{ validator:validatorEmall, message: '请输入用户名邮箱' }]"
      />
      <div class="editer_sub">
        <van-button round block type="info" native-type="submit">保存</van-button>
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
} from "vant";
import {
  getFunction,
  postFunction,
  putFunction,
  deleteFunction,
} from "@/utils/request";
import inputTop from "@/components/topTitle";

export default {
  name: "Editer",
  data() {
    return {
      value: "",
      areaList: {},
      show: false,
      searchResult: [],
      switchChecked: true,
      pageShow: false, //省市区三级联动是否显示（因为是接口返回的数据，等省市区数据渲染完毕之后，在显示三级联动）
      cityDates: "", //安联当前选中市的所有区所有数据
      showPicker: false,
      api: {
        detail: `/api/shoppe-api-service/mobile/user/${
          JSON.parse(localStorage.getItem("UserInfo")).userInfo.customerUserId
        }/update-pre`,
        //修改专柜用户信息
      },
      dataList: {},
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
    inputTop,
  },

  created() {
    console.log(JSON.parse(localStorage.getItem("UserInfo")).userInfo.userId);
    this.getList();
  },
  methods: {
    goBack() {
      this.$router.push({
        name: "UserDetail",
      });
    },
    validator(val) {
      if (!/^1[3456789]\d{9}$/.test(val)) {
        Toast("电话格式有误");
      }
      return /^1[3456789]\d{9}$/.test(val);
    },
    validatorEmall(val) {
      if (val) {
        if (
          !/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(
            val
          )
        ) {
          Toast("邮箱格式有误");
        }
        return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(
          val
        );
      } else {
        return true;
      }
    },

    editer() {
      this.$router.push({
        name: "Editer",
      });
    },
    onSubmit(values) {
      var data = {
        email: this.dataList.email,
        customerUserId: this.dataList.customerUserId,
        phone: this.dataList.phone,
        realName: this.dataList.realName,
        userName: this.dataList.userName,
      };
      console.log(data);
      var update = `/api/shoppe-api-service/mobile/user/${data.customerUserId}/update`;
      putFunction(update, data).then((res) => {
        if (res.code == "000000") {
          this.$router.push({
            name: "UserDetail",
            query: { source: 1 },
          });
        }
      });
    },
    getList() {
      getFunction(this.api.detail).then((res) => {
        if (res.code == "000000") {
          this.dataList = res.data;
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
.editer {
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
      font-size: 16px;
      text-align: center;
      width: 300px;
      margin-left: 50px;
    }
  }

  .editer_sub {
    width: 300px;
    margin-left: 40px;
    // margin: 0 auto;
    margin-top: 50px;
    .van-button--info {
    background: linear-gradient(180deg, #3ae1c8 0%, #1bbf97 100%);
   border: none;;
      height: 37px;
      line-height: 37px;
      font-size: 18px;
    }
    ._submit {
      width: 50%;
      height: 20px;
      border-radius: 3px;

      background: #1bbf97;
      margin: 0 auto;
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