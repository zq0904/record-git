# Mac 操作 问题
- 常用操作
  1. clear 或 control+l 清屏
  2. man mkdir 查阅某个命令的手册页（英文） q退出
  3. sudo + 命令 超级用户权限
  4. ping 127.0.0.1 pingIP地址
- 目录操作
  1. pwd           显示当前工作目录
  2. cd（不加参数）  切换至root目录
     cd（文件路径）  切换至对应路径
     cd ..         上级目录
     cd -          返回上一个访问的目录目录
  3. ls -la        列出目录下所有文件及目录 （-l列表形式 -a所有）
  4. mkdir dirname 新建目录
  5. rmdir dirname 删除目录
  6. rm -rf dirname 递归强制删除目录及目录下的文件
  7. open （文件路径）打开目录
- 文件操作
  1. touch 1.js  创建文件
  2. vi 1.js     编辑文件  esc shift+: 输入wq （保存退出）
  3. open 1.js   使用默认的编译器打开文件
  4. cat -n 1.js 在终端下查看文件
  5. mv 1.html images/1.js 更改或移动文件
  5. rm 1.js      删除文件
  6. cp 1.js foo/ 将文件拷贝到目录下
     cp -r foo/ newFoo 将当前目录"foo/"下的所有文件复制到新目录"newfoo"下
- 常见问题
  1. mac安装软件 提示来自身份不明的开发者
  cmd 下运行 sudo spctl --master-disable 输入密码 回车。 会设置 安全隐藏的任何来源
  系统偏好设置 -> 安全性和隐私 -> 锁头 -> 选择 未知来源打开
  2. mac查看隐藏文件 shift + command + .
  3. mac 取消f1到fn的默认功能 使之可以设置快捷键 系统偏好设置 -> 键盘 -> 勾选 将F1、F2等键用作标准功能键
  4. mac host文件位置 打开Finder Shift+Command+G 搜索 /private/etc/hosts
  5. 在终端 command+n 新打开终端窗口 command+t 新打开分页终端 command+w 关闭当前分页终端
  6. 重启电脑 nginx不会自动启动 需要执行 sudo nginx 来启动nginx
  7. 一不小心关闭浏览器 从新打开 shift+command+t 从新打开关闭的页面
  8. mac Safari浏览器模拟 IE浏览器 （在Safari浏览器 -> 偏好设置 -> 高级 -> 在菜单栏中显示开发菜单 -> 开发选项中的用户代理）
  9. mac 三键拖拽功能 系统偏好设置 -> 辅助功能 -> 鼠标与触控板 -> 启用拖移（三指拖移）
  10. 清除缓存 （终端输入chrome 回车 清空缓存）
    cd ~
    touch .bash_profile
    open .bash_profile
    写入 alias chrome="sudo killall mDNSResponder"
    source .bash_profile
    chrome
    Password:
  11. mac右键含终端 系统偏好设置 -> 键盘 -> 快捷键 -> 服务 -> 勾选新建位于文件夹位置的终端窗口和标签页 （每次 选中文件夹右键->服务->）
  12. 解决 mac全局安装需要 使用 在 install 命令前使用 sudo
  npm config get prefix // 获取npm所在目录的路径 一般为/usr/local
  sudo chown -R 账号名 npm所在目录的路径/{lib/node_modules,bin,share} // chown全称为change owner（改变所有者即赋予权限） -R表示对指定目录下所有子目录和文件采取同种操作
