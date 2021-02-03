<template>
  <div class="noticelistcontain">
      <inputTop :type="2" :value="value" :placeholder="'搜索公告'"></inputTop>
    <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
    <div class="notice_list" v-show="noticelist.length!=0">
      <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
          error-text="请求失败，点击重新加载"
          :immediate-check="false"
        >
      <div v-for="(notice, index) in noticelist" :key="index" class="notice_item"  @click="godetail(notice, index)">
          <div class="img">
          <img src="@/assets/img/clock.png"/>
          </div>
          <div class="time">{{notice.createTime}}</div>
          <div class="clear"></div>
          <div class="title">{{notice.title}}</div>
          <!-- <div class="content">{{notice.content}}</div> -->
    </div>
    </van-list>
    </div>
      <div class="notice_list" v-show="noticelist.length==0">
        <img class="noimg" src="@/assets/img/noSome.png" alt="">
      </div>
      </van-pull-refresh>
  </div>
</template>
<script>
  import {
  getFunction,
  postFunction,
  putFunction,
  deleteFunction,
} from "@/utils/request";
import { Search,Sidebar,List,PullRefresh, SidebarItem,Button,Collapse,CollapseItem,Card,Tag,Icon,Toast  } from "vant";
import  {mapState} from 'vuex'
import inputTop from "@/components/topTitle";
export default {
  name: "NoticList",
  data() {
    return {
      loading:false,
      // listShow:false,
      finished: false,
      isLoading: false,
      pageSize:10,
      pageNum:1,
      value: this.$route.query&&this.$route.query.search_value?this.$route.query.search_value:"",
      url: {
        notice: `/api/shoppe-api-service/mobile/shoppe/notice/all-list`,
      },
      noticelist:[],
    };
  },
  computed:{
    },
  components: {
    [Card.name]: Card,
    [Tag.name]: Tag,
    [Icon.name]: Icon,
    [Toast.name]: Toast,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    inputTop,
  },
  created() {
    let _this=this
    postFunction(this.url.notice, { pageNum: 1, pageSize: _this.pageSize,title:_this.value }).then(
        (res) => {
          if (res.code == "000000") {
            this.noticelist =res.data.items;
            this.total =res.data.total;
            // this.listShow = true;
          }
        }
      );
  },
  activated() {
    let _this=this
    postFunction(this.url.notice, { pageNum: 1, pageSize: _this.pageSize,title:_this.value }).then(
        (res) => {
          if (res.code == "000000") {
            this.noticelist =res.data.items;
            this.total =res.data.total;
            this.listShow = true;
          }
        }
      );
  },
  methods: {
    search() {},
    onRefresh() {
      document.documentElement.scrollTop = 0;
      console.log(
        document.documentElement.scrollTop,
        "document.body.scrollTop"
      );
      this.loading = false;
      this.finished = false;
      console.log("刷新--加");
      this.pageNum = 1;
      let _this=this
    postFunction(this.url.notice, { pageNum: 1, pageSize: _this.pageSize,title:_this.value }).then(
        (res) => {
          if (res.code == "000000") {
            this.noticelist =res.data.items,
            this.total =res.data.total,
            this.isLoading = false;
          // this.listShow = true;
          this.loading = false;
          }
        }
      );
    },
    onLoad() {
      this.loading = true;
      console.log("onload,加载");
      if (this.pageNum < this.total / 10) {
        this.pageNum++;
        let _this=this
    postFunction(this.url.notice, { pageNum: _this.pageNum, pageSize: _this.pageSize,title:_this.value }).then(
        (res) => {
          if (res.code == "000000") {
            this.noticelist =this.noticelist.concat(res.data.items);
            if (res.data.items.pageNum >= res.data.total / 10) {
              this.finished = true;
            }
            this.loading = false;
          }
        }
      );
      } else {
        this.finished = true;
      }
    },
    godetail(mess,index) {
      //前往详情
      //接口
      console.log(mess,index,'index')
      this.$router.push({
        name: "NoticDetails",
        query:mess.id
      });
    },
    getFocus() {
      this.$router.push({
        name: "QueryNotice",
        query: {search_value:this.value},
      });
    },
  },
  beforeCreate() {
    this.$store.commit("changefoot", false);
  },
};
</script>

<style  scoped lang="less">
.noticelistcontain{
  font-size: 14px;
  .notice_list {
      .noimg {
        width: 175px;
        height: 175px;
        margin-left: 100px;
        margin-top: 60px;
      }
      // position: fixed;
      // margin-top: 40px;
      // padding-bottom: 10px;
      // height: 560px;
      height: 100%;
      }
  .notice_list{
    height:603px;
    overflow:scroll
  }
  .notice_item{
    width: 351px;
    height: 93px;
    background: #FFFFFF;
    box-shadow: 0px 2px 4px 4px rgba(240, 241, 240, 0.5);
    border-radius: 8px;
    margin-top: 12px;
    margin-left: 12px;
    .img{
      float: left;
      width: 15px;
      height: 15px;
      margin-left: 12px;
      margin-top: 12px;
      img{
        float: left;
        width: 15px;
        height: 15px;
      }
    }
    .time{
      float: left;
      width: auto;
      height: 13px;
      font-size: 13px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: bold;
      color: #979797;
      line-height: 13px;
      margin-top: 13px;
      margin-left: 8px;
    }
    .clear{
      clear: both;
    }
    .title{
    overflow: hidden;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    word-break:break-all;
    -webkit-box-orient: vertical;
    width: 327px;
    // height: 15px;
    font-size: 17px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bold;
    color: #333333;
    line-height: 21px;
    margin-top: 13px;
    margin-left: 12px;
    }
    .content{
    overflow: hidden;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    word-break:break-all;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    width: 327px;
    height: 63px;
    font-size: 15px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bold;
    color: #979797;
    line-height: 21px;
    margin-top: 8px;
    margin-left: 12px;
    margin-bottom: 12px;
    }
  }
  .van-pull-refresh {
    // display: flex;
    height: 100%;
  }
  .van-list {
    height: 100%;
  }
}
</style>