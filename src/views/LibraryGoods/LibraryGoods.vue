<template>
  <div class="goods-contains-home">
     <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
    <inputTop :type="9" :placeholder="'请输入名称、品牌、型号、编码'"></inputTop>
    <!-- <div class="search-boxs">
      <div class="input-search-icons">
        <div  class="van-search-inputs">
          <input v-model="value" placeholder="请输入商品名称、编号、型号" type="text">
        </div>
        <img src="@/assets/img/searchicon.png" class="icon-imgs" />
      </div>
      <div class="search-button" @click="search">搜索</div>
    </div> -->
    <!-- </van-pull-refresh> -->
    <div class="contain">
      <div class="FirstLevelNavigation">
        <div class="FirstLevelNavigationLeft">
          <van-button  @click="firstLevelNavigationall()" :class="FirstLevelNavigationindex==null? 'active' : ''" type="primary" size="small">全部</van-button>
        </div>
      <div class="FirstLevelNavigationRight">
        <van-button @click="firstLevelNavigationchange(FirstLevelNavigation,index)" :class="FirstLevelNavigationindex==index? 'active' : ''" v-for="(FirstLevelNavigation, index) in FirstLevelNavigations" :key="index" type="primary" size="small">{{FirstLevelNavigation.name}}</van-button>
      </div>
      </div>




      <div class="SecondaryNavigation">
        <ul>
          <li @click="SecondaryNavigationchange(SecondaryNavigation,index)" :class="SecondaryNavigationindex==index? 'active' : ''" v-for="(SecondaryNavigation, index) in SecondaryNavigations" :key="index">
            <span>{{SecondaryNavigation.name}}</span>
          </li>
          <!-- <div v-for="(SecondaryNavigation, index) in SecondaryNavigations" :key="index">
            <li @click="SecondaryNavigationchange(SecondaryNavigation,index)" :class="SecondaryNavigationindex==index? 'active' : ''">{{SecondaryNavigation.name}}</li>
          </div> -->
        </ul>
      </div>
      <div class="SecondaryNavigation-right"></div>
      <!-- <div class="SecondaryNavigation">
        <van-sidebar v-model="activeKey">
          <van-sidebar-item title="全部" @click="SecondaryNavigationall()" :class="SecondaryNavigationindex==null? 'van-sidebar-item--select' : 'van-sidebar-item--unselect'"/>
          <van-sidebar-item @click="SecondaryNavigationchange(SecondaryNavigation,index)" :class="SecondaryNavigationindex==index? 'van-sidebar-item--select' : 'van-sidebar-item--unselect'" v-for="(SecondaryNavigation, index) in SecondaryNavigations" :key="index" :title="SecondaryNavigation.name" />
        </van-sidebar>
      </div> -->
      <div class="ThreeLevelNavigation">
        <span @click="threeLevelNavigationall(null,null)" :class="ThreeLevelNavigationindex==null? 'active' : ''">全部</span>
        <span v-show="ThreeLevelNavigations.length>=1" @click="threeLevelNavigationall(2,0)" :class="ThreeLevelNavigationindex==0? 'active' : ''">{{ThreeLevelNav0}}</span>
        <!-- <span v-show="ThreeLevelNavigations.length>=2" @click="threeLevelNavigationall(3,1)" :class="ThreeLevelNavigationindex==1? 'active' : ''">{{ThreeLevelNav1}}</span> -->
        <!-- <span v-show="ThreeLevelNavigations.length>=3" @click="threeLevelNavigationall(4,2)" :class="ThreeLevelNavigationindex==2? 'active' : ''">{{ThreeLevelNav2}}</span> -->
        <div class="ico_contain">
          <van-icon @touchstart="dispaly" name="arrow-down" />
          <div class="clear"></div>
        </div>
      </div>
      <div v-show="isShow" class="goods-brand">
        <ul>
          <div v-for="(ThreeLevelNavigation, index) in ThreeLevelNavigations" :key="index">
          <li v-show="ThreeLevelNavigation.namelength<=3" @click="brandschange(ThreeLevelNavigation,index)"  :class="ThreeLevelNavigationindex==index? 'active2' : 'lilength'">
            {{ThreeLevelNavigation.name}}
          </li>
          <li v-show="ThreeLevelNavigation.namelength>3" @click="brandschange(ThreeLevelNavigation,index)"  :class="ThreeLevelNavigationindex==index? 'active2' : 'lilength'">
            {{ThreeLevelNavigation.name}}
          </li>
          </div>
        </ul>
        <div class="clear"></div>
        <!-- <div class="button-contain">
        <van-button type="primary" size="small">重置</van-button>
        <van-button type="primary" size="small">确定</van-button>
        </div> -->
      </div>
      <div class="goodsList" v-show="goods.length!=0">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
          error-text="请求失败，点击重新加载"
          :immediate-check="false"
          
        >
        <div v-for="(good, index) in goods" :key="index">
          <GoodsItem @gofather="childchange" class="goodsListss" :message="good"></GoodsItem>
        </div>
        </van-list>
      </div>
      <div class="goodsList" v-show="goods.length==0" v-if="listShow">
        <img src="@/assets/img/noSome.png" alt="">
      </div>
      <div @click="isShow=false" :class="!isShow? 'maskLayer' : 'maskLayer_show'"></div>
    </div>
    <div class="bottom-tap"></div>
  </div>
</template>

<script>
import { List,Search,Sidebar, SidebarItem,Button,Collapse,CollapseItem,Card,Tag,Icon,PullRefresh  } from "vant";
import GoodsItem from './Component/GoodsItem/GoodsItem';
import inputTop from "@/components/topTitle";
import {
  getFunction,
  postFunction,
  putFunction,
  deleteFunction,
} from "@/utils/request";
import  {mapState} from 'vuex'
import { returnFloat } from "@/utils/c_methods";

export default {
  name: "LibraryGoods",
  data() {
    return {
      listShow:false,
      loading: false,
      finished:false,
      total:0,
      value: "",
      targetName: "queryLibrarygoods",
      activeKey: 0,
      activeNames: '0',
      isShow:false,
      FirstLevelNavigationindex:null,
      SecondaryNavigationindex:0,
      ThreeLevelNavigationindex:null,
      pageNum:1,
      imgurl:null,
      url: {
        list: `/api/shoppe-api-service/shoppe/sku/list-search`,
      },
      branddata:[],
      FirstLevelNavigations:[],
      SecondaryNavigations:[],
      ThreeLevelNavigations:[],
      goods:[],
      url: {
        navigation: `/api/shoppe-api-service/mobile/user/detail`,
        firstLevel: `/api/shoppe-api-service/mobile/sku/findNav-firstLevel`,
        secondLevel: `/api/shoppe-api-service/mobile/sku/findNav-secondLevel`,
        thirdLevel: `/api/shoppe-api-service/mobile/sku/findNav-thirdLevel`,
        goodslist: `/api/shoppe-api-service/mobile/sku/skuList`,
      },
      // navigationType:"CATEGORY",
      navigationType:JSON.parse(localStorage.getItem("UserInfo")).shoppeNavigationType,
      FirstLevelNavigationid:null,
      SecondaryNavigationid:null,
      ThreeLevelNavigationid:null,
      ThreeLevelNav0:null,
      ThreeLevelNav1:null,
      ThreeLevelNav2:null,
      code:this.$route.query.code,
      floor:this.$route.query.level,
    };
  },
  computed:{
      ...mapState(['cartnum'])
    },
  components: {
    [Search.name]: Search,
    [Button.name]: Button,
    [Sidebar.name]: Sidebar,
    [SidebarItem.name]: SidebarItem,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Card.name]: Card,
    [Tag.name]: Tag,
    [Icon.name]: Icon,
    [GoodsItem.name]: GoodsItem,
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
    inputTop,
    GoodsItem,
  },
  created() {
    localStorage.removeItem("goodssearchvalue");
    console.log(999)
    // this.firstLevel()
    // if (!window.location.origin) {
    //         window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
    //       }
    //     this.imgurl = (location.origin.indexOf("localhost") > -1 ? 'https://lxerptest.66123123.com' : location.origin) + '/image'
    //     console.log(this.imgurl)
    if (this.$route.query.code&&this.$route.query.level==2) {
      this.ThreeLevelNavigationid=null
          this.ThreeLevelNavigationindex=null
          this.isShow=false;
          this.FirstLevelNavigationindex=null;
          this.FirstLevelNavigationid=null
      console.log('属主数据')
      Promise.all([
        postFunction(this.url.firstLevel,{parentCode:null,shoppeNavigationType:this.navigationType}),
        postFunction(this.url.secondLevel,{parentCode:null,shoppeNavigationType:this.navigationType}),
        postFunction(this.url.thirdLevel,{parentCode:this.$route.query.code,shoppeNavigationType:this.navigationType})
        ]).then(res=>{
        this.FirstLevelNavigations=res[0].data

let SecondaryNavigations=res[1].data
          SecondaryNavigations.unshift({code:null,name:"全部"})
          this.SecondaryNavigations=SecondaryNavigations

let ThreeLevelNavigations=res[2].data
          ThreeLevelNavigations.map(item=>{
            item.namelength=item.name.length
          })
          this.ThreeLevelNavigations=ThreeLevelNavigations
          console.log(ThreeLevelNavigations,'0000')
          if (this.ThreeLevelNavigations.length>=1) {
            this.ThreeLevelNav0=this.ThreeLevelNavigations[0].name
          }else{
            this.ThreeLevelNav0=null
          }
          if (this.ThreeLevelNavigations.length>=2) {
            this.ThreeLevelNav1=this.ThreeLevelNavigations[1].name
          }else{
            this.ThreeLevelNav1=null
          }
          if (this.ThreeLevelNavigations.length>=3) {
            this.ThreeLevelNav2=this.ThreeLevelNavigations[2].name
          }else{
            this.ThreeLevelNav2=null
          }
      SecondaryNavigations.map((item,index)=>{
        if (item.code==this.$route.query.code) {
          this.SecondaryNavigationindex=index;
          this.thirdLevel(this.$route.query.code)
          this.SecondaryNavigationid=this.$route.query.code
        }
      })
      })
    }else if (this.$route.query.code&&this.$route.query.level==3) {
      console.log('属主数据属主数据属主数据')
      this.isShow=false;
          this.SecondaryNavigationid=null
          this.SecondaryNavigationindex=0;
          this.FirstLevelNavigationindex=null;
          this.FirstLevelNavigationid=null
      Promise.all([
        postFunction(this.url.firstLevel,{parentCode:null,shoppeNavigationType:this.navigationType}),
        postFunction(this.url.secondLevel,{parentCode:null,shoppeNavigationType:this.navigationType}),
        postFunction(this.url.thirdLevel,{parentCode:null,shoppeNavigationType:this.navigationType})
        ]).then(res=>{
          this.FirstLevelNavigations=res[0].data

let SecondaryNavigations=res[1].data
          SecondaryNavigations.unshift({code:null,name:"全部"})
          this.SecondaryNavigations=SecondaryNavigations

let ThreeLevelNavigations=res[2].data
          ThreeLevelNavigations.map(item=>{
            item.namelength=item.name.length
          })
          this.ThreeLevelNavigations=ThreeLevelNavigations
          console.log(ThreeLevelNavigations,'0000')
          if (this.ThreeLevelNavigations.length>=1) {
            this.ThreeLevelNav0=this.ThreeLevelNavigations[0].name
          }else{
            this.ThreeLevelNav0=null
          }
          if (this.ThreeLevelNavigations.length>=2) {
            this.ThreeLevelNav1=this.ThreeLevelNavigations[1].name
          }else{
            this.ThreeLevelNav1=null
          }
          if (this.ThreeLevelNavigations.length>=3) {
            this.ThreeLevelNav2=this.ThreeLevelNavigations[2].name
          }else{
            this.ThreeLevelNav2=null
          }
      ThreeLevelNavigations.map((item,index)=>{
        if (item.code==this.$route.query.code) {
          console.log(index,'index')
          this.ThreeLevelNavigationindex=index;

          this.ThreeLevelNavigationid=this.$route.query.code
          this.goodslist()
        }
      })
      })
    }else{
      this.init();
    }
  },
  activated(){
    localStorage.removeItem("goodssearchvalue");
    console.log(111,this.$route.query.code,this.$route.query.level,this.cartnum)
    if (this.$route.query.code&&this.$route.query.level==2) {
      this.ThreeLevelNavigationid=null
          this.ThreeLevelNavigationindex=null
          this.isShow=false;
          this.FirstLevelNavigationindex=null;
          this.FirstLevelNavigationid=null
      console.log('属主数据')
      Promise.all([
        postFunction(this.url.firstLevel,{parentCode:null,shoppeNavigationType:this.navigationType}),
        postFunction(this.url.secondLevel,{parentCode:null,shoppeNavigationType:this.navigationType}),
        postFunction(this.url.thirdLevel,{parentCode:this.$route.query.code,shoppeNavigationType:this.navigationType})
        ]).then(res=>{
        this.FirstLevelNavigations=res[0].data

let SecondaryNavigations=res[1].data
          SecondaryNavigations.unshift({code:null,name:"全部"})
          this.SecondaryNavigations=SecondaryNavigations

let ThreeLevelNavigations=res[2].data
          ThreeLevelNavigations.map(item=>{
            item.namelength=item.name.length
          })
          this.ThreeLevelNavigations=ThreeLevelNavigations
          console.log(ThreeLevelNavigations,'0000')
          if (this.ThreeLevelNavigations.length>=1) {
            this.ThreeLevelNav0=this.ThreeLevelNavigations[0].name
          }else{
            this.ThreeLevelNav0=null
          }
          if (this.ThreeLevelNavigations.length>=2) {
            this.ThreeLevelNav1=this.ThreeLevelNavigations[1].name
          }else{
            this.ThreeLevelNav1=null
          }
          if (this.ThreeLevelNavigations.length>=3) {
            this.ThreeLevelNav2=this.ThreeLevelNavigations[2].name
          }else{
            this.ThreeLevelNav2=null
          }
      SecondaryNavigations.map((item,index)=>{
        if (item.code==this.$route.query.code) {
          this.SecondaryNavigationindex=index;
          this.thirdLevel(this.$route.query.code)
          this.SecondaryNavigationid=this.$route.query.code
          let c=document.getElementsByClassName("SecondaryNavigation")[0].children[0].children[0].offsetTop
          let a=document.getElementsByClassName("SecondaryNavigation")[0].children[0].children[index].offsetTop
          let b=document.getElementsByClassName("SecondaryNavigation")[0]
          console.log(999,a-c,b,a,c)
          this.$nextTick(() => {
        b.scrollTop=a-c
      });
        }
      })
      })
    }else if (this.$route.query.code&&this.$route.query.level==3) {
      console.log('属主数据属主数据属主数据')
      this.isShow=false;
          this.SecondaryNavigationid=null
          this.SecondaryNavigationindex=0;
          this.FirstLevelNavigationindex=null;
          this.FirstLevelNavigationid=null
      Promise.all([
        postFunction(this.url.firstLevel,{parentCode:null,shoppeNavigationType:this.navigationType}),
        postFunction(this.url.secondLevel,{parentCode:null,shoppeNavigationType:this.navigationType}),
        postFunction(this.url.thirdLevel,{parentCode:null,shoppeNavigationType:this.navigationType})
        ]).then(res=>{
          this.FirstLevelNavigations=res[0].data

let SecondaryNavigations=res[1].data
          SecondaryNavigations.unshift({code:null,name:"全部"})
          this.SecondaryNavigations=SecondaryNavigations

let ThreeLevelNavigations=res[2].data
          ThreeLevelNavigations.map(item=>{
            item.namelength=item.name.length
          })
          this.ThreeLevelNavigations=ThreeLevelNavigations
          console.log(ThreeLevelNavigations,'0000')
          if (this.ThreeLevelNavigations.length>=1) {
            this.ThreeLevelNav0=this.ThreeLevelNavigations[0].name
          }else{
            this.ThreeLevelNav0=null
          }
          if (this.ThreeLevelNavigations.length>=2) {
            this.ThreeLevelNav1=this.ThreeLevelNavigations[1].name
          }else{
            this.ThreeLevelNav1=null
          }
          if (this.ThreeLevelNavigations.length>=3) {
            this.ThreeLevelNav2=this.ThreeLevelNavigations[2].name
          }else{
            this.ThreeLevelNav2=null
          }
      ThreeLevelNavigations.map((item,index)=>{
        if (item.code==this.$route.query.code) {
          console.log(index,'index')
          this.ThreeLevelNavigationindex=index;

          this.ThreeLevelNavigationid=this.$route.query.code
          this.goodslist()
        }
      })
      })
    }
    this.$auth.os.lxapp && this.initplus();
    this.$store.commit("changefoot", true);
    // this.navigation()
  },
  methods: {
    init(){
      this.firstLevel();
      this.secondLevel(null, 1);
      this.thirdLevel(null, 1);
      this.goodslist();
    },
    childchange(data) {
      console.log(123456789)
            console.log(data,'子组件')
            if (data==1) {
              this.goodslist()
            }
        },
    onRefresh() {
      setTimeout(() => {
        Toast('刷新成功');
        this.isLoading = false;
        // this.count++;
      }, 1000);
    },
    initplus() {
      if (window.plus) {
        this.value = "exist";
        this.plusReady();
      } else {
        this.value = "Listener";
        document.addEventListener("plusready", this.plusReady, false);
      }
    },
    plusReady() {
      this.value = "plusReady";
      plus.navigator.setStatusBarBackground("#F8F8F8");
      plus.navigator.setStatusBarStyle("dark");
    },
    search() {
      this.$router.push({name:'ProductList',query:{searchvalue:this.value}})
    },
    dispaly() {
      let isShow=this.isShow
      this.isShow=!isShow
    },
    goBack() {
        this.$router.push({
          name: "Home",
        });
    },
    getFocus() {
      this.$router.push({
        name: "QueryLibrarygoods"
      });
    },
    firstLevelNavigationchange(value,index){
      console.log(value)
      this.FirstLevelNavigationindex=index;
      this.secondLevel(value.code)
      this.FirstLevelNavigationid=value.code
      this.SecondaryNavigationid=null
      this.ThreeLevelNavigationid=null
      this.SecondaryNavigationindex=0
      this.ThreeLevelNavigationindex=null
    },
    firstLevelNavigationall(){
      this.FirstLevelNavigationindex=null;
      this.secondLevel(null)
      this.FirstLevelNavigationid=null
      this.SecondaryNavigationid=null
      this.ThreeLevelNavigationid=null
      this.SecondaryNavigationindex=0
      this.ThreeLevelNavigationindex=null
    },
    SecondaryNavigationchange(value,index){
      console.log(value,index)
      this.SecondaryNavigationindex=index;
      this.thirdLevel(value.code)
      this.SecondaryNavigationid=value.code
      this.ThreeLevelNavigationid=null
      this.ThreeLevelNavigationindex=null
    },
    // SecondaryNavigationall(){
    //   this.SecondaryNavigationindex=null;
    //   this.thirdLevel(null)
    //   this.SecondaryNavigationid=null
    //   this.ThreeLevelNavigationid=null
    //   this.ThreeLevelNavigationindex=null
    // },
    brandschange(value,index){
      console.log(value)
      this.ThreeLevelNavigationindex=index;
      this.isShow=false;
      this.ThreeLevelNavigationid=value.code
      this.goodslist()
    },
    threeLevelNavigationall(val,index){
      console.log(val,999)
      this.ThreeLevelNavigationindex=index;
      this.ThreeLevelNavigationid=val?this.ThreeLevelNavigations[index].code:null
      this.goodslist()
    },
    //导航接口
    // navigation(){
    //   getFunction(this.url.navigation).then((res) => {
    //     if (res.code == "000000") {
    //       console.log(res,888999)
    //       this.navigationType=res.data.shoppeNavigationType
    //       this.firstLevel()
    //     }
    //   });
    // },
    //一级接口
    firstLevel(){
      postFunction(this.url.firstLevel,{parentCode:null,shoppeNavigationType:this.navigationType}).then((res) => {
        if (res.code == "000000") {
          console.log(res,9991)
          this.FirstLevelNavigations=res.data
          // this.secondLevel(null)
        }
      });
    },
    //二级接口
    secondLevel(val, isInit){
      postFunction(this.url.secondLevel,{parentCode:val,shoppeNavigationType:this.navigationType}).then((res) => {
        if (res.code == "000000") {
          console.log(res,99912)
          let SecondaryNavigations=res.data
          SecondaryNavigations.unshift({code:null,name:"全部"})
          this.SecondaryNavigations=SecondaryNavigations

          if(!isInit){
            this.thirdLevel(null)
          }
        }
      });
    },
    //三级接口
    thirdLevel(val, isInit){
      postFunction(this.url.thirdLevel,{parentCode:val?val:this.FirstLevelNavigationid,shoppeNavigationType:this.navigationType}).then((res) => {
        if (res.code == "000000") {
          console.log(res,999123)
          let ThreeLevelNavigations=res.data
          ThreeLevelNavigations.map(item=>{
            item.namelength=item.name.length
          })
          this.ThreeLevelNavigations=ThreeLevelNavigations
          console.log(ThreeLevelNavigations,'0000')
          if (this.ThreeLevelNavigations.length>=1) {
            this.ThreeLevelNav0=this.ThreeLevelNavigations[0].name
          }else{
            this.ThreeLevelNav0=null
          }
          if (this.ThreeLevelNavigations.length>=2) {
            this.ThreeLevelNav1=this.ThreeLevelNavigations[1].name
          }else{
            this.ThreeLevelNav1=null
          }
          if (this.ThreeLevelNavigations.length>=3) {
            this.ThreeLevelNav2=this.ThreeLevelNavigations[2].name
          }else{
            this.ThreeLevelNav2=null
          }

          if(!isInit){
            this.goodslist()
          }
          
        }
      });
    },
    //商品列表
    goodslist(){
       //恢复滚动条顶部位置，只加载第一页（不置顶，会加载之前"pagenum"页）
      document.documentElement.scrollTop=0
      console.log(document.documentElement.scrollTop,'document.body.scrollTop')
      this.finished=false;
      this.pageNum = 1;
      let data={
            shoppeNavFirstCode:this.FirstLevelNavigationid,
            shoppeNavSecondCode:this.SecondaryNavigationid,
            shoppeNavThirdCode:this.ThreeLevelNavigationid,
            navType:this.navigationType,
            pageSize:10,
            pageNum: this.pageNum,
          }
      postFunction(this.url.goodslist,data).then((res) => {
        if (res.code == "000000") {
          console.log(res,999123)
          let goods=res.data.items
          goods.map(item=>{
            item.projectPrice=returnFloat(item.projectPrice)
          })
          this.goods=goods
          this.total=res.data.total
          this.isLoading = false;
          this.listShow = true
          this.loading = false;
        }
      });
    },
    onLoad(){
      this.loading = true;
      console.log('onload,加载')
      setTimeout(()=>{
        if (this.pageNum < this.total / 10) {
          this.pageNum++;
          let data={
            shoppeNavFirstCode:this.FirstLevelNavigationid,
            shoppeNavSecondCode:this.SecondaryNavigationid,
            shoppeNavThirdCode:this.ThreeLevelNavigationid,
            navType:this.navigationType,
            pageSize:10,
            pageNum: this.pageNum,
          }
        postFunction(this.url.goodslist,data, true).then((res) => {
        if (res.code == "000000") {
          let goods=res.data.items
          goods.map(item=>{
            item.projectPrice=returnFloat(item.projectPrice)
          })
          this.goods=this.goods.concat(goods)
          this.pageNum=res.data.pageNum
          this.total=res.data.total
          if (res.data.pageNum >= res.data.total / 10) {
            this.finished = true;
          }
          this.loading = false;
        }
      });
        }else{
          this.finished = true;
        }
      },1000)
    },
  },
  beforeCreate() {
    this.$store.commit("changefoot", true);
  },
};
</script>

<style  scoped lang="less">
.goods-contains-home{
  position:absolute;
  bottom:0;
  top:0;
  // background-color:red;
  background:rgba(255,255,255,1);
  ul li {
    list-style: none;
  }
  li{
    width:83px;
    height:45px;
    color: #888888;
    border:1px solid #E4E4E7;
    font-size:14px;
    font-family:PingFang-SC-Medium,PingFang-SC;
    // font-weight:500;
    color:rgba(136,136,136,1);
  }
  .active{
    color: #333333;
    border-right:none;
  }
  .van-pull-refresh{
    height: auto;
  }
  ::-webkit-scrollbar {
            width: 0px;
        }
  height: auto;
  overflow-y: hidden;
  font-size: 14px;
  width: 100%;
  // .van-sidebar-item--select{
  //   border-color: #1BBF97;
  //   background-color:#fff;
  // }
  // .van-sidebar-item--unselect{
  //   border-color: #fff;
  //   background-color:#fff;
  // }
  // .van-sidebar-item--select::before {
  //   position: absolute;
  //   top: 50%;
  //   left: 0;
  //   border-color: #1BBF97 !important;
  //   background-color:#fff !important;
  //   -webkit-transform: translateY(-50%);
  //   transform: translateY(-50%);
  //   content: "";
  //   display: none;
  // }
  // .van-sidebar-item--select::after {
  //   display: none;
  // }
  // .van-sidebar-item{
  //   border-color: #fff;
  // }
.search-boxs{
  font-size: 15px;
  // position: fixed;
  width: 100%;
  height: 40px;
  // border:1px solid red;
  // .van-search-inputs{
  //   height:28px;
  //   background:rgba(239,239,239,1);
  //   border-radius:16px;
  // }
  .input-search-icons{
    .van-search-inputs{
        width: 304px;
        height: 32px;
        border: 1px solid #d7a269;
        background:rgba(239,239,239,1);
        border-radius: 16px;
        position: fixed;
        left: 15px;
        top: 4px;
    }
    input{
       height: 32px;
       background:rgba(239,239,239,1);
        border-radius: 16px;
        // border:1px solid red;
        margin-left: 25px;
        width: 278px;
    }
    img{
        width: 15px;
        height: 15px;
        position: fixed;
        left: 20px;
        top: 15px;
    }
  }
  .search-button{
    position: fixed;
    right: 10px;
    top: 10px;
  }
}
.bottom-tap{
  width: 100%;
  height: 1px;
  background-color:#f5f5f5;
  position:fixed;
  bottom:60px;
}
.contain{
  font-size: 15px;
  margin-top: -5px;
  .active{
    font-size:15px;
    font-family:PingFangSC-Medium,PingFang SC;
    font-weight:700;
    color:rgba(51,51,51,1);
    line-height:15px;
  }
  // border:1px solid red;
  .FirstLevelNavigation{
    background-color:#F3FFFC;
    // padding-top: 6px;
    // border:1px solid green;
    // width: 373px;
    // height: 50px;
    font-size: 15px;
    width: 375px;
    // padding-bottom: 10px;
    border-bottom:1px solid #F3FFFC;
    .FirstLevelNavigationLeft{
      width: 60px;
      float: left;
      .van-button{
        white-space: nowrap;
      margin-top: 21px;
      margin-left: 15px;
      margin-bottom: 16px;
      overflow: hidden;
      border:none;
      background:none;
      font-size:15px;
      font-family:PingFang-SC-Medium,PingFang-SC;
      font-weight:500;
      line-height:15px;
      width: auto;
      height: 15px;
      color: #979797;
      opacity:0.8;
    }
    .active{
      font-weight:700;
    font-size:15px;
    font-family:PingFangSC-Medium,PingFang SC;
    color: #1BBF97;
    opacity:1;
    // color:#333333;
    line-height:15px;
  }
    }
    .FirstLevelNavigationRight{
      width: 290px;
      margin-left: 75px;
      overflow-x: scroll;
    // overflow-y: hidden;
     white-space: nowrap;
      .van-button{
      padding: 0;
      border:none;
      background:none;
      margin-top: 21px;
      margin-left: 23px;
      margin-bottom: 16px;
      width: auto;
      height: 15px;
      overflow: hidden;
      font-size:15px;
      font-family:PingFang-SC-Medium,PingFang-SC;
      font-weight:500;
      // color:#888888;
      line-height:15px;
      color: #979797;
      opacity:0.8;
    }
    .van-button:nth-child(1){
      margin-left: 0px;
    }
    .active{
      font-weight:700;
    font-size:15px;
    font-family:PingFangSC-Medium,PingFang SC;
    color:rgba(51,51,51,1);
    line-height:15px;
    color: #1BBF97;
    opacity:1;
    // color:#333333;
  }
    }
  }
  .FirstLevelNavigationRight::-webkit-scrollbar {
        display: none;/*隐藏滚动条*/
    }
    .SecondaryNavigation-right{
      position:absolute;
      // height: 484px;
      width: 1px;
      background-color:#E4E4E7;
      float: left;
      z-index: 1;
      left: 86px;
      top:108px;
      bottom: 60px;
    }
    .SecondaryNavigation{
      position:absolute;

      // background-color:#f5f5f5;

      z-index: 1000;
      width: 87px;
      top:108px;
      bottom: 60px;
      height: 100%;
      height: auto;
      padding-bottom:0px;
    // height: 484px;
    overflow-y: scroll;
    // margin-top: -1px;
    float: left;
    line-height:14px;
    border-bottom:1px solid #E4E4E7;
    // border-bottom:1px solid red;
      ul li {
    list-style: none;
  }
    ul{
    width: 100%;
    // height: auto;
    margin-top: -1px;
  }
  li{
    width:80px;
    padding-left:3.5px;
    padding-right:3.5px;
    height: auto;
    min-height:45px;
    color: #888888;
    border: none;
    // border-right:1px solid #E4E4E7;
    // border-right:1px solid #E4E4E7;
    font-size:14px;
    font-family:PingFang-SC-Medium,PingFang-SC;
    font-weight:500;
    color:rgba(136,136,136,1);
    text-align: center;
    // line-height: 43px;
    z-index: 1000;
    span{
      display: inline-block;
      margin-top: 15px;
      margin-bottom: 15px;
      width: 100%;
      height: auto;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      line-height: 14px;
    }
  }
  .li-length{
    line-height: 25px;
  }
  .active{
    color: #1bbf97;
    // color: #333333;
    font-weight: 700;
    background-color:#fff;
    border-right:1px solid #fff;
    // border-left:3px solid #1bbf97;
    border-top:1px solid #E4E4E7;
    border-bottom:1px solid #E4E4E7;
  }
  .active::before{
    background-color:red;
  }
      // border:1px solid red;
      // height: auto;
  //     height: 490px;
  //     overflow-y: scroll;
  //     width: 88px;
  //     float: left;
  //     font-size:14px;
  //   font-family:PingFang-SC-Medium,PingFang-SC;
  //   font-weight:500;
  //   color:rgba(136,136,136,1);
  //   line-height:14px;
  //   border-right: 1px solid #E4E4E7;
  //     .van-sidebar{
  //       width: 88px;
  //       font-size: 15px;
  //       // border:1px solid yellow;
  //     }
  //     .van-sidebar-item{
  //        // border:1px solid red;
  //       // font-size: 15px;
  //       width: 88px;
  //       // height: 45px;
  //       height: auto;
  //       font-size:15px;
  //       overflow: hidden;
  //       font-family:PingFang-SC-Medium,PingFang-SC;
  //       font-weight:500;
  //       color:rgba(151,151,151,1);
  //       line-height:15px;
  //       // line-height: 30px;
  //     }
  //     .active{
  //   font-size:15px;
  //   font-family:PingFangSC-Medium,PingFang SC;
  //   font-weight:500;
  //   color:rgba(51,51,51,1);
  //   line-height:15px;
  // }
    }
    .ThreeLevelNavigation{
      // background-color:red;
      display: inline-block;

      width:285px;
      height:50px;
      margin-left: 87px;
      font-size: 13px;
      // width:112px;
      // border:1px solid red;
      span{
        float: left;
        display: inline-block;
        width: 105px;
        margin-left: 8px;
        text-align: center;
        line-height: 25px;
        margin-top: 12px;
        padding-left: 5px;
        padding-right: 5px;
        height:25px;
        border-radius:14px;
        background:rgba(151,151,151,0.1);
        border:1px solid rgba(255,255,255,1);
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        line-clamp: 1;
        -webkit-box-orient: vertical;
        color: #333333;
        // color: #888888;
        font-weight: 500;
        font-size: 13px;
      }
        .active{
      background:rgba(27, 191, 151, 0.15);
      border: 1px solid #FFFFFF;
      color: rgba(27,191,151,1);
      font-weight: 700;
    }
    .ico_contain{
      // background-color:red;
      width: 34px;
      height: 100%;
      float: right;
    }
      .van-icon{
        float: right;
        margin-top: 18px;
        margin-right: 10px;
        // margin-right: 10px;
      }
    }
    .goods-brand{
      position:absolute;
      background-color: #fff;
      z-index: 1000;
      margin-left: 87px;
      top: 154px;
      overflow-y: scroll;
      width:288px;
      height:auto;
      min-height:90px;
      max-height:210px;
      background:rgba(255,255,255,1);
      // .goods-brand-title{
      //   margin-top: 10px;
      // }
      // width: 300px;
      // border:1px solid #f5f5f5;
      li{
        float: left;
        font-size: 13px;
        display: inline-block;
      width: 120px;
      color: #333333;
        // color: #888888;
        // width: 46px;
        padding-left:5px;
        padding-right:5px;
        // width: auto;
        margin-left: 8px;
        text-align: center;
        line-height: 25px;
        margin-top: 12px;
        height:27px;
        border-radius:14px;
        background:rgba(151,151,151,0.1);
        border:1px solid rgba(255,255,255,1);
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .active1{
        width: 46px;
      background:rgba(27, 191, 151, 0.15);     
      border: 1px solid #FFFFFF;
      color: rgba(27,191,151,1);
    }
    .active2{
      height:25px;
      width: 105px;
      background:rgba(27, 191, 151, 0.15);
      border: 1px solid #FFFFFF;
      color: rgba(27,191,151,1);
      font-weight: 700;
    }
    .lilength{
      width: 105px;
       float: left;
        font-size: 13px;
        display: inline-block;
        padding-left:5px;
        padding-right:5px;
        // width: auto;
        margin-left: 8px;
        text-align: center;
        line-height: 25px;
        margin-top: 12px;
        height:25px;
        border-radius:14px;
        background:rgba(151,151,151,0.1);
        border:1px solid rgba(255,255,255,1);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        line-clamp: 1;
        -webkit-box-orient: vertical;
        font-weight: 500;
    }
      // .button-contain{
      //   .van-button{
      //     // border:1px solid #f5f5f5;
      //     width: 50px;
      //     margin-left: 50px;
      //     margin-top: 10px;
      //     margin-bottom: 10px;
      //   }
      // }
    }
    .van-collapse-item__wrapper{
      z-index: 99900;
    }
    .van-collapse-item{
      // border:1px solid red;
      color:red;
      float: left;
      margin-left: 75px;
      height: auto;
      width: 300px;
      position:absolute;
      z-index: 500;
      background-color:#fff;
      div{
        color:green;
        border:1px solid yellow;
        height: auto;
      }
      span{
        display: block;
        clear: both;
      }
      ul li{
        list-style: none;
      }
      li{
        float: left;
        margin-left: 20px
      }
    }
    .goodsList{
      position:absolute;
      top:150px;
      bottom: 60px;
      left: 87px;
      width:288px;
      // background-color: red;
      // height: auto;
      height: auto;
      overflow-y: scroll;
      // z-index: 200;
      // border:1px solid red;
      position:absolute;
      margin-top: 12px;
      .van-list{
        height: 100%;
      }
      img{
        width: 100px;
        height: 100px;
        margin-left: 107px;
        margin-top: 70px;
      }
      // margin-bottom: 60px;
      .goodsListss{
        // border:1px solid red;
      }
    }
    .maskLayer_show{
      // border:1px solid red;
      position: fixed;
      top:154px;
      bottom: 60px;
      left: 87px;
      right:0px;
      width:288px;
      background: rgba(0,0,0,0.4);
      z-index: 500;
    }
    .maskLayer{
      position: fixed;
      top:154px;
      bottom: 60px;
      left: 87px;
      width:288px;
      height: 100%;
      background: rgba(0,0,0,0.4);
      z-index: 500;
      display: none;
    }
    .van-collapse-item__content{
      background-color:red;
    }
}
}
</style>