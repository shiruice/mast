<template>
  <div class="order_body">
    <div class="input_top">
      <inputTop
        :type="0"
        :targetUrl="targetName"
        :placeholder="'输入商品名/订单号'"
      ></inputTop>
    </div>
    <div class="body_detail">
      <div class="detail_titdiv">
        <!-- <van-sticky :offset-top="61"> -->
          <div class="detail_title">
            <div class="detail_top">
              <div
                v-for="(res, index) in tabName"
                :key="index"
                :class="tabCla == index ? 'tabClass' : 'tabClaed'"
                @click="goToTab(index)"
              >
                {{ res.name }}
                <!-- <div style="margin-top:-5px">
              <img src="@/assets/img/dw.png" v-if="tabCla==index" />
            </div>-->
              </div>
            </div>
          </div>
        <!-- </van-sticky> -->
      </div>

      <van-pull-refresh
      class="pull_refresh"
        v-model="isLoading"
        success-text="刷新成功"
        @refresh="onRefresh"
        :style="{ minHeight: dataListHeight }"
      >
        <div v-if="listShow">
          <van-list
            v-model="loading"
            :finished="finished"
            @load="onLoad"
            error-text="请求失败，点击重新加载"
            :immediate-check="false"
            v-if="RecommendGoods.length > 0"
          >
            <pro-list
              :goods="RecommendGoods"
              :search="type"
              @getType="getType"
            ></pro-list>
          </van-list>
          <div v-else class="noSome">
            <img src="@/assets/img/noSome.png" />
          </div>
        </div>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { Icon, List, Search, Button, Sticky, PullRefresh } from "vant";
import proList from "@/components/Goods";
import loading from "@/components/Loading";
import { returnFloat } from "@/utils/c_methods";

import inputTop from "@/components/topTitle";
import {
  getFunction,
  postFunction,
  putFunction,
  deleteFunction,
} from "@/utils/request";
export default {
  name: "Order",
  data() {
    return {
      listShow: false,
      value: "",
      source: this.$route.query.source,
      type: Number(this.$route.query.search ? this.$route.query.search : 0),
      tabCla: this.$route.query.search ? this.$route.query.search : 0,
      tabName: [
        { name: "全部" },
        { name: "待审批" },
        { name: "待处理" },
        { name: "待发货" },
        { name: "待收货" },
        { name: "已完成" },
        { name: "已取消" },
      ],
      targetName: "queryOrder",
      api: {
        all: `/api/shoppe-api-service/moblie/order-management/all-list`, //全部
        delivery: `/api/shoppe-api-service/moblie/order-management/pending-delivery-list`, //待发货
        payment: `/api/shoppe-api-service/moblie/order-management/pending-payment-list`, //待付款
        process: `/api/shoppe-api-service/moblie/order-management/pending-process-list`, //待处理
        receipt: `/api/shoppe-api-service/moblie/order-management/pending-receipt-list`, //待收货
        review: `/api/shoppe-api-service/moblie/order-management/pending-review-list`, //待审批
        rcancelledeview: `/api/shoppe-api-service/moblie/order-management/cancelled-list`, //已取消
        completed: `/api/shoppe-api-service/moblie/order-management/completed-list`, //已完成
      },
      url: "",
      finished: false,
      loading: false,
      RecommendGoods: [],
      pageNum: 1,
      pageSize: 10,
      isLoading: false,
      dataListHeight: "",
    };
  },
  // watch: {
  //   $route(to, from) {
  //     this.tab.active = this.$route.path;
  //   },
  // },
  components: {
    [Icon.name]: Icon,
    [Search.name]: Search,
    [List.name]: List,
    [Button.name]: Button,
    [PullRefresh.name]: PullRefresh,
    [Sticky.name]: Sticky,
    proList,
    loading,
    inputTop,
  },
  mounted() {
    if (this.$route.query.source != undefined) {
      localStorage.setItem("source", this.$route.query.source);
    }
  },
  created() {
    this.getType(this.type);
    this.$auth.os.lxapp && this.initplus();
    this.dataListHeight = this.$store.state.app.dataListHeight + 10 + "px";
    if (localStorage.getItem("fromData")) {
      localStorage.removeItem("fromData");
    }
  },
  methods: {
    initplus() {
      if (window.plus) {
        this.plusReady();
      } else {
        document.addEventListener("plusready", this.plusReady, false);
      }
    },
    plusReady() {
      plus.navigator.setStatusBarBackground("#F8F8F8");
      plus.navigator.setStatusBarStyle("dark");
    },
    onRefresh() {
      this.getType(this.type, true);
      this.pageNum = 1;
      this.finished = false;
      this.loading = false;
    },
    onSearch() {
      // this.$router.push({
      //   name: "Calendar",
      // });
    },
    getType(val, unloading) {
      switch (val) {
        case 0:
          this.url = this.api.all;
          this.getAll(this.url, unloading);
          break;
        case 1:
          this.url = this.api.review;
          this.getAll(this.url, unloading);
          break;
        case 2:
          this.url = this.api.process;
          this.getAll(this.url, unloading);
          break;
        case 3:
          this.url = this.api.delivery;
          this.getAll(this.url, unloading);
          break;
        case 4:
          this.url = this.api.receipt;
          this.getAll(this.url, unloading);
          break;
        case 5:
          this.url = this.api.completed;
          this.getAll(this.url, unloading);
          break;
        case 6:
          this.url = this.api.rcancelledeview;
          this.getAll(this.url, unloading);
          break;
      }
    },
    onLoad() {
      setTimeout(() => {
        if (this.pageNum < this.total / 10) {
          this.pageNum++;
          var data = {
            createEndTime: null,
            createStartTime: null,
            customerUserId: null,
            finishEndTime: null,
            finishStartTime: null,
            noOrName: this.value,
            pageNum: this.pageNum,
            pageSize: 10,
          };
          postFunction(this.url, data, true).then(res => {
            if (res.code == "000000") {
              res.data.items.forEach(element => {
                this.RecommendGoods.push(element);
              });
              for (var i = 0; i < this.RecommendGoods.length; i++) {
                for (
                  var j = 0;
                  j < this.RecommendGoods[i].orderItemList.length;
                  j++
                ) {
                  this.RecommendGoods[i].orderItemList[
                    j
                  ].currentPrice = returnFloat(
                    this.RecommendGoods[i].orderItemList[j].currentPrice,
                  );
                  this.RecommendGoods[i].orderItemList[
                    j
                  ].currentPrice = returnFloat(
                    this.RecommendGoods[i].orderItemList[j].currentPrice,
                  );
                }
                this.RecommendGoods[i].amount = returnFloat(
                  this.RecommendGoods[i].amount,
                );
              }
            }
          });
          if (data.pageNum >= this.total / 10) {
            this.finished = true;
          }
          this.loading = false;
        } else {
          this.finished = true;
        }
      }, 3000);
    },
    getAll(url, unloading) {
      this.pageNum = 1;
      var data = {
        createEndTime: null,
        createStartTime: null,
        customerUserId: null,
        finishEndTime: null,
        finishStartTime: null,
        noOrName: this.value,
        pageNum: this.pageNum,
        pageSize: 10,
      };
      postFunction(url, data, unloading).then(res => {
        if (res.code == "000000") {
          this.RecommendGoods = res.data.items;
          for (var i = 0; i < this.RecommendGoods.length; i++) {
            for (
              var j = 0;
              j < this.RecommendGoods[i].orderItemList.length;
              j++
            ) {
              this.RecommendGoods[i].orderItemList[
                j
              ].currentPrice = returnFloat(
                this.RecommendGoods[i].orderItemList[j].currentPrice,
              );
              this.RecommendGoods[i].orderItemList[
                j
              ].currentPrice = returnFloat(
                this.RecommendGoods[i].orderItemList[j].currentPrice,
              );
            }
            this.RecommendGoods[i].amount = returnFloat(
              this.RecommendGoods[i].amount,
            );
          }
          this.total = res.data.total;
          this.isLoading = false;
          this.loading = false;
          this.listShow = true;
        }
      });
    },

    goBack() {
      if (localStorage.getItem("source") == 0) {
        localStorage.removeItem("source");
        this.$router.push({
          name: "Home",
        });
      }
      if (localStorage.getItem("source") == 1) {
        localStorage.removeItem("source");
        this.$router.push({
          name: "User",
        });
      } else {
        this.$router.push({
          name: "Home",
        });
      }
    },
    getFocus() {
      this.$router.push({
        name: "QueryOrder",
        query: { search: this.type },
      });
    },
    goToTab(val) {
      this.tabCla = val;
      this.type = val;
      this.finished = false;
      this.listShow = false;
      this.getType(val);
    },
  },

  beforeCreate() {
    this.$store.commit("changefoot", false);
  },
};
</script>

<style scoped  lang="less">
.order_body {
  font-size: 14px;
  width: 100%;
  height: 100%;
  .order_bodytop {
    // padding: 5px;
    .goReturn {
      font-size: 30px;
      font-weight: 100;
    }
    .top_title {
      //   margin: 0 auto;
      margin-top: -45px;
      text-align: center;
      width: 350px;
      margin-left: 20px;
    }
    .search-box {
      padding-top: 10px;
      width: 100%;
      display: flex;
      justify-content: space-around;
      .input-search-icon {
        width: 280px;
        height: 32px;
        float: right;
        position: relative;
        .van-search-input {
          width: 280px;
          height: 32px;
          border: 2px solid #ffffff;
          background: #fff;
          border-radius: 16px;
          display: inline-block;
          position: absolute;
          left: 0;
          top: 0;
          padding-left: 44px;
          font-size: 14px;
          box-sizing: border-box;
        }
        .icon-img {
          width: 15px;
          height: 15px;
          position: absolute;
          left: 12px;
          top: 8px;
        }
      }
      .search-button {
        width: 64px;
        height: 33px;
        font-size: 14px;
        color: #333333;
        line-height: 33px;
        border-radius: 16px;
        // background: linear-gradient(to right, #edcfa2, #d7a269);
        text-align: center;
      }
    }
    .van-search {
      width: 100%;
    }
    // margin: 0 auto;
  }
  .input_top {
    height: 60px;
  }
  .body_detail {
    .detail_titdiv {
      top: 60px;
      left: 0px;
      width: 100%;
      height: 60px;
      position: fixed;
      _position: relative;
      z-index: 99;
    }
    .detail_title {
      // height: 30px;
      border-top: 1px solid #ccc;
      width: 375px;
      display: inline-block;
      background: #f8f8f8;
      overflow-y: hidden;
      overflow-x: auto;
      margin-bottom: -5px;
      .detail_top {
        width: 500px;
        height: 30px;
        line-height: 2;
        font-size: 14px;
        box-sizing: border-box;
        display: flex;
        margin: 8px 0 0 0;
        .tabClaed {
          width: 70px;
          margin: 0 10px;
          color: #979797;
          text-align: center;
          display: inline-block;
          img {
            width: 10px;
          }
        }
        .tabClass {
          font-weight: bold;
          color: #1bbf97;
          width: 70px;
          margin: 0 10px;
          text-align: center;
          display: inline-block;
          img {
            width: 20px;
          }
        }
      }
    }
  }
  .van-pull-refresh {
    // display: flex;
    margin-top: 35px;
    height: 100%;
  }
  .van-list {
    height: 100%;
  }
  .noSome {
    height: 400px;
    padding-top: 100px;

    text-align: center;
    img {
      height: 100px;
    }
  }
}
</style>