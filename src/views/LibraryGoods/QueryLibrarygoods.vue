<!--
 * @Descripttion: 
 * @version: 
 * @Author: ShiRuiCe
 * @Date: 2020-09-23 11:15:16
-->
<template>
  <div class="queryLibrarygoods">
    <inputTop
      :type="1"
      :value="value"
      :placeholder="'请输入名称、品牌、型号、编码'"
      @getson="times"
    ></inputTop>
    <div class="center">
      <span>搜索历史</span>
      <img @click="deletedata()" src="@/assets/img/delete.png" alt="" />
    </div>
    <div class="list">
      <ul>
        <li
          @click="adddata(historys)"
          v-for="(historys, index) in historydata"
          :key="index"
        >
          {{ historys }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Icon, Search, Button } from "vant";
import inputTop from "@/components/topTitle";
import {
  getFunction,
  postFunction,
  putFunction,
  deleteFunction,
} from "@/utils/request";
export default {
  name: "QueryLibrarygoods",

  data() {
    return {
      value: this.$route.query.value ? this.$route.query.value : "",
      url: {
        delete: `/api/shoppe-api-service/mobile/sku/delete-list`,
        history: `/api/shoppe-api-service/mobile/sku/search-history`,
      },
      historydata: [],
    };
  },
  created() {
    this.gethistory();
    localStorage.removeItem("goodssearchvalue");
    // console.log(this.)
  },
  components: {
    [Icon.name]: Icon,
    [Search.name]: Search,
    [Button.name]: Button,
    inputTop,
  },
  directives: {
    focus: {
      inserted: function (el, { value }) {
        console.log(el, { value });
        if (value) {
          el.focus();
        }
      },
    },
  },
  mounted() {},

  methods: {
    gethistory(val) {
      getFunction(this.url.history).then((res) => {
        if (res.code == "000000") {
          console.log(res, "res");
          this.historydata = res.data;
        }
      });
    },
    adddata(val) {
      console.log(val);
      this.value = val;
    },
    deletedata() {
      this.deletehistory();
    },
    deletehistory() {
      deleteFunction(this.url.delete).then((res) => {
        if (res.code == "000000") {
          console.log(res, "res");
          this.gethistory();
        }
      });
    },
    times(val) {
      console.log(val);
      this.value = val;
    },
    goBack() {
      this.$router.push({
        name: "LibraryGoods",
        query: { search: this.$route.query.search },
      });
    },
    onSearch() {
      console.log("kdsjh", this.value);
      this.$router.push({
        name: "ProductList",
        query: { value: this.value, type: 1 },
      });
    },
    goOrder() {
      this.$router.push({
        name: "LibraryGoods",
      });
    },
  },

  beforeCreate() {
    this.$store.commit("changefoot", false);
  },
};
</script>

<style scoped lang='less'>
.queryLibrarygoods {
  font-size: 14px;
  width: 100%;
  .center {
    margin-top: 16px;
    span {
      margin-left: 12px;
      width: 61px;
      height: 15px;
      font-size: 15px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 15px;
    }
    img {
      float: right;
      width: 15px;
      height: 15px;
      margin-top: 2px;
      margin-right: 16px;
    }
  }
  .list {
    ul li {
      list-style: none;
    }
    li {
      float: left;
      width: auto;
      padding-left: 5px;
      padding-right: 5px;
      min-width: 65px;
      min-height: 24px;
      height: auto;
      border-radius: 12px;
      border: 1px solid rgba(228, 228, 231, 1);
      margin-left: 12px;
      margin-top: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 24px;
      text-align: center;
      overflow: hidden;
    }
  }
}
</style>