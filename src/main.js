import Vue from 'vue'
import ElementUI from 'element-ui'; // 引入 Element-UI
import 'element-ui/lib/theme-chalk/index.css'; // 引入 Element-UI 的样式  
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import store from './store'
import axios from 'axios'
import * as echarts from 'echarts';
// 这个不需要像前面那样导入'vuex'这种 直接导入地址即可 
import './mock/index.js' 


Vue.prototype.$http = axios; // axios
Vue.use(ElementUI); // Element-UI

Vue.use(Vuex) // Vuex
Vue.prototype.$store = store

Vue.prototype.$echarts = echarts

//生产环境的时候，减少打印信息
Vue.config.productionTip = false

new Vue({
  store,
  router,
  echarts,
  axios,
  render: h => h(App)
}).$mount('#app')