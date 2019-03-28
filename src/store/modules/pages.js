const state = {
  pageName: 'No title defined'
}

// getters
const getters = {
  pageName: state => state.pageName
}

// actions
const actions = {
  setPageName ({ commit }, data) {
    commit('updatePageName', { pageName: data })
  }
}

// mutations
const mutations = {
  updatePageName (state, { pageName }) {
    state.pageName = pageName
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
