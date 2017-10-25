<template>
  <div id="app">
    <router-view class="index-wapper"></router-view>
    <footer-nav v-show="isShowNav"></footer-nav>
  </div>
</template>

<script type="text/ecmascript-6">
  import FooterNav from './components/footer-nav/footer-nav.vue'
  import { mapState } from 'vuex'
  export default {
    name: 'app',
    components: {
      FooterNav
    },
    computed: mapState(['isShowNav'])
  }
</script>

<style>
  @import "assets/scss/reset.css";
  @import "assets/scss/iconfont.css";

  html, body, #app {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  html {
    font-size: 100px;
  }

  body {
    font-size: 16px;
  }

  #app {
    display: flex;
    flex-direction: column;
  }
  .index-wapper{
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>
