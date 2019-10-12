<template>
  <div class="hero-page">
    <div class="detail-item-bg-wrap">
      <div class="detail-item-bg">
        <img :src="thumbUrl(heroData, 'portrait_uncanny')" />
      </div>
    </div>
    <div class="grid-container _forceRgtMar">
      <h1 class="title">{{heroData.name}}</h1>
      <div class="featured-item-info-wrap">
        <div class="featured-item-info">
          <div class="row-item comic-item">
            <div class="row-item-image">
              <img
                class="frame-img"
                :src="thumbUrl(heroData, 'portrait_uncanny')"
              />
            </div>
          </div>

          <div class="featured-item-text">
            <h1 class="module-header large">{{heroData.name}}</h1>
            <div class="featured-item-desc">
              {{heroData.description ? heroData.description : 'No description for this character'}}
            </div>
          </div>
        </div>
        <!-- "Appearing in comics:" grid-->
        <div v-if="this.loadingComics">
          <Loader />
        </div>
        <div v-else class="comics">
          <div v-for="comic, index in heroComics" :key="comic.id" class="item">
            <ImageTile :key="index" :data="comic" type="comic" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageTile from './ImageTile'
import Loader from './Loader'
export default {
  name: 'Hero',
  props: ['id'],
  data () {
    return {
      loading: false,
      loadingComics: false,
      heroData: {},
      heroComics:[]
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
    getHero() {
      this.loading = true
      let url = 'http://gateway.marvel.com/v1/public/characters/'+this.id+'?ts=1234&apikey=cbda9c62ecdcccbe91cfd88996a1dd50&hash=b981bf23bad169d54156ec8511f29f73'
      fetch(url)
        .then(response => {
          response.json().then(res => {
            this.heroData = res.data.results[0]
            this.loading = false
          });
        })
        .catch(() => {
          this.loading = false
        });
    },
    getComics() {
      this.loadingComics = true
      let url = 'http://gateway.marvel.com/v1/public/characters/'+this.id+'/comics?ts=1234&apikey=cbda9c62ecdcccbe91cfd88996a1dd50&hash=b981bf23bad169d54156ec8511f29f73'
      fetch(url)
        .then(response => {
          response.json().then(res => {
            this.heroComics = res.data.results
            this.loadingComics = false
          })
        })
        .catch(() => {
          this.loadingComics = false
        });
    },
  },
  mounted() {
    this.getHero()
    this.getComics()
  }
};
</script>

<style lang="scss" scoped>

</style>
