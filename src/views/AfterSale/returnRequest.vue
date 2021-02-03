<template>
  <div class="return-request">
    <div>
      <inputTop :type="12" :titleName="titleName"></inputTop>
    </div>
    <div class="goods-info">
      <div class="dspl">
        <div class="goods_img">
          <van-image
            :src="apiHost + '/image' + sku.imagePath"
            fit="contain"
            class="img_boy"
          />
        </div>
        <div class="goods-title">
          <span class="goods-name">{{ sku.skuName }}</span>
          <span>数量：{{ sku.qty }}</span>
          <div class="all"><i>￥</i>{{ sku.price }}</div>
        </div>
      </div>
    </div>
    <div class="goods-form">
      <span class="front-icon-1">*</span>
      <span class="front-icon-2">*</span>
      <Icon name="arrow" class="r-arrow" size="13"></Icon>
      <Form @submit="onSubmit">
        <Field
          readonly
          clickable
          name="question"
          :value="question"
          label="提交原因"
          placeholder="请选择原因"
          :rules="[{ required: true, message: '请选择原因' }]"
          @click="showResonList = true"
        />
        <span class="max-qty"
          >您最多可提交数量为 {{ sku.availableQty }} 个</span
        >
        <Field
          name="qty"
          label="提交数量"
          :rules="[{ required: true, message: '请输入退换货数量' }]"
        >
          <template #input>
            <Stepper v-model="qty" min="0" :max="sku.availableQty" />
          </template>
        </Field>
        <Field
          class="txt-area"
          v-model="description"
          rows="4"
          autosize
          label="问题描述"
          type="textarea"
          placeholder="请输入问题描述"
        />
      </Form>
    </div>
    <div class="goods-address">
      <Icon name="arrow" class="r-arrow" size="13"></Icon>
      <Field
        readonly
        clickable
        name="logisticsType"
        :value="logisticsType"
        label="返回方式"
        placeholder="请选择返回方式"
        @click="showTypeList = true"
      />
      <div
        class="ads"
        @click="setAddress(0)"
        v-if="logisticsType != '快递至商家'"
      >
        <i class="f-icon">取</i>
        <div>
          <h3>{{ getAddress.contacts }}</h3>
          <span>{{ getAddress.contactsPhone }}</span>
          <p>{{ getAddress.address }}{{ getAddress.contactsAddressLine }}</p>
        </div>
        <Icon name="arrow" class="r-arrow" size="13" />
      </div>
      <div class="ads" @click="setAddress(1)" v-if="type == 'EXCHANGE'">
        <i class="f-icon">收</i>
        <div>
          <h3>{{ sendAddress.contacts }}</h3>
          <span>{{ sendAddress.contactsPhone }}</span>
          <p>{{ sendAddress.address }}{{ sendAddress.contactsAddressLine }}</p>
        </div>
        <Icon name="arrow" class="r-arrow" size="13" />
      </div>
      <span class="submit-btn" @click="onSubmit" v-if="sku.availableQty"
        >提交</span
      >
      <span class="submit-btn submit-btn-disable" v-if="!sku.availableQty"
        >提交</span
      >
    </div>
    <Popup v-model="showResonList" position="bottom">
      <Picker
        show-toolbar
        :columns="resonList"
        @confirm="onQuestionConfirm"
        @cancel="showResonList = false"
      />
    </Popup>
    <Popup v-model="showTypeList" position="bottom">
      <Picker
        show-toolbar
        :columns="typeList"
        @confirm="onTypeConfirm"
        @cancel="showTypeList = false"
      />
    </Popup>
  </div>
</template>

<script>
import {
  Dialog,
  Cell,
  Image as VanImage,
  Form,
  Field,
  Button,
  Popup,
  Picker,
  Stepper,
  Icon,
  Toast,
} from "vant";
import inputTop from "@/components/topTitle";
import { postFunction, getFunction } from "@/utils/request";

export default {
  name: "ReturnRequest",
  data() {
    return {
      titleName: "退货申请",
      goodsInfo: {},
      detailList: {},
      apiHost: this.$auth.os.lxapp
        ? process.env.VUE_APP_BASE_API
        : location.origin.indexOf("localhost") > -1
        ? "https://shoppemobiletest2.66123123.com"
        : location.origin,
      question: "",
      qty: 0,
      showResonList: false,
      resonList: ["质量问题", "发错货", "商品损坏", "缺少件", "其他"],
      description: "",
      logisticsType: "",
      typeList: ["上门取件", "快递至商家"],
      showTypeList: false,
      sendAddress: {},
      getAddress: {},
      sku: {},
      orderId: "",
      customerOrderNo: "",
      type: "",
    };
  },
  components: {
    Dialog,
    Cell,
    inputTop,
    Form,
    Field,
    Button,
    Popup,
    Picker,
    Stepper,
    Icon,
    [VanImage.name]: VanImage,
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      if (from.name == "typeSelect") {
        vm.$store.commit("SET_FORMINFO", {});
        vm.question = "";
        vm.qty = "";
        vm.description = "";
        vm.logisticsType = "";
      }
    });
  },
  created() {
    console.log(2);
    localStorage.setItem("afterSalesListType", 0);
    this.titleName =
      this.$route.query.type == "RETURN" ? "退货申请" : "换货申请";
    this.afterSalesOrder = JSON.parse(localStorage.getItem("afterSalesOrder"));
    this.type = this.$route.query.type;
    this.question = this.$store.getters.formInfo.question;
    this.qty = this.$store.getters.formInfo.qty || 0;
    this.description = this.$store.getters.formInfo.description;
    this.logisticsType = this.$store.getters.formInfo.logisticsType;
    this.getGoodsInfo();
  },
  methods: {
    onSubmit() {
      if (!this.question) {
        Toast("请选择退货原因");
      } else if (!this.qty) {
        Toast("请选择退货数量");
      } else if (!this.logisticsType) {
        Toast("请选择返回方式");
      } else if (this.type == "EXCHANGE" && !this.sendAddress.contacts) {
        Toast("请填写收货地址");
      } else if (
        this.logisticsType != "快递至商家" &&
        !this.getAddress.contacts
      ) {
        Toast("请填写取货地址");
      } else {
        let typeObj = {
          上门取件: "PICK_UP",
          快递至商家: "EXPRESS",
        };
        let data = {
          customerOrderId: this.afterSalesOrder.orderInfo.customerOrderId,
          customerOrderNo: this.afterSalesOrder.orderInfo.customerOrderNo,
          description: this.description,
          logisticsType: typeObj[this.logisticsType],
          orderId: this.afterSalesOrder.orderInfo.orderId,
          price: this.sku.price,
          qty: this.qty,
          question: this.question,
          returnAddress: this.getAddress,
          shoppingAddress: this.sendAddress,
          skuId: this.sku.skuId,
          type: this.type,
        };
        postFunction(
          "/api/shoppe-api-service/mobile/after-sales/",
          data,
          true,
        ).then(res => {
          if (res.code == "000000") {
            this.$store.commit("SET_FORMINFO", {});
            this.$store.commit("SET_GETADDRESS", {});
            this.$store.commit("SET_SENDADDRESS", {});
            this.$router.push({
              name: "submitionSuccess",
            });
          }
        });
      }
    },
    onQuestionConfirm(value) {
      this.question = value;
      this.showResonList = false;
    },
    onTypeConfirm(value) {
      this.logisticsType = value;
      this.showTypeList = false;
    },
    //获取退换货订单信息
    getGoodsInfo() {
      getFunction(
        `/api/shoppe-api-service/mobile/after-sales/order/${this.afterSalesOrder.orderInfo.orderId}/sku/${this.afterSalesOrder.goodsInfo.skuId}`,
      ).then(res => {
        if (res.code == "000000") {
          if (!res.data.sku.availableQty) {
            Dialog.confirm({
              title: "",
              message: "当前订单暂无可退数量，是否返回？",
            })
              .then(() => {
                this.$router.push({
                  name: "afterSale",
                });
              })
              .catch(() => {
                // on cancel
              });
          }
          this.sku = res.data.sku;
          this.orderId = res.data.orderId;
          this.customerOrderNo = res.data.customerOrderNo;
          this.getAddress = res.data.address;
          this.getAddress.address =
            this.getAddress.contactsAddressProvince +
            "-" +
            this.getAddress.contactsAddressCity +
            "-" +
            this.getAddress.contactsCounty;
          if (!this.$store.getters.getAddress.address) {
            this.$store.commit("SET_GETADDRESS", this.getAddress);
          } else {
            this.getAddress = this.$store.getters.getAddress;
          }
          if (!this.$store.getters.sendAddress.address) {
            this.$store.commit("SET_SENDADDRESS", this.sendAddress);
          } else {
            this.sendAddress = this.$store.getters.sendAddress;
          }
        } else {
          this.sku = {};
        }
      });
    },
    //设置取件地址
    setAddress(data) {
      let from = {
        question: this.question,
        qty: this.qty,
        description: this.description,
        logisticsType: this.logisticsType,
      };
      this.$store.commit("SET_FORMINFO", from);
      this.$router.push({
        name: "addressEdit",
        query: { getOrSend: data, addressindex: 1, type: this.type },
      });
    },
  },
  beforeCreate() {
    this.$store.commit("changefoot", false);
  },
};
</script>

<style lang="less">
.return-request {
  font-size: 16px;
  background: #f8f8f8;
  padding: 0 14px;

  .goods-info,
  .goods-form,
  .goods-address {
    margin-top: 12px;
    padding: 5px;
    background: #ffffff;
    box-shadow: 0px 2px 4px 4px rgba(240, 241, 240, 0.5);
    border-radius: 8px;
  }
  .goods-form {
    position: relative;
    padding-right: 0;
    .van-cell {
      padding-right: 14px !important;
    }
    .front-icon-1 {
      position: absolute;
      top: 20px;
      left: 10px;
      color: #f74b37;
      font-size: 12px;
      z-index: 1;
    }
    .front-icon-2 {
      position: absolute;
      top: 54px;
      left: 10px;
      color: #f74b37;
      font-size: 12px;
      z-index: 1;
    }
    .van-cell:nth-child(1) {
      padding-bottom: 0;
      padding-right: 20px !important;
    }
    .van-cell:nth-child(4) {
      padding-right: 0px !important;
      .van-field__control {
        margin-left: 10px;
      }
    }
    .van-cell:not(:last-child)::after {
      display: none;
    }
    .max-qty {
      position: absolute;
      top: 77px;
      right: 0;
      font-size: 12px;
      display: block;
      transform: scale(0.75);
      color: #979797;
      z-index: 1;
    }
    .r-arrow {
      position: absolute;
      top: 20px;
      right: 8px;
      z-index: 1;
      color: #999;
    }
    .van-field__control {
      text-align: right;
      .van-stepper {
        margin-left: 117px;
      }
    }
    .txt-area {
      .van-field__control {
        width: 200px;
        text-align: left;
        background-color: #efefef;
        border-radius: 5px;
        padding: 5px;
      }
    }

    .van-stepper__minus::before,
    .van-stepper__plus::before,
    .van-stepper__minus::after,
    .van-stepper__plus::after {
      position: absolute;
      top: 50%;
      right: inherit;
      bottom: inherit;
      left: 50%;
    }
  }
  .goods-info {
    .dspl {
      width: 100%;
      margin-top: 10px;
      display: flex;
      > span {
        display: block;
        width: 30px;
        height: 20px;
        font-size: 12px;
        color: #666;
      }
      .goods_img {
        width: 90px;
        height: 90px;
        .img_boy {
          margin-left: 5px;
          width: 80px;
          height: 80px;
        }
      }
      .goods-title {
        width: calc(100% - 105px);
        height: 90px;
        margin-left: 15px;
        font-size: 13px;
        color: #333333;
        position: relative;
        > span:nth-child(2) {
          display: inline-block;
          transform: scale(0.86);
          margin-left: -3px;
          font-size: 12px;
          color: #979797;
        }
        .goods-name {
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .all {
          text-align: right;
          right: 5px;
          bottom: 5px;
          font-size: 17px;
          color: #fe5e41;
          font-weight: bold;
          position: absolute;
          i {
            font-size: 12px;
          }
        }
      }
    }
  }
  .goods-address {
    padding-top: 0;
    position: relative;
    .r-arrow {
      position: absolute;
      top: 15px;
      right: 5px;
      z-index: 1;
      color: #999;
    }
    .van-field__control {
      text-align: right;
    }
    .ads {
      padding: 5px;
      display: flex;
      margin: 10px 0;
      position: relative;
      .r-arrow {
        position: absolute;
        top: 20px;
        right: 0px;
      }
      .f-icon {
        display: block;
        margin: 10px 5px 0 5px;
        box-sizing: border-box;
        width: 24px;
        height: 24px;
        font-size: 13px;
        line-height: 22px;
        text-align: center;
        color: #1bbf97;
        border: 1px solid #1bbf97;
        border-radius: 20px;
      }
      > div {
        width: 90%;
        overflow: hidden;
        h3 {
          display: inline-block;
          font-size: 18px;
          font-weight: 600;
          color: #333;
        }
        span {
          display: inline-block;
          vertical-align: baseline;
          margin-left: 15px;
          font-size: 12px;
          color: #979797;
        }
        p {
          font-size: 12px;
          color: #333;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    .submit-btn {
      display: block;
      margin: 10px auto;
      text-align: center;
      font-size: 18px;
      color: #fff;
      width: 302px;
      height: 37px;
      line-height: 37px;
      background: linear-gradient(180deg, #3ae1c8 0%, #1bbf97 100%);
      border-radius: 22px;
    }
    .submit-btn-disable {
      opacity: 0.5;
    }
  }
}
</style>