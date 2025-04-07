import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // user变量状态为空
        user: null
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        clearUser(state) {
            state.user = null
        }
    },
    actions: {
        login({commit}, user) {
            console.log(user)
            console.log('login action 被调用，用户信息:', user); // 确认 action 被调用 
            commit('setUser', user)
        },
        logout({commit}) {
            commit('clearUser')
        }
    },
    getters: {
        isLoggedIn: state => !!state.user, // 判断用户是否登录
        getUser: state => state.user // 获取用户信息
    }
})