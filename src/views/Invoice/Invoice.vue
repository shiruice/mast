<template>
  <div class="invoice">
    <inputTop :type="0" :placeholder="'输入发票号码'"></inputTop>
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
            <invo-list
              :goods="RecommendList"
              :search="type"
              :fromData="fromData"
            ></invo-list>
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
import invoList from "./Child/InvoiceList";
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
      fromData: "InvoiceAdmin",
      value: "",
      listShow: false,
      source: this.$route.query.source,
      type: Number(this.$route.query.search ? this.$route.query.search : 0),
      tabCla: this.$route.query.search ? this.$route.query.search : 0,
      tabName: [
        { name: "全部" },
        { name: "待开票" },
        { name: "已开票" },
        { name: "邮寄中" },
        { name: "已完成" },
        // { name: "已作废" },
      ],
      api: {
        all: `/api/shoppe-api-service/moblie/invoice/management/all/list`, //全部
        fail: `/api/shoppe-api-service/moblie/invoice/management/fail/list`, //已作废
        invoiced: `/api/shoppe-api-service/moblie/invoice/management/invoiced/list`, //已开票
        invoicing: `/api/shoppe-api-service/moblie/invoice/management/invoicing/list`, //待开票
        posting: `/api/shoppe-api-service/moblie/invoice/management/posting/list`, //邮寄中
        completed: `/api/shoppe-api-service/moblie/invoice/management/completed/list`, //已完成
      },
      url: "",
      finished: false,
      loading: false,
      RecommendGoods: [],
      pageNum: 0,
      pageSize: 10,
      RecommendList: [],
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
          this.url = this.api.all;
          this.getAll(this.api.all, unloading);
          break;
        case 1:
          this.url = this.api.invoicing;
          this.getAll(this.api.invoicing, unloading);
          break;
        case 2:
          this.url = this.api.invoiced;
          this.getAll(this.api.invoiced, unloading);
          break;
        case 3:
          this.url = this.api.posting;
          this.getAll(this.api.posting, unloading);
          break;
        case 4:
          this.url = this.api.completed;
          this.getAll(this.api.completed, unloading);
          break;
        case 5:
          this.url = this.api.fail;
          this.getAll(this.api.fail, unloading);
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
      // this.$router.push({
      //   name: "Calendar",
      // });
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
        name: "SearchPage",
        query: { search: this.type },
      });
    },
  },

  beforeCreate() {
    this.$store.commit("changefoot", false);
  },
};
</script>

<style scoped lang="less">
.invoice {
  font-size: 16px;
  height: 100%;
  background: #f8f8f8;
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
      height: 30px;
      line-height: 30px;
      width: 375px;
      display: inline-block;
      overflow-y: hidden;
      overflow-x: auto;
      .detail_top {
        // width: 430px;
        font-size: 14px;
        height: 30px;
        line-height: 30px;
        margin-top: 5px;
        display: flex;
        box-sizing: border-box;
        .tabClaed {
          width: 50px;
          margin: 0 10px;
          color: #979797;
          text-align: center;
          display: inline-block;
          img {
            width: 20px;
          }
        }
        .tabClass {
          color: #1bbf97;
          width: 50px;
          margin: 0 10px;
          text-align: center;
          display: inline-block;
          font-weight: bold;
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