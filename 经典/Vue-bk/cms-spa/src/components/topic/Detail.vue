<template>
  <section class="container">
    <div class="row">
      <div class="col-md-9">
        <h1 class="title"> {{ topic.title }} </h1>
        <p>发布于 几秒前 作者 谁谁谁 1 次浏览 来自 客户端测试</p>
        <p v-if="isLogin" >
          <router-link :to="{name:'edit',params:{id:topic.id}}">编辑</router-link>
          <a href="#" @click.prevent="del(topic.id)" >删除</a>
        </p>
        <hr>
        <article class="markdown-body">
          {{ topic.content }}
        </article>
        <!-- 评论 -->
        <div class="panel panel-default" v-for=" (e,i) in comments ">
          <div class="panel-heading">
            <span>谁谁谁</span> 评论
            <span>24 分钟 前</span>
            <span class="action">
            <a href=""><i class="glyphicon glyphicon-thumbs-up pull-right"></i></a>
            <a href=""><i class="glyphicon glyphicon-remove-circle pull-right"></i></a>
            <a href=""><i class="glyphicon glyphicon-remove-circle pull-right"></i></a>
          </span>
          </div>
          <div class="panel-body">{{ e.content }}</div>
        </div>

        <hr>

        <form style="margin-bottom: 20px;"
        @submit.prevent="addComment" >
          <div class="form-group">
            <label for="exampleInputPassword1">添加评论</label>
            <textarea class="form-control" required rows="3"
            v-model="text" ></textarea>
          </div>
          <button type="submit" class="btn btn-success">回复</button>
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
      topic:{},
      comments:[],
      isLogin:false,
      text:''
    }
  },
  async created () {
    try {
      const {id} = this.$route.params;
      const {data} = await axios.get(`/api/topics/${id}`);
      this.topic = data; //渲染主题
      this.loadcomments(id); //根据主题Id 查询评论
      this.is_topic(id);// 如果当前主题属于当前用户登录 则显示编辑、删除
    } catch (err) {
    }
  },
  methods:{
    //加载所有评论
    async loadcomments(topicId) {
      const {data} = await axios.get(`/api/comments?topic_id=${topicId}`);
      this.comments = data;
      console.log(data)
    },
    //是否是自己发的主题 （可编辑 删除）
    async is_topic(topicId) {
      try {
        const {data} = await axios.get('/api/session');
        this.isLogin = this.topic.user_id == data.id;
      } catch (err) { //用户可能没有登录
        console.log('未登录');
      }
    },
    //检验是否登录 没登录 返回false
    async is_login(){
      try {
        const {data} = await axios.get();
        return true;
      } catch (err) {
        const {status} = err.response;
        switch (status) {
          case 401:
          if( window.confirm('请登录') ){
            console.log(1)
          }
          console.log(2)
          return false;
        }
      }
    },
    //追加评论
    async addComment() {
      if(!this.is_login) return; //没登录不能评论
      const {data} = await axios.post('/api/comments',{
        topic_id:this.topic.id,
        content:this.text
      });
      this.loadcomments(this.topic.id); //追加评论后 重新渲染评论
      this.text = ''; //清空评论
    },
    //删除
    async del(topicId) {
      if(window.confirm('确认删除吗？')){
        const {data} = await axios.delete(`/api/topics/${topicId}`);
        this.$router.push('/');
      }
    }
  }
}

</script>
<style>
.markdown-body {
  margin-bottom: 100px;
}
</style>
