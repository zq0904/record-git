// 实现不同环境读取不同的配置文件
const defaultConfig = './config/config-default.js';
const overrideConfig = './config/config-override.js'; // 部署到服务器时，由运维团队配置好config-override.js
const testConfig = './config/config-test.js';
const fs = require('fs');
var config = null;
if (process.env.NODE_ENV === 'test') { // 测试环境配置
    config = require(testConfig);
} else {
    config = require(defaultConfig); // 非测试环境 直接取默认配置 也就是开发配置
    try {
        if (fs.statSync(overrideConfig).isFile()) { // 如果生产环境配置文件存在则覆盖 这个 .js不能省略
            config = Object.assign(config, require(overrideConfig));
        }
    } catch (err) {
        console.log(`未能加载 ${overrideConfig}`);
    }
}

module.exports = config;