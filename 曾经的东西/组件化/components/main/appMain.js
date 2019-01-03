(function () {
  var template = `
      <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
          <h1 class="page-header">重要信息</h1>
              <!-- 重要的 -->
              <appUp></appUp>
              
              
          <!-- 添加学生 <appDown></appDown> -->
          
              
          </div>`;
    window.appMain = {
      template,
      components:{
        appUp
        // ,appDown
      }
    };
})();
