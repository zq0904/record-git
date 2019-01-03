<template>
  <section class="container">
    <div class="row">
      <div class="col-md-5">
        <form @submit.prevent="patch()" >
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
            <label for="title">主题</label>
            <input class="form-control" id="title" placeholder="topic" required
            v-model="formData.title" >
          </div>
          <div class="form-group">
            <label for="content">内容</label>
            <textarea class="form-control" id="content" rows="3" required
            v-model="formData.content" ></textarea>
          </div>
          <button type="submit" class="btn btn-success">点击保存</button>
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
  created (){
    const {id} = this.$route.params;
    console.log(id)
    this.loadTopic(id); //加载
  },
  methods:{
    //默认加载
    async loadTopic(topicId){
      const {data} = await axios.get(`/api/topics/${topicId}`);
      // this.formData.topic = data.title;
      // this.formData.content = data.content;
      this.formData = data; //修改对象 data有 title content id
    },
    //修改数据
    async patch() {
      try {
        const {id,title,content} = this.formData;
        const {data} = await axios.patch(`/api/topics/${id}`,{
          // title:this.formData.title,
          // content:this.formData.content
          title,
          content
        });
        this.$router.back();
      } catch (err) {
        window.alert('修改失败');
      }
    }
  }

}


</script>
<style>
</style>
