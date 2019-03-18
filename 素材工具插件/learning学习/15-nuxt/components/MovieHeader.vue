<template>
  <section class="movie-header">
    <ul>
      <li>
        <nuxt-link to="/Movie/onlineTheater">正在热映</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/Movie/upcoming">即将上映</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/Movie/top250">top250</nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="scss">
  .movie-header ul {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: 70px;
    line-height: 70px;
    li {
      flex: 1;
      text-align: center;
      background-color: #1A2634;
      border-left: 1px solid #fff;
      a {
        display: block;
        width: 100%;
        height: 100%;
        font-size: 24px;
        color: #fff;
      }
    }
    li:first-child {
      border-left: 0 none;
    }
  }
</style>