<template>
  <!--系统管理/菜单管理 -->
  <div class="Customer">
    <el-row>
      <el-row>
        <el-form :inline="true" :model="oUserList">
          <el-form-item label="会员姓名">
            <el-input
              v-model.trim="oUserList.userName"
              placeholder
              clearable
              @keyup.enter.native="fGetUserList"
            ></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input
              v-model.trim="oUserList.phone"
              placeholder
              clearable
              @keyup.enter.native="fGetUserList"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="fGetUserList">查询</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <!-- 操作按钮 -->
      <el-row style="margin-bottom:5px">
        <el-button type="primary" size="small" style="float:left" @click="add">新增</el-button>
        <el-button type="warning" size="small" style="float:left" @click="edit">编辑</el-button>
        <el-button type="danger" size="small" style="float:left" @click="deletes">删除</el-button>
      </el-row>
      <el-table
        :data="customerList"
        border
        style="width: 100%;"
        max-height="560"
        ref="clickTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="userName" label="会员姓名" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column prop="phone" label="手机号" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          :formatter="formatter"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column prop="birthday" label="生日" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="addDate" label="创建日期" align="center" :show-overflow-tooltip="true"></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[20, 30, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <!-- </el-card> -->
    </el-row>
    <!-- 新增 -->
    <el-dialog
      title="新增会员"
      :visible.sync="addVisible"
      width="60%"
      top="5vh"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="cancelModal('ruleForm')"
      v-dialogDrag
    >
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="120px">
        <el-form-item label="会员姓名:" prop="userName">
          <el-input v-model="ruleForm.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号:" prop="phone">
          <el-input v-model="ruleForm.phone" maxlength="11" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别:" prop="sex">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio label="1">先生</el-radio>
            <el-radio label="0">女士</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期:" prop="birthday">
          <el-date-picker
            v-model="ruleForm.birthday"
            value-format="yyyy-MM-dd"
            type="date"
            style="width:100%"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelModal('ruleForm')" size="small">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')" size="small">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑 -->
    <el-dialog
      title="编辑"
      :visible.sync="editVisible"
      width="60%"
      top="5vh"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="cancelModal('editForm')"
      v-dialogDrag
    >
      <el-form :model="editForm" ref="editForm" :rules="rules" label-width="120px">
        <el-form-item label="会员姓名:">
          <el-input v-model="editForm.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号:">
          <el-input v-model="editForm.phone" maxlength="11" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="sex:" prop="realName">
          <el-radio-group v-model="editForm.sex">
            <el-radio label="1">先生</el-radio>
            <el-radio label="0">女士</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="生日:" prop="birthday">
          <el-date-picker
            type="date"
            value-format="yyyy-MM-dd"
            v-model="editForm.birthday"
            style="width:100%"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelModal('editForm')" size="small">取 消</el-button>
        <el-button type="primary" @click="fEditsubmit('editForm')" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Customer",
  data: function() {
    var phoneValidate = (rule, value, callback) => {
      this.axios
        .get(
          window.sHost + window.sUrl.shop.checkPhoneExist + "?phone=" + value
        )
        .then(response => {
          if (!response.data.success) {
            callback(new Error(response.data.msg));
          } else {
            callback();
          }
        })
        .catch();
    };
    /* var nameCheckLength = (rule, value, callback) => {
      let _val = value.split("");
      if (_val.length > 20) {
        callback(new Error("用户名长度不能大于20位！"));
      } else {
        callback();
      }
    };
    var passwordCheck = (rule, value, callback) => {
      let _val = value.split("");
      if (_val.length < 6 || _val.length > 18) {
        callback(new Error("密码长度不能小于6位或大于18位！"));
      } else {
        callback();
      }
    }; */
    var phoneCheck = (rule, value, callback) => {
      if (value == null || value == "") {
        callback();
      } else {
        if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(value)) {
          callback(new Error("请输入正确的11位电话号码！"));
        } else {
          callback();
        }
      }
    };
    return {
      customerList: [],
      pageNum: 1, //分页数
      pageSize: 20, //每页数据
      total: null, //总页数
      addVisible: false,
      editVisible: false,
      editForm: {},
      //查询列表
      oUserList: {
        userName: null,
        realName: null
      },
      //验证列表
      ruleForm: {
        userName: null,
        phone: null,
        sex: "1",
        birthday: null
      },
      rules: {
        userName: [
          { required: true, message: "请输入会员姓名", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: phoneCheck, trigger: ["blur"] },
          { validator: phoneValidate, trigger: ["blur"] }
        ]
      },
      selectRow: [] //设置选中行
    };
  },

  mounted() {
    this.initTable();
  },
  watch: {
    allSelect(data) {
      this.selectRow = [];
      if (data.length > 0) {
        data.forEach(item => {
          this.selectRow.push(item.id);
        });
      }
    }
  },
  methods: {
    formatter: function(row) {
      return row.sex === "0" ? "女" : row.sex === "1" ? "男" : "";
    },
    /* 新增表单 */
    submitForm(formName) {
      let _this = this;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          window.master.fLoadingOpen();
          _this.axios
            .post(
              window.sHost + window.sUrl.shop.saveCustomer,
              JSON.parse(JSON.stringify(_this.$refs[formName].model))
            )
            .then(response => {
              window.master.fLoadingClose();
              if (response.data.success) {
                window.master.fSuccessMes(response.data.msg);
                _this.addVisible = false;
                _this.initTable();
                _this.$refs[formName].resetFields();
              } else {
                window.master.fErrorMes(response.data.msg);
              }
            })
            .catch(() => {
              window.master.fLoadingClose();
            });
        } else {
          return false;
        }
      });
    },
    /* 编辑表单 */
    fEditsubmit(formName) {
      let _this = this;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          window.master.fLoadingOpen();
          _this.axios
            .post(
              window.sHost + window.sUrl.shop.updateCustomer,
              JSON.parse(JSON.stringify(_this.$refs[formName].model))
            )
            .then(response => {
              window.master.fLoadingClose();
              if (response.data.success) {
                window.master.fSuccessMes(response.data.msg);
                _this.editVisible = false;
                _this.initTable();
                _this.$refs[formName].resetFields();
              } else {
                window.master.fErrorMes(response.data.msg);
              }
            })
            .catch(() => {
              window.master.fLoadingClose();
            });
        } else {
          return false;
        }
      });
    },
    //取消dialog
    cancelModal: function(formName) {
      this.addVisible = false;
      this.editVisible = false;
      this.$refs[formName].resetFields();
    },
    //获取table数据
    fGetUserList: function() {
      let _this = this;
      window.master.fLoadingOpen();
      this.axios
        .post(window.sHost + window.sUrl.shop.queryCustomerList, {
          pageNum: _this.pageNum,
          pageSize: _this.pageSize,
          userName: window.master.strReplace(_this.oUserList.userName),
          phone: window.master.strReplace(_this.oUserList.phone)
        })
        .then(response => {
          window.master.fLoadingClose();
          if (response.data.success) {
            _this.customerList = response.data.obj.list;
            _this.total = response.data.obj.total;
          } else {
            window.master.fErrorMes(response.data.msg);
          }
        })
        .catch(() => {
          window.master.fLoadingClose();
        });
    },

    //初始化数据
    initTable: function() {
      let _this = this;
      _this.fGetUserList();
    },
    //每页条数
    handleSizeChange: function(pageSize) {
      let _this = this;
      _this.pageSize = pageSize;
      _this.fGetUserList();
    },
    //页数切换
    handleCurrentChange: function(pageNum) {
      let _this = this;
      _this.pageNum = pageNum;
      _this.fGetUserList();
    },
    //多选框
    handleSelectionChange: function(data) {
      this.allSelect = data;
    },
    //新增
    add: function() {
      this.addVisible = true;
    },
    //编辑
    edit: function() {
      let _this = this;
      if (
        _this.allSelect === undefined ||
        _this.allSelect.length < 1 ||
        _this.allSelect.length > 1
      ) {
        window.master.fWarningMes(this.$store.state.sOnlySelectOneMes);
      } else {
        _this.axios
          .get(
            window.sHost +
              window.sUrl.shop.getCustomerById +
              "?id=" +
              _this.allSelect[0].id
          )
          .then(response => {
            _this.editForm = response.data.obj;
            _this.editVisible = true;
          })
          .catch();
      }
    },
    //删除
    deletes: function() {
      let _this = this;
      if (
        _this.allSelect === undefined ||
        _this.allSelect.length < 1 ||
        _this.allSelect.length > 1
      ) {
        window.master.fWarningMes(this.$store.state.sOnlySelectOneMes);
      } else {
        _this
          .$confirm("确定删除该会员?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
            center: true,
            closeOnPressEscape: false,
            closeOnClickModal: false
          })
          .then(
            () => {
              window.master.fLoadingOpen();
              _this.axios
                .post(
                  window.sHost + window.sUrl.shop.deleteCustomer,
                  "id=" + _this.allSelect[0].id
                )
                .then(response => {
                  window.master.fLoadingClose();
                  if (response.data.success) {
                    _this.initTable();
                    window.master.fSuccessMes(response.data.msg);
                  } else {
                    window.master.fErrorMes(response.data.msg);
                  }
                })
                .catch();
            },
            () => {}
          );
      }
    }
  }
};
</script>