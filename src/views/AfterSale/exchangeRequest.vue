<template>
  <div class="return-request">
    <div>
      <inputTop :type="3"></inputTop>
    </div>
    <div class="detaill_body"></div>
  </div>
</template>

<script>
import { Cell, Image as VanImage } from "vant";
import inputTop from "@/components/topTitle";

export default {
  name: "ReturnRequest",
  data() {
    return {
      goodsInfo: {},
      detailList: {},
      apiHost: this.$auth.os.lxapp
        ? process.env.VUE_APP_BASE_API
        : location.origin.indexOf("localhost") > -1
        ? "https://shoppemobiletest2.66123123.com"
        : location.origin,
    };
  },
  components: {
    Cell,
    inputTop,
    [VanImage.name]: VanImage,
  },
  mounted() {},
  methods: {},
  beforeCreate() {
    this.$store.commit("changefoot", false);
  },
};
</script>

<style scoped lang="less">
.return-request {
  background: #f8f8f8;
}
</style>