<template>
  <div>
    <h4>Bar 模块</h4>
    <ul class="info">
      <li v-for="v in data" :key="v.id">
        <nuxt-link :to="`/Bar/${v.id}`">{{v.title}}</nuxt-link>
      </li>
    </ul>
    <!-- 子路由出口 默认加载 students/index.vue -->
    <nuxt-child></nuxt-child>
  </div>
</template>

<script>
export default {
  layout: 'test',
  data () {
    return {}
  },
  // 组件加载之前调用 服务端或路由更新之前被调用 内部拿不到this
  async asyncData({$axios, req, res, params, error}) { // 提供一些服务端的请求 响应 动态路由参数等
    // process.server 判断是否在服务端
    console.log('asyncData')
    const data = await $axios.$get('/onlineTheater')
    // error({statusCode: 404, message: e}) // 错误处理 跳错误页面
    return { data }// 返回值会融合组件自有data 作为组件的数据
  },
  // nuxt中 能够在服务端使用的生命周期钩子 只有 beforeCreate created 但是在这种钩子中写的代码会在客户端在执行一次
  beforeCreate() { console.log('beforeCreate') },
  created() { console.log('created') },
}
</script>

<style lang="scss">
  .info {
    border: 1px solid red;
  }
</style>