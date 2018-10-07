;
(function () {
  // 插件机制
  $.fn.cycle = function (option) { // jQ中 $.fn.extend = {cycle: function() {}} 实现多扩展
    var plugina = new plugin(this, option);
  };
  // 构造函数
  var plugin = function (e, option) {
    this.e = e; // jQuery元素
    this.defaults = { // 默认参数
      percent: 50, // 百分比
      w: this.e.parent().width(), // 元素宽度
      circleW: 2, // 圆宽度
      startA: 0.5 * Math.PI, // 范围起始角度
      endA: 2.5 * Math.PI,
      padding: 10, // 内间隔 是百分比
      time: 1000 // 动画执行时间
    };
    this.PARAMS = $.extend({}, this.defaults, option); // 合并对象 后者覆盖前者
    this.setBackground(); // 设置背景
    this.init();
  }
  plugin.prototype = {
    setBackground: function () {
      if (this.PARAMS.background) {
        this.e.css({
          'backgroundImage': 'url(' + this.PARAMS.background + ')',
          'backgroundRepeat': 'no-repeat',
          'backgroundPosition': 'center',
          'backgroundSize': 'cover',
        });
      }
    },
    init: function () {
      var r = this.PARAMS.w / 2 - this.PARAMS.w * this.PARAMS.padding / 100;
      var x = this.PARAMS.w / 2;
      var y = this.PARAMS.w / 2;
      var canvas = this.e[0];
      canvas.width = this.PARAMS.w; // 设置canvas dom元素 宽高为父容器宽高 适配
      canvas.height = this.PARAMS.w;
      var percent = this.PARAMS.percent;
      var startA = this.PARAMS.startA; // 起始角度
      var endA = this.PARAMS.endA;
      var percent_startA = this.PARAMS.startA; // 百分比对应 起始角度
      var percent_endA = percent / 100 * (endA - startA) + startA; // 百分比对应 终止角度
      var s = Math.PI / 180; // 步数
      var nowAngle = this.PARAMS.startA; // 当前角度
      var time = this.PARAMS.time / ((percent_endA - percent_startA) / s); // 动画时间换算出来的定时器每次循环时间
      var T; // 定时器id
      var ctx = canvas.getContext('2d');
      ctx.lineWidth = this.PARAMS.circleW; // 圆宽
      function drawCycle() {
        // 底色
        ctx.clearRect(0, 0, canvas.width, canvas.width);
        ctx.fillStyle = 'rgba(0,0,0,0)';
        ctx.fillRect(0, 0, canvas.width, canvas.width);
        // 底弧度
        ctx.beginPath();
        ctx.strokeStyle = '#fff';
        ctx.arc(x, y, r - ctx.lineWidth / 2, startA, endA, false);
        ctx.stroke();
        // 上弧度
        nowAngle += s;
        // 弧度超出范围的处理
        if (!(nowAngle < percent_endA)) {
          nowAngle = percent_endA;
          clearInterval(T);
        }
        ctx.beginPath();
        ctx.strokeStyle = '#ffff33';
        ctx.arc(x, y, r - ctx.lineWidth / 2, percent_startA, nowAngle, false);
        ctx.stroke();
        // 小圆球
        ctx.beginPath();
        ctx.fillStyle = '#ffff33';
        ctx.arc(x + Math.cos(nowAngle) * (r - ctx.lineWidth / 2), y + Math.sin(nowAngle) * (r - ctx.lineWidth / 2), ctx.lineWidth * 1.5, 0, 2 * Math.PI, false);
        ctx.fill();
      }
      T = setInterval(drawCycle, time);
      drawCycle(); // 初始调用
    }
  };
})(); // jQuery || Zepto
