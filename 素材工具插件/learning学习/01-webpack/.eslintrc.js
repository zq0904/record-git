module.exports = {
  "root": true, // ESLint将停止查找父文件夹
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true
  },
  "extends": [
    "eslint:recommended",  // 已经继承了一些默认规则
    "plugin:vue/recommended" // 这个也必须配置 否则会有一个错误提示(相邻的JSX元素必须包含在封闭的标记) 以获得更严格的规则
  ],
  "parserOptions": {
    "parser": "babel-eslint", // 指定解析器 默认使用esprima npm i -D babel-eslint
    "ecmaFeatures": { "jsx": true },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": ['vue'], // npm i -D eslint-plugin-vue
  "rules": {
    "indent": ["error", "tab"],
    "linebreak-style": [0],
    "quotes": ["error", "single"],
    "semi": ["error", "never"]
  }
}