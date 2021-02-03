<template>
  <div class="home" id="boxFixed">
    <van-pull-refresh
      v-model="isLoading"
      success-text="刷新成功"
      @refresh="onRefresh"
    >
      <div class="home_top">
        <div class="input_box_home">
          <div
            :class="
              isFixedType ? 'home_topInput home_topInputed' : 'home_topInput'
            "
          >
            <div class="search-box">
              <div class="input-search-icon">
                <input
                  v-model="value"
                  class="van-search-input"
                  @click="gohistory()"
                  placeholder="请输入名称、品牌、型号、编码"
                />
                <img src="@/assets/img/big_b.png" class="icon-img" />
              </div>
              <!-- <div class="search-button" @click="search">搜索</div> -->
            </div>
          </div>
        </div>

        <!-- 轮播 -->
        <div class="home_swipe">
          <van-swipe
            class="my-swipe"
            :autoplay="3000"
            indicator-color="white"
            :stop-propagation="stopPropagationFalse"
            v-if="acvitityData.length > 0"
            @change="loadImage"
          >
            <van-swipe-item v-for="(item, index) in acvitityData" :key="index">
              <!-- :src="apiHost + '/image' + item.bannerPictureFile" -->
              <img
                :src="apiHost + '/image' + item.relationPic"
                class="banner-img"
                @click="goActivity(item)"
                :id="'banner_' + index"
              />
            </van-swipe-item>
          </van-swipe>
          <van-swipe
            class="my-swipe"
            :autoplay="3000"
            indicator-color="white"
            :stop-propagation="stopPropagationFalse"
            v-else
          >
            <van-swipe-item>
              <img
                src="@/assets/img/specificbanner.jpg"
                class="banner-img"
                @click="goActivity('item')"
              />
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>

      <div class="title_top">
        <Notice class="noticeLists" :message="messages"></Notice>
        <!-- <van-row>
          <van-col span="8" class="van_col van_col_left">
            <img src="@/assets/img/vip_b.png" class="banner-img" />
            <span>VIP服务</span>
          </van-col>
          <van-col span="8" class="van_col van_col_center">
            <img src="@/assets/img/logistics_b.png" class="banner-img" />
            <span>物流快递</span>
          </van-col>
          <van-col span="8" class="van_col van_col_right">
            <img src="@/assets/img/safeguard_b.png" class="banner-img" />
            <span>服务保障</span>
          </van-col>
        </van-row> -->
        <div class="van_row">
          <van-row>
            <van-col span="4" class="van_colspanri">
              <div class="class-box" @click="goList(0)">
                <img src="@/assets/img/g_library.png" class="banner-img" />
                <span>商品库</span>
              </div>
            </van-col>
            <van-col span="4" class="van_colspan">
              <div class="class-box" @click="goList(2)">
                <img src="@/assets/img/g_order.png" class="banner-img" />
                <span>订单管理</span>
              </div>
            </van-col>
            <van-col v-if="authorities.InvoiceManagement&&authorities.InvoiceManagementModule" span="4" class="van_colspan">
              <div class="class-box" @click="goList(1)">
                <img src="@/assets/img/g_invoice.png" class="banner-img" />
                <span>发票管理</span>
              </div>
            </van-col>
            <van-col  span="4" class="van_colspanle">
              <div class="class-box" @click="goList(3)">
                <img src="@/assets/img/g_invoicetop.png" class="banner-img" />
                <span>发票抬头</span>
              </div>
            </van-col>
          </van-row>
        </div>
      </div>
      <!-- <div class="home_Activity">
        <div class="Activity_left" @click="goActivityPage(0)">
          <img src="@/assets/img/advertising1.png" class="banner-img" />
        </div>
        <div class="Activity_right" @click="goActivityPage(1)">
          <img src="@/assets/img/advertising2.png" class="banner-img" />
        </div>
      </div>-->
      <!--客服-->
      <div class="hot-goods">
        <van-sticky :offset-top="49">
          <div class="title">
            <div class="detail_title">
              <div class="detail_top">
                <van-button
                  :class="
                    left_after == 99999 ? 'title-button' : 'title-button_after'
                  "
                  @click="left_after_btn(99999, 0)"
                  size="small"
                >
                  <!-- <div class="left-icon"></div> -->
                  精品推荐
                  <span class="title_span" v-if="left_after == 99999"></span>
                </van-button>
                <van-button
                  v-for="(res, index) in tabName"
                  :key="index"
                  :class="
                    left_after == index ? 'title-button' : 'title-button_after'
                  "
                  size="small"
                  @click="left_after_btn(index, 99, res)"
                >
                  {{ res.name }}
                  <span class="title_span" v-if="left_after == index"></span>
                </van-button>
                <van-button
                  class="title-button_after"
                  @click="left_after_btn(999999, -1)"
                  size="small"
                >
                  更多
                  <span class="title_span" v-if="left_after == 999999"></span>
                </van-button>
              </div>
            </div>
          </div>
        </van-sticky>
        <div class="hotgoods_body" v-if="listShow">
          <div class="hotgoods_list" v-if="listData.length > 0">
            <!-- 奇数列 -->
            <div class="item_Odd">
              <div
                class="item_goods"
                v-for="(item, index) in listDataOdd"
                :key="index"
              >
                <van-image
                  @click="details(item.skuId)"
                  :src="apiHost + '/image' + item.mainPictureUrl"
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
              </div>
            </div>
            <!-- 欧数列 -->
            <div class="item_Even">
              <div
                class="item_goods"
                v-for="(item, index) in listDataEven"
                :key="index"
              >
                <van-image
                  @click="details(item.skuId)"
                  :src="apiHost + '/image' + item.mainPictureUrl"
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
              </div>
            </div>
          </div>
          <div v-else class="noSome">
            <img src="@/assets/img/noSome.png" />
          </div>
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
    </van-pull-refresh>
    <div class="returnTop" v-if="returnTopType">
      <img src="@/assets/img/g_returnTop.png" @click="gotoTop" />
    </div>
  </div>
</template>
<script>
import {
  NavBar,
  Search,
  Button,
  List,
  Icon,
  Grid,
  GridItem,
  Swipe,
  SwipeItem,
  Col,
  Row,
  Field,
  PullRefresh,
  Image as VanImage,
  Toast,
  Sticky,
  Dialog,
} from "vant";
import ColorThief from "colorthief";

import proList from "@/components/Goods";
import Notice from "./Component/Notice/Notice";
import { mapState } from "vuex";
import {
  getFunction,
  postFunction,
  putFunction,
  deleteFunction,
} from "@/utils/request";

export default {
  name: "Home",
  inject: ["ifHead"],
  data() {
    return {
      authorities:this.$authorities,
      isFixedType: false,
      returnTopType: false,
      messages: [],
      stopPropagationFalse: false,
      tabName: [],
      listShow: false,
      dialogShow: true,
      showMoveDot: [], //控制下落的小圆点显示隐藏
      elLeft: 0, //当前点击购物车按钮在网页中的绝对top值
      elTop: 0, //当前点击购物车按钮在网页中的绝对left值
      bannerImages: ["@/assets/img/baner1.jpg", "@/assets/img/baner1.jpg"],
      value: null,
      RecommendGoods: [],
      navList: [],
      activityNavList: [],
      pageNum: 1,
      pageSize: 15,
      finished: false,
      loading: false,
      isLoading: false,
      apiHost: this.$auth.os.lxapp
        ? process.env.VUE_APP_BASE_API
        : location.origin.indexOf("localhost") > -1
        ? "https://shoppemobiletest2.66123123.com"
        : location.origin,
      projectId: null,
      url: {
        list: `/api/shoppe-api-service/moblie/order-management/home/detail/preview`,
        frequentlySku: `/api/shoppe-api-service/mobile/sku/frequentlySku-list`,
        addcar: `/api/shoppe-api-service/mobile/cart/`,
        num: `/api/shoppe-api-service/mobile/cart/sku-count`,
        navFirstLevel: `/api/shoppe-api-service/mobile/sku/nav-first-level`,
        acvitityList: `/api/shoppe-api-service/mobile/acvitity/list`,
        notice: `/api/shoppe-api-service/mobile/shoppe/notice/push-list`,
        newColumnList: `/api/shoppe-api-service/mobile/sku/column-list`,
        columnSkuList: `/api/shoppe-api-service/mobile/sku/column-sku-list`,
      },
      left_after: 99999,
      listData: [],
      listDataOdd: [],
      acvitityData: [
        {
          name: "string",
          navigationInfo: "string",
          relation: "",
          relationPic: "string",
          relationType: "URL",
          showPositionType: "BANNER",
          weight: 0,
        },
        {
          name: "string",
          navigationInfo: "string",
          relation: "string",
          relationPic: "string",
          relationType: "ACTIVITY",
          showPositionType: "BANNER",
          weight: 0,
        },
        {
          name: "string",
          navigationInfo: "string",
          relation: "string",
          relationPic: "string",
          relationType: "NAVIGATION",
          showPositionType: "BANNER",
          weight: 0,
        },
      ],
      listDataEven: [],
      userApp: false,
    };
  },
  computed: {
    ...mapState(["cartnum"]),

    // userInfo
  },
  activated() {
    this.$store.commit("changefoot", true);
    this.$auth.os.lxapp && this.initplus();
    localStorage.removeItem("goodssearchvalue");
    // this.nums();
  },
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Search.name]: Search,
    [List.name]: List,
    [Icon.name]: Icon,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [VanImage.name]: VanImage,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Col.name]: Col,
    [Row.name]: Row,
    [PullRefresh.name]: PullRefresh,
    [Toast.name]: Toast,
    [Sticky.name]: Sticky,
    [Dialog.name]: Dialog,
    proList,
    [Notice.name]: Notice,
    Notice,
  },
  created() {
    localStorage.removeItem("goodssearchvalue");
    window.localStorage.setItem("HaveFooter", true);
    this.$store.commit("changefoot", true);
    this.projectId = window.localStorage.getItem("projectId");
    this.$auth.os.lxapp && this.initplus();
    this.nums();
    this.notice();
    // this._navFirstLevel(this.url.navFirstLevel);
    this._acvitityList(this.url.newColumnList);
  },

  mounted() {
    // this.getNav();
    this.frequentlySku(this.url.frequentlySku);
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    console.log(1321351);
  },
  methods: {
    handleScroll() {
      console.log();
      if (document.querySelector("#boxFixed")) {
        let scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop; // 滚动条偏移量
        let offsetTop = document.querySelector("#boxFixed").offsetTop; // 要滚动到顶部吸附的元素的偏移量
        let clientHeight = document.documentElement.clientHeight; //可视区域高度
        let scrollHeight = document.querySelector("#boxFixed").scrollHeight; //滚动内容高度
        // console.log(scrollTop>175,clientHeight);

        this.isFixedType = scrollTop > 175 ? true : false; // 如果滚动到顶部了，this.isFixed就为true
        this.returnTopType = scrollTop > clientHeight * 2 ? true : false; // 如果滚动到顶部了，this.isFixed就为true
      }
    },
    notice() {
      postFunction(this.url.notice, { pageNum: 1, pageSize: 9999 }).then(
        (res) => {
          if (res.code == "000000") {
            this.messages = res.data.items;
          }
        }
      );
    },
    gotoTop() {
      window.scrollTo(0, 0); //回滚顶部
    },
    _acvitityList(url) {
      getFunction(url).then((res) => {
        this.acvitityData = !res.data["BANNER"] ? [] : res.data["BANNER"];
        this.tabName = !res.data["NAVIGATION"] ? [] : res.data["NAVIGATION"];
      });
    },
    _navFirstLevel(url) {
      getFunction(url).then((res) => {
        if (res.code == "000000") {
          this.tabName = res.data;
        }
      });
    },
    buttomdialogShow() {
      Dialog.confirm({
        title: "客服电话：17310160103",
        // message: "17310160103",
        confirmButtonColor: "#1BBF97",
        showCancelButton: false,
      }).then(() => {});
    },
    left_after_btn(val, code, data) {
      this.left_after = val;
      if (code > 0) {
        // var skuList = `/api/shoppe-api-service/mobile/sku/${code}/nav-skuList`;
        // getFunction(skuList).then((res) => {
        //   if (res.code == "000000") {
        //     this.listDataOdd = [];
        //     this.listDataEven = [];
        //     var _this = this;
        //     res.data.forEach((element, index) => {
        //       if (index % 2 == 0) {
        //         _this.listDataOdd.push(element);
        //       } else {
        //         _this.listDataEven.push(element);
        //       }
        //     });
        //     this.listData = res.data;
        //     console.log(10);
        //   }
        // });

        this.goActivity(data, "column");
      } else if (code == -1) {
        this.$router.push({
          name: "LibraryGoods",
        });
      } else {
        this.frequentlySku(this.url.frequentlySku);
      }
    },
    initplus() {
      this.userApp = true;
      if (window.plus) {
        this.plusReady();
      } else {
        document.addEventListener("plusready", this.plusReady, false);
      }
    },
    plusReady() {
      plus.navigator.setStatusBarBackground("#fff");
      plus.navigator.setStatusBarStyle("dark");
    },
    onRefresh() {
      this.frequentlySku(this.url.frequentlySku, true);
      this.left_after_btn(99999, 0);

      this.getGoods(this.url.list, true);
    },
    details(value) {
      console.log(value);
      this.$router.push({
        name: "ProductDetails",
        query: { skuId: value, type: 2 },
      });
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
        .getElementById("appCart")
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
    aaaaaa(val) {
      console.log(val);
    },
    gohistory() {
      this.$router.push({
        name: "History",
      });
    },
    // 购物车数量
    nums() {
      getFunction(this.url.num).then((res) => {
        if (res.code == "000000") {
          this.$store.commit("cartNum", res.data);
        }
      });
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
            // this.nums();
          }
        }
      );
    },
    frequentlySku(val, unloading) {
      getFunction(val, unloading).then((res) => {
        if (res.code == "000000") {
          this.listDataOdd = [];
          this.listDataEven = [];
          this.listData = res.data;
          this.listShow = true;
          var _this = this;
          res.data.forEach((element, index) => {
            if (index % 2 == 0) {
              _this.listDataOdd.push(element);
            } else {
              _this.listDataEven.push(element);
            }
          });
          console.log(_this.listDataOdd, _this.listDataEven);
        }
      });
    },
    goList(val) {
      if (val == 0) {
        this.$router.push({
          name: "LibraryGoods",
        });
      }
      if (val == 1) {
        this.$router.push({
          name: "InvoiceAdmin",
          query: { source: 0 },
        });
      }
      if (val == 2) {
        this.$router.push({
          name: "Order",
          query: { source: 0 },
        });
      }
      if (val == 3) {
        this.$router.push({
          name: "InvoiceTitle",
          query: { source: 0 },
        });
      }
    },
    onChange(val) {
      this.active = val;
    },
    search() {
      if (this.value) {
        this.$router.push({
          name: "LibraryGoods",
          query: { search: this.value },
        });
      }
    },
    goActivityPage(val) {
      if (val == 0) {
        this.$router.push({
          name: "ActivityPage",
        });
      } else if (val == 1) {
        this.$router.push({
          name: "ActivityPageT",
        });
      } else if (val == 2) {
        this.$router.push({
          name: "ActivityPageOne",
        });
      } else if (val == 3) {
        this.$router.push({
          name: "ActivityPageTwo",
        });
      } else if (val == 4) {
        this.$router.push({
          name: "ActivityPagethree",
        });
      } else if (val == 5) {
        this.$router.push({
          name: "ActivityPageFour",
        });
      }
    },
    goActivity(val, data) {
      if (!!val.relation) {
        if (val.relationType.code == "1") {
          if (this.$auth.os.lxapp) {
            plus.webview.open(val.relation);
          } else {
            window.open(val.relation, "_blank");
          }
        } else if (val.relationType.code == "2") {
          this.$router.push({
            name: "Activity",
            query: { id: val.relation },
          });
        } else if (val.relationType.code == "3") {
          let navTion = `/api/shoppe-api-service/acvitity/${val.relation}/activityNavigation`;
          this._activityNavigation(navTion, data);
        }
      }
    },
    _activityNavigation(url,data) {
      var code = "";
      getFunction(url).then((res) => {
        var code = "";
        if (res.data.firstLevelCode) {
          code = res.data.firstLevelCode;
        }
        if (res.data.secondLevelCode) {
          code = res.data.secondLevelCode;
        }
        if (res.data.thirdLevelCode) {
          code = res.data.thirdLevelCode;
        }
        if (!data) {
          this.$router.push({
            name: "MoreList",
            query: { code: code, type: 'Navigation' },
          });
        } else {
          let data = {
            code: code,
            pageNo: 1,
            pageSize: 20,
          };
          postFunction(this.url.columnSkuList, data).then((res) => {
            if (res.code == "000000") {
              this.listDataOdd = [];
              this.listDataEven = [];
              this.listData = res.data.items;
              this.listShow = true;
              var _this = this;
              res.data.items.forEach((element, index) => {
                if (index % 2 == 0) {
                  _this.listDataOdd.push(element);
                } else {
                  _this.listDataEven.push(element);
                }
              });
            }
          });
        }
      });
    },
    onLoad() {
      // this.getGoods(this.activityNavList[0].id, this.pageNum);
    },
    getGoods(url, unloading) {
      this.finished = true;
      console.log(unloading);
      postFunction(url, {}, unloading).then((res) => {
        if (res.code == "000000") {
          this.RecommendGoods = res.data;
          this.loading = false;
          this.finished = true;
          this.isLoading = false;
        }
      });
      // console.log(this.RecommendGoods, "RecommendGoods");
    },
    loadImage(index) {
      //图片加载完成后调用
      // console.log(index)
      let filterbg = "#banner_" + index;
      let domImg = document.querySelector(filterbg);
      let colorthief = new ColorThief();
      // this.bacolor = colorthief.getPalette(domImg)[0];
      // console.log(domImg);
      //		    this.$emit('changeColor',this.bacolor)//往父级传值
      // let color = `rgb(${this.bacolor[0]},${this.bacolor[1]},${this.bacolor[2]})`;
      // console.log(this.transferRgbToStr(color));
    },
    transferRgbToStr(color) {
      if (
        (typeof color !== "string" && !(color instanceof String)) ||
        !~color.indexOf("rgb")
      )
        return console.error("请输入rgb形式的颜色值");
      color = color.replace(/\s+/g, "");
      var index = color.indexOf("(") + 1;
      //注意： String 的slice方法，slice方法参数为负数时，即为倒数
      // substring 方法参数为负数时，全都认为是0
      var colors = color.slice(index, -1).split(",").slice(0, 3);
      for (var i = 0; i < colors.length; i++) {
        if (parseInt(colors[i], 10) > 255 || parseInt(colors[i], 10) < 0)
          return console.error("颜色值范围在0到255之间，请注意输入值！");
        colors[i] = parseInt(colors[i], 10).toString(16);
        if (colors[i].length === 1) {
          colors[i] = "0" + colors[i];
        }
      }
      return colors.join("");
    },
    getNav() {},
    initplused() {
      if (window.plus) {
        this.value = "exist";
        this.plusReadyed();
      } else {
        this.value = "Listener";
        document.addEventListener("plusready", this.plusReadyed, false);
      }
    },
    plusReadyed() {
      this.value = "plusReady";
      plus.navigator.setStatusBarBackground("#F8F8F8");
      plus.navigator.setStatusBarStyle("dark");
    },
  },
  beforeDestroy() {
    this.initplused();
  },
  beforeCreate() {
    this.$store.commit("changefoot", true);
  },
};
</script>


<style scoped lang="less">
.home {
  background: #fff;
  min-height: 100%;
  color: #333333;

  background: #f8f8f8;
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
      background: rgb(47, 115, 205);
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
  // margin-left: 300px;
  .home_top {
    // background: #1bbf97;
    height: 200px;
    .input_box_home {
      margin-top: 10px; 
      width: 375px;
      height: 40px;
      // position: absolute;
      .home_topInput {
        top: 0px;
        left: 0px;
        background: #f8f8f8;
        display: inline-block;
        width: 100%;
        position: fixed;
        _position: relative;
        z-index: 99;
      }
      .home_topInputed {
        background: #f8f8f8;
      }
      .search-box {
        padding-top: 10px;
        width: 375px;
        display: flex;
        // background: #fff;
        height: 40px;
        justify-content: space-around;
        .input-search-icon {
          width: 350px;
          height: 32px;
          float: right;
          position: relative;
          .van-search-input {
            width: 350px;
            height: 32px;
            line-height: 35px;
            // border: 1px solid #333333;
            color: #888888;
            background: #fff;
            border-radius: 16px;
            display: inline-block;
            position: absolute;
            left: 0;
            top: 0;
            padding-left: 44px;
            font-size: 14px;
            box-sizing: border-box;
          }
          .icon-img {
            width: 15px;
            height: 15px;
            position: absolute;
            left: 16px;
            top: 8px;
          }
        }
        .search-button {
          width: 64px;
          height: 33px;
          font-size: 18px;
          color: #fff;
          line-height: 33px;
          border-radius: 16px;
          background: linear-gradient(to right, #edcfa2, #d7a269);
          text-align: center;
        }
      }
    }
    .home_swipe {
      width: 375px;
      // margin-top: -50px;
      .my-swipe {
        height: 195px;
        line-height: 195px;
        text-align: right;
        .banner-img {
          width: 375px;
          height: 195px;
          line-height: 160px;
          // margin-top: 10px;
        }
        .van-swipe__indicators {
          background-color: #39a9ed;
        }
      }
    }
  }

  .title_top {
    width: 375px;
    font-size: 16px;
    margin-top: 45px;
    text-align: center;
    .noticeLists {
      // width: 375px;
      height: 28px;
      line-height: 2;
    }
    .van_col {
      font-size: 12px;
      display: flex;
      font-weight: 500;
      color: #979797;
      width: 120px;
      .banner-img {
        width: 18px;
        height: 17px;
        margin-right: 2px;
      }
    }
    .van_col_center {
      padding-left: 30px;
    }
    .van_col_left {
      text-align: left;
      padding-left: 15px;
    }
    .van_col_right {
      float: right;
      padding-left: 30px;
    }
    .van_row {
      margin: 10px auto;
      border-radius: 16px;
      width: 350px;
      background: #fff;
      // border: 1px solid #f0f1f0;
      // box-shadow: 0px 2px 4px 4px rgba(240, 241, 240, 0.5);
      .van_colspan {
        margin: 0 19px;
      }
      .van_colspanle {
        margin: 0 2px 0 18px;
      }
      .van_colspanri {
        margin: 0 18px 0 2px;
      }
      .class-box {
        padding: 12px 0;
        display: flex;
        font-weight: 500;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        font-size: 12px;
        .banner-img {
          width: 40px;
          height: 40px;
          margin-bottom: 4px;
        }
      }
    }
  }
  .home_Activity {
    display: flex;
    width: 370px;
    font-size: 16px;
    margin-top: -10px;

    .Activity_left {
      width: 170px;
      height: 90px;
      margin: 0 0 0 15px;
      background-image: linear-gradient(-15deg, #e6ecf4, #f9fbfe);
      border-radius: 8px;
      p {
        margin: 10px;
      }
      .banner-img {
        width: 175px;
      }
    }
    .Activity_right {
      width: 170px;
      height: 90px;
      margin: 0 15px 0 0;
      background-image: linear-gradient(-15deg, #e6ecf4, #f9fbfe);
      border-radius: 8px;
      p {
        margin: 10px;
      }
      .banner-img {
        width: 175px;
      }
    }
  }
  .hot-goods {
    padding-bottom: 60px;
    margin-top: 14px;
    box-sizing: border-box;
    // background: #fff;
    // width: 375;
    .title {
      width: 100%;
      padding: 0 6px;
      display: flex;
      justify-content: space-between;
      color: #333333;
      box-sizing: border-box;
      background: #f8f8f8;
      .title-left {
        width: 80px;
        font-size: 18px !important;
        font-weight: bold;
        display: inline-block;
        align-items: center;
        // margin-top: -7px;
        border: none;
        padding: 0;
        .left-icon {
          width: 2px;
          height: 14px;
          background-color: #1bbf97;
          margin-right: 4.5px;
          padding: 0 8px;
        }
      }
      .title-button_after {
        font-weight: bold;
        font-size: 14px !important;
        color: #979797;
        background: #f8f8f8;
      }
      .title-button {
        color: #333333;
        font-weight: bold !important;
        background: #f8f8f8;
        // border: 1px solid  #11bbbb;
      }
      .title_span {
        display: block;
        margin: 0 auto;
        width: 20px;
        height: 2px;
        background: #1bbf97;
        border: 1px solid #1bbf97;
        border-radius: 2px;
      }
      .title-left_after {
        width: 80px;
        font-size: 14px !important;
        display: inline-block;
        color: #979797;
        align-items: center;
        // margin-top: -7px;
        border: none;
        padding: 0;

        .left-icon {
          width: 2px;
          height: 14px;
          background-color: #1bbf97;
          margin-right: 4.5px;
        }
      }
      .detail_title {
        width: 360px;
        // margin-left: 75px;
        overflow-x: scroll;
        overflow-y: hidden;
        white-space: nowrap;

        background: #f8f8f8;
        // display: flex;
        .detail_top {
          width: auto;
          // height: 20px;
          font-size: 15px;
          box-sizing: border-box;
          margin: 1px 0 7px 0px;
          // display: inline-block;
          .van-button {
            font-weight: 500;
            border: none;
            // height: 20px;
            font-size: 18px;
          }
          .van-button:before {
            // margin-top: 10px;
            padding: 0;
          }
          .tabClaed {
            width: 50px;
            margin: 0 5px;
            color: #979797;
            text-align: center;
            display: inline-block;
            img {
              width: 10px;
            }
          }
          .tabClass {
            font-weight: bold;
            color: #1bbf97;
            width: 50px;
            margin: 0 10px;
            text-align: center;
            display: inline-block;
            img {
              width: 20px;
            }
          }
        }
      }
    }
    .hotgoods_body {
      // background: #956131;
      // overflow-y: hidden;
      // overflow-x: auto;
      // margin: 0 12px;
      padding: 0 12px;
      width: 100%;
      display: inline-block;
      // box-sizing:border-box;
      // margin-bottom: 60px;
      // height: 180px;
      .hotgoods_list {
        font-size: 26px;
        // width: 360px;
        // display: block;
        float: left;
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
        .item_Odd {
          width: 175px;
          display: inline-block;
          float: left;
          margin-right: 3px;
        }
        .item_Even {
          width: 175px;
          display: inline-block;
          float: right;
        }
      }
    }
  }
  .noSome {
    margin: 10px;
    text-align: center;
    img {
      height: 100px;
    }
  }
  .service {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    // background: #000;
    display: block;
    right: 0px;
    img {
      width: 48px;
      height: 48px;
      margin-top: -48px;
    }
  }
  .returnTop {
    // width: 80px;
    position: fixed;
    // background: #f00;
    _position: relative;
    right: 0;
    bottom: 40%;
    font-size: 10px;
    img {
      width: 40px;
      height: 40px;
    }
  }
}
</style>