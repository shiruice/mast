<template>
  <div class="goods-contains">
    <inputTop
      :type="7"
      :badge="badge"
      class="inputTop"
      :topTitletest="topTitle"
      :topText="topText"
    ></inputTop>
    <div class="clear"></div>
    <div class="goods-contain">
      <div class="clear"></div>
      <van-pull-refresh
        v-model="isLoading"
        success-text="刷新成功"
        @refresh="onRefresh"
      >
        <div class="goods-list" v-show="goodsdata.length != 0">
          <ul>
            <van-list
              v-model="loading"
              :finished="finished"
              @load="onLoad"
              error-text="请求失败，点击重新加载"
              :immediate-check="false"
            >
              <div class="item_goodsLift">
                <li
                  class="item_goods"
                  v-for="(item, index) in listDataOdd"
                  :key="index"
                >
                  <van-image
                    @click="details(item.skuId)"
                    :src="apiHost + item.mainPictureUrl"
                    fit="contain"
                    class="img_boy"
                  />
                  <div class="good_name">
                    <div class="goods-name">{{ item.name }}</div>
                    <div class="goods-btom">
                      <span class="skuyqty_left">
                        <span style="font-size: 10px">￥</span
                        >{{ item.projectPrice }}
                      </span>
                      <span class="skuyqty_right">
                        <img
                          src="@/assets/img/g_plus.png"
                          @click="addcart(item.skuId)"
                          width="17px"
                        />
                      </span>
                    </div>
                    <div class="goods-underlined" v-if="item.underlinedPrice">
                      <span class="skuyqty_left" v-if="item.underlinedPrice">
                        <span style="font-size: 10px">￥</span>
                        {{ item.underlinedPrice }}
                      </span>
                    </div>
                  </div>
                </li>
              </div>

              <li
                class="item_goods"
                v-for="(item, index) in listDataEven"
                :key="index"
              >
                <van-image
                  @click="details(item.skuId)"
                  :src="apiHost + item.mainPictureUrl"
                  fit="contain"
                  class="img_boy"
                />
                <div class="good_name">
                  <div class="goods-name">{{ item.name }}</div>
                  <div class="goods-btom">
                    <span class="skuyqty_left">
                      <span style="font-size: 10px">￥</span
                      >{{ item.projectPrice }}
                    </span>
                    <span class="skuyqty_right">
                      <img
                        src="@/assets/img/g_plus.png"
                        @click="addcart(item.skuId)"
                        width="17px"
                      />
                    </span>
                  </div>
                  <div class="goods-underlined" v-if="item.underlinedPrice">
                    <span class="skuyqty_left" v-if="item.underlinedPrice">
                      <span style="font-size: 10px">￥</span>
                      {{ item.underlinedPrice }}
                    </span>
                  </div>
                </div>
              </li>
              <div class="clear"></div>
            </van-list>
          </ul>
        </div>
        <!-- </van-pull-refresh> -->
        <div class="goods-list" v-show="goodsdata.length == 0" v-if="listShow">
          <img class="noimg" src="@/assets/img/noSome.png" alt="" />
        </div>
      </van-pull-refresh>
    </div>
    <div class="clear"></div>
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
import {
  Search,
  List,
  Sidebar,
  SidebarItem,
  Button,
  Collapse,
  CollapseItem,
  Card,
  Tag,
  Image as VanImage,
  Icon,
  Toast,
  PullRefresh,
} from "vant";
import inputTop from "@/components/topTitle";
import GoodsItem from "./Component/GoodsItem/GoodsItem";
import {
  getFunction,
  postFunction,
  putFunction,
  deleteFunction,
} from "@/utils/request";
import { mapState } from "vuex";
import { returnFloat } from "@/utils/c_methods";
export default {
  name: "ProductList",
  data() {
    return {
      topTitle: true,
      topText: "商品列表",
      code: this.$route.query.code,
      type: this.$route.query.type,
      listShow: false,
      isLoading: false,
      loading: false,
      finished: false,
      pageNum: 1,
      total: 0,
      badge: "",
      goodsdata: [],
      listDataOdd: [],
      listDataEven: [],
      url: {
        navigation: `/api/shoppe-api-service/mobile/user/detail`,
        list: `/api/shoppe-api-service/mobile/acvitity/more`,
        addcar: `/api/shoppe-api-service/mobile/cart/`,
        num: `/api/shoppe-api-service/mobile/cart/sku-count`,
        columnSkuList: `/api/shoppe-api-service/mobile/sku/column-sku-list`,
      },
      orderBy: "DES",
      apiHost:
        (this.$auth.os.lxapp
          ? process.env.VUE_APP_BASE_API
          : location.origin.indexOf("localhost") > -1
          ? "https://shoppemobiletest3.66123123.com"
          : location.origin) + "/image",
      showMoveDot: [], //控制下落的小圆点显示隐藏
      elLeft: 0, //当前点击购物车按钮在网页中的绝对top值
      elTop: 0, //当前点击购物车按钮在网页中的绝对left值
    };
  },
  computed: {
    ...mapState(["cartnum"]),
  },
  components: {
    [Search.name]: Search,
    [Button.name]: Button,
    [Sidebar.name]: Sidebar,
    [SidebarItem.name]: SidebarItem,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Card.name]: Card,
    [Tag.name]: Tag,
    [Icon.name]: Icon,
    [VanImage.name]: VanImage,
    [Toast.name]: Toast,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    inputTop,
  },
  created() {
    if (!!this.$route.query.type) {
      this.url.list = this.url.columnSkuList;
    }
    this.onRefresh();
    this.num();
    
    console.log(this.$route.query.type);
  },
  methods: {
    beforeEnter(el) {
      console.log(1111);
      // 设置transform值
      el.style.opacity = 0;
      el.style.transform = "translate(0, 0)";
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
      const xDist = badgePosition.left - this.elLeft - badgePosition.width;
      const yDist = badgePosition.top - this.elTop - badgePosition.height;
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
    onRefresh() {
      this.search();
    },
    gointocart() {
      this.$router.push({ name: "Cart" });
    },
    //购物车数量
    num() {
      getFunction(this.url.num).then((res) => {
        if (res.code == "000000") {
          console.log(res.data, 9991);
          this.$store.commit("cartNum", res.data);
          this.badge = res.data;
        }
      });
    },
    search() {
      //恢复滚动条顶部位置，只加载第一页（不置顶，会加载之前"pagenum"页）
      document.documentElement.scrollTop = 0;
      console.log(
        document.documentElement.scrollTop,
        "document.body.scrollTop"
      );
      this.loading = false;
      this.finished = false;
      console.log("刷新--加");
      this.pageNum = 1;
      let data = {
        code: this.code,
        pageNo: this.pageNum,
        pageSize: 10,
      };
      this.listDataOdd = [];
      this.listDataEven = [];
      var _this = this;

      postFunction(this.url.list, data, false).then((res) => {
        if (res.code == "000000") {
          let goodsdata = res.data.items;
          goodsdata.map((item) => {
            item.projectPrice = returnFloat(item.projectPrice);
          });
          this.goodsdata = goodsdata;
          this.goodsdata.forEach((element, index) => {
            if (index % 2 == 0) {
              _this.listDataOdd.push(element);
            } else {
              _this.listDataEven.push(element);
            }
          });

          // this.pageNum=1
          this.total = res.data.total;
          this.isLoading = false;
          this.listShow = true;
          this.loading = false;
        }
      });
    },
    onLoad() {
      this.loading = true;
      console.log("onload,加载");
      if (this.pageNum < this.total / 10) {
        this.pageNum++;
        let data = {
          code: this.code,
          pageNo: this.pageNum,
          pageSize: 10,
        };
        postFunction(this.url.list, data, true).then((res) => {
          this.listDataOdd = [];
          this.listDataEven = [];
          if (res.code == "000000") {
            let goodsdata = res.data.items;
            goodsdata.map((item) => {
              item.projectPrice = returnFloat(item.projectPrice);
            });
            this.goodsdata = this.goodsdata.concat(goodsdata);
            var _this = this;
            this.goodsdata.forEach((element, index) => {
              if (index % 2 == 0) {
                _this.listDataOdd.push(element);
              } else {
                _this.listDataEven.push(element);
              }
            });
            this.pageNum = res.data.pageNum;
            this.total = res.data.total;
            if (res.data.pageNum >= res.data.total / 10) {
              this.finished = true;
            }
            this.loading = false;
          }
        });
      } else {
        this.finished = true;
      }
    },
    postcart(value, unloading) {
      postFunction(this.url.addcar, { qty: 1, skuId: value }, unloading).then(
        (res) => {
          if (res.code == "000000") {
            this.showMoveDot = [...this.showMoveDot, true];
            console.log(res, 9991);
            this.$store.commit("cartNum", res.data.length);
            this.badge = res.data.length;
            // this.num()
          }
        }
      );
    },
    details(value) {
      this.$router.push({
        name: "ProductDetails",
        query: { skuId: value },
      });
    },
    addcart(value) {
      console.log("cartnum+1");
      // this.showMoveDot = [...this.showMoveDot, true];
      //显示图片
      // this.addcartimg = "";
      this.elLeft = event.target.getBoundingClientRect().left;
      this.elTop = event.target.getBoundingClientRect().top;
      this.postcart(value, true);
    },
    searchdata() {
      this.onRefresh();
    },
  },
  beforeCreate() {
    this.$store.commit("changefoot", false);
  },
};
</script>

<style  scoped lang="less">
.goods-contains {
  .clear {
    clear: both;
  }
  height: 100%;
  // background-color:#fff;
  font-size: 14px;
  width: 100%;
  input::-ms-input-placeholder {
    text-align: center;
    font-size: 13px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: #989898;
  }
  input::-webkit-input-placeholder {
    text-align: center;
    font-size: 13px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: #989898;
  }
  .mask {
    position: fixed;
    top: 70px;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 2000;
    display: none;
  }
  .maskshow {
    display: block;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 2000;
  }
  ::-webkit-scrollbar {
    width: 0px;
  }
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
  .inputTop {
    margin-bottom: -5px;
    height: 60px;
  }
  .goods-contain {
    font-size: 15px;
    overflow-y: hidden;
    // margin-top: 40px;

    .clear {
      clear: both;
    }
    .goods-title {
      // overflow-y: hidden;
      position: fixed;
      z-index: 1000;
      background: #f8f8f8;
      width: 100%;
      // border:1px solid red;
      top: 60px;
      li {
        list-style: none;
        float: left;
        margin-top: 10px;
        // border:1px solid red;
        width: 60px;
        height: 22px;
        margin-left: 25px;
        text-align: center;
        font-size: 15px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(151, 151, 151, 1);
        line-height: 22px;
        span {
          display: inline-block;
          width: 40px;
          // border:1px solid red;
        }
        .banner-img {
          width: 10px;
          float: right;
          margin-top: 9px;
          margin-left: -11px;
        }
      }
      .active {
        color: rgba(27, 191, 151, 1);
      }
    }
    .goods-brands {
      position: fixed;
      top: 0;
      left: 71px;
      bottom: 0;
      right: 0;
      z-index: 3000;
      background-color: #fff;
      .goods-brand-title1 {
        width: 28px;
        height: 18px;
        font-size: 14px;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
        color: #333333;
        line-height: 18px;
        margin-top: 32px;
        margin-left: 15px;
      }
      .goods-brand-title2 {
        width: 28px;
        height: 18px;
        font-size: 14px;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
        color: #333333;
        line-height: 18px;
        margin-top: 23px;
        margin-left: 15px;
      }
      ul li {
        list-style: none;
      }
      ul {
        left: 13px;
        // border:1px solid red;
        position: absolute;
        bottom: 50px;
        top: 134px;
        overflow-y: scroll;
      }
      li {
        float: left;
        width: 84px;
        height: 29px;
        padding-left: 3px;
        padding-right: 3px;
        background: rgba(151, 151, 151, 0.1);
        border-radius: 14px;
        border: 1px solid #ffffff;
        font-size: 13px;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
        color: #979797;
        line-height: 29px;
        text-align: center;
        margin-left: 2px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        line-clamp: 1;
        -webkit-box-orient: vertical;
        margin-top: 9px;
      }
      .active {
        background: rgba(27, 191, 151, 0.15);
        border-radius: 14px;
        border: 1px solid #ffffff;
        color: #1bbf97;
      }
      .button-contain {
        // border: 1px solid red;
        width: 100%;
        height: 50px;
        position: absolute;
        bottom: 0;
        .van-button {
          width: 81px;
          height: 29px;
          border-radius: 17px;
          font-size: 13px;
          font-family: PingFang-SC-Medium, PingFang-SC;
          font-weight: 500;
          line-height: 28px;
          margin-top: 8px;
          // border: 1px solid #333333;
        }
        .left {
          border: 1px solid #333333;
          color: #333333;
          background-color: #fff;
          margin-left: 53px;
        }
        .right {
          margin-left: 36px;
          border: 1px solid #1bbf97;
          color: #fff;
          background: #1bbf97;
        }
      }
    }
    .goods-list {
      // border:1px solid red;
      .noimg {
        width: 175px;
        height: 175px;
        margin-left: 100px;
        margin-top: 20px;
      }
      // position: fixed;
      margin-top: 1px;
      // padding-bottom: 10px;
      // height: 560px;
      height: 100%;
      // overflow-y: scroll;
      ul li {
        list-style: none;
      }
      ul {
        background: #f8f8f8;
        margin-top: 20px;
        height: 100%;
        padding-left: 12px;
      }
      .van-list {
        height: 100%;
        // min-height: 100px;
      }
      .item_goodsLift {
        display: inline-block;
        width: 175px;
        margin-right: 5px;
        float: left;
      }
      .item_goods {
        width: 173px;
        display: flex;
        background: #fff;
        // border: 1px solid #ccc;
        border-radius: 8px;
        float: left;
        flex-direction: column;
        margin: 0 5px 5px 0;
        box-sizing: border-box;
        .img_boy {
          width: 160px;
          height: 160px;
          // border: 1px solid #f8f8f8;
          border-radius: 4px;
          margin: 5px auto;
        }
        .good_name {
          .goods-name {
            width: 160px;
            height: 35px;
            line-height: 1.5;
            margin: 6px;
            // margin-left: 0px;
            color: #333333;
            font-size: 12px;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .goods-btom {
            // margin-left: 150px;
            margin: 5px 8px 8px 8px;
            font-size: 14px;
            .skuyqty_left {
              color: #fe5e41;
            }
            .skuyqty_right {
              float: right;
            }
          }
          .goods-underlined {
            margin: -10px 8px 8px 8px;
            height: 16px;
            font-size: 12px;
            text-decoration: line-through;
            color: #bfbfbf;
            .skuyqty_left {
              color: #ccc;
            }
            .skuyqty_right {
              float: right;
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
        .order_col {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
