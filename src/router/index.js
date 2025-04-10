import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store';
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import One from '../views/One.vue'
import Two from '../views/Two.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Root',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/one',
        name: 'One',
        component: One
      },
      {
        path: '/two',
        name: 'Two',
        component: Two
      }
    ]
  }
]

const router = new VueRouter({
  // // 路由模式，history模式 
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 这是一个Vue Router提供的一个全局前置守卫
// 它在每次路由导航之前被调用
// to 即将要进入的目标路由对象
// from 当前导航正要离开的路由对象
// next 一个函数，调用它可以继续导航到下一个钩子或路由
router.beforeEach((to, from, next) => {  
  // 访问Vuex store的currentUser !! 是将一种将值转换为布尔值的技巧
  // 如果currentUser存在(即用户已登录) isLoggenIn为true
  // 如果 currentUser 为 null 或 undefined（即用户未登录），isLoggedIn 为 false
  const isLoggedIn = !!store.state.currentUser; 

  // 如果用户未登录且访问的不是登录或注册页面，则重定向到登录页面
  // !isLoggedIn
  // 情况1: 假如 isLoggenIn 为 true已登录 那么就会被转为false
  // 情况2: 假如 isLoggenIn 为 false未登录 那么就会被转为true⭐
  // (to.name !== 'Login' && to.name !== 'Register')
  // 访问其他页面为true 访问这些页面为false
  // 结果1(未登录): 而当两个都为true的时候 true && true 执行其中代码⭐ 
  // 结果2(已登录): false && true 不执行其中代码 走else
  if (!isLoggedIn && (to.name !== 'Login' && to.name !== 'Register')) {  
    next({ path: '/Login' });
  } else {
    // 已登录用户 继续导航 
    next();
  }
});


export default router
