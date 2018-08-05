<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  
</body>
</html>
<script>
// 老师email : jk@itcast.cn    jk@jklib.org

localhost 即本地计算机, 其对应的 IP 就是 127.0.0.1
一。安装 Apache 服务器
// 1. 需要安装 C++ 运行环境, 双击安装即可
// 2. 在 C 盘下 建立一个文件夹 "WAMP"
// 3. 将 Apache 解压到这个文件夹中
// 4. 找到 Apache 的配置文件( 在 conf 文件夹中, httpd.conf )
// 5. 打开它, 配置其安装目录( Define SRVROOT "C:/WAMP/Apache24" )
// //测试 6 - 9
// 6. 找到 Apache 中的 bin 目录, 在里面按下 shift 键 + 鼠标右键 打开命令行
// 7. 输入命令 httpd. 即会看到命令行等待
// 8. 在浏览器中输入: 127.0.0.1 或 localhost 即可访问（ 注意: 实际上是 http:// 127.0.0.1 或 http://localhost）
// 9. 测试成功后 在命令行中使用 ctrl + c 结束程序
// 二。将 Apache 安装成服务
// 1.找到cmd 右键, 以管理员身份运行
// 2.定位到 Apache 的 bin 目录下( 切换盘符使用 D: 等)
// 3.命令 httpd -k install   安装 Apache 服务
// 4.命令 httpd -k start     开启 Apache
// 5.使用 httpd -k stop      停止 Apache
// 6.命令 httpd -k uninstall 移除服务
-> 网站根目录
在 配置文件中有一个 DocumentRoot （刚装一般不用改）, 该参数用于配置我们的网站根目录 随带的有一个 <Directory "路径名"> 的一对尖括号 这个是用于配置我们的访问级别的
-> 默认打开的页面
在 配置文件中 有一个 DirectoryIndex 用于高速服务器默认打开什么页面
例如(index.html index.htm index.php default.html default.htm)
三。让 Apache 支持 PHP（如果Apache支持了php 那么服务器会将 php 执行, php 代码会拼接 HTML 格式的字符串, 返回给浏览器）
1. 找到与 Apache 版本对应的 PHP 包 解压到安装 Apache 的目录( 目的只是为了方便 )
2. 找到 php 的配置文件模板( php.ini-development 或 php.ini-production ), 复制一份修改名为 php.ini 即可
3. 找到 Apache 的配置文件 httpd.conf 在配置文件的结尾处加上下面的代码

# 让 Apache 加载 php 模块, 即让 Apache 有这个功能
LoadModule php5_module "C:/WAMP/php-5.6.31-Win32-VC11-x64/php5apache2_4.dll"
# 告诉 Apache 用 .php 结尾的 文件交给 php 引擎处理
AddType application/x-httpd-php .php 
# 让 我们的 Apache 知道 php 的安装目录
PHPIniDir "C:/WAMP/php-5.6.31-Win32-VC11-x64"
//卸载服务 我们采用的是解压缩式安装（绿色版） 在停止服务(httpd -k stop) 和 移出服务(httpd -k uninstall)之后 直接删除 就可以了

// 一个完整的 URL 的格式可以简化为:协议://IP:端口/路径
// cd C:\Users\dell\Desktop       切换路径
// cd /                           根目录
// cd ./                          当前目录
// cd ../                         上一级目录
// D：                            更换盘符
// copy 1.text+1.text 2.text      复制一份与自身相加
// dir                            查看文件下内容
// services.msc                   打开服务资源管理器（查看计算机中安装了那些服务）
// 路径在 bin 下 使用命令 httpd -k install    安装服务
//              httpd -k uninstall  卸载服务
//              httpd -k start      开始
//              httpd -k stop       暂停
// 可以使用 自带的管理工具管理

//为什么引入PHP 其目的使生成 html 格式的字符串 返回给浏览器

四。域名系统（DNS domain system）（IP好不记所以引入域名系统）
1. 浏览器会首先在本地计算机中找寻一个 称为 host 的文件
（c盘  windows System32 drivers etc hosts 记得备份）
（苹果 计算机下 host 文件在  cmd + shift + g /etc ）
在 hosts 文件中增加两条记录（关于用户权限 右键文件 属性 安全 编辑 全部允许 应用 就可以直接在修改了）
127.0.0.1   www.www1.com
127.0.0.1   www.www2.com
2.将网站放到 DocumentRoot 所描述的文件夹的子文件夹中（根目录 htdocs中）
3.找到 Apache 的配置文件去掉注释（httpd.conf）（正常在501行）
# Virtual hosts
  Include conf/extra/httpd-vhosts.conf
4.去找 对应的 extra/httpd-vhosts.conf  按照最后的模板
<VirtualHost *:80>
    DocumentRoot "${SRVROOT}/htdocs/www1"
    ServerName www.www1.com
</VirtualHost>
注意: 不要在文件路径后加 /
5.重启 Apache






php的数据类型 
  整型（int , integer）    0b开头 表示二进制
  浮点型（float , real）  （俗称 实数）科学计数法 1.234E5
  字符串（string）   
  布尔类型（bool）         true false
  数组（array）
  对象（object）
  资源（resource）
  空（null）               确实没有undefined

使用函数判断数据类型 is_XXXX()    （is_int() is_bool() is_float() is_string()） 在判断整型 is_int(1.1) --- false 浮点型 is_float(1) --- false 简单数 整型就是整型 浮点型就是浮点型

输出 echo "a,b,c"; （可以输出多个 一般输出一个）字符串 数字 （只能输出数组中的值 不能输出 数组）
   print('a');   （只能输出一个）
   printf("我是%s今年%d身高%.1f",'赵琦',23,1.72);   （填空的感觉 %s 字符串 %d 整型数字 %.2f 保留2为小数浮点数）（一般输出在屏幕，可以重定向）(%d 在模糊查询)
$str=sprintf();（不是将字符串输出到缓存区 而是将字符串返回 将多行字符串出在Mysql中）
   print_r();    （用于输出详细信息）
   var_dump()    （用于输出详细信息, 包含类型,数组长度） （能输出false 别的都不能输出false）
php在服务器上运行 他的输出是靠 缓存 机制来实现的 每次的输出都不会立即返回给浏览器 而是在缓存中存储 等到php代码结束（指每一个<?php?>） 才返回给浏览器

声明变量 $name = 1; （不用声明 直接赋值 自动声明）
注释 单行注释 // 
   多行注释 /**/ 
   单行注释 #

在php中""具有变量解析功能，而''没有 
所以咱们尽量用"" 自带求职运算 具有全面的转义字符 "\n"

php中多行字符串  
<<< 标记
  ...
标记   //（注意结束标记一定要顶格写）

js中多行字符串
ES6以前使用 \
var str = "<div>        \
          <img>       \
          <h4></h4>   \
         </div>";
ES6后使用  
var str = ` <div>        
          <img>       
            <h4></h4>   
        </div> `;

数组
//线性数组( 数字索引数组 )    
//关联数组( 键值对, 字典 )
创建
//$arr = array(1,2,3);    $arr = [1,2,3];
//$arr = array("a" => 1,"b" => 2); $arr = ["a" => 1, "b" => 2];
访问 （注意关联数组 必须用 json格式的数据）
//$arr[0]
//$arr["a"]
数组的长度
count($arr)  或  sizeof($arr)
for($i = 0; $i < count($arr); $i++){

}
foreach($arr as $key => $value){//线性数组
  echo $key;  //线性数组下标 
  echo $value;//线性数组值
}
foreach($arr as $key => $value){//关联数组
  echo $arr[$kay];//关联数组值
  echo $a;    //关联数组值
}

php 代码与 html 代码混编（很常用 在php文件中 可以直接使用html代码 在<?php?>语法外边的会正常已字符串返回给浏览器）

浏览器与服务器的通信 （get请求 post请求）
get请求  （可以通过地址栏（url）向服务器发送请求 还能向服务器发送数据）
  协议://域名（ip）:端口/路径?键=值&...
  在PHP中有一个全局数组 $_GET 自动获取url中的参数 已键值对的形式
//<form action="./w.php" method="get">
    //<input type="text" name="ee">  name属性必须要有 否则 get方式获取不到参数
//</form>

post请求（不通过url 通过报文）
在PHP中有一个全局数组 $_POST 自动获取以post方式传过来的键值对 
 1.安全 2.url只能发送字符串，对于二进制数据不进行处理 所以url不恩传递文件 3.浏览器的不同，url的长度有不同的限制

if(){

}elseif(){ //在php中 if else if 必须 写成 elseif

}

表达式 有结果能输出的式子 echo 值 是表达式 例如 123 'asd'  （带;不是因为不能输出）

运算符 + * %  &&( and ) ||( or ) ! == === != !== <> > >= < <= () = new . 等 
//在php中 . 运算符用于拼接字符串 例如在JS中 'a'+'b' php中 'a'.'b'
//php中 .=   相当于js +=
函数的默认参数
  php 和 ES6 中 function(形参 = 默认值){}
  早期js只是通过短路运算模拟  function(a){var b = a || []} 


php中变量的作用域 （全局变量 局部变量 静态变量）

全局变量 函数外的变量就是全局变量  //在函数内部访问 global 声明一下变量 才可以使用
局部变量 函数内的变量（或函数参数）就是局部变量 只能在函数内使用 但可以 return
静态变量 static $name = 1; //静态变量 第一次执行的时候 被赋值 当函数在此被调用的时候 是在之前的基础上操作(静态变量站着内存不放 在php页面结束才会释放)
//类似 js 中的闭包 缓存数据 其中函数只执行了一次 数据只赋值了一次 在此调用return函数 是在之前的基础上操作 

值拷贝（复制 一个新的）在php中 数组默认也是 值拷贝 即改变一个不会影响另一个 

传地址（比喻 快捷方式） 需要使用 & 运算符
//$变量1 = & $变量2; 修改 $变量1, 等同于 修改 $变量2
//一般对于函数大块的数据传送的时候 使用引用 function 函数名(&$参数){}


//php 的内存回收机制（了解 ）
//1.内存泄漏（创建的对象占用了内存, 但是对象不见了, 内存还占着）
//2.内存溢出
// 在 php 的内部给每一个数据都提供了一个计数器 例如: $num = new Object();
// 此时在 php 的底层就会给 刚被创建出来的对象标记为 1
// 如果出现了赋值行为$variable = $num;, 则计数自动 +1
// 从新指向$num = null;那么对象的计数 -1
// php 底层会定期监视内存与对象的引用, 凡是 引用计数 为 0 的对象 就会找个时间删除


计算机通信与 http 协议
TCP/IP 协议保证了 数据可准确传输 在其基础之上有很多应用层协议
//http 协议是建立在 TCP/IP 协议基础之上的,不需要担心数据发送与接收的时候的安全等因素
//http 采用报文的形式进行数据的发送.一个完整 http 行为分为两个部分, 一个是请求, 一个是响应.
//http 传输的报文实际上就是一个字符串+数据.
// 请求的时候采用一个特定格式的字符串:
//     请求方法      url 地址        协议版本
//     请求头
//     空行
//     请求体
// 在一个请报文中, 详细的说明了我们的浏览器需要干什么, 而服务器再接收到这个请求报文后对
// 报文进行字符串解析, 给出相应的行为. 在服务器确定要做什么事情后, 会准备一个响应报文. 
// 将其传递给浏览器. 我们的浏览器再解析这个数据, 最终渲染显示页面.
// 响应报文采用的格式
//     协议本部      状态码       状态短语
//     响应头
//     空行
//     响应体

掌握http协议的： 协议版本, 状态码, 各种头, MIME 类型


请求头
// GET /20170913-php-basic-03/codes/10-referenceAndCopy/01-demo.php HTTP/1.1
// Host: t.com
// Connection: keep-alive
// Upgrade-Insecure-Requests: 1
// User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36
// Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
// Referer: http://t.com/20170913-php-basic-03/codes/10-referenceAndCopy/
// Accept-Encoding: gzip, deflate
// Accept-Language: zh-CN,zh;q=0.8

// POST /20170913-php-basic-03/codes/02-post/02-index.php HTTP/1.1
// Host: t.com
// Connection: keep-alive
// Content-Length: 19
// Cache-Control: max-age=0
// Origin: http://t.com
// Upgrade-Insecure-Requests: 1
// User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36
// Content-Type: application/x-www-form-urlencoded 编码方式吧form数据转换成一个字符串（name=1&value=2）然后把这个字符串加到url后面，用?分割
// Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
// Referer: http://t.com/20170913-php-basic-03/codes/02-post/01-index.html
// Accept-Encoding: gzip, deflate
// Accept-Language: zh-CN,zh;q=0.8

User-Agent:     一般用于判断浏览器的版本与类型（现在一般是判断是否为移动端 ）
Accept:         告知服务器, 我们的浏览器可以接受什么格式的数据,这个格式就是 MIME 类型
Referer:        告诉服务器, 我的当前请求是从哪一个页面过来的, 一般用于防盗链, 或请求追溯, 或统计 也可以校验这个防止CSRF攻击
Content-Length  告诉服务器我们传递了多少个字节的数据
Content-Type    告诉服务器我们传递的数据类型 // text/plain 纯文本


响应头
// HTTP/1.1 304 Not Modified    //200请求成功 302重定向 304缓存 404资源不存在 500服务器问题
// Date: Wed, 13 Sep 2017 09:01:59 GMT
// Server: Apache/2.4.27 (Win64) OpenSSL/1.0.2l PHP/5.6.31
// Connection: Keep-Alive
// Keep-Alive: timeout=5, max=95
// ETag: "1a4-55908bb87bd98"

// HTTP/1.1 200 OK
// Date: Wed, 13 Sep 2017 09:06:00 GMT
// Server: Apache/2.4.27 (Win64) OpenSSL/1.0.2l PHP/5.6.31
// Last-Modified: Wed, 13 Sep 2017 02:15:24 GMT
// ETag: "1a4-55908bb87bd98"
// Accept-Ranges: bytes
// Content-Length: 420
// Keep-Alive: timeout=5, max=94
// Connection: Keep-Alive
// Content-Type: text/html   //响应的文件类型(MIME)


用 php 来控制响应头只需要
header() 函数向客户端发送原始的 HTTP 报头。（不区分大小写）MIME 类型采用语法形式是 大类/小类 的格式
头补充
location 重定向
  header( "location: ./index.php" ); 
  //html实现重定向 meta标签   也是http响应在 解析html 渲染css 执行js 过程中发生 比http慢
  //js 实现 location.href 也是http响应在 解析html 渲染css 执行js 过程中发生 比http慢
  //php 通过htpp header("location: url");
Content-Disposition 下载文件
  header( "Content-Disposition: attachment; filename=????" );
  readfile("1.mp3"); //将文件读到缓存区 网页加载这个文件




php中方法输出时间
<?php date_default_timezone_set("Asia/Shanghai"); ?>
<?php echo date("Y-m-d H:i:s"); ?>


模拟注册
直接给表单 注册onsubmit //当submit按钮提交时对应的表单事件触发
在获取用户名判断  username.value.trim().length  //去一波 空白 还可以
readfile( "1.mp3" ); //该函数读入一个文件并写入到输出缓冲,若成功，则返回从文件中读入的字节数。若失败，则返回 false  一般配合content-type  MIME类型
sleep(); //函数延迟代码执行若干秒
filesize(); //函数返回指定文件的大小 字节数


如何查询函数
//（w3school 是一个很好的工具 ）
//php.net 官网提供的文档( 可以选择语言, 和 MDN 一样 )
字符串
1.循环每个字符
  $length = strlen($str);//获取字符串长度  考虑性能
  for($i=0;$i<$length;$i++){ 
    echo $str{$i}; // $str[$i]; 也是好使的
  }
$arr=str_split($str); //将字符串每个字符 放入数组 返回
2.删除字符串首尾空白或指定字符
  trim();    //去2边空白或指定字符单个字符 遇到不是停止向内
  ltrim("aba9ab9","ab");  //9ab9
  rtrim();
3.字符串转大小写
  strtolower();//所有字符转小写       js中 str.toLocaleLowerCase()
  strtoupper();//所有字符转大写       js中 str.toLocaleUpperCase()
  ucfirst();   //第一个字符转大写
  ucwords();   //每一个单词中第一个字符转大写
4.字符串url转码             解码
  (%dd 格式) rawurlencode();   rawurldecode();
  (+ 格式)   urlencode();      urldecode();
  // 注意在描述网络的 url 地址的时候, 空格字符应该采用 %dd 的格式进行转码，而 get 参数中的 空格应该使用 + 进行转码
  //js中 
  //转码  encodeURICompoment   encodeURI   escape
  //解码  decodeURICompoment   decodeURI   unescape
5.字符串比较
  //等值比较 == === 返回 true false
  大小比较 字典排序 按照第一个字符 ASCII码的顺序比较 相同继续往下一个字符找
  //ASCII 码
  // 前 32 个是不可见字符, 属于控制字符范畴 第 32 就是空格
  // 数字使用 48 表示 字符 '0', 49 表示字符 '1', ..., 57 表示字符 '9'
  // 大写字母从 65 开始, 65 表示的是 'A', 66 表示 'B', ...
  // 小写字母从 97 开始, 97 表示的是 'a', 98 表示 'b', ...
  js中 根据数字获取对应的ASCII 码 String.fromCharCode(127) //0-127
  strcmp($a,$b); 
  //$a>$b 返回大于0的数字
  //$a=$b 返回等于0的数字
  //$a<$b 返回小于0的数字
  strcasecmp('a','A'); //结果0 不区分大小写
6.字符串查找
  strstr("as12","s",false); //s12 从子字符串开始截取到最后 如果第3个参数为true 截取前面的 不包括本身 没找到返回false
  stristr("aS12","s"); //S12  不区分大小写
  substr($str,index,length); //截取子字符串       js中 str.substr(index,length)
  substr_count("abb","b"); //2  获取子字符串出现的次数 找“”报错
  substr_replace($str,$t,index,length); //替换一部分子字符串 js中 str.replace(/\d/ig,"a");  一点都不一样   替换的子字符串在第二个参数！！！
    substr_replace($str,"",index,length); //删除指定位置  相当于字符串中的splice
    substr_replace($str,"a",index,0);     //任意位置添加 （在index前）
  strpos("asd","sd",startindex); //1 获取子字符串对应的索引
  //如果子字符为空 报错     js中为0 
  //如果没找到   返回false  js中为 -1
  //str.indexOf("substr",startindex);
  strrpos(); //从右向左 倒序
7.字符串分割
  explode(",","1,2,3",3); //根据分割符转数组  第3个参数, 表示分割的数组有多少项, 实际项数小于理论分割的项数 后面的不分割  大于正常分    分隔符不能为""
  strtok("a b c"," "); 
  //逐一分割字符串 首次调用需要传递2个参数 再次调用仅用分隔符 
  //分割完成再次调用 返回false
  //如需分割一个新的字符串，再次调用带 string 参数的 strtok("string","split")
8.解析 url
  parse_url("http://t.com:80/..."); //返回 解析url 所构成的数组
9.翻转字符串
  strrev("123"); //321

数组 （其实线性数组 就是 索引为键的 关联数组！！！）
1.增加元素
  $arr[] = 'a'; //相当于js中 push()方法 在数组后面添加
2.析取
  list($a,,$b)=array(1,2,3);//用于在一次操作中给一组变量赋值
  //js ES6  var [a,b] = ["1","2"];
3.分割
  implode(); join();  //根据链接符 转字符串 可以 implode("",$str);空转数组
  array_chunk($arr,每一个数组的长度); //将数组转成2维数组 里面的每个数组长度 是第二个参数 不够长度的自己也是一个
  array_slice($arr,index,length);  //截取子数组
4.修改
  array_splice($arr,index,length,["a","b"] | "ab"); //删除数组中的元素，并用新数组元素取代它 $arr必须以 变量放入此方法中 不能以 []  ,  返回被删除的元素数组 此方法直接修改原数组
    array_splice($arr,index,0,["a","b"]); //在指定位置插入元素
    array_splice($arr,index,3);           //删除指定位置元素
5.提取 键 值
  array_keys($arr);     //提取 键 所构成的数组
  array_values($arr);   //提取 值 所构成的数组
  
  array_key_exists("age",$arr);   //检查数组中是否存在指定的键名 存在true 不存在false
  isset($arr["age"]); //检测变量是否 设置，并且不是 NULL 设置返回true
  empty();      //检测变量是否 没有设置,没设置  返回true  空字符串（""） 0 也返回true
  unset($a);//如果在函数中 unset() 一个全局变量，则只是局部变量被销毁 全局变量该是啥还是啥
6.判断
  in_array(4,$arr); //数组中有没有值 4 有true 没有false
7.排序
  升序     降序      自定义
  sort();  rsort();  usort();
  asort(); arsort(); uasort();
  ksort(); krsort(); uksort();

  //自定义 由小到大排序
  usort($arr,function($a,$b){
    return $a > $b;
  });
8.翻转
  array_reverse($arr);
9.合并
  array_merge($a,$b);
10.过滤
  array_filter($arr,function($e,$i){ //回调函数返回 true表示保留数据  返回过滤后的数组 不对原数组进行操作
    return $i
  },ARRAY_FILTER_USE_BOTH); //若想使用第二个参数 使用ARRAY_FILTER_USE_BOTH

  array_map(function($e){ //对数组中每个元素进行操作 ","转数组 通常用来构建二维数组
    return explode(",",$e);
  },$arr);

php中存储用户信息（使用二维数组 外层线性数组 内层关联数组）
$arr = array(//从逻辑上讲就是一个表格
  array("id"=>1,"name"=>"张三"),
  array("id"=>2,"name"=>"李四")
  );
传输过程  将数组转换成json字符串   $json_str = json_encode($arr);  
      将json字符串转换成数组   $arr = json_decode($json_str)


时间函数
1.设置时区    date_default_timezone_set("Asia/Shanghai");
2.当前时间戳  time();   //在JS中获取时间是毫秒 php中获取的是秒 
3.格式化当前时间 date("Y-m-d H:i:s");
// Y 四个年份字符
// y 两个年份字符
// m 月份
// d 日期
// H 二十四小时制
// h 12 小时制
// i 分钟
// s 秒
// r 用于响应头  主要人家就是这种格式的




//js中获取距离1970的毫秒值  +new Date();  (new Date()).getTime()

//html中给某个标签定义了id,在window环境中就可以直接通过id的值引用这个DOM元素。
//<img src="" id="img">  img.src="" 就可以引用 此时相当于生成了全局变量但是，不要使用这种写法，兼容性极差，而且容易污染全局

文件操作函数
$f = "c:/asd/123/as4g/a.txt";
  basename($f); //返回文件名全称 a.txt
    dirname($f);  //返回路径   c:/asd/123/as4g
    pathinfo($f); //返回文件各个部分所构成的数组 c除了上面2个 还有 extension 文件后缀名 txt    filename 文件名 a

    file_exists("./1.html"); //判断文件及路径是否存在 存在 true 不存在 false
    is_file("./1.html"); //判断文件及路径是否正确
    is_dir("./src");     //判断当前文件夹下路径是否正确

    filesize($f);   //返回文件大小 字节

    copy("1.txt","2.html"); //拷贝文件1.txt 命名为2.html
    mkdir("dir");  //创建文件路径 文件夹 ！！！
    readfile("./1.html"); //将文件读到缓冲区    ！！！
    realpath();    //返回绝对路径

    file("1.txt");   //将文件内容读取到数组里 数组中的每个单元对应文件中的每一行，包括换行符  失败返回false
    file_get_contents("./data.txt"); //将文件内容读到字符串 
    //在浏览器预览中只有<br>能看到换行效果 
    //  \n在查看源代码能看到效果 在element也可查看 与文件中手动敲的回车一致 
    file_put_contents("./data.txt","str"); //将内容写到文件中 会替换 

    define("F","./data.txt");//将文件设置为常量
    isset($a,$b); //检测变量是否有值，并且不是 NULL 。可以一起检测多个 只要有一个不满足条件 返回false

经验
   //php中 .= 是字符串拼接 //js中的 +=
   //html代码 input:button + tab 快捷写法
   //html代码 真对表单的 radio name属性一样 保证唯一 value属性 必须设置 用于区分值得不同
    
原始操作
  r, r+, w, w+, a, a+
  // r 是 read 的含义, 表示读取, 文件打开的时候 指针默认在文件开始的位置
  // r+ 表示既可以读取也可以写入, 写入的时候会覆盖原有数据
  // w 是 write 的含义, 表示写入, 文件打开的时候, 指针会在文件开始的位置
  // 注意以 w 的形式打开文件会对文件内容进行清除( 文件截断 )
  // w+ 表示可读可写
  // a 是 append 表示追加( 写 ), 文件打开的时候光标在文件结尾处. 表示可以往文件中追加数据
  // a+ 可写可读 
    $f = fopen('./file.txt','r+') //打开文件 建立文件的连接 必须先做这个操作才能继续别的操作 获取的是 文件句柄
    fread($f,10);     //文件句柄 读取10个字符
    fwrite($f,"str"); //写入
    fputs();    //写入字符串
echo fgetc($f); //读取一个字符 (在一行内的字符) 输出 读到没有 返回false
echo fgets($f); //读取一行 输出
    feof($f);   //判断结束 一行中没有可读的返回 true !!! 与众不同
    fclose($f); //关闭文件 

程序是运行在内存中的 文件是放在硬盘中的, 内存块, 硬盘慢
内存贵容量小，一般我们把大量文件放到硬盘中，用的时候加载到内存里
//原始的 文件访问 api 采用的是
//        1> 使用 fopen 建立文件的连接
//            fopen( 文件名, 打开方式 ) -> 文件句柄
//        2> 使用 函数 fgetc, fgets 来读取文件中的字符或一行字符串.
//            语法: fget*( 文件的句柄 ) -> 读取的结果
//        3> 可以使用 feof ( file end of file )函数来判断是否已经到达文件结尾
//            feof( 文件句柄 ) -> Bool
//        4> 使用 fclose 关闭文件
//            fclose( 文件句柄 )

会话机制（专门处理浏览器与服务器交互式身份验证的问题！！！）
//背景:服务器是提供服务的.由于http 协议无状态. 服务器不记得谁来过。
低端解决：
//浏览器在访问服务器的时候，服务器的响应头中可以带有一个 Set-Cookie，浏览器在接收到这个头，就会将这个值存储到当前浏览器的 cookie 中，浏览器再次请求的时候，请求头中就带有了cookie数据，服务器就可以验证了。
//缺陷： cookie是存储在浏览器的，所以cookie可以被读取、挪用和修改，别人就能够随意读取删改。
//其它伪装站点可能可以直接获取到你的cookie内容 不安全。
cookie 的操作（入门）
  注意 cookie 是以字符串（键=值）的形式存在的
-> 浏览器端 在控制台输出（Console）
    document.cookie          //3种查看方式 在控制台输入  在Application中也可查看 在chrome浏览器 设置中 有一个高级 内容 有一个cookie
    document.cookie="sex=1"; //设置 中文等字符需要转码 
    //cookie的存储不会覆盖 会累加 
    //在控制台一次只能赋一个值
    //直至浏览关闭或人为 清空
    在Application 右键Clear 可以直接清空所有cookie 不用关闭浏览器
-> 服务器端
    注意 cookie 存储在 浏览器中, 服务器不能直接操作 cookie
    获取 cookie 使用 $_COOKIE 这个数组
    //服务器读取 cookie 是因为 浏览器在发送请求的时候, 会将在浏览器中存储的 cookie 一并发出，所以服务器可以接收 cookie.
    设置 cookie  setcookie(key,value,time()+3600);//第3个参数为过期时间
    //服务器不能直接设置 cookie, 而是通过发送一个 set-cookie 的响应头, 命令浏览器保存这个 cookie.
    删除 cookie  setcookie(key,value,time()-3600);//通过设置cookie 的过期时间 为过去1小时 来删除 cookie

php中阻止代码继续运行
exit(); //用于直接结束 相当于函数中的return
die("<p>后面不会执行</p>"); //用于出现错误给出警告等,结束后面的代码. 强硬（死）

phpinfo();//php信息 用于查看 mysqli模块是否配好 

高端解决：
//在用户正确登录的时候
//php文件中sesseion_start();语句 随机的生成一份 PHPSESSID 数据, 随同响应头Set-Cookie 发送到浏览器,存储在浏览器的$_COOKIE['PHPSESSID']，在一定程度上验证用户 （服务器检测你已经有了PHPSESSID 是不会给你发送第2个PHPSESSID的）
//php文件中$_SESSION['id'] 进一步确定用户是谁 取出对应的数据
//在进行身份验证的时候 随时验证 $_COOKIE['PHPSESSID'] 和 $_SESSION['id'] 。(防止用户直接在浏览器更改cookie)
session 的操作 
1.如果要使用 session, 就先开启 session
    session_start();//.一旦开启了 session, 服务器就会自动的生成 PHPSESSID 并 响应头的形式(Set-Cookie)发回浏览器（ 自动的不用你操心 ） 
//（！！！在浏览器 $_COOKIE['PHPSESSID'] 中查看）
2.我们操作 session 的读写只需要操作 $_SESSION 数组即可
    设置 $_SESSION[ "键" ] = "值"; //进一步确定用户是谁 取出对应的数据 仅仅存储在服务器端 如何区分用户不需要关心
    获取 $v = $_SESSION[ "键" ]; 
3.如果不在使用 session 可以删除 session 中的数据 
  unset( $_SESSION[ "键" ] );//清除 $_SESSION['id']
  session_destroy(); //清除 $_SESSION['id']


COOKIE 高级特性 
//可以带有的特性：expires( 不推荐使用了 ), max-age, path, domain, secure( 不介绍 )
max-age   //cookie创建后几秒过期  秒为单位 生命周期
path    //cookie默认是在当前文件夹 及其以下可以访问到。 设置为  /  表示整个网站可以a访问 即根目录 配置服务器的DocumentRoot
domain    //两个域名的cookie是隔离（同源策略）跨域问题
//cookie 不允许在不同的域名下共享, 但是支持在不同的 二级, 三级 等域名下共享. 
//设置 domain = a.com 一级域名 ,可以在 一级, 二级...访问
//设置 domain = a.b.com 二级域名 ,可以在 二级, 三级...访问
在PHP操作 cookie 直接使用 setcookie(name,value,max-age,path,domain);

非常重要：!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
session_start();//一旦运行该语句 自动生成并向浏览器发送 浏览器的$_COOKIE[PHPSESSID]就有了随机的数
session_destroy();//清除不掉 $_COOKIE[PHPSESSID] 但是可以清除 曾经定义的 $_SESSION['id']
$_COOKIE['PHPSESSID']   //php中通过 session_start(); 自动发送随机码 存储在$_COOKIE['PHPSESSID']中 若没发送（首次访问）isset($_COOKIE['PHPSESSID']) 为false
$_SERVER['REQUEST_METHOD']=="POST" //访问页面时的请求方法 直接访问 或跳转访问均为GET 回调访问POST



<?php
引入外部PHP文件
可多次调用执行   指执行一次
include();        include_once('./php');    //一个文件存在错误的话，那么程序不会中断，而是继续执行，并显示一个警告错误
require();        require_once('./php');    //一个文件存在错误的话，那么程序就会中断执行了，并显示致命错误
// 重复使用的代码 可以单独用一个 php 文件写出来
// 将这个文件到如到 php 中导入以后,就像js的引入文件.

PHP面向对象
 // 面向过程 注重 过程 凡事都要亲力亲为
 // 面向对象 注重 结果 凡事都要对象来完成 万物皆对象 对象可以完成任何工作
特征: 抽象性,继承性,封装性,多态性


抽象性：//将具体的事物特征抽取出来 构成对象的属性和方法 由于具体项目要求不同 所抽象出的东西也不同，我们只需要关心我们需要的数据 这个就是抽象性。
封装性：//将复杂的算法屏蔽起来, 只提供简单的操作处理 封装到函数 在封装到对象

class Student{ //创建对象
  public $name; //类的内部外部,子类都可以访问
  private $age; //私有的,表示只允许在 类的内部 被使用
  protected $sex; //受保护的,即只允许在类的内部与子类的内部访问
  public function ($n){//利用方法对数据进行约束
    if(strpos($n,"赵")===0){
      $this->name = $n;
    }else{
      $this->name = "赵";
    }
  }
  public function ($a){
    $this->age = $a<10?0:$a;
  }
  public function f(){}
}
//实例化对象
$a = new Student();
$a->name = '赵琦'; //赋值
$a->f();  //在 类外部 调用方法


继承性: //原本就是减少代码的书写, 提高代码的复用, 重点为了实现多态
class 子类 extends 父类 {
  //子类 统称为 派生类
  //父类 统称为 基类
}
多态性：// 父类定义规则, 子类具体实现, 在实际开发中将子类对象赋值给父类的进行使用(装配)
// 使用的表现形式是父类的, 具体的执行是子类对象的, 从而 实现 统一调用, 不同的子类实例具有不同的结果响应.
class P{
  public function f(){}
}
class C extends P{
  public function f(){}//重写父类方法 覆盖
}
class A extends P{
  public function f(){}
}
$p = new P();
$C = new C();
$A = new A();
$p = $C; //装配
$p->f();


?>
数据库（ database ）
// 数据库管理系统( DBMS, database management system ). 
// 常见的管理系统
// mysql               -- 开源免费
// Oracle
// mssqlserver

数据库组织文件的方式 采用 表
// 数据库存放数据, 最主要的目的有存储数据, 检索数据.
// 数据库为了提高检索的效率, 为每一个 "特定的数据内容" 提供一个表格, 将专属的数据存储到对应的表格中.
// 一个数据库中可以有多张表，每一个表中可以有多条数据, 每一个表中存储的数据是同一种描述类型的. 
// 为了提高检索效率, 数据库还需要为每一个表中的数据 约定类型.
表中的每一个数据指标（列 ）, 有一个专有的术语, 被称为 字段( field )
在设置类型的时候, 就是在设置字段的类型。
表在设计的时候遵循一个原则, 就是尽可能减少数据的重复。
// 方案一：
//  编号   产品名         生产厂家名,         公司名
//   1     红烧面        北京工厂            方便公司
//   2     香辣面         天津工厂            方便公司
//   3     大骨面         北京工厂            大骨公司
可以将上述表格拆解为三个表格
    // 产品表
    // 编号  产品名字  厂家编号   公司编号
    // 1     红烧面      1         1
    // 2     香辣面      2         1
    // 3     大骨面      1         2
    
    // 厂家表
    // 编号  厂家名字
    // 1     北京工厂
    // 2     天津工厂
    
    // 公司表
    // 编号  公司的名字
    // 1     方便公司
    // 2     大骨公司
建议:设计表格 表格尽可能拆解 不要过度拆解（ 但是最好不要拆到只剩两个字段, 而且不要拆到只会使用一次数据 ）

主键: 是一个特殊的字段 目的是为了简单的标识数据。
特点：唯一 每一行都有这个值 有序递增的数字来表示。
外键：一个表中存储了另一个表的主键，那么我们称这个字段为该表的外键。

SQL语句（没有 sql 无数据操作）
// DDL 数据定义语言( 了解 ), 主要用于创建数据库, 创建表, 创建视图, 索引, 触发器, 存储过程等一些操作
// DML 数据操作语言( 重点 ), 将重点放在数据的增加, 删除, 查询与修改.
查阅文档 深入阅读的三篇 （数据类型, 函数与运算符, sql 语法）

整数类型
  int         //占4个字节 一般存储数量
  tiniyint  //占1个字节 一般表示 年龄等小的数据
  bigint    //占8个字符 一般存储id这样的标识
浮点数类型  （浮点数是不精确的数字, 一般用于非货币的小数内容）
  float     //
  double    //
精确类型  （一般用于表示钱）
  numeric   //numeric(15,14);表示有15个有效数字，期小数点可以有14位

时间
  datetime    //占8个字节 表示范围（1900.1.1-9999.12.31）
  timestamp   //时间戳 到2037年之前 代码中 NOW() 或CURRENT_TIMESTAMP 来获得当前时间 这两个函数等价
在 sql 语句中 常常使用 CAST 函数对 字符串转换成时间
例如: select CAST( '20170101111213' AS datetime );  

字符串类型
  char(length)  //固定长度的字符串
  varchar(10)   //表示有10个字节 可以存储0-10字节任意数据
  text      //存储大文本

查阅文档给出语法
// CREATE {DATABASE | SCHEMA} [IF NOT EXISTS] db_name
// [create_specification] ...
// create_specification:
// [DEFAULT] CHARACTER SET [=] charset_name
// | [DEFAULT] COLLATE [=] collation_name

// 1> 凡是直接写出来的 就是关键词必须提供的特性结构
// 2> 凡是大写字符串, 一般表示语法结构的内容, 必须按照语法默认书写
// 3> 凡是小写的, 或斜体的一般由用户提供.
// 4> 凡是 | 表示或者, {} 用于描述分组, 必须包含.
// 5> [] 表示用于描述分组, 可以选.
// 6> 在 代码中如果出现 ... 表示前面的内容可以重复出现, 如果是 ,... 表示前面的内容可以重复出现 用逗号隔开.
// 7> 在语法中, 用 [] 括起来的小写的斜体名字, 一般表示的是这里的语法很复杂, 另起一行描述. 一般就在下方
//     利用提供 = 或 : 或 := 来表示其含义.

软删除 isdelete tiniyint , 0 表示没有删除（默认）,1表示删除 //本质还是sql语句查询中的 WHERE 筛选的



1.增加数据
INSERT INTO 表名(列名,...) values(值,...),(值,...);
// 在增加数据的时候, 默认提供数据的列, 可以不用插入数据（有defalut的）
// 在创建表的时候, 如果使用了 NOT NULL 来修饰列值, 又没有提供默认数据, 那么必须添加数据
// 可以一次性添加多组
create database itcast; //创建数据库
use itcast;         //改变当前操作数据库
create table user( //创建表
  id bigint auto_increment primary key,
  uid varchar(30) not null,
  pwd varchar(20) not null,
  isdelete tinyint default 0,
  mytime timestamp default now()
);
insert into user(uid,pwd) value('z','1'); //增加数据

2.更新数据
update 表名 set 列名=值, ... where 条件;
注意, 切记不要省略 条件   

3.删除数据
delete from 表名 where 条件;

4.查找数据
SELECT  列名       // * 表示所有  
FROM    表名
WHERE   判断条件   // year(stutime)=1970 and month()  sql中判断用一个=号 多个约束条件 中间用 and or
// email='zq@123.com' and password='123456' // ''必须加

GROUP By 分组 
HAVING   判断条件
ORDER BY 排序

LIMIT          
// limit 10             显示0-10行
// limit 0, 10          显示0-10行
// limit 10 offset 0    显示0-10行
分页技术 limit (_page - 1) * _limit, _limit

表查询的执行过程:
先执行from 
在执行where 筛选
在执行limit 显示多少数据

group by 
having
roder by

最后执行 select
// 一条 sql 语句, 可以看成是一个対表进行不断筛选的结果显示过程. 每一个子过程都会对前一个子过程进行筛选.

GROUP BY 分组
// 语法: GROUP BY 字段或表达式
// 分组后数据不允许直接显示了 只能使用聚合函数操作 
// 聚合函数: 写在select后面
// count( 列名 )   出现的次数
// max( 列名 )
// min( 列名 )
// avg( 列名 )     平均值
// sum( 列名 )     

// GROUP BY 可以对上一个表结果进行 按列 或 按 表达式 进行分组, 分完组以后 只能得到 每组的一条数据.表示每一组只能使用这一个数据,其他数据不能直接使用.
HAVING 判断条件 
// 与 WHERE 子句语法结构一模一样. 它专门用于 GROUP BY 以后对新结构表数据的筛选 无group by 无 having

ORDER BY 排序
// 将 HAVING 得到的 临时表格进行排序, 利用给定的列名进行排序
// 如果代码中没有 HAVING 子句, 就是前面执行结果 得到的 临时表 进行排序

// 存储 id, money, datetime, ...
// 要求将三年内的所有销售金额进行汇总( 月 )
select avg(money),concat(year(datetime)."-".month(datetime) as time)
from user
where year(datetime)>yaer(now())-3 and isdel = 0
group by time
roder by time

条件判断的补充
1.对空的 判断: 字段 IS NULL, 字段 IS NOT NULL
2.对范围的判断: 字段 between 起始值 and 结束值
3.对数值离散范围的 判断: 字段 in( 值, 值, ... )  字段等于了其中一个值就给检索出来
4.模糊匹配( * ): 语法: 字段 like '%值%' 
   % 表示任意多个字符, 包括 0 个字符
   _ 表示一个字符
  在配合 printf("%%%d%%"); 等填坑时 注意 %% 表示一个% 防止冲突

// 查找
// SELECT id,pwd FROM user WHERE id=1 AND uid='zhaoqi'

// 更新
// UPDATE user SET pwd='2' WHERE id=2

// 删除
// DELETE FROM user WHERE id in(1,2,3)
//                         id like '%我%'
// 添加
// INSERT INTO user(uid,pwd) VALUE('zhaoqi1',1),
// ('liuying1',2),
// ('liusu1',3)


用php操作数据库（扩展来实现）
// -> 由于 php 是开源, 因此 php 中很多新的功能是利用扩展来实现的
// -> 要让我们的 php 支持 mysql 只需要开启扩展即可
// -> 开启扩展的方法( 用 php 操作 mysql 不止一个方案, 我们介绍的方案称为 mysqli )
// 1> 找到 php 的配置文件 php.ini
// 2> 搜索 extension=php_mysqli.dll 将其前的注释去掉
// 3> 搜索 extension_dir 将其赋值为 php 安装目录的 ext 文件夹 (window下的 改的第2个!!!)
// 4> 重启 apache , 使用 phpinfo 查看是否开启了 mysqli 的扩展
    

使用 mysqli 的函数来操作 mysql
$sql = mysqli_conect('127.0.0.1',用户名,密码,数据库名);//尽量不要用localhost 老慢了
// 连接到数据库, 如果连接成功, 返回一个数据的访问句柄, 如果失败返回 false
mysqli_select_db($sql, 数据库名字 );//更改连接的默认MySQL数据库 成功返回 true，失败返回 false
$reader = mysqli_query($sql,$str);//执行sql语句！！！曾删改查
mysqli_close($sql);//关闭与数据库管理系统连接

mysqli_connect_errno();//直接连接时 错误代码值，没有错误发生则返回0
mysqli_connect_error();//直接连接时 错误描述，没有错误发生则返回NULL
mysqli_errno($sql);//错误代码
mysqli_error($sql);//错误描述


// 不常用
// mysqli_error_list();//返回最近调用函数的错误列表
// mysqli_set_charset( connection, charset ) // 设置默认客户端字符集。
// mysqli_insert_id( connection ) // 返回最后一个查询中自动生成的 ID。使用自动增长计算

cmd 操作   （启动服务 services.msc）// 每个命令以分号结束
mysql -u root -p  //进入mysql
输入密码
show databases;   //显示 数据库 加s database + s !!!
use zhaoqi        //进入（切换） 数据库
show tables;      //显示 表 加s
select * from user where uid='' and pwd=''//多个限定查询
insert into user(uid,pwd) values('',''),('','');//多值添加 
update user set uid='g' where id=''//更新值
delete from user where id=''//删除 
set names gb2312  //解决cmd中 乱码

// 增加新用户 格式 grant 权限 on 数据库.* to 用户名@登录主机 identified by “密码” 
grant all privileges on *.* to 'zhaoqi'@'%' identified by '123456'; // all privileges 所有限权  * 所有数据库  '%' 能够在任何机器上登陆mysql
use nodejs;
// 创建表
create table pets (
    id varchar(50) not null,
    name varchar(100) not null,
    gender bool not null,
    birth varchar(10) not null,
    createdAt bigint not null,
    updatedAt bigint not null,
    version bigint not null,
    primary key (id)
) engine=innodb;

案例
// $create = <<< end
//     create table user3(
//     id bigint auto_increment primary key,
//     uid varchar(30) not null,
//     pwd varchar(20) not null,
//     isdelete tinyint default 0,
//     mytime timestamp default now()
//     );
// end;
// $str = sprintf("insert into user3(uid,pwd) values('%s','%s');","qweqwe","123123");//必须加单引号 要不没效果
// $sql = mysqli_connect('127.0.0.1','root','123456','zhaoqi');
// if(!$sql){
//     die("<p>".mysqli_connect_errno().":".mysqli_connect_error()."</p>");
// }
// $i = mysqli_select_db($sql,"zhaoqi");
// if(!$sql){
//     mysqli_close($sql);
//     echo "<p>".mysqli_errno($sql).":".mysqli_error($sql)."</p>";
// }
// $i = mysqli_query($sql,$create);
// if(!$sql){
//     mysqli_close($sql);
//     echo "<p>".mysqli_errno($sql).":".mysqli_error($sql)."</p>";
// }
// $i = mysqli_query($sql,$str);
// if(!$sql){
//     mysqli_close($sql);
//     echo "<p>".mysqli_errno($sql).":".mysqli_error($sql)."</p>";
// }
// echo "<h1>ok</h1>";
// mysqli_close($sql);

关于删除Mysql数据库
// 基本步骤
// 1> 关闭服务( 在 services.msc 管理器中我们要要看不到服务名字正在运行 )
// 2> 移除服务( 使用安装向导, 使用 mysqld 来移除服务: mysqld --remove )
//     有部分同学将服务关闭以后, 移除了文件, sc delete 服务名 在控制台中移除服务
//     // sc 是指 services control
//     // 刷新服务资源管理器, 确保移除
// 3> 删除数据库文件
//     C:/ProgramData/MySQL/MySQL Server 5.5/Data/
// 4> 再考虑删除数据库安装包的文件( 还要检查一下控制面板中删除部分是否残留文件 )
// 5> 重启计算机

利用 php 执行查询操作
// -> mysql 的查询结果会是神马样子?
// 数据查询的结果被称为 结果集. 
// 数据库查询数据得到的结果
// -> 可以是 一个 单值( 标量 ), 称为标量查询
select count( * ) from user;  //$arr[0] 获取的就是 行数
// -> 可以是 一列 数据( 列向量 )
select name from user;
// -> 可以是 一行 数据( 行向量 )
select * from user limit 1;
// -> 也可以是一个表结构( 表值结果集 ), 表( 值 )查询
// select * from user;

// -> 查询获得结果集
$reader = mysqli_query( $sql, $str );//执行sql语句
// $str语句中 是查询语句 SELECT * FROM user 等 返回一个 非空对象读取器（reader 对象）
// $str语句中 是 INSET INTO 等 返回 true false 表示成功与否
//mysqli_fetch_*( 读取器 ) 来读取一行结果集( 类似于 文件操作的指针行为 )
mysqli_fetch_row($reader);//( 一行 ) 返回线性数组
mysqli_fetch_assoc($reader);//( 一行 )返回关联数组, 键就是数据的字段名 ---求表头（array_keys） ---表体（foreach）
mysqli_fetch_array($reader);//将结果同时以线性数组与关联数组的形式返回, 当然可以提供第二个参数约定显示方式

mysqli_affected_rows();//返回前一次 MySQL 操作所影响的记录行数  
//> 0 的整数表示所影响的记录行数。0 表示没有受影响的记录。-1 表示查询返回错误。
// mysqli_insert_id();//返回最后一个查询中自动生成的 ID。使用自动增长计算
mysqli_free_result($reader);//释放$reader 阅读器对象

MD5 加密的问题
// MD5 是一个散列算法( 将一个字符串可以算出一个特殊的值, 这个值是随机不可逆的 )
// md5 算法 算出一个 固定的值, 主要源头一样, 值就一样, 源头不一样, 值可能一样
// 常常考虑到 md5 不可逆行, 来实现文件指纹的验证
// 常常也作为文件长传时 文件的 验证
// 我们的账户的安全体现在哪里
// 可以给 MD5 进行 加 "盐" 如密码+用户其他信息 在MD5加密 就算被破解也无法确定是什么

AJAX （异步的 javascript 和 xml）
特点：请求发出去了, 不会阻塞代码继续执行,响应回来了, 事件处理函数就会调用 ，页面也不会刷新。

线程
// 每一个程序, 其实分配了固定的内存. 每次停下的时候 会 记录在这个固定的内存的里面
// 再次运行的时候, 又会将这个数据从内存中取出来. 这样一个独立的内存结构, 被称为一个线程. 
多线程
// 所有在操作系统中引入了一个管理者的概念. 由这个管理者管理 CPU 的时间片.
// 计算机在多个线程间执行每一个程序的代码, 被称为多线程. 
js 是单线程 同步 , 浏览器第多线程的

使用ajax
 var xhr = new XMLHttpRequest();
 xhr.open('GET','./login.php?uid=1&pwd=2'); //GET方式 传递参数 直接写
 xhr.open('POST','./login.php'); //POST方式 传递参数 写在xhr.send()中
 xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');//POST方式 必须改变 请求头 服务器才能接受参数
 xhr.onreadystatechange = function(){ //表示响应已经回来了 写在xhr.send()前 提前做好接受准备 保险
  if(xhr.readyState==4 && xhr.status==200){
    xhr.responseText //js获取 php后台 以echo sprintf()  等 加入缓存区的 xhr.responseText 拿到的就是json字符串
    JSON.parse();  //js中 解码成JSON格式 [{},{},{}] 一维数组 每一项是 对象 
    //php中 echo json_encode($arr2); 编码2维数组  一维数组线性 二维数组关联
  }
 };
 xhr.send();
 xhr.send('uid=1&pwd=2');//POST方式 传递参数  没有 ? 直接写键值对


JSON.parse();//从一个字符串中解析出json对象 
//例如 JSON.parse('{"name":"huangxiaojian","age":"23"}'); --> {name: "huangxiaojian", age: "23"}
//单引号写在{}外，每个属性名都必须用双引号，否则会抛出异常
JSON.stringify();//从一个对象解析出标准的字符串 JSON.stringify({a:1,b:'\n'}); --> "{"a":1,"b":'\\n'}" \n并不会被解析成\n 字符串\n表换行 它会智能的转义转换成\\n


数字代表的状态 
// 0 － （未初始化）还没有调用send()方法 
// 1 － （载入）已调用send()方法，正在发送请求 
// 2 － （载入完成）send()方法执行完成，已经接收到全部响应内容 
// 3 － （交互）正在解析响应内容 
// 4 － （完成）响应内容解析完成，可以在客户端调用了 

ajax 发送的请求（GET POST） 都会伴随着 cookie 

form传统开发（一直是今天的主流 包括今天）
// 利用form表单发送请求，需提前将html部分与后台（php代码）混合编写到一起
// 满足某些条件触发（ 增加数据, 注册登录, 查询显示, ... ）

ajax开发方式
// 考虑代码级别的复用, 应该将后台的数据处理与界面显示进行分离
// 优势：
// 1.可以适配各种平台
// 2.给服务器降压( 传统模式上, 服务器除了要处理数据, 还要处理 html 字符串的生成 )
// 3.可以提升用户的体验( 看视频 发弹窗 无刷新 )
// 4.催生了一个新的产业( 数据提供产业 )
// 我们用 ajax, 首先是显示页面, 页面中一开始是没有数据的.
// 然后再页面加载后( 可以是自动的 onload 事件, 也可以是手动的, 例如百度的点击 输入框 )发出请求
// 要数据, 待数据请求回来以后, 再利用 DOM 操作, 将数据呈现到页面中.



var s = "var n = 10";
eval(s);//将s这个字符串 作为语句执行
console.log(s); //10

var kv = "{ \"name\": \"jim\", \"age\": 19, \"gender\": \"男\" }";
var kv = "{name:'jim',age:19,gender:'男'}";
var s = eval("("+kv+")"); //将字符串转对象
console.log(s); // {name: "jim", age: 19, gender: "男"}

封装AJAX
function ajax(o){
    var url = o.url,
    method = o.method || 'GET',
    data = o.data || null, //date可以以字符串 也可以以对象的形式
    fn = o.fn || null;
    if(data instanceof Object){ //考虑 typeof null 也为object  这里使用 instanceof
        var a = [];
        for(var k in data){
            a.push(k+'='+data[k]);
        }
        data = a.join('&');
    }
    var xhr = new XMLHttpRequest();
    xhr.open(method,url);
    if(method.toLowerCase()=='post'){
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    }
    xhr.onreadystatechange = function (){
        if(xhr.readyState==4 && xhr.status==200){
            if(fn instanceof Function){
                fn(xhr.responseText);
            }
        }
    };
    xhr.send(data);
}

通过ajax 请求xml文本内容 通过 xhr.responseXML;
通过ajax 请求php文本内容 通过 xhr.responseText;


模板引擎
<script src="template-web.js"></script>

<script type="text/template" id="tpl">
  <div>{{ name }}</div>
  <div>{{ sex.name }}</div>
    <div>{{@ string }}</div>
</script>
<script>
var html = template('tpl',{
  name:1,
  sex:{
    name:2
  },
  string:"<div>作为字符串 想要展示 前加@</div>"
})
</script>

填坑
{{ if x==1 }} check {{ /if }}

{{ x==1?'check':'' }}

表格填坑
 <table border="1" width="800">
    <tbody>
        {{ each arr v i }}
            <tr>
                <td>{{ i+1 }}</td> 
                {{ each v v1 i1}}
                <td>{{ v1 }}</td>
                {{ /each }}
            </tr>
        {{ /each }}
    </tbody>
</table>
<script>// JSON格式的二维数组 each 仍然可用
    var datas = [  
        {name: 'jim1', age:19, gender: '男' }, 
        {name: 'jim2', age:23, gender: '女' }
    ];
    var html  = template('tpl',{
        arr:datas
    });
    dv.innerHTML = html;
</script>


总结：
json_encode()  --- JSON.parse();  是几维就是几维 线性数组转[]  关联数组转对象







<script>
jsonp封装

服务器代码
 // $name = $_GET['callback'];
 // $arr = array(
 //   array("name"=>1),
 //   array("sex"=>1)
 //   );
 // $str = json_encode($arr);
 // echo "$name($str)";
js代码
  function jsonp(url,fn){ //
    var head = document.head;
    var fnName = 'jsonp'+Math.random().toString().replace('.','');
    var s = document.createElement('script');
    s.src = url+'?callback='+fnName; 
    window[fnName] = function(data){ //构建全局 隐式全局变量（window的一个子对象） 函数表达式
      fn(data);
      delete window[fnName];
      head.removeChild(s);
    };
    head.appendChild(s); //创建标签 向服务器发送请求 返回字符串函数 执行函数
  }

  jsonp('./index.php',function(o){
    console.log(o);// o直接就是2维数组
  });
</script>
<?php




jQuery中封装的ajax  
// PHP代码
 $arr = array( //自定义二维数组
        array(
            'name'=>'zhaoqi',
            'sex'=>1,
            'age'=>23
            ),
        array(
            'name'=>'liusu',
            'sex'=>2,
            'age'=>18
            )
        );
    header('Content-Type:application/json'); //通过jQuery封装的 需要改变响应头 这样在jQ获取的直接就是 二维数组 若不改变响应头 获取的是json字符串  在JS还要手动转 JSON.parse()
    echo json_encode($arr);

// js代码 ajax请求
$.ajax({
  type:'POST',   //默认GET
  data:'name=1', //可以设置字符串 或 对象{'name':1} 对GET POST 都有效
  dataType:'json', //设置为json可以强制转换获取到的数据为json格式 转换不了jQ内部屏蔽了报错 所以不会报错 设置jsonp即为跨域请求
  url:'./index.php?name=1', //GET方式直接传参 也可在data
  async: false, // 取消异步
  success: function(t){
    json //需要改变php响应头 直接返回2维数组
    JSON.parse(t) //自己转 2维数组
  }
});

// js代码  2种跨域方式
// jsonp 跨域
$.ajax({  
  url:'http://www.asd.com/index.php?name=1', 
  dataType:'jsonp', //jsonp  实现跨域
  success:function(t){
    JSON.parse(t) //自己转 2维数组
  }
});
header( "Access-Control-Allow-Origin: *" );// cors 跨域 简单 底本版浏览器不支持
$.ajax({
  url:'http://www.asd.com/index.php?name=1',//ajax是不能跨域的 但是给服务器的响应头添加 header( "Access-Control-Allow-Origin: *" );  就可以实现跨域
  success:function(){

  }
})


总结： 
ajax请求 不能跨域 js获取json数据的字符串

      
jsonp   能跨域 js获取json数据  
和 ajax 一点关系都没有  只能通过GET
本质 通过事件的发生 
1.发送callback值为随机函数名 服务器拼接 字符串函数 参数为json格式字符串
执行代码  利用js单线程 依次 删除 函数表达式 和 创建的script标签
2.动态创建script 利用其 下载执行 生成 全局 局部变量（window对象的属性） 函数表达式 （delete可删）

cors 低本版不支持 能通过GET POST
服务器响应头添加 header("Access_Control_Allow_Origin: * ");

jsonp 和 cors 无论是哪一种跨域方案, 必须保证服务器允许你请求数据, 否则还是不能够跨域

jQuery中 $.ajax方式响应的数据类型 xml html script json jsonp text
原生中的ajax响应的数据类型 只有2中 xml text 分别通过xhr.responseXML  xhr.responseText


传统 文件上传（必须设置file表单的name!!!）
// 1> 必须使用表单, 同时保证是 post 请求
// 2> 在 form 标签上添加一个属性 enctype="multipart/form-data"
// 3> 在表单中使用 <input type="file" name=""> 标签
// 4> 使用 submit 提交       
<form action="./" method="post" enctype="multipart/form-data">
  <input type="file" name="myfile"><br />
  <input type="submit">
</form>
//php代码
// $_FILES 是个2维数组 1维是name属性的值  
$n = $_FILES['myfile']['name']; //文件的名字 asd.jpg
$p = $_FILES['myfile']['tmp_name']; //文件在服务器上的绝对路径 
$f_end = explode('.',$n)[1];
$str = './hai/'.time().'.'.$f_end;
move_uploaded_file($p,$str);//将文件保存 绝对路径 新路径（带文件名！）

XHR2的新特性
// XHR1 受同源策略限制不能跨域,XHR2可以,CORS 
// XHR1 不能发送二进制文件(图片，视频等),XHR2可以发送接收 
// XHR1 无法实时获取进度信息,只能判断是否完成 XHR2发送和获取数据可以获取进度信息 
// XHR2可以设置请求的超时时间,新增forData对象支持发送表单数据！
设置过期时间  
// xhr.timeout = 1000; 请求的时间大于过期时间 请求无效 单位毫秒
XHR2上传文件 （不需要设置file表单的name!!!）
var f = document.getElementById('file'); //获取元素
var d = new FormData();  //最新规则中引入一个新构造函数为FormData
d.append('相当于表单提交name属性',f.files[0]); //使用append可以自己添加需要提交的数据
// file表单亲有一个属性为 files, 里面存储的文件信息. 使用 files[ 0 ]  拿到文件的数据

var xhr = new XMLHttpRequest();
xhr.open('POST','./');//上传文件必须保证POST提交
xhr.onreadystatechange = function(){};
xhr.send(d);//将数据放到send中
// js代码
// var f = document.getElementById('file');
// document.querySelector('button').onclick = function(){
//     var data = new FormData();
//     data.append('myfile',f.files[0]);
//     var xhr = new XMLHttpRequest();
//     xhr.open('POST','../06-uploadFile/02-index.php');
//     xhr.onreadystatechange = function(){
//         if(xhr.readyState==4 && xhr.status==200){
//             console.log(xhr.responseText);
//         }
//     };
//     xhr.send(data);
// };
// php代码
// $name = $_FILES['myfile']['name'];
// $dir = $_FILES['myfile']['tmp_name'];
// $geshi = explode('.',$name)[1];
// $str = './uploads/'.time().".".$geshi;
// move_uploaded_file($dir,$str);
// echo 'ok';

上传的进度（了解）
// 可以给 xhr 的 upload 绑定一个事件, 用于记录文件上传的进度
// 其中数据在 事件对象 e 中
// xhr.upload.onprogress = function ( e ) {
// console.log(  e.loaded / e.total * 100 + '%' );
// }

?>
</script>
<?php
// 阿里白秀项目
  
文件夹的部署关系
// -> 将前台页面放到网站的根目录( / )
// -> 将后台的页面放到 admin 文件夹下
// -> 考虑: 资源, css, js, 第三方的 js, 上传的图片
// 一般将所有的静态资源单独的放在一个文件夹中( static, assets, source, ... )在这个文件夹中, 对于 图片, css 与 js 还会再分
// css 直接放到 css 文件中
// js 可以考虑放到 js 文件夹中.
// 一般 第三方 的 js 会放到 lib 文件夹下 或 script, render 等.
// 图片也可以放在 img 等文件夹中
// 一般讲用户上传的资源放到 uploads 文件夹下

抽取数据与函数

文件一.定义常量
define('DB_HOST','127.0.0.1');
define('DB_USER','root');
define('DB_PASSWORD','123456');
define('DB_NAME','zhaoqi');

文件二.封装查询函数 是否登路过函数（登路过返回直接返回id）
function connect(){
  $sql = mysqli_connect(DB_HOST,DB_USER,DB_PASSWORD,DB_NAME);
  if(mysqli_connect_errno($sql)){
    echo "错误".mysqli_connect_error();
    exit();
  }
  return $sql;
}
//单值查询  数值 查询行数
function sql_value($str){
  $sql = connect();
  $reader = mysqli_query($sql,$str);
  $n = null;
  if($reader){
    $n = mysqli_fetch_row($reader)[0];
  }
  mysqli_free_result($reader);
  mysqli_close($sql);
  return $n;
}
//单行查询 一维数组
function sql_row($str){
  $sql = connect();
  $reader = mysqli_query($sql,$str);
  $arr = null;
  if($reader){
    $arr = mysqli_fetch_assoc($reader);
  }
  mysqli_free_result($reader);
  mysqli_close($sql);
  return $arr;
}
//表查询 二维数组
function sql_array($str){
  $sql = connect();
  $readere = mysqli_query($sql,$str);
  $arr2 = array();
  while($i=mysqli_fetch_assoc($reader)){
    $arr2[] = $i;
  }
  mysqli_free_result($reader);
  mysqli_close($sql);
  return $arr2;
}
//是否登路过函数（登路过返回直接返回id）
function is_login(){
  if(isset($_COOKIE['PHPSESSID'])){
    session_start();
    if(isset($_SESSION['id'])){
      return $_SESSION['id'];
    }else{
      header('location:/admin/login.php');
      exit();
    }
  }else{
    header('location:/admin/login.php');
    exit();
  }
}
//添加 成功返回 受影响行数 不成功返回0
function sql_insert($str){
    $sql = connect();
    $reader = mysqli_query($sql,$str);
    $row = 0;
    if($reader){
        $row = mysqli_affected_rows($sql);
    }
    mysqli_close($sql);
    return $row;
}
//更新（软删除） 成功返回 受影响行数 不成功返回0
function sql_update($str){
    $sql = connect();
    $reader = mysqli_query($sql,$str);
    $row = 0;
    if($reader){
        $row = mysqli_affected_rows($sql);
    }
    mysqli_close($sql);
    return $row;
}
//删除 成功返回 受影响行数 不成功返回0
function sql_delete($str){
    $sql = connect();
    $reader = mysqli_query($sql,$str);
    $row = 0;
    if($reader){
        $row = mysqli_affected_rows($sql);
    }
    mysqli_close($sql);
    return $row;
}



?>
