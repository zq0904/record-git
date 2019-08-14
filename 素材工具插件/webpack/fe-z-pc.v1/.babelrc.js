module.exports = {
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }], // 装饰器语法支持
    ["@babel/plugin-proposal-class-properties", { "loose": true }], // class属性支持
    ["@babel/plugin-syntax-dynamic-import"] // import() 语法支持 code-splitting
  ]
}
