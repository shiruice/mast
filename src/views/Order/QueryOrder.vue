<template>
  <div class="order_body">
    <!-- <div class="order_bodytop"> -->
    <!-- <div class="top_title">
        <div class="search-box">
          <div @click="goOrder" class="div_goBack">
            <img src="@/assets/img/goBack.png" height="20px" />
          </div>
          <div class="input-search-icon">
            <input v-model="value" class="van-search-input" v-focus="true" placeholder="搜索订单" />
            <img src="@/assets/img/big_b.png" class="icon-img" />
            <img src="@/assets/img/return.png" class="icon-imgRight" v-if="value" @click="goOrder" />
          </div>
          <van-button class="search-button" @click="onSearch" :disabled="value?false:true">搜索</van-button>
        </div>
    </div>-->
    <!-- </div> -->
    <inputTop
      :type="1"
      :value="value"
      :placeholder="'输入商品名/订单号'"
      @getson="times"
    ></inputTop>
  </div>
</template>

<script>
import { Icon, Search, Button } from "vant";
import inputTop from "@/components/topTitle";

export default {
  name: "QueryOrder",

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
    };
  },
  directives: {
    focus: {
      inserted: function (el, { value }) {
        if (value) {
          el.focus();
        }
      },
    },
  },

  components: {
    [Icon.name]: Icon,
    [Search.name]: Search,
    [Button.name]: Button,
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
  mounted() {},
  activated() {
    this.value = this.$route.query.value ? this.$route.query.value : "";
    this.type = this.$route.query.search ? this.$route.query.search : 0;
    this.tabCla = this.$route.query.search ? this.$route.query.search : 0;
  },
  methods: {
    times(val) {
      console.log(val);
      this.value = val;
    },
    goBack() {
      this.$router.push({
        name: "Order",
        query: { search: this.$route.query.search },
      });
    },
    goToTab(val) {
      this.tabCla = val;
    },
    onSearch() {
      this.$router.push({
        name: "QuiryDeteil",
        query: {
          value: this.value,
          search: this.$route.query.search,
          update: true,
        },
      });
    },
    goOrder() {
      console.log("sssssss");
      this.$router.push({
        name: "Order",
      });
    },
  },

  beforeCreate() {
    this.$store.commit("changefoot", false);
  },
};
</script>

<style scoped lang='less'>
.order_body {
  font-size: 14px;
  width: 100%;
  height: 100%;
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
        }
        .input-search-icon {
          width: 250px;
          height: 32px;
          float: right;
          position: relative;
          .van-search-input {
            width: 250px;
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
  .body_detail {
    .detail_top {
      margin: 0 auto;
      width: 95%;
      // height: 50px;
      .tabClaed {
        width: 100px;
        margin: 5px;
      }
      .tabClass {
        color: #399;
        width: 100px;
        margin: 5px;
      }
    }
  }
}
</style>