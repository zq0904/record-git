# interview

## 总结
### 描述： h-admin-pc重构 对 猎头管理下 正式用户 认证不通过用户 禁用登录用户 删除用户 禁用用户 模块的改版 优化了操作日志 审核记录 （技术栈 react + raect-router-dom + mobx ）
### h-admin-pc重构 自己写了一个react脚手架 实现了...功能 手写admin核心库（包含了 节流防抖 订阅和发布模式 日期格式化 queryString 等常用方法）
### 解决antd form过大的性能问题
### 多次分享 Webpack原理 Vue原理 router原理
### 优选猎头 信用分 Boos认证 h5动态分享优化 html2canvas实现长按保存图片等功能
### 非凡hunter2018 实现原生路由 html2canvas实现下载海报 封装基本图片加载Promise实现下载海报优化
### 谷露项目 使用 pastMessage 跨ifram 通信

`
1. 拥有React、Vue项目开发经验，理解MVVM开发模式，熟练掌握SPA开发流程
2. 熟练使用ES6语法，理解Promise、Async、Awai异步解决方案
3. 熟悉TypeScript
3. 理解vue双向绑定原理 router原理 webpack原理
4. 熟练使用React及其相关框架（create-react-app、react、mobx、classnames、AntD、sass）
5. 熟练使用Vue及其相关框架（vue-cli、vue、vue-router、vuex、axios、Element、sass）
6. 拥有自己写的核心库 脚手架

1. 熟练使用html css js根据ui提供的设计稿，快速搭建符合w3c标准的页面结构
2. 对三层架构、性能优化有一定理解，能够解决常见的兼容性问题，有着良好的代码编写习惯
3. 熟练使用ajax发送异步请求从后台获取json格式数据，按需动态渲染页面
5. 熟练使用基础类库及ui框架，如jquery、zepto、bootstrap、Element、AntD等
6. 熟悉常见插件及工具库，如echarts、lodash、moment、animate.css、ejs等
7. 熟练使用多种布局方案（流式布局、rem布局、flex布局、响应式布局），能够使用媒体查询做部分兼容处理
7. 熟练使用和理解jsonp跨域、doman跨域、nginx反向代理、cors等跨域访问方式，理解cookie和session机制
10. 理解JavaScript高级特性（oop、继承、原型链、闭包等）

12. 熟悉Mac开发环境及工具 如基本的linux操作 SwitchHosts、Charles、Postman、Sketch、Ps
13. 熟练使用Sourcetree + git进行代码版本管理，了解SVN
14. 熟练使用json-server mockjs等接口类测试工具模拟后台数据 Browsersync浏览器同步测试工具 tinypng压缩等工具
15. 熟悉Nodejs，Express框架，熟悉MySQL数据库
16. 熟练的使用vsocde 结合 node的--inspect-brk 进行node调试
17. 熟悉docker docker-compose

18. 个人随笔 https://github.com/zq0904/record-git/tree/master/%E9%9A%8F%E8%AE%B0
16. 拥有自己的ubuntu服务器 使用pm2做自动部署

14. 熟练使用npm、yarn、webpack，了解Gulp等构建工具，能够与后端协商设计出           规范的目录结构




工作经历
2015.4-2017.11 公司名称：长春南北科技技术有限公司     部门岗位：研发部  Web前端开发工程师
              工作描述：
              1.根据业务需求，完成前端代码编写工作，分析并给出最优的前端结构解决方案
              2.负责前端页面开发，根据UI设计师的设计稿，高度还原psd图，完成效果展示
              3.配合后端工程师一起研讨技术实现方案，实现后台数据交互
              4.理解和分析网站结构，优化架构标准，不断打磨网站的性能，并保持良好兼容
              5.与项目组内同事保持良好沟通，稳步推进项目进度，保证产品质量
              6.产品测试，撰写产品说明书，整理产品本版需求、归档
2014.7-2015.3 公司名称：长春明思软件技术有限公司     部门岗位：网络部  Web前端开发工程师
              1.负责少量平面广告设计
              2.完成静态页面布局、样式编写
              3.使用JS、Jquery实现页面动态效果和事件绑定
              4.对已上线的项目进行定期维护































# call apply bind原理 模拟实现 (主要考对this的理解)
```javascript
  Function.prototype.myCall = function (context, ...args) {
    context = context || window
    context._fn = this
    const res = context._fn(...args)
    delete context._fn
    return res
  }
  Function.prototype.myApply = function (context, args) {
    context = context || window
    context._fn = this
    const res = context._fn(...args)
    delete context._fn
    return res
  }
  Function.prototype.myBind = function (context, ...args) {
    context = context || window
    context._fn = this
    return () => {
      const res = context._fn(...args)
      delete context._fn
      return res
    }
  }
  // 使用
  const fn = function (...args) {
    console.log(this, ...args)
  }
  fn.myCall({ a: 1 }, 1)
  fn.myApply({ a: 1 }, [1])
  const fnc = fn.myBind({ a: 1 }, 1)
  fnc()
```










`