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
                    <!-- <el-input v-model.trim="ruleForm.deskNo" placeholder="请输入桌号"></el-input> -->
                    <el-select v-model="ruleForm.deskNo" clearable>
                      <el-option
                        v-for="item in allDeskData"
                        :key="item.deskCode"
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
                    ></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </el-row>
            <el-row style="margin: 10px;line-height: 40px;">
              <span>总金额: ￥{{parseFloat(hjFee).toFixed(2)}}</span>
              <span style="padding-left: 30px;">会员金额：￥{{parseFloat(disFee).toFixed(2)}}</span>
              <span style="float:right;margin-right:20px">
                <span style="padding-right: 30px;color:red;font-weight: 800;">{{custName}}</span>
                <el-button type="danger" size="medium" @click="delAllSelected()">清空</el-button>
                <el-button type="warning" size="medium" @click="delGoods(scope)">挂单</el-button>
                <el-button type="success" size="medium" @click="toSaveOrder()">结账</el-button>
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
            <el-table-column label="金额" prop="totalMoney" align="center" width="110">
              <template slot-scope="scope">
                <span>{{scope.row.totalMoney? parseFloat(scope.row.totalMoney).toFixed(2):0.00.toFixed(2)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="会员价" prop="disMoney" align="center" width="110">
              <template slot-scope="scope">
                <span>{{scope.row.disMoney? parseFloat(scope.row.disMoney).toFixed(2):0.00.toFixed(2)}}</span>
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
      phoneNumber: null,
      deskNo: null,
      hjFee: 0.0,
      disFee: 0.0,
      allDeskData: [],
      allGoodsData: [],
      selectedGoods: [], //已选择商品的列表
      custName: null,
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
  watch: {},
  methods: {
    checkCustomer: function(val) {
      let _this = this;
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
              } else {
                _this.custName = null;
                window.master.fErrorMes(response.data.msg);
              }
            })
            .catch(() => {});
        } else {
          _this.custName = null;
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
    //获取所有商品
    getAllDeskList: function() {
      let _this = this;
      _this
        .axios({
          method: "get",
          url: window.sHost + window.sUrl.shop.getAllDeskList
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
      this.selectedGoods.push({
        sid: obj.id,
        goodsName: obj.goodsName,
        num: 1,
        price: obj.price,
        disPrice: obj.disPrice,
        totalMoney: obj.price,
        disMoney: obj.disPrice
      });
      this.sumMoney();
    },
    //删除商品
    delGoods: function(scope) {
      this.selectedGoods.splice(scope.$index, 1);
      this.sumMoney();
    },
    //数量变化事件
    numChange: function(val, scope) {
      this.selectedGoods[scope.$index].totalMoney = parseFloat(
        scope.row.price * val
      ).toFixed(2);
      this.selectedGoods[scope.$index].disMoney = parseFloat(
        scope.row.disPrice * val
      ).toFixed(2);
      this.sumMoney();
    },
    //合计金额
    sumMoney: function() {
      let _this = this;
      _this.hjFee = 0;
      _this.disFee = 0;
      this.selectedGoods.forEach(row => {
        _this.hjFee = (
          parseFloat(_this.hjFee) + parseFloat(row.price * row.num)
        ).toFixed(2);
        _this.disFee = (
          parseFloat(_this.disFee) + parseFloat(row.disPrice * row.num)
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
          _this.sumMoney();
        },
        () => {}
      );
    },
    //结账操作
    toSaveOrder: function() {
      console.log(this.selectedGoods);
    }
  }
};
</script>