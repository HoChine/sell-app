<template>
    <div class="HomeList">
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
            <home-list-scroll class="shop-scroll"></home-list-scroll>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {BaiduMap, BmMarker, BmGeolocation} from 'vue-baidu-map'
    import Swiper from './Function/Swiper.vue'
    import HomeListScroll from './HomeListScroll.vue'
    export default {
        name: 'HomeList',
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
                this.zoom = 16;
                this.markerPoint = {lng: 116.3553, lat: 40.0724};
            },
            setLocationSuccess (e) {
                console.log(e.point);
                alert(e.point.lng);
                alert(e.point.lat);
            },
            clickHandler (e) {
                console.log(e.shopId);
            },
            changeList () {
                this.isShowMap = !this.isShowMap;
            }
        },
        components: {
            BaiduMap,
            BmMarker,
            BmGeolocation,
            Swiper,
            HomeListScroll
        },
        computed: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    @import "../assets/style/HomeList.scss";
</style>
