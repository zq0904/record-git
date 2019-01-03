var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/zhaoqi',{ useMongoClient: true }); //链接数据库
var userSchema = new Schema({
  name:{
    type:String,
    require:true
  },
  gender:{
    type:Number,
    enum:[0,1], //只能是 0 或 1
    default:0   //默认是 0
  },
  age:{
    type:Number,
    require:true
  },
  hobbies:{
    type:String,
    require:true
  }
});
module.exports = mongoose.model('User',userSchema); //导出模型构造函数

