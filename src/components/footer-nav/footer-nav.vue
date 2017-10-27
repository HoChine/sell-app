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
<style lang="scss">
  .footer-nav {
    height: .54rem;
    background-color: #efefef;
    border-top: 1px solid #999;
    display: flex;
    a {
      text-decoration: none;
      color: #666;
      flex: 1;
      text-align: center;
    }
    i {
      margin-top: .05rem;
      display: block;
      font-size: .25rem;
    }
    span {
      font-size: .15rem;
    }
    .router-link-exact-active{
      color: #12c594;
    }
  }
</style>
