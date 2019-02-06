<template>
  <div>
    hellow Vue
    <p>测试</p>
  </div>
</template>

<script>
// import '../assets/css/index.less'
export default {
	data() {
		return {

		}
	}
}
</script>

<style lang='less'>
  @import url(../assets/css/index.css);
  @import url(../assets/css/index.less); // @import导入less等 必须指定lang='less' 才会被loader解析
  div {
    p {
      a { background-color: red; }
    }
  }
</style>