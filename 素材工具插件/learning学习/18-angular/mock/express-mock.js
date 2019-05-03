const Mock = require('mockjs')
const express = require('express')
const { port } = require('./config')
const app = express()

const arr = [
  ...require('./common')
]

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Origin, Accept, X-Requested-With')
  res.header('Content-Type', 'application/json;charset=utf-8')
  res.header('Access-Control-Allow-Credentials', true) // 支持cookie
  next()
})

arr.forEach(({
  url,
  type = 'get',
  res: result
}) => {
  app[type](url, (req, res) => res.json(Mock.mock(result)))
})

app.listen(port, () => console.log(`express-mock启动成功 端口：${port}`))
