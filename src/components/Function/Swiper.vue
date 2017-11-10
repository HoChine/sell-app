<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in data"><img :src="'/static/banner/banner' + item.img + '.jpg'"></div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Swiper from 'swiper'
    import '../../../node_modules/swiper/dist/css/swiper.min.css'
    export default {
        name: 'swiper',
        data () {
            return {
                mySwiper: null
            }
        },
        create () {

        },
        mounted () {
            this.$nextTick(() => {
                this.initSwiper()
            })
        },
        props: ['data'],
        methods: {
            initSwiper () {
                setTimeout(() => {
                    this.mySwiper = new Swiper('.swiper-container', {
                        autoplay: 3000,
                        autoplayDisableOnInteraction: false,
                        pagination: '.swiper-pagination',
                        paginationClickable: true
                    })
                }, 200)
            }
        },
        components: {},
        computed: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .swiper-container{
        width: 100%;
    }
    .swiper-slide img{
        width: 100%;
    }
</style>
