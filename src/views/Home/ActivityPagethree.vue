<template>
  <div class="ActivityPagethree">
    <inputTop :type="7" :badge="badge"></inputTop>
    <img src="@/assets/img/until.jpg" class="banner-img" />
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
        <div v-for="(rem, index) in list" :key="index" class="list_all">
          <div class="list_type">
            <!-- <div>
              <img src="@/assets/img/back1.png" />
            </div>-->
            <div
              class="rem_type"
              :style="{ lineHeight: rem.code == 100020005 ? '18px' : '35px' }"
            >
              <span>{{ rem.type }}</span>
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
  name: "ActivityPagethree",
  data() {
    return {
      list: [
        {
          type: "文件管理",
          code: "20010",
          childList: [
            {
              type: "文件管理",
              sku: 10425838,
              skuName: "及至  JZ5618 拉链袋(混色)（10个/包） 计价单位:包",
              skuPrice: "23.4",
              skuId: "596827",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-05-12/7d06a0cb-a60a-4aff-ab4c-e3ccf63467fe.jpg",
            },
            {
              type: "文件管理",
              sku: 10426521,
              skuName: "及至  JZ3310 透明二页文件套(10个/包) 计价单位:包",
              skuPrice: "9.1",
              skuId: "598236",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-05-12/4bce4c1c-61a3-4618-ba32-aef49ee8f8c1.jpg",
            },
            {
              type: "文件管理",
              sku: 10423835,
              skuName: "及至  JZ5602 35mm加厚档案盒 (蓝色) 计价单位:个",
              skuPrice: "10.4",
              skuId: "594375",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-05-09/24fc3a19-8eb1-47f3-b060-12aa203a6d18.jpg",
            },
            {
              type: "文件管理",
              sku: 10426458,
              skuName: "及至  JZ6499 多功能四联文件栏(蓝色) 计价单位:个",
              skuPrice: "30.6",
              skuId: "598169",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-05-12/dff6306b-5cb8-4334-8fb0-48f4fbb773a0.jpg",
            },
            {
              type: "文件管理",
              sku: 10426459,
              skuName: "及至  JZ6499 多功能四联文件栏(黑色) 计价单位:个",
              skuPrice: "30.6",
              skuId: "598173",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-05-12/2c71eb6d-96f7-4fab-8ff2-b826e3c223f6.jpg",
            },
            {
              type: "文件管理",
              sku: 10426516,
              skuName: "及至  JZ6005 长押夹+板夹(蓝) 计价单位:个",
              skuPrice: "8.5",
              skuId: "598212",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-05-12/ed72c526-5c53-437d-9196-d7ce2c5a973a.jpg",
            },
            {
              type: "文件管理",
              sku: 10426514,
              skuName: "及至  JZ6003 文件夹双强力夹(蓝) 计价单位:个",
              skuPrice: "9.1",
              skuId: "598198",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-05-12/76a90483-c871-4d2a-b0c8-82dde28996bb.jpg",
            },
            {
              type: "文件管理",
              sku: 10426465,
              skuName: "及至  JZ8660 资料册60页(蓝色)(本) 计价单位:本",
              skuPrice: "12.9",
              skuId: "598207",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-05-12/7397fcf7-f785-46e9-8d9b-af3b902ccbec.jpg",
            },
            {
              type: "文件管理",
              sku: 10426468,
              skuName:
                "及至  JZ1018 档案袋 绳扣式 竖式(白)(10个/包) 计价单位:包",
              skuPrice: "20",
              skuId: "598228",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-05-12/40197d62-db71-4e5b-a1a1-a087cd85620e.jpg",
            },
            {
              type: "文件管理",
              sku: 10423838,
              skuName: "及至  JZ5603 55mm加厚档案盒(蓝色) 计价单位:个",
              skuPrice: "11.9",
              skuId: "594381",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-05-09/b85dcc66-6532-4c76-bfdf-c7a92302596f.jpg",
            },
            {
              type: "文件管理",
              sku: 10609965,
              skuName: "及至  JZ3354 彩色回形针 28mm 65枚/筒 计价单位:筒",
              skuPrice: "2.3",
              skuId: "838102",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-08-27/8ac3a2ff-7271-4d3c-8438-c616a644bdd6.jpg",
            },
            {
              type: "文件管理",
              sku: 10609974,
              skuName: "及至  JZ3211 订书钉 12# 1000枚 计价单位:盒",
              skuPrice: "1.4",
              skuId: "838113",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-08-27/859233e7-285e-459a-83df-8628ae7305a5.jpg",
            },
            {
              type: "文件管理",
              sku: 10423787,
              skuName:
                "及至  JZ3331 彩色长尾票夹51mm筒装(混)(12只/筒) 计价单位:筒",
              skuPrice: "12.9",
              skuId: "594380",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-05-09/5b7c0057-a8b1-4ac6-82ca-5ba2449f4cba.jpg",
            },
            {
              type: "文件管理",
              sku: 10423834,
              skuName:
                "及至  JZ3335 彩色长尾票夹19mm筒装(混)(40只/筒) 计价单位:筒",
              skuPrice: "7.5",
              skuId: "594376",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-05-09/8b77849e-669f-4109-bf25-d0846ffadbb4.jpg",
            },
            {
              type: "文件管理",
              sku: 10423837,
              skuName:
                "及至  JZ3333 彩色长尾票夹32mm筒装(混)(24只/筒) 计价单位:筒",
              skuPrice: "10.4",
              skuId: "594378",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-05-09/1f35ea28-1dac-4367-ae6d-c2f559f13b3c.jpg",
            },
            {
              type: "文件管理",
              sku: 10423786,
              skuName:
                "及至  JZ3332 彩色长尾票夹41mm筒装(混)(24只/筒) 计价单位:筒",
              skuPrice: "18.2",
              skuId: "594379",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-05-09/fe4cc061-b144-4ce7-98a9-6cf207763282.jpg",
            },
          ],
        },
        {
          type: "打印机/传真机耗材",
          code: "10002",
          childList: [
            {
              type: "打印机/传真机耗材",
              sku: 10232327,
              skuName:
                "及至  JZ-TN1035/1020/1040 粉盒 黑色 兰亭系列 适用机型 兄弟 HL1118 1111 DCP1518 1511 MFC1813 1818 1811 计价单位:支",
              skuPrice: "126",
              skuId: "374457",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-01-15/6caf109d-fe30-487f-9ba7-f2dd06b6e1e2.png",
            },
            {
              type: "打印机/传真机耗材",
              sku: 10232270,
              skuName:
                "及至  JZ-DR1035/1020/1040 鼓架  黑色 兰亭系列 适用机型 兄弟 HL1118 1111 DCP1518 1511 MFC1813 1818 1811 计价单位:支",
              skuPrice: "168",
              skuId: "374462",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-01-15/65a4e46f-5cfb-43cc-91d2-85f9293a8051.png",
            },
            {
              type: "打印机/传真机耗材",
              sku: 10232402,
              skuName:
                "及至  JZ-MLT-D101L 硒鼓 黑色 兰亭系列 适用机型 SAMSUNG ML2160 2161 2165 2166 SCX3405FW SF760P 计价单位:支",
              skuPrice: "196",
              skuId: "374193",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-01-15/aed53d69-11eb-4a34-96c2-c9e83a185332.png",
            },
            {
              type: "打印机/传真机耗材",
              sku: 10232530,
              skuName:
                "及至  JZ-LT2451H 墨粉 黑色 兰亭系列 适用机型 联想 LJ2650D 2655 2455 2405 M7455 7615 7655 7675 7605 计价单位:支",
              skuPrice: "126",
              skuId: "374352",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-01-15/64e3f0fc-d8c8-437b-ba94-eed01d47833c.jpg",
            },
            {
              type: "打印机/传真机耗材",
              sku: 10232268,
              skuName:
                "及至  JZ-DR2325 鼓架 黑色 兰亭系列 适用机型 兄弟 HL2560 2260 2260D 7180 7080 7880 7480 7380 计价单位:支",
              skuPrice: "229",
              skuId: "374509",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-01-15/5d37c81c-aa11-4478-8e08-8b6fb9cdfa27.png",
            },
            {
              type: "打印机/传真机耗材",
              sku: 10232529,
              skuName:
                "及至  JZ-TN2215/2225 粉盒 黑色 兰亭系列 适用机型 兄弟 HL2240 2130 2250 2270  DCP 7055 计价单位:支",
              skuPrice: "126",
              skuId: "374387",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-01-15/52d5883c-e62e-4a6d-a0c9-f0f09ff04c37.jpg",
            },
            {
              type: "打印机/传真机耗材",
              sku: 10232531,
              skuName:
                "及至  JZ-LT2441H 墨粉 黑色 兰亭系列 适用机型 联想 LJ2400  M7200 7450F 2600D 2650D M7600 7650DF 计价单位:支",
              skuPrice: "126",
              skuId: "374332",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-01-15/1fdc0dd3-2fcd-4d59-bab9-4f61b90872a7.jpg",
            },
            {
              type: "打印机/传真机耗材",
              sku: 10232269,
              skuName:
                "及至  JZ-TN2325 粉盒 黑色 兰亭系列 适用机型 兄弟 HL2560 2260 2260D 7180 7080 7880 7480 7380 计价单位:支",
              skuPrice: "126",
              skuId: "374468",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-01-15/607821db-3cb9-4502-8b2c-415d58e60078.png",
            },
            {
              type: "打印机/传真机耗材",
              sku: 10232401,
              skuName:
                "及至  JZ-MLT-D111S 硒鼓 黑色 兰亭系列 适用机型 SAMSUNG SLM2020 2022W 2070 计价单位:支",
              skuPrice: "196",
              skuId: "374236",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-01-15/5c947f0f-e1ec-428b-bfbc-c286b1c30442.jpg",
            },
            {
              type: "打印机/传真机耗材",
              sku: 10313320,
              skuName:
                "及至  JZ-Q2612AX/CRG303/FX9 硒鼓 黑色 兰亭系列 适用机型 HP LaserJet 1010 1015 1012 3015 3020 3030 1020 Canon LBP2900 3000 L100 计价单位:支",
              skuPrice: "114",
              skuId: "456098",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-01-15/ef68cadb-cb5d-4f49-a212-1a650eb3ed47.jpg",
            },
            {
              type: "打印机/传真机耗材",
              sku: 10232526,
              skuName:
                "及至  JZ-CC388AX 硒鼓 黑色 兰亭系列 适用机型 HP P1007 1008 M1136 1213 1216 计价单位:支",
              skuPrice: "114",
              skuId: "371917",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-01-15/e5b89124-b2ba-4558-af69-19131c35256f.jpg",
            },
            {
              type: "打印机/传真机耗材",
              sku: 10232519,
              skuName:
                "及至  JZ-CF283A 硒鼓 黑色 兰亭系列 HP PRO MFP M125 127FN 202DW 225 202N 201DW 计价单位:支",
              skuPrice: "126",
              skuId: "372987",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-01-15/4b37ab0e-a333-4b70-a7f6-35c4a6eb93ff.png",
            },
            {
              type: "打印机/传真机耗材",
              sku: 10232518,
              skuName:
                "及至  JZ-CF279A 硒鼓 黑色 兰亭系列 适用机型 HP M12a M12w M16a M16w 计价单位:支",
              skuPrice: "126",
              skuId: "373051",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-01-15/8f1496c4-11c6-468a-bf8e-78e2eb36202d.png",
            },
            {
              type: "打印机/传真机耗材",
              sku: 10232400,
              skuName:
                "及至  JZ-MLT-D1043 硒鼓 黑色 兰亭系列 适用机型 SAMSUNG ML1666 1665 1660 1661 3201 1860 计价单位:支",
              skuPrice: "196",
              skuId: "374241",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-01-15/a77ca54f-7ed7-4002-a4c9-9cbf41d8b637.png",
            },
            {
              type: "打印机/传真机耗材",
              sku: 10232467,
              skuName:
                "及至  JZ-CE278A 硒鼓 黑色 兰亭系列 适用机型 HP P1566 1606DN 计价单位:支",
              skuPrice: "126",
              skuId: "372055",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-01-15/8fef7474-295e-4f9a-bf32-193c942c7a22.png",
            },
            {
              type: "打印机/传真机耗材",
              sku: 10313235,
              skuName:
                "及至  JZ-CB435A/CE285A/CRG912 硒鼓 黑色 兰亭系列 适用机型 HP MFP1005 1006 P1102 计价单位:支",
              skuPrice: "126",
              skuId: "456367",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-01-15/216f7347-c77e-43bb-87c5-e3dee12e4ef9.jpg",
            },
          ],
        },
        {
          type: "复印纸",
          code: "10007",
          childList: [
            {
              type: "复印纸",
              sku: 10272837,
              skuName:
                "及至  L1470-5 复印纸 兰亭系列 A4 70g 500张/包 5包/箱 计价单位:箱",
              skuPrice: "138",
              skuId: "401758",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-12-19/d80659eb-237c-4b5d-a5e4-b1ed766d354f.jpg",
            },
            {
              type: "复印纸",
              sku: 10272744,
              skuName:
                "及至  L1480-5 复印纸 兰亭系列 A4 80g 500张/包 5包/箱 计价单位:箱",
              skuPrice: "158",
              skuId: "402316",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-12-19/ce989497-1527-442e-8a2a-cf2b8a2a9348.jpg",
            },
            {
              type: "复印纸",
              sku: 10100390,
              skuName:
                "及至  J1480-5 复印纸 A4 80g 500张*5包/箱（计价单位：箱） 计价单位:箱",
              skuPrice: "115",
              skuId: "120346",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-09-19/a3a0b07d-0834-4db6-9b74-008d6033d14f.jpg",
            },
            {
              type: "复印纸",
              sku: 10273008,
              skuName:
                "及至  L1470-8 复印纸 兰亭系列 A4 70g 500张/包 8包/箱 计价单位:箱",
              skuPrice: "168",
              skuId: "402282",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-12-19/e5f849d3-6650-48b3-88aa-d9cb5cb46286.jpg",
            },
            {
              type: "复印纸",
              sku: 10100392,
              skuName:
                "及至  J1470-5  复印纸 A4 70g 500张/包*5包（计价单位：箱） 计价单位:箱",
              skuPrice: "95",
              skuId: "119714",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-09-19/91223a5e-7f3c-471d-87d5-0b8b45df36d2.jpg",
            },
            {
              type: "复印纸",
              sku: 10100391,
              skuName:
                "及至  J1470-8 复印纸 A4 70g 500张/包*8包（计价单位：箱） 计价单位:箱",
              skuPrice: "152",
              skuId: "120320",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-09-19/da072332-b36a-4776-bfae-0ec12df90e20.jpg",
            },
          ],
        },
        {
          type: "清洁工具",
          code: "07003",
          childList: [
            {
              type: "清洁工具",
              sku: 10523021,
              skuName:
                "及至  JZ1002 圆形纸篓 垃圾桶 8L 24*19.5*26.5cm 木纹灰 计价单位:个",
              skuPrice: "11.4",
              skuId: "723941",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-07-02/7e12d568-c5b3-4f83-b1e7-98ed01c9a3bd.jpg",
            },
            {
              type: "清洁工具",
              sku: 10523062,
              skuName:
                "及至  JZ1002 圆形纸篓 垃圾桶 8L 24*19.5*26.5cm 木纹黄 计价单位:个",
              skuPrice: "11.4",
              skuId: "723994",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-07-02/7e3e31f9-7f77-451b-8366-82320e428a46.jpg",
            },
            {
              type: "清洁工具",
              sku: 10523078,
              skuName:
                "及至  JZ1002 圆形纸篓 垃圾桶 8L 24*19.5*26.5cm 木纹绿 计价单位:个",
              skuPrice: "11.4",
              skuId: "724006",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-07-02/84660142-90fc-4eb2-8dfd-8410d3346cc5.jpg",
            },
            {
              type: "清洁工具",
              sku: 10520787,
              skuName:
                "及至  JZ1001 圆形镂空纸篓 垃圾桶 7L 27*19*25cm 蓝色 计价单位:个",
              skuPrice: "5.6",
              skuId: "720214",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-07-01/f98b4a9a-5af7-4632-b0f5-5127d617ffda.jpg",
            },
            {
              type: "清洁工具",
              sku: 10522943,
              skuName:
                "及至  JZ1001 圆形镂空纸篓 垃圾桶 7L 27*19*25cm 绿色 计价单位:个",
              skuPrice: "5.6",
              skuId: "720270",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-07-02/e3483eb1-3b0e-4f85-a183-1cdf6569da16.jpg",
            },
            {
              type: "清洁工具",
              sku: 10522946,
              skuName:
                "及至  JZ1001 圆形镂空纸篓 垃圾桶 7L 27*19*25cm 粉色 计价单位:个",
              skuPrice: "5.6",
              skuId: "723498",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-07-02/5aed4d5d-e38a-4bc5-86d0-87c5a3cf7551.jpg",
            },
            {
              type: "清洁工具",
              sku: 10523114,
              skuName:
                "及至  JZ1003 圆形压边纸篓 垃圾桶 10L 26*2.5*28cm 粉色 计价单位:个",
              skuPrice: "10.5",
              skuId: "724029",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-07-02/360bd4be-b8b3-459e-946a-632bc8667f53.jpg",
            },
            {
              type: "清洁工具",
              sku: 10523103,
              skuName:
                "及至  JZ1003 圆形压边纸篓 垃圾桶 10L 26*2.5*28cm 蓝色 计价单位:个",
              skuPrice: "10.5",
              skuId: "724219",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-07-02/07f5acc0-56e7-428a-904f-922a7bb6632c.jpg",
            },
            {
              type: "清洁工具",
              sku: 10523149,
              skuName:
                "及至  JZ1003 圆形压边纸篓 垃圾桶 10L 26*2.5*28cm 绿色 计价单位:个",
              skuPrice: "10.5",
              skuId: "724354",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-07-02/b6807c03-7f40-4799-b2b7-bb57a32bc181.jpg",
            },
            {
              type: "清洁工具",
              sku: 10426522,
              skuName: "及至  JZ6793 金属圆形纸篓(黑)275*280mm 计价单位:个",
              skuPrice: "21",
              skuId: "598239",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-05-12/319199be-2456-4796-97b4-0645f383c45f.jpg",
            },
            {
              type: "清洁工具",
              sku: 10451860,
              skuName:
                "及至  JZ2002 大号平口垃圾袋 100*120cm(3丝加厚)(30只/包)(黑色) 计价单位:包",
              skuPrice: "30.6",
              skuId: "617099",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-05-20/f3649214-7517-4f18-bc87-a224eae9654b.jpg",
            },
            {
              type: "清洁工具",
              sku: 10676554,
              skuName:
                "及至  JZ2008 小号抽绳收口手提垃圾袋 45*55cm(2丝加厚)(30只/卷) 3卷90只装(黑色) 计价单位:套",
              skuPrice: "18.6",
              skuId: "942376",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-05-20/cabd3770-6c34-40fd-9951-bb64ec5e28aa.jpg",
            },
            {
              type: "清洁工具",
              sku: 10451781,
              skuName:
                "及至  JZ2001 大号平口垃圾袋 90*100cm(3丝加厚)(30只/包)(黑色) 计价单位:包",
              skuPrice: "22",
              skuId: "617063",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-05-20/7e5fcf31-2161-451c-8ef1-a575951e62b0.jpg",
            },
            {
              type: "清洁工具",
              sku: 10676555,
              skuName:
                "及至  JZ2010 小号抽绳收口手提垃圾袋 45*55cm(3丝特厚)(30只/卷) 3卷90只装(黑色) 计价单位:套",
              skuPrice: "27.6",
              skuId: "942388",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-05-20/72e63509-d313-4c93-bc19-4a4a7ba89c04.jpg",
            },
            {
              type: "清洁工具",
              sku: 10676450,
              skuName:
                "及至  JZ2009 中号抽绳收口手提垃圾袋 50*60cm(2丝加厚)(30只/卷) 3卷90只装(黑色) 计价单位:套",
              skuPrice: "21.9",
              skuId: "942380",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-05-20/5ec92994-e2e4-453e-907b-9cc151785654.jpg",
            },
            {
              type: "清洁工具",
              sku: 10676556,
              skuName:
                "及至  JZ2011 中号抽绳收口手提垃圾袋 50*60cm(3丝特厚)(30只/卷) 3卷90只装(黑色) 计价单位:套",
              skuPrice: "32.4",
              skuId: "942396",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-05-20/f21af40e-7a54-4f8e-b71c-9f04fa1b4278.jpg",
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
.ActivityPagethree {
  font-size: 16px;
  min-height: 100%;
  background: #039ff2;
  background-image: url("../../assets/img/until3.jpg");
  background-size: 375px;
  overflow-x: hidden;
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
    // margin: 0 12px;
    width: 350px;
    display: inline-block;
    // margin-bottom: 60px;
    // height: 180px;

    .hotgoods_list {
      font-size: 26px;
      width: 375px;
      display: block;
      float: left;
      .list_all {
        display: block;
        .list_type {
          width: 375px;
          height: 50px;
          float: left;
          display: inline-block;
          text-align: center;
          margin-bottom: 20px;
          img {
            width: 120px;
          }
          .rem_type {
            background: url("../../assets/img/until2.png") no-repeat;
            background-size: 375px;
            color: #e9a736;
            width: 375px;
            height: 60px;
            font-size: 20px;
            font-weight: bold;
            span {
              margin-top: 20px;
              display: inline-block;
            }
          }
          .rem_span {
            float: right;
            margin-top: -40px;
            font-size: 14px;
            margin-right: 20px;
            color: #e9a736;
          }
        }
        .list_body {
          display: inline-block;
          width: 360px;
          margin: 0 12px;
          // float: left;
        }
        .item_goods {
          width: 170px;
          height: 240px;
          // display: flex;
          background-image: url("../../assets/img/until1.jpg");
          background-size: 170px 240px;
          float: left;
          flex-direction: column;
          margin: 0 0px 10px 5px;
          box-sizing: border-box;
          border-radius: 8px;
          .img_boy {
            width: 150px;
            height: 150px;
            border: 1px solid #f8f8f8;
            border-radius: 4px;
            margin: 5px 0 0 8px;
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