$(function(){
	// 区域滚动
	mui('.mui-scroll-wrapper').scroll({
		scrollY: true,
		indicators: false,
		deceleration: 0.0005 
	});
	// 轮播图
	mui('.mui-slider').slider({
	  interval:500//自动轮播周期，若为0则不自动播放，默认为0；
	});
});