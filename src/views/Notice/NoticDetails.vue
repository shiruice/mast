<template>
  <div class="noticedetailscontain">
    <inputTop :type="3"></inputTop>
    <div class="title">{{content.title}}</div>
    <div class="time">{{content.updateTime}}</div>
    <div class="split"></div>
    <div class="duan" v-html = 'this.content.content'></div>
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
import inputTop from "@/components/topTitle";

export default {
  name: "NoticDetails",
  data() {
    return {
      showMoveDot: [],
      content:{},
      imgurl:(this.$auth.os.lxapp?process.env.VUE_APP_BASE_API:location.origin.indexOf("localhost")>-1?"https://shoppemobiletest2.66123123.com":location.origin),
      url: {
        addcar: `/api/shoppe-api-service/mobile/cart/`,
        num: `/api/shoppe-api-service/mobile/cart/sku-count`,
        notice:`/api/shoppe-api-service/shoppe/notice/`+this.$route.query+`/detail-user`
      },
    };
  },
  computed:{
    },
  components: {
    [Card.name]: Card,
    [Tag.name]: Tag,
    [Icon.name]: Icon,
    [Toast.name]: Toast,
    inputTop,
  },
  created() {
    console.log(this.$route.query,'this.$route.query')
    getFunction(this.url.notice).then((res) => {
        if (res.code == "000000") {
          let content=res.data
          let str=""
          str='src="'+this.imgurl
          content.content=content.content.replace('src="',str)
          this.content=content
          // console.log(str,content.content.replace('src="','src="'+imgurl),content,this.content,'this.contentthis.content')
        }
      });
  },
  methods: {
    search() {},
  },
  beforeCreate() {
    this.$store.commit("changefoot", false);
  },
};
</script>

<style  scoped lang="less">
.noticedetailscontain{
  font-size: 17px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: normal;
  color: #333333;
  overflow:scroll;
  .title{
    overflow: hidden;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break:break-all;
    width: 343px;
    // height: 15px;
    font-size: 19px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #333333;
    line-height: 22px;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 20px;
    height: auto;
  }
  .time{
    margin-top: 22px;
    margin-left: 15px;
    width: auto;
    height: 12px;
    font-size: 12px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #979797;
    line-height: 12px;
  }
  .split{
    width: 345px;
    height: 0.5px;
    background-color: #E4E4E7;
    margin-left: 15px;
    margin-top: 15px;
  }
  .duan {
    width: 375px;
    height: auto;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 12px;
    width: 340px;  
    font-size: 17px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
  }
}
</style>