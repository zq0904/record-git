$(function(){
	// 区域滚动
	mui('.mui-scroll-wrapper').scroll({
		scrollY: true,
		indicators: false,
		deceleration: 0.0005 
	});
	// 默认一级查询分类   就一次
	$.ajax({ 
		url:'/category/queryTopCategory',
		type:'get',
		data:'',
		dataType:'json',
		success:function(data){
			$('#guan').html(template('tpl',data));// 渲染一级查询分类
			
			var id = $('#guan .now').attr('data-id'); //默认二级查询分类   就一次
			xuanran2(id);
		}
	});
	// 二级查询分类
	$('#guan').on('tap','a',function(){
		if( $(this).hasClass('now') ) return false;
		$(this).parent().parent().find('a').removeClass('now');
		var id = $(this).addClass('now').attr('data-id');//获取数据
		xuanran2(id);
	});
});

// 渲染二级查询分类
function xuanran2(id){
	$.ajax({
		url:'/category/querySecondCategory',
		type:'GET',
		data:{
			id:id
		},
		dataType:'json',
		success:function(data){
			$('#content').html(template('tpl2',data));
		}
	});
}


// {total: 5, rows: Array(5)}
// rows: Array(5)0: {id: 1, categoryName: "运动馆", isDelete: 1}
// 1: {id: 2, categoryName: "女士馆", isDelete: 1}
// 2: {id: 3, categoryName: "男士馆", isDelete: 1}
// 3: {id: 4, categoryName: "帆布馆", isDelete: 1}
// 4: {id: 5, categoryName: "户外管", isDelete: 1}
// length: 5__proto__: Array(0)total: 5__proto__: Object