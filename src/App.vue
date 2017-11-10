<template>
    <div id="app">
        <router-view class="index-wapper"></router-view>
        <footer-nav v-show="isShowNav"></footer-nav>
    </div>
</template>

<script>
    import FooterNav from './components/FooterNav.vue';
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
    @import url(./assets/style/base/reset.css);
    @import url(./assets/style/base/base.css);
    @import url(./assets/style/base/iconfont.css);
    html,body,#app{
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    #app{
        display: flex;
        flex-direction: column;
    }
    .index-wapper{
        flex: 1;
    }
</style>
