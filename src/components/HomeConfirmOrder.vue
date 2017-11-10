<template>
  <div class="confirm-order">
    <header class="home-header detail-header header">
      <i class="iconfont icon-houdongfangiconfont24 icon-rotate" @click="back"></i>
      确认订单
    </header>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'confirm-order',
    data () {
      return {}
    },
    create () {

    },
    mounted () {

    },
    methods: {
      back () {
        this.$router.back()
      }
    },
    components: {},
    computed: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import "../assets/style/HomeConfirmOrder.scss";
</style>
