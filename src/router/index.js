import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home'
import Order from '@/components/order/order'
import Mine from '@/components/mine/mine'
import HomeDetail from '@/components/home-detail/home-detail'
import HomeList from '@/components/home-list/home-list'
import confirmOrder from '@/components/confirm-order/confirm-order'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      redirect: '/home/HomeList'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/home/HomeList',
          name: 'HomeList',
          component: HomeList
        },
        {
          path: '/home/HomeDetail',
          name: 'HomeDetail',
          component: HomeDetail
        },
        {
          path: '/home/confirmOrder',
          name: 'confirmOrder',
          component: confirmOrder
        }
      ]
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/mine',
      name: 'Mine',
      component: Mine
    }

  ]
})
