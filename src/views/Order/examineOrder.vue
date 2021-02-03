<template>
  <div class="order_body">
    <div class="order_bodytop">
      <van-icon name="arrow-left" @click="goBack" />
      <div class="top_title">
        <span>审批列表</span>
      </div>
      <van-search
        v-model="value"
        shape="round"
        background="#ccc"
        placeholder="请输入搜索关键词"
        @focus="getFocus"
      >
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
    </div>

    <div class="body_detail">
      <div class="detail_top">
        <div
          v-for="(res,index) in tabName"
          :key="index"
          :class="tabCla==index?'tabClass':'tabClaed'"
          @click="goToTab(index)"
        >{{res.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon, Search } from "vant";

export default {
  name: "examineOrder",
  data() {
    return {
      value: "",
      type: this.$route.query.search ? this.$route.query.search : 0,
      tabCla: this.$route.query.search ? this.$route.query.search : 0,
      tabName: [
        { name: "待我审批的" },
        { name: "我已审批的" },
        { name: "我发起的" },
      ],
    };
  },
  components: {
    [Icon.name]: Icon,
    [Search.name]: Search,
  },
  mounted() {
    console.log(this.type);
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getFocus() {
      console.log("变身");
    },
    goToTab(val) {
      this.tabCla = val;
    },
  },

  beforeCreate() {
    this.$store.commit("changefoot", false);
  },
  beforeDestroy() {
    this.$store.commit("changefoot", true);
  },
};
</script>

<style scoped  lang="less">
.order_body {
  font-size: 14px;
  width: 100%;

  .order_bodytop {
    padding: 5px;
    .top_title {
      //   margin: 0 auto;
      margin-top: -20px;
      text-align: center;
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
        width: 30%;
        // margin: 5px;
        text-align: center;
        display: inline-block;
      }
      .tabClass {
        color: #399;
        width: 30%;
        text-align: center;

        // margin: 5px;
        display: inline-block;
      }
    }
  }
}
</style>