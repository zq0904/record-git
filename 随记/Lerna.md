# Lerna（依赖于git npm）[参考](https://sosout.github.io/2018/07/21/lerna-repo.html) 
## Lerna解决的问题 优点
  1. 优化 git + npm 发包流程 发布的测试包或正式包 都必须是远端最新（其实我更希望 测试包随便发 正式包只能是master最新）
  2. 包之间的严重依赖的测试问题 通过lerna bootstrap|add 都会使用”软连接“的形式（比npm link强一点）
  3. lerna add 发布时版本号统一变更
  4. 根据git 的提交记录 自动生成CHANGELOG
## 安装
```
  npm i -D lerna // 本地安装lerna
```
## 初始化
```
  npx lerna init // 初始化lerna（会生成 lerna.json package.json packages/）默认使用固定模式 所有包共用一个版本号
  npx lerna init --independent // 使用独立模式 每个包都使用自己的版本号
  // 固定模式 lerna是把工程当作一个整体来对待 每次发布packges 都是全量发布（无论是否修改）
  // 独立模式 lerna会配合git 检查文件变动 只发布有改动的packge
```
## lerna.json配置
```
  {
    "version": "0.0.0", // 固定模式为所有包的版本号 独立模式为independent
    "packages": ["packages/*"], // 包所在的目录
    "npmClient": "npm", // 指定命令使用的client 默认是npm 可以设置成yarn
    "command": {
      "publish": {
        "message": "chore: publish" // publish由于修改版本号所提交的commit信息
      },
      "bootstrap": {
        "hoist": true, // 安装的公共资源直接在根目录安装（如果你之后还会在根目录下安装的其他包会”冲掉“公共资源 所以你应该在根目录安装完包后执行npx lerna bootstrap）
        "ignore": "zero-*" // 指定不受 bootstrap 命令影响的包
      }
    }
  }
```
## 常用命令
```
  npx lerna bootstrap // 为所有项目安装依赖（如果某个包依赖packages下的包会直接使用”软连接“的形式）
  npx lerna list -l // 显示各个包的版本信息等
  npx lerna clean // 删除所有包的node_modules
  npx lerna updated // 当包的变更提交到本地后 执行该命令可以检测有那些包有变更
  npx lerna diff // 查看包的变更详细
  npx lerna create // 会以询问式的方式在packages下新建目录包 一般是完全新建一个包才使用这种方式
```
## 添加依赖
```
  npx lerna add lodash // 将lodash安装到所有包中
  npx lerna add lodash@2 --scope zero-test -D // 将lodash@2 安装到 zero-test包的devDependencies中
  npx lerna add zero-test --scope company-test // 如果添加的包是packages下的包lerna会很智能的使用”软连接“（而且这个包的版本也会随着lerna publish 的发布而一同变更）
  // 注意 不应该在单独的包中 使用npm去添加更新包 因为会冲掉”软连接“（和npm link的问题一样）应该一直使用 npx lerna add 去添加或更新包
```
## 发布
```
  // 必须将包的变更提交到本地后 才可以发布更新包（基于git）lerna会很智能的识别出packages下那些包发生了变更
  npx lerna publish // 用于发布包更新
  1. 在发布包前会 检测本地是否为最新 如果本地不是最新的会提示git pull（不管发布的是测试包 还是正式包 都要求最新的代码）
  2. 以独立模式为例 会提示选择每个包的发版号
  Select a new version for zero-test (currently 1.0.1-beta.0)
    Patch (1.0.1)
    Minor (1.1.0)
    Major (2.0.0)
    Prepatch (1.0.2-beta.0)
    Preminor (1.1.0-beta.0)
    Premajor (2.0.0-beta.0)
    Custom Prerelease // 可以输入一个预映标识如 alpha beta rc（直接回车 默认使用 根据当前的版本号中的预映标识的1.0.1-beta.1）
    Custom Version
  3. 为新版本创建一个新的git提交和标签 并push到远程
  4. 发布更新的包到npm

  lerna publish --skip-git // 不会创建git commit或tag
  lerna publish --skip-npm // 不会把包publish到npm上
```
## 为某个包执行命令
```
  npx lerna exec -- <command> // 在所有包中运行该命令
  npx lerna exec -- npm uni lodash // 所有包都删除lodash
  npx lerna exec --scope zero-test 'npm i lodash -D' // 只在zero-test包中 执行命令
  npx lerna run <script> // 执行包中的一些脚本
  npx lerna run --scope zero-test build // 只在zero-test包中 执行build脚本
```
## 关于根据commit msg 自动生成 CHANGELOG 的问题
```
  // 一但设置--conventional-commits参数 就不会以询问的方式来确定发布版本号 这简直太不方便了！！！
  lerna version --conventional-commits
```
## 最佳实践（待完善）
```
  1. commiticen [参考](https://github.com/commitizen/cz-cli)
  commitizen 它提供了一种问询式的方式去获取所需的commit提交信息 提供命令 git-cz
  npm i -D commitizen
  npx commitizen init cz-conventional-changelog -D --save-exact // 安装cz-conventional-changelog适配器npm模块 将其保存到package.json的依赖项或devDependencies 将config.commitizen.path密钥添加到package.json的根目录
  // 在package.json添加scripts字段（将代码提交到暂存区后 就可以直接使用 npm run commit）
  "scripts": {
    "commit": "git-cz"
  }
  // type类型有
  feat:        新功能
  fix:         修复故障
  improvement: 对当前特性的改进
  docs:        只改变文档
  style:       不影响代码含义的更改(空格、格式、缺少分号等)
  refactor:    既不修复bug也不添加特性的代码更改
  perf:        改进性能的代码更改
  test:        添加缺失的测试或修改现有的测试
  build:       影响构建系统或外部依赖项的更改(例如作用域:gulp、broccoli、npm)
  chore:       不修改src或测试文件的其他更改
  revert:      返回先前的提交
  2. commitlint 负责commit的校验 husky设定git hook校验时机 [参考](https://commitlint.js.org/#/guides-local-setup?id=install-commitlint)
  npm install -D @commitlint/{cli,config-conventional} husky
  // 在package.json添加
  "commitlint": {
    "extends": ["@commitlint/config-conventional"] // 使用相应规则
  },
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
```