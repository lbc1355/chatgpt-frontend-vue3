<template>
  <div class="function_bar">
    <transition name="fade">
      <el-button v-if="statusRef.isAnswering" @click="stopAnswer" type="danger">停止响应</el-button>
    </Transition>
    <div style="display: flex;justify-content: center;margin-top: 10px;"  v-show="statusRef.isAnswering" >
          <MessageLoading  />
    </div>
  </div>
  <div class="container"  >
      <div v-show="!sendbarhidden" >
        <div style="display: flex;justify-content: center;height: 100%;"  v-show="!statusRef.isAnswering">
          <div class="message_input">
              <el-card  :body-style="{ padding: '10px',height: '100%'}">
                      <textarea  v-auto-height  @keydown.enter="handleEnter" v-model="userMessage.content"></textarea>
              </el-card>
          </div>
          <div style="display: flex;flex-direction: column;margin-left: 10px;">
            <div style="flex-grow: 1;">
              <el-button @click="clearTopicContent" >清空</el-button>
            </div>
            <div style="flex-grow: 1;">
              <el-button @click="sentMessage">发送</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="sendbarhide">
        <img src="../assets/hidden.png" v-if="!sendbarhidden" @click="sendbarhidden = !sendbarhidden" alt="">
        <img v-else src="../assets/appear.png" @click="sendbarhidden = !sendbarhidden">
    </div>

  </div>

  <el-dialog v-model="dialogPromptVisible" title="编辑prompt">
    <el-input v-model="prompt" type="textarea"></el-input>
  </el-dialog>

</template>

<script>
import { reactive, ref, inject, computed } from 'vue'
import { currentDate } from '@/utils/utils.js'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { AssistantMessage } from '@/bean/AssistantMessage.js'
import MessageLoading from '@/components/MessageLoading.vue'
import AutoHeight from '@/directives/auto-height'

export default {
  components: { MessageLoading },
  directives: { AutoHeight },
  setup () {
    const store = useStore()
    const sendbarhidden = ref(false)
    const statusRef = computed(() => store.getters['StatusData/getCurrentSatus'])
    const prompt = ref('')
    const dialogPromptVisible = ref(false)
    const scrollerbar = inject('scrollerbar', null)
    const userMessage = reactive({
      role: 'user',
      content: '',
      time: '',
      success: true,
      response: false,
      next: null
    })
    // 处理回车发送消息
    const handleEnter = event => {
      if (event.shiftKey) {
        //
      } else {
        event.preventDefault()
        sentMessage()
      }
    }
    // 动态调整输入框的高度
    const onInput = (event) => {
      event.target.style.height = 'auto'
      event.target.style.height = event.target.scrollHeight + 'px'
    }

    // 向服务器发送信息
    const sentMessage = async () => {
      const status = store.getters['StatusData/getCurrentSatus']
      scrollerbar.scrollToEnd()
      scrollerbar.wipeUp = false
      if (status.isAnswering || userMessage.content.trim() === '') {
        return
      }
      status.isAnswering = true
      userMessage.time = currentDate()
      const message = JSON.parse(JSON.stringify(userMessage))
      userMessage.content = ''

      const currentTopic = store.getters['StatusData/getCurrentTopic']
      const satus = store.getters['StatusData/getCurrentSatus']

      store.dispatch('addMessage', { message, currentTopic, path: satus.path })

      const responseMsg = new AssistantMessage()
      try {
        const res = await store.dispatch('sentMessage', { message: responseMsg.message, currentTopic, path: satus.path })
        if (res.status === 200) {
          responseMsg.success()
          await store.dispatch('readData', { reader: res.body.getReader(), responseMsg, decoder: new TextDecoder(), status })
        }
      } catch (e) {
        if (satus.isAnswering) { ElMessage.error('网络错误') }
      } finally {
        status.isAnswering = false
      }
    }
    const stopAnswer = () => {
      statusRef.value.isAnswering = false
    }
    // 清除话题内容
    const clearTopicContent = () => {
      const currentTopic = store.getters['StatusData/getCurrentTopic']
      store.commit('StoreData/clearTopicContent', currentTopic)
      store.commit('StatusData/clearCurrentTop')
    }

    return {
      sendbarhidden,
      statusRef,
      userMessage,
      prompt,
      dialogPromptVisible,
      handleEnter,
      sentMessage,
      stopAnswer,
      clearTopicContent,
      onInput
    }
  }
}

</script>
<style scoped lang="less">
.container{
  height: 100%;
}
.message_input{
  width:50%;
  height: 100%;
}

textarea {
  width: 100%;
  height: 80%;
  border:none;
  outline:none;
  resize:none;
  font-size: 16px;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
}
::-webkit-scrollbar {display: none;}

.function_bar{
position:absolute;
top:-35%; /*这里设置为负数，使其向上悬浮*/
left: 50%;
transform: translateX(-50%);
z-index:1; /*比box1更高*/
}
.fade-enter-from,
.fade-leave-to {
opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
transition: opacity .5s;
}

.sendbarhide{
  position: fixed;
  bottom: 1%;
  left: 50%;
  transform: translateX(-50%);
  img {
    width: 30px;
    margin: auto;
    display:block;
    cursor: pointer;
  }
}
</style>
