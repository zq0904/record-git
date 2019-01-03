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

var Student = require('./student.js'); //导入 增删改查 方法
var express = require('express');
var router = express.Router(); //创建路由

router.get('/students',function(req,res){ //首页
  Student.find(function(error,data){
    if(error){
      return res.status(500).send('错误');
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
  Student.save(req.body,function(error){
    if(error){
      return res.status(500).send('错误');
    }
    res.redirect('/students'); //成功 重定向到首页
  });
});
router.get('/students/edit',function(req,res){ //更改学生页面
  Student.findById(req.query.id,function(error,data){
    if(error){
      return res.status(500).send('错误');
    }
    res.render('edit.html',data);
  });
});
router.post('/students/edit',function(req,res){ //更改学生
  Student.updateById(req.body,function(error){
    if(error){
      return res.status(500).send('错误');
    }
    res.redirect('/students');
  });
});
router.get('/students/delete',function(req,res){ //删除学生
  Student.deleteById(req.query.id,function(error){
    if(error){
      return res.status(500).send('错误');
    }
    res.redirect('/students');
  })
});

module.exports = router; //导出 路由
