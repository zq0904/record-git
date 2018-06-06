$(function(){
	// 区域滚动
	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	});
	// 获取地址栏中参数 渲染页面
	var id = Eve.getUrl().id;
	getDate(id,function(data){
			$('.mui-scroll').html(template('tpl1',data));
			$('.rotate').remove();
//都要要放到页面加载之后
		// 轮播图初始化 
		mui('.mui-slider').slider({
		  interval:500//自动轮播周期，若为0则不自动播放，默认为0；
		});
		// 尺码
		$('.cm span').on('tap',function(){
			if(!$(this).hasClass('now')){
				$(this).addClass('now').siblings().removeClass('now');
			}
		});
		// 数量
		var max_num = data.num; //获取的是数字类型
		$('.sl span').on('tap',function(){
			var num = $(this).siblings('input').val();
			if( $(this).hasClass('jian') ){
				num--;
			}else if( $(this).hasClass('jia') ){
				num++;
			}
			if(num<0 || num>max_num){
				setTimeout(function(){
					mui.toast('超出可选范围',{ duration:500, type:'div' })
				},100);
				return false;
			}
			$('.sl input').val(num);
		});
		// 加入购物车
		$('.jr_cart').on('tap',function(){
			if( !$('.cm span.now')[0] ){ //JQ选择器一定是存在的 [0] 没找到 undefined
				mui.toast('请选择尺码');
				return false;
			}
			var cm = $('.cm span.now').html();
			var val = $('.sl input').val();
			if( val<=0 ){
				mui.toast('请选择数量');
				return false;
			}
			Eve.login({
				url:'/cart/addCart',
				type:'POST',
				data:{
					productId:id,
					num:val,
					size:cm
				},
				dataType:'json',
				success:function(data){
					if(data.success==true){
						mui.confirm('添加成功，去购物车看看？','温馨提示',['是','否'], function(e) {
							if (e.index == 0) { //点 是
								location.href = Eve.cartUrl;
							} else {
								//点 否
							}
						});
					}
					
				}

			});
		});


	});

});
// 真对详情页 根据ID就行了
var getDate = function (id,fn){
	$.ajax({
		url:'/product/queryProductDetail',
		type:'GET',
		data:{
			id:id   //必须以对象形式传入 否则nmp挂掉
		},
		dataType:'json',
		success:function(data){
			setTimeout(function(){ //模拟加载
				fn && fn(data);
			},1200);
		}
	});
}