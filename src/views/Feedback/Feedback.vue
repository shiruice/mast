<template>
  <div class="Feedback">
    <inputTop :type="3"></inputTop>
    <div class="title">反馈问题类型</div>
    <div class="titlecontent">
      <div @click="typeschange('SKU_SHELVES_DEMAND')" :class="types=='SKU_SHELVES_DEMAND'? 'active_1' : 'type_1'">商品上架需求</div>
      <div @click="typeschange('EXPERIENCE_MATTERS')" :class="types=='EXPERIENCE_MATTERS'? 'active_2' : 'type_2'">体验问题</div>
      <div @click="typeschange('FEATURE_SUGGESTIONS')" :class="types=='FEATURE_SUGGESTIONS'? 'active_3' : 'type_3'">功能建议</div>
      <div @click="typeschange('OTHER')" :class="types=='OTHER'? 'active_4' : 'type_4'">其他</div>
    </div>
    <div class="clear"></div>
    <div class="textcontent">
      <van-field
        v-model="message"
        type="textarea"
        maxlength="500"
        rows="6"
        placeholder="请写下您的建议"
        show-word-limit/>
    </div>
    <div class="Feedbackimg">
      <van-uploader 
      v-model="fileList"
      :max-count="12" 
      :preview-size="60"
      :after-read="afterRead"  :before-read="beforeRead"
      multiple>
      <img class="imgPreview" src="@/assets/img/feedbackimg.png" />
      </van-uploader>
    </div>
    <div class="Feedbackphone">
      <van-field @blur="check_phone(tel)" v-model="tel" type="tel" label="联系方式：" placeholder="请输入您的手机号，便于沟通确认"/>
    </div>
    <div class="clicksublimt" @click="sublimtmessage()">提交</div>
  </div>
</template>

<script>
import { Icon, Search, Button,Field,Uploader,Toast } from "vant";
import inputTop from "@/components/topTitle";
import axios from 'axios'
import {
  getFunction,
  postFunction,
  putFunction,
  deleteFunction,
} from "@/utils/request";
export default {
  name: "Feedback",

  data() {
    return {
      types:"SKU_SHELVES_DEMAND",
      message:"",
      fileList:[],
      fileList2:[],
      pushimg:[],
      tel:null,
      url: {
        feedback: `/api/file-service/file/upload?type=Sku`,
        feedbacksublime: `/api/shoppe-api-service/mobile/feedback/problem/`,
      },
    };
  },

  components: {
    [Icon.name]: Icon,
    [Search.name]: Search,
    [Button.name]: Button,
    [Field.name]: Field,
    [Uploader.name]: Uploader,
    [Toast.name]: Toast,
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
  activated() {
  },
  methods: {
    typeschange(val){
      this.types=val
    },
    afterRead (file) {
    // this.uploadImg(file.file)
    console.log(file,'wew')
    if(Array.isArray(file)){
      file.map(item=>{
        this.uploadImg(item.file,)
      })
    }else{
      this.uploadImg(file.file)
    }
},
beforeRead (file) {
    // if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
    //     Toast('请上传 jpg/png 格式图片');
    //          return false;
    // }
    // let isLt1M = file.size / 1024 / 1024 <= 1
    // if (!isLt1M) {
    //      Toast('图片大小1M以内');
    //      return false
    // }
    return true;
},
/**
 * 上传图片
*/
uploadImg (file) {
  console.log(file,'wew')
	// 创建form对象
    let formdata1 = new FormData();
    // 通过append向form对象添加数据,可以通过append继续添加数据
    //或formdata1.append('file',file);
    formdata1.append('fileName', file, file.name);
    //设置请求头
    let config = {
         headers:
         { Authorization: "Bearer " + this.$auth.token }
    };  
    //this.axios 是因为在main.js写在vue实例里
    const axiosAjax = axios.create({
         timeout: 1000 * 60, //时间
         withCredentials: true //跨域携带cookie
    });
    console.log(formdata1,'formdata1formdata1')
    let apiHost=this.url.feedback;
    if(this.$auth.os.lxapp ){
    apiHost = process.env.VUE_APP_BASE_API+this.url.feedback,formdata1
    }else{
    apiHost = this.url.feedback;

    }
    axiosAjax.post(apiHost,formdata1,config).then((res)=>{   
      //这里的url为后端接口
        console.log(res.data,res.data.data.path,"9999v");
        this.pushimg.push(res.data.data.path)
        this.fileList2.push(file)
        //res 为接口返回值
    }).catch(() => {
      console.log(file,this.fileList,'filefilefilefile')
      let list =this.fileList
      let newarr=[]
      list.map((item,index)=>{
        if(item.file!=file){
          newarr.push(item)
        }
      })
      this.fileList=newarr
    })
},
// uploadImg (file) {
//   console.log(file,'wew')
// 	// 创建form对象
//     let formdata1 = new FormData();
//     // 通过append向form对象添加数据,可以通过append继续添加数据
//     //或formdata1.append('file',file);
//     formdata1.append('fileName', file, file.name);
//     //设置请求头
//     let config = {
//          headers:
//          { Authorization: "Bearer " + this.$auth.token }
//     };  
//     //this.axios 是因为在main.js写在vue实例里
//     const axiosAjax = axios.create({
//          timeout: 1000 * 60, //时间
//          withCredentials: true //跨域携带cookie
//     });
//     console.log(formdata1,'formdata1formdata1')
//     axiosAjax.post(this.url.feedback,formdata1,config).then((res)=>{   //这里的url为后端接口
//         console.log(res.data);
//         //res 为接口返回值
//     }).catch(() => {})
// },
check_phone(val) {
      if (!/^1[3456789]\d{9}$/.test(val)) {
        Toast("电话格式有误");
      }
    },
    sublimtmessage(){
      if (!/^1[3456789]\d{9}$/.test(this.tel)) {
        Toast("电话格式有误");
      }else{
      //接口
      // console.log("111",this.types,this.fileList,this.message,this.tel,this.pushimg)
      console.log("111",this.fileList,this.pushimg,this.fileList2)
      let newarry=[]
      this.fileList2.map((item,index)=>{
        this.fileList.map(val=>{
          if(item==val.file){
            newarry.push(this.pushimg[index])
          }
        })
      })
      console.log(newarry)
      let data={
        memo:this.message,
        phone:this.tel,
        type:this.types,
        pics:newarry
      }
      postFunction(this.url.feedbacksublime, data).then(
        (res) => {
          if (res.code == "000000") {
            console.log("sucess")
            Toast.success("已成功提交");
            this.$router.push({
        name: "User",
      });
          }
        }
      );
    }
    }
  },

  beforeCreate() {
    this.$store.commit("changefoot", false);
  },
};
</script>
<style scoped lang='less'>
.clear{
  clear: both;
}
.Feedback {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  .title{
    width: auto;
    height: 14px;
    font-size: 14px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: #333333;
    line-height: 14px;
    margin-top: 16px;
    margin-left: 12px;
  }
  .titlecontent{
    // margin-left: 3px;
    margin-top: 16px;
  }
  .type_1{
    width: 103px;
    height: 29px;
    background: #EDEDED;
    border-radius: 14px;
    margin-left: 12px;
    float: left;
    text-align: center;
    line-height: 29px;
    color: #979797;
  }
  .type_2{
    width: 77px;
    height: 29px;
    background: #EDEDED;
    border-radius: 14px;
    margin-left: 14.5px;
    float: left;
    text-align: center;
    line-height: 29px;
    color: #979797;
  }
  .type_3{
    width: 77px;
    height: 29px;
    background: #EDEDED;
    border-radius: 14px;
    margin-left: 14px;
    float: left;
    text-align: center;
    line-height: 29px;
    color: #979797;
  }
  .type_4{
    width: 51px;
    height: 29px;
    background: #EDEDED;
    border-radius: 14px;
    margin-left: 14.5px;
    float: left;
    text-align: center;
    line-height: 29px;
    color: #979797;
  }
  .active_1{
    background: rgba(27, 191, 151, 0.15);
    width: 103px;
    height: 29px;
    border-radius: 14px;
    margin-left: 12px;
    float: left;
    text-align: center;
    line-height: 29px;
    color: #1BBF97;
  }
  .active_2{
    background: rgba(27, 191, 151, 0.15);
    width: 77px;
    height: 29px;
    border-radius: 14px;
    margin-left: 14.5px;
    float: left;
    text-align: center;
    line-height: 29px;
    color: #1BBF97;
  }
  .active_3{
    background: rgba(27, 191, 151, 0.15);
    width: 77px;
    height: 29px;
    border-radius: 14px;
    margin-left: 14px;
    float: left;
    text-align: center;
    line-height: 29px;
    color: #1BBF97;
  }
  .active_4{
    background: rgba(27, 191, 151, 0.15);
    width: 51px;
    height: 29px;
    border-radius: 14px;
    margin-left: 14.5px;
    float: left;
    text-align: center;
    line-height: 29px;
    color: #1BBF97;
  }
  // .type_1{
  //   width: 81px;
  //   height: 28px;
  //   background: #EDEDED;
  //   border-radius: 14px;
  //   margin-left: 9px;
  //   float: left;
  //   text-align: center;
  //   line-height: 28px;
  //   color: #979797;
  // }
  // .active{   
  //   background: rgba(27, 191, 151, 0.15);
  //   width: 81px;
  //   height: 28px;
  //   border-radius: 14px;
  //   margin-left: 9px;
  //   float: left;
  //   text-align: center;
  //   line-height: 28px;
  //   color: #1BBF97;
  // }
  .textcontent{
    width: 351px;
    height: 165px;
    background: #EDEDED;
    border-radius: 8px;
    margin-left: 12px;
    margin-top: 12px;
    font-size: 13px;
    // .img{
    //   // border:1px solid red;
    //   width: 42px;
    //   height: 42px;
    //   margin-left: 16px;
    //   position: relative;
    //   margin-top: -45px;
    //   border-radius: 8px;
    //   touch-action: none;
    // }
  }
  .Feedbackphone{
    margin-top: 4px;
    width: 351px;
    height: 45px;
    background: #EDEDED;
    border-radius: 8px;
    margin-left: 12px;
    margin-right: 12px;
  }
  .clicksublimt{
    width: 302px;
    height: 37px;
    background: linear-gradient(180deg, #3AE1C8 0%, #1BBF97 100%);
    border-radius: 22.5px;
    position: fixed;
    bottom:13.5px;
    left:36.5px;
    text-align: center;
    line-height: 37px;
    font-size: 18px;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: #FFFFFF;
  }
}
</style>
<style lang='less'>
.textcontent{
  .van-cell{
    border-radius: 8px;
  }
.van-field{
      background-color: #EDEDED;
    }
    .van-field__body{
      height: 100px;
      //  border:1px solid red; 
    }
    .van-field--min-height .van-field__control{
      height: 100px;
    }
    .van-field__word-limit{
      margin-top: 30px;
    }
    .van-cell .van-field .van-field--min-height{
      padding: 10px 12px;
    }
}
.Feedbackimg{
  .van-uploader{
    // border:1px solid red;
    margin-left: 12px;
    margin-top: 12px;
    width: 351px;
    height: auto;
    .van-uploader__input-wrapper{
    width: 40px;
    height: 40px;
    margin-right: 0px;
    border-radius: 8px;
    // border: 1px solid #333333;
    position:absolute;
    left: 15px;
    top: -65px;
    width: 42px !important;
    height: 42px !important;
    }
    .imgPreview{
      width: 40px;
    height: 40px;
    }
  }
  .van-uploader__upload{
    // margin-left: 9px;
    margin-right: 0px;
    border-radius: 8px;
    border: 1px solid #333333;
    position:absolute;
    left: 15px;
    top: -65px;
    width: 42px !important;
    height: 42px !important;
  }
  .van-uploader__preview{
    margin-left: 20px;
    margin-right: 0px;
    border-radius: 8px;
    border: 1px solid #333333;
  }
}
.Feedbackphone{
  .van-field{
    background: #EDEDED;
    border-radius: 8px;
  }
  .van-cell{
    padding:10px 12px;
  }
  .van-cell__title .van-field__label{
    font-size: 13px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: #979797;
    width: 70px;
  }
}
</style>
