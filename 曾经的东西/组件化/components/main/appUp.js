(function () {
  var template = `
              <div class="row placeholders">
                <div class="col-xs-6 col-sm-3 placeholder"
                  v-for=" (e,i) in arr ">
                  <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="200" height="200" class="img-responsive" alt="Generic placeholder thumbnail">
                  <h4>{{ e.name }}</h4>
                  <span class="text-muted">重要的人</span>
                </div>
              </div>`;
    window.appUp = {
      template,
      data(){
        return {
          arr:[]
        }
      },
      created(){
        axios.get('./components/main/data.json').then( data => this.arr=data.data.list )
      }
    };
})();
