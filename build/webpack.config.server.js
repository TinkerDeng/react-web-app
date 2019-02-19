const path = require('path')
const config = {
  mode: 'development',
  target: 'node', // 打包出来的内容适配哪个执行环境 web node
  entry: {
    app: path.join(__dirname, '../client/server-app.js')
  },
  output: {
    filename: 'server-app.js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/public', // 资源文件的引入路径
    libraryTarget: 'commonjs2' // node端要设置打包出来的js使用模块化的方案 umd cmd amd
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}
module.exports = config
