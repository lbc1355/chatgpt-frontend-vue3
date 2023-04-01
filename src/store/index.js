import { createStore } from 'vuex'
import MessageData from './modules/MessageData'
import User from './modules/User'
import StoreData from './modules/StoreData.js'
import StatusData from './modules/StatusData.js'
import createPersistedstate from 'vuex-persistedstate'
import { rightViewTraversalByLastPath } from '@/utils/ChatgptContext.js'
import { SendMessageToServe } from '@/api/chat.js'
export default createStore({
  modules: {
    StatusData,
    StoreData,
    MessageData,
    User
  },
  actions: {
    addMessage ({ commit }, { message, currentTopic, path }) {
      commit('StoreData/addMessage', { message, currentTopic, path })
      const status = rightViewTraversalByLastPath(this.state.StoreData.MessageTrees[currentTopic].head, path)
      commit('StatusData/updateStatus', status)
    },
    async sentMessage ({ dispatch, getters }, { message, currentTopic, path }) {
      dispatch('addMessage', { message, currentTopic, path })
      const successMessage = getters['StoreData/findSuccessNode'](path, currentTopic)
      return SendMessageToServe(successMessage)
    },
    async readData ({ commit }, { reader, responseMsg, decoder, status }) {
      return new Promise((resolve, reject) => {
        responseMsg.response()
        reader.read().then(function readLoop ({ done, value }) {
          if (done || !status.isAnswering) {
            responseMsg.message.response = true
            resolve()
            return
          }
          const text = decoder.decode(value, { stream: true })
          const split = text.split('data: ')
          for (let i = 1; i < split.length; i++) {
            if (split[i].trim() === '[DONE]') {
              reader.cancel()
              responseMsg.finish()
              resolve()
              return
            }
            const obj = JSON.parse(split[i])
            if (obj.choices[0].delta.content) {
              responseMsg.message.content += obj.choices[0].delta.content
              commit('persistence')
            }
          }
          reader.read().then(readLoop).catch(reject)
        }).catch(reject)
      })
    }
  },
  mutations: {
    persistence () {

    }
  },
  getters: {

  },
  plugins: [
    createPersistedstate({
      key: 'MessageData',
      paths: ['MessageData']
    }),
    createPersistedstate({
      key: 'User',
      paths: ['User']
    }),
    createPersistedstate({
      key: 'StoreData',
      paths: ['StoreData']
    })
  ]
})
