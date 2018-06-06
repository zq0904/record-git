<template>
<div class="header">
  <nav class="navbar navbar-default">
    <div class="container">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#/">
          <img width="90px" src="./cnodejs_light.svg" alt="">
        </a>
      </div>
      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <form class="navbar-form navbar-left">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="搜索">
          </div>
        </form>
        <ul class="nav navbar-nav navbar-right">

          <template v-if="user" >
            <a class="btn btn-default navbar-btn" href="#/topic/new">发表</a>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"
              @click.prevent="show = !show" ><img width="20" height="20" src="./avatar-max-img.png" alt=""> <span class="caret"></span></a>
              <ul class="dropdown-menu" :style="{display:show?'block':'none'}" >
                <li class="dropdown-current-user">
                  当前登录用户: <br>
                  {{ nickname }}
                </li>
                <li role="separator" class="divider"></li>
                <li><a href="#">个人主页</a></li>
                <li><a href="#/settings/profile">设置</a></li>
                <li><a href="#" @click.prevent="del()" >退出</a></li>
              </ul>
            </li>
          </template>
          <template v-else >
            <a class="btn btn-primary navbar-btn" href="#/login">登录</a>
            <a class="btn btn-success navbar-btn" href="#/register">注册</a>
          </template>

        </ul>
      </div>
      <!-- /.navbar-collapse -->
    </div>
    <!-- /.container-fluid -->
  </nav>
</div>
</template>

<script>
import axios from 'axios';

export default {
  data () {
    return {
      show:false,
      nickname:''
    }
  },
  created () {
    //子组件预加载 然后才加载Home组件 要想获取父组件传过来的值 利用延时器
    setTimeout( () => { //箭头函数 this才是 实例对象
      this.nickname = this.user.nickname;
    });
  },
  props:{
    user:{
      type:Object,
      default:null
    }
  },
  methods:{
    async del () {
      try {
        const {data} = await axios.delete('/api/session');
        this.$router.push('/login');
      } catch (err) {
        window.alert('退出失败');
      }
    }
  }
}

</script>

<style>
body{
  background-color: #e1e1e1;
}
.navbar{
  background-color: #444;
}
.form-control{
  border-radius: 15px;
  height: 30px;
  margin-top: 3px;
}
</style>
