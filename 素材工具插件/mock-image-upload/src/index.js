const Koa = require('koa')
const Router = require('@koa/router')
const serve = require('koa-static')
const koaBody = require('koa-body')
const fse = require('fs-extra')
const path = require('path')

const port = 3009

const app = new Koa()
const router = new Router()

app.use(koaBody({ multipart: true, formidable: { maxFileSize: 200 * 1024 * 1024 } }))
app.use(serve(path.resolve(__dirname))) // 开放静态资源

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
    flag: 1,
    data: {
      url: `127.0.0.1:${port}/images/${file.name}`
    }
  }
})

app.use(router.routes())

app.listen(port, () => console.log(`running ... to ${port}`))
