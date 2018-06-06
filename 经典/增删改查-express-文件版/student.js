// student.js
// 只操作文件数据，不关心业务
// 封装异步 API
var fs = require('fs'); 
var dbPath = './db.json' //数据库（文件）路径

// 查询学生列表 { "students":[{},{}] }
exports.find = function (callback){
  fs.readFile(dbPath,'utf8',function(error,data){
    if(error){
      return callback(error);
    }
    callback(null,JSON.parse(data).students); //返回 [{},{}]
  });
};

//根据ID查询 一个
exports.findById = function(id,callback){
  fs.readFile(dbPath,'utf8',function(error,data){
    if(error){
      return callback(error);
    }
    var arr = JSON.parse(data).students; //获取所有数据 所组成的数组
    var row = arr.find(function(e){
      return e.id === parseInt(id);
    });
    callback(null,row); //返回 {}
  });
};

//增加学生
exports.save = function(student,callback){
  fs.readFile(dbPath,'utf8',function(error,data){
    if(error){
      return callback(error);
    }
    var arr = JSON.parse(data).students;
    student.id = arr[arr.length-1].id + 1;
    student.gender = parseInt(student.gender); //将性别转number
    arr.push(student);
    var db = JSON.stringify( {students:arr} );
    fs.writeFile(dbPath,db,function(error){
      if(error){
        return callback(error);
      }
      callback(null);
    });
  });
};

//更新学生 （编辑）
exports.updateById = function(student,callback){
  fs.readFile(dbPath,'utf8',function(error,data){
    if(error){
      return callback(error);
    }
    student.id  = parseInt(student.id); //因为构建数据时使用的是=== id必须为number 所以赋值给自己
    var arr = JSON.parse(data).students;
    var row = arr.find(function(e){ //row 指向 arr中的那个 更改row也就是更改了arr
      return e.id === student.id;
    });
    for(var key in student){ //更新数据
      row[key] = student[key]
    }
    row.gender = parseInt(row.gender); //性别转换number
    var db = JSON.stringify( {students:arr} ); //构建数据
    fs.writeFile(dbPath,db,function(error){
      if(error){
        return callback(error);
      }
      callback(null);
    });
  });
};

//删除学生
exports.deleteById = function (id,callback){
  fs.readFile(dbPath,'utf8',function(error,data){
    if(error){
      return callback(error);
    }
    var delete_id = parseInt(id); //命名不要与id冲突
    var arr = JSON.parse(data).students;
    var index = arr.findIndex(function(e){
      return e.id === delete_id;
    });
    arr.splice(index,1);
    var db = JSON.stringify( {students:arr} );
    fs.writeFile(dbPath,db,function(error){
      if(error){
        return callback(error);
      }
      callback(null);
    });
  });
};
