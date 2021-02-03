<template>
  <div class="Logistics">
    <!-- <div class="order_bodytop">
      <van-icon name="arrow-left" @click="goBack" />
      <div class="top_title">
        <span>物流信息</span>
      </div>
    </div>-->
    <inputTop :type="3"></inputTop>

    <div class="Logistics_body">
      <div class="dispatch_bill">
        <div class="dispatch_spanmini" :style="{width:scrollseWdith}">
          <span
            v-for="(res,index) in informationList"
            :key="index"
            @click="getType(index)"
            :class="tabCla==index?'span_index':'span_tabCla'"
          >发货单{{index+1}}</span>
        </div>
      </div>

      <div class="Logistics_Data">
        <div class="data_top">
          <!-- <span>订单号:</span> -->
          <span class="span_left">{{informationData.orderNo}}</span>
          <!-- <span>订单配送状态:</span> -->
          <span class="span_right">{{informationData.sendStatusText}}</span>
        </div>
        <van-steps direction="vertical" :active="0">
          <van-step
            v-for="(res,index) in informationData.orderDeliveryStatusDetailList"
            :key="index"
          >
            <div class="div_List">
              <span class="span_left">{{res.statusText}}</span>
              <span class="span_right">{{res.statusTimeName}}</span>
            </div>

            <p>{{res.desc}}</p>
            <!-- <p>{{res.statusDate}} {{res.desc}}</p> -->
          </van-step>
        </van-steps>
        <div class="data_btm"></div>
      </div>
      <div class="detail_center">
        <!-- <pro-list :goods="informationData.orderItemListDTO" :search="type" :type="1"></pro-list> -->
        <div class="title">
          <div class="title-left">
            <div class="left-icon"></div>
            <div>商品信息</div>
          </div>
        </div>
        <ul>
          <li v-for="(res,index) in informationData.orderItemListDTO" :key="index">
            <div class="goods_bidy">
              <div class="goods_img">
                <!-- 'https://lxerptest.66123123.com/image'+item.imagePath -->

                <!-- src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3238317745,514710292&fm=26&gp=0.jpg" -->
                <van-image :src="apiHost+'/image'+res.imagePath" fit="contain" class="img_boy" />
              </div>
              <div class="goods-name">{{res.skuName}}</div>
            </div>
            <div class="goods-btom">
              <span class="skuyqty">
                <span style="font-size:10px">￥</span>
                {{res.currentPrice}}
              </span>
              <br />
              <span class="skuyqty">
                <span>x{{res.itemQty}}</span>
              </span>
            </div>
            <div class="foot_div">
              <span class="foot_skuyqty">
                ￥
                <span class="foot_sku">{{res.totalPrice}}</span>
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Step, Steps, Icon, Image as VanImage } from "vant";
import proList from "@/components/Goods";
import inputTop from "@/components/topTitle";
import { returnFloat } from "@/utils/c_methods";

import {
  getFunction,
  postFunction,
  putFunction,
  deleteFunction,
} from "@/utils/request";
export default {
  name: "Logistics",
  data() {
    return {
      api: {
        information: `/api/shoppe-api-service/order-management/${this.$route.query.orderId}/logistics/information`,
      },
      type: Number(this.$route.query.search),
      informationList: [],
      informationData: {},
      informationLenght: this.$route.query.informationLenght,
      tabCla: 0,
      apiHost: this.$auth.os.lxapp
        ? process.env.VUE_APP_BASE_API
        : location.origin.indexOf("localhost") > -1
        ? "https://shoppemobiletest3.66123123.com"
        : location.origin,
    };
  },
  components: {
    [Step.name]: Step,
    [Steps.name]: Steps,
    [Icon.name]: Icon,
    [VanImage.name]: VanImage,
    proList,
    inputTop,
  },
  created() {
    this.information();
  },
  computed: {
    scrollseWdith: function () {
      return this.informationLenght * 0.83 + "rem";
    },
  },
  methods: {
    getType(val) {
      this.informationData = this.informationList[val];
      this.tabCla = val
    },

    goBack() {
      if (this.$route.query.type == 0) {
        this.$router.push({
          name: "Order",
          query: { search: this.$route.query.search },
        });
      }
      if (this.$route.query.type == 1) {
        this.$router.push({
          name: "OrderDetail",
          query: {
            search: this.$route.query.search,
            customerOrderId: this.$route.query.customerOrderId,
            orderId: this.$route.query.orderId,
          },
        });
      }
    },
    information() {
      getFunction(this.api.information).then((res) => {
        if (res.code == "000000") {
          this.informationList = res.data;
          console.log(res.data)
          for (var i = 0; i < this.informationList.length; i++) {
            console.log(this.informationList[i].orderItemListDTO)
            for (
              var j = 0;
              j < this.informationList[i].orderItemListDTO.length;
              j++
            ) {
              this.informationList[i].orderItemListDTO[
                j
              ].totalPrice = returnFloat(
                this.informationList[i].orderItemListDTO[j].totalPrice
              );
              this.informationList[i].orderItemListDTO[
                j
              ].currentPrice = returnFloat(
                this.informationList[i].orderItemListDTO[j].currentPrice
              );
              // this.informationList[i].orderItemListDTO[j].totalPrice=returnFloat(this.informationList[i].orderItemListDTO[j].totalPrice)
            }
          }
          this.informationData = this.informationList[0];
          this.informationLenght = res.data.lenght;
        }
      });
    },
  },
  beforeCreate() {
    this.$store.commit("changefoot", false);
  },
};
</script>

<style scoped lang='less'>
.Logistics {
  font-size: 16px;
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
  .Logistics_body {
    border-radius: 10px;
    .dispatch_bill {
      margin: 0 auto;
      width: 300px;
      overflow-y: hidden;
      overflow-x: auto;
      .dispatch_spanmini {
        margin: 0 auto;
        .span_index {
          margin-right: 10px;
          color: #1bbf97;
        }
        .span_tabCla {
          margin-right: 10px;
        }
      }
      .dispatch_spanmax {
        margin: 0 auto;
        .span_index {
          margin-right: 10px;
        }
      }
    }
    .Logistics_Data {
      width: 90%;
      border-radius: 10px;
      background: #fff;
      margin: 10px auto;
      //   padding-top: 10px;
      box-shadow: 0px 2px 4px 4px rgba(240, 241, 240, 0.5);
      .data_top {
        padding-top: 10px;
        .span_left {
          margin-left: 10px;
          float: left;
          font-weight: 500;
          font-size: 13px;
          color: #979797;
        }
        .span_right {
          //   float: right;
          margin-left: 120px;
          font-weight: 500;
          font-size: 13px;
        }
      }
      .data_btm {
        height: 10px;
      }
      .van-steps {
        margin-bottom: 10px;
      }
      .div_List {
        .span_left {
          font-size: 16px;
        }
        .span_right {
          margin-left: 90px;
        }
      }
    }
    .detail_center {
      width: 350px;
      margin: 10px 12px;
      display: flex;
      float: left;
      flex-direction: column;
      border: 1px solid #efefef;
      border-radius: 6px;
      margin-bottom: 10px;
      padding: 10px;
      background-color: #fff;
      box-sizing: border-box;
      box-shadow: 0px 2px 4px 4px rgba(240, 241, 240, 0.5);
      .title {
        width: 100%;
        padding: 5px 5px 0 5px;
        display: flex;
        justify-content: space-between;
        color: #333333;
        box-sizing: border-box;
        .title-left {
          font-size: 18px !important;
          font-weight: bold;
          display: flex;
          align-items: center;
          .left-icon {
            width: 2px;
            height: 14px;
            background-color: #1bbf97;
            margin-right: 4.5px;
          }
        }
      }
      .goods_bidy {
        width: 100%;
        margin-top: 10px;
        display: flex;
        .goods_img {
          width: 90px;
          height: 90px;
          .img_boy {
            margin-left: 5px;
            width: 80px;
            height: 80px;
          }
        }

        .goods-name {
          width: 145px;
          height: 38px;
          margin-left: 5px;
          font-size: 14px;
          color: #333333;
          font-weight: 500;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
      .list_Conceal {
        text-align: center;
        img {
          width: 20px;
          margin-right: 10px;
        }
      }
      .goods_imgbidy {
        width: 100%;
        margin-top: 10px;
        .img_boy {
          margin-left: 15px;
          display: flex;
          float: left;
          width: 80px;
          height: 80px;
        }
      }
      .goods_imgdian {
        height: 80px;
        line-height: 80px;
        margin-left: 15px;
      }
      .goods-btom {
        float: right;
        margin-right: 10px;
        font-size: 14px;
        right: 0px;
        margin-top: -90px;
        text-align: right;
        color: #979797;
      }
      .foot_div {
        // float: right;
        text-align: right;
        margin-right: 10px;
        margin-top: -30px;
        margin-bottom: 15px;
        .foot_buttom {
          .foot_but {
            border-radius: 50px;
            margin-left: 10px;
            padding: 5px 15px;
            border: 1px solid #333;
            font-weight: 500;
          }
          .foot_butnoe {
            background: #fff;
          }
          .foot_buttwo {
            background: #1bbf97;
            border-color: #1bbf97;
            color: #fff;
            font-weight: 500;
          }
        }
        .foot_skuyqty {
          font-size: 10px;
          font-weight: 500;
          color: #666;
          .foot_sku {
            font-size: 16px;
            color: #333333;
          }
        }
      }
      .count-number {
        font-size: 13px !important;
        color: #d7a269;
        text-align: center;
        line-height: 18px;
        margin-top: 6px;
      }
      .items_top {
        .items_lestTop {
          float: left;
        }
        .items_rightTop {
          float: right;
        }
      }
      .order_col {
        font-size: 16px;
      }
      .div_Total {
        right: 0;
        text-align: right;
        height: 30px;
        margin-right: 10px;
        .span_left {
          font-size: 10px;
        }
        .span_right {
          color: #fc7210;
        }
      }
    }
  }
}
</style>