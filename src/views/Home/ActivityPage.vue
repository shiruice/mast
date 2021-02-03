<template>
  <div class="ActivityPage">
    <inputTop :type="7" :badge="badge"></inputTop>
    <img src="@/assets/img/baner2.jpg" class="banner-img" />

    <!-- <div class="body_detail">
      <div class="detail_title">
        <div class="detail_top">
          <div
            v-for="(res,index) in table"
            :key="index"
            :class="tabCla==index?'tabClass':'tabClaed'"
            @click="goToTab(index)"
          >{{res.name}}</div>
        </div>
      </div>
    </div>-->
    <div class="hotgoods_body">
      <div class="hotgoods_list">
        <div v-for="(rem,index) in list" :key="index" class="list_all">
          <div class="list_type">
            <div>
              <img src="@/assets/img/back2.png" />
            </div>
            <div class="rem_type">{{rem.type}}</div>
            <span class="rem_span" @click="getMore(rem.code,2)">更多</span>
          </div>
          <div class="list_body">
            <div class="item_goods" v-for="(item,i) in rem.childList" :key="i">
              <van-image
                @click="details(item.skuId)"
                :src="item.skuUrl"
                fit="contain"
                class="img_boy"
              />
              <div class="goods-name">{{item.skuName}}</div>
              <div class="goods-btom">
                <span class="skuyqty_left">
                  <span style="font-size:10px">￥</span>
                  {{item.skuPrice}}
                </span>
                <span class="skuyqty_right">
                  <img src="@/assets/img/car_mini.png" @click="addcart(item.skuId)" width="17px" />
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
    <!-- 小球 -->
    <transition
      appear
      @before-appear="beforeEnter"
      @enter="enter"
      @after-appear="afterEnter"
      v-for="(item,index) in showMoveDot"
      :key="index.id"
    >
      <div class="move_dot" ref="ball" v-if="item" :style="{top:elTop+'px',left:elLeft+'px'}">
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
  name: "ActivityPage",
  data() {
    return {
      list: [
        {
          type: "军事训练器材",
          code: "12008",
          childList: [
            {
              type: "军事训练器材",
              sku: 10311620,
              skuName:
                "丛林狐 Jung le fox EVA发泡靶 身型靶靶板 军训器材 计价单位:个",
              skuPrice: "27.70",
              skuId: 453630,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-01-13/79693b3f-cf68-4a9f-b858-c573f6b472d1.jpg",
            },
            {
              type: "军事训练器材",
              sku: 10311607,
              skuName:
                "丛林狐 Jung le fox 00365 正面头靶纸 20*30cm 50张/包 计价单位:包",
              skuPrice: "21",
              skuId: "453631",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-01-13/687f2b93-b77e-42ba-9e5d-3ea26fb0c0c3.jpg",
            },
            {
              type: "军事训练器材",
              sku: 10238668,
              skuName:
                "先锋连  50*100cm 户外野战训练专用 半身靶纸 20张 黑色 计价单位:套",
              skuPrice: "67",
              skuId: "382224",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-12-09/ed4f5eff-0a7b-40bc-9748-2e87c0725d22.jpg",
            },
            {
              type: "军事训练器材",
              sku: 10238670,
              skuName:
                "先锋连  3*2cm 户外野战训练专用 胸部环靶纸 20张 黑白色 计价单位:套",
              skuPrice: "62.20",
              skuId: "382222",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-12-09/66fe12fc-331d-4005-aa0a-57b3ba60a83e.jpg",
            },
            {
              type: "军事训练器材",
              sku: 10238740,
              skuName:
                "先锋连  4*2cm 户外野战训练专用  挟持人质双头靶纸 20张 彩色 计价单位:套",
              skuPrice: "114",
              skuId: "382238",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-12-09/3a7c55f3-2b9b-42a3-ac82-834c139433ee.jpg",
            },
            {
              type: "军事训练器材",
              sku: 10237721,
              skuName:
                "丛林狐 Jung le fox WJXL-BXDGN型 起倒多功能靶机 70*36.5*34cm 军绿色 计价单位:台",
              skuPrice: "19112",
              skuId: "379531",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-12-06/a828adec-45c8-491f-8c94-65a17dae1cb7.jpg",
            },
            // {
            //   type: "军事训练器材",
            //   sku: 10237717,
            //   skuName:
            //     "丛林狐 Jung le fox 46*26*35cm 便捷式升降靶机 军绿色 计价单位:台",
            //   skuPrice: "11017",
            //   skuId: "379536",
            //   skuUrl:
            //     "https://lxerp.66123123.com/image/sku/2019-12-06/c235b622-7147-49be-bb44-a3e9aa411b75.jpg",
            // },
          ],
        },
        {
          type: "军用服装",
          code: "12009",
          childList: [
            {
              type: "军用服装",
              sku: 10121644,
              skuName: "兵行者  C130 吉利服伪装衣 荒漠迷彩 均码 计价单位:件",
              skuPrice: "368",
              skuId: "213446",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-10-21/a198974a-9cf1-4387-8584-5bbb1e055841.jpg",
            },
            {
              type: "军用服装",
              sku: 10236172,
              skuName: "丛林狐 宽1.5m 帆布布料 加厚款 武款迷彩 计价单位:米",
              skuPrice: "43.10",
              skuId: "378843",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-12-06/7bbe5bfc-5b7d-472e-9772-2995034a46f2.jpg",
            },
            {
              type: "军用服装",
              sku: 10121361,
              skuName: "丛林狐  款式一 多功能战术背心 黑色 计价单位:件",
              skuPrice: "282",
              skuId: "229491",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-10-23/0f71a7fa-d974-40e9-80e4-56ea434c6c37.jpg",
            },
            {
              type: "军用服装",
              sku: 10121434,
              skuName: "丛林狐 001 作训服套装 林地迷彩款 计价单位:套",
              skuPrice: "148",
              skuId: "229303",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-10-23/623f29cd-202e-4f54-9ec1-2e3c4ec2c6d3.jpg",
            },
            {
              type: "军用服装",
              sku: 10121382,
              skuName: "丛林狐 黑色 内穿式软质防刺服 计价单位:件",
              skuPrice: "340",
              skuId: "229390",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-10-23/9aa17674-a0a2-45ad-b1a6-82b005557dc3.jpg",
            },
            {
              type: "军用服装",
              sku: 10121454,
              skuName: "丛林狐  丛林迷彩 软质防刺服 计价单位:件",
              skuPrice: "340",
              skuId: "229330",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-10-23/14554439-1d20-4dc5-8ef7-189afdbe8fff.jpg",
            },
            // {
            //   type: "军用服装",
            //   sku: 10121413,
            //   skuName: "丛林狐  111 硬质防爆铠甲 黑色 计价单位:套",
            //   skuPrice: "1685",
            //   skuId: "223178",
            //   skuUrl:
            //     "https://lxerp.66123123.com/image/sku/2019-10-22/28f8bce3-c017-47b0-a755-0cea8caab499.jpg",
            // },
          ],
        },
        {
          type: "携行具",
          code: "12013",
          childList: [
            {
              type: "携行具",
              sku: 10100131,
              skuName: "丛林狐  07 士兵折叠学习椅 迷彩 军绿色 计价单位:把",
              skuPrice: "137",
              skuId: "115762",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-09-17/f5adda8d-79ac-452f-8e4c-2755a9f286a8.jpg",
            },
            {
              type: "携行具",
              sku: 10315847,
              skuName:
                "丛林狐 Jung le fox 01B 迷彩登山包 70L大容量 计价单位:个",
              skuPrice: "92.9",
              skuId: "459107",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-01-20/cefe30c9-3eac-4312-9f6c-411dada9a17b.jpg",
            },
            {
              type: "携行具",
              sku: 10466612,
              skuName:
                "兵行者  L643 滚塑箱 给养器材单元箱 通用卧式箱 600*500*420cm 计价单位:个",
              skuPrice: "2251",
              skuId: "654555",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-05-14/5ff8bb2d-d6e6-403f-b987-6aeb126cec4b.jpg",
            },
            {
              type: "携行具",
              sku: 10434498,
              skuName:
                "兵行者  M022 部队给养器材滚塑箱 1580*810*670cm 计价单位:个",
              skuPrice: "6610",
              skuId: "612993",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-05-19/332204b4-ea15-46be-83bc-763f5d431fc1.jpg",
            },
            {
              type: "携行具",
              sku: 10121280,
              skuName: "丛林狐 陆款 马甲水壶袋 计价单位:个",
              skuPrice: "37.30",
              skuId: "229404",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-10-23/ff228ec5-fa06-4364-bae7-efff0c248378.jpg",
            },
            {
              type: "携行具",
              sku: 10238267,
              skuName:
                "先锋连 93型 野外行军训练应急救灾帐篷 军绿色 4.4*4.6m 计价单位:套",
              skuPrice: "10921",
              skuId: "382402",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-12-09/d34bfcf4-31cd-4076-a07b-f2232d7a5730.jpg",
            },
            {
              type: "携行具",
              sku: 10434715,
              skuName:
                "兵行者 07 单兵帐篷 2*2m 送铝箔防潮垫 数码迷彩 计价单位:顶",
              skuPrice: "459",
              skuId: "612432",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-05-18/01d3eead-6885-4e47-a473-fe2dfd6fe794.jpg",
            },
            {
              type: "携行具",
              sku: 10237703,
              skuName:
                "丛林狐 Jung le fox 70L 07寒区迷彩携行具背囊 大容量 荒漠迷彩 计价单位:个",
              skuPrice: "110",
              skuId: "379551",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-12-06/2f3c8d3c-d816-4610-82ec-b30276d7774b.jpg",
            },
            // {
            //   type: "携行具",
            //   sku: 10451474,
            //   skuName: "兵行者  C102 野战新材料塑料折叠桌 军绿色 计价单位:张",
            //   skuPrice: "526",
            //   skuId: "639526",
            //   skuUrl:
            //     "https://lxerp.66123123.com/image/sku/2020-05-27/fcd4785d-20f4-4592-93bd-f99bdbe1d775.png",
            // },
          ],
        },
        {
          type: "户外装备",
          code: "21001",
          childList: [
            {
              type: "户外装备",
              sku: 10123575,
              skuName:
                "兵行者 C351 绑腿沙袋 BXZ新配发 训练 数码迷彩 37*19cm 计价单位:副",
              skuPrice: "71.80",
              skuId: "214111",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-10-21/8251c06e-9c83-46ee-b3c3-a2b28cd9b32a.jpg",
            },
            {
              type: "户外装备",
              sku: 10121275,
              skuName: "丛林狐 M88 头盔帽套 荒漠迷彩 不含头盔 计价单位:个",
              skuPrice: "23.90",
              skuId: "229332",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-10-23/0d162cc0-d082-4def-ad07-42c2f1e71134.jpg",
            },
            {
              type: "户外装备",
              sku: 10360546,
              skuName: "丛林狐 Jung le fox 160*35*27cm 鞍马 田径训练器材 (高度可调节） 计价单位:个",
              skuPrice: "910",
              skuId: "518886",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-03-16/a7f12e55-2cd3-487c-a487-98bd1e6c00c9.jpg",
            },
            {
              type: "户外装备",
              sku: 10068920,
              skuName: "丛林狐 70cm 消防演习训练斧 没开刃 计价单位:个",
              skuPrice: "71.80",
              skuId: "25800",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-08-21/d63028c4-7c08-4340-8b7f-131c3c2e8fea.jpg",
            },
            {
              type: "户外装备",
              sku: 10237921,
              skuName: "先锋连 7m 军训体能训练器材 两杆两绳 计价单位:套",
              skuPrice: "5652",
              skuId: "382503",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-12-09/11a19d74-939d-4f9f-a815-a08df720d6d8.jpg",
            },
            {
              type: "户外装备",
              sku: 10121374,
              skuName:
                "丛林狐 1m*2m*10cm 可折叠训练手提垫 有机硅款 军绿色 计价单位:块",
              skuPrice: "368",
              skuId: "229309",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-10-23/892af57b-3802-4c55-8261-1c52164e4112.jpg",
            },
            // {
            //   type: "户外装备",
            //   sku: 10121373,
            //   skuName:
            //     "丛林狐  1m*2m*10cm 可折叠训练手提垫 军绿色 帆布款 计价单位:块",
            //   skuPrice: "440",
            //   skuId: "229317",
            //   skuUrl:
            //     "https://lxerp.66123123.com/image/sku/2019-10-23/9e8b9a54-b12a-467c-8b43-0343a15a4d1c.jpg",
            // },
          ],
        },
        {
          type: "运动防护",
          code: "21005",
          childList: [
            {
              type: "运动防护",
              sku: 10121449,
              skuName: "丛林狐 沙漠迷彩款 护膝护肘4件套 计价单位:套",
              skuPrice: "52.60",
              skuId: "232153",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-10-23/777307ff-e68d-4db0-94f8-15645e4bb6c7.jpg",
            },
            {
              type: "运动防护",
              sku: 10121380,
              skuName: "丛林狐 ACU迷彩款 护膝护肘4件套 计价单位:套",
              skuPrice: "52.60",
              skuId: "229389",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-10-23/901ebd80-0aec-4d04-9978-14cadb3bddc7.jpg",
            },
            {
              type: "运动防护",
              sku: 10314418,
              skuName: "丛林狐 Jung le fox 4件套 护膝护肘 黑色 计价单位:套",
              skuPrice: "52.60",
              skuId: "456598",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-01-16/55bf1153-e6b9-4787-8cbe-460f896395a4.jpg",
            },
            {
              type: "运动防护",
              sku: 10208204,
              skuName:
                "丛林狐 Jung le fox 15型 击剑护具套装 3kg 均码 林地数码 计价单位:套",
              skuPrice: "1005",
              skuId: "333632",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-11-18/9e7c83f0-0684-4e3e-878d-327246f3ab3a.jpg",
            },
            // {
            //   type: "运动防护",
            //   sku: 10121378,
            //   skuName: "丛林狐 CP迷彩款 护膝护肘4件套 计价单位:套",
            //   skuPrice: "52.60",
            //   skuId: "232152",
            //   skuUrl:
            //     "https://lxerp.66123123.com/image/sku/2019-10-23/c524688c-7307-4709-8ea2-3072b7d3dc93.jpg",
            // },
          ],
        },
      ],
      table: [
        { name: "军事训练器材" },
        { name: "军用服装" },
        { name: "携行具" },
        { name: "户外装备" },
        { name: "运动防护" },
      ],
      tabCla: 0,
      apiHost: this.$auth.os.lxapp
        ? process.env.VUE_APP_BASE_API
        : location.origin.indexOf("localhost") > -1
        ? "https://shoppemobiletest3.66123123.com"
        : location.origin,
      url: {
        list: `/api/shoppe-api-service/moblie/order-management/home/detail/preview`,
        frequentlySku: `/api/shoppe-api-service/mobile/sku/frequentlySku-list`,
        addcar: `/api/shoppe-api-service/mobile/cart/`,
        num: `/api/shoppe-api-service/mobile/cart/sku-count`,
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
    // this.list = this.list1;
    this.num();
  },
  methods: {
    getMore(code, level) {
      console.log(code, level);
      this.$router.push({
        name: "LibraryGoods",
        query: { code: code, level: level },
      });
    },
    goToTab(val) {
      this.tabCla = val;
      switch (val) {
        case 0:
          this.list = this.list1;
          break;
        case 1:
          this.list = this.list2;
          break;

        case 2:
          this.list = this.list3;
          break;
        case 3:
          this.list = this.list4;
          break;
        case 4:
          this.list = this.list5;
          break;
      }
      this.list = this.list;
      console.log(this.list);
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
    details(value) {
      console.log(value);
      this.$router.push({
        name: "ProductDetails",
        query: { skuId: value, type: 4 },
      });
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
    goBack() {
      this.$router.push({
        name: "Home",
      });
    },
  },
  beforeCreate() {
    this.$store.commit("changefoot", false);
  },
};
</script>

<style scoped lang="less">
.ActivityPage {
  font-size: 16px;
  background: #6dd197;
  min-height: 100%;
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
    margin-top: -5px;
    width: 100%;
  }
  .body_detail {
    .detail_title {
      height: 25px;
      width: 350px;
      margin: 10px;
      overflow-y: hidden;
      overflow-x: auto;
      .detail_top {
        width: 430px;
        height: 25px;
        font-size: 14px;
        box-sizing: border-box;
        display: flex;

        .tabClaed {
          //   width: 50px;
          margin: 0 10px;
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
          //   width: 50px;
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
    margin: 0 12px;
    width: 350px;
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
          line-height: 50px;
          float: left;
          //   margin: 0 auto;
          text-align: center;
          //   background: #f8f8f8;
          img {
            width: 120px;
          }
          .rem_type {
            margin: 0 auto;
            width: 120px;
            color: #fff;
            margin-top: -56px;
            font-size: 14px;
          }
          .rem_span {
            float: right;
            margin-top: -50px;
            font-size: 14px;
            margin-right: 20px;
            color: #666666;
          }
        }
        .list_body {
          display: inline-block;
          width: 360px;
          // float: left;
          background: #6dd197;
        }
        .item_goods {
          //   width: 100px;
          //   display: flex;
          background: #fff;
          margin: 100px 0;
          float: left;
          flex-direction: column;
          margin: 0 0px 10px 5px;
          box-sizing: border-box;
          border-radius: 8px;
          .img_boy {
            width: 160px;
            height: 160px;
            border: 1px solid #f8f8f8;
            border-radius: 4px;
            margin: 2px 0 0 2px;
          }
          .goods-name {
            width: 150px;
            height: 34px;
            margin: 8px 8px 0 8px;
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
            margin: 0 8px 8px 8px;

            font-size: 14px;
            .skuyqty_left {
              color: #FE5E41;
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