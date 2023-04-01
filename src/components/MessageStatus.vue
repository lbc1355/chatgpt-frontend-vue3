<template>
        <div class="message-tip">
            <p>{{ message.time }} / tokens:{{ countTokens(message.content) }}</p>
            <img src="../assets/rerequest.png" alt="" v-show="message.role === 'assistant'" @click="reAnswerEvent">
        </div>
</template>
<script>
import { countChars } from '@/utils/utils'
export default {
  name: 'messageStatus',
  props: {
    message: {
      type: Object
    }
  },
  setup (props, { emit }) {
    const countTokens = (content) => {
      const data = countChars(content)
      return ((data.chineseChars * 2) + (data.chineseWords * 3)) + data.englishChars + data.englishWords
    }

    const reAnswerEvent = () => {
      emit('re-answer')
    }
    return { countTokens, reAnswerEvent }
  }
}

</script>
<style  lang="less">
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
