<template>
  <section class="movie-type">
    <nuxt-link v-for="v in movieList" :key="v.id" :to="`/MovieDetailed?type=${$route.params.type}&id=${v.id}`">
      <img :src="v.img" :alt="v.title">
      <p>名称：{{v.title}}</p>
      <p>评分：{{v.rating}}</p>
    </nuxt-link>
  </section>
</template>

<script>
export default {
  layout: 'movie',
  head() { // 设置当前页面的
    return {
      title: '豆瓣电影',
      meta: [{name: 'keywords', content: '电影，经典电影排行'}]
    }
  },
  async asyncData({$axios, params}) {
    const data = await $axios.$get(`/${params.type}`)
    return { movieList: data }
  },
  data () {
    return {
      
    }
  }
}
</script>

<style lang="scss">
  .movie-type {
    display: flex;
    flex-direction: column;
    align-items: center;
    > a:first-child {
      margin-top: 10px;
    }
    > a {
      display: block;
      margin-bottom: 10px;
      padding-top: 10px;
      width: 400px;
      text-align: center;
      border: 1px solid #ccc;
    }
    > a:hover {
      box-shadow: 2px 2px 5px #ccc;
    }
  }
</style>