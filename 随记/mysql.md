# mysql 8.0.16

## 设置 环境变量/开机自启

```
  // 打开系统偏好设置 最后一栏 MySQL 勾选Start MySQL when your computer starts up（当计算机启动时启动MySQL）
  // 把mysql／bin添加到环境变量里 2种方式
  // 1. 通过.zshrc 添加
  export PATH="$PATH:/usr/local/mysql/bin" # 添加mysql环境变量
  source ~/.zshrc # 更新生效
  // 2. 通过创建.bash_profile
  vim ~/.bash_profile
  按i输入 PATH=$PATH:/usr/local/mysql/bin
  :wq
  source ~/.bash_profile // 更新生效
  echo $PATH // 打印环境变量 查看
```

## 操作

```
  sudo /usr/local/mysql/support-files/mysql.server start // 启动 也可以通过系统偏好设置手动点击
  sudo /usr/local/mysql/support-files/mysql.server stop // 停止
  sudo /usr/local/mysql/support-files/mysql.server restart // 重启
  mysql -u root -p 输入密码 // 登陆
  \? // \help 显示帮助
  quit // exit 退出

  // 修改密码
  use mysql;
  ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'new_password';
  FLUSH PRIVILEGES;
```

## 数据库

```
  CREATE DATABASE db_name default charset=utf8; // 创建数据库
  show databases; // 显示所有数据库
  use db_name; // 选择数据库
  drop database db_name; // 删除数据库

  // 数据库改名
```

## 表

```
  show tables; // 显示某个数据库下的所有表
  describe table_name; // show columns from table_name 显示表结构
  alter table lod_name rename to new_name; // alter table lod_name rename as new_name 修改表名
  drop table db_name; // 删除表
  // 创建表
  CREATE TABLE table_name (
    id int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增主键',
    name varchar(100) NOT NULL DEFAULT '' COMMENT '名字',
    createtime timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    modifytime timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
    PRIMARY KEY (id)
  ) COMMENT '人员表' ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

## CRUD 表

```
  insert into table_name(name,modifytime) values('小明','2019-05-17 14:05:38'),('小红','2019-05-17 14:05:38'); // 添加多个值
  update table_name set name='小绿' where id='2'; // 更新值
  select * from table_name where name='小绿' and id='1'; // 查询 select * from table_name 查所有
  delete from user where id='2'; // 删除 delete from table_name 清空表
```

## 导入导出

```
  // 导出.sql文件 不会带 创建数据库 切换数据库 语句 如在导入时 需要自己创建数据库 切换数据库 （NP 右键数据库 运行SQL文件 成功刷新）
  source 将.sql文件直接拖拽至终端自动补全路径 // 导入.sql文件 （NP 右键连接 运行SQL文件 成功刷新）
  mysqldump -u root -p table_name > sql_name.sql // 导出导入.sql文件 （NP 右键数据库 存储SQL文件 1.结构+数据 2.仅结构）
```
