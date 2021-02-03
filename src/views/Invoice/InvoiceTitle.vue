<template>
  <div class="invoiceTitle">
    <inputTop :type="5"></inputTop>

    <div class="body_detail">
      <div class="detail_title"></div>
      <van-pull-refresh
        v-model="isLoading"
        success-text="刷新成功"
        @refresh="onRefresh"
        :style="{ minHeight: dataListHeight }"
      >
        <van-list
          :finished="finished"
          error-text="请求失败，点击重新加载"
          finished-text="加载完成"
          :immediate-check="false"
          v-if="goods.length > 0"
        >
          <ul class="invoiceList">
            <li v-for="(res, index) in goods" :key="index">
              <div class="invoice_List">
                <div class="invoice_body">
                  <div class="bode_list">
                    <span class="list_lefttop" v-if="res.type == 0"
                      ><i
                        style="
                          background: #1bbf97;
                          width: 3px;
                          height: 13px;
                          border-radius:1px;
                          float: left;
                          display: inline-block;
                          margin-right: 7px;
                          margin-top: 5px;
                        "
                      ></i
                      >专票</span
                    >
                    <span class="list_lefttop" v-if="res.type == 1"
                      ><i
                        style="
                          background: #1bbf97;
                          width: 3px;
                          float: left;
                          border-radius:1px;
                          height: 13px;
                          display: inline-block;
                          margin-right: 7px;
                          margin-top: 5px;
                        "
                      ></i
                      >普票(电子发票)</span
                    >
                    <span class="lisr_righttop" @click="goDetail(res)"
                      >编辑</span
                    >
                  </div>
                  <div class="bode_list">
                    <span class="list_left">发票抬头：</span>
                    <span class="lisr_right">{{ res.invoiceTitle }}</span>
                  </div>
                  <div class="bode_list">
                    <span class="list_left">统一社会信用代码：</span>
                    <span class="lisr_right">{{ res.socialCreditCode }}</span>
                  </div>
                  <div class="bode_list">
                    <span class="list_left">地址：</span>
                    <span class="lisr_right">{{ res.addressOnInvoice }}</span>
                  </div>
                  <div class="bode_list">
                    <span class="list_left">电话：</span>
                    <span class="lisr_right">{{ res.phoneOnInvoice }}</span>
                  </div>
                  <div class="bode_list">
                    <span class="list_left">开户行：</span>
                    <span class="lisr_right">{{ res.bank }}</span>
                  </div>
                  <div class="bode_list">
                    <span class="list_left">账号：</span>
                    <span class="lisr_right">{{ res.accountNo }}</span>
                  </div>
                </div>

                <!-- <div class="invoice_body" v-if="res.type == 1">
                  <div class="bode_list">
                    <span class="list_lefttop"
                      ><i
                        style="
                          background: #1bbf97;
                          width: 3px;
                          height: 13px;
                          display: inline-block;
                          margin-right: 5px;
                        "
                      ></i
                      >普票(电子发票)</span
                    >
                    <span class="lisr_righttop" @click="goDetail(res)"
                      >编辑</span
                    >
                  </div>
                  <div class="bode_list">
                    <span class="list_left">发票抬头：</span>
                    <span class="lisr_right">{{ res.invoiceTitle }}</span>
                  </div>
                  <div class="bode_list">
                    <span class="list_left">统一社会信用代码：</span>
                    <span class="lisr_right">{{ res.socialCreditCode }}</span>
                  </div>
                </div> -->
              </div>
            </li>
          </ul>
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
import inputTop from "@/components/topTitle";

import {
  getFunction,
  postFunction,
  putFunction,
  deleteFunction,
} from "@/utils/request";
export default {
  name: "InvoiceTitle",
  data() {
    return {
      isLoading: false,
      dataListHeight: "",
      api: {
        invoice: `/api/shoppe-api-service/moblie/invoice/management/invoice-titles-list`,
      },
      goods: [],
      finished: false,
      loading: false,
    };
  },
  components: {
    [Icon.name]: Icon,
    [Search.name]: Search,
    [List.name]: List,
    [Button.name]: Button,
    [PullRefresh.name]: PullRefresh,
    inputTop,
  },
  created() {
    this.$auth.os.lxapp && this.initplus();
    this.getType(this.api.invoice);
    if (this.$route.query.source != undefined) {
      localStorage.setItem("source", this.$route.query.source);
    }
    this.dataListHeight = this.$store.state.app.dataListHeight + 55 + "px";
  },
  activated() {
    if (this.$route.params.isUpdate) {
      this.getType(this.api.invoice);
    }
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
      this.getType(this.api.invoice, true);
    },
    addList() {
      this.$router.push({
        name: "PushTitle",
      });
    },
    goDetail(val) {
      this.$router.push({
        name: "EditerTitle",
        query: { id: val.id },
      });
    },
    goBack() {
      if (localStorage.getItem("source") == 0) {
        localStorage.removeItem("source");
        this.$router.push({
          name: "Home",
        });
      } else {
        this.$router.push({
          name: "User",
        });
      }
    },
    getType(val, unloading) {
      getFunction(val, unloading).then((res) => {
        this.goods = res.data;
        this.isLoading = false;
      });
    },
  },
  beforeCreate() {
    this.$store.commit("changefoot", false);
  },
};
</script>

<style scoped lang="less">
.invoiceTitle {
  font-size: 16px;
  // margin-bottom: 50px;
  background: #f8f8f8;
  .invoiceList {
    .invoice_List {
      // height: 235px;
      width: 350px;
      display: flex;
      // float: left;
      flex-direction: column;
      border: 1px solid #efefef;
      border-radius: 16px;
      margin: 10px 12px;
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
        margin:0 10px;
        .bode_list {
          margin: 5px 0;
          .list_lefttop {
            color: #333333;
            font-size: 16px;
          }
          .lisr_righttop {
            float: right;
            font-size: 12px;
            font-weight: bold;
            color: #fc7210;
            border: 1px solid #fc7210;
            padding: 0 5px;
            border-radius: 5px;
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
  .noSome {
    margin-top: 100px;
    height: 400px;
    text-align: center;
    img {
      height: 100px;
    }
  }
}
</style>