<template>
  <div>
    <h2 class="sub-header">添加学生</h2>
      <form action="" method=""
      @submit.prevent="add">
        <div class="form-group">
          <label for="">姓名</label>
          <input type="text" class="form-control" required minlength="2" maxlength="10"
          v-model="form.name" >
        </div>
        <div class="form-group">
          <label for="">年龄</label>
          <input class="form-control" type="number" required min="1" max="150"
          v-model="form.age" >
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
    created (){

    },
    methods:{
      add (){
        axios.post('http://127.0.0.1:3000/list',this.form) //添加数据
        .then( data => this.$router.push('/list') );
      }
    }
  }
</script>

<style></style>
