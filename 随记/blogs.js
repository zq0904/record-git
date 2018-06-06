Hexo https://hexo.io/ 简单地、轻量地、基于Node.js的一个静态博客框架
// 特性: Hexo基于Node.js，支持多进程，几百篇文章也可以秒生成
//       支持GitHub Flavored Markdown和所有Octopress的插件
//       Hexo支持EJS、Swig和Stylus 通过插件支持Haml、Jade和Less
// 前提: 需要安装node npm
npm install hexo -g // 安装Hexo
npm update hexo -g // 更新Hexo到最新版
hexo init // 初始化
hexo s // hexo server
https://localhost:4000/ 访问
Ctrl + C 停止服务器
hexo new "zhaoqi" 新建文章 在source/_posts目录找到并编辑.md文件

署到github
创建github仓库 其中 Repository name 必须是 ( 你的用户名 + github.io ) 这种格式 !!!!!!
在根目录下全局配置文件 _config.yml ( 参数: 后面必须留有一个空格 否则会出现语法错误 )
deploy:
  type: git # 部署类型
  repository: git@github.com:zq0904/zq0904.github.io.git # 部署的仓库的SSH
  branch: master # 部署分支
  message: update # 默认类型

npm install hexo-deployer-git --save // 安装部署的包
hexo d // hexo deployer
http://zq0904.github.io 即可访问
每次新建文章后 完成编辑 把新的文章部署到服务器上
hexo clean // 清空缓存
hexo g // 生成静态网页
hexo d // 部署到github
hexo s debug // 本地调试

优化主题
git clone https://github.com/iissnan/hexo-theme-next themes/next // 在根目录下安装主题到themes目录下
theme: next // 主题目录名 在themes下 在全局配置文件：_config.yml
hexo s -- debug // 在没有部署到github上之前 都可以这样在本地进行预览 http://localhost:4000
添加rss和sitemap功能
npm install hexo-generator-feed
npm install hexo-generator-sitemap
添加本地搜索功能 swiftype添加站内搜索 注册账号 按照步骤选择自己喜欢的搜索样式 配置完成后 选择install
// 没弄明白。。。
// <script type="text/javascript">
//   (function(w,d,t,u,n,s,e){w['SwiftypeObject']=n;w[n]=w[n]||function(){
//   (w[n].q=w[n].q||[]).push(arguments);};s=d.createElement(t);
//   e=d.getElementsByTagName(t)[0];s.async=1;s.src=u;e.parentNode.insertBefore(s,e);
//   })(window,document,'script','//s.swiftypecdn.com/install/v2/st.js','_st');
//   _st('install','7Qoo1zkKbfSsp5bzUjQu','2.0.0');
// </script>
// 复制install 到 2.0.0之间的代码 添加到全局配置文件里
// # 搜索插件 hexo-generator-sitemap
// swiftype_key: 7Qoo1zkKbfSsp5bzUjQu
博客中添加图片功能
post_asset_folder:true // 全局_config.yml
npm install https://github.com/CodeFalling/hexo-asset-image --save // 根目录
下载完成插件后 再创新的建博客时 不光生成.md文件 还同时生成一个同名的文件夹 将图片复制到同名的文件夹中
![](文件夹名/图片名.png) // 代码


Next主题的优化
根目录/themes/next next的配置文件 _config.yml
hexo new page tags // 添加标签页 对应的/source/tags/index.md
hexo new page categories // 添加分类页
hexo new page about // 添加关于页
.md文档 编辑
title: tags
date: 2018-03-03 23:08:26
type: "tags" // 设置页面的类型
comments: false // 用来控制是否显示评论
<iframe> // 网易云音乐 生成外链播放器 <iframe> 直接写在.md文档中

自定义css文件位置
F:\zq\Hexo\themes\next\source\css\my.css
自定义js文件位置
F:\zq\Hexo\themes\next\source\js\src\my.js
自定义模板html文件位置
F:\zq\Hexo\themes\next\layout\_layout.swig
