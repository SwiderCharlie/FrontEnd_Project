const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: true,  // 自动打开
    host: 'localhost'  // 设置打开网址localhost:8000
  }
})
