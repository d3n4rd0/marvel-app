<template>
  <div id="app">
    <Navigation />
    <router-view/>
  </div>
</template>

<script>
import Navigation from './components/Navigation'
import './assets/style.scss'
export default {
  name: 'App',
  components: {
    Navigation
  }
}

</script>
<style>
#app {
  font-family: 'Marvel';
  text-align: center;
   text-transform: uppercase;
}
body {
  background-color: #7d0f13;

}
</style>
