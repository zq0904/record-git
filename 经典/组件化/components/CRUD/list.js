(function () {
  var template = `
    <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
      <h2 class="sub-header">Section title</h2>
      <router-link to="/list/add" class="btn btn-success" >添加学生</router-link>
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>编号</th>
              <th>姓名</th>
              <th>年龄</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody v-for=" (e,i) in shuju ">
            <tr>
              <td>{{ i+1 }}</td>
              <td>{{ e.name }}</td>
              <td>{{ e.age }}</td>
              <td>
                <router-link to="/list/updata" class="btn btn-success" >编辑</router-link>
                <a href="#">删除</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>`;
    window.List = {
      template,
      data(){
        return {
          shuju:[]
        }
      },
      created(){
        this.loadList(); //最早修改data数据的  转到方法中
      },
      methods:{
        loadList(){
          axios.get('http://127.0.0.1:3000/list').then( 
            data => this.shuju = data.data  //必须使用 箭头函数 this 是 实例对象
            );
        }
      }
    }
})();

