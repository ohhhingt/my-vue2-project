import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//生产环境的时候，减少打印信息
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
