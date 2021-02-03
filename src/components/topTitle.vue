<template>
  <div class="inpueAffix_top">
    <div class="Affix_top">
      <div class="topTitle">
        <!-- 获取焦点触发 -->
        <div class="top_title001" v-if="type == 0">
          <div class="title_left" @click="goBack">
            <img src="@/assets/img/goBack.png" class="icon-img" />
          </div>
          <div class="search-box">
            <div class="input-search-icon">
              <input
                v-model="title"
                class="van-search-input"
                @focus="getFocus"
                @blur="onSearch(title)"
                :placeholder="placeholder"
                @keyup.enter="onSearch(title)"
              />
              <img src="@/assets/img/big_b.png" class="icon-img" />
            </div>
            <div class="search-button">搜索</div>
            <!-- @click="onSearch" -->
          </div>
        </div>
        <!-- 初始化获取焦点 -->
        <div class="top_title001" v-if="type == 1">
          <div class="title_left" @click="goBack">
            <img src="@/assets/img/goBack.png" class="icon-img" />
          </div>
          <div class="search-box">
            <div class="input-search-icon">
              <input
                v-model="title"
                v-focus="true"
                class="van-search-input"
                :placeholder="placeholder"
                @change="sonclick(title)"
                @keyup.enter="onSearch"
              />
              <img src="@/assets/img/big_b.png" class="icon-img" />
            </div>
            <div class="search-button" @click="onSearch(title)">搜索</div>
          </div>
        </div>

        <!-- 内容不为空时出现清除返回 -->
        <div class="top_title002" v-if="type == 2">
          <div class="title_left" @click="goBack">
            <img src="@/assets/img/goBack.png" class="icon-img" />
          </div>
          <div class="search-box">
            <div class="input-search-icon">
              <input
                v-model="title"
                class="van-search-input"
                :placeholder="placeholder"
                @focus="getFocus"
                @keyup.enter="onSearch"
              />
              <img src="@/assets/img/big_b.png" class="icon-img" />
              <img
                src="@/assets/img/return.png"
                class="icon-imgRight"
                v-if="title"
                @click="goOrder"
              />
            </div>
            <!-- <div class="search-button" @click="onSearch">搜索</div> -->
          </div>
        </div>

        <!-- 显示title -->
        <div class="top_title003" v-if="type == 3">
          <div class="title_left" @click="goBack">
            <img src="@/assets/img/goBack.png" class="icon-img" />
          </div>
          <div class="search-box">
            <div class="input-search-icon">{{ topTitle }}</div>
          </div>
        </div>

        <!-- 显示title 删除按钮-->
        <div class="top_title004" v-if="type == 4">
          <div class="title_left" @click="goBack">
            <img src="@/assets/img/goBack.png" class="icon-img" />
          </div>
          <div class="search-box">
            <div class="input-search-icon">{{ topTitle }}</div>
            <div
              class="search-button"
              @click="deteleList"
              v-if="!switchChecked"
            >
              <img src="@/assets/img/delete.png" />
            </div>
            <div class="search-button" v-else></div>
          </div>
        </div>

        <!-- 显示title 添加按钮-->
        <div class="top_title004" v-if="type == 5">
          <div class="title_left" @click="goBack">
            <img src="@/assets/img/goBack.png" class="icon-img" />
          </div>
          <div class="search-box">
            <div class="input-search-icon">{{ topTitle }}</div>
            <div class="search-button" @click="addList">
              <img src="@/assets/img/plus.png" />
            </div>
          </div>
        </div>

        <!--购物车 内容不为空时出现清除返回 -->
        <div class="top_title005" v-if="type == 6">
          <div class="title_left" @click="goBack">
            <img src="@/assets/img/goBack.png" class="icon-img" />
          </div>
          <div class="search-box">
            <div class="input-search-icon">
              <input
                v-model="title"
                class="van-search-input"
                :placeholder="placeholder"
                @focus="getFocus"
                @keyup.enter="onSearch"
              />
              <img src="@/assets/img/big_b.png" class="icon-img" />
              <img
                src="@/assets/img/return.png"
                class="icon-imgRight"
                v-if="title"
                @click="goOrder"
              />
            </div>
            <van-icon id="badges" :badge="badge" @click="gointocart">
              <img class="search-img" src="@/assets/img/car_mini.png" alt />
            </van-icon>
          </div>
        </div>
        <!--购物车 title  -->
        <div class="top_title003" v-if="type == 7">
          <div class="title_left" @click="goBack">
            <img src="@/assets/img/goBack.png" class="icon-img" />
          </div>
          <div class="search-box">
            <div class="input-search-icon">{{ topTitle }}</div>
            <van-icon id="badges" :badge="badge" @click="gointocart">
              <img class="search-img" src="@/assets/img/car_mini.png" alt />
            </van-icon>
          </div>
        </div>
        <!-- 初始化获取焦点 -->
        <div class="top_title008" v-if="type == 8">
          <div class="title_left" @click="goBack">
            <img src="@/assets/img/goBack.png" class="icon-img" />
          </div>
          <div class="search-box">
            <div class="input-search-icon">
              <input
                v-model="title"
                v-focus="true"
                class="van-search-input"
                :placeholder="placeholder"
                @change="sonclick(title)"
                @keyup.enter="onSearch"
              />
              <img src="@/assets/img/big_b.png" class="icon-img" />
            </div>
            <div class="search-button" @click="onSearch">搜索</div>
          </div>
        </div>
        <!-- 获取焦点触发 -->
        <div class="top_title009" v-if="type == 9">
          <div class="title_left" @click="goBack">
            <img src="@/assets/img/goBack.png" class="icon-img" />
          </div>
          <div class="search-box">
            <div class="input-search-icon">
              <input
                v-model="title"
                class="van-search-input"
                @focus="getFocus"
                :placeholder="placeholder"
                @keyup.enter="onSearch"
              />
              <img src="@/assets/img/big_b.png" class="icon-img" />
            </div>
            <div class="search-button">搜索</div>
            <!-- @click="onSearch" -->
          </div>
        </div>
        <!-- 显示title 收藏商品-->
        <div class="top_title003" v-if="type == 10">
          <div class="title_left" @click="goBack">
            <img src="@/assets/img/goBack.png" class="icon-img" />
          </div>
          <div class="search-box">
            <div class="input-search-icon">{{ topTitle }}</div>
            <div class="search_icon">
              <van-icon>
                <img
                  class="search-img"
                  src="@/assets/img/big_b.png"
                  @click="findSeek"
                  v-if="!tory"
                />
                <img
                  class="search-img"
                  src="@/assets/img/biznu.png"
                  @click="gointobiznu"
                />
              </van-icon>
            </div>
          </div>
        </div>
        <!-- 显示title 收藏商品-->
        <div class="top_title003" v-if="type == 11">
          <div class="title_left" @click="goBack">
            <img src="@/assets/img/goBack.png" class="icon-img" />
          </div>
          <div class="search-box">
            <div class="input-search-icon">{{ topTitle }}</div>
            <div class="search_icon">
              <van-icon>
                <img
                  class="search-img"
                  src="@/assets/img/big_b.png"
                  @click="gointocart"
                  v-if="!tory"
                />
                <img
                  class="search-img"
                  src="@/assets/img/bianzudetele.png"
                  @click="gointobiznu"
                />
              </van-icon>
            </div>
          </div>
        </div>
        <div class="top_title003" v-if="type == 12">
          <div class="title_left" @click="goBack">
            <img src="@/assets/img/goBack.png" class="icon-img" />
          </div>
          <div class="search-box">
            <div class="input-search-icon">{{ titleName }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 

<script>
import { Sticky, Icon } from "vant";
export default {
  name: "topTitle",
  props: {
    type: Number,
    placeholder: String,
    targetUrl: String,
    value: String,
    badge: String,
    switchChecked: Boolean,
    tory: Boolean,
    topTitletest: Boolean,
    topText: String,
    titleName: String,
  },
  data() {
    return {
      title: "",
      topTitle: this.$route.meta.title,
    };
  },
  directives: {
    focus: {
      inserted: function(el, { value }) {
        if (value) {
          el.focus();
        }
      },
    },
  },
  components: {
    [Sticky.name]: Sticky,
    [Icon.name]: Icon,
  },
  created() {
    this.title = this.value;
    if (this.topTitletest) {
      this.topTitle = this.topText;
    }
  },
  watch: {
    value: function(a, b) {
      this.title = a;
    },
    $route: {
      handler: function(route) {},
    },
  },
  methods: {
    gointocart() {
      this.$parent.gointocart();
    },
    goOrder() {
      this.$parent.goOrder();
    },
    onSearch(data) {
      this.$parent.onSearch(data);
    },
    sonclick(val) {
      this.$emit("getson", val);
    },
    goBack() {
      var pathData = JSON.parse(localStorage.getItem("urlPathClass"));
      var path = JSON.parse(localStorage.getItem("urlPath"));
      var pathDataLength = pathData.length;
      var pathLength = path.length - 1;
      path = path.slice(0, pathLength);
      if (!path[pathLength - 1].query) {
        this.$router.push({
          name: path[pathLength - 1].name,
        });
      } else {
        this.$router.push({
          name: path[pathLength - 1].name,
          query: path[pathLength - 1].query,
        });
      }
    },
    getFocus() {
      this.$parent.getFocus();
    },
    findSeek() {
      this.$parent.findSeek();
    },
    deteleList() {
      this.$parent.deteleList();
    },
    addList() {
      this.$parent.addList();
    },
    gointobiznu() {
      this.$parent.gointobiznu();
    },
  },
};
</script>

<style scoped lang='less'>
.inpueAffix_top {
  height: 60px;
  width: 100%;
  .Affix_top {
    top: 0px;
    left: 0px;
    width: 100%;
    position: fixed;
    _position: relative;
    z-index: 99;
    .topTitle {
      //   display: flex;
      background: #f8f8f8;
      width: 375px;
      height: 60px;
      // float: left;
      border-bottom: 1px solid #e4e4e7;
      // margin-bottom: 5px;
      .top_title001 {
        //   margin: 0 auto;
        padding-top: 15px;
        text-align: center;
        // width: 350px;
        // margin-left: 20px;
        margin-bottom: 10px;
        .title_left {
          width: 40px;
          height: 40px;
          line-height: 40px;
          img {
            height: 20px;
          }
        }
        .search-box {
          margin-top: -40px;
          margin-left: 40px;
          width: 330px;
          display: flex;
          justify-content: space-around;
          .input-search-icon {
            width: 330px;
            height: 32px;
            float: right;
            position: relative;
            .van-search-input {
              width: 280px;
              height: 32px;
              border: 2px solid #efefef;
              background: #efefef;
              border-radius: 16px;
              color: #888888;
              display: inline-block;
              position: absolute;
              left: 0;
              top: 0;
              padding-left: 44px;
              font-size: 14px;
              box-sizing: border-box;
            }
            .icon-img {
              width: 15px;
              height: 15px;
              position: absolute;
              left: 12px;
              top: 8px;
            }
            .icon-imgRight {
              width: 15px;
              height: 15px;
              position: absolute;
              right: 12px;
              top: 8px;
            }
          }
          .search-button {
            width: 64px;
            height: 33px;
            font-size: 14px;
            color: #333333;
            line-height: 33px;
            border-radius: 16px;
            // background: linear-gradient(to right, #edcfa2, #d7a269);
            text-align: center;
          }
        }
      }
      .top_title009 {
        //   margin: 0 auto;
        padding-top: 15px;
        text-align: center;
        // width: 350px;
        // margin-left: 20px;
        padding-bottom: 12px;
        background-color: #ffffff;
        .title_left {
          width: 40px;
          height: 40px;
          line-height: 40px;
          img {
            height: 20px;
          }
        }
        .search-box {
          margin-top: -40px;
          margin-left: 40px;
          width: 330px;
          display: flex;
          justify-content: space-around;
          .input-search-icon {
            width: 330px;
            height: 32px;
            float: right;
            position: relative;
            .van-search-input {
              width: 280px;
              height: 32px;
              border: 2px solid #efefef;
              background: #efefef;
              border-radius: 16px;
              display: inline-block;
              position: absolute;
              left: 0;
              top: 0;
              padding-left: 44px;
              font-size: 14px;
              box-sizing: border-box;
            }
            .icon-img {
              width: 15px;
              height: 15px;
              position: absolute;
              left: 12px;
              top: 8px;
            }
            .icon-imgRight {
              width: 15px;
              height: 15px;
              position: absolute;
              right: 12px;
              top: 8px;
            }
          }
          .search-button {
            width: 64px;
            height: 33px;
            font-size: 14px;
            color: #333333;
            line-height: 33px;
            border-radius: 16px;
            // background: linear-gradient(to right, #edcfa2, #d7a269);
            text-align: center;
          }
        }
      }
      .top_title002 {
        //   margin: 0 auto;
        padding-top: 15px;
        text-align: center;
        // width: 350px;
        // margin-left: 20px;
        margin-bottom: 10px;
        .title_left {
          width: 40px;
          height: 40px;
          line-height: 40px;
          img {
            padding-top: -40px;
            height: 20px;
          }
        }
        .search-box {
          margin-top: -40px;
          margin-left: 40px;
          width: 330px;
          display: flex;
          justify-content: space-around;
          .input-search-icon {
            width: 330px;
            height: 32px;
            float: right;
            position: relative;
            .van-search-input {
              width: 330px;
              height: 32px;
              border: 2px solid #ffffff;
              background: #fff;
              border-radius: 16px;
              display: inline-block;
              position: absolute;
              left: 0;
              top: 0;
              padding-left: 44px;
              font-size: 14px;
              box-sizing: border-box;
            }
            .icon-img {
              width: 15px;
              height: 15px;
              position: absolute;
              left: 12px;
              top: 8px;
            }
            .icon-imgRight {
              width: 15px;
              height: 15px;
              position: absolute;
              right: 12px;
              top: 8px;
            }
          }
          .search-button {
            width: 64px;
            height: 33px;
            font-size: 14px;
            color: #333333;
            line-height: 33px;
            border-radius: 16px;
            // background: linear-gradient(to right, #edcfa2, #d7a269);
            text-align: center;
          }
        }
      }
      .top_title003 {
        //   margin: 0 auto;
        padding-top: 15px;
        text-align: center;
        // width: 350px;
        // margin-left: 20px;
        margin-bottom: 10px;
        .title_left {
          width: 40px;
          height: 40px;
          line-height: 40px;
          img {
            padding-top: -40px;
            height: 20px;
          }
        }
        .search-box {
          margin-top: -40px;
          margin-left: 40px;
          width: 300px;
          display: flex;
          justify-content: space-around;
          .input-search-icon {
            width: 300px;
            height: 32px;
            line-height: 32px;
            float: right;
            position: relative;
          }
          .search-button {
            width: 64px;
            height: 33px;
            font-size: 14px;
            color: #333333;
            line-height: 33px;
            border-radius: 16px;
            // background: linear-gradient(to right, #edcfa2, #d7a269);
            text-align: center;
          }

          .van-icon {
            margin-top: 5px;
            margin-right: -20px;
            width: 20px;
            .search-img {
              margin-right: 20px;
              width: 20px;
            }
          }
          .van-info {
            margin-left: 50px;
            float: left;
          }
          .search_icon {
            // display: inline;
            float: right;
            margin-right: -30px;
            .van-icon {
              margin-top: 5px;
              // margin-right: -20px;
              width: 80px;
              .search-img {
                // margin-right: 20px;
                width: 20px;
              }
            }
          }
        }
      }
      .top_title004 {
        //   margin: 0 auto;
        padding-top: 15px;
        text-align: center;
        // width: 350px;
        // margin-left: 20px;
        margin-bottom: 10px;
        .title_left {
          width: 40px;
          height: 40px;
          line-height: 40px;
          img {
            padding-top: -40px;
            height: 20px;
          }
        }
        .search-box {
          margin-top: -40px;
          margin-left: 40px;
          width: 330px;
          display: flex;
          justify-content: space-around;
          .input-search-icon {
            width: 330px;
            height: 32px;
            line-height: 32px;
            float: right;
            margin-left: 20px;
            position: relative;
            .van-search-input {
              width: 330px;
              height: 32px;
              border: 2px solid #ffffff;
              background: #fff;
              border-radius: 16px;
              display: inline-block;
              position: absolute;
              left: 0;
              top: 0;
              padding-left: 44px;
              font-size: 14px;
              box-sizing: border-box;
            }
            .icon-img {
              width: 15px;
              height: 15px;
              position: absolute;
              left: 12px;
              top: 8px;
            }
            .icon-imgRight {
              width: 15px;
              height: 15px;
              position: absolute;
              right: 12px;
              top: 8px;
            }
          }
          .search-button {
            width: 64px;
            height: 33px;
            font-size: 14px;
            color: #333333;
            line-height: 33px;
            border-radius: 16px;
            // background: linear-gradient(to right, #edcfa2, #d7a269);
            text-align: center;
            img {
              height: 20px;
              margin-top: 5px;
            }
          }
        }
      }
      .top_title005 {
        //   margin: 0 auto;
        padding-top: 15px;
        text-align: center;
        // width: 350px;
        // margin-left: 20px;
        margin-bottom: 10px;
        .title_left {
          width: 40px;
          height: 40px;
          line-height: 40px;
          img {
            padding-top: -40px;
            height: 20px;
          }
        }
        .search-img {
          height: 15px;
          width: 15px;
        }
        .van-icon {
          // border:1px solid red;
          margin-left: -50px;
          margin-top: 8px;
          float: left;
        }
        .search-box {
          margin-top: -40px;
          margin-left: 40px;
          width: 330px;
          display: flex;
          justify-content: space-around;
          .input-search-icon {
            width: 330px;
            height: 32px;
            float: right;
            position: relative;
            .van-search-input {
              width: 280px;
              height: 32px;
              border: 2px solid #ffffff;
              background: #fff;
              border-radius: 16px;
              display: inline-block;
              position: absolute;
              left: 0;
              top: 0;
              padding-left: 44px;
              font-size: 14px;
              box-sizing: border-box;
            }
            .icon-img {
              width: 15px;
              height: 15px;
              position: absolute;
              left: 12px;
              top: 8px;
            }
            .icon-imgRight {
              width: 15px;
              height: 15px;
              position: absolute;
              right: 55px;
              top: 8px;
            }
          }
          .search-button {
            width: 64px;
            height: 33px;
            font-size: 14px;
            color: #333333;
            line-height: 33px;
            border-radius: 16px;
            // background: linear-gradient(to right, #edcfa2, #d7a269);
            text-align: center;
          }
        }
      }
      .top_title008 {
        //   margin: 0 auto;
        padding-top: 15px;
        text-align: center;
        // width: 350px;
        // margin-left: 20px;
        padding-bottom: 12px;
        background-color: #fff;
        .title_left {
          width: 40px;
          height: 40px;
          line-height: 40px;
          img {
            height: 20px;
          }
        }
        .search-box {
          margin-top: -40px;
          margin-left: 40px;
          width: 330px;
          display: flex;
          justify-content: space-around;
          .input-search-icon {
            width: 330px;
            height: 32px;
            float: right;
            position: relative;
            .van-search-input {
              width: 280px;
              height: 32px;
              border: 2px solid #ffffff;
              background: #efefef;
              border-radius: 16px;
              display: inline-block;
              position: absolute;
              left: 0;
              top: 0;
              padding-left: 44px;
              font-size: 14px;
              box-sizing: border-box;
            }
            .icon-img {
              width: 15px;
              height: 15px;
              position: absolute;
              left: 12px;
              top: 8px;
            }
            .icon-imgRight {
              width: 15px;
              height: 15px;
              position: absolute;
              right: 12px;
              top: 8px;
            }
          }
          .search-button {
            width: 64px;
            height: 33px;
            font-size: 14px;
            color: #333333;
            line-height: 33px;
            border-radius: 16px;
            // background: linear-gradient(to right, #edcfa2, #d7a269);
            text-align: center;
          }
        }
      }
      .van-search {
        width: 100%;
      }
    }
  }
}
</style>