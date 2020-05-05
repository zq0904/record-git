# nginx [官网](http://www.nginx.org/)
## 官方文章
  [Nginx请求反向代理](https://www.jianshu.com/p/bed000e1830b)
  [通常的 Nginx 陷阱](https://www.nginx.com/resources/wiki/start/topics/tutorials/config_pitfalls/)
  [if 是恶魔](https://www.nginx.com/resources/wiki/start/topics/depth/ifisevil/)
  [location 指令](http://nginx.org/en/docs/http/ngx_http_core_module.html#location)
  [Nginx 请求过程](http://nginx.org/en/docs/http/request_processing.html)
## 命令
  sudo nginx 启动nginx
  sudo nginx -s reload 重启nginx
  ps -ef | grep nginx 查看nginx是否启动
  kill -QUIT 2072 杀死进程 关闭nginx的一种方式
  sudo nginx -t 测试nginx语法等有没有问题
  // 设置mac nginx(brew安装的) 开机自启
  sudo cp /usr/local/opt/nginx/*.plist /Library/LaunchDaemons
  sudo launchctl load -w /Library/LaunchDaemons/homebrew.mxcl.nginx.plist
## http代理
  - 正向代理 (小飞机 翻墙)
  - 反向代理（按照某种 负载均衡策略 转发给多台web服务器）
## 负载均衡策略
  - 内置策略
    + 轮询     按请求均摊给web服务器
    + 加权轮询 可以按照web服务器性能等分配不同的权重 请求就按照这个权重分配给web服务器
    + Ip hash 对客户端请求的ip进行hash操作 然后根据hash结果将同一个客户端ip的请求分发给同一台服务器进行处理 解决session不共享的问题 （同一台电脑请求的总是那一台服务器）
  - 扩展策略 （负载均衡算法）
## web缓存
## Nginx配置文件结构
    ... # 全局块
    events { # events块
    }
    http { # http块
      server { # server块
        location { # location块
        }
      }
    }
## location块
  - 前缀
   = 开头 表示精确匹配
  ^~ 开头 表示以某个 字符串 开头(不是正则匹配) 和 location /a 都一样 都是字符串 但应用该规则不会向后匹配正则
   ~ 开头 表示区分大小写的正则匹配
  ~* 开头 表示不区分大小写的正则匹配
   / 开头 通用匹配 如果没有匹配到其它的则使用
  - 匹配顺序
  location =           如果匹配成功 则停止其他匹配
  location [^~] 字符串  按照字符串从长到短优先级匹配 (匹配成功的location如果使用^~ 则停止其它正则匹配) 如果没有使用^~ 则还会向后看 有没有匹配正则 匹配则使用正则匹配 没有匹配则使用本条
  location [~|~*] 正则  按照配置文件里的书写顺序匹配 成功就停止其他匹配
  所以从表面上看的优先级为 (location =) > (location ~ ~* 正则 (优先级按顺序)) > (location ^~ 字符串 (忽略~ ~*正则)) (location 字符串 (优先级按长度))
  - 注意
    + 正则匹配表达式 尽量加''引号 要不有些识别不了
    + 匹配的顺序是 先匹配普通字符串 再匹配正则表达式
      普通字符串匹配顺序是按照 根据字符长度从长到短 与location顺序无关
      正则表达式匹配顺序是按照 配置文件里的顺序匹配 找到第一个比配的正则表达式将停止搜索 与location顺序有关
    + 一般情况下 匹配成功了(location 字符串)还会进行(location 正则)匹配 有两种方法改变这种行为
      其一就是使用 =前缀 执行的是严格匹配 匹配成功后立即停止其他匹配
      其二就是使用 ^~前缀 如果匹配到 ^~前缀的字符串 不检测后面的正则表达式
  - 例子
  ```
    # = 表示精确匹配 例如 浏览器输入 fe.test.com 等同于 http://fe.test.com/ (http://fe.test.com/a 于 http://fe.test.com/a/ 是2个不同的路径)
    location = / {
      proxy_pass http://localhost:3002/list/?args=a;
    }
    # 以/开头将匹配 因为任何路由都以/开头 会匹配所有路由 还要继续往下搜索 只有后面的没有匹配到时才会使用这一条 (但是正则匹配和长字符串会优先匹配 优先级为 正则匹配 > 长字符串 > 短字符串)
    location / {
      proxy_pass http://localhost:3002/list/?args=/; # 将匹配到的部分替换 如 http://fe.test.com/qwe -> http://localhost:3002/list/?args=bqwe
    }
    # 以/a开头将匹配 如 /a /A /asd (虽然/a 既匹配/ 也匹配/a 但最长字符串会优先匹配 所以匹配/a)
    location /A { # 默认 /a /A 都能匹配 不区分大小写 ???
      proxy_pass http://localhost:3002/list/?args=/a;
    }
    # 加 ~ ~* 前缀 才会将 后面的规则视为正则表达式   location为正则表达式 则proxy_pass中 不能只含有URI部分 必须有类似$request_uri这种内置变量
    # 不加 ~ ~* (即以^~ = 或者 什么都不加) 后面的规则仅会视为字符串 路由以该字符串开头将被匹配
    # 以/.*开头将匹配 如 http://fe.test.com/.*
    location /.* {
      proxy_pass http://localhost:3002/list/?args=/.*;
    }
    # 区分大小写的正则匹配 正则表达式最好都加引号 如 /a (/a 匹配 / /a '.*' 正则匹配 > 长字符串 > 短字符串)
    location ~ '.*' { # http://fe.test.com/123 -> http://localhost:3002/list/?args=/123
      proxy_pass http://localhost:3002/list/?args=$request_uri;
    }

    # http://fe.test.com/images/a 匹配到 location ^~ /images/  (如果匹配到^~ 则不会匹配正则表达式)
    location ~ '^/images/a' {
      proxy_pass http://localhost:3002/list/?args=$request_uri;
    }
    location ^~ /images/ {
      proxy_pass http://localhost:3002/list/?args=^~/images/;
    }

    # http://fe.test.com/images/a 匹配到 location ~ '/images/a' (/images/a 比 /images/ 字符串长 取长字符串 正则优先 所以最后匹配 ~ '/images/a')
    location ^~ /images/ {
      proxy_pass http://localhost:3002/list/?args=^~/images/;
    }
    location /images/a {
      proxy_pass http://localhost:3002/list/?args=/images/a;
    }
    location ~ '/images/a' {
      proxy_pass http://localhost:3002/list/?args=/images/a$request_uri;
    }
  ```
## rewrite
  - 作用 使用nginx提供的全局变量或自己设置的变量 结合正则表达式和标志位实现url重写以及重定向
  - 作用域 只能放在 server{} location{} if{}
  - 语法 rewrite regexp replace [flag];
  - 对比location rewrite是更改获取资源的路径 而 location是对一类路径做控制访问或反向代理 进一步可以proxy_pass到其他机器
  - 执行顺序
    1.执行server块的rewrite指令（只会执行一次）
    2.执行location匹配
    3.执行选定的location中的rewrite指令
    4.如果其中某步uri被重写 则重新循环执行2-3 直到找到真实存在的文件 循环多次会报（500 Internal Server Error）
  - flag标记
  |flag      |规则                                          |
  |-         |-                                            |
  |last      |匹配后 重写的url会 重新匹配  新的location        |
  |break     |匹配完成即终止 不会在重新匹配 新的location        |
  |redirect  |返回302临时重定向 浏览器地址栏会显示跳转后的URL地址 |
  |permanent |返回301永久重定向 浏览器地址栏会显示跳转后的URL地址 |
  - 例子
  ```
    # http://fe.test.com/asd 最后返回状态码 600
    location /c {
      return 600;
    }
    location /b {
      rewrite '^/b' /c last;
      # rewrite 匹配了 后缀为 last 或者 不写 直接中断本location 重新开始匹配server
    }
    rewrite '^/a.*$' /bsd last;
    # http://fe.test.com/asd  404
    location /c {
      return 600;
    }
    location /b {
      rewrite '^/b' /c break;
      # rewrite 匹配了 后缀为 break 运行本location 不会重新开始匹配
    }
    rewrite '^/a.*$' /bsd last;
  ```
  - 全局变量 例如请求 http://fe.test.com/a/b.html?c=3&d=4
    |全局变量                             |测试值                             |描述                                                         |
    |-                                   |-                                 |-                                                           |
    |$request                            |GET /a/b.html?c=3&d=4 HTTP/1.1    |请求头信息                                                   |
    |$time_local                         |22/Nov/2018:19:34:01 +0800        |访问时间与时区                                                |
    |$scheme                             |http                              |HTTP方法(如http,https)                                       |
    |$host                               |fe.test.com                       |请求主机头字段 否则为服务器名称                                 |
    |$request_uri                        |/a/b.html?c=3&d=4                 |带查询字符串的URI                                             |
    |$request_method                     |GET                               |客户端请求类型                                                |
    |$content_type                       |-                                 |请求头中的Content-Type字段                                    |
    |$status                             |200                               |状态码                                                       |
    |$remote_addr $http_x_forwarded_for  |127.0.0.1                         |客户端的IP地址                                                |
    |$remote_port                        |54865                             |客户端的端口                                                  |
    |$http_user_agent                    |Mozilla/5.0 (Macinto...           |客户端浏览器的相关信息                                          |
    |$http_cookie                        |-                                 |客户端cookie信息                                              |
    |$http_referer                       |-                                 |从那个页面链接访问过来的                                        |
    |$body_bytes_sent                    |587                               |文件主体内容大小                                               |
    |$remote_user                        |-                                 |已经经过Auth Basic Module验证的用户名                           |
    |$args $query_string                 |c=3&d=4                           |查询字符串                                                    |
    |$content_length                     |-                                 |请求头中的Content-length字段                                   |
    |$document_root                      |/Users/zhaozhaoqi/test            |当前请求在root指令中指定的值 匹配的实际在nginx服务器这面的根路径    |
    |$limit_rate                         |0                                 |这个变量可以限制连接速率                                        |
    |$request_filename                   |/Users/zhaozhaoqi/test/a/b.html   |当前真正请求的路径 由root与最后的uri组成                         |
    |$server_protocol                    |HTTP/1.1                          |请求使用的协议，通常是HTTP/1.0或HTTP/1.1                        |
    |$server_addr                        |127.0.0.1                         |服务器地址                                                    |
    |$server_name                        |fe.test.com                       |服务器名称                                                    |
    |$server_port                        |80                                |请求到达服务器的端口号                                          |
    |$uri $document_uri                  |/a/b.html                         |不带查询字符串的URI                                            |
## proxy_pass
  - 对于 location [^~] 字符串 proxy_pass可以为纯uri
  ```
    # 带/ 将匹配的uri剩余部分 代理到某个主机的某个路径下  语义为 将请求路径以/a/开头的代理到http://127.0.0.1:3002的/路径下
    # http://fe.test.com/a/b/c.html?d=1 -> http://127.0.0.1:3002/b/c.html?d=1
    location /a/ {
      proxy_pass http://127.0.0.1:3002/;
    }
    # 不带/ 将整个uri 代理到某个主机下  语义为 将请求路径以/a/开头的(不匹配正则location)原封不动的代理到http://127.0.0.1:3002
    http://fe.test.com/a/b/c.html?d=1 -> http://127.0.0.1:3002/a/b/c.html?d=1
    location ^~ /a/ {
      proxy_pass http://127.0.0.1:3002;
    }
  ```
  - 对于 location [~|~*] 正则 proxy_pass不可以为纯uri 可以使用变量代替（nginx: [emerg]"proxy_pass" cannot have URI part in location given by regular expression）
  ```
    # http://fe.test.com/a/b/c.html?d=1 -> http://127.0.0.1:3002/b/c.html?d=1
    location ~ '^/a/(.*)$' {
      proxy_pass http://127.0.0.1:3002/$1?$args;
    }
    # http://fe.test.com/a/b/c.html?d=1 -> http://127.0.0.1:3002/a/b/c.html?d=1
    location ~* '^/a/' {
      proxy_pass http://127.0.0.1:3002$request_uri;
    }
  ```
  - 常用的例子 api代理
  ```
    # http://fe.test.com/api/list?a=1&b=2 -> http://127.0.0.1:3002/list?a=1&b=2
    location /api/ {
      proxy_pass http://127.0.0.1:3002/;
    }
    # 静态资源 http://cms.zeroer.cc/public/?a=1&b=2 -> http://127.0.0.1:3000/public/?a=1&b=2
    location /public/ {
      proxy_pass http://127.0.0.1:3000/public/;
    }
    # http://fe.test.com/api/list?a=1&b=2 -> http://127.0.0.1:3002/list?a=1&b=2
    location /api/ {
      rewrite "^/api/(.*)$" /$1 break;
      proxy_pass http://127.0.0.1:3002;
    }
  ```
## 日志
  -以请求http://fe.test.com/qwe   页面404为例   针对设置不同的错误日志级别 打印的日志信息
  ```
    # error_log  logs/error.log emerg; # 没有记录
    # error_log  logs/error.log alert; # 同上
    # error_log  logs/error.log crit; # 同上
    # error_log  logs/error.log error; # 2018/11/26 15:26:59 [error] 5092#0: *8156 "/Users/zhaozhaoqi/zhaoqi/test/b/index.html" is not found (2: No such file or directory), client: 127.0.0.1, server: fe.test.com, request: "GET /qwe HTTP/1.1", host: "fe.test.com"
    # error_log  logs/error.log warn; # 同上
    # error_log  logs/error.log notice; # 同上
    # error_log  logs/error.log info; # 同上
    # error_log  logs/error.log debug; # 很详细的日志 大致精简部分如下
    # ".*" matches "/qwe"         .*匹配到/qwe
    # rewritten data: "/a/"       重定向到/a/
    # test location: "/b/"        尝试匹配 location /b/
    # test location: "/a/"        尝试匹配 location /a/
    # using configuration "/a/"   使用"/a/"配置
    # ".*" matches "/a/"          .*匹配到/a/
    # rewritten data: "/b/"       重定向到/b/
    # test location: "/b/"        尝试匹配 location /b/
    # using configuration "/b/"   使用"/b/"配置
    # "/Users/zhaozhaoqi/zhaoqi/test/b/index.html" is not found (2: No such file or directory)  最终匹配的文件不存在
    # HTTP/1.1 404 Not Found      返回404
    server {
      ...
      rewrite '.*' /a/ last;
      location /a/ {
        rewrite '.*' /b/ last;
      }
      location /b/ {}
      ...
    }
  ```
  -仅调试 rewrite 规则
  ```
    server {
      ...
      rewrite_log on; # 相当于 error_log logs/error.log notice;
      ...
    }
    error.log 文件日志
    # 2018/11/26 17:41:18 [error] 10858#0: *8225 "/Users/zhaozhaoqi/zhaoqi/test/b/index.html" is not found (2: No such file or directory), client: 127.0.0.1, server: fe.test.com, request: "GET /qwe HTTP/1.1", host: "fe.test.com"
  ```
