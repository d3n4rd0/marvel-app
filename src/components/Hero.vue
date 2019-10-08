<template>
  <div class="hero">
    Hero
    {{ id }}
  </div>
</template>

<script>
export default {
  name: 'Hero',
  props: [
    'id'
  ],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style scoped>

</style>
