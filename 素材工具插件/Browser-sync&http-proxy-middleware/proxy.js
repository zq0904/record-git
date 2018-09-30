var browserSync = require('browser-sync').create()
var proxy = require('http-proxy-middleware')

var jsonPlaceholderProxy = proxy('/api', {
  target: 'https://api.douban.com/v2/',
  changeOrigin: true, // 对于vhosts站点 更改主机头以匹配目标主机
  pathRewrite: { '^/api': '' },
  logLevel: 'debug'
})

// 将 代理规则 添加到 browser-sync
browserSync.init({
  server: {
    baseDir: './', // www目录
    middleware: [jsonPlaceholderProxy] // 配置代理中间件
  },
  port: 4000, // 这个端口 只有配置到server平级才好使
  startPath: '/', // 自动打开浏览器的访问路径
  files: ['**/*.*'] // 需要监视的文件
})

console.log('[DEMO] Server: listening on port 4000')
console.log('[DEMO] Opening: http://localhost:4000/')
