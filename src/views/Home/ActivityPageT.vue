<template>
  <div class="ActivityPageT">
    <inputTop :type="7" :badge="badge"></inputTop>
    <img src="@/assets/img/baner1.jpg" class="banner-img" />
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
            <!-- <div>
              <img src="@/assets/img/back1.png" />
            </div>-->
            <div class="rem_type" :style="{lineHeight:rem.code ==100020005?'18px':'35px'}">{{rem.type}}</div>
            <span class="rem_span" @click="getMore(rem.code,3)">更多</span>
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
  name: "ActivityPageT",
  data() {
    return {
      list: [
        {
          type: "机架式服务器",
          code: "040030003",
          childList: [
            {
              type: "机架式服务器",
              sku: 10388130,
              skuName:
                "浪潮 INSPUR NF5280M5 机架式服务器 5218*2/64G/1.2T*3/3008卡+KEY/双千兆*1/550W*2/三年服务 计价单位:台",
              skuPrice: "44374",
              skuId: "553515",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-09-01/72c5507f-6343-4b8c-a9f0-238eb7ba943c.jpg",
            },
            {
              type: "机架式服务器",
              sku: 10388063,
              skuName:
                "浪潮 INSPUR NF5280M5 至强金牌5218*2/2*32GB/4*2TB SATA/RS0820P/2*550W 改配 计价单位:台",
              skuPrice: "47899",
              skuId: "553479",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-04-07/6390525a-9175-4b7c-9bc6-b5e080d2275d.jpg",
            },
            {
              type: "机架式服务器",
              sku: 10388198,
              skuName:
                "浪潮 INSPUR NF8480M5 4U机架式服务器 至强金牌5220*4/8*32GB/8*1.2TB/RS0820P/四口千兆/4*1300W 改配 计价单位:台",
              skuPrice: "134119",
              skuId: "553679",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-04-07/6d1badd0-fa0e-4ba0-ab48-40d7c3e7671a.jpg",
            },
            {
              type: "机架式服务器",
              sku: 10388212,
              skuName:
                "浪潮 INSPUR NF5280M5 机架式服务器 至强银牌4210*2/4*32GB/4*6TB SATA/RS0820P/2*550W 改配 计价单位:台",
              skuPrice: "38319",
              skuId: "553630",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-04-07/6390525a-9175-4b7c-9bc6-b5e080d2275d.jpg",
            },
            {
              type: "机架式服务器",
              sku: 10388239,
              skuName:
                "浪潮 INSPUR NF8480M5 4U机架式服务器 至强金牌5218*2/4*32GB/5*1.2TB/RS0820P/四口千兆/2*800W)改配 计价单位:台",
              skuPrice: "72807",
              skuId: "553895",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-04-07/6d1badd0-fa0e-4ba0-ab48-40d7c3e7671a.jpg",
            },
            {
              type: "机架式服务器",
              sku: 10388313,
              skuName:
                "浪潮 INSPUR NF8480M5 4U机架式服务器 至强金牌5220*2/2*32GB/4*1.2TB/RS0820P/四口千兆/2*800W 改配 计价单位:台",
              skuPrice: "75681",
              skuId: "553923",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-04-07/6d1badd0-fa0e-4ba0-ab48-40d7c3e7671a.jpg",
            },
            {
              type: "机架式服务器",
              sku: 10388243,
              skuName:
                "浪潮 INSPUR NF8480M5 4U机架式服务器 至强金牌5220*2/4*32GB/5*1.2TB/RS0820P/四口千兆/2*800W 改配 计价单位:台",
              skuPrice: "83345",
              skuId: "553929",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-04-07/6d1badd0-fa0e-4ba0-ab48-40d7c3e7671a.jpg",
            },
            {
              type: "机架式服务器",
              sku: 10388245,
              skuName:
                "浪潮 INSPUR NF8480M5 4U机架式服务器 至强金牌5218*4/8*32GB/8*1.2TB/RS0820P/四口千兆/4*800W)改配 计价单位:台",
              skuPrice: "114959",
              skuId: "553936",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-04-07/6d1badd0-fa0e-4ba0-ab48-40d7c3e7671a.jpg",
            },
            // {
            //   type: "机架式服务器",
            //   sku: 10388191,
            //   skuName:
            //     "浪潮 INSPUR NF5280M5 机架式服务器 4210*2/32G*2/4T*3/3008卡+KEY/双千兆*1/550W*2/三年服务 计价单位:台",
            //   skuPrice: "30943",
            //   skuId: "553661",
            //   skuUrl:
            //     "https://lxerp.66123123.com/image/sku/2020-04-07/6390525a-9175-4b7c-9bc6-b5e080d2275d.jpg",
            // },
          ],
        },
        {
          type: "激光打印机/传真机硒鼓",
          code: "100020005",
          childList: [
            {
              type: "激光打印机/传真机硒鼓",
              sku: 10204339,
              skuName:
                "天威 PRINT-RITE CE250A 硒鼓 黑色 专业装 适用HP-3525 计价单位:支",
              skuPrice: "660",
              skuId: "324774",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-09-01/3eb399d9-a48a-4064-93bf-607a1599cece.jpg",
            },
            {
              type: "激光打印机/传真机硒鼓",
              sku: 10204240,
              skuName:
                "天威 PRINT-RITE CE253A 硒鼓 红色 专业装  适用HP-3525 计价单位:支",
              skuPrice: "660",
              skuId: "324777",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-11-06/ca66c93f-1640-446b-b494-eaf14d05283e.jpg",
            },
            {
              type: "激光打印机/传真机硒鼓",
              sku: 10204334,
              skuName:
                "天威 PRINT-RITE CE252A 硒鼓 黄色 专业装 适用HP-3525 计价单位:支",
              skuPrice: "660",
              skuId: "324780",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-11-06/ca66c93f-1640-446b-b494-eaf14d05283e.jpg",
            },
            {
              type: "激光打印机/传真机硒鼓",
              sku: 10204237,
              skuName:
                "天威 PRINT-RITE CE251A 硒鼓 青色 专业装  适用HP-3525 计价单位:支",
              skuPrice: "660",
              skuId: "324781",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-11-06/ca66c93f-1640-446b-b494-eaf14d05283e.jpg",
            },
            {
              type: "激光打印机/传真机硒鼓",
              sku: 10115924,
              skuName:
                "莱盛光标 Shines LSGB-CF412A 粉盒 黄色 适用于HPCLJ-M452 M477MFP 计价单位:支",
              skuPrice: "637",
              skuId: "199370",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-10-18/ed5c4998-f16a-4e08-8c85-32b3a32e9c84.jpg",
            },
            {
              type: "激光打印机/传真机硒鼓",
              sku: 10115830,
              skuName:
                "莱盛光标 Shines LSGB-CF411A 粉盒 蓝色 适用于HPCLJ-M452 M477MFP 计价单位:支",
              skuPrice: "637",
              skuId: "199369",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-10-18/b7544cdb-17ac-4d16-b52c-b50a69d5007e.jpg",
            },
            {
              type: "激光打印机/传真机硒鼓",
              sku: 10115831,
              skuName:
                "莱盛光标 Shines LSGB-CF413A 粉盒 红色 适用于HPCLJ-M452 M477MFP 计价单位:支",
              skuPrice: "637",
              skuId: "199371",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-10-18/3e3abe93-b914-4663-8b91-fb472d018104.jpg",
            },
            {
              type: "激光打印机/传真机硒鼓",
              sku: 10115921,
              skuName:
                "莱盛光标 Shines LSGB-CF410A 粉盒 黑色 适用于HPCLJ-M452 M477MFP 计价单位:支",
              skuPrice: "637",
              skuId: "199368",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-10-18/d2252e45-9ea2-446b-9774-dfec959a8e0c.jpg",
            },
          ],
        },
        {
          type: "黑白激光打印机",
          code: "010060001",
          childList: [
            {
              type: "黑白激光打印机",
              sku: 10096354,
              skuName:
                "奔图 PANTUM M6556 黑白激光高速复印机 打印复印扫描多功能一体机 白色 计价单位:台",
              skuPrice: "1819",
              skuId: "92707",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-07-09/ff392f09-1c97-4b43-935f-e94c14263c6b.jpg",
            },
            {
              type: "黑白激光打印机",
              sku: 10115480,
              skuName:
                "奔图 Pantum P3370dn 黑白激光打印机 灰色 A4幅面 计价单位:台",
              skuPrice: "2289",
              skuId: "208383",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-10-21/f0fa5dbb-1125-46bb-8a65-5a91f0704b7f.jpg",
            },
            {
              type: "黑白激光打印机",
              sku: 10115581,
              skuName:
                "奔图 Pantum P2505N 黑白激光打印机 灰色 A4幅面 计价单位:台",
              skuPrice: "1619",
              skuId: "208382",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-10-21/404503d9-ed69-41c0-a2fb-9baf75b03e00.jpg",
            },
            {
              type: "黑白激光打印机",
              sku: 10115455,
              skuName:
                "奔图 Pantum P3301DN 黑白激光打印机 灰色 A4幅面 自动双面 计价单位:台",
              skuPrice: "2106",
              skuId: "208376",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-10-21/657a3667-b984-4fb7-9d73-f8a924cb171d.jpg",
            },
            {
              type: "黑白激光打印机",
              sku: 10218191,
              skuName:
                "奔图 PANTUM P3019DW 黑白激光打印机 A4幅面 灰色 计价单位:台",
              skuPrice: "1723",
              skuId: "350801",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-11-25/a30febbc-7e6c-4476-99dc-b74921d02921.jpg",
            },
            {
              type: "黑白激光打印机",
              sku: 10132059,
              skuName:
                "奔图 PANTUM M7300FDW 黑白激光无线多功能一体机 白色 计价单位:台",
              skuPrice: "4310",
              skuId: "292031",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-11-01/bc1b8572-03c4-4997-ad40-c22a3e5034f5.jpg",
            },
            // {
            //   type: "黑白激光打印机",
            //   sku: 10085144,
            //   skuName:
            //     "联想 Lenovo CS2010DW 彩色激光打印机 灰色 A4幅面 计价单位:台",
            //   skuPrice: "4789",
            //   skuId: "109551",
            //   skuUrl:
            //     "https://lxerp.66123123.com/image/sku/2019-09-02/96857c2b-7ed9-47e9-910b-ddb50e0ac76b.jpg",
            // },
          ],
        },
        {
          type: "馈纸式扫描仪",
          code: "010120004",
          childList: [
            {
              type: "馈纸式扫描仪",
              sku: 10135024,
              skuName:
                "方正 Founder S7160  扫描仪 A4 高速 双面 自动进纸 计价单位:台",
              skuPrice: "9579",
              skuId: "297933",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-11-04/d751c1df-c5a6-43d6-9ef1-ff875bd822e8.jpg",
            },
            {
              type: "馈纸式扫描仪",
              sku: 10599364,
              skuName:
                "方正 Founder Z110D A4彩色高速馈纸式扫描仪 白色 计价单位:台",
              skuPrice: "11495",
              skuId: "819570",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-08-19/978ddff0-b335-4ece-bd5e-aefc01d2ca37.jpg",
            },
            {
              type: "馈纸式扫描仪",
              sku: 10143410,
              skuName:
                "方正 Founder Z56D 扫描仪 白色 A4幅面 平板及馈纸式 计价单位:台",
              skuPrice: "4789",
              skuId: "311089",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-11-08/caeabfc3-3f90-41b1-9f50-784c3ee1099a.jpg",
            },
            {
              type: "馈纸式扫描仪",
              sku: 10133475,
              skuName:
                "方正 Founder F400 馈纸扫描仪 双面 高速 A4 黑色 计价单位:台",
              skuPrice: "6705",
              skuId: "296974",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-11-04/722bc113-2469-4f2d-8d21-fcacf077b884.jpg",
            },
            // {
            //   type: "馈纸式扫描仪",
            //   sku: 10134901,
            //   skuName:
            //     "方正 Founder Q690DS+ 高拍仪 A4 双摄像头 黑色 计价单位:台",
            //   skuPrice: "3831",
            //   skuId: "297420",
            //   skuUrl:
            //     "https://lxerp.66123123.com/image/sku/2020-09-01/5edfa911-df95-4039-86dd-7b47610114a7.jpg",
            // },
          ],
        },
        {
          type: "会议摄像头",
          code: "010010002",
          childList: [
            {
              type: "会议摄像头",
              sku: 10544435,
              skuName: "好会通 Meeteasy MT-838 会议专用麦克风 黑色 计价单位:支",
              skuPrice: "343",
              skuId: "751038",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-07-15/57bb3c88-e4cd-4fa0-b25c-1fe9132fc4b2.jpg",
            },
            {
              type: "会议摄像头",
              sku: 10544396,
              skuName: "好会通 Meeteasy MT-818 会议专用麦克风 黑色 计价单位:支",
              skuPrice: "248",
              skuId: "751039",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-07-15/f0e2da23-4d36-4e7a-a0fb-1eae77af9285.jpg",
            },
            {
              type: "会议摄像头",
              sku: 10560600,
              skuName:
                "润普 Runpu RP-HD20 会议摄像头 20倍变焦1080P 计价单位:台",
              skuPrice: "6514",
              skuId: "770789",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-07-24/65370513-4c6e-4d9f-9339-fcea5c6a6120.jpg",
            },
            {
              type: "会议摄像头",
              sku: 10398117,
              skuName:
                "润普 Runpu RP-KDM-12 视频会议摄像头  12倍变焦广角高清1080P摄像机  兼容中兴华为科达终端 计价单位:台",
              skuPrice: "15893",
              skuId: "562778",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-04-17/76cf1b1b-d924-47c1-86bc-d26f97378e5b.jpg",
            },
            {
              type: "会议摄像头",
              sku: 10544935,
              skuName:
                "润普 Runpu RP-HUW950A-30 高清视频会议摄像头 1080P 258*172*169mm 计价单位:台",
              skuPrice: "5345",
              skuId: "751617",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-07-15/ed38669a-4936-4a0d-9c5f-5b0a2b2e02e5.jpg",
            },
            {
              type: "会议摄像头",
              sku: 10388001,
              skuName:
                "润普 Runpu RP-JT4K-12 视频会议摄像头 12倍变焦大广角 高清1080P 兼容中兴华为终端 计价单位:个",
              skuPrice: "16899",
              skuId: "552876",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-04-07/f1affc2a-68b9-4480-a79c-d646e2511d6b.jpg",
            },
            // {
            //   type: "会议摄像头",
            //   sku: 10463591,
            //   skuName:
            //     "润普 Runpu RP-C910 视频会议摄像头1080p 收音3米 计价单位:个",
            //   skuPrice: "314",
            //   skuId: "647825",
            //   skuUrl:
            //     "https://lxerp.66123123.com/image/sku/2020-06-01/cce2c272-bd40-40d2-a393-56863b213698.jpg",
            // },
          ],
        },
        {
          type: "台式电脑",
          code: "040030002",
          childList: [
            {
              type: "台式电脑",
              sku: 10605969,
              skuName:
                "清华同方 超越E500-30904 商用台式电脑 十代i5-10400 16GB 2T+256GSSD 4G Win10 23.8英寸 三年质保 计价单位:套",
              skuPrice: "5499",
              skuId: "832658",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-08-05/345bef58-efe7-4563-8c4f-963ace6295aa.jpg",
            },
            {
              type: "台式电脑",
              sku: 10589324,
              skuName:
                "清华同方  超翔Z8000-23439 台式电脑 I5-10400 6核 4GB 集显 256G 黑色 +TF2165 21.5英寸显示器 计价单位:套",
              skuPrice: "4960",
              skuId: "813036",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-08-14/9cd20b73-7000-4a61-9c95-2e338760bfe7.png",
            },
            {
              type: "台式电脑",
              sku: 10474749,
              skuName:
                "联想 Lenovo M920T 台式电脑主机  i7-8700 32G 4T+512G 6G  win7专业版  计价单位:台",
              skuPrice: "12524",
              skuId: "666454",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-03-11/dbdf7bc3-9a5d-4480-b998-a64fe3f63e45.jpg",
            },
            {
              type: "台式电脑",
              sku: 10374456,
              skuName:
                "联想 Lenovo M920T 台式电脑 I7-9700 8G 1T +128G 4G 27英寸IPS显示器 计价单位:套",
              skuPrice: "9699",
              skuId: "535885",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2019-10-25/c613bf6f-60da-4af5-8513-ee56a7d50179.jpg",
            },
          ],
        },
        {
          type: "笔记本电脑",
          code: "040030001",
          childList: [
            {
              type: "笔记本电脑",
              sku: 10403255,
              skuName:
                "联想 Lenovo 昭阳K4e-IML126 笔记本电脑电脑 14寸i7-10510u 8G 1T硬盘+256G固态 2G独显 DOS 无光驱 14.0 FHD IPS 指纹识别 计价单位:台",
              skuPrice: "5579",
              skuId: "573474",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-04-23/dc760e12-cbe5-456f-9766-6beecfa98476.jpg",
            },
            {
              type: "笔记本电脑",
              sku: 10387971,
              skuName:
                "联想 Lenovo 扬天V15 15.6英寸笔记本电脑电脑i7-8565U 8G 1T+128G双硬盘 MX110 2G独显 全高清屏 星空灰 计价单位:台",
              skuPrice: "5363",
              skuId: "552780",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-04-06/96bc2578-53f0-4c20-b840-334a03c5bd51.jpg",
            },
            {
              type: "笔记本电脑",
              sku: 10387814,
              skuName:
                "清华同方 超锐X41-GCR-003 商用笔记本电脑 i5-10210U 8G 256G SSD+1T 2G独显 WIN10 二年质保 星空灰 计价单位:台",
              skuPrice: "6260",
              skuId: "551414",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-04-03/100a05ed-b3a8-4889-9a82-4044b738739f.jpg",
            },
            {
              type: "笔记本电脑",
              sku: 10598835,
              skuName:
                "联想 Lenovo X1 Carbon 7th-005 笔记本电脑电脑 酷睿i7 i7-10710U 16GB 512GB 集成显卡 中标麒麟V7.0 14英寸 黑色 计价单位:台",
              skuPrice: "14398",
              skuId: "822996",
              skuUrl:
                "https://lxerp.66123123.com/image/sku/2020-08-20/2ae4ac72-7719-495f-93f0-04f87ac83275.jpg",
            },
            // {
            //   type: "笔记本电脑",
            //   sku: 10616339,
            //   skuName:
            //     "联想 Lenovo T14 20UD0003CD 移动工作站 2020款 14英寸 7纳米 高性能 全面屏  R5 PRO-4650U 16G 512G FHD 指纹 计价单位:台",
            //   skuPrice: "5699",
            //   skuId: "843876",
            //   skuUrl:
            //     "https://lxerp.66123123.com/image/sku/2020-08-31/5bd180f2-1209-4c5c-bd68-dabb8b02ce2f.jpg",
            // },
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
        query: { skuId: value, type: 5 },
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
.ActivityPageT {
  font-size: 16px;
  min-height: 100%;
  background: #039ff2;
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
    width: 375px;
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
            background-image: url("../../assets/img/back1.png");
            background-size: 130px;
            margin: 0 auto;
            color: #fff;
            width: 130px;
            height: 35px;
            // line-height: 35px;
            // margin-top: -56px;
            font-size: 14px;
          }
          .rem_span {
            float: right;
            margin-top: -30px;
            font-size: 14px;
            margin-right: 20px;
            color: #666666;
          }
        }
        .list_body {
          display: inline-block;
          width: 360px;
          // float: left;
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
            line-height: 17px;
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