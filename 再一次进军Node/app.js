// let fs = require('fs');
// 文件读取
// fs.readFile('./file.text', 'utf8', function (error, data) {
//     if (error) {
//         console.log('读取失败');
//         return false;
//     }
//     console.log(data);
// });
// 文件写入 覆盖
// fs.writeFile('./write.tetx', '写文件的内容1', function (error) {
//     if (error) {
//         console.log('写入失败');
//     } else {
//         console.log('写入成功');
//     }
// });
// 创建web服务器
// let http = require('http');
// let fs = require('fs');
// let server = http.createServer();
// server.on('request', function (request, response) {
//     let url = request.url;
//     // switch (url) {
//     //     case '/':
//     //         response.write('/');
//     //         break;
//     //     case '/a':
//     //         response.write('/a');
//     //         break;
//     //     default:
//     //         response.write('其他');
//     //         break;
//     // }
//     // if (url === '/') {
//     //     response.setHeader('Content-Type', 'text/plain; charset=utf-8');
//     //     response.end('普通文本');
//     // } else if (url === '/html') {
//     //     response.setHeader('Content-Type', 'text/html; charset=utf-8');
//     //     response.end('<p>为了能解决乱码 并且能识别HTML标签<a href="">点击</a></p>')
//     // }
//     if (url === '/html') {
//         fs.readFile('./resource/index.html',function (error, data) {    
//             if (error) {
//                 response.setHeader('Content-Type', 'text/plain ; charset=utf-8');
//                 response.end('读取失败');
//             } else {
//                 response.setHeader('Content-Type', 'text/html ; charset=utf-8');
//                 response.end(data); // end 支持2进制
//             }
//         })
//     } else if (url === '/image') {
//         fs.readFile('./resource/Aimer.png', function (error, data) {
//             if (error) {
//                 response.setHeader('Content-Type', 'text/plain ; charset=utf-8');
//                 response.end('读取失败');
//             } else {
//                 response.setHeader('Content-Type', 'image/png;');
//                 response.end(data); // end 支持2进制
//             }
//         })  
//     }
// });
// server.listen(3000,function () {
//     console.log(' 服务器开启成功');
// });
// 模拟Apache服务器 访问文件
// let fs = require('fs');
// let http = require('http');
// let server = http.createServer();
// server.on('request', function (request, response) {
//     let url = request.url;
//     let dir = 'C:/Users/dell/Desktop/再一次进军Node/resource'; // 设置默认的路径 \ 需转义 或者 替换为/
//     let file = '/index.html'; // 设置默认的文件
//     if (url != '/') {
//         file = url;
//     }
//     fs.readFile(dir + file, function (error, data) {
//         if (error) {
//             response.end('404');
//         } else {
//             response.end(data);
//         }
//     })
// });
// server.listen(3000, function () {
//     console.log('启动成功');
// });
// 模拟Apache服务器 目录结构 (不使用模板引擎的时候)
// let http = require('http');
// let fs = require('fs');
// let server = http.createServer();
// server.on('request', function (request, response) {
//     let dir = 'C:/Users/dell/Desktop/再一次进军Node';
//     fs.readdir(dir, function (error, files) { // 读取目录
//         if (error) {
//             return response.end('dir is undefinde');
//         }
//         str = '';
//         files.forEach(function (item, i) {
//             str += `
//                 <tr>
//                     <td data-value="apple/"><a class="icon dir" href="/D:/Movie/www/apple/">${item}/</a></td>
//                     <td class="detailsColumn" data-value="0"></td>
//                     <td class="detailsColumn" data-value="1509589967">2017/11/2 上午10:32:47</td>
//                 </tr>
//             `;
//         });
//         fs.readFile('./template.html', function (error, data) {
//             if (error) {
//                 return response.end('404');
//             }
//             response.end(data.toString().replace('^_^', str));
//         })
//     })
// });
// server.listen(3000, function () {
//     console.log('服务器启动成功');
// });
// 模拟Apache服务器 目录结构 (使用模板引擎)
// const fs = require('fs');
// const http = require('http');
// const template = require('art-template');
// http.createServer(function (request, response) {
//     const dir = 'C:/Users/Administrator/Desktop/再一次进军Node';
//     fs.readdir(dir, function (error, files) {
//         if (error) {
//             response.end('dir is no');
//         }
//         fs.readFile('./tpl.html', function (error, data) {
//             if (error) {
//                 response.end('404');
//             }
//             const html = template.render(data.toString(), {
//                 files
//             });
//             response.end(html);
//         })
//     })
// }).listen(3000, function () {
//     console.log('服务器启动成功 3000端口')
// });




// var fs = require('fs')
// var http = require('http')
// var template = require('art-template')
// http.createServer(function (request, response) {
//     var url = request.url
//     if (url === '/') {
//         fs.readFile('./index.html', function (error ,data) {
//             if (error) {
//                 return response.end('404')
//             }
//             response.end(data)
//         })
//     } else if (url.indexOf('/node_modules') === 0) {
//         console.log(url)
//         fs.readFile('.' + url, function (error, data) {
//             if (error) {
//                 return response.end('404')
//             }
//             response.end(data)
//         })
//     }
// }).listen(3000, function () {
//     console.log('服务器启动成功');
// })

// var module = {
//     a:{}
// }
// var a = module.a;
// a.q = 1;
// console.log(module)

// if (typeof(Window) === 'undefined') {
//     console.log('node.js')
// } else {
//     console.log('browser')
// }

// 'use strict'
// var fs = require('fs')
// fs.readFile('./resource/Aimer.png', function (error, data) {
//     if (error) {
//         console.log(error)
//     } else {
//         console.log(data.toString())
//     }
// })
// 'use strict'
// var str = '我是'
// console.log(str)
// console.log(Buffer.from(str, 'utf-8'))

// 同步加载 需要 try catch 来捕获错误
// 'use strict'
// try {
//     var fs = require('fs')
//     var data = fs.readFileSync('./tpl1.html', 'utf-8')
//     console.log(data)
// } catch (error) {
//     console.log(error)
// }
// 写文件
// 'use strict'
// const fs = require('fs')
// let content = '大家好 我给大家介绍一下。。。'
// fs.writeFile('./resource/666.text', content, function (error) {
//     if (error) {
//         console.log(error)
//     } else {
//         console.log('OK')
//     }
// })
// 同步写入
// 'use strict'
// const fs = require('fs')
// let data = '哦 可以啊 同步的'
// try {
//     fs.writeFileSync('./resource/777.text', data)
// } catch (error) {
//     console.log(error)
// }
// 获取文件大小，创建时间等信息
// 'use strict'
// var fs = require('fs')
// fs.stat('./add.js',function (error, stat) {
//     if (error) {
//         console.log(error)
//     } else {
//         console.log(stat)
//         console.log('是否是文件' + stat.isFile())
//         console.log('是否是目录' + stat.isDirectory())
//         if (stat.isFile()) {
//             console.log('文件大小' + stat.size);
//             console.log('创建时间, Date对象' + stat.birthtime.getDate());
//             console.log('修改时间, Date对象' + stat.mtime.getDate());
//         }
//     }
// })
// 同步获取文件大小，创建时间等信息
// 'use strict'
// var fs = require('fs')
// try {
//     var stat = fs.statSync('./resource/666.text')
//     console.log(stat.isFile())
//     console.log(stat.isDirectory())
//     if (stat.isFile()) {
//         console.log(stat.size)
//         console.log(stat.birthtime)
//         console.log(stat.mtime)
//     }
// } catch (error) {
//     console.log(error)
// }
// 必须使用异步代码 必须使用异步代码 必须使用异步代码 !!!

// 读取流
// 'use strict'
// const fs = require('fs')
// let rs = fs.createReadStream('./index.html', 'utf-8');
// rs.on('data', function (data) { // data事件可能会有多次，每次传递的data是流的一部分数据
//     console.log('data')
//     console.log(data)
// }).on('end',function () {
//     console.log('end')
// }).on('error', function (error) {
//     console.log(error)    
// })
// 写入流
// 'use strict'
// var fs = require('fs')
// var ws = fs.createWriteStream('./resource/999.text', 'utf-8')
// ws.write('呵呵哒')
// ws.write('o o o')
// ws.end('asd') // 无论是 write 还是 end 都是追加 如果 999.text 已经存在 会覆盖

// 所有可以读取的流都继承自 stream.Readable 所有可以写入的流都继承自 stream.Writeable

// 利用 pipe 实现一个文件的复制
// 'use strict'
// var fs = require('fs')
// var rs = fs.createReadStream('./app.js')
// var ws = fs.createWriteStream('./app1.js')
// rs.pipe(ws)

// http 实现的简单的服务器
// 'use strict'
// var http = require('http')
// http.createServer(function (request, response) {
//     var method = request.method
//     var url = request.url
//     console.log(method, url) // 输出请求类型 和 url
//     response.writeHead(200, {
//         'Content-Type': 'text/html; charset=utf-8' // 就是这种格式的 charset=utf-8 就是写在 Content-Type 中的
//     })
//     response.end('<p>我是标签</p>')
// }).listen(3000, function () {
//     console.log('启动成功')
// })

// 文件服务器
// 'use strict'
// var url = require('url')
// console.log(url.parse('http://user:pass@host.com:8080/path/to/file?query=string#hash'))

// 'use strict'
// var path = require('path')
// var nowDir = path.resolve('.') // 获取当前 路径
// console.log(nowDir)
// var filePath = path.join('nowDir', 'resource', '123.text') // 和join的方式很像 [参数].join('\')
// console.log(filePath) 

// 给我写100遍 必须的
// var fs = require('fs'),
//     http = require('http'),
//     url = require('url'),
//     path = require('path');
// var root = path.resolve(process.argv[2] || '.'); // 获取根目录 其实不就是动态的吗。。。
// http.createServer(function (request, response) {
//     // console.log(request.url===url.parse(request.url).pathname) // true node本来就处理了 非要用 url那也可以
//     var pathname = url.parse(request.url).pathname == '/' ? '/index.html' : url.parse(request.url).pathname;
//     console.log(pathname)
//     var filepath = path.join(root, pathname)
//     fs.stat(filepath, function (error, stat) {
//         if (!error && stat.isFile()) { // 没报错 且 是文件
//             response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
//             fs.createReadStream(filepath).pipe(response) // 将文件流 直接导向 response
//             // response 本身就是一个写流 wirte
//         } else {
//             response.writeHead(404)
//             response.end('404')
//         }
//     })
// }).listen(3000, function () {
//     console.log('启动成功')
// })

// crypto模块 提供 MD5 SHA1 加密
// const crypto = require('crypto');
// const hash = crypto.createHash('md5');
// // hash.update('a');
// // hash.update('b'); // 等同于下面的
// hash.update('ab');
// console.log(hash.digest('hex'));

// SHA1
// const crypto = require('crypto');
// const hash = crypto.createHash('SHA1');
// hash.update('ab');
// console.log(hash.digest('hex'));

// sha256 sha512 需要一个密钥
// const crypto = require('crypto');
// // const hmac = crypto.createHmac('sha256', 'key');
// const hmac = crypto.createHmac('sha512', 'key');
// hmac.update('ab');
// console.log(hmac.digest('hex'));

// AES 对称加密算法 加解密都用同一个密钥
// const crypto = require('crypto')
// function aesEncrypt(data, key) {
//     const cipher = crypto.createCipher('aes192', key);
//     var crypted = cipher.update(data, 'utf8', 'hex');
//     crypted += cipher.final('hex');
//     return crypted;
// }
// function aesDecrypt(encrypted, key) {
//     const decipher = crypto.createDecipher('aes192', key);
//     var decrypted = decipher.update(encrypted, 'hex', 'utf8');
//     decrypted += decipher.final('utf8');
//     return decrypted;
// }
// var data = 'ab';
// var key = 'key';
// var encrypted = aesEncrypt(data, key);
// console.log(encrypted);
// var decrypted = aesDecrypt(encrypted, key);
// console.log(decrypted)

// Express 基于ES5的语法 实现异步只能回调
// var express = require('express')
// var app = express();
// app.get('/', function (req, res) {
//     res.send('666呵呵')
// });
// app.listen(3000, function () {
//     console.log('成功 3000')
// })