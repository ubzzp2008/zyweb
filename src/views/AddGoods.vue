<template>
  <!--系统管理/菜单管理 -->
  <div class="Test">
    <el-row :gutter="20">
      <el-col :span="14">
        <div>
          <el-card :body-style="{ padding: '0px' }">
            <el-row style="margin: 10px;line-height: 40px;">
              <span>总金额: ￥{{hjMoney}}</span>
              <span style="padding-left: 30px;">会员金额：￥{{disMoney}}</span>

              <span style="float:right;margin-right:20px">
                <el-button type="danger" size="medium" @click="delGoods(scope)">清空</el-button>
                <el-button type="warning" size="medium" @click="delGoods(scope)">挂单</el-button>
                <el-button type="success" size="medium" @click="delGoods(scope)">结账</el-button>
              </span>
            </el-row>
          </el-card>
          <el-table :data="goodsData" border style="width: 100%;max-height:500px;" ref="clickTable">
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
            <el-table-column label="金额" prop="totalMoney" align="center" width="110">
              <template slot-scope="scope">
                <span>{{scope.row.totalMoney? parseFloat(scope.row.totalMoney).toFixed(2):0.00.toFixed(2)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="会员价" prop="totalMoney" align="center" width="110">
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
          <el-col :span="7" :offset="1">
            <el-card shadow="hover" class="card_class">
              <div style="padding: 5px;" @click="goodsClick">
                <span>好吃的汉堡￥6.00</span>
                <div class="bottom clearfix">
                  <time class="huiyuan">会员价￥5.50</time>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-card shadow="hover" class="card_class">
              <div style="padding: 5px;" @click="goodsClick">
                <span>好吃的汉堡￥6.00</span>
                <div class="bottom clearfix">
                  <time class="huiyuan">会员价￥5.50</time>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-card shadow="hover" class="card_class">
              <div style="padding: 5px;" @click="goodsClick">
                <span>好吃的汉堡￥6.00</span>
                <div class="bottom clearfix">
                  <time class="huiyuan">会员价￥5.50</time>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-card shadow="hover" class="card_class">
              <div style="padding: 5px;" @click="goodsClick">
                <span>好吃的汉堡￥6.00</span>
                <div class="bottom clearfix">
                  <time class="huiyuan">会员价￥5.50</time>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-card shadow="hover" class="card_class">
              <div style="padding: 5px;" @click="goodsClick">
                <span>好吃的汉堡￥6.00</span>
                <div class="bottom clearfix">
                  <time class="huiyuan">会员价￥5.50</time>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-card shadow="hover" class="card_class">
              <div style="padding: 5px;" @click="goodsClick">
                <span>好吃的汉堡￥6.00</span>
                <div class="bottom clearfix">
                  <time class="huiyuan">会员价￥5.50</time>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <el-row style="margin-bottom:10px">
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
        </el-row>

        <!-- </div> -->
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
.card_class:hover {
  color: #409eff;
  background: #ecf5ff;
  border: 1px solid #dcdfe6;
  cursor: pointer;
}
.el-table {
  overflow: auto;
}
.el-table .cell {
  line-height: 20px;
}
.el-table td,
.el-table th {
  padding: 2px 0;
}

.el-card__body {
  padding: 0px;
  text-align: center;
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

.el-table--border::after, .el-table--group::after, .el-table::before {
    content: '';
    display: none;
    position: absolute;
    background-color: #EBEEF5;
    z-index: 1;
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
      goodsData: [
        {
          id: "12987122",
          maktx: "菜品1",
          price: 12.0,
          num: 6.0,
          totalMoney: 72.0,
          money: 72.0
        },
        {
          id: "12987126",
          maktx: "菜品2",
          price: 12.0,
          num: 6.0,
          totalMoney: 72.0,
          money: 72.0
        },
        {
          id: "12987126",
          maktx: "菜品3",
          price: 12.0,
          num: 6.0,
          totalMoney: 72.0,
          money: 72.0
        },
        {
          id: "12987126",
          maktx: "菜品4",
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
    goodsClick: function() {
      this.goodsData.push({
        id: "12",
        maktx: "菜品4",
        price: 11.0,
        num: 1.0,
        totalMoney: 122.0,
        money: 82.0
      });
      this.sumMoney();
    },
    delGoods: function(scope) {
      this.goodsData.splice(scope.$index, 1);
      this.sumMoney();
    },
    numChange: function(val, scope) {
      this.goodsData[scope.$index].totalMoney = parseFloat(
        scope.row.price * val
      ).toFixed(2);
      this.sumMoney();
    },
    sumMoney: function() {
      let _this = this;
      _this.hjMoney = 0;
      this.goodsData.forEach(row => {
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