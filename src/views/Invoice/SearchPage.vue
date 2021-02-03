<template>
  <div class="searchPage">
    <inputTop
      :type="1"
      :value="value"
      :placeholder="'输入发票号码'"
      @getson="times"
    ></inputTop>

    <!-- <div class="body_detail">
      <van-list
        v-model="loading"
        :finished="finished"
        error-text="请求失败，点击重新加载"
        finished-text="加载完成"
        :immediate-check="false"
      >
        
      </van-list>
    </div> -->
  </div>
</template>

<script>
import { Icon, Search, Button, List } from "vant";
import invoList from "./Child/InvoiceList";
import inputTop from "@/components/topTitle";
import {
  getFunction,
  postFunction,
  putFunction,
  deleteFunction,
} from "@/utils/request";
export default {
  name: "SearchPage",
  data() {
    return {
      value: this.$route.query.value ? this.$route.query.value : "",
      type: this.$route.query.search ? this.$route.query.search : 0,
      tabCla: this.$route.query.search ? this.$route.query.search : 0,
      disabled: false,
      tabName: [
        { name: "全部" },
        { name: "待审批" },
        { name: "待处理" },
        { name: "待发货" },
        { name: "待收货" },
        { name: "已完成" },
        { name: "已取消" },
      ],
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
    [Button.name]: Button,
    [List.name]: List,
    invoList,
    inputTop,
  },
  directives: {
    focus: {
      inserted: function (el, { value }) {
        console.log(el, { value });
        if (value) {
          el.focus();
        }
      },
    },
  },
  created() {
    // this.getType(this.type);
  },
  activated() {
    this.value = this.$route.query.value ? this.$route.query.value : "";
    this.type = this.$route.query.search ? this.$route.query.search : 0;
    this.tabCla = this.$route.query.search ? this.$route.query.search : 0;
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
        invoiceNumber: "",
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
        }
      });
    },
    times(val) {
      console.log(val);
      this.value = val;
    },
    onSearch() {
      console.log("kdsjh");
      this.$router.push({
        name: "ListDetail",
        query: { value: this.value, search: this.$route.query.search,update:true},
      });
    },
    goBack() {
      console.log("sssssss");
      this.$router.push({
        name: "InvoiceAdmin",
      });
    },
  },
  beforeCreate() {
    this.$store.commit("changefoot", false);
  },
};
</script>

<style scoped lang="less">
.searchPage {
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
          width: 270px;
          height: 32px;
          float: right;
          position: relative;
          .van-search-input {
            width: 270px;
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
    img {
      height: 100px;
    }
  }
}
</style>