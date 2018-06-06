; (function (designWidth, designFontSize, maxWidth) {
  var doc = document, win = window;
  var docEl = doc.documentElement;
  var tid;
  var rootItem, rootStyle;

  function refreshRem() {
    var nowwidth = docEl.getBoundingClientRect().width; // 当前宽度
    if (!maxWidth) { maxWidth = 640; }; // 没有设置最大宽度 给默认值
    if (nowwidth > maxWidth) { nowwidth = maxWidth; }
    // 现在html的font-size应该为 nowFontsizze / nowWidth = designFontSize / designWidth
    var nowFontsizze = nowwidth * designFontSize / designWidth;
    // 兼容UC开始
    rootStyle = "html{font-size:" + nowFontsizze + 'px !important}';
    rootItem = document.getElementById('rootsize') || document.createElement("style");
    if (!document.getElementById('rootsize')) {
      document.getElementsByTagName("head")[0].appendChild(rootItem);
      rootItem.id = 'rootsize';
    }
    if (rootItem.styleSheet) {
      rootItem.styleSheet.disabled || (rootItem.styleSheet.cssText = rootStyle)
    } else {
      try { rootItem.innerHTML = rootStyle } catch (error) { rootItem.innerText = rootStyle }
    }
    // 兼容UC结束
    docEl.style.fontSize = nowFontsizze + "px";
  };
  refreshRem(); // 首次加载

  win.addEventListener("resize", function () { // 当浏览器宽度变化时
    clearTimeout(tid); // 防抖
    tid = setTimeout(refreshRem, 300);
  }, false);

  win.addEventListener("pageshow", function (e) { // 每次加载页面时触发
    if (e.persisted) { // 从缓存中读取为true 也就是浏览器后退的时候 需重新计算
      clearTimeout(tid); // 防抖
      tid = setTimeout(refreshRem, 300);
    }
  }, false);

  if (doc.readyState === "complete") { // 文档加载完成 body font-size 16px
    doc.body.style.fontSize = "16px";
  } else {
    doc.addEventListener("DOMContentLoaded", function (e) {
      doc.body.style.fontSize = "16px";
    }, false);
  }
})(800, 100, 750); // 设计稿宽度  设计稿font-size基准值(100方便计算)  最大宽度