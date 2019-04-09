const express = require('express')
const app = express()
app.all('/', function (req, res) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'content-type') // 允许的header类型
  res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS') //跨域允许的请求方式
  if (req.method.toLowerCase() === 'options') {
    res.send(200) // 让options尝试请求快速结束
  }
  res.json({
    fileName: 'on-bg-03.png',
    uploaded: 1,
    url: 'https://ckeditor.com/apps/ckfinder/userfiles/images/on-bg-03.png',
  })
})
app.listen(3009, () => console.log(3009))

// http://localhost:3009/