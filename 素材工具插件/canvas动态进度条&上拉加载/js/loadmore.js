;
(function () {
  var loadmore = {
    get: function (callback, config) {
      var config = config ? config : {};
      config.isEnd = false; // 结束标志
      config.isAjax = false; // 防止滚动过快 服务端没来得及响应造成多次请求
      var counter = 0; // 计数器
      var pageStart = 0; // 开始的页数
      var pageSize = config.size ? config.size : 10;

      // 默认通过点击类.loadmore加载更多
      $(document).on('click', '.loadmore', request);

      // 通过监听滚动事件加载更多
      $(window).scroll(function () {
        // 没有开启滚动加载 没有更多数据 正在发生请求时 不能能再次请求
        if (!config.scroll || config.isEnd == true || config.isAjax == true) return false;
        // 当滚动到距底部100px时 加载
        if ($(document).height() - $(this).scrollTop() - $(this).height() < 100) { // this是window
          request();
        }
      });

      request(); // 首次加载

      function request() {
        counter++;
        pageStart = counter * pageSize;
        callback && callback({ pageStart: pageStart, pageSize: pageSize });
      }
    }
  }
  window.loadmore = loadmore;
})(); // jQuery || Zepto
