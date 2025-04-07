import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register
  }
]

const router = new VueRouter({
  // // 路由模式，history模式 
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
