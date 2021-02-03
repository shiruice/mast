<template>
  <div class="type-select">
    <div>
      <inputTop :type="3"></inputTop>
    </div>
    <div class="detaill_body">
      <div class="detail_center">
        <span>退换货商品</span>
        <div class="dspl">
          <div class="goods_img">
            <van-image
              :src="apiHost + '/image' + sku.imagePath"
              fit="contain"
              class="img_boy"
            />
          </div>
          <div class="goods-info">
            <span class="goods-name">{{ sku.skuName }}</span>
            <span>数量：{{ sku.itemQty }}</span>
            <div class="all"><i>￥</i>{{ sku.currentPrice }}</div>
          </div>
        </div>
      </div>
      <div class="type-cell">
        <img
          class="return-img"
          src="@/assets/img/return_afterSales.png"
          alt=""
        />
        <img
          class="exchange-img"
          src="@/assets/img/exchange_afterSales.png"
          alt=""
        />
        <Cell title="退货" icon="circle" is-link @click="jumpTo('return')" />
        <Cell title="换货" icon="circle" is-link @click="jumpTo('exchange')" />
      </div>
    </div>
  </div>
</template>

<script>
import { Cell, Image as VanImage } from "vant";
import inputTop from "@/components/topTitle";

export default {
  name: "TypeSelect",
  data() {
    return {
      sku: {},
      apiHost: this.$auth.os.lxapp
        ? process.env.VUE_APP_BASE_API
        : location.origin.indexOf("localhost") > -1
        ? "https://shoppemobiletest2.66123123.com/"
        : location.origin,
    };
  },
  components: {
    Cell,
    inputTop,
    [VanImage.name]: VanImage,
  },
  mounted() {
    this.sku = JSON.parse(localStorage.getItem("afterSalesOrder")).goodsInfo;
  },
  methods: {
    jumpTo(type) {
      if (type == "return") {
        this.$router.push({
          name: "returnRequest",
          query: {
            type: "RETURN",
            init: true,
          },
        });
      } else {
        this.$router.push({
          name: "returnRequest",
          query: {
            type: "EXCHANGE",
            init: true,
          },
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
.type-select {
  font-size: 16px;
  height: 100%;
  background: #f8f8f8;
  .detaill_body {
    margin: 0 10px;
    .detail_center {
      margin: 12px 0;
      padding: 5px 10px;
      background: #ffffff;
      box-shadow: 0px 2px 4px 4px rgba(240, 241, 240, 0.5);
      border-radius: 8px;
      > span {
        font-size: 14px;
        font-weight: 600;
      }
      .title {
        width: 100%;
        padding: 5px 5px 0 15px;
        display: flex;
        justify-content: space-between;
        color: #333333;
        box-sizing: border-box;
        .title-left {
          font-size: 14px !important;
          font-weight: bold;
          display: flex;
          align-items: center;
        }
      }
      .dspl {
        width: 100%;
        margin-top: 10px;
        display: flex;
        > span {
          display: block;
          width: 30px;
          height: 20px;
          font-size: 12px;
          color: #666;
        }
        .goods_img {
          width: 90px;
          height: 90px;
          .img_boy {
            margin-left: 5px;
            width: 80px;
            height: 80px;
          }
        }
        .goods-info {
          width: calc(100% - 105px);
          height: 90px;
          margin-left: 8px;
          font-size: 14px;
          color: #333333;
          position: relative;
          > span:nth-child(2) {
            font-size: 12px;
            color: #979797;
          }
          .goods-name {
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .all {
            text-align: right;
            right: 5px;
            bottom: 5px;
            font-size: 18px;
            color: #fe5e41;
            font-weight: bold;
            position: absolute;
            i {
              font-size: 12px;
            }
          }
        }
      }
    }
    .type-cell {
      position: relative;
      background: #ffffff;
      box-shadow: 0px 2px 4px 4px rgba(240, 241, 240, 0.5);
      border-radius: 8px;
      overflow: hidden;
      .van-cell {
        padding: 14px 12px;
      }
      .return-img {
        position: absolute;
        top: 18px;
        left: 12px;
        z-index: 1;
        width: 16px;
      }
      .exchange-img {
        position: absolute;
        top: 70px;
        left: 12px;
        z-index: 1;
        width: 16px;
      }
    }
  }
}
</style>