<template>
  <div class="editerTitle">
    <inputTop :type="4"></inputTop>

    <van-form @submit="onSubmit">
      <van-field name="radio" label="类型：" required>
        <template #input>
          <van-radio-group v-model="radio" direction="horizontal">
            <van-radio name="2" checked-color="#1bbf97"
              >普票(电子发票)</van-radio
            >
            <van-radio name="1" checked-color="#1bbf97">专票</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        label="抬头："
        required
        v-model="list.invoiceTitle"
        placeholder="请填写抬头"
        :rules="[{ required: true, message: '请填写抬头' }]"
      />
      <van-field
        v-if="radio == 1 || type == 0 || type == 1 || type == 2 || type == 3"
        label-width="160"
        required
        label="统一社会信用代码："
        v-model="list.socialCreditCode"
        placeholder="统一社会信用代码"
        :rules="[{ required: true, message: '统一社会信用代码' }]"
      />
      <van-field
        v-if="radio == 2 && type != 0 && type != 1 && type != 2 && type != 3"
        label-width="160"
        label="统一社会信用代码："
        v-model="list.socialCreditCode"
        placeholder="统一社会信用代码"
      />
      <van-field
        label="地址："
        v-model="list.addressOnInvoice"
        placeholder="请输入地址"
        v-if="radio == 2"
      />
      <van-field
        v-if="radio == 1"
        label="地址："
        required
        v-model="list.addressOnInvoice"
        placeholder="请输入地址"
        :rules="[{ required: true, message: '请输入地址' }]"
      />
      <van-field
        label="电话："
        v-model="list.phoneOnInvoice"
        placeholder="请输入电话"
        v-if="radio == 2"
      />
      <van-field
        v-if="radio == 1"
        label="电话："
        required
        v-model="list.phoneOnInvoice"
        placeholder="请输入电话"
        :rules="[{ required: true, message: '请输入电话' }]"
      />
      <van-field
        label="开户行："
        v-model="list.bank"
        placeholder="请输入开户行"
        v-if="radio == 2"
      />
      <van-field
        v-if="radio == 1"
        label="开户行："
        required
        v-model="list.bank"
        placeholder="请输入开户行"
        :rules="[{ required: true, message: '请输入开户行' }]"
      />
      <van-field
        label="账号："
        v-model="list.accountNo"
        placeholder="请输入账号"
        v-if="radio == 2"
      />
      <van-field
        v-if="radio == 1"
        label="账号："
        required
        v-model="list.accountNo"
        placeholder="请输入账号"
        :rules="[{ required: true, message: '请输入账号' }]"
      />
      <van-tabbar class="editer_sub">
        <van-button round block type="info" native-type="submit"
          >保存</van-button
        >
      </van-tabbar>
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
  Picker,
  Icon,
  Button,
  RadioGroup,
  Radio,
  Dialog,
  Tabbar,
} from "vant";
import inputTop from "@/components/topTitle";

import {
  getFunction,
  postFunction,
  putFunction,
  deleteFunction,
} from "@/utils/request";
export default {
  name: "EditerTitle",
  data() {
    return {
      type: JSON.parse(localStorage.getItem("UserInfo")).userInfo.customerType,
      switchChecked: true,
      radio: "",
      list: {},
      api: {
        invoiceUpdate: `/api/shoppe-api-service/moblie/invoice/management/${this.$route.query.id}/invoice-title-update`,
        invoiceTitle: `/api/shoppe-api-service/moblie/invoice/management/${this.$route.query.id}/invoice-title`,
        invoiceDelete: `/api/shoppe-api-service/moblie/invoice/management/${this.$route.query.id}/delete`,
      },
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
    [Picker.name]: Picker,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Tabbar.name]: Tabbar,
    [Dialog.name]: Dialog,
    inputTop,
  },
  created() {
    this.invoiceTitle(this.api.invoiceTitle);
  },
  methods: {
    invoiceTitle(url) {
      getFunction(url).then((res) => {
        if (res.code == "000000") {
          this.list = res.data;
          if (res.data.type == 1) {
            this.radio = "2";
          } else {
            this.radio = "1";
          }
        }
      });
    },
    onSave() {
      Toast("save");
    },
    onDelete() {
      Toast("delete");
    },
    deteleList() {
      Dialog.confirm({
        title: "提示",
        message: "确定删除该条发票抬头？",
        confirmButtonColor: "#1BBF97",
      })
        .then(() => {
          putFunction(this.api.invoiceDelete).then((res) => {
            if (res.code == "000000") {
              this.$router.push({
                name: "InvoiceTitle",
                params: { isUpdate: true },
              });
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    validator(val) {
      console.log(!val);
      var validator = !val;
      return !validator;
    },
    goBack() {
      this.$router.push({
        name: "InvoiceTitle",
      });
    },
    onSubmit() {
      var data = {};
      if (this.radio == 1) {
        this.list.type = "VAT_INVOICE";
        data = this.list;
      } else {
        this.list.type = "PLAIN_INVOICE";
        data.type = this.list.type;
        data = this.list;
      }
      console.log(data);
      putFunction(this.api.invoiceUpdate, data).then((res) => {
        if (res.code == "000000") {
          this.$router.push({
            name: "InvoiceTitle",
          });
        }
      });
    },
  },
  beforeCreate() {
    this.$store.commit("changefoot", false);
  },
};
</script>

<style scoped lang="less">
.editerTitle {
  font-size: 16px;
  height: 100%;
  background: #fff;
  .myAddress_top {
    padding-top: 10px;
    font-size: 17px;
    font-weight: 400;
    height: 30px;
    border-bottom: 1px solid #ccc;
    .toptitle {
      //   margin-top: -20px;
      text-align: center;
    }
  }
  /deep/.van-cell {
    padding: 0;
    // margin: 0 10px;
    height: 50px;
    line-height: 50px;
    .van-cell__title {
      margin-left: 10px;
      span {
        margin-left: 10px;
      }
    }
    .van-field__control--custom {
      margin-top: 5px;
      .van-radio-group {
        margin-top: 10px;
      }
      .van-switch--on {
        background: #1bbf97 !important;
      }
    }
    input:-internal-autofill-selected {
      transition: background-color 5000s ease-in-out 0s !important;
    }
    .van-field__error-message {
      display: none;
    }
  }
  /deep/.van-hairline--top-bottom {
    .van-picker__cancel,
    .van-picker__confirm {
      color: #1bbf97;
    }
  }
  .div-switch {
    float: right;
    width: 150px;
    height: 30px;
    line-height: 30px;
    margin-right: 20px;
    .van-switch {
      top: 2px;
      margin-left: 10px;
    }
    .van-switch--on {
      //   width: 50px;
      //   height: 25px;
      background-color: #1bbf97;
    }
  }
  .editer_sub {
    width: 300px;

    margin-bottom: -20px;
    margin-left: 40px;
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
      margin: 0 auto;
      text-align: center;
    }
  }
}
</style>