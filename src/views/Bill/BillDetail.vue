<template>
  <div class="invoiceDetail">
    <inputTop :type="3"></inputTop>
    <invo-list :goods="detailList" :type="3"></invo-list>
    <div class="detaill_body">
      <div class="detail_bottom">
        <div class="bottom_body">
          <span style="margin: 6px">
            <i
              style="
            background: rgb(27, 191, 151);
            width: 3px;
            height: 15px;
            display: inline-block;
            float: left;
            margin-left: 15px;
            border-radius: 2px;
            margin-top: 4px;
              "
            ></i>
            结算明细
            <i
              style="
                display: inline-block;
                margin-right: 15px;
                float: right;
                color: #979797;
                font-size: 12px;
                margin-top: 4px;
              "
              >共{{ ListData.total }}条</i
            >
          </span>
          <van-pull-refresh
            v-model="isLoading"
            success-text="刷新成功"
            @refresh="onRefresh"
          >
            <div v-if="listShow">
              <van-list
                v-model="loading"
                :finished="finished"
                @load="onLoad"
                error-text="请求失败，点击重新加载"
                :immediate-check="false"
                v-if="ListData.items.length > 0"
                :style="{ minHeight: dataListHeight }"
              >
                <div class="tabBox">
                  <table>
                    <tr>
                      <th>订单编号</th>
                      <th>所属公司</th>
                      <th>下单人</th>
                      <th>商品名称</th>
                      <th>下单时间</th>
                      <th>完成时间</th>
                      <th>单价 x 数量</th>
                      <th>总价</th>
                    </tr>
                    <tr v-for="(res, index) in ListData.items" :key="index">
                      <td>{{ res.documentNo }}</td>
                      <td>{{ res.customerName }}</td>
                      <td>{{ res.orderCreateUserName }}</td>
                      <td>{{ res.skuName }}</td>
                      <td>{{ res.orderCreateTime }}</td>
                      <td>{{ res.finishTime }}</td>
                      <td>￥{{res.currentPrice}}*{{ res.qty }}{{ res.unit }}</td>
                      <td>￥{{ res.amount }}</td>
                    </tr>
                  </table>
                </div>
              </van-list>
              <div v-else class="noSome">
                <img src="@/assets/img/noSome.png" />
              </div>
            </div>
          </van-pull-refresh>
        </div>
      </div>
      <van-button type="primary"  v-if="detailList[0].statusText=='对账中'" class="bottombtn" @click="AffirmFun()">确  认</van-button>
      <van-button type="primary" v-if="detailList[0].statusText=='对账完成'" v-show="detailList[0].qtyNoInvoiced!='0'" class="bottombtn" @click="goApply()">申请开票</van-button>
    </div>
  </div>
</template>

<script>
import {
  Toast,
  Notify,
  Icon,
  Search,
  List,
  PullRefresh,
  Button,
  Image as VanImage,
  Popup,
} from "vant";
import inputTop from "@/components/topTitle";
import invoList from "./Child/BillListData";
import {
  getFunction,
  postFunction,
  putFunction,
  deleteFunction,
} from "@/utils/request";
export default {
  name: "InvoiceDetail",
  data() {
    return {
      listShow: false,
      dataListHeight: "",
      finished: false,
      loading: false,
      pageNum: 1,
      pageSize: 10,
      isLoading: false,
      ListData: {
        items: [
        ],
        offset: 0,
        orgOffset: 0,
        pageNum: 0,
        pageSize: 0,
        total: 0,
      },
      value: "",
      show: false,
      apiList: {
        detail: `/api/shoppe-api-service/moblie/bill/management/${this.$route.query.id}/detail`,
        detailList: `/api/shoppe-api-service//moblie/bill/management/${this.$route.query.id}/order-item-list`,
        affirm:`/api/shoppe-api-service/moblie/bill/management/${this.$route.query.id}/confirm`,
      },
      detailList: [
       {
  "amount": 0,
  "amountInvoiced": 0,
  "amountNoInvoiced": 0,
  "billType": 0,
  "createTime": "2020-10-26T07:36:48.692Z",
  "createUserId": 0,
  "id": 0,
  "name": "string",
  "no": "string",
  "qtyNoInvoiced": 0,
  "statusText": "string"
}
      ],
      orderList: {},
      concealType: 1,
      concealIndex: "",
      orderLength: 0,
      informationLenght: 0,
    };
  },
  components: {
    [Notify.name]: Notify,
    [Icon.name]: Icon,
    [Search.name]: Search,
    [List.name]: List,
    [Button.name]: Button,
    [PullRefresh.name]: PullRefresh,
    [VanImage.name]: VanImage,
    [Popup.name]: Popup,
    invoList,
    inputTop,
  },
  created() {
    this.isLoading = false;
    this.getDetail();
    this.dataListHeight = this.$store.state.app.dataListHeight + "px";
    this.getList();
  },
  methods: {
    AffirmFun(){
      putFunction(this.apiList.affirm).then((res) => {
        if (res.code == "000000") {
          Toast.success('确认成功');
         this.$router.push({
          name: "Bill",
          query: { search: this.$route.query.search },
        });
        
        }
      });
    },
      goApply() {
      this.$router.push({
        name: "BillApply",
        query: { id: this.$route.query.id,money:this.detailList[0].amount },
      });
    },
    onRefresh() {
      this.getList();
    },
    onLoad() {
      setTimeout(() => {
        if (this.pageNum < this.total / 10) {
          this.pageNum++;
          var data = {
            pageNum: this.pageNum,
            pageSize: 10,
          };
          postFunction(this.apiList.detailList, data).then((res) => {
            if (res.code == "000000") {
              res.data.items.forEach((element) => {
                this.ListData.items.push(element);
              });
            }
          });
          if (data.pageNum >= this.total / 10) {
            this.finished = true;
          }
          this.loading = false;
        } else {
          this.finished = true;
        }
      }, 1000);
    },
    getDetail() {
      getFunction(this.apiList.detail).then((res) => {
        if (res.code == "000000") {
          this.detailList=[]
          this.detailList.push(res.data);
        }
      });
    },
    getList() {
      var data = {
        pageNum: this.pageNum,
        pageSize: 10,
      };
      postFunction(this.apiList.detailList, data).then((res) => {
        if (res.code == "000000") {
          this.total = res.data.total;
          this.isLoading = false;
          this.listShow = true;
          this.ListData = res.data;
        }
      });
    },
    goBack() {
      if (this.$route.query.origin == 0) {
        this.$router.push({
          name: "Home",
        });
      } else {
        this.$router.push({
          name: "Bill",
          query: { search: this.$route.query.search },
        });
      }
    },
  },
  beforeCreate() {
    this.$store.commit("changefoot", false);
  },
};
</script>

<style scoped lang="less">
.bottombtn{   
    position: fixed;
    width: 300px;
    margin: 0 auto;
    left: 40px;
    border-radius: 50px;
    bottom: 8px;
    background: #1bbf97;
    border-color: #1bbf97}
.tabBox {
  overflow-x: scroll;
  margin: 3px;
}
table {
  margin-top: 10px;
  width: 100%;
  border-color: #e4e4e7;
}
table tr:nth-child(odd) {
  background: #f8f8f8;
}
table tr {
  line-height: 30px;
  border-color: #ccc;
  border: 1px solid #e4e4e7;
 display: flex;
 border-bottom: none;
 border-right:none
}
table tr th {
  font-size: 14px;
  padding: 0 6.5px;
  width: 99px;
  border-right: 1px solid #e4e4e7;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;/*重点，不能用block等其他*/
  -webkit-line-clamp: 2;/*重点IE和火狐不支持*/
  -webkit-box-orient: vertical;/*重点*/
}
table tr td {
  border-color: #ccc;
  border-right: 1px solid #e4e4e7;
   border-bottom: 1px solid #e4e4e7;
  width: 100px;
  font-size: 12px;
  padding: 0 6px;
  word-break: break-all;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;/*重点，不能用block等其他*/
  -webkit-line-clamp: 2;/*重点IE和火狐不支持*/
  -webkit-box-orient: vertical;/*重点*/
}
table th,
table td {
  text-align: center;
  border-color: #ccc;
}
.invoiceDetail {
  font-size: 16px;
  background: #f8f8f8;
  min-height: 100%;
  .order_bodytop {
    padding: 5px;
    .top_title {
      //   margin: 0 auto;
      margin-top: -20px;
      text-align: center;
    }
    .van-search {
      width: 100%;
    }
    // margin: 0 auto;
  }
  .detaill_body {
    margin: 0 10px;

    .detail_bottom {
      display: flex;
      padding-bottom: 70px;
      .bottom_body {
        padding-top: 10px;
        margin: 10px;
        width: 335px;
        background-color: #fff;
        box-shadow: 0px 2px 4px 4px rgba(240, 241, 240, 0.5);
        border-radius: 16px;
        .bottom_text {
          font-size: 13px;
          margin: 10px;
          .span_left {
            color: #979797;
          }
          .span_right {
            float: right;
            color: #333333;
          }
        }
        .bottom_textd {
          font-size: 13px;
          margin: 10px;
          height: 50px;
          //   background: #F9FBFE;
          .span_left {
            color: #979797;
          }
          .span_right {
            float: right;
            color: #333333;
          }
        }
        .bottom_textbr {
          width: 300px;
          height: 2px;
          margin: 0 auto;
          border-bottom: 1px solid #ccc;
        }
        .foot_but {
          padding: 5px 15px;
          border: 1px solid #ccc;
          border-radius: 32px;
        }
      }
    }
  }
  .noSome {
    padding-top: 100px;
    height: 400px;
    text-align: center;
    img {
      height: 100px;
    }
  }
}
</style>