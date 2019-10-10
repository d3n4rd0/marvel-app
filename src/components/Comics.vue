<template>
  <div class="comics-page">
    <h1 class="title">Comics</h1>
    <SearchInput @trigger-search="fetchComics" title="Find your comic"/>
    <div v-if="this.loading">
      <Loader />
    </div>
    <div v-else class="comics">
      <div v-for="comic, index in comics" :key="comic.id" class="item">
        <ImageTile :key="index" :data="comic" type="comic" />
      </div>
    </div>
  </div>
</template>

<script>
import ImageTile from './ImageTile'
import Loader from './Loader'
import SearchInput from './SearchInput'
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
      comics: [],
    };
  },
  methods: {
    thumbUrl (filename) {
      if (filename.thumbnail) {
        return (
          filename.thumbnail.path +
          "/portrait_uncanny." +
          filename.thumbnail.extension
        );
      }
    },
    getComics(searchValue) {
      this.loading = true;
      let url = 'http://gateway.marvel.com/v1/public/comics?ts=1234&apikey=cbda9c62ecdcccbe91cfd88996a1dd50&hash=b981bf23bad169d54156ec8511f29f73'
      if(searchValue) {
        url += "&titleStartsWith=" + searchValue
      }
      fetch(url)
        .then(response => {
          response.json().then(res => {
            console.log(res);
            this.comics = res.data.results
            this.loading = false
          });
        })
        .catch(() => {
          this.loading = false;
        });
    },
    openComic(comic) {
      this.$router.push("/comic/" + comic.id)
    },
    fetchComics(searchValue){
      this.getComics(searchValue)
    }
  },
  mounted() {
    if (!this.comics.length) {
      this.getComics()
    }
  }
};
</script>

<style lang="scss" scoped>
.comics-page {
  .title {
    margin: auto;
    height: 52px;
    line-height: 52px;
    color: white;
  }
  .comics {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto;
    margin-left: 130px;
    justify-items: center;
    align-items: center;
    justify-content: space-evenly;
    padding: 40px 100px 0px 100px;
    height: 100%;
  }
  @media (max-width: 1390px) {
    .comics {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
  @media (max-width: 1090px) {
    .comics {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (max-width: 790px) {
    .comics {
      grid-template-columns: 1fr;
    }
  }
  @media (max-width: 650px) {
    .title {
      margin-top:70px;
      transition: 0.5s;
    }
    .comics {
      margin-left: 0px;
    }
  }
  @media (max-width: 450px) {
    .comics {
      margin-left: 0px;
    }
  }
}

</style>
