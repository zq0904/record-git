'use strict'
const fs = require('fs'),
    http = require('http'),
    url = require('url'),
    path = require('path');
const template = require('art-template');
const root = path.resolve(process.argv[2] || '.');
http.createServer(function (request, response) {
    const pathname = decodeURIComponent(url.parse(request.url).pathname); // 兼容中文decodeURIComponent解码url
    const filePath = path.join(root, pathname);
    fs.stat(filePath, function (error, stat) {
        if (!error) {
            if (stat.isFile()) {
                response.writeHead(200);
                fs.createReadStream(filePath).pipe(response);
            } else if (stat.isDirectory()) { // 是目录
                fs.readdir(filePath, function (error, files) {
                    if (error) {
                        response.writeHead(404);
                        response.end('404');
                    } else {
                        // 数组组装 isfile:[]
                        let href = new Array();
                        let isFile = new Array();
                        let size = new Array();
                        let mtime = new Array();
                        // console.log(files)
                        let boolean = false;
                        files.forEach(function (e, i) {
                            // 做检索
                            ['index.html', 'default.html'].forEach(function (item) {
                                if (e === item) {
                                    boolean = true;
                                    response.setHeader('Content-Type', 'text/html;utf-8');
                                    response.writeHead(200);
                                    fs.createReadStream(path.join(filePath, item)).pipe(response);
                                }
                            });
                            // 判断files里面每一项是file还是dir
                            // console.log(path.join(filePath, e)) // 单纯的拼接(filePath + e)是不行的 filePath是根目录的时候 也就是 pathname为 '/' filePath的后面才拼接了/ 其余的都是没有拼接/的 如 .../resource
                            fs.stat(path.join(filePath, e), function (error, stat) {
                                isFile.push(stat.isFile());
                                size.push(fileSizeConver(stat.size));
                                mtime.push(stat.mtime.format('yyyy-MM-dd Ahh:mm:ss')); // 2017/11/2 上午10:32:47
                            })
                            href.push(path.join(pathname, e));
                        });
                        if (!boolean) {// 没有匹配 显示目录
                            // console.log(1, pathname, files)
                            fs.readFile('./tpl.html', function (error, data) {
                                if (error) {
                                    response.writeHead(404);
                                    response.end('404'); 
                                } else {
                                    response.writeHead(200);
                                    let html = template.render(data.toString(), {
                                        filePath, // 文件路径
                                        files,  // 目录下文件
                                        href,   // a链接地址
                                        isFile, // 是否是文件
                                        size,   // 文件大小
                                        mtime  // 修改时间
                                    });
                                    response.end(html);
                                }
                            })
                        }
                    }
                })
            } else { //  '/asda/a'
                response.writeHead(404);
                response.end('404');
            }
        } else {
            response.writeHead(404);
            response.end('404');
        }
    })
}).listen(3000, function () {
    console.log('启动成功')
});
// 方法 写后面就行 只有浏览器访问了才去渲染 此时是能拿到format的
// 日期格式化 
Date.prototype.format = function (p) { // new Date('时间戳').format('yyyy-MM-dd hh:mm:ss');
    var f = {
        "y+": this.getFullYear(), // + 代表正则中的至少出现一次
        "M+": this.getMonth() + 1,
        "d+": this.getDate(), // 1-31
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "S": this.getMilliseconds(),
        "H": (this.getHours() % 12), // 12小时制
        "A": (this.getHours() / 12) <= 1 ? "上午" : "下午" // 是上午还是下午
    };
    var format = p;
    for (var key in f) {
        var reg = new RegExp("(" + key + ")"); // + 贪婪模式
        if (reg.test(format)) {
            var zero = ""; // 重置 转字符串
            for (var i = 0; i < RegExp.$1.length; i++) { // hhh  000
                zero += 0;
            }
            var replace = RegExp.$1.length == 1 ? f[key] : (zero + f[key]).substr((("" + f[key]).length)); // 模板一位简写模式 模板非一前补0 '0002'.substr(1) 002
            format = format.replace(RegExp.$1, replace);
        }
    }
    return format;
};
// 文件大小转化B KB MB GB
function fileSizeConver(number) {
    var number = Number(number);
    var size = "";
    if (number < 0.1 * 1024) { // 小于0.1KB转化成B  
        size = number.toFixed(2) + "B";
    } else if (number < 0.1 * 1024 * 1024) { // 小于0.1MB转化成KB  
        size = (number / 1024).toFixed(2) + "KB";
    } else if (number < 0.1 * 1024 * 1024 * 1024) { // 小于0.1GB转化成MB  
        size = (number / (1024 * 1024)).toFixed(2) + "MB";
    } else { //其他转化成GB  
        size = (number / (1024 * 1024 * 1024)).toFixed(2) + "GB";
    }
    return size.replace(/[.]00/, '');
} 
