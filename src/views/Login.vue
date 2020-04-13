<template>
  <div class="dafdasf">
    <el-form ref="userInfo" :model="userInfo" label-width="60px" style="margin-top: 60px;">
      <el-form-item label="用户名:">
        <el-input v-model="userInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="密码:" style="margin-bottom: 5px;">
        <el-input v-model="userInfo.name"></el-input>
      </el-form-item>
      <el-form-item  style="margin-top: 5px;margin-left:-45px">
        <template slot="label">
          <span style="position:absolute;left:80px">
            记住用户名
          </span>
        </template>
        <el-switch v-model="userInfo.delivery"></el-switch>
      </el-form-item>
        <el-button type="primary" style="width:100%;margin-top:30vh;font-size:18px" @click="onSubmit" >登&emsp;录</el-button>
        <!-- <el-button>取消</el-button> -->
    </el-form>
  </div>
</template>
.el-form-item {
    margin-bottom: 22px;
}
<script>
export default {
  name: "Login",
  data: function() {
    return {
      userInfo: {
        username: null,
        password: null
      }
    };
  }
};
</script>
