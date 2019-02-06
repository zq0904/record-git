module.exports = {
  "root": true, // ESLint将停止查找父文件夹
  "parser": "babel-eslint", // 指定解析器 默认使用esprima npm i -D babel-eslint
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true
  },
  "extends": "eslint:recommended", // 已经继承了一些默认规则
  "parserOptions": {
    "ecmaFeatures": { "jsx": true },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": ["react"],
  "rules": {
    "indent": ["error", "tab"],
    "linebreak-style": ["error", "windows"],
    "quotes": ["error", "single"],
    "semi": ["error", "never"]
  }
}
// pre-commit  git的一个hook 必须保证先有.git 在去安装pre-commit包
// 安装 npm i -D pre-commit 配置package.json 字段"pre-commit": ["eslint"] 每次git commit时会先执行一段命令通过在提交