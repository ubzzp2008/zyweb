<template>
  <div class="Main">
    <el-container>
      <!-- <el-header style="height:5px;">Header</el-header> -->
      <el-main>
        <el-tabs
          type="border-card"
          tab-position="top"
          style="height: 99%;"
          v-model="activeIndex"
          @tab-click="tabClick"
        >
          <el-tab-pane name="/addGoods">
            <span slot="label">
              <div>
                <i class="el-icon-platform-eleme" style="font-size: 45px;margin: 5px;"></i>
              </div>
              <span>点餐</span>
            </span>
            <router-view />
          </el-tab-pane>
          <el-tab-pane name="/orderList">
            <span slot="label">
              <div>
                <i class="el-icon-s-goods" style="font-size: 45px;margin: 5px;"></i>
              </div>
              <span>挂单</span>
            </span>
            <router-view />
          </el-tab-pane>
          <el-tab-pane name="/customer">
            <span slot="label">
              <div>
                <i class="el-icon-user-solid" style="font-size: 45px;margin: 5px;"></i>
              </div>
              <span>会员管理</span>
            </span>
            <router-view />
          </el-tab-pane>
          <el-tab-pane name="/report">
            <span slot="label">
              <div>
                <i class="el-icon-s-data" style="font-size: 45px;margin: 5px;"></i>
              </div>
              <span>统计</span>
            </span>
            <router-view />
          </el-tab-pane>
          <el-tab-pane name="/settings">
            <span slot="label">
              <div>
                <i class="el-icon-s-tools" style="font-size: 45px;margin: 5px;"></i>
              </div>
              <span>配置管理</span>
            </span>
            <router-view />
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </div>
  <!-- <div>
      <router-view />
  </div>-->

  <!-- <el-container style="height:100%;">
    <el-header style="height:40px;">Header</el-header>
    <el-container>
      <el-aside width="120px">
        <el-menu default-active="2" router class="el-menu-vertical-demo">
          <el-menu-item index="2" route="/customer">
            <div>
              <i class="el-icon-menu"></i>
            </div>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" route="/test">
            <div>
              <i class="el-icon-document"></i>
            </div>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4" route="/settings">
            <div>
              <i class="el-icon-setting"></i>
            </div>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main style="padding:5px">
        <router-view style="margin:-20px"></router-view>
      </el-main>
    </el-container>
  </el-container>-->
  <!-- <div>
    <el-form :model="userInfo" label-width="80px" style="width:30%;margin:0 auto;">
      <el-form-item label="用户名：" prop="username">
        <el-input placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">提交</el-button>
      </el-form-item>
    </el-form>
  </div>-->
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/* .Main {
  height: 100%;
} */
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 40px;
}

/* .el-container {
  height: 100%;
}
 */
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  padding: 0px;
  height: 100%;
}

.el-tabs__item {
  height: 80px;
  line-height: 15px;
  font-size: 15px;
  width: 180px;
}
.el-tabs--left .el-tabs__item.is-left {
  text-align: center;
}
</style>
<script>
export default {
  name: "Main",
  data: function() {
    return {
      activeIndex: "/addGoods"
    };
  },
  methods: {
    tabClick: function() {
      this.$router.push({ path: this.activeIndex });
    }
  }
};
</script>


