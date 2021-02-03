<template>
  <div class="detaill">
    <div class="detaill_top">
      <!-- <div @click="goBack" class="div_goBack">
        <img src="@/assets/img/goBack.png" height="20px" />
      </div>
      <div class="toptitle">个人信息</div>-->

      <inputTop :type="3"></inputTop>
    </div>
    <div class="dateil_had">
      <img src="@/assets/img/user.png" width="60px" />
      <span>{{dataList.userInfo.realName}}</span>
    </div>
    <div class="detail_body">
      <div class="body_top">
        <div class="top_left">
          <div class="left-icon"></div>
          <span>基本信息</span>
        </div>
        <div class="top_right">
          <span @click="editer" class="t_left">编辑</span>
          <span @click="replacement" class="t_right">重置密码</span>
        </div>
      </div>
      <div class="body_body">
        <span class="b_left">账号：</span>
        <span class="b_right">{{dataList.userInfo.userName}}</span>
      </div>
      <div class="body_body">
        <span class="b_left">姓名：</span>
        <span class="b_right">{{dataList.userInfo.realName}}</span>
      </div>
      <div class="body_body">
        <span class="b_left">电话：</span>
        <span class="b_right">{{dataList.userInfo.phone}}</span>
      </div>
      <div class="body_body">
        <span class="b_left">邮箱：</span>
        <span class="b_right">{{dataList.userInfo.email}}</span>
      </div>
    </div>
    <div class="detail_butm">
      <div class="butm_top">
        <div class="top_left">
          <div class="left-icon"></div>
          <span>业务信息</span>
        </div>
      </div>
      <div class="butm_body">
        <span class="m_left">角色：</span>
        <div class="div_fole">
          <span class="m_right" v-for="(res,index) in dataList.roleNames" :key="index">{{res}}</span>
        </div>
      </div>
      <div class="butm_body">
        <span class="m_left">用户组：</span>
        <div class="div_group">
          <span class="m_right" v-for="(res,index) in dataList.userGroupNames" :key="index">{{res}}</span>
        </div>
      </div>
      <div class="butm_body">
        <span class="m_left">审批流：</span>
        <span class="m_right">{{dataList.customerFlowNames}}</span>
      </div>
      <!-- <div class="butm_body" v-if="dataList.budgetMonth">
        <span class="m_left">月度预算：</span>
        <span class="m_right">{{dataList.budgetMonth}}</span>
      </div>
      <div class="butm_body" v-if="dataList.budgetQuarter">
        <span class="m_left">季度预算：</span>
        <span class="m_right">{{dataList.userbudgetQuarterName}}</span>
      </div>
      <div class="butm_body" v-if="dataList.userName">
        <span class="m_left">年度预算：</span>
        <span class="m_right">{{dataList.userName}}</span>
      </div>-->
    </div>
  </div>
</template>

<script>
import {
  getFunction,
  postFunction,
  putFunction,
  deleteFunction,
} from "@/utils/request";
import inputTop from "@/components/topTitle";

export default {
  name: "UserDetail",
  data() {
    return {
      api: {
        detail: `/api/shoppe-api-service/mobile/user/detail`,
      },
      dataList: {
        customerFlowNames: "",
        approveInfo: {},
        orderInfo: {},
        roleNames: [],
        userGroupNames: [],
        userInfo: {},
      },
    };
  },
  created() {
    console.log(JSON.parse(localStorage.getItem("UserInfo")).id);
    this.$auth.os.lxapp && this.initplus();
    this.getList();
  },
  activated() {
    // if ((this.$route.query.search = 1)) {
      this.getList();
    // }
  },
  components: {
    inputTop,
  },
  methods: {
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
    replacement() {
      this.$router.push({
        name: "Replacement",
      });
    },
    editer() {
      this.$router.push({
        name: "Editer",
      });
    },
    getList() {
      getFunction(this.api.detail).then((res) => {
        if (res.code == "000000") {
          this.dataList = res.data;
        }
      });
    },
    goBack() {
      this.$router.push({
        name: "SetPage",
      });
    },
    initplused() {
      if (window.plus) {
        this.value = "exist";
        this.plusReadyed();
      } else {
        this.value = "Listener";
        document.addEventListener("plusready", this.plusReadyed, false);
      }
    },
    plusReadyed() {
      this.value = "plusReady";
      plus.navigator.setStatusBarBackground("#F8F8F8");
      plus.navigator.setStatusBarStyle("dark");
    },
  },
  beforeDestroy() {
    this.initplused();
  },
  beforeCreate() {
    this.$store.commit("changefoot", false);
  },
};
</script>

<style scoped lang="less">
.detaill {
  font-size: 16px;
  height: 100%;
  background: #fff;
  .detaill_top {
    // padding-top: 10px;
    .div_goBack {
      margin-left: 10px;
    }
    .toptitle {
      margin-top: -20px;
      text-align: center;
    }
  }
  .dateil_had {
    width: 350px;
    margin: 0 0 10px 10px;
    height: 100px;
    line-height: 100px;
    border-bottom: 1px solid #e4e4e7;
    display: flex;
    img {
      margin: 20px;
    }
    span {
      line-height: 100px;
    }
  }
  .detail_body {
    margin-left: 10px;
    width: 350px;
    // margin:0  auto;
    border-bottom: 1px solid #e4e4e7;
    .body_top {
      display: flex;
      .top_left {
        width: 75px;
        text-align: left;
        font-size: 15px !important;
        font-weight: 500;
        color: #333;
        display: flex;
        align-items: center;
        .left-icon {
          width: 2px;
          height: 14px;
          background-color: #1bbf97;
          margin-right: 4.5px;
        }
      }
      .top_right {
        width: 280px;
        text-align: right;
        font-size: 12px;
        .t_left {
          color: #fc7210;
          border: 1px solid #fc7210;
          border-radius: 3px;
          margin: 0 10px;
          padding: 0 3px;
        }
        .t_right {
          color: #fff;
          background: #fc7210;
          border-radius: 3px;
          border: 1px solid #fc7210;
          margin-left: 10px;
          padding: 0 3px;
        }
      }
    }
    .body_body {
      font-size: 13px;
      margin: 10px 0;
      .b_left {
        width: 80px;
        font-weight: 500;
        color: #979797;
      }

      .b_right {
        float: right;
        font-weight: 500;
        color: #333333;
      }
    }
  }
  .detail_butm {
    margin: 10px;
    width: 350px;
    margin: 10px;
    border-bottom: 1px solid #e4e4e7;

    .butm_top {
      display: flex;
      .top_left {
        font-size: 15px !important;
        font-weight: 500;
        color: #333;
        display: flex;
        align-items: center;
        .left-icon {
          width: 2px;
          height: 14px;
          background-color: #1bbf97;
          margin-right: 4.5px;
        }
      }
      .top_right {
        margin-left: 150px;
        font-size: 12px;
        .t_left {
          color: #fc7210;
          border: 1px solid #fc7210;
          border-radius: 3px;
          margin: 0 10px;
          padding: 0 3px;
        }
        .t_right {
          color: #f74b37;
          border-radius: 3px;
          border: 1px solid #f74b37;
          margin: 0 10px;
          padding: 0 3px;
        }
      }
    }
    .butm_body {
      font-size: 13px;
      margin: 10px 0;
      display: flex;
      .m_left {
        font-weight: 500;
        color: #979797;
      }
      .div_fole {
        width: 311px;
        word-break: break-all;
        .m_right {
          float: right;
          margin: 0 0 0 5px;
          font-weight: 500;
          color: #333333;
        }
      }
      .div_group {
        width: 298px;
        word-break: break-all;
        .m_right {
          float: right;
          margin: 0 0 0 5px;
          font-weight: 500;
          color: #333333;
        }
      }
      .m_right {
        margin: 0 5px;
        font-weight: 500;
        color: #333333;
      }
    }
  }
}
</style>