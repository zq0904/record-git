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
    },
  }
)

// 定义映射数据库表模型
const Busine = sequelize.define('Busine', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true, // 主键
    autoIncrement: true, // 自增是不需要默认值 只有DataTypes.INTEGER可以自增
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false, // 必填项
  },
}, {
  timestamps: false, // 默认不添加 createdAt和updatedAt
})

const User = sequelize.define('User', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true, // 主键
    // autoIncrement: true, // 自增 TODO string 不能设置自增吗？
  },
  bId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { // 外键
      model: Busine,
      key: 'id',
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false, // 必填项
  },
  email: { // 也应该是
    type: DataTypes.STRING,
    unique: true, // 创建惟一约束 存错 已经存在则报错
    field: 'myEmail', // 数据库存储的字段名
  },
  isDel: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // 默认值
  },
  cTime: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // 默认时间等于 当前时间
  },
  uTime: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  commentMe: {
    type: DataTypes.INTEGER,
    comment: '列 注释'
  },
}, {
  timestamps: false, // 默认不添加 createdAt和updatedAt
})

;(async () => {
  // 模型同步
  // await User.sync() // 如果表不存在，则会创建表
  // await User.sync({ force: true }) // 表已经存在，则将其首先删除
  await sequelize.sync({ force: true }) // 一次同步所有模型
  // 删除表
  // await User.drop()
  // 删除所有表
  // await sequelize.drop()

  // build方法 创建一个实例 得到一个对象 调用save方法可以将其存储到数据库
  // const busine = Busine.build({ name: '用户价值增长部' })
  // toJSON 更友好的查看
  // console.log(busine, busine.toJSON())
  // await busine.save()
  const busine = await Busine.create({ name: "房产" }) // create = build + save
  // console.log(busine.toJSON())
  // busine.name = '房产2'
  // busine.save() // 修改
  // busine.destroy() // 删除

  const busines = await Busine.findAll({
    attributes: [['id', 'bid'], 'name'], // 指定查询的列 嵌套数组用于重命名
  })
  console.log(JSON.stringify(busines, null, 2)) // 读取整个表

})()
