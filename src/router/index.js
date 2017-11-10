import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import HomeList from '@/components/HomeList'
import HomeDetail from '@/components/HomeDetail'
import HomeConfirmOrder from '@/components/HomeConfirmOrder'
import Order from '@/components/Order'
import Mine from '@/components/Mine'

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
                    name: 'HomeConfirmOrder',
                    component: HomeConfirmOrder
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
