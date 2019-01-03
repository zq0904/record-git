<template>
  <div class="main">
    <div class="header">
      <a href="#/">
        <img src="../../assets/img/logo3.png" alt="">
      </a>
      <h1>用户登录</h1>
    </div>

    <form @submit.prevent="login()">
      <div class="form-group">
        <label for="exampleInputEmail1">邮箱</label>
        <input class="form-control" required type="email" id="exampleInputEmail1" placeholder="Email" autofocus
        v-model="formData.email" > 
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">密码</label>
        <a class="pull-right" href="">忘记密码？</a>
        <input class="form-control" required type="password" id="exampleInputPassword1" placeholder="Password"
        v-model="formData.password" >
      </div>
      <div class="checkbox">
        <label>
          <input type="checkbox">记住我
        </label>
      </div>
      <!-- 是否登录成功 提示语 -->
      <p class="error-message" v-show="sessionUser">{{ sessionUser }}</p>
      <button type="submit" class="btn btn-success btn-block">登录</button>
    </form>

    <div class="message">
      <p>没有账号? <a href="#/register">点击创建</a>.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import _ from 'lodash'; //js工具库

export default {
  data () {
    return {
      formData:{
        email:'',
        password:''
      },
      sessionUser:'' //是否登录成功 提示语 
    }
  },
  methods:{
    login:_.debounce(async function () { //函数防抖 减少多次提交 优化服务器压力
      try {
        const {data} = await axios.post('api/session',this.formData);
        this.sessionUser = '';
        this.$router.push('/');
      } catch (err) {
        const {status} = err.response; //拿到错误状态码
        switch (status) {
          case 404 :
          this.sessionUser = '邮箱或密码错误';
          break;
        }
      }
    },500)
    
  }
}
</script>

<style>
.main {
  width: 340px;
  margin: 0 auto;
  margin-top: 50px;
  color: #333;
}

.main .header {
  text-align: center;
}

.main .header h1 {
  font-size: 26px;
}

.main form {
  padding: 20px;
  margin-bottom: 15px;
  border: 1px solid #d8dee2;
  border-radius: 5px;
  background-color: #fff;
}

.main .message {
  padding: 10px;
  padding-bottom: 0;
  border: 1px solid #d8dee2;
  border-radius: 5px;
}
.error-message{
  color:red;
}
</style>
