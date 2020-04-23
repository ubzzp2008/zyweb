<template>
  <div class="SummaryReport">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="never">
          <el-row style="margin-bottom:10px;text-align: center;">
            <span style="font-size:16px;">商品售出统计</span>
          </el-row>
          <el-row>
            <el-row>
              <el-form :inline="true" :model="searchGoods">
                <el-form-item label="商品编码">
                  <el-input
                    v-model.trim="searchGoods.goodsCode"
                    placeholder
                    clearable
                    @keyup.enter.native="fSearchGoodsData"
                  ></el-input>
                </el-form-item>
                <el-form-item label="商品名称">
                  <el-input
                    v-model.trim="searchGoods.goodsName"
                    placeholder
                    clearable
                    @keyup.enter.native="fSearchGoodsData"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" size="small" @click="fSearchGoodsData">查询</el-button>
                </el-form-item>
              </el-form>
            </el-row>
            <el-table :data="goodsReportList" border style="width: 100%;" ref="clickTable">
              <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
              <el-table-column
                prop="goodsCode"
                label="商品编码"
                :show-overflow-tooltip="true"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="goodsName"
                label="商品名称"
                :show-overflow-tooltip="true"
                align="center"
              ></el-table-column>
              <el-table-column prop="unit" label="单位" align="center"></el-table-column>
              <el-table-column prop="num" label="售出数量" align="center"></el-table-column>
            </el-table>
            <el-pagination
              @size-change="goodsSizeChange"
              @current-change="goodsCurrentChange"
              :current-page="goodsPageNum"
              :page-sizes="[20, 30, 50, 100]"
              :page-size="goodsPageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="goodsTotal"
            ></el-pagination>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="never">
          <el-row style="margin-bottom:10px;text-align: center;">
            <span style="font-size:16px;">收入汇总统计</span>
          </el-row>
          <el-row>
            <el-row>
              <div style="display:inline-block;margin-bottom: 10px;">
                <el-date-picker
                  v-model="orderDate"
                  type="daterange"
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
                <el-button
                  type="primary"
                  style="margin-left:10px;"
                  size="small"
                  @click="fSearchMoneyData"
                >查询</el-button>
              </div>
              <!-- <el-form :inline="true">
                <el-form-item label="日期">
                  <el-date-picker
                    v-model="orderDate"
                    value-format="yyyy-MM-dd"
                    type="date"
                    style="width:100%"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" size="small" @click="fGetMoneyReportList">查询</el-button>
                </el-form-item>
              </el-form>-->
            </el-row>
            <el-table
              :data="moneyReportList"
              border
              show-summary
              style="width: 100%;"
              ref="clickTable"
            >
              <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
              <el-table-column
                prop="orderDate"
                label="日期"
                :show-overflow-tooltip="true"
                align="center"
              ></el-table-column>
              <el-table-column prop="moneyIn" label="收入" align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.moneyIn? parseFloat(scope.row.moneyIn).toFixed(2):0.00.toFixed(2)}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="moneyOut" label="支出" align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.moneyOut? parseFloat(scope.row.moneyOut).toFixed(2):0.00.toFixed(2)}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="money" label="盈亏" align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.money? parseFloat(scope.row.money).toFixed(2):0.00.toFixed(2)}}</span>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              @size-change="moneySizeChange"
              @current-change="moneyCurrentChange"
              :current-page="moneyPageNum"
              :page-sizes="[20, 30, 50, 100]"
              :page-size="moneyPageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="moneyTotal"
            ></el-pagination>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss">
.SummaryReport {
  .el-card__body {
    padding: 5px;
  }
  .el-form-item {
    margin-bottom: 10px;
  }
  .el-form--inline .el-form-item__content {
    width: 150px;
  }
}
</style>

<script>
export default {
  name: "SummaryReport",
  data: function() {
    return {
      //商品统计
      goodsReportList: [],
      goodsPageNum: 1, //分页数
      goodsPageSize: 20, //每页数据
      goodsTotal: null, //总页数
      searchGoods: {
        goodsCode: null,
        goodsName: null
      },
      //收入统计
      moneyReportList: [],
      moneyPageNum: 1, //分页数
      moneyPageSize: 20, //每页数据
      moneyTotal: null, //总页数
      orderDate: []
    };
  },

  mounted() {
    this.fSearchGoodsData();
    this.fSearchMoneyData();
  },
  watch: {},
  methods: {
    //商品统计
    //每页条数
    goodsSizeChange: function(pageSize) {
      let _this = this;
      _this.goodsPageSize = pageSize;
      _this.fGetGoodsReportList();
    },
    //页数切换
    goodsCurrentChange: function(pageNum) {
      let _this = this;
      _this.goodsPageNum = pageNum;
      _this.fGetGoodsReportList();
    },
    fSearchGoodsData: function() {
      let _this = this;
      _this.goodsPageNum = 1;
      _this.fGetGoodsReportList();
    },
    fGetGoodsReportList: function() {
      let _this = this;
      this.axios
        .post(window.sHost + window.sUrl.shop.queryGoodsReportList, {
          pageNum: _this.goodsPageNum,
          pageSize: _this.goodsPageSize,
          goodsCode: window.master.strReplace(_this.searchGoods.goodsCode),
          goodsName: window.master.strReplace(_this.searchGoods.goodsName)
        })
        .then(response => {
          if (response.data.success) {
            _this.goodsReportList = response.data.obj.list;
            _this.goodsTotal = response.data.obj.total;
          } else {
            window.master.fErrorMes(response.data.msg);
          }
        })
        .catch(() => {});
    },
    //收入统计
    //每页条数
    moneySizeChange: function(pageSize) {
      let _this = this;
      _this.moneyPageSize = pageSize;
      _this.fGetMoneyReportList();
    },
    //页数切换
    moneyCurrentChange: function(pageNum) {
      let _this = this;
      _this.moneyPageNum = pageNum;
      _this.fGetMoneyReportList();
    },
    fSearchMoneyData: function() {
      let _this = this;
      _this.moneyPageNum = 1;
      _this.fGetMoneyReportList();
    },
    fGetMoneyReportList: function() {
      let _this = this;
      this.axios
        .post(window.sHost + window.sUrl.shop.queryMoneyReportList, {
          pageNum: _this.moneyPageNum,
          pageSize: _this.moneyPageSize,
          startDate: _this.orderDate ? _this.orderDate[0] : null,
          endDate: _this.orderDate ? _this.orderDate[1] : null
        })
        .then(response => {
          if (response.data.success) {
            _this.moneyReportList = response.data.obj.list;
            _this.moneyTotal = response.data.obj.total;
          } else {
            window.master.fErrorMes(response.data.msg);
          }
        })
        .catch(() => {});
    }
  }
};
</script>