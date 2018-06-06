const db = require('../db'); // 引入封装好的方法 实现了 id createAt updateAt version 自动添加 而不是每个Model都重新定义
module.exports = db.defineModel('users', { // 声明 users表的 映射模型
    email: {
        type: db.STRING(100),
        unique: true // 唯一
    },
    password: db.STRING(100),
    name: db.STRING(100),
    gender: db.BOOLEAN
});
