<template>
  <div class="after-sale">
    <div class="input_top">
      <inputTop :type="0" :placeholder="'输入商品名/订单号'"></inputTop>
    </div>
    <div class="body_detail">
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
      <van-pull-refresh
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
            v-if="orderList.length > 0"
          >
            <goods-list :goods="orderList" @updateData="goToTab"></goods-list>
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
import goodsList from "@/components/AfterSaleGoodsList";
import loading from "@/components/Loading";
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
      tabCla: 0,
      tabName: [{ name: "申请售后" }, { name: "售后记录" }],
      url: "",
      finished: false,
      loading: false,
      orderList: [],
      pageNum: 1,
      pageSize: 10,
      isLoading: false,
      dataListHeight: "",
      loadMore: false,
    };
  },
  components: {
    [Icon.name]: Icon,
    [Search.name]: Search,
    [List.name]: List,
    [Button.name]: Button,
    [PullRefresh.name]: PullRefresh,
    goodsList,
    loading,
    inputTop,
  },
  mounted() {
    if (
      this.$route.query.tabType ||
      localStorage.getItem("afterSalesListType") != 0
    ) {
      this.goToTab(1);
    } else {
      this.goToTab(0);
    }
  },
  created() {
    this.$auth.os.lxapp && this.initplus();
    this.dataListHeight = this.$store.state.app.dataListHeight + 55 + "px";
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
      this.goToTab(this.tabCla);
    },
    getFocus() {},
    onSearch(data) {
      this.value = data;
      if (this.tabCla) {
        this.getRecord();
      } else {
        this.getAllOrder();
      }
    },
    onLoad() {
      setTimeout(() => {
        if (this.pageNum < this.total / 10) {
          this.pageNum++;
          this.loadMore = true;
          if (this.tabCla) {
            this.getRecord();
          } else {
            this.getAllOrder();
          }
          if (data.pageNum >= this.total / 10) {
            this.finished = true;
          }
          this.loading = false;
        } else {
          this.finished = true;
        }
      }, 3000);
    },
    //获取所有订单列表
    getAllOrder() {
      this.pageNum = 1;
      var data = {
        customerOrderNoOrSkuName: this.value,
        pageNum: this.pageNum,
        pageSize: 10,
      };
      postFunction(
        "/api/shoppe-api-service/mobile/after-sales/list",
        data,
        this.loadMore,
      ).then(res => {
        if (res.code == "000000") {
          this.orderList = this.loadMore
            ? this.orderList.concat(res.data.items)
            : res.data.items;
          this.total = res.data.total;
          this.isLoading = false;
          this.finished = true;
          this.loading = false;
          this.listShow = true;
        }
      });
    },
    //获取售后记录列表
    getRecord() {
      var data = {
        customerOrderNoOrSkuName: this.value,
        pageNum: this.pageNum,
        pageSize: 10,
      };
      postFunction(
        "/api/shoppe-api-service/mobile/after-sales/log/list",
        data,
        this.loadMore,
      ).then(res => {
        if (res.code == "000000") {
          this.orderList = this.loadMore
            ? this.orderList.concat(res.data.items)
            : res.data.items;
          this.total = res.data.total;
          this.isLoading = false;
          this.loading = false;
          this.listShow = true;
        }
      });
    },
    //tab切换
    goToTab(val) {
      this.loadMore = false;
      this.orderList = [];
      this.tabCla = val;
      this.finished = false;
      this.listShow = false;
      if (val) {
        this.getRecord();
      } else {
        this.getAllOrder();
      }
    },
  },

  beforeCreate() {
    this.$store.commit("changefoot", false);
  },
};
</script>

<style scoped  lang="less">
.after-sale {
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
    .detail_top {
      display: flex;
      > div {
        height: 46px;
        line-height: 46px;
        font-size: 14px;
      }
      .tabClaed {
        width: 50%;
        margin: 0 10px;
        color: #333333;
        text-align: center;
        display: inline-block;
        img {
          width: 10px;
        }
      }
      .tabClass {
        width: 50%;
        font-weight: 600;
        color: #1bbf97;
        margin: 0 10px;
        text-align: center;
        display: inline-block;
        img {
          width: 20px;
        }
      }
    }
  }
  .van-pull-refresh {
    // display: flex;
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