<template>
  <div class="main">
    <div class="header">
      <a href="#/">
      <img src="../../assets/img/logo3.png" alt="">
    </a>
      <h1>用户注册</h1>
    </div>
    <form @submit.prevent="register" >
      <div class="form-group">
        <label for="email">邮箱</label>
        <input type="email" required class="form-control" placeholder="Email" id="email"
        v-model="formData.email"
        @input="is_email()" >
        <p class="error-message" v-show="b_email">邮箱已存在</p>
      </div>
      <div class="form-group">
        <label for="nickname">昵称</label>
        <input class="form-control" required minlength="2" maxlength="21" id="nickname" placeholder="Nickname"
        v-model="formData.nickname"
        @input="is_nickname()">
        <p class="error-message" v-show="b_nickname">昵称已存在</p>
      </div>
      <div class="form-group">
        <label for="password">密码</label>
        <input type="password" required minlength="6" maxlength="18" class="form-control" id="password" placeholder="Password">
      </div>
      <button type="submit" class="btn btn-success btn-block">注册</button>
    </form>
    <div class="message">
      <p>已有账号? <a href="#/login">点击登录</a>.</p>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import _ from 'lodash';

export default {
  data () {
    return {
      formData:{
        email:'',
        nickname:''
      },
      b_email:false, //提示信息
      b_nickname:false
    }
  },
  methods:{
    register:_.debounce(async function () { //注册还要验证
      if(await this.is_email() || await this.is_nickname()) return;
      const {data} = await axios.post('/api/users',this.formData); //没毛病 注册
      this.$router.push('/login');
    },500),
    is_email:_.debounce(async function () {
      const {data} = await axios.get(`/api/users?email=${this.formData.email}`);
      this.b_email = !!data[0];
      return !!data[0];
    },500),
    is_nickname:_.debounce(async function () {
      const {data} = await axios.get(`/api/users?nickname=${this.formData.nickname}`);
      this.b_nickname = !!data[0];
      return !!data[0];
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

form .error-message {
  color: #f00;
}
</style>
