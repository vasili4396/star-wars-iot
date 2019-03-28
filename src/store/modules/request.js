import axios from 'axios'
const state = {
  rqError: {
    message: ''
  }
}

// getters
const getters = {
  isRqError: ({rqError}) => !!rqError.message,
  rqError: ({rqError}) => rqError
}

// actions
const actions = {
  sendRequest ({commit}, {url, method, data = {}}) {
    return new Promise((resolve) => {
      let config = {
        url,
        method
      }
      config.params = data

      axios.request(config)
        .then((response) => {
          resolve(response.data)
        })
        .catch((err) => {
          console.error(`Error in sendRequest method: ${err.response}`)
          commit('updateRequestError', {
            message: err.response.status === 404
              ? 'Сервер не нашел данных по вашему запросу'
              : `Неизвестная ошибка. Код ошибки: ${err.response.status}. Сообщение об ошибке ${err.response.statusText}`
          })
        })
    })
  },
  deleteRqError ({commit}) {
    commit('updateRequestError', {message: ''})
  }
}

// mutations
const mutations = {
  updateRequestError (state, error) {
    state.rqError = error
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
