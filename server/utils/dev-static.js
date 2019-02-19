const axios = require('axios')
const path = require('path')
const webpack = require('webpack')
const MemoryFs = require('memory-fs')// 在内存里面读写文件，不在硬盘中读写文件，速度快
const proxy = require('http-proxy-middleware') // 代理中间件
const ReactDomServer = require('react-dom/server')
const serverConfig = require('../../build/webpack.config.server')

/**
 * webpack-dev-server启动的时候模板是不写在硬盘上面的
 * 当webpack-dev-server启动的时候我们可以去请求模板
 * 这样我们可以通过webpack-dev-server实时的拿到最新的模板文件
 */
const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8888/public/index.html').then(res => {
      resolve(res.data)
    }).catch(reject)
  })
}

let Module = module.constructor
const serverCompiler = webpack(serverConfig) // 实时监听webpack文件变化
let serverBundle, createStoreMap
const mfs = new MemoryFs()
serverCompiler.outputFileSystem = mfs
/**
 * @description 监听entry下的文件实时有变化，一旦有变化，会重新打包
 * @param stats 打包过程中输出的文件信息
 */
serverCompiler.watch(
  {},
  (err, stats) => {
    if (err) {
      throw err
    }
    stats = stats.toJson()
    stats.errors.forEach(err => {
      console.error(err)
    })
    stats.warnings.forEach(warn => {
      console.warn(warn)
    })
    const bundlePath = path.join(
      serverConfig.output.path,
      serverConfig.output.filename
    )
    const bundle = mfs.readFileSync(
      bundlePath,
      'utf-8'
    )
    const m = new Module()
    m._compile(
      bundle,
      'server-app.js'
    )
    serverBundle = m.default // m.exports.default
    createStoreMap = m.exports.createStoreMap
  }
)
module.exports = function (app) {
  // 静态文件夹都在内存里面，只要是/public的请求，都代理岛http://xxx
  app.use(
    '/public',
    proxy({ target: 'http://localhost:8888' })
  )
  app.get(
    '*',
    function (req, res) {
      getTemplate().then(template => {
        const routerContext = {}
        const app = serverBundle(
          createStoreMap(),
          routerContext,
          req.url
        )
        const content = ReactDomServer.renderToString(app)
        if (routerContext.url) {
          res.status(302).setHeader('Location', routerContext.url)
          res.send()
          return
        }
        res.send(template.replace(
          '<!--app-->',
          content
        ))
      })
    }
  )
}
