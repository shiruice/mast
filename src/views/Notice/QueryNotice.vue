<template>
  <div class="QueryNotice">
    <inputTop
      :type="1"
      :value="value"
      :placeholder="'输入公告标题，内容'"
      @getson="times"
    ></inputTop>
  </div>
</template>

<script>
import { Icon, Search, Button } from "vant";
import inputTop from "@/components/topTitle";

export default {
  name: "QueryNotice",

  data() {
    return {
      listData: [],
      value: this.$route.query.search_value ? this.$route.query.search_value : "",
    };
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
  activated() {
    this.value=this.$route.query.search_value ? this.$route.query.search_value : ""
  },
  methods: {
    times(val) {
      console.log(val);
      this.value = val;
    },
    onSearch() {
      console.log("kdsjh",this.value,'sda');
      this.$router.push({
        name: "SearchNoticList",
        query: {search_value:this.value},
      });
    },
  },

  beforeCreate() {
    this.$store.commit("changefoot", false);
  },
};
</script>

<style scoped lang='less'>
.QueryNotice {
  font-size: 14px;
}
</style>