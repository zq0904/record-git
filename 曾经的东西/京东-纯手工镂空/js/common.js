//封装document.getElementById
	function my$(id){
		return document.getElementById(id);
	}
//鼠标按下的同时移动不会选中文本
	// function getSelection(){
	// 	return window.getSelection?window.getSelection().removeAllRanges():document.selection.empty()
	// }
//获取max - min 的随机整数
	function random(min,max){
		if(max<min){[min,max]=[max,min]}
		return Math.floor(Math.random()*(max+1-min)+min);
	}
//随机rgb颜色
	function getRgb(){
		return 'rgb('+random(0,255)+','+random(0,255)+','+random(0,255)+')';
	}
//获取 元素 文本内容  //使用typeof判断是否支持某个属性更为准确排除（ '' ）在这里只简写    typeof(e.)=='undefined'
	function getInnerText(e){
		if(e.textContent){
			return e.textContent;
		}else{
			return e.innerText;
		}
	}
//设置 元素 文本内容
	function setInnerText(e,c){
		if(textContent){
			e.textContent = c;
		}else{
			e.innerText = c;
		}
	}
//获取父元素中第一个子元素
	function getFirstElementChild(e){
		if(e.firstElementChild){
			return e.firstElementChild;
		}else{
			var ele = e.firstChild;
			while(ele&&ele.nodeType!=1){
				ele = ele.nextSibling;
			}
			return ele;
		}
	}
//获取父元素中最后一个子元素
	function getLastElementChild(e){
		if(e.lastElementChild){
			return e.lastElementChild;
		}else{
			var ele = e.lastChild;
			while(ele&&ele.nodeType!=1){
				ele = ele.previousSibling;
			}
			return ele;
		}
	}
//获取当前元素前一个元素
	function getPreviousElementSibling(e){
		if(e.previousElementSibling){
			return e.previousElementSibling;
		}else{
			var ele = e.previousSibling;
			while(ele&&ele.nodeType!=1){
				ele.previousSibling;
			}
			return ele;
		}
	}
//获取当前元素后一个元素
	function getNextElementSibling(e){
		if(e.nextElementSibling){
			return e.nextElementSibling;
		}else{
			var ele = e.nextSibling;
			while(ele&&ele.nodeType!=1){
				ele.nextSibling;
			}
			return ele;
		}
	}
//获取兄弟元素
	function getElementSibling(e){
		if(!e)return;//元素是否存在 不存在直接返回
		var a = [];//存储所有的兄弟元素
		var ele = e.previousSibling;
		while(ele){
			if(ele.nodeType==1){
				a.push(ele);
			}
			ele = ele.previousSibling;
		}
		var el = e.nextSibling;
		while(el){
			if(el.nodeType==1){
				a.push(el);
			}
			el = el.nextSibling;
		}
		return a;
	}
//为任意一个元素绑定事件
	function addEventListener(e,t,f){
		if(e.addEventListener){
			e.addEventListener(t,f,false);
		}else if(e.attachEvent){
			e.attachEvent('on'+t,f);
		}else{
			e['on'+t] = f;
		}
	}
//为任意的一个元素解绑某个事件
	function removeEventListener(e,t,f){
		if(e.removeEventListener){
			e.removeEventListener(t,f,false);
		}else if(e.detachEvent){
			e.detachEvent('on'+t,f);
		}else{
			e['on'+t] = null;
		}
	}
//封装动画函数 匀速的
	function animate(e,t){
		clearInterval(e.time);
		e.time = setInterval(function (){
			var d = e.offsetLeft;
			var b = 11;
			b = t > d ? b : -b;
			d += b;
			if(Math.abs(t-d)>Math.abs(b)){
				e.style.left = d + 'px';
			}else{
				e.style.left = t + 'px';
				clearInterval(e.time);
			}
		},20);
	}
//格式化日期
	function getTime(d){
		var f = d.getFullYear();
		var m = d.getMonth()+1;
		var date = d.getDate();
		var h = d.getHours();
		var min = d.getMinutes();
		var s = d.getSeconds();
		return f+'年'+x10(m)+'月'+x10(date)+'日 '+x10(h)+':'+x10(min)+':'+x10(s);
	}
	function x10(a){
		return a < 10 ? '0'+a : a;
	}
//返回当前浏览器是什么类型的浏览器
	function userBrowser(){
	    var browserName=navigator.userAgent.toLowerCase();
	    if(/msie/i.test(browserName) && !/opera/.test(browserName)){
	        console.log("IE");
	    }else if(/firefox/i.test(browserName)){
	        console.log("Firefox");
	    }else if(/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName)){
	        console.log("Chrome");
	    }else if(/opera/i.test(browserName)){
	        console.log("Opera");
	    }else if(/webkit/i.test(browserName) &&!(/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName))){
	        console.log("Safari");
	    }else{
	        console.log("不知道什么鬼!");
	    }
	}
//获取浏览器滚动条向上卷曲出去的距离//配合document.onscroll
	// function getScroll(){
	// 	return {
	// 		'top':window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
	// 		'left':window.pageXOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
	// 	};//调用 getScroll().top  getScroll().left
	// }
//获取浏览器宽高兼容//配合window.resize
	function getClient(){
		return {
			'width':window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth || 0,
			'left':window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight || 0
		};
	}
//封装动画函数 缓动的(目标-当前)/10
	// function animate(e,t){
	// 	clearInterval(e.time);
	// 	e.time = setInterval(function (){
	// 		var d = e.offsetLeft;
	// 		var b = Math.ceil(Math.abs((t-d)/10));//最后一直移动1 本质先变速 后匀速
	// 		b = t > d ? b : -b;
	// 		d += b;
	// 		e.style.left = d + 'px';
	// 		if(d==t){
	// 			clearInterval(e.time);
	// 		}
	// 	},20);
	// }
//获取元素CSS样式属性的值
	function getStyle(e,attr){
		return window.getComputedStyle ? window.getComputedStyle(e,null)[attr] : e.currentStyle[attr] || 0;
	}
//封装变速函数终极版（含opacity zIndex）
	function my_animate(e,json,fn){
	    clearInterval(e.time);
	    e.time = setInterval(function (){
	        var x = true;//假设 所有属性 均到达位置
	        for(var attr in json){
	            if(attr=='opacity'){//透明度0-1  吧d t 先乘100 赋值时在除100
	                var d = getStyle(e,attr)*100;
	                var t = json[attr]*100;
	                var b = Math.ceil(Math.abs((t-d)/10));
	                b = t > d ? b : -b;
	                d += b;
	                e.style[attr] = d/100;
	            }else if(attr=='zIndex'){//层级 就是直接赋值吗 还过度毛线
	                e.style[attr] = json[attr];
	            }else{
	                var d = parseInt(getStyle(e,attr));
	                var t = json[attr];
	                var b = Math.ceil(Math.abs((t-d)/10));
	                b = t > d ? b : -b;
	                d += b;
	                e.style[attr] = d + 'px'; //总是忘记加'px'
	            }
	            if(d!=t){//只要有一个属性不到达位置 
	                x = false;
	            }
	        }
	        if(x){
	            clearInterval(e.time);
	            if(fn){//回调函数 如果fn存在 执行 再次调用animate 实现 上一次动画结束 才开始执行下一个动画
	                fn(); //这里有个核心思想 只有当前手动画结束 才会执行（）
	            }
	        }
	    },20);
	}
//对象封装 事件参数对象
	var Eve = {
		getEvent:function (e){
			return window.event || e;
		},
		getClientY:function (e){//可视区
			return this.getEvent(e).clientY;
		},
		getClientX:function (e){
			return this.getEvent(e).clientX;
		},
		getScrollTop:function (){//向上曲出去的距离
			return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || 0;
		},
		getScrollLeft:function (){
			return window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft || 0;
		},
		getPageY:function (e){
			return this.getEvent(e).pageY || this.getClientY(e)+this.getScrollTop();
		},
		getPageX:function (e){
			return this.getEvent(e).pageX || this.getClientX(e)+this.getScrollLeft();
		}
	};
