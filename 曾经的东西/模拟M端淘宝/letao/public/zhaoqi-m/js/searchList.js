$(function(){
	/*区域滚动*/
	mui('.mui-scroll-wrapper').scroll({
		indicators: false, //是否显示竖向滚动条
	});
//一 重定向到本页面 获取地址栏中数据 查询字查询
	// proName 当前产品 查询字
	window.proName = decodeURIComponent(Eve.getUrl().key || ''); //从地址栏拿数据 需解码
	var $input = $('.search form input').val(proName); //input中放数据
	//默认 查询字查询
	getData({
		proName:proName,
		page:1,
		pageSize:4
	},function(data){
		$('.shangpin ul').html(template('tpl1',data));
	});

//四 点击上架时间等 默认升序 再次点击降序
	$('.shangjia a').on('tap',function(){
		var $this = $(this); //优化
		if($this.hasClass('now')){
			$this.find('span').toggleClass('fa-angle-down fa-angle-up'); //span 上下
		}else{
			$this.addClass('now').parent().siblings().find('a').removeClass('now')
			.find('span').removeClass('fa-angle-up').addClass('fa-angle-down'); //a颜色 重置其他a颜色 span下
		}
		//功能查询
		var o = {
			proName:proName,
			page:1,
			pageSize:4
		};
		var name = $('.shangjia a.now span').attr('data-name');
		o[name] = $('.shangjia a.now span').hasClass('fa-angle-down')?2:1;
		getData(o,function(data){
			$('.shangpin ul').html(template('tpl1',data));
		});
	});
//三 点击搜索 1.功能查询+查询字查询 2.关联localStorage
	$('.search form a').on('tap',function(){
		var text = $(this).siblings().val().trim(); //获取数据
		if(!text.length){ //优化
			mui.toast('请输入关键字',{ duration:500, type:'div' }) 
			return false;
		}
		window.proName = text; //变更当前产品 查询字 ！！！
		//功能查询
		var o = {
			proName:proName, //从搜索框中获取的
			page:1,
			pageSize:4
		};
		var name = $('.shangjia a.now span').attr('data-name');
		o[name] = $('.shangjia a.now span').hasClass('fa-angle-down')?2:1;
		getData(o,function(data){
			$('.shangpin ul').html(template('tpl1',data));
		});
		// 关联localStorage
		var a = JSON.parse( localStorage.getItem('list') || '[]' );
		var b = a.some(function(e,i){ //一个满足 就为true
			return e == text;
		})
		if(b)return false; //相同返回
		a.push(text); //localStorage中追加
		localStorage.setItem('list',JSON.stringify(a));
	})
//四 下拉刷新 上拉加载  都是根据 功能查询
	mui.init({
	  pullRefresh : {
	    container:"#refreshContainer",//下拉刷新容器标识
	    down : {
	      // auto: true,//可选,默认false.首次加载自动下拉刷新一次
	      callback :function(){
	      	var that = this;
	      	var o = {
				proName:proName,
				page:1, //按照 1 页码去刷新
				pageSize:4
			};
			var name = $('.shangjia a.now span').attr('data-name');
			o[name] = $('.shangjia a.now span').hasClass('fa-angle-down')?2:1;
			getData(o,function(data){
				setTimeout(function(){ //模拟等待时间
					$('.shangpin ul').html(template('tpl1',data));
					that.endPulldownToRefresh(); //停止下拉刷新
					that.refresh(true); //重置上拉加载
				},1000);
			});
	      }
	    },
	    up : {
	      contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
	      contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
	      callback :function(){
	      	var that = this;
	      	window.page++; //页码 +1 ！！！
	      	//功能查询
	      	var o ={
				proName:proName,
				page:window.page, 
				pageSize:4
			};
			var name = $('.shangjia a.now span').attr('data-name');
			o[name] = $('.shangjia a.now span').hasClass('fa-angle-down')?2:1;
			getData(o,function(data){
				setTimeout(function(){
					if(data.data.length){
						$('.shangpin ul').append(template('tpl1',data)); //向后追加
						that.endPullupToRefresh(); //继续加载
					}else{
						that.endPullupToRefresh(true); //停止加载
					}
				},1000);
			});

	      }
	    }
	  }
	});

});


// 真对本页面 名称 价格 销量等 封装的ajax 
var getData = function (p,fn){
	$.ajax({
		url:'/product/queryProduct',
		type:'get',
		data:p,
		dataType:'json',
		success:function(data){
			window.page = data.page;
			fn && fn(data);
		}
	});
};

// proName 产品名称
// price 使用价格排序（1升序，2降序）
// page 是 第几页  默认1
// num 产品库存排序（1升序，2降序）
// pageSize 是 每页的条数  默认4
