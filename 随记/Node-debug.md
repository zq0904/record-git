## Node debug

### 常规操作
- 调试服务脚本
  1. node --inspect app.js 启动服务 命令行 Debugger listening on 在某个端口Ip上
  2. Open dedicated DevTools for Node.js（2种方式 访问服务地址 -> Chrome DevTools -> 选择左上角选择 | 访问chrome://inspect 选择）
  3. 选择 DevTools-Node.js 的connection面板  添加 Debugger的端口Ip  Sources面板选中文件打断点即可调试
- 非服务脚本
  1. node --inspect-brk=9229 app.js // 指定在第一行就设置断点
- 对于已经运行的进程（node app.js） 如何调试 [参考](https://stackoverflow.com/questions/13052548/node-js-how-to-attach-to-a-running-process-and-to-debug-the-server-with-a-conso)
  1. ps ax | grep app.js // 查看运行的进程号
  2. kill -s SIGUSR1 <pid>

- 使用VSCode调试 直接借助package.json scripts上debug 和文件断点