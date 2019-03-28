import Vue from 'vue'
import Vuex from 'vuex'
import request from './modules/request'
import starShips from './modules/starships'
import pages from './modules/pages'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    request,
    starShips,
    pages
  }
})
