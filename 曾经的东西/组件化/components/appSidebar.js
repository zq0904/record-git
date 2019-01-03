(function () {
  var template = `
        <div class="col-sm-3 col-md-2 sidebar">
          <ul class="nav nav-sidebar">
           <router-link to="/" tag="li" exact> <a>报告</a> </router-link>
           <router-link to="/a" tag="li"> <a>分析</a> </router-link>
           <router-link to="/list" tag="li"> <a>list</a> </router-link>
           <router-link to="/liu" tag="li"> <a>A</a> </router-link>
           <router-link to="/ying" tag="li"> <a>B</a> </router-link>
          </ul>
          <ul class="nav nav-sidebar">
            <li><a href="">Nav item</a></li>
            <li><a href="">Nav item again</a></li>
            <li><a href="">One more nav</a></li>
            <li><a href="">Another nav item</a></li>
            <li><a href="">More navigation</a></li>
          </ul>
          <ul class="nav nav-sidebar">
            <li><a href="">Nav item again</a></li>
            <li><a href="">One more nav</a></li>
            <li><a href="">Another nav item</a></li>
          </ul>
        </div>`;
    window.appSidebar = {
      template
    };

})();
