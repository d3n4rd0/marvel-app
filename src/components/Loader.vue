<template>
  <div class="loader-wrapper">
    <span class="text glow">Loading...</span>
    <div class="loader">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loader'
};
</script>

<style lang="scss" scoped>
.loader-wrapper {
  width: 99%;
  height: 100%;
  .text {
    display: block;
    top: 35%;
    width: 99%;
    position: absolute;
    color: #97e2dd;
    font-size: 28px;
  }
  .glow {
    font-size: 45px;
    color: #97e2dd;
    text-align: center;
    animation: glow 1s ease-in-out infinite alternate;
  }

  @-webkit-keyframes glow {
    from {
      text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #97e2dd,
        0 0 40px #97e2dd, 0 0 50px #335696, 0 0 60px #97e2dd, 0 0 70px #97e2dd;
    }

    to {
      text-shadow: 0 0 20px #97e2dd, 0 0 30px #335696, 0 0 40px #335696,
        0 0 50px #97e2dd, 0 0 60px #97e2dd, 0 0 70px #97e2dd, 0 0 80px #97e2dd;
    }
  }
}
$bg: #111;
$fg: #97e2dd;
$ds: #335696;
$txt: #fff;

@mixin cc() {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

div {
  position: absolute;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  overflow: hidden;
  &:before,
  &:after {
    content: "";
    position: absolute;
    display: block;
    box-sizing: border-box;
  }
}

.loader {
  @include cc();
  top:40%;
  left:50%;
  width: 20em;
  height: 20em;
  border: 0.5em solid $fg;
  border-radius: 50%;
  animation: shadowOuter 4s 0s ease infinite alternate;
  &:before {
    @include cc();
    width: 19em;
    height: 19em;
    border: 0.35em solid transparentize($ds, 0.25);
    border-radius: 50%;
    animation: shadowInner 4s 0s ease infinite alternate;
  }
  &:after {
    @include cc();
    width: 19em;
    height: 19em;
    border: 0.35em solid transparentize($ds, 0.75);
    border-radius: 50%;
    filter: drop-shadow(0 0 7em $ds);
  }
}

.dot {
  top: 70%;
  width: 8em;
  height: 2em;
  overflow: visible;
  transition: all 1s ease;
  transform: rotate(0deg);
  &:after {
    top: -1em;
    left: 50%;
    width: 1.5em;
    height: 1.5em;
    background: $fg;
    border-radius: 50%;
    filter: drop-shadow(0 0 0.5em $fg) drop-shadow(0 0 0.25em $ds);
  }
  &:nth-child(1) {
    left: calc(33% - 5em);
    animation: moveFirst 2s 0s ease infinite;
  }
  &:nth-child(2) {
    left: calc(50% - 5em);
    animation: moveSecond 2s 0s ease infinite;
  }
  &:nth-child(3) {
    left: calc(67% - 5em);
    animation: moveThird 2s 0s ease infinite;
  }
}

@keyframes moveFirst {
  0% {
    left: calc(33% - 5em);
  }
  100% {
    left: calc(50% - 5em);
  }
}

@keyframes moveSecond {
  0% {
    left: calc(50% - 5em);
  }
  100% {
    left: calc(67% - 5em);
  }
}

@keyframes moveThird {
  0% {
    left: calc(67% - 5em);
    transform: rotate(0deg);
  }
  100% {
    left: calc(33% - 5em);
    transform: rotate(360deg);
  }
}

@keyframes shadowOuter {
  0% {
    filter: drop-shadow(0 0 1em $ds);
  }
  100% {
    filter: drop-shadow(0 0 3em $ds);
  }
}

@keyframes shadowInner {
  0% {
    filter: drop-shadow(0 0 3em $ds);
  }
  100% {
    filter: drop-shadow(0 0 5em $ds);
  }
}
</style>
