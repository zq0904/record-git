# Ubuntu 19.04
```
  // 链接远程服务器 mac终端直接 window使用Git Bash ssh root@45.32.7.41
  // 一段时间没有操作 ssh会自动断开链接
  exit // 手动断开链接
  // 阿里云Vultr等服务商 默认就是root超级管理员 命令不需要加sudo
  apt-get // Ubuntu自带的Linux包管理工具 16.04版本后引入apt 简单可理解为 apt = apt-get、apt-cache、apt-config 中最常用命令选项的集合
  uname -a // 查看系统版本等信息

  // 设置链接别名 ssh zero 等价于 ssh root@202.182.98.13 (Port 默认22 IdentityFile 私钥 都可以不设置)
  vim ~/.ssh/config
  Host      zero
  User      root
  HostName  202.182.98.13
  Port      22
  IdentityFile ~/.ssh/id_rsa
  :wq
  cat ~/.ssh/config | grep 'host' // 查看配置了那些服务器别名

  // 配置ssh 免密登录
  ssh-keygen -t rsa -C '154809748@qq.com' // 如果没有生成过密钥 本地生成一个 生成过直接使用
  ssh-copy-id root@202.182.98.13 // 将本地的id_rsa.pub公钥 拷贝到 远程服务器目录~/.ssh/authorized_keys(或者自己手动copy)
  cat ~/.ssh/authorized_keys // 在服务器查看
  chmod 777 ~/.ssh // 如果后续还是需要密码登录 可能由于权限问题 修改权限
  chmod 777 ~/.ssh/authorized_keys
```
## Git
```
  sudo apt-get install git // 安装
  git --version
  git config --global user.name 'zhaoqi' // 设置用户名
  git config --global user.email '154809748@qq.com' // 设置邮箱
  git config -l // 查看
  ssh-keygen -t rsa -b 4096 -C '154809748@qq.com' // 使用提供的电子邮件作为标签 创建一个新的ssh密钥
  vim ~/.ssh/id_rsa.pub // id_rsa私钥 id_rsa.pub公钥 复制公钥到SSH keys

  ssh: Could not resolve hostname github.com:... // git clone等操作报错(DNS解析问题) 先ping github.com 修改/etc/hosts 添加192.30.253.112 github.com
```
## Node Npm 直接下载 通过nvm下载
```
  // 直接安装 然后通过n来管理node版本
  sudo apt-get update // 更新ubuntu软件源
  sudo apt-get install nodejs // 安装nodejs
  sudo apt-get install npm // 安装npm
  npm install n -g // 全局安装n管理器 管理node版本 依赖于node
  n stable // 安装最新稳定版node
  n 8.5.0 // 安装指定版本
  node -v
  npm -v
  // 卸载
  sudo npm uninstall npm -g // 先卸载 npm
  sudo apt-get remove nodejs // 卸载nodejs

  // 通过nvm安装node 依赖Git
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash // 安装脚本 （如遇报错 You have $NVM_DIR set to "nvm", but that directory does not exist. Check your profile files and 退出终端重新连接）
  // 执行命令使其立即生效
  export NVM_DIR="${XDG_CONFIG_HOME/:-$HOME/.}nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
  nvm --version // 查看版本是否安装成功
  nvm ls-remote --lts // 查看远程可安装长期支持版
  nvm install v10.15.3 // 安装指定node版本 (如遇 prefix报错 执行 nvm use --delete-prefix v10.15.3)
  nvm alias default v10.15.3 // 设置在任何新shell中使用的默认node版本
  nvm ls // 已安装的版本
  nvm current // 当期选择的版本
  nvm use v10.15.3 // 使用相应的版本
  node -v
  npm -v
  // 卸载
  nvm uninstall 8.16.0 // 卸载已安装的node版本

  whereis npm
  ln -s /root/.nvm/versions/node/v10.15.3/bin/node /usr/bin/node
  ln -s /root/.nvm/versions/node/v10.15.3/bin/npm /usr/bin/npm
  ln -s /root/.nvm/versions/node/v10.15.3/bin/pm2 /usr/bin/pm2

```
## Nginx [参考](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04)
```
  // 相比老牌的Apache 高性能、并发处理能力要强
  sudo apt-get install nginx // 安装成功nginx会自动运行
  systemctl status nginx // 检测是否安装成功 一般有这种标识 active (running) 也可以直接访问 htpp://ip 会看到nginx默认页
  // 主要目录
  /var/www/html // 这个目录 相当于Apache的www目录 (如果要配置 nginx 的 root 最好都放置在 /var/目录下 /root/下会有问题 )
  /etc/nginx/nginx.conf // Nginx全局配置
  /etc/nginx/sites-available/ // nginx不会直接使用这个目录中的配置文件 除非它们链接到sites-enabled目录 (default 配置了默认目录 /var/www/html)
  /etc/nginx/sites-enabled/ // sites-enabled目录 nginx会直接使用这个目录中的配置文件
  /etc/nginx/snippets // 这个目录包含配置片段 可以包含在nginx配置的其他地方
  /var/log/nginx/access.log // 对web服务器的每个请求都记录在这个日志文件中 除非Nginx被配置为不这样做
  /var/log/nginx/error.log // 任何Nginx错误都将记录在这个日志中
  // 操作
  systemctl reload nginx // 如果只是简单的修改了nginx的配置文件 可以在不断开连接的情况下使之生效
  systemctl restart nginx // 重启 (nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use) 指80端口占用 sudo fuser -k 80/tcp 关闭占用80端口的程序)
  systemctl stop nginx // 停止
  systemctl disable nginx // 禁用开机自启(默认情况下 nginx 已经被配置为了开机自启)

  // 配置反向代理步骤 [参考](https://github.com/moonbingbing/openresty-best-practices/blob/master/ngx/reverse_proxy.md)
  在 /etc/nginx/sites-available 创建一个 web 文件并写入以下内容
  server {
    listen 80;
    server_name web1.zeroer.cc;

    location / {
      proxy_pass         http://127.0.0.1:3001; # 反向代理（这里主要是根据域名分发不同的本地接口）
      proxy_redirect     off;
      proxy_set_header   Host             $host; # 转发原始请求中的Host头部
      proxy_set_header   X-Real-IP        $remote_addr; # 真实ip 不可伪造
      proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for; # 代理转发ip叠加 拿不到与其直连的服务器ip 可伪造
    }
  }
  server {
    listen 80; # 监听端口
    server_name web2.zeroer.cc; # 监听域名
    index  index.html index.htm; # 设置默认页

    location / {
      proxy_pass         http://127.0.0.1:3002;
      proxy_redirect     off;
      proxy_set_header   Host             $host;
      proxy_set_header   X-Real-IP        $remote_addr;
      proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
    }
  }
  server {
    listen 80; # 监听端口
    server_name cms.zeroer.cc; # 监听域名
    root   /var/cms/; # 根目录 不能设置为/root 尽量设置到/var/下
    index  index.html index.htm; # 设置默认页
    # 静态资源
    location /public/ {
      proxy_pass http://127.0.0.1:3000/public/;
    }
    # 常规的接口转发
    location /proxy/ {
      rewrite '^/proxy/(.*)$' /$1 break;
      proxy_pass http://127.0.0.1:3000;
      # deny 127.1.1.0;  # 拒绝的ip
      # allow 127.1.1.1; # 允许的ip
    }
  }
  sudo ln -s /etc/nginx/sites-available/web /etc/nginx/sites-enabled/web // 将配置文件软链接到 sites-enabled 文件夹下
  sudo nginx -t // 检测是否有语法错误
  systemctl reload nginx // 重启生效
  curl -4 icanhazip.com // 查阅ip4的地址
```
## 守护进程 [参考](https://github.com/foreverjs/forever)
```
  // 服务端控制台一旦关闭就会导致服务关闭 我们需要一个守护进程 将Node服务运行在后台
  npm install -g forever // 安装
  forever start app.js // 启动
  forever list // 列出所有正在运行的脚本
  forever stop app.js // 停止 forever stop [id] 根据forever list查出来的id停止
  forever stopall // 停止所有
  forever restart app.js // 重启
  forever restartall // 重启所有
```
## MySQl 5.7 | 8.0 [参考](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-18-04)
```
  sudo apt-get install mysql-server // 安装完成会自动运行mysql 默认开机自动启动
  sudo mysql_secure_installation // 配置mysql 包括重置密码 远程登录等选项

  // 安装中遇报错 需要将mysql完全卸载 重新安装
  systemctl stop mysql // 如果mysql运行先停掉
  rm -rf /var/lib/mysql/ // 删除mysql的数据文件
  rm -rf /etc/mysql/ // 删除mysql的配置文件
  sudo apt-get autoremove mysql-server-* --purge
  sudo apt-get autoremove mysql* --purge
  sudo apt-get remove apparmor mysql-server mysql-common
  dpkg -l |grep ^rc|awk '{print $2}' |sudo xargs dpkg -P // 清理残留数据
  reboot // 一定要重启电脑
  sudo apt-get install mysql-server // 再次安装

  // mysql5.7 root 默认使用插件(auth_socket)进行身份验证 更改为使用密码
  use mysql;
  ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'new_password';
  FLUSH PRIVILEGES;

  systemctl status mysql.service // 查看状态
  systemctl start mysql // 启动
  systemctl stop mysql // 停止
  systemctl restart mysql // 重启
  sudo netstat -tap |grep mysql // 查看服务器端口

  // 安装 mysql8.0+版本 [参考](https://blog.csdn.net/iehadoop/article/details/82961311)
  // 如果之前安装了其他版本先卸载
  登录 https://dev.mysql.com/downloads/repo/apt/ 下载 mysql-apt-config_0.8.13-1_all.deb ()
  scp -r 本地文件路径 root@45.32.7.41:/root // 将mysql-apt-config_0.8.13-1_all.deb上传到服务器/root目录下
  sudo dpkg -i mysql-apt-config_0.8.13-1_all.deb // 执行 选择mysql-8.0 mysql-8.0 ok
  sudo apt update // 必须更新软件源
  sudo apt-get upgrade
  sudo apt install mysql-server // 正式安装 会提示设置初始密码 加密方式
  // 调整用户身份验证(随意)
  use mysql;
  ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'new_password';
  FLUSH PRIVILEGES;
```