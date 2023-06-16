const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  productionSourceMap:false,
  transpileDependencies: true,
  publicPath: './',
  //关闭eslint语法检查
  lintOnSave:false,
  //代理跨域
  devServer:{
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
        // pathRewrite: {"^/api" : ""}
     }
    }
  }
})
