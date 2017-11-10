<template>
  <div class="home-list">
    <header class="home-header" @click="changeList">
      外卖小店
    </header>
    <baidu-map v-show="isShowMap" class="bm-view" :ak="ak" :center="center" :zoom="zoom" @ready="handler">
      <template v-for="item in shopList">
        <bm-marker v-if="item.isOpen" :position='item' @click="clickHandler(item)"></bm-marker>
      </template>
      <bm-geolocation ref="location" anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :autoLocation='true' @locationSuccess="setLocationSuccess"></bm-geolocation>
    </baidu-map>
    <div v-show="!isShowMap" class="shop-list">
      <swiper class="shop-swiper" :data="bannerList"></swiper>
      <div class="shop-title">
        <div class="title-line"></div>
        <div class="title-text">门店列表</div>
        <div class="title-line"></div>
      </div>
      <scroll class="shop-scroll"></scroll>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {BaiduMap, BmMarker, BmGeolocation} from 'vue-baidu-map'
  import Swiper from '../swiper/swiper.vue'
  import Scroll from '../scroll/scroll.vue'
  export default {
    name: 'home',
    data () {
      return {
        ak: '5KQ1LlYpGpUGwco0kmGq04TCzcf8KyQy',
        center: {lng: 0, lat: 0},
        markerPoint: {lng: 0, lat: 0},
        zoom: 3,
        shopList: [],
        bannerList: [],
        isShowMap: false
      }
    },
    create () {

    },
    mounted () {
      this.getShopList()
    },
    activated () {
      this.$store.commit('changeNavState', true)
    },
    methods: {
      getShopList () {
        this.$axios.post('/api/getShop').then((data) => {
          this.shopList = data.data.shopList;
          this.bannerList = data.data.bannerList;
          console.log(data.data);
        })
      },
      handler ({BMap, map}) {
        //  功能搁置 自动定位
        this.center.lng = 116.3553;
        this.center.lat = 40.0724;
        this.zoom = 15;
        this.markerPoint = {lng: 116.3553, lat: 40.0724};
      },
      setLocationSuccess (e) {
        console.log(e.point);
        alert(e.point.lng);
        alert(e.point.lat);
      },
      changeList () {
        this.isShowMap = !this.isShowMap;
        //  this.$store.commit('changeNavState', this.isShowMap)
      },
      clickHandler (e) {
        console.log(e.shopId);
      }
    },
    components: {
      BaiduMap,
      BmMarker,
      BmGeolocation,
      Swiper,
      Scroll
    },
    computed: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import "../../assets/scss/common.scss";

  .bm-view {
    flex: 1;
    display: block;
  }

  .home-list {
    flex: 1;
  }

  .shop-list {
    flex: 1;
    display: flex;
    flex-direction: column;

  img {
    width: 100%;
  }

  }
  .map-err {
    background-size: 100%;
  }

  .shop-title {
    display: flex;
    height: .34rem;
    line-height: .34rem;
    padding: 0 .2rem;
  }

  .title-line {
    flex: 1;
    top: -.16rem;
  @include border-1px(1, rgba(7, 17, 27, 0.8));

  }

  .title-text {
    font-size: .14rem;
    padding: 0 .2rem;
  }

  .shop-scroll {
    flex: 1;
  }

  .shop-swiper {
    height: 2rem;
    width: 100%;
  }
</style>
