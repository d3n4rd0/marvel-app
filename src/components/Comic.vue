<template>
  <div class="comic-page">
    <div class="detail-item-bg-wrap">
      <div class="detail-item-bg">
        <img :src="thumbUrl(comicData, 'portrait_uncanny')" width="633" height="537" alt="AMAZING FANTASY 15 FACSIMILE EDITION #1" title="AMAZING FANTASY 15 FACSIMILE EDITION #1">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comic",
  props:[
    "id"
  ],
  data() {
    return {
      loading: false,
      comicData: {}
    };
  },
  methods: {
    thumbUrl(filename, type) {
      if (filename.thumbnail) {
        return (
          filename.thumbnail.path + "/"+
          type + "." +
          filename.thumbnail.extension
        );
      }
    },
    getComic() {
      this.loading = true;
      let url =
        "http://gateway.marvel.com/v1/public/comics?ts=1234&apikey=cbda9c62ecdcccbe91cfd88996a1dd50&hash=b981bf23bad169d54156ec8511f29f73&id="+this.id;
      fetch(url)
        .then(response => {
          response.json().then(res => {
            console.log(res);
            this.comicData = res.data.results[0];
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
    this.getComic();
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
      img {
        width: 110% !important;
        margin-right: -5%;
        margin-top: -30px;
        filter: blur(1rem);
        height: auto !important;
        background-color: transparent !important;
        -webkit-mask-box-image: none !important;
      }
    }
    .featured-item-info {
        display: flex;
        flex-wrap: wrap
    }
  }
}

</style>
