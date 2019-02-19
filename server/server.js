const express = require('express')
const ReactSSR = require('react-dom/server')
const favicon = require('serve-favicon')
const path = require('path')
const bodyParser = require('body-parser')
const sessions = require('express-session')
const fs = require('fs')
const isDev = process.env.NODE_ENV === 'development'
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(favicon(path.join(__dirname, '../favicon.ico')))
app.use(sessions({
  maxAge: 10 * 60 * 1000,
  name: 'tid',
  resave: false, // 每次请求是否重新生成cookieID
  saveUninitialized: false,
  secret: 'react cnode class'
}))

app.use('/api/user', require('./utils/login.js'))
app.use('/api', require('./utils/proxy.js'))

if (isDev) { // 服务端渲染，如果是开发环境
  const devStatic = require('./utils/dev-static')
  devStatic(app)
} else {
  /* 注意一点：export default在用node引入时，我们需要的是xxx.default */
  const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf-8')
  const serverApp = require('../dist/server-app').default

  // 定义静态文件的引入路径,将引入路径为public的全部映射到绝对路径dist目录下
  app.use('/public', express.static(path.join(__dirname, '../dist')))

  app.get('*', function (req, res) {
    const appString = ReactSSR.renderToString(serverApp)
    res.send(template.replace('<app></app>', appString))
  })
}

app.listen(3333, function () {
  console.log('localhost:3333服务启动了')
})
