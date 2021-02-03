<template>
  <div class="approval">
    <inputTop :type="0" :placeholder="'请输入申请人'"></inputTop>

    <div class="approval-dtl">
      <div class="approval-dtl-top">
        <p
          :class="click==i?'click':''"
          v-for="(item,i) in tabName"
          :key="i"
          @click="clickTab(i)"
        >{{item.name}}</p>
      </div>

      <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
          error-text="请求失败，点击重新加载"
          finished-text="加载完成"
          :immediate-check="false"
          v-if="approvalList.length>0"
        >
          <appr-list :goods="approvalList" :click="click"></appr-list>
        </van-list>
        <div v-else class="noSome">
          <img src="@/assets/img/noSome.png" />
        </div>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { Icon, List, Search, Button, PullRefresh } from "vant";
import apprList from "./Child/list";
import inputTop from "@/components/topTitle";
import {
  getFunction,
  postFunction,
  putFunction,
  deleteFunction,
} from "@/utils/request";

export default {
  name: "approval",
  data() {
    return {
      tabName: [
        { name: "待我审批的" },
        { name: "我已审批的" },
        { name: "我发起的" },
      ],
      click: this.$route.query.type,
      isLoading: false,
      finished: false,
      loading: false,
      approvalList: [],
      url: [
        `/api/shoppe-api-service/moblie/order-review-management/pending-approval-list`,
        `/api/shoppe-api-service/moblie/order-review-management/approved-list`,
        `/api/shoppe-api-service/moblie/order-review-management/initiated-list`,
      ],
      query: {
        initiatorUsername: "",
        overTime: "",
        pageNum: 1,
        pageSize: 10,
        startTime: "",
      },
      total: 0,
    };
  },
  components: {
    apprList,
    inputTop,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
  },
  created() {
    this.$auth.os.lxapp && this.initplus();
    this.getList();
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
    getList(unloading) {
      postFunction(this.url[this.click], this.query, unloading).then((res) => {
        if (res.code == "000000") {
          this.approvalList = res.data.items;
          this.query.pageNum = res.data.pageNum;
          this.total = res.data.total;
          this.isLoading = false;
        }
      });
    },
    goBack() {
      this.$router.push({
        name: "User",
      });
    },
    clickTab(val) {
      this.click = String(val);
      this.query.pageNum = 1;
      this.loading = false;
      this.finished = false;
      this.getList();
    },
    onRefresh() {
      // 下拉刷新
      this.query.pageNum = 1;
      this.finished = false;
      this.getList(true);
    },
    onLoad() {
      setTimeout(() => {
        if (this.finished) return;
        if (this.query.pageNum < this.total / 10) {
          this.query.pageNum++;
          this.finished = true;
          postFunction(this.url[this.click], this.query).then((res) => {
            if (res.code == "000000") {
              this.approvalList = this.approvalList.concat(res.data.items);
              if (res.data.pageNum >= this.total / 10) {
                this.finished = true;
              } else {
                this.finished = false;
              }
            }
          });
          this.loading = false;
        } else {
          this.finished = true;
        }
      }, 1000);
    },

    getFocus() {
      this.$router.push({
        name: "approvalSearch",
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
.approval {
  font-size: 16px;
  background: #f8f8f8;
  .van-pull-refresh {
    min-height: calc(100vh - 110px);
    padding-top: 45px;
  }
  .approval-dtl {
    width: 100%;
    .approval-dtl-top {
      width: 100%;
      position: fixed;
      top: 61px;
      z-index: 100;
      background: #f8f8f8;
      display: flex;
      align-items: center;
      justify-content: space-around;
      font-size: 14px;
      line-height: 12px;
      padding:  16px 0;
      color: #979797;
      .click {
        position: relative;
        color: #1bbf97;
      font-weight: bold;
      }
    }

    .noSome {
      padding-top: 100px;
      text-align: center;
      > img {
        height: 100px;
        width: auto;
      }
    }
  }
}
</style>