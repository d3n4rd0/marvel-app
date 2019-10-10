<template>
  <div class="comic-page">
    <div class="detail-item-bg-wrap">
      <div class="detail-item-bg">
        <img :src="thumbUrl(comicData, 'portrait_uncanny')" />
      </div>
    </div>
    <div class="grid-container _forceRgtMar">
      <h1 class="module-header small">{{comicData.title}}</h1>
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
        <!-- "Appearing in comics:" grid-->
        <div v-if="this.loadingCharacters">
          <Loader />
        </div>
        <div v-else class="characters">
          <div v-for="character, index in comicCharacters" :key="character.id" class="item">
            <ImageTile :key="index" :data="character" type="hero" />
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
  name: 'Comic',
  props: ['id'],
  data () {
    return {
      loading: false,
      loadingCharacters: false,
      comicData: {},
      comicCharacters: []
    };
  },
  components: {
    ImageTile,
    Loader
  },
  methods: {
    thumbUrl(filename, type) {
      if (filename.thumbnail) {
        return (
          filename.thumbnail.path +
          '/' +
          type +
          '.' +
          filename.thumbnail.extension
        );
      }
    },
    getComic() {
      this.loading = true;
      let url = 'http://gateway.marvel.com/v1/public/comics/'+this.id+'?ts=1234&apikey=cbda9c62ecdcccbe91cfd88996a1dd50&hash=b981bf23bad169d54156ec8511f29f73'
      fetch(url)
        .then(response => {
          response.json().then(res => {
            this.comicData = res.data.results[0]
            this.loading = false
          });
        })
        .catch(() => {
          this.loading = false
        });
    },
    getCharacters() {
      this.loadingCharacters = true
      let url = 'http://gateway.marvel.com/v1/public/comics/'+this.id+'/characters?ts=1234&apikey=cbda9c62ecdcccbe91cfd88996a1dd50&hash=b981bf23bad169d54156ec8511f29f73'
      fetch(url)
        .then(response => {
          response.json().then(res => {
            this.comicCharacters = res.data.results
            this.loadingCharacters = false
          });
        })
        .catch(() => {
          this.loadingCharacters = false
        });
    },
    openComic(comic) {
      this.$router.push("/comic/" + comic.id)
    }
  },
  mounted() {
    this.getComic();
    this.getCharacters();
  }
};
</script>

<style lang="scss" scoped>
.comic-page {
  .detail-item-bg-wrap {
    display: block;
    .detail-item-bg {
      max-width: 100%;
      margin: 0 auto;
      pointer-events: none;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      min-height: 100%;
      overflow: hidden;
      filter: opacity(0.4);
      img {
        width: 110% !important;
        filter: blur(1rem);
        height: auto !important;
        background-color: transparent !important;
      }
    }
    .featured-item-info {
      display: flex;
      flex-wrap: wrap;
    }
  }
  .grid-container {
    width: 100%;
    max-width: 1240px;
    padding: 0 30px;
    margin-left: 150px;
    margin: 0 auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .featured-item-info-wrap {
      padding: 50px 0;
      justify-content: initial;
      .featured-item-info {
        display: flex;
        flex-wrap: wrap;
        .row-item {
          flex: 1;
          width: auto;
          max-width: 100%;
          .row-item-image {
            max-width: 350px;
          }
        }
      }
      .featured-item-text {
        flex: 2;
      }
    }
  }
  .characters {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto;
    margin-left: 150px;
    justify-items: center;
    align-items: center;
    justify-content: space-evenly;
    padding: 40px 100px 0px 100px;
    height: 100%;
  }
}
</style>
