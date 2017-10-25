<template>
  <div class="cart">
    <a href="javascript:;;" class="minus" v-show="isShow" @click="minus">-</a>
    <span class="text" v-show="isShow">{{count}}</span>
    <a href="javascript:;;" class="plus" @click="plus" ref="pos">+</a>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'cart',
    data () {
      return {
        isShow: false,
        count: 0
      }
    },
    create () {

    },
    mounted () {

    },
    methods: {
      plus () {
        this.isShow = true;
        this.count ++;
        this.$emit('foodsCountChange', {
          count: this.count,
          name: this.name,
          price: this.price
        });
        this.$emit('drop', this.$refs.pos)
      },
      minus () {
        this.count --;
        if (this.count <= 0) {
          this.isShow = false;
          this.count = 0;
        }
        this.$emit('foodsCountChange', {
          count: this.count,
          name: this.name,
          price: this.price
        });
      }
    },
    components: {},
    computed: {},
    props: ['name', 'price']
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .cart{
    float: right;
  }
  .cart a{
    display: inline-block;
    width: .12rem;
    line-height: .12rem;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: .3rem;
    padding: .02rem;
    height: .12rem;
    background: none;
    outline: none;
  }
  .cart .minus {
    color: #ccc;
  }

  .text {
    font-size: .14rem;
    width: .2rem;
    color: #333;
  }
  .cart .plus{
    border-color: #ff3;
    background-color: #ff3;
  }
</style>
