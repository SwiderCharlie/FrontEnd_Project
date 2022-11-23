import request from './request.js'

// 获取音乐url
export function reqSongUrl(id, level = 'higher') {
  return request('song/url/v1', 'get', { 'id': id, 'level': level });
}

// 获取歌曲详情
export function reqSongDetail(ids) {
  return request(`/song/detail`, 'get', {'ids': ids});
}

// 获取歌曲歌词
export function reqLyric(id) {
  return request(`/lyric`, 'get', {'id': id})
}