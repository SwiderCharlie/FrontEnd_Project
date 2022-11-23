import Vue from 'vue'
import Vuex from 'vuex'

import user from './user.js'
import home from './home.js'
import music from './music.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    home,
    music
  }
})
