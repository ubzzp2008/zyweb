<template>
  <div class="OrderReport">
    <el-row>
      <el-row>
        <el-form :inline="true" :model="searchObj">
          <el-form-item label="商品编码">
            <el-input
              v-model.trim="searchObj.goodsCode"
              placeholder
              clearable
              @keyup.enter.native="fGetOrderReportList"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品名称">
            <el-input
              v-model.trim="searchObj.goodsName"
              placeholder
              clearable
              @keyup.enter.native="fGetOrderReportList"
            ></el-input>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker
              v-model="searchObj.orderDate"
              value-format="yyyy-MM-dd"
              type="date"
              style="width:100%"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="fSearch">查询</el-button>
            <el-button type="primary" size="small" @click="fExport">导出</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <!-- 操作按钮 -->
      <!-- <el-row style="margin-bottom:5px">
        <el-button type="primary" size="small" style="float:left" @click="addGoods">新增</el-button>
        <el-button type="warning" size="small" style="float:left" @click="editGoods">编辑</el-button>
        <el-button type="danger" size="small" style="float:left" @click="delGoods">删除</el-button>
      </el-row>-->
      <el-table :data="orderReportList" border style="width: 100%;" ref="clickTable">
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="goodsCode" label="商品编码" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column prop="goodsName" label="商品名称" :show-overflow-tooltip="true" align="center"></el-table-column>
        <el-table-column prop="unit" label="单位" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="price" label="售价" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.price? parseFloat(scope.row.price).toFixed(2):0.00.toFixed(2)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="num" label="售出数量" align="center"></el-table-column>
        <el-table-column prop="money" label="金额" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.money? parseFloat(scope.row.money).toFixed(2):0.00.toFixed(2)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="orderDate" label="日期" align="center"></el-table-column>
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
  </div>
</template>

<script>
//import { isArray } from "util";
export default {
  name: "OrderReport",
  data: function() {
    return {
      orderReportList: [],
      pageNum: 1, //分页数
      pageSize: 20, //每页数据
      total: null, //总页数
      searchObj: {
        goodsCode: null,
        goodsName: null,
        orderDate: null
      }
    };
  },

  mounted() {
    this.fGetOrderReportList();
  },
  watch: {},
  methods: {
    //每页条数
    handleSizeChange: function(pageSize) {
      let _this = this;
      _this.pageSize = pageSize;
      _this.fGetOrderReportList();
    },
    //页数切换
    handleCurrentChange: function(pageNum) {
      let _this = this;
      _this.pageNum = pageNum;
      _this.fGetOrderReportList();
    },
    fSearch: function() {
      let _this = this;
      _this.pageNum = 1;
      _this.fGetOrderReportList();
    },
    //获取table数据
    fGetOrderReportList: function() {
      let _this = this;
      window.master.fLoadingOpen();
      this.axios
        .post(window.sHost + window.sUrl.shop.queryOrderReportList, {
          pageNum: _this.pageNum,
          pageSize: _this.pageSize,
          goodsCode: window.master.strReplace(_this.searchObj.goodsCode),
          goodsName: window.master.strReplace(_this.searchObj.goodsName),
          orderDate: _this.searchObj.orderDate
        })
        .then(response => {
          window.master.fLoadingClose();
          if (response.data.success) {
            _this.orderReportList = response.data.obj.list;
            _this.total = response.data.obj.total;
          } else {
            window.master.fErrorMes(response.data.msg);
          }
        })
        .catch(() => {
          window.master.fLoadingClose();
        });
    },
    //导出
    fExport: function() {
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
    }
  }
};
</script>