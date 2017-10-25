import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isShowNav: true
  },
  actions: {
  },
  mutations: {
    changeNavState (state, flag) {
      state.isShowNav = flag
    }
  },
  getters: {
  },
  modules: {
  }
})

export default store
