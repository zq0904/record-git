<template>
<div>
  <router-link class="btn btn-success" to="/list/new">添加学生</router-link>
  <div class="table-responsive">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>编号</th>
          <th>姓名</th>
          <th>年龄</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for=" (e,i) in list">
          <td>{{ i+1 }}</td>
          <td>{{ e.name }}</td>
          <td>{{ e.age }}</td>
          <td>
            <router-link :to="`/list/update?id=${e.id}`" >编辑</router-link>
            <a href="#/" 
            @click.prevent="del(e.id)" >删除</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  data () {
    return {
      list:[{'id':1,name:'赵琦',age:'25'}] //会被重新覆盖
    }
  },
  created () {
    this.loadList();
  },
  methods: {
    async loadList () { // async函数  
      var data = await axios.get('http://127.0.0.1:3000/list');
      this.list = data.data;
    },
    async del (id) {
      if( !window.confirm('您确定要删除吗？') ) return;
      axios.delete(`http://127.0.0.1:3000/list/${id}`) //虽然删除了 但是需要重新查询数据显示页面
      .then( e => this.loadList() );
    }
  }
}
</script>

<style>
</style>
