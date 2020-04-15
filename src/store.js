import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //顶部菜单是否显示
    //提示只能选择一条数据的描述
    sOnlySelectOneMes: "请选择一条数据",
    //提示没有选择数据的描述
    sRequireSelectMes: "请选择需要操作的数据",
    //按钮类型
    btnTypeEnum: ["success", "warning", "danger", "primary"],
  },
  mutations: {

  },
  actions: {

  }
})



//日期格式化
window.Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}


//Vue公用函数方法
// Vue.prototype.changeData = function (){//changeData是函数名
//   alert('执行成功');
// }