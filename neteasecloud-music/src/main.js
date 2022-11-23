import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/styles/common.less'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import * as API from '@/api'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$api = API;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
