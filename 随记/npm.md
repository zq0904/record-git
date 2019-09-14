# npm [官网](https://www.npmjs.com) [参考](http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)
## 执行脚本
```code
  {
    "script": {
      "start": "", // start test 可以省略run
      "test": "", // npm run 是 npm run-script 的缩写 执行该命令会 临时将node_modules/.bin加入PATH变量 避免全局安装npm模块(意味着npm run脚本 可以直接执行本地node_modules包)
      "lint": "eslint **/*.js", // **表任意一层子目录 *表任意文件名
      "dev": "npm test && npm start", // &&继发 &并发 |管道符(前一个输出是后一个输入)
      "prebuild": "", // pre - 钩子
      "build": "", // 当执行 npm run build 相当于 npm run prebuild && npm run build && npm run postbuild
      "postbuild": "" // post - 钩子
      "open": "opener http://localhost:3004" // 打开浏览器
    }
  }
  // npm 有一些内置钩子如 prepublish 等 (prepublish钩子 在 npm publish 和 npm install 都会运行)(npm4 引入了一个新的钩子 prepare 等同于 prepublish)(npm5 prepublish 将只在 npm publish 命令之前运行)
  // process.env.npm_package_name (通过npm_package_前缀 npm 脚本可以拿到package.json里面的字段)
```
## 安装 移除包
```code
  npm i // 根据package.json的dependencies和devDependencies安装依赖
  npm i jquery@1 // 下载指定版本的包用@符跟版本号 如@liepin/im@1.2.9-beta
  npm i jquery@latest // lastest表最新的稳定版
  npm i jquery@beta // beta版本
  npm i -S jqeruy@1 // 安装到生成环境依赖dependencies
  npm i -D jqeruy@1 // 安装到开发环境依赖devDependencies
  npm i --no-save jqeruy@1 // 安装相应的包 不保存到依赖
  npm i --production // 只安装dependencies
  npm uni jqeruy@1 // 移除包 同时移除package.json安装依赖
```
## 发布 删除包
```code
  // 需注册npm账号
  npm adduser // 第一次发布包 输入注册的 账号 密码 邮箱
  npm login // 非第一次发布包 输入注册的 账号 密码 邮箱
  npm publish // 在要发布的包的根目录执行 默认发布正式版本
  npm publish --tag beta // 发布测试版本
  // 常见问题
  // You do not have permission to publish "qixiaoqi". Are you logged in as the correct user? : qixiaoqi (发布包 网上已经发布的包的名字重复)
  // package.json遵循 严格的json格式 不能有注释 必须双引号 最后一个属性后不能多加一个,号
  {
    "name": "qixiaoqi", // npm对包名的限制 不能有大写字母 空格 下滑线 不能和网上已存在的包重名
    "version": "1.0.0", // 每次发布新包都需更新版本号
    "description": "", // 描述信息
    "main": "index.js", // 对外使用的文件出口 比如require('包名')默认加载的就是这个文件
    "scripts": {},
    "deprecated": "This package is no longer maintained", // 弃用描述
    "dependencies": { // 该包所依赖的包 安装这个包时会自动安装包所对应的依赖
      "jquery": "^1.12.4"
    },
    "author": { // 作者信息
      "name": "qixiaoqi"
    }
  }
  npm unpublish <package_name> // 删除包 遇权限方面的错误 加 --force （只有发布没超过24小时的包才能删除, 其他的一律使用弃用操作）
  npm deprecate <package_name>@"< 1.2.0" 'This package is no longer maintained' // 弃用某个包给与友好的提示(会在安装这个包的版本小于1.2.0给予提示)
  "version": "x.y.z" // 版本控制 z bug级别小改动 y 新特性方法仍兼容 x 大版本不兼容
```
``` 本地开发cli包 调试
  npm link // 添加全局链接符号 (1.会将该目录 ”软连接“ 到全局node_modules包下 2.根据目录package.json的bin字段 向全局bin增加相关指令 ”软连接“ 到全局node_modules包下)
  /usr/local/bin/zero-cli -> /usr/local/lib/node_modules/zero-cli/bin/index.js
  /usr/local/lib/node_modules/zero-cli -> .../zero-cli
  npm unlink // 删除全局链接符号
  npm link <package_name> // 引用全局链接符号 (1.在本地node_modules 创建”软连接“目录 到全局node_modules包下 2.根据package.json的bin字段 向本地node_modules/.bin添加命令)
  .../fe-z-pc.v1/node_modules/zero-cli -> /usr/local/lib/node_modules/zero-cli -> .../zero-cli
  npm unlink <package_name> // 删除引用全局链接符号
```
## 其他命令
```code
  npm help // npm命令列表
  npm <command> -h // 查看某个命令的帮助
  npm -l // 每个命令的简单用法
  npm -v // npm版本
  npm config ls -l // 配置信息
  npm init -y // 生成默认的配置文件(文件夹名称不能有中文) -f(--force)
  npm search <package_name> // 在发布包前 检测这个包名是否已经存在
  npm info <package_name> // 显示包的信息 维护者等
  npm view <package_name> versions // 显示包的所有版本 ['1.2.7', '1.2.8']
  npm view <package_name> version // 显示包的最新版本 1.2.8
  npm ls <package_name> // 查看本地包的版本 显示的是node_modules里的版本
  npm ls <package_name> -g // 查看全局安装包的版本
  npm owner ls <package_name> // 查看包的维护者
  npm owner add <user> <package_name> // 添加包的维护者
  npm owner rm <user> <package_name> // 删除包的维护者
  npm update <package_name> // 更新某个包
  npm config list // 查看配置信息
  npm get <key> // 查看全局模式key的值
  npm set <key> <val> // 设置环境变量
  npm outdated <package_name> // 检查包是否过时会以列表形式展现
```
## npx
```code
  // npm5.20版本后引入npx命令
  解决的问题：
  1.使用本地项目安装的可执行工具包 不需要在package.json配置scripts字段
  npx webpack-cli -v // 查看本地项目安装的webpack-cli 版本
  2.执行一次性命令
  npx create-react-app my-app // 临时安装可执行依赖包 不用全局安装 不用担心长期的污染
  3.指定node版本 执行代码
  npx -p node@<version> node -v 可以使用指定版本的node运行命令
```
## [参考文章](http://javascript.ruanyifeng.com/nodejs/npm.html#toc0)