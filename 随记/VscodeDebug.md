## 如何调试
```
  调试(shift+command+d) -> 设置按钮选择Node.js (会在项目根目录下生成.vscode>launch.json文件)
```
## launch.json常见内容
```
  {
    // 使用 IntelliSense 了解相关属性。 
    // 悬停以查看现有属性的描述。
    // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
    // 使用集成终端 自动添加Node调试器（很灵活）
    // 1.Preferences > Settings > Node: Auto Attach 设置为 on // 当在集成终端以调试模式启动时自动附加 Node调试器
    // 2.设置断点
    // 3.在集成终端以调试模式启动
    // node --inspect-brk=1234 1.js
    // node --inspect-brk=1234 server.js
    // node --inspect-brk=1234 node_modules/.bin/webpack
    "version": "0.2.0",
    "configurations": [
      {
        "name": "launch 运行node文件",
        "type": "node",
        "request": "launch",
        "program": "${workspaceFolder}/1.js",
        "cwd": "${workspaceFolder}",
        "stopOnEntry": true, // 启动调试后会，会自动将断点停在代码的第一行
      },
      { // package.json 提供如 "debug": "node --inspect-brk=1234 1.js",
        "name": "launch 运行npm命令",
        "type": "node",
        "request": "launch",
        "runtimeExecutable": "npm",
        "runtimeArgs": ["run", "debug"],
        "port": 1234, // 调试端口 必须与 --inspect-brk=1234 一致
      }, { // 对于一个已经启用检查的server node --inspect-brk=1234 server.js
        "name": "attach 附加",
        "type": "node",
        "request": "attach",
        "port": 1234,
      }
    ]
  }
```