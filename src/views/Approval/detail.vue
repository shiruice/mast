<template>
  <div class="approvalDetail">
    <inputTop :type="3"></inputTop>
    <div class="ad-con" v-if="detail.creator">
      <div class="ad-con1">
        <p class="ad-con2-p ad-con2-p1">
          <span>{{detail.creator}}发起的订单申请</span>
          <span>{{detail.statusName}}</span>
        </p>
        <p class="ad-con2-p">
          <span>订单编号：</span>
          <span>{{detail.customerOrderNo}}</span>
        </p>
        <p class="ad-con2-p">
          <span>申请用户组：</span>
          <span>{{detail.userGroupName}}</span>
        </p>
        <p class="ad-con2-p">
          <span>采购金额：</span>
          <span>￥{{detail.amountTotal }}</span>
        </p>
        <p class="ad-con2-p">
          <span>支付方式：</span>
          <span>{{detail.payTypeDesc}}</span>
        </p>
        <p class="ad-con2-p">
          <span>收货信息：</span>
          <span>
            {{detail.customerReceiptAddress}}
            <br />
            {{detail.recipientName}}-{{detail.recipientPhone}}
          </span>
        </p>
      </div>

      <div class="ad-con2">
        <p class="ad-con2-top">
          <span>商品信息</span>
        </p>
        <div class="ad-con2-con">
          <div class="ad-con2-table" v-for="(item,a) of tableList" :key="a">
            <div class="td1" @click="gotoDetail(item.skuId)">
              <img :src="apiHost+'/image'+item.imagePath[0]" alt />
            </div>
            <div class="td2">
              <p>{{item.skuName}}</p>
            </div>
            <div class="td3">
              <div>
                <p class="td3-1">
                  <span>
                    <span>￥</span>
                    {{item.currentPrice}}
                  </span>
                  <span>x {{item.itemQty}}</span>
                </p>
                <p class="td3-2">{{item.totalPrice}}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-if="msgLength>3">
          <div class="ad-con2-list" @click="more(1)" v-if="showTable ">
            <van-icon :class="showTable?'i2':''" name="arrow-down" color="#979797" size="10" />
            <span>收起</span>
          </div>
          <div class="ad-con2-list" @click="more(2)" v-else>
            <van-icon :class=" !showTable?'i1':''" name="arrow-up" color="#979797" size="10" />
            <span>展示全部</span>
          </div>
        </div>
        <div class="ad-con2-foot">
          合计：
          <span>￥</span>
          <span>{{detail.amountTotal}}</span>
        </div>
      </div>

      <div class="ad-con3">
        <div
          v-for="(item,a) of detail.reviewStatusList.statusList"
          :key="a"
          :class="a < (detail.reviewStatusList.num-1)?'ad-con3-div':'ad-con3-divN'"
        >
          <div class="adcd-l">
            <div class="adcd-l-1">
              <i :class="a < detail.reviewStatusList.num?'i1':'i2'"></i>
            </div>
            <div class="adcd-l-2">
              <p>
                <span v-if="a == 0">发起人：</span>
                <span v-else>审批人：</span>
                <span>{{item.approverName}}</span>
                <i class="adcd-l-2i">{{item.nodeStatusText}}</i>
              </p>
              <p v-if="a != 0">
                <span>审批意见：</span>
                <span>{{item.memo}}</span>
              </p>
            </div>
          </div>
          <p class="adcd-r">{{item.time}}</p>
        </div>
      </div>
    </div>

    <div class="ad-foot" v-if="$route.query.status == 0 &&  detail.creator">
      <span class="ad-foot-success" @click="showTitle('success')">通过</span>
      <span class="ad-foot-corss" @click="showTitle('corss')">驳回</span>
    </div>
    <van-dialog
      v-model="show"
      :title="dalogTitle"
      show-cancel-button
      @confirm="confirm"
      confirm-button-color="#1bbf97"
      confirmButtonText="提交"
      cancelButtonText="返回"
    >
      <textarea class="dalog-textarea" v-model="memo" placeholder="请输入意见"></textarea>
    </van-dialog>
  </div>
</template>

<script>
import { Icon, Dialog, Toast } from "vant";
import inputTop from "@/components/topTitle";
import {
  getFunction,
  postFunction,
  putFunction,
  deleteFunction,
} from "@/utils/request";

export default {
  name: "approvalDetail",
  data() {
    return {
      show: false,
      tableList: [],
      showTable: false,
      api: {
        detail: `/api/shoppe-api-service/moblie/order-review-management/detail`,
        pass: `/api/shoppe-api-service/moblie/order-review-management/${this.$route.query.taskId}/pass/${this.$route.query.customerOrderId}`,
        reject: `/api/shoppe-api-service/moblie/order-review-management/${this.$route.query.taskId}/reject/${this.$route.query.customerOrderId}`,
      },
      queryDetail: this.$route.query,
      dalogTitle: "",
      memo: "",
      detail: {},
      apiHost: this.$auth.os.lxapp
        ? process.env.VUE_APP_BASE_API
        : location.origin.indexOf("localhost") > -1
        ? "https://shoppemobiletest3.66123123.com"
        : location.origin,
      msgLength: 0,
    };
  },
  components: {
    inputTop,
    [Icon.name]: Icon,
    [Dialog.name]: Dialog,
    [Dialog.Component.name]: Dialog.Component,
    [Toast.name]: Toast,
  },
  created() {
    this.getDetail();
  },
  methods: {
     gotoDetail(val){
        this.$router.push({
        name: "ProductDetails",
        query: { skuId: val, type: 9 },
      });
    },
    confirm() {
      let _url = "";
      if (this.dalogTitle == "审批通过") {
        _url = this.api.pass + "?memo=" + this.memo;
        getFunction(_url).then((res) => {
          if (res.code == "000000") {
            Toast("审批通过");
            setTimeout((d) => {
              this.$router.go(-1);
            }, 800);
          }
        });
      } else if (this.dalogTitle == "审批驳回") {
        _url = this.api.reject + "?memo=" + this.memo;
        getFunction(_url).then((res) => {
          if (res.code == "000000") {
            Toast("审批驳回");
            setTimeout((d) => {
              this.$router.go(-1);
            }, 800);
          }
        });
      }
      this.memo = "";
    },
    showTitle(type) {
      if (type === "success") {
        this.dalogTitle = "审批通过";
      } else if (type === "corss") {
        this.dalogTitle = "审批驳回";
      }
      this.memo = "";
      this.show = true;
    },
    getDetail() {
      putFunction(this.api.detail, this.queryDetail).then((res) => {
        if (res.code == "000000") {
          this.detail = res.data;
          this.msgLength = res.data.orderItemListDTO.length;
          this.tableList = this.detail.orderItemListDTO.slice(0, 3);
        }
      });
    },
    goBack() {
       this.$router.push({
          name: "approval",
        });
    },
    more(type) {
      this.showTable = !this.showTable;
      if (type == 1) {
        this.tableList = this.detail.orderItemListDTO.slice(0, 3);
      } else if (type == 2) {
        this.tableList = this.detail.orderItemListDTO;
      }
    },
  },
  beforeCreate() {
    this.$store.commit("changefoot", false);
  },
};
</script>

<style scoped lang="less">
.approvalDetail {
  font-size: 16px;
  background: #f8f8f8;
  padding-bottom: 20px;
  .ad-con {
    padding: 0 15px;
    .ad-con1,
    .ad-con2,
    .ad-con3 {
      padding: 12px;
      background: #fff;
      border-radius: 16px;
      margin-top: 10px;
    }
    .ad-con1 {
      .ad-con2-p {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        font-size: 13px;
        margin-top: 12px;
        text-align: right;
        span {
          &:nth-of-type(1) {
            flex-shrink: 0;
            color: #979797;
          }
          &:nth-of-type(2) {
            color: #333;
            word-break: break-all;
          }
        }
      }
      .ad-con2-p1 {
        margin-top: 0;
        span {
          &:nth-of-type(1) {
            font-size: 15px;
            color: #333;
            display: inline-block;
            width: 80%;
            text-align: left;
          }
          &:nth-of-type(2) {
            color: #1bbf97;
            font-weight: bold;
          }
        }
      }
    }
    .ad-con2 {
      .ad-con2-top {
        position: relative;
        padding-left: 8px;
        font-size: 15px;
        line-height: 15px;
        &::before {
          content: " ";
          position: absolute;
          top: 1px;
          left: 0;
          height: 13px;
          width: 3px;
          background: #1bbf97;
          border-radius: 3px;
        }
      }
      .ad-con2-con {
        .ad-con2-table {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 10px 0 0 0;
          .td1,
          .td3 {
            flex-shrink: 0;
          }
          .td1 {
            width: 80px;
            height: 80px;
            background: #f8f8f8;
            text-align: center;
            img {
              max-width: 100%;
              max-height: 100%;
            }
          }
          .td2 {
            padding: 0 7px;
            p {
              text-overflow: -o-ellipsis-lastline;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              line-clamp: 2;
              -webkit-box-orient: vertical;
              font-size: 13px;
              line-height: 19px;
            }
          }
          .td3 {
            text-align: right;
            font-size: 9px;
            line-height: 15px;
            > div {
              height: 70px;
              // display: flex;
              // justify-content: space-between;
              // flex-flow: column;
              .td3-1 {
                > span {
                  display: block;
                  > span {
                    display: inline-block;
                    vertical-align: bottom;
                    &:nth-of-type(1) {
                      transform: scale(0.8);
                      margin-bottom: -1px;
                    }
                  }
                  &:nth-of-type(2) {
                    margin-top: 7px;
                  }
                }

                color: #979797;
              }
              .td3-2 {
                color: #333333;
                margin-top: 7px;
              }
            }
          }
        }
      }

      .ad-con2-foot {
        font-size: 10px;
        line-height: 17px;
        text-align: right;
        > span {
          color: #fc7210;
          &:nth-of-type(2) {
            font-size: 17px;
            font-weight: bold;
          }
        }
      }

      .ad-con2-list {
        text-align: center;
        color: #979797;
        font-size: 13px;
        line-height: 13px;
        width: 150px;
        margin: 0 auto;
        span,
        i {
          vertical-align: middle;
        }
        span {
          margin-left: 4px;
        }
        .i1 {
          &::before {
            animation: animation-up 0.3s 0s linear both;
          }
        }
        @keyframes animation-up {
          0% {
            transform: rotate(0deg);
          }

          100% {
            transform: rotate(180deg);
          }
        }
        .i2 {
          &::before {
            animation: animation-down 0.3s 0s linear both;
          }
        }
        @keyframes animation-down {
          0% {
            transform: rotate(0deg);
          }

          100% {
            transform: rotate(180deg);
          }
        }
      }
    }
    .ad-con3 {
      padding: 20px;
      .ad-con3-div {
        &::before {
          border-left: 1px solid #baece0;
        }
      }
      .ad-con3-divN {
        &::before {
          border-left: 1px solid #e4e4e7;
        }
      }
      > div {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        font-size: 13px;
        line-height: 18px;
        color: #999;
        padding-bottom: 58px;
        position: relative;
        &::before {
          content: " ";
          position: absolute;
          top: 15px;
          left: 4px;
          width: 1px;
          height: 100%;
        }
        &:last-of-type {
          padding-bottom: 0;
          &::before {
            border: none !important;
          }
        }
        .adcd-l {
          position: relative;
          .adcd-l-1 {
            position: absolute;
            height: 100%;
            width: 9px;
            padding-top: 5px;
            > i {
              display: block;
              border-radius: 50%;
              width: 9px;
              height: 9px;
            }
            > .i1 {
              background: #1bbf97;
              box-shadow: 0 0 10px #1bbf97;
            }
            > .i2 {
              background: #e4e4e7;
              box-shadow: 0 0 10px #e4e4e7;
            }
            left: 0;
            top: 0;
          }
          .adcd-l-2 {
            padding-left: 20px;
            color: #333;
            p {
              &:nth-of-type(2) {
                color: #979797;
                font-size: 12px;
                line-height: 14px;
                margin-top: 8px;
              }
              display: flex;
              align-items: flex-start;
              > span {
                &:nth-of-type(1) {
                  flex-shrink: 0;
                }
              }
            }
            .adcd-l-2i {
              color: #979797;
              font-size: 12px;
              margin-left: 10px;
            }
          }
        }
        .adcd-r {
          flex-shrink: 0;
          color: #979797;
        }
      }
    }
  }

  .ad-foot {
    text-align: center;
    padding: 20px 0 0;
    > span {
      padding: 7px 27px;
      border-radius: 17px;
      font-size: 13px;
      line-height: 13px;
    }
    .ad-foot-success {
      border: 1px solid #1bbf97;
      background: #1bbf97;
      color: #fff;
      margin-right: 40px;
    }
    .ad-foot-corss {
      border: 1px solid #1bbf97;
      background: transparent;
      color: #1bbf97;
    }
  }
  .van-dialog {
    border-radius: 13px;
    width: 270px;
    /deep/ .van-dialog__header {
      font-size: 18px;
      font-weight: bolder;
      color: #0e0e0e;
      line-height: 18px;
      padding-top: 15px;
    }
  }

  .dalog-textarea {
    border: 1px solid #e4e4e7;
    border-radius: 2px;
    padding: 5px;
    resize: none;
    color: #333;
    width: 80%;
    height: 107px;
    margin: 15px 0 0 50%;
    transform: translateX(-50%);
    font-size: 13px;
    line-height: 15px;
    &::-webkit-input-placeholder {
      color: #979797;
    }
  }
}
</style>

