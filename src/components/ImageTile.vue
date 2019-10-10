<template>
  <div class="item">
    <div @click="openItem(data)">
      <div class="comic-title">{{type=== 'comic' ? data.title : data.name}}</div>
      <img :src="thumbUrl(data)" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageTile',
  props: ['data', 'type'],
  data () {
    return {}
  },
  methods: {
    thumbUrl(filename) {
      if (filename.thumbnail) {
        return (
          filename.thumbnail.path +
          "/portrait_uncanny." +
          filename.thumbnail.extension
        )
      }
    },
    openItem(comic) {
        if(this.type === 'comic') {
            this.$router.push("/comic/" + this.data.id)
        } else {
            this.$router.push("/hero/" + this.data.id)
        }
    }
  }
};
</script>

<style lang="scss" scoped>
.item {
  height: 500px;
  width: 300px;
  cursor: pointer;
  opacity: 0.8;
  .comic-title {
    background-color: #ec1d24;
    color: white;
    width: 300px;
    height: 40px;
    line-height: 40px;
  }
  &:hover {
    opacity: 1;
  }
}
</style>
