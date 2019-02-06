<template>
  <div>
    Bar 组件
    <p>num: {{ num }}</p>
    <p>msg: {{ msg }}</p>
    <p>doneArr: {{ doneArr }}</p>
    <p>getTesxtById: {{ getTesxtById('1') }}</p>
    <button type="submit" @click="add({ type: 'add', num: 5 })">更新num</button>
  </div>
</template>

<script>
// 非模块化的方式 使用vuex
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'Bar',
  data () {
    return {
      local: '本地数据'
    }
  },
  computed: {
    num () { // 在计算属性中 返回store成员
      return this.$store.state.num
    },
    // 推选把mapState映射函数写到后面去如果同名覆盖 也会去覆盖前面的 而保留store中的
    // ...mapState({
    //   msg: state => state.msg
    // }),
    // ...mapState({ // 改名常用形式
    //   msg: 'msg'
    // }),
    // ...mapState({ // 如果要获取本地数据 必须使用常规函数 以保证this
    //   msg (state) {
    //     return state.msg + this.local
    //   }
    // }),
    ...mapState(['msg']), // 最简洁的形式
    ...mapGetters(['doneArr', 'getTesxtById'])
  },
  mounted () {
    console.log(this.getTest())
  },
  methods: {
    // add () { // commit mutations
    //   // this.$store.commit('add')
    //   // this.$store.commit('add', { num: 2 })
    //   this.$store.commit({ type: 'add', num: 2 })
    // },
    ...mapMutations(['add']),
    ...mapActions(['add'])
  }
}
</script>

<style>
  p {
    margin: 0;
  }
</style>
