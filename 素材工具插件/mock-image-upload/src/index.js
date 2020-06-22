const Koa = require('koa')
const Router = require('@koa/router')
const serve = require('koa-static')
const koaBody = require('koa-body')
const cors = require('@koa/cors')
const fse = require('fs-extra')
const path = require('path')

const port = 4567

const app = new Koa()
const router = new Router()

app.use(cors({
  'credentials': true, // 跨域中间件 如果axios请求头设置了 withCredentials: true, 允许跨域携带cookie 那么相应头中的Access-Control-Allow-Origin 不能设置为* 必须明确指定具体
}))
app.use(serve(path.resolve(__dirname))) // 开放静态资源
app.use(koaBody({ multipart: true, formidable: { maxFileSize: 200 * 1024 * 1024 } }))

router.post('/upload', async ctx => {
  // 获取图片源
  const file = ctx.request.files.file
  // 接收读出流
  const reader = fse.createReadStream(file.path)
  // 确保目录存在
  const imgSrc = path.resolve(__dirname, 'images')
  fse.emptyDirSync(imgSrc)
  // 创建写入流 指定图片路径文件名（即上传图片存储目录）
  const stream = fse.createWriteStream(`${imgSrc}/${file.name}`)
  // 用管道将读出流 "倒给" 输入流
  reader.pipe(stream)
  ctx.body = {
    flag: Object.keys(ctx.query).length > 0 ? 0 : 1,
    msg: '服务器错误了！',
    data: {
      url: `http://127.0.0.1:${port}/images/${file.name}`
    }
  }
})

app.use(router.routes())

app.listen(port, () => console.log(`running ... to ${port}`))
