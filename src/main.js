import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './directive/drag';
import store from './store';
import './url.js';
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(VueAxios, axios);


window.sHost = "http://localhost:8081/demo"; //这里是测试环境中的url


// request拦截器
axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    Promise.reject(error)
  })

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  window.master.fErrorMes(error);
});


window.master = new Vue({
  router,
  store,
  render: h => h(App),
  methods: {
    //-------------根组件的实例方法
    //获取当前日期
    fGetNowFormatDate: function () {
      let date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },

    //url替换
    fUrlRepalce: function (url, str, param) {
      // console.log(url.indexOf(str))
      return url.indexOf(str) != -1 ? url.replace(str, param) : url
    },


    //查询替换
    strReplace: function (str) {
      //return str ? str.replace(/\*/g, "%") : null;
      return str ? "%" + str + "%" : null;
    },

    //CST格式的日期转换为制定格式String

    fDateFormat: function (dates, format) {
      let date = new Date(dates);

      var o = {
        'M+': date.getMonth() + 1, //month
        'd+': date.getDate(), //day
        'H+': date.getHours(), //hour
        'm+': date.getMinutes(), //minute
        's+': date.getSeconds(), //second
        'S': date.getMilliseconds() //millisecond
      };

      if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));

      for (var k in o)
        if (new RegExp('(' + k + ')').test(format))
          format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
      if (format == "NaN-aN-aN") {
        return format = null
      }
      return format;
    },


    //提示通知成功信息不需要确定
    fWarningMes: function (des) {
      this.$notify({
        title: '警告',
        message: des,
        type: 'warning'
      });
    },

    fErrorMes: function (des) {
      this.$confirm(des, '提示', {
        confirmButtonText: '确定',
        type: 'error',
        showCancelButton: false, //是否显示取消按钮
        closeOnClickModal: false,
        closeOnPressEscape: false,
        center: true
      })
    },
    //警告提示弹框需要确定
    fWarningCenterMes: function (des) {
      this.$confirm(des, '提示', {
        confirmButtonText: '确定',
        type: 'warning',
        showCancelButton: false, //是否显示取消按钮
        closeOnClickModal: false,
        closeOnPressEscape: false,
        center: true
      })
    },
    //提示通知成功信息不需要确定
    fSuccessMes: function (des) {
      this.$notify({
        title: '成功',
        message: des,
        type: 'success'
      });
    },
    //-------全局--加载model层打开
    fLoadingOpen: function () {
      window.master.isLoading = true;
      this.loading = this.$loading({
        lock: true,
        text: '加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
    },
    fLoadingClose: function () {
      if (window.master.isLoading) {
        this.loading.close();
        window.master.isLoading = false;
      }
    },
  }
}).$mount('#app');


// toFixed兼容方法
Number.prototype.toFixed = function (n) {
  if (n > 20 || n < 0) {
    throw new RangeError('toFixed() digits argument must be between 0 and 20');
  }
  const number = this;
  if (isNaN(number) || number >= Math.pow(10, 21)) {
    return number.toString();
  }
  if (typeof (n) == 'undefined' || n == 0) {
    return (Math.round(number)).toString();
  }

  let result = number.toString();
  const arr = result.split('.');

  // 整数的情况
  if (arr.length < 2) {
    result += '.';
    for (let i = 0; i < n; i += 1) {
      result += '0';
    }
    return result;
  }

  const integer = arr[0];
  const decimal = arr[1];
  if (decimal.length == n) {
    return result;
  }
  if (decimal.length < n) {
    for (let i = 0; i < n - decimal.length; i += 1) {
      result += '0';
    }
    return result;
  }
  result = integer + '.' + decimal.substr(0, n);
  const last = decimal.substr(n, 1);

  // 四舍五入，转换为整数再处理，避免浮点数精度的损失
  if (parseInt(last, 10) >= 5) {
    const x = Math.pow(10, n);
    result = (Math.round((parseFloat(result) * x)) + 1) / x;
    result = result.toFixed(n);
  }

  return result;
};