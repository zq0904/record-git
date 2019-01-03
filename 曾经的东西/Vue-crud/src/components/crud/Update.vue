<template>
  <div>
    <h2 class="sub-header">修改学生</h2>
    <form @submit.prevent="update">
      <div class="form-group">
        <label for="">姓名</label>
        <input type="text" class="form-control" name="name" required minlength="2" maxlength="10"
        v-model="form.name" >
      </div>
      <div class="form-group">
        <label for="">年龄</label>
        <input class="form-control" type="number" name="age" required min="1" max="150"
        v-model.number="form.age" >
      </div>
      <button type="submit" class="btn btn-default">提交</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data () {
    return {
      form:{
        name:'',
        age:''
      }
    }
  },
  created () {
    // this.$router 路由实例对象
    // this.$route  路由实例参数对象
    // this.$route.query 获取查询字符串
    this.loader();
  },
  methods:{
    async loader () {
      const {id} = this.$route.query;
      const {data} = await axios.get(`http://127.0.0.1:3000/list/${id}`);
      this.form = data
    },
    update () {
      const {id} = this.$route.query;
      axios.patch(`http://127.0.0.1:3000/list/${id}`,this.form)
      .then( data => this.$router.push('/list') );

    }
  }
}
</script>

<style>
</style>
