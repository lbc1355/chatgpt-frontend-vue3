import { requestStream, requestStreamToOpenAI } from '@/utils/request-fetch'
import { openAIParam } from '@/bean/OpenAIParam.js'

const key = require('../../config').Open_AI_Key
export const SendMessageToServe = (messages) => {
  if (key === '') {
    return requestStream('/chat/stream', 'post', messages)
  } else {
    return requestStreamToOpenAI('/chat/stream', 'post', openAIParam(messages))
  }
}
