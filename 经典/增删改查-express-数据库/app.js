// app.js
// 配置服务 express框架 bodyParser 模板引擎 公开静态资源 
// 挂载路由 绑定端口 

var express = require('express');
var bodyParser = require('body-parser'); //req.body
var app = express();

app.engine('html',require('express-art-template')); //模板引擎
app.use(bodyParser.urlencoded({ extended:false })); //req.body
app.use(bodyParser.json()); //req.body

app.use('/public/',express.static('./public/')); //公开静态资源css js等
app.use('/node_modules/',express.static('./node_modules/')); //公开资源bootstrap

var router = require('./router.js'); //载入路由
app.use(router); //挂载路由 到 app

app.listen(3000,function(){
  console.log('成功');
});

