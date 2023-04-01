export default {
  namespaced: true,
  state () {
    return {
      currentTopic: 0,
      topicsStatus: [
        {
          path: [],
          length: [],
          isAnswering: false
        }
      ]
    }
  },
  mutations: {
    initData (state, payload) {
      if (payload === null || payload.length === 0) {
        return
      }
      payload.forEach(element => {
        element.isAnswering = false
      })
      state.topicsStatus = payload
    },
    removeStatus (state, payload) {
      if (state.currentTopic === payload && state.topicsStatus.length > 1) {
        state.currentTopic = 0
      }
      if (state.topicsStatus.length === 1) {
        state.topicsStatus = [
          {
            path: [],
            length: [],
            isAnswering: false
          }
        ]
        return
      }
      state.topicsStatus.splice(payload, 1)
    },
    changCurrentTopic (state, payload) {
      state.currentTopic = payload
    },
    addStatus (state, payload) {
      state.topicsStatus.push(payload)
    },
    addPath (state, payload) {
      state.topicsStatus[state.currentTopic].path.push(payload)
    },
    addLength (state, payload) {
      state.topicsStatus[state.currentTopic].length.push(payload)
    },
    updatePath (state, payload) {
      state.topicsStatus[state.currentTopic].path = payload
    },
    updateLength (state, payload) {
      state.topicsStatus[state.currentTopic].length = payload
    },

    updateStatus (state, payload) {
      state.topicsStatus[state.currentTopic].path = payload.path
      state.topicsStatus[state.currentTopic].length = payload.length
    },
    clearCurrentTop (state) {
      state.topicsStatus[state.currentTopic].path = []
      state.topicsStatus[state.currentTopic].length = []
    }
  },
  getters: {
    getCurrentTopic (state) {
      return state.currentTopic
    },
    getPath (state) {
      return state.topicsStatus[state.currentTopic].path
    },
    getCurrentSatus (state) {
      return state.topicsStatus[state.currentTopic]
    }
  }
}
