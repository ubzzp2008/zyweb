<template>
  <div class="OrderList">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-row style="margin-bottom:10px;text-align: center;">
          <span style="font-size:16px;">待结账桌号</span>
        </el-row>
        <el-row v-for="item in orderDeskList" :key="item.deskId" style="margin-bottom: 10px;">
          <el-col :span="16">
            <el-card shadow="hover" class="card_class" @click.native="getOrderGoods(item)">
              <div style="padding: 10px 5px;text-align: center;">
                <span>{{item.deskName}}</span>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8" style="padding-left: 10px;">
            <el-button
              type="danger"
              size="medium"
              style="padding: 12px;"
              @click="cancleOrder(item)"
            >作废</el-button>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="20">
        <el-row>
          <el-card :body-style="{ padding: '0px' }">
            <el-row style="margin: 10px;line-height:40px;color:#2c3e50;">
              <span>桌号: 【{{dkName}}】</span>
              <span style="padding-left: 30px;">总金额：￥{{parseFloat(totalMoney).toFixed(2)}}</span>
              <span style="float:right;margin-right:20px">
                <el-button type="success" size="medium" @click="finishOrder()">结账</el-button>
              </span>
            </el-row>
          </el-card>
          <el-table
            :data="deskGoodsList"
            border
            style="width: 100%;max-height:500px;"
            ref="clickTable"
          >
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column
              prop="goodsName"
              label="商品名称"
              :show-overflow-tooltip="true"
              align="center"
            ></el-table-column>
            <el-table-column label="单价" prop="price" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.price? parseFloat(scope.row.price).toFixed(2):0.00.toFixed(2)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="数量" prop="num" align="center"></el-table-column>
            <el-table-column label="金额" prop="money" align="center">
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
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss">
.OrderList {
  .card_class {
    background: rgb(243, 178, 81);
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
  .el-card {
    color: #ffffff;
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
</style>

<script>
//import { isArray } from "util";
export default {
  name: "OrderList",
  data: function() {
    return {
      orderDeskList: [],
      deskGoodsList: [],
      dkName: "--",
      totalMoney: 0
    };
  },
  watch: {
    //监听商品列表，若列表发生改变，则重新统计
    deskGoodsList(arr) {
      let _this = this;
      if (arr.length === 0) {
        return;
      }
      //选择的商品发生变化时，统计总金额
      _this.sumMoney();
    }
  },
  mounted() {
    this.getOrderDeskList();
  },
  methods: {
    getOrderDeskList: function() {
      let _this = this;
      _this
        .axios({
          method: "get",
          url: window.sHost + window.sUrl.shop.getOrderDeskList
        })
        .then(function(response) {
          let data = response.data;
          if (data.success) {
            _this.orderDeskList = data.obj;
          } else {
            window.master.fErrorMes(data.msg);
          }
        });
    },
    getOrderGoods: function(val) {
      let _this = this;
      _this
        .axios({
          method: "get",
          url:
            window.sHost +
            window.sUrl.shop.getOrderByDeskId +
            "?deskId=" +
            val.deskId
        })
        .then(function(response) {
          let data = response.data;
          if (data.success) {
            _this.deskGoodsList = data.obj;
            _this.dkName = val.deskName;
          } else {
            window.master.fErrorMes(data.msg);
          }
        });
    },
    //合计金额
    sumMoney: function() {
      let _this = this;
      _this.totalMoney = 0;
      this.deskGoodsList.forEach(row => {
        _this.totalMoney = (
          parseFloat(_this.totalMoney) + parseFloat(row.price * row.num)
        ).toFixed(2);
      });
    },
    //删除商品
    delGoods: function(scope) {
      let _this = this;
      if (_this.deskGoodsList.length > 1) {
        //调用后台删除商品
        _this.axios
          .post(
            window.sHost + window.sUrl.shop.deleteOrderInfo,
            "id=" + scope.row.id
          )
          .then(function(response) {
            let data = response.data;
            if (data.success) {
              _this.deskGoodsList.splice(scope.$index, 1);
            } else {
              window.master.fErrorMes(data.msg);
            }
          });
      } else {
        window.master.fErrorMes(
          "若需删除，请点击左边【" + _this.dkName + "】的【作废】按钮"
        );
      }
    },
    //作废
    cancleOrder: function(val) {
      let _this = this;
      _this
        .$confirm("确定作废【" + val.deskName + "】菜单?", "提示", {
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
                window.sHost + window.sUrl.shop.cancleOrder,
                "deskId=" + val.deskId
              )
              .then(function(response) {
                window.master.fLoadingClose();
                let data = response.data;
                if (data.success) {
                  _this.$router.replace("/refresh");
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
    },
    //结账操作
    finishOrder: function() {
      window.master.fErrorMes("待完善！");
      /* let _this = this;
      if (_this.deskGoodsList.length === 0) {
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
                data: _this.deskGoodsList
              })
              .then(function(response) {
                window.master.fLoadingClose();
                let data = response.data;
                if (data.success) {
                  _this.deskGoodsList = [];
                  window.master.fSuccessMes(data.msg);
                } else {
                  window.master.fErrorMes(data.msg);
                }
              });
          },
          () => {}
        );
      } */
    },
  }
};
</script>