$(function(){
	// 点击确定  
	$('.btn').on('tap',function(){
		// 表单序列化 表单控件 必须有name属性     name=1&sex=2
		var data = $('form').serialize();
		var o = Eve.getForm(data); //转换
		// 简单验证
		if(!o.username){
			mui.toast('请输入用户名',{ duration:500, type:'div' });
			return false;
		}
		if(!o.password){
			mui.toast('请输入密码',{ duration:500, type:'div' });
			return false;
		}
		// 不为空  发送AJAX请求
		$.ajax({
			url:'/user/login',
			type:'POST',
			data:o,
			dataType:'json',
			success:function(data){
				if(data.success==true){
					// 成功登录
					var url = location.search.replace('?returnUrl=','');
					if(url.length){
						location.href = url;// 返回
					}else{
						location.href = Eve.indexUrl; // 到首页
					}
				}else if(data.error){
					mui.toast(data.message,{ duration:500, type:'div' });
				}
			}
		});


	});

});