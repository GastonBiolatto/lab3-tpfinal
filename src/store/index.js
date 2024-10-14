import { createStore } from 'vuex'

export default createStore({
  state: {
    userId: null,
  },
  getters: {
    getUserId: (state) => state.userId,
  },
  mutations: {
    setUserId (state, id){
      state.userId = id;
    }
  },
  actions: {
    login({commit}, id){
      commit('setUserId', id);
    }
  },
  modules: {
  }
})
