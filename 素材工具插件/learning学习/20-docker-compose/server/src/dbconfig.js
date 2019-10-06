const mongoose = require('mongoose')

const URL = 'mongodb://root:123456@locahost:27017/admin' // 这里的 locahost 对应于.yml中 links关联名称 srever这个容器如何连接mongodb容器

const connect = () => {
  mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
}

connect()

mongoose.connection.on('error', err => {
  console.log('无法连接到MongoDB')
  if (err) {
    console.log('将在5s后尝试重新连接！')
    setTimeout(connect, 5000)
  }
})

mongoose.connection.on('connected', () => console.log('mongoDB 连接成功！'))
