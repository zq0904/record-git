var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/luntan',{ useMongoClient: true }); //链接数据库

module.exports = {   //每个模型对象 加载 在整体导出
  User: require('./user.js')
  // ,Topic: require('./topic')
}
