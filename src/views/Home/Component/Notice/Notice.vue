<template>
  <div class="noticecontain">
  <div class="imgcontain">
  <img src="@/assets/img/notice.png"/>
  </div>
  <van-swipe 
  style="height: 13.5px;margin-top:8px"
  :autoplay="3500"
  vertical>
    <div v-for="(mess, index) in message" :key="index">
          <van-swipe-item @click="godetail(mess, index)">{{mess.title}}</van-swipe-item>
    </div>
  </van-swipe>
  <div class="total" @click="golist()">更多</div>
  </div>
</template>
<script>
import {
  Swipe,
  SwipeItem,
} from "vant";
  import {
  getFunction,
  postFunction,
  putFunction,
  deleteFunction,
} from "@/utils/request";
import { Search,Sidebar, SidebarItem,Button,Collapse,CollapseItem,Card,Tag,Icon,Toast  } from "vant";

export default {
  name: "Notice",
  props:["message"],
  data() {
    return {
      showMoveDot: [],
      url: {
        addcar: `/api/shoppe-api-service/mobile/cart/`,
        num: `/api/shoppe-api-service/mobile/cart/sku-count`,
      },
    };
  },
  computed:{
    },
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
  },
  created() {
  },
  methods: {
    godetail(mess,index) {
      ///接口
      //前往详情
      console.log(mess,index,'index')
      this.$router.push({
        name: "NoticDetails",
        query:mess.id
      });
    },
    golist() {
      //前往列表
      console.log("mess")
      this.$router.push({
        name: "NoticList"
      });
    },
  },
};
</script>
<style>
.van-swipe__indicator{
  display: none !important;
}
</style>
<style  scoped lang="less">
.noticecontain{
  width: 351px;
  margin-left:12px;
  margin-right:12px;
  background-color: #fff;
  border-radius: 10px;
  .imgcontain{
    float: left;
    margin-left: 7.5px;
    width: 14.5px;
    height: 13px;
    margin-top: -1.5px;
    img{
    width: 14.5px;
    height: 13px;
    margin:0 0;
    padding:0 0;
    }
  }
  .van-swipe{
    text-align: left;
    float: left;
    width: 280px;
    overflow: hidden;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
    height: 28px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: normal;
    color: #333;
    line-height: 13.5px;
    margin-left: 7.5px;
    margin-top: 2px;
    // .van-swipe-item{
    //   height: 1.5px !important;
    // }
  }
  .total{
    float: right;
    height: 28px;
    width: auto;
    margin-right: 8px;
    font-size: 12px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    // font-weight: bold;
    color: #333;
    line-height: 28px;
  }
}
</style>