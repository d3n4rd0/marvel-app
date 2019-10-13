<template>
    <div id="cover">
      <div class="search-wrapper">
        <div class="tb">
          <div class="td">
            <input type="text" v-model="search" :placeholder="title" required @keyup.enter="fetchComics">
          </div>
          <div class="td" id="s-cover">
            <button type="submit" @click="fetchComics">
              <div id="s-circle"></div>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'SearchInput',
  props: ['title'],
  data () {
    return {
      search: ''
    }
  },
  methods: {
    fetchComics () {
      this.$emit('trigger-search', this.search)
    }
  }
}
</script>

<style lang="scss" scoped>
.tb
{
    display: table;
    width: 100%;
}

.td
{
    display: table-cell;
    vertical-align: middle;
}

input, button
{
    color: #00fffe;
    font-family: Nunito;
    padding: 0;
    margin: 0;
    border: 0;
    background-color: transparent;
}

#cover
{
    padding: 35px;
    background-color: #ec1d24;
    border-radius: 20px;
    box-shadow: 0 10px 40px #97e2dd, 0 0 0 7px #00fffeeb;
    transform: scale(0.5);
    margin-left: 13%;
}

.search-wrapper
{
    height: 50px;
}

input[type="text"]
{
    width: 100%;
    height: 50px;
    font-size: 45px;
    line-height: 1;
}

input[type="text"]:focus
{
  border: none;
  outline: none;
}

input[type="text"]::placeholder
{
    color: #e16868;
}

#s-cover
{
    width: 1px;
    padding-left: 35px;
}

button
{
    position: relative;
    display: block;
    width: 84px;
    height: 50px;
    cursor: pointer;
}

#s-circle
{
    position: relative;
    top: -12px;
    left: 0;
    width: 40px;
    height: 40px;
    margin-top: 0;
    border-width: 10px;
    border: 10px solid #00fffe;
    background-color: transparent;
    border-radius: 50%;
    transition: 0.5s ease all;
}

button span
{
    position: absolute;
    top: 43px;
    left: 32px;
    display: block;
    width: 45px;
    height: 15px;
    background-color: transparent;
    border-radius: 10px;
    transform: rotateZ(52deg);
    transition: 0.5s ease all;
}

button span:before, button span:after
{
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 39px;
    height: 13px;
    background-color: #00fffe;
    border-radius: 10px;
    transform: rotateZ(0);
    transition: 0.5s ease all;
}

#s-cover:hover #s-circle
{
    top: -1px;
    width: 67px;
    height: 15px;
    border-width: 0;
    background-color: #00fffe;
    border-radius: 20px;
}

#s-cover:hover span
{
    top: 50%;
    left: 56px;
    width: 25px;
    margin-top: -9px;
    transform: rotateZ(0);
}

#s-cover:hover button span:before
{
    bottom: 11px;
    transform: rotateZ(52deg);
}

#s-cover:hover button span:after
{
    bottom: -11px;
    transform: rotateZ(-52deg);
}
#s-cover:hover button span:before, #s-cover:hover button span:after
{
    right: -6px;
    width: 40px;
    background-color: #00fffe;
}
@media (max-width: 650px) {
  #cover {
    margin-left: 0px;
    transition: 0.2s;
  }
}
</style>
