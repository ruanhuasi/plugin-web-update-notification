<script lang="ts">
import Vue from 'vue'
import HelloWorld2 from 'app2/HelloWorld'
import HelloWorld from './components/HelloWorld.vue'
export default Vue.extend({
  name: 'App',
  components: {
    HelloWorld,
    HelloWorld2,
  },
})
</script>

<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App2 " />
    <HelloWorld2 />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
