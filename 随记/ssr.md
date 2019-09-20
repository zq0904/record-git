# SSR
## 购买服务器配置 [vultr](https://my.vultr.com) Ubuntu 19.04 x64 [参考](http://feelsight.cn/post/68.html)
## SSR mac终端操作
自己 ping  IP 选一个满意的 日本延迟低但丢包严重
链接远程 ssh root@45.32.7.41
输入 yes 回车 出现系统信息 root@vultr:~# 说明链接成功
Ubuntu 没有 yum 有 wget
输入(注：代码主要做了 下载ssr.sh 给权限 运行 每次可以单独运行 bash ssr.sh 此脚本是开机自动启动，部署一次即可)
wget -N --no-check-certificate https://raw.githubusercontent.com/ToyoDAdoubi/doubi/master/ssr.sh && chmod +x ssr.sh && bash ssr.sh
回车
依次执行
1. 安装 ShadowsocksR
2. 设置端口 密码
3. 加密方式 aes-256-cfb
4. 协议插件 auth_sha1_v4
5. 确定兼容 y
6. 混淆插件 plain
7. 设备数限制
## 谷歌BBR加速
输入(注：开机自动启动，部署一次就可以了)
wget --no-check-certificate https://github.com/teddysun/across/raw/master/bbr.sh && chmod +x bbr.sh && ./bbr.sh
回车回车 等待安装
lsmod | grep bbr // 查看是否安装成功 出现tcp_bbr字样表示bbr已安装并启动成功
## 完成
===================================================

 ShadowsocksR账号 配置信息：

 I  P     : 202.182.98.13
 端口     : 8888
 密码     :
 加密     : aes-256-cfb
 协议     : auth_sha1_v4_compatible
 混淆     : plain
 设备数限制 : 2
 单线程限速 : 0 KB/S
 端口总限速 : 0 KB/S
 SS    链接 : ss://YWVzLTI1Ni1jZmI6Wmhhb3FpMzA1MjgxMkAyMDIuMTgyLjk4LjEzOjg4ODg
 SS  二维码 : http://doub.pw/qr/qr.php?text=ss://YWVzLTI1Ni1jZmI6Wmhhb3FpMzA1MjgxMkAyMDIuMTgyLjk4LjEzOjg4ODg
 SSR   链接 : ssr://MjAyLjE4Mi45OC4xMzo4ODg4OmF1dGhfc2hhMV92NDphZXMtMjU2LWNmYjpwbGFpbjpXbWhoYjNGcE16QTFNamd4TWc
 SSR 二维码 : http://doub.pw/qr/qr.php?text=ssr://MjAyLjE4Mi45OC4xMzo4ODg4OmF1dGhfc2hhMV92NDphZXMtMjU2LWNmYjpwbGFpbjpXbWhoYjNGcE16QTFNamd4TWc

  提示:
 在浏览器中，打开二维码链接，就可以看到二维码图片。
 协议和混淆后面的[ _compatible ]，指的是 兼容原版协议/混淆。

===================================================
## ios 手机 Shadowrocket客户端
美区App Id
下载 Shadowrocket