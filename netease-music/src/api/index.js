import request from "./request";

// ================== Header组件 ==================
// 获取搜索建议
export function reqSearchSuggest(keywords) {
  return request('/search/suggest', 'get', { 'keywords': keywords });
}

// 二维码key生成 (要携带时间戳)
export function reqLoginQRKey() {
  return request('/login/qr/key', 'get', { 'timerstamp': Date.parse(new Date()) })
}

// 二维码生成 (要携带时间戳)
export function reqLoginQRCreate(key) {
  return request('/login/qr/create', 'get', { 'key': key, 'qrimg': true, 'timerstamp': Date.parse(new Date()) })
}

// 二维码检测扫码状态 (要携带时间戳)
export function reqLoginQRCheck(key) {
  return request('/login/qr/check', 'get', { 'key': key, 'timerstamp': Date.parse(new Date()) })
}

// 根据Cookie获取账号信息
export function reqUserAccount(cookie) {
  return request('/user/account', 'post', { 'cookie': cookie })
}

// 获取国家编码列表
export function reqCountriesCodeList() {
  return request('/countries/code/list', 'get');
}

// 获取手机验证码
export function reqCaptcha(phone, ctcode) {
  return request('/captcha/sent', 'get', { 'phone': phone, 'ctcode': ctcode, 'timerstamp': Date.parse(new Date()) });
}

// 验证验证码
export function verifyCaptcha(phone, captcha, ctcode) {
  return request('/captcha/verify', 'get', { 'phone': phone, 'captcha': captcha, 'ctcode': ctcode })
}

// 手机号+验证码登录
export function loginCellphoneByCaptcha(phone, captcha) {
  return request('/login/cellphone', 'post', { 'phone': phone, 'captcha': captcha })
}

// 手机号+密码登录
export function loginCellphoneByPassword(phone, password) {
  return request('/login/cellphone', 'post', { 'phone': phone, 'password': password })
}

// 退出登录
export function reqLogout() {
  return request('/logout', 'get')
}

// ================== Music组件 ==================
// 获取音乐url
export function reqSongUrl(id, level = 'higher') {
  return request('song/url/v1', 'get', { 'id': id, 'level': level });
}

// 获取歌曲详情
export function reqSongDetail(ids) {
  return request('/song/detail', 'get', { 'ids': ids });
}

// 获取歌曲歌词
export function reqLyric(id) {
  return request('/lyric', 'get', { 'id': id });
}

// ================== Home页面 ==================
// 获取轮播图
// 参数 type: 0 pc端
export function reqBanner() {
  return request('/banner', 'get', { type: 0 });  
}

// 首页热门推荐（歌单）
// 参数 order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
// 参数 cat: 歌单分类，可选值有'华语'、'古风'、'欧美'等
export function reqTopPlaylist(order='hot', cat='全部', limit=8, offset=0) {
  return request('/top/playlist', 'get', { 'order': order, 'cat': cat, 'limit': limit, 'offset': offset });
}

// 首页新碟上架（专辑）
export function reqNewAlbums() {
  return request('/album/newest', 'get');
}

// 获取所有榜单
export function reqTopList() {
  return request('/toplist', 'get');
}

// 获取歌单详情
export function reqPlayList(id, cookie) {
  return request('/playlist/detail', 'get', { 'id': id, 'cookie': cookie })
}

// 获取热门歌手
export function reqTopArtists(limit, offset) {
  return request('/top/artists', 'get', { 'limit': limit, 'offset': offset });
}

// 获取歌手详情
export function reqArtistDetail(id) {
  return request('/artist/detail', 'get', { 'id': id })
}

// 获取热门主播
export function reqTopDJ(limit) {
  return request('/dj/toplist/popular', 'get', { 'limit': limit })
}

// 获取歌单评论
export function reqPlayListComments(id, limit, offset) {
  return request('/comment/playlist', 'get', { 'id': id, 'limit': limit, 'offset': offset })
}

// 获取歌单分类
export function reqCatList() {
  return request('/playlist/catlist', 'get')
}

// 获取全部新碟
// 参数 area：ALL全部，ZH华语，EA欧美，KR韩国，JP日本
export function reqAlbums(limit, offset, area) {
  return request('/album/new', 'get', {'limit': limit, 'offset': offset, 'area': area})
}

// 获取歌手分类列表
// 参数 initial: 按首字母索引查找参数
// 参数 type: -1 全部，1 男歌手，2 女歌手，3 乐队
// 参数 area: -1 全部，7 华语，96 欧美，8 日本，16 韩国，0 其他
export function reqArtistList(limit, offset, initial = -1, type = -1, area = -1) {
  return request('/artist/list', 'get', {'limit': limit, 'offset': offset, 'initial': initial, 'type': type, 'area': area})
}

// 获取电台分类
export function reqDjCategoryList() {
  return request('/dj/catelist', 'get')
}

// 获取电台推荐节目
export function reqRecommendPrograms () {
  return request('/program/recommend', 'get')
}

// 获取电台节目榜
export function reqProgramsTopList(limit, offset) {
  return request('/dj/program/toplist', 'get', {'limit': limit, 'offset': offset})
}

// 获取分类推荐电台
export function reqCategoryRecommend(type) {
  return request('/dj/recommend/type', 'get', { 'type': type })
}

// 获取类别热门电台
export function reqRadioHot(cateId, limit, offset) {
  return request('/dj/radio/hot', 'get', { 'cateId': cateId, 'limit': limit, 'offset': offset })
}

// ================== My页面 ==================
// 获取用户收藏歌手、MV、电台、歌单数量
export function reqSubcount(cookie) {
  return request('/user/subcount', 'get', {'cookie': cookie})
}

// 获取用户歌单
export function reqUserPlaylist(uid, cookie) {
  return request('/user/playlist', 'get', { 'uid': uid, 'cookie': cookie })
}

// 获取用户收藏的歌手列表
export function reqArtistSublist(cookie) {
  return request('/artist/sublist', 'get', { 'cookie': cookie })
}

// 获取用户收藏的MV列表
export function reqMvSublist(cookie) {
  return request('/mv/sublist', 'get' , {'cookie': cookie })
}

// 获取用户订阅的电台列表
export function reqDjSublist(cookie) {
  return request('/dj/sublist', 'get', {'cookie': cookie})
}

// ================== Friend页面 ==================
// 获取用户详情
export function reqUserDetail(uid, cookie) {
  return request('/user/detail', 'get', {'uid': uid, 'cookie': cookie})
}

// 获取动态消息
export function reqEvent(pageSize, lastTime, cookie) {
  return request('/event', 'get', { 'pagesize': pageSize, 'lasttime': lastTime, 'cookie': cookie})
}