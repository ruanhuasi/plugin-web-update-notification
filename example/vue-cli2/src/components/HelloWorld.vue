<script lang="ts">
import Vue from 'vue'
import Test from './test.vue'
export default Vue.extend({
  name: 'HelloWorld',
  components: {
    Test,
  },
  props: {
    msg: String,
  },
})
</script>

<template>
  <div class="hello">
    <Test />
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
