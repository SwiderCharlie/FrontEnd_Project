import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueLazyload from 'vue-lazyload'
import * as API from '@/api'
import '@/assets/styles/reset.less'  // 导入样式重置less文件
import '@/assets/styles/global.less'  // 导入公共样式

Vue.config.productionTip = false

// 使用ElementUI库
Vue.use(ElementUI)

// 图片懒加载
Vue.use(VueLazyload, {
  loading: require('@/assets/images/loading.gif')  // 加载时默认显示的图片
})

// 将api.js中的所有接口方法绑定到Vue实例原型对象上
Vue.prototype.$api = API;
// 组件实例的原型
Vue.prototype.$bus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
