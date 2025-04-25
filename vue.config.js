const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    before: require('./src/mock/index.js') // 确保路径正确  
  }
});