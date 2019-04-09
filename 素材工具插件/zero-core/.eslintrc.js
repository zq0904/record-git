module.exports = {
  "root": true, // ESLint将停止查找父文件夹
  "parser": "babel-eslint", // 指定解析器 默认使用esprima npm i -D babel-eslint
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true
  },
  'extends': 'standard', // 标准风格 npm install --save-dev eslint-config-standard eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'rules': {
    "no-return-assign": 0 // return 赋值语句
  }
}
