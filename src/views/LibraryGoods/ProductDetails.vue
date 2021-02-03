<template>
  <div class="details-contain" id="detailsScroll">
    <inputTop :type="3"></inputTop>
    <!-- <div class="details-title">
      <van-icon @click="goback()" name="arrow-left" />
      <span>商品详情</span>
    </div> -->

    <div class="details-scroll">
      <div class="details-img">
        <van-swipe class="my-swipe" :autoplay="3000">
          <van-swipe-item
            v-for="(image, index) in mainPictureFile"
            :key="index"
          >
            <img :src="imgurl + image.path" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="details-introduction">
        <div class="details-introduction-price">
          <span class="money">￥</span>{{ goodsdata.shoppePrice }}
          <span class="underlined_Price" v-if="goodsdata.underlinedPrice">
            <span class="money_text">￥</span>{{ goodsdata.underlinedPrice }}
          </span>
          <span class="underlined_lick">
            <van-icon
              v-if="!goodsdata.isLike"
              name="like-o"
              color="#333"
              @click="lickButton(0, activeKey)"
            />
            <van-icon
              v-else
              name="like"
              color="#f00"
              @click="lickButton(1, activeKey)"
            />
          </span>
        </div>

        <div class="details-introduction-name">
          <div class="details_introduction_name">
            <div class="details_introduction_divname">
              <span>
                <!-- <i class="self_support">自营</i> -->
                <img
                  src="@/assets/img/ziying_@2x.png"
                  class="self_support"
                /> </span
              >{{ goodsdata.name }}
            </div>
            <div class="details_introduction_no">
              <span>商品编号：</span>{{ goodsdata.no }}
            </div>
          </div>
        </div>
      </div>
      <van-sticky :offset-top="50">
        <div class="details_div">
          <span
            :class="switchoverType == 1 ? 'details_span' : 'details_spaned'"
            @click="switchover(1)"
            >商品介绍</span
          >
          <span
            :class="switchoverType == 2 ? 'details_span' : 'details_spaned'"
            @click="switchover(2)"
            >规格参数</span
          >
          <span
            :class="switchoverType == 3 ? 'details_span' : 'details_spaned'"
            @click="switchover(3)"
            >包装清单</span
          >
        </div>
      </van-sticky>

      <div class="details-introduction-img" v-if="switchoverType == 1">
        <van-image
          v-for="(image, index) in slidePictureFile"
          :key="index"
          :src="imgurl + image.path"
          alt=""
        />
      </div>
      <div
        v-else-if="switchoverType == 2"
        class="details_introduction_skuAttribute"
      >
        <div
          v-for="(res, index) in goodsdata.skuAttributeGroupDTOList"
          :key="index"
          class="div_table"
        >
          <!-- <span class="table_apsn">{{res.attributeGroupName}}</span> -->
          <table style="border-bottom: none">
            <tr style="border-bottom: none">
              <td style="border-bottom: none">{{ res.attributeGroupName }}</td>
            </tr>
          </table>
          <table style="border-bottom: none">
            <tr v-for="(items, i) in res.skuAttributeList" :key="i">
              <td class="value_befo">{{ items.attributeName }}</td>
              <td class="value_tdnext">{{ items.attributeValue }}</td>
            </tr>
          </table>
        </div>
      </div>
      <div
        v-else-if="switchoverType == 3"
        class="details_introduction_packingList"
      >
        <span>{{ goodsdata.packingList }}</span>
      </div>
    </div>

    <div class="details-footer">
      <!-- <van-icon @click="gocart(1)" name="shopping-cart-o" /> -->
      <van-icon class="carts" :badge="badge">
        <img
          class="cart"
          src="@/assets/img/car_w.png"
          alt=""
          @click="gocart(1)"
        />
      </van-icon>
      <van-button
        class="footer-button-left"
        @click="addcart(activeKey)"
        type="primary"
        size="small"
        >加入购物车</van-button
      >
      <van-button
        class="footer-button-right"
        @click="confirmorder(1)"
        type="primary"
        size="small"
        >立即购买
      </van-button>
    </div>
    <div class="goods-message" v-show="gocartshow">商品已加入购物车</div>

    <div class="deatailnum" v-show="isShow">
      <div class="topmessage">
        <img class="leftimg" :src="imgurl + mainPictureFile[0].path" alt="" />
        <div class="topright">
          <div class="righttop">
            <div class="righttopprice">
              <div class="left">
                <span class="symbol">￥</span>
                <span class="money_text">{{ goodsdata.shoppePrice }}</span>
              </div>
              <div class="center" v-if="goodsdata.underlinedPrice">
                <span class="symbol">￥</span>
                <span class="money_text">{{ goodsdata.underlinedPrice }}</span>
              </div>
            </div>
            <div class="icon">
              <img
                class="close"
                src="@/assets/img/close.png"
                @click="closemessage()"
              />
            </div>
          </div>
          <div class="rightbottom">
            <span class="rightbottom_img">
              <img src="@/assets/img/ziying_@2x.png" class="self_support" />
            </span>
            <span class="rightbottom_name">
              {{ goodsdata.name }}
            </span>
          </div>
        </div>
      </div>
      <div class="goodscode">
        <div class="name">商品编码:</div>
        <div class="value">{{ goodsdata.no }}</div>
      </div>
      <div class="goodsnum">
        <div class="name">购买数量:</div>
        <div class="value">
          <van-stepper
            min="1"
            max="9999"
            input-width="37px"
            input-height="23px"
            @change="numchange()"
            button-size="28px 23px"
            v-model="goodqty"
            step="1"
          />
        </div>
      </div>
    </div>
    <div
      @click="isShow = false"
      :class="!isShow ? 'maskLayer' : 'maskLayer_show'"
    ></div>
  </div>
</template>

<script>
import {
  Image,
  Search,
  Sidebar,
  Toast,
  SidebarItem,
  Button,
  Collapse,
  CollapseItem,
  Card,
  Tag,
  Icon,
  Swipe,
  Stepper,
  Sticky,
  SwipeItem,
} from "vant";
import {
  getFunction,
  postFunction,
  putFunction,
  deleteFunction,
} from "@/utils/request";
import inputTop from "@/components/topTitle";
import { mapState } from "vuex";
import { returnFloat } from "@/utils/c_methods";
export default {
  name: "ProductDetails",
  data() {
    return {
      authorities:this.$authorities,
      switchoverType: 1,
      activeKey: this.$route.query.skuId,
      activeNames: "0",
      isShow: false,
      images: [],
      gocartshow: false,
      goodsdata: {},
      mainPictureFile: [{ path: "" }],
      slidePictureFile: [{ path: "" }],
      goodqty: 1,
      badge: "",
      imgurl:
        (this.$auth.os.lxapp
          ? process.env.VUE_APP_BASE_API
          : location.origin.indexOf("localhost") > -1
          ? "https://shoppemobiletest2.66123123.com"
          : location.origin) + "/image",
      url: {
        details: `/api/shoppe-api-service/mobile/sku/`,
        addcar: `/api/shoppe-api-service/mobile/cart/`,
        num: `/api/shoppe-api-service/mobile/cart/sku-count`,
        validation: `/api/shoppe-api-service/moblie/order-management/validation`,
        wishAdd: `/api/shoppe-api-service/mobile/sku/${this.$route.query.skuId}/wish-add`,
        wishCancel: `/api/shoppe-api-service/mobile/sku/${this.$route.query.skuId}/wish-cancel`,
      },
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
    [Swipe.name]: Swipe,
    [Stepper.name]: Stepper,
    [SwipeItem.name]: SwipeItem,
    [Sticky.name]: Sticky,
    inputTop,
    [Toast.name]: Toast,
    [Image.name]: Image,
  },
  created() {
    this.goodsdetails();
    this.num();
    // localStorage.removeItem("gointocart");
    // console.log(this.$route.query, "this.$route.query", location.origin ,document.querySelector("#detailsScroll"));
    localStorage.setItem(
      "gointocart",
      JSON.stringify({
        types: 1,
        type: this.$route.query.type,
        skuId: this.activeKey,
        detailstype: this.$route.query.detailstype,
      })
    );
    // if (!window.location.origin) {
    //         window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
    //       }
    //     this.imgurl = (location.origin.indexOf("localhost") > -1 ? 'https://lxerptest3.66123123.com' : location.origin) + '/image'
    //     console.log(this.imgurl)
    // console.log(this.$route.query,'this.$route.query')
  },
  mounted() {
    window.addEventListener("scroll", this.handleScrolls);
  },
  activated() {
    this.$store.commit("changefoot", false);
  },
  methods: {
    handleScrolls() {
      // console.log(document.querySelector("#detailsScroll"));
      if (document.querySelector("#detailsScroll")) {
        let scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop; // 滚动条偏移量
        let offsetTop = document.querySelector("#detailsScroll").offsetTop; // 要滚动到顶部吸附的元素的偏移量
        let clientHeight = document.documentElement.clientHeight; //可视区域高度
        let scrollHeight = document.querySelector("#detailsScroll")
          .scrollHeight; //滚动内容高度
        // console.log(scrollTop>175,clientHeight);

        this.isFixedType = scrollTop > 175 ? true : false; // 如果滚动到顶部了，this.isFixed就为true
        this.returnTopType = scrollTop > clientHeight * 2 ? true : false; // 如果滚动到顶部了，this.isFixed就为true
      }
    },
    numchange() {},
    closemessage() {
      this.isShow = false;
    },
    switchover(val) {
      console.log(val);
      this.switchoverType = val;
    },
    lickButton(val) {
      if (val == 0) {
        console.log("收藏");
        putFunction(this.url.wishAdd).then((res) => {
          if (res.code == "000000") {
            this.goodsdetails();
          }
        });
      } else if (val == 1) {
        console.log("取消");
        deleteFunction(this.url.wishCancel).then((res) => {
          if (res.code == "000000") {
            this.goodsdetails();
          }
        });
      }
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
    postcart(value, unloading) {
      let that = this;
      let qty = this.goodqty;
      if (qty > 9999) {
        qty = 9999;
      } else if (qty < 1) {
        qty = 1;
      }
      postFunction(this.url.addcar, { qty: qty, skuId: value }, unloading)
        .then((res) => {
          if (res.code == "000000") {
            console.log(res, 9991);
            this.$store.commit("cartNum", res.data.length);
            this.badge = res.data.length;
            this.gocartshow = true;
            this.isShow = false;
            setTimeout(() => {
              this.gocartshow = false;
            }, 1000);
            // this.num()
          }
        })
        .catch(function (error) {
          if (error.response.data.code == "010200005") {
            Toast.fail("购物车内商品数量需在1~9999之间");
          }
          that.isShow = false;
        });
    },
    goBack() {
      let gointocart = JSON.parse(localStorage.getItem("gointocart"));
      if (gointocart.type == 1) {
        this.$router.push({
          name: "ProductList",
          query: { detailstype: 1 },
        });
      } else if (gointocart.type == 0) {
        if (gointocart.detailstype == 0) {
          this.$router.push({
            name: "ProductList",
            query: { detailstype: 0 },
          });
        } else if (gointocart.detailstype == 1) {
          this.$router.push({
            name: "ProductList",
            query: { detailstype: 1 },
          });
        }
      } else if (gointocart.type == 2) {
        this.$router.push({
          name: "Home",
        });
      } else if (gointocart.type == 3) {
        this.$router.push({
          name: "Cart",
        });
      } else if (gointocart.type == 4) {
        this.$router.push({
          name: "ActivityPage",
        });
      } else if (gointocart.type == 5) {
        this.$router.push({
          name: "ActivityPageT",
        });
      } else if (gointocart.type == 6) {
        this.$router.push({
          name: "BrowsingHistory",
        });
      } else if (gointocart.type == 7) {
        this.$router.push({
          name: "CollectionGoods",
        });
      } else if (gointocart.type == 8) {
        this.$router.push({
          name: "OrderDetail",
        });
      } else if (gointocart.type == 9) {
        this.$router.push({
          name: "approvalDetail",
        });
      } else if (gointocart.type == "ActivityPageFour") {
        this.$router.push({
          name: "ActivityPageFour",
        });
      } else if (gointocart.type == 99) {
        this.$router.push({
          name: "LibraryGoods",
        });
      } else {
        this.$router.go(-1);
      }
    },
    //跳转至购物车
    gocart(value) {
      // localStorage.setItem(
      //   "gointocart",
      //   JSON.stringify({
      //     types: 1,
      //     type: this.$route.query.type,
      //     skuId: this.activeKey,
      //     detailstype: this.$route.query.detailstype,
      //   })
      // );
      this.$router.push({ name: "Cart" });
    },
    //加入购物车
    addcart(value) {
      if (this.isShow) {
        console.log("cartnum+1");
        this.postcart(value, true);
      } else {
        this.isShow = true;
      }
      // console.log("cartnum+1");
      // this.postcart(value, true);
    },
    //立即购买,跳转至确认订单
    confirmorder(value) {
      if (this.isShow) {
        if(this.authorities.ForbidOrder){
          Toast.fail("该账号无下单权限");
        }else{
        console.log(this.goodqty, "9999");
        let qty = this.goodqty;
        if (qty > 9999) {
          qty = 9999;
        } else if (qty < 1) {
          qty = 1;
        }
        let goodsdata = [];
        let amount = this.goodsdata.shoppePrice;
        goodsdata[0] = {
          currentPrice: this.goodsdata.shoppePrice,
          itemQty: qty,
          picture: this.goodsdata.skuImageInfoDTO.mainPictureFile[0].path,
          skuId: this.activeKey,
          skuName: this.goodsdata.name,
          skuNo: this.goodsdata.no,
        };
        getFunction(this.url.details + this.activeKey).then((res) => {
          console.log(1111);
          if (res.code == "000000") {
            if (!res.data.shoppePrice) {
              Toast.fail("数据异常");
              this.isShow = false;
              this.goBack();
            } else {
              this.isShow = false;
              this.$router.push({
                path: "/ConfirmOrder",
                query: {
                  itemList: goodsdata,
                  amount: amount,
                  type: this.$route.query.type,
                  detailstype: this.$route.query.detailstype,
                },
              });
            }
          }
        });
      }
      } else {
        this.isShow = true;
        localStorage.removeItem("remarks");
        localStorage.removeItem("usergroup");
      }
    },
    // confirmorder(value) {
    //   // localStorage.setItem(
    //   //   "gointocart",
    //   //   JSON.stringify({
    //   //     types: 1,
    //   //     type: this.$route.query.type,
    //   //     skuId: this.activeKey,
    //   //     detailstype: this.$route.query.detailstype,
    //   //   })
    //   // );
    //   let goodsdata = [];
    //   let amount = this.goodsdata.shoppePrice;
    //   goodsdata[0] = {
    //     currentPrice: this.goodsdata.shoppePrice,
    //     itemQty: 1,
    //     picture: this.goodsdata.skuImageInfoDTO.mainPictureFile[0].path,
    //     skuId: this.activeKey,
    //     skuName: this.goodsdata.name,
    //     skuNo: this.goodsdata.no,
    //   };
    //   getFunction(this.url.details + this.activeKey).then((res) => {
    //     console.log(1111);
    //     if (res.code == "000000") {
    //       if (!res.data.shoppePrice) {
    //         Toast.fail("数据异常");
    //         this.goBack();
    //       } else {
    //         this.$router.push({
    //           path: "/ConfirmOrder",
    //           query: {
    //             itemList: goodsdata,
    //             amount: amount,
    //             type: this.$route.query.type,
    //             detailstype: this.$route.query.detailstype,
    //           },
    //         });
    //       }
    //     }
    //   });
    //   // debugger;
    //   // postFunction(this.url.validation,data).then((res) => {
    //   //   //   if (res.code == "000000") {
    //   //   //   // this.$router.push({path:'/ConfirmOrder',query:{itemList:goodsdata,amount:amount,type:this.$route.query.type,detailstype:this.$route.query.detailstype}})
    //   //   // }
    //   // }).catch((function(error){
    //   //   // console.log(error,'error')
    //   //   console.log(error.response.message);
    //   //                   Toast.fail('数据异常');
    //   //           }));
    //   // ,()=>{
    //   //             console.log(1234)
    //   //             Toast.fail('数据异常');
    //   //             this.goBack()
    //   //           }
    //   // postFunction(this.url.validation,{amount:amount,itemList:goodsdata}).then((res) => {
    //   //   if (res.code == "000000") {
    //   //     this.$router.push({path:'/ConfirmOrder',query:{itemList:goodsdata,amount:amount,type:this.$route.query.type,detailstype:this.$route.query.detailstype}})
    //   //   }
    //   // }).catch((function(error){
    //   //   console.log(error,'error')
    //   //                   Toast.fail('数据异常');
    //   //           }));

    //   // this.$router.push({path:'/confirmorder',query:value})
    // },
    //商品详情接口
    goodsdetails() {
      console.log(1888);
      getFunction(this.url.details + this.activeKey).then((res) => {
        console.log(1111);
        if (res.code == "000000") {
          console.log(res, 999);
          this.goodsdata = res.data;
          this.goodsdata.shoppePrice = returnFloat(this.goodsdata.shoppePrice);
          this.mainPictureFile = res.data.skuImageInfoDTO.mainPictureFile.concat(
            res.data.skuImageInfoDTO.slidePictureFile
          );
          this.slidePictureFile = res.data.skuImageInfoDTO.detailPictureFile;
        }
      });
    },
  },
  beforeCreate() {
    this.$store.commit("changefoot", false);
  },
  // beforeDestroy() {
  //   this.$store.commit("changefoot", true);
  // },
};
</script>

<style  scoped lang="less">
.details-contain {
  position: absolute;
  top: 0;
  bottom: 60px;
  /deep/ .van-stepper__minus::before {
    position: absolute;
    top: auto !important;
    right: auto !important;
    bottom: auto !important;
    left: auto !important;
    margin: auto;
    background-color: currentColor;
    content: "";
    width: 8px;
  }
  /deep/ .van-stepper__plus::before {
    position: absolute;
    top: auto !important;
    right: auto !important;
    bottom: auto !important;
    left: auto !important;
    margin: auto;
    background-color: currentColor;
    content: "";
    width: 8px;
  }
  /deep/ .van-stepper__plus::after {
    position: absolute;
    top: auto !important;
    right: auto !important;
    bottom: auto !important;
    left: auto !important;
    margin: auto;
    background-color: currentColor;
    content: "";
    width: 1px;
    height: 8px;
  }
  /deep/ .van-stepper__minus {
    background-color: #fff;
    border: 1px solid #333333;
    border-right: none;
    font-size: 12px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: normal;
    line-height: 23px;
    width: 28px;
    height: 23px;
    border-radius: 4px 0px 0px 4px;
    // padding:7.5px 10px;
  }
  /deep/ .van-stepper__plus {
    background-color: #fff;
    border: 1px solid #333333;
    border-left: none;
    font-size: 12px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: normal;
    line-height: 23px;
    width: 28px;
    height: 23px;
    border-radius: 0px 4px 4px 0px;
    // padding:7.5px 10px;
  }
  /deep/ .van-stepper__minus--disabled {
    border: 1px solid #e4e4e7;
  }
  /deep/ .van-stepper__plus--disabled {
    border: 1px solid #e4e4e7;
  }
  /deep/ .van-stepper__input {
    background-color: #fff;
    border: 1px solid #333333;
    margin: 0;
    font-size: 12px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: bold;
    line-height: 23px;
    width: 37px;
    height: 23px;
  }
  /deep/.van-stepper {
    margin-right: 12px;
    margin-top: 16px;
    background-color: #fff;
  }
  .deatailnum {
    position: fixed;
    bottom: 50px;
    left: 0px;
    right: 0px;
    width: 375px;
    height: 360px;
    background: #ffffff;
    // border-top:1px solid red;
    // border-bottom:1px solid red;
    display: flex;
    flex-direction: column;
    z-index: 1000;
    .topmessage {
      // border:1px solid red;
      display: flex;
      justify-content: space-between;
      .leftimg {
        width: 78px;
        height: 78px;
        margin-left: 12px;
        margin-top: 16px;
        border: 1px solid #f8f8f8;
        border-radius: 4px;
      }
      .topright {
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        .righttop {
          display: flex;
          justify-content: space-between;
          .righttopprice {
            display: flex;
            flex-wrap: wrap;
          }
          .left {
            width: auto;
            height: 24px;
            font-family: PingFangSC-Medium, PingFang SC;
            color: #fe5e41;
            line-height: 24px;
            margin-left: 16px;
            margin-top: 16px;
            .symbol {
              font-size: 9px;
              font-weight: normal;
            }
            .money_text {
              font-size: 24px;
              font-weight: bold;
            }
          }
          .center {
            text-decoration: line-through;
            margin-left: 9.5px;
            margin-top: 19px;
            width: auto;
            height: 24px;
            color: #d8d8d8;
            font-family: PingFangSC-Medium, PingFang SC;
            .symbol {
              font-weight: normal;
              font-size: 9px;
              line-height: 24px;
            }
            .money_text {
              font-weight: bold;
              font-size: 15px;
              line-height: 24px;
            }
          }
          .icon {
            width: 19px;
            height: 19px;
            margin-right: 12px;
            margin-top: 16px;
            .close {
              width: 19px;
              height: 19px;
            }
          }
        }
        .rightbottom {
          width: 258px;
          .rightbottom_img {
            float: left;
            width: 20px;
            margin-top: 12px;
            img {
              width: 24px;
            }
          }
          .rightbottom_name {
            float: right;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            width: 210px;
            height: 36px;
            font-size: 16px;
            font-family: PingFang-SC-Bold, PingFang-SC;
            font-weight: bold;
            color: #333333;
            line-height: 18px;
            margin-top: 12px;
            margin-left: 16px;
            margin-right: 12px;
          }
        }
      }
    }
    .goodscode {
      display: flex;
      justify-content: space-between;
      // border:1px solid red;
      .name {
        width: auto;
        height: 14px;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bold;
        color: #333333;
        line-height: 14px;
        margin-left: 14px;
        margin-top: 28px;
      }
      .value {
        width: auto;
        height: 14px;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bold;
        color: #333333;
        line-height: 14px;
        margin-top: 28px;
        margin-right: 12px;
      }
    }
    .goodsnum {
      display: flex;
      justify-content: space-between;
      // border:1px solid red;
      .name {
        width: auto;
        height: 14px;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bold;
        color: #333333;
        line-height: 14px;
        margin-left: 15px;
        margin-top: 21.5px;
      }
      .value {
      }
    }
  }
  .maskLayer_show {
    // border:1px solid red;
    position: fixed;
    top: 0px;
    bottom: 60px;
    left: 0px;
    right: 0px;
    width: 375px;
    height: auto;
    background: rgba(0, 0, 0, 0.4);
    z-index: 500;
  }
  .maskLayer {
    position: fixed;
    top: 0px;
    bottom: 60px;
    left: 0px;
    right: 0px;
    width: 375px;
    height: auto;
    background: rgba(0, 0, 0, 0.4);
    z-index: 500;
    display: none;
  }
  .goods-message {
    position: fixed;
    text-align: center;
    background: rgba(0, 0, 0, 0.4);
    width: 34%;
    left: 33%;
    width: 130px;
    height: 30px;
    line-height: 30px;
    border-radius: 5px;
    margin: 0 auto;
    margin-top: 200px;
    border: none;
    color: #fff;
    font-weight: 500;
    z-index: 9999;
    // border:1px solid red;
  }
  ::-webkit-scrollbar {
    width: 0px;
  }
  .van-swipe__indicators {
    background-color: red;
    margin-left: 200px;
  }
  font-size: 15px;
  .details-title {
    position: fixed;
    z-index: 1000;
    background-color: #fff;
    padding-top: 5px;
    padding-bottom: 5px;
    width: 100%;

    // margin-bottom: 5px;
    span {
      margin-left: 145px;
      font-size: 17px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 20px;
    }
    .van-icon {
      position: fixed;
      font-size: 30px;
      left: 5px;
      top: -0px;
      width: 20px;
      height: 30px;
    }
  }
  .details-scroll {
    position: absolute;
    height: auto;
    width: 100%;
    top: 60px;
    bottom: 50px;
    // margin-top: -5px;
    // border-top:1px solid red;
    // border-bottom:1px solid red;
    position: fixed;
    overflow-y: scroll;
    .details_div {
      margin-top: 10px;
      width: 375px;
      padding: 16px 0;
      background: #fff;
      overflow: hidden;
      .details_spaned {
        display: inline-block;
        padding: 0 32px;
        font-size: 14px;
        font-family: PingFang-SC-Bold, PingFang-SC;
        font-weight: 500;
        color: #979797;
      }
      .details_span {
        display: inline;
        padding: 0 32px;
        font-size: 14px;
        font-family: PingFang-SC-Bold, PingFang-SC;
        font-weight: bold;
        color: #1bbf97;
      }
    }
  }
  .details-img {
    // margin-top: 40px;
    .my-swipe .van-swipe-item {
      height: 375px;
      width: 373px;
    }
    // border:1px solid red;
    height: 375px;
    width: 373px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .details-introduction {
    padding-top: 12px;
    background: #fff;
    .details-introduction-price {
      color: red;
      margin-top: 10px;
      height: 24px;
      font-size: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(252, 106, 3, 1);
      line-height: 24px;
      margin-left: 15px;
    }
    .money {
      font-size: 9px;
    }
    .underlined_Price {
      text-decoration: line-through;
      color: #666;
      // float: right;
      // margin-right: 15px;
      margin-left: 8px;
      font-size: 14px;

      .money_text {
        font-size: 14px;
      }
    }
    .underlined_lick {
      float: right;
      margin-right: 10px;
    }
    .details-introduction-name {
      // border-bottom: 1px solid #e4e4e7;
      display: flex;
      .self_support {
        width: 24px;
        // height: 18px;
        line-height: 18px;
        display: inline-block;
        text-align: center;
        // margin-top: 8px;
        margin: 5px 0 0 0;
        padding: 0 5px;
        font-size: 10px;
        color: #fff;
        border-radius: 3px;
        float: left;
      }
      .details_introduction_name {
        display: block;
        margin-top: 8px;
        padding-left: 8px;
        padding-right: 15px;
        padding-bottom: 12px;
        font-weight: bold;
        height: auto;
        font-size: 16px;
        font-family: PingFang-SC-Bold, PingFang-SC;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 25px;
        // text-overflow: -o-ellipsis-lastline;
        // overflow: hidden;
        // text-overflow: ellipsis;
        // display: -webkit-box;
        // -webkit-line-clamp: 2;
        // line-clamp: 2;
        // -webkit-box-orient: vertical;
        .details_introduction_divname {
          display: block;
          min-height: 20px;
          width: 360px;
        }
        .details_introduction_no {
          display: block;
          font-size: 14px;
          color: #666;
          margin-top: 5px;
        }
      }
    }
  }
  .details-introduction-img {
    width: 375px;
    min-height: 50px;
    height: auto;
    // margin-top: 12px;
    position: absolute;
    // height: 500px;
    margin-bottom: 50px;
    // margin-top: 10px;
    .van-image {
      width: 375px;
      height: 100%;
    }
  }
  .details_introduction_skuAttribute {
    background: #fff;
    padding-bottom: 55px;
    font-size: 13px;
    .div_table {
      margin: 0 auto;
      width: 336px;
      margin-bottom: 10px;
      overflow: hidden;
      .table_apsn {
        display: inline-block;
        width: 360px;
        padding: 1px 0;
        padding-left: 30px;
        background: #ccc;
      }
      table {
        width: 100%;
        border: 1px solid #e4e4e7;
        tr {
          width: 100%;
          display: inline-block;
          border-bottom: 1px solid #e4e4e7;
          .value_befo {
            width: 99px;
            word-wrap: break-word;
            border-right: 1px solid #e4e4e7;
          }
          .value_tdnext {
            word-wrap: break-word;
            border: none;
          }
          th,
          td {
            padding: 10px 12px 10px 12px;
          }
        }
      }
    }
  }
  .details_introduction_packingList {
    padding: 10px 25px;
    background: #fff;
    padding-bottom: 55px;
    font-size: 13px;
  }
  .details-footer {
    width: 375px;
    height: 50px;
    background-color: #fff;
    z-index: 1000;
    position: fixed;
    bottom: 0px;
    left: 0px;
    .cart {
      float: left;
      width: 25px;
      height: 25px;
      font-size: 40px;
      margin-top: 0px;
      // padding-left: 20px;
      // padding-right: 20px;
    }
    .carts {
      margin-top: 15px;
      margin-left: 20px;
      float: left;
    }
    .van-button {
      float: left;
      width: 120px;
      height: 35px;
      // margin-left: 5px;
      margin-top: 7.5px;
      border-radius: 20px;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
    }
    .footer-button-left {
      background: linear-gradient(180deg, #3ae1c8 0%, #1bbf97 100%);
      border: none;
      margin-left: 90px;
      width: 108px;
    }
    .footer-button-right {
      border: 1px solid #1bbf97;
      background-color: #fff;
      color: #1bbf97;
      margin-left: 8px;
      width: 108px;
    }
  }
}
</style>