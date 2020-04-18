<template>
  <div class="GoodsList">
    <el-row>
      <el-row>
        <el-form :inline="true" :model="searchObj">
          <el-form-item label="商品编码">
            <el-input
              v-model.trim="searchObj.goodsCode"
              placeholder
              clearable
              @keyup.enter.native="fGetGoodsList"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品名称">
            <el-input
              v-model.trim="searchObj.goodsName"
              placeholder
              clearable
              @keyup.enter.native="fGetGoodsList"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="fGetGoodsList">查询</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <!-- 操作按钮 -->
      <el-row style="margin-bottom:5px">
        <el-button type="primary" size="small" style="float:left" @click="addGoods">新增</el-button>
        <el-button type="warning" size="small" style="float:left" @click="editGoods">编辑</el-button>
        <el-button type="danger" size="small" style="float:left" @click="delGoods">删除</el-button>
      </el-row>
      <el-table
        :data="goodsList"
        border
        style="width: 100%;"
        ref="clickTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="goodsCode" label="商品编码" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column prop="goodsName" label="商品名称" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column prop="unit" label="单位" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="price" label="单价(元)" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.price? parseFloat(scope.row.price).toFixed(2):0.00.toFixed(2)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="disPrice" label="会员价(元)" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.disPrice? parseFloat(scope.row.disPrice).toFixed(2):0.00.toFixed(2)}}</span>
          </template>
        </el-table-column>
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
      <!-- </el-card> -->
    </el-row>
    <!-- 新增 -->
    <el-dialog
      title="新增商品"
      :visible.sync="addVisible"
      width="60%"
      top="5vh"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="cancelModal('ruleForm')"
      v-dialogDrag
    >
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="120px">
        <el-form-item label="商品编码:" prop="goodsCode">
          <el-input v-model="ruleForm.goodsCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品名称:" prop="goodsName">
          <el-input v-model="ruleForm.goodsName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="单位:" prop="unit">
          <el-select v-model="ruleForm.unit" clearable>
            <el-option
              v-for="item in unitEnum"
              :key="item.code"
              :value="item.code"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单价:" prop="price">
          <el-input-number
            v-model="ruleForm.price"
            :precision="2"
            :step="0.1"
            :min="0"
            :max="99999"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="会员价:" prop="disPrice">
          <el-input-number
            v-model="ruleForm.disPrice"
            :precision="2"
            :step="0.1"
            :min="0"
            :max="99999"
          ></el-input-number>
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
      title="编辑商品"
      :visible.sync="editVisible"
      width="60%"
      top="5vh"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="cancelModal('editForm')"
      v-dialogDrag
    >
      <el-form :model="editForm" ref="editForm" :rules="rules" label-width="120px">
        <el-form-item label="商品编码:" prop="goodsCode">
          <span>{{editForm.goodsCode}}</span>
          <!--  <el-input v-model="editForm.goodsCode" autocomplete="off"></el-input> -->
        </el-form-item>
        <el-form-item label="商品名称:" prop="goodsName">
          <el-input v-model="editForm.goodsName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="单位:" prop="unit">
          <el-select v-model="editForm.unit" clearable>
            <el-option
              v-for="item in unitEnum"
              :key="item.code"
              :value="item.code"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单价:" prop="price">
          <el-input-number
            v-model="editForm.price"
            :precision="2"
            :step="0.1"
            :min="0"
            :max="99999"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="会员价:" prop="disPrice">
          <el-input-number
            v-model="editForm.disPrice"
            :precision="2"
            :step="0.1"
            :min="0"
            :max="99999"
          ></el-input-number>
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
  name: "GoodsList",
  data: function() {
    var seqCheck = (rule, value, callback) => {
      if (!/^[1-9]\d*$/.test(value)) {
        callback("请输入正确的显示顺序！");
      } else {
        callback();
      }
    };
    return {
      goodsList: [],
      pageNum: 1, //分页数
      pageSize: 20, //每页数据
      total: null, //总页数
      addVisible: false,
      editVisible: false,
      editForm: {},
      selectRow: [], //设置选中行
      searchObj: {
        goodsCode: null,
        goodsName: null
      },
      unitEnum: this.$store.state.unitEnum, //单位列表
      //验证列表
      ruleForm: {
        goodsCode: null,
        goodsName: null,
        unit: "份",
        price: null,
        disPrice: null,
        sortnum: null
      },
      rules: {
        goodsCode: [
          { required: true, message: "请输入商品编码", trigger: "blur" }
        ],
        goodsName: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
        unit: [{ required: true, message: "请选择单位", trigger: "blur" }],
        price: [{ required: true, message: "请填写单价", trigger: "blur" }],
        disPrice: [
          { required: true, message: "请填写会员价", trigger: "blur" }
        ],
        sortnum: [
          { required: true, message: "请输入显示顺序", trigger: "blur" },
          { validator: seqCheck, trigger: ["blur", "change"] }
        ]
      }
    };
  },

  mounted() {
    this.fGetGoodsList();
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
      _this.fGetGoodsList();
    },
    //页数切换
    handleCurrentChange: function(pageNum) {
      let _this = this;
      _this.pageNum = pageNum;
      _this.fGetGoodsList();
    },
    //多选框
    handleSelectionChange: function(data) {
      this.allSelect = data;
    },
    //获取table数据
    fGetGoodsList: function() {
      let _this = this;
      window.master.fLoadingOpen();
      this.axios
        .post(window.sHost + window.sUrl.shop.queryGoodsList, {
          pageNum: _this.pageNum,
          pageSize: _this.pageSize,
          goodsCode: window.master.strReplace(_this.searchObj.goodsCode),
          goodsName: window.master.strReplace(_this.searchObj.goodsName)
        })
        .then(response => {
          window.master.fLoadingClose();
          if (response.data.success) {
            _this.goodsList = response.data.obj.list;
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
              window.sHost + window.sUrl.shop.saveGoods,
              JSON.parse(JSON.stringify(_this.$refs[formName].model))
            )
            .then(response => {
              window.master.fLoadingClose();
              if (response.data.success) {
                window.master.fSuccessMes(response.data.msg);
                _this.addVisible = false;
                _this.fGetGoodsList();
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
              window.sHost + window.sUrl.shop.updateGoods,
              JSON.parse(JSON.stringify(_this.$refs[formName].model))
            )
            .then(response => {
              window.master.fLoadingClose();
              if (response.data.success) {
                window.master.fSuccessMes(response.data.msg);
                _this.editVisible = false;
                _this.fGetGoodsList();
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
    addGoods: function() {
      this.addVisible = true;
    },

    //编辑
    editGoods: function() {
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
              window.sUrl.shop.getGoodsById +
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
    delGoods: function() {
      let _this = this;
      if (
        _this.allSelect === undefined ||
        _this.allSelect.length < 1 ||
        _this.allSelect.length > 1
      ) {
        window.master.fWarningMes(this.$store.state.sOnlySelectOneMes);
      } else {
        _this
          .$confirm("确定删除该商品?", "提示", {
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
                  window.sHost + window.sUrl.shop.deleteGoods,
                  "id=" + _this.allSelect[0].id
                )
                .then(response => {
                  window.master.fLoadingClose();
                  if (response.data.success) {
                    _this.fGetGoodsList();
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