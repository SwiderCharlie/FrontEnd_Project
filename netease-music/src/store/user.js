import { reqUserAccount, reqLogout } from '@/api' 

export default {
  namespaced: true,
  state() {
    return {
      cookie: localStorage.getItem('COOKIE'),  // cookie
      userId: localStorage.getItem('USERID'),  // 用户ID
      userInfo: {}  // 用户信息
    }
  },

  mutations: {
    // 修改cookie
    setCookie(state, cookie) {
      localStorage.setItem('COOKIE', cookie)
      state.cookie = cookie
    },

    // 修改用户ID
    setUserId(state, userId) {
      localStorage.setItem('USERID', userId)
      state.userId = userId
    },

    // 修改用户信息
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },

    // 退出登录，清除本地保存到的用户信息
    logout(state) {
      state.cookie = ''
      state.userId = ''
      state.userInfo = {}
      localStorage.removeItem('COOKIE')
      localStorage.removeItem('USERID')
    }
  },

  actions: {
    // 更新cookie
    setCookie({ commit }, cookie) {
      commit('setCookie', cookie)
    },

    // 更新用户ID
    setUserId({ commit }, userId) {
      commit('setUserId', userId)
    },

    // 更新用户信息
    setUserInfo({ commit }, userInfo) {
      commit('setUserInfo', userInfo)
    },

    // 获取用户信息
    async getUserInfo({ commit }, cookie) {
      let result = await reqUserAccount(cookie)
      if (result.code === 200) {
        commit('setUserId', result.account.id)
        commit('setUserInfo', result.profile)
      }
    },

    // 退出登录
    async logout({commit}) {
      await reqLogout()
      commit("logout")
    }
  }
}