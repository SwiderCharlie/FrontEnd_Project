import { reqSongDetail } from '@/api'

export default {
  namespaced: true,
  state() {
    return {
      musicList: [],  // 当前播放列表
      musicNow: {}  // 当前播放的歌曲
    }
  },
  mutations: {
    // 修改播放列表
    setMusicList(state, list) {
      state.musicList = list || [];
    },
    // 修改当前播放的歌曲
    setMusicNow(state, music) {
      state.musicNow = music || {};
    }
  },
  actions: {
    // 从本地获取当前播放的歌曲
    async getMusicNow({ commit }) {
      let id = localStorage.getItem('MUSICNOW');
      if (id) {
        let result = await reqSongDetail(id);
        commit('setMusicNow', result.songs[0]);
      }
    },

    // 从本地获取播放列表
    async getMusicList({ commit }) {
      let idList = localStorage.getItem('MUSICLIST');
      if (idList) {
        let result = await reqSongDetail(idList);
        commit('setMusicList', result.songs);
      }
    },

    // 修改当前播放的歌曲
    async setMusicNow({ commit }, id) {
      localStorage.setItem('MUSICNOW', id);
      let result = await reqSongDetail(id);
      commit('setMusicNow', result.songs[0])
    },

    // 修改当前播放列表 
    async setMusicList({ commit }, ids) {
      localStorage.setItem('MUSICLIST', ids)
      let result = await reqSongDetail(ids);
      commit('setMusicList', result.songs);
    },

    // 在当前播放列表中添加歌曲
    addMusic({ dispatch }, id) {
      let ids = localStorage.getItem('MUSICLIST')
      if (!ids || ids === '') {
        ids = id
      }
      else {
        if (ids.indexOf(id) == -1) {
        ids = id + ',' + ids
        }
      }
      dispatch('setMusicList', ids)
    },

    // 删除播放列表中的歌曲
    delMusic({ dispatch }, id) {
      id = String(id)
      let list = localStorage.getItem('MUSICLIST');
      list = list.split(',');
      let idx = list.indexOf(id);
      list.splice(idx, 1);
      // 如果删除的歌曲正好为当前播放的歌曲
      if (id === localStorage.getItem('MUSICNOW')) {
        dispatch('setMusicNow', list[idx % list.length])
      }
      let ids = list.join(',');
      dispatch('setMusicList', ids);
    },

    // 清空播放列表
    clearList({ commit }) {
      localStorage.removeItem('MUSICLIST')
      localStorage.removeItem('MUSICNOW')
      commit('setMusicNow')
      commit('setMusicList')
    }
  }
}