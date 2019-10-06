require('./dbconfig')
const koa = require('koa')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const cors = require('@koa/cors')
const { User } = require('./User')

const app = new koa()
const router = new Router()

app.use(cors())
app.use(bodyParser())

router.post('/', async (ctx, next) => {
  try {
    const { name, gender, age } = ctx.request.body
    const user = new User({
      name,
      gender,
      age
    })
    const res = await user.save()
    ctx.body = {
      code: 200,
      data: res,
      msg: '保存成功'
    }
  } catch (err) {
    ctx.body = {
      code: 500,
      msg: '请求异常'
    }
  }
})

app.use(router.routes())

app.listen(3000, () => console.log('runing ... 3000'))
