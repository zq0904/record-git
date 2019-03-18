<template>
  <section class="movie-detailed">
    <div>
      <img :src="detailed.img" :alt="detailed.title">
      <p>上映时间：{{detailed.detailed[0].year}}</p>
      <p>电影名称：{{detailed.title}}</p>
      <p>电影类型：{{detailed.genres.join(',')}}</p>
      <p>电影评分：{{detailed.rating}}</p>
      <p>电影描述：{{detailed.detailed[0].summary}}</p>
    </div>
  </section>
</template>

<script>
export default {
  layout: 'movie',
  async asyncData({$axios, query: {type, id}}) {
    const detailed = await $axios.$get(`/${type}/${id}?_embed=detailed`)
    return {detailed}
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss">
  .movie-detailed {
    display: flex;
    flex-direction: column;
    align-items: center;
    > div:first-child {
      margin-top: 10px;
    }
    > div {
      display: block;
      margin-bottom: 10px;
      padding-top: 10px;
      width: 400px;
      text-align: center;
      border: 1px solid #ccc;
      p:last-child {
        padding: 10px;
      }
    }
    > div:hover {
      box-shadow: 2px 2px 5px #ccc;
    }
  }
</style>