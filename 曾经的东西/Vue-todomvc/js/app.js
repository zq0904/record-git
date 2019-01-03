// Vue 核心 MVVM 数据驱动视图 数据就是个纽带
(function (Vue) { //沙箱
	// const arr = [{ //模拟数据
	// 	id:'2',
	// 	text:'刘',
	// 	checked:false //是否完成
	// },
	// {
	// 	id:'1',
	// 	text:'莹',
	// 	checked:true
	// }];
	var list = localStorage.getItem('list'); //取不到为null
	var arr = list ? JSON.parse(list) : [];
	Vue.directive('focus',{ //全局指令 必需在前面先声明
		inserted:function (el) { //插入就执行
			el.focus(el);
		}
	});
	var app = new Vue({
		el:'#app',
		data:{
			arr,
			hash:'all', //底部样式默认值
			bianji:null //默认没有编辑样式
		},
		computed:{
			dan:{ //单选关联全选 Vue更新之后 要求有set
				get:function () {
					return this.arr.every( e => e.checked ); //全都为true 才为true
				},
				set:function (val) {
					//点击全选按钮 已经设置了 checked 不用写
				}
			},
			weiwan:function () { //未完成个数
				return this.arr.filter( e => !e.checked ).length;
			},
			arr_filter:function () { //底部筛选
				switch(this.hash){
					case 'all':
					return this.arr;
					case 'active':
					return this.arr.filter( e => !e.checked );
					case 'completed':
					return this.arr.filter( e => e.checked );
				}
			}
			// ,
			// jt:function () {
			// 	this.setItem();
			// 	this.arr.filter( e => e.checked ) //监听数组变化 及 每个状态变化(e.checked)
			// }
		},
		watch:{ //通过watch监听arr变化
			arr:{ // 深度 watcher 不光监视arr 还监视其成员变化
				handler:function (val,oldVal) {
					this.setItem();
				},
				deep:true
			}
		},
		methods:{
			quan:function (event) { //全选 反选
				this.arr.map(e => e.checked=event.target.checked);
			},
			del:function (i) { //单删除
				this.arr.splice(i,1);
			},
			del_all:function () { //全删除 --- 保留没被选择中的
				this.arr = this.arr.filter( e => !e.checked );
			},
			que:function (e,i) { //确认编辑
				var text = e.target.value.trim();
				text.length ? this.arr[i].text=text : this.arr.splice(i,1); //空字符 直接删除
				this.bianji=null; //取消编辑样式
			},
			add:function (e) { //添加数据
				var text = e.target.value.trim();
				if(!text.length) return ;
				this.arr.unshift({
					id:this.arr[0] ? this.arr[0].id+1 : 1 ,//空数组 id 取 1
					text,
					checked:false
				});
				e.target.value = '';
			},
			setItem:function () { //设置本地存储
				localStorage.setItem('list',JSON.stringify(this.arr));
			}
		},
		directives:{ //局部指令
			'focus2':function (el,b) {
				if(b.value){ //当 v-focus="ture" 时触发
					el.focus();
				}
			}
		}

	});

	window.onhashchange = function () { //底部样式
		 app.hash = location.hash.substr(2) || 'all';
	};
	window.onhashchange(); //保证第一次加载页面 连续样式

})(Vue);
