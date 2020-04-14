<template>
  <!--系统管理/菜单管理 -->
  <div class="Customer">
    <!-- <el-row style="margin-bottom:-10px">
      <h3>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>系统管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户ghahdsahgdasg管理</el-breadcrumb-item>
        </el-breadcrumb>
      </h3>
    </el-row> -->
    <el-row>
      <!-- <el-card shadow="always"> -->
        <!-- 查询框 -->
        <!-- <el-row style="margin-bottom:10px">
          <span style="font-size:10px;color:red">提示：若需模糊查询，请使用符号*占位</span>
        </el-row> -->
        <el-row>
          <el-form :inline="true" :model="oUserList">
            <el-form-item label="用户名">
              <el-input
                v-model.trim="oUserList.userName"
                placeholder
                @keyup.enter.native="fGetTableData"
              ></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input
                v-model.trim="oUserList.realName"
                placeholder
                @keyup.enter.native="fGetTableData"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" @click="fGetTableData">查询</el-button>
            </el-form-item>
          </el-form>
        </el-row>
        <!-- 操作按钮 -->
        <el-row style="margin-bottom:5px">
          <el-button type="primary" size="small" style="float:left" @click="add">新增</el-button>
          <el-button type="primary" size="small" style="float:left" @click="edit">编辑</el-button>
          <!-- <el-button type="primary" size="small" style="float:left" @click="initPassword">初始化密码</el-button> -->
          <el-button type="danger" size="small" style="float:left" @click="deletes">删除</el-button>
        </el-row>
        <el-table
          :data="tableData"
          border
          style="width: 100%;"
          max-height="550"
          ref="clickTable"
          @row-click="(row)=>{$root.clickRow(row,'clickTable',this.$refs)}"
          :row-style="({row, rowIndex} )=>{let a=$root.tableRowClassName({row, rowIndex},selectRow);return a}"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
          <el-table-column prop="empCode" label="工号" width="80" align="center"></el-table-column>
          <el-table-column prop="userName" label="用户名" width="180" align="center"></el-table-column>
          <el-table-column prop="realName" label="姓名"  :show-overflow-tooltip="true" align="center"></el-table-column>
          <el-table-column prop="email" label="邮箱" align="center" width="260"></el-table-column>
          <el-table-column prop="phone" label="电话" align="center" width="150"></el-table-column>
          <el-table-column prop="posName" label="主岗位" :show-overflow-tooltip="true" align="center"></el-table-column>
          <el-table-column prop="sex" label="性别" :formatter="formatter" align="center" width="80"></el-table-column>
          <el-table-column prop="birthday" label="出生日期" align="center" width="150"></el-table-column>
          <el-table-column label="状态" align="center" width="100">
            <template slot-scope="scope">
              <el-button
                slot="reference"
                type="text"
                size="small"
                v-if="scope.row.lockFlag==='1'"
                style="color:red"
                @click="isLockFlag(0,scope.row.id)"
              >禁用</el-button>
              <el-button
                slot="reference"
                type="text"
                size="small"
                v-if="scope.row.lockFlag==='0'"
                style="color:green"
                @click="isLockFlag(1,scope.row.id)"
              >启用</el-button>
            </template>
          </el-table-column>
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
      v-dialogDrag
    >
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="120px">
        <el-form-item label="会员姓名:" prop="empCode">
          <el-input v-model="ruleForm.empCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号:" prop="userName">
          <el-input v-model="ruleForm.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别:" prop="sex">
          <el-radio-group v-model="ruleForm.lockFlag">
            <el-radio label="1">先生</el-radio>
            <el-radio label="0">女士</el-radio>
          </el-radio-group>
          <!-- <el-select v-model="ruleForm.sex" placeholder="请选择性别" style="width:100%">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="出生日期:" prop="birthday">
          <el-date-picker
            v-model="ruleForm.birthday"
            value-format="yyyy-MM-dd"
            type="date"
            style="width:100%"
          ></el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="生效日期:" prop="email">
          <el-input v-model="ruleForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态:" prop="lockFlag">
          <el-radio-group v-model="ruleForm.lockFlag">
            <el-radio label="0">启用</el-radio>
            <el-radio label="1">禁用</el-radio>
          </el-radio-group>
        </el-form-item> -->
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
      width="80%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      v-dialogDrag
    >
      <el-form :model="editForm" ref="editForm" :rules="rules" label-width="120px">
        <el-form-item label="工号:">
          <span>{{editForm.empCode}}</span>
        </el-form-item>
        <el-form-item label="用户名:">
          <span>{{editForm.userName}}</span>
        </el-form-item>
        <el-form-item label="姓名:" prop="realName">
          <span>{{editForm.realName}}</span>
          <!-- <el-input v-model="editForm.realName" autocomplete="off"></el-input> -->
        </el-form-item>
        <el-form-item label="邮箱:">
          <span>{{editForm.email}}</span>
        </el-form-item>
        <el-form-item label="电话:">
          <span>{{editForm.phone}}</span>
          <!-- <el-input v-model.trim="editForm.phone" autocomplete="off" maxlength="11"></el-input> -->
        </el-form-item>
        <el-form-item label="主岗位:" prop="posId">
          <el-cascader
            style="width:100%"
            v-model="editForm.posId"
            :options="options"
            :props="{ checkStrictly: true }"
            clearable
          ></el-cascader>
        </el-form-item>
        <el-form-item label="性别:" prop="sex">
          <el-select v-model="editForm.sex" placeholder="请选择性别" style="width:100%">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期:" prop="birthday">
          <el-date-picker
            type="date"
            value-format="yyyy-MM-dd"
            v-model="editForm.birthday"
            style="width:100%"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="状态:" prop="lockFlag">
          <el-radio-group v-model="editForm.lockFlag">
            <el-radio label="0">启用</el-radio>
            <el-radio label="1">禁用</el-radio>
          </el-radio-group>
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
import { isArray } from "util";
export default {
  name: "Customer",
  data: function() {
    var nameCheck = (rule, value, callback) => {
      this.axios
        .get(
          window.sHost +
            window.sUrl.systemUrl.getUserByUserName +
            "?userName=" +
            value
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
    var nameCheckLength = (rule, value, callback) => {
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
    };
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
      tableData: [],
      roleData: [],
      endowRoleVisible: false,
      pageNum: 1, //分页数
      pageSize: 20, //每页数据
      total: null, //总页数
      input: "",
      options: [], //岗位数据
      allSelect: [], //选中数据
      visible: false,
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
        password: null,
        realName: null,
        sex: null,
        birthday: null,
        phone: null,
        lockFlag: "0",
        // posId: null,
        email: null, //邮箱
        empCode: null //工号
      },
      finInvoiceUuidList: [],
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { validator: nameCheck, trigger: ["blur"] },
          { validator: nameCheckLength, trigger: ["blur", "change"] }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: passwordCheck, trigger: ["change", "blur"] }
        ],
        realName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        lockFlag: [{ required: true, message: "请选择状态", trigger: "blur" }],
        posId: [{ required: true, message: "请选择主岗位", trigger: "blur" }],
        // email: { required: true, message: "请输入邮箱", trigger: "blur" },
        empCode: { required: true, message: "请输入工号", trigger: "blur" },
        phone: [{ validator: phoneCheck, trigger: ["blur"] }]
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
    /* 新增表单 */
    submitForm(formName) {
      let _this = this;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          _this.$refs[formName].model.posId = _this.$refs[formName].model.posId[
            _this.$refs[formName].model.posId.length - 1
          ]
            ? _this.$refs[formName].model.posId[
                _this.$refs[formName].model.posId.length - 1
              ]
            : "0";
          _this.axios
            .post(
              window.sHost + window.sUrl.systemUrl.saveUserInfo,
              JSON.parse(JSON.stringify(_this.$refs[formName].model))
            )
            .then(response => {
              if (response.data.success) {
                window.master.fSuccessMes(response.data.msg);
                _this.addVisible = false;
                _this.initTable();
                _this.$refs[formName].resetFields();
              } else {
                window.master.fErrorMes(response.data.msg);
              }
            })
            .catch();
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
          let value = _this.$refs[formName].model.posId;
          if (!isArray(value)) {
            _this.$refs[formName].model.posId = value;
          } else {
            _this.$refs[formName].model.posId = value[value.length - 1];
          }
          _this.axios
            .post(
              window.sHost + window.sUrl.systemUrl.updateUserInfo,
              JSON.parse(JSON.stringify(_this.$refs[formName].model))
            )
            .then(response => {
              if (response.data.success) {
                window.master.fSuccessMes(response.data.msg);
                _this.editVisible = false;
                _this.initTable();
                _this.$refs[formName].resetFields();
              } else {
                window.master.fErrorMes(response.data.msg);
              }
            })
            .catch();
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
    fGetTableData: function() {
      let _this = this;
       
      this.axios
        .post(window.sHost + window.sUrl.systemUrl.queryUserList, {
          pageNum: _this.pageNum,
          pageSize: _this.pageSize,
          userName: window.master.strReplace(_this.oUserList.userName),
          realName: window.master.strReplace(_this.oUserList.realName)
        })
        .then(response => {
          if (response.data.success) {
             
            _this.tableData = response.data.obj.list;
            _this.total = response.data.obj.total;
          } else {
            window.master.fErrorMes(response.data.msg);
          }
        })
        .catch();
    },

    //初始化数据
    initTable: function() {
      let _this = this;
      _this.fGetTableData();
    },
    //每页条数
    handleSizeChange: function(pageSize) {
      let _this = this;
      _this.pageSize = pageSize;
      _this.fGetTableData();
    },
    //页数切换
    handleCurrentChange: function(pageNum) {
      let _this = this;
      _this.pageNum = pageNum;
      _this.fGetTableData();
    },
    //多选框
    handleSelectionChange: function(data) {
      this.allSelect = data;
    },
    //获取岗位格式数据
    findAllPosition: function() {
      let _this = this;
      _this.axios
        .get(window.sHost + window.sUrl.systemUrl.findAllPositionList)
        .then(response => {
          if (response.data.success) {
            _this.options = response.data.obj;
          } else {
            window.master.fErrorMes(response.data.msg);
          }
        })
        .catch();
    },
    formatter: function(row) {
      return row.sex === "0" ? "女" : row.sex === "1" ? "男" : "";
    },
    //新增
    add: function() {
      this.addVisible = true;
      this.findAllPosition();
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
              window.sUrl.systemUrl.getUserInfoById +
              "?userId=" +
              _this.allSelect[0].id
          )
          .then(response => {
            _this.editForm = response.data.obj;
            _this.editVisible = true;
            _this.findAllPosition();
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
          .$confirm("是否确定删除该用户?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
            center: true,
            closeOnPressEscape: false,
            closeOnClickModal: false
          })
          .then(
            () => {
              _this.axios
                .post(
                  window.sHost + window.sUrl.systemUrl.deleteUserInfoById,
                  "userId=" + _this.sel[0].id
                )
                .then(response => {
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
    },
    //初始化密码
    initPassword: function() {
      let _this = this;
      if (
        _this.allSelect === undefined ||
        _this.allSelect.length < 1 ||
        _this.allSelect.length > 1
      ) {
        window.master.fWarningMes(this.$store.state.sOnlySelectOneMes);
      } else {
        _this
          .$confirm("是否确定初始化选中用户密码为[123456]吗?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
            center: true,
            closeOnPressEscape: false,
            closeOnClickModal: false
          })
          .then(
            () => {
              _this.axios
                .post(
                  window.sHost + window.sUrl.systemUrl.initPassword,
                  "userId=" + _this.allSelect[0].id
                )
                .then(response => {
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
    },

    //启用、禁用设置
    isLockFlag: function(param, sId) {
      let _this = this;
      _this
        .$confirm(
          param === 0 ? "是否确定启用该用户?" : "是否确定禁用该用户?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
            center: true,
            closeOnPressEscape: false,
            closeOnClickModal: false
          }
        )
        .then(
          () => {
            _this.axios
              .post(window.sHost + window.sUrl.systemUrl.lockOrUnlockUser, {
                id: sId,
                lockFlag: param
              })
              .then(res => {
                if (res.data.success) {
                  _this.initTable();
                  window.master.fSuccessMes(res.data.msg);
                } else {
                  window.master.fErrorMes(res.data.msg);
                }
              })
              .catch();
          },
          () => {}
        );
    }
  }
};
</script>