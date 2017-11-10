import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isShowNav: true,
    cart: {
      length: 0,
      price: 0,
      id: 0
    }
  },
  actions: {},
  mutations: {
    changeNavState (state, flag) {
      state.isShowNav = flag
    },
    addFood (state, foodName) {
      state.cart[foodName] = {
        count: 0
      }
    },
    changeCart (state, food) {
      if (food.flag === '+') {
        state.cart[food.name] = {
          price: food.price,
          count: food.count + 1
        };
        state.cart.length++;
        state.cart.price += food.price;
      } else {
        state.cart[food.name] = {
          price: food.price,
          count: food.count - 1
        };
        state.cart.length--;
        state.cart.price -= food.price;
      }
    },
    emptyCart (state) {
      for (var t in state.cart) {
        if ((typeof state.cart[t]) === 'number') {
          state.cart[t] = 0
        } else {
          state.cart[t] = {
            count: 0
          }
        }
      }
    },
    changeCartId (state, shopId) {
      if (shopId !== state.cart.id) {
        state.cart = {
          length: 0,
          price: 0,
          id: shopId
        }
      }
      console.log(state.cart);
    }
  },
  getters: {},
  modules: {}
})

export default store
