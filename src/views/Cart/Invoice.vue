<!-- 支持输入的下拉框
<div style="position:relative;" class="selectgroup">
<span style="margin-left:100px;width:18px;overflow:hidden;">
<select style="width:118px;margin-left:-100px" v-model="input1" onchange="this.parentNode.nextSibling.value=this.value">
<option value="测试1">测试1</option>
<option value="测试2">测试2</option>
<option value="测试3">测试3</option>
</select></span><input v-model="input1" name="box" style="width:100px;position:absolute;left:0px;">
</div>
 -->





<template>
  <div class="invoicecontain">
    <inputTop :type="3"></inputTop>
 <!--  <div class="top">
      <div class="boty_top">填写发票</div>
   <van-icon @click="goback()" name="arrow-left" />
   </div> -->
    <ul>
      <li @click="electronicclick()" :class="electronicdispaly? 'surper' : ''">电子发票</li>
      <li @click="specialclick()" :class="specialdispaly? 'surper' : ''">专票</li>
      <li @click="generalclick()" :class="generaldispaly? 'surper' : ''">普票</li>
    </ul>
    <div class="clear"></div>
    <div class="specialTicket" v-show="specialdispaly" >
      <div class="line">
        <span class="line-span lines-span"><span style="color: red">*</span>抬头:</span>
        <!-- <input v-model="specialTicket.titles" type="text"> -->
        <div style="position:relative;" class="selectgroup">
<span>
<select @change="specialTicketblur1()" v-model="specialTicket.id" onchange="this.parentNode.nextSibling.value=this.value">
<option :value="special.id" v-for="(special, index) in specialTickets" :key="index">{{special.invoiceTitle}}</option>
</select></span><input @blur="specialTicketblur2()" placeholder="请输入公司抬头" v-model="specialTicket.titles" name="box">
</div>
      </div>
      <div class="clear"></div>
      <div class="splitline"></div>
      <div class="line"><span><span style="color: red">*</span>统一社会信用代码:</span><input :disabled="!specialTicketchange" placeholder="请输入统一社会信用代码" v-model="specialTicket.codes" type="text"></div>
      <div class="splitline"></div>
      <div class="line"><span><span style="color: red">*</span>地址:</span><input class="classs" :disabled="!specialTicketchange" placeholder="请输入地址" v-model="specialTicket.address" type="text"></div>
      <div class="splitline"></div>
      <div class="line"><span><span style="color: red">*</span>电话:</span><input :disabled="!specialTicketchange" placeholder="请输入电话" v-model="specialTicket.phone" type="text"></div>
      <div class="splitline"></div>
      <div class="line"><span><span style="color: red">*</span>开户行:</span><input :disabled="!specialTicketchange" placeholder="请输入开户行" v-model="specialTicket.band" type="text"></div>
      <div class="splitline"></div>
      <div class="line"><span><span style="color: red">*</span>账号:</span><input :disabled="!specialTicketchange" placeholder="请输入账号" v-model="specialTicket.num" type="text"></div>
    </div>
    <div class="generalTicket" v-show="generaldispaly">
      <div class="line">
        <span class="line-span"><span style="color: red">*</span>抬头:</span>
        <!-- <input v-model="specialTicket.titles" type="text"> -->
        <div style="position:relative;" class="selectgroup">
<span>
<select @change="generalTicketblur1()"  v-model="generalTicket.id" onchange="this.parentNode.nextSibling.value=this.value">
<option :value="general.id" v-for="(general, index) in generalTickets" :key="index">{{general.invoiceTitle}}</option>
</select></span><input @blur="generalTicketblur2()" v-model="generalTicket.titles" placeholder="请输入公司抬头" name="box" >
</div>
      </div>
      <div class="clear"></div>
      <div class="splitline"></div>
      <div class="line"><span>统一社会信用代码:</span><input :disabled="!generalTicketchange" placeholder="请输入统一社会信用代码" v-model="generalTicket.codes" type="text"></div>
    </div>
    <div class="electronic" v-show="electronicdispaly">
      <div class="line">
        <span class="line-span"><span style="color: red">*</span>抬头:</span>
        <!-- <input v-model="specialTicket.titles" type="text"> -->
        <div style="position:relative;" class="selectgroup">
<span >
<select @change="generalTicketblur1()"  v-model="electronic.id">
<option :value="general.id" v-for="(general, index) in generalTickets" :key="index">{{general.invoiceTitle}}</option>
</select></span><input @blur="generalTicketblur2()" v-model="electronic.titles" placeholder="请输入公司抬头" name="box" >
</div>
      </div>
      <div class="clear"></div>
      <div class="splitline"></div>
      <div class="line"><span>统一社会信用代码:</span><input :disabled="!electronicchange" placeholder="请输入统一社会信用代码" v-model="electronic.codes" type="text"></div>



    <div class="splitline"></div>
    <div class="line"><span>电子邮箱:</span><input placeholder="请输入电子邮箱" v-model="email" type="text"></div>
    <div class="clear"></div>




    </div>
    <div class="clear"></div>

    <div class="buttoncontain">
      <van-button class="button-left" @click="cacledata()" type="primary" size="small">取消</van-button>
      <van-button class="button-right" @click="submitdata()" type="primary" size="small" style="color:rgba(255,255,255,1);background-color:rgba(27,191,151,1);border:none">提交</van-button>
    </div>
  </div>
</template>

<script>
	import { Search,Sidebar, SidebarItem,Button,Collapse,CollapseItem,Card,Tag,Icon,Checkbox, CheckboxGroup,Stepper,Toast   } from "vant";
  import {
  getFunction,
  postFunction,
  putFunction,
  deleteFunction,
} from "@/utils/request";
import inputTop from "@/components/topTitle";
export default {
name:'Invoice',
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
    [Toast.name]: Toast,
    inputTop,
  },
  data() {
    return {
      value: 1,
      specialTicket:{},
      specialTicketchange:true,
      generalTicketchange:true,
      electronicchange:true,
      generalTicket:{},
      specialTickets:[],
      generalTickets:[],
      electronic:{},
      specialdispaly:false,
      generaldispaly:false,
      electronicdispaly:true,
      invoicedata:{},
      input1:"",
      email:"",
      url: {
        invoicelist: `/api/shoppe-api-service/moblie/invoice/management/invoice-titles-list`,
        listcreat: `/api/shoppe-api-service/moblie/invoice/management/`,
      },
    };
  },
  watch: {
    input1:{
      handler(val){
        console.log(val,999)
      }
    },
    //   goods: {
    //   handler (val) {
    //     console.log(val)
    //     let checked=true
    //      for (var i in val) {
    //         if (!val[i].checked) {
    //         checked=false
    //         break;
    //       }
    //     }
    //     this.checked=checked
    //   },
    //   // 这里是关键，代表递归监听 demo 的变化
    //   deep: true
    // }
},
created() {
  this.invoicelists()
  },
  methods: {
    // specialTicketblur(){
    //   let specialTickets=this.specialTickets
    //   let specialTicketchange=true
    //   specialTickets.map(item=>{
    //     if (item.invoiceTitle==this.specialTicket.titles) {
    //                   this.specialTicket={
    //                                       titles:item.invoiceTitle,
    //                                       codes:item.socialCreditCode,
    //                                       address:item.addressOnInvoice,
    //                                       band:item.bank,
    //                                       phone:item.phoneOnInvoice,
    //                                       num:item.accountNo,
    //                                       defaulted:item.defaulted,
    //                                       id:item.id,
    //                                     }
    //                                     specialTicketchange=false
    //     }
    //   })
    //   this.specialTicketchange=specialTicketchange
    // },
    specialTicketblur1(){
      let specialTickets=this.specialTickets
      let specialTicketchange=true
      specialTickets.map(item=>{
          if(item.id==this.specialTicket.id){
                      this.specialTicket={
                                          titles:item.invoiceTitle,
                                          codes:item.socialCreditCode,
                                          address:item.addressOnInvoice,
                                          band:item.bank,
                                          phone:item.phoneOnInvoice,
                                          num:item.accountNo,
                                          defaulted:item.defaulted,
                                          id:item.id,
                                        }
                                        specialTicketchange=false
        }
      })
      this.specialTicketchange=specialTicketchange
    },
    specialTicketblur2(){
      let specialTickets=this.specialTickets
      let specialTicketchange=true
        let specialTickettrue=false
        let indexkey=0
        for (let i = 0; i < specialTickets.length; i++) {
            let item=specialTickets[i]
        if(item.invoiceTitle==this.specialTicket.titles){
          console.log(11111,i)
          this.specialTicket={
                                          titles:item.invoiceTitle,
                                          codes:item.socialCreditCode,
                                          address:item.addressOnInvoice,
                                          band:item.bank,
                                          phone:item.phoneOnInvoice,
                                          num:item.accountNo,
                                          defaulted:item.defaulted,
                                          id:item.id,
                                        }
                                        specialTicketchange=false
                                        specialTickettrue=true
                                        indexkey=i
        }else if(item.invoiceTitle!=this.generalTicket.titles){
          console.log(2222,i)
          let specialTicket=this.specialTicket.titles
          this.specialTicket={
                                          titles:specialTicket,
                                        }
                                        // generalTicketchange=false
        }
}
if(specialTickettrue){
  let item=specialTickets[indexkey]
  this.specialTicket={
                                          titles:item.invoiceTitle,
                                          codes:item.socialCreditCode,
                                          address:item.addressOnInvoice,
                                          band:item.bank,
                                          phone:item.phoneOnInvoice,
                                          num:item.accountNo,
                                          defaulted:item.defaulted,
                                          id:item.id,
                                        }
}
      this.specialTicketchange=specialTicketchange
    },
    generalTicketblur1(){
      console.log(888,this.generalTicket,this.electronic)
      let generalTickets=this.generalTickets
      let generalTicketchange=true
      let electronicchange=true
      generalTickets.map(item=>{
        if(this.generaldispaly&&this.generalTicket.id&&item.id==this.generalTicket.id){
          console.log(1111)
          this.generalTicket={
                                          titles:item.invoiceTitle,
                                          codes:item.socialCreditCode,
                                          defaulted:item.defaulted,
                                          id:item.id,
                                        }
                                        generalTicketchange=false
        }
        if(this.electronicdispaly&&this.electronic.id&&item.id==this.electronic.id){
          console.log(1111)
          this.electronic={
                                          titles:item.invoiceTitle,
                                          codes:item.socialCreditCode,
                                          defaulted:item.defaulted,
                                          id:item.id,
                                        }
                                        electronicchange=false
        }
      })
      console.log(999,this.generalTicket,this.electronic)
      this.generalTicketchange=generalTicketchange
      this.electronicchange=electronicchange
    },
    generalTicketblur2(){
      console.log(888,this.generalTicket,this.electronic)
      let generalTickets=this.generalTickets
      let generalTicketchange=true
      let electronicchange=true
      // generalTickets.map(item=>{
        let generalTickettrue=false
        let electrTickettrue=false
        let indexkey=0
        for (let i = 0; i < generalTickets.length; i++) {
            let item=generalTickets[i]
        if(this.generaldispaly&&this.generalTicket.titles&&item.invoiceTitle==this.generalTicket.titles){
          console.log(11111,i)
          this.generalTicket={
                                          titles:item.invoiceTitle,
                                          codes:item.socialCreditCode,
                                          defaulted:item.defaulted,
                                          id:item.id,
                                        }
                                        generalTicketchange=false
                                        generalTickettrue=true
                                        indexkey=i
        }else if(this.generaldispaly&&this.generalTicket.titles&&item.invoiceTitle!=this.generalTicket.titles){
          console.log(2222,i)
          let generalTicket=this.generalTicket.titles
          this.generalTicket={
                                          titles:generalTicket,
                                        }
                                        // generalTicketchange=false
        }
        console.log(55555,i,item.invoiceTitle,this.electronic.titles,item.invoiceTitle==this.electronic.titles)
        if(this.electronicdispaly&&this.electronic.titles&&item.invoiceTitle==this.electronic.titles){
          console.log(11111,i)
          this.electronic={
                                          titles:item.invoiceTitle,
                                          codes:item.socialCreditCode,
                                          defaulted:item.defaulted,
                                          id:item.id,
                                        }
                                        electronicchange=false
                                        electrTickettrue=true
                                        indexkey=i
        }else if(this.electronicdispaly&&this.electronic.titles&&item.invoiceTitle!=this.electronic.titles){
          // console.log(55555,i,item.invoiceTitle,this.electronic.titles)
          let electronic=this.electronic.titles
          this.electronic={
                                          titles:electronic,
                                        }
                                        // electronicchange=false
        }
}
if(generalTickettrue){
  let item=generalTickets[indexkey]
  this.generalTicket={
                                          titles:item.invoiceTitle,
                                          codes:item.socialCreditCode,
                                          defaulted:item.defaulted,
                                          id:item.id,
                                        }
}else if(electrTickettrue){
  let item=generalTickets[indexkey]
  this.electronic={
                                          titles:item.invoiceTitle,
                                          codes:item.socialCreditCode,
                                          defaulted:item.defaulted,
                                          id:item.id,
                                        }
}
      console.log(999,this.generalTicket,this.electronic)
      this.generalTicketchange=generalTicketchange
      this.electronicchange=electronicchange
    },
    invoicelists(){
      getFunction(this.url.invoicelist).then((res) => {
        if (res.code == "000000") {
          console.log(res,9991)
          let arr=res.data
          let specialTickets=[]
          let generalTickets=[]
          arr.map(item=>{
            if (item.type==0) {
              specialTickets.push(item)
            }else if(item.type==1){
              generalTickets.push(item)
            }
          })
          this.specialTickets=specialTickets
          this.generalTickets=generalTickets
          console.log(specialTickets,generalTickets,'119')
        }
      });
    },
    invoicelistcreat(data){
      postFunction(this.url.listcreat,data).then((res) => {
        if (res.code == "000000") {
          this.invoicedata.id=res.data
          console.log(res,987654,'654')
          console.log(this.invoicedata,'555')
          this.$router.push({name:'ConfirmOrder',query:{invoicedata:this.invoicedata}})
        }
      });
    },
    goconfirmorder(value) {
      console.log(value,'goods')
      this.$router.push({name:'ConfirmOrder',query:{searchvalue:value}})
    },
    specialclick(){
      this.specialdispaly=true
      this.generaldispaly=false
      this.electronicdispaly=false
      this.specialTicket={}
      this.generalTicket={}
      this.electronic={}
    },
    generalclick(){
      this.specialdispaly=false
      this.generaldispaly=true
      this.electronicdispaly=false
      this.specialTicket={}
      this.generalTicket={}
      this.electronic={}
    },
    electronicclick(){
      this.specialdispaly=false
      this.generaldispaly=false
      this.electronicdispaly=true
      this.specialTicket={}
      this.generalTicket={}
      this.electronic={}
    },
    cacledata(){
      console.log('取消')
       this.$router.push({name:'ConfirmOrder',query:{invoice:null}})
    },
    goBack() {
      this.$router.push({
        name: "ConfirmOrder"
      });
    },
    submitdata(){
      console.log('抬头判断')
      console.log('提交')
      if (this.specialdispaly&&this.specialTicket.titles&&this.specialTicket.band&&this.specialTicket.phone&&this.specialTicket.codes&&this.specialTicket.num&&this.specialTicket.address) {
        //把专票类型插入，对倒确认订单页面
        let specialTicket=this.specialTicket
        specialTicket.type=0
        this.specialTicket=specialTicket
        console.log(this.specialTicketchange,'this.specialTicketchange')
        if (this.specialTicketchange) {
          this.invoicedata={
          invoiceTitle:specialTicket.titles,
          type:specialTicket.type,
          socialCreditCode:specialTicket.codes,
          addressOnInvoice:specialTicket.address,
          bank:specialTicket.band,
          defaulted:false,
          id:"",
          accountNo:specialTicket.num,
          applyInvoiceType:1,
          invoiceSource:1,
          phoneOnInvoice:specialTicket.phone,
        }
          this.invoicelistcreat({
            type:0,
            invoiceTitle:specialTicket.titles,
            socialCreditCode:specialTicket.codes,
            addressOnInvoice:specialTicket.address,
            bank:specialTicket.band,
            accountNo:specialTicket.num,
            phoneOnInvoice:specialTicket.phone,
          })
          //调取抬头创建接口
        }else{
          this.invoicedata={
          invoiceTitle:specialTicket.titles,
          type:specialTicket.type,
          socialCreditCode:specialTicket.codes,
          addressOnInvoice:specialTicket.address,
          bank:specialTicket.band,
          defaulted:specialTicket.defaulted,
          id:specialTicket.id,
          accountNo:specialTicket.num,
          applyInvoiceType:1,
          invoiceSource:1,
          phoneOnInvoice:specialTicket.phone,
        }
        console.log(this.invoicedata,'this.invoicedata')
          this.$router.push({name:'ConfirmOrder',query:{invoicedata:this.invoicedata}})
        }
      }else if(this.generaldispaly&&this.generalTicket.titles){
        let generalTicket=this.generalTicket
        generalTicket.type=1
        this.generalTicket=generalTicket
        this.invoicedata=generalTicket
        if (this.generalTicketchange) {
          console.log(generalTicket,'codes')
          this.invoicedata={
          invoiceTitle:generalTicket.titles,
          type:generalTicket.type,
          socialCreditCode:generalTicket.codes,
          defaulted:false,
          id:"",
          applyInvoiceType:1,
          invoiceSource:1,
        }
          this.invoicelistcreat({
            type:1,
            invoiceTitle:generalTicket.titles,
            socialCreditCode:generalTicket.codes?generalTicket.codes:"",
          })
          //调取抬头创建接口
        }else{
          this.invoicedata={
          invoiceTitle:generalTicket.titles,
          type:generalTicket.type,
          socialCreditCode:generalTicket.codes,
          defaulted:generalTicket.defaulted,
          id:generalTicket.id,
          applyInvoiceType:1,
          invoiceSource:1,
        }
        console.log(this.invoicedata,'this.invoicedata')
          this.$router.push({name:'ConfirmOrder',query:{invoicedata:this.invoicedata}})
        }
      }else if (this.electronicdispaly&&this.electronic.titles) {
        let electronic=this.electronic
        electronic.type=1
        this.electronic=electronic
        this.invoicedata=electronic


        let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$")
        if (this.email==""||reg.test(this.email)) {
          if (this.electronicchange) {
          this.invoicedata={
          invoiceTitle:electronic.titles,
          type:electronic.type,
          socialCreditCode:electronic.codes,
          defaulted:false,
          id:"",
          applyInvoiceType:1,
          invoiceSource:1,
          email:this.email==""?null:this.email
        }
          this.invoicelistcreat({
            type:1,
            invoiceTitle:electronic.titles,
            socialCreditCode:electronic.codes?electronic.codes:"",
          })
          //调取抬头创建接口
        }else{
          this.invoicedata={
          invoiceTitle:electronic.titles,
          type:electronic.type,
          socialCreditCode:electronic.codes,
          defaulted:electronic.defaulted,
          id:electronic.id,
          applyInvoiceType:1,
          invoiceSource:1,
          email:this.email==""?null:this.email
        }
          this.$router.push({name:'ConfirmOrder',query:{invoicedata:this.invoicedata}})
        }
      }else{
        Toast.fail('电子邮箱格式错误，请检查后重新输入');
      }
      }else{
        console.log('数据不完整')
        Toast.fail('数据不完整');
        // this.$router.push({path:'/confirmorder',query:{invoice:null}})
      }
    },
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
.invoicecontain{
  input::-webkit-input-placeholder { /* WebKit browsers 适配谷歌 */
    color: #979797;
}
input:-moz-placeholder { /* Mozilla Firefox 4 to 18 适配火狐 */
    color: #979797;
}
input::-moz-placeholder { /* Mozilla Firefox 19+ 适配火狐 */
    color: #979797;
}
input:-ms-input-placeholder { /* Internet Explorer 10+  适配ie*/
    color: #979797;
}
 font-size: 14px;
  width: 100%;
  .splitline{
    width:321px;
    height:0.5px;
    margin-left: 0px;
    background-color:#E4E4E7;
    margin-top: 16px;
  }
.top{
    .boty_top{
        // padding-top: 10px;
        text-align: center;
        // border:1px solid red;
        height: 30px;
        font-size:17px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:30px;
    }
    .van-icon{
      float: left;
      margin-top: -23px;
      margin-right: 10px;
      color: #979797;
    }
}
.clear{
  clear: both;
}
ul li{
  list-style: none;
}
ul{
  li{
    float: left;
    width:60px;
    height:15px;
    font-size:15px;
    font-family:PingFang-SC-Medium,PingFang-SC;
    font-weight:500;
    color:rgba(151,151,151,1);
    line-height:15px;
    margin-top: 16px;
    margin-left: 50px;
    text-align: center;
  }
  .surper{
    color:rgba(27,191,151,1);
  }
}
.specialTicket,.generalTicket,.electronic{
  background-color:#fff;
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 16px;
  // padding-top:0px;
  padding-bottom:16px;
  padding-left:12px;
  padding-right:12px;
  width: 321px;
  border-radius: 16px;
  .line{
    padding-top: 16px;
    // margin-left: 15px;
    span{
      height:13px;
      font-size:13px;
      font-family:PingFang-SC-Medium,PingFang-SC;
      font-weight:500;
      color:rgba(151,151,151,1);
      line-height:13px;
    }
    .line-span{
      float: left;
    }
  input{
    width: 190px;
    // border:1px solid rgba(151,151,151,1);
    padding-left: 10px;
    background-color:#fff;
  }
  select{
    background:none;
  }
  .selectgroup{
  width: 280px;
  // border:1px solid rgba(151,151,151,1);
  float: left;
  margin-top: -3px;
  margin-left: 5px;
  span{
    margin-left:100px;
    width:15px;
    overflow:hidden;
    // background-color:red;
    // border:1px solid red;
    select{
    width:280px;
    color: #979797;
    margin-left:-100px;
    // background-color:green;
    // border:1px solid green;
  }
  select::-ms-expand {
         display: none;
     }

  }
  input{
    border:none;
    margin-left: 0px;
    width:255px;
    position:absolute;
    left:0px;
    background-color:#fff;
    // border:1px solid yellow;
  }
}
  }
}
.buttoncontain{
  margin-top: 32px;
  .van-button{
  width:81px;
  height:29px;
  border-radius:18px;
  // border:1px solid rgba(51,51,51,1);
  background-color: #fff;
  color: rgba(51,51,51,1);
  }
  .button-left{
    margin-left: 181px;
    border:1px solid rgba(51,51,51,1);
  }
  .button-right{
    margin-left: 12px;
  }
}
}
</style>