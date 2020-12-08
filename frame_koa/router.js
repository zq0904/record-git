const fs = require('fs')
const path = require('path')
const Router = require('koa-router')

const router = new Router({
  // prefix: '/users' // 实例化前加前缀
})

module.exports = {
  router,
  registered () {
    const dir = 'controllers'
    const dirFullPath = path.resolve(dir)
    const files = fs.readdirSync(dirFullPath)
    for (const file of files) require(path.resolve(dirFullPath, file))
    return router.routes()
  }
}
