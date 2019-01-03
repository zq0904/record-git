$(function(){
	// 区域滚动
	mui('.mui-scroll-wrapper').scroll({
		indicators:false
	});
	//默认渲染 页面 被默认下拉刷新替代
	// Eve.login({
	// 	url:'/cart/queryCartPaging',
	// 	type:'GET',
	// 	data:{
	// 		page:1,
	// 		pageSize:100
	// 	},
	// 	dataType:'json',
	// 	success:function(data){
	// 		$('.mui-table-view').html(template('li',data));
	// 	}
	// })
	// 删除购物车 事件委托
	$('.mui-table-view').on('tap','.mui-icon-trash',function(){
		var that = this;
		mui.confirm('您确认是否删除该商品？', '商品删除', ['确认', '取消'],function(e){
			if(e.index==0){
				Eve.login({
					url:'/cart/deleteCart',
					type:'GET',
					data:{
						id:$(that).attr('data-id')
					},
					dataType:'json',
					success:function(data){
						if(data.success == true){
							// 没有必要重新加载一次页面 因为数据库肯定已经改了 为了减少访问次数 直接在DOM中删除元素 
							$(that).parent().parent().remove();

							jin();
						}
					}
				});
			}
		});
		
	})
	// 编辑按钮 事件委托
	$('.mui-table-view').on('tap','.mui-icon-compose',function(){
		// 获取尺码数量 通过ID获取 修改数据 直接根据ID 重载 也根据ID
		var $this = $(this);
		var id = $(this).siblings().attr('data-id');
		var row = Eve.getRow(window.data.data,id); //核心所在 全局的暂存对象 每行
		var html = template('cm',row);
		mui.confirm(html.replace(/\n/g,''), '商品编辑', ['确认', '取消'],function(e){
			if(e.index==0){//点击确认
				var cm = $('.cm span.now').text();
				var sl = $('.sl input').val();
				Eve.login({
					url:'/cart/updateCart',
					type:'POST',
					data:{
						id:id,
						size:cm,
						num:sl
					},
					dataType:'json',
					success:function(data){
						if(data.success==true){
							// 更改 全局的暂存对象
							row.size = cm;  //因为 计算金额使用 window.data.data 所以 要更改 暂存对象
							row.num = sl;
							//渲染 因为计算金额 不切实际
							// $('.mui-table-view').html(template('li',window.data));
							$this.parent().siblings().find('.x_m').html(cm);
							$this.parent().siblings().find('.s_l').html('X'+sl+'双');
							
							jin();
						}
					}
				})
			}else{

			}
		});
	})
	//尺码 选择 事件委托
	$('body').on('tap','.cm span:nth-child(n+2)',function(){
		$(this).addClass('now').siblings().removeClass('now');
	});
	//数量 选择 事件委托
	$('body').on('tap','.sl span',function(){
		var $this = $(this);
		var $input = $this.siblings('input');
		var productNum = $input.attr('data-productNum');
		var text = $input.val();
		if($this.hasClass('jia')){
			text++;
			if(text>productNum){
				mui.toast('库存不足！');
				return false;
			}
			$input.val(text);
		}else if($this.hasClass('jian')){
			text--;
			if(text<1){
				mui.toast('至少选择一件');
				return false;
			}
			$input.val(text);
		}
	});

	// 选中checkbox 计算 订单总额
	$('body').on('change','[type="checkbox"]',function(){
		jin();
	});
	//计算金额
	function jin(){
		var sum = 0;
		$(':checked').each(function(i,e){
			var id = $(e).attr('data-id');
			var row = Eve.getRow(window.data.data,id);
			var price = row.price;
			var num = row.num;
			sum += price * num;
		});
		$('.shengcheng .l span').html( (Math.floor(sum*100)/100).toFixed(2) );
	};
	







// 下拉刷新 假设做的是没有分页的 一页就能都装下
	mui.init({
	  pullRefresh : {
	    container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
	    down : {
	      auto: true,//可选,默认false.首次加载自动下拉刷新一次
	      callback :function(){
	      	var that = this;
	      		Eve.login({
					url:'/cart/queryCartPaging',
					type:'GET',
					data:{
						page:1,
						pageSize:100
					},
					dataType:'json',
					success:function(data){
						window.data = data; //通过缓存数据 实现 只绑定一个自定义属性ID 就可以找到 对应每行数据
						console.log(data)
						setTimeout(function(){
							$('.mui-table-view').html(template('li',data));
							that.endPulldownToRefresh(); //停止下拉刷新
							// 点击刷新按钮  刷新
							$('.mui-icon-loop').off('tap').on('tap',function(){
								that.pulldownLoading();
							});
						},500);
					}
				})
	      } 
	    }
	  }
	});





});