var Obj = require('./models/index.js'); // 导入 模型构造函数 的 一个对象！！！
var User = Obj.User; //取出其中一个模型构造函数
var md5 = require('blueimp-md5'); //导入 md5 加密
var express = require('express');
var router = express.Router(); //创建路由

// register 注册 login 登录 logout 登出 
router.get('/',function(req,res,next){ //渲染首页页面
  res.render('index.html',{
    user:req.session.user //取出 对象 同时 模板判断user存在否
  });
});

router.get('/register',function(req,res,next){ //渲染注册页面
  res.render('register.html');
});

router.post('/register',function(req,res,next){ //提交注册页面
  var body = req.body; // {}
  User.findOne({
    $or:[{email:body.email},{nickname:body.nickname}] //邮箱 或 昵称
  },function(err,data){
    if(err) return res.next(err);
    if(data){ //找到了
      return res.status(200).json({err_code:1,message:'邮箱 或 昵称 已被注册'});
    }
    //express 提供了一个响应方法 json 会自动将对象转为字符串发送给浏览器
    //没毛病 添加到数据库
    body.password = md5(md5(body.password)); //md5对密码 加密2次
    new User(body).save(function(err){
      if(err) return res.next(err);
      //设置session 发生2件事 1.自动发送一个session 存储在cookie中 2.吧data挂到session.user这个对象下
      req.session.user = body; //注册成功 浏览器重定向 首页
      // res.redirect('/'); //服务器的重定向 只针对同步请求才有效 异步请求无效
      res.status(200).json({err_code:0,message:'OK'});
    });
  });
});

router.get('/login',function(req,res,next){ //渲染登录页面
  res.render('login.html');
});

router.post('/login',function(req,res,next){ //提交登录页面
  var body = req.body;
  User.findOne({  //这里最好使用 findOne 没查到返回null  find 没查到返回[] 还要[0]取 不便后续判断
    email:body.email,
    password:md5(md5(body.password)) //因为密码存在加密 所以 这里不能直接写 body
  },function(err,data){
    if(err) return res.next(err);
    if(!data){ //!null   -->   true
      return res.status(200).json({err_code:1,message:'邮箱 或 密码 错误'});
    }
    req.session.user = data; //发送session 记录登录状态
    return res.status(200).json({err_code:0,message:'OK'});
  });
});

router.get('/logout',function(req,res,next){ //登出
  req.session.user = null;
  // 同步请求 直接服务器重定向
  res.redirect('/login');
});


module.exports = router; //导出 路由
