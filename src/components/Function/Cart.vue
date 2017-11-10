<template>
    <div class="cart">
        <a href="javascript:;;" class="minus" v-show="number" @click="handler('-')">-</a>
        <span class="text" v-show="number">{{number}}</span>
        <a href="javascript:;;" class="plus" @click="handler('+')" ref="pos">+</a>
    </div>
</template>

<script type="text/ecmascript-6">
    import { mapState } from 'vuex'
    export default {
        name: 'cart',
        data () {
            return {
                number: 0
            }
        },
        create () {
        },
        mounted () {
            if (!this.flag) {
                this.$store.commit('addFood', this.name);
            } else {
                this.number = this.cart[this.name].count;
            }
            this.$root.eventHub.$on('updateCart', () => {
                this.number = this.cart[this.name].count;
            });
        },
        methods: {
            handler (flag) {
                if (flag === '+') {
                    this.$emit('drop', this.$refs.pos)
                }
                this.$store.commit('changeCart', {
                    count: this.cart[this.name].count,
                    price: this.price,
                    name: this.name,
                    flag: flag
                })
                this.calcNumber();
            },
            calcNumber () {
                this.number = this.cart[this.name].count;
            }
        },
        components: {},
        computed: {
            ...mapState([
                'cart'
            ])
        },
        props: ['name', 'price', 'flag', 'shopId']
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .cart {
        float: right;
    }

    .cart a {
        display: inline-block;
        text-decoration: none;
        width: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #ccc;
        border-radius: 60px;
        padding: 4px;
        height: 30px;
        background: none;
        outline: none;
    }

    .cart .minus {
        color: #ccc;
    }

    .text {
        font-size: 28px;
        width: 40px;
        color: #333;
    }

    .cart .plus {
        border-color: #ff3;
        background-color: #ff3;
    }
</style>
