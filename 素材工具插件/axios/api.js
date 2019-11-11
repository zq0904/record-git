const express = require('express')
const cors = require('cors')
// const compression = require('compression')
const app = new express()

// app.use(compression())
app.use(cors({
  'origin': 'http://127.0.0.1:3001',
  'Methods': 'PUT,POST,GET,DELETE,OPTIONS',
  'credentials': true, // 跨域中间件 如果axios请求头设置了 withCredentials: true, 允许跨域携带cookie 那么相应头中的Access-Control-Allow-Origin 不能设置为* 必须明确指定具体
}))

app.use('/list', (req, res, next) => {
  console.log('list', req.url)
  // res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:3001")
  // res.setHeader("Access-Control-Allow-Credentials", "true")
  // res.setHeader("Access-Control-Allow-Headers", "cache-control,x-requested-with")
  // res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
  setTimeout(() => {
    res.status(200).json({
      flag: 1,
      data: {
        list: [{
          userhId: 59319107,
          userhName: '郑家彬',
          authentication: '0',
          certification: '0',
          information: '0',
          original: '0',
          company: '广东百汇人力资源咨询有限公司',
          positions: 0,
          gold: 0,
          visit: 1558946271059,
          registration: 1558946271059,
          isDes: 1 // ?
        }, {
          name: '郑家彬1',
          id: 59319108,
          authentication: '0',
          certification: '0',
          information: '0',
          original: '0',
          company: '广东百汇人力资源咨询有限公司',
          positions: 0,
          gold: 0,
          visit: 1558946271059,
          registration: 1558946271059,
          isDes: 1 // ?
        }],
        totalCount: 100,
      }
    })
  }, 0)
})

app.use('/test/cancel', (req, res, next) => {
  console.log('/test/cancel', req.url)
  setTimeout(() => {
    res.status(200).json({
      flag: '1',
      data: '/test/cancel',
      msg: '请求成功',
    })
  }, 3000)
})

app.listen(3004, () => console.log('running 3004'))
