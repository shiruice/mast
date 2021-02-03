<!--
 * @Descripttion: 收藏商品
 * @version: 
 * @Author: ShiRuiCe
 * @Date: 2020-10-22 13:40:33
-->
<template>
  <div class="CollectionGoodsSeac">
    <inputTop :type="1" v-if="type == 0" @getson="getson"></inputTop>
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
            v-if="RecommendGoods.length > 0"
          >
            <goods-list
              :goods="RecommendGoods"
              :type="type"
              @callback="detailuploadCallback"
            ></goods-list>
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
import GoodsList from "./Child/GoodsList";
import {
  getFunction,
  postFunction,
  putFunction,
  deleteFunction,
} from "@/utils/request";
export default {
  name: "CollectionGoodsSeac",
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

      finished: false,
      loading: false,
      RecommendGoods: [],
      pageNum: 1,
      pageSize: 10,
      isLoading: false,
      dataListHeight: "",
      api: {
        search: `/api/shoppe-api-service/mobile/sku/wish/list-search`,
      },
      type: 0,
      total: "",
      searchCon: {
        pageNum: 1,
        pageSize: 10,
        searchContext: "",
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
    GoodsList,
  },
  created() {
    // this._search(this.api.search, this.searchCon);
    this.dataListHeight = this.$store.state.app.dataListHeight + 90 + "px";
  },
  methods: {
    onSearch() {
      this._search(this.api.search, this.searchCon);
    },
    getson(val) {
      console.log(val);
      this.searchCon.searchContext = val;
    },
    detailuploadCallback() {
      this._search(this.api.search, this.searchCon);
    },
    _search(url, data, val) {
      postFunction(url, data).then((res) => {
        if (res.code == "000000") {
          this.RecommendGoods = [];
          res.data.items.forEach((element) => {
            element.isChecked = false;
            this.RecommendGoods.push(element);
          });
          this.listShow = true;
          this.total = res.data.total;
        }
      });
      if (val == 1) {
        this.isLoading = false;
        this.listShow = true;
      }
    },

    gointobiznu() {
      if (this.type == 1) {
        this.type = 0;
      } else if (this.type == 0) {
        this.type = 1;
      }
    },

    onRefresh() {
      this._search(this.api.search, this.searchCon, 1);
      this.pageNum = 1;
      this.finished = false;
      this.loading = false;
    },
    onLoad() {
      setTimeout(() => {
        if (this.pageNum < this.total / 10) {
          this.pageNum++;
          var data = {
            searchContext: this.value,
            pageNum: this.pageNum,
            pageSize: 10,
          };
          postFunction(this.api.search, data, true).then((res) => {
            if (res.code == "000000") {
              res.data.items.forEach((element) => {
                element.isChecked = false;
                this.RecommendGoods.push(element);
              });
              // let arr = res.data;
              // let num = 0;
              // arr.map((item) => {
              //   item.isChecked = false;
              //   item.projectPrice = returnFloat(item.projectPrice);
              // });
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
    goBack() {
      this.$router.push({
        name: "CollectionGoods",
      });
    },
  },
  beforeCreate() {
    this.$store.commit("changefoot", false);
  },
};
</script>

<style scoped lang='less'>
.CollectionGoodsSeac {
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