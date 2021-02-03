<template>
  <div class="user_body">
    <van-pull-refresh
      v-model="isLoading"
      success-text="刷新成功"
      @refresh="onRefresh"
      :style="{ minHeight: dataListHeight }"
    >
      <div class="body_bodyTop">
        <div class="user_top">
          <div class="user_img">
            <img src="@/assets/img/user.png" />
            <!-- <span>{{dataList.userInfo.realName}}</span> -->
          </div>
          <div class="user_name">
            <div class="user_u">
              <span class="u_name">{{ userList.realName }}</span>
              <span class="u_phone">{{ userList.phone }}</span>
            </div>
            <div class="set_img">
              <!-- <img src="@/assets/img/set.png" @click="goSetPage" /> -->
              <img src="@/assets/img/set.png" @click="goSetPage" />
              <img
                v-if="phone_show"
                src="@/assets/img/icon-1.png"
                class="service"
                @click="buttomdialogShow()"
              />
              <!-- <span>{{dataList.userInfo.realName}}</span> -->
            </div>
          </div>
        </div>
        <div class="user_cen">
          <div class="user_cen_text" v-if="authorities.OrderReviewList">
            <div class="cen_body" @click="goApproval('0')">
              <div>{{ approveInfo.pendingQty }}</div>
              <div>待我审批</div>
            </div>
            <div class="cen_body" @click="goApproval('1')">
              <div>{{ approveInfo.approvedQty }}</div>
              <div>我已审批</div>
            </div>
            <div class="cen_body" @click="goApproval('2')">
              <div>{{ approveInfo.initiatedQty }}</div>
              <div>我发起的</div>
            </div>
          </div>
        </div>
      </div>
      <div class="body_bodyBody">
        <div class="user_order">
          <div class="title">
            <div class="title-left">
              <div class="left-icon"></div>
              <div>我的订单</div>
            </div>
            <div class="title-right">
              <div @click="goOrder(0)">
                全部
                <img src="@/assets/img/goRight.png" width="6px" />
              </div>
            </div>
          </div>
          <div class="btm_body">
            <div class="body_top">
              <van-col span="4" class="van_colspanle">
                <div class="btm_span" @click="goOrder(1)">
                  <div class="btm_icon">
                    <img src="@/assets/img/review.png" />
                  </div>
                  <span>待审批</span>
                </div>
              </van-col>
              <van-col span="4" class="van_colspan">
                <div class="btm_span" @click="goOrder(3)">
                  <div class="btm_icon">
                    <img src="@/assets/img/delivery.png" />
                  </div>
                  <span>待发货</span>
                </div>
              </van-col>
              <van-col span="4" class="van_colspan">
                <div class="btm_span" @click="goOrder(4)">
                  <div class="btm_icon">
                    <img src="@/assets/img/receipt.png" />
                  </div>
                  <span>待收货</span>
                </div>
              </van-col>
              <van-col
                v-if="authorities.AfterSales"
                span="4"
                class="van_colspanri"
              >
                <div class="btm_span" @click="jumpToAfterSales">
                  <div class="btm_icon">
                    <img src="@/assets/img/completed.png" />
                  </div>
                  <span>售后</span>
                </div>
              </van-col>
            </div>
          </div>
          <div class="title title_top">
            <div class="title-left">
              <div class="left-icon"></div>
              <div>我的账户</div>
            </div>
          </div>
          <div class="btm_body">
            <div class="body_top body_topcopy">
              <van-col
                v-if="authorities.InvoiceManagement"
                span="4"
                class="van_colspanbtmle"
              >
                <div @click="goList(1)" class="btm_span">
                  <div class="btm_icon">
                    <img src="@/assets/img/invoice.png" />
                  </div>
                  <span>发票管理</span>
                </div>
              </van-col>
              <van-col
                span="4"
                :class="
                  authorities.InvoiceManagement
                    ? 'van_colspanbtm'
                    : 'van_colspanbtmle'
                "
              >
                <div @click="goList(3)" class="btm_span">
                  <div class="btm_icon">
                    <img src="@/assets/img/management_y.png" />
                  </div>
                  <span>发票抬头</span>
                </div>
              </van-col>
              <van-col
                v-if="authorities.FinanceStatement"
                span="4"
                class="van_colspanbtm"
              >
                <div @click="goList(5)" class="btm_span">
                  <div class="btm_icon">
                    <img src="@/assets/img/billIcon.png" />
                  </div>
                  <span>线上对账</span>
                </div>
              </van-col>
              <van-col
                v-if="authorities.PurchaseReport"
                span="4"
                class="van_colspanbtmri"
              >
                <div @click="goList(4)" class="btm_span">
                  <div class="btm_icon">
                    <img src="@/assets/img/statement.png" />
                  </div>
                  <span>采购报表</span>
                </div>
              </van-col>
            </div>
          </div>
        </div>
        <div class="user_orders">
          <div class="b_bottom">
            <van-col span="4" class="van_colspanbtmle">
              <div @click="goListGoods(1)" class="btm_span">
                <div class="btm_icon">
                  <img src="@/assets/img/cllection.png" />
                </div>
                <span>收藏商品</span>
              </div>
            </van-col>
            <van-col span="4" class="van_colspanbtm">
              <div @click="goListGoods(2)" class="btm_span">
                <div class="btm_icon">
                  <img src="@/assets/img/browsing.png" />
                </div>
                <span>浏览记录</span>
              </div>
            </van-col>
            <van-col span="4" class="van_colspanbtm">
              <div @click="goAddress" class="btm_span">
                <div class="btm_icon">
                  <img src="@/assets/img/address_z.png" />
                </div>
                <span>地址管理</span>
              </div>
            </van-col>
            <van-col span="4" class="van_colspanbtmri">
              <div @click="goFeedback" class="btm_span">
                <div class="btm_icon">
                  <img src="@/assets/img/feedback.png" />
                </div>
                <span>意见反馈</span>
              </div>
            </van-col>
          </div>
        </div>
      </div>
    </van-pull-refresh>
    <van-dialog
      v-model="show"
      confirm-button-text="取消"
      confirm-button-color="#333"
      width="270"
    >
      <div class="van_dialog">
        <div class="van_top">
          <span> 客服联系电话 </span>
        </div>
        <div
          @click="devicedial(phone.afterSalesPhone, 1)"
          :class="selected == 1 ? 'selected div_select' : 'div_select'"
          v-if="phone.afterSalesPhone"
        >
          <span class="span_name">售后专线:</span>
          <span class="span_phone">{{ phone.afterSalesPhone }}</span>
        </div>
        <div
          @click="devicedial(phone.servicePhone, 2)"
          :class="selected == 2 ? 'selected div_selects' : 'div_selects'"
          v-if="phone.servicePhone"
        >
          <span class="span_name">专属客服:</span>
          <span class="span_phone">{{ phone.servicePhone }}</span>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { Button, Dialog, Icon, PullRefresh, Tabbar, Toast, Col } from "vant";
import {
  getFunction,
  postFunction,
  putFunction,
  deleteFunction,
} from "@/utils/request";
export default {
  name: "User",
  data() {
    return {
      authorities: this.$authorities,
      dataListHeight: "",
      isLoading: false,
      selected: 0,
      show: false,
      phone: {},
      phone_show:false,
      userList: {
        customerUserId: 0,
        email: "",
        phone: "",
        realName: "",
        userId: 0,
        userName: "",
      },
      homeList: {},
      api: {
        info: `/api/shoppe-api-service/mobile/user/info`,
        home: `/api/shoppe-api-service/mobile/user/info/home`,
        phone: `/api/shoppe-api-service/mobile/user/phone`,
      },
      approveInfo: {},
      callCenter: {
        afterSale: {
          name: "售后专线",
          phone: "400-888-1123",
          phone1: "4008881123",
        },
        exclusive: {
          name: "专属客服",
          phone: "17310160103",
        },
      },
    };
  },

  components: {
    [Button.name]: Button,
    [Dialog.name]: Dialog,
    [Icon.name]: Icon,
    [PullRefresh.name]: PullRefresh,
    [Tabbar.name]: Tabbar,
    [Dialog.Component.name]: Dialog.Component,
    [Toast.name]: Toast,
    [Col.name]: Col,
  },
  created() {
    this.getInfo(this.api.info);
    this.$auth.os.lxapp && this.initplus();
    this.getHome(this.api.home);
    this.buttomdialogShows();
    this.dataListHeight = this.$store.state.app.dataListHeight + 140 + "px";
    console.log(this.$authorities);
  },
  activated() {
    this.$store.commit("changefoot", true);
    this.$auth.os.lxapp && this.initplus();
  },
  methods: {
    goListGoods(val) {
      if (val == 1) {
        this.$router.push({
          name: "CollectionGoods",
        });
      } else if (val == 2) {
        this.$router.push({
          name: "BrowsingHistory",
        });
      }
    },
    buttomdialogShows() {
      //jieko 接口
      getFunction(this.api.phone, true).then((res) => {
        if (res.code == "000000") {
          this.phone = res.data;
          if (res.data.afterSalesPhone == "" && res.data.servicePhone == "") {
            // Toast.fail("客服联系方式为空");
            this.phone_show = false;
          } else {
            this.phone_show = true;
          }
        }
      });
    },
    buttomdialogShow() {
            this.show = true;
    },
    devicedial(val, i) {
      this.selected = i;
      if (window.plus) {
        this.plusPhone(val);
      } else {
        document.addEventListener("plusPhone", this.plusPhone, false);
      }
    },
    plusPhone(val) {
      plus.device.dial(val, true);
    },
    initplus() {
      if (window.plus) {
        this.value = "exist";
        this.plusReady();
      } else {
        this.value = "Listener";
        document.addEventListener("plusready", this.plusReady, false);
      }
    },
    plusReady() {
      this.value = "plusReady";
      plus.navigator.setStatusBarBackground("#1bbf97");
      plus.navigator.setStatusBarStyle("#light");
    },
    onRefresh() {
      this.getInfo(this.api.info, true);
      this.getHome(this.api.home);
    },
    getInfo(url, unloading) {
      getFunction(url, unloading).then((res) => {
        if (res.code == "000000") {
          this.userList = res.data;
          this.isLoading = false;
        }
      });
    },
    getHome(url) {
      getFunction(url).then((res) => {
        if (res.code == "000000") {
          // this.homeList = res.data;
          this.approveInfo = res.data.approveInfo;
        }
      });
    },
    goUserDetail() {
      this.$router.push({
        name: "UserDetail",
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    goList(val) {
      if (val == 0) {
        this.$router.push({
          name: "LibraryGoods",
        });
      }
      if (val == 1) {
        this.$router.push({
          name: "InvoiceAdmin",
          query: { source: 1 },
        });
      }
      if (val == 2) {
        this.$router.push({
          name: "Order",
          query: { source: 0 },
        });
      }
      if (val == 3) {
        this.$router.push({
          name: "InvoiceTitle",
          query: { source: 1 },
        });
      }
      if (val == 4) {
        this.$router.push({
          name: "ReportForm",
          query: { source: 0 },
        });
      }
      if (val == 5) {
        this.$router.push({
          name: "Bill",
          query: { source: 0 },
        });
      }
    },
    goOrder(val) {
      this.$router.push({
        name: "Order",
        query: { search: val, source: 1 },
      });
    },
    jumpToAfterSales() {
      localStorage.setItem("afterSalesListType", 0);
      this.$router.push({
        name: "afterSale",
      });
    },
    goAddress() {
      this.$router.push({
        name: "MyAddress",
        query: { addressindex: 0 },
      });
    },
    goFeedback() {
      this.$router.push({
        name: "Feedback",
      });
    },
    goSetPage() {
      this.$router.push({
        name: "SetPage",
      });
    },
    goApproval(val) {
      this.$router.push({
        name: "approval",
        query: {
          type: val,
        },
      });
    },
  },
  beforeCreate() {
    this.$store.commit("changefoot", true);
  },
};
</script>

<style  scoped lang="less">
.user_body {
  font-size: 16px;
  background: #f8f8f8;
  .van-col {
    width: 52.5px;
  }
  .title {
    width: 375px;
    padding: 5px;
    display: flex;
    justify-content: space-between;
    color: #333333;
    box-sizing: border-box;
    .title-left {
      font-size: 18px !important;
      font-weight: bold;
      display: flex;
      align-items: center;
    }
    .title-right {
      font-size: 18px !important;
      font-weight: bold;
      display: right;
      align-items: center;
    }
    .left-icon {
      width: 1px;
      height: 12px;
      background-color: #d7a269;
      margin-right: 4.5px;
    }
  }
  .van-pull-refresh {
    display: inline;
  }
  .body_bodyTop {
    display: inline-block;
    width: 375px;
    height: 190px;
    margin: 0 auto;
    background: #1bbf97;
    .user_top {
      height: 120px;
      width: 355px;
      margin: 0 auto;
      border-radius: 16px 16px 0 0;
      margin-top: 32px;
      background: #fff;
      display: flex;
      .user_img {
        margin: 20px 0 0 12px;
        img {
          width: 80px;
        }
      }

      .user_name {
        margin: 50px 0 0 10px;
        width: 260px;
        height: 34px;
        color: #333333;
        .set_img {
          height: 20px;
          margin: -50px 12px 0 12px;
          float: right;
          img {
            margin-left: 15px;
            width: 20px;
          }
        }
        .user_u {
          .u_name {
            font-weight: 500;
          }
          .u_phone {
            // border: 1px solid #d8d8d8;
            padding: 0 12px;
            // background: #d8d8d8;
            border-radius: 50px;
            // float: right;
            // margin-right: 10px;
            // width: 100px;
          }
        }
      }
    }
    .user_cen {
      width: 355px;
      padding: 12px 0;
      display: flex;
      align-items: center;
      justify-content: space-around;
      border-radius: 0 0 16px 16px;
      background: #f9fbfe;
      margin: 0 0 0 10px;
      // transform: translateX(-50%);
      text-align: center;
      .user_cen_text {
        width: 355px;
        // padding: 12px 0;
        display: flex;
        align-items: center;
        justify-content: space-around;
        border-radius: 0 0 16px 16px;
        background: #f9fbfe;
        // margin: 0 0 0 10px;
        // transform: translateX(-50%);
        text-align: center;
      }
      .cen_body {
        > div {
          &:nth-of-type(1) {
            font-size: 15px;
            color: #333;
          }
          &:nth-of-type(2) {
            font-size: 13px;
            color: #979797;
          }
        }
      }
    }
  }
  .body_bodyBody {
    margin: 20px auto;
    display: inline-block;
    width: 375px;

    .user_order {
      background: #ffffff;
      margin: 17px 12px 12px 12px;
      // margin-top: 20px;
      width: 351px;
      min-height: 88px;
      border-radius: 13px;
      // display: inline-block;
      .title {
        width: 100%;
        padding: 12px 10px 0 10px;
        display: flex;
        justify-content: space-between;
        color: #333333;
        box-sizing: border-box;
        .title-left {
          font-size: 15px !important;
          font-weight: 500;
          display: flex;
          align-items: center;
        }
        .title-right {
          font-size: 13px !important;
          font-weight: 500;
          display: right;
          color: #979797;

          align-items: center;
        }
        .left-icon {
          width: 2px;
          height: 12px;
          background-color: #1bbf97;
          margin-right: 4.5px;
          border-radius: 2px;
        }
      }
      .title_top {
        margin-top: 5px;
      }
      .btm_body {
        margin: 0px auto;
        width: 330px;
        // display: inline-block;
        // margin-bottom: 20px;
        .body_topcopy {
          padding-bottom: 10px;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
        }
        .body_top,
        .body_bootm {
          display: flex;
          // margin-bottom: 16px;
          .van_colspanle {
            margin: 0 22px 0 3px;
            width: 48px;
          }
          .van_colspan {
            margin: 0 22px;
            width: 48px;
          }
          .van_colspanri {
            margin: 0 3px 0 22px;
            width: 48px;
          }
          .van_colspanbtmle {
            margin: 0 20px 0 0;
          }
          .van_colspanbtm {
            margin: 0 20px;
          }
          .van_colspanbtmri {
            margin: 0 0 0 20px;
          }
          .btm_span {
            text-align: center;
            // margin-right: 20px;
            // width: 110px;
            // margin: 5px;
            font-size: 13px;
            color: #979797;
            margin: 12px 0;
            .btm_icon {
              text-align: center;
              img {
                height: 25px;
              }
            }
          }
        }
      }
    }
    .user_orders {
      background: #ffffff;
      margin: 0px 12px 0px 12px;
      // margin-top: 12px;
      width: 351px;
      // min-height: 88px;
      border-radius: 13px;
      margin-bottom: 50px;
      .van_colspanbtmle {
        margin: 0 20px 0 9px;
      }
      .van_colspanbtm {
        margin: 0 20px;
      }
      .van_colspanbtmri {
        margin: 0 9px 0 20px;
      }
      .b_bottom {
        display: flex;
        min-height: 60px;
        // margin-bottom: 12px;
        // margin-top: 12px;
        // padding: 0 10px;
        .btm_spaned {
          font-size: 13px;
          color: #979797;
          // margin-left: 15px;
          // margin-right: 15px;
          // display: inline-block;

          .btm_icon {
            // text-align: center;
            img {
              height: 25px;
            }
          }
        }
        .btm_span {
          text-align: center;
          // width: 150px;
          margin: 12px 0;
          font-size: 13px;
          color: #979797;

          .btm_icon {
            text-align: center;
            img {
              height: 25px;
            }
          }
        }
      }
    }
  }

  .van_dialog {
    text-align: center;
    line-height: 30px;
    .van_top {
      font-size: 18px;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: bold;
      color: #0e0e0e;
      margin-top: 15px;
      margin-bottom: 20px;
    }
    .div_select {
      margin-bottom: 10px;
    }
    .div_selects {
      margin-bottom: 15px;
    }
    .span_name {
      font-size: 14px;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      padding-right: 12px;
    }
    .span_phone {
      font-size: 15px;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: bold;
    }
  }
  .selected {
    color: #1bbf97;
  }
}
</style>