<template>
  <div class="DeskList">
    <el-row>
      <!-- 操作按钮 -->
      <el-row style="margin-bottom:5px">
        <el-button type="primary" size="small" style="float:left" @click="addDesk">新增</el-button>
        <el-button type="warning" size="small" style="float:left" @click="editDesk">编辑</el-button>
        <el-button type="danger" size="small" style="float:left" @click="delDesk">删除</el-button>
      </el-row>
      <el-table
        :data="deskList"
        border
        style="width: 100%;"
        max-height="560"
        ref="clickTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="deskCode" label="编号" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column prop="deskName" label="名称" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column prop="sortnum" label="排序号" align="center"></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[20, 30, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-row>
    <!-- 新增 -->
    <el-dialog
      title="新增"
      :visible.sync="addVisible"
      width="60%"
      top="5vh"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="cancelModal('ruleForm')"
      v-dialogDrag
    >
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="120px">
        <el-form-item label="编号:" prop="deskCode">
          <el-input v-model="ruleForm.deskCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称:" prop="deskName">
          <el-input v-model="ruleForm.deskName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序号:" prop="sortnum">
          <el-input v-model.number="ruleForm.sortnum" autocomplete="off"></el-input>
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
        <el-form-item label="编号:" prop="deskCode">
          <span>{{editForm.deskCode}}</span>
        </el-form-item>
        <el-form-item label="名称:" prop="deskName">
          <el-input v-model="editForm.deskName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序号:" prop="sortnum">
          <el-input v-model.number="editForm.sortnum" autocomplete="off"></el-input>
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
  name: "DeskList",
  data: function() {
    var seqCheck = (rule, value, callback) => {
      if (!/^[1-9]\d*$/.test(value)) {
        callback("请输入正确的显示顺序！");
      } else {
        callback();
      }
    };
    return {
      deskList: [],
      pageNum: 1, //分页数
      pageSize: 20, //每页数据
      total: null, //总页数
      addVisible: false,
      editVisible: false,
      editForm: {},
      selectRow: [], //设置选中行
      //验证列表
      ruleForm: {
        deskCode: null,
        deskName: null,
        sortnum: null
      },
      rules: {
        deskCode: [{ required: true, message: "请输入编号", trigger: "blur" }],
        deskName: [{ required: true, message: "请输入名称", trigger: "blur" }],
        sortnum: [
          { required: true, message: "请输入显示顺序", trigger: "blur" },
          { validator: seqCheck, trigger: ["blur", "change"] }
        ]
      }
    };
  },

  mounted() {
    this.fGetDeskList();
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
    //每页条数
    handleSizeChange: function(pageSize) {
      let _this = this;
      _this.pageSize = pageSize;
      _this.fGetDeskList();
    },
    //页数切换
    handleCurrentChange: function(pageNum) {
      let _this = this;
      _this.pageNum = pageNum;
      _this.fGetDeskList();
    },
    //多选框
    handleSelectionChange: function(data) {
      this.allSelect = data;
    },
    //获取table数据
    fGetDeskList: function() {
      let _this = this;
      window.master.fLoadingOpen();
      this.axios
        .post(window.sHost + window.sUrl.shop.queryDeskList, {
          pageNum: _this.pageNum,
          pageSize: _this.pageSize
        })
        .then(response => {
          window.master.fLoadingClose();
          if (response.data.success) {
            _this.deskList = response.data.obj.list;
            _this.total = response.data.obj.total;
          } else {
            window.master.fErrorMes(response.data.msg);
          }
        })
        .catch(() => {
          window.master.fLoadingClose();
        });
    },

    /* 新增表单 */
    submitForm(formName) {
      let _this = this;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          window.master.fLoadingOpen();
          _this.axios
            .post(
              window.sHost + window.sUrl.shop.saveDesk,
              JSON.parse(JSON.stringify(_this.$refs[formName].model))
            )
            .then(response => {
              window.master.fLoadingClose();
              if (response.data.success) {
                window.master.fSuccessMes(response.data.msg);
                _this.addVisible = false;
                _this.fGetDeskList();
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
              window.sHost + window.sUrl.shop.updateDesk,
              JSON.parse(JSON.stringify(_this.$refs[formName].model))
            )
            .then(response => {
              window.master.fLoadingClose();
              if (response.data.success) {
                window.master.fSuccessMes(response.data.msg);
                _this.editVisible = false;
                _this.fGetDeskList();
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
    //新增
    addDesk: function() {
      this.addVisible = true;
    },

    //编辑
    editDesk: function() {
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
              window.sUrl.shop.getDeskById +
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
    delDesk: function() {
      let _this = this;
      if (
        _this.allSelect === undefined ||
        _this.allSelect.length < 1 ||
        _this.allSelect.length > 1
      ) {
        window.master.fWarningMes(this.$store.state.sOnlySelectOneMes);
      } else {
        _this
          .$confirm("确定删除选中的数据?", "提示", {
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
                  window.sHost + window.sUrl.shop.deleteDesk,
                  "id=" + _this.allSelect[0].id
                )
                .then(response => {
                  window.master.fLoadingClose();
                  if (response.data.success) {
                    _this.fGetDeskList();
                    window.master.fSuccessMes(response.data.msg);
                  } else {
                    window.master.fErrorMes(response.data.msg);
                  }
                })
                .catch(()=>{});
            }
          ).catch(()=>{});
      }
    }
  }
};
</script>