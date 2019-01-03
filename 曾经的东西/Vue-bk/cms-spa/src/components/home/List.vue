<template>
  <section class="container topic-list">
    <ul class="media-list">
      <li class="media" v-for=" (e,i) in topics " >
        <div class="media-left">
          <a href="#">
          <img width="40" height="40" class="media-object" src="../common/avatar-max-img.png" alt="...">
          </a>
        </div>
        <div class="media-body">
          <h4 class="media-heading">
            <router-link :to="{name:'detail',params:{id:e.id}}">
              {{ e.title }}
            </router-link>
          </h4>
          <p>谁谁谁 回复了问题 • 1 人关注 • 3 个回复 • 14 次浏览 • {{ e.modify_time }}</p>
        </div>
      </li>
    </ul>
    <div class="block">
      <!--  @size-change 当每页显示大小改变时 [5,10,15,20]变化时
            @current-change 当前页码改变时
            :page-size 每页显示多少条
            total 总页码 -->
      <el-pagination
        @size-change="pageSizeChange"
        @current-change="pageChange"
        :current-page="currentPage4"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="100"
         layout="total, sizes, prev, pager, next, jumper"
        :total="sumYm">
      </el-pagination>

    </div>
  </section>
</template>
<script>
import axios from 'axios';

export default {
  data () {
    return {
      topics:[],
      sumYm:0, //总页码
      page:1,
      pageSize:5
    }
  },
  created () {
    this.change(this.page,this.pageSize);
  },
  methods:{
    async change (page,pageSize) { //查询 每页数据
      const {data} = await axios.get(`/api/topics?_page=${page}&_limit=${pageSize}`);
      this.sumYm = data.count;
      this.topics = data.topics; //设置总页码
    },
    async pageSizeChange (pageSize) { //自动获取 每页显示几条
      this.pageSize = pageSize;
      this.change(this.page,this.pageSize);
    },
    async pageChange (page) { //自动获取页码
      this.page = page;
      this.change(this.page,this.pageSize);
    },
    
  }
}


</script>
<style>
</style>
