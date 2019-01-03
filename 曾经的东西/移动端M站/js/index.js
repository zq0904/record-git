window.onload = function (){
	header();
	lunbo();
	time();
};
var header = function (){
	var header = document.querySelector('header');
	var height = document.querySelector('.tu').offsetHeight;
	window.addEventListener('scroll',function(){
		var a = 0.85;
		var s = document.documentElement.scrollTop;
		if(s<height){
			a = 0.85*s/height;
		}
		header.style.backgroundColor = "rgba(230,0,0,"+a+")";
	});
};
var lunbo = function (){
	var index = 1;
	var xk = document.querySelector('.tu');
	var width = xk.offsetWidth;
	var ul = xk.querySelector('ul');
	var lis = xk.querySelectorAll('ol li');
	var addTransition = function (){
		ul.style.transition = 'all 0.5s linear';
		ul.style.webkitTransition = 'all 0.5s linear';
	};
	var removeTransition = function (){
		ul.style.transition = 'none';
		ul.style.webkitTransition = 'none';
	};
	var setX = function (cha){
		ul.style.transform = 'translateX('+cha+'px)';
		ul.style.webkitTransform = 'translateX('+cha+'px)';
	};
	var time = setInterval(function(){
		index++;
		addTransition();
		setX(-index*width);
	},1000);
	ul.addEventListener('transitionend',function(){
		if(index==9){
			index = 1;
		}
		if(index==0){
			index = 8;
		}
		removeTransition();
		setX(-index*width);
		document.querySelector('.tu ol li.off').classList.remove('off');
		lis[index-1].classList.add('off');
	});
	var s = 0;
	var c = 0;
	var i = false;
	xk.addEventListener('touchstart',function(e){
		clearInterval(time);
		s = e.targetTouches[0].clientX;
	});
	xk.addEventListener('touchmove',function(e){
		c = e.targetTouches[0].clientX - s;
		i = true;
		removeTransition();
		setX(-index*width+c);
	});
	xk.addEventListener('touchend',function(e){
		if(i && Math.abs(c)>width/3){
			c>0?index--:index++;
		}
		addTransition();
		setX(-index*width);
		s = 0;
		c = 0;
		i = false;
		time = setInterval(function(){
			index++;
			addTransition();
			setX(-index*width);
		},1000);
	});
};
var time = function (){
	var spans = document.querySelectorAll('.time span');
	var d = Date.now();
	var l = new Date(2017,10-1,16,12,00,00); //从后台拿到的
	var t = (l - d)/1000;
	function myTime(){
		t--;
		var h = parseInt(t/3600);
		var m = parseInt(t%3600/60);
		var s = parseInt(t%60);
		spans[0].innerHTML = Math.floor(h/10);
		spans[1].innerHTML = h%10;
		spans[3].innerHTML = Math.floor(m/10);
		spans[4].innerHTML = m%10;
		spans[6].innerHTML = Math.floor(s/10);
		spans[7].innerHTML = s%10;
		if(t<=0){
			clearInterval(ttt);
		}
	}
	myTime();
	var ttt = setInterval(myTime,1000);
};