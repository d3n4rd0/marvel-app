<template>
  <div class="navigation">
    <nav class="sidebar bar-block w3-small w3-hide-small w3-center">
      <div class="logo">
        <svg width="130" height="52" xmlns="http://www.w3.org/2000/svg">
          <rect fill="#EC1D24" width="100%" height="100%" />
          <path
            fill="#FEFEFE"
            d="M126.222 40.059v7.906H111.58V4h7.885v36.059h6.757zm-62.564-14.5c-.61.294-1.248.44-1.87.442v-14.14h.04c.622-.005 5.264.184 5.264 6.993 0 3.559-1.58 5.804-3.434 6.705zM40.55 34.24l2.183-18.799 2.265 18.799H40.55zm69.655-22.215V4.007H87.879l-3.675 26.779-3.63-26.78h-8.052l.901 7.15c-.928-1.832-4.224-7.15-11.48-7.15-.047-.002-8.06 0-8.06 0l-.031 39.032-5.868-39.031-10.545-.005-6.072 40.44.002-40.435H21.278L17.64 26.724 14.096 4.006H4v43.966h7.95V26.78l3.618 21.192h4.226l3.565-21.192v21.192h15.327l.928-6.762h6.17l.927 6.762 15.047.008h.01v-.008h.02V33.702l1.845-.27 3.817 14.55h7.784l-.002-.01h.022l-5.011-17.048c2.538-1.88 5.406-6.644 4.643-11.203v-.002C74.894 19.777 79.615 48 79.615 48l9.256-.027 6.327-39.85v39.85h15.007v-7.908h-7.124v-10.08h7.124v-8.03h-7.124v-9.931h7.124z"
          />
          <path fill="#EC1D24" d="M0 0h30v52H0z" />
          <path
            fill="#FEFEFE"
            d="M31.5 48V4H21.291l-3.64 22.735L14.102 4H4v44h8V26.792L15.577 48h4.229l3.568-21.208V48z"
          />
        </svg>
      </div>
      <ul>
      <li class="bar-item" :class="{ active: (activeRoute == '/heroes' || activeRoute == '/')}" @click="changeRoute('/heroes')">
        <router-link to="/heroes" class="navigation-button">
          <span>Heroes</span>
        </router-link>
      </li>
      <li class="bar-item" :class="{ active: activeRoute == '/comics'}" @click="changeRoute('/comics')">
        <router-link to="/comics" class="navigation-button">
        <span>Comics</span>
        </router-link>
      </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  data () {
    return {
      activeRoute: this.$router.history.current.path
    }
  },
  methods: {
    changeRoute (route) {
      this.activeRoute = route
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  &:focus, &:visited {
    color:white;
  }
}
@media (min-width: 651px) {
  .sidebar {
    height: 50%;
    position: fixed;
    top: 98px;
    left: 50px;
    z-index: 1;
    overflow: auto;
    font-size: 12px;
    width: 150px;
    background: #ec1d24;
    border-radius: 5px;
    box-shadow: 0 0px 40px #97e2dd, 0 0 0 3px #00fffeeb;
    transition: 0.2s;
    min-height: 350px;
    .logo {
      margin-top:20px;
    }
    ul {
      margin: 0;
      padding: 0;
      position: absolute;
      transform: translate(-50%,-50%);
      display: block;
      top:40%;
      left:50%;
      li {
        list-style-type: none;
        margin-top: 30px;
        &:hover span{
          color:#fff;
        }
        &:hover a{
          background:#dd4b39;
        }
        &:hover a:before{
          background:#b33a2b;
        }
        &:hover a:after{
          background:#e66a5a;
        }
        a {
          text-decoration: none;
          display: block;
          width: 100px;
          height: 40px;
          background: #fff;
          text-align: left;
          padding-left:10px;
          transform: rotate(0deg) skew(0deg) translate(0,0);
          transition:0.5s;
          box-shadow: -10px 10px 5px rgba(0, 0, 0, 0.5);
          span {
            padding: 0;
            margin: 0;
            position: absolute;
            top:0px;
            color:#333;
            letter-spacing: 1px;
            transition: 0.5s;
          }
        }
        a:before {
          content: '';
          position: absolute;
          top: 3px;
          left: -5px;
          height: 100%;
          width: 5px;
          background: #b1b1b1;
          transform: rotate(0deg) skewY(-45deg);
          transform: 0.5s;
        }
        a:after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: -3px;
          height: 5px;
          width: 100%;
          background: #b1b1b1;
          transform: rotate(0deg) skewX(-45deg);
          transform: 0.5s;
        }
        a:hover {
          transform: rotate(0deg) skew(5deg,5deg) translate(0px,0px);
        }
        &.active {
          span {
            color: #fff;
          }
          a {
          background:#dd4b39;
          }
          a:before{
            background:#b33a2b;
          }
          a:after{
            background:#e66a5a;
          }
        }
      }
    }
  }
}
.bar-item {
  font-size:30px;
  color:#333;
  line-height: 40px;
}
@media (max-width: 650px) {
  .navigation {
    min-width:350px;
  }
  .sidebar {
    width: 100%;
    height: 60px;
    position: fixed;
    z-index: 1;
    top:0;
    line-height: 60px;
    text-align: center;
    padding: 0px;
    transition: 0.2s;
    background: #ec1d24;
    box-shadow: 0px 0px 10px 0px #00fffe;
    ul {
      margin: 0;
      li {
        list-style-type: none;
        font-size: 16px;
        &:hover span{
          color:#00fffe;
          background-color: none;
        }
        a {
          text-decoration: none
        }
        &:hover a{
          color: #00fffe;
          font-size: 26px;
          text-align: center;
          transition: 0.5s;
        }
        &.active {
          border-bottom:1px solid red;
          span {
            color: #00fffe;
            font-size: 26px;
            text-align: center;
            text-shadow: 0 0 20px #00fffe, 0 0 30px #335696, 0 0 40px #335696,
              0 0 50px #00fffe, 0 0 60px #00fffe, 0 0 70px #00fffe, 0 0 80px #00fffe;
          }
          a {
          color:#dd4b39;
          }
        }
      }
    }
    .logo {
      float: left;
      height: 60px;
      margin: 3px;
    }
  }
  .bar-item {
    float: right;
    margin-right: 40px;
    .navigation-button {
      line-height: 55px;
      margin: auto;
      text-align: center;
    }
  }
}
@media (max-width: 400px) {
  .bar-item {
    margin-right: 10px;
    transition: 0.2s;
  }
}
</style>
