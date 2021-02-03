<!--
 * @Descripttion: 浏览记录
 * @version: 
 * @Author: ShiRuiCe
 * @Date: 2020-10-22 16:43:36
-->
<template>
  <div class="browsingHistory">
    <inputTop :type="10" v-if="type == 0" :tory="true"></inputTop>
    <inputTop :type="11" v-else :tory="true"></inputTop>
    <div>
      <van-pull-refresh
        v-model="isLoading"
        success-text="刷新成功"
        @refresh="onRefresh"
      >
        <div v-if="listShow" :style="{ minHeight: dataListHeight }">
          <van-list
            v-model="loading"
            :finished="finished"
            @load="onLoad"
            error-text="请求失败，点击重新加载"
            :immediate-check="false"
            v-if="mapArr.length > 0"
          >
            <HistoryList
              :goods="mapArr"
              :goodsmap="arrMap"
              :type="type"
              @callback="detailuploadCallback"
            ></HistoryList>
          </van-list>
          <div v-else class="noSome">
            <img src="@/assets/img/noSome.png" />
          </div>
        </div>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { Icon, List, Search, Button, PullRefresh } from "vant";
import inputTop from "@/components/topTitle";
import HistoryList from "./Child/HistoryList";
import {
  getFunction,
  postFunction,
  putFunction,
  deleteFunction,
} from "@/utils/request";
export default {
  name: "browsingHistory",
  data() {
    return {
      data: {
        items: [
          {
            mainPictureUrl: "string",
            name: "string",
            projectPrice: 0,
            skuId: 80,
            underlinedPrice: 0,
            isChecked: false,
          },
        ],
        offset: 0,
        orgOffset: 0,
        pageNum: 0,
        pageSize: 0,
        total: 0,
      },
      listShow: false,
      nextPage: true,
      finished: false,
      loading: false,
      RecommendGoods: [],
      pageNum: 1,
      pageSize: 10,
      isLoading: false,
      dataListHeight: "",
      type: 0,
      arrMap: {
        今天: [{ name: "1" }],
        昨天: [{ name: "2" }],
      },
      arrMap2: {
        昨天: [{ name: "3" }],
        "2020-10-20": [{ name: "2" }],
        "2020-10-15": [{ name: "2" }],
        "2020-10-1": [{ name: "2" }],
      },
      mapArr: [],
      api: {
        browseList: `/api/shoppe-api-service/mobile/sku/browse/list`,
      },
      browseList: {
        pageNum: 1,
        pageSize: 10,
      },
    };
  },
  components: {
    [Icon.name]: Icon,
    [Search.name]: Search,
    [List.name]: List,
    [Button.name]: Button,
    [PullRefresh.name]: PullRefresh,
    inputTop,
    HistoryList,
  },
  created() {
    // for (var key in this.arrMap) {
    //   if (this.arrMap2.hasOwnProperty(key) === true) {
    //     this.arrMap[key] = [...this.arrMap[key], ...this.arrMap2[key]];
    //     delete this.arrMap2[key];
    //   }
    // }
    // var obj = Object.assign(this.arrMap, this.arrMap2);
    // console.log(this.arrMap, obj);
    // var data = [];
    // for (var key in this.arrMap) {
    //   data.push(key);
    // }
    // this.mapArr = data;
    // console.log(data);
    this._browseList(this.api.browseList, this.browseList);
    this.dataListHeight = this.$store.state.app.dataListHeight + 90 + "px";
  },
  methods: {
    detailuploadCallback() {
      this._browseList(this.api.browseList, this.browseList);
    },
    aginList() {},
    _browseList(url, data, val) {
      postFunction(url, data).then((res) => {
        if (res.code == "000000") {
          this.arrMap = res.data;
          var data = [];
          for (var key in this.arrMap) {
            data.push(key);
          }
          this.mapArr = sortarr(data);
          this.listShow = true;
          this.type = 0;
          function sortarr(arr) {
            for (var i = 0; i < arr.length - 1; i++) {
              for (var j = 0; j < arr.length - 1 - i; j++) {
                var formatDate1 = new Date(arr[j]);
                var formatDate2 = new Date(arr[j + 1]);
                if (arr[j] < arr[j + 1]) {
                  var temp = arr[j];
                  arr[j] = arr[j + 1];
                  arr[j + 1] = temp;
                }
              }
            }
            return arr;
          }
        }
      });
      if (val == 1) {
        this.isLoading = false;
        this.listShow = true;
      }
    },
    goBack() {
      this.$router.push({
        name: "User",
      });
    },
    gointobiznu() {
      if (this.type == 1) {
        this.type = 0;
      } else if (this.type == 0) {
        this.type = 1;
      }
    },

    onRefresh() {
      this._browseList(this.api.browseList, this.browseList, 1);
      this.pageNum = 1;
      this.finished = false;
      this.loading = false;
      this.nextPage = true;
    },
    onLoad() {
      setTimeout(() => {
        if (this.nextPage) {
          this.pageNum++;
          var data = {
            pageNum: this.pageNum,
            pageSize: 10,
          };
          postFunction(this.api.browseList, data, true).then((res) => {
            var keyData = [];
            for (var key in res.data) {
              keyData.push(key);
            }
            if (res.code == "000000") {
              if (keyData.length != 0) {
                this.arrMap2 = res.data;
                for (var key in this.arrMap) {
                  if (this.arrMap2.hasOwnProperty(key) === true) {
                    this.arrMap[key] = [
                      ...this.arrMap[key],
                      ...this.arrMap2[key],
                    ];
                    delete this.arrMap2[key];
                  }
                }
                var obj = Object.assign(this.arrMap, this.arrMap2);
                console.log(this.arrMap, obj);
                var data = [];
                for (var key in this.arrMap) {
                  data.push(key);
                }
                this.mapArr = sortarr(data);
                function sortarr(arr) {
                  for (var i = 0; i < arr.length - 1; i++) {
                    for (var j = 0; j < arr.length - 1 - i; j++) {
                      var formatDate1 = new Date(arr[j]);
                      var formatDate2 = new Date(arr[j + 1]);
                      if (arr[j] < arr[j + 1]) {
                        var temp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = temp;
                      }
                    }
                  }
                  return arr;
                }
              } else {
                this.nextPage = false;
              }
            }
          });
          if (this.nextPage == false) {
            this.finished = true;
          }
          this.loading = false;
        } else {
          this.finished = true;
        }
      }, 1000);
    },
    goBack() {
      this.$router.push({
        name: "User",
      });
    },
  },
  beforeCreate() {
    this.$store.commit("changefoot", false);
  },
};
</script>

<style  scoped lang='less'>
.browsingHistory {
  font-size: 16px;
  background: #f8f8f8;
  .list_div {
  }
  .noSome {
    height: 400px;
    padding-top: 100px;

    text-align: center;
    img {
      height: 100px;
    }
  }
}
</style>