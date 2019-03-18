const express = require('express')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()
app.prepare()
  .then(() => {
    const server = express()
    // 浅层路由 刷新问题
    server.get('/Bar/:id', (req, res) => {
      const realPath = '/Bar/details'
      const query = {id: req.params.id}
      app.render(req, res, realPath, query)
    })

    server.get('*', (req, res) => handle(req, res))
    server.listen(3000, () => console.log('启动成功 端口 3000'))
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })