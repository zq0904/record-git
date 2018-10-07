<template>
  <div>
    <p class="bb">asd</p>
  </div>
</template>

<script>

export default {
  data() {
    return {}
  },
  created() {
    console.log(_.join([1, 2, 3]))
  }
}
</script>

<style>
  .bb {
    display: flex;
    transform: translate(0, 0);
    color: red;
  }
</style>
