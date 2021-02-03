<template>
  <div class="eaditerAddlist">
    <div class="myAddress_top">
      <!-- <van-icon name="arrow-left" @click="goBack" />
      <div class="toptitle">编辑地址</div>
      <span class="top_detlete" @click="deteleList">
        <img src="@/assets/img/delete.png" />
      </span>-->
      <inputTop :type="4" :switchChecked="switchCheck"></inputTop>
    </div>
    <van-form @submit="onSubmit">
      <van-field
        label-align="right"
        v-model="list.recipientName"
        placeholder="请输入用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        label-align="right"
        v-model="list.recipientPhone"
        placeholder="请输入联系电话"
        :rules="[{ required: true, message: '请输入联系电话' }]"
      />
      <van-field
        label-align="right"
        readonly
        clickable
        v-model="list.addressRegion"
        placeholder="请选在所在地区"
        @click="show = true"
        :rules="[{ required: true, message: '请选在所在地区' }]"
      />
      <van-field
        label-align="right"
        placeholder="请输入详细地址"
        v-model="list.addressLine"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <div class="div-switch">
        <span>设为默认地址</span>
        <van-switch v-model="switchChecked" size="12px" />
      </div>
      <div class="editer_div">
        <div class="editer_sub">
          <van-button round block type="info" native-type="submit">保存</van-button>
        </div>
      </div>
    </van-form>

    <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
      <van-picker
        v-if="pageShow"
        show-toolbar
        :columns="columns"
        @cancel="onCancel"
        @confirm="onConfirm"
        @change="onChange"
        :item-height="35"
      />
    </van-popup>
  </div>
</template>

<script>
import {
  Switch,
  Toast,
  Field,
  Cell,
  CellGroup,
  Form,
  Popup,
  Picker,
  Icon,
  Button,
  Dialog,
  Tabbar,
} from "vant";
import inputTop from "@/components/topTitle";
import { getProvince, addressTree } from "@/utils/index";
import {
  getFunction,
  postFunction,
  putFunction,
  deleteFunction,
} from "@/utils/request";
export default {
  name: "EaditerAddlist",
  data() {
    return {
      value: "",
      api: {
        eaditerAddlist: `/api/shoppe-api-service/mobile/address/${this.$route.query.id}/update-pre`,
        upAddlist: `/api/shoppe-api-service/mobile/address/${this.$route.query.id}/update`,
        deteleAddlist: `/api/shoppe-api-service/mobile/address/${this.$route.query.id}/delete`,
      },
      areaList: {},
      show: false,
      searchResult: [],
      switchChecked: true,
      switchCheck: false,
      pageShow: false, //省市区三级联动是否显示（因为是接口返回的数据，等省市区数据渲染完毕之后，在显示三级联动）
      cityDates: "", //安联当前选中市的所有区所有数据
      showPicker: false,
      columns: [
        {
          values: "",
          className: "column1",
        },
        {
          values: "",
          className: "column2",
          defaultIndex: 0,
        },
        {
          values: "",
          className: "column3",
          defaultIndex: 0,
        },
      ],
      data: "",
      list: {
        addressLine: "",
        cityId: null,
        countyId: null,
        defaultRecipient: "",
        fixedPhone: "",
        idCard: "",
        postalCode: "",
        provinceId: null,
        recipientName: "",
        recipientPhone: "",
      },
    };
  },
  components: {
    [Toast.name]: Toast,
    [Switch.name]: Switch,
    [Field.name]: Field,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Form.name]: Form,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Dialog.name]: Dialog,
    [Tabbar.name]: Tabbar,
    inputTop,
  },
  mounted() {},
  created() {
    getFunction(this.api.eaditerAddlist).then((res) => {
      if (res.code == "000000") {
        this.list = res.data;
        if (res.data.defaultRecipient == "0") {
          this.switchChecked = false;
        }
        if (res.data.defaultRecipient == "1") {
          this.switchChecked = true;
        }
      }
    });
    addressTree().then((res) => {
      if (res.code == "000000") {
        this.data = res.data;
        // 默认展示一级的数据
        this.columns[0].values = Object.values(res.data).map(function (e) {
          return { text: e.name, code: e.id };
        });
        // 默认展示二级的数据
        this.columns[1].values = Object.values(res.data[0].childrenDTOs).map(
          function (e) {
            return { text: e.name, code: e.id };
          }
        );
        // 默认展示三级的数据
        this.columns[2].values = Object.values(
          res.data[0].childrenDTOs[0].childrenDTOs
        ).map(function (e) {
          return { text: e.name, code: e.id };
        });
        // 等待dom渲染完毕之后，在去显示 三级联动。
        this.$nextTick(() => {
          this.pageShow = true;
        });
      }
    });
  },
  methods: {
    onSave() {
      Toast("save");
    },
    onDelete() {
      Toast("delete");
    },
    deteleList() {
      Dialog.confirm({
        title: "提示",
        message: "确定删除该条地址？",
        confirmButtonColor: "#1BBF97",
      })
        .then(() => {
          deleteFunction(this.api.deteleAddlist).then((res) => {
            if (res.code == "000000") {
              this.$router.push({
                name: "MyAddress",
                params: { isUpdate: true },
              });
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    validator(val) {
      console.log(!val);
      var validator = !val;
      return !validator;
    },
    goBack() {
      this.$router.push({
        name: "MyAddress",
      });
    },
    onSubmit(values) {
      //   console.log("submit", values);
      this.list.defaultRecipient = this.switchChecked ? "1" : "0";
      putFunction(this.api.upAddlist, this.list).then((res) => {
        if (res.code == "000000") {
          this.$router.push({
            name: "MyAddress",
            params: { isUpdate: true },
          });
          Toast("修改成功");
        }
      });
      console.log(this.list);
    },
    onConfirm(val, a) {
      this.show = false;
      this.list.addressRegion = val.map((ite) => ite.text).join("-");
      this.list.provinceId = val[0].code;
      this.list.countyId = val[2].code;
      this.list.cityId = val[1].code;
    },
    getDefault() {
      addressDetails(this.$store.state.addressId)
        .then((res) => {
          if (res.code == "000000") {
            this.list = res.data;
          }
        })
        .catch((err) => {});
    },
    // 修改市 这里不再多说什么了根据自己的数据格式来
    cityDate(data, province) {
      var that = this;
      data.forEach(function (res) {
        if (res.name == province) {
          //   console.log(res);
          that.cityDates = res;
        }
      });

      return that.cityDates.childrenDTOs.map(function (res) {
        return { text: res.name, code: res.id };
      });
      // return 返回数据格式，因为我需要省市区code，所以我return的格式是对象,例:[{text:'北京市',code:'1'},{text:'河南省',code:'2'},...],如果你不需要code直接这样就可以 例['北京市','河南省',.....]
    },
    // 修改县 这里不再多说什么了根据自己的数据格式来
    county(data, county) {
      var that = this;
      var countyDate = "";
      // 因为vant的 van-picker 回调只会返回你修改的那一列，比如现在为 [北京，北京，东城区]，你修改了省为[天津市，天津市，和平区]，但是vant的change回调会得到[天津市,北京,东城区],后面两个在回调中没有修改，不知道我的渲染方法有问题还是什么问题。
      // 所以我在这里判断change事件触发后，如果你修改了省份的话，回调里面省份会改变，但是市和区还是上一个省份的 市和区，这时我们执行回调修改省，市，区的时候，因为回调只有省改变了，市和区DOM改变了，但是回调里面没改变的问题（不晓得什么问题）,这时我们去找省下面的 市，我们取回调的市名称，如果在省下面没有找到这个市，默认展示第一个市，区也默认展示第一个市下面的区，如果遍历市能查到，就去展示对应的市。
      that.cityDates.childrenDTOs.forEach(function (res) {
        if (res.name == county) {
          countyDate = res;
        }
      });
      // 这里如果没有找到对应的县
      if (countyDate == "") {
        countyDate = that.cityDates.childrenDTOs[0];
      }
      // return 县
      return countyDate.childrenDTOs.map(function (res) {
        return { text: res.name, code: res.id };
      });

      // return 返回数据格式，因为我需要省市区code，所以我return的格式是对象,例:[{text:'北京市',code:'1'},{text:'河南省',code:'2'},...],如果你不需要code直接这样就可以 例['北京市','河南省',.....]
    },
    onChange(picker, values, index) {
      // 这里我有可能渲染的有问题，导致回调每次都修改了当前列，其他值没有修改，当前列？？（当前列什么鬼呀，什么垃圾啊？？？） 解释一下 ↓↓
      // 因为vant的 van-picker 回调只会返回你修改的那一列，比如现在为 [北京，北京，东城区]，你修改了省为[天津市，天津市，和平区]，但是vant的change回调会得到[天津市,北京,东城区],后面两个在回调中没有修改，不知道我的渲染方法有问题还是什么问题。
      // 所以我在这里判断change事件触发后，如果你修改了省份的话，回调里面省份会改变，但是市和区还是上一个省份的 市和区，这时我们执行回调修改省，市，区的时候，因为回调只有省改变了，市和区DOM改变了，但是回调里面没改变的问题（不晓得什么问题）,这时我们去找省下面的 市，我们取回调的市名称，如果在省下面没有找到这个市，默认展示第一个市，区也默认展示第一个市下面的区，如果遍历市能查到，就去展示对应的市。
      // 回调时修改第2列数据
      picker.setColumnValues(1, this.cityDate(this.data, values[0].text));
      // 回调时修改第3列数据
      picker.setColumnValues(2, this.county(this.data, values[1].text));
    },
    onCancel() {
      this.show = false;
    },
  },
  beforeCreate() {
    this.$store.commit("changefoot", false);
  },
};
</script>

<style scoped lang="less">
.eaditerAddlist {
  font-size: 14px;
  height: 100%;
  width: 375px;
  background: #fff;
  .myAddress_top {
    // padding-top: 10px;
    font-size: 17px;
    font-weight: 400;
    // height: 30px;
    // border-bottom: 1px solid #ccc;
    .toptitle {
      margin-top: -20px;
      text-align: center;
    }
    .top_detlete {
      float: right;
      margin-top: -20px;
      width: 30px;
      img {
        width: 21px;
      }
    }
  }

  /deep/.van-cell {
    width: 350px;
    padding: 0;
    height: 50px;
    line-height: 50px;
    .van-field__control {
      padding-left: 15px;
    }
    .van-field__control--custom {
      margin-top: 5px;
      .van-switch--on {
        background: #1bbf97 !important;
      }
    }

    input:-internal-autofill-selected {
      transition: background-color 5000s ease-in-out 0s !important;
    }
    .van-field__error-message {
      display: none;
    }
  }
  /deep/.van-hairline--top-bottom {
    .van-picker__cancel,
    .van-picker__confirm {
      color: #1bbf97;
    }
  }
  .div-switch {
    float: right;
    width: 150px;
    height: 30px;
    line-height: 30px;
    padding-right: -18px;
    .van-switch {
      margin-left: 10px;
      top: 2px;
    }
    .van-switch--on {
      //   width: 50px;
      //   height: 25px;
      background-color: #1bbf97;
    }
  }
  .editer_div {
    bottom: 30px;
    left: 0px;
    // width: 100%;
    position: fixed;
    _position: relative;
    z-index: 99;

    .editer_sub {
      width: 300px;

      // margin: 0 auto;
      margin-bottom: -20px;
      margin-left: 40px;
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




