<template>
  <div class="AddGoods">
    <el-row :gutter="20">
      <el-col :span="14">
        <div>
          <!-- <el-card :body-style="{ padding: '0px' }">
            <el-row>
              <el-form :inline="true" :model="searchObj">
                <el-form-item label="会员手机号：">
                  <el-input
                    v-model.trim="phoneNumber"
                    placeholder
                  ></el-input>
                </el-form-item>
                <el-form-item label="桌号：">
                  <el-input v-model.trim="deskNo" placeholder></el-input>
                </el-form-item>
              </el-form>
            </el-row>
          </el-card>-->
          <el-card :body-style="{ padding: '0px' }">
            <el-row>
              <div style="padding: 5px;text-align:center;">
                <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm">
                  <el-form-item label="桌号：" prop="deskNo">
                    <el-select v-model="ruleForm.deskNo" clearable>
                      <el-option
                        v-for="item in allDeskData"
                        :key="item.id"
                        :value="item.deskCode"
                        :label="item.deskName"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="会员手机号：" prop="phoneNumber">
                    <el-input
                      v-model.trim="ruleForm.phoneNumber"
                      maxlength="11"
                      placeholder="请输入会员手机号"
                      @change="checkCustomer"
                      :disabled="custInput"
                    ></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </el-row>
            <el-row style="margin: 10px;line-height: 40px;">
              <span>总金额: ￥{{parseFloat(totalMoney).toFixed(2)}}</span>
              <span style="float:right;margin-right:20px">
                <span
                  style="padding-right: 30px;color:red;font-weight: 800;"
                >{{custName}}</span>
                <el-button type="danger" size="medium" @click="delAllSelected">清空</el-button>
                <el-button type="warning" size="medium" @click="toWaitOrder">挂单</el-button>
                <el-button type="success" size="medium" @click="finishOrder">结账</el-button>
              </span>
            </el-row>
          </el-card>
          <el-table
            :data="selectedGoods"
            border
            style="width: 100%;max-height:500px;"
            ref="clickTable"
          >
            <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
            <!-- <el-table-column type="index" label="序号" width="50" align="center"></el-table-column> -->
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column
              prop="goodsName"
              label="商品名称"
              :show-overflow-tooltip="true"
              align="center"
            ></el-table-column>
            <el-table-column label="单价" width="100" prop="price" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.price? parseFloat(scope.row.price).toFixed(2):0.00.toFixed(2)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="数量" prop="num" width="170" align="center">
              <template slot-scope="scope">
                <!-- <el-input-number >{{scope.row.num? parseFloat(scope.row.num).toFixed(2):0.00.toFixed(2)}}</el-input-number> -->
                <el-input-number
                  v-model="scope.row.num"
                  @change="(val)=>{numChange(val,scope)}"
                  :min="1"
                  :max="999999"
                ></el-input-number>
              </template>
            </el-table-column>
            <el-table-column label="金额" prop="money" align="center" width="110">
              <template slot-scope="scope">
                <span>{{scope.row.money? parseFloat(scope.row.money).toFixed(2):0.00.toFixed(2)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="100">
              <template slot-scope="scope">
                <el-button type="danger" size="mini" @click="delGoods(scope)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="10">
        <!-- <div> -->
        <el-row style="margin-bottom:10px">
          <span style="font-size:16px;">常用菜单</span>
        </el-row>
        <el-row>
          <el-col :span="7" :offset="1" v-for="item in allGoodsData" :key="item.id">
            <el-card shadow="hover" class="card_class">
              <div style="padding: 5px;text-align:center;" @click="goodsClick(item)">
                <span>{{item.goodsName}}</span>
                <span style="color: #409eff;">￥{{parseFloat(item.price).toFixed(2)}}</span>
                <div class="bottom clearfix">
                  <time class="huiyuan">会员价￥{{parseFloat(item.disPrice).toFixed(2)}}</time>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <!-- <el-row style="margin-bottom:10px">
          <el-col :span="8" :offset="1">
            <el-button size="medium">
              <div style="padding: 5px;" @click="goodsClick">
                <span>好吃的汉堡￥6.00</span>
                <div class="bottom clearfix">
                  <time class="huiyuan">会员价￥5.50</time>
                </div>
              </div>
            </el-button>
          </el-col>
          <el-col :span="8" :offset="1">
            <el-button size="medium">
              <div style="padding: 5px;" @click="goodsClick">
                <span>好吃的汉堡￥6.00</span>
                <div class="bottom clearfix">
                  <time class="huiyuan">会员价￥5.50</time>
                </div>
              </div>
            </el-button>
          </el-col>
        </el-row>-->

        <!-- </div> -->
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss">
.AddGoods {
  .el-input-number {
    width: 140px;
  }
  .card_class:hover {
    color: #409eff;
    background: #ecf5ff;
    border: 1px solid #dcdfe6;
    cursor: pointer;
  }
  .el-card__body {
    padding: 0px;
  }
  .el-col {
    padding-bottom: 5px;
  }
  .huiyuan {
    font-size: 10px;
    color: #999;
  }

  .bottom {
    margin-top: 2px;
    line-height: 12px;
  }
}

.el-table {
  overflow: auto;
}
.el-table .cell {
  line-height: 25px;
}
.el-table td,
.el-table th {
  padding: 2px 0;
}

.el-table--border::after,
.el-table--group::after,
.el-table::before {
  content: "";
  display: none;
  position: absolute;
  background-color: #ebeef5;
  z-index: 1;
}
</style>

<script>
//import { isArray } from "util";
export default {
  name: "AddGoods",
  data: function() {
    /* var phoneValidate = (rule, value, callback) => {
      this.axios
        .get(
          window.sHost + window.sUrl.shop.getCustomerByPhone + "?phone=" + value
        )
        .then(response => {
          if (!response.data.success) {
            callback(new Error(response.data.msg));
          } else {
            callback();
          }
        })
        .catch();
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
      totalMoney: 0.0,
      allDeskData: [],
      allGoodsData: [],
      selectedGoods: [], //已选择商品的列表
      custInput: false,
      custName: null,
      custPhone: null,
      dkId: null,
      dkName: null,
      ruleForm: {
        phoneNumber: null,
        deskNo: null
      },
      rules: {
        phoneNumber: [
          { validator: phoneCheck, trigger: ["blur"] }
          /*  { validator: phoneValidate, trigger: ["blur"] } */
        ]
      }
    };
  },

  mounted() {
    this.getAllGoodsList();
    this.getAllDeskList();
  },
  watch: {
    "ruleForm.deskNo"(val) {
      let _this = this;
      if (_this.allDeskData.length == 0) {
        return;
      }
      if (val == null || val == "") {
        _this.dkId = null;
        _this.dkName = null;
        return;
      }
      _this.allDeskData.forEach(item => {
        if (item.deskCode == val) {
          _this.dkId = item.id;
          _this.dkName = item.deskName;
          return;
        }
      });
    },
    //监听是否选择商品，若已经选择，则禁用会员手机输入
    selectedGoods(arr) {
      let _this = this;
      if (arr.length > 0) {
        _this.custInput = true;
      } else {
        _this.custInput = false;
      }
      //选择的商品发生变化时，统计总金额
      _this.sumMoney();
    }
  },
  methods: {
    checkCustomer: function(val) {
      let _this = this;
      if (!val) {
        _this.custName = null;
        _this.custPhone = null;
        return;
      }
      _this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          _this.axios
            .get(
              window.sHost +
                window.sUrl.shop.getCustomerByPhone +
                "?phone=" +
                val
            )
            .then(response => {
              if (response.data.success) {
                _this.custName = "会员：" + response.data.obj.userName;
                _this.custPhone = response.data.obj.phone;
              } else {
                _this.custName = null;
                _this.custPhone = null;
                window.master.fErrorMes(response.data.msg);
              }
            })
            .catch(() => {});
        } else {
          _this.custName = null;
          _this.custPhone = null;
          return false;
        }
      });
    },
    //获取所有商品
    getAllGoodsList: function() {
      let _this = this;
      _this
        .axios({
          method: "get",
          url: window.sHost + window.sUrl.shop.getAllGoodsList
        })
        .then(function(response) {
          let data = response.data;
          if (data.success) {
            _this.allGoodsData = data.obj;
          } else {
            window.master.fErrorMes(data.msg);
          }
        });
    },
    //获取所有桌号
    getAllDeskList: function() {
      let _this = this;
      _this
        .axios({
          method: "get",
          url: window.sHost + window.sUrl.shop.getUseableDeskList
        })
        .then(function(response) {
          let data = response.data;
          if (data.success) {
            _this.allDeskData = data.obj;
          } else {
            window.master.fErrorMes(data.msg);
          }
        });
    },
    //添加商品
    goodsClick: function(obj) {
      let gd = {};
      gd.id = obj.id;
      gd.goodsCode = obj.goodsCode;
      gd.goodsName = obj.goodsName;
      gd.num = 1;
      gd.unit = obj.unit;

      if (this.custPhone != null) {
        gd.price = obj.disPrice;
        gd.money = obj.disPrice;
      } else {
        gd.price = obj.price;
        gd.money = obj.price;
      }
      this.selectedGoods.push(gd);
    },
    //删除商品
    delGoods: function(scope) {
      this.selectedGoods.splice(scope.$index, 1);
    },
    //数量变化事件
    numChange: function(val, scope) {
      this.selectedGoods[scope.$index].money = parseFloat(
        scope.row.price * val
      ).toFixed(2);
      //商品数量变化时，重新统计总金额
      this.sumMoney();
    },
    //合计金额
    sumMoney: function() {
      let _this = this;
      _this.totalMoney = 0;
      this.selectedGoods.forEach(row => {
        _this.totalMoney = (
          parseFloat(_this.totalMoney) + parseFloat(row.price * row.num)
        ).toFixed(2);
      });
    },
    //清空所有选择的商品
    delAllSelected: function() {
      let _this = this;
      if (_this.selectedGoods.length === 0) {
        return;
      }
      this.$confirm("确定清空所有商品?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
        closeOnPressEscape: false,
        closeOnClickModal: false
      }).then(
        () => {
          _this.selectedGoods = [];
        },
        () => {}
      );
    },
    //结账操作
    finishOrder: function() {
      let _this = this;
      if (_this.selectedGoods.length === 0) {
        window.master.fWarningMes("没有任何商品，无需结账！");
      } else {
        this.$confirm("确定结账?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true,
          closeOnPressEscape: false,
          closeOnClickModal: false
        }).then(
          () => {
            window.master.fLoadingOpen();
            _this
              .axios({
                method: "post",
                url: window.sHost + window.sUrl.shop.saveOrderReportBatch,
                data: _this.selectedGoods
              })
              .then(function(response) {
                window.master.fLoadingClose();
                let data = response.data;
                if (data.success) {
                  _this.ruleForm.deskNo = null;
                  _this.ruleForm.phoneNumber = null;
                  _this.custName = null;
                  _this.custPhone = null;
                  _this.selectedGoods = [];
                  window.master.fSuccessMes(data.msg);
                } else {
                  window.master.fErrorMes(data.msg);
                }
              });
          },
          () => {}
        );
      }
    },
    //挂单操作
    toWaitOrder: function() {
      let _this = this;
      if (_this.selectedGoods.length === 0) {
        return;
      }
      if (!_this.ruleForm.deskNo) {
        window.master.fErrorMes("请选择桌号");
        return;
      }
      _this.$refs["ruleForm"].model.itemList = _this.selectedGoods;
      _this.$refs["ruleForm"].model.deskCode = _this.ruleForm.deskNo;
      _this.$refs["ruleForm"].model.deskId = _this.dkId;
      _this.$refs["ruleForm"].model.deskName = _this.dkName;
      _this
        .$confirm("确定挂单【" + _this.dkName + "】?", "提示", {
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
            _this
              .axios({
                method: "post",
                url: window.sHost + window.sUrl.shop.saveOrder,
                data: _this.$refs["ruleForm"].model
              })
              .then(function(response) {
                window.master.fLoadingClose();
                let data = response.data;
                if (data.success) {
                  _this.ruleForm.deskNo = null;
                  _this.ruleForm.phoneNumber = null;
                  _this.custName = null;
                  _this.custPhone = null;
                  _this.selectedGoods = [];
                  // _this.sumMoney();
                  window.master.fSuccessMes(data.msg);
                } else {
                  window.master.fErrorMes(data.msg);
                }
              });
          },
          () => {
            window.master.fLoadingClose();
          }
        );
    }
  }
};
</script>