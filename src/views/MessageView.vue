<template>
  <div class="message_container" :style="PageState.screenWidth<900 ? 'width:100%' : 'width:50%'">
    <el-tabs v-model="chooseTab" type="card" editable
     @tab-remove ="tabRemove" @tab-add ="tabAdd" @tab-change="tabChange" >
    <el-tab-pane v-for="item in topics" :key="item" :label="item.topic" :name="item.index" >
    </el-tab-pane>
  </el-tabs>
    <div class="host">
      <div v-for="(item, index) in messages" :key="item">
        <MessageUser v-if="item.role === 'user'" :message="item"  :index="index" :length="status.length[index]" :currentIndex="status.path[index]" />
        <MessageAssistant v-else :message="item" @reAnswer="reAnswerEvent" :index="index" :length="status.length[index]" :currentIndex="status.path[index]" />
      </div>
    </div>
  </div>
</template>
<script>
import MessageUser from '@/components/MessageUser.vue'
import MessageAssistant from '@/components/MessageAssistant.vue'
import { ref, computed, reactive } from 'vue'
import { useStore } from 'vuex'
import { AssistantMessage } from '@/bean/AssistantMessage.js'
import { ElMessage } from 'element-plus'
export default {
  components: { MessageUser, MessageAssistant },
  setup () {
    const store = useStore()
    const chooseTab = ref(0)
    const topics = computed(() => store.getters['StoreData/getTopics'])
    store.commit('StatusData/initData', store.getters['StoreData/getTopicsBaseStatus'])
    const messages = computed(() => (store.getters['StoreData/getMessagesByPath'](store.getters['StatusData/getPath'], chooseTab.value)))
    const status = computed(() => store.getters['StatusData/getCurrentSatus'])

    // 移除一个话题
    const tabRemove = (TabPaneName) => {
      if (TabPaneName === chooseTab.value) {
        chooseTab.value = 0
      }
      store.commit('StatusData/removeStatus', TabPaneName)
      store.commit('StoreData/removeTopic', TabPaneName)
    }
    // 新增一个话题
    const tabAdd = () => {
      store.commit('StoreData/addTopic')
      store.commit('StatusData/addStatus', { path: [], length: [] })
    }
    // 切换话题
    const tabChange = (TabPaneName) => {
      store.commit('StatusData/changCurrentTopic', TabPaneName)
    }

    // 重新回答
    const reAnswerEvent = async (index) => {
      const currentStatus = store.getters['StatusData/getCurrentSatus']
      console.log(currentStatus.isAnswering)
      if (currentStatus.isAnswering) {
        return
      }
      currentStatus.path.splice(index)
      currentStatus.length.splice(index)
      const currentTopic = store.getters['StatusData/getCurrentTopic']
      const responseMsg = new AssistantMessage()
      try {
        currentStatus.isAnswering = true
        const res = await store.dispatch('sentMessage', { message: responseMsg.message, currentTopic, path: currentStatus.path })
        await store.dispatch('readData', { reader: res.body.getReader(), responseMsg, decoder: new TextDecoder(), status: currentStatus })
      } catch (e) {
        if (currentStatus.isAnswering) { ElMessage.error('网络错误') }
      } finally {
        currentStatus.isAnswering = false
      }
    }
    // 获取页面长宽，用于调整布局
    const PageState = reactive({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight
    })

    return { chooseTab, topics, messages, PageState, status, tabRemove, tabAdd, tabChange, reAnswerEvent }
  }
}
</script>

<style scoped lang="less">
.message_container{
  margin: auto ;
  width: 50%;
  height: 100%;
}
.host{
  display: flex;
  padding-bottom: 20%;
  flex-direction: column;
  gap: 24px;
}

</style>
