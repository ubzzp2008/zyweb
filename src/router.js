import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Home from './views/Home.vue'

Vue.use(Router)


//解决vue项目路由出现message: "Navigating to current location (XXX) is not allowed"的问题
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error);
}



const router = new Router({
  routes: [
    //登录页
    {
      path: '/login',
      name: 'Login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Login
    },
    //首页
    {
      path: '/',
      redirect: '/home'

    },
    {
      path: '/home',
      component: Home,
      redirect: '/addGoods',
      children: [
        //hello欢迎页面
        {
          path: '/addGoods',
          name: 'AddGoods',
          component: () => import('./views/AddGoods.vue')
        },
        {
          path: '/orderList',
          name: 'OrderList',
          component: () => import('./views/OrderList.vue')
        },
        {
          path: '/customer',
          name: 'Customer',
          component: () => import('./views/Customer.vue')
        },
        {
          path: '/report',
          name: 'Report',
          component: () => import('./views/Report.vue')
        },
        {
          path: '/goodsList',
          name: 'GoodsList',
          component: () => import('./views/GoodsList.vue')
        }
      ]
    }
  ]

})


//路由全局钩子
//前置守卫 在组件还没有解析前
/* router.beforeEach((to, from, next) => {
  if (to.name === "login" || to.name === "notFound") {
    store.state.bMenuShowFlag = false;
  } else {
    store.state.bMenuShowFlag = true;
  }

  next();

}) */

export default router

// 1、声明式： 1) 根据路由路径（/home/sort/detail）跳转 <router-link :to="{path: '/home/sort/detail', query:{id: 'abc'}}">点击查看子页面</router-link>
//              2) 根据路由名称（detail）跳转 <router-link :to="{name: 'detail', params:{id: 'abc'}}">点击查看子页面</router-link>
//                 :to=""  可以实现绑定动态的 路由 和 参数

//   2、编程式： 1） this.$router.push({path: '/home/sort/detail',query:{id: 'abc'}})
//              2） this.$router.push({name: 'detail',params:{id: 'abc'}})
// 备注： params 和 query 传参的区别：
// 1、params传参时  参数不会出现在url的路径上面， 但是刷新页面时param里面的数据会消失
// 2、query传参时   参数出现在url的路径上面， 刷新页面时query里面的数据不变

// ————————————————
// 注：1.*  为通配符，匹配所有路径。redirect:重定向到404页面。

//        2. 必须将此路由配置放到最后，否则无法实现该功能。