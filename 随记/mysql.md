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
  // 显示某个数据库下的所有表
  SHOW TABLES
  // 显示表结构 主要用于查看每个字段的类型等信息
  DESC table_name // DESCRIBE table_name | SHOW COLUMNS FROM table_name
  // 修改表名
  ALTER TABLE lod_name RENAME TO new_name // ALTER TABLE lod_name RENAME AS new_name
  // 删除表
  DROP TABLE db_name
  // 创建表
  CREATE TABLE table_name (
    id int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增主键',
    name varchar(100) NOT NULL DEFAULT '' COMMENT '名字',
    createtime timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    modifytime timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
    PRIMARY KEY (id)
  ) COMMENT '人员表' ENGINE=InnoDB DEFAULT CHARSET=utf8;
  // 向表中添加字段
  ALTER TABLE apps ADD isdel INT(11) DEFAULT 0
  // 删除表中字段
  ALTER TABLE rn_yewu_info DROP COLUMN description
```

## CRUD 表

- 添加多个值
  ```
    INSERT INTO table_name (name, modifytime)
    VALUES
      ('小明', '2019-05-17 14:05:38'),
      ('小红','2019-05-17 14:05:38')
  ```
- 更新值
  ```
    UPDATE table_name
    SET name = '小绿'
    WHERE id = '2'
  ```
- 根据条件判断更新值
  ```
    UPDATE rn_yewu
    SET version_dev = 1234,
    encrypt_url_online = CASE sys_type
      WHEN 1 THEN 'iosxxx'
      WHEN 0 THEN 'xxxx'
      END,
    url_online = CASE sys_type
      WHEN 1 THEN ''
      WHEN 0 THEN ''
      END
    WHERE appid = 6
    AND bundle_id = 78
  ```
- 查询
  ```
    SELECT *
    FROM users
    WHERE id IN (140, 803)
    SELECT * FROM table_name
    WHERE name = '小绿'
    AND id IN (140, 803) -- id 为 140 或 803 可以是多个值
    ORDER BY modify DESC -- 排序 ASC 升序（默认） DESC 降序
  ```
- 查询（将一个sql的输出当成另一个sql的输入）
  ```
    SELECT *
    FROM rn_yewu_info
    WHERE appid = 6
    AND rn_id = 78
    AND version = (
      SELECT MAX(version)
      FROM rn_yewu_info
      WHERE appid = 6
      AND rn_id = 78
      AND temp LIKE  '%test%' -- 模糊查询
    )
  ```
- 删除 delete FROM table_name 清空表
  ```
    DELETE FROM user
    WHERE id='2'
  ```

## 导入导出

```
  // 导出.sql文件 不会带 创建数据库 切换数据库 语句 如在导入时 需要自己创建数据库 切换数据库 （NP 右键数据库 运行SQL文件 成功刷新）
  source 将.sql文件直接拖拽至终端自动补全路径 // 导入.sql文件 （NP 右键连接 运行SQL文件 成功刷新）
  mysqldump -u root -p table_name > sql_name.sql // 导出导入.sql文件 （NP 右键数据库 存储SQL文件 1.结构+数据 2.仅结构）
```

## 数据库迁移

```
  使用工具 Navicat Premium
  选择数据库 右键 选择 打开数据库
  选择数据库 右键 选择 转储SQL 导出.sql
  在另一个数据库 右键 选择 运行SQL
```
