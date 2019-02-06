import Vue from 'vue'
import Vuex from 'vuex'
import dbInfo from '@/store/modules/dbInfo'
import generator from '@/store/modules/generator'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    dbInfo,
    generator
  }
})

export default store