import Vue from 'vue';

// 引入element模块 轮播图
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 使用element
Vue.use(ElementUI);

// 引入iView
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

// 引入moment
import moment from "moment";
// 使用moment 注册全局过滤器
Vue.filter('cutTime', function (value,myTime) {
  if(myTime){
    return moment(value).format(myTime);
  }else{
    return moment(value).format("YYYY年MM月DD日");
  }
});

// 引入懒加载
import VueLazyload from 'vue-lazyload';
// 使用懒加载
Vue.use(VueLazyload, {
  loading: require("../assets/statics/site/images/01.gif")
});

