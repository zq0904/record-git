# API 接口开发

## 第三方包

- moment
  - 处理日期时间
- express
  - Web 开发框架
- body-parser
  - 解析表单 post 请求体
- blueimp-md5
  - 密码 md5 加密
- mysql
  - 连接操作 mysql 数据库

## 开始

### 生成数据库

```
CREATE DATABASE IF NOT EXISTS cms;

use cms;

-- 用户表
CREATE TABLE users(
    id INT PRIMARY KEY auto_increment,
    username VARCHAR(50) NOT NULL, -- 用户名
    password VARCHAR(50) NOT NULL, -- 密码
    email VARCHAR(50) NOT NULL, -- 邮箱
    avatar VARCHAR(100) NULL, -- 头像
    gender bit NULL, -- 性别
    create_time DATE NOT NULL, -- 创建时间
    modify_time DATE NOT NULL -- 修改时间
);

-- 话题表
CREATE TABLE topics(
    id INT PRIMARY KEY auto_increment,
    title VARCHAR(100) NOT NULL, -- 标题
    content TEXT NOT NULL, -- 内容
    user_id INT NOT NULL, -- 所属用户
    create_time DATETIME NOT NULL, -- 创建时间
    modify_time DATE NOT NULL -- 修改时间
);

-- 评论表
CREATE TABLE comments
(
  id INT PRIMARY KEY auto_increment,
  content TEXT NOT NULL,  -- 评论内容
  create_time DATETIME NOT NULL, -- 评论时间
  modify_time DATE NOT NULL, -- 修改时间2
  topic_id INT NOT NULL, -- 所属文章
  user_id INT NOT NULL, -- 所属用户
  reply_id INT NULL -- 所属回复人
);

```

### 初始化服务端项目结构

```
.
├── app.js 			入口文件
├── config.js 		配置文件
├── controllers 	控制器函数模块
├── models 			数据模型模块
├── node_modules 	第三方包
├── package.json 	包说明文件
└── package-lock.json 第三方包版本锁定文件
```

## 接口设计规范：RESTful

> [阮一峰 - 理解RESTful架构](http://www.ruanyifeng.com/blog/2011/09/restful.html)
>
> [阮一峰 - RESTful API 设计指南](http://www.ruanyifeng.com/blog/2014/05/restful_api.html)

### 概念

以前设计接口的方式：

- GET       /tipoc
- POST     /topic/new
- POST     /topic/modify

这样太乱了，所以 [Roy Thomas Fielding](http://en.wikipedia.org/wiki/Roy_Fielding)在他2000年的[博士论文](http://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm)中提出了 REST 概念。

### 域名

应该尽量将API部署在专用域名之下。

```
https://api.example.com
```

如果确定API很简单，不会有进一步扩展，可以考虑放在主域名下。

```
https://example.org/api/
```

### 版本

API 经常涉及到大的更新及变动，所以尽量对 API 进行版本划分，这里可以直接将版本号放入 URL 中。

```
https://api.example.com/v1/
```

另一种做法是，将版本号放在HTTP头信息中，但不如放入URL方便和直观。[Github](https://developer.github.com/v3/media/#request-specific-version)采用这种做法。

### 路径

- 在RESTful架构中，每个网址代表一种资源（resource），所以网址中不能有动词，只能有名词，而且所用的名词往往与数据库的表格名对应。
- 一般来说，数据库中的表都是同种记录的"集合"（collection），所以API中的名词也应该使用复数。

举例来说，有一个API提供动物园（zoo）的信息，还包括各种动物和雇员的信息，则它的路径应该设计成下面这样。

```
https://api.example.com/v1/zoos
https://api.example.com/v1/animals
https://api.example.com/v1/employees
```

### HTTP 动词

- GET（SELECT）：从服务器取出资源（一项或多项）。
- POST（CREATE）：在服务器新建一个资源。
- PUT（UPDATE）：在服务器更新资源（客户端提供改变后的完整资源）。
- PATCH（UPDATE）：在服务器更新资源（客户端提供改变的属性）。
- DELETE（DELETE）：从服务器删除资源。

下面是一些例子：

```
GET /zoos：列出所有动物园
POST /zoos：新建一个动物园
GET /zoos/ID：获取某个指定动物园的信息
PUT /zoos/ID：更新某个指定动物园的信息（提供该动物园的全部信息）
PATCH /zoos/ID：更新某个指定动物园的信息（提供该动物园的部分信息）
DELETE /zoos/ID：删除某个动物园
GET /zoos/ID/animals：列出某个指定动物园的所有动物
DELETE /zoos/ID/animals/ID：删除某个指定动物园的指定动物
```

### 过滤信息

如果记录数量很多，服务器不可能都将它们返回给用户。API应该提供参数，过滤返回结果。

```
?limit=10：指定返回记录的数量
?offset=10：指定返回记录的开始位置。
?page=2&per_page=100：指定第几页，以及每页的记录数。
?sortby=name&order=asc：指定返回结果按照哪个属性排序，以及排序顺序。
?animal_type_id=1：指定筛选条件
```

### 状态码

服务器向用户返回的状态码和提示信息，常见的有以下一些（方括号中是该状态码对应的HTTP动词）。

```
200 OK - [GET]：服务器成功返回用户请求的数据，该操作是幂等的（Idempotent）。
201 CREATED - [POST/PUT/PATCH]：用户新建或修改数据成功。
202 Accepted - [*]：表示一个请求已经进入后台排队（异步任务）
204 NO CONTENT - [DELETE]：用户删除数据成功。
400 INVALID REQUEST - [POST/PUT/PATCH]：用户发出的请求有错误，服务器没有进行新建或修改数据的操作，该操作是幂等的。
401 Unauthorized - [*]：表示用户没有权限（令牌、用户名、密码错误）。
403 Forbidden - [*] 表示用户得到授权（与401错误相对），但是访问是被禁止的。
404 NOT FOUND - [*]：用户发出的请求针对的是不存在的记录，服务器没有进行操作，该操作是幂等的。
406 Not Acceptable - [GET]：用户请求的格式不可得（比如用户请求JSON格式，但是只有XML格式）。
410 Gone -[GET]：用户请求的资源被永久删除，且不会再得到的。
422 Unprocesable entity - [POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误。
500 INTERNAL SERVER ERROR - [*]：服务器发生错误，用户将无法判断发出的请求是否成功。
```

### 错误处理

如果状态码是4xx，就应该向用户返回出错信息。一般来说，返回的信息中将error作为键名，出错信息作为键值即可。

```
{
    error: "Invalid API key"
}
```

### 返回结果

> 服务器返回结果都使用 JSON 格式数据

针对不同操作，服务器向用户返回的结果应该符合以下规范。

```
GET /collection：返回资源对象的列表（数组）
GET /collection/resource：返回单个资源对象
POST /collection：返回新生成的资源对象
PUT /collection/resource：返回完整的资源对象
PATCH /collection/resource：返回完整的资源对象
DELETE /collection/resource：返回一个空文档
```

## 接口设计

> 基于 RESTful 接口设计规范来设计我们的接口

### 用户资源处理

#### 获取所有用户

请求方法：`GET`

请求路径：`/users`

请求体：

```
无
```

响应结果：

```

```

#### 添加用户

请求方法：`POST`

请求路径：`/users`

请求体：

- email 邮箱
- password 密码
- nickname 昵称

```
{
  email:
  password:
  nickname:
}
```

响应结果：



响应结果示例：

```

```



#### 修改用户

请求方法：`PATCH`

请求路径：`/users/:id`

请求体：

```

```



#### 删除用户

请求方法：`DELETE`

请求路径：`/users/:id`

路径参数：

- id

请求体：

```

```

响应结果：

```

```

响应结果示例：

```

```

### 话题资源处理

#### 分页获取所有话题

请求方法：`GET`

请求路径：`/topics`

请求参数：

- `_page`
  - 默认值：1
- `_limit`
  - 默认值：20

请求体：

```

```

响应结果：

- 数组

响应结果示例：

```
[
    {
        "id": 3,
        "title": "今天天气不错",
        "content": "话题内容，确实不错，挺好的。。。",
        "user_id": 1,
        "create_time": "2017-11-19T21:05:08.000Z",
        "modify_time": "2017-11-19T16:00:00.000Z"
    },
    {
        "id": 4,
        "title": "今天天气不错",
        "content": "话题内容，确实不错，挺好的。。。",
        "user_id": 1,
        "create_time": "2017-11-19T21:06:14.000Z",
        "modify_time": "2017-11-19T16:00:00.000Z"
    }
]
```

#### 添加话题

请求方法：`POST`

请求路径：`/topics`

请求参数：

请求体：

```

```

响应结果：

```

```

响应结果示例：

```

```



#### 修改话题

请求方法：`PATCH`

请求路径：`/topics/:id`

路径参数：

- id 话题id

请求参数：

请求体：

```

```

响应结果：

```

```



响应结果示例：

```

```



#### 删除话题

请求方法：`DELETE`

请求路径：`/topics/:id`

请求参数：

- id

请求体：

```

```

响应结果：

```

```



响应结果示例：

```

```



### 评论资源处理

#### 获取指定话题的所有评论

请求方法：`GET`

请求路径：`/comments`

查询参数：

- topic_id
  - 话题 id

请求体：

```
无
```

响应结果：

```

```

响应结果示例：

```

```

#### 添加评论

请求方法：`POST`

请求路径：`/comments`

请求参数：

请求体：

```
{
  content 评论内容
  topic_id 评书所处的文章
}
```

响应结果：

```

```

响应结果示例：

```

```

#### 修改评论

请求方法：`PATCH`

请求路径：`/comments/:id`

查询参数：

请求体：

```

```

响应结果：

```

```

响应结果示例：

```

```

#### 删除评论

请求方法：`DELETE`

请求路径：`/comments/:id`

查询参数：

请求体：

```

```

响应结果：

```

```

响应结果示例：

```

```

### 会话管理

#### 创建会话（用户登陆）

请求方法：`POST`

请求路径：`/session`

请求参数：

请求体：

```

```

响应结果：

```

```



响应结果示例：

```

```



#### 删除会话（用户退出）

请求方法：`DELETE`

请求路径：`/session`

请求参数：

请求体：

```

```

响应结果：

```

```



响应结果示例：

```

```



#### 获取登陆状态（获取会话状态）

请求方法：`GET`

请求路径：`/session`

请求参数：

请求体：

```

```

响应结果：

```

```

响应结果示例：

```

```

