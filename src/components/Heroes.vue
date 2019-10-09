<template>
  <div class="heroes-page">
    <h1 class="title">Heroes</h1>
    <SearchInput @trigger-search="fetchHeroes" title="Find your hero"/>
    <div v-if="this.loading">
      <Loader />
    </div>
    <div v-else class="heroes">
      <div v-for="hero, index in heroes" :key="hero.id" class="item">
        <ImageTile :key="index" :data="hero" type="hero"/>
      </div>
    </div>
  </div>
</template>

<script>
import ImageTile from './ImageTile'
import Loader from "./Loader";
import SearchInput from './SearchInput'

export default {
  name: "Comics",
  components: {
    ImageTile,
    Loader,
    SearchInput
  },
  data() {
    return {
      loading: false,
      heroes: []
    };
  },
  methods: {
    getHeroes(searchValue) {
      this.loading = true
      let url =
        "http://gateway.marvel.com/v1/public/characters?ts=1234&apikey=cbda9c62ecdcccbe91cfd88996a1dd50&hash=b981bf23bad169d54156ec8511f29f73"
      if(searchValue) {
        url += "&nameStartsWith=" + searchValue;
      }
      fetch(url)
        .then(response => {
          response.json().then(res => {
            console.log(res);
            this.heroes = res.data.results
            this.loading = false
          });
        })
        .catch(() => {
          this.loading = false
        });
    },
    fetchHeroes(searchValue){
      console.log('search value', searchValue);
      this.getHeroes(searchValue);
    }
  },
  mounted() {
    if(!this.heroes.length){
      this.getHeroes()
    }
  }
};
</script>

<style lang="scss" scoped>
.heroes-page {
  .title {
    margin: auto;
    height: 52px;
    line-height: 52px;
    color: white;
  }
  .heroes {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto;
    margin-left: 130px;
    justify-items: center;
    align-items: center;
    justify-content: space-evenly;
    padding: 40px 100px 0px 100px;
    height: 100%
  }
  @media (max-width: 1390px) {
    .heroes {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
  @media (max-width: 1090px) {
    .heroes {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (max-width: 790px) {
    .heroes {
      grid-template-columns: 1fr;
    }
  }
  @media (max-width: 450px) {
    .heroes {
      margin-left: 0px;
    }
  }

}
</style>
