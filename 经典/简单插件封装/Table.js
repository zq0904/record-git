    // 模块载入标准 3个
    // AMD
    // CMD
    // CommanJS
  (function (global, factory) {
    typeof global !== "window" ? factory() : console.log('不是浏览器环境')
  })(this, function () {  // 自执行 IIEF this代表全局对象 浏览器中
    // 写插件逻辑
    function Table() { // table 表格实例的构造函数
      Table.prototype.createTable = function (json) { // 写在原型中是为了 性能的优化
        var el = json.el,
            data = json.data
            width = el.clientWidth/data.col + 'px'
        Css(width) // 一开始就加载样式 (为了获取width)
        for (var i = 0; i < data.row; i++) {
          var rowEle = document.createElement('div')
          rowEle.className = 'T-row'
          el.appendChild(rowEle)
          for (var j = 0; j < data.col; j++) {
            var colEle = document.createElement('div')
            colEle.className = 'T-col'
            rowEle.appendChild(colEle)
          }
        }
      }
    }
    function Css(w) {
      var css = document.getElementsByTagName('style')[0]
      if (!css) { // 没有stylr自己创建 外联样式css 是 link标签
        var css = document.createElement('style')
        document.head.appendChild(css)
      }
      css.innerHTML += `
        .T-row{width:100%;height:30px;box-sizing:border-box}
        .T-col{float:left;width:${w};height:30px;border:1px solid #000;box-sizing:border-box}
      `
    }
    this.Table = Table // 暴露到全局
  });

