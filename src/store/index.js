import { createStore } from 'vuex'

export default createStore({
  state: {
    currentUser: null,
  },
  getters: {
    currentUser: (state) => state.currentUser,
  },
  mutations: {
    SET_CURRENT_USER(state, user) {
      state.currentUser = user; 
    },
    CLEAR_CURRENT_USER(state) {
      state.currentUser = null; 
    },
  },
  actions: {
    async login({ commit }, { id }) {
      const users = JSON.parse(localStorage.getItem('users')) || []; 
      const user = users.find(user => user.id === id); 

      if (user) {
        commit('SET_CURRENT_USER', user); 
        return true; 
      } else {
        return false; 
      }
    },
    logout({ commit }) {
      commit('CLEAR_CURRENT_USER');
      localStorage.removeItem('usuarioLogeado');
    },
  },
  modules: {
    
  },
});
