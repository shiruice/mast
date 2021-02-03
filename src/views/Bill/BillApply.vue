<template>
  <div class="pushTitle">
    <inputTop :type="3"></inputTop>
    <p style="margin:10px;float: left;">申请开票金额：{{ '¥' + $route.query.money}}</p>
   
    <van-form @submit="onSubmit">
      <van-field name="radio" label="类型：" required>
        <template #input>
          <van-radio-group v-model="radio" direction="horizontal">
            <van-radio name="2" checked-color="#1bbf97">电子发票</van-radio>
            <van-radio name="1" checked-color="#1bbf97">普票</van-radio>
            <van-radio name="0" checked-color="#1bbf97">专票</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
      style="    width: 90%;
    float: left;"
        label="抬头："
        required
        v-model="list.invoiceTitle"
        placeholder="请填写抬头"
        :rules="[{ required: true, message: '请填写抬头' }]"
      />
       <i style="float: left;position: relative;right: 10px;bottom: -15px;font-size: 20px;"   @click="clcikradio"><van-icon name="more-o" /></i>
      <van-field
        label-width="160"
        v-if="radio==0"
        required
        label="统一社会信用代码："
        v-model="list.socialCreditCode"
        placeholder="统一社会信用代码"
        :rules="[{ required: true, message: '统一社会信用代码' }]"
      />
      <van-field
        v-if="radio==2||radio==1"
        label-width="160"
        required
        label="统一社会信用代码："
        v-model="list.socialCreditCode"
        placeholder="统一社会信用代码"
        :rules="[{ required: true, message: '统一社会信用代码' }]"
      />
      <van-field
        v-if="radio==0"
        label="地址："
        required
        v-model="list.addressOnInvoice"
        placeholder="请输入地址"
        :rules="[{ required: true, message: '请输入地址' }]"
      />
      <van-field
        v-if="radio==0"
        label="电话："
        required
        v-model="list.phoneOnInvoice"
        placeholder="请输入电话"
        :rules="[{ required: true, message: '请输入电话' }]"
      />
      <van-field
        v-if="radio==0"
        label="开户行："
        required
        v-model="list.bank"
        placeholder="请输入开户行"
        :rules="[{ required: true, message: '请输入开户行' }]"
      />
      <van-field
        v-if="radio==0"
        label="账号："
        required
        v-model="list.accountNo"
        placeholder="请输入账号"
        :rules="[{ required: true, message: '请输入账号' }]"
      />
      <van-field name="radio1" label="是否需要收据："   v-if="radio==1||radio==0" label-width="160" required>
        <template #input>
          <van-radio-group v-model="list.needReceipt" direction="horizontal">
            <van-radio name= 1 checked-color="#1bbf97">是</van-radio>
            <van-radio name= 0 checked-color="#1bbf97">否</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-if="radio==1||radio==0"
        label="发票寄送联系人："
         label-width="160"
        required
        v-model="list.receiverName"
        placeholder="请输入联系人"
        :rules="[{ required: true, message: '请输入联系人' }]"
      />
      <van-field
       v-if="radio==1||radio==0"
         label-width="160"
        label="发票寄送联系人电话："
        required
        v-model="list.receiverPhone"
        placeholder="请输入联系人电话"
        :rules="[{ required: true, message: '请输入联系人电话' }]"
      />
      <van-field
         v-if="radio==1||radio==0"
         label-width="160"
        label="发票寄送地址："
        required
        @click="show = true"
        v-model="list.address"
        placeholder="请输入地址"
        :rules="[{ required: true, message: '请输入地址' }]"
      />
      <van-field
        v-if="radio==1||radio==0"
         label-width="160"
        label="发票寄送详细地址："
        required
        v-model="list.recipientAddressLine"
        placeholder="请输入详细地址"
        :rules="[{ required: true, message: '请输入详细地址' }]"
      />
       <van-field
        v-if="radio==2"
        label="发票发送邮箱："
        required
        v-model="list.invoiceEmail"
        placeholder="请输入邮箱"
        :rules="[{ required: true, message: '请输入邮箱' }]"
      />
      <van-field
        label="发票备注："
        v-model="list.memoOnInvoice"
        placeholder="请输入发票备注"
      />
      <van-field
      style="margin-bottom: 50px;"
        label="申请备注："
        v-model="list.applicationMemo"
        placeholder="请输入申请备注"
      />
      <van-tabbar>
          <van-button round block type="info" native-type="submit" class="bottombtn">保存</van-button>
      </van-tabbar>
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
    <van-popup
        v-model="invoiceShow"
        position="bottom"
        :style="{ height: '40%' }"
      > 
     <van-picker
        v-if="pageShow"
        show-toolbar
        value-key='invoiceTitle'
        :columns="invoiceColumns"
        :item-height="35"
        @confirm="oninvoiceConfirm"
        @cancel="oninvoiceCancel"
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
  RadioGroup,
  Radio,
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
  name: "PushTitle",
  data() {
    return {
      invoiceShow:false,
      invoiceList:[],
      api: {
        pushAddlist: `/api/shoppe-api-service/moblie/bill/management/create-invoice`,
        invoice: `/api/shoppe-api-service/moblie/invoice/management/invoice-titles-list`,
      },
      areaList: {},
      show: false,
      searchResult: [],
      switchChecked: true,
      pageShow: false, //省市区三级联动是否显示（因为是接口返回的数据，等省市区数据渲染完毕之后，在显示三级联动）
      cityDates: "", //安联当前选中市的所有区所有数据
      showPicker: false,
      invoiceColumns:[
        {
            "accountNo": "string",
            "addressOnInvoice": "string",
            "bank": "string",
            "defaulted": true,
            "id": 0,
            "invoiceTitle": "string",
            "phoneOnInvoice": "string",
            "socialCreditCode": "string",
            "type": 0
          }
      ],
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
      radio: "1",
      invoiceType:"1",
      list: {
        "address": "",
       "accountNo": "",
      "addressOnInvoice": "",
      "applicationMemo": "",
      "bank": "",
      "billId": this.$route.query.id,
      "customerId": 0,
      "invoiceAmount": 0,
      "invoiceDimensions": 0,
      "invoiceEmail": "",
      "invoiceTitle": "",
      "invoiceTitleId": 0,
      "invoiceType": 0,
      "memoOnInvoice": "",
      "needPost": 0,
      "needReceipt": '0',
      "phoneOnInvoice": "",
      "projectId": 0,
      "receiverAddressCityId": 0,
      "receiverAddressCountyId": 0,
      "receiverAddressProvinceId": 0,
      "receiverName": "",
      "receiverPhone": "",
      "recipientAddressLine": "",
      "shopped": true,
      "socialCreditCode": ""
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
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Tabbar.name]: Tabbar,
    inputTop,
  },
    created() {
      this.getType(this.api.invoice);
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
    clcikradio(){
      console.log(this.radio)
      if(this.radio == 0){
 this.invoiceColumns = this.invoiceList.filter(item => item.type == 0)
      }else{
        this.invoiceColumns = this.invoiceList.filter(item => item.type != 0)
      }
  this.invoiceShow = true
    },
    getType(val, unloading) {
      getFunction(val, unloading).then((res) => {
        this.invoiceList = res.data;
        this.isLoading = false;
        this.invoiceColumns = this.invoiceList.filter(item => item.type != 0)
      });
    },
    goBack() {
       this.$router.push({
        name: "BillDetail",
        query: { id: this.$route.query.id },
      })
    },
    onSubmit() {
      var data = this.list;
     
     data.invoiceType=this.radio
      console.log(data);
      postFunction(this.api.pushAddlist, data).then((res) => {
        if (res.code == "000000") {
          Toast.success('申请成功');
          this.$router.push({
            name: "Bill",
            params: { isUpdate: true },
          });
        }
      });
    },
     onSave() {
      Toast("save");
    },
    onDelete() {
      Toast("delete");
    },
    validator(val) {
      console.log(!val);
      var validator = !val;
      return !validator;
    },
    onConfirm(val, a) {
      this.show = false;
      this.list.address = val.map((ite) => ite.text).join("-");
      this.list.provinceId = val[0].code;
      this.list.countyId = val[2].code;
      this.list.cityId = val[1].code;
    },
    oninvoiceConfirm(val, index) {
      console.log(val)
      if(val){
        if(val.type==0){
      this.invoiceShow = false;
      this.list.invoiceTitle=val.invoiceTitle
      this.list.invoiceTitleId=val.id
      this.list.socialCreditCode=val.socialCreditCode
      this.list.addressOnInvoice=val.addressOnInvoice
      this.list.phoneOnInvoice=val.phoneOnInvoice
      this.list.bank=val.bank
      this.list.accountNo=val.accountNo
        }else{
       this.invoiceShow = false;
      this.list.invoiceTitle=val.invoiceTitle
      this.list.invoiceTitleId=val.id
      this.list.socialCreditCode=val.socialCreditCode
      this.list.addressOnInvoice=''
      this.list.phoneOnInvoice=''
      this.list.bank=''
      this.list.accountNo=''
        }

      }
      

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
    oninvoiceCancel() {
      this.invoiceShow = false;
    },
  },
  
  beforeCreate() {
    this.$store.commit("changefoot", false);
  },
};
</script>

<style scoped lang='less'>
.bottombtn{   
    position: fixed;
    width: 300px;
    margin: 0 auto;
    left: 40px;
    border-radius: 50px;
    bottom: 8px;
    background: #1bbf97;
    border-color: #1bbf97}
.pushTitle {
  font-size: 16px;
  height: 100%;
  background: #fff;
  .myAddress_top {
    padding-top: 10px;
    font-size: 17px;
    font-weight: 400;
    height: 30px;
    border-bottom: 1px solid #ccc;
    .toptitle {
      //   margin-top: -20px;
      text-align: center;
    }
  }
  .van-form {
    height: 100%;
  }
  /deep/.van-cell {
    padding: 0;
    // margin: 0 10px;
    height: 50px;
    line-height: 50px;
    .van-cell__title {
      margin-left: 10px;
      span {
        margin-left: 10px;
      }
    }
    .van-field__control--custom {
      margin-top: 5px;
      .van-radio-group {
        margin-top: 10px;
      }
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
    margin-right: 20px;
    .van-switch {
      top: 2px;
      margin-left: 10px;
    }
    .van-switch--on {
      //   width: 50px;
      //   height: 25px;
      background-color: #1bbf97;
    }
  }
  .editer_sub {
    width: 300px;

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
</style>