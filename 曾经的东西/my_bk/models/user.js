var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//多个模型构造函数 只需要链接一次 数据库 所以提出到 index.js
// mongoose.connect('mongodb://localhost/luntan',{ useMongoClient: true }); //链接数据库
var userSchema = new Schema({
  email:{
    type:String,
    required:true
  },
  nickname:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  create_time:{ //创建时间
    type:Date,
    default:Date.now //每创建一个 默认给当前时间戳
  },
  last_time:{
    type:Date,
    default:Date.now
  },
  avatar:{
    type:String,
    default:'/public/img/avatar-default.png'
  },
  bio:{
    type:String,
    deflate:'' //保证数据完整性
  },
  gender:{
    type:Number,
    enum:[-1,0,1], //枚举 只能有这3种情况
    default:-1
  },
  birthday:{
    type:String
  },
  status:{
    type:Number,
    enum:[0,1,2], //0没有限制 1不可以评论 2不可以登录
    default:0
  }
});


module.exports = mongoose.model('User',userSchema); //导出 模型构造函数
