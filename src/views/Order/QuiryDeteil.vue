<template>
  <div class="quiryDeteil">
    <div class="order_bodytopss">
      <inputTop :type="2" :value="value" :placeholder="'搜索订单'"></inputTop>
    </div>

    <div class="body_detail">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        error-text="请求失败，点击重新加载"
        finished-text="加载完成"
        :immediate-check="false"
      >
        <pro-list
          :goods="RecommendGoods"
          :search="type"
          :fromData="fromData"
          @getType="getType"
          v-if="RecommendGoods.length > 0"
        ></pro-list>
        <div v-else class="noSome" v-show="showList">
          <img src="@/assets/img/noSome.png" />
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import { Icon, Search, Button, List } from "vant";
import inputTop from "@/components/topTitle";
import proList from "@/components/Goods";
import {
  getFunction,
  postFunction,
  putFunction,
  deleteFunction,
} from "@/utils/request";
export default {
  name: "QuiryDeteil",
  data() {
    return {
      showList: false,
      value: this.$route.query.value,
      type: Number(this.$route.query.search),
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
      RecommendGoods: [],
      url: "",
      finished: false,
      loading: false,
      RecommendGoods: [],
      pageNum: 0,
      pageSize: 10,
      fromData: "QuiryDeteil",
    };
  },
  components: {
    [Icon.name]: Icon,
    [Search.name]: Search,
    [Button.name]: Button,
    [List.name]: List,
    proList,
    inputTop,
  },
  created() {
    this.getType(this.type);
  },
  activated() {
    if (this.$route.query.update) {
      this.value = this.$route.query.value;
      this.type = Number(this.$route.query.search);
      this.getType(this.type);
    }
  },
  methods: {
    getType(val) {
      switch (val) {
        case 0:
          this.url = this.api.all;
          this.getAll();
          break;
        case 1:
          this.url = this.api.review;
          this.getAll();
          break;
        case 2:
          this.url = this.api.process;
          this.getAll();
          break;
        case 3:
          this.url = this.api.delivery;
          this.getAll();
          break;
        case 4:
          this.url = this.api.receipt;
          this.getAll();
          break;
        case 5:
          this.url = this.api.completed;
          this.getAll();
          break;
        case 6:
          this.url = this.api.rcancelledeview;
          this.getAll();
          break;
      }
    },
    getAll() {
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
      postFunction(this.url, data).then((res) => {
        if (res.code == "000000") {
          this.RecommendGoods = res.data.items;
          this.total = res.data.total;
          this.showList = true;
        }
      });
    },
    onLoad() {
      setTimeout(() => {
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
        postFunction(this.url, data, true).then((res) => {
          if (res.code == "000000") {
            res.data.items.forEach((element) => {
              this.RecommendGoods.push(element);
            });
          }
        });
        if (data.pageNum >= this.total / 10) {
          this.finished = true;
        }
        this.loading = false;
      }, 1000);
    },
    getFocus() {
      this.$router.push({
        name: "QueryOrder",
        query: { value: this.value, search: this.type },
      });
    },
    goOrder() {
      console.log("sssssss");
      this.$router.push({
        name: "QueryOrder",
        query: { search: this.type },
      });
    },
    goBack() {
      this.$router.push({
        name: "Order",
        query: { search: this.type },
      });
    },
  },
};
</script>

<style scoped lang='less'>
.quiryDeteil {
  font-size: 14px;
  width: 100%;
  height: 100%;
  .noSome {
    margin: 10px;
    margin-top: 100px;
    text-align: center;
    img {
      height: 100px;
    }
  }
}
</style>