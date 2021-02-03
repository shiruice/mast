<!--
 * @Descripttion: 
 * @version: 
 * @Author: ShiRuiCe
 * @Date: 2020-10-24 14:18:54
-->
<template>
  <div class="GoodsList">
    <div class="item_goods" v-for="(item, index) in goods" :key="index">
      <!-- 展示 -->
      <div class="item_list" v-if="type == 0">
        <div class="item_img">
          <span class="goods_img" @click="goDetail(item.skuId)">
            <!-- :src="'https://lxerptest.66123123.com/image'+res.imagePath[0]" -->
            <!-- src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3238317745,514710292&fm=26&gp=0.jpg" -->
            <!-- :src="apiHost + '/image' + item.mainPictureUrl" -->

            <van-image
              :src="apiHost + '/image' + item.mainPictureUrl"
              fit="contain"
              class="img_boy"
            />
          </span>
        </div>
        <div class="item_text">
          <div class="item_top">
            <div class="item_text">
              {{ item.name }}
            </div>
          </div>
          <div class="item_unit">
            <span class="unit">￥</span><span>{{ item.projectPrice }}</span>
          </div>
          <div class="item_button">
            <div class="button" @click="goCart(item.skuId)">加入购物车</div>
          </div>
        </div>
      </div>
      <!-- 删除 -->
      <div v-else :class="index + 1 == goods.length ? 'item_listlsat ' : ''">
        <van-checkbox
          :value="item.skuId"
          v-model="item.isChecked"
          checked-color="#07c160"
          @click="chooseChange(item.skuId)"
        >
          <div :class="index + 1 == goods.length ? ' item_list' : 'item_list'">
            <div class="item_img">
              <span class="goods_img" @click="goDetail(item.skuId)">
                <!-- :src="'https://lxerptest.66123123.com/image'+res.imagePath[0]" -->
                <!-- src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3238317745,514710292&fm=26&gp=0.jpg" -->
                <!-- :src="apiHost + '/image' + item.mainPictureUrl" -->

                <van-image
                  :src="apiHost + '/image' + item.mainPictureUrl"
                  fit="contain"
                  class="img_boy"
                />
              </span>
            </div>
            <div class="item_text">
              <div class="item_topdete">
                <div class="item_text">
                  {{ item.name }}
                </div>
              </div>
              <div class="item_unit">
                <span class="unit">￥</span><span>{{ item.projectPrice }}</span>
              </div>
            </div>
          </div>
        </van-checkbox>
      </div>
    </div>
    <div class="checkbox_bottom" v-if="type == 1">
      <van-checkbox
        checked-color="#07c160"
        v-model="AllChecked"
        @click="checkAll"
      >
        全选
      </van-checkbox>
      <span class="bottom_apsn" @click="DeteleArr">删除</span>
    </div>
  </div>
</template>

<script>
import {
  Grid,
  GridItem,
  Image as VanImage,
  Tag,
  Col,
  Row,
  Checkbox,
  Dialog,
  CheckboxGroup,
  Toast,
} from "vant";
import {
  getFunction,
  postFunction,
  putFunction,
  deleteFunction,
} from "@/utils/request";
import { returnFloat } from "@/utils/c_methods";
export default {
  name: "GoodsList",
  data() {
    return {
      selectedData: [],
      AllChecked: false,
      apiHost: this.$auth.os.lxapp
        ? process.env.VUE_APP_BASE_API
        : location.origin.indexOf("localhost") > -1
        ? "https://shoppemobiletest3.66123123.com"
        : location.origin,

      url: {
        wishBatchCance: `/api/shoppe-api-service/mobile/sku/wish-batch-cancel`,
        addcar: `/api/shoppe-api-service/mobile/cart/`,
      },
    };
  },
  props: {
    goods: Array,
    search: Number,
    type: Number,
  },
  components: {
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [VanImage.name]: VanImage,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Tag.name]: Tag,
    [Col.name]: Col,
    [Row.name]: Row,
    [Toast.name]: Toast,
    [Dialog.name]: Dialog,
  },
  methods: {
    goDetail(value) {
      this.$router.push({
        name: "ProductDetails",
        query: { skuId: value, type: 7 },
      });
    },
    DeteleArr() {
      console.log(this.selectedData);
      if (this.selectedData.length > 0) {
        deleteFunction(this.url.wishBatchCance, this.selectedData).then(
          (res) => {
            Toast.success("删除成功");
            this.$emit("callback");
          }
        );
      } else {
        Toast.fail("请选择");
      }
    },
    goCart(val) {
      console.log(val);
      postFunction(this.url.addcar, { qty: 1, skuId: val }, true).then(
        (res) => {
          if (res.code == "000000") {
            console.log(res, 9991);
            this.$store.commit("cartNum", res.data.length);
            this.badge = res.data.length;
            this.gocartshow = true;
            Toast.success("添加成功");
            setTimeout(() => {
              this.gocartshow = false;
            }, 1000);
            // this.num()
          }
        }
      );
    },
    chooseChange(id) {
      if (this.selectedData.indexOf(id) > -1) {
        this.remove(this.selectedData, id);
      } else {
        this.selectedData.push(id);
      }
      if (this.selectedData.length < this.goods.length) {
        this.AllChecked = false;
      } else {
        this.AllChecked = true;
      }
      console.log(this.selectedData);
    },
    remove(arr, val) {
      var index = arr.indexOf(val);
      if (index > -1) {
        arr.splice(index, 1);
      }
    },
    checkAll() {
      let list = this.goods;
      console.log(list.length);
      console.log(this.selectedData, "1");
      if (this.selectedData.length == list.length) {
        list.forEach((element) => {
          element.isChecked = false;
        });
        this.selectedData = [];
      } else {
        list.forEach((element) => {
          element.isChecked = true;
          this.selectedData.push(element.skuId);
        });
        for (var i = 0; i < this.selectedData.length; i++) {
          for (var j = i + 1; j < this.selectedData.length; j++) {
            if (this.selectedData[i] == this.selectedData[j]) {
              this.selectedData.splice(j, 1);
            }
          }
        }
      }
    },
  },
};
</script>

<style scoped lang="less">
.GoodsList {
  width: 375px;
  padding: 0 15px;
  .item_list {
    margin: 0 auto;
    margin-top: 10px;
    display: flex;

    .item_img {
      width: 120px;
      height: 117px;
      border: 1px solid #e2e1e1;
      display: flex;
      .goods_img {
        width: 120px;
        height: 117px;
        .img_boy {
          //   margin-left: 5px;
          width: 118px;
          height: 115px;
          // border: 1px solid #f8f8f8;
        }
      }
    }
    .item_text {
      display: inline-block;
      float: left;
      margin-left: 12px;
      .item_top {
        width: 210px;
        height: 35px;
        // border: 1px solid #dedede;
        .item_text {
          width: 212px;
          height: 34px;
          margin-left: 5px;
          font-size: 12px;
          color: #333333;
          font-weight: 500;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
      .item_topdete {
        width: 190px;
        height: 35px;
        // border: 1px solid #dedede;
        .item_text {
          width: 190px;
          height: 34px;
          margin-left: 5px;
          font-size: 12px;
          color: #333333;
          font-weight: 500;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
      .item_unit {
        color: #1bbf97;
        width: 212px;
        float: left;
        display: inline-block;

        .unit {
          font-size: 10px;
        }
      }
      .item_button {
        .button {
          margin-top: 34px;

          display: inline-block;
          font-size: 11px;
          text-align: center;
          width: 73px;
          height: 21px;
          line-height: 21px;
          border-radius: 50px;
          color: #1bbf97;
          border: 1px solid #1bbf97;
          float: right;
        }
      }
    }
  }
  .item_listlsat {
    margin-bottom: 50px;
  }
  .checkbox_bottom {
    display: flex;
    background: #fff;
    width: 375px;
    height: 40px;
    line-height: 40px;
    padding: 0 6px;
    bottom: 0px;
    left: 0px;
    // width: 100%;
    position: fixed;
    _position: relative;

    .bottom_apsn {
      display: inline-block;
      width: 81px;
      height: 29px;
      line-height: 29px;
      text-align: center;
      border-radius: 50px;
      margin-left: 208px;
      color: #1bbf97;
      border: 1px solid #1bbf97;
    }
  }
}
</style>