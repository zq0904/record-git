# 记录问题相关
## .bin目录作用
```code
  package.json中指定bin字段 当使用者install这个包的时候 会根据该字段 在.bin目录下生成软连接 script字段执行时会向path添加.bin中的环境变量 命令可直接使用
  "bin": {
    "fet-service": "./bin/index.js"
  },
```
## minimist 很轻量的参数解析库
```code
  const minimist = require('minimist')
  // npx fet-service one --a=1 --b 2 -c 3 -d=4 two
  // console.log(process.argv.slice(2)) // [ 'one', '--a=1', '--b', '2', '-c', '3', '-d=4', 'two' ] 参数格式凌乱
  // minimist(process.argv.slice(2)) // { _: [ 'one', 'two' ], a: 1, b: 2, c: 3, d: 4 } 不管是 --a=1 --b 2 -c 3 -d=4 都能统一参数
```
## process.cwd() package.json路面命令执行目录
## 执行的是.bin目录中的 软连接 __dirname拿到的是原文件的__dirname
// console.log('__dirname', __dirname) // /Users/zhaozhaoqi/zhaoqi/fe/fe-h2-pc/v5/node_modules/@fet/fe-reactcli-webpack-tools/bin
## execa 2.0.0+版本
```code
  execa优点 1.包装了 child_process 2.支持promise 3.从输出中删除最终换行符
  const execa = require('execa')
  console.log(process.cwd())
  execa.command('npm -v', {
    // cwd: process.cwd(), // 指定子进程的当前工作目录 默认 process.cwd()
    // stdout: 'inherit', // 输出选项 运行完命令直接打印在控制台 默认是pipe
  }).then(res => console.log(res)) // 异步的
  console.log(1)
```