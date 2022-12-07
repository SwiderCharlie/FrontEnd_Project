import { reqUserInfo } from '@/api'

export default {
  namespaced: true,
  state() {
    return {
      userId: '',
      userInfo: {}
    }
  },
  mutations: {
    // 设置用户信息
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo || {};
    },
    // 设置用户ID
    setUserId(state, userId) {
      state.userId = userId || '';
    }
  },
  actions: {
    
  }
}