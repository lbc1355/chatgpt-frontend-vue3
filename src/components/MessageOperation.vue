<template>
    <div class ="operation_container">
        <div style="display: flex;" v-if="message.role === 'user'">
            <img src="../assets/edit.png" alt="" @click="clickEvent">
        </div>
        <div style="display: flex;" v-else>
            <img src="../assets/rerequest.png" @click="clickEvent" alt="">
        </div>
        <div style="display: flex;">
            <img src="../assets/previous.png" @click="previousClickEvent"  alt="">
            <p>{{  currentPage  }}</p>
            <img src="../assets/next.png" @click="nextClickEvent" alt="">
        </div>

    </div>
</template>
<script>
import { ref } from 'vue'

export default {
  props: {
    message: {
      type: Object
    },
    length: {
      type: Number,
      default: 5
    }
  },
  setup (props, { emit }) {
    const currentPage = ref(1)
    // 上一个
    const nextClickEvent = () => {
      if (currentPage.value === props.length) {
        return
      }
      currentPage.value++
      emit('next-click-event', currentPage.value)
    }
    // 下一个
    const previousClickEvent = () => {
      if (currentPage.value === 1) {
        return
      }
      currentPage.value--
      emit('previous-click-event', currentPage.value)
    }

    const clickEvent = () => {
      emit('click-event', currentPage.value)
    }
    return { currentPage, nextClickEvent, previousClickEvent, clickEvent }
  }
}
</script>
<style scoped lang="less">
.operation_container{
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
    height: 10px;
}
img {
//   height: 15px;
//   width: 15px;
  cursor: pointer;
}
p{
    padding: 0;
    margin: 0;
    margin-left: 10px;
    margin-right: 10px;
    font-size: 10px;
    color: gray;
}
</style>
