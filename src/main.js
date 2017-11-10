// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
import 'lib-flexible'

Vue.config.productionTip = false
Vue.prototype.$axios = axios

/* 引入mockjs */
require('./mock')
/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    eventHub: new Vue()
  },
  router,
  store,
  template: '<App/>',
  components: { App }
})
