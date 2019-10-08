<template>
  <div class="comics-page">
    <h1 class="title">Comics</h1>
    <div class="comics">
      <div v-for="comic, index in comics" :key="comic.id" class="item">
        <div class="" @click="openComic(comic)">
          <div class="comic-title">{{comic.title}}</div>
          <img :src="thumbUrl(comic)" />
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comics",
  data() {
    return {
      loading: false,
      comics: []
    };
  },
  methods: {
    thumbUrl(filename) {
      if (filename.thumbnail) {
        return (
          filename.thumbnail.path +
          "/portrait_uncanny." +
          filename.thumbnail.extension
        );
      }
    },
    getComics(limit, offset) {
      this.loading = true;
      let url =
        "http://gateway.marvel.com/v1/public/comics?ts=1234&apikey=cbda9c62ecdcccbe91cfd88996a1dd50&hash=b981bf23bad169d54156ec8511f29f73";
      if (limit) {
        url += "&limit=" + limit;
      }
      if (offset) {
        url += "&offset=" + offset;
      }
      fetch(url)
        .then(response => {
          response.json().then(res => {
            console.log(res);
            this.comics = res.data.results;
            this.loading = false;
          });
        })
        .catch(() => {
          this.loading = false;
        });
    },
    openComic(comic){
      this.$router.push('/comic/'+comic.id)
    }
  },
  mounted() {
    this.getComics();
  }
};
</script>

<style lang="scss" scoped>
.comics-page {
  .title {
    margin: auto;
    height: 52px;
    line-height: 52px;
    margin-left: 130px
  }
  .comics {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto;
    background: rgba(114, 186, 94, 0.05);
    margin-left: 130px;
    justify-items: center;
    align-items: center;
    justify-content: space-evenly;
    .item {
      height: 500px;
      width: 300px;
      cursor: pointer;
      opacity: 0.7;
      .comic-title {
        background-color: #ec1d24;
        color:white;
        width: 300px;
        height: 40px;
        
      }
      &:hover {
        opacity: 1;
      }
    }
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

}

</style>
