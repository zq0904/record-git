# SSR

## 购买服务器配置 [vultr](https://my.vultr.com) Ubuntu 19.04 x64 [参考](http://feelsight.cn/post/68.html)

## SSR mac 终端操作

自己 ping IP 选一个满意的 日本延迟低但丢包严重
链接远程 ssh root@45.32.7.41 （如遇 Add correct host key in /Users/zhaoqi/.ssh/known_hosts to get rid of this message.）rm ~/.ssh/known_hosts
输入 yes 回车 出现系统信息 root@vultr:~# 说明链接成功
Ubuntu 没有 yum 有 wget
输入(注：代码主要做了 下载 ssr.sh 给权限 运行 每次可以单独运行 bash ssr.sh 此脚本是开机自动启动，部署一次即可)
wget -N --no-check-certificate https://raw.githubusercontent.com/ToyoDAdoubi/doubi/master/ssr.sh && chmod +x ssr.sh && bash ssr.sh
回车
依次执行

1. 安装 ShadowsocksR
2. 设置端口 密码
3. 加密方式 aes-256-cfb
4. 协议插件 origin
5. 确定兼容 y
6. 混淆插件 plain
7. 设备数限制

## 谷歌 BBR 加速

输入(注：开机自动启动，部署一次就可以了)
wget --no-check-certificate https://github.com/teddysun/across/raw/master/bbr.sh && chmod +x bbr.sh && ./bbr.sh
回车回车 等待安装
lsmod | grep bbr // 查看是否安装成功 出现 tcp_bbr 字样表示 bbr 已安装并启动成功

## 完成

===================================================

I P : 207.148.100.200
端口 : 8888

===================================================

## ios 手机 Shadowrocket 客户端

美区 App Id
下载 Shadowrocket
