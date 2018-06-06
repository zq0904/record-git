(function () {
  new Vue({
    el:'#app',
    // 在根实例中 如果有 template 会把 template的渲染结果替换掉 #app
    // 那么把组件 直接作为 template 中的标签
    template:'<App></App>',
    router,
    components:{App}
  });
})();
