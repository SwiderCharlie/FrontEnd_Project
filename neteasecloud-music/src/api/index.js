import { Result } from 'element-ui';
import request from './request.js'

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

// 获取搜索建议
export function reqSearchSuggest(keywords) {
  return request('/search/suggest', 'get', { 'keywords': keywords });
}

// 二维码key生成
export function reqLoginQRKey() {
  return request('/login/qr/key', 'get', {timerstamp: Date.parse(new Date())})
}

// 二维码生成
export function reqLoginQRCreate(key) {
  return request('/login/qr/create', 'get', { 'key': key, 'qrimg': true, timerstamp: Date.parse(new Date()) })
}

// 二维码检测扫码状态
export function reqLoginQRCheck(key) {
  return request('/login/qr/check', 'get', { 'key': key, timerstamp: Date.parse(new Date()) })
}

// 获取国家编码列表
export function reqCountriesCodeList() {
  return request('/countries/code/list', 'get');
}

// 手机号+密码登录
export function loginCellphoneByPassword(phone, password) {
  return request('/login/cellphone', 'post', { 'phone': phone, 'password': password})
}

// 获取手机验证码
export function reqCaptcha(phone, ctcode) {
  return request('/captcha/sent', 'get', { 'phone': phone, 'ctcode': ctcode });
}

// 验证验证码
export function verifyCaptcha(phone, captcha, ctcode) {
  return request('/captcha/verify', 'get', { 'phone': phone, 'captcha': captcha, 'ctcode': ctcode })
}