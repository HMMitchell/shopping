import Vue from 'vue'
import App from './App.vue';
// 引入路由模块
import VueRouter from 'vue-router';
import Vuex from 'vuex';

// 引入index模块
import index from './components/index.vue';

// 引入element模块 轮播图
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入懒加载
import VueLazyload from 'vue-lazyload';
// 引入goodsInfo模块
import goodsInfo from './components/goodsInfo.vue';
// 引入buycar模块
import buycar from "./components/buycar.vue";
// 引入payorder模块
import payorder from "./components/payorder.vue";
// 引入登录模块
import login from "./components/login.vue"

import iView from 'iview';
import 'iview/dist/styles/iview.css';

// 公共部分--------------------------------
import axios from "axios";

import moment from "moment";
Vue.prototype.axios = axios;


// 正常的服务器
axios.defaults.baseURL = 'http://47.106.148.205:8899';
// 设置带上cookie
axios.defaults.withCredentials = true

// 注册全局过滤器
Vue.filter('cutTime', function (value) {
  return moment(value).format("YYYY年MM月DD日");
});

// ---------------------------------------------
// 使用element
Vue.use(ElementUI);
// 使用路由中间件
Vue.use(VueRouter);
// 使用懒加载
Vue.use(VueLazyload, {
  loading: require("./assets/statics/site/images/01.gif")
});

Vue.use(iView);
Vue.use(Vuex);
// 注册路由规则
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
      path: '/payorder',
      component: payorder,
    },
    {
      path: '/login',
      component: login,
    },

  ]
})

// 引入公共样式
import './assets/statics/site/css/style.css'

Vue.config.productionTip = false
// vuex部分
// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
// 判断数据是否存在
let buyList = JSON.parse(window.localStorage.getItem('buyList')) || {};


const store = new Vuex.Store({
  // 状态
  state: {
    // 购买的数量
    // buyList: {}
    buyList,
    // 登录
    isLogin:false,
    fromPath:'',
  },
  // 计算属性的
  getters: {
    totalNum(state) {
      // 用一个值保存总数
      let num = 0;
      // 遍历对象
      for (var key in state.buyList) {
        num += parseInt(state.buyList[key]);
      }
      //  返回总数
      return num
    }
  },
  // 库
  mutations: {
    // 有就累加 没有就 直接赋值
    increment(state, info) {
      // info  {id:0 num:1} 这种形式 有字符串要转数字
      if (state.buyList[info.id]) {
        // 有就添加 
        // state.buyList[info.id]+=info.num
        // 以下是转数字
        let oldNum = parseInt(state.buyList[info.id])
        oldNum += parseInt(info.num);
        state.buyList[info.id] = oldNum;
      } else {
        // 
        // state.buyList[info.id]=info.num
        // 跟踪数据
        Vue.set(state.buyList, info.id, parseInt(info.num))
      }
    },
    // 直接更新 在购物车页加减数量后更新数据
    updateCount(state, info) {
      state.buyList[info.id] = info.num
    },
    // 删除
    deleteCount(state, id) {
      // 这样删除购物车的数字不会改变,所以要告诉vue已经删除了这个属性
      // delete state.buyList[id]
      Vue.delete(state.buyList, id);
    },
    // 登录逻辑----------
    // 修改登录状态
    changLogin(state,isLogin) {
      sessionStorage.setItem("isLogin",state.isLogin);
      state.isLogin = isLogin
    },
    // 修改回来时的路由
    rememberFromPath(state,path){
      state.fromPath = path;
    }
  },

});

// 注册路由守卫(每次路由跳转时 增加的过滤规则)
router.beforeEach((to, from, next) => {
  // console.log(to);
  // console.log(from);
  // console.log(next);
  store.commit('rememberFromPath',from.path)
  if (to.path == '/payorder') {
    axios.get('/site/account/islogin')
      .then((response) => {
         console.log(response)
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

})

new Vue({
  // 渲染 App组件
  render: h => h(App),
  // 挂载到vue
  router,
  store
}).$mount('#app');

// 关闭浏览器或者刷新的方法
window.onbeforeunload = function () {
  // 保存数据到localStorage
  window.localStorage.setItem('buyList', JSON.stringify(store.state.buyList));
}