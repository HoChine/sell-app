<template>
  <div id="mescroll" class="mescroll">
    <!--展示上拉加载的数据列表-->
    <div>
      <router-link class="detail-link" tag="dl" :to="{path:'/home/homeDetail',query:{shopId: item.shopId}}" v-for="item in pageData" :key="item.index">
        <dt class="shop-img"><img :src="'/static/shop/shop' + item.shopImg + '.jpg'" ></dt>
        <dd class="shop-info">
          <h3>{{item.shopName}}</h3>
          <div>起送￥{{item.firstPrice}}/配送￥{{item.sendPrice}}</div>
          <div class="shop-discounts">
            <span>{{item.discounts.id == 1 ?'首':'惠'}}</span>
            <span>{{item.discounts.text}}</span>
          </div>
        </dd>
        <dd class="shop-status">
          <div>{{item.isOpen?'营业中':'休息中'}}</div>
          <div>距您{{item.distance | discount}}</div>
        </dd>
      </router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import MeScroll from 'mescroll.js';
  import '../../../node_modules/mescroll.js/mescroll.min.css';
  const PAGE_NUM = 5;
  const LOADTIME = 1000;
  export default {
    name: 'scroll',
    data () {
      return {
        meScroll: null,
        shopListData: [],
        pageData: []
      }
    },
    create () {

    },
    mounted () {
      this.$nextTick(() => {
        this.initMeScroll()
      })
    },
    methods: {
      initMeScroll () {
        let _this = this;
        this.meScroll = new MeScroll('mescroll', {
          down: {
            autoShowLoading: true,
            callback: _this.downCallback
          },
          up: {
            page: {size: PAGE_NUM},
            offset: 0,
            callback: _this.upCallback
          }
        })
      },
      downCallback () {
        this.$axios.post('/api/getShop').then((data) => {
          setTimeout(() => {
            this.meScroll.endSuccess();
            this.shopListData = data.data.shopList;
            // 模拟的分页数据
            this.pageData = [];
            this.pageData = this.shopListData.slice(0, PAGE_NUM);
            this.meScroll.resetUpScroll(true);
          }, LOADTIME);
        })
      },
      upCallback (page) {
        let start = page.size * page.num;
        let end = page.size * (page.num + 1);
        let count = 0;
        setTimeout(() => {
          for (let i = start; i < end; i++) {
            if (this.shopListData[i]) {
              this.pageData.push(this.shopListData[i]);
              count++;
            }
          }
          this.meScroll.endSuccess(count);
        }, LOADTIME)
      }
    },
    components: {},
    computed: {},
    filters: {
      discount: function (distance) {
        var str = ''
        if (distance > 1000) {
          str = (distance / 1000).toFixed(2) + 'km'
        } else {
          str = distance + 'm'
        }
        return str
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .mescroll{

  }
  .detail-link{
    padding: 0 .1rem;
    display: flex;
  }
  .shop-img{
    flex:2;
    img{
      width: 90%;
    }
  }
  .shop-info {
    flex: 2;
    h3 {
      margin-bottom: .05rem;
      width: 1.3rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    div {
      color: #666;
      line-height: .24rem;
      font-size: .14rem;
    }
  }
  .shop-discounts{
    :first-child{
      border: 1px solid #333;
      padding: 0 .03rem;
      background-color: #fff;
    }
  }
  .shop-status{
    flex:1;
    text-align: center;
    color:#666;
    font-size: .12rem;
    :first-child{
      margin: .15rem .1rem;
      padding: .01rem 0;
      border: 1px solid #333;
    }
  }
</style>
