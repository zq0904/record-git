var mongoose = require('mongoose')
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/cheshi',{ useMongoClient: true });
var userSchema = new Schema({
  username: {
    type: String,
    required: true
  }
});
var User = mongoose.model('User', userSchema)


// // 用户注册 查询用户名是否存在 不存在 添加 （这里不做错误处理）
// User.find({
//   username: 'ly'
// },function (err,data) {
//   if(data[0]){
//     return console.log('已存在');
//   }
//   new User({
//     username: 'ly'
//   }).save(function (err,data) {
//     console.log('OK2');
//   })
// });

// // Promise方法
User.find({ //find方法 内部就返回一个Promise对象
  username: 'ly'
}).then(function (data) {
  if(data[0]){
    return console.log('已存在');
  }
  return new User({
    username: 'ly'
  }).save();
}).then(function (data) {
  console.log('OK2');
})

