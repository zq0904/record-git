// 统一Model的定义 -> 模块化规定映射模型的定义
// 规则 
// 统一主键，名称必须是id，类型必须是STRING(50)
// id 给了值 取你给的值 没给由uuid生成
// 所有字段不允许为空 （not null） 除非指定了allowNull: true
// 统一timestamp机制，每个Model必须有createdAt、updatedAt和version，分别记录创建时间、修改时间和版本号。
// 其中，createdAt和updatedAt以BIGINT存储时间戳，最大的好处是无需处理时区，排序方便
// version每次修改时自增, updatedAt每次更新记录当前时间
const Sequelize = require('sequelize');
const uuid = require('uuid'); // 用于生成随机唯一id
const config = require('./config');
// 获取随机id
function generateId() {
    return uuid.v4();
}
// 配置
var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});
const ID_TYPE = Sequelize.STRING(50);
// 封装 声明模型
function defineModel(name, attributes) { // 数据库名 属性
    var attrs = {};
    for (let key in attributes) {
        let value = attributes[key];
        // 这个if else 处理就是为了追加 allowNull: false 字段
        // 例如 attributes 其中有个字段是 gender: Sequelize.BOOLEAN 不是对象 最终转化为 gender: {type: Sequelize.BOOLEAN, allowNull: false }
        // 是对象形式 直接.allowNull就可以了
        if (typeof value === 'object' && value['type']) {
            value.allowNull = value.allowNull || false;
            attrs[key] = value;
        } else {
            attrs[key] = {
                type: value,
                allowNull: false
            };
        }
    }
    attrs.id = {
        type: ID_TYPE,
        primaryKey: true
    };
    attrs.createdAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    attrs.updatedAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    attrs.version = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    return sequelize.define(name, attrs, {
        tableName: name, // 表名
        timestamps: false, // 不启动自动化
        hooks: { // 钩子
            beforeValidate: function (obj) { // 在验证之前 比如 验证 not null
                // console.log('beforeValidate')
                let now = Date.now();
                if (obj.isNewRecord) { // 根据这个字段来判定是否是新的记录
                    if (!obj.id) {
                        obj.id = generateId();
                    }
                    obj.createdAt = now;
                    obj.updatedAt = now;
                    obj.version = 0;
                }
            },
            // beforeCreate: function () { // 创建数据 之前调用
            //     console.log('beforeCreate');
            // },
            // beforeDestroy: function () { // 删除数据 之前调用
            //     console.log('beforeDestroy');
            // },
            beforeUpdate: function (obj) { // 更新数据 之前调用
                // console.log('beforeUpdate');
                obj.updatedAt = Date.now();
                obj.version ++;
            }
        }
    });
}

var exp = {
    defineModel: defineModel,
    generateId: generateId,
    sync: () => {
        // 只允许在 非生产环境中创建
        if (process.env.NODE_ENV !== 'production') {
            sequelize.sync({ // 同步所有已定义的模型到数据库中
                force: true // 创建表前先删除原表
            });
        } else {
            throw new Error('process.env.NODE_ENV 为production（生产环境）不能使用 sync()');
        }
    }
}

const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN'];
for (let type of TYPES) {
    exp[type] = Sequelize[type];
}
exp.ID = ID_TYPE;

module.exports = exp;
