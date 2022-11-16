import request from '@/utils/request'
import qs from 'qs'

// 封装登录接口
export function login(data) {
  return request({
    method: 'post',
    url: '/login',
    data
  })
}

// 学生列表查询接口
export function students(params) {
  return request({
    method: 'get',
    url: '/students',
    params
  })
}

// 学生列表删除接口
export function studentDel(id) {
  return request({
    method: 'delete',
    url: `/students/${id}`
  })
}

// 信息列表查询接口
export function getInfo() {
  return request({
    method: 'get',
    url: '/info'
  })
}

// 信息列表删除接口
export function infoDel(id) {
  return request({
    method: 'delete',
    url: `/info/${id}`
  })
}

// 信息列表新增和修改接口
export function info(type, data) {
  data = qs.stringify(data);
  let obj = { method: type, url: '/info', data };
  return request(obj);
}

// 数据概览接口
export function dataview() {
  return request({
    method: 'get',
    url: '/dataview'
  });
}

// 旅游地图接口
export function travel() {
  return request({
    method: 'get',
    url: '/travel'
  })
}