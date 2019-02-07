module.exports = {
  devServer: {
    // 设置代理
    proxy: {
      "/takeaway": {
        target: "http://127.0.0.1:8081/", // 域名
        ws: true, // 是否启用websockets
        changOrigin: true
      }
    }
  },

  publicPath: '',
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: false,
  parallel: undefined,
  css: undefined
};