// 统一处理静态文件 中间件
const path = require('path')
const mime = require('mime') // mime类型映射的综合库
const fs = require('mz/fs') // 将node.js现代化为当前的ECMAScript标准
// mz提供的API和Node.js的fs模块完全相同，但fs模块使用回调，而mz封装了fs对应的函数，并改为Promise。这样，我们就可以非常简单的用await调用mz的函数，而不需要任何回调。
// url: 类似 '/static/'
// dir: 类似 __dirname + '/static'
function staticFiles(url, dir) {
    return async (ctx, next) => {
        let rpath = ctx.path // /static/a.css
        if (rpath.startsWith(url)) {
            // 获取完整路径 __dirname + '/static' + a.css
            let fp = path.join(dir, rpath.substr(url.length));
            // 判断文件是否存在
            if (await fs.exists(fp)) {
                ctx.type = mime.getType(rpath) // 获取文件的mime类型 getType()
                ctx.body = await fs.readFile(fp) // 读取对应的文件 返回
            } else {
                ctx.status = 404
            }
        } else {
            await next(); // 不是指定的url 处理下一个中间件
        }
    }
}
module.exports = staticFiles;
