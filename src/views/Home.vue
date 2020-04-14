<template>
  <el-container style="height:100%;">
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
          <!--  <el-menu-item index="4">
            <i class="el-icon-s-tools"></i>
          </el-menu-item>-->
        </el-menu>
      </el-aside>
      <el-main style="padding:5px">
        <router-view style="margin:-20px"></router-view>
      </el-main>
    </el-container>
  </el-container>
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
<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 40px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  /* line-height: 200px; */
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  /* line-height: 160px; */
}

.el-menu-item {
  height: 120px;
  padding-left: 0px;
  line-height: 30px;
  border-bottom: solid 1px #e9eef3;
}
.el-menu-item.is-active {
  color: #409eff;
  background-color: #e9eef3;
}

.el-menu-item [class^="el-icon-"] {
  font-size: 50px;
  margin-right: 25px;
  margin-top: 20px;
}

.el-menu {
  height: 100%;
}
/* body > .el-container {
    margin-bottom: 40px;
  } */

/* .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  } */

/* .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  } */
</style>
<script>
export default {
  name: "home",
  data: function() {
    return {
      userInfo: {
        username: null,
        password: null
      }
    };
  },
  methods: {
    // menuClick: function() {
    //   console.log("aaa");
    // }
  }
};
</script>


