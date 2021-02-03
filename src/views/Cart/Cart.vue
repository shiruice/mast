<template>
  <div class="cart_body">
    <inputTop :type="4"></inputTop>
    <!-- <div class="top">
      <div class="boty_top">购物车</div>
   <van-icon name="close" @click="deletegoods()"/>
   </div> -->
    <div class="list">
      <van-pull-refresh
        v-model="isLoading"
        success-text="刷新成功"
        @refresh="onRefresh"
      >
        <ul>
          <li class="listcontain" v-for="(good, index) in goods" :key="index">
            <van-checkbox
              :value="good.skuId"
              v-model="good.isChecked"
              checked-color="#07c160"
              @click="chooseChange(good.skuId, good)"
            >
            </van-checkbox>
            <img
              @click="details(good.skuId)"
              :src="imgurl + good.imageUrl"
              alt=""
            />
            <div @click="details(good.skuId)" class="title">
              {{ good.skuName }}
            </div>
            <div @click="details(good.skuId)" class="price">
              <span class="money">￥</span>{{ good.projectPrice }}
            </div>
            <van-stepper
              min="1"
              max="9999"
              input-width="35px"
              @change="numchange(good)"
              button-size="20px"
              v-model="good.qty"
              step="1"
            />
            <div class="clear"></div>
          </li>
        </ul>
      </van-pull-refresh>
    </div>
    <div class="clear"></div>
    <div class="bottom">
      <van-checkbox
        checked-color="#07c160"
        v-model="AllChecked"
        @click="checkAll"
      >
        全选
      </van-checkbox>
      <van-button type="primary" @click="goconfirmorder(goods)" size="small"
        >填写订单</van-button
      >
      <span class="num"><span class="money">￥</span>{{ num }}</span>
      <span class="all">合计:</span>
    </div>
  </div>
</template>

<script>
import {
  Search,
  Sidebar,
  SidebarItem,
  Button,
  Collapse,
  CollapseItem,
  Card,
  Tag,
  Icon,
  Checkbox,
  CheckboxGroup,
  Stepper,
  Toast,
  PullRefresh,
} from "vant";
import {
  getFunction,
  postFunction,
  putFunction,
  deleteFunction,
  putParamsFunction,
} from "@/utils/request";
import { returnFloat } from "@/utils/c_methods";
import inputTop from "@/components/topTitle";
import { mapState } from "vuex";
export default {
  name: "Cart",
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
    [PullRefresh.name]: PullRefresh,
    inputTop,
  },
  data() {
    return {
      authorities:this.$authorities,
      AllChecked: false,
      AllCheckedconst: false,
      value: 1,
      checked: false,
      imgurl:
        (this.$auth.os.lxapp
          ? process.env.VUE_APP_BASE_API
          : location.origin.indexOf("localhost") > -1
          ? "https://shoppemobiletest3.66123123.com"
          : location.origin) + "/image",
      isLoading: false,
      selectedData: [],
      goods: [],
      url: {
        delete: `/api/shoppe-api-service/mobile/cart/delete`,
        list: `/api/shoppe-api-service/mobile/cart/list`,
        num: `/api/shoppe-api-service/mobile/cart/sku-count`,
        updata: `/api/shoppe-api-service/mobile/cart/update`,
        checked: `/api/shoppe-api-service/mobile/cart/checked`,
      },
      num: 0,
      disabled: false,
    };
  },
  computed: {
    ...mapState(["cartnum"]),
  },
  watch: {
    goods: {
      handler(val) {
        //console.log(val, 999);
        let num = 0;
        val.map((item) => {
          if (item.isChecked) {
            num += item.projectPrice * item.qty;
          }
        });
        this.num = returnFloat(num);
        // let checkeds=true
        // let num=0
        //  for (var i in val) {
        //     if (!val[i].checkeds) {
        //     checkeds=false
        //     this.checked=false
        //     break;
        //   }
        //   if (val[i].checkeds) {
        //     num++
        //   }
        // }
        // if (num==val.length) {
        //   this.checked=true
        // }
      },
      // 这里是关键，代表递归监听 demo 的变化
      deep: true,
    },
  },
  activated() {
    // //console.log(1999, this.$route.query);
    this.$store.commit("changefoot", true);
    // this.AllChecked = false;
    this.onRefresh();
    // this.list()
    this.disabled = false;
    this.$auth.os.lxapp && this.initplus();
    localStorage.removeItem("remarks");
    localStorage.removeItem("usergroup");
  },
  created() {
    this.onRefresh("old");

    //   //console.log(1999,this.$route.query)
    //     this.list()
    //     this.nums();
    //     // if (!window.location.origin) {
    //     //         window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
    //     //       }
    //     //     this.imgurl = (location.origin.indexOf("localhost") > -1 ? 'https://lxerptest.66123123.com' : location.origin) + '/image'
    //     //     //console.log(this.imgurl)
  },
  beforeCreate() {
    this.$store.commit("changefoot", true);
  },
  methods: {
    // 单选的change事件
    chooseChange(id, value) {
      if (this.selectedData.indexOf(id) > -1) {
        this.remove(this.selectedData, id);
        // let list = this.goods;
        // list.forEach(element => {
        //   element.skuId == id;
        //   element.isChecked = id;
        // });
      } else {
        this.selectedData.push(id);
      }
      if (this.selectedData.length < this.goods.length) {
        this.AllChecked = false;
        this.AllCheckedconst = false;
      } else {
        this.AllChecked = true;
        this.AllCheckedconst = true;
      }
      this.numchange(value, true);
      value.checked = !value.checked;

      //console.log(value, "*//*/");
      // let goods=this.goods
      // let num=0
      //     arr.map(item=>{
      //       if (item.isChecked) {
      //         num+=item.total
      //       }
      //     })
      //     this.num=num
    },
    //数组删除
    remove(arr, val) {
      var index = arr.indexOf(val);
      if (index > -1) {
        arr.splice(index, 1);
      }
    },
    // 全选和反选
    checkAll() {
      let list = this.goods;
      if (this.AllCheckedconst) {
        // debugger
        list.forEach((element) => {
          element.isChecked = false;
        });
        this.AllChecked = false;
        this.AllCheckedconst = false;
        this.selectedData = [];
        this.carChecked(this.url.checked, false);
      } else {
        list.forEach((element) => {
          element.isChecked = true;
          if (this.selectedData.indexOf(element.skuId) < 0) {
            this.selectedData.push(element.skuId);
          }
        });
        this.AllChecked = true;
        this.AllCheckedconst = true;
        // //console.log(this.selectedData);
        this.carChecked(this.url.checked, true);
      }
    },
    carChecked(url, val) {
      //console.log(url, val);
      let checked = { checked: val };
      this.disabled = false;
      putParamsFunction(url, checked, true).then((res) => {
        // this.list(true, true, true);
        this.disabled = true;
      });
    },
    details(value) {
      //console.log(value);
      this.$router.push({
        name: "ProductDetails",
        query: { skuId: value, type: 3 },
      });
    },
    initplus() {
      if (window.plus) {
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
    onRefresh(val) {
      console.log(val);
      this.list(true, true, !val);
      // setTimeout(() => {
      //   // Toast('刷新成功');
      //   this.list(true)
      //   // this.isLoading = false;
      //   // this.count++;
      // }, 1000);
    },
    goBack() {
      let gointocart = JSON.parse(localStorage.getItem("gointocart"));
      // //console.log(gointocart,'gointocart')
      // gointocart存储为{}类型，现在取值0，先走else处理
      if(gointocart && gointocart.type == 3){
        this.$router.push({
          name: "Home",
        });
      }else if (gointocart && gointocart.types == 1) {
        this.$router.push({
          name: "ProductDetails",
          query: {
            skuId: gointocart.skuId,
            detailstype: gointocart.detailstype,
            type: gointocart.type,
          },
        });
      } else if (gointocart && gointocart.types == 0) {
        this.$router.push({
          name: "ProductList",
          query: {
            detailstype: gointocart.detailstype,
            type: gointocart.type,
          },
        });
      } else {
        this.$router.push({
          name: "Home",
        });
      }
    },
    numchange(value, data) {
      // this.stepperDisabled=true
      //console.log(value,data, 111);
      let oldGood = this.oldGood;
      var newGood = {};
      oldGood.forEach((res) => {
        if (res.skuId == value.skuId) {
          newGood = res;
        }
      });
      if (newGood.qty != value.qty || !!data) {
        this.updata(
          {
            qty: value.qty > 9999 ? 9999 : value.qty,
            skuId: value.skuId,
            checked: !data ? true : !value.checked,
          },
          true
        );
      }
    },
    // checkedss(index){
    //   // //console.log(index)
    //   // let goods=this.goods
    //   // goods[index].checkeds=!goods[index].checkeds
    //   // this.goods=goods
    //   // //console.log(this.goods[index].checkeds,'goods')
    //   // let num=0
    //   // goods.map(item=>{
    //   //   if (item.checkeds) {
    //   //     num++
    //   //   }
    //   //   //console.log(num,'num')
    //   // })
    //   //   //console.log(num,goods)
    //   // if (num==goods.length) {
    //   //   this.checked=true
    //   // }else{
    //   //   this.checked=false
    //   // }
    // },
    deteleList() {
      let goods = this.goods;
      let deletearr = [];
      goods.map((item) => {
        if (item.isChecked) {
          deletearr.push(item.skuId);
        }
      });
      //console.log(deletearr, "deletearr");
      this.delete(deletearr);
      ///更新页面
      this.list();
    },
    delete(arr) {
      deleteFunction(this.url.delete, arr).then((res) => {
        if (res.code == "000000") {
          Toast.success("删除成功");
          //console.log(res, 999199);
          this.nums();
          this.list();
        }
      });
    },
    list(val, unloading, valdata) {
      getFunction(this.url.list, unloading).then((res) => {
        this.isLoading = false;
        let arr = res.data;
        let num = 0;
        var checkedData = [];
        arr.map((item) => {
          if (item.checked) {
            item.isChecked = true;
            checkedData.push(item.skuId);
          } else {
            item.isChecked = false;
          }
          item.projectPrice = returnFloat(item.projectPrice);
        });
        this.num = returnFloat(num);
        this.goods = arr;
        this.oldGood = JSON.parse(JSON.stringify(arr));
        console.log(checkedData, "checkedData");
        if (checkedData.length == arr.length && arr.length > 0) {
          this.AllChecked = true;
          this.AllCheckedconst = true;
        }
        this.disabled = true;
        this.selectedData = checkedData;
        //   if (res.code == "000000") {
        //     if (val) {
        //       //console.log(11223344)
        //       //console.log(res,999111)
        //     // this.goods=res.data
        //     let arr=res.data
        //     let num=0
        //     let goods=this.goods
        //     let selectedData=[]
        //     arr.map(item=>{
        //       // num+=item.total
        //       item.isChecked=false
        //       item.projectPrice=returnFloat(item.projectPrice)
        //       goods.map(val=>{
        //         if (item.skuId==val.skuId&&val.isChecked==true) {
        //           item.isChecked=true
        //           num+=item.projectPrice*item.qty
        //           selectedData.push(item.skuId)
        //         }
        //       })
        //     })
        //     //console.log(num,'nummmm',arr)
        //     this.num=num
        //     this.goods=arr
        //     this.selectedData=selectedData
        //     if (this.selectedData.length != this.goods.length&&this.goods.length>=1) {
        //   this.AllChecked = false;
        // } else if(this.selectedData.length == this.goods.length&&this.goods.length>=1) {
        //   this.AllChecked = true;
        // }
        //     //console.log(arr,this.goods,'123123')
        //   }else{
        //     let arr=res.data
        //     let num=0
        //     arr.map(item=>{
        //       item.isChecked=false
        //       item.projectPrice=returnFloat(item.projectPrice)
        //     })
        //     this.num=num
        //     this.goods=arr
        //     this.selectedData=[]
        //   }
        // }
      });
    },
    updata(data, unloading) {
      postFunction(this.url.updata, data, unloading).then((res) => {
        if (res.code == "000000") {
          // //console.log(res,9991)
          // let num=this.num
          // let goods= this.goods
          // goods.map(item=>{
          //   if (item.isChecked) {
          //     num+=item.total
          //   }
          // })
          // this.num=num
          // this.list(true,true)
          // this.onRefresh();
        }
      });
    },
    // 购物车数量
    nums() {
      //console.log("1234567");
      getFunction(this.url.num).then((res) => {
        if (res.code == "000000") {
          //console.log(res.data, "1234567");
          this.$store.commit("cartNum", res.data);
        }
      });
    },
    goconfirmorder(value) {
      //console.log(value, "goods");
      let goods = this.goods;
      let goodsdata = [];
      let amount = this.num;
      goods.map((item, index) => {
        if (item.isChecked) {
          goodsdata.push({
            currentPrice: item.projectPrice,
            itemQty: item.qty,
            picture: item.imageUrl,
            skuId: item.skuId,
            skuName: item.skuName,
            skuNo: item.skuNo,
          });
          // amount+=item.num*item.price
          // amount+=item.projectPrice*item.qty
        }
      });
      // //console.log(goodsdata,amount,'cd')
      if (this.authorities.ForbidOrder){
        Toast.fail("该账号无下单权限");
      }else if (amount == 0) {
        Toast.fail("未选择商品");
      } else {
        getFunction(this.url.list).then((res) => {
          if (res.code == "000000") {
            let goods = this.goods;
            let arr = res.data;
            //console.log(goods.length);
            if (goods.length == arr.length) {
              let goconfirms = true;
              goods.map((item, index) => {
                if (item.skuId != arr[index].skuId) {
                  //console.log("商品信息发生变化");
                  goconfirms = false;
                }
              });
              if (goconfirms) {
                this.$router.push({
                  path: "/ConfirmOrder",
                  query: { itemList: goodsdata, amount: amount, type: 4 },
                });
              }
              if (!goconfirms) {
                //console.log("商品信息发生变化");
                Toast.fail("商品信息发生变化,请重新选择");
                this.list();
                this.nums();
              }
            } else {
              //console.log("商品信息发生变化");
              Toast.fail("商品信息发生变化,请重新选择");
              this.list();
              this.nums();
            }
          }
        });
      }
      // this.$router.push({path:'/confirmorder',query:{itemList:goodsdata,amount:amount}})
      // this.$router.push({path:'/confirmorder',query:{itemList:goodsdata,amount:1}})
    },
    // checkedall(){
    //   //console.log(998,this.checked)
    //   let checked=this.checked
    //   let goods=this.goods
    //   if (!checked) {
    //     goods.map((item,index)=>{
    //       item.checkeds=true
    //     })
    //   }else{
    //     goods.map((item,index)=>{
    //       item.checkeds=false
    //     })
    //   }
    //   this.goods=goods
    // }
  },
};
</script>

<style  scoped lang="less">
.cart_body {
  .van-pull-refresh {
    height: auto;
  }
  /deep/ .van-stepper__minus::before {
    position: absolute;
    top: auto !important;
    right: auto !important;
    bottom: auto !important;
    left: auto !important;
    margin: auto;
    background-color: currentColor;
    content: "";
  }
  /deep/ .van-stepper__plus::before {
    position: absolute;
    top: auto !important;
    right: auto !important;
    bottom: auto !important;
    left: auto !important;
    margin: auto;
    background-color: currentColor;
    content: "";
  }
  /deep/ .van-stepper__plus::after {
    position: absolute;
    top: auto !important;
    right: auto !important;
    bottom: auto !important;
    left: auto !important;
    margin: auto;
    background-color: currentColor;
    content: "";
  }
  .money {
    font-size: 9px;
  }
  .van-stepper {
    background-color: #fff;
    // border:1px solid rgba(51,51,51,1);
  }
  ::-webkit-scrollbar {
    width: 0px;
  }
  font-size: 16px;
  height: 300px;
  .clear {
    clear: both;
  }
  .list {
    // border:1px solid red;
    width: 375px;
    height: auto;
    padding-bottom: 110px;
    overflow-y: scroll;
    background-color: #f8f8f8;
    .van-pull-refresh {
      height: auto;
      overflow-y: scroll;
      // border:1px solid red;
      // position: absolute;
      bottom: 100px;
      top: 65px;
    }
    // border:1px solid red;
    .listcontain {
      display: block;
      margin-top: 10px;
      width: 345px;
      height: 105px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 4px 4px rgba(240, 241, 240, 0.5);
      border-radius: 16px;
      // border:1px solid red;
      margin-left: 15px;
    }
    .van-checkbox {
      float: left;
      width: 22px;
      height: 22px;
      margin-left: 12px;
      margin-top: 40px;
    }
    img {
      float: left;
      height: 70px;
      width: 70px;
      margin-top: 18px;
      margin-left: 12px;
      border: 1px solid #f8f8f8;
      border-radius: 4px;
      // border:1px solid red;
    }
    .title {
      float: left;
      width: 206px;
      height: auto;
      line-height: 18px;
      padding-top: 12px;
      // white-space: nowrap;
      overflow: hidden;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 18px;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      margin-left: 8px;
    }
    .price {
      margin-top: 30px;
      float: left;
      width: 56px;
      height: 15px;
      line-height: 15px;
      font-size: 15px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(252, 106, 3, 1);
      line-height: 15px;
      margin-left: 8px;
    }
    .van-stepper {
      float: right;
      margin-right: 20px;
      margin-top: 27px;
      // input-width:15px;
      // button-size:15px;
    }
  }
  .top {
    .boty_top {
      // padding-top: 10px;
      text-align: center;
      border: 1px solid red;
      height: 30px;
      font-size: 17px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 30px;
    }
    .van-icon {
      float: right;
      margin-top: -23px;
      margin-right: 10px;
      color: #979797;
    }
  }
  .bottom {
    font-size: 15px;
    height: 50px;
    width: 100%;
    position: fixed;
    bottom: 60px;
    z-index: 1000;
    background-color: #fff;
    // border:1px solid green;
    .van-checkbox {
      float: left;
      color: rgba(51, 51, 51, 1);
      margin-top: 15px;
      margin-left: 26px;
      // line-height: 30px;
    }
    .all {
      float: right;
      display: inline-block;
      line-height: 40px;
      margin-top: 8px;
      font-size: 15px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    .num {
      float: right;
      display: inline-block;
      line-height: 40px;
      margin-top: 8px;
      margin-right: 8px;
      font-size: 15px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(252, 114, 16, 1);
    }
    // span{
    // 	float: right;
    // 	display: inline-block;
    // 	line-height: 40px;
    // 	// margin-right: 10px;
    // }
    .van-button {
      float: right;
      margin-right: 15px;
      width: 108px;
      height: 36px;
      margin-top: 8px;
      background: linear-gradient(180deg, #3ae1c8 0%, #1bbf97 100%);
      border-radius: 20px;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      border: none;
      text-align: center;
    }
  }
}
</style>