import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/modules/authentication'
import teacherm from '@/modules/teacher'
import studentm from '@/modules/student'
import newsm from '@/modules/news'
import gamesm from '@/modules/games'
import statisticsm from '@/modules/statistics'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage,
  modules: ['auth']
})

export default new Vuex.Store({
  state:{
    loading: false
  },
  mutations: {
    setLoading(state, bool){
      state.loading = bool
    }
  },
  modules:{
    auth,
    teacherm,
    studentm,
    newsm,
    gamesm,
    statisticsm
  },
  plugins: [vuexLocal.plugin]
})
