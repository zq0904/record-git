<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" /><br />
    <label for="">姓名：<input type="text" v-model="name"/></label><br />
    <label for="">
      性别：<input type="radio" v-model="gender" value="1" />男<input
        type="radio"
        v-model="gender"
        value="0"
      />女</label
    ><br />
    <label for="">年龄：<input type="text" v-model="age"/></label><br />
    <button type="button" @click="handleClick">提交</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'app',
  data() {
    return {
      name: '',
      gender: '0',
      age: ''
    }
  },
  methods: {
    handleClick() {
      axios({
        method: 'post',
        url: 'http://0.0.0.0:3000',
        data: this.$data
      })
        .then(res => console.log(res)) // eslint-disable-line
        .catch(err => console.log('err', err)) // eslint-disable-line
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
