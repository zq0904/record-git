const Koa = require('koa')

const app = new Koa()

app.use(ctx => {
  ctx.body = 'heoll Koa'
})

app.listen(3000)
