import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // 初始值在本地存储获取 本地存储没有则用[]
        users: JSON.parse(localStorage.getItem('users')) || [],
        currentUser: JSON.parse(localStorage.getItem('currentUser')) || null
    },
    mutations: {
        // 设置当前的user状态
        setUser(state, user) {
            state.currentUser = user;
        },
        // 清除当前user状态
        clearUser(state) {
            state.currentUser = null
        },
        // 给user添加东西的设置
        addUser(state, user) {
            // if (!Array.isArray(state.users)) {
            //     state.users = [];
            // }
            state.users.push(user)
            localStorage.setItem('users', JSON.stringify(state.users))
        }
    },
    actions: {
        async login({ commit, state }, user) {  
            // 从 Vuex 中获取用户列表  
            const users = state.users;  
    
            // 查找匹配的用户  
            const foundUser = users.find(u => u.username === user.username && u.password === user.password);  
    
            if (foundUser) {  
                // 如果成功更新当前user的状态
                commit('setUser', foundUser);  
                console.log('登录成功');   
                return true;
            } else {  
                console.log('登录失败');  
                return false;
            }  
        },
        // 注册
        register({commit}, user) {
            // 注册成功，设置当前用户信息
            commit('setUser', user)
            // 将用户添加到用户列表
            commit('addUser', user)
        },
        // 退出登录用的
        logout({commit}) {
            // 调用vuex方法 清除当前用户状态
            commit('clearUser')
            // 清除本地存储
            localStorage.removeItem('currentUser')
        }
    },
    getters: {
        isLoggedIn: state => !!state.currentUser, // 判断用户是否登录
        getUser: state => state.currentUser // 获取用户信息
    }
})