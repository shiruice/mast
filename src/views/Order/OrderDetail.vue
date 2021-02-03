<template>
  <div class="order_body">
    <div class="order_bodytop">
      <!-- <van-icon name="arrow-left" @click="goBack" />
      <div class="top_title">
        <span>订单详情</span>
      </div>-->
      <inputTop :type="3"></inputTop>
    </div>
    <div class="detaill_body">
      <div class="detail_top">
        <div class="detail_topimg">
          <img src="@/assets/img/add_img.png" />
        </div>
        <div class="detail_toprec">
          <div>
            <span class="recipientName">{{ detailList.recipientName }}</span>
            <span class="Phone">{{ detailList.recipientPhone }}</span>
            <!-- <span>{{detailList.recipientPhone}}</span> -->
          </div>
          <div class="address">
            <span>收货地址:{{ detailList.customerReceiptAddress }}</span>
          </div>
        </div>
      </div>
      <div class="detail_center">
        <div class="title">
          <div class="title-left">
            <div class="left-icon"></div>
            <div>商品信息</div>
          </div>
        </div>
        <ul>
          <div v-for="(res, index) in detailList.orderItemListDTO" :key="index">
            <li v-if="conceal(index)">
              <div class="goods_bidy" @click="gotoDetail(res.skuId)">
                <div class="goods_img">
                  <!-- 'https://lxerptest.66123123.com/image'+item.imagePath -->
                  <!-- src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3238317745,514710292&fm=26&gp=0.jpg" -->
                  <van-image
                    :src="apiHost + '/image' + res.imagePath"
                    fit="contain"
                    class="img_boy"
                  />
                </div>
                <div class="goods-name">{{ res.skuName }}</div>
              </div>
              <div class="goods-btom">
                <span class="skuyqty">
                  <span style="font-size: 10px">￥</span>{{ res.currentPrice }}
                </span>
                <br />
                <span class="skuyqty">
                  <span
                    >x<strong>{{ res.itemQty }}</strong></span
                  >
                </span>
              </div>
              <div class="foot_div">
                <span class="foot_skuyqty">
                  ￥<span class="foot_sku">{{ res.totalPrice }}</span>
                </span>
              </div>
            </li>
          </div>

          <li class="list_Conceal" v-if="orderLength > 3">
            <span @click="getConceal" v-if="concealType == 1">
              <img src="@/assets/img/goDopwn.png" />展示全部
            </span>
            <span @click="getConceal" v-else>
              <img src="@/assets/img/goUp.png" />收起
            </span>
          </li>
        </ul>
        <div class="div_Total">
          <span class="span_left">合计：</span>
          <span class="span_right">
            <span style="font-size: 10px">￥</span>{{ detailList.amountTotal }}
          </span>
        </div>
      </div>
      <div class="detail_bottom">
        <div class="bottom_body">
          <div class="title-left">
            <div class="left-icon"></div>
            <div>订单信息</div>
          </div>
          <div class="bottom_text">
            <span class="span_left">订单编号：</span>
            <span class="span_right">{{ detailList.customerOrderNo }}</span>
          </div>
          <div class="bottom_text">
            <span class="span_left">下单时间：</span>
            <span class="span_right">{{ detailList.createTime }}</span>
          </div>
          <div class="bottom_text">
            <span class="span_left">完成时间：</span>
            <span class="span_right">{{ detailList.completionTime }}</span>
          </div>
          <div class="bottom_text">
            <span class="span_left">下单人信息：</span>
            <span class="span_right">{{ detailList.creator }}</span>
          </div>
          <div class="bottom_text">
            <span class="span_left">支付方式：</span>
            <span class="span_right">{{ detailList.payTypeDesc }}</span>
          </div>
          <div class="bottom_text">
            <span class="span_left">订单状态：</span>
            <span
              :class="
                detailList.statusName == '待审批'
                  ? 'span_right_y'
                  : 'span_right'
              "
              style="color:detailList.statusName=='待审批'?'#1bbf97':''"
              >{{ detailList.statusName }}</span
            >
          </div>
          <div class="bottom_text">
            <span class="span_left">查看发票：</span>
            <span class="span_right" v-if="lookInvoice(detailList.invoiceUrls)">
              <span @click="getDialogShow()">查看发票 </span>
            </span>
          </div>
          <div class="bottom_text" v-if="detailList.attachmentFile">
            <span class="span_left">查看合同：</span>
            <span class="span_right">
              <span
                style="color: #1bbf97"
                @click="attachmentFile(detailList.attachmentFile)"
                v-if="detailList.attachmentFile"
                >查看合同</span
              >
            </span>
          </div>
          <div class="bottom_text" v-if="detailList.settlementCredentials">
            <span class="span_left">结算凭证：</span>
            <span class="span_right">
              <span
                style="color: #1bbf97"
                @click="attachmentFile(detailList.settlementCredentials)"
                v-if="detailList.settlementCredentials"
                >查看凭证</span
              >
            </span>
          </div>
          <div class="bottom_text">
            <span class="span_left">备注：</span>
            <span class="span_right">{{ detailList.orderMemo }}</span>
          </div>
          <div class="foot_buttondiv">
            <span
              class="foot_but"
              @click="Logistics(detailList)"
              v-if="
                detailList.statusName == '待收货' ||
                detailList.statusName == '已完成'
              "
              >查看物流</span
            >
          </div>
        </div>
      </div>
    </div>

    <van-dialog
      v-model="dialogShow"
      title="发票信息"
      confirm-button-text="取消"
      confirm-button-color="#333"
      width="250"
    >
      <div class="dialog_div">
        <div
          v-for="(item, index) in detailList.invoiceUrls"
          :key="index"
          class="dialogShow"
        >
          <span @click="chakan(item)">下载发票 <span v-if="detailList.invoiceUrls.length>1">{{index+1}}</span> </span>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { Icon, Search, Image as VanImage, Dialog } from "vant";
import { returnFloat } from "@/utils/c_methods";
import {
  getFunction,
  postFunction,
  putFunction,
  deleteFunction,
} from "@/utils/request";
import inputTop from "@/components/topTitle";

export default {
  name: "OrderDetail",
  data() {
    return {
      value: "",
      apiList: {
        detail: `/api/shoppe-api-service/moblie/order-management/order/item`,
      },
      detailList: {},
      orderList: {},
      concealType: 1,
      concealIndex: "",
      orderLength: 0,
      informationLenght: 0,
      invoiceUrlsLenght: "",
      invoiceUrlsINdex: 0,
      appinvoiceUrlsINdex: 0,
      dialogShow: false,
      apiHost: this.$auth.os.lxapp
        ? process.env.VUE_APP_BASE_API
        : location.origin.indexOf("localhost") > -1
        ? "https://shoppemobiletest2.66123123.com"
        : location.origin,
    };
  },
  components: {
    [Icon.name]: Icon,
    [VanImage.name]: VanImage,
    [Dialog.name]: Dialog,
    [Dialog.Component.name]: Dialog.Component,

    inputTop,
  },
  created() {
    this.getDetail();
    if (this.$route.query.fromData) {
      localStorage.setItem("fromData", this.$route.query.fromData);
    }
  },

  methods: {
    Logistics(val) {
      var information = `/api/shoppe-api-service/moblie/order-management/${val.orderId}/logistics/information`;
      getFunction(information).then((res) => {
        if (res.code == "000000") {
          this.informationLenght = res.data.length;
          this.$router.push({
            name: "Logistics",
            query: {
              search: this.$route.query.search,
              orderId: val.orderId,
              customerOrderId: this.$route.query.customerOrderId,
              informationLenght: this.informationLenght,
              type: 1,
            },
          });
        }
      });
    },
    lookInvoice(val) {
      if (!val) {
        return false;
      } else if (!val[0]) {
        return false;
      } else {
        return true;
      }
    },
    _getInvoiceName(name) {
      console.log(name.indexOf("="), name.length);
      var startNo = name.length - 20;
      var endNo = name.length;
      return name.slice(startNo, endNo);
    },
    getDialogShow() {
      this.dialogShow = true;
    },
    getConceal() {
      this.concealType = this.concealType == 0 ? 1 : 0;
      this.conceal(this.concealIndex);
    },
    conceal(val) {
      this.concealIndex = val;
      if (this.concealType == 1) {
        return val < 3;
      } else {
        return true;
      }
    },
    gotoDetail(val) {
      this.$router.push({
        name: "ProductDetails",
        query: { skuId: val, type: 8 },
      });
    },
    prefetchWebview(url) {
      // plus.webview.prefetchURL(url);
      var dtask = plus.downloader.createDownload(url, {}, function (d, status) {
        // 下载完成
        if (status == 200) {
          console.log("Download success: " + d.filename);
          plus.runtime.openFile(d.filename);
        } else {
          console.log("Download failed: " + status);
        }
      });
      dtask.start();
    },
    attachmentFile(val) {
      var url = this.apiHost + "/image" + val;
      if (this.$auth.os.lxapp) {
        this.$auth.os.lxapp && this.prefetchWebview(url);
      } else {
        window.open(url, "_blank");
      }
    },
    chakan(val) {
      this.invoiceUrlsLenght = val.length;
      if (this.$auth.os.lxapp) {
        this.$auth.os.lxapp && this.showWebview(val);
      } else {
        window.open(val, "_blank");
      }
    },
    showWebview(val) {
      var dtask = plus.downloader.createDownload(val, {}, function (d, status) {
        // 下载完成
        if (status == 200) {
          console.log("Download success: " + d.filename);
          plus.runtime.openFile(d.filename);
        } else {
          console.log("Download failed: " + status);
        }
      });
      dtask.start();
    },
    getDetail() {
      var data = {
        customerOrderId: this.$route.query.customerOrderId,
        orderId: this.$route.query.orderId,
        status: this.$route.query.status ? this.$route.query.status : "",
      };
      postFunction(this.apiList.detail, data).then((res) => {
        if (res.code == "000000") {
          this.orderLength = res.data.orderItemListDTO.length;

          this.detailList = res.data;
          for (var i = 0; i < this.detailList.orderItemListDTO.length; i++) {
            this.detailList.orderItemListDTO[i].totalPrice = returnFloat(
              this.detailList.orderItemListDTO[i].totalPrice
            );
            this.detailList.orderItemListDTO[i].currentPrice = returnFloat(
              this.detailList.orderItemListDTO[i].currentPrice
            );
          }
          this.detailList.amountTotal = returnFloat(
            this.detailList.amountTotal
          );

          if (window.plus) {
            // this.prefetchWebview();
          }
        }
      });
    },
    goBack() {
      if (this.$route.query.status == "true") {
        this.$router.push({
          name: "Home",
        });
      } else {
        if (this.$route.query.origin == 0) {
          this.$router.push({
            name: "Home",
          });
        } else if (localStorage.getItem("fromData")) {
          localStorage.removeItem("fromData");
          this.$router.push({
            name: "QuiryDeteil",
            query: { search: this.$route.query.search },
          });
        } else {
          this.$router.push({
            name: "Order",
            query: { search: this.$route.query.search },
          });
        }
      }
    },
  },
  beforeCreate() {
    this.$store.commit("changefoot", false);
  },
};
</script>

<style scoped lang="less">
.order_body {
  font-size: 16px;
  height: 100%;
  background: #fff;
  .order_bodytop {
    // padding: 5px;
    .top_title {
      //   margin: 0 auto;
      margin-top: -20px;
      text-align: center;
    }
    .van-search {
      width: 100%;
    }
    // margin: 0 auto;
  }
  .detaill_body {
    margin: 0 10px;

    .detail_top {
      margin: 10px 0;
      box-shadow: 0px 2px 4px 4px rgba(240, 241, 240, 0.5);
      border-radius: 16px;
      display: flex;
      .detail_toprec {
        margin-top: 10px;
        .recipientName {
          font-size: 16px;
        }
        .Phone {
          margin-left: 10px;
          font-size: 12px;
          color: #ccc;
        }
        .address {
          font-size: 12px;
          margin: 5px 0 16px 0;
        }
      }
      .detail_topimg {
        margin-top: 5px;
        width: 50px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        img {
          text-align: center;
          width: 20px;
          margin-top: 10px;
        }
      }
    }
    .detail_center {
      margin: 10px 0;
      box-shadow: 0px 2px 4px 4px rgba(240, 241, 240, 0.5);
      border-radius: 16px;
      .title {
        width: 100%;
        padding: 5px 5px 0 15px;
        display: flex;
        justify-content: space-between;
        color: #333333;
        box-sizing: border-box;
        .title-left {
          font-size: 14px !important;
          font-weight: bold;
          display: flex;
          align-items: center;
          .left-icon {
            width: 2px;
            height: 14px;
            background-color: #1bbf97;
            margin-right: 4.5px;
          }
        }
      }

      .goods_bidy {
        width: 100%;
        margin-top: 10px;
        display: flex;
        .goods_img {
          width: 90px;
          height: 90px;
          .img_boy {
            margin-left: 5px;
            width: 80px;
            height: 80px;
          }
        }

        .goods-name {
          width: 145px;
          height: 35px;
          line-height: 1.5;
          margin-left: 15px;
          font-size: 12px;
          color: #333333;
          font-weight: 500;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
      .list_Conceal {
        text-align: center;
        img {
          width: 15px;
          margin-right: 10px;
        }
      }
      .goods_imgbidy {
        width: 100%;
        margin-top: 10px;
        .img_boy {
          margin-left: 15px;
          display: flex;
          float: left;
          width: 80px;
          height: 80px;
        }
      }
      .goods_imgdian {
        height: 80px;
        line-height: 80px;
        margin-left: 15px;
      }
      .goods-btom {
        float: right;
        margin-right: 10px;
        font-size: 14px;
        right: 0px;
        margin-top: -90px;
        text-align: right;
        color: #979797;
      }
      .foot_div {
        // float: right;
        text-align: right;
        margin-right: 10px;
        margin-top: -30px;
        margin-bottom: 15px;
        .foot_buttom {
          .foot_but {
            border-radius: 50px;
            margin-left: 10px;
            padding: 5px 15px;
            border: 1px solid #333;
            font-weight: 500;
          }
          .foot_butnoe {
            background: #fff;
          }
          .foot_buttwo {
            background: #1bbf97;
            border-color: #1bbf97;
            color: #fff;
            font-weight: 500;
          }
        }
        .foot_skuyqty {
          font-size: 10px;
          font-weight: 500;
          color: #666;
          .foot_sku {
            font-size: 16px;
            font-weight: bold;
            color: #333333;
          }
        }
      }
      .count-number {
        font-size: 13px !important;
        color: #d7a269;
        text-align: center;
        line-height: 18px;
        margin-top: 6px;
      }
      .items_top {
        .items_lestTop {
          float: left;
        }
        .items_rightTop {
          float: right;
        }
      }
      .order_col {
        font-size: 16px;
      }
      .div_Total {
        right: 0;
        text-align: right;
        height: 30px;
        margin-right: 10px;
        .span_left {
          font-size: 10px;
        }
        .span_right {
          color: #fc7210;
          font-weight: bold;
        }
      }
    }
    .detail_bottom {
      margin: 10px 0;
      box-shadow: 0px 2px 4px 4px rgba(240, 241, 240, 0.5);
      border-radius: 16px;
      display: flex;
      .bottom_body {
        padding-top: 10px;
        margin: 10px;
        width: 100%;
        .title-left {
          font-size: 14px !important;
          font-weight: bold;
          display: flex;
          align-items: center;
          .left-icon {
            width: 2px;
            height: 14px;
            background-color: #1bbf97;
            margin-right: 4.5px;
          }
        }
        .bottom_text {
          font-size: 13px;
          margin: 10px 0;
          .span_left {
            color: #979797;
          }
          .span_right {
            float: right;
            color: #333333;
          }
          .span_right_y {
            float: right;
            color: #1bbf97;
          }
        }
        .foot_buttondiv {
          display: flex;
          float: right;
          .foot_but {
            padding: 5px 15px;
            border: 1px solid #ccc;
            border-radius: 32px;
          }
        }
      }
    }
  }
  .dialog_div {
    margin-top: 15px;
  }
  .dialogShow {
    color: #1bbf97;
    text-align: center;
  }
}
</style>