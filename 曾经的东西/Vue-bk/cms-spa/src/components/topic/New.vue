<template>
<section class="container">
  <div class="row">
    <div class="col-md-5">
      <form @submit.prevent="addTopic()" >
        <div class="form-group">
          <label for="exampleInputEmail1">选择板块</label>
          <select class="form-control">
            <option>分享</option>
            <option>问答</option>
            <option>招聘</option>
            <option>客户端测试</option>
          </select>
        </div>
        <div class="form-group">
          <label for="title">标题</label>
          <input class="form-control" required id="title"
          v-model="formData.title" >
        </div>
        <div class="form-group">
          <label for="content">内容</label>
          <textarea required id="content" class="form-control" rows="3"
          v-model="formData.content" ></textarea>
        </div>
        <button type="submit" class="btn btn-default">提交</button>
      </form>
    </div>
  </div>
</section>
</template>

<script>
import axios from 'axios';

export default {
  data () {
    return {
      formData:{
        title:'',
        content:''
      }
    }
  },
  methods:{
    async addTopic () {
      try {
        const {data} = await axios.post('/api/topics',this.formData);
        this.$router.push(`/detail/${data.id}`);
      } catch (err) {
        const {status} = err.response;
        switch (status) {
          case 401:
          if(window.confirm('您未登录,是否登录')){
            this.$router.push('/login');
          }
          break;
        }
      }
    }
  }
}

</script>

<style>
</style>
