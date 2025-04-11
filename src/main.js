import Vue from 'vue'
import ElementUI from 'element-ui'; // 引入 Element-UI
import 'element-ui/lib/theme-chalk/index.css'; // 引入 Element-UI 的样式  
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import store from './store'
import './mock/index.js'
import axios from 'axios'
import './mock';

Vue.prototype.$http = axios; // axios
Vue.use(ElementUI); // Element-UI

Vue.use(Vuex) // Vuex
Vue.prototype.$store = store

//生产环境的时候，减少打印信息
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
