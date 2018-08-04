import Vue from 'vue'
// 引入路由模块
import VueRouter from 'vue-router';
// ---------------------------页面的组件
// 引入index模块
import index from '../components/index.vue';
// 引入goodsInfo模块
import goodsInfo from '../components/goodsInfo.vue';
// 引入buycar模块
import buycar from "../components/buycar.vue";
// 引入payorder模块
import payorder from "../components/payorder.vue";
// 引入登录模块
import login from "../components/login.vue";
// 引入付款页模块
import orderInfo from "../components/orderInfo.vue";
// 付款成功的页面的模块
import paySuccess from '../components/paySuccess.vue';
// 会员中心模块
import memberCenter from '../components/memberCenter.vue';
// 交易订单模块
import orderlist from '../components/orderlist.vue';
// 查看订单模块
import lookOrder from '../components/lookOder.vue';
// --------------------------------
// 引入自己封装的store
import store from "./vuexStore.js";
// 进入axios
import axios from "axios";
// 使用路由中间件
Vue.use(VueRouter);
// 使用axios
Vue.prototype.axios = axios;
// 正常的服务器
axios.defaults.baseURL = 'http://47.106.148.205:8899';
// axios.defaults.baseURL = 'http://39.108.135.214:8899/';

// 设置带上cookie
axios.defaults.withCredentials = true;
// ------------------
// 注册路由规则 挂载路由
const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: 'index'
        },

        {
            path: '/index',
            component: index,
        },
        {
            path: '/goodsInfo/:id',
            component: goodsInfo,
        },
        {
            path: '/buycar',
            component: buycar,
        },
        {
            path: '/payorder/:ids',
            component: payorder,
            meta: { checkLogin: true }
        },
        {
            path: '/login',
            component: login,
        },
        {
            path: '/orderInfo/:orderid',
            component: orderInfo,
            meta: { checkLogin: true }
        },
        {
            path: '/paySuccess',
            component: paySuccess,
            meta: { checkLogin: true }
        },
        {
            path: '/memberCenter',
            component: memberCenter,
            meta: { checkLogin: true }
        },
        {
            path: '/orderlist',
            component: orderlist,
            meta: { checkLogin: true }
        },
        {
            path: '/lookOrder/:orderid',
            component: lookOrder,
            meta: { checkLogin: true }
        },
    ]
});

// 注册路由守卫(每次路由跳转时 增加的过滤规则)
router.beforeEach((to, from, next) => {
    // console.log(to);
    // console.log(from);
    // console.log(next);
    store.commit('rememberFromPath',from.path)
    // if (to.path.indexOf('/payorder')!=-1) {
      if(to.meta.checkLogin){
      axios.get('/site/account/islogin')
        .then((response) => {
          //  console.log(response)
          // 没登录
          if (response.data.code == 'nologin') {
            next('/login')
          } else {
            next();
          }
        })
        .catch(function (error) {
          console.log(error);
        })
    }else{
      next();
    }
  
  });
export default router