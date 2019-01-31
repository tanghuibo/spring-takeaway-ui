import Vue from 'vue'
import Vuex from 'vuex'
import dbInfo from '@/store/modules/dbInfo'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    dbInfo: dbInfo
  }
})

export default store