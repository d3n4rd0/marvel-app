<template>
  <div class="comic-page">
    <div class="detail-item-bg-wrap">
      <div class="detail-item-bg">
        <img :src="thumbUrl(comicData, 'portrait_uncanny')" />
      </div>
    </div>
    <div class="grid-container _forceRgtMar">
      <h1 class="title">{{comicData.title}}</h1>
      <div class="featured-item-info-wrap">
        <div class="featured-item-info">
          <div class="row-item comic-item">
            <div class="row-item-image">
              <img
                class="frame-img"
                :src="thumbUrl(comicData, 'portrait_uncanny')"
              />
            </div>
          </div>

          <div class="featured-item-text">
            <h1 class="module-header large">{{comicData.title}}</h1>
            <div class="featured-item-desc">
              {{comicData.description}}
            </div>
          </div>
        </div>
        <h2 class="title"> Characters appearing: </h2>
        <div v-if="this.loadingCharacters">
          <Loader />
        </div>
        <div v-else-if="comicCharacters.length > 0" class="characters">
          <div
            v-for="(character, index) in comicCharacters"
            :key="character.id"
            class="item"
          >
            <ImageTile :key="index" :data="character" type="hero" />
          </div>
        </div>
        <h3 class="title" v-else> No data to show </h3>
      </div>
    </div>
  </div>
</template>

<script>
import ImageTile from './ImageTile'
import Loader from './Loader'
import config from '../../config/index'
export default {
  name: 'Comic',
  props: ['id'],
  data () {
    return {
      loading: false,
      loadingCharacters: false,
      comicData: {},
      comicCharacters: []
    }
  },
  components: {
    ImageTile,
    Loader
  },
  methods: {
    thumbUrl (filename, type) {
      if (filename.thumbnail) {
        return (
          filename.thumbnail.path +
          '/' +
          type +
          '.' +
          filename.thumbnail.extension
        )
      }
    },
    getComic () {
      this.loading = true
      let url = 'http://gateway.marvel.com/v1/public/comics/' +
        this.id +
        '?ts=' +
        config.dev.ts +
        '&apikey=' +
        config.dev.apiKey +
        '&hash=' +
        config.dev.hash
      fetch(url)
        .then(response => {
          response.json().then(res => {
            this.comicData = res.data.results[0]
            this.loading = false
          })
        })
        .catch(() => {
          this.loading = false
        })
    },
    getCharacters () {
      this.loadingCharacters = true
      let url = 'http://gateway.marvel.com/v1/public/comics/' +
        this.id +
        '/characters?ts=' +
        config.dev.ts +
        '&apikey=' +
        config.dev.apiKey +
        '&hash=' +
        config.dev.hash
      fetch(url)
        .then(response => {
          response.json().then(res => {
            this.comicCharacters = res.data.results
            this.loadingCharacters = false
          })
        })
        .catch(() => {
          this.loadingCharacters = false
        })
    },
    openComic (comic) {
      this.$router.push('/comic/' + comic.id)
    }
  },
  mounted () {
    this.getComic()
    this.getCharacters()
  }
}
</script>
