## rollup ts 构建 库 [插件列表](https://github.com/rollup/awesome)
## 命令
```
  npm run dev // 开发模式 (使用browsersync 支持proxy中间件)
  npm run build // 构建 umd版本 esm版本 声明文件
  npm run build:js // 构建 umd版本 esm版本
  npm run build:types // 构建 声明文件
  npm run check:types // 类型检测 (eslint + vscode 配置好 可以完全忽略)
```
## 构建流程问题 [参考](https://github.com/Microsoft/TypeScript-Babel-Starter#readme)
```
  1.tsc 兼容低版本 编译会将async 编译为Promise版 transform-runtime 并不能保证所有的Promise都被编译
  2.ts在现阶段的作用 仅仅是类型检测 和 生成声明文件
  3.只使用babel处理所有ts文件 tsc只负责 生成声明文件 类型检测
```
## 注意问题
```
  兼容性 支持IE10及以上
  vue 自行扩展
```
## 新增
```
  unicode 编码解码 // 用于插件的汉字编码
  柯里化
  对 react组件 .tsx .less 支持
  uA 判断的完善 // 移动端未测试
  // 后续新增
  localStorage 1.实现cookie相同功能 2.兼容无痕safari问题
```
## 遗留问题
```
  订阅发布模式
  数组做差等

  单元测试 集成部署测试
  覆盖率

  tool工具抽取
```
