<template>
  <div id="app">
    <Navigation />
    <router-view/>
  </div>
</template>

<script>
import Navigation from './components/Navigation'
import style from './assets/style.scss'
export default {
  name: 'App',
  components: {
    Navigation
  },
}

</script>
<style>
#app {
  font-family: 'Marvel-Regular';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
body {
  background-color: #7d0f13;

}
</style>
