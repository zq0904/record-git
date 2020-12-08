// 使用Nunjucks 模板引擎
// 注意的问题 1.转义 避免受到XSS攻击 2.格式化 3.简单逻辑
// const nunjucks = require('nunjucks')
// function createEnv(path, opts) {
//     var
//         autoescape = opts.autoescape === undefined ? true : opts.autoescape,
//         noCache = opts.noCache || false,
//         watch = opts.watch || false,
//         throwOnUndefined = opts.throwOnUndefined || false,
//         env = new nunjucks.Environment(
//             new nunjucks.FileSystemLoader('views', {
//                 noCache: noCache,
//                 watch: watch,
//             }), {
//                 autoescape: autoescape,
//                 throwOnUndefined: throwOnUndefined
//             });
//     if (opts.filters) {
//         for (var f in opts.filters) {
//             env.addFilter(f, opts.filters[f]);
//         }
//     }
//     return env;
// }
// var env = createEnv('views', {
//     watch: true,
//     // noCache: fasle, // 缓存已读取的文件内容 上线要设置为true 性能优化
//     filters: {
//         hex: function (n) {
//             return '0x' + n.toString(16);
//         }
//     }
// });
// // var str = env.render('hello.html', { 
// //     name: '<script>赵琦</script>', // 这样就避免了xss攻击
// //     arr: ['刘', '关', '张']
// // });

// // Nunjucks 强大的功能在于模板的继承 实现共用头部 尾部
// var str = env.render('extend.html', {
//     body: '变更的体部'
// })
// console.log(str)

// 传说中的MVC 模型 视图 控制器
// C controller 负责业务逻辑 比如监测用户是否存在 取出用户信息 等
// V views 包含变量 {{ name }} 的模板 负责显示逻辑
// M 是用来传递给 view 


// const Koa = require('koa')
// const bodyparser = require('koa-bodyparser')
// const controllers = require('./controllers')
// const templating = require('./templating')
// // 生产环境上必须配置环境变量NODE_ENV = 'production'
// const isProduction = process.env.NODE_ENV === 'production'; // 判断是否是生产环境 上线
// const app = new Koa()
// // 打印日志
// app.use(async (ctx, next) => {
//     console.log(`打印日志 ${ctx.method} ${ctx.url}`)
//     var startTime = new Date().getTime();
//     await next();
//     var differ = new Date().getTime() - startTime;
//     ctx.response.set('X-Response-Time', `${differ} ms`)
// })
// // 这是因为在生产环境下，静态文件是由部署在最前面的反向代理服务器（如Nginx）处理的，Node程序不需要处理静态文件。
// // 而在开发环境下，我们希望koa能顺带处理静态文件，否则，就必须手动配置一个反向代理服务器，这样会导致开发环境非常复杂。
// if (!isProduction) {
//     const staticFiles = require('./static-files')
//     app.use(staticFiles('/static/', __dirname + '/static')) // 开放静态资源
// }
// // 集成Nunjucks
// app.use(templating('views', {
//     noCache: !isProduction, // 缓存已读取的文件内容 上线要设置为true 性能优化
//     watch: !isProduction
// }))
// app.use(bodyparser()) // 使用解析post请求 body
// app.use(controllers()) // 使用控制器/路由 MVC

// app.listen(3000)
// console.log('启动成功 3000')


// CREATE TABLE IF NOT EXISTS pets (
//   id int unsigned NOT NULL AUTO_INCREMENT COMMENT '自增主键',
//   name varchar(100) NOT NULL COMMENT '名字',
//   gender tinyint(1) NOT NULL COMMENT '性别',
//   birth timestamp NOT NULL COMMENT '出生日期',
//   createtime timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
//   modifytime timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
//   PRIMARY KEY (id)
// ) COMMENT '宠物表' ENGINE = InnoDB DEFAULT CHARSET = utf8

// // sequelize ORM技术 关系数据库的表结构映射到对象上 注意mysql mysql2这个包是驱动，我们不直接使用，但是sequelize会去调用
const { Sequelize, Model, DataTypes } = require('sequelize')
DataTypes.in
// const config = require('./config')
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
    host: config.host,
    dialect: config.dialect,
    pool: {
      max: 5,
      min: 0,
      idle: 30000
    }
  }
)

// 定义映射数据库表模型
var Pet = sequelize.define('pets', { // 这个实例化数据对象 它表示一个数据模型 称为 Model
  id: {
    type: Sequelize.,
    primaryKey: true // 是主键
  },
  name: Sequelize.STRING(100),
  gender: Sequelize.BOOLEAN,
  birth: Sequelize.STRING(10),
  createdAt: Sequelize.BIGINT,
  updatedAt: Sequelize.BIGINT,
  version: Sequelize.BIGINT,
}, {
  timestamps: false, // 关闭自动化功能
})


// 向数据库中插入数据
// // Promise的方式
// var now = Date.now();
// Pet.create({
//     id: 'g-' + now,
//     name: '猫猫',
//     gender: false,
//     birth: '2018-01-21',
//     createdAt: now,
//     updatedAt: now,
//     version: 0
// }).then(function (p) {
//     console.log(JSON.stringify(p))
// }).catch(function (err) {
//     console.log(err)
// })

// // await 增加
// var now = Date.now();
// (async () => {
//     var dog = await Pet.create({
//         id: 'd-' + now,
//         name: '狗狗',
//         gender: false,
//         birth: '2018-02-02',
//         createdAt: now,
//         updatedAt: now,
//         version: 0
//     })
//     console.log(1,JSON.stringify(dog))
// })()

// // await 查询
// (async () => {
//     var cat = await Pet.findAll({ // cat 得到的是数组
//         where: {
//            name: 'Gaffey' 
//         }
//     })
//     console.log(cat.length) // 在 查到几条
//     for (var i in cat) {
//         console.log(JSON.stringify(cat[i]))
//     }
// })()

// // 更新 是建立在查询基础上的
// ;(async () => {
//     var p = await Pet.findAll({
//         where: {
//             name: '狗狗'
//         }
//     })
//     p[0].name = '66';
//     p[0].version ++ ;
//     await p[0].save();
// })()

// // 删除 数据
// ;(async () => {
//     var p = await Pet.findAll({
//         where: {
//             name: 'Gaffey',
//             version: -1
//         }
//     });
//     // for (var i in p) {
//     //     console.log(p[i].name)
//     // }
//     await p[0].destroy();
// })()

// const { Pet, User } = require('./model'); // 引入所需 规定模型映射
// 新增据 执行1次 beforeValidate 执行1次 beforeCreate
// (async () => {
//     var pet = Pet.create({
//         name: '名字',
//         gender: false,
//         birth: '2020-20-20'
//     });
//     console.log(JSON.stringify(pet))
// })();

// // 查找 不会执行钩子函数
// (async () => {
//     var pers = await Pet.findAll({ // 拿到的是伪数组
//         where: {
//             name: '名字'
//         }
//     });
//     for (var i in pers) {
//         console.log(JSON.stringify(pers[i]))
//     }
// })();

// // 更新 执行2次 beforeValidate 执行1次 beforeUpdate
// // 删除 执行1次 beforeDestroy
// (async () => {
//     var pers = await Pet.findAll({
//         where: {
//             name: '名字',
//             gender: 1
//         }
//     });
//     // pers[0].destroy();
//     pers[0].birth = '2018-01-01';
//     await pers[0].save();
// })();


// // http测试
// const Koa = require('koa');
// const app = new Koa();
// app.use(async (ctx, next) => {
//     let now = Date.now();
//     await next();
//     let ms = Date.now() - now;
//     console.log(`${ctx.method} ${ctx.url} ${ms}`);
//     ctx.response.set('X-Response-Time', `${ms}ms`);
// });
// app.use(async (ctx, next) => {
//     let name = ctx.query.name || '/后面没有?name';
//     ctx.type = 'text/html';
//     ctx.body = `<h1>${name}</h1>`;
// });
// module.exports = app;

// // WebSocket
// const WebSocket = require('ws');
// const WebSocketServer = WebSocket.Server; // 应用server
// const wss = new WebSocketServer({
//     port: 3000
// });
// wss.on('connection', function (ws) { // 监听 WebSocketServer实例的连接事件 回调函数中返回WebSocket实例
//     ws.on('message', function (message) { // 监听 WebSocket实例的消息事件 回调函数中返回消息
//         console.log(message); // 服务器收到了来自浏览器的消息
//         ws.send('服务器信息', (err) => { // 发送的消息可以是数组 字符串 2进制 不能是对象
//             if (err) {
//                 console.log(`websocketserver error: ${err}`);
//             }
//         });
//     });
// });

// // 浏览器端代码
// var ws = new WebSocket('ws://localhost:3000/test');
// ws.onopen = function () { // ws与服务器连接有很多状态 必须判断open才能
//     var sendMessage = {a:1,b:2}
//     ws.send(JSON.stringify(sendMessage)); // 发送的消息可以是数组 字符串 2进制 不能是对象
// };
// ws.onmessage = function (message) {
//     console.log(message); // 浏览器收到了来自服务器的消息
// }

// // 服务器端 模拟浏览器发送信息 在node下的ws模块 既包含了服务器端 又包含了客户端
// var ws = new WebSocket('ws://localhost:3000/test');
// ws
// .on('open', () => {
//     ws.send('mock浏览器信息')
// })
// .on('message', (message) => {
//     console.log(message);
// });


// 编写聊天室

// const Koa = require('koa');
// const bodyparser = require('koa-bodyparser');
// const controllers = require('./controllers');
// const templating = require('./templating');
// const { parseCookie, createWebSocketServer } = require('./creatWebSocket'); // 编写聊天室案例

// // 生产环境上必须配置环境变量NODE_ENV = 'production'
// const isProduction = process.env.NODE_ENV === 'production';
// const app = new Koa();
// app.use(async (ctx, next) => {
//     // let startTime = Date.now();
//     await next();
//     // let differ = Date.now() - startTime;
//     // console.log(`打印日志: ${ctx.method} ${ctx.url} ${differ}ms`);
//     // ctx.response.set('X-Response-Time', differ);
// });
// // 只要通过路由就会把当前的cookie解码存入ctx中 方便路由判断
// app.use(async (ctx, next) => {
//     ctx.state.user = parseCookie(ctx.cookies.get('name') || '');
//     await next();
// });
// // 这是因为在生产环境下，静态文件是由部署在最前面的反向代理服务器（如Nginx）处理的，Node程序不需要处理静态文件。
// // 而在开发环境下，我们希望koa能顺带处理静态文件，否则，就必须手动配置一个反向代理服务器，这样会导致开发环境非常复杂。
// if (!isProduction) {
//     const staticFiles = require('./static-files');
//     app.use(staticFiles('/static/', __dirname + '/static'));
// }
// app.use(templating('views', {
//     noCache: !isProduction, // 缓存已读取的文件内容 上线要设置为false 缓存 性能优化
//     watch: !isProduction
// }));
// app.use(bodyparser());
// app.use(controllers());
// let server = app.listen(3000);
// app.wss = createWebSocketServer(server); // 使用 app.listen引用的http.Server来创建wws  目的为了吧wss绑定到同一个端口 相同的端口根据 http ws协议来区分
// console.log('服务器启动成功 端口3000');


