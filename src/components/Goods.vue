<template>
  <ul class="goods-list-box">
    <div class="item-goods" v-for="(item, index) in goods" :key="index">
      <div class="items_top">
        <span class="items_lestTop">
          <img src="@/assets/img/clock.png" />
          {{ item.createTime }}
        </span>
        <span
          class="items_rightTop"
          :style="{ color: '#F74B37' }"
          v-if="item.statusName == '已取消'"
          >{{ item.statusName }}</span
        >
        <span
          class="items_rightTop"
          :style="{ color: '#333333' }"
          v-else-if="item.statusName == '已完成'"
        >
          <strong>{{ item.statusName }}</strong>
        </span>
        <span class="items_rightTop" :style="{ color: '#1BBF97' }" v-else>
          <strong>{{ item.statusName }}</strong>
        </span>
      </div>
      <div v-if="item.orderItemList">
        <div v-if="item.orderItemList.length < 3">
          <div
            v-for="(res, i) in item.orderItemList"
            :key="i"
            @click="goDetail(item, 1)"
          >
            <div class="goods_bidy">
              <span class="goods_img">
                <!-- :src="'https://lxerptest.66123123.com/image'+res.imagePath[0]" -->
                <!-- src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3238317745,514710292&fm=26&gp=0.jpg" -->

                <van-image
                  v-if="res.imagePath"
                  :src="apiHost + '/image' + res.imagePath[0]"
                  fit="contain"
                  class="img_boy"
                />
                <van-image
                  v-else
                  :src="apiHost + '/image' + res.imagePath"
                  fit="contain"
                  class="img_boy"
                />
              </span>
              <div class="goods-name">{{ res.skuName }}</div>
            </div>
            <div class="goods-btom" v-if="res.amount">
              <span class="skuyqtys">
                <span class="skuyqty_none">￥</span>
                {{ res.amount }}
              </span>
              <br />
              <span class="skuyqty">
                <span>x{{ res.itemQty }}</span>
              </span>
            </div>
            <div class="goods-btom" v-else>
              <span class="skuyqtys">
                <span class="skuyqty_none">￥</span>
                {{ res.currentPrice }}
              </span>
              <br />
              <span class="skuyqty">
                <span>x{{ res.itemQty }}</span>
              </span>
            </div>
          </div>
        </div>

        <div v-else class="goods_outbox">
          <div
            v-for="(res, i) in item.orderItemList"
            :key="i"
            @click="goDetail(item, 1)"
            v-if="i < 3"
          >
            <span class="goods_imgbidy">
              <!-- :src="'https://lxerptest.66123123.com/image'+res.imagePath[0]" -->
              <!-- src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3238317745,514710292&fm=26&gp=0.jpg" -->
              <van-image
                v-if="res.imagePath"
                :src="apiHost + '/image' + res.imagePath[0]"
                fit="contain"
                class="img_boy"
              />
              <van-image
                v-else
                :src="apiHost + '/image' + res.imagePath"
                fit="contain"
                class="img_boy"
              />
            </span>
          </div>
          <span class="goods_imgdian">...</span>
        </div>

        <div class="foot_div" v-if="!item.totalPrice">
          <span class="foot_skuyqty">
            <span style="margin-right: 10px">
              共
              <span class="foot_sku">{{ item.skuNum }}</span
              >件
            </span>
            总额：￥
            <span class="foot_sku">{{ item.amount }}</span>
          </span>
        </div>
        <div class="foot_div" v-else>
          <span class="foot_skuyqty">
            总额：￥
            <span class="foot_sku">{{ item.totalPrice }}</span>
          </span>
        </div>
        <div class="foot_div foot_diveg">
          <span class="foot_buttom">
            <span
              class="foot_but foot_butnoe"
              v-if="item.statusName == '待审批' || item.statusName == '待处理'"
              @click="_showPopup(item, 0)"
              >取消订单</span
            >
            <span
              class="foot_but foot_butnoe"
              v-if="item.statusName == '待发货' || item.statusName == '待收货'"
              @click="_showPopup(item, 1)"
              >取消订单</span
            >
            <span 
              class="foot_but foot_butnoe"
              v-if="item.statusName == '已完成' || item.statusName == '待收货'"
              @click="Logistics(item)"
              >查看物流</span
            >
            <span
              class="foot_but foot_buttwo"
              v-if="item.statusName == '待收货'"
              @click="logDialog(item)"
              >确认收货</span
            >
            <span
              class="foot_but foot_butnoe"
              @click="_comeAgain(item.orderItemList)"
              >再来一单</span
            >
          </span>
        </div>
      </div>
      <!-- 首页 -->
      <div v-else @click="goDetail(item, 0)">
        <div class="goods_bidy">
          <div class="goods_img">
            <!-- 'https://lxerptest.66123123.com/image'+item.imagePath -->
            <!-- src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3238317745,514710292&fm=26&gp=0.jpg" -->
            <van-image
              :src="apiHost + '/image' + item.imagePath"
              fit="contain"
              class="img_boy"
            />
          </div>
          <div class="goods-name">{{ item.skuName }}</div>
        </div>
        <div class="goods-btom" v-if="item.amount">
          <span class="skuyqtys">
            <span class="skuyqty_none">￥</span>
            {{ item.amount }}
          </span>
          <br />
          <span class="skuyqty">
            <span>x{{ item.skuItemQty }}</span>
          </span>
        </div>
        <div class="goods-btom" v-else>
          <span class="skuyqtys">
            <span class="skuyqty_none">￥</span>
            {{ item.skuAmount }}
          </span>
          <br />
          <span class="skuyqty">
            <span>x{{ item.skuItemQty }}</span>
          </span>
        </div>
        <div class="foot_div" v-if="!item.totalPrice">
          <span class="foot_skuyqty">
            共
            <span class="foot_sku">{{ item.totalItemQty }}</span
            >件 总额：￥
            <span class="foot_sku">{{ item.amountTotal }}</span>
          </span>
        </div>
        <div class="foot_div" v-else>
          <span class="foot_skuyqty">
            总额：￥
            <span class="foot_sku">{{ item.totalPrice }}</span>
          </span>
        </div>
      </div>
    </div>

    <van-popup
      v-model="showPopup"
      closeable
      round
      position="bottom"
      :style="{ height: '300px' }"
    >
      <div class="popup_div">
        <div class="popup_span">请选择取消订单原因</div>
        <div class="vanpopup">
          <van-radio-group v-model="radio">
            <van-cell-group v-for="(items, index) in dataRadio" :key="index">
              <van-cell
                :title="items.name"
                clickable
                @click="radio = items.name"
              >
                <template #right-icon>
                  <van-radio :name="items.name" />
                </template>
              </van-cell>
            </van-cell-group>
          </van-radio-group>
          <div class="vanpopup_button" @click="getRetuen">提交</div>
        </div>
      </div>
    </van-popup>
    <van-dialog
      v-model="showDialog"
      title="请联系客服"
      confirm-button-text="取消"
      confirm-button-color="#333"
    >
      <div class="van_dialog">
        <div
          v-if="callCenter.afterSale.phone"
          @click="devicedial(callCenter.afterSale.phone, 1)"
          :class="selected == 1 ? 'selected' : ''"
        >
          {{ callCenter.afterSale.name }}:{{ callCenter.afterSale.phone }}
        </div>
        <div 
          v-if="callCenter.exclusive.phone"
          @click="devicedial(callCenter.exclusive.phone, 2)"
          :class="selected == 2 ? 'selected' : ''"
        >
          {{ callCenter.exclusive.name }}:{{ callCenter.exclusive.phone }}
        </div>
      </div>
    </van-dialog>
  </ul>
</template>
<script>
import {
  Grid,
  Toast,
  GridItem,
  Image as VanImage,
  Tag,
  Col,
  Row,
  Dialog,
  Popup,
  RadioGroup,
  Radio,
  Cell,
  CellGroup,
} from "vant";
import { returnFloat } from "@/utils/c_methods";
import {
  getFunction,
  postFunction,
  putFunction,
  deleteFunction,
} from "@/utils/request";
export default {
  name: "GoodsList",
  data() {
    return {
      showPopup: false,
      showDialog: false,
      selected: 0,
      list: [],
      apiHost: this.$auth.os.lxapp
        ? process.env.VUE_APP_BASE_API
        : location.origin.indexOf("localhost") > -1
        ? "https://shoppemobiletest3.66123123.com"
        : location.origin,
      dataRadio: [
        { name: "订单信息有误，重新下单" },
        { name: "不想要了" },
        { name: "商品多选" },
        { name: "其他" },
      ],
      api: {
        managementCancel: `/api/shoppe-api-service/moblie/order-management/cancel`,
        cartBath: `/api/shoppe-api-service/mobile/cart/batch`,
        phone: `/api/shoppe-api-service/mobile/user/phone`,
      },
      radio: "",
      returnData: "",
      callCenter: {
        afterSale: {
          name: "售后专线",
          phone: "",
        },
        exclusive: {
          name: "专属客服",
          phone: "",
        },
      },
    };
  },
  // props: ["goods", "finished"],
  props: {
    goods: Array,
    search: Number,
    type: Number,
    fromData: String,
  },
  components: {
    [Toast.name]: Toast,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [VanImage.name]: VanImage,
    [Tag.name]: Tag,
    [Col.name]: Col,
    [Row.name]: Row,
    [Popup.name]: Popup,
    [Dialog.name]: Dialog,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Dialog.Component.name]: Dialog.Component,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
  },
  mounted() {},
  methods: {
    _comeAgain(val) {
      console.log(val);
      var data = [];
      val.forEach((element) => {
        var item = {
          skuId: element.skuId,
          qty: element.itemQty,
          checked: true,
        };
        data.push(item);
      });
      console.log(data);
      postFunction(this.api.cartBath, data).then((res) => {
        this.$router.push({
          name: "Cart",
        });
      });
    },
    devicedial(val, i) {
      console.log(val);
      this.selected = i;
      if (window.plus) {
        this.plusPhone(val);
      } else {
        document.addEventListener("plusPhone", this.plusPhone, false);
      }
    },
    plusPhone(val) {
      plus.device.dial(val, true);
    },
    getRetuen() {
      console.log(this.returnData, this.radio);
      var data = {
        customerOrderId: this.returnData.customerOrderId,
        description: this.radio,
        orderId: this.returnData.orderId,
        orderStatus: this.returnData.statusName,
        type: 0,
      };
      postFunction(this.api.managementCancel, data).then((res) => {
        if (res.code == "000000") {
          Toast.success("取消成功");
          this.$emit("getType", this.search);
          this.showPopup = false;
        }
      });
    },
    _showPopup(val, data) {
      if (data == 0) {
        this.showPopup = true;
        this.returnData = val;
      } else {
        getFunction(this.api.phone,true).then(res=>{
          this.callCenter.afterSale.phone = res.data.afterSalesPhone
          this.callCenter.exclusive.phone = res.data.servicePhone
        })
        this.showDialog = true;
      }
    },
    logDialog(val) {
      Dialog.confirm({
        title: "提示",
        message: "确认收货",
        confirmButtonColor: "#1BBF97",
      })
        .then(() => {
          console.log(val.orderId, this.search);
          var url = `/api/shoppe-api-service/order-management/${val.orderId}/confirm-goods`;
          getFunction(url).then((res) => {
            this.$emit("getType", this.search);
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    onLoad() {
      this.$emit("loadGoods");
    },
    goDetail(val, origin) {
      console.log(!this.type);
      if (!this.type) {
        this.$router.push({
          name: "OrderDetail",
          query: {
            search: this.search,
            customerOrderId: val.customerOrderId,
            orderId: val.orderId,
            origin: origin,
            fromData: this.fromData,
          },
        });
      }
    },
    Logistics(val) {
      var information = `/api/shoppe-api-service/order-management/${val.orderId}/logistics/information`;
      getFunction(information).then((res) => {
        if (res.code == "000000") {
          this.informationLenght = res.data.length;
          this.$router.push({
            name: "Logistics",
            query: {
              search: this.search,
              orderId: val.orderId,
              informationLenght: this.informationLenght,
              type: 0,
            },
          });
        }
      });
    },
    changecount(val) {
      return returnFloat(val);
    },
  },
};
</script>

<style scope lang='less'>
.goods-list-box {
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  // width: 375px;
  background: #f8f8f8;
  padding: 2px 15px;
  font-size: 14px;
  box-sizing: border-box;
  .item-goods {
    // height: 235px;
    width: 100%;
    display: flex;
    float: left;
    flex-direction: column;
    border: 1px solid #efefef;
    border-radius: 16px;
    margin-bottom: 10px;
    padding: 10px;
    background-color: #fff;
    box-sizing: border-box;
    box-shadow: 0px 2px 4px 4px rgba(240, 241, 240, 0.5);

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
        height: 34px;
        margin-left: 5px;
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
    .goods_imgdian {
      height: 80px;
      line-height: 80px;
      margin-left: 15px;
    }
    .goods-btom {
      color: #979797;
      float: right;
      right: 0px;
      margin-top: -90px;
      text-align: right;
      .skuyqtys {
        font-size: 14px;
        color: #333;
        display: inline-block;
        margin-bottom: 2px;
        .skuyqty_none {
          font-size: 10px;
        }
        .skuyqty_two {
          font-size: 14px;
        }
      }
      .skuyqty {
        font-size: 10px;

        .skuyqty_none {
          font-size: 10px;
        }
        .skuyqty_two {
          font-size: 14px;
        }
      }
    }
    .foot_diveg {
      margin-top: 16px;
    }
    .foot_div {
      // float: right;
      text-align: right;
      // margin-top: 10px;
      margin-bottom: 8px;
      .foot_buttom {
        .foot_but {
          font-size: 13px;
          border-radius: 50px;
          margin-left: 5px;
          padding: 5px 10px;
          border: 1px solid#E4E4E7;
          font-weight: 500;
          color: #333333;
        }
        .foot_butnoe {
          background: #fff;
        }
        .foot_buttwo {
          color: #1bbf97;
          font-weight: 500;
        }
      }
      .foot_skuyqty {
        font-size: 10px;
        font-weight: 600;
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
        height: 20px;
        display: flex;

        line-height: 20px;
        color: #979797;
        img {
          height: 15px;
          margin-right: 8px;
          margin-top: 2px;
        }
      }
      .items_rightTop {
        float: right;
        font-weight: bold;
        font-size: 13px;
      }
    }
    .order_col {
      font-size: 16px;
    }
  }
  .van_dialog {
    text-align: center;
    line-height: 30px;
  }
  .selected {
    color: #1bbf97;
  }
}
.popup_div {
  margin: 10px;
  .popup_span {
    margin: 0 auto;
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    color: #333;
  }
}
.van-radio__icon--checked .van-icon {
  background-color: #1bbf97;
  border-color: #1bbf97;
}
.vanpopup {
  margin: 10px 0;
}
.vanpopup_button {
  width: 200px;
  background: #1bbf97;
  margin: 0 auto;
  border-radius: 50px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
}
.tag-box {
  display: flex;
  width: 155px;
  margin-bottom: 4px;
}
.van-tag {
  margin-right: 7.5px;
  color: #f04919 !important;
}
</style>
