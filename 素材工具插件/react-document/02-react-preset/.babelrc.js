// 使用babel7 去转换react项目支持 class 装饰器 属性
module.exports = {
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }], // 装饰器语法支持
    ["@babel/plugin-proposal-class-properties", { "loose": true }] // class属性支持
  ]
}