// CREATE TABLE IF NOT EXISTS pets (
//   id int unsigned AUTO_INCREMENT COMMENT '自增主键',
//   name varchar(100) NOT NULL COMMENT '名字',
//   gender tinyint(1) NOT NULL COMMENT '性别',
//   birth timestamp NOT NULL COMMENT '出生日期',
//   createtime timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
//   modifytime timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
//   PRIMARY KEY (id)
// ) COMMENT '宠物表' ENGINE = InnoDB DEFAULT CHARSET = utf8


// // sequelize ORM技术 关系数据库的表结构映射到对象上 注意mysql mysql2这个包是驱动，我们不直接使用，但是sequelize会去调用
// npm install -S mysql mysql2 sequelize
const { Sequelize, Model, DataTypes } = require('sequelize')

const config = {
  dialect: 'mysql', // 语言
  database: 'sequelize-ORM', // 使用哪个数据库
  host: '127.0.0.1', // 主机
  port: 3307, // 端口号 MySQL默认 3306
  username: 'root', // 用户名
  password: '123456', // 密码
}

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    dialect: config.dialect,
    host: config.host,
    port: config.port,
    pool: {
      max: 5,
      min: 0,
      idle: 30000
    },
    define: {
      // freezeTableName: true, // 强制表名称等于模型名称
    }
  }
)

// 定义映射数据库表模型
const User = sequelize.define('User', {
  name: DataTypes.STRING,
  isDel: DataTypes.BOOLEAN
})

;(async () => {
  // 模型同步
  // await User.sync() // 如果表不存在，则会创建表
  // await User.sync({ force: true }) // 表已经存在，则将其首先删除
  // await sequelize.sync() // 一次同步所有模型
  // 删除表
  // await User.drop()
  // 删除所有表
  // await sequelize.drop()
})()

// const Pet = sequelize.define('Pet', { // 这个实例化数据对象 它表示一个数据模型 称为 Model
//   id: {
//     type: Sequelize.,
//     primaryKey: true // 是主键
//   },
//   name: Sequelize.STRING(100),
//   gender: Sequelize.BOOLEAN,
//   birth: Sequelize.STRING(10),
//   createdAt: Sequelize.BIGINT,
//   updatedAt: Sequelize.BIGINT,
//   version: Sequelize.BIGINT,
// }, {
//   freezeTableName: true, 
//   timestamps: false, // 关闭自动化功能
// })

// console.log(Pet === sequelize.models.Pet)