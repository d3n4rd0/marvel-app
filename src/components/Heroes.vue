<template>
  <div class="heroes-page">
    <h1 class="title">Heroes</h1>
    <SearchInput @trigger-search="fetchHeroes" title="Find your hero"/>
    <div v-if="this.loading">
      <Loader />
    </div>
    <div v-else class="heroes">
      <div
        v-for="(hero, index) in heroes"
        :key="hero.id"
        class="item"
      >
        <ImageTile :key="index" :data="hero" type="hero"/>
      </div>
    </div>
  </div>
</template>

<script>
import ImageTile from './ImageTile'
import Loader from './Loader'
import SearchInput from './SearchInput'
import config from '../../config/index'
export default {
  name: 'Comics',
  components: {
    ImageTile,
    Loader,
    SearchInput
  },
  data () {
    return {
      loading: false,
      heroes: []
    }
  },
  methods: {
    getHeroes (searchValue) {
      this.loading = true
      let url = 'http://gateway.marvel.com/v1/public/characters?ts=' + config.dev.ts + '&apikey=' + config.dev.apiKey + '&hash=' + config.dev.hash
      if (searchValue) {
        url += '&nameStartsWith=' + searchValue
      }
      fetch(url)
        .then(response => {
          response.json().then(res => {
            this.heroes = res.data ? res.data.results : []
            this.loading = false
          })
        })
        .catch(() => {
          this.loading = false
        })
    },
    fetchHeroes (searchValue) {
      this.getHeroes(searchValue)
    }
  },
  mounted () {
    if (!this.heroes.length) {
      this.getHeroes()
    }
  }
}
</script>
