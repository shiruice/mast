<template>
  <div class="confirmorder">
    <inputTop :type="3"></inputTop>
    <!-- <div class="confirmorder-title">
      <van-icon @click="goback()" name="arrow-left" />
      <span>确认订单</span>
    </div> -->
    <div class="clear"></div>
    <div class="address" v-show="address.recipientName" @click="goaddress()">
      <!-- <van-icon class="img" name="close"/> -->
      <img class="imgss" src="@/assets/img/add_img.png" alt="">
      <!-- <div class="img"></div> -->
      <div class="center">
      <div class="people">{{address.recipientName}}</div>
      <div class="number">{{address.recipientPhone}}</div>
      <!-- <van-tag type="danger" v-show="address.defaultRecipient==1">默认</van-tag> -->
      <img class="imgs" v-show="address.defaultRecipient==1" src="@/assets/img/mo.png" alt="">
      <div class="ads">{{address.address}}</div>
      </div>
      <van-icon class="goads" name="arrow" @click="goaddress()"/>
    </div>
    <div class="address" v-show="!address.recipientName" @click="goaddress()">
      <img class="imgss" src="@/assets/img/add_img.png" alt="">
      <div class="nochous">未选择地址，请前往地址页面进行选择</div>
    </div>
    <div class="clear"></div>
    <div class="list-contain">
    <div class="list" v-for="(good, index) in goods" :key="index">
      <img :src="imgurl+good.picture" alt="">
      <div class="name">{{good.skuName}}</div>
      <div class="contain">
      <div class="price"><span class="money">￥</span>{{good.currentPrice}}</div>
      <div class="clear"></div>
      <div class="num">×{{good.itemQty}}</div>
      </div>
    </div>
    </div>
    <div class="clear"></div>
    <div class="details">
      <div class="pay">
        <div class="payleft">支付方式:</div>
      <span  class="date">账期</span>
      </div>
      <div class="clear"></div>
      <div class="usercontain">
        <div class="userleft">用户组:</div>
        <div v-show="usergroup?false:true" class="users" @click="showPopup">
        <div>请选择用户组</div>
        <van-icon  name="arrow" />
      </div>
      <div v-show="usergroup?true:false" class="users" @click="showPopup">
        <div>{{usergroupname}}</div>
        <van-icon  name="arrow" />
      </div>
      </div>
      <div class="clear"></div>
      <div class="invoicecontain">
        <div class="invoiceleft">发票信息:</div>
        <div class="invoice" @click="goinvoice">
        <div class="invoiceselect" v-show="invoice?false:true">请填写发票信息</div>
        <div class="invoiceselect" v-show="invoice&&types=='普票'?true:false">普票(电子发票)</div>
        <div class="invoiceselect" v-show="invoice&&types=='专票'?true:false">{{types}}</div>
        <!-- <div class="invoiceselect" v-show="invoicedata.type==0?true:false">专票</div>
        <div class="invoiceselect" v-show="invoicedata.type==1?true:false">普票</div> -->
        <van-icon  name="arrow" />
      </div>
      </div>
      <div class="clear"></div>
      <div class="invoices" v-show="invoice?true:false">
        <div class="left">
        <div v-show="types=='普票'?true:false">开票类型:普票(电子发票)</div>
        <div v-show="types=='专票'?true:false">开票类型:{{types}}</div>
        <!-- <div v-show="invoicedata.type==1">开票类型:普票</div> -->
        <div>发票抬头:{{invoicedata.invoiceTitle}}</div>



        <div v-show="invoicedata.email?true:false">电子邮箱:{{invoicedata.email}}</div>


        <div v-show="invoicedata.bank?true:false">开户行:{{invoicedata.bank}}</div>
        <div v-show="invoicedata.phoneOnInvoice?true:false">电话:{{invoicedata.phoneOnInvoice}}</div>
        </div>
        <div class="right">
        <div v-show="invoicedata.socialCreditCode?true:false">统一社会信用代码:{{invoicedata.socialCreditCode}}</div>
        <div v-show="invoicedata.accountNo?true:false">账号:{{invoicedata.accountNo}}</div>
        <div v-show="invoicedata.addressOnInvoice?true:false">地址:{{invoicedata.addressOnInvoice}}</div>
        </div>
        <div class="clear"></div>
      </div>
      <div class="clear"></div>
      <div class="textarealeft">备注信息:</div>
      <textarea name="textArea" v-model="value" placeholder="请输入备注"></textarea>
      <div class="clear"></div>
    </div>
    <div class="footer">
      <van-button  type="primary" @click="confirmorder()" size="small">提交订单</van-button>
      <div class="num"><span class="money">￥</span>{{amount}}</div>
      <div class="all">合计:</div>
    </div>
    <div class="clear"></div>
    <van-popup v-model="show" closeable position="bottom" :style="{ height: '300px' }" >
      <div class="title">用户组</div>
      <ul class="usergroup">
        <li @click="usergroupchange(usergroup,index)"  v-for="(usergroup, index) in usergroups" :key="index">
          <van-button  type="primary" size="small" :class="usergroupindex==index+1? 'active' : ''">{{usergroup.userGroupName}}</van-button>
        </li>
      </ul>
      <van-button  type="primary" @click="usergroupchangeconfirm()" size="small">确定</van-button>
    </van-popup>
  </div>
</template>

<script>
	import { Search,Sidebar, SidebarItem,Button,Collapse,CollapseItem,Card,Tag,Icon,Checkbox, CheckboxGroup,Stepper,Field,Popup,Toast } from "vant";
  import {
  getFunction,
  postFunction,
  putFunction,
  deleteFunction,
} from "@/utils/request";
import inputTop from "@/components/topTitle";
import { returnFloat } from "@/utils/c_methods";
export default {
name:'ConfirmOrder',
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
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Stepper.name]: Stepper,
    [Field.name]: Field,
    [Popup.name]: Popup,
    [Toast.name]: Toast,
    inputTop,
  },
  data() {
    return {
      value: "",
      show: false,
      goods:[],
      usergroups:[],
      usergroup:null,
      usergroupname:"",
      usergroupindex:"",
      invoice:false,
      imgurl:(this.$auth.os.lxapp?process.env.VUE_APP_BASE_API:location.origin.indexOf("localhost")>-1?"https://shoppemobiletest3.66123123.com":location.origin)+'/image',
      invoicedata:{},
      types:null,
      address:{},
      customerUserGroupId:null,
      amount:0,
      userId:0,
      url: {
        validation: `/api/shoppe-api-service/moblie/order-management/validation`,
        submit: `/api/shoppe-api-service/moblie/order-management/submit`,
        usergroup: `/api/shoppe-api-service/user/management/${JSON.parse(localStorage.getItem("UserInfo")).userInfo.userId}/user-group-list`,
         num: `/api/shoppe-api-service/mobile/cart/sku-count`,
      },
    };
  },
  activated() {
    this.init();
},
  created() {
    console.log(1111,8888,this.$route.query.type)
    this.init();
  },
  watch: {
      value: {
      handler (val) {
        localStorage.setItem("remarks", val);
      },
      // 这里是关键，代表递归监听 demo 的变化
      deep: true
    },
    // goods: {
    //   handler (val) {
    //     val.map(item=>{
    //       item.currentPrice=returnFloat(item.currentPrice)
    //     })
    //   },
    //   // 这里是关键，代表递归监听 demo 的变化
    //   deep: true
    // }
},
  methods: {
    init(){
      this.$store.commit("changefoot", false);
      console.log(1111,8888,this.$route.query)
      console.log(JSON.parse(localStorage.getItem("UserInfo")).id,999,this.$route.query)
      // console.log(this.$route.query.invoice)
      // this.invoicedata=this.$route.query.invoicedata?this.$route.query.invoicedata:{}
      let usergroupStore = localStorage.getItem("usergroup");
      if (usergroupStore) {
        let usergroupObj = JSON.parse(usergroupStore);
      this.usergroupindex=usergroupObj.usergroupindex
      this.usergroup=usergroupObj.usergroup
      this.usergroupname=usergroupObj.usergroupname
      this.customerUserGroupId=usergroupObj.customerUserGroupId
      }else{
      this.usergroups=[]
      this.usergroup=null
      this.usergroupname=""
      this.usergroupindex=""
      this.customerUserGroupId=null
      }
      let remarks = localStorage.getItem("remarks");
      if (remarks) {
        this.value=remarks
      }else{
        this.value=""
      }
      if (this.$route.query.invoicedata) {
            this.invoice=true
            this.invoicedata=this.$route.query.invoicedata
            this.types=this.$route.query.invoicedata.type==1?"普票":"专票"
            localStorage.setItem("invoicedata", JSON.stringify(this.$route.query.invoicedata));
             console.log(this.invoice,'this.invoice')
      }
      if (this.$route.query.address) {
        this.address=this.$route.query.address
        localStorage.setItem("address", JSON.stringify(this.$route.query.address));
      }
      if (this.$route.query.itemList) {
        localStorage.removeItem("remarks");
        localStorage.removeItem("usergroup");
        localStorage.removeItem("invoicedata");
        console.log(this.$route.query,'this.$route.query')
        this.validations({amount:this.$route.query.amount,itemList:this.$route.query.itemList})
      }else{
            this.goods=JSON.parse(localStorage.getItem("goods"))
            this.address=JSON.parse(localStorage.getItem("address"))
            console.log(this.address,'this.address')
            this.invoicedata=JSON.parse(localStorage.getItem("invoicedata"))
            this.amount=JSON.parse(localStorage.getItem("amount"))
            this.types=JSON.parse(localStorage.getItem("invoicedata")).type==1?"普票":"专票"
            this.invoicedata=JSON.parse(localStorage.getItem("invoicedata"))
            this.invoice=JSON.parse(localStorage.getItem("invoicedata")).invoiceTitle?true:false
      }
      // if (!window.location.origin) {
      //         window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
      //       }
      //     this.imgurl = (location.origin.indexOf("localhost") > -1 ? 'https://lxerptest.66123123.com' : location.origin) + '/image'
      //     console.log(this.imgurl)
          if (this.$route.query.type==0||this.$route.query.type==1||this.$route.query.type==2||this.$route.query.type==3||this.$route.query.type==4) {
            localStorage.setItem("goback", JSON.stringify({type:this.$route.query.type,detailstype:this.$route.query.detailstype}));
          }
    },
    validations(data){
      console.log('调用函数')
      postFunction(this.url.validation,data).then((res) => {
        if (res.code == "000000") {
          console.log(res.data,1997)
          this.goods=res.data.skus
          this.address=res.data.address
          this.invoicedata=res.data.invoice
          this.amount=res.data.amount
          this.invoice=res.data.invoice.invoiceTitle?true:false
          this.types=res.data.invoice.type==1?"普票":"专票"
          // //存入缓存中，地址跳转，发票跳转回来取用
          localStorage.setItem("goods", JSON.stringify(res.data.skus));
          localStorage.setItem("address",JSON.stringify(res.data.address));
          localStorage.setItem("amount", res.data.amount);
          localStorage.setItem("invoicedata",JSON.stringify(res.data.invoice));
          console.log(JSON.parse(localStorage.getItem("invoicedata")),'localStorage.getItem("invoicedata")')
        }
      });
    },
    submits(data){
      postFunction(this.url.submit,data).then((res) => {
        if (res.code == "000000") {
          console.log(res,9991)
          this.nums()
          this.$router.push({name:'SubmittedSuccessfully',query:{customerOrderId:res.data}})
        }
      });
    },
    nums() {
      getFunction(this.url.num).then((res) => {
        if (res.code == "000000") {
          this.$store.commit("cartNum", res.data);
        }
      });
    },
    usergrous(){
      postFunction(this.url.usergroup,{}).then((res) => {
        if (res.code == "000000") {
          console.log(res,9991)
          this.usergroups=res.data
          this.show = true;
        }
      });
    },
    goBack() {
      let goback= JSON.parse(localStorage.getItem("goback"))
      console.log(goback,'goback')
      if (goback && goback.type==4) {
        this.$router.push({
        name: "Cart"
      });
      }else if(goback && (goback.type==0||goback.type==1||goback.type==2||goback.type==3)){
        this.$router.push({
        name: "ProductDetails",
        query:{type:goback.type,detailstype:goback.detailstype,skuId:this.goods[0].skuId}
      });
      }else{
        this.$router.push({
        name: "Cart"
      });
      }
    },
    confirmorder(){
      console.log(119)
      let data={
        //发嫖
        accountNo:JSON.parse(localStorage.getItem("invoicedata")).accountNo,
        addressOnInvoice:JSON.parse(localStorage.getItem("invoicedata")).addressOnInvoice,
        bank:JSON.parse(localStorage.getItem("invoicedata")).bank,
        invoiceId:JSON.parse(localStorage.getItem("invoicedata")).id,
        invoiceTitle:JSON.parse(localStorage.getItem("invoicedata")).invoiceTitle,
        phoneOnInvoice:JSON.parse(localStorage.getItem("invoicedata")).phoneOnInvoice,
        socialCreditCode:JSON.parse(localStorage.getItem("invoicedata")).socialCreditCode,
        type:JSON.parse(localStorage.getItem("invoicedata")).type,

        email:JSON.parse(localStorage.getItem("invoicedata")).email?JSON.parse(localStorage.getItem("invoicedata")).email:null,

        //金额
        amount:localStorage.getItem("amount"),


        //商品
        itemList:JSON.parse(localStorage.getItem("goods")),

        //地址
        recipientAddressCityId:JSON.parse(localStorage.getItem("address")).cityId,
        recipientAddressCountyId:JSON.parse(localStorage.getItem("address")).countyId,
        recipientAddressLine:JSON.parse(localStorage.getItem("address")).addressLine,
        recipientAddressProvinceId:JSON.parse(localStorage.getItem("address")).provinceId,
        recipientName:JSON.parse(localStorage.getItem("address")).recipientName,
        recipientPhone:JSON.parse(localStorage.getItem("address")).recipientPhone,
        

        //其他
        applyInvoiceType:1,
        customerUserGroupId:this.customerUserGroupId,
        expectedDeliveryDate:null,
        orderMemo:this.value,
        payType:0,
      }
      console.log(data,'datatdatdta')
      if (!data.invoiceTitle) {
        Toast.fail('请填写发票相关信息');
      }else if (!data.recipientAddressCityId||!data.recipientAddressCountyId||!data.recipientAddressLine||!data.recipientAddressProvinceId||!data.recipientName||!data.recipientPhone) {
        Toast.fail('请选择地址相关信息');
      }else{
        console.log(data,'提交订单')
        this.submits(data)
      }
      // else if(!data.customerUserGroupId){
      //   Toast.fail('请选择用户组相关信息');
      // }
    },
    goaddress(){
      console.log('去往地址')
      this.$router.push({
          name: "MyAddress",
          query: { addressindex: 1},
        });
    },
    showPopup() {
      console.log(999)
      this.usergrous()
    },
    goinvoice(){
      console.log('go')
      this.$router.push({name:'Invoice'})
    },
    //未存入缓存，每次进入重新选择
    usergroupchange(value,index){
      console.log(value)
      this.usergroupindex=index+1;
      this.usergroup=value
      this.usergroupname=value.userGroupName
      this.customerUserGroupId=value.userGroupId
      localStorage.setItem("usergroup",
        JSON.stringify({
          usergroupindex:index+1,
          usergroup:value,
          usergroupname:value.userGroupName,
          customerUserGroupId:value.userGroupId,
        }));
      //写入缓存
      // this.isShow=false;
    },
    usergroupchangeconfirm(){
      this.show=false;
    },
    // goconfirmorder(value) {
    //   this.$router.push({path:'/confirmorder',query:{searchvalue:value}})
    // },
  },
  beforeCreate() {
    this.$store.commit("changefoot", false);
  },
  // beforeDestroy() {
  //   this.$store.commit("changefoot", true);
  // },
}
</script>

<style  scoped lang="less">
.confirmorder{
   font-size: 14px;
  width: 100%;
  ::-webkit-scrollbar {
            width: 0px;
        }
  .clear{
    clear: both;
  }
  font-size: 15px;
  padding-bottom: 50px;
  .confirmorder-title{
    font-size:17px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:24px;
    left:0;
    top:0;
    width: 100%;
    height: 24px;
    position: fixed;
    background-color:#fff;
    // padding-top: 5px;
    // padding-bottom: 5px;
    text-align: center;
    .van-icon{
      float: left;
      // top: 2px;
      font-size: 20px;
      line-height: 24px;
    }
    // span{
    //   margin-left: 145px;
    // }
  }
  .address{
    .nochous{
      float: left;
      margin-left: 15px;
      color: #E4E4E7;
      margin-top: 25px;
      color:rgba(151,151,151,1)
    }
    width:345px;
    height:74px;
    // background:rgba(255,255,255,1);
    box-shadow:0px 2px 4px 4px rgba(240,241,240,0.5);
    border-radius:16px;
    // top: 40px;
    // top: 65px;
    margin-left: 15px;
    margin-top: 16px;
    background-color:#fff;

    // // border:1px solid green;

    // position: fixed;
    .imgss{
      float: left;
      // width: 24px;
      height: 24px;
      // border:1px solid red;
      margin-left: 10px;
      margin-top: 20px;
    }
    .center{
      width: 265px;
      float: left;
      margin-left: 12px;
    }
      .people{
        float: left;
        height:18px;
        font-size:18px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(51,51,51,1);
        line-height:18px;
        margin-top: 10px;
      }
      .number{
        float: left;
        height:18px;
        font-size:12px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:400;
        color:rgba(142,142,147,1);
        line-height:18px;
        margin-left: 12px;
        // border:1px solid red;
        margin-top: 10px;
      }
      .imgs{
        white-space: nowrap;
        float: left;
        width:24px;
        height:13px;
        // background:rgba(240,73,25,1);
        border-radius:2px;
        // border:1px solid red;
        margin-top: 12px;
        margin-left: 14px;
        // color:rgba(255,255,255,1) !important;
      }
      .ads{
        float: left;
        width:265px;
        height:auto;
        font-size:12px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(51,51,51,1);
        line-height:13px;
        // border:1px solid red;
        margin-top: 10px;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .van-icon{
        float: left;
        width: 30px;
        margin-left: 8px;
        width:11px;
        height:11px;
        margin-top: 28px;
        color: #8E8E93;
        // border:1px solid red;
      }
  }
  .list-contain{
    // overflow-y: scroll;
    width:345px;
    height: auto;
    margin-left: 15px;
    margin-top: 8px;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 4px 4px rgba(240,241,240,0.5);
    border-radius:16px;
    // height:160px;
    // position: fixed;
    // left:15px;
    // top: 147px;
  .list{
    // border:1px solid red;
    width:345px;
    height:96px;
    .name{
      float: left;
      width:160px;
      height:auto;
      font-size:13px;
      font-family:PingFang-SC-Medium,PingFang-SC;
      font-weight:500;
      color:rgba(51,51,51,1);
      line-height:19px;
      margin-top: 12px;
      margin-left: 13px;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .price{
      float: right;
      width:71px;
      height:15px;
      font-size:15px;
      margin-top: 12px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(252,106,3,1);
      line-height:15px;
      margin-right: 0px;
      text-align: right;
    }
    .money{
      font-size: 9px;
    }
    .contain{
      float: left;
      // border:1px solid red;
      margin-left: 3px;
    }
    .num{
      float: right;
      width: auto;
      max-width: 58px;
      // width:13px;
      height:10px;
      font-size:9px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(136,136,136,1);
      line-height:10px;
      margin-top: 8px;
      // margin-right: 3px;
      text-align: right;
    }
    img{
      float: left;
      width: 70px;
      height: 61px;
      margin-top: 17px;
      margin-left: 16px;
      border: 1px solid #f8f8f8;
      border-radius: 4px;
      // border:1px solid red;
    }
  }
}
  .details{
    // position: fixed;
    // top: 322px;
    margin-left: 15px;
    margin-top: 8px;
    width: 345px;
    height: auto;
    border-radius:16px;
    background-color:#fff;
    // border:1px solid red;
    .textarealeft{
      float:left;
        width:66px;
        height:13px;
        font-size:13px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(151,151,151,1);
        line-height:13px;
        margin-left: 12px;
        margin-top: 12px;
    }
    textarea{
      float: right;
      background:rgba(239,239,239,1);
      border-radius:2px;
      margin-top: 12px;
      height:100px;
      width:250px;
      max-height:100px;
      max-width:250px;
      margin-right: 11px;
      margin-bottom: 15px;
      font-size: 13px;
      line-height: 30px;
    }
    textarea::-webkit-input-placeholder {
      /* WebKit browsers */
      font-size:12px;
      line-height: 30px;
      text-indent: 12px;

    }
    .pay{
      .payleft{
        float:left;
        width:66px;
        height:13px;
        font-size:13px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(151,151,151,1);
        line-height:13px;
        margin-left: 12px;
        margin-top: 12px;
      }
      .date{
      float:right;
      margin-top: 12px;
      margin-right: 10px;
      font-size:13px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(27,191,151,1);
      // color:rgba(27,191,151,1);
      line-height:13px;
      width:27px;
      height:13px;
      // border:1px solid red;
    }
    }
    .usercontain{
      .userleft{
        float:left;
        width:66px;
        height:13px;
        font-size:13px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(151,151,151,1);
        line-height:13px;
        margin-top: 18px;
        margin-left: 12px;
      }
      .users{
        float:right;
      margin-top: 12px;
      margin-right: 8px;
      height: 25px;
      line-height: 25px;
      // border:1px solid red;
      // width: 100px;
      width: auto;
      div{
        white-space: nowrap;
        float: left;
        font-size:13px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(51,51,51,1);
        width: 85px;
        width: auto;
        text-align: right;
      }
      .van-icon{
        float: left;
        line-height: 25px;
        width:5px;
        height:10px;
        margin-top: 1px;
        margin-right: 10px;
      }
    }
    }
    .invoicecontain{
      .invoiceleft{
        float:left;
        width:66px;
        height:13px;
        font-size:13px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(151,151,151,1);
        line-height:13px;
        margin-top: 18px;
        margin-left: 12px;
      }
      .invoice{
      margin-top: 5px;
      margin-right: 8px;
      line-height: 25px;
      width: 200px;
      float:right;
      // border:1px solid red;
      margin-top: 12px;
      .invoiceselect{
        float: left;
        width: 185px;
        text-align: right;
        white-space: nowrap;
        font-size:13px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(51,51,51,1);
      }
      .van-icon{
        line-height: 25px;
      }
    }
    }
    .invoices{
      margin-top: 5px;
      line-height: 25px;
      width: 320px;
      border:1px dashed #000;
      margin-left: 11px;
      font-size:13px;
      font-family:PingFang-SC-Medium,PingFang-SC;
      font-weight:500;
      color:rgba(151,151,151,1);
      margin-top: 18px;
      margin-left: 12px;
      .left{
        float: left;
        margin-left: 5px;
        div{
          height: 25px;
          width: 155px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .right{
        margin-top: 25px;
        float: left;
        width: 155px;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-right: 5px;
        div{
          height: 25px;
          width: 155px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          // border:1px solid red;
        }
      }
    }
  }
  // .details{
  //   position: fixed;
  //   top: 322px;
  //   left: 15px;
  //   width: 345px;
  //   border:1px solid red;
  //   textarea{
  //     background:rgba(239,239,239,1);
  //     border-radius:2px;
  //     margin-top: 5px;
  //     max-height:100px;
  //     max-width:345px;
  //   }
  //   .van-tag{
  //     margin-top: 5px;
  //   }
  //   .users{
  //     margin-top: 5px;
  //     height: 25px;
  //     line-height: 25px;
  //     div{
  //       float: left;
  //     }
  //     .van-icon{
  //       line-height: 25px;
  //       // padding-top:4px;
  //     }
  //   }
  //   .invoice{
  //     // border:1px solid red;
  //     margin-top: 5px;
  //     // height: 25px;
  //     line-height: 25px;
  //     width: 365px;
  //     .invoiceselect{
  //       float: left;
  //     }
  //     .van-icon{
  //       line-height: 25px;
  //       // padding-top:4px;
  //     }
  //     .left{
  //       float: left;
  //       width: 50%;
  //       overflow: hidden;
  //     }
  //     .right{
  //       margin-top: 25px;
  //       float: left;
  //       width: 50%;
  //       overflow: hidden;
  //     }
  //   }
  // }
  .footer{
    position:fixed;
    background-color:#fff;
    width: 100%;
    // background-color:red;
    left:0;
    bottom:0;
    // border-top:1px solid red;
    height: 50px;
    // div{
    //   float: right;
    //   line-height: 40px;
    //   // margin-top: 12px;
    // }
    .all{
      height:15px;
      width: auto;
      font-size:15px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      line-height:15px;
      margin-top: 20px;
      float: right;
    }
    .num{
      height:15px;
      font-size:15px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:#FC7210;
      line-height:15px;
      margin-right: 8px;
      margin-top: 20px;
      width: auto;
      float: right;
    }
    .money{
      font-size: 9px;
    }
    .van-button{
      float: right;
      margin: 8px 0;
      margin-right: 12px;
      width:108px;
      height:36px;
background: linear-gradient(180deg, #3AE1C8 0%, #1BBF97 100%);
      border-radius:20px;
      font-size:16px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(255,255,255,1);
      border: none;
      text-align: center;
    }
  }
  .van-popup{
    .title{
      margin-top: 12px;
      margin-left: 17px;
      font-size:15px;
      font-family:PingFang-SC-Medium,PingFang-SC;
      font-weight:500;
      color:rgba(51,51,51,1);
    }
    .usergroup{
      height: 200px;
      overflow-y: scroll;
      li{
        list-style: none;
        float: left;
        margin-left: 24px;
        margin-top: 16px;
        text-align: center;
      }
      .van-button{
        margin-left: 0px;
        margin-top: 0px;
        // width:62px;
        width:auto;
        height:28px;
        background:rgba(151,151,151,0.1);
        border-radius:14px;
        border:1px solid rgba(255,255,255,1);
        font-size:13px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(51,51,51,1);
        line-height: 28px;
        text-align: center;
        overflow: hidden;
        box-shadow:none
      }
      .active{
    background:rgba(168,253,183,0.2);
    border-radius:14px;
    border:1px solid rgba(27,191,151,1);
    font-size:13px;
    font-family:PingFangSC-Medium,PingFang SC;
    font-weight:500;
    color:rgba(27,191,151,1);
  }
    }
    .van-button{
      width:302px;
      height:37px;
      background:rgba(27,191,151,1);
      box-shadow:0px 4px 6px 0px rgba(5,216,165,0.4);
      border-radius:22px;
      margin-left: 36px;
      margin-top: 5px;
      font-size:18px;
      font-family:SourceHanSansCN-Regular,SourceHanSansCN;
      font-weight:400;
      color:rgba(255,255,255,1);
    }
  }
}
</style>