import Vue from 'vue'
import App from './App.vue';
// 引入路由模块
import VueRouter from 'vue-router';
// 引入index模块
import index from './components/index.vue';

// 引入element模块 轮播图
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入懒加载
import VueLazyload from 'vue-lazyload';

import goodsInfo from './components/goodsInfo.vue';

// 公共部分--------------------------------
import axios from "axios";

import moment from "moment";
Vue.prototype.axios=axios;

// 正常的服务器
axios.defaults.baseURL = 'http://47.106.148.205:8899';

// 注册全局过滤器
Vue.filter('cutTime',function(value){
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
    }
  ]
})

// 引入公共样式
import './assets/statics/site/css/style.css'

Vue.config.productionTip = false

new Vue({
  // 渲染 App组件
  render: h => h(App),
  // 挂载到vue
  router
}).$mount('#app')