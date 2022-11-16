import axios from 'axios'
import { getToken } from './setToken';
import { Message } from 'element-ui';

const request = axios.create({
  baseURL: '/api',
  timeout: 3000
})

// 添加请求拦截器
request.interceptors.request.use((config) => {
  // 在请求之前获取并设置token
  config.headers['token'] = getToken('token');
  return config;
}, (error) => {
  return Promise.reject(error);
})

// 添加响应拦截器
request.interceptors.response.use((res) => { 
  let { status, message } = res.data;
  if (status !== 200) {
    Message({ message: message || 'error', type: 'warning' });
  }
  return res;
}, (error) => {
  return Promise.reject(error);
})

export default request