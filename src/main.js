import Vue from 'vue'
import App from './App.vue';
// 引入路由模块
import VueRouter from 'vue-router';
// 引入index模块
import index from './components/index.vue';

// 使用路由中间件
Vue.use(VueRouter);

// 注册路由规则
const router = new VueRouter({
  routes: [{
    path: '/index',
    component: index,
  }]
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