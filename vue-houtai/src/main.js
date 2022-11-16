import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css'
import request from '@/utils/request'
import echarts from 'echarts'

Vue.use(ElementUI)
Vue.prototype.request = request  // 挂载到原型，全局可用
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

// 路由导航守卫
router.beforeEach((to, from, next) => {
  if (!localStorage.getItem('username')) {
    if (to.path !== '/login') {
      next('/login');
    } else next();
  }
  next();
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
