<template>
    <div class="footer-nav">
        <router-link class="flex-item" to="/">
            <i class="iconfont icon-home"></i>
            <span>主页</span>
        </router-link>
        <router-link class="flex-item" to="/order">
            <i class="iconfont icon-order"></i>
            <span>订单</span>
        </router-link>
        <router-link class="flex-item" to='/mine'>
            <i class="iconfont icon-mine-red"></i>
            <span>我的</span>
        </router-link>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'footer-nav',
        data () {
            return {}
        },
        create () {

        },
        mounted () {

        },
        methods: {},
        components: {},
        computed: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .footer-nav {
        height: 100px;
        background-color: #efefef;
        border-top: 1px solid #999;
        display: flex;
    }

    .footer-nav a {
        text-decoration: none;
        color: #666;
        flex: 1;
        text-align: center;
    }

    .footer-nav i {
        display: block;
        margin-top: 6px;
        font-size: 40px;
    }

    .footer-nav span {
        font-size: 30px;
    }

    .footer-nav .router-link-exact-active {
        color: #12c594;
    }
</style>
