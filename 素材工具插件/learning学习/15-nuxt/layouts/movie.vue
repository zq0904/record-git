<template>
  <div class="movie-layout">
    <MovieHeader/>
    <nuxt/>
  </div>
</template>

<script>
import MovieHeader from '~/components/MovieHeader.vue'
export default {
  components: {
    MovieHeader
  },
  data () {
    return {
      
    }
  }
}
</script>

<style lang="scss">
  .movie-layout {
    padding-top: 70px;
  }
</style>