var Add = {
  template:`
      <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
        <h2 class="sub-header">添加学生</h2>
        <form action="/student/new" method="post">
          <div class="form-group">
            <label for="">姓名</label>
            <input type="text" class="form-control" id="" name="name" required minlength="2" maxlength="10">
          </div>
          <div class="form-group">
            <label for="">性别</label>
            <div>
              <label class="radio-inline">
                <input type="radio" name="gender" id="" value="1" checked> 男
              </label>
              <label class="radio-inline">
                <input type="radio" name="gender" id="" value="0"> 女
              </label>
            </div>
          </div>
          <div class="form-group">
            <label for="">年龄</label>
            <input class="form-control" type="number" id="" name="age" required min="1" max="150">
          </div>
          <div class="form-group">
            <label for="">爱好</label>
            <input class="form-control" type="text" id="" name="hobbies">
          </div>
          <button type="submit" class="btn btn-default">Submit</button>
        </form>
      </div>`
};

