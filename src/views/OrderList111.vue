<template>
  <div class="OrderList">
    <el-tabs type="border-card" tab-position="left">
      <el-tab-pane :label="item.name" v-for="item in deskList" :key="item.id">
        <el-row :gutter="20">
          <el-col :span="14">
            <div>
              <el-card :body-style="{ padding: '0px' }">
                <el-row>
                  <div style="padding: 5px;text-align:center;">
                    <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm">
                      <el-form-item label="桌号：" prop="deskNo">
                        <el-input v-model.trim="ruleForm.deskNo" placeholder="请输入桌号"></el-input>
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
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
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