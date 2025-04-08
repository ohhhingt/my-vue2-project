import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.prototype.$store = store
// console.log('Store:', store)

//生产环境的时候，减少打印信息
Vue.config.productionTip = false

new Vue({
  store,
  router,
  created() {
    console.log('vue store', this.$store)
  },
  render: h => h(App)
}).$mount('#app')
