<!--
 * @Descripttion: 
 * @version: 
 * @Author: ShiRuiCe
 * @Date: 2020-11-25 08:54:42
-->
<template>
  <div class="Activity">
    <inputTop
      :type="7"
      :badge="badge"
      :topTitletest="topTitle"
      :topText="topText"
      v-if="sonRefresh"
    ></inputTop>
    <img
      :src="apiHost + '/image' + ActivityData.bannerPictureFile"
      class="banner-img"
    />
    <div
      :style="{
        backgroundImage:
          'url(' +
          apiHost +
          '/image' +
          ActivityData.backgroundPictureFile +
          ')',
        backgroundSize: '375px',
        minHeight: dataListHeight,
      }"
    >
      <div class="hotgoods_body">
        <div class="hotgoods_list">
          <div
            v-for="(rem, index) in ActivityData.list"
            :key="index"
            class="list_all"
          >
            <div class="list_type">
              <div class="rem_type">
                {{ rem.navigationName }}
              </div>
              <span
                class="rem_span"
                @click="getMore(rem.categoryCode, rem.categoryLevel)"
                v-if="rem.categoryCode"
                >更多</span
              >
            </div>
            <div class="list_body">
              <div class="item_goods" v-for="(item, i) in rem.list" :key="i">
                <van-image
                  @click="details(item.skuId)"
                  :src="apiHost + '/image' + item.mainPictureUrl"
                  fit="contain"
                  class="img_boy"
                />
                <div class="goods-name">{{ item.name }}</div>
                <div class="goods-btom">
                  <span class="skuyqty_left">
                    <span style="font-size: 10px">￥</span>
                    {{ item.projectPrice }}
                  </span>
                  <span class="skuyqty_right">
                    <img
                      src="@/assets/img/car_mini.png"
                      @click="addcart(item.skuId)"
                      width="17px"
                    />
                  </span>
                </div>
              </div>
            </div>
            <br />
          </div>
        </div>
        <!-- <div v-else class="noSome">
        <img src="@/assets/img/noSome.png" />
      </div>-->
      </div>
    </div>

    <!-- 小球 -->
    <transition
      appear
      @before-appear="beforeEnter"
      @enter="enter"
      @after-appear="afterEnter"
      v-for="(item, index) in showMoveDot"
      :key="index.id"
    >
      <div
        class="move_dot"
        ref="ball"
        v-if="item"
        :style="{ top: elTop + 'px', left: elLeft + 'px' }"
      >
        <div></div>
        <!-- <img :src="imgurl+message.mainPictureUrl"> -->
      </div>
    </transition>
  </div>
</template>

<script>
import inputTop from "@/components/topTitle";
import {
  Grid,
  GridItem,
  Image as VanImage,
  Tag,
  Col,
  Row,
  Dialog,
  Toast,
} from "vant";
import {
  getFunction,
  postFunction,
  putFunction,
  deleteFunction,
} from "@/utils/request";
export default {
  name: "Activity",
  data() {
    return {
      topTitle: true,
      topText: "活动",
      sonRefresh: true,
      badge: "",
      dataListHeight: "",
      apiHost: this.$auth.os.lxapp
        ? process.env.VUE_APP_BASE_API
        : location.origin.indexOf("localhost") > -1
        ? "https://shoppemobiletest2.66123123.com"
        : location.origin,
      ActivityData: {
        activityName: "string",
        backgroundPictureFile: "",
        bannerPictureFile: "",
        id: 0,
        list: [
          {
            categoryCode: "string",
            categoryId: 0,
            id: 0,
            list: [],
            navigationName: "商品名称系列",
          },
        ],
      },
      bodyBgImage: "",
      url: {
        addcar: `/api/shoppe-api-service/mobile/cart/`,
        num: `/api/shoppe-api-service/mobile/cart/sku-count`,
        acvitityDetail: `/api/shoppe-api-service/mobile/acvitity/${this.$route.query.id}`,
      },
      badge: "",
      showMoveDot: [], //控制下落的小圆点显示隐藏
      elLeft: 0, //当前点击购物车按钮在网页中的绝对top值
      elTop: 0, //当前点击购物车按钮在网页中的绝对left值
    };
  },
  components: {
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [VanImage.name]: VanImage,
    [Tag.name]: Tag,
    [Col.name]: Col,
    [Row.name]: Row,
    [Toast.name]: Toast,
    [Dialog.name]: Dialog,
    inputTop,
  },
  created() {
    this.numData(this.url.num);
    this._acvitityDetail(this.url.acvitityDetail);
    this.dataListHeight = this.$store.state.app.dataListHeight - 110 + "px";
  },

  methods: {
    _acvitityDetail(url) {
      getFunction(url, true).then((res) => {
        this.ActivityData = res.data;
        this.topText = res.data.activityName;
        this.sonRefresh = false;
        this.$nextTick(() => {
          this.sonRefresh = true;
        });
      });
      // .error((res) => {
      //   this.$nextTick(() => {
      //     this.sonRefresh = true;
      //   });
      // });
    },
    getMore(code, level) {
      // console.log(code, level);
      // this.$router.push({
      //   name: "LibraryGoods",
      //   query: { code: code, level: level ? level : 2 },
      // });
      this.$router.push({
        name: "MoreList",
        query: { code: code },
      });
    },
    details(value) {
      this.$router.push({
        name: "ProductDetails",
        query: { skuId: value, type: null },
      });
    },
    beforeEnter(el) {
      console.log(1111);
      // 设置transform值
      el.style.opacity = 0;
      el.style.transform = "translate(0, 0)";
    },
    gointocart() {
      this.$router.push({ name: "Cart" });
    },
    goBack() {
      this.$router.push({
        name: "Home",
      });
    },
    enter(el, done) {
      console.log(1111);
      el.offsetWidth;
      // 获取徽标在页面中的位置
      let badgePosition = document
        .getElementById("badges")
        .getBoundingClientRect();
      // console.log(this.elTop,badgePosition.left,badgePosition.top,badgePosition.width,'badgePosition.left')
      // 300 500 该页面购物车位置 badgePosition.left
      const xDist = badgePosition.left - this.elLeft + badgePosition.width / 4;
      const yDist = badgePosition.top - this.elTop;
      el.style.transform = `translate(${xDist}px, ${yDist}px)`;
      el.style.transition = "all 0.8s cubic-bezier(0.12,0.78,0.53,0.92)";
      this.showMoveDot = this.showMoveDot.map((item) => false);
      done();
    },
    afterEnter(el) {
      console.log(1111);
      // 设置透明度
      el.style.opacity = 1;
    },
    addcart(val) {
      // this.showMoveDot = [...this.showMoveDot, true];
      //显示图片
      // this.addcartimg = "";
      this.elLeft = event.target.getBoundingClientRect().left;
      this.elTop = event.target.getBoundingClientRect().top;
      this.postcart(val, true);
    },
    postcart(val, unloading) {
      postFunction(this.url.addcar, { qty: 1, skuId: val }, unloading).then(
        (res) => {
          if (res.code == "000000") {
            this.showMoveDot = [...this.showMoveDot, true];
            this.$store.commit("cartNum", res.data.length);
            this.num();
          }
        }
      );
      // .catch(
      //   (function (error) {
      //     console.log(error);
      //   },
      //   () => {
      //     Toast.fail("数据异常");
      //     this.frequentlySku(this.url.frequentlySku, true);
      //   })
      // );
    },
    num() {
      getFunction(this.url.num).then((res) => {
        if (res.code == "000000") {
          console.log(res.data, 9991);
          this.$store.commit("cartNum", res.data);
          this.badge = res.data;
        }
      });
    },
    numData(url) {
      getFunction(url, true).then((res) => {
        if (res.code == "000000") {
          console.log(res.data, 9991);
          this.$store.commit("cartNum", res.data);
          this.badge = res.data;
        }
      });
    },
  },
  beforeCreate() {
    this.$store.commit("changefoot", false);
  },
};
</script>

<style scoped lang="less">
.Activity {
  font-size: 16px;
  overflow: hidden;
  .move_dot {
    width: 50px;
    height: 50px;
    /*border-radius: 50%;*/
    /*background-color: #00b38a;*/
    position: fixed;
    z-index: 9999;
    div {
      animation: 0.8s move ease-in-out;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: red;
    }
    img {
      animation: 0.8s move ease-in-out;
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    @keyframes move {
      0% {
        transform: scale(1);
      }
      25% {
        transform: scale(0.8);
      }
      50% {
        transform: scale(0.6);
      }
      75% {
        transform: scale(0.4);
      }
      100% {
        transform: scale(0.2);
      }
    }
    @-moz-keyframes move {
      0% {
        transform: scale(1);
      }
      25% {
        transform: scale(0.8);
      }
      50% {
        transform: scale(0.6);
      }
      75% {
        transform: scale(0.4);
      }
      100% {
        transform: scale(0.2);
      }
    }
    @-webkit-keyframes move {
      0% {
        transform: scale(1);
      }
      25% {
        transform: scale(0.8);
      }
      50% {
        transform: scale(0.6);
      }
      75% {
        transform: scale(0.4);
      }
      100% {
        transform: scale(0.2);
      }
    }
    @-o-keyframes move {
      0% {
        transform: scale(1);
      }
      25% {
        transform: scale(0.8);
      }
      50% {
        transform: scale(0.6);
      }
      75% {
        transform: scale(0.4);
      }
      100% {
        transform: scale(0.2);
      }
    }
  }
  .banner-img {
    margin-bottom: -5px;
    width: 375px;
    height: 195px;
  }
  .hotgoods_body {
    margin: 0 8px;
    // width: 350px;
    display: inline-block;

    .hotgoods_list {
      font-size: 26px;
      width: 360px;
      display: block;
      float: left;
      .list_all {
        display: block;
        .list_type {
          width: 100%;
          height: 50px;
          float: left;
          display: inline-block;

          .rem_type {
            background-size: 130px;
            margin: 0 auto;
            color: #fff;
            margin-left: 50px;
            width: 250px;
            text-align: center;
            // height: 35px;
            font-size: 15px;
            font-weight: bold;
            display: inline-block;
          }
          .rem_span {
            float: right;
            margin-top: 15px;
            font-size: 12px;
            margin-right: 20px;
            color: #dfdfdf;
          }
        }
        .list_body {
          display: inline-block;
          width: 360px;
        }
        .item_goods {
          width: 170px;
          height: 221px;
          background-size: 170px 240px;
          background: #fff;
          float: left;
          flex-direction: column;
          margin: 0 5px 10px 5px;
          box-sizing: border-box;
          border-radius: 8px;
          .img_boy {
            width: 120px;
            height: 120px;
            border: 1px solid #f8f8f8;
            border-radius: 4px;
            margin: 20px 0 0 25px;
          }
          .goods-name {
            width: 150px;
            height: 34px;
            line-height: 17px;
            margin: 8px 8px 0 8px;
            color: #333333;
            font-size: 13px;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .goods-btom {
            margin: 0 8px 8px 8px;

            font-size: 14px;
            .skuyqty_left {
              color: #2b684d;
            }
            .skuyqty_right {
              float: right;
            }
          }
          .count-number {
            font-size: 13px !important;
            color: #d7a269;
            text-align: center;
            line-height: 18px;
            margin-top: 6px;
          }
          .order_col {
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>