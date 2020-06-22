const Koa = require('koa')
const koaBody = require('koa-body')

const app = new Koa()

app.use(koaBody())
app.use(async ctx => {
  ctx.body = {
    flag: 1,
    data: {
      url: '123'
    }
  }
})

app.listen(3009, () => console.log('running ... to 3009'))