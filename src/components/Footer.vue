<template>
  <div>
    <van-tabbar
      v-model="tab.active"
      active-color="#333"
      inactive-color="#8E8E93"
    >
      <van-tabbar-item name="home" @click="onChange('/')">
        <template>
          <img
            src="../assets/img/home_y.png"
            class="home-img"
            v-if="tab.active == '/'"
          />
          <img
            src="../assets/img/home_w.png"
            class="home-img"
            v-if="tab.active !== '/'"
          />
          <div :class="tab.active === '/' ? 'home-name' : 'home_name'">
            首页
          </div>
        </template>
      </van-tabbar-item>
      <van-tabbar-item
        name="classify"
        @click="onChange('/librarygoods')"
        v-if="projectId !== 2"
        class="library"
      >
        <template>
          <img
            src="../assets/img/library_w.png"
            class="class-img"
            v-if="tab.active !== '/librarygoods'"
          />
          <img
            src="../assets/img/library_y.png"
            class="class-img"
            v-if="tab.active == '/librarygoods'"
          />
          <div
            :class="tab.active === '/librarygoods' ? 'home-name' : 'home_name'"
          >
            商品库
          </div>
        </template>
      </van-tabbar-item>
      <van-tabbar-item
        name="cart"
        @click="onChange('/cart')"
        id="appCart"
        class="cart"
        :badge="cartnum"
      >
        <template>
          <img
            src="../assets/img/car_w.png"
            class="cart-img"
            v-if="tab.active !== '/cart'"
          />
          <img
            src="../assets/img/car_y.png"
            class="cart-img"
            v-if="tab.active == '/cart'"
          />

          <div :class="tab.active === '/cart' ? 'home-name' : 'home_name'">
            购物车
          </div>
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="user" @click="onChange('/user')">
        <template>
          <img
            src="../assets/img/user_w.png"
            class="user-img"
            v-if="tab.active !== '/user'"
          />
          <img
            src="../assets/img/user_g.png"
            class="user-img"
            v-if="tab.active == '/user'"
          />
          <div :class="tab.active === '/user' ? 'home-name' : 'home_name'">
            我的
          </div>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import { Tabbar, TabbarItem, Icon } from "vant";
import { mapState } from "vuex";
export default {
  name: "navfooter",
  data() {
    return {
      tab: {
        active: null,
        projectId: null,
      },
    };
  },

  computed: {
    ...mapState(["cartnum"]),
  },
  watch: {
    $route(to, from) {
      this.tab.active = this.$route.path;
    },
  },
  created() {
    this.projectId = window.localStorage.getItem("projectId");
  },
  mounted() {
    this.tab.active = this.$route.path;
  },
  updated() {
    this.$set(this.tab, "active", this.$route.path);
  },
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Icon.name]: Icon,
  },
  props: {
    msg: String,
  },
  methods: {
    onChange(val) {
      this.$router.push({ path: val });
    },
  },
};
</script>

<style scope lang='less'>
.van-tabbar {
  background-color: #fff;
  height: 60px;
  box-shadow: 2px 0 0 2px rgba(255, 255, 255, 0.2);
}
.home-img {
  width: 0.25rem;
  height: 0.25rem;
}
.library {
  text-align: center;
}
.class-img {
  width: 0.24rem;
  height: 0.24rem;
}
.cart-img {
  width: 0.235rem;
  height: 0.24rem;
}
.cart {
  text-align: center;
  i {
    font-size: 25px;
  }
  .van-tabbar-item__icon {
    margin-left: 30px;
  }
}
.user-img {
  width: 0.225rem;
  height: 0.24rem;
}
.home-name {
  margin-top: 0.03rem;
  font-size: 0.12rem;
  color: #1bbf97;
  // font-weight: bold;
}
.home_name {
  margin-top: 0.03rem;
  font-size: 0.12rem;
  color: #333;
}
</style>
