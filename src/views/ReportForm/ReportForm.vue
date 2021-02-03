<template>
  <div class="reportFormBox">
    <inputTop :type="3"></inputTop>
    <div class="centerBox">
      <van-tabs
        v-model="active"
        class="centerTopBox"
        background="#F8F8F8"
        @click="onClick"
        title-active-color="#1BBF97"
        title-inactive-color="#979797"
        title-style="font-weight: 600;"
        line-height="0px"
      >
        <van-tab title="订单统计" class="orderStaticBox">
          <div class="amountHeaderBox">
            <van-cell
              is-link
              title="提交时间"
              @click="isShow = true"
              center
              :value="submitTime"
            ></van-cell>
            <van-action-sheet v-model="isShow" title="提交时间">
              <div class="content">
                <van-calendar
                  color="#1BBF97"
                  v-model="isShow"
                  @confirm="
                    (val) => {
                      confirmDate(val, 'order');
                    }
                  "
                  :default-date="defaultDate"
                  type="range"
                  :min-date="minDate"
                  :max-date="maxDate"
                />
              </div>
            </van-action-sheet>
            <van-cell
              is-link
              title="用户组"
              @click="getUserGroupList()"
              :value="userGroup"
            />
            <van-action-sheet
              v-model="show"
              title="用户组"
              :actions="actions"
              cancel-text="取消"
              @cancel="
                () => {
                  onCancel('static');
                }
              "
              @select="
                (val) => {
                  onSelect(val, 'static');
                }
              "
            />
          </div>
          <div class="amountBox">
            <div class="headerBox">
              <img src="@/assets/icon/qian.png" alt="" class="iconBox" />
              订单金额统计
            </div>
            <chart ref="chart" v-show="orderShow"></chart>
            <div v-show="!orderShow" class="noSome">
              <img src="@/assets/img/noSome.png" />
            </div>
          </div>
          <div class="amountBox">
            <div class="headerBox">
              <img src="@/assets/icon/tubiao.png" alt="" class="iconBox" />
              订单构成统计
            </div>
            <piechart ref="piechart" v-show="staticShow"></piechart>
            <div v-show="!staticShow" class="noSome">
              <img src="@/assets/img/noSome.png" />
            </div>
            <div v-show="staticShow" class="tabBox">
              <table>
                <tr>
                  <th>品类名称</th>
                  <th>金额</th>
                  <th>占比</th>
                </tr>
                <tr v-for="(item, index) in tableData" :key="index">
                  <td>{{ item.firstLevelCategoryName }}</td>
                  <td>{{ item.amount }}</td>
                  <td>{{ (item.proportion * 100).toFixed(2) }}%</td>
                </tr>
              </table>
            </div>
            <!-- <div v-show="!staticShow" class="noSome">
            <img src="@/assets/img/noSome.png" />
           </div> -->
          </div>
        </van-tab>
        <van-tab title="订单分布" class="orderStaticBox">
          <div class="amountHeaderBox">
            <van-cell
              is-link
              title="提交时间"
              @click="isShow = true"
              :value="submitTime"
            ></van-cell>
            <van-action-sheet v-model="isShow" title="提交时间">
              <div class="content">
                <van-calendar
                  color="#1BBF97"
                  v-model="isShow"
                  @confirm="
                    (val) => {
                      confirmDate(val, 'static');
                    }
                  "
                  :default-date="defaultDate"
                  type="range"
                  :min-date="minDate"
                  :max-date="maxDate"
                />
              </div>
            </van-action-sheet>
            <van-cell
              is-link
              title="用户组"
              @click="getUserGroupList()"
              :value="userGroup"
            />
            <van-action-sheet v-model="show" title="用户组">
              <div class="content">
                <div
                  class="contentBox"
                  v-for="(item, index) in actions"
                  :key="index"
                  @click="onSelectUser(item, index, 'userGroups')"
                >
                  <span :class="item.active ? 'active' : ''">{{
                    item.name
                  }}</span>
                  <!-- <van-checkbox v-model="item" shape="square">{{ item.name }}</van-checkbox> -->
                </div>
              </div>
              <div class="buttonBox">
                <van-button
                  type="primary"
                  @click="
                    onSelect({ name: '', userGroupId: null }, 'userGroups')
                  "
                  class="userButtonBox"
                  >确定</van-button
                >
              </div>
            </van-action-sheet>
          </div>
          <div class="amountBox">
            <div class="headerBox">
              <img src="@/assets/icon/denglu.png" alt="" class="iconBox" />
              用户组金额占比
            </div>
            <piechart ref="piechartUser" v-show="staticShow"></piechart>
            <div v-show="!staticShow" class="noSome">
              <img src="@/assets/img/noSome.png" />
            </div>
            <div v-show="staticShow" class="tabBox">
              <table>
                <tr>
                  <th>用户组名</th>
                  <th>金额</th>
                  <th>占比</th>
                </tr>
                <tr v-for="(item, index) in userGroupsData" :key="index">
                  <td>{{ item.customerUserGroupName }}</td>
                  <td>{{ item.amount }}</td>
                  <td>{{ (item.proportion * 100).toFixed(2) }}%</td>
                </tr>
              </table>
            </div>
          </div>
        </van-tab>
        <van-tab title="商品排行" class="orderStaticBox">
          <div class="amountHeaderBox">
            <van-cell
              is-link
              title="提交时间"
              @click="isShow = true"
              :value="submitTime"
            ></van-cell>
            <van-action-sheet v-model="isShow" title="提交时间">
              <div class="content">
                <van-calendar
                  color="#1BBF97"
                  v-model="isShow"
                  @confirm="
                    (val) => {
                      confirmDate(val, 'timer');
                    }
                  "
                  type="range"
                  :default-date="defaultDate"
                  :min-date="minDate"
                  :max-date="maxDate"
                />
              </div>
            </van-action-sheet>
            <van-cell
              is-link
              title="用户组"
              @click="getUserGroupList()"
              :value="userGroup"
            />
            <van-action-sheet
              v-model="show"
              title="用户组"
              cancel-text="取消"
              @cancel="
                () => {
                  onCancel('timer');
                }
              "
              :actions="actions"
              @select="
                (val) => {
                  onSelect(val, 'timer');
                }
              "
            />
          </div>
          <div class="amountBox">
            <!-- <div class="headerBox"></div> -->
            <div class="lineheaderBox" v-show="userGroupsShow">
              <button
                @click="clickSku(0)"
                :class="isActive == 0 ? 'active' : ''"
              >
                商品销量排行
              </button>
              <button
                @click="clickSku(1)"
                :class="isActive == 1 ? 'active' : ''"
              >
                商品金额排行
              </button>
            </div>
            <div class="linechartBox">
              <linechart
                ref="linechart"
                v-show="userGroupsShow"
                style="margin-left: 15px"
              ></linechart>
            </div>
            <div v-show="!userGroupsShow" class="noSome">
              <img src="@/assets/img/noSome.png" />
            </div>
            <div v-show="userGroupsShow" class="tabBox">
              <table>
                <tr>
                  <th>商品名称</th>
                  <th>单价</th>
                  <th>数量</th>
                  <th>金额</th>
                </tr>
                <tr v-for="(item, index) in skuData" :key="index">
                  <td>{{ item.skuName }}</td>
                  <td>{{ item.price }}</td>
                  <td>{{ item.sumItemQty }}</td>
                  <td>{{ item.sumAmount }}</td>
                </tr>
              </table>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import {
  Button,
  Dialog,
  Icon,
  PullRefresh,
  Tabbar,
  Tab,
  Tabs,
  DatetimePicker,
  ActionSheet,
  Toast,
  Cell,
  Popup,
  Calendar,
  Checkbox,
} from "vant";
import chart from "./child/chart";
import piechart from "./child/piechart";
import linechart from "./child/linechart";
import {
  getFunction,
  postFunction,
  putFunction,
  deleteFunction,
} from "@/utils/request";
import { parseTime, formDate } from "@/utils/c_methods.js";
import inputTop from "@/components/topTitle";
export default {
  name: "ReportForm",
  data() {
    return {
      isLoading: false,
      active: 0,
      show: false,
      isShow: false,
      actions: [],
      api: {
        amountStatisticList: `/api/shoppe-api-service/moblie/purchase-report/order-amount-statistics-list`, //订单金额统计
        orderGroup: `/api/shoppe-api-service/moblie/purchase-report/order-group-statistics-list`, //统计订单用户组分布
        orderSkuCategory: `/api/shoppe-api-service/moblie/purchase-report/order-sku-category-statistics-list`, //统计订单商品类别
        orderSku: `/api/shoppe-api-service/moblie/purchase-report/order-sku-statistics-list`, //统计订单商品排行
        orderSkuPage: `/api/shoppe-api-service/moblie/purchase-report/order-sku-statistics-list/page`, //分页统计订单商品排行
        userGroupList: `/api/shoppe-api-service/mobile/user-group/group-name-list`, //查询客户用户组名列表
      },
      currentDate: null,
      orderStaticData: [],
      orderShow: false,
      staticShow: false,
      userGroupsShow: false,
      isActive: 0,
      query: {
        startTime: null,
        endTime: null,
        customerUserGroupId: null, //用户组id
        customerUserGroupName: null, //用户组名称
      },
      nameTitle: null,
      tableData: null,
      userGroupsData: null,
      skuData: null,
      userGroup: null,
      submitTime: null,
      defaultDate: null,
      minDate: new Date(2010, 0, 1),
      maxDate: new Date(2030, 0, 31),
    };
  },
  ///待完成 事项 1.用户组接口是否正常 2.图标 3.样式
  components: {
    [Button.name]: Button,
    [Dialog.name]: Dialog,
    [Icon.name]: Icon,
    [PullRefresh.name]: PullRefresh,
    [Tabbar.name]: Tabbar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [DatetimePicker.name]: DatetimePicker,
    [ActionSheet.name]: ActionSheet,
    [Cell.name]: Cell,
    [Toast.name]: Toast,
    [Popup.name]: Popup,
    [Calendar.name]: Calendar,
    [Checkbox.name]: Checkbox,
    inputTop,
    chart,
    piechart,
    linechart,
  },
  created() {
    this.getData();
  },
  mounted() {},
  activated() {},
  methods: {
    getData() {
      this.query.startTime = parseTime(
        formDate(7, parseTime(new Date(), "{y}-{m}-{d}")),
        "{y}-{m}-{d}"
      );
      this.defaultDate = [new Date(), new Date()];
      console.log(this.defaultDate, 6666666666);
      this.query.endTime = parseTime(new Date(), "{y}-{m}-{d}");
      this.submitTime = this.query.startTime + "~" + this.query.endTime;
      this.onClick(1, "订单统计");
    },
    clickSku(val) {
      this.isActive = val;
      postFunction(this.api.orderSku, this.query, true).then((res) => {
        if (res.code == "000000") {
          this.skuData = res.data;
          this.$refs.linechart.initChart(res.data, val);
          this.userGroupsShow = !!res.data.length;
        }
      });
    },
    onCancel(type) {
      this.userGroup = null;
      this.onSelect(
        { customerUserGroupId: null, customerUserGroupName: null },
        type
      );
    },
    confirmDate(value, type) {
      console.log(value, 7777777);
      this.query.startTime = parseTime(value[0], "{y}-{m}-{d}");
      this.query.endTime = parseTime(value[1], "{y}-{m}-{d}");
      if (type == "order") {
        postFunction(this.api.amountStatisticList, this.query, true).then(
          (res) => {
            if (res.code == "000000") {
              this.$refs.chart.initChart(res.data);
              console.log(this.$refs.chart, res.data, 44);
              this.orderShow = !!res.data.length;
            }
          }
        );
        postFunction(this.api.orderSkuCategory, this.query, true).then(
          (res) => {
            if (res.code == "000000") {
              this.tableData = res.data;
              this.$refs.piechart.initChart(res.data);
              this.staticShow = !!res.data.length;
            }
          }
        );
      } else if (type == "static") {
        postFunction(
          this.api.orderGroup,
          {
            customerUserGroupIds: this.query.customerUserGroupId
              ? [this.query.customerUserGroupId]
              : null,
            customerUserGroupNames: this.query.customerUserGroupId
              ? [this.query.customerUserGroupId]
              : null,
            startTime: this.query.startTime,
            endTime: this.query.endTime,
          },
          true
        ).then((res) => {
          if (res.code == "000000") {
            this.userGroupsData = res.data;
            this.$refs.piechartUser.initChart(res.data, type);
            this.staticShow = !!res.data.length;
          }
        });
      } else if (type == "timer") {
        postFunction(this.api.orderSku, this.query, true).then((res) => {
          if (res.code == "000000") {
            this.skuData = res.data;
            this.$refs.linechart.initChart(res.data);
            this.userGroupsShow = !!res.data.length;
          }
        });
      }
      this.submitTime = this.query.startTime + "~" + this.query.endTime;
      this.isShow = false;
    },
    getUserGroupList() {
      postFunction(this.api.userGroupList, { likeName: "" }, true).then(
        (res) => {
          if (res.code == "000000") {
            this.actions = res.data.map((item) => {
              return {
                name: item.userGroupName,
                userGroupId: item.userGroupId,
                active: false,
              };
            });
            this.show = true;
          }
        }
      );
    },
    onClick(name, title) {
      console.log(name, title, 7777);
      if (this.nameTitle !== title) {
        this.query.customerUserGroupId = null;
        this.query.customerUserGroupName = null;
        this.userGroup = null;
      }
      this.nameTitle = title;
      if (title == "订单统计") {
        postFunction(this.api.amountStatisticList, this.query, true).then(
          (res) => {
            if (res.code == "000000") {
              this.$refs.chart.initChart(res.data);
              this.orderShow = !!res.data.length;
            }
          }
        );
        postFunction(this.api.orderSkuCategory, this.query, true).then(
          (res) => {
            if (res.code == "000000") {
              this.tableData = res.data;
              this.$refs.piechart.initChart(res.data);
              this.staticShow = !!res.data.length;
            }
          }
        );
      } else if (title == "订单分布") {
        postFunction(
          this.api.orderGroup,
          {
            customerUserGroupIds: this.query.customerUserGroupId
              ? [this.query.customerUserGroupId]
              : null,
            customerUserGroupNames: this.query.customerUserGroupId
              ? [this.query.customerUserGroupId]
              : null,
            startTime: this.query.startTime,
            endTime: this.query.endTime,
          },
          true
        ).then((res) => {
          if (res.code == "000000") {
            this.userGroupsData = res.data;
            this.$refs.piechartUser.initChart(res.data);
            this.staticShow = !!res.data.length;
          }
        });
      } else if (title == "商品排行") {
        postFunction(this.api.orderSku, this.query, true).then((res) => {
          if (res.code == "000000") {
            this.skuData = res.data;
            this.$refs.linechart.initChart(res.data);
            this.userGroupsShow = !!res.data.length;
          }
        });
      }
      // Toast(title);
    },
    onSelectUser(item, index, type) {
      this.actions[index].active = !this.actions[index].active;
    },
    onSelect(item, type) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.query.customerUserGroupId = item.userGroupId;
      this.query.customerUserGroupName = item.name;
      if (type == "static") {
        postFunction(this.api.amountStatisticList, this.query, true).then(
          (res) => {
            if (res.code == "000000") {
              this.$refs.chart.initChart(res.data);
              this.orderShow = !!res.data.length;
            }
          }
        );
        postFunction(this.api.orderSkuCategory, this.query, true).then(
          (res) => {
            if (res.code == "000000") {
              this.tableData = res.data;
              this.$refs.piechart.initChart(res.data, type);
              this.staticShow = !!res.data.length;
            }
          }
        );
      } else if (type == "userGroups") {
        postFunction(
          this.api.orderGroup,
          {
            customerUserGroupIds: this.actions
              .filter((item) => {
                return item.active;
              })
              .map((v) => {
                return v.userGroupId;
              }),
            customerUserGroupNames: this.actions
              .filter((item) => {
                return item.active;
              })
              .map((v) => {
                return v.name;
              }),
            startTime: this.query.startTime,
            endTime: this.query.endTime,
          },
          true
        ).then((res) => {
          if (res.code == "000000") {
            this.userGroupsData = res.data;
            this.$refs.piechartUser.initChart(res.data, type);
            this.staticShow = !!res.data.length;
          }
        });
      } else if (type == "timer") {
        postFunction(this.api.orderSku, this.query, true).then((res) => {
          if (res.code == "000000") {
            this.skuData = res.data;
            this.$refs.linechart.initChart(res.data);
            this.userGroupsShow = !!res.data.length;
          }
        });
      }
      if (type == "userGroups") {
        this.userGroup = this.actions
          .filter((item) => {
            return item.active;
          })
          .map((v) => v.name)
          .join(",");
      } else {
        this.userGroup = item.name;
      }
      this.show = false;
      // Toast(item.name);
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  beforeCreate() {
    this.$store.commit("changefoot", false);
  },
};
</script>

<style  scoped lang="less">
.reportFormBox {
  font-family: PingFangSC-Regular, PingFang SC;
  font-size: 16px;
  background: #f8f8f8;
  .centerBox {
    box-sizing: border-box;
    width: 375px;
    padding: 0 15px;
    border-radius: 16px;
  }
  .orderStaticBox {
    .amountHeaderBox {
      background: #ffffff;
      border-radius: 50px;
      .content {
        display: flex;
        margin: 20px 17px;
        width: 345px;
        flex-wrap: wrap;
        .contentBox {
          background: rgba(151, 151, 151, 0.1);
          border-radius: 28px;
          margin-top: 5px;
          text-align: center;
          border: 1px solid #ffffff;
          color: #333333;
          height: 26px;
          line-height: 26px;
          justify-content: space-around;
          align-items: center;
          padding: 7px 15px;
        }
        .active {
          color: #1bbf97;
          // background-color:yellow;
        }
      }
      .buttonBox {
        text-align: center;
        .userButtonBox {
          margin-bottom: 15px;
          background-color: #1bbf97;
          height: 37px;
          width: 302px;
          border-radius: 22px;
          // box-shadow: 0px 4px 6px 0px rgba(5, 216, 165, 0.4);
        }
      }
    }
    .amountBox {
      margin-top: 12px;
      background: #ffffff;
      border-radius: 16px;
      // padding: 12px 12px;
      .lineheaderBox {
        // margin: 12px 12px;
        text-align: center;
        button {
          display: inline-block;
          width: 150px;
          height: 28px;
          margin: 16px 0;
          font-size: 15px;
          // line-height: 28px;
          background-color: #ffffff;
          color: #1bbf97;
          border: 1px solid #1bbf97;
        }
        .active {
          background: #1bbf97;
          color: #ffffff;
        }
      }
      .headerBox {
        margin-left: 12px;
        padding-top: 12px;
        height: 15px;
        font-size: 14px;
        font-weight: 500;
        color: #333333;
        line-height: 15px;
        border-radius: 16px;
        // .lineheaderBox{
        //   text-align: center;
        // }
        img {
          width: 12px;
          height: 12px;
          margin-top: 2px;
        }
      }
      .linechartBox {
        overflow-x: scroll;
        offset-position: 50% 50%;
        animation: 0.05ms;
      }
      .tabBox {
        overflow-x: scroll;
        margin: 10px 15px 0 15px;
        // table {
        //   width: 100%;
        //   // border: 0.5px solid #cccccc;
        //   box-shadow: inset 0px -1px 1px -1px #cccccc;
        //   margin: 25px 15px;
        //   th,
        //   td {
        //     height: 40px;
        //     font-size: 15px;
        //     font-weight: 500;
        //     width: 100px;
        //     word-break: break-all;
        //     color: #666666;
        //     overflow: hidden;
        //     // background: #efefef;
        //   }
        //   th {
        //     text-align: center;
        //     background: #efefef;
        //     height: 32px;
        //     overflow: hidden;
        //   }
        //   td {
        //     overflow: hidden;
        //     text-align: center;
        //   }
        // }
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
      }
      table tr th {
        font-size: 14px;
        padding: 0 6.5px;
        width: 100px;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box; /*重点，不能用block等其他*/
        -webkit-line-clamp: 2; /*重点IE和火狐不支持*/
        -webkit-box-orient: vertical; /*重点*/
      }
      table tr td {
        border-color: #ccc;
        border-right: 1px solid #e4e4e7;
        width: 100px;
        font-size: 12px;
        padding: 0 6px;
        word-break: break-all;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box; /*重点，不能用block等其他*/
        -webkit-line-clamp: 2; /*重点IE和火狐不支持*/
        -webkit-box-orient: vertical; /*重点*/
      }
      table th,
      table td {
        text-align: center;
        border-color: #ccc;
      }
    }
    .noSome {
      margin-top: 100px;
      height: 400px;
      text-align: center;
      img {
        height: 100px;
      }
    }
  }
}
</style>
<style lang="less">
.reportFormBox {
  .centerTopBox {
    .van-tab {
      padding: 16px 0;
    }
  }
  .orderStaticBox {
    .amountHeaderBox {
      .van-cell {
        border-radius: 16px;
        color: #333333;
        padding: 12px 12px;
      }
      .van-cell__title {
        // width: 20%;
        flex: 1;
        justify-content: space-around;
      }
      .van-cell__value {
        flex: 2;
        color: #979797;
        justify-content: space-around;
        //  white-space:nowrap;
      }
      .van-popup {
        max-height: 70%;
      }
    }
  }
  .van-tab--active {
    font-weight: bold;
  }
  .van-cell {
    padding: 12px 12px;
  }
}
</style>