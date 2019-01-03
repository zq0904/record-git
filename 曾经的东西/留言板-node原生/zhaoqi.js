var http = require('http');
var fs = require('fs');
var url = require('url');
var template = require('art-template');
var comments = [
	{name:'刘莹',
	message:'今天没吃早饭',
	time:'2017-11-03 01:13:14'}
];
// node.js一执行 所有访问留言板目录下的文件都要经过zhaoqi.js的处理
http.createServer(function(req,res){
	var obj = url.parse(req.url,true); //解析 请求地址 加true obj.query 直接就是json格式
	var p = obj.pathname; //路径名
	if(p==='/'){ //访问主页
		fs.readFile('./views/index.html',function(error,data){
			if(error){
				return res.end('404');
			}
			var html = template.render(data.toString(),{comments:comments});//模板渲染
			res.end(html);
		});
	}else if(p.indexOf('/public')===0){ 
	//访问主页时 浏览器从上到下解析遇到src href 等在次访问 public目录下的文件
	//统一控制 这也意味 链接 都要已 / 开头 要不根本匹配不上
		fs.readFile('.'+p,function(error,data){ //读文件 都是该文件去读的 使用的都是相对路径
			if(error){
				return res.end('404');
			}
			res.end(data);
		});
	}else if(p==='/post'){ //评论
		fs.readFile('./views/form.html',function(error,data){
			if(error){
				return res.end('404');
			}
			res.end(data);
		});
	}else if(p=='/tijiao'){ //提交评论
		var o = obj.query;
		o.time = '2017-12-13 66:66:66';
		comments.unshift(o);
		res.statusCode = 302; //重定向
		res.setHeader('location','/');
		res.end();
	}else{ //没有的给404
		fs.readFile('./views/404.html',function(error,data){
			if(error){
				return res.end('404');
			}
			res.end(data);
		});
	}
}).listen(3000,function(){
	console.log('成功')
});