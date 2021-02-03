<template>
  <div class="approvalList">
    <div v-for="(item, index) in goods" :key="index" @click="goDetail(item)">
      <div class="list-div">
        <div class="list-div-c1">
          <div>
            <van-icon name="clock-o" color="#1BBF97" size="15" />
            <span>{{ item.createTime }}</span>
          </div>
          <p :class="item.status == 3 ? 'p3' : item.status == 2 ? 'p2' : ''">
            {{
              { 0: "待审批", 1: "待付款", 2: "已通过", 3: "已驳回" }[
                item.status
              ]
            }}
          </p>
        </div>
        <p class="list-div-c2">{{ item.customerUserName }}发起的订单详情</p>
        <p class="list-div-c3">
          <span>订单编号：</span>
          <span>{{ item.customerOrderNo }}</span>
        </p>
        <p class="list-div-c3">
          <span>申请用户组：</span>
          <span>{{ item.userGroupName }}</span>
        </p>
        <p class="list-div-c3">
          <span>采购金额：</span>
          <span>
            <span>￥</span><span>{{ item.amount }}</span>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "vant";
export default {
  name: "InvoiceList",
  props: {
    goods: Array,
    click: String,
  },
  data() {
    return {
      clickFn: this.click,
    };
  },
  components: {
    [Icon.name]: Icon,
  },
  methods: {
    goDetail(val) {
      this.$router.push({
        name: "approvalDetail",
        query: {
          customerOrderId: val.customerOrderId,
          orderId: val.orderId,
          taskId: val.taskId,
          status: this.clickFn,
        },
      });
    },
  },
  watch: {
    click(val) {
      this.clickFn = val;
    },
  },
  beforeCreate() {
    this.$store.commit("changefoot", false);
  },
};
</script>

<style scoped lang="less">
.approvalList {
  .list-div {
    width: 321px;
    padding: 12px;
    border-radius: 16px;
    background: #fff;
    margin: 0 auto 12px;
    .list-div-c1,
    .list-div-c2,
    .list-div-c3 {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      font-size: 13px;
      line-height: 12px;
    }
    .list-div-c2,
    .list-div-c3 {
      margin-top: 12px;
    }
    .list-div-c1 {
      > div {
        color: #979797;
        i,
        span {
          vertical-align: middle;
        }
        span {
          margin-left: 5px;
        }
      }
      > p {
        color: #1bbf97;
        font-weight: bold;
      }
      > .p2 {
        color: #979797;
      }
      > .p3 {
        color: #f74b37;
      }
    }
    .list-div-c2 {
      font-size: 15px;
      line-height: 14px;
      color: #333;
    }
    .list-div-c3 {
      span {
        &:nth-of-type(1) {
          color: #979797;
          flex-shrink: 0;
        }
        &:nth-of-type(2) {
          color: #333333;
          word-break: break-all;
        }
        > span {
          display: inline-block;
          vertical-align: bottom;
          &:nth-of-type(1) {
            transform: scale(0.8);
            margin-bottom: -1px;
          }
        }
      }
    }
  }
}
</style>