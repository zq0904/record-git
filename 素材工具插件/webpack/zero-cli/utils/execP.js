const execa = require('execa') // execa优点 1.包装了 child_process 2.支持promise 3.从输出中删除最终换行符

module.exports = (command, options = {}) => execa.command(command, {
  // cwd: process.cwd(), // 指定子进程的当前工作目录 默认 process.cwd()
  stdout: 'inherit', // inherit 运行命令的输出直接打印在控制台 默认是pipe 不直接在控制台输出
  ...options
})
