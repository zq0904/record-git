// Node.js 不是语言 不是框架 是 运行环境
// 在 Node 中，采用 EcmaScript 进行编码 没有 BOM、DOM
// 运行node 启动cmd到当前文件夹下 或者 直接Shift+右键在此处打开命令窗口 或者 右键Git Bash Here
cmd操作 
cls 清屏
Tab快捷键 也具有补全功能 
node直接回车 进入编辑功能 类似浏览器中的控制台 方便测试  Ctrl + c + c 退出

console.log() //是在cmd中直接输出
res.end() //是返回给浏览器输出

fs模块 用于操纵文件
const fs = require('fs') // 加载 fs 核心模块
// fs.readFile(读取文件路径, 转码, 回调)
fs.readFile('./1.js', 'utf-8', (err, result) => { // 读取成功 data为读取的数据 error为null  读取失败 data为undefined error 错误对象 !!!
	if (err) return console.log('read error')
	console.log(result) // result数据类型是<Buffer 61 61 61 0d 0a> 1.使用result.toString()转成文本类型 2.添加第2参数'utf-8'拿到的数据为文本
})
// fs.writeFile(写入文件路径, 写入的内容, 回调)
fs.writeFile('./2.js', contant, err => { // 写入的内容content可以是Buffer类型或者是String类型
	if (err) { // 写入成功 err 为null 失败 为错误对象 对统一文件执行写入操作会覆盖文件
		console.log('write error')
	} else {
		console.log('write error')
	}
})

http模块 用于构建一个web服务器
const http = require('http')
const server = http.createServer() // 实例化server
// 监听 server的request事件 客户端（浏览器）请求会触发
server.on('request', (request, response) => {
  const url = request.url // 获取 /及之后的部分
  if (url === '/a') {
    response.write('第1次写入缓冲区') // 添加进缓冲区的内容 最后通过 .end 一起发送
    response.write('第2次写入缓冲区')
    response.end()
  } else if (url === '/b') { // 设置响应头 解决乱码及html解析问题
    response.setHeader('Content-Type', 'text/plain;charset=utf-8')
    response.end('<p>解决乱码 但是HTML并不能解析</p>')
  } else {
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.end('<p>解决乱码 HTML能解析</p>')
  }
})
server.listen(3000, () => { // 在3000端口启动服务 后的回调
  console.log('server start 3000')
})

node中的 核心模块
const os = require('os') // 用来获取计算机信息
	// console.log(os.cpus()) // 获取CPU信息
	// console.log(os.totalmem()) // 获取内存
const path = require('path'); // 用来操作路径的

ip地址 用来定位计算机 request.socket.remoteAddress // 请求过来的计算机IP
端口号 用来定位具体应用程序 request.socket.remotePort // 请求到过来的计算机远程端口

在node中作用域
// 没有全局作用域 只有模块作用域 内部 外部完全隔离 仅仅是执行顺序上的关系
// 如果想让模块与模块之间通信 每个文件模块都有exports对象 exports默认是空对象
// 将想要暴露的成员 挂在到exports 对象上 require 加载执行代码 同时 拿到被加载模块的接口对象exports
// 1.js
var o = require('./2.js'); //加载2.js模块
console.log(o.add(2,3)); //调用暴露的o.add方法
// 2.js
exports.add = function (a,b){return a+b;}; ////相对路径必须加./ 后缀名可省略



案例 搭建服务器 浏览器访问 显示不同信息 
//不同的资源对应的 Content-Type 是不一样，具体参照：http://tool.oschina.net/commons
// var http = require('http');
// var fs = require('fs');
// var server = http.createServer();
// server.on('request',function(req,res){
// 	var url = req.url;
// 	if(url=='/'){
// 		fs.readFile('./1.html',function(error,data){ //data本来就是二进制数据 无需转换直接用于end()
// 			if(error){
// 				res.setHeader('Content-Type','text/plain;charset=utf-8');
// 				res.end('文件读取失败，请稍后重试！');
// 			}else{
// 				res.setHeader('Content-Type','text/html;charset=utf-8');
// 				res.end(data);
// 			}
// 		});
// 	}else if(url=='/a'){
// 		fs.readFile('./2.jpg',function(error,data){
// 			if(error){
// 				res.setHeader('Content-Type','text/plain;charset=utf-8');
// 				res.end('文件读取失败，请稍后重试！')
// 			}else{
// 				res.setHeader('Content-Type','image/jpeg'); //图片不用设置编码
// 				res.end(data);
// 			}
// 		});
// 	}else{
// 	}
// });
// server.listen(3000,function(){
// 	console.log('服务器绑定成功！');
// });

代码采用了无分号的风格 
// 当一行代码以 ( [ ` 开头的时候 在前面补个;号不免一些语法错误

模仿Apache对用户输入的不同网址 做不同相应 //'/'默认index.html主页
// var http = require('http');
// var fs = require('fs');
// server = http.createServer();
// server.on('request',function(req,res){
//   var www = 'C:/Users/dell/Desktop/nodeJS/-02/zhaoqi'; 
//   var url = req.url; //用户想要访问的页面
//   var filePath = '/index.html'; //默认想要访问的
//   if(url != '/'){
//     filePath = url;
//   }
//   fs.readFile(www+filePath,function(error,data){
//     if(error){
//       return res.end('404'); //输出404 同时阻止代码向下运行
//     }
//     res.end(data);
//   });
// });
// server.listen(3000,function(){
//   console.log('成功');
// })

关于 服务器端渲染 和 客户端渲染（ajax） 的区别

// 模板引擎最早诞生在服务端 
// 服务端渲染直接将渲染好的页面 返回给浏览器 在浏览器右键查看元素 可以查看到
// 客户端渲染（ajax）浏览器通过地址栏 发送请求到服务器 服务器返回“空的”的页面 在浏览器解析这个页面的过程中 发送AJAX请求无刷新动态渲染页面
总结：
// 服务端渲染 是可以被爬虫抓取到 利于SEO搜索引擎优化
// 客户端渲染（ajax）是很难被爬虫抓取到 不利于SEO搜索引擎优化
// 例如京东这种大的电商网站 商品列表 为了能让SEO抓取到 采用 服务端渲染 而评论采用ajax异步渲染
// 所以真正的网站 既不是纯服务端渲染 也不是纯ajax异步渲染 而是两者相结合

模仿Apache 目录列表 自己准备好的页面 通过服务端渲染（字符串拼接）
// var http = require('http');
// var fs = require('fs');
// var dir = 'C:/Users/dell/Desktop/nodeJS/02/code'; //要展现的目录

// var server = http.createServer();
// server.on('request',function(req,res){
//   var url = req.url;
//   fs.readFile('./template.html',function(error,data){//读取模板
//     if(error){
//       return res.end('404');
//     }
//     // 通过拼接字符串的方式
//     var a = [];
//     fs.readdir(dir,function(error,files){ //读取目录 files为目录所有文件说构成的数组
//       if(error){
//       	return res.end('no');
//       }
//       files.forEach(function(e,i){
//         a.push(`<tr>
//                   <td data-value="apple/"><a class="icon dir" href="/D:/Movie/www/apple/">`+e+`/</a></td>
//                   <td class="detailsColumn" data-value="0">12M</td>
//                   <td class="detailsColumn" data-value="1509589967">2017/11/2 上午10:32:47</td>
//                 </tr>`);
//       });
//       var text = a.join('');
//       var html = data.toString().replace('zhaoqi',text); //data是2进制 直接输出res.end()可以 要是对其操作转字符串
//       res.end(html);
//     });
    
//   });
// });
// server.listen(3000,function(){
//   console.log('启动成功');
// });
模仿Apache 目录列表 自己准备好的页面 通过服务端渲染（使用模板引擎）
// cmd 安装   npm install art-template 该命令在哪执行就会把包下载到哪里。默认会下载到 node_modules 目录中 node_modules 不要改，也不支持改。
var template = require('art-template'); //安装在当前目录下 直接加载模块 (当然支持原声语法)
var html = template.render('模板字符串',{}); //渲染 纯粹的 '填坑'
// var http = require('http');
// var fs = require('fs');
// var template = require('art-template');
// var dir = 'C:/Users/dell/Desktop/nodeJS/02/code';//要展现的文件路径
// http.createServer(function(req,res){
//   var url = req.url;
//   fs.readFile('./template.html',function(error,data){
//     if(error){
//       return res.end(404);
//     }
//     fs.readdir(dir,function(error,files){
//       if(error){
//         return res.end('NO');
//       }
//       var html = template.render(data.toString(),{//渲染
//         files:files
//       });
//       res.end(html);
//     })

//   });
// }).listen(3000,function(){
//   console.log('成功!');
// });

url模块
var url = require('url');
var obj = url.parse('/pinglun?name=1&sex=2',true); 
//对url解析 得到一个对象 参数true为 obj.query 为json格式 不加参数 obj.query 为序列化字符串
obj.search //?之后的部分
obj.query //键值对json格式
obj.pathname //路径名

留言板
// var http = require('http');
// var fs = require('fs');
// var url = require('url');
// var template = require('art-template');
// var comments = [
// 	{name:'刘莹',
// 	message:'今天没吃早饭',
// 	time:'2017-11-03 01:13:14'}
// ];
// // node.js一执行 所有访问留言板目录下的文件都要经过zhaoqi.js的处理
// http.createServer(function(req,res){
// 	var obj = url.parse(req.url,true); //解析 请求地址 加true obj.query 直接就是json格式
// 	var p = obj.pathname; //路径名
// 	if(p==='/'){ //访问主页
// 		fs.readFile('./views/index.html',function(error,data){
// 			if(error){
// 				return res.end('404');
// 			}
// 			var html = template.render(data.toString(),{comments:comments});//模板渲染
// 			res.end(html);
// 		});
// 	}else if(p.indexOf('/public')===0){ 
// 	//访问主页时 浏览器从上到下解析遇到src href 等在次访问 public目录下的文件
// 	//统一控制 这也意味 链接 都要已 / 开头 要不根本匹配不上
// 		fs.readFile('.'+p,function(error,data){ //读文件 都是该文件去读的 使用的都是相对路径
// 			if(error){
// 				return res.end('404');
// 			}
// 			res.end(data);
// 		});
// 	}else if(p==='/post'){ //评论
// 		fs.readFile('./views/form.html',function(error,data){
// 			if(error){
// 				return res.end('404');
// 			}
// 			res.end(data);
// 		});
// 	}else if(p=='/tijiao'){ //提交评论
// 		var o = obj.query;
// 		o.time = '2017-12-13 66:66:66';
// 		comments.unshift(o);
// 		res.statusCode = 302; //重定向
// 		res.setHeader('location','/');
// 		res.end();
// 	}else{ //没有的给404
// 		fs.readFile('./views/404.html',function(error,data){
// 			if(error){
// 				return res.end('404');
// 			}
// 			res.end(data);
// 		});
// 	}
// }).listen(3000,function(){
// 	console.log('成功')
// });
node中的模块
// 核心模块 http fs url path os 等模块
// 第三方的模块 art-template （必须通过该npm来下载 才可以使用）
// 自己写的模块 自己写的
模块系统 模块作用域 
// 使用require来加载模块  （执行被加载的模块代码 得到导出的接口对象）
// 使用exports接口对象来导出模块中的成员
在node中 每个模块都有一个自己的module对象 （module.exports exports 区别）
// 大体结构 module = { exports : { a:1 } } 最后返回的是module.exports 导出的结果 被require接收
// exports仅仅是module.exports的一个引用指向相同 
// 导出多个成员：module.exports = { a:1,b:2 } 或 exports.a = 1 exports.b = 2  不能 exports = { a:1,b:2 } 这仅仅是改变exports的指向 并没有更改module.exports的内容
// 导出单个成员 exports.a = 1; （简洁）
// 直接导出字符串等 module.exports = 'str'; 直接改变指向就可以了
// 当 module.exports 与 exports 指向不同时 可以使用 exports = module.exports 来建立引用关系
状态码 301 302 的区别 301永久重定向 302临时重定向
原型写一个 [].slice.call(伪数组);
// Array.prototype.mySlice = function () {
//     var start = 0; //没传参 截取整个数组 拷贝数组
//     var end = this.length;
//     if(arguments.length==1){ //传一个 一直截取到最后
//       start = arguments[0];
//     }else if(arguments.length==2){ //从开始index截取到 后一个index 不包括后一个index 
//       start = arguments[0];
//       end = arguments[1];
//     }
//     var arr = [];
//     for(var i = start; i < end; i ++){
//       arr.push(this[i]);
//     }
//     return arr;
//   }
//   var o = {
//     0:'p',
//     1:'div',
//     length:2
//   };
//   console.log(o);//伪数组
//   console.log([].mySlice.call(o));
require 方法加载规则
// 优先从缓存中加载
// 核心模块  require('fs');
// 路径形式的模块（自己写的模块） require('./a.js'); （必须加 . 可以省略.js）
// 第三方模块 require('art-template'); 第三方模块必须通过 npm来下载
// 	加载规则（类似 作用域链 原型链）
// 	node_modules/art-template    //在当前文件所处目录找node_modules
// 	node_modules/art-template/package.json 文件 //package.json 描述
// 	node_modules/art-template/package.json 文件中的 main 属性
// 	main 属性中就记录了 art-template 的入口模块 （idnex.html）
// 	如果 package.json 文件不存在或者 main 指定的入口模块是也没有 则 node 会自动找该目录下的 index.js（默认备选项）
// 	本级没有 去上一级找 ... 都没有报错 

npm （npmjs.com）
npm --version //查看本版
npm install --global npm //升级npm
npm init
npm init -y //跳过向导（一问一答）快速生成 其中也自动生成了package.json
npm install 
npm i //一次性把 dependencies 选项中的依赖项全部安装
npm install 包名 
npm i 包名 //只下载 （不推选 没有依赖信息）
npm install --save 包名
npm i -S 包名 //下载并且保存依赖项（package.json 文件中的 dependencies 选项）
npm uninstall 包名
npm un 包名 //只删除，如果有依赖项会依然保存
npm uninstall --save 包名 
npm un -S 包名 //删除的同时也会把依赖信息也去除
npm help //查看使用帮助
npm 命令 --help //查看指定命令的使用帮助
dependencies 选项 是一个保存第三方包的依赖信息

解决 npm 被墙问题
// npm 存储包文件的服务器在国外，有时候会被墙，速度很慢 可以使用淘宝的淘宝镜像（http://npm.taobao.org/）
// 1.安装淘宝的 cnpm：在任意目录执行都可以 npm install --global cnpm  （--global 表示安装到全局 不能省略）
// npm install jquery //正常 npm
// cnpm install jquery //使用 淘宝镜像
删除 淘宝镜像
// npm config delete registry
// npm config delete disturl

require()加载 不会重复加载 在次调用require()的目的仅仅是取得接口对象(module.exports导出对象)
这样的设定目的是,提高模块加载效率

在node中 绝对路径 相对路径使用问题
// 读文件 readFile('./index.html') 加载自己写的模块 ('./login.html') 都是使用的相对路径 相对该文件去加载
// 判断pathname 路径名字 使用绝对路径 if(p=='/public') 对应的HTML页面也使用 绝对路径 <a href="/post"> <form action="/tijiao">
// 自己写的模块操作路径 require('./data/foo.js') // ./不能省略 省略了会把它当成系统模块

nodemon 第三方命名航工具 （修改完代码自动重启）//npm install --global nodemon //任意目录 全局安装
使用 nodemon app.js 启动的服务 //会自动监视你的文件变化,当文件发生变化的时候,自动帮你重启服务器

Express 框架 （目录结构很重要）
// npm install --save express
配置 art-template 模板引擎 需要安装
// npm install --save art-template
// npm install --save express-art-template
配置 Express 获取表单 POST 请求体数据
// npm install --save body-parser
var express = require('express'); 
var bodyParser = require('body-parser'); //加载 配置获取表单 POST
var app = express(); //创建服务器 相当于 http.createServer()

app.engine('art', require('express-art-template')); //'art'用来配置视图的后缀名 存储在 views 目录中的模板文件 必须是XX.art  可以自行修改为 app.engine('html', require('express-art-template'))
//渲染时 当碰到以.art结尾的文件 使用art-template模板引擎   art-template必须安装 因为 express-art-template 依赖art-template
//第一个参数 不能写路径 默认会去项目中的 views 目录查找该模板文件 （这是一个约定）
// app.set('views', 目录路径); //修改默认的 views 视图渲染存储目录

app.use(bodyParser.urlencoded({ extended: false })); //加入配置 可以直接通过 req.body 来获取表单 POST 请求体数据了
app.use(bodyParser.json()); //json支持任何Unicode编码的字符 对比 urlencoded只支持utf-8的编码的字符

app.use('/public',express.static('./public/')); //开放public目录下资源  访问通过 /public/1.css
app.use('/node_modules',express.static('./node_modules/')); //公开资源bootstrap
// app.use('/a',express.static('./public/')); //相当于 给public目录起别名  访问通过 /a/1.css
// app.use(express.static('public')); //开放public目录下资源 访问通过 /1.css

var router = require('./router.js'); //加载路由模块
app.use(router); //挂载路由
app.use(function(req,res){ //通过中间件来配置
	//404 所有未处理的请求都会跑到这里来
});
app.listen(3000,function(){
  	console.log('成功');
});

提取路由模块 （划分模块的目的就是为了增强项目代码的可维护性 提升开发效率）
router.js
var Student = require('./student.js'); //导入 增删改查 方法
var express = require('express');
var router = express.Router(); //创建路由
router.get('/students',function(req,res){ //把路由都挂载到 router 路由器中
	req.query;
	// 输出
	res.status(500).send('错误');
	res.status(500).json({err_code:500,message:'错误'}); //.json这个响应方法 会自动将对象转为json字符串发送给服务器 相当于JSON.stringify
	res.render('index.html',{});
	res.render('login.html');
	//服务器的重定向 只针对同步请求才有效 异步请求无效
	res.redirect('/a'); //重定向 请求路径为/a
}); 
router.post('/students/a',function(req,res){
	req.body;
}); 
module.express = router; //导出路由器

fs.readFile('index.html',function(error,data){
	if(error){
		throw error; //抛出异常 1.阻止代码向下运行 2.把错误信息输出到控制台
	}
});

获取一个函数中的异步操作 结果 则必须通过回调函数来获取
// 一些异步操作 setTimeout readFile writeFile ajax
// 所有的文件操作 readFile('./1.html',function(error,data){}); 都是异步的 就像AJAX一样
// function f(x,y,fn){ //底层封装
//   setTimeout(function(){
//     var a = x + y;
//     fn(a);
//   },1000);
// }
// f(function(data){ //上层调用
//   console.log(data);
// });
在 Express 配置 MongoDB 数据库// 安装 npm i mongoose 
// MySql      MongoDB // MongoDB 非常灵活 没有表结构 不需要创建数据库等 一切由MongoDB自动自动完成
// 数据库     数据库
// 表         集合
// 表记录     文档
// { qq:{ //数据库
// 		users:[{},{},{}], //users 集合json的感觉  {} 文档 每行数据
// 		products:[{},{},{}]  ...}
// 	baidu:{ //数据库
// 		...}
// }
检查安装成功与否 mongod --version
启动数据库 mongod 停止 Ctrl+c 或者直接关闭窗口
// mongodb 默认使用执行 mongod 命令所处盘符根目录下的 /data/db 作为自己的数据存储目录
// 所以在第一次执行该命令之前先自己手动新建一个 /data/db    修改默认的数据存储目录 ： mongod --dbpath=数据存储目录路径
链接数据库 mongo 退出 exit
基本命令 在启动数据库 之后在打开一个窗口（链接数据库 mongo）
show dbs //查看显示所有数据库
db //查看当前操作的数据库
use 数据库名 //切换到指定的数据（如果没有会新建）
show collections //显示当前数据库中的集合
db.users.find(); //查询所有数据 一定要进入这个数据库 use 数据库名 切进来
db.users.findOne({"username":"123"}); //查询一个数据 {}
db.users.save({"username":"123","password":123456}); //添加数据
db.users.remove(null); //删除所有
db.users.remove({"username":"123"}); //按条件删除
db.users.update({"username":"123"},{'$set':{"username":"154809748"}},upsert=true,multi=true); //更改数据 
db.dropDatabase(); //删除当前使用数据库
插入数据：
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// 1.连接数据库 指定的数据库zhaoqi不需要存在 当你插入数据就自动创建数据库
mongoose.connect('mongodb://localhost/zhaoqi',{ useMongoClient: true }); 
// 2.设计文档结构（表结构）约束的目的就是保证数据的完整性（每个行数据的结构要一致）
var userSchema = new Schema({
	name:{
		type:String,
		required:true  //必须有
	},
	gender:{
		type:Number,  
		enum:[-1,0,1], //枚举 只能有这3种情况
		default:0      //有时候为了保证数据完整性 default = '' 赋值赋函数的地址 default = Date.now 表示创建这个对象 获取当前时间
	}
});
// 3. 将文档结构发布为模型 使用大写单词 转化为小写复数 作为 集合名称 users
var User = mongoose.model('User',userSchema);
// 4. 当我们有了模型构造函数之后，就可以使用这个构造函数对 users 集合中的数据为所欲为了（增删改查）
增加
new User({name:'zhaoqi',sex:1})
.save(function(err,data){
	if(err){
		console.log(err);
	}else{
		console.log(data);
	}
});
查询  ---  渲染 （获取数据 _id 是带引号的 "123"  id 是不带引号的 123 都是字符串 ！！！）
//查询 []
User.find(function(err,data){
	if(err){console.log(err)}else{console.log(data)}
});
//按条件查询 [] 没有查到数据 显示成功	
User.find({sex:1},function(err,data){
	if(err){console.log(err)}else{console.log(data)}
})
//按条件查询行 {} 如果有多行数据满足 只会显示第一个 如果没有查到显示null （这个null在if else语句中隐式转换 成false 而[]隐式转换成true ）
User.findOne({sex:1},function(err,data){
	if(err){console.log(err)}else{console.log(data)}
})
//根据_id查询
User.findById(req.query.id,function(err,data){
	if(err){console.log(err)}else{console.log(data)}
})
删除
//删除
User.remove(function(err,data){
	if(err){console.log(err)}else{console.log(data)}
})
//根据条件删除 删除数据库中不存在的 显示成功 但是没啥能删的
User.remove({sex:1},function(err,data){
	if(err){console.log(err)}else{console.log(data)}
})
// 根据条件删除一个
User.findOneAndRemove(conditions, [options], [callback])
// 根据 id 删除一个 如果id不存在显示删除失败
User.findByIdAndRemove(req.query.id, [options],function(err){
	if(err){console.log(err)}
})
更新
// 根据条件更新所有
User.update(conditions, doc, [options], [callback])
// 根据指定条件更新一个
User.findOneAndUpdate(req.body.id, [update], [options], [callback])
// 根据 id 更新一个 如果id不存在显示更新失败
User.findByIdAndUpdate('5a001b23d219eb00c8581184',{name:1},function(err){
	if(err){console.log(err)}
});

在 Express 配置 MySQL 数据库// 安装 npm install --save mysql
// var mysql = require('mysql');
// var my = mysql.createConnection({ //创建数据库
//   host: 'localhost',
//   user: 'root',
//   password: '123456',
//   database: 'zhaoqi'
// });
// my.connect(); //连接数据库
// //执行数据操作 （增删改查）
// my.query('SELECT * FROM `user`', function (error, results, fields) {
//   if (error) throw error;
//   console.log(results);
// });
// my.end(); //关闭数据库连接

path 路径操作模块
// path.basename 获取一个路径的文件名（包含拓展名）
// path.dirname 获取一个路径的目录
// path.extname 获取一个路径的拓展名
// path.parse  把一个路径转化为对象
// 	root 根路径    dir 目录      base 包含后缀名的文件名
// 	ext 后缀名     name 不包含后缀名的文件名
// path.join(a,b); //将a b两个拼接组成新的路径
// path.isAbsolute //判断一个路径是否为绝对路径
// __dirname 动态获取 当前文件模块所属目录 的绝对路径
// __filename 动态获取 当前文件 的绝对路径
在（文件操作）中 readFile() //使用相对路径 相对路径被设定为相对执行node命令所处的路径 （就这样设定的）
例如公开资源 app.use('/public',express.static(path.join(__dirname,'./public/'))); //动态的绝对路径来解决 
require('./router.js'); //模块中的路径 都是相对模块文件 不涉及 只有文件操作 公开资源 涉及路径转化

art-template 模板继承 子模板
index.html
// {{ include './header.html' }}   //将header.html <nav>头部导航</nav> 内容插入
// {{ block  'content' }}<h1>默认内容</h1>{{ /block }} //留给子模板自行发挥 有就用会替换默认 没有就默认
// {{ block 'script' }}{{ /block }} //留给子模板自行发挥
list.html
// {{ extend './index.html'}} //子模板 继承 并 填坑（自行发挥）
// {{ block  'content' }}<h4>新内容</h4>{{ /block }} //替换内容
// {{ block 'script' }}<script src=""></script>{{ /block }} //加载不一样的样式

在 Express 配置 session插件// 安装:npm install express-session
// var session = require('express-session');
配置:// 插件会为 req 请求对象添加一个成员req.session 是一个对象
app.use(session({
  secret:'jiami', //配置加密字符串 他会在原有字符串和这个字符串拼接在一起去加密 也就是'加盐'
  resave:false,
  saveUninitialized:true //无论是否使用session 都会默认给你分配一把钥匙
}))
使用：
//设置session发生2件事 1.自动发送一个session 存储在cookie中 2.吧data挂到session.user这个对象下
req.session.user = data;
req.session.user // 获取session中的数据 session中存的是什么
req.session.user = null; //清空session 不严谨
delete req.session.user //清空session 严谨

在 Express 配置 md5加密 //npm install blueimp-md5
// var md5 = require('blueimp-md5');
// body.password = md5(md5(body.password)); //md5对密码 加密2次


Promise
前一个函数 return 返回一个 123          后续的then方法中的第一个参数 function(data){} //data就是123
前一个函数 return 返回一个 Promise 对象 后续的then方法中的第一个参数 function(data){} //这个函数是上一个Promise对象的 resolve(data)方法 那data也是data
封装 Promise
// var fs = require('fs');
// function p(path){
//   return new Promise(function(resolve,reject){
//     fs.readFile(path,'utf8',function(err,data){
//       if(err){
//         reject(err);
//       }else{
//         resolve(data);
//       }
//     });
//   });
// }
// p('./data/a.txt')
//   .then(function(data){
//     console.log(data);
//     return p('./data/b.txt');
//   }).then(function(data){
//     console.log(data);
//     return p('./data/c.txt');
//   }).then(function(data){
//     console.log(data);
//   })
mongoose 所有API都支持 Promise
// 用户注册 查询用户名是否存在 不存在 添加 （这里不做错误处理）
User.find({ //find方法 内部就返回一个Promise对象 
  username: 'ly',
  password:123456
}).then(function (data) { //接收成功的 resolve(data) data参数
  if(data[0]){
    return console.log('已存在');
  }
  //用户不存在
  new User({
    username: 'ly',
    password:123456
  }).save(); //save 内部就返回一个Promise对象 
}).then(function (data) { //接收成功的 resolve(data) data参数
  console.log('OK2');
})

中间件
// var express = require('express');
// var app = express();
// //  /  /index  /login  请求等
// app.use(function (req,res,next) { //任何请求都 会进入这个中间件
// 	next();  //调用next方法 会继续向后面匹配  不调用 终止匹配
// })
// app.use('/a',function (req,res,next) { //以/a开头的 会进入这个中间件
// 	next();  //调用next方法 会继续向后面匹配  不调用 终止匹配
// })
// app.get('/b',function (req,res,next) { //严格匹配 必须是 /b 请求 才会进入这个中间件
// 	next();  //调用next方法 会继续向后面匹配  不调用 终止匹配
// })
// app.post('/b',function (req,res,next) { //严格匹配 必须是 /b 请求 才会进入这个中间件
// 	next();  //调用next方法 会继续向后面匹配  不调用 终止匹配
// })
//如果 到最后都没能找到 默认在页面输出 “ Cannot GET 路径 ”
中间件 对全局 错误的处理
// app.get('/',function (req,res,next) {
// 	fs.readFile('./login.html','utf8',function (err,data) {
// 		if(err){
// 			next(err); //当调用next的时候 传递了参数  则直接往后找到带有 四个参数的应用程序级别中间件 做全局处理
// 		}
// 	})
// })
// app.use(function (err,req,res,next) { //四个参数的应用程序级别中间件 做全局处理
// 	res.status(500).send('错误');
// })
应用
// app.use(function (req,res,next) { //配置一个处理 404 的中间件
// 	res.render('404.html');
// })
// app.use(function (err,req,res,next) { //配置一个全局错误处理中间件
// 	res.status(500).json({
// 		err_code:500,
// 		message:'错误'
// 	});
// })

接口设计规范：RESTful
域名 
// 应该尽量将API部署在专用域名之下 如：https://api.example.com
// 如果确定API很简单，不会有进一步扩展，可以考虑放在主域名下 如：https://example.org/api/
版本
// API 经常涉及到大的更新及变动，所以尽量对 API 进行版本划分，这里可以直接将版本号放入 URL 中 如：https://api.example.com/v1/
// 另一种做法是，将版本号放在HTTP头信息中，但不如放入URL方便和直观（Github采用这种做法）
路径
// 在RESTful架构中，每个网址代表一种资源（resource），所以网址中不能有动词，只能有名词，而且所用的名词往往与数据库的表格名对应。
// 一般来说，数据库中的表都是同种记录的"集合"（collection），所以API中的名词也应该使用复数。
// 例：有一个API提供动物园（zoo）的信息，还包括各种动物和雇员的信息，则它的路径应该设计成下面这样。
// https://api.example.com/v1/zoos
// https://api.example.com/v1/animals
// https://api.example.com/v1/employees
HTTP 动词
// - GET（SELECT）：从服务器获取资源（一项或多项）。
// - POST（CREATE）：向服务器添加一个资源。
// - PUT（UPDATE）：在服务器替换资源（客户端提供改变后的完整资源）。
// - PATCH（UPDATE）：在服务器修改资源（客户端提供改变的属性）。
// - DELETE（DELETE）：从服务器删除资源。
例：
// GET /zoos：获取所有动物园
// POST /zoos：新增一个动物园
// GET /zoos/ID：获取某个指定动物园的信息
// PUT /zoos/ID：替换某个指定动物园的信息（提供该动物园的全部信息）
// PATCH /zoos/ID：修改某个指定动物园的信息（提供该动物园的部分信息）
// DELETE /zoos/ID：删除某个动物园
// GET /zoos/ID/animals：获取某个指定动物园的所有动物
// DELETE /zoos/ID/animals/ID：删除某个指定动物园的指定动物
过滤信息 （分页等）
// 如果记录数量很多，服务器不可能都将它们返回给用户。API应该提供参数，过滤返回结果
// ?limit=10：指定返回记录的数量
// ?offset=10：指定返回记录的开始位置
// ?page=2&per_page=100：指定第几页，以及每页的记录数
// ?sortby=name&order=asc：指定返回结果按照哪个属性排序，以及排序顺序
// ?animal_type_id=1：指定筛选条件
状态码
// 服务器向用户返回的状态码和提示信息，常见的有以下一些
// 200 OK - [GET]：服务器成功返回用户请求的数据，该操作是幂等的（Idempotent）。
// 201 CREATED - [POST/PUT/PATCH]：用户新建或修改数据成功。
// 202 Accepted - [*]：表示一个请求已经进入后台排队（异步任务）
// 204 NO CONTENT - [DELETE]：用户删除数据成功。
// 400 INVALID REQUEST - [POST/PUT/PATCH]：用户发出的请求有错误，服务器没有进行新建或修改数据的操作，该操作是幂等的。
// 401 Unauthorized - [*]：表示用户没有权限（令牌、用户名、密码错误）。
// 403 Forbidden - [*] 表示用户得到授权（与401错误相对），但是访问是被禁止的。
// 404 NOT FOUND - [*]：用户发出的请求针对的是不存在的记录，服务器没有进行操作，该操作是幂等的。
// 406 Not Acceptable - [GET]：用户请求的格式不可得（比如用户请求JSON格式，但是只有XML格式）。
// 410 Gone -[GET]：用户请求的资源被永久删除，且不会再得到的。
// 422 Unprocesable entity - [POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误。
// 500 INTERNAL SERVER ERROR - [*]：服务器发生错误，用户将无法判断发出的请求是否成功。
错误处理
// 如果状态码是4xx，就应该向用户返回出错信息。一般来说，返回的信息中将error作为键名，出错信息作为键值即可。
// {	
//     error: "Invalid API key"
// }
返回结果
// 服务器返回结果都使用 JSON 格式数据
// 针对不同操作，服务器向用户返回的结果应该符合以下规范。
// GET /collection：返回资源对象的列表（数组）
// GET /collection/resource：返回单个资源对象
// POST /collection：返回新生成的资源对象
// PUT /collection/resource：返回完整的资源对象
// PATCH /collection/resource：返回完整的资源对象
// DELETE /collection/resource：返回一个空文档

try{ // try catch E5就有了 用来捕获 try中出错的信息
	// 浏览器中 也多用来捕获 500 400 状态码
	// 一旦出错try中的后续代码不会执行  整体代码不会中断
} catch (err) {
	// 出错才会进入
} finally {
	// 无论出不出错都会进入
}
