export default {
  namespaced: true,
  state () {
    return {
      messages: []
    }
  },
  mutations: {
    addMessage (state, payload) {
      state.messages.push(payload)
    },
    setLastMessage (state, payload) {
      state.messages[state.messages.length - 1] = payload
    },
    clearMessage (state) {
      state.messages = []
    }
  },
  getters: {
    getMesasge (state) {
      return state.messages
    },
    getSuccessMessages (state) {
      return state.messages.filter(element => {
        return element.success === true
      }).map(element => {
        return { role: element.role, content: element.content }
      })
    }
  }

}
