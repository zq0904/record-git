## 使用rollup构建 小型基础库
## 支持IE9及以上
## 实时eslint校验 编译 校验不通过不会编译
```
  npm run build
```
## 修复的问题
```
  cookie.set('a', 1, '2019-03-23') // 时间内置兼容safari
```
## 新增
```
  unicode 编码解码 // 用于插件的汉字编码
```
## 后续新增
```
  localStorage 实现cookie相同 功能 兼容无痕safari问题
```