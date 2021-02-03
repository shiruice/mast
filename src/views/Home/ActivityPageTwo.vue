<template>
  <div class="ActivityPageTwo">
    <inputTop :type="7" :badge="badge"></inputTop>
    <img src="@/assets/img/industrial.jpg" class="banner-img" />
    <div class="banner_img"></div>
    <div class="hotgoods_body">
      <div class="hotgoods_list">
        <div v-for="(rem, index) in list" :key="index" class="list_all">
          <div class="list_type">
            <div
              class="rem_type"
              :style="{ lineHeight: rem.code == 100020005 ? '18px' : '35px' }"
            >
              {{ rem.type }}
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
  name: "ActivityPageTwo",
  data() {
    return {
      list: [
        {
          type: "电控照明",
          code: "02024",
          childList: [
            {
              type: "电控照明",
              sku: 10208711,
              skuName:
                "德力西 Delixi HDBE32LE1C16 微型断路器 带漏电保护 1P+N 16A 计价单位:个",
              skuPrice: "35.4",
              skuId: "303713",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-11-05/f6b1a81c-2a5a-4a45-86c0-f5e093a54fbd.jpg",
            },
            {
              type: "电控照明",
              sku: 10208603,
              skuName:
                "德力西 Delixi HDBE63LE1C63 微型断路器 带漏电保护 1P+N 63A 计价单位:个",
              skuPrice: "54",
              skuId: "303717",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-11-05/0daae87b-8074-4c43-837b-d03af5a44164.jpg",
            },
            {
              type: "电控照明",
              sku: 10519604,
              skuName:
                "德力西 Delixi HDBE32LE2C20 漏电断路器 2P 20A 计价单位:个",
              skuPrice: "48.7",
              skuId: "714593",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-06-28/b38a483d-0b27-490b-824d-254c7897289a.jpg",
            },
            {
              type: "电控照明",
              sku: 10207158,
              skuName: "德力西 Delixi DZ47SN2C16 微型断路器 2P 16A 计价单位:台",
              skuPrice: "18.7",
              skuId: "142778",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-10-08/98db7a9e-d352-493c-a455-50c3bd931f2a.jpg",
            },
            {
              type: "电控照明",
              sku: 10517887,
              skuName:
                "德力西 Delixi HDBE632C16 小型微型断路器 C型 2P 16A 计价单位:个",
              skuPrice: "20.1",
              skuId: "714223",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-06-28/e36006b5-a791-412d-81ee-8ea69834e432.jpg",
            },
            {
              type: "电控照明",
              sku: 10208821,
              skuName: "德力西 Delixi DZ47SN3C63 微型断路器 3P 63A 计价单位:个",
              skuPrice: "27.7",
              skuId: "303609",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-11-05/44ebfb2d-0c43-4a43-b3c4-8fb445c5d57e.jpg",
            },
            {
              type: "电控照明",
              sku: 10134967,
              skuName: "德力西 Delixi DZ47SN1C25 微型断路器 1P 25A 计价单位:个",
              skuPrice: "7.6",
              skuId: "298030",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-11-04/0994e340-1334-4b6d-9de4-e375cbd7b823.jpg",
            },
            {
              type: "电控照明",
              sku: 10204834,
              skuName:
                "德力西(Delixi) HDBE632C20 空气开关 家用空开小型双进双出断路器 2P20A 计价单位:个",
              skuPrice: "21",
              skuId: "306525",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-11-06/2ab9b19e-1fc9-40d6-9e5f-8b2f7482c9fd.jpg",
            },
            {
              type: "电控照明",
              sku: 10317056,
              skuName: "德力西 Delixi DZ47SN3C40 微型断路器 计价单位:只",
              skuPrice: "25.1",
              skuId: "169771",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-10-16/5cc30f9e-434b-46eb-8f1f-779539461933.jpg",
            },
            {
              type: "电控照明",
              sku: 10516872,
              skuName:
                "德力西 Delixi DZ47SLEN6C32 小型断路器 DZ47sLE 3P+N C型 32A 计价单位:个",
              skuPrice: "50.5",
              skuId: "709576",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-06-29/5061d99a-c11c-434a-b020-611da896dd4b.jpg",
            },
            {
              type: "电控照明",
              sku: 10421148,
              skuName:
                "德力西 Delixi HDBE631C10 空气开关 单极断路器 1P 10A 计价单位:个",
              skuPrice: "10.5",
              skuId: "590704",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-05-07/70238231-3f7a-43cb-8fa8-f7d63977c1ad.jpg",
            },
            {
              type: "电控照明",
              sku: 10518768,
              skuName:
                "德力西 Delixi JSZ3K60S380 电子式时间继电器 JSZ3K  60S  AC380V 计价单位:只",
              skuPrice: "51.6",
              skuId: "700146",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-06-23/507a5151-c9c2-4f82-9680-3fbbe279a6f8.jpg",
            },
          ],
        },
        {
          type: "仪器仪表",
          code: "18019",
          childList: [
            {
              type: "仪器仪表",
              sku: 10154120,
              skuName:
                "福禄克  FLUKE-59E+ 红外测温仪 -30 °C至400 °C 计价单位:台",
              skuPrice: "382",
              skuId: "169072",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-10-16/34bc648a-e175-4fbc-8cc7-886b8b51b3f0.jpg",
            },
            {
              type: "仪器仪表",
              sku: 10154126,
              skuName:
                "福禄克  FLUKE-59E 红外测温仪 -30 °C至350 °C 计价单位:台",
              skuPrice: "280",
              skuId: "169083",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-10-16/32d6cc46-d6a2-4c7a-9ac2-b49de4dc44b2.jpg",
            },
            {
              type: "仪器仪表",
              sku: 10092568,
              skuName: "福禄克  FLUKE-317 数字钳形表 计价单位:套",
              skuPrice: "1285",
              skuId: "99341",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-09-27/b49b9228-770a-438b-a08f-dcafbb1c7b08.jpg",
            },
            {
              type: "仪器仪表",
              sku: 10153875,
              skuName: "福禄克  FLUKE-2042 电缆探测仪 计价单位:台",
              skuPrice: "4190",
              skuId: "168902",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-10-16/e47414ae-69e8-4bc9-bb32-ee7d3292c686.jpg",
            },
            {
              type: "仪器仪表",
              sku: 10091540,
              skuName:
                "福禄克  FLUKE-18B+ CHINA 新型数字万用表 带发光二极管测试功能 计价单位:套",
              skuPrice: "726",
              skuId: "100326",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-08-03/8dbf4238-f5b4-43f2-bd33-2d8c69b21367.jpg",
            },
            {
              type: "仪器仪表",
              sku: 10092641,
              skuName: "福禄克  FLUKE-15B+ CHINA 新型数字万用表 计价单位:套",
              skuPrice: "498",
              skuId: "99269",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-09-10/75c80def-5637-4b86-845b-dd8862b8c404.jpg",
            },
            {
              type: "仪器仪表",
              sku: 10154088,
              skuName: "日置  FT3424 照度计 计价单位:台",
              skuPrice: "4362",
              skuId: "169151",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-10-16/7ddccd7d-4614-4856-93d9-be73633425de.jpg",
            },
            {
              type: "仪器仪表",
              sku: 10156117,
              skuName: "艾普瑞  PRO 1500 激光测距仪 1500m+/-0.5m 计价单位:台",
              skuPrice: "3908",
              skuId: "271376",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-10-30/d4a65794-2e39-4a87-9eab-11d5cb63d70b.jpg",
            },
          ],
        },
        {
          type: "流体传动",
          code: "14020",
          childList: [
            {
              type: "流体传动",
              sku: 10479081,
              skuName: "佳航  Φ150×1120 聚结滤芯 计价单位:个",
              skuPrice: "606",
              skuId: "678109",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-06-12/d469c690-3b08-4e5f-b231-3cbce0c24d65.jpg",
            },
            {
              type: "流体传动",
              sku: 10529086,
              skuName:
                "联塑 Lesso DN32 PP-R给水管 S5 1.25MPa 内灰外白色 2m（计价单位：根） 计价单位:根",
              skuPrice: "22.7",
              skuId: "731607",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-07-06/9bde39e0-9750-4cf7-90d8-9ee90364acdb.jpg",
            },
            {
              type: "流体传动",
              sku: 10335746,
              skuName: "联塑 Lesso  dn25 PPR截止阀 白色 计价单位:个",
              skuPrice: "29.5",
              skuId: "486077",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-02-28/cd2f0da9-bc39-44d2-b846-4083586c7614.jpg",
            },
            {
              type: "流体传动",
              sku: 10335762,
              skuName: "联塑 Lesso dn32 PPR截止阀 白色 计价单位:个",
              skuPrice: "48.8",
              skuId: "486083",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-02-28/c14cd322-5971-4d6e-9fc7-bc2ef7b536e4.jpg",
            },
            {
              type: "流体传动",
              sku: 10386520,
              skuName:
                "联塑 Lesso dn50*2.4mm PVC-U给水直管(1.0MPa)白色 dn50 2米/根 计价单位:根",
              skuPrice: "23.9",
              skuId: "549989",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-04-02/0e5d0bf7-163e-4e0d-a481-e453ce12ac24.jpg",
            },
            {
              type: "流体传动",
              sku: 10336194,
              skuName: "联塑 Lesso DN63 PVC-U给水管球阀 计价单位:个",
              skuPrice: "30",
              skuId: "486245",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-02-28/b961eb50-e2b8-4a38-8c9f-09c472c3449a.jpg",
            },
            {
              type: "流体传动",
              sku: 10570033,
              skuName:
                "联塑 Lesso dn20X1/2 内螺纹三通Ⅰ型 PP-R 配件 灰色 计价单位:个",
              skuPrice: "6.7",
              skuId: "780020",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-07-29/4e2d0306-4d14-430c-a2d9-d7f35711aa7b.jpg",
            },
            {
              type: "流体传动",
              sku: 10386018,
              skuName:
                "联塑 Lesso dn20mm  PVC给水球阀 20 25 32 给水管配件管件 止水阀门球阀双活接球阀 球阀白色 计价单位:个",
              skuPrice: "4",
              skuId: "549008",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-04-01/27b3c80f-1d64-4452-94da-79aee77e336a.jpg",
            },
            {
              type: "流体传动",
              sku: 10428445,
              skuName: "帝旺 32X25 PPR管件接头 内丝直径  32mm 计价单位:个",
              skuPrice: "16.2",
              skuId: "601943",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-05-14/57181cee-11b4-45cb-b38b-656c41026e53.jpg",
            },
            {
              type: "流体传动",
              sku: 10464479,
              skuName: "帝旺 32 PPR三通 计价单位:个",
              skuPrice: "2.8",
              skuId: "649152",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-06-01/eb5bd96f-e679-454e-a981-fe4fdb8b24b2.jpg",
            },
          ],
        },
        {
          type: "五金工具",
          code: "09027",
          childList: [
            {
              type: "五金工具",
              sku: 10106027,
              skuName: "安赛瑞  12号 捆扎铁丝5斤 2.8mm*40m 银色 计价单位:捆",
              skuPrice: "95.6",
              skuId: "137786",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-09-25/cba83fe0-7ab1-4308-9267-e6ee23db48f5.jpg",
            },
            {
              type: "五金工具",
              sku: 10418794,
              skuName:
                "海斯迪克 HK-358 14号 1KG 粗2.2mm 长约34米 工业用镀锌铁丝 防锈电镀铁丝 工地建筑细铁丝线 计价单位:捆",
              skuPrice: "23",
              skuId: "588486",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-04-30/2f2f27c3-79ae-489a-9916-64bf676ada42.jpg",
            },
            {
              type: "五金工具",
              sku: 10418783,
              skuName:
                "海斯迪克  HK-358 18号 1KG 粗1.2mm 长约113米 工业用镀锌铁丝 防锈电镀铁丝 工地建筑细铁丝线 计价单位:捆",
              skuPrice: "23",
              skuId: "588475",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-04-30/2f2f27c3-79ae-489a-9916-64bf676ada42.jpg",
            },
            {
              type: "五金工具",
              sku: 10105533,
              skuName: "冰禹  BY-348 铁锹 120cm 绿色铲头 计价单位:个",
              skuPrice: "56.7",
              skuId: "138653",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-09-26/616dc333-0231-4a3b-a4c8-54e6bcdf2790.jpg",
            },
            {
              type: "五金工具",
              sku: 10432373,
              skuName: "安赛瑞  26310 小军蜡木镐柄 57cm 原色 计价单位:根",
              skuPrice: "56.4",
              skuId: "606305",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-05-15/520885cf-2a22-4c83-993e-e588507326b4.jpg",
            },
            {
              type: "五金工具",
              sku: 10399407,
              skuName: "勒塔 LT-HA365 不锈钢油灰刀5英寸 125mm 计价单位:把",
              skuPrice: "10.4",
              skuId: "563694",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-04-20/e02ee816-5b43-42ed-850e-8d419384f946.jpg",
            },
            {
              type: "五金工具",
              sku: 10353420,
              skuName: "勒塔 LT-HA359 滚筒刷子 9寸 计价单位:个",
              skuPrice: "14.2",
              skuId: "508614",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-03-09/e5ac2a55-3aa2-49bd-84d7-954d8b109f71.jpg",
            },
            {
              type: "五金工具",
              sku: 10388934,
              skuName:
                "长鹿 Girafe 1寸  猪毛刷 加厚 涂刷均匀 木柄刷 计价单位:把",
              skuPrice: "2.1",
              skuId: "552775",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-04-08/e0193468-3b85-4b32-bd31-a20103df6488.jpg",
            },
            {
              type: "五金工具",
              sku: 10462424,
              skuName:
                "易尔拓 YT-83160 干湿两用沙布块粗细砂纸打磨抛光36目230*280mm 计价单位:张",
              skuPrice: "1.4",
              skuId: "611613",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-04-26/66503379-6ae6-4aca-8f3c-2fa9a1476e0a.jpg",
            },
            {
              type: "五金工具",
              sku: 10468345,
              skuName: "冰禹  BYJZ-3586 钉子 3寸80mm 500g 计价单位:盒",
              skuPrice: "18.1",
              skuId: "654882",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-06-03/99ab0094-ed40-4632-9480-95479ebf3786.jpg",
            },
            {
              type: "五金工具",
              sku: 10185192,
              skuName: "世达 Sata 70301A 钢丝钳6英寸   计价单位:把",
              skuPrice: "46.9",
              skuId: "301868",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-11-05/20ce8608-77ab-444a-9156-5405506a8e7e.jpg",
            },
            {
              type: "五金工具",
              sku: 10105655,
              skuName: "世达 Sata 91402 钢直尺 300mm 计价单位:把",
              skuPrice: "8.2",
              skuId: "138398",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-09-25/0c91d870-3c10-46db-958d-4debf0fbaae6.jpg",
            },
            {
              type: "五金工具",
              sku: 10183246,
              skuName: "世达 Sata 93416 12英寸 高速钢锯条  18齿  计价单位:根",
              skuPrice: "7.6",
              skuId: "301554",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-11-05/fd83536c-41ac-42a8-905c-638373e01e4f.jpg",
            },
            {
              type: "五金工具",
              sku: 10422126,
              skuName: "晟雕 5cm*3m  货物捆绑带 聚酯纤维  橙色  计价单位:套",
              skuPrice: "36.4",
              skuId: "592042",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-05-08/7ddc5022-f18c-47ce-a2f7-e9fd5daecdaf.jpg",
            },
          ],
        },
        {
          type: "劳保/安防",
          code: "13007",
          childList: [
            {
              type: "劳保/安防",
              sku: 10077367,
              skuName:
                "霍尼韦尔 Honeywell 100100 护目镜 S200A防雾防冲击 透明镜片 14.5*5*12cm 镜框：蓝色 适用于：防风沙/防冲击/防紫外线等 计价单位:副",
              skuPrice: "19",
              skuId: "25361",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-08-21/0ea8908b-1f78-4b51-8279-f58c5345c5e7.jpg",
            },
            {
              type: "劳保/安防",
              sku: 10071877,
              skuName:
                "3M 10196 护目眼镜 防尘 防飞溅 防紫外线 透明镜片 镜框蓝黑色  计价单位:副",
              skuPrice: "27",
              skuId: "31983",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-08-21/aa39c343-cb8e-44b3-b57a-d15735f162e6.jpg",
            },
            {
              type: "劳保/安防",
              sku: 10073778,
              skuName: "3M PELTOR H7A 防噪音耳罩 头带式 黑色 计价单位:副",
              skuPrice: "194",
              skuId: "30472",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-08-21/845b824c-4380-4b49-99a6-78a2f8c490f4.jpg",
            },
            {
              type: "劳保/安防",
              sku: 10517721,
              skuName: "苏识  KN95 专业防护口罩 白色 10只/盒 计价单位:盒",
              skuPrice: "108",
              skuId: "690978",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-06-17/5671afbc-251e-4a14-a8db-c992a00d78d2.jpg",
            },
            {
              type: "劳保/安防",
              sku: 10517767,
              skuName:
                "苏识  NO.10 家庭防护组合J 一次性防护口罩50只 惠吉免水洗手液510ml2瓶 计价单位:套",
              skuPrice: "184",
              skuId: "690977",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-06-17/27d161a7-cbee-4e6a-9302-0820c93d235f.jpg",
            },
            {
              type: "劳保/安防",
              sku: 10491626,
              skuName:
                "苏识  浅蓝色 一次性防护口罩 CE认证型 50只/包 计价单位:只",
              skuPrice: "2.3",
              skuId: "690972",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-06-17/3d403e71-3944-499a-9cdf-72c4247f0151.jpg",
            },
            {
              type: "劳保/安防",
              sku: 10187779,
              skuName: "海太尔 0391 救援手套 防撞防割 计价单位:副",
              skuPrice: "76.6",
              skuId: "178286",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-10-17/08983679-7d9b-48e3-822c-9d5ba0b7d7ff.jpg",
            },
            {
              type: "劳保/安防",
              sku: 10497433,
              skuName:
                "苏识 1m*1m*5mm 绝缘橡胶垫 爱柯部落 耐高压5000V-10000V 红色 计价单位:张",
              skuPrice: "187",
              skuId: "690965",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-06-17/3e352780-4b18-4e68-a0d9-ab127730def8.jpg",
            },
          ],
        },
        {
          type: "搬运存储",
          code: "09015",
          childList: [
            {
              type: "搬运存储",
              sku: 10370203,
              skuName:
                "安赛瑞 26202 轻型仓储货架 冷轧钢 白色 80*30*180mm 5层 60kg/层 白色 计价单位:个",
              skuPrice: "285",
              skuId: "523062",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-03-17/ae6d5a00-c6e4-4cd3-9e1e-c683f51d50ed.jpg",
            },
            {
              type: "搬运存储",
              sku: 10316715,
              skuName:
                "臻远 zycz-09 中型仓储货架 蓝色 1500*600*2000mm 计价单位:组",
              skuPrice: "890",
              skuId: "460174",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-02-03/c5a61892-498d-4499-b64c-81b3737ad3c5.jpg",
            },
            {
              type: "搬运存储",
              sku: 10390526,
              skuName: "老A LA114102 固定轮双面物料整理架 固定轮 计价单位:件",
              skuPrice: "1767",
              skuId: "557040",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-04-09/0acf9691-b0e6-4123-b974-0ce8cb0357ec.jpg",
            },
            {
              type: "搬运存储",
              sku: 10390538,
              skuName: "老A LA114827 红色七层抽屉式工具柜 喷塑 计价单位:件",
              skuPrice: "1710",
              skuId: "557064",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-04-09/1feff84b-c811-4cff-bafa-5a66a9af6964.jpg",
            },
            {
              type: "搬运存储",
              sku: 10183571,
              skuName:
                "世达 Sata 95109 8抽屉柜型工具车1035*457*897mm 计价单位:台",
              skuPrice: "5928",
              skuId: "301604",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-11-05/4f16810e-df3b-41bc-af7a-318e8bf29937.jpg",
            },
            {
              type: "搬运存储",
              sku: 10367248,
              skuName:
                "安赛瑞 26072 塑钢打包带盘车 105*31*60cm 黑色 计价单位:辆",
              skuPrice: "497",
              skuId: "526195",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-03-17/2e9de80f-44d9-44ad-92a9-e1d609cc44b6.jpg",
            },
            {
              type: "搬运存储",
              sku: 10364035,
              skuName:
                "安赛瑞 26239 三层工具车 冷轧钢 77*35.5*70cm 铁皮厚0.8mm 承重200kg 蓝色 带挂板 计价单位:辆",
              skuPrice: "439",
              skuId: "526799",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-03-17/7438e5e5-084b-4ac7-bada-650ca39c544d.jpg",
            },
            {
              type: "搬运存储",
              sku: 10074957,
              skuName:
                "史丹利 Stanley 93-711-23 4抽屉多功能工具车 砂漆表面 抗刮痕 防锈 678*459*1045mm 计价单位:辆",
              skuPrice: "3621",
              skuId: "29148",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2019-08-21/fe5ae687-700b-4cf4-b53e-4c454a14d90f.jpg",
            },
            {
              type: "搬运存储",
              sku: 10371070,
              skuName:
                "安赛瑞 23632 折叠物流台车 有门 展开尺寸110*80*170cm 折叠尺寸170*80*20cm 计价单位:辆",
              skuPrice: "1819",
              skuId: "521931",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-03-17/bec6c371-4462-4de1-b304-60adfb24865a.jpg",
            },
            {
              type: "搬运存储",
              sku: 10552442,
              skuName: "杭叉 XC-3.0 XC系列3.0吨叉车 计价单位:台",
              skuPrice: "199740",
              skuId: "760665",
              skuUrl:
                "http://lxerp.66123123.com/image/sku/2020-07-20/2a679092-f205-40bd-9897-2086bc8f8aa1.jpg",
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
.ActivityPageTwo {
  font-size: 16px;
  min-height: 100%;
  background: #e4e4e4;
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
  .banner_img {
    width: 375px;
    height: 10px;
    background: #acadb1;
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
            background-image: url("../../assets/img/industrial2.jpg");
            background-size: 130px;
            margin: 0 auto;
            color: #000;
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
          width: 170px;
          height: 240px;
          // display: flex;
          background-image: url("../../assets/img/industrial1.jpg");
          background-size: 170px 240px;
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
            margin: 20px 0 0 25px;
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