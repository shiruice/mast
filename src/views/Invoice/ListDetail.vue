<template>
  <div class="listDetail">
    <inputTop :type="2" :value="value" :placeholder="'输入发票号码'"></inputTop>

    <div class="body_detail">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        error-text="请求失败，点击重新加载"
        finished-text="加载完成"
        :immediate-check="false"
      >
        <invo-list
          :goods="RecommendList"
          :search="type"
          v-if="RecommendList.length > 0"
        ></invo-list>
        <div v-else class="noSome" v-show="showList">
          <img src="@/assets/img/noSome.png" />
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import invoList from "./Child/InvoiceList";
import { Icon, List, Search, Button, Popup } from "vant";
import inputTop from "@/components/topTitle";
import {
  getFunction,
  postFunction,
  putFunction,
  deleteFunction,
} from "@/utils/request";
export default {
  name: "ListDetail",
  data() {
    return {
      showList: false,
      value: this.$route.query.value,
      type: Number(this.$route.query.search),
      show: true,
      finished: false,
      loading: false,
      RecommendList: [],
      listData: [],
      RecommendList: [],
      finished: false,
      loading: false,
      api: {
        all: `/api/shoppe-api-service/moblie/invoice/management/all/list`, //全部
        fail: `/api/shoppe-api-service/moblie/invoice/management/fail/list`, //已作废
        invoiced: `/api/shoppe-api-service/moblie/invoice/management/invoiced/list`, //已开票
        invoicing: `/api/shoppe-api-service/moblie/invoice/management/invoicing/list`, //待开票
        posting: `/api/shoppe-api-service/moblie/invoice/management/posting/list`, //邮寄中
        completed: `/api/shoppe-api-service/moblie/invoice/management/completed/list`, //已完成
      },
    };
  },
  components: {
    [Icon.name]: Icon,
    [Search.name]: Search,
    [List.name]: List,
    [Button.name]: Button,
    [Popup.name]: Popup,
    invoList,
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
          this.url = this.api.invoicing;
          this.getAll();
          break;
        case 2:
          this.url = this.api.invoiced;
          this.getAll();
          break;
        case 3:
          this.url = this.api.posting;
          this.getAll();
          break;
        case 4:
          this.url = this.api.completed;
          this.getAll();
          break;
        case 5:
          this.url = this.api.fail;
          this.getAll();
          break;
      }
    },
    getAll() {
      this.pageNum = 1;
      var data = {
        invoiceNumber: this.$route.query.value,
        endTime: null,
        startTime: null,
        pageNum: this.pageNum,
        pageSize: 10,
      };
      postFunction(this.url, data).then((res) => {
        if (res.code == "000000") {
          this.RecommendList = res.data.items;
          this.total = res.data.total;
          this.isLoading = false;
          this.showList = true;
        }
      });
    },
    onLoad() {
      setTimeout(() => {
        if (this.pageNum < this.total / 10) {
          this.pageNum++;
          var data = {
            invoiceNumber: this.$route.query.value,
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
    times(val) {
      console.log(val);
      this.value = val;
    },
    onSearch() {
      console.log("kdsjh");
      this.$router.push({
        name: "ListDetail",
        query: { value: this.value, search: this.$route.query.search },
      });
    },
    getFocus() {
      this.$router.push({
        name: "SearchPage",
        query: { value: this.value, search: this.$route.query.search },
      });
    },
    goOrder() {
      this.$router.push({
        name: "SearchPage",
        query: { value: "", search: this.$route.query.search },
      });
    },
    goBack() {
      //   console.log("sssssss");
      if (this.$route.query.fromData) {
        this.$router.push({
          name: "InvoiceAdmin",
          query: { value: this.value, search: this.$route.query.search },
        });
      } else {
        this.$router.push({
          name: "InvoiceAdmin",
          query: { value: this.value, search: this.$route.query.search },
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
.listDetail {
  //   background: #fff;
  font-size: 16px;
  .order_bodytop {
    padding: 5px;
    .goReturn {
      font-size: 30px;
      font-weight: 100;
    }
    .top_title {
      //   margin: 0 auto;
      //   margin-top: -45px;
      text-align: center;
      width: 357px;

      .search-box {
        padding-top: 10px;
        width: 100%;
        display: flex;
        justify-content: space-around;
        .div_goBack {
          line-height: 42px;
          margin-right: 10px;
          //   margin-top: -35px;
        }
        .input-search-icon {
          width: 330px;
          height: 32px;
          float: right;
          position: relative;
          .van-search-input {
            width: 330px;
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
          .icon-imgRight {
            width: 15px;
            height: 15px;
            position: absolute;
            right: 12px;
            top: 8px;
          }
        }
        .search-button {
          width: 64px;
          height: 32px;
          font-size: 14px;
          color: #333333;
          line-height: 32px;
          border-radius: 16px;
          color: #fff;
          background: #1bbf97;
          text-align: center;
        }
      }
    }
    .van-search {
      width: 100%;
    }
    // margin: 0 auto;
  }
  .noSome {
    margin: 10px;
    text-align: center;
    padding-top: 100px;
    img {
      height: 100px;
    }
  }
}
</style>