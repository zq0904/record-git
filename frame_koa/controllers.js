const fs = require('fs');
const router = require('koa-router')();
function addControllers(controllers_dir) {
    var files = fs.readdirSync(__dirname + '/' + controllers_dir); // 只加载一次没有问题
    var js_files = files.filter((f) => { // 过滤js文件
        return f.endsWith('.js')
    });
    for (var f of js_files) { // 循环js文件数组
        var mapping = require(__dirname + '/' + controllers_dir + '/' + f);
        addMapping(mapping)
    }
}
// 添加 映射
function addMapping(mapping) {
    for (var url in mapping) { // url module.exports导出的 字段
        if (url.startsWith('GET ')) { // 检索字段 是否以GET 开头
            var path = url.substr(4);
            router.get(path, mapping[url]);
        } else if (url.startsWith('POST ')) {
            var path = url.substr(5);
            router.post(path, mapping[url]);
        } else if (url.startsWith('PUT ')) {
            var path = url.substr(4);
            router.put(path, mapping[url]);
        } else if (url.startsWith('DELETE ')) {
            var path = url.substr(7);
            router.del(path, mapping[url]);
        } else {
            console.log(`无效的url: ${url}`);
        }
    }
}
module.exports = function (dir) {
    let controllers_dir = dir || 'controllers' // 如果不传参 扫描目录默认controllers
    addControllers(controllers_dir)
    return router.routes() // 返回的就是 直接 用于 app.use()中 这样 app.js中就不用再次引入router
}