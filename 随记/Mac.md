# Mac
## 常见问题
  - 安装软件 提示来自身份不明的开发者
    cmd 下运行 sudo spctl --master-disable 输入密码 回车。 (会设置 安全隐藏的任何来源)
    系统偏好设置 -> 安全性和隐私 -> 锁头 -> 选择 未知来源打开
  - 提示软件已损坏 sudo xattr -d com.apple.quarantine /xxx/xxx.app （/xxx/xxx.app替换成app路径）
  - 查看隐藏文件 shift + command + .
  - 查看host nginx.conf文件位置 打开Finder Shift+Command+G 搜索 /etc/hosts /usr/local/etc/nginx/nginx.conf
  - 取消f1到fn的默认功能 使之可以设置快捷键 系统偏好设置 -> 键盘 -> 勾选 将F1、F2等键用作标准功能键
  - 终端操作 command+n新打开终端窗口 command+t新打开分页终端 command+w关闭当前分页终端
  - 重启电脑 nginx不会自动启动 需要执行 sudo nginx 来启动nginx
  - 不小心关闭浏览器 重新打开关闭的页面 shift+command+t
  - Safari浏览器模拟 IE浏览器 （在Safari浏览器 -> 偏好设置 -> 高级 -> 在菜单栏中显示开发菜单 -> 开发选项中的用户代理）
  - 开启三键拖拽功能 系统偏好设置 -> 辅助功能 -> 鼠标与触控板 -> 启用拖移（三指拖移）
  - 编写别名指令(清除缓存)(终端输入chrome 回车 清空缓存)
    cd ~
    touch .bash_profile
    open .bash_profile
    写入 alias chrome="sudo killall mDNSResponder"
    source .bash_profile
    chrome
    Password:
  - mac右键含终端 系统偏好设置 -> 键盘 -> 快捷键 -> 服务 -> 勾选新建位于文件夹位置的终端窗口和标签页 （每次 选中文件夹右键->服务->）
  - mac npm全局安装一些包 有时需要权限 在使用命令前加 sudo
  - npm config get prefix // 获取npm所在目录的路径 一般为/usr/local
  - sudo chown -R 账号名 npm所在目录的路径/{lib/node_modules,bin,share} // chown全称为change owner（改变所有者即赋予权限）-R表示对指定目录下所有子目录和文件采取同种操作
  - 检索node_modules包下内容 首次点击node_modules目录 按住fn 输入字母予以检索
  - 切换输入法 control + 空格
  - touchbar 音量和亮度调节消失 终端执行 killall ControlStrip

## 常用操作
```
  clear | control + l // 清屏
  man cd // 查阅某个命令的手册页（英文） 按q退出
  sudo nginx -s reload // 超级用户权限
  ping 127.0.0.1 // pingIP地址
  pwd // 显示当前工作目录
  ls -la // 列出目录下所有文件及目录(-l列表形式 -a所有)
  cd | cd ~ // 切换至root(用户)目录
  cd path // 切换至对应路径
  cd ../ // 上级目录
  cd - // 返回上一个访问的目录目录
```

## 文件操作
```
  touch 1.js // 创建文件
  rm *.d.ts // 删除所有.d.ts文件
  mv 1.html images/1.js // 移动文件 或 更改文件名
  cp 1.js foo/ // 将文件拷贝到目录下
  cp -r foo/ bar/ // 将当前目录foo/下的所有文件复制到新目录bar/下
  open 1.js   使用默认的编译器打开文件
  vi 1.js // 编辑文件 按esc shift+: 输入wq （保存退出）
  cat -n 1.js // 在终端下查看文件
  cat > 2.js << END // 创建2.js 并写入输入的内容 以END作为交互式输入终止符 如果2.js存在则会覆盖
  cat >> 2.js << END // 追加
```
## 目录操作
```
  mkdir dirname  // 新建目录
  mkdir -p 1/2/3 // 目录不存在 会递归创建目录
  rmdir dirname // 删除目录
  rm -rf dirname // 递归强制删除目录及目录下的文件
  open dirname // 打开目录
```
## 其他操作
```
  lsof -i tcp:3010 // 查看端口被那些程序占用
  kill PID // 杀掉PID对应的程序
  scp -r 本地文件路径 root@1.2.3.4:/root // 上传本地文件到远程/root目录下 目录需要加-r
  chmod 777 [filename|foldername] // 更改文件或文件夹权限 https://www.runoob.com/linux/linux-comm-chmod.html
  tar cvf target.tar source // 打包 .tar
  tar xvf target.tar // 解包
  zip -q -r -m target.zip source // 压缩 .zip -q不显示压缩进度 -r递归压缩 -m删除原文件
  unzip target.zip -d targetDir // 解压 到targetDir目录
  ln -s source target // 建立软链接 设置环境变量 -s标识软连接(不会占用磁盘空间)
  which  node // 查看当前要执行的命令 在PATH路径中第一个路径(可以看某个系统命令是否存在 以及执行的到底是哪一个位置的命令)
  whereis nginx.conf // 查看一个命令或者文件所在的路径(只能用于程序名的搜索，而且只搜索二进制文件（参数-b）、man说明文件（参数-m）和源代码文件（参数-s）)

  vim /lib/systemd/system/mongodb.service // 配置mongodb服务

  echo '文本' // 输出文本
  echo '文本' > 1.js // 将文本 输入到指定文件 如果文件存在则覆盖
  echo '文本' >> 1.js // 将文本 追加到指定文件
  type pwd // pwd is a shell builtin pwd是bash内置命令
  cd /Users\
  > /zhaozhaoqi // 跨行命令 转义命令执行键
  echo `ls -a` | echo $(ls -a) // `` $() 优先执行 然后把返回的内容作为echo命令的输入
```
