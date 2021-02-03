<template>
  <ul class="invoiceList">
    <li v-for="(res, index) in goods" :key="index" @click="goDetail(res)">
      <div class="invoice_List">
        <div class="invoice_top">
          <span class="top_left">
            <div class="img_div">
            <img src="@/assets/img/clock.png" />

            </div>
            {{ res.createTime }}
          </span>
          <span
            class="top_right"
            v-if="
              res.invoiceStatus != '已完成' && res.invoiceStatus != '已作废'
            "
            >{{ res.invoiceStatus }}</span
          >
          <span
            class="top_right"
            v-if="
              res.invoiceStatus == '已完成' || res.invoiceStatus == '已作废'
            "
            style="color: #ccc"
            >{{ res.invoiceStatus }}</span
          >
        </div>
        <div class="invoice_body">
          <div class="bode_list">
            <span class="list_lefttop">发票号码：</span>
            <span class="lisr_righttop">{{ res.invoiceNumber }}</span>
          </div>
          <div class="bode_list">
            <span class="list_left">对账单编号：</span>
            <span class="lisr_right">{{ res.no }}</span>
          </div>
          <div class="bode_list">
            <span class="list_left">发票抬头：</span>
            <span class="lisr_right">{{ res.invoiceTitle }}</span>
          </div>
          <div class="bode_list">
            <span class="list_left">发票金额：</span>
            <span class="lisr_right"
              ><span class="noe_span">￥</span
              ><span class="two_span">{{ res.invoiceAmount }}</span></span
            >
          </div>
          <div class="bode_list">
            <span class="list_left">发票类型：</span>
            <span class="lisr_right">{{ res.invoiceTypeText }}</span>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import {
  getFunction,
  postFunction,
  putFunction,
  deleteFunction,
} from "@/utils/request";

export default {
  name: "InvoiceList",
  props: {
    goods: Array,
    search: Number,
    type: Number,
    fromData: String,
  },
  methods: {
    goDetail(val) {
      this.$router.push({
        name: "InvoiceDetail",
        query: { id: val.id, fromData: this.fromData },
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
  font-size: 13px;
  .invoice_List {
    // height: 235px;
    width: 95%;
    display: flex;
    // float: left;
    height: 100%;
    flex-direction: column;
    border: 1px solid #efefef;
    border-radius: 16px;
    margin: 0 auto;
    margin-top: 12px;
    padding: 5px;
    background-color: #fff;
    box-sizing: border-box;
    box-shadow: 0px 2px 4px 4px rgba(240, 241, 240, 0.5);
    padding: 10px;
    .invoice_top {
      height: 20px;
      line-height: 20px;
      img {
        width: 15px;
      }
      .top_left {
        color: #979797;
        .img_div{
          float: left;
          margin-right: 5px;
          margin-top: 2px;
        }
      }
      .top_right {
        float: right;
        font-weight: bold;

        font-size: 13px;
        color: #1bbf97;
        // margin-right: 10px;
      }
    }
    .invoice_body {
      // margin-top: 5px;
      .bode_list {
        margin: 6px 0 0 0;
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
          .noe_span {
            font-size: 10px;
          }
          .two_span {
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>