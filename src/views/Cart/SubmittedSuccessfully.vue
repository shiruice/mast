<template>
  <div class="successcontain">
    <div class="top">
      <van-icon name="success" />
      <div>订单已提交成功</div>
    </div>
    <div class="left" @click="order(1)">
      <!-- <div class="num">1</div> -->
      <div class="text">查看订单</div>
    </div>
    <div class="right" @click="gobuy(1)">
      <!-- <div class="num">2</div> -->
      <div class="text">继续购物</div>
    </div>
  </div>
</template>

<script>
  import { Search,Sidebar, SidebarItem,Button,Collapse,CollapseItem,Card,Tag,Icon,Checkbox, CheckboxGroup,Stepper   } from "vant";
export default {
name:'SubmittedSuccessfully',
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
  },
  data() {
    return {
      value: 1,
    };
  },
  methods: {
    gobuy(value){
      this.$router.push({path:'/'})
    },
    order(value){
      console.log(this.$route.query.customerOrderId,'111')
      this.$router.push({name: "OrderDetail",query:{customerOrderId:this.$route.query.customerOrderId,status:"true"}})
      // this.$router.push({name: "order"})
    },
    // goback(){
    //   this.$router.go(-1)
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
.successcontain{
  height: 667px;
  font-size: 15px;
  .top{
    .van-icon{
      width: 375px;
      height: 68px;
      // border:1px solid red;
      font-size: 70px;
      color: #1BBF97;
      margin-left:-40px;

    }
    div{
      margin-top: 18px;
      text-align: center;
      font-size:15px;
      font-family:PingFang-SC-Bold,PingFang-SC;
      font-weight:bold;
      color:rgba(153,153,153,1);
    }
    text-align: center;
    padding-top: 210px;
  }
  .left{
    float: left;
    margin-left: 93px;
    margin-top: 44px;
    .num{
      float: left;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: red;
      text-align: center;
    }
    .text{
      float: left;
      width:81px;
      height:29px;
      border-radius:18px;
      border:1px solid rgba(51,51,51,1);
      text-align: center;
      line-height: 29px;
      font-weight:500;
      font-size:15px;
      font-family:PingFang-SC-Medium,PingFang-SC;
    }
  }
  .right{
     margin-left: 28px;
     margin-top: 44px;
    float: left;
    .num{
      float: left;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: red;
      text-align: center;
      font-weight:500;
      font-size:13px;
      font-family:PingFang-SC-Medium,PingFang-SC;
      color: rgba(51,51,51,1);
    }
    .text{
      float: left;
      width:81px;
      height:29px;
      border-radius:18px;
      border:1px solid rgba(27,191,151,1);
      text-align: center;
      line-height: 29px;
      background:rgba(27,191,151,1);
      color:rgba(255,255,255,1);
      font-weight:500;
      font-size:15px;
      font-family:PingFang-SC-Medium,PingFang-SC;
    }
  }
}
</style>