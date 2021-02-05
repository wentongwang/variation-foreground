<template>
  <el-container id="app">
    <router-view v-if="isRouterAlive" />
  </el-container>
</template>

<script>

export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(() => (this.isRouterAlive = true))
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  flex-direction: column;
  color: #303133;
}
.clearfix:after {
  content: ' ';
  display: block;
  clear: both;
  height: 0;
}
</style>
