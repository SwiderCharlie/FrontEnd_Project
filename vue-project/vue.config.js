const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: true,  // 自动打开
    host: 'localhost',  // 设置打开网址localhost:8080
    proxy: {  // 跨域配置
      '/api': {
        target: 'http://1.116.64.64:5004/api2/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})
