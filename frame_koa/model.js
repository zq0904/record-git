// 扫描models下所有 映射模型 并导入
const fs = require('fs');
const db = require('./db');
let files = fs.readdirSync(__dirname + '/models');
let js_files = files.filter((f) => { // 过滤出以js结尾的文件
    return f.endsWith('.js');
});
module.exports = {};
for (let f of js_files) {
    let filename = f.substring(0, f.length - 3);
    module.exports[filename] = require(__dirname + '/models/' + f);
}
module.exports.sync = () => {
    db.sync();
};