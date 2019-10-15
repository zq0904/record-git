## 容器化

- 概念：容器化是将应用程序、服务 及其依赖、配置 一起打包为容器映像的一种软件开发方法
- 特点
  - 一致的运行环境
  - 可伸缩性
  - 方便移植
  - 隔离性

## Docker

- 概念：Docker 是用 Go 语言开发的应用容器引擎，基于容器化，沙箱的应用部署技术。可适用于自动化、打包、持续集成、发布应用程序等场景。阿里云，亚马逊在内部的云计算服务商都采用了 docker 来打造 serverless 服务平台。它不仅仅可以部署项目，还可以应用于数据库搭建，nginx 服务搭建，nodeJs 等环境搭建。
- Docker 中 3 个重要的概念
  - 镜像 分片的（只读）文件系统，由 Dockerfile 创建 独立、易扩展、更效率
  - 容器 文件系统 + 系统资源 + 网络配置 + 日志管理
  - 仓库 用来远端存储 docker 镜像 版本控制 变更管理

## Docker（容器） Vs 虚拟机

|     特性      |    容器    |   虚拟机   |
| :-----------: | :--------: | :--------: |
|     启动      |    秒级    |   分钟级   |
|   硬盘使用    |     MB     |     GB     |
|     性能      |  接近原生  |     弱     |
|  系统支持量   | 上千个容器 |   几十个   |
| 开发/环境定制 |    方便    | 进入虚拟机 |

## Docker 的工作原理

1.Docker 会拉取镜像，若本地已经存在该镜像，则不用到网上拉取 2.创建新的容器 3.分配文件系统并且挂着一个可读可写的层，任何修改容器的操作都会被记录到这个层上，你可以保存这些修改形成新的镜像，也可以选择不保存，那么下载运行该镜像的时候所有修改操作都会被消除 4.分配网络\桥接接口，创建一个允许容器与本地主机通信的网络接口 5.设置 ip 地址，从池中寻找一个可用的 ip 地址附加到容器上（localhost 并不能访问到容器） 6.运行指定程序 7.捕获并且提供应用输出，包括输入、输出、报错等信息

## 安装 [参考](https://docs.docker.com/install/linux/docker-ce/ubuntu/)

- linux

```
  curl -fsSL https://get/docker.com | bash -s docker --mirror Aliyun // 对于中国区 使用Aliyun镜像加速
  curl -fsSL https://get.docker.com -o get-docker.sh
   sh get-docker.sh // 对于国外服务器
  sudo usermod -aG docker root // 添加一个root用户
  service docker start // 启动docker
  systemctl enable docker.service // 开机自启
```

- Mac/Windows 安装包直接安装 [参考](https://hub.docker.com/?overlay=onboarding)

## DOcker 国内镜像加速 [参考](https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors)

- 主要是对 docker pull 拉取镜像的操作进行网络加速优化 （阿里云 专属镜像加速）

```
  例 mac :
  右键点击桌面顶栏的 docker 图标，选择 Preferences ，在 Daemon 标签（Docker 17.03 之前版本为 Advanced 标签）下的 Registry mirrors 列表中将https://csmjah5l.mirror.aliyuncs.com加到"registry-mirrors"的数组里，点击 Apply & Restart按钮，等待Docker重启并应用配置的镜像加速器。
```

## 常用命令

docker --version // 版本
docker info // docker 的一些信息
docker images // 查看本地有镜像
docker login // 登录 docker Hub 远程仓库
docker commit [container id] qixiaoqi/ubuntu-v:0.1 // 将容器 提交到 本地镜像
docker push qixiaoqi/ubuntu-v:0.1 // 将本地镜像推送至远程
docker pull mysql:5.7 // 拉取 镜像:版本
docker run -itd --name ubuntu1 ubuntu // run 创建并启动容器 -i 表交互 -t 表终端 -d 表后台运行 --name 起个名字
docker run -itd --name nginx1 -v /Users:/use/share/nginx/html -p 8000:80 nginx // -v 表映射文件目录(类似软链接的形式)
docker run -itd --name myslq1 -v /Users/zhaoqi/docker-mysql-volume:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 -p 8100:3306 mysql // -e 表设置环境变量(这里就是设置 root 用户的密码) -p 表映射端口(格式 宿主机端口:容器端口)
docker exec -it [name|container id] /bin/bash // 进入这个容器
docker commit [container id] mysql:1.0 // 在本地保存一个 tag
docker run -itd --name mysql2 -v /Users/zhaoqi/docker-mysql-volume:/var/lib/mysql -p 8101:3306 mysql:1.0 // 直接使用本地的 tag 镜像去创建 数据库数据如果需要保留必须使用 -v 单独挂载出来（可以将 2 个 mysql 挂载同一个路径 但不能同时连接 必须先断掉一个）
docker images // 查看本地有哪些镜像
docker ps // 查看 运行的容器
docker ps -a // 查看 所有容器容器
docker search ubuntu // 查看相关镜像是否存在
docker stop [name|container id] // 停止正在运行的容器
docker rm [name|container id] // 删除容器(删除的容器必须停止)
docker rmi [image id] // 删除本地镜像(删除的镜像必须没有用于容器)
docker start [name|container id] // 开始运行容器
docker restart [name|container id] // 重启
docker logs -f [name|container id] // 查看容器的日志 -f 表持续输出
docker inspect [container id] // 查看容器的初始化的一些配置(Mounts Source 是-v 挂载的目录)

## 制作 Docker 镜像

1. 使用 docker commit [container id] qixiaoqi/ubuntu-v:0.1 (不是很方便)
2. 使用 Dockerfile 脚本 (由一堆命令、参数 构成) 使用 docker build 执行脚本构建镜像
   docker build -t [your_name]/[image_name]:[tag] . // -t 表镜像的名字及标签(通常是 name:tag 格式) .表指定上下文环境的目录

## Docker-compose

概念：用户可以很容易的用一个配置文件定义一个多容器的应用，然后使用一条指令安装这个应用所有的依赖，完成构建。Docker-compose 解决了容器与容器之间如何管理编排的问题。

- 服务(service)：一个应用容器，实际上可以包括若干运行相同镜像的容器实例。
- 项目(project)：由一组关联的应用容器组成的一个完整业务单元，在 docker-compose.yml 文件中定义。

### 安装 [参考](https://docs.docker.com/compose/install/)

### 命令 (全部依赖于 docker-compose.yml 文件)

docker-compose up -d // 创建
docker-compose -f docker-compose.mongo.yml up -d // -f 表指定配置文件
docker-compose start // 启动
docker-compose stop // 停止
docker-compose rm // 删除
docker-compose restart // 重启
