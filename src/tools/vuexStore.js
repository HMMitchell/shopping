import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);

// vuex部分
// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
// 判断数据是否存在
let buyList = JSON.parse(window.localStorage.getItem('buyList')) || {};
// store
const store = new Vuex.Store({
    // 状态
    state: {
        // 购买的数量
        // buyList: {}
        buyList,
        // 登录
        isLogin: false,
        fromPath: '',
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
    // 改变库
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
        changLogin(state, isLogin) {
            state.isLogin = isLogin
        },
        // 修改回来时的路由
        rememberFromPath(state, path) {
            state.fromPath = path;
        }
    },

});

// 关闭浏览器或者刷新的方法
window.onbeforeunload = function () {
    // 保存数据到localStorage
    window.localStorage.setItem('buyList', JSON.stringify(store.state.buyList));
};

export default store
