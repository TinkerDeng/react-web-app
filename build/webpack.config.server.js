const path = require('path')
/*
 *  entry: NODE_ENV == 'development' ? '../client/main.js' : '../client/index.js',
 * */
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
    library: 'react-web-app', // 指定的就是你使用require时的模块名
    libraryTarget: 'commonjs2', // node端要设置打包出来的js使用模块化的方案 umd cmd amd
    umdNamedDefine: true // 会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define
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
