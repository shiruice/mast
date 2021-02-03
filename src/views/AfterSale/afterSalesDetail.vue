<template>
  <div class="after-sales-detail">
    <div>
      <inputTop :type="3"></inputTop>
    </div>
    <div class="content">
      <div class="steps">
        <Steps :active="detail.statusList.num">
          <Step v-for="i in detail.statusList.tasks" :key="i.statusName">
            <span>{{ i.statusName }}</span>
          </Step>
        </Steps>
      </div>
      <div
        class="logistics"
        v-if="
          detail.logisticsType == '快递寄回' &&
          currentStatus != '取消' &&
          currentStatus != '申请售后'
        "
      >
        <span class="fst-wd">请将商品邮寄至：</span>
        <div class="ads">
          <img src="@/assets/img/add_img.png" alt="" />
          <div>
            <h3>{{ detail.merchantsAddressContacts }}</h3>
            <p>{{ detail.merchantsAddress }}</p>
          </div>
        </div>
        <div class="fm">
          <span>物流公司:</span>
          <input
            class="ipt"
            readonly
            v-model="expressCompany"
            type="text"
            @click="showLogisticsCompanyList = true"
          />
          <Icon class="arw-dn" size="15" name="arrow-down" />
        </div>
        <div class="fm">
          <span>物流单号:</span>
          <input class="ipt" v-model="expressNo" type="text" />
        </div>
        <Button
          v-if="!detail.expressNo"
          color="#1bbf97"
          round
          size="small"
          class="fl"
          @click="logisticsInfoSubmit"
          >提交</Button
        >
      </div>
      <div class="order-detail">
        <div class="goods_img">
          <van-image
            :src="apiHost + '/image' + detail.imagePath"
            fit="contain"
            class="img_boy"
          />
        </div>
        <div class="goods-info">
          <span class="goods-name">{{ detail.skuName }}</span>
          <span>数量：{{ detail.qty }}</span>
          <div class="all"><i>￥</i>{{ detail.price }}</div>
        </div>
      </div>
      <div class="service-info">
        <span>服务单信息</span>
        <table>
          <tr>
            <td class="table-head">售后单编号：</td>
            <td class="table-value">{{ detail.customerAfterSalesOrderNo }}</td>
          </tr>
          <tr>
            <td class="table-head">申请时间：</td>
            <td class="table-value">
              {{ detail.statusList.tasks[0].createTime }}
            </td>
          </tr>
          <tr>
            <td class="table-head">服务类型：</td>
            <td class="table-value">{{ detail.type }}</td>
          </tr>
          <tr>
            <td class="table-head">申请原因：</td>
            <td class="table-value">{{ detail.question }}</td>
          </tr>
          <tr>
            <td class="table-head">问题描述：</td>
            <td class="table-value">{{ detail.description }}</td>
          </tr>
        </table>
      </div>
      <div class="address-info">
        <div class="ln">
          <span>返回方式</span>
          <p>{{ detail.logisticsType }}</p>
        </div>
        <div
          class="ln"
          v-if="
            detail.logisticsType == '上门取货' ||
            (detail.type == '换货' && detail.logisticsType != '快递寄回')
          "
        >
          <span>取货信息:</span>
          <div>
            <p>{{ detail.returnAddressContacts }}</p>
            <p>{{ detail.returnAddress }}</p>
          </div>
        </div>
        <div class="ln" v-if="detail.type == '换货'">
          <span>收货信息</span>
          <div>
            <p>{{ detail.shoppingAddressContacts }}</p>
            <p>{{ detail.shoppingAddress }}</p>
          </div>
        </div>
      </div>
      <div class="record" v-if="currentStatus == '商家发货'">
        <span>物流信息</span>
        <Steps direction="vertical" :active="0">
          <Step v-for="i in logisticsList" :key="i">
            <div class="step-item">
              <p>{{ i }}</p>
            </div>
          </Step>
        </Steps>
      </div>
    </div>
    <Popup v-model="showLogisticsCompanyList" position="bottom">
      <Picker
        show-toolbar
        :columns="logisticsCompanyList"
        @confirm="onConfirm"
        @cancel="showLogisticsCompanyList = false"
      />
    </Popup>
    <div class="confirm-btn" v-if="currentStatus == '商家发货'">
      <span @click="confirmReceipt">确认收货</span>
    </div>
  </div>
</template>

<script>
import {
  Image as VanImage,
  Steps,
  Step,
  Popup,
  Field,
  Picker,
  Button,
  Icon,
  Toast,
  Dialog,
} from "vant";
import inputTop from "@/components/topTitle";
import { getFunction, putFunction } from "@/utils/request";

export default {
  name: "ReturnRequest",
  data() {
    return {
      showPopover: false,
      detail: {},
      apiHost: this.$auth.os.lxapp
        ? process.env.VUE_APP_BASE_API
        : location.origin.indexOf("localhost") > -1
        ? "https://shoppemobiletest2.66123123.com"
        : location.origin,
      expressNo: "",
      expressCompany: "",
      logisticsCompanyList: [
        "圆通速递",
        "顺丰快递",
        "申通快递",
        "韵达快递",
        "EMS快递",
        "中通快递",
      ],
      showLogisticsCompanyList: false,
      logisticsList: [],
    };
  },
  computed: {
    currentStatus() {
      return this.detail.statusList.tasks[this.detail.statusList.num]
        .statusName;
    },
  },
  components: {
    Button,
    Picker,
    Field,
    Popup,
    Steps,
    Step,
    inputTop,
    Icon,
    [VanImage.name]: VanImage,
    [Dialog.name]: Dialog,
  },
  mounted() {
    this.getDetail();
    localStorage.setItem("afterSalesListType", 1);
  },
  methods: {
    onConfirm(value) {
      this.expressCompany = value;
      this.showLogisticsCompanyList = false;
    },
    getDetail() {
      getFunction(
        `/api/shoppe-api-service/mobile/after-sales/${localStorage.getItem(
          "afterSalesId",
        )}/detail`,
      ).then(res => {
        if (res.code == "000000") {
          this.detail = res.data;
          this.expressCompany = res.data.expressCompany;
          this.expressNo = res.data.expressNo;
          this.logisticsList = res.data.logisticsList;
          if (
            this.detail.logisticsType == "快递寄回" &&
            this.currentStatus != "取消" &&
            this.currentStatus != "申请售后" &&
            !this.detail.expressNo
          ) {
            Dialog.alert({
              message:
                "请您及时填写退货物流信息，如未及时填写，服务将在7天后关闭",
            }).then(() => {
              // on close
            });
          }
        } else {
          this.detail = {};
        }
      });
    },
    logisticsInfoSubmit() {
      putFunction(`/api/shoppe-api-service/mobile/after-sales/logistics`, {
        company: this.expressCompany,
        id: this.detail.id,
        logisticsNo: this.expressNo,
      }).then(res => {
        if (res.code == "000000") {
          this.getDetail();
          Toast("提交成功");
        } else {
          Toast(res.message);
        }
      });
    },
    confirmReceipt() {
      putFunction(
        `/api/shoppe-api-service/mobile/after-sales/${this.detail.id}/complete`,
      ).then(res => {
        if (res.code == "000000") {
          this.getDetail();
          Toast("收货成功");
        } else {
          Toast(res.message);
        }
      });
    },
  },
  beforeCreate() {
    this.$store.commit("changefoot", false);
  },
};
</script>

<style lang="less">
.after-sales-detail {
  background: #f8f8f8;
  font-size: 16px;
  padding-bottom: 60px;
  .content {
    margin: 0 12px;
    overflow: hidden;
    > div {
      box-sizing: border-box;
      width: 100%;
      margin-top: 12px;
      padding: 12px;
      background: #ffffff;
      box-shadow: 0px 2px 4px 4px rgba(240, 241, 240, 0.5);
      border-radius: 8px;
    }
    .steps {
      transform: scale(0.85);
      width: 106%;
      margin-left: -1.5%;
      background: transparent;
      box-shadow: none;
      padding: 0;
      .van-step__title {
        margin-left: -3px;
      }
      .van-steps {
        padding: 0;
        overflow: visible;
        background: transparent;
        .van-steps__items > div:first-child .van-step__title {
          margin-left: -28px;
        }
        .van-steps__items > div:last-child .van-step__title {
          margin-right: -12px;
        }
      }
      .van-step--horizontal .van-step__circle-container {
        background-color: transparent;
        padding: 0 2px;
      }
    }
    .logistics {
      .fst-wd {
        font-size: 13px;
        color: #979797;
      }
      .ads {
        padding: 5px 5px 5px 0;
        display: flex;
        margin: 0 0 10px 0;
        position: relative;
        img {
          margin: 10px 10px 0 0;
          width: 20px;
          height: 25px;
        }
        > div {
          width: 90%;
          overflow: hidden;
          h3,
          span {
            display: inline-block;
          }
          span {
            vertical-align: baseline;
            margin-left: 15px;
            font-size: 14px;
            color: #999;
          }
          p {
            font-size: 13px;
            color: #666;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
      .fl {
        margin-left: 79%;
      }
      .fm {
        height: 40px;
        width: 100%;
        position: relative;
        span {
          font-size: 14px;
          color: #979797;
        }
        .ipt {
          font-size: 14px;
          color: #333333;
          box-sizing: border-box;
          margin-left: 10px;
          border: 1px solid #979797;
          width: calc(100% - 80px);
          height: 28px;
          line-height: 28px;
          border-radius: 15px;
          padding: 3px 15px;
        }
        .arw-dn {
          position: absolute;
          top: 6px;
          right: 18px;
          color: #979797;
        }
      }
    }
    .order-detail {
      margin-top: 0;
      padding-bottom: 4px;
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
      .goods-info {
        width: calc(100% - 105px);
        height: 90px;
        margin-left: 15px;
        font-size: 13px;
        color: #333333;
        position: relative;
        > span:nth-child(2) {
          display: inline-block;
          transform: scale(0.85);
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
    .service-info {
      span {
        font-size: 15px;
        font-size: bold;
        display: block;
        height: 12px;
        line-height: 12px;
        padding-left: 3px;
        color: #333;
        border-left: 2px solid #1bbf97;
      }
      table {
        width: 100%;
        margin-top: 5px;
        font-size: 13px;
        tr {
          height: 25px;
        }
      }
      .table-head {
        color: #979797;
        text-align: left;
        min-width: 80px;
      }
      .table-value {
        color: #333;
        text-align: right;
      }
    }
    .address-info {
      padding: 1px 12px;
      .ln {
        font-size: 13px;
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
        div {
          width: 60%;
          text-align: right;
        }
        span {
          color: #979797;
        }
        p {
          color: #333;
          line-height: 18px;
        }
      }
    }
    .record {
      span {
        font-size: 15px;
        font-size: bold;
        display: block;
        height: 13px;
        line-height: 13px;
        padding-left: 3px;
        border-left: 2px solid #1bbf97;
      }
      .van-step {
        height: 50px;
      }
      .step-item {
        font-size: 12px;
        p {
          display: inline-block;
        }
      }
    }
  }
  .confirm-btn {
    position: fixed;
    box-sizing: border-box;
    bottom: 0;
    width: 100%;
    height: 50px;
    background-color: #fff;
    padding: 10px 20px 10px 10px;
    text-align: right;
    z-index: 99;
    span {
      display: inline-block;
      width: 80px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background: linear-gradient(180deg, #3ae1c8 0%, #1bbf97 100%);
      border-radius: 18px;
      color: #fff;
      font-size: 14px;
    }
  }
}
</style>