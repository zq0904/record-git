var express = require('express');
var path = require('path'); //加载路径模块
var bodyParser = require('body-parser');
var session = require('express-session'); //加载session 插件
var app = express();
app.engine('html',require('express-art-template')); //模板引擎
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());
app.set('views',path.join(__dirname,'./views/')); //默认模板引擎的 那个 想改自己改

app.use(session({
  secret:'itcast', //配置加密字符串 他会在原有字符串和这个字符串拼接在一起去加密 也就是'加盐'
  resave:false,
  saveUninitialized:true //无论是否使用session 都会默认给你分配一把钥匙
}))

app.use('/public',express.static(path.join(__dirname,'./public/'))); //公开资源
app.use('/node_modules',express.static(path.join(__dirname,'./node_modules/')));

var router = require('./router.js'); //导入 路由
app.use(router); //挂载路由

app.use(function (req,res,next) { //中间件 构建一个 404
  res.render('404.html');
})
app.use(function (err,req,res,next) { //中间件 构建一个 全局的错误处理
  res.status(500).json({
    err_code:500,
    message:'错误'
  })
})

app.listen(5000,function () {
  console.log('成功');
});
