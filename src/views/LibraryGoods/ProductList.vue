<template>
  <div class="goods-contains">
    <inputTop class="inputTop" :badge="badge" :type="6" :value="value"></inputTop>
    <!-- <div class="search-boxs">
      <van-icon @click="goback()" name="arrow-left" />
      <div class="input-search-icon">
        <input v-model="value" class="van-search-input" />
        <img src="@/assets/img/searchicon.png" class="icon-img" />
      </div>
      <div class="search-button" @click="search">搜索</div>
    </div> -->
    <div class="clear"></div>
    <div class="goods-contain">
      <ul class="goods-title">
        <li @click="searchby('DEFAULT')" :class="sortType=='DEFAULT'? 'active' : ''">综合</li>
        <li @click="searchby('SALES')" :class="sortType=='SALES'? 'active' : ''">
          <span>销量</span>
          <img v-show="orderbysales=='ASC'" src="@/assets/img/goUp.png" class="banner-img" />
          <img v-show="orderbysales=='DES'" src="@/assets/img/goDopwn.png" class="banner-img" />
        </li>
        <li @click="searchby('PRICE')" :class="sortType=='PRICE'? 'active' : ''">
          <span>价格</span>
          <img v-show="orderbyprice=='ASC'" src="@/assets/img/goUp.png" class="banner-img" />
          <img v-show="orderbyprice=='DES'" src="@/assets/img/goDopwn.png" class="banner-img" />
        </li>

        <li @click="dispaly">筛选</li>

      </ul>
      <div class="clear"></div>
      <div v-show="isShow" class="goods-brands">
        <div class="goods-brand-title1">价格</div>
        <div class="clear"></div>
        <input v-model="lowprice" class="search-low" placeholder="最低价" @focus="focusprice('lowprice')" @input="onChangelow"/>
        —
        <input v-model="topprice" class="search-top" placeholder="最高价" @focus="focusprice('topprice')" @input="onChangetop"/>
        <div class="goods-brand-title2">品牌</div>
        <div class="clear"></div>
        <ul>
          <li @click="brandschange(brand,index)" :class="brandindex==index? 'active' : ''" v-for="(brand, index) in branddata" :key="index">{{brand.nameCN?brand.nameCN:brand.nameEN}}</li>
          <div class="clear"></div>
        </ul>
        <div class="clear"></div>
        <div class="button-contain">
        <van-button class="left" @click="reset()" type="primary" size="small">重置</van-button>
        <van-button class="right" @click="searchdata()" type="primary" size="small">确定</van-button>
        </div>
      </div>
      <div class="clear"></div>
      <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
        
      <div class="goods-list" v-show="goodsdata.length!=0">
        <ul>
          <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
          error-text="请求失败，点击重新加载"
          :immediate-check="false"
          
        >
          <li v-for="(goods, index) in goodsdata" :key="index">
            <div @click="details(goods.skuId)" class="img">
            <img  :src="imgurl+goods.mainPictureUrl" alt="">
            </div>
            <div class="clear"></div>
            <div class="name" @click="details(goods.skuId)"> {{goods.name}}</div>
            <div class="clear"></div>
            <div class="price" @click="details(goods.skuId)"><span class="money">￥</span>{{goods.projectPrice}}</div>
            <!-- <van-icon name="shopping-cart-o"  @click="addcart(goods.skuId)"/> -->
            <img class="cart" src="@/assets/img/g_plus.png" alt="" @click="addcart(goods.skuId)">
            <div class="price_underlined" v-if="goods.underlinedPrice">￥{{goods.underlinedPrice}}</div>

          </li>
          <div class="clear"></div>
          </van-list>
        </ul>
      </div>
      
      <!-- </van-pull-refresh> -->
      <div class="goods-list" v-show="goodsdata.length==0" v-if="listShow">
        <img class="noimg" src="@/assets/img/noSome.png" alt="">
      </div>
      </van-pull-refresh>
    </div>
    <div class="clear"></div>
    <!-- 小球 -->
        <transition appear
                    @before-appear="beforeEnter"
                    @enter="enter"
                    @after-appear='afterEnter'
                    v-for="(item,index) in showMoveDot"
                    :key="index.id">
            <div class="move_dot"
                 ref="ball"
                 v-if="item" :style="{top:elTop+'px',left:elLeft+'px'}">
                 <div></div>
                <!-- <img :src="imgurl+message.mainPictureUrl"> -->
            </div>
        </transition>
        <div @click="isShow=false" :class="!isShow? 'mask' : 'maskshow'"></div>
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
      listShow: false,
      lowprice:null,
      topprice:null,
      isLoading: false,
      loading: false,
      finished: false,
      pageNum: 1,
      value: this.$route.query.value ? this.$route.query.value : localStorage.getItem("goodssearchvalue"),
      activeKey: 0,
      activeNames: "0",
      total: 0,
      badge: "",
      brandupdown: true,
      isShow: false,
      select1: true,
      brandId: null,
      brandindex: null,
      goodsdata: [],
      branddata: [],
      url: {
        navigation: `/api/shoppe-api-service/mobile/user/detail`,
        list: `/api/shoppe-api-service/mobile/sku/search-list`,
        addcar: `/api/shoppe-api-service/mobile/cart/`,
        num: `/api/shoppe-api-service/mobile/cart/sku-count`,
      },
      salesnum: null,
      pricesnum: null,
      brands: null,
      sortType: "DEFAULT",
      orderbysales: "DES",
      orderbyprice: "DES",
      navigationType: JSON.parse(localStorage.getItem("UserInfo"))
        .shoppeNavigationType,
      orderBy: "DES",
      imgurl:
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
    [Toast.name]: Toast,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    inputTop,
  },
  created() {
    // this.value=this.$route.params.searchvalue;
    console.log(this.$route.query, "this.$route.query");
    console.log(this.goodsdata, "goodsdata");
    this.onRefresh();
    this.num();
    // localStorage.removeItem("gointocart");
    if(this.$route.query.value){
    localStorage.setItem("goodssearchvalue", this.$route.query.value);
  }
    // if (!window.location.origin) {
    //         window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
    //       }
    //     this.imgurl = (location.origin.indexOf("localhost") > -1 ? 'https://lxerptest.66123123.com' : location.origin) + '/image'
    //     console.log(this.imgurl)
  },
  methods: {
    onChangelow(val){
      console.log(val,this.lowprice,'valadasd')
      let lowprice=this.lowprice
      if (lowprice) {
                this.lowprice=lowprice.replace(/[^\d]/g, '')
        } else {
                this.lowprice=""
        }
    },
    focusprice(val){
      if(val=="lowprice" && (this.lowprice==null||this.lowprice=="")){
        this.lowprice=" "
      }else if(val=="topprice" && (this.topprice==null||this.topprice=="")){
        this.topprice=" "
      }
    },
    onChangetop(val){
      console.log(val,this.topprice,'valadasd')
      let topprice=this.topprice
      if (topprice) {
                this.topprice=topprice.replace(/[^\d]/g, '')
        } else {
                this.topprice=""
        }
    },
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
      console.log(999);
      localStorage.setItem(
        "gointocart",
        JSON.stringify({
          types: 0,
          type: this.$route.query.type?this.$route.query.type:this.$route.query.detailstype,
          skuId: null,
          detailstype: this.$route.query.type?this.$route.query.type:this.$route.query.detailstype,
        })
      );
      this.$router.push({ name: "Cart" });
    },
    brandupdowns() {
      let brandupdown = this.brandupdown;
      this.brandupdown = !brandupdown;
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
    // getFocus() {
    //   console.log(this.$route.query.type, "(this.$route.query.type");
    //   if (this.$route.query.type == 0) {
    //     this.$router.push({
    //       name: "History",
    //       query: { value: this.value },
    //     });
    //   } else if (this.$route.query.type == 1) {
    //     this.$router.push({
    //       name: "QueryLibrarygoods",
    //       query: { value: this.value },
    //     });
    //   }
    // },
    goOrder() {
      if (this.$route.query.type == 0) {
        this.$router.push({
          name: "History",
        });
      } else if (this.$route.query.type == 1) {
        this.$router.push({
          name: "QueryLibrarygoods",
        });
      }
    },
    goBack() {
      
      let gointocart=JSON.parse(localStorage.getItem("gointocart"))
      console.log(gointocart,'this.$route.querythis.$route.query')
      if(this.$route.query.type==0){
        this.$router.push({
          name: "Home",
        });
      }else if(this.$route.query.type==1){
        this.$router.push({
          name: "LibraryGoods",
        });
      }else if (gointocart.type == 0) {
        this.$router.push({
          name: "Home",
        });
      } else if (gointocart.type == 1) {
        this.$router.push({
          name: "LibraryGoods",
        });
      } else if (gointocart.detailstype == 0) {
        this.$router.push({
          name: "Home",
        });
      } else if (gointocart.detailstype == 1) {
        this.$router.push({
          name: "LibraryGoods",
        });
      }
    },
    getFocus(){
      let gointocart=JSON.parse(localStorage.getItem("gointocart"))
      if (this.$route.query.type == 0) {
        this.$router.push({
          name: "History",
        });
      } else if (this.$route.query.type == 1) {
        this.$router.push({
          name: "QueryLibrarygoods",
        });
      }else if (gointocart.type == 0) {
        this.$router.push({
          name: "History",
        });
      } else if (gointocart.type == 1) {
        this.$router.push({
          name: "QueryLibrarygoods",
        });
      } else if (gointocart.detailstype == 0) {
        this.$router.push({
          name: "History",
        });
      } else if (gointocart.detailstype == 1) {
        this.$router.push({
          name: "QueryLibrarygoods",
        });
      }
    },
    // navigation(){
    //   getFunction(this.url.navigation).then((res) => {
    //     if (res.code == "000000") {
    //       console.log(res,888999)
    //       this.navigationType=res.data.shoppeNavigationType
    //       postFunction(this.url.list,
    //     {
    //         brandId: this.brandId,
    //         navType: this.navigationType,//先写死
    //         orderBy: this.orderby,
    //         // pageNum: 0,
    //         // pageSize: 0,
    //         searchContext: this.value,
    //         // shoppeNavFirstCode: "string",
    //         // shoppeNavSecondCode: "string",
    //         // shoppeNavThirdCode: "string",
    //         sortType: this.sortType,
    //         pageSize:9999
    //     }).then((res) => {
    //     if (res.code == "000000") {
    //       this.isLoading=false
    //       console.log(res,9991)
    //       // let datat=res.data.brands
    //       // datat[6].nameEN='chainsdfsd'
    //       // this.branddata=datat
    //       this.branddata=res.data.brands
    //       // this.goodsdata=res.data.pageInfo.items
    //       let goodsdata=res.data.pageInfo.items
    //       goodsdata.map(item=>{
    //         item.projectPrice=returnFloat(item.projectPrice)
    //       })
    //       this.goodsdata=goodsdata
    //     }
    //   });
    //     }
    //   });
    // },
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
        brandId: this.brandId,
        navType: this.navigationType,
        orderBy: this.orderby,
        searchContext: this.value,
        sortType: this.sortType,
        pageNum: this.pageNum,
        pageSize: 10,
        minPrice:this.lowprice,
        maxPrice:this.topprice,
      };
      postFunction(this.url.list, data, false).then((res) => {
        if (res.code == "000000") {
          this.branddata = res.data.brands;
          let goodsdata = res.data.pageInfo.items;
          goodsdata.map((item) => {
            item.projectPrice = returnFloat(item.projectPrice);
          });
          this.goodsdata = goodsdata;
          // this.pageNum=1
          this.total = res.data.pageInfo.total;
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
          brandId: this.brandId,
          navType: this.navigationType,
          orderBy: this.orderby,
          searchContext: this.value,
          sortType: this.sortType,
          pageNum: this.pageNum,
          pageSize: 10,
          minPrice:this.lowprice,
         maxPrice:this.topprice,
        };
        postFunction(this.url.list, data, true).then((res) => {
          if (res.code == "000000") {
            this.branddata = res.data.brands;
            let goodsdata = res.data.pageInfo.items;
            goodsdata.map((item) => {
              item.projectPrice = returnFloat(item.projectPrice);
            });
            this.goodsdata = this.goodsdata.concat(goodsdata);
            this.pageNum = res.data.pageInfo.pageNum;
            this.total = res.data.pageInfo.total;
            if (res.data.pageInfo.pageNum >= res.data.pageInfo.total / 10) {
              this.finished = true;
            }
            this.loading = false;
          }
        });
      } else {
        this.finished = true;
      }
    },
    dispaly() {
      console.log(111);
      let isShow = this.isShow;
      this.isShow = !isShow;
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
      let gointocart=JSON.parse(localStorage.getItem("gointocart"))
      if (this.$route.query.type == 0) {
        this.$router.push({
          name: "ProductDetails",
          query: { skuId: value, detailstype: 0, type: 0 },
        });
      } else if (this.$route.query.type == 1) {
        this.$router.push({
          name: "ProductDetails",
          query: { skuId: value, detailstype: 1, type: 1 },
        });
      } else if (this.$route.query.detailstype == 0) {
        this.$router.push({
          name: "ProductDetails",
          query: { skuId: value, detailstype: 0, type: 1 },
        });
      } else if (this.$route.query.detailstype == 1) {
        this.$router.push({
          name: "ProductDetails",
          query: { skuId: value, detailstype: 1, type: 1 },
        });
      }else{
        this.$router.push({
          name: "ProductDetails",
          query: { skuId: value, detailstype: gointocart.detailstype, type: gointocart.type },
        });
      } 
      // this.$router.push({name:'ProductDetails',query:{skuId:value,type:1}})
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
    brandschange(value, index) {
      console.log(value);
      this.brandindex = index;
      this.brandId = value.id;
    },
    reset() {
      this.brandindex = null;
      this.brandId = null;
      // this.isShow=false;
    },
    searchdata() {
      this.isShow = false;
      this.onRefresh();
    },
    //搜索类型
    searchby(types) {
      if (types == "DEFAULT") {
        this.sortType = types;
        this.orderbysales = "DES";
        this.orderbyprice = "DES";
      } else if (types == "SALES") {
        this.sortType = types;
        if (this.orderbysales == "DES") {
          this.orderbysales = "ASC";
          this.orderby = "ASC";
          console.log("上");
        } else if (this.orderbysales == "ASC") {
          this.orderbysales = "DES";
          this.orderby = "DES";
          console.log("下");
        }
      } else if (types == "PRICE") {
        this.sortType = types;
        if (this.orderbyprice == "DES") {
          this.orderbyprice = "ASC";
          this.orderby = "ASC";
        } else if (this.orderbyprice == "ASC") {
          this.orderbyprice = "DES";
          this.orderby = "DES";
        }
      }
      this.onRefresh();
    },
    // //综合
    // defaultsdefaults(){
    //   console.log('综合排序');
    //   this.select1=!this.select1;
    //   this.salesnumsalesnum=null;
    //   this.pricesnum=null;
    //   // this.brands=null;
    //   console.log('综合排序',this.salesnumsalesnum,this.pricesnum,this.brands);
    // },
    // //销量
    // sales(){
    //   console.log('销量排序')
    //   // this.brands=null;
    //   this.pricesnum=null;
    //   let salesnum=this.salesnum;
    //     this.salesnum=!salesnum
    //   console.log('综合排序',this.salesnum,this.pricesnum,this.brands);
    // },
    // //价格
    // priceschange(){
    //   console.log('价格排序')
    //   // this.brands=null;
    //   this.salesnum=null;
    //   let pricesnum=this.pricesnum
    //     this.pricesnum=!pricesnum
    //   console.log('综合排序',this.salesnum,this.pricesnum,this.brands);
    // },
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
.goods-contains {
  height: 100%;
  // background-color:#fff;
  font-size: 14px;
  width: 100%;
  input::-ms-input-placeholder{
    text-align: center;
    font-size: 13px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: #989898;
    }
input::-webkit-input-placeholder{
  text-align: center;
  font-size: 13px;
  font-family: PingFang-SC-Medium, PingFang-SC;
  font-weight: 500;
  color: #989898;
    }
  .search-low{
    margin-top: 12px;
    width: 90px;
    height: 29px;
    background: rgba(151, 151, 151, 0.1);
    border-radius: 14px;
    border: 1px solid #FFFFFF;
    margin-left: 18px;
    margin-right: 12px;
    text-align:center;
  }
  .search-top{
    width: 90px;
    height: 29px;
    background: rgba(151, 151, 151, 0.1);
    border-radius: 14px;
    border: 1px solid #FFFFFF;
    margin-left: 12px;
    text-align:center;
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
  }
  .search-boxs {
    font-size: 15px;
    // position: fixed;
    width: 100%;
    height: 40px;
    .input-search-icon {
      width: 280px;
      height: 32px;
      border: 1px solid rgba(239, 239, 239, 1);
      border-radius: 16px;
      position: fixed;
      left: 40px;
      top: 10px;
      background: rgba(239, 239, 239, 1);
      input {
        width: 250px;
        height: 32px;
        border: 1px solid rgba(239, 239, 239, 1);
        border-radius: 16px;
        position: fixed;
        left: 40px;
        top: 10px;
        background: rgba(239, 239, 239, 1);
        // border:1px solid red;
        margin-left: 30px;
      }
      img {
        width: 15px;
        height: 15px;
        position: fixed;
        left: 50px;
        top: 19px;
      }
    }
    .van-icon {
      position: fixed;
      font-size: 30px;
      left: 5px;
      top: 10px;
      width: 20px;
      height: 32px;
    }
    .search-button {
      position: fixed;
      right: 10px;
      top: 15px;
    }
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
    // .goods-brand{
    //   position:fixed;
    //   background-color: #fff;
    //   z-index: 1000;
    //   height: auto;
    //   overflow-y: scroll;
    //   margin-top: 32px;
    //   .goods-brand-title{
    //     margin-top: 10px;
    //     margin-left: 15px;
    //   }
    //   width: 373px;
    //   // border:1px solid #f5f5f5;
    //   ul{
    //     float: left;
    //     width: 310px;
    //     margin-left: 20px;
    //     height: 90px;
    //     overflow: hidden;
    //     // border:1px solid red;
    //   }
    //   .actives{
    //     height: auto;
    //     min-height: 90px;
    //     max-height:400px;
    //     overflow-y: scroll;
    //   }
    //   .banner-img{
    //     // float: left;
    //     width: 15px;
    //     float: right;
    //     margin-right: 10px;
    //     margin-top: 20px;
    //   }
    //   li{
    //      list-style: none;
    //     float: left;
    //     width: 128px;
    //     display: inline-block;
    //     // width: auto;
    //     // min-width: 50px;
    //     // width: 50px;
    //     margin-left: 8px;
    //     text-align: center;
    //     line-height: 27px;
    //     margin-top: 12px;
    //     height:27px;
    //     border-radius:14px;
    //     background:rgba(151,151,151,0.1);
    //     border:1px solid rgba(255,255,255,1);
    //     overflow: hidden;
    //     padding-left: 5px;
    //     padding-right: 5px;
    //     overflow: hidden;
    //     text-overflow: ellipsis;
    //     display: -webkit-box;
    //     -webkit-line-clamp: 1;
    //     line-clamp: 1;
    //     -webkit-box-orient: vertical;
    //   }
    //   .lilength{
    //     width: 128px;
    //   }
    //   .active1{
    //   background:rgba(168,253,183,0.2);
    //   color: rgba(27,191,151,1);
    //   border:1px solid rgba(27,191,151,1);
    //   width: 60px;
    // }
    // .active2{
    //   background:rgba(168,253,183,0.2);
    //   color: rgba(27,191,151,1);
    //   border:1px solid rgba(27,191,151,1);
    //   width: 128px;
    // }
    //   .button-contain{
    //     display: flex;
    //     .van-button{
    //       // border:1px solid #f5f5f5;
    //       width: 50px;
    //       // margin-left: 80px;
    //       margin-top: 10px;
    //       margin-bottom: 10px;
    //       border-radius:5px;
    //       justify-content:  center;
    //     }
    //     .left{
    //       border:1px solid rgba(252,114,16,1);
    //       color:rgba(252,114,16,1);
    //       background-color:#fff;
    //       margin-left: 104px;
    //     }
    //     .right{
    //       border:1px solid rgba(252,114,16,1);
    //       color:#fff;
    //       background-color:rgba(252,114,16,1);
    //       margin-left: 16px;
    //     }
    //   }
    // }
    .goods-list {
      .noimg {
        width: 175px;
        height: 175px;
        margin-left: 100px;
        margin-top: 20px;
      }
      // position: fixed;
      margin-top: 40px;
      // padding-bottom: 10px;
      // height: 560px;
      height: 100%;
      // overflow-y: scroll;
      ul li {
        list-style: none;
      }
      ul {
        background: #f8f8f8;
        height: 100%;
      }
      .van-list {
        height: 100%;
        // min-height: 100px;
      }
      li {
        // margin:0px -1px -1px 0px ;
        width: 170px;
        height: 210px;
        margin-left: 12px;
        margin-top: 5px;
        float: left;
        background-color: #fff;
        border-radius: 16px;
        // border:1px solid red;
        .img {
          width: 140px;
          height: 140px;
          overflow: hidden;
          margin-left: 20px;
          // border:1px solid red;
          img {
            width: 140px;
            height: 140px;
            border: 1px solid #f8f8f8;
            border-radius: 4px;
          }
        }
        .price {
          float: left;
          width: 69px;
          height: 15px;
          margin-left: 20px;
          font-size: 15px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(252, 106, 3, 1);
          line-height: 15px;
        }
        .money {
          font-size: 9px;
        }
        .name {
          text-align: center;
          height: auto;
          overflow: hidden;
          width: 145px;
          margin-left: 20px;
          font-size: 14px;
          font-family: PingFang-SC-Medium, PingFang-SC;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          line-height: 20px;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          text-align: left;
        }
        .cart {
          float: left;
          margin-left: 60px;
          width: 15px;
          height: 15px;
        }
        .price_underlined {
          float: left;
          width: 69px;
          height: 15px;
          margin-left: 20px;
          font-size: 12px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          line-height: 15px;
          text-decoration: line-through;
          color: #bfbfbf;
        }
      }
    }
  }
}
</style>
