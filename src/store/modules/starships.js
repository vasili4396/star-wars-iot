import api from '../api'

const getDefaultState = () => ({
  shoppingCart: []
})

const state = getDefaultState()

const getters = {
  shoppingCart: state => state.shoppingCart,
  itemsInShoppingCart: state => state.shoppingCart.length,
  totalCost: state => state.shoppingCart.reduce((sum, item) => {
    return sum + parseFloat(item.cost)
  }, 0).toFixed(2),
  isInShoppingCart: state => starship => state.shoppingCart.findIndex(item => item.name === starship.name) !== -1
}

const actions = {
  getStarShips ({dispatch}, data) {
    return new Promise((resolve) => {
      dispatch('sendRequest', {
        method: 'get',
        url: api.url.getStarShips,
        data: data
      })
        .then(responseData => {
          resolve(responseData)
        })
    })
  },
  addToShoppingCart ({commit}, starShip) {
    commit('appendNewStartship', starShip)
  },
  clearShoppingCart ({commit}) {
    commit('deletePurchases')
  },
  removeFromShoppingCart ({commit}, starShip) {
    commit('sliceExistingStarship', starShip)
  }
}

// mutations
const mutations = {
  appendNewStartship (state, starShip) {
    state.shoppingCart = [...state.shoppingCart, starShip]
  },
  sliceExistingStarship (state, starShip) {
    let indexInShoppingCart = state.shoppingCart.findIndex(item => item.name === starShip.name && item.model === starShip.model)
    if (indexInShoppingCart > -1) state.shoppingCart.splice(indexInShoppingCart, 1)
  },
  deletePurchases (state) {
    Object.assign(state, getDefaultState())
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
