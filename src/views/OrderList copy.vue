<template>
  <div class="OrderList">
    <el-row :gutter="20">
      <el-col :span="4">
         <el-row style="margin-bottom:10px">
          <span style="font-size:16px;">待结账桌号</span>
        </el-row>
        <el-row v-for="item in deskList" :key="item.id" style="margin-bottom: 10px;">
          <el-col :span="16">
            <el-card shadow="hover" class="card_class">
              <div style="padding: 10px 5px;text-align: center;">
                <!-- <i class="el-icon-s-order" style="font-size: 30px;"></i> -->
                <span>05号桌</span>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8" style="padding-left: 10px;">
              <el-button type="danger" size="medium" style="padding: 12px;">删除</el-button>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="20">
        <!-- <div> -->

        <el-row>
          <el-card :body-style="{ padding: '0px' }">
            <el-row style="margin: 10px;line-height: 40px;">
              <span>总金额: ￥0.00</span>
              <span style="padding-left: 30px;">会员金额：￥0.00</span>
              <span style="float:right;margin-right:20px">
                <!-- <span style="padding-right: 30px;color:red;font-weight: 800;">{{custName}}</span> -->
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
      deskList: [
        { id: "11", name: "桌号1" },
        { id: "11", name: "桌号1" },
        { id: "11", name: "桌号1" },
        { id: "11", name: "桌号1" },
        { id: "11", name: "桌号1" },
        { id: "11", name: "桌号1" },
        { id: "11", name: "桌号1" },
        { id: "11", name: "桌号1" },
        { id: "11", name: "桌号1" },
        { id: "11", name: "桌号1" },
        { id: "11", name: "桌号1" }
      ]
    };
  },

  methods: {}
};
</script>