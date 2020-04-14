<template>
  <!--系统管理/菜单管理 -->
  <div class="Test">
    <el-row :gutter="20">
      <el-col :span="14">
        <div>
          <el-table :data="tableData" border style="width: 100%;" max-height="550" ref="clickTable">
            <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
            <!-- <el-table-column type="index" label="序号" width="50" align="center"></el-table-column> -->
            <el-table-column prop="maktx" label="商品名称" :show-overflow-tooltip="true" align="center"></el-table-column>
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
                  :min="0"
                  :max="999999"
                ></el-input-number>
              </template>
            </el-table-column>
            <el-table-column label="原价" prop="totalMoney" align="center" width="150">
              <template slot-scope="scope">
                <span>{{scope.row.totalMoney? parseFloat(scope.row.totalMoney).toFixed(2):0.00.toFixed(2)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="折扣价" prop="totalMoney" align="center" width="150">
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
          <el-card :body-style="{ padding: '0px' }">
            <div style="padding: 14px;">
              <span>原价: ￥{{hjMoney}}</span>
              <span style="padding-left: 30px;">折扣价：￥{{disMoney}}</span>
              <div style="padding-top:10px;">
                <el-button type="warning" size="medium" @click="delGoods(scope)">挂单</el-button>
                <el-button type="danger" size="medium" @click="delGoods(scope)">删除</el-button>
                <el-button type="success" size="medium" @click="delGoods(scope)">结账</el-button>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="10">
        <div style="background-color:grey;">fdsafdsa</div>
      </el-col>
    </el-row>
  </div>
</template>

<style>
.el-input-number {
  /* position: relative;
    display: inline-block; */
  width: 140px;
  /* line-height: 38px; */
}
</style>

<script>
//import { isArray } from "util";
export default {
  name: "Test",
  data: function() {
    return {
      hjMoney: 0.0,
      disMoney: 0.0,
      tableData: [
        {
          id: "12987122",
          maktx: "王小虎1",
          price: 12.0,
          num: 6.0,
          totalMoney: 72.0,
          money: 72.0
        },
        {
          id: "12987123",
          maktx: "王小虎1",
          price: 12.0,
          num: 6.0,
          totalMoney: 72.0,
          money: 72.0
        },
        {
          id: "12987124",
          maktx: "王小虎1",
          price: 12.0,
          num: 6.0,
          totalMoney: 72.0,
          money: 72.0
        },
        {
          id: "12987125",
          maktx: "王小虎1",
          price: 12.0,
          num: 6.0,
          totalMoney: 72.0,
          money: 72.0
        },
        {
          id: "12987126",
          maktx: "王小虎1",
          price: 12.0,
          num: 6.0,
          totalMoney: 72.0,
          money: 72.0
        },
        {
          id: "12987126",
          maktx: "王小虎1",
          price: 12.0,
          num: 6.0,
          totalMoney: 72.0,
          money: 72.0
        },
        {
          id: "12987126",
          maktx: "王小虎1",
          price: 12.0,
          num: 6.0,
          totalMoney: 72.0,
          money: 72.0
        },
        {
          id: "12987126",
          maktx: "王小虎1",
          price: 12.0,
          num: 6.0,
          totalMoney: 72.0,
          money: 72.0
        },
        {
          id: "12987126",
          maktx: "王小虎1",
          price: 12.0,
          num: 6.0,
          totalMoney: 72.0,
          money: 72.0
        },
        {
          id: "12987126",
          maktx: "王小虎1",
          price: 12.0,
          num: 6.0,
          totalMoney: 72.0,
          money: 72.0
        },
        {
          id: "12987126",
          maktx: "王小虎1",
          price: 12.0,
          num: 6.0,
          totalMoney: 72.0,
          money: 72.0
        },
        {
          id: "12987126",
          maktx: "王小虎1",
          price: 12.0,
          num: 6.0,
          totalMoney: 72.0,
          money: 72.0
        },
        {
          id: "12987126",
          maktx: "王小虎1",
          price: 12.0,
          num: 6.0,
          totalMoney: 72.0,
          money: 72.0
        },
        {
          id: "12987126",
          maktx: "王小虎1",
          price: 12.0,
          num: 6.0,
          totalMoney: 72.0,
          money: 72.0
        },
        {
          id: "12987126",
          maktx: "王小虎1",
          price: 12.0,
          num: 6.0,
          totalMoney: 72.0,
          money: 72.0
        },
        {
          id: "12987126",
          maktx: "王小虎1",
          price: 12.0,
          num: 6.0,
          totalMoney: 72.0,
          money: 72.0
        },
        {
          id: "12987126",
          maktx: "王小虎1",
          price: 12.0,
          num: 6.0,
          totalMoney: 72.0,
          money: 72.0
        },
        {
          id: "12987126",
          maktx: "王小虎1",
          price: 12.0,
          num: 6.0,
          totalMoney: 72.0,
          money: 72.0
        },
        {
          id: "12987126",
          maktx: "王小虎1",
          price: 12.0,
          num: 6.0,
          totalMoney: 72.0,
          money: 72.0
        },
        {
          id: "12987126",
          maktx: "王小虎1",
          price: 12.0,
          num: 6.0,
          totalMoney: 72.0,
          money: 72.0
        },
        {
          id: "12987126",
          maktx: "王小虎1",
          price: 12.0,
          num: 6.0,
          totalMoney: 72.0,
          money: 72.0
        },
        {
          id: "12987126",
          maktx: "王小虎1",
          price: 12.0,
          num: 6.0,
          totalMoney: 72.0,
          money: 72.0
        },
        {
          id: "12987126",
          maktx: "王小虎1",
          price: 12.0,
          num: 6.0,
          totalMoney: 72.0,
          money: 72.0
        }
      ]
    };
  },

  mounted() {
    this.sumMoney();
  },
  watch: {},
  methods: {
    delGoods: function(scope) {
      this.tableData.splice(scope.$index, 1);
      this.sumMoney();
    },
    numChange: function(val, scope) {
      this.tableData[scope.$index].totalMoney = parseFloat(
        scope.row.price * val
      ).toFixed(2);
      this.sumMoney();
    },
    sumMoney: function() {
      let _this = this;
      _this.hjMoney = 0;
      this.tableData.forEach(row => {
        _this.hjMoney = (
          parseFloat(_this.hjMoney) + parseFloat(row.price * row.num)
        ).toFixed(2);
        /*  if (index === 0) {
            sums[index] = '总价';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = 'N/A';
          } */
      });
    }
  }
};
</script>