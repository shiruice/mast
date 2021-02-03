<template>
  <div class="itemcontain">
        <!-- <van-card
          :price="message.projectPrice"
          desc="描述信息"
          :title="message.name"
          :thumb="message.mainPictureUrl"
          @click-thumb="details(message.skuId)"
        >
          <template #footer>
            <van-icon name="shopping-cart-o"  @click="addcart(1)"/>
          </template>
        </van-card> -->
          <div @click="details(message.skuId)" class="img">
          <img  :src="imgurl+message.mainPictureUrl" alt="">
          </div>
          <div @click="details(message.skuId)" class="name">{{message.name}}</div>
          <div @click="details(message.skuId)" class="price"><span class="money">￥</span>{{message.projectPrice}}</div>
          <div @click="details(message.skuId)" class="lineprice" v-if="message.underlinedPrice"><span class="money" >￥</span>{{message.underlinedPrice}}</div>
          <!-- <van-icon name="shopping-cart-o"  @click="addcart(1)"/> -->
          <img class="cart" src="@/assets/img/g_plus.png" alt="" @click="addcart(1)">
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
  </div>
</template>
<script>
  import {
  getFunction,
  postFunction,
  putFunction,
  deleteFunction,
} from "@/utils/request";
import { Search,Sidebar, SidebarItem,Button,Collapse,CollapseItem,Card,Tag,Icon,Toast  } from "vant";
import  {mapState} from 'vuex'

export default {
  name: "GoodsItem",
  props:["message"],
  data() {
    return {
      showMoveDot: [], //控制下落的小圆点显示隐藏
        elLeft: 0, //当前点击购物车按钮在网页中的绝对top值
        elTop: 0, //当前点击购物车按钮在网页中的绝对left值
      value: "",
      imgurl:(this.$auth.os.lxapp?process.env.VUE_APP_BASE_API:location.origin.indexOf("localhost")>-1?"https://shoppemobiletest3.66123123.com":location.origin)+'/image',
      url: {
        addcar: `/api/shoppe-api-service/mobile/cart/`,
        num: `/api/shoppe-api-service/mobile/cart/sku-count`,
      },
    };
  },
  computed:{
      ...mapState(['cartnum'])
    },
  components: {
    [Card.name]: Card,
    [Tag.name]: Tag,
    [Icon.name]: Icon,
    [Toast.name]: Toast,
  },
  created() {
    // if (!window.location.origin) {
    //         window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
    //       }
    //     this.imgurl = (location.origin.indexOf("localhost") > -1 ? 'https://lxerptest.66123123.com' : location.origin) + '/image'
    //     console.log(this.imgurl)
    // console.log(this.)
  },
  methods: {
    search() {},
    beforeEnter(el) {
      console.log(1111)
                // 设置transform值
                el.style.opacity = 0;
                el.style.transform = 'translate(0, 0)'
            },
            enter(el, done) {
              console.log(1111)
                el.offsetWidth;
                // 获取徽标在页面中的位置
                let badgePosition = document.getElementById('appCart').getBoundingClientRect();
                // console.log(this.elTop,badgePosition.left,badgePosition.top,badgePosition.width,'badgePosition.left')
                // 300 500 该页面购物车位置 badgePosition.left
                const xDist = badgePosition.left - this.elLeft + badgePosition.width/4;
                const yDist = badgePosition.top - this.elTop;
                el.style.transform = `translate(${xDist}px, ${yDist}px)`;
                el.style.transition = 'all 0.8s cubic-bezier(0.12,0.78,0.53,0.92)';
                this.showMoveDot = this.showMoveDot.map(item => false);
                done()
            },
            afterEnter(el) {
              console.log(1111)
                // 设置透明度
                el.style.opacity = 1;
            },
    details(value){
      console.log(value)
      this.$router.push({name:'ProductDetails',query:{skuId:value,type:99}})
    },
    addcart(value){
      console.log('cartnum+1',this.message.skuId)
      // this.showMoveDot = [...this.showMoveDot, true];
      //显示图片
      // this.addcartimg = "";
      this.elLeft = event.target.getBoundingClientRect().left;
      this.elTop = event.target.getBoundingClientRect().top;
      this.postcart(true)
    },
    postcart(unloading){
      postFunction(this.url.addcar,{qty:1,skuId:this.message.skuId},unloading).then((res) => {
        if (res.code == "000000") {
          console.log(res,9991)
          this.showMoveDot = [...this.showMoveDot, true];
          this.$emit('event1', "成功")
          this.$store.commit('cartNum',res.data.length);
          // this.num()
        }
      })
      // .catch((function(error){
      //   console.log(error)
      //           },()=>{
      //               Toast.fail('数据异常');
      //           }));
    },
    //购物车数量
    num(){
      getFunction(this.url.num).then((res) => {
        if (res.code == "000000") {
          console.log(res.data,9991)
          this.$store.commit('cartNum',res.data);
        }
      });
    },
  },
};
</script>

<style  scoped lang="less">
.itemcontain{
  font-size: 15px;
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
            background-color:red;
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
  .clear{
    clear: both;
  }
  .img{
    width: 80px;
    height: 80px;
    // border:1px solid red;
    float: left;
    margin-left: 11px;
    margin-top: 12px;
    margin-bottom: 16px;
    img{
      width: 80px;
      height: 80px;
      border: 1px solid #f8f8f8;
      border-radius: 4px;
    }
  }
  .name{
    float: left;
    width:170px;
    height:auto;
    font-size:13px;
    font-family:PingFang-SC-Medium,PingFang-SC;
    font-weight:500;
    color:rgba(51,51,51,1);
    line-height:16px;
    overflow: hidden;
    margin-left: 8px;
    margin-top: 12px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .price{
    float: left;
    width:170px;
    // width:57px;
    height:15px;
    font-size:15px;
    font-family:PingFangSC-Medium,PingFang SC;
    font-weight:500;
    color:rgba(252,106,3,1);
    line-height:15px;
    margin-left: 8px;
    margin-top: 15px;
    .money{
      font-size: 9px;
    }
  }
  .lineprice{
    float: left;
    width:57px;
    height:15px;
    font-size:12px;
    font-family:PingFangSC-Medium,PingFang SC;
    font-weight:500;
    color:rgba(252,106,3,1);
    line-height:15px;
    margin-left: 8px;
    margin-top: 3px;
    text-decoration: line-through;
    color: #bfbfbf;
    .money{
      font-size: 9px;
    }
  }
  .cart{
    float: right;
    margin-top: -15px;
    margin-right: 20px;
    height: 15px;
    width: 15px;
  }
}
</style>