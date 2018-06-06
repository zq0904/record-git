var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.engine('html', require('express-art-template'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var comments = [
  {
    name:'刘莹',
    message:'没吃饭啊',
    time:'2017-12-12 12:12:12'
  }
];

app.use('/public',express.static('./public/')); //公开
app.get('/',function (req,res) { //主页
  res.render('index.html',{comments:comments});
});
app.get('/post',function(req,res){ //表单页
  res.render('form.html');
});
app.post('/tijiao',function(req,res){ //提交
  var o = req.body;
  o.time = '2017-12-12 13:13:14';
  comments.unshift(o);
  res.redirect('/'); //重定向
});
app.listen(3000,function(){
  console.log('成功')
});
