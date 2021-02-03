<template>
  <ul class="invoiceList">
    <li v-for="(res,index) in goods" :key="index" @click="goDetail(res)">
      <div class="invoice_List">
        <div class="invoice_top" v-show="type!=3" style="margin-top:5px;    margin-left: 5px;">
            <van-icon style="vertical-align: middle" name="clock-o" color="#1BBF97" size="15" />
            <span style="margin-left: 5px;    vertical-align: middle;color: #979797;font-size: 14px;">{{res.createTime}}</span>
          <span class="top_right">{{res.invoiceStatus}}</span>
          <span class="top_right"  v-if="res.statusText=='对账完成'" style="font-size:14px;color:#979797;font-weight: bold;" >{{res.statusText}}</span>
          <span class="top_right"  v-else style="color:#1bbf97;font-size:14px;font-weight: bold;">{{res.statusText}}</span>
        </div>
        
        <div class="invoice_body">
          <div class="bode_list" style="margin-top: 3px;">
            <span style="font-size:16px" class="list_lefttop">{{res.name}}</span>
            <span class="lisr_righttop"></span>
           <span class="top_right" v-show="type==3" v-if="res.statusText=='对账完成'" style="font-size:14px;color:#979797;font-weight: bold;float:right" >{{res.statusText}}</span>
           <span class="top_right" v-show="type==3" v-else style="color:#1bbf97;font-size:14px;font-weight: bold;float:right">{{res.statusText}}</span>
          </div>
          <div class="bode_list">
            <span class="list_left">对账单编号：</span>
            <span class="lisr_right">{{res.no}}</span>
          </div>
          <div class="bode_list">
            <span class="list_left">金额：</span>
            <span class="lisr_right"><i style="font-size:10px">¥ </i>{{res.amount}}</span>
          </div>
          <div class="bode_list">
            <span class="list_left">未开票金额：</span>
            <span class="lisr_right"><i style="font-size:10px">¥ </i>{{res.amountNoInvoiced}}</span>
          </div>
          <div class="bode_list">
            <span class="list_left">已开票金额：</span>
            <span class="lisr_right"><i style="font-size:10px">¥ </i>{{res.amountInvoiced}}</span>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import { Icon } from "vant";
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
  },
   components: {
    [Icon.name]: Icon,
  },
  methods: {
  
    goDetail(val) {
      this.$router.push({
        name: "BillDetail",
        query: { id: val.id },
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

  .invoice_List {
    // height: 235px;
    width: 92%;
    display: flex;
    // float: left;
    height: 100%;
    flex-direction: column;
    border: 1px solid #efefef;
    border-radius: 16px;
    margin: 10px auto;
    padding: 7px;
    background-color: #fff;
    box-sizing: border-box;
    box-shadow: 0px 2px 4px 4px rgba(240, 241, 240, 0.5);
    .invoice_top {
      height: 20px;
      line-height: 20px;
     margin-right: 5px;
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
      margin: 2px 5px 1px 5px;
      .bode_list {
        margin: 4px 0;
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
          font-size: 14px;
        }
        .lisr_right {
          float: right;
          font-size: 14px;
        }
      }
    }
  }
}
</style>