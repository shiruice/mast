<template>
  <div class="myAddress" ref="myAddress">
    <div class="myAddress_top">
      <inputTop :type="3"></inputTop>
    </div>
    <div :style="{minHeight:dataListHeight}" class="myAddress_box">
      <van-pull-refresh
        v-model="isLoading"
        success-text="刷新成功"
        @refresh="onRefresh"
        :style="{minHeight:dataListHeight}"
      >
        <div v-if="listShow">
          <div v-if="list.length>0">
            <div class="myAddress_list">
              <van-list
                v-model="loading"
                :finished="finished"
                @load="onLoad"
                error-text="请求失败，点击重新加载"
                :immediate-check="false"
              >
                <myad-list :list="list" v-if="list.length>0" :fromUrl="addressindex"></myad-list>
              </van-list>
            </div>
          </div>
          <div v-else class="noSome">
            <img src="@/assets/img/noSome.png" />
          </div>
        </div>
      </van-pull-refresh>
    </div>
    <div class="editer_subDiv">
      <div class="editer_sub">
        <van-button round block type="info" native-type="submit" @click="onAdd">添加地址</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Toast,
  AddressList,
  Icon,
  PullRefresh,
  Button,
  List,
  Tabbar,
} from "vant";
import inputTop from "@/components/topTitle";

import myadList from "./Child/MyaddList";
import {
  getFunction,
  postFunction,
  putFunction,
  deleteFunction,
} from "@/utils/request";
export default {
  name: "MyAddress",
  data() {
    return {
      isLoading: false,
      chosenAddressId: "1",
      api: {
        list: `/api/shoppe-api-service/mobile/address/list`,
      },
      listShow: false,
      finished: false,
      loading: false,
      total: "",
      list: [],
      pageNum: 1,
      addressindex: this.$route.query.addressindex
        ? this.$route.query.addressindex
        : "",
      dataListHeight: "",
    };
  },
  components: {
    [AddressList.name]: AddressList,
    [Icon.name]: Icon,
    [PullRefresh.name]: PullRefresh,
    [Button.name]: Button,
    [List.name]: List,
    [Tabbar.name]: Tabbar,
    myadList,
    inputTop,
  },
  created() {
    this.$auth.os.lxapp && this.initplus();
    this.getList(this.api.list);
    if (this.$route.query.addressindex != undefined) {
      localStorage.setItem("addressindex", this.$route.query.addressindex);
    }
    console.log(this.$store.state.app.dataListHeight);
    this.dataListHeight = this.$store.state.app.dataListHeight + 90 + "px";
  },

  activated() {
    if (this.$route.params.isUpdate) {
      this.getList(this.api.list);
    }
     this.$store.commit("changefoot", false);
  },
  methods: {
    onRefresh() {
      this.getList(this.api.list, true);
    },
    onLoad() {
      setTimeout(() => {
        if (this.pageNum < this.total / 10) {
          this.pageNum++;

          var data = {
            pageNum: this.pageNum,
            pageSize: 10,
            type: 0,
          };
          postFunction(this.api.list, data).then((res) => {
            res.data.items.forEach((element) => {
              this.list.push(element);
            });
            this.isLoading = false;
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
    initplus() {
      if (window.plus) {
        this.plusReady();
      } else {
        document.addEventListener("plusready", this.plusReady, false);
      }
    },
    plusReady() {
      plus.navigator.setStatusBarBackground("#F8F8F8");
      plus.navigator.setStatusBarStyle("dark");
    },
    getList(url, unloading) {
      this.pageNum = 1;
      var data = {
        pageNum: this.pageNum,
        pageSize: 10,
        type: 0,
      };
      postFunction(url, data, unloading).then((res) => {
        this.list = res.data.items;
        this.total = res.data.total;
        this.isLoading = false;
        this.finished = false;
        this.listShow = true;
      });
    },
    onAdd() {
      // Toast("新增地址");
      this.$router.push({
        name: "PushAddlist",
      });
    },
    goBack() {
      if (localStorage.getItem("addressindex") == 0) {
        localStorage.removeItem("addressindex");
        this.$router.push({
          name: "User",
        });
      } else if (localStorage.getItem("addressindex") == 1) {
        let list = this.list;
        let val = {};
        list.map((item) => {
          if (item.defaultRecipient == 1) {
            val = item;
          }
        });
        localStorage.removeItem("addressindex");
        this.$router.push({
          name: "ConfirmOrder",
          query: { address: val },
        });
      }
    },
    onEdit(item, index) {
      Toast("编辑地址:" + index);
    },
  },
  beforeCreate() {
    this.$store.commit("changefoot", false);
  },
};
</script>

<style scoped lang="less">
.myAddress {
  font-size: 16px;
  min-height: 95%;
  .myAddress_top {
    // padding-top: 10px;
    .toptitle {
      margin-top: -20px;
      text-align: center;
    }
  }
  .myAddress_box {
    //  overflow-x: auto;
    overflow: scroll;
  }
  .van-pull-refresh {
    min-height: 500px;
  }
  // .myAddress_list {
  //   .van-list {
  //     // height: 80px;
  //   }
  // }
  .van-tabbar {
    background: #f8f8f8;
    height: 40px;
  }
  .myAddress_button {
    //  top: 100%;
    width: 375px;
    height: 30px;
    background: #fff;
    bottom: 0;
    position: absolute;
    display: flex;
  }
  .van-address-list__add {
    width: 300px;
    margin: 0 auto;
    font-size: 18px;
    font-weight: 400px;
    background: #1bbf97;
    border-color: #1bbf97;
  }
  .noSome {
    // top:40%;
    margin-top: 100px;
    text-align: center;
    img {
      height: 100px;
    }
  }
  .editer_subDiv {
    bottom: 0px;
    left: 0px;
    width: 100%;
    position: fixed;
    _position: relative;
    z-index: 99;
    background: #f8f8f8;
    height: 40px;
    line-height: 40px;
    .editer_sub {
      width: 300px;
      margin-left: 40px;
      // margin: 0 auto;
      // bottom: 50px;

      .van-button--info {
 background: linear-gradient(180deg, #3ae1c8 0%, #1bbf97 100%);
      border: none;
        height: 37px;
        line-height: 37px;
        font-size: 18px;
      }
      ._submit {
        width: 50%;
        height: 20px;
        border-radius: 3px;

        background: #1bbf97;
        margin: 0 auto;
        text-align: center;
      }
    }
  }
}
</style>