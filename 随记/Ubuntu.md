# Ubuntu
```
uname -a // 查看系统 Linux vultr.guest 5.0.0-13-generic #14-Ubuntu SMP Mon Apr 15 14:59:14 UTC 2019 x86_64 x86_64 x86_64 GNU/Linux
```
## 安装 node
```
sudo apt-get update // 更新ubuntu软件源
sudo apt-get install nodejs // 安装nodejs
sudo apt-get install npm // 安装npm
sudo npm install n -g // (全局安装n管理器 管理node版本)
sudo n stable // (安装最新稳定版node)
sudo n 8.5.0
sudo node -v
sudo npm -v
```
## 卸载 node
```
sudo npm uninstall npm -g // 先卸载 npm
sudo apt-get remove nodejs // 卸载nodejs
```