<template>
  <div class="invoiceDetail">
    <inputTop :type="3"></inputTop>

    <div class="detaill_body">
      <div class="detail_bottom">
        <div class="bottom_body">
          <span
            class="StatusText"
            v-if="
              detailList.invoiceStatus != '已完成' ||
              detailList.invoiceStatus != '已作废'
            "
            >{{ detailList.invoiceStatusText }}</span
          >
          <span
            class="StatusText"
            v-if="
              detailList.invoiceStatus == '已完成' ||
              detailList.invoiceStatus == '已作废'
            "
            style="color: #ccc"
            >{{ detailList.invoiceStatusText }}</span
          >
          <!-- <div class="bottom_text">
            <span class="span_left">发票类型：</span>
            <span class="span_right">{{ detailList.invoiceStatusText }}</span>
          </div> -->
          <div class="bottom_text">
            <span class="span_left">发票类型：</span>
            <span class="span_right">{{ detailList.invoiceTypeName }}</span>
          </div>
          <div class="bottom_text">
            <span class="span_left">发票抬头：</span>
            <span class="span_right">{{ detailList.invoiceTitle }}</span>
          </div>
          <div class="bottom_text">
            <span class="span_left">统一社会信用代码：</span>
            <span class="span_right">{{ detailList.socialCreditCode }}</span>
          </div>
          <div class="bottom_text">
            <span class="span_left">地址：</span>
            <span class="span_right">{{ detailList.addressOnInvoice }}</span>
          </div>
          <div class="bottom_text">
            <span class="span_left">电话：</span>
            <span class="span_right">{{ detailList.phoneOnInvoice }}</span>
          </div>
          <div class="bottom_textbr"></div>
          <div class="bottom_text">
            <span class="span_left">收件人：</span>
            <span class="span_right">{{ detailList.receiverName }}</span>
          </div>
          <div class="bottom_text">
            <span class="span_left">收件人电话：</span>
            <span class="span_right">{{ detailList.receiverPhone }}</span>
          </div>
          <div class="bottom_text">
            <span class="span_left">收件人地址：</span>
            <span
              class="span_right"
              v-if="detailList.recipientAddress != 'null'"
              >{{ detailList.recipientAddress }}</span
            >
          </div>
          <div class="bottom_text">
            <span class="span_left">申请备注：</span>
            <span class="span_right">{{ detailList.applicationMemo }}</span>
          </div>
          <div class="bottom_text">
            <span class="span_left">发票备注：</span>
            <span class="span_right">{{ detailList.memoOnInvoice }}</span>
          </div>
          <div
            class="bottom_textd"
            v-if="detailList.invoiceTypeName == '电子发票'"
          >
            <span class="span_left">发票链接（电票）：</span>
            <span
              class="span_right"
              @click="getiIvoiceUrl(detailList.invoiceUrl)"
              v-if="detailList.invoiceUrl"
              >查看发票</span
            >
            <!-- <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">xiazai</van-popup> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon, Search, Image as VanImage, Popup } from "vant";
import inputTop from "@/components/topTitle";
import {
  getFunction,
  postFunction,
  putFunction,
  deleteFunction,
} from "@/utils/request";
export default {
  name: "InvoiceDetail",
  data() {
    return {
      value: "",
      show: false,
      apiList: {
        detail: `/api/shoppe-api-service/moblie/invoice/management/${this.$route.query.id}`,
      },
      detailList: {
        // addressOnInvoice: "string",
        // applicationMemo: "string",
        // invoiceStatusText: "string",
        // invoiceTitle: "string",
        // invoiceTypeName: "电子",
        // invoiceUrl: "string",
        // memoOnInvoice: "string",
        // needReceipt: "string",
        // phoneOnInvoice: "string",
        // receiverName: "string",
        // receiverPhone: "string",
        // recipientAddress: "string",
        // socialCreditCode: "string",
      },
      orderList: {},
      concealType: 1,
      concealIndex: "",
      orderLength: 0,
      informationLenght: 0,
    };
  },
  components: {
    [Icon.name]: Icon,
    [VanImage.name]: VanImage,
    [Popup.name]: Popup,
    inputTop,
  },
  created() {
    this.getDetail();
    // this.getList();
  },
  methods: {
    getiIvoiceUrl(val) {
      // console.log(val)
      !this.$auth.os.lxapp && window.open(val, "_blank");
      if (this.$auth.os.lxapp) {
        // var url = val;
        // var dtask = plus.downloader.createDownload(url, {}, function (
        //   d,
        //   status
        // ) {
        //   // 下载完成
        //   if (status == 200) {
        //     console.log("Download success: " + d.filename);
        //   } else {
        //     console.log("Download failed: " + status);
        //   }
        // });
        // dtask.start();
        this.showWebview(val);
      }
    },
    showWebview(val) {
      // 预创建新窗口（显示在可视区域外）
      // wn = plus.webview.create(val, "test", { render: "always" });
      // wn.show("none");
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
      getFunction(this.apiList.detail).then((res) => {
        if (res.code == "000000") {
          this.detailList = res.data;
        }
      });
    },
    goBack() {
      if (this.$route.query.origin == 0) {
        this.$router.push({
          name: "Home",
        });
      } else if (this.$route.query.fromData) {
        this.$router.push({
          name: "InvoiceAdmin",
          query: { search: this.$route.query.search },
        });
      } else {
        this.$router.push({
          name: "ListDetail",
          query: { search: this.$route.query.search },
        });
      }
    },
  },
  beforeCreate() {
    this.$store.commit("changefoot", false);
  },
};
</script>

<style scoped lang="less">
.invoiceDetail {
  font-size: 16px;
  background: #fff;
  min-height: 100%;
  .order_bodytop {
    padding: 5px;
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

    .detail_bottom {
      margin: 14px 0;
      box-shadow: 0px 2px 4px 4px rgba(240, 241, 240, 0.5);
      border-radius: 16px;
      display: flex;
      .bottom_body {
        // padding-top: 10px;
        margin: 10px;
        width: 350px;
        .StatusText {
          height: 20px;
          display: inline;
          float: right;
          // margin-right: 10px;
          color: #1bbf97;
          font-size: 13px;
          font-weight: bold;
        }
        .bottom_text {
          font-size: 13px;
          margin-top: 10px;
          width: 335px;
          display: inline-block;
          .span_left {
            color: #979797;
          }
          .span_right {
            float: right;
            color: #333333;
          }
        }
        .bottom_textd {
          font-size: 13px;
          margin: 10px;
          height: 50px;
          //   background: #F9FBFE;
          .span_left {
            color: #979797;
          }
          .span_right {
            float: right;
            color: #333333;
          }
        }
        .bottom_textbr {
          width: 335px;
          height: 2px;
          display: block;
          margin: 5px auto;
          margin-top: 10px;
          border-bottom: 1px solid #ccc;
        }
        .foot_but {
          padding: 5px 15px;
          border: 1px solid #ccc;
          border-radius: 32px;
        }
      }
    }
  }
}
</style>