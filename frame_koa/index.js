const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const { registered } = require('./router')
// TODO koa-static

const app = new Koa()

// 关于post请求 有个问题 post请求通常会发送一个表单 或者json 它会作为request 的body发送 node原生和koa都不具备解析request的body的功能
// 所以，我们又需要引入另一个middleware来解析原始request请求，然后，把解析后的参数，绑定到ctx.request.body中
app.use(bodyParser()) // 由于中间件 这个解析尽量放在所有use前
// middlware
app.use(async (ctx, next) => {
  const startTime = Date.now()
  await next() // 代表下一个use中的回调
  console.log(`
  ------
    请求：${ctx.url}
    请求方式：${ctx.method}
    耗时：${Date.now() - startTime} ms
  ------
  `)
})

// koa 一些简单的写法
app.use(async (ctx, next) => {
  // console.log(ctx.request.body) // ctx.body 是响应 ctx.request.body 是post请求的参数解析
  // console.log(ctx.url === ctx.request.url) // true
  // console.log(ctx.method === ctx.request.method) // true
  // console.log(ctx.query === ctx.request.query) // true
  // console.log(ctx.type === ctx.request.type) // true
  // console.log(ctx.body === ctx.response.body) // true
  await next()
})

// 添加路由中间件
app.use(registered())

const port = 3000

app.listen(port, () => console.log(`服务启动成功！在 ${port}`))
