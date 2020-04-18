<template>
  <div class="PayReport">
    <el-row>
      <el-row>
        <el-form :inline="true" :model="searchObj">
          <el-form-item label="商品名称">
            <el-input
              v-model.trim="searchObj.goodsName"
              placeholder
              clearable
              @keyup.enter.native="fGetPayReportList"
            ></el-input>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker
              v-model="searchObj.payDate"
              value-format="yyyy-MM-dd"
              type="date"
              style="width:100%"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="fGetPayReportList">查询</el-button>
            <!-- <el-button type="primary" size="small" @click="fExport">导出</el-button> -->
          </el-form-item>
        </el-form>
      </el-row>
      <!-- 操作按钮 -->
      <el-row style="margin-bottom:5px">
        <el-button type="primary" size="small" style="float:left" @click="addPay">新增</el-button>
        <!-- <el-button type="warning" size="small" style="float:left" @click="editGoods">编辑</el-button> -->
        <el-button type="danger" size="small" style="float:left" @click="delPay">删除</el-button>
      </el-row>
      <el-table
        :data="payReportList"
        border
        @selection-change="handleSelectionChange"
        style="width: 100%;"
        ref="clickTable"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="goodsName" label="商品名称" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column prop="money" label="支出金额" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.money? parseFloat(scope.row.money).toFixed(2):0.00.toFixed(2)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="payDate" label="日期" align="center"></el-table-column>
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
      title="新增支出"
      :visible.sync="addVisible"
      width="60%"
      top="5vh"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="cancelModal('ruleForm')"
      v-dialogDrag
    >
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="120px">
        <el-form-item label="商品名称:" prop="goodsName">
          <el-input v-model="ruleForm.goodsName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="支出金额:" prop="money">
          <el-input-number
            v-model="ruleForm.money"
            :precision="2"
            :step="0.1"
            :min="0"
            :max="99999"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="支出日期:" prop="payDate">
          <el-date-picker
            v-model="ruleForm.payDate"
            value-format="yyyy-MM-dd"
            type="date"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelModal('ruleForm')" size="small">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//import { isArray } from "util";
export default {
  name: "PayReport",
  data: function() {
    return {
      payReportList: [],
      pageNum: 1, //分页数
      pageSize: 20, //每页数据
      total: null, //总页数
      addVisible: false,
      selectRow: [], //设置选中行
      searchObj: {
        goodsName: null,
        payDate: null
      },
      //验证列表
      ruleForm: {
        goodsName: null,
        payDate: window.master.fGetNowFormatDate(),
        money: null
      },
      rules: {
        goodsName: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
        money: [{ required: true, message: "请填支出金额", trigger: "blur" }],
        payDate: [
          { required: true, message: "请填写支出日期", trigger: "blur" }
        ]
      }
    };
  },

  mounted() {
    this.fGetPayReportList();
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
      _this.fGetPayReportList();
    },
    //页数切换
    handleCurrentChange: function(pageNum) {
      let _this = this;
      _this.pageNum = pageNum;
      _this.fGetPayReportList();
    },
    //多选框
    handleSelectionChange: function(data) {
      this.allSelect = data;
    },
    //获取table数据
    fGetPayReportList: function() {
      let _this = this;
      window.master.fLoadingOpen();
      this.axios
        .post(window.sHost + window.sUrl.shop.queryPayReportList, {
          pageNum: _this.pageNum,
          pageSize: _this.pageSize,
          goodsName: window.master.strReplace(_this.searchObj.goodsName),
          payDate: _this.searchObj.payDate
        })
        .then(response => {
          window.master.fLoadingClose();
          if (response.data.success) {
            _this.payReportList = response.data.obj.list;
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
              window.sHost + window.sUrl.shop.savePayReport,
              JSON.parse(JSON.stringify(_this.$refs[formName].model))
            )
            .then(response => {
              window.master.fLoadingClose();
              if (response.data.success) {
                window.master.fSuccessMes(response.data.msg);
                _this.addVisible = false;
                _this.fGetPayReportList();
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
      this.$refs[formName].resetFields();
    },
    addPay: function() {
      this.addVisible = true;
    },
    //删除
    delPay: function() {
      let _this = this;
      if (
        _this.allSelect === undefined ||
        _this.allSelect.length < 1 ||
        _this.allSelect.length > 1
      ) {
        window.master.fWarningMes(this.$store.state.sOnlySelectOneMes);
      } else {
        _this
          .$confirm("确定删除该条数据?", "提示", {
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
                  window.sHost + window.sUrl.shop.deletePayReport,
                  "id=" + _this.allSelect[0].id
                )
                .then(response => {
                  window.master.fLoadingClose();
                  if (response.data.success) {
                    _this.fGetPayReportList();
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
    //导出
    /* fExport: function() {
      let _this = this;
      _this
        .axios({
          method: "post",
          url: window.sHost + window.sUrl.shop.exportOrderReportList,
          data: {
            goodsCode: window.master.strReplace(_this.searchObj.goodsCode),
            goodsName: window.master.strReplace(_this.searchObj.goodsName),
            orderDate: _this.searchObj.orderDate
          },
          responseType: "blob"
        })
        .then(res => {
          let a = document.createElement("a");
          let blob = new Blob([res.data], {
            type: "application/vnd.ms-excel"
          });
          let objectUrl = URL.createObjectURL(blob);
          a.setAttribute("href", objectUrl);
          a.setAttribute("download", decodeURI(res.headers["filename"]));
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        })
        .catch();
    } */
  }
};
</script>