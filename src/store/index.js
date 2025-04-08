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
        setUser(state, user) {
            // 设置当前的
            state.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user))
        },
        // 清除当前用户
        clearUser(state) {
            state.currentUser = null
            localStorage.removeItem('currentUser')
        },
        addUser(state, user) {
            // 设置user的 添加东西
            state.users.push(user)
            localStorage.setItem('users', JSON.stringify(state.users))
        }
    },
    actions: {
        login({commit}) {
            const now = JSON.parse(localStorage.getItem('users'))

            // 进行身份验证
            if (now) {
                // 登录成功 设置当前用户信息 
                commit('setUser', now); 
                console.log('登录成功')
            } else {
                console.log('登录失败')
            }
        },
        // 注册
        register({commit}, user) {
            console.log(user)
            // 注册成功，设置当前用户信息
            commit('setUser', user)
            // 将用户添加到用户列表
            commit('addUser', user)
            console.log('注册成功：', user.username)
        },
        // 退出登录用的
        logout({commit}) {
            commit('clearUser')
        }
    },
    getters: {
        isLoggedIn: state => !!state.user, // 判断用户是否登录
        getUser: state => state.user // 获取用户信息
    }
})