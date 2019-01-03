// router.js
// 处理路由 模块职责要单一 增强代码可维护性 提升开发效率
// | 请求方法 |     请求路径     | get 参数 |           post 参数            |       备注       |
// |----------|------------------|----------|--------------------------------|------------------|
// | GET      | /students        |          |                                | 首页             |
// | GET      | /students/new    |          |                                | 增加学生页面     |
// | POST     | /student/new     |          | name、age、gender、hobbies     | 增加学生         |
// | GET      | /students/edit   | id       |                                | 更改学生页面     |
// | POST     | /student/edit    |          | id、name、age、gender、hobbies | 更改学生         |
// | GET      | /students/delete | id       |                                | 删除学生         |

var User = require('./student.js'); //导入 模型构造函数

var express = require('express');
var router = express.Router(); //创建路由

router.get('/students',function(req,res){ //首页
  User.find(function(err,data){
    if(err){
      throw err;
    }
    res.render('index.html',{
      fruits:['苹果','香蕉','橘子'],
      students:data
    });
  });
})
router.get('/students/new',function(req,res){ //增加学生页面
  res.render('new.html');
});
router.post('/student/new',function(req,res){ //增加学生
  new User(req.body)
  .save(function(err,data){
    if(err){
      throw err;
    }
    res.redirect('/students'); //成功 重定向到首页
  });
});
// 111111111111111111111   目前不能通过 data {} 直接用于模板引擎 必须包一层
// router.get('/students/edit',function(req,res){ //更改学生页面
//   // console.log(req.query.id)
//   // console.log(req.query.id.replace(/"/g,''))
//   User.findOne({_id:req.query.id},function(err,data){
//     if(err){
//       throw err;
//     }
//     console.log(data)
//     res.render('edit.html',data);
//     // console.log(data)
//   });
// });
// 222222222222222222222
router.get('/students/edit',function(req,res){ //更改学生页面
  User.findOne({_id:req.query.id},function(err,data){
    if(err){
      throw err; 
    }
    // _id 默认带引号 "123"
    // 无意之间 id 查询到的对象还有一个属性 id 可以直接拿到不包含引号的字符串
    // {_id:req.query.id.replace(/"/g,'')} 是为了保证 能查到数据 
    res.render('edit.html',{ 
      student:data
    });
  });
});
router.post('/students/edit',function(req,res){ //更改学生
  User.findByIdAndUpdate(req.body.id,req.body,function(err){
    if(err){
      throw err;
    }
    res.redirect('/students');
  });
});
//删除学生
router.get('/students/delete',function(req,res){ //删除学生
  User.findByIdAndRemove(req.query.id,function(err){
    if(err){
      throw err;
    }
    res.redirect('/students');
  })
});

module.exports = router; //导出 路由
