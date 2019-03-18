<template>
  <div>
    Bar/:id 页面{{ $route.params.id }}
  </div>
</template>

<script>
export default {
  // 路由参数校验
  validate ({ params }) {
    return /^\d+$/.test(params.id)
  },
  data () {
    return {
      
    }
  }
}
</script>

<style lang="scss">
  
</style>