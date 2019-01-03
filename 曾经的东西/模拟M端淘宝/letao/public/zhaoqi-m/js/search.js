$(function(){
	// 搜索
	$('.search form a').on('tap',function(){
		var text = $(this).siblings().val().trim(); //获取数据
		if(!text.length){ //优化
			mui.toast('请输入关键字',{ duration:500, type:'div' }); 
			return false;
		}
		//先重定向 后面代码仍会运行
		location.href = 'searchList.html?key='+text;
		// 添加数据
		var a = JSON.parse( localStorage.getItem('list') || '[]' );
		var b = a.some(function(e,i){ //一个满足 就为true
			return e == text;
		})
		if(b)return false; //相同返回
		a.push(text); //localStorage中追加
		localStorage.setItem('list',JSON.stringify(a)); 
		xuanran();
	})
	// 页面渲染
	function xuanran(){
		$('.ulList').empty(); //先清空
		var a = JSON.parse( localStorage.getItem('list') || '[]' ); //获取数据
		if(a.length==0) return false; //优化
		$('.ulList').prepend('<li><a href="javascript:;"><strong>清空历史记录</strong></a></li>');//清空追加
		a.forEach(function(e,i){
			$('.ulList').prepend('<li><a href="javascript:;">'+e+'</a><span data-id="'+i+'">删除</span></li>');
		});
	}
	// 默认页面渲染一次
	xuanran();
	// 光标聚集时 显示
	$('.search form input').on('focus',function(){
		$('.ulList').show();
	}).on('blur',function(){
		$('.ulList').hide();
	})
	// 删除
	$('.ulList').on('tap','span',function(){
		var a = JSON.parse( localStorage.getItem('list') || '[]' );
		a.splice($(this).attr('data-id'),1);
		localStorage.setItem('list',JSON.stringify(a));
		xuanran();
	});
	// 清空
	$('.ulList').on('tap','strong',function(){
		localStorage.clear();
		xuanran();
	});
	// 点击添加
	$('.ulList').on('tap','a',function(){
		$('.search input').val($(this).html());
		$('.ulList').hide();
	});
});
