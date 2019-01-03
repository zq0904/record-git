(function () {
  var template = `
  <div id="app">

    <!-- 导航 -->
    <app-nav></app-nav>
  
    <div class="container-fluid">
      <div class="row">
        
        <!-- 侧栏 -->
        <app-sidebar></app-sidebar>
        
        <!-- 主体 <app-main></app-main>  -->
        <router-view></router-view>

      </div>
    </div>

  </div>`;
  window.App = {
    template,
    components:{
      appNav,
      appSidebar
    }
  }
})();
