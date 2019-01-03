var Updata = {
  template:`
<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
        <h2 class="sub-header">编辑学生</h2>
        <form action="/students/edit" method="post">
          <!-- 
            用来放一些不希望被用户看见，但是需要被提交到服务端的数据
           -->
          <input type="hidden" name="id" value="">
          <div class="form-group">
            <label for="">姓名</label>
            <input type="text" class="form-control" id="" name="name" required minlength="2" maxlength="10" value="">
          </div>
          <div class="form-group">
            <label for="">性别</label>
            <div>
              <label class="radio-inline">
                <input type="radio" name="gender" id="" value="1" > 男
              </label>
              <label class="radio-inline">
                <input type="radio" name="gender" id="" value="0" > 女
              </label>
            </div>
          </div>
          <div class="form-group">
            <label for="">年龄</label>
            <input class="form-control" type="number" id="" name="age" value="" required min="1" max="150">
          </div>
          <div class="form-group">
            <label for="">爱好</label>
            <input class="form-control" type="text" id="" name="hobbies" value="">
          </div>
          <button type="submit" class="btn btn-default">Submit</button>
        </form>
      </div>`
};
