import Vue from 'vue'
import Vuex from 'vuex'

// 导入模块
import user from './user.js'
import music from './music.js'

Vue.use(Vuex)

export default new Vuex.Store({
  // 分模块
  modules: {
    user,
    music
  }
})
