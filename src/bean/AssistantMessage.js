import { currentDate } from '@/utils/utils.js'
import { reactive } from 'vue'
// eslint-disable-next-line no-unused-vars
export class AssistantMessage {
  constructor () {
    this.message = reactive({
      role: 'assistant',
      content: '',
      time: currentDate(),
      success: false,
      response: false,
      finish: false,
      next: null
    })
  }

  success () {
    this.message.success = true
  }

  response () {
    this.message.response = true
  }

  finish () {
    this.message.finish = true
  }

  setContent (content) {
    this.message.content = content
  }
}
