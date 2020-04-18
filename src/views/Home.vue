<template>
  <div>
    <el-container>
      <el-header style="height:80px;">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
          @select="menuSelect"
        >
          <el-menu-item index="1" route="/addGoods">
            <template slot="title">
              <div>
                <i
                  class="el-icon-platform-eleme"
                  style="font-size: 45px;margin-top: 10px;margin-right: 20px;"
                ></i>
              </div>
              <span>点餐</span>
            </template>
          </el-menu-item>
          <el-menu-item index="2" route="/orderList">
            <template slot="title">
              <div>
                <i
                  class="el-icon-s-order"
                  style="font-size: 45px;margin-top: 10px;margin-right: 20px;"
                ></i>
              </div>
              <span>挂单</span>
            </template>
          </el-menu-item>
          <el-menu-item index="3" route="/customer">
            <template slot="title">
              <div>
                <i
                  class="el-icon-user-solid"
                  style="font-size: 45px;margin-top: 10px;margin-right: 20px;"
                ></i>
              </div>
              <span>会员管理</span>
            </template>
          </el-menu-item>
          <el-menu-item index="4" route="/goodsList">
            <template slot="title">
              <div>
                <i
                  class="el-icon-s-goods"
                  style="font-size: 45px;margin-top: 10px;margin-right: 20px;"
                ></i>
              </div>
              <span>商品管理</span>
            </template>
          </el-menu-item>
          <el-menu-item index="5" route="/orderReport">
            <template slot="title">
              <div>
                <i
                  class="el-icon-menu"
                  style="font-size: 45px;margin-top: 10px;margin-right: 20px;"
                ></i>
              </div>
              <span>收入明细</span>
            </template>
          </el-menu-item>
          <el-menu-item index="6" route="/deskList">
            <template slot="title">
              <div>
                <i
                  class="el-icon-s-tools"
                  style="font-size: 45px;margin-top: 10px;margin-right: 20px;"
                ></i>
              </div>
              <span>餐桌配置</span>
            </template>
          </el-menu-item>
          <el-menu-item index="7" route="/payReport">
            <template slot="title">
              <div>
                <i
                  class="el-icon-s-shop"
                  style="font-size: 45px;margin-top: 10px;margin-right: 20px;"
                ></i>
              </div>
              <span>支出明细</span>
            </template>
          </el-menu-item>
          <el-menu-item index="8" route="/summaryReport">
            <template slot="title">
              <div>
                <i
                  class="el-icon-s-data"
                  style="font-size: 45px;margin-top: 10px;margin-right: 20px;"
                ></i>
              </div>
              <span>汇总统计</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-header>

      <el-main>
        <!-- <keep-alive> -->
        <router-view style="margin:0px"></router-view>
        <!-- </keep-alive> -->
      </el-main>
    </el-container>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-header {
  padding: 0 0px;
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

/* .el-main {
  text-align: center;
} */

.el-menu--horizontal > .el-menu-item {
  height: 81px;
  line-height: 20px;
  font-size: 16px;
  width: 110px;
}
</style>
<script>
export default {
  name: "home",
  data: function() {
    return {
      activeIndex: "1"
    };
  },
  mounted() {
    this.$router.push({ path: "/home" });
  },
  methods: {
    menuSelect: function(index, indexPath) {
      this.activeIndex = index;
      this.$router.push({ path: indexPath });
    }
  }
};
</script>


