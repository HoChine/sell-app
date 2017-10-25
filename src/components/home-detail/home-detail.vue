<template>
  <div class="shop-detail">
    <header class="home-header detail-header">
      <router-link tag="i" to="/home/homeList" class="iconfont icon-delete"></router-link>
      {{shopDetail.shopName}}-{{shopId}}
    </header>
    <div class="detail-box">
      <dl>
        <dt class="detail-img"><img :src="'/static/shop/shop' + shopDetail.shopImg + '.jpg'"></dt>
        <dd class="detail-info">
          <h3>{{shopDetail.shopName}}</h3>
          <div>起送￥{{shopDetail.firstPrice}}/配送￥{{shopDetail.sendPrice}}</div>
          <div class="detail-discounts">
            公告：暂无公告
          </div>
        </dd>
        <dd class="detail-text">
          <i class="iconfont icon-houdongfangiconfont24"></i>
        </dd>
      </dl>
      <div class="detail-wapper">
        <span>{{shopDetail.discounts.id == 1 ?'首':'惠'}}</span>
        <span>{{shopDetail.discounts.text}}</span>
        <i class="iconfont icon-shoucang collect"></i>
      </div>
    </div>
    <div class="detail-main">
      <div class="detail-nav">
        <div class="goods" @click="toggleDetail('goods')" :class="{'goods-active':isShowGoods}">商品</div>
        <div class="reviews" @click="toggleDetail('reviews')" :class="{'goods-active':!isShowGoods}">点评</div>
      </div>
      <div v-show="isShowGoods" class="goods-wapper">
        <div class="goods-nav" ref="leftscrollhook">
          <ul>
            <li v-for="(item,$index) in shopDetail.goods" :class="{'goods-nav-active':$index === currentIndex}" @click="foodsMenu($index)">
              <span>{{item.name}}</span>
            </li>
          </ul>
        </div>
        <div class="goods-main" ref="rightscrollhook">
          <ul>
            <li v-for="(item,index) in shopDetail.goods">
              <div class="food-title">{{item.name}}</div>
              <dl class="food-item" v-for="subItem in item.foods">
                <dt><img :src="subItem.image" alt=""></dt>
                <dd>
                  <h4>{{subItem.name}}</h4>
                  <div class="food-price">￥{{subItem.price}}</div>
                  <div class="food-sellCount">周销量{{subItem.sellCount}}</div>
                  <Cart :name="subItem.name" :price="subItem.price" @foodsCountChange="foodsCount" @drop="drop"></Cart>
                </dd>
              </dl>
            </li>
          </ul>
        </div>
      </div>
      <div v-show="!isShowGoods" class="reviews-wapper">
        reviews-wapper
      </div>
    </div>
    <div class="shopping-cart">
      <div class="cart-info">
        <div class="cart-icon" @click="toggleShowCartList">
          <i class="iconfont icon-gouwuche"></i>
          <span>{{foodsTotal.count}}</span>
        </div>
        <div class="cart-text">
          费用合计：<span>{{foodsTotal.price}}</span>元
          <br>
          另需配送费{{shopDetail.sendPrice}}元
        </div>
      </div>
      <div class="commit-order">
        提交订单
      </div>
      <div class="cart-list" v-show="isShowCartList">
        <div class="cart-shadow"></div>
        <div class="cart-list-info">
          <div v-for="item in cartList">
            <span>{{item.name}}</span>
            <span>{{item.price}}</span>
            <span>{{item.count}}</span>
          </div>
        </div>
      </div>
      <div class="ball-container">
        <div v-for="ball in balls">
          <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import Cart from '../cart/cart.vue'
  export default {
    name: 'shop-detail',
    data () {
      return {
        shopDetail: {
          Reviews: [],
          discounts: {},
          firstPrice: '',
          goods: [],
          isCollect: '',
          sendPrice: '',
          shopImg: '1',
          shopName: '1'
        },
        shopId: 0,
        isShowGoods: true,
        leftScroll: null,
        rightScroll: null,
        rightScrollHeight: [],
        scrollY: 0,
        cartList: {},
        foodsTotal: {
          count: 0,
          price: 0
        },
        balls: [
          {show: false},
          {show: false},
          {show: false},
          {show: false},
          {show: false}
        ],
        dropBalls: [],
        isShowCartList: false
      }
    },
    create () {

    },
    mounted () {
      this.$nextTick(() => {
        this.initScroll()
      })
    },
    activated () {
      this.$nextTick(() => {
        this.getShopDetail();
        this.shopId = this.$route.query.shopId;
        this.$store.commit('changeNavState', false)
      })
    },
    deactivated () {
      this.$store.commit('changeNavState', true)
    },
    methods: {
      foodsCount (food) {
        this.cartList[food.name] = {
          name: food.name,
          price: food.price,
          count: food.count
        };
        this.calcFoods();
      },
      calcFoods () {
        let count = 0;
        let price = 0;
        for (var t in this.cartList) {
          count += this.cartList[t].count;
          price += this.cartList[t].count * this.cartList[t].price;
        }
        this.foodsTotal.count = count;
        this.foodsTotal.price = price;
      },
      getShopDetail () {
        this.$axios.post('/api/getShopDetail').then((data) => {
          console.log(data.data);
          this.shopDetail = data.data;
        })
      },
      toggleDetail (flag) {
        this.isShowGoods = flag === 'goods'
      },
      initScroll () {
        setTimeout(() => {
          this.leftScroll = new BScroll(this.$refs.leftscrollhook, {
            click: true
          })
          this.rightScroll = new BScroll(this.$refs.rightscrollhook, {
            click: true,
            probeType: 3
          })
          this.rightScroll.on('scroll', (pos) => {
            this.scrollY = Math.abs(Math.round(pos.y))
          })
          this.calcScrollHeight()
        }, 200)
      },
      calcScrollHeight () {
        let li = this.$refs.rightscrollhook.getElementsByTagName('li');
        let height = 0;
        for (let i = 0, len = li.length; i < len; i++) {
          let obj = li[i];
          this.rightScrollHeight.push(height);
          height += obj.clientHeight;
        }
      },
      foodsMenu (index) {
        let li = this.$refs.rightscrollhook.getElementsByTagName('li');
        let el = li[index]
        this.rightScroll.scrollToElement(el, 300)
      },
      drop (el) {
        //  触发一次事件就会将所有小球进行遍历
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) { //  将false的小球放到dropBalls
            ball.show = true;
            ball.el = el; //  设置小球的el属性为一个dom对象
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      beforeDrop (el) { //  这个方法的执行是因为这是一个vue的监听事件
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect(); //  获取小球的相对于视口的位移(小球高度)
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22); // 负数,因为是从左上角往下的的方向
            el.style.display = ''; // 清空display
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            //  处理内层动画
            let inner = el.getElementsByClassName('inner-hook')[0]; //  使用inner-hook类来单纯被js操作
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      dropping (el, done) { //  这个方法的执行是因为这是一个vue的监听事件
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight; //  触发重绘html
        this.$nextTick(() => { // 让动画效果异步执行,提高性能
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          //  处理内层动画
          let inner = el.getElementsByClassName('inner-hook')[0]; //  使用inner-hook类来单纯被js操作
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
          el.addEventListener('transitionend', done); //  Vue为了知道过渡的完成，必须设置相应的事件监听器。
        });
      },
      afterDrop (el) { //  这个方法的执行是因为这是一个vue的监听事件
        let ball = this.dropBalls.shift(); // 完成一次动画就删除一个dropBalls的小球
        if (ball) {
          ball.show = false;
          el.style.display = 'none'; // 隐藏小球
        }
      },
      toggleShowCartList () {
        this.isShowCartList = !this.isShowCartList;
      }
    },
    components: {
      Cart
    },
    computed: {
      currentIndex () {
        for (var i = 0; i < this.rightScrollHeight.length; i++) {
          var height1 = this.rightScrollHeight[i];
          var height2 = this.rightScrollHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../../assets/scss/common.scss";
  @import "home-detail.scss";
</style>
