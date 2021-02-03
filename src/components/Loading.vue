<template>
  <div class="loading" :show="show">
    <van-overlay :show="show">
      <van-loading type="spinner" :show="show" color="#1bbf97" vertical class="loading_ing"  size="40px">加载中...</van-loading>
    </van-overlay>
  </div>
</template>

<script>
import { Loading, Overlay } from "vant";

export default {
  name: "Loading",
  data() {
    return {
      show: this.$store.state.isShow,
    };
  },
  components: {
    [Loading.name]: Loading,
    [Overlay.name]: Overlay,
  },
};
</script>

<style scoped lang="less">
.loading {
  width: 100%;
  height: 100%;
  z-index: 99999;
  opacity: 0.5;

  position: absolute;
  .van-loading__text{
    color: #333333;
    font-size: 20px;
    font-weight: bold;
  }
  .loading_ing {
    // background: #000;
    color: #f00 !important;
    top: 40%;
  }
}
</style>