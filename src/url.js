//url分别请求地址
window.sUrl = {
    shop: {
        //会员管理
        queryCustomerList: "/shop/cust/queryCustomerList",
        checkPhoneExist: "/shop/cust/checkPhoneExist",
        getCustomerByPhone: "/shop/cust/getCustomerByPhone",
        saveCustomer: "/shop/cust/saveCustomer",
        getCustomerById: "/shop/cust/getCustomerById",
        updateCustomer: "/shop/cust/updateCustomer",
        deleteCustomer: "/shop/cust/deleteCustomer",
        //商品管理
        queryGoodsList: "/shop/goods/queryGoodsList",
        checkCodeExist: "/shop/goods/checkCodeExist",
        saveGoods: "/shop/goods/saveGoods",
        getGoodsById: "/shop/goods/getGoodsById",
        updateGoods: "/shop/goods/updateGoods",
        deleteGoods: "/shop/goods/deleteGoods",
        getAllGoodsList: "/shop/goods/getAllGoodsList",
        //餐桌管理
        queryDeskList: "/shop/desk/queryDeskList",
        checkDeskCodeExist: "/shop/desk/checkDeskCodeExist",
        saveDesk: "/shop/desk/saveDesk",
        getDeskById: "/shop/desk/getDeskById",
        updateDesk: "/shop/desk/updateDesk",
        deleteDesk: "/shop/desk/deleteDesk",
        getUseableDeskList: "/shop/desk/getUseableDeskList",
        //挂单
        saveOrder: "/shop/order/saveOrder",//挂单操作
        getOrderDeskList: "/shop/order/getOrderDeskList",
        getOrderByDeskId: "/shop/order/getOrderByDeskId",
        deleteOrderInfo: "/shop/order/deleteOrderInfo",
        cancleOrder: "/shop/order/cancleOrder",

        saveOrderListToReport: "/shop/report/saveOrderListToReport",//挂单中的结账
        saveOrderReportBatch: "/shop/report/saveOrderReportBatch",
        queryOrderReportList: "/shop/report/queryOrderReportList",
        exportOrderReportList: "/shop/report/exportOrderReportList",
        queryGoodsReportList: "/shop/report/queryGoodsReportList",
        queryMoneyReportList: "/shop/report/queryMoneyReportList",


        printOrderDetail: "/shop/report/printOrderDetail",

        //支出报表
        queryPayReportList:"/shop/pay/queryPayReportList",
        savePayReport:"/shop/pay/savePayReport",
        deletePayReport:"/shop/pay/deletePayReport",

    }

}