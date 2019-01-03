var express = require('express');
var router = express.Router();

router.get('/',function (req,res,next) { //主页
  res.render('index.html')
});
router.get('/1',function (req,res,next) { //姓名接口
  res.status(200).json({
    name:'ly'
  });
});
router.get('/2',function (req,res,next) { //职业接口
   res.status(200).json({
    zhi:'WEB前端'
  });
});

module.exports = router;
