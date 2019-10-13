<template>
  <div class="comics-page">
    <h1 class="title">Comics</h1>
    <SearchInput @trigger-search="fetchComics" title="Find your comic"/>
    <div v-if="this.loading">
      <Loader />
    </div>
    <div v-else class="comics">
      <div
        v-for="(comic, index) in comics"
        :key="comic.id"
        class="item"
      >
        <ImageTile :key="index" :data="comic" type="comic" />
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
      comics: []
    }
  },
  methods: {
    thumbUrl (filename) {
      if (filename.thumbnail) {
        return (
          filename.thumbnail.path +
          '/portrait_uncanny.' +
          filename.thumbnail.extension
        )
      }
    },
    getComics (searchValue) {
      this.loading = true
      let url = 'http://gateway.marvel.com/v1/public/comics?ts=' +
        config.dev.ts +
        '&apikey=' +
        config.dev.apiKey +
        '&hash=' +
        config.dev.hash
      if (searchValue) {
        url += '&titleStartsWith=' + searchValue
      }
      fetch(url)
        .then(response => {
          response.json().then(res => {
            this.comics = res.data.results
            this.loading = false
          })
        })
        .catch(() => {
          this.loading = false
        })
    },
    openComic (comic) {
      this.$router.push('/comic/' + comic.id)
    },
    fetchComics (searchValue) {
      this.getComics(searchValue)
    }
  },
  mounted () {
    if (!this.comics.length) {
      this.getComics()
    }
  }
}
</script>
