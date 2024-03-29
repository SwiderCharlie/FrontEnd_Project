import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  headers:{'Content-Type':'application/x-www-form-urlencoded'}
});

// 请求拦截器
instance.interceptors.request.use((config) => {
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 响应拦截器
instance.interceptors.response.use((response) => {
  return response.data;
}, (error) => {
  return Promise.reject(error);
});

export default (url, method, submitData) => {
  return instance({
    url,
    method,
    [method.toLowerCase() === 'get'? 'params': 'data']: submitData
  })
}