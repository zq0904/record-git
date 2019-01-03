$(function(){
	window.Eve = {};
	//获取当前页面 地址栏中的参数 已对象的形式  "?key=1&name=2"
	Eve.getUrl = function (){
		var o = {};
		var s = location.search;
		if(s){ //优化
			s = s.replace('?',''); //replace不会对原有字符做修改
			s.split('&').forEach(function(e,i){
				var a = e.split('=');
				o[a[0]] = a[1];
			});
		}
		return o;
	}
	//转换 serialize 表单序列化 函数
	Eve.getForm = function(p){
		var o = {};
		var a = p.split('&');
		a.forEach(function(e,i){
			var arr = e.split('=');
			o[arr[0]] = arr[1];
		});
		return o;
	};
	// 公用 绝对路径
	Eve.loginUrl = '/zhaoqi-m/user/login.html';
	Eve.cartUrl = '/zhaoqi-m/user/cart.html';
	Eve.indexUrl = '/zhaoqi-m/index.html';

	// 验证是否登路过的 ajax请求
	Eve.login = function (p){
		$.ajax({
			url:p.url || '#',
			type:p.type || 'get',
			data:p.data || '',
			dataType:p.dataType || 'json',
			success:function (data){
				if(data.error==400){
					location.href = Eve.loginUrl+'?returnUrl='+location.href;
				}else{
					p.success && p.success(data);
				}
			},
			error:function(){
				mui.toast('服务器内部错误',{ duration:500, type:'div' });
			}
		});
	};
	// 根据ID查找每一行数据
	Eve.getRow = function(arr,id){
		var o = null;
		arr.forEach(function(e,i,a){
			if(e.id == id){
				o = e; 
			}
		});
		return o;//返回这行元素
	}


});