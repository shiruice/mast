<template>
  <div class="ActivityPageOne">
    <inputTop :type="7" :badge="badge"></inputTop>
    <img src="@/assets/img/electric.jpg" class="banner-img" />
    <img src="@/assets/img/electric4.jpg" class="banner_img" />
    <div class="hotgoods_body">
      <div class="hotgoods_list">
        <div v-for="(rem, index) in list" :key="index" class="list_all">
          <div class="list_type">
            <div
              class="rem_type"
              :style="{ lineHeight: rem.code == 100020005 ? '18px' : '35px' }"
            >
              <span>
                {{ rem.type }}
              </span>
            </div>
            <span class="rem_span" @click="getMore(rem.code, 2)">更多</span>
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
                  <span style="font-size: 10px">￥</span>
                  {{ item.skuPrice }}
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
  name: "ActivityPageOne",
  data() {
    return {
      list: [
        {
          type: "空调",
          code: "05006",
          childList: [
            {
              type: "空调",
              sku: 10131009,
              skuName:
                "美的 Midea KFR-35GW/BP3DN8Y-TA101(B1) 1.5匹 变频 壁挂式空调 白色 计价单位:台",
              skuPrice: "10341",
              skuId: "279007",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-08-05/8b26d1d2-edce-4032-ac9c-d12f91333ca8.jpg",
            },
            {
              type: "空调",
              sku: 10562679,
              skuName:
                "海信 Hisense BKFR-120LW/TUS-N2 立柜式空调 定频 5匹  冷暖 2级能效 白色 计价单位:套",
              skuPrice: "42918",
              skuId: "772535",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-07-25/9df5780f-b352-404b-93cf-8d05ef3e1362.jpg",
            },
            {
              type: "空调",
              sku: 10562560,
              skuName:
                "海信 Hisense BKFR-75LW/TSU-N2(P8) 立柜式空调 3匹 冷暖 定频 二级能效 白色 计价单位:套",
              skuPrice: "34296",
              skuId: "772497",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-07-24/2f967363-9594-46ac-9081-1e18d2a8eaad.jpg",
            },
            {
              type: "空调",
              sku: 10584876,
              skuName:
                "海信 Hisense KFR-72LW/G870C-X3 空调柜机 白色 冷暖 3匹 三级能效 双模变频 智能双清洁 计价单位:套",
              skuPrice: "9359",
              skuId: "805297",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-09-10/f427b8bd-9be2-4bf0-b7de-8b9df79a933b.png",
            },
            {
              type: "空调",
              sku: 10584246,
              skuName:
                "海信 Hisense KFR-50GW/G860D-X1 空调挂机 白色 冷暖 2匹 一级能效 双模变频 智能双清洁 计价单位:套",
              skuPrice: "7782",
              skuId: "803316",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-09-10/2922eda3-e39a-49a9-8a7b-d5d0b4110c81.png",
            },
            {
              type: "空调",
              sku: 10584877,
              skuName:
                "海信 Hisense KFR-50LW/G880X-X1 空调柜机 白色 冷暖 2匹 一级能效 双模变频 智能双清洁 计价单位:套",
              skuPrice: "8806",
              skuId: "805298",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-09-10/2922eda3-e39a-49a9-8a7b-d5d0b4110c81.png",
            },
            {
              type: "空调",
              sku: 10544813,
              skuName:
                "美的 Midea KFR-72LW/BP3DN8Y-YA401(1) 立柜式空调 3匹 变频冷暖  一级能效 白色 1775*405*405mm 计价单位:套",
              skuPrice: "9253",
              skuId: "751262",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-10-21/89dc426c-30a2-46b0-98bc-cb7d7ba13320.jpg",
            },
            {
              type: "空调",
              sku: 10544814,
              skuName:
                "美的 Midea KFR-51LW/BP3DN8Y-YA401(1) 立柜式空调 2匹 变频冷暖  一级能效 白色 1775*405*405mm 计价单位:套",
              skuPrice: "7707",
              skuId: "751241",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-10-21/c1c6edc9-b20f-4cf1-9a62-45f00a29c188.jpg",
            },
            {
              type: "空调",
              sku: 10579702,
              skuName:
                "海尔 Haier KFR-26GW/20MCA82  空调 大一匹 变频 冷暖 二级能效 白色 计价单位:套",
              skuPrice: "3160",
              skuId: "792211",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-08-19/93927cfb-0506-4a51-a181-0d6dceec4940.jpg",
            },
            {
              type: "空调",
              sku: 10430176,
              skuName:
                "海尔 Haier KF-120LW/6302K 5匹 单冷 立柜式空调 2级能效 计价单位:台",
              skuPrice: "12599",
              skuId: "605130",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-10-29/8d9098e1-b814-4114-81d6-d7c58d9fad68.jpg",
            },
            {
              type: "空调",
              sku: 10547482,
              skuName:
                "美的 Midea KFR-51QW/BP3DN8Y-D(2) 天花机空调 2匹 变频 冷暖型 新二级能效  计价单位:套",
              skuPrice: "8273",
              skuId: "752667",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-07-15/62607bfc-79cb-4634-8402-5aa2d023d11e.jpg",
            },
            {
              type: "空调",
              sku: 10420140,
              skuName:
                "格力 GREE KFR-26GW/(26539)NhAa-3 壁挂式空调 冷暖 大1匹 定频 俊扬 三级能效 白色 计价单位:台",
              skuPrice: "3290",
              skuId: "589692",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-05-06/94e0d19e-606a-46fc-86d1-4836b905b3b3.jpg",
            },
            {
              type: "空调",
              sku: 10547032,
              skuName:
                "美的 Midea KFR-120QW/BP2SDN8Y-D(2) 天花机空调 5匹 变频 新二级能效 冷暖型 计价单位:套",
              skuPrice: "13063",
              skuId: "752694",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-07-15/62607bfc-79cb-4634-8402-5aa2d023d11e.jpg",
            },
            {
              type: "空调",
              sku: 10540936,
              skuName:
                "美的 Midea KFR-120LW/BP3SDN8Y-PA401(2) 立式空调 柜机 冷静星 变频 冷暖 5P 二级能效 白棕色 计价单位:套",
              skuPrice: "13063",
              skuId: "747546",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-07-13/4e335010-28ac-4417-a770-de304bd5ebd1.jpg",
            },
            {
              type: "空调",
              sku: 10315709,
              skuName:
                "格力 GREE KFR-72LW/(72529)NhAa-3 立柜式空调 白色 3匹 定频 冷暖 计价单位:台",
              skuPrice: "7280",
              skuId: "458956",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-01-20/3bba9fa0-d1c9-4965-a973-da326caf3beb.jpg",
            },
            {
              type: "空调",
              sku: 10547033,
              skuName:
                "美的 Midea KFR-72QW/BP3DN8Y-D(2) 天花机空调 3匹 变频 新二级能效 冷暖型 计价单位:套",
              skuPrice: "10341",
              skuId: "752682",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-07-15/62607bfc-79cb-4634-8402-5aa2d023d11e.jpg",
            },
            {
              type: "空调",
              sku: 10544748,
              skuName:
                "美的 Midea KFR-26GW/BP3DN8Y-PC401(1) 壁挂式空调 1匹 变频冷暖  一级能效 白色 880*195*295mm 计价单位:套",
              skuPrice: "3353",
              skuId: "750727",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-07-15/4db4e9fb-6a7e-4760-8c79-c2deb1be28a9.jpg",
            },
            {
              type: "空调",
              sku: 10544730,
              skuName:
                "美的 Midea KFR-32GW/BP3DN8Y-PC401(1) 壁挂式空调 小1.5匹 变频冷暖  一级能效 白色 880*195*295mm 计价单位:套",
              skuPrice: "3515",
              skuId: "750739",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-07-15/9b1276ae-643b-465b-b176-1097aa9ff806.jpg",
            },
            {
              type: "空调",
              sku: 10544764,
              skuName:
                "美的 Midea KFR-72GW/BP3DN8Y-DA401(1) 壁挂式空调 3匹 变频冷暖  一级能效 白色 1230*295*355mm 计价单位:套",
              skuPrice: "8001",
              skuId: "750901",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-07-15/53549da5-9e8d-4282-b6ef-6a24fa40f55f.jpg",
            },
            {
              type: "空调",
              sku: 10133470,
              skuName:
                "格力 Gree KFR-120TW/(12520S)NhCa-3 中央空调 吸顶式 5匹 定频冷暖 38V 5匹 计价单位:台",
              skuPrice: "9785",
              skuId: "293844",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-11-01/50c68b25-43b8-46bb-b054-bdaac05f0bfb.jpg",
            },
          ],
        },
        {
          type: "厨房电器",
          code: "05002",
          childList: [
            {
              type: "厨房电器",
              sku: 10515338,
              skuName:
                "美的 Midea MJ-BL20B15 便携双杯榨汁机 迷你随行杯 可分体搅拌机 果汁辅食全能手 计价单位:套",
              skuPrice: "382",
              skuId: "716836",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-06-29/ee49314f-ec0a-4f47-b2cf-47c53a57993f.jpg",
            },
            {
              type: "厨房电器",
              sku: 10572642,
              skuName:
                "优食  US-I02 净食机 优食活氧羟基全智能 果蔬解毒消毒多功能 蔬菜食品清洗 家用食品净化器 白色 计价单位:台",
              skuPrice: "6686",
              skuId: "784415",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-07-31/542ba841-3ecd-4351-85bc-34cfd4674c11.jpg",
            },
            {
              type: "厨房电器",
              sku: 10129489,
              skuName:
                "美的 Midea C21-RT2171 电磁炉 触控黑晶面板 4D防水多功能 额定功率 2100w 280*350*60mm 黑色 计价单位:台",
              skuPrice: "382",
              skuId: "277064",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-10-18/58b9a0fd-e93f-4560-b9b1-c283dde12d17.jpg",
            },
            {
              type: "厨房电器",
              sku: 10466540,
              skuName:
                "西屋 Westinghouse WFB-HS2106 破壁料理机 全智能 玫瑰金 计价单位:台",
              skuPrice: "2280",
              skuId: "655413",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-06-03/3ed59336-5d64-4f4d-8a4d-20c2c5026bb1.jpg",
            },
            {
              type: "厨房电器",
              sku: 10062547,
              skuName:
                "九阳 Joyoung JYL-Y16 破壁机 可榨汁 双杯 智能加热 计价单位:台",
              skuPrice: "1627",
              skuId: "52049",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-08-23/84622f2d-93b2-4d2b-ae36-1664e14fb3f9.jpg",
            },
            {
              type: "厨房电器",
              sku: 10552292,
              skuName:
                "美的 Midea HT3088H 电压力锅 3L 双鼎釜 IH大火力 变压沸腾 计价单位:台",
              skuPrice: "1531",
              skuId: "760481",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-07-20/3babb211-f4c5-4f55-9b3f-bb999927eaf3.jpg",
            },
            {
              type: "厨房电器",
              sku: 10336275,
              skuName:
                "德龙 Delonghi ECAM350.75.S 全自动咖啡机 1450w 429*236*348mm 银色 计价单位:个",
              skuPrice: "16094",
              skuId: "485735",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-02-27/a19f8046-418a-4eb2-aa64-a5757ec6c899.jpg",
            },
            {
              type: "厨房电器",
              sku: 10377297,
              skuName:
                "美的 Midea MJ-BL1036A 高速加热浓香破壁机豆浆料理机 黑色 计价单位:台",
              skuPrice: "957",
              skuId: "538383",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-03-28/b7bb1a26-85a2-4937-8d94-8ed876f96a7d.jpg",
            },
            {
              type: "厨房电器",
              sku: 10462274,
              skuName:
                "美的 Midea MJ-BL1528A 破壁机 智频 静音破壁 养生料理机 加热 全自动 1.75L 计价单位:台",
              skuPrice: "1606",
              skuId: "629829",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-05-25/f5a3ca91-406e-4752-9c6b-ee48b1d8cf70.jpg",
            },
            {
              type: "厨房电器",
              sku: 10150185,
              skuName:
                "西屋 Westinghouse WAF-LZ3001 空气炸锅 3L 银色 计价单位:台",
              skuPrice: "478",
              skuId: "321762",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-11-13/1d06d2eb-dc7d-4e3f-a982-1f7636fab656.jpg",
            },
          ],
        },
        {
          type: "生活电器",
          code: "05007",
          childList: [
            {
              type: "生活电器",
              sku: 10377185,
              skuName: "美的 Midea MT3 除螨仪 有线手持 冰莹粉 计价单位:个",
              skuPrice: "1052",
              skuId: "538410",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-03-28/da8bef63-0df1-4034-ae76-2ad304775dfd.jpg",
            },
            {
              type: "生活电器",
              sku: 10553639,
              skuName:
                "美的 Midea YBJ10G3 挂烫机 智能 蒸汽 加热 家用 迷你  210*93*136mm 白色 计价单位:个",
              skuPrice: "382",
              skuId: "761736",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-07-21/c659a7c8-8f01-4e42-a85f-ca79620bde50.jpg",
            },
            {
              type: "生活电器",
              sku: 10139503,
              skuName:
                "美的 Midea VR05F5-TY 扫地机器人 家用清洁 除尘 全自动智能 计价单位:台",
              skuPrice: "1244",
              skuId: "308449",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-11-07/746666e5-903c-46a1-906f-713d87be29a8.jpg",
            },
            {
              type: "生活电器",
              sku: 10212822,
              skuName:
                "先锋  CY55MM-15 取暖器 静音 油汀 14片电热油 计价单位:台",
              skuPrice: "1340",
              skuId: "341247",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-09-04/b5293759-0a1c-467b-9637-7bfd190fb93b.png",
            },
            {
              type: "生活电器",
              sku: 10223891,
              skuName:
                "美的 Midea NTH22-18AR 立塔式取暖器  静音 冷暖两用 计价单位:台",
              skuPrice: "1244",
              skuId: "360170",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-11-28/79de1dda-1c2a-4c09-9f05-b2260f5b5c46.jpg",
            },
            {
              type: "生活电器",
              sku: 10079693,
              skuName:
                "美的 Midea NY2513-16J1W 电热油汀电暖器 13片 黑色 计价单位:台",
              skuPrice: "640",
              skuId: "19167",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-10-17/4ae2288e-f986-4a0a-a4b3-0d01bdbee248.jpg",
            },
            {
              type: "生活电器",
              sku: 10391791,
              skuName:
                "莱克 LEXY ismart 51 大吸力智能扫地机 智能规划路线 计价单位:台",
              skuPrice: "2873",
              skuId: "558901",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-04-11/626c338e-7334-485f-b802-843a75b78abf.jpg",
            },
            {
              type: "生活电器",
              sku: 10224475,
              skuName:
                "海尔 Haier KJ700F-N800C 空气净化器 安全除醛 智能WIFI 381*381*754mm 白色 计价单位:台",
              skuPrice: "4310",
              skuId: "360940",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-11-28/2b0b8a04-5b1f-48bc-8dc5-dd557808afc1.jpg",
            },
            {
              type: "生活电器",
              sku: 10142585,
              skuName:
                "布鲁雅尔 Blueair 603 空气净化器 家用办公 去除甲醛 除雾霾除PM2.5 除烟除尘 计价单位:台",
              skuPrice: "9988",
              skuId: "317517",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-11-11/088f40fe-941e-4ad1-a8f8-31c8c33ed6b3.jpg",
            },
            {
              type: "生活电器",
              sku: 10409381,
              skuName:
                "美的 Midea SPWQ100Y-A01 空气加湿器 除菌消毒  WIFI遥控操作  计价单位:台",
              skuPrice: "765",
              skuId: "584479",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-10-18/fae11fe6-579a-4933-adfe-9cdb2cc5993f.jpg",
            },
          ],
        },
        {
          type: "冰箱/冷柜",
          code: "05001",
          childList: [
            {
              type: "冰箱/冷柜",
              sku: 10399355,
              skuName:
                "乐创 Lecon LC-J-YG01 商用医药药品柜 三门1200升 铝合金门药房药品展示柜 计价单位:台",
              skuPrice: "7261",
              skuId: "564332",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-04-21/90787da7-853a-41ce-8873-208d737d0dd0.jpg",
            },
            {
              type: "冰箱/冷柜",
              sku: 10399531,
              skuName:
                "乐创 Lecon LC-J-SM02 商用四门冰柜 1200*700*1960mm 立式  全冷冻 工程款  计价单位:台",
              skuPrice: "7365",
              skuId: "564096",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-04-20/c5f445e5-19f6-40e3-9bfb-e95b6da3575a.jpg",
            },
            {
              type: "冰箱/冷柜",
              sku: 10399359,
              skuName:
                "乐创 Lecon LC-J-ZSD03 展示柜冷冻 饮料柜 下置大容积立式三门嵌入式便利店果蔬水果保鲜柜 三门风冷款 计价单位:台",
              skuPrice: "27590",
              skuId: "564329",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-04-21/9d0be208-86bb-4a76-8369-6610074013f1.jpg",
            },
            {
              type: "冰箱/冷柜",
              sku: 10399480,
              skuName:
                "乐创 Lecon LC-J-ZSD02 展示柜冷冻 饮料柜 下置大容积立式双门嵌入式便利店果蔬水果保鲜柜 双门风冷工程款 计价单位:台",
              skuPrice: "22800",
              skuId: "564327",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-04-21/6a9e7758-96e8-44b8-a592-56f610bd876b.jpg",
            },
            {
              type: "冰箱/冷柜",
              sku: 10399367,
              skuName:
                "乐创 Lecon LC-J-ZSC03 展示柜冷藏 饮料柜 下置大容积立式三门嵌入式便利店果蔬水果保鲜柜 三门风冷工程款 计价单位:台",
              skuPrice: "18010",
              skuId: "564328",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-04-21/0e1da587-186b-4570-b6a3-017f692a184d.jpg",
            },
            {
              type: "冰箱/冷柜",
              sku: 10399479,
              skuName:
                "乐创 Lecon LC-J-ZSC02 展示柜冷藏 饮料柜 下置大容积立式双门嵌入式便利店果蔬水果保鲜柜 双门风冷工程款 计价单位:台",
              skuPrice: "13220",
              skuId: "564326",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-04-21/8f1a2ef7-355f-4bc9-be9f-dd75bbe65bae.jpg",
            },
            {
              type: "冰箱/冷柜",
              sku: 10317114,
              skuName:
                "圣托 Shentop STG-PH1800 冷藏保鲜展示柜 风冷无霜 双开门 1800*700*1310mm 计价单位:台",
              skuPrice: "16094",
              skuId: "460116",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-02-03/c760c3b8-5fdd-455a-948c-42920bfb157c.jpg",
            },
            {
              type: "冰箱/冷柜",
              sku: 10317154,
              skuName:
                "圣托 Shentop STG-CB1800 单层抽屉展示柜 冷藏保鲜 风冷无霜 双开门 1800*800*1100mm 计价单位:台",
              skuPrice: "16094",
              skuId: "460568",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-02-04/0826866c-cbe6-4ffe-9999-1c820e5a60c9.jpg",
            },
            {
              type: "冰箱/冷柜",
              sku: 10317150,
              skuName:
                "圣托 Shentop STG-CA1800 双温抽屉展示柜 冷藏保鲜 风冷无霜 双开门 1800*800*1100mm 计价单位:台",
              skuPrice: "21842",
              skuId: "460561",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-02-04/c22aa7ea-bfd2-43dc-97d3-f9c6a8afc4cd.jpg",
            },
            {
              type: "冰箱/冷柜",
              sku: 10317105,
              skuName:
                "圣托 Shentop STG-ZA1500 冷藏保鲜展示柜 风冷无霜 双开门 1500*660*1200mm 计价单位:台",
              skuPrice: "10423",
              skuId: "460045",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-02-03/3d3ff93f-ede1-4ffb-80ee-8c6838c01ea1.jpg",
            },
            {
              type: "冰箱/冷柜",
              sku: 10317076,
              skuName:
                "圣托 Shentop STG-ZH1500 风冷冷藏展示柜商用 双门 1500*660*1200mm 计价单位:台",
              skuPrice: "8986",
              skuId: "459978",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-02-03/923052b8-821f-4c56-b3d2-227bf8b28813.jpg",
            },
            {
              type: "冰箱/冷柜",
              sku: 10317253,
              skuName:
                "海尔 Haier BCD-549WDGX 对开四门电冰箱 549升 干湿分储 彩晶面板 钛灰色 计价单位:台",
              skuPrice: "6034",
              skuId: "460147",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-02-03/5f3b40ed-6ba3-4353-b80b-80e083ca84d6.jpg",
            },
            {
              type: "冰箱/冷柜",
              sku: 10054467,
              skuName:
                "海尔 Haier SC-372 展示电冰箱 350L 定频 3级 节能风冷式 电子控温 侧开门 白色 计价单位:台",
              skuPrice: "2730",
              skuId: "81666",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-08-26/ccb14b50-8618-4d52-a744-fcfddf5df088.jpg",
            },
            {
              type: "冰箱/冷柜",
              sku: 10409634,
              skuName:
                "海尔 Haier BCD-406WDPD 冰箱十字对开门智能双变频406升四门 三挡变温净味保鲜纤薄机身家用 计价单位:台",
              skuPrice: "3160",
              skuId: "579081",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-04-24/9d994ded-65e4-494a-8f38-9b2a880449bf.jpg",
            },
          ],
        },
        {
          type: "净水设备",
          code: "05005",
          childList: [
            {
              type: "净水设备",
              sku: 10067138,
              skuName:
                "美的 Midea MRO804-200G 中小型净水主机 可满足60-350人集中净水需求 不含安装 计价单位:台",
              skuPrice: "16075",
              skuId: "47587",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-08-23/2e7f9236-3641-4a7a-8ae1-13d0d8418c65.jpg",
            },
            {
              type: "净水设备",
              sku: 10547592,
              skuName:
                "希力  2W905 商用净水器 90L立式 反渗透 纯水机净水加热 商务直饮 计价单位:台",
              skuPrice: "20225",
              skuId: "753100",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-07-16/bc351d27-b3b8-4a69-9f65-1035ea735432.jpg",
            },
            {
              type: "净水设备",
              sku: 10391038,
              skuName:
                "海尔 Haier HRO102-400G 大通量反渗透纯水机 金属色 650*480*1130mm 计价单位:台",
              skuPrice: "15136",
              skuId: "558069",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-04-10/68ce0224-3708-4338-b507-d7c47ac4ccd3.jpg",
            },
            {
              type: "净水设备",
              sku: 10434037,
              skuName:
                "希力 XILI WATER XL-ZYJ-2W605 商用净水器 RO反渗透 五级过滤 60L 一开一直饮 计价单位:台",
              skuPrice: "12944",
              skuId: "612244",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-05-18/958c29b9-83a9-467a-a2b1-5e84657fb5bb.jpg",
            },
            {
              type: "净水设备",
              sku: 10434061,
              skuName:
                "希力 XILI WATER XL-ZYJ-3W605 商用净水器 RO反渗透 五级过滤 400G 60L 计价单位:台",
              skuPrice: "14138",
              skuId: "612283",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-05-18/3e1057b5-890c-4a16-93fb-14f30f17f4c1.jpg",
            },
            {
              type: "净水设备",
              sku: 10449966,
              skuName:
                "海尔 Haier HRO102-200G 商用净水器 大通量反渗透 计价单位:台",
              skuPrice: "9560",
              skuId: "620277",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-05-21/bc6c29f0-c4b1-48bb-b813-e615a87a52a3.jpg",
            },
            {
              type: "净水设备",
              sku: 10547616,
              skuName:
                "希力  2w50BR 商用直饮机 冰热双用大流量 加热制冷一体机 水胆40L 计价单位:台",
              skuPrice: "10111",
              skuId: "753917",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-07-16/6d8188b5-36a4-405c-b22d-2cee8efab169.jpg",
            },
            {
              type: "净水设备",
              sku: 10546466,
              skuName:
                "希力  LY88 商用净水器 75G立式反渗透 纯水机净水加热 商住两用 计价单位:台",
              skuPrice: "4145",
              skuId: "752909",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-07-16/40ff17f1-0ec1-4d3c-bff6-26fd1109483f.jpg",
            },
            {
              type: "净水设备",
              sku: 10434149,
              skuName:
                "希力 XILI WATER XL-ZYJ-2W50S 商用净水器 RO反渗透 五级过滤 40L 一开一直饮 计价单位:台",
              skuPrice: "7888",
              skuId: "612206",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-05-18/19cc87b5-b3dc-453b-bdcc-99ea21aa06e1.jpg",
            },
            {
              type: "净水设备",
              sku: 10436096,
              skuName:
                "希力 XILI WATER XL-RO75G-LY168C1 商用净水器 反渗透 4级过滤 10L 双出水口冷热 计价单位:台",
              skuPrice: "4405",
              skuId: "611798",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-05-18/3b68ec28-209b-4742-aa9f-15c2f71d93bf.jpg",
            },
            {
              type: "净水设备",
              sku: 10436181,
              skuName:
                "希力 XILI WATER XL-ZYJ-2W305 商用净水器 RO反渗透 五级过滤 30L 一开一直饮 计价单位:台",
              skuPrice: "6876",
              skuId: "611995",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-05-18/bb9ac3a6-366a-4f8c-b219-faaf1dff9641.jpg",
            },
            {
              type: "净水设备",
              sku: 10546832,
              skuName:
                "希力  3W265 商用净水器 400G立式 反渗透 纯水机净水加热一体  计价单位:台",
              skuPrice: "7888",
              skuId: "752864",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-07-16/69c886dc-6ad7-4d99-871f-116cef7167f2.jpg",
            },
            {
              type: "净水设备",
              sku: 10434170,
              skuName:
                "希力 XILI WATER XL-ZYJ-4W355 商用净水器 RO反渗透 五级过滤 35L 节能款 2开1温1直饮 计价单位:台",
              skuPrice: "10500",
              skuId: "612368",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-05-18/635af414-682a-4b37-ac6e-ce06b3d28575.jpg",
            },
            {
              type: "净水设备",
              sku: 10367396,
              skuName:
                "希力 XILI WATER XL-ZYJ-2W182 商用净水器 柜式 1开1温水 18L 黑色 计价单位:台",
              skuPrice: "3934",
              skuId: "529299",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-03-19/80b0975b-5441-40aa-b490-3c8af04b7305.jpg",
            },
          ],
        },
        {
          type: "饮水机",
          code: "05010",
          childList: [
            {
              type: "饮水机",
              sku: 10137270,
              skuName:
                "美的 Midea YR1806S-X 茶吧机 立式家用 恒温下置式 计价单位:个",
              skuPrice: "957",
              skuId: "306716",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-11-06/360fdfec-6fde-4e4a-bfdb-9e8f07dccbf1.jpg",
            },
            {
              type: "饮水机",
              sku: 10431568,
              skuName:
                "海尔 Haier HLZR100A-L 温热型饮水机 即热直饮 360*460*1450mm 灰色 计价单位:台",
              skuPrice: "13400",
              skuId: "606882",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-05-15/9d35d238-18ca-42a3-abee-6b845c087639.jpg",
            },
            {
              type: "饮水机",
              sku: 10505088,
              skuName:
                "美的 Midea YR1805S-X 温热型饮水机 310*305*920mm 摩卡棕 计价单位:台",
              skuPrice: "957",
              skuId: "713045",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-10-30/4053f470-e532-49b3-b852-27f8eaf557d9.jpg",
            },
            {
              type: "饮水机",
              sku: 10597384,
              skuName:
                "美的 Midea YR1609S-X  立式家用茶吧机 恒温下置式 金色 计价单位:台",
              skuPrice: "957",
              skuId: "821361",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-08-20/83cff74e-c576-4801-a28e-21232629bdf5.jpg",
            },
            {
              type: "饮水机",
              sku: 10599450,
              skuName:
                "美的 Midea YD1805S-X 饮水机 冷热型 金色 2075w 310*305*920mm 计价单位:台",
              skuPrice: "1052",
              skuId: "823628",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-10-18/01cc44fb-bfeb-4e8b-95cc-c77313053a1c.jpg",
            },
            {
              type: "饮水机",
              sku: 10141766,
              skuName:
                "海尔 Haier  HZR400-2W(Q) 直饮机 反渗透RO膜纯水机 商用 12L 黑色 计价单位:台",
              skuPrice: "13000",
              skuId: "310514",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-11-08/71b2990b-a48f-4c20-bbd7-9e0ac6281e32.jpg",
            },
            {
              type: "饮水机",
              sku: 10587022,
              skuName:
                "全给 K30 节能开水器 双聚能步进式 净化型 适用于30-50人 计价单位:台",
              skuPrice: "4462",
              skuId: "809352",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-08-13/044d045f-f21e-40f0-b4b2-17062e23eed4.jpg",
            },
            {
              type: "饮水机",
              sku: 10586925,
              skuName:
                "全给 K120 节能开水器 双聚能步进式 净化型 适用于100-150人 计价单位:台",
              skuPrice: "6122",
              skuId: "809359",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-08-13/95efdee0-9ba3-408d-b6fe-b90f31984c89.jpg",
            },
            {
              type: "饮水机",
              sku: 10587023,
              skuName:
                "全给 K60 节能开水器 双聚能步进式 净化型 适用于50-80人 计价单位:台",
              skuPrice: "5142",
              skuId: "809354",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-08-13/83bb2886-28c4-4125-83ab-6eb616f1253d.jpg",
            },
            {
              type: "饮水机",
              sku: 10586924,
              skuName:
                "全给 K90 节能开水器 双聚能步进式 净化型 适用于80-100人 计价单位:台",
              skuPrice: "5563",
              skuId: "809357",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-08-13/95efdee0-9ba3-408d-b6fe-b90f31984c89.jpg",
            },
            {
              type: "饮水机",
              sku: 10587021,
              skuName:
                "全给 K20 节能开水器 双聚能步进式 净化型 适用于10-30人 计价单位:台",
              skuPrice: "3506",
              skuId: "809350",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-08-13/33600d18-db8b-481a-a125-849116ff1bba.jpg",
            },
            {
              type: "饮水机",
              sku: 10134105,
              skuName:
                "美的 Midea MYR827S-W   饮水机 冷热型 玫瑰金 计价单位:台",
              skuPrice: "861",
              skuId: "297508",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-08-24/637e0074-4881-45e8-975d-dfd8372bb672.jpg",
            },
            {
              type: "饮水机",
              sku: 10604725,
              skuName:
                "碧丽 Bili JO-K30（KL35） 双聚能步进式开水器 银钻王开水器 35L 计价单位:台",
              skuPrice: "7894",
              skuId: "829876",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-08-25/70481e98-4d43-4ce2-858e-9f15fbc6191b.jpg",
            },
            {
              type: "饮水机",
              sku: 10591574,
              skuName:
                "康丽源水 K-3E 开水器 校园温开水饮水机 内置净水 健康节能 26L 计价单位:台",
              skuPrice: "4823",
              skuId: "814310",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-08-17/e19bc884-0cb9-491f-aea8-498da96aa747.jpg",
            },
            {
              type: "饮水机",
              sku: 10589316,
              skuName:
                "吉之美 Gemi GB-80ESW 开水器 吉宝系列 步进式 不锈钢 80L 计价单位:台",
              skuPrice: "4503",
              skuId: "813038",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-08-14/fb73c82a-c0df-4d09-bd3f-4dda7c1bf952.jpg",
            },
            {
              type: "饮水机",
              sku: 10079323,
              skuName: "美的 Midea MYD827S-W 冷热型饮水机 计价单位:台",
              skuPrice: "957",
              skuId: "19352",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-08-20/51b12cf3-3bcc-4d22-8f92-5bb1eba913f5.jpg",
            },
          ],
        },
        {
          type: "饮热水器/洗衣机",
          code: "05008",
          childList: [
            {
              type: "饮热水器/洗衣机",
              sku: 10334419,
              skuName:
                "海尔 Haier G100018B12G 全自动滚筒洗衣机 10公斤 大容量变频省电家用 计价单位:台",
              skuPrice: "2394",
              skuId: "484449",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-02-26/617e81ec-db9e-42ee-80c2-ddaac47ce57a.jpg",
            },
            {
              type: "饮热水器/洗衣机",
              sku: 10137315,
              skuName:
                "海尔 Haier XPB120-899S 涡轮洗衣机  大容量家用双缸 半自动 12公斤 白色 计价单位:台",
              skuPrice: "1244",
              skuId: "306764",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-11-06/4337fb4a-7ab8-4a03-8fea-bb4764153417.jpg",
            },
            {
              type: "饮热水器/洗衣机",
              sku: 10449370,
              skuName:
                "海尔 Haier XQB90-BM1269 9公斤波轮洗衣机 变频节能  灰色 计价单位:台",
              skuPrice: "1244",
              skuId: "633249",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-05-26/faabea63-7447-4874-acf7-ff61765c1563.jpg",
            },
            {
              type: "饮热水器/洗衣机",
              sku: 10062876,
              skuName:
                "美的 Midea F80-15GA1(H) 电热水器 80升储水式 计价单位:台",
              skuPrice: "1500",
              skuId: "51870",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-08-23/4c29cc69-ebfb-450c-9fd3-0bce3612936b.jpg",
            },
            {
              type: "饮热水器/洗衣机",
              sku: 10126365,
              skuName:
                "美的 Midea F80-22DE5 热水器   80升  外形尺寸 442*880 计价单位:台",
              skuPrice: "1958",
              skuId: "265716",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-10-29/879dca2e-e3b6-4cfa-aaa7-47963e04ab17.jpg",
            },
            {
              type: "饮热水器/洗衣机",
              sku: 10466139,
              skuName:
                "美的 Midea F80-A20GA2  电热水器 80升速热储水式 2000W 防电防漏 低耗保温 极地白   计价单位:台",
              skuPrice: "1340",
              skuId: "654116",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-06-03/860ce15e-299a-4946-8919-5f2b64d9052e.jpg",
            },
            {
              type: "饮热水器/洗衣机",
              sku: 10373591,
              skuName:
                "美的 Midea F80-22BA3(H) 电热水器 低耗保温 家用速热节能 极地白 计价单位:台",
              skuPrice: "1436",
              skuId: "535416",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-03-25/06ce924c-fa5a-4264-9c76-380524d23372.jpg",
            },
            {
              type: "饮热水器/洗衣机",
              sku: 10062861,
              skuName:
                "美的 Midea F50-15GA1 电热水器 储水式50L 59L 计价单位:台",
              skuPrice: "957",
              skuId: "51873",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-08-23/07937e55-a090-4811-bc84-dffaf3d3c69a.jpg",
            },
            {
              type: "饮热水器/洗衣机",
              sku: 10105787,
              skuName:
                "美的 Midea F50-22DE5(HEY) 50升漏电断电变频速热电热水器 计价单位:台",
              skuPrice: "1244",
              skuId: "138323",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-09-25/9e793832-d678-4085-a254-e5d970c758a1.jpg",
            },
            {
              type: "饮热水器/洗衣机",
              sku: 10131042,
              skuName:
                "美的 Midea F60-22DE5(HEY) 电热水器  漏电断电变频速热 一级能效 60升 白色 计价单位:台",
              skuPrice: "1244",
              skuId: "278839",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-10-30/c5198fa0-69aa-4353-88aa-90a8059d7cbf.jpg",
            },
            {
              type: "饮热水器/洗衣机",
              sku: 10422759,
              skuName:
                "美的 Midea F50-22BA3(H) 电热水器 50L 二级能效 低耗保温 速热节能 极地白 计价单位:台",
              skuPrice: "1052",
              skuId: "592564",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-05-08/d4da955b-a0c6-4c52-9cf5-3e8f48231713.jpg",
            },
            {
              type: "饮热水器/洗衣机",
              sku: 10462374,
              skuName:
                "美的 Midea F60-A20MD1（HI） 电热水器 2000W速热 60L 计价单位:台",
              skuPrice: "861",
              skuId: "629416",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-05-25/02c5e53b-c80c-44b8-9f7c-dff3e68e14c1.jpg",
            },
            {
              type: "饮热水器/洗衣机",
              sku: 10126584,
              skuName:
                "美的 Midea RSJF-40/RDN3-300/E(E2) 空气能电热水器 2级 300升 黑色 计价单位:台",
              skuPrice: "9674",
              skuId: "262905",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-10-29/cd3a1fd1-94c2-4bc9-a0d5-43e291b7ab56.jpg",
            },
            {
              type: "饮热水器/洗衣机",
              sku: 10139569,
              skuName:
                "美的 Midea JSQ27-14HT3（T） 燃气热水器 洗澡恒温  14升 计价单位:台",
              skuPrice: "2873",
              skuId: "308284",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-11-07/2e1d53b9-5360-4ef0-a7f4-f3fbb8b0d498.jpg",
            },
          ],
        },
        {
          type: "个护/健康",
          code: "05004",
          childList: [
            {
              type: "个护/健康",
              sku: 10336367,
              skuName:
                "博朗 Braun 3系3080s 电动剃须刀 3刀头 天蓝色 计价单位:个",
              skuPrice: "861",
              skuId: "485748",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-02-27/0ebfe23b-0bc0-4f3b-887f-fcedc4ad3ef9.jpg",
            },
            {
              type: "个护/健康",
              sku: 10143838,
              skuName:
                "SKG SKG 4098 颈椎按摩器 遥控版 充电款 白色 138*142mm 计价单位:台",
              skuPrice: "506",
              skuId: "318777",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-11-12/49c1ca20-257c-4707-b894-970d6218949d.jpg",
            },
            {
              type: "个护/健康",
              sku: 10459964,
              skuName: "SKG SKG 4098 颈椎按摩器 4098 蓝牙款 象牙白 计价单位:台",
              skuPrice: "506",
              skuId: "645089",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-05-28/2bf92a6d-b155-4bd9-90c7-b9314b884a0d.jpg",
            },
            {
              type: "个护/健康",
              sku: 10391460,
              skuName:
                "飞利浦 PHILIPS S5888 电动剃须刀 故宫文化系列 九霄凌云版 蓝色 计价单位:个",
              skuPrice: "2010",
              skuId: "558491",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-04-11/f4de57fc-7c5f-4eaa-ac0d-b0f87323227b.jpg",
            },
            {
              type: "个护/健康",
              sku: 10336269,
              skuName:
                "博朗 Braun 7系7893PS 电动剃须刀 3刀头 银色 礼盒装 计价单位:盒",
              skuPrice: "1915",
              skuId: "485745",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-02-27/54ba855f-82d6-4a87-ba9c-1a69b227ba24.jpg",
            },
            {
              type: "个护/健康",
              sku: 10374995,
              skuName:
                "雷瓦(Riwa) Z7-ION 卷发棒 320*66*33mm 梦幻粉 计价单位:个",
              skuPrice: "186",
              skuId: "535874",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-03-25/09ee95b5-70d1-4d3f-b6af-0b4509ac7956.jpg",
            },
            {
              type: "个护/健康",
              sku: 10391509,
              skuName:
                "飞利浦 PHILIPS MVL9998 电动剃须刀 漫威系列 钢铁侠 深红色 计价单位:个",
              skuPrice: "2489",
              skuId: "558505",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-04-11/bd9398b1-09d0-4c89-8385-85dd41625f31.jpg",
            },
            {
              type: "个护/健康",
              sku: 10391508,
              skuName:
                "飞利浦 PHILIPS MVL5598 电动剃须刀 漫威系列 美国队长 灰色 计价单位:个",
              skuPrice: "1244",
              skuId: "558502",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-04-11/bb51624e-2a76-4192-b513-983c539b8ab4.jpg",
            },
            {
              type: "个护/健康",
              sku: 10377147,
              skuName:
                "SKG SKG 4098plus 颈部按摩仪 办公室护颈仪 热敷 电脉冲 U型枕 香槟金 计价单位:台",
              skuPrice: "525",
              skuId: "538207",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-03-28/df58d82b-307e-4131-933d-123b985c627f.jpg",
            },
            {
              type: "个护/健康",
              sku: 10375068,
              skuName:
                "雷瓦(Riwa)  RB-8325 直发器 297*50*37mm 负离子 计价单位:个",
              skuPrice: "190",
              skuId: "535887",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-03-25/bd2d3187-434c-4a35-9141-8c408259367e.jpg",
            },
            {
              type: "个护/健康",
              sku: 10336370,
              skuName:
                "欧乐B ORAL-B iBrush 10000 3D智能电动牙刷 220v 极光白 计价单位:套",
              skuPrice: "2097",
              skuId: "485739",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-02-27/de07560b-19d2-4eff-bddf-65afeef32705.jpg",
            },
            {
              type: "个护/健康",
              sku: 10336272,
              skuName:
                "欧乐B ORAL-B iBrush 10000 3D智能电动牙刷 220v 极客黑 计价单位:套",
              skuPrice: "2097",
              skuId: "485740",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-02-27/1bb7d0d1-ccaf-4a9c-ad38-6d3ca911ed03.jpg",
            },
            {
              type: "个护/健康",
              sku: 10374887,
              skuName:
                "雷瓦(Riwa) RB-8318 卷发棒 235*28mm 卷发直发两用 计价单位:个",
              skuPrice: "85.2",
              skuId: "535904",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-03-25/5c63ad0a-8ffa-497c-bc09-079a46fe6bfa.jpg",
            },
            {
              type: "个护/健康",
              sku: 10067781,
              skuName:
                "飞利浦 PHILIPS HP8222/05 电吹风机 家用大功率 负离子养护 计价单位:台",
              skuPrice: "123",
              skuId: "46725",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-08-23/7bb62680-649e-4b82-acb1-03db169f76ed.jpg",
            },
            {
              type: "个护/健康",
              sku: 10391507,
              skuName:
                "飞利浦 PHILIPS MVL3798 电动剃须刀 漫威系列 蜘蛛侠 深红色 计价单位:个",
              skuPrice: "525",
              skuId: "558497",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-04-11/4dda0ffd-003f-4f59-a4f1-fe419fec95e9.jpg",
            },
            {
              type: "个护/健康",
              sku: 10367432,
              skuName:
                "飞利浦 PHILIPS S5088/74 电动剃须刀 故宫文化大器天成系列 计价单位:个",
              skuPrice: "957",
              skuId: "530843",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-03-19/956956c9-ffc2-4e34-802f-9e5bfb3b90b8.jpg",
            },
            {
              type: "个护/健康",
              sku: 10367433,
              skuName:
                "飞利浦 PHILIPS S588/14 电动剃须刀 故宫文化大器天成系列 计价单位:个",
              skuPrice: "525",
              skuId: "530838",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-03-19/919f4172-4c4e-4319-a75c-ea2af8e054fb.jpg",
            },
            {
              type: "个护/健康",
              sku: 10391493,
              skuName:
                "飞利浦 PHILIPS HP8235/00 电吹风机 4倍负离子 计价单位:台",
              skuPrice: "286",
              skuId: "558541",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-04-11/0dd17baf-7061-4d9c-a4ac-717ebb489320.jpg",
            },
          ],
        },
      ],
      table: [
        { name: "笔记本电脑" },
        { name: "台式电脑" },
        { name: "机架式服务器" },
        { name: "激光打印机/传真机硒鼓" },
        { name: "黑白激光打印机" },
        { name: "馈纸式扫描仪" },
        { name: "会议摄像头" },
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
    // this.list = this.list12;
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
          this.list = this.list12;
          break;
        case 1:
          this.list = this.list11;
          break;
        case 2:
          this.list = this.list6;
          break;
        case 3:
          this.list = this.list7;
          break;
        case 4:
          this.list = this.list8;
          break;
        case 5:
          this.list = this.list9;
          break;
        case 6:
          this.list = this.list10;
          break;
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
      const xDist = badgePosition.left - this.elLeft + badgePosition.width / 4;
      const yDist = badgePosition.top - this.elTop;
      el.style.transform = `translate(${xDist}px, ${yDist}px)`;
      el.style.transition = "all 0.8s cubic-bezier(0.12,0.78,0.53,0.92)";
      this.showMoveDot = this.showMoveDot.map((item) => false);
      done();
    },
    gointocart() {
      this.$router.push({ name: "Cart" });
    },
    details(value) {
      console.log(value);
      this.$router.push({
        name: "ProductDetails",
        query: { skuId: value, type: null },
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
.ActivityPageOne {
  font-size: 16px;
  min-height: 100%;
  // background: #039ff2;
  background-image: url("../../assets/img/electric1.jpg");
  background-size: 375px;
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
    // margin-top: -5px;
    width: 375px;
    display: inline-block;
  }
  .banner_img {
    display: inline-block;
    float: left;
    width: 375px;
    margin-top: -5px;
    margin-bottom: 10px;
  }
  .body_detail {
    .detail_title {
      height: 25px;
      width: 350px;
      margin: 10px;
      overflow-y: hidden;
      overflow-x: auto;
      .detail_top {
        width: 640px;
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
    // background: #956131;
    // overflow-y: hidden;
    // overflow-x: auto;
    margin: 0 12px;
    width: 350px;
    display: inline-block;
    // margin-bottom: 60px;
    // height: 180px;

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
          // line-height: 50px;
          float: left;
          display: inline-block;
          //   margin: 0 auto;
          text-align: center;
          //   background: #f8f8f8;
          img {
            width: 120px;
          }
          .rem_type {
            background-image: url("../../assets/img/electric3.png");
            background-size: 150px;
            margin: 0 auto;
            color: #285faf;
            width: 150px;
            height: 42px;
            // line-height: 35px;
            // margin-top: -56px;
            font-weight: bold;
            font-size: 14px;
            span{
              display: inline-block;
              margin-top: 5px;
            }
          }
          .rem_span {
            float: right;
            margin-top: -30px;
            font-size: 10px;
            margin-right: 20px;
            color: #fff;
          }
        }
        .list_body {
          display: inline-block;
          width: 360px;
          // float: left;
        }
        .item_goods {
          width: 170px;
          height: 240px;
          // display: flex;
          background-image: url("../../assets/img/electric2.png");
          background-size: 175px 240px;

          // background: #fff;
          // margin: 100px 0;
          float: left;
          flex-direction: column;
          margin: 0 0px 10px 5px;
          box-sizing: border-box;
          border-radius: 8px;
          .img_boy {
            width: 120px;
            height: 120px;
            border: 1px solid #f8f8f8;
            border-radius: 4px;
            margin: 20px 0 0 30px;
          }
          .goods-name {
            width: 150px;
            height: 34px;
            line-height: 17px;
            margin: 8px 8px 0 15px;
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
            margin: 2px 15px 8px 15px;

            font-size: 14px;
            .skuyqty_left {
              color: #285faf;
              font-size: 16px;
              font-weight: bold;
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