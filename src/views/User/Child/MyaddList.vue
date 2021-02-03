<template>
  <ul class="list-box">
    <div class="item-goods" v-for="(item,index) in list" :key="index">
      <div class="addres_list">
        <div>
          <span class="span_type" v-if="item.type==1">
            <img src="@/assets/img/work.png" />
          </span>
          <span class="span_type" v-if="item.type==0">
            <img src="@/assets/img/my.png" />
          </span>
        </div>
        <div class="res_list" @click="renturnconfirm(item)">
          <div class="res_div">
            <span class="res_name">{{item.recipientName}}</span>
            <span class="res_phone">{{item.recipientPhone}}</span>
            <span class="span_types" v-if="item.defaultRecipient==1">
              <img src="@/assets/img/mo.png" />
            </span>
          </div>

          <div class="res_ress">{{item.address}}</div>
        </div>
        <button @click="edliter(item)" class="res_edliter">编辑</button>
      </div>
    </div>
  </ul>
</template>

<script>
import { Grid, GridItem, Image as VanImage, Tag, Col, Row } from "vant";
export default {
  name: "MyaddList",
  data() {
    return {};
  },
  props: ["list", "finished", "fromUrl"],
  components: {
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [VanImage.name]: VanImage,
    [Tag.name]: Tag,
    [Col.name]: Col,
    [Row.name]: Row,
  },
  created() {
    console.log(this.fromUrl, "vfromUrl");
    if (this.fromUrl == 1) {
      localStorage.setItem("fromUrl", this.fromUrl);
    }
  },
  methods: {
    renturnconfirm(val) {
      if (localStorage.getItem("fromUrl") == 1) {
        localStorage.removeItem("fromUrl");
        this.$router.push({
          name: "ConfirmOrder",
          query: { address: val },
        });
      }
    },
    edliter(val) {
      this.$router.push({
        name: "EaditerAddlist",
        query: { id: val.id },
      });
    },
  },
};
</script>

<style scoped lang="less">
.list-box {
  display: block;
  flex-wrap: wrap;
  min-height: 100%;
  // width: 375px;
  background: #f8f8f8;
  padding: 16px 0 0 0;
  font-size: 14px;
  box-sizing: border-box;
  margin-bottom: 50px;
  .item-goods {
    width: 350px;
    margin: 0 10px 16px 10px;
    font-size: 14px;
    background: #f8f8f8;
    border-bottom: 1px solid #e4e4e7;
    // height: 50px;
    .addres_list {
      margin-bottom: 16px;
      display: flex;
      .res_list {
        margin-left: 5px;
        width: 270px;
        .res_div {
          height: 20px;
          line-height: 20px;
          display: flex;
          .res_name {
            color: #333333;
            font-weight: 550;
            font-size: 18px;
          }
          .res_phone {
            color: #979797;
            font-size: 12px;
            font-weight: 400;
            margin-left: 16px;
          }
        }
        .res_ress {
          margin-top: 8px;
          color: #333333;
          font-size: 12px;
          font-weight: 500;
        }
        .span_types {
          width: 15px;
          height: 10px;
          line-height: 10px;
          font-size: 10px !important;
          margin: 0 5px; 
          margin-left: 16px;
          // background: #f00;
          color: #fff;
          img {
            margin-top: 2px;
            width: 30px;
          }
          // border: 1px solid #f00;
          // border-radius: 4px;
        }
      }
      .res_edliter {
        // margin-top: 2px;
        // padding-top: 2px;
        color: #fc7210;
        font-size: 10px !important;
        width: 30px;
        font-weight: bold;
        background: #fff;
        height: 18px;
        line-height: 18px;
        text-align: center;
        border-radius: 4px;
        border: 1px solid #fc7210;
      }
    }
    .span_type {
      font-size: 10px;
      margin: 2px 2px;
      img {
        width: 30px;
        margin-top: 2px;
      }
      // background: #f00;
      // color: #fff;
      // border: 1px solid #f00;
      // border-radius: 4px;
    }
  }
 .item-goods:last-child{
   border: none;
 }
  font-size: 16px;
}
</style>