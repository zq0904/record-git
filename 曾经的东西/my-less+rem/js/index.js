$(function(){
	// è½®æ’­å›?
	banner();
});

var banner = function (){
	var $xk = $('.sn_banner');
	var width = $xk.width();
	var $ul = $xk.find('ul');
	var $lis = $xk.find('ol li')
	var index = 1;
	// è‡ªåŠ¨è½®æ’­
	var time = setInterval(function(){
		index++;
		donghua();
	},1000);
	function donghua(){
		$ul.animate({
			'transform':'translateX('+(-index*width)+'px)',
			'-webkit-transform':'translateX('+(-index*width)+'px)'
		},200,function(){
			if(index>=9){
				index=1;
			}else if(index<=0){
				index=8;
			}
			$ul.css({
				'transform':'translateX('+(-index*width)+'px)',
				'-webkit-transform':'translateX('+(-index*width)+'px)'
			});
			//µãËæ¶¯
			$lis.removeClass('now').eq(index-1).addClass('now')
		});
	}
	// 滑动切换
	var s = 0;
	var c = 0;
	var i = false;
	$xk.on('touchstart',function(e){
		clearInterval(time);
		s = e.touches[0].clientX;
	});
	$xk.on('touchmove',function(e){
		c =e.touches[0].clientX - s;
		i = true;
	});
	$xk.on('touchend',function(e){
		if(i && Math.abs(c)>50){
			if(c>0){
				index--;
				donghua();
			}else{
				index++;
				donghua();
			}
		}
		// 重置
		s = 0;
		c = 0;
		i = false;
		time = setInterval(function(){
			index++;
			donghua();
		},1000);
	});
};