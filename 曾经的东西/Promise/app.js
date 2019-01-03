var express = require('express')
var bodyParser = require('body-parser')

var app = express()

app.engine('html', require('express-art-template'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))

var router = require('./router.js')
app.use(router)

app.listen(3000, function () {
  console.log('running 3000...')
})
