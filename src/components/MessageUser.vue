<template>
      <div class="user_message_container">
        <div class="user_message">
          <el-card :body-style="{ padding: '0px 10px' }">
            <v-md-preview v-if="!isEdit" :text="message.content"></v-md-preview>
            <div v-else>
              <el-input type="textarea"  v-model="content"  />
              <el-button size="small" @click="updateContent">确定</el-button>
              <el-button size="small" @click="isEdit = false">取消</el-button>
            </div>
            <messageStatus :message="message" />
          </el-card>
        </div>
      </div>
</template>
<script>
import messageStatus from '@/components/MessageStatus.vue'
import { ref } from 'vue'
export default {
  name: 'MessageUser',
  components: { messageStatus },
  props: {
    message: {
      type: Object,
      default: () => { return { role: 'user', content: '' } }
    }
  },
  setup (props) {
    const isEdit = ref(false)
    const content = ref(props.message.content)
    // 下一个
    const nextClick = (page) => {
      console.log('nextClick' + page)
    }
    // 上一个
    const previousClick = (page) => {
      console.log('previousClick' + page)
    }

    // 确定修改
    const updateContent = () => {
      console.log('updateContent')
    }

    return { isEdit, content, nextClick, previousClick, updateContent }
  }
}
</script>
<style  scoped lang="less">
.user_message_container{
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  .user_message{
  max-width: 90%;
  }

  p {
    padding: 0px 0px 10px 16px;
  }
}
</style>
