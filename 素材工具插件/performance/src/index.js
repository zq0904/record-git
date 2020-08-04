const Koa = require('koa')
const Router = require('@koa/router')
const koaBody = require('koa-body')
const cors = require('@koa/cors')
const serve = require('koa-static')
const views = require('koa-views')
const opn = require('better-opn')
const path = require('path')

const port = 4567

const app = new Koa()
const router = new Router()

app.use(koaBody({ multipart: true, formidable: { maxFileSize: 200 * 1024 * 1024 } }))
app.use(cors())
app.use(serve(path.resolve(__dirname + '/static'))) // 开放静态资源
app.use(views(__dirname + '/views'))

router.all('/home', async ctx => {
  // 阻断1s
  await new Promise(resolve => setTimeout(resolve, 1000))
  await ctx.render('home')
})
router.all('/test', async ctx => {
  // 阻断1s
  await new Promise(resolve => setTimeout(resolve, 1000))
  await ctx.render('test')
})

router.all('/list', async ctx => {
  // 阻断2s
  await new Promise(resolve => setTimeout(resolve, 2000))
  ctx.body = {
    code: 1,
    data: [
      {
        name: 'name1',
        url: 'https://s1.ax1x.com/2020/08/04/aDWpAP.png'
      }
    ]
  }
})

app.use(router.routes())

app.listen(port, () => {
  console.log(`running ... to ${port}`)
  opn(`http://localhost:${port}/home`)
})
