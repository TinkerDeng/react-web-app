const webpack = require('webpack')
const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'
let config = {
  mode: isDev ? 'development' : 'production',
  entry: {
    app: path.join(
      __dirname,
      '../client/main.js'
    )
  },
  devServer: {},
  output: {
    filename: '[name].[hash].js', // hash有任何文件改动他都会变
    path: path.join(
      __dirname,
      '../dist'
    ),
    publicPath: '/public/' // 资源文件的引入路径,最后一个/很重要
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.css', '.less'],
    alias: {
      'client': path.resolve(
        __dirname,
        '..',
        'client'
      ),
      'com': path.resolve(
        __dirname,
        '..',
        'client',
        'components'
      ),
      'views': path.resolve(
        __dirname,
        '..',
        'client',
        'views'
      )
    }
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HTMLPlugin({
      template: path.join(
        __dirname,
        '../client/index.html'
      )
    })
  ]
}
if (isDev) {
  config.entry = {
    app: [
      'react-hot-loader/patch',
      path.join(
        __dirname,
        '../client/main.js'
      )
    ]
  }
  config.devServer = {
    // 允许用任何方式访问  localhost:8080  127.0.0.0:8080  172.168.2.34:8080
    host: '0.0.0.0',
    port: '8888',
    // 在dist目录下启动了dev服务，可以直接localhost:8888/app.xxx.js访问资源
    contentBase: path.join(
      __dirname,
      '../dist'
    ),
    // 启动热刷新
    hot: true,
    // 自动打开浏览器
    open: false,
    // 如果编译过程中出现错误，在网页中覆盖一层错误信息
    overlay: {
      errors: true
    },
    proxy: {
      '/api': 'http://localhost:3333' // 所有/api的请求都代理到http://localhost:3333下
    },
    //! !!访问当前服务下的资源路径都要通过加上/public来访问，切记要删除本地硬盘上的dist文件夹
    // dev-server会先去硬盘上检测有没有dev-server，如果有则直接访问这个目录下的文件
    publicPath: '/public',
    // 指定index文件是public文件下的index.html,404的请求全部返回index.html
    historyApiFallback: {
      index: '/public/index.html'
    }
  }
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}
module.exports = config
