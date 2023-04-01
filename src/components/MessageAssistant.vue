<template>
      <div class="assistant_message_container">
        <div v-show="currentIndex > 0" class="switch" @click="previous" style="margin-right: 10px;">
          <img src="../assets/previous.png" alt="">
        </div>
        <div class="assistant_message">
          <el-card :body-style="{ padding: '0px 10px' }" >
            <v-md-preview :text="message.content"></v-md-preview>
            <div class="message-tip">
              <p>{{ message.time }} / tokens:{{ countTokens(message.content) }} / {{ currentIndex + 1 }} /{{ length }}</p>
              <img src="../assets/rerequest.png" alt="" v-show="message.role === 'assistant'" @click="reAnswerEvent">
            </div>
          </el-card>
        </div>
        <div  v-show="currentIndex + 1 < length" class="switch" @click="next" style="margin-left: 10px;"  >
          <img src="../assets/next.png" alt="">
        </div>
      </div>
</template>
<script>
import { countChars } from '@/utils/utils'
import { useStore } from 'vuex'
import { leftViewTraversalByLastPath } from '@/utils/ChatgptContext.js'
export default {
  name: 'MessageAssistant',
  props: {
    message: {
      type: Object
    },
    loading: {
      type: Boolean,
      default: true
    },
    index: {
      type: Number
    },
    currentIndex: {
      type: Number
    },
    length: {
      type: Number
    }
  },
  setup (props, { emit }) {
    const store = useStore()
    const countTokens = (content) => {
      const data = countChars(content)
      return ((data.chineseChars * 2) + (data.chineseWords * 3)) + data.englishChars + data.englishWords
    }

    const reAnswerEvent = () => {
      emit('re-answer', props.index)
    }

    const next = () => {
      if (props.currentIndex + 1 === props.length) {
        return
      }
      switchMessage(1)
    }

    const previous = () => {
      if (props.currentIndex === 0) {
        return
      }
      switchMessage(-1)
    }
    const switchMessage = (num) => {
      const currentStatus = store.getters['StatusData/getCurrentSatus']
      if (props.index + 1 !== currentStatus.path.length) {
        currentStatus.path.splice(props.index + 1)
      }
      currentStatus.path[props.index] = props.currentIndex + num
      const status = leftViewTraversalByLastPath(store.getters['StoreData/getCurrentMessageTree'].head, currentStatus.path)
      store.commit('StatusData/updateStatus', status)
    }
    return { countTokens, reAnswerEvent, next, previous }
  }
}
</script>
<style scoped lang="less">
.github-markdown-body{
  padding: 0;
}
.assistant_message_container{
  display: flex;
  .assistant_message{
    max-width: 90%;
    img{
      width: 15px;
      height: 15px;
      cursor: pointer;
    }
  }
}

.switch{
  display: flex;
  align-items: center; /* 将图像垂直居中 */
  border-radius: 4px;
  cursor: pointer;
  img{
    width: 10px;
    height: 10px;
  }
}

.switch:hover{
  display: flex;
  align-items: center; /* 将图像垂直居中 */
  border-radius: 4px;
  background-color: #e1dfdd;
  cursor: pointer;
  img{
    width: 10px;
    height: 10px;
  }
}
.message-tip{
  display: flex;

  p{
    padding: 0px 0px 12px 32px;
    margin: 0;
    font-size: 12px;
    color: gray;
  }
  img{
    margin-left: 10%;
    width: 15px;
    height: 15px;
    display:block;
    cursor: pointer;
  }
}
</style>
