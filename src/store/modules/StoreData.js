import { addElement, getBasePath, getElemenstByPath, findElementsByCondition } from '@/utils/ChatgptContext.js'
import store from '..'

export default {
  namespaced: true,
  state () {
    return {
      MessageTrees: [
        {
          topic: '新话题',
          head: null,
          totalHeight: 0
        }
      ]

    }
  },
  mutations: {
    addTopic (state, payload) {
      state.MessageTrees.push({
        topic: payload ? payload.content.substring(0, 5) : '新话题',
        head: null,
        totalHeight: 0
      })
    },
    addMessage (state, payload) {
      // 树长度为0，添加话题
      if (state.MessageTrees.length === 0) {
        store.commit('StoreData/addTopic', payload.message)
        addElement(state.MessageTrees[state.MessageTrees.length - 1], payload.currentTopic.path, payload.message)
      } else if (state.MessageTrees[payload.currentTopic].head === null) {
        state.MessageTrees[payload.currentTopic].topic = payload.message.content.substring(0, 5)
        addElement(state.MessageTrees[payload.currentTopic], payload.path, payload.message)
      } else {
        addElement(state.MessageTrees[payload.currentTopic], payload.path, payload.message)
      }
    },
    removeTopic (state, index) {
      if (state.MessageTrees.length === 1) {
        state.MessageTrees = [
          {
            topic: '新话题',
            head: null,
            totalHeight: 0
          }
        ]
        return
      }
      state.MessageTrees.splice(index, 1)
    },
    clearTopicContent (state, payload) {
      state.MessageTrees[payload] =
        {
          topic: '新话题',
          head: null,
          totalHeight: 0
        }
    },
    // 修改消息
    updateMessage (state, payload) {
      console.log(payload)
    }
  },
  getters: {
    getTopics (state) {
      return state.MessageTrees.map((element, index) => {
        return { topic: element.topic, index: index }
      })
    },
    // 获取所有话题的基本状况
    getTopicsBaseStatus (state) {
      return state.MessageTrees.map((element, index) => {
        return getBasePath(element.head)
      })
    },
    getMessagesByPath: (state) => (path, index) => {
      if (state.MessageTrees.length === 0) {
        return
      }
      return getElemenstByPath(state.MessageTrees[index].head, path)
    },
    findSuccessNode: (state) => (path, index) => {
      return findElementsByCondition(state.MessageTrees[index].head, path, (element) => {
        return element.success
      })
    },
    getCurrentMessageTree (state) {
      const getCurrentTopic = store.getters['StatusData/getCurrentTopic']
      return state.MessageTrees[getCurrentTopic]
    }
  }

}
