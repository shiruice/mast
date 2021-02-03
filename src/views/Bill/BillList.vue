<template>
  <div class="invoice">
    <inputTop :type="0" :placeholder="'输入对账单号'"></inputTop>
    <div class="body_detail">
      <div class="detail_title">
        <div class="detail_top">
          <div
            v-for="(res, index) in tabName"
            :key="index"
            :class="tabCla == index ? 'tabClass' : 'tabClaed'"
            @click="goToTab(index)"
          >
            {{ res.name }}
          </div>
        </div>
      </div>
      <van-pull-refresh
        v-model="isLoading"
        success-text="刷新成功"
        @refresh="onRefresh"
      >
        <div v-if="listShow">
          <van-list
            v-model="loading"
            :finished="finished"
            @load="onLoad"
            error-text="请求失败，点击重新加载"
            finished-text="加载完成"
            :immediate-check="false"
            v-if="RecommendList.length > 0"
            :style="{ minHeight: dataListHeight }"
          >
           <invo-list :goods="RecommendList" :search="type"></invo-list>
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
import { Icon, List, Search, Button, PullRefresh } from "vant";
import invoList from "./Child/BillListData";
import inputTop from "@/components/topTitle";

import {
  getFunction,
  postFunction,
  putFunction,
  deleteFunction,
} from "@/utils/request";
export default {
  name: "InvoiceAdmin",
  data() {
    return {
      value: "",
      listShow: false,
      source: this.$route.query.source,
      type: Number(this.$route.query.search ? this.$route.query.search : 0),
      tabCla: this.$route.query.search ? this.$route.query.search : 0,
      tabName: [
        { name: "全部" },
        { name: "对账中" },
        { name: "对账完成" },
        { name: "对账取消" },
      ],
      api: {
        allList: `/api/shoppe-api-service/moblie/bill/management/all-list`, //全部
        waitList: `/api/shoppe-api-service/moblie/bill/management/wait-lis`, //对账中
        accountList: `/api/shoppe-api-service/moblie/bill/management/account-list`, //完成
        cancelList: `/api/shoppe-api-service/moblie/bill/management/cancel-list`, //取消
      },
      url: "",
      finished: false,
      loading: false,
      RecommendGoods: [],
      pageNum: 0,
      pageSize: 10,
      RecommendList: [
  ],
      isLoading: false,
      dataListHeight: "",
    };
  },
  components: {
    [Icon.name]: Icon,
    [Search.name]: Search,
    [List.name]: List,
    [Button.name]: Button,
    [PullRefresh.name]: PullRefresh,
    invoList,
    inputTop,
  },
  created() {
    this.$auth.os.lxapp && this.initplus();
    this.getType(this.type);
     this.isLoading = false;
   this.listShow = true;
    if (this.$route.query.source != undefined) {
      localStorage.setItem("source", this.$route.query.source);
    }
    this.dataListHeight = this.$store.state.app.dataListHeight + "px";
  },
  methods: {
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
      plus.navigator.setStatusBarBackground("#F8F8F8");
      plus.navigator.setStatusBarStyle("dark");
    },
    onRefresh() {
      this.getType(this.type, true);
    },
    getType(val, unloading) {
      switch (val) {
        case 0:
          this.url = this.api.allList;
          this.getAll(this.api.allList, unloading);
          break;
        case 1:
          this.url = this.api.waitList;
          this.getAll(this.api.waitList, unloading);
          break;
        case 2:
          this.url = this.api.accountList;
          this.getAll(this.api.accountList, unloading);
          break;
        case 3:
          this.url = this.api.cancelList;
          this.getAll(this.api.cancelList, unloading);
          break;
      }
    },
    getAll(url, unloading) {
      this.pageNum = 1;
      var data = {
        invoiceNumber: "",
        endTime: null,
        startTime: null,
        pageNum: this.pageNum,
        pageSize: 10,
      };
      postFunction(url, data, unloading).then((res) => {
        if (res.code == "000000") {
          this.RecommendList = res.data.items;
          this.total = res.data.total;
          this.isLoading = false;
          this.listShow = true;
        }
      });
    },
    goToTab(val) {
      this.tabCla = val;
      this.type = val;
      this.finished = false;
      this.loading = false;
      this.listShow = false;
      this.getType(val);
    },
    onLoad() {
      setTimeout(() => {
        if (this.pageNum < this.total / 10) {
          this.pageNum++;
          var data = {
            invoiceNumber: "",
            endTime: null,
            startTime: null,
            pageNum: this.pageNum,
            pageSize: 10,
          };
          postFunction(this.url, data).then((res) => {
            if (res.code == "000000") {
              res.data.items.forEach((element) => {
                this.RecommendList.push(element);
              });
            }
          });
          if (data.pageNum >= this.total / 10) {
            this.finished = true;
          }
          this.loading = false;
        } else {
          this.finished = true;
        }
      }, 1000);
    },
    onSearch() {
      console.log("kdsjh");
      this.$router.push({
        name: "BillSearch",
      });
    },

    goBack() {
       this.$router.push({
          name: "User",
        });
      // if (localStorage.getItem("source") == 0) {
      //   localStorage.removeItem("source");
      //   this.$router.push({
      //     name: "Home",
      //   });
      // }
      // if (localStorage.getItem("source") == 1) {
      //   localStorage.removeItem("source");
      //   this.$router.push({
      //     name: "User",
      //   });
      // } else {
      //   this.$router.push({
      //     name: "Home",
      //   });
      // }
    },

    getFocus() {
      this.$router.push({
        name: "BillSearch",
      });
    },
  },

  beforeCreate() {
    this.$store.commit("changefoot", false);
  },
};
</script>

<style scoped lang="less">
.invoiceList {
  // margin-bottom: 100px;

  .invoice_List {
    // height: 235px;
    width: 95%;
    display: flex;
    // float: left;
    height: 100%;
    flex-direction: column;
    border: 1px solid #efefef;
    border-radius: 6px;
    margin: 10px auto;
    padding: 5px;
    background-color: #fff;
    box-sizing: border-box;
    box-shadow: 0px 2px 4px 4px rgba(240, 241, 240, 0.5);
    .invoice_top {
      height: 20px;
      line-height: 20px;
      img {
        width: 15px;
      }
      .top_left {
        color: #979797;
      }
      .top_right {
        float: right;
      }
    }
    .invoice_body {
      margin: 10px;
      .bode_list {
        margin: 5px 0;
        .list_lefttop {
          color: #333333;
          font-size: 15px;
        }
        .lisr_righttop {
          float: right;
          font-size: 15px;
        }
        .list_left {
          color: #979797;
          font-size: 13px;
        }
        .lisr_right {
          float: right;
          font-size: 13px;
        }
      }
    }
  }
}
.invoice {
  font-size: 16px;
  height: 100%;
  .order_bodytop {
    padding: 5px;
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
  .body_detail {
    .detail_title {
      margin-top: 16px;
      margin-bottom:6px ;
      width: 375px;
      overflow-y: hidden;
      overflow-x: auto;
      .detail_top {
       // width: 430px;
        font-size: 14px;
        display: flex;
        box-sizing: border-box;
        padding-left: 40px;
        .tabClaed {
          color: #979797;
          margin-right: 35px;
          text-align: center;
          display: inline-block;
          img {
            width: 20px;
          }
        }
        .tabClass {
          font-weight: bold;
            margin-right: 35px;
          color: #1bbf97;
          text-align: center;
          display: inline-block;
          img {
            width: 20px;
          }
        }
      }
    }
  }
  .noSome {
    padding-top: 100px;
    height: 400px;
    text-align: center;
    img {
      height: 100px;
    }
  }
}
</style>