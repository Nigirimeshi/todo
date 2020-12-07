module.exports = {
  transpileDependencies: ['vuetify'],
  devServer: {
    proxy: {
      // TODO 提取配置
      '/api/v1': {
        target: 'http://127.0.0.1:23333',
        changeOrigin: true,
        pathRewrite: {
          '^/api/v1': '/api/v1'
        }
      }
    }
  }
};
