<!--
 * @Descripttion: 
 * @version: 
 * @Author: ShiRuiCe
 * @Date: 2020-12-11 10:54:44
-->
<template>
  <div class="ActivityPageFour">
    <inputTop :type="7" :badge="badge"></inputTop>
    <img src="@/assets/img/preferential.jpg" class="banner-img" />
    <div class="hotgoods_body">
      <div class="hotgoods_list">
        <div v-for="(rem, index) in list" :key="index" class="list_all">
          <div class="list_type">
            <div class="rem_type">{{ rem.type }}</div>
          </div>
          <div class="list_body">
            <div class="item_goods" v-for="(item, i) in rem.childList" :key="i">
              <van-image
                @click="details(item.skuId)"
                :src="item.skuUrl"
                fit="contain"
                class="img_boy"
              />
              <div class="goods-name">{{ item.skuName }}</div>
              <div class="goods-btom">
                <span class="skuyqty_left">
                  <i style="font-size: 10px">￥</i>
                  {{ item.skuPrice }}
                </span>
                <span class="skuyqty_right">
                  <img
                    src="@/assets/img/plus_o.png"
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
      </div>
    </transition>
  </div>
</template>

<script>
import inputTop from "@/components/topTitle";
import { Image as VanImage } from "vant";
import {
  getFunction,
  postFunction,
  putFunction,
  deleteFunction,
} from "@/utils/request";
export default {
  name: "ActivityPageFour",
  components: {
    [VanImage.name]: VanImage,
    inputTop,
  },
  data() {
    return {
      badge: "0",
      list: [
        {
          type: "热销推荐",
          childList: [
            {
              type: "热销推荐",
              sku: 10522907,
              skuName:
                "联想 Lenovo E490 14英寸商务轻薄窄边框笔记本电脑 四核i5-8265u 8G内存 256G固态 1TB双硬盘 黑 计价单位:台",
              skuPrice: "6062",
              skuId: 722557,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-07-02/ddda5689-a061-4069-a1e9-d9e3206cf1bd.jpg",
            },
            {
              type: "热销推荐",
              sku: 10462200,
              skuName:
                "联想 Lenovo ThinkPad E490 笔记本电脑 i5-8265U 8G 128GBSSD 1T 2G独显 14英寸 黑色 计价单位:台",
              skuPrice: "5759",
              skuId: 619687,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-05-21/9b5e69cd-64cc-4826-a1f8-7ce605f02b5a.jpg",
            },
            {
              type: "热销推荐",
              sku: 10587110,
              skuName:
                "联想 Lenovo E490 2DCD 翼系列笔记本电脑 14英寸 I5-8265U 8GB 1TB+128GB SSD 2GB独显 WIN10HB 银色 计价单位:台",
              skuPrice: "5800",
              skuId: 809418,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-08-13/dbc3e52f-e66f-4129-9541-58fc55bb36c7.jpg",
            },
            {
              type: "热销推荐",
              sku: 10569246,
              skuName:
                "浪潮 INSPUR NF5280M5 2U机架式服务器 至强金牌5215*2 6*32GB 240GB+2*600GB+6*4TB RS0820P 2*800W 改配 计价单位:台",
              skuPrice: "55650",
              skuId: 779849,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-07-29/f4e1126f-440f-419b-a5db-3964c31dc956.jpg",
            },
            {
              type: "热销推荐",
              sku: 10064960,
              skuName:
                "惠普 HP 452dn PageWidepro 彩色喷墨打印机A4自动双面复印机 计价单位:台",
              skuPrice: "5980",
              skuId: 29822,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-08-21/6df94585-0ac8-4f4a-b974-75976e881c49.jpg",
            },
            {
              type: "热销推荐",
              sku: 10137783,
              skuName:
                "方正 Founder FR3230S 数码复合机 标配 白色 可打印 复印 扫描 计价单位:台",
              skuPrice: "21980",
              skuId: 306918,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-11-06/7e562391-fbf8-43d1-b851-0e38811e5c59.jpg",
            },
            {
              type: "热销推荐",
              sku: 10576709,
              skuName:
                "京瓷 KYOCERA P2040dn 黑白激光打印机 A4幅面 双面打印 有线网络连接 计价单位:台",
              skuPrice: "2680",
              skuId: 787787,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-10-28/2887735d-6caf-4cc4-988d-732c57e63e11.jpg",
            },
            {
              type: "热销推荐",
              sku: 10115480,
              skuName:
                "奔图 Pantum P3370dn 黑白激光打印机 灰色 A4幅面 计价单位:台",
              skuPrice: "1560",
              skuId: 208383,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-10-21/f0fa5dbb-1125-46bb-8a65-5a91f0704b7f.jpg",
            },
            {
              type: "热销推荐",
              sku: 10066159,
              skuName:
                "富士施乐 Fujixerox CT202344 原装墨粉盒 适用于施乐五代4070 5070 计价单位:支",
              skuPrice: "798",
              skuId: 28500,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-08-21/56b8e32c-7c25-4b26-a2c3-85fe8924b9dd.jpg",
            },
            {
              type: "热销推荐",
              sku: 10055013,
              skuName:
                "惠普 HP CF032A 646A 原装硒鼓 黄色 适用于HPColorLaserJetCM4540系列 计价单位:支",
              skuPrice: "1979",
              skuId: 72602,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-08-25/02a33ef8-5729-4973-8665-0bbc206bada8.jpg",
            },
            {
              type: "热销推荐",
              sku: 10601569,
              skuName:
                "格力 GREE KFR-26GW/(26563)FNhAd-B1JY01 挂式空调 冷暖 变频 1匹 一级能效 白色 六年保修 计价单位:套",
              skuPrice: "3220",
              skuId: 826799,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-09-10/3fbbc4f3-54ca-4e5c-8cf0-b01926102e78.jpg",
            },
            {
              type: "热销推荐",
              sku: 10602074,
              skuName:
                "格力 GREE KFR-35GW/(35563)FNhAd-B1JY01 挂式空调 冷暖 变频 1.5匹 一级能效 白色 六年保修 计价单位:套",
              skuPrice: "4068",
              skuId: 827222,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-09-10/abc0865d-1148-4fbe-8f71-0f35a6d5bf81.jpg",
            },
            {
              type: "热销推荐",
              sku: 10354845,
              skuName:
                "TCL TCL 50A360 智能液晶电视机 4K 超高清 50英寸 黑色 计价单位:台",
              skuPrice: "4980",
              skuId: 511118,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-03-10/7d41985f-faa2-4e16-b2fb-4b5d3d132f5f.jpg",
            },
            {
              type: "热销推荐",
              sku: 10128553,
              skuName:
                "康佳(Konka) LED55G30UE 55寸超清电视机 分辨率3840*2160 支持有线 无线连接 一年保修 包底座 计价单位:台",
              skuPrice: "2860",
              skuId: 274709,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-10-30/8eee3926-df7a-4440-afc4-6adb9f6f8180.jpg",
            },
          ],
        },
        {
          type: "暖冬必备",
          childList: [
            {
              type: "暖冬必备",
              sku: 10652526,
              skuName: "先锋 HN413PS-20 取暖器 白色 计价单位:台",
              skuPrice: "900",
              skuId: 905277,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-09-22/38657436-b508-4304-abd9-285cd4daa5a0.jpg",
            },
            {
              type: "暖冬必备",
              sku: 10298410,
              skuName:
                "先锋 Singfun HD953RC-22 踢脚线取暖器 2200W 白色 计价单位:台",
              skuPrice: "920",
              skuId: 435420,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-01-03/82368477-aa7c-4470-877e-b9f852a895d5.jpg",
            },
            {
              type: "暖冬必备",
              sku: 10298404,
              skuName:
                "先锋 Singfun HN412PS-20R 塔式暖风机 2200W 黑色 计价单位:台",
              skuPrice: "900",
              skuId: 435450,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-01-03/f7793923-8c5a-40b2-86a7-a58ba326fa43.jpg",
            },
            {
              type: "暖冬必备",
              sku: 10651420,
              skuName: "先锋 HD2028RC-22R 取暖器 金色 计价单位:台",
              skuPrice: "594",
              skuId: 904238,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-09-22/ba07da2a-ed96-434b-b41a-0b1811d0dffd.jpg",
            },
            {
              type: "暖冬必备",
              sku: 10655183,
              skuName: "先锋  NSB-8DQ8 取暖器 白色 计价单位:台",
              skuPrice: "219",
              skuId: 906953,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-09-23/d0775442-9905-450f-bb33-60536cbb9937.jpg",
            },
            {
              type: "暖冬必备",
              sku: 10212822,
              skuName:
                "先锋  CY55MM-15 取暖器 静音 油汀 14片电热油 计价单位:台",
              skuPrice: "900",
              skuId: 341247,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-09-04/b5293759-0a1c-467b-9637-7bfd190fb93b.png",
            },
            {
              type: "暖冬必备",
              sku: 10079626,
              skuName:
                "美的 Midea NY2213-17B 取暖器 油汀式 13片电热油汀防烫 静音节能家用 计价单位:台",
              skuPrice: "980",
              skuId: 19204,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-09-06/dcd435e1-6eaf-4055-8736-a555d62d6609.jpg",
            },
            {
              type: "暖冬必备",
              sku: 10079693,
              skuName:
                "美的 Midea NY2513-16J1W 电热油汀电暖器 13片 黑色 计价单位:台",
              skuPrice: "460",
              skuId: 19167,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-10-17/4ae2288e-f986-4a0a-a4b3-0d01bdbee248.jpg",
            },
          ],
        },
        {
          type: "厨房电器",
          childList: [
            {
              type: "厨房电器",
              sku: 10373743,
              skuName:
                "苏泊尔 Supor SF40FD6188 电饭锅 豪华智能 立体加热 4L 计价单位:台",
              skuPrice: "299",
              skuId: 533023,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-03-21/6eec9ec4-5a87-437f-ac1e-17566ee392e0.jpg",
            },
            {
              type: "厨房电器",
              sku: 10493033,
              skuName:
                "西屋 Westinghouse WFB-HS0454 破壁料理机 全智能 玫瑰金 计价单位:台",
              skuPrice: "1100",
              skuId: 655377,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-06-03/b0f5635e-77ca-48ec-b621-f55d0c86f49c.jpg",
            },
            {
              type: "厨房电器",
              sku: 10493033,
              skuName:
                "康宁(CORNING) WK-EK/KZ/PK 四季养生壶 1.7L 220*172*263mm 计价单位:个",
              skuPrice: "399",
              skuId: 694992,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-06-19/848513ca-a878-4a0e-8b00-e6edf9d79f06.jpg",
            },
            {
              type: "厨房电器",
              sku: 10438804,
              skuName:
                "苏泊尔 Supor JD30A60 电饼铛 双面加热 直径30cm 粉色 计价单位:个",
              skuPrice: "249",
              skuId: 620450,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-05-21/bed24cee-9d8f-422c-a321-d7b62420be0b.jpg",
            },
            {
              type: "厨房电器",
              sku: 10750660,
              skuName:
                "康宁 WK-XD9003/KZ 果蔬清洗机 家用全自动 白色 计价单位:台",
              skuPrice: "999",
              skuId: 1039749,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-12-08/6948a5cf-a0a3-4c29-9c12-abb5ba87efd8.png",
            },
            {
              type: "厨房电器",
              sku: 10477641,
              skuName:
                "美的 Midea MF-TN1501 空气炸锅 1.5L大容量 旋钮式 黑色 计价单位:台",
              skuPrice: "269",
              skuId: 674984,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-06-11/65e6db19-0f09-46f9-b741-93a17533f52f.jpg",
            },
            {
              type: "厨房电器",
              sku: 10494612,
              skuName:
                "摩飞 Morphyrichards MR6255 干果机 轻奢蓝 8L 计价单位:台",
              skuPrice: "349",
              skuId: 696214,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-06-20/635ad51d-10f9-44dc-848f-70f277b99ba8.png",
            },
            {
              type: "厨房电器",
              sku: 10750357,
              skuName:
                "康宁 WK-KF0601/KZ 滴漏式咖啡茶饮机 蓝灰色 600ml 计价单位:台",
              skuPrice: "199",
              skuId: 1039146,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-12-08/3804aa8a-5e82-42d4-bedb-90eb966489e1.jpg",
            },
          ],
        },
        {
          type: "礼盒礼品",
          childList: [
            {
              type: "礼盒礼品",
              sku: 10746293,
              skuName: "洽洽 1460g 坚果礼盒 10包 计价单位:盒",
              skuPrice: "169",
              skuId: 1034497,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-12-04/ca6ab1b7-8120-4447-85c5-08ad80c11634.jpg",
            },
            {
              type: "礼盒礼品",
              sku: 10142542,
              skuName: "贝蒂斯 750ml*2瓶 橄榄油双支礼盒 特级初榨 计价单位:盒",
              skuPrice: "259",
              skuId: 317048,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-11-11/cfc957df-80b8-4a79-bd15-3ac2919f55ac.jpg",
            },
            {
              type: "礼盒礼品",
              sku: 10751547,
              skuName: "中粮 A型 春节乐享团圆大礼包 3161g+900ml 计价单位:盒",
              skuPrice: "109",
              skuId: 1039826,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-12-09/0b124c1a-0d2f-4dc5-a955-1e32eef3d416.jpg",
            },
            {
              type: "礼盒礼品",
              sku: 10746424,
              skuName:
                "小罐茶(XIAOGUANCHA) 40g 乌龙茶 礼盒装 金罐 10罐 计价单位:盒",
              skuPrice: "449",
              skuId: 1034573,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-12-04/e36d0515-af70-4c69-9c5d-8e340a8f66fa.jpg",
            },
          ],
        },
        {
          type: "氛围文化",
          childList: [
            {
              type: "氛围文化",
              sku: 10746504,
              skuName: "福人福地 40*13*5.5cm 吉祥礼盒套装 牛年标配 计价单位:套",
              skuPrice: "69",
              skuId: 1034490,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-12-04/ed373fa2-5eee-4a80-91fc-050123ddf9b9.jpg",
            },
            {
              type: "氛围文化",
              sku: 10746742,
              skuName:
                "福人福地 39*5*5cm 红色吉祥小礼盒套装02 牛年标配 计价单位:套",
              skuPrice: "29",
              skuId: 1034751,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-12-04/5f9d8599-bf10-46f8-ac4a-9fb9ef8cb640.jpg",
            },
            {
              type: "氛围文化",
              sku: 10746615,
              skuName: "福人福地 40*45cm 纸品礼包套装 牛年标配 计价单位:套",
              skuPrice: "19",
              skuId: 1034717,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-12-04/f8e926fa-71a1-46ba-95ec-eeb52cb97337.jpg",
            },
            {
              type: "氛围文化",
              sku: 10746790,
              skuName: "福人福地 48*16.4cm 木质大挂件 福牛 计价单位:个",
              skuPrice: "59",
              skuId: 1034794,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-12-04/ca734f22-d87d-4916-bbd0-e0ffa7150094.jpg",
            },
          ],
        },
        {
          type: "精致生活",
          childList: [
            {
              type: "精致生活",
              sku: 10701575,
              skuName:
                "小甘菊 Herbacin 呵护礼盒钥匙链款 护手霜套装 计价单位:套",
              skuPrice: "199",
              skuId: 975384,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-11-02/f10f0d9c-533a-4a83-ad2d-c0970e1ecec2.jpg",
            },
            {
              type: "精致生活",
              sku: 10723456,
              skuName:
                "外交官 DIPLOMAT HM-1582L 时尚休闲双肩包 浅灰色 290*120*420mm 计价单位:个",
              skuPrice: "299",
              skuId: 1006716,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-11-17/813755ae-07be-4c64-92f3-b2a69a5e1e16.jpg",
            },
            {
              type: "精致生活",
              sku: 10745955,
              skuName:
                "水卫仕 3瓶 洗衣机槽清洁剂375g+厨房重油污净500g+浴室清洁剂500ml 计价单位:组",
              skuPrice: "79",
              skuId: 1034084,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-12-04/db021835-ed32-4456-be93-942f3e9d110c.jpg",
            },
            {
              type: "精致生活",
              sku: 10706263,
              skuName:
                "黑人 Darlie 640g 超白极尚护龈牙膏超值装8支 多效护理 呵护牙龈 计价单位:组",
              skuPrice: "89",
              skuId: 980240,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-11-04/031bddbb-c0e0-4ce2-ae27-5d37de7c344a.jpg",
            },
            {
              type: "精致生活",
              sku: 10248177,
              skuName: "戴森 Dyson HD03 吹风机 紫红色 560g 计价单位:个",
              skuPrice: "2869",
              skuId: 391832,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-12-12/4c499f93-7fe2-41f1-b007-27a2cf9eadd9.jpg",
            },
            {
              type: "精致生活",
              sku: 10746450,
              skuName:
                "沃品(WOPOW) WH-05 暖手宝移动电源 10000毫安 红色 计价单位:个",
              skuPrice: "159",
              skuId: 1034463,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-12-04/9aaa93e9-017f-4b59-8e83-0d58ee2fb516.jpg",
            },
            {
              type: "精致生活",
              sku: 10377213,
              skuName:
                "LIFETRONS  NS-400 纳米喷雾补水仪 励富创  珍珠白 计价单位:个",
              skuPrice: "349",
              skuId: 538146,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-03-28/bfcfba06-37ea-41c5-8202-7f4a120bdc73.jpg",
            },
            {
              type: "精致生活",
              sku: 10391655,
              skuName:
                "康宁(CORNING) WK-FC-600/KZ 折叠水壶 600ml 195*117*175mm 女王红 计价单位:个",
              skuPrice: "199",
              skuId: 558726,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-04-11/f2e57edd-98d6-4679-af73-8eadf0ad8d8f.jpg",
            },
            {
              type: "精致生活",
              sku: 10746616,
              skuName:
                "现代(HYUNDAI) YH-C009 多功能无线充台灯蓝牙音箱 白色 计价单位:台",
              skuPrice: "299",
              skuId: 1034669,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-12-04/4c83a3d6-1d88-413f-ae7c-294b00d90c97.jpg",
            },
            {
              type: "精致生活",
              sku: 10391554,
              skuName:
                "康宁(CORNING) WK-ETM-700/KZ 电热水杯 全自动 双层 不锈钢 700ml 计价单位:个",
              skuPrice: "299",
              skuId: 558621,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-04-11/70ee6346-74ed-46d9-8f87-990f27aa442b.jpg",
            },
          ],
        },
        {
          type: "健康生活",
          childList: [
            {
              type: "健康生活",
              sku: 10273861,
              skuName:
                "乐范 LF-E001-TRD 石墨烯加热按摩眼罩 时尚红（计价单位:个）",
              skuPrice: "299",
              skuId: 409324,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-12-04/080b089a-0566-42d7-bcde-c65d78034c32.png",
            },

            {
              type: "健康生活",
              sku: 10391445,
              skuName:
                "凯伦诗 CLORIS-F635 智能二合一足浴足疗盆 咖啡色 计价单位:个",
              skuPrice: "799",
              skuId: 558473,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-04-11/857455c7-cb89-4865-8d61-37df2fc96677.jpg",
            },
            {
              type: "健康生活",
              sku: 10750715,
              skuName:
                "SKG SKG k5ya-l 时尚颈椎按摩仪 肩颈按摩器 4098时尚款 白色 计价单位:台",
              skuPrice: "399",
              skuId: 1039854,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-12-08/8d5df68d-5262-48f1-8f67-d027fa65cebf.jpg",
            },
            {
              type: "健康生活",
              sku: 10750802,
              skuName:
                "霍尼韦尔 Honeywell APC20FC0455W 车载空气净化器 白色 计价单位:台",
              skuPrice: "499",
              skuId: 1040279,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-12-08/395b1c27-2d60-48c1-99a1-0357c0acf41a.png",
            },
            {
              type: "健康生活",
              sku: 10443999,
              skuName:
                "康强 KQ-ONE 商用大跑台交流变频马达跑步机 2150*860*1530mm 智能彩屏 计价单位:台",
              skuPrice: "13000",
              skuId: 610846,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-05-18/aa640c35-f05d-4988-a6cc-811de3535922.jpg",
            },
            {
              type: "健康生活",
              sku: 10115603,
              skuName: "军霞 JX JX-S1006 健身车 计价单位:个",
              skuPrice: "3650",
              skuId: 212515,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-10-21/325f4eb7-2063-4da8-a636-db0de261caec.jpg",
            },
            {
              type: "健康生活",
              sku: 10617074,
              skuName:
                "军霞 JX JX-1400 综合训练器家用多功能健身器材 三人站大型力量健身运动组合套装器械 计价单位:台",
              skuPrice: "4060",
              skuId: 845090,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-08-31/a4ac0b50-a3ab-49f0-b128-7e1f883e4304.jpg",
            },
            {
              type: "健康生活",
              sku: 10534998,
              skuName:
                "凯速 KANSOON 19cm 健腹轮 国潮风巨轮 红黑色 400*170mm 计价单位:个",
              skuPrice: "80",
              skuId: 738478,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-07-09/75dfc508-87e6-4251-98ea-58727fe1a437.jpg",
            },
          ],
        },
        {
          type: "家居/家具",
          childList: [
            {
              type: "家居/家具",
              sku: 10751007,
              skuName: "双立人 ZW-EY006 中式煎炒锅三件套装 黑色 计价单位:套",
              skuPrice: "799",
              skuId: 1040340,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-12-08/85e2560c-7dcb-4dd9-8108-6d574d748d31.jpg",
            },
            {
              type: "家居/家具",
              sku: 10750595,
              skuName:
                "康宁 OV12/CN 百丽餐具耐热玻璃碗碟套装 12件套 琥珀色 计价单位:套",
              skuPrice: "359",
              skuId: 1039803,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-12-08/bfe04f67-50a8-48ae-a207-c5b2ae2ec51e.jpg",
            },
            {
              type: "家居/家具",
              sku: 10742794,
              skuName: "德世朗 DZX-TZ036A 臻享套装A 杯壶 1500ml 计价单位:套",
              skuPrice: "199",
              skuId: 1028405,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-12-01/2f006cc7-776e-4fdd-b0a9-8c181336d504.jpg",
            },
            {
              type: "家居/家具",
              sku: 10062789,
              skuName: "双立人 ZW-K309 S系列刀具4件 红黑 计价单位:套",
              skuPrice: "599",
              skuId: 68950,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-08-25/ab1744d7-faf0-47fc-af2f-62ca72a8b104.jpg",
            },
            {
              type: "家居/家具",
              sku: 10751388,
              skuName:
                "洁丽雅 JLYGD001 双面60S贡缎四件套 1.5米床适用 卡莎绿 计价单位:套",
              skuPrice: "599",
              skuId: 1040468,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-12-09/64d573d6-2b8c-45be-aefa-301a65ad6c38.jpg",
            },
            {
              type: "家居/家具",
              sku: 10723503,
              skuName:
                "博洋宝贝 BEYOND KIDS BYYM606 馨典蚕丝羊毛子母被 200*230cm 计价单位:条",
              skuPrice: "499",
              skuId: 1006804,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-11-17/bb587e97-e88d-4855-9571-066ae7872359.png",
            },
            {
              type: "家居/家具",
              sku: 10281556,
              skuName:
                "洁丽雅 Grace 雅致-6 全棉毛巾礼盒 混色 1条浴巾135*70cm 1条面巾68*34cm 1条方巾34*34cm 计价单位:盒",
              skuPrice: "99",
              skuId: 414852,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-12-25/d9b643f0-0c3b-4a89-ade3-0753934400ba.jpg",
            },
            {
              type: "家居/家具",
              sku: 10749617,
              skuName: "内野 R20448-N 樱花套装礼盒-7件套 计价单位:套",
              skuPrice: "149",
              skuId: 1038976,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-12-08/d74afa31-23e8-4940-9b6e-45741b1192ea.png",
            },
            {
              type: "家居/家具",
              sku: 10495093,
              skuName:
                "水星家纺 117764 磨毛四件套 DH兰风铃 含被套 200*230cm 床单 230*250cm 枕套*2 48*74cm 计价单位:套",
              skuPrice: "399",
              skuId: 696266,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-06-21/3dd4e454-77dc-477c-8fcf-a1aecf2d1811.jpg",
            },
            {
              type: "家居/家具",
              sku: 10080474,
              skuName:
                "甬康达 BGX-D1-1000 电子密码保管箱 1070*520*450mm 古铜色 计价单位:台",
              skuPrice: "2280",
              skuId: 56602,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-08-24/d24b7ce9-f742-42e8-9d8d-217738a7a2c6.jpg",
            },
            {
              type: "家居/家具",
              sku: 10080476,
              skuName:
                "甬康达 1850 连体 通门带斗 电子密码锁保密柜 灰白色 1850*900*400mm 计价单位:台",
              skuPrice: "2998",
              skuId: 56600,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-10-30/271e8b1b-bca6-40ed-85e1-641e178cad73.jpg",
            },
            {
              type: "家居/家具",
              sku: 10080478,
              skuName:
                "甬康达 1850 分体带斗 高级密码锁 保密柜 灰白色 1850*900*400mm 计价单位:个",
              skuPrice: "2998",
              skuId: 56599,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-10-27/39500d98-ebaa-48b2-a66d-bc275e78fc3b.jpg",
            },
            {
              type: "家居/家具",
              sku: 10118538,
              skuName:
                "国保 Guub E2 密码文件柜 整体双门 1900*900*430mm 计价单位:个",
              skuPrice: "1900",
              skuId: 234838,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-10-24/7829d956-4e52-4b3b-b39c-d6878c2dd56b.jpg",
            },
            {
              type: "家居/家具",
              sku: 10115094,
              skuName:
                "国保 Guub Z168-V3 指纹保密柜 整体四门 双节 双色 计价单位:组",
              skuPrice: "3300",
              skuId: 213090,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-10-21/8fb36bc8-db91-4536-b752-dd9d7106e2f5.jpg",
            },
            {
              type: "家居/家具",
              sku: 10316622,
              skuName:
                "臻远  zycz-64 通双节保密柜 国宝锁 900*430*1850mm 计价单位:组",
              skuPrice: "2000",
              skuId: 460542,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-02-04/fd71910d-5d25-45d8-912f-84dd4d3aa0c6.jpg",
            },
            {
              type: "家居/家具",
              sku: 10316557,
              skuName:
                "臻远  zycz-58 单节带斗保密柜 电子锁 900*430*1850mm 计价单位:组",
              skuPrice: "1100",
              skuId: 460495,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-02-04/51ac87c5-3228-42b3-a224-a1f365d3d311.jpg",
            },
            {
              type: "家居/家具",
              sku: 10316656,
              skuName:
                "臻远  zycz-20 手机屏蔽柜 四节 60格 1727*776*360mm 计价单位:台",
              skuPrice: "8900",
              skuId: 460370,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-02-03/d6350beb-8c7f-45bf-b1c6-3876d52fe309.jpg",
            },
            {
              type: "家居/家具",
              sku: 10316659,
              skuName:
                "臻远  zycz-17 手机屏蔽柜 单节 20格 240*776*460mm 计价单位:台",
              skuPrice: "3000",
              skuId: 460294,
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-02-03/fb2a475a-699f-40c5-97c9-9de4435ea507.jpg",
            },
          ],
        },
      ],
      url: {
        addcar: `/api/shoppe-api-service/mobile/cart/`,
        num: `/api/shoppe-api-service/mobile/cart/sku-count`,
      },
      showMoveDot: [], //控制下落的小圆点显示隐藏
      elLeft: 0, //当前点击购物车按钮在网页中的绝对top值
      elTop: 0, //当前点击购物车按钮在网页中的绝对left值
    };
  },
  computed: {},

  beforeCreate() {
    this.$store.commit("changefoot", false);
  },

  methods: {
    details(val) {
      this.$router.push({
        name: "ProductDetails",
        query: { skuId: val, type: "ActivityPageFour" },
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
    addcart(val) {
      console.log(val);
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
    gointocart() {
      this.$router.push({ name: "Cart" });
    },
  },
};
</script>

<style scoped lang='less'>
.ActivityPageFour {
  font-size: 16px;
  background: url("../../assets/img/bg2.png");
  background-size: 375px;
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
    display: inline-block;
    .hotgoods_list {
      font-size: 26px;
      width: 360px;
      display: block;
      float: left;
      .list_all {
        display: block;
        .list_type {
          height: 50px;
          width: 360px;
          text-align: center;
          //   display: inline-block;
          background: url("../../assets/img/bg3.png") center no-repeat;
          background-size: 181px;

          .rem_type {
            margin: 0 auto;
            color: #fff;
            text-align: center;
            line-height: 50px;
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
            color: #e33838;
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
              color: #e33838;
              font-weight: bold;
              i {
                font-weight: 400;
              }
            }
            .skuyqty_right {
              float: right;
              margin-top: 5px;
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
