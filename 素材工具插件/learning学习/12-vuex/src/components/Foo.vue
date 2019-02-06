<template>
  <div>
    Foo 组件
    <p>num: {{ getTest.num }}</p>
    <button type="submit" @click="add({ num: 2 })">异步更新num</button>
    <p>表单处理</p>
    <input type="text" v-model="value">
  </div>
</template>

<script>
// 模块化的方式 使用vuex
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Foo',
  computed: {
    // num () {
    //   return this.$store.state.test.num
    // },
    // ...mapState({
    //   num: state => state.test.num
    // }),),
    // ...mapState('test', ['num']), // 使用带命名空间的mapState等也必须提供 namespaced: true,
    ...mapGetters(['getTest']), // 比较推选的做法是 不使用namespaced 而使用getter
    value: {
      set (val) {
        this.$store.commit('upDateTest', { inputValue: val })
      },
      get () {
        return this.$store.state.test.inputValue
      }
    }
  },
  methods: {
    ...mapActions(['add'])
  }
}
</script>

<style>
  p {
    margin: 0;
  }
</style>
