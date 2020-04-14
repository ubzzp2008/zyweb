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
                  class="el-icon-s-goods"
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
          <el-menu-item index="4" route="/report">
            <template slot="title">
              <div>
                <i
                  class="el-icon-s-data"
                  style="font-size: 45px;margin-top: 10px;margin-right: 20px;"
                ></i>
              </div>
              <span>统计</span>
            </template>
          </el-menu-item>
          <el-menu-item index="5" route="/settings">
            <template slot="title">
              <div>
                <i
                  class="el-icon-s-tools"
                  style="font-size: 45px;margin-top: 10px;margin-right: 20px;"
                ></i>
              </div>
              <span>配置管理</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-header>

      <el-main>
        <router-view style="margin:0px"></router-view>
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

.el-main {
  /* background-color: #e9eef3;
  color: #333; */
  text-align: center;
  height: 550px;
}

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
  methods: {
    menuSelect: function() {
     this.$router.push({ path: this.activeIndex });
    }
  }
};
</script>


