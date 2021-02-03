<template>
  <ul class="after-sale-goods-list">
    <div class="item-goods" v-for="(item, index) in goods" :key="index">
      <div class="items_top">
        <span class="od-id" v-if="item.skus">
          订单编号：{{ item.customerOrderNo }}
        </span>
        <span class="od-id" v-if="!item.skus">
          售后编号：{{ item.customerAfterSalesOrderNo }}
        </span>
      </div>
      <div v-if="!item.skus">
        <div class="goods_bidy">
          <span class="goods_img">
            <van-image
              :src="apiHost + '/image' + item.imagePath"
              fit="contain"
              class="img_boy"
            />
          </span>
          <div @click="jumpToDetail(item)">
            <div class="goods-name">
              {{ item.skuName }}
            </div>
          </div>
          <div class="goods-detail">
            <span class="order-status">{{ item.status }}</span
            ><br />
            <i
              @click="cancel(item)"
              v-show="
                item.status == '待审核' ||
                item.status == '待收货' ||
                item.status == '待确认'
              "
              >取消申请</i
            >
          </div>
        </div>
      </div>
      <div
        v-if="item.skus"
        :class="[{ showAll: showAllId == item.customerOrderId }, 'hide']"
      >
        <div class="goods_bidy" v-for="res in item.skus" :key="res.skuId">
          <span class="goods_img">
            <van-image
              :src="apiHost + '/image' + res.imagePath"
              fit="contain"
              class="img_boy"
            />
          </span>
          <div>
            <div class="goods-name">
              {{ res.skuName }}
            </div>
            <span
              style="
                display: block;
                transform: scale(0.85);
                margin-left: -6px;
                font-size: 12px;
                color: #666;
              "
              >数量: {{ res.itemQty }}</span
            >
          </div>
          <div class="goods-detail">
            <span
              >￥ <b>{{ res.currentPrice }}</b></span
            ><br />
            <i @click="jumpToAfterSalePage(item, res)">申请售后</i>
          </div>
        </div>
      </div>
      <span class="items_lestTop" v-if="item.skus">
        下单时间：{{ item.createTime }}
      </span>
      <span class="items_lestTop" v-if="!item.skus">
        申请时间：{{ item.createTime }}
      </span>
      <div
        class="bottom"
        v-if="
          item.skus && item.skus.length > 3 && showAllId != item.customerOrderId
        "
      >
        <Icon name="arrow-down" size="15px" />
        <span @click="showAllId = item.customerOrderId">展示全部</span>
      </div>
      <div
        class="bottom"
        v-if="
          item.skus && item.skus.length > 3 && showAllId == item.customerOrderId
        "
      >
        <Icon name="arrow-up" size="15px" />
        <span @click="showAllId = 0">收起</span>
      </div>
    </div>
  </ul>
</template>
<script>
import { Image as VanImage, Icon, Dialog, Toast } from "vant";
import { putFunction } from "@/utils/request";
export default {
  name: "GoodsList",
  components: {
    [VanImage.name]: VanImage,
    Icon,
    Dialog,
  },
  data() {
    return {
      showAllId: 0,
      apiHost: this.$auth.os.lxapp
        ? process.env.VUE_APP_BASE_API
        : location.origin.indexOf("localhost") > -1
        ? "https://shoppemobiletest2.66123123.com"
        : location.origin,
    };
  },
  props: {
    goods: Array,
  },
  methods: {
    jumpToAfterSalePage(a, b) {
      let obj = {
        orderInfo: a,
        goodsInfo: b,
      };
      localStorage.setItem("afterSalesOrder", JSON.stringify(obj));
      this.$router.push({
        name: "typeSelect",
      });
    },
    jumpToDetail(data) {
      localStorage.setItem("afterSalesId", data.id);
      this.$router.push({
        name: "afterSalesDetail",
      });
    },
    cancel(data) {
      Dialog.confirm({
        title: "",
        message: "是否确认取消？",
      })
        .then(() => {
          putFunction(
            `/api/shoppe-api-service/mobile/after-sales/${data.id}/cancel`,
          ).then(res => {
            if (res.code == "000000") {
              Toast("取消成功");
              this.$emit("updateData", 1);
            }
          });
        })

        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>

<style scope lang='less'>
.after-sale-goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 2px 15px;
  font-size: 14px;
  box-sizing: border-box;
  .item-goods {
    width: 100%;
    display: flex;
    flex-direction: column;
    border: 1px solid #efefef;
    margin-bottom: 10px;
    padding: 12px;
    background-color: #fff;
    box-sizing: border-box;
    box-shadow: 0px 2px 4px 4px rgba(240, 241, 240, 0.5);
    border-radius: 8px;
    .hide {
      max-height: 300px;
      overflow: hidden;
    }
    .showAll {
      max-height: 10000px;
    }
    .items_lestTop {
      display: block;
      height: 20px;
      line-height: 20px;
      margin: 10px 0 2px 0;
      color: #016b51;
      font-size: 12px;
      padding-left: 10px;
      background: #ecf7f4;
      border-radius: 4px;
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
          border: 1px solid #f8f8f8;
        }
      }

      .goods-name {
        width: 145px;
        height: 32px;
        margin-left: 5px;
        margin-bottom: 5px;
        font-size: 12px;
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

      .goods-detail {
        position: relative;
        width: 90px;
        height: 90px;
        text-align: right;
        color: #666;
        font-size: 12px;
        position: relative;
        margin-top: -3px;
        .order-status {
          position: absolute;
          bottom: -31px;
          right: 10px;
          color: #016b51;
          display: inline-block;
          transform: scale(0.9);
        }
        span {
          display: inline-block;
          transform: scale(0.8);
        }
        b {
          font-size: 20px;
        }
        i {
          position: absolute;
          right: 0;
          bottom: 0;
          display: block;
          width: 66px;
          height: 20px;
          color: #333;
          line-height: 20px;
          text-align: center;
          font-size: 12px;
          border-radius: 10px;
          border: 1px solid #e4e4e7;
        }
      }
    }
    .goods_outbox {
      width: 100%;
      height: 80px;
      display: block;
      margin-top: 10px;
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
    .items_top {
      font-size: 12px;
      color: #333;
      padding: 0 5px;

      .items_lestTop {
        height: 20px;
        line-height: 20px;
        color: rgb(244, 168, 90);
      }
      .od-id {
        display: block;
        height: 12px;
        line-height: 12px;
      }
    }
    .bottom {
      text-align: center;
      color: #979797;
      span {
        display: inline-block;
        margin-left: 5px;
        margin-top: 6px;
      }
      i {
        vertical-align: middle;
      }
    }
  }
}
</style>
