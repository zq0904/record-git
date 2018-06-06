$(function(){
	// 轮播图
	banner();
	// 工具提示
	$('[data-toggle="tooltip"]').tooltip();
	//tap回弹 需要保证以后增加li也能实现效果
	var sumWidth = 0;
	$('.overflow ul li').each(function(i,e){
		sumWidth += $(e).outerWidth(true);
	});
	$('.overflow ul').width(sumWidth+10)
	// 初始化
	new IScroll($('.overflow')[0],{
        scrollX:true,
        scrollY:false
    });
});
var banner = function (){
	$.ajax({
		url:'./js/data.json',
		type:'GET',
		data:'',
		dataType:'json',
		success:function(data){
			window.data = data;
			xuanran();//拿到数据在渲染
		}
	});

	function xuanran(){
		var isWidth = $(window).width()<768;
		$('.carousel-inner').html(template('banner',{
			list:data,
			is:isWidth
		}));
		$('.carousel-indicators').html(template('dian',{
			list:data
		}));
	}
	//测试 页面宽度发生变化时
	$(window).on('resize',function(){
		xuanran();
	});
};