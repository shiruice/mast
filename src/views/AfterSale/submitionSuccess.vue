<template>
  <div class="submition-success">
    <div class="icon">
      <Icon size="80" name="success" color="#1BBF97" />
      <span>提交成功</span>
      <p>
        服务人员将尽快审核<br />
        详情请查看<i @click="jumpTo">&nbsp;售后记录</i>
      </p>
    </div>
  </div>
</template>

<script>
import { Image as VanImage, Icon } from "vant";

export default {
  name: "submitionSuccess",
  data() {
    return {};
  },
  components: {
    Icon,
    [VanImage.name]: VanImage,
  },
  mounted() {},
  methods: {
    jumpTo() {
      this.$router.push({
        name: "afterSale",
        query: {
          tabType: 1,
        },
      });
    },
  },
  beforeCreate() {
    this.$store.commit("changefoot", false);
  },
};
</script>

<style scoped lang="less">
.submition-success {
  background: #fff;
  height: 100%;
  overflow: hidden;
  .icon {
    margin-top: 100px;
    width: 100%;
    text-align: center;
    span {
      font-size: 14px;
      color: #999;
      display: block;
      margin-top: -40px;
    }
    p {
      margin-top: 20px;
      font-size: 14px;
      color: #333;
      line-height: 25px;
      i {
        font-size: 13px;
        color: #1bbf97;
      }
    }
    .van-icon-success::before {
      width: 100%;
    }
  }
}
</style>