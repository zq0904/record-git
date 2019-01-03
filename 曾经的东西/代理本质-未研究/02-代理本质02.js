const express = require('express')
const app = express()
const path = require('path')
const http = require('http')

// 这样可以直接访问 views 中的资源
// index.html 会默认被渲染
app.use(express.static(path.join(__dirname, './views/')))
app.use(express.static(path.join(__dirname, './node_modules/')))

app.get('/a', (req, res, next) => {
  res.status(200).json({
    foo: 'bar'
  })
})

app.get('/a', (req, res, next) => {
  res.status(200).json({
    foo: 'bar'
  })
})

// 当你来请求 127.0.0.1:5000/nilaiya 的时候
// 我的处理：
//  在服务端我去请求 http://127.0.0.1:3000/topics
//  当我收到 http://127.0.0.1:3000/topics 的响应的时候，把请求对方的结果给你
//  注意：服务器也能发请求，而且没有跨域限制
//  
app.get('/nilaiya', (req, expressRes, next) => {
  http.get('http://127.0.0.1:3000/topics', (res) => {
    res.setEncoding('utf8');
    let rawData = '';

    // 以流的方式接收对方服务器响应回来的数据
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      const parsedData = JSON.parse(rawData);
      // 转发给请求端
      expressRes.status(200).json(parsedData)
    });
  })
})

app.listen(5000, () => {
  console.log('running...')
})
