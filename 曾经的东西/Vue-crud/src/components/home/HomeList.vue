<template>
<div>
  <router-link class="btn btn-success" to="/list/new">添加学生</router-link>
  <div class="table-responsive">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>姓名</th>
          <th>性别</th>
          <th>年龄</th>
          <th>爱好</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <router-link to="/list/Update">编辑</router-link>
            <a href="#">删除</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style>
</style>
