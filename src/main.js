import Vue from 'vue'
import App from './App.vue';

// 引入封装的路由(挂载路由写在这个文件里)
import router from './tools/router.js';

// 引入自己封装的vueX里的store(vuex的store相关的写在这);
import store from './tools/vuexStore.js';

// 引入第三方包(要用第三方包的写在这)
import "./tools/libs.js"

// 引入公共样式
import './assets/statics/site/css/style.css'

Vue.config.productionTip = false

new Vue({
  // 渲染 App组件
  render: h => h(App),
  // 挂载到vue
  router,
  store,
  // 用生命周期函数判断登录状态isLogin
  beforeCreate() {
    this.axios.get('site/account/islogin')
    .then((response) => {
        //  console.log(response)
        if(response.data.code=='logined'){
          store.state.isLogin=true;
        }
    })
    .catch(function (error) {
    console.log(error);
    })
  },
}).$mount('#app');

