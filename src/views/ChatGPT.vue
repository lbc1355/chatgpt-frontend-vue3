<template>
   <el-scrollbar ref="bar" @scroll="scroll">
    <div class="common-layout">
            <div class="header">
                <el-affix>
                    <Header />
                </el-affix>
            </div>
        <div class="main">
                <MessageView />
        </div>
        <div class="footer">
                <MessageSend />
        </div>
    </div>
  </el-scrollbar>
  </template>
<script>
import Header from '@/views/Header.vue'
import MessageView from '@/views/MessageView.vue'
import MessageSend from '@/views/MessageSend.vue'
import { provide } from 'vue'
import { Scrollerbar } from '@/bean/Scrollerbar.js'
export default {
  components: { Header, MessageView, MessageSend },
  setup () {
    const scrollerbarRef = new Scrollerbar()
    provide('scrollerbar', scrollerbarRef)
    const scroll = (location) => {
      scrollerbarRef.iswipeUp(location)
    }
    return { bar: scrollerbarRef.bar, scroll }
  }
}
</script>
<style scoped lang="less">
.common-layout{
    width: 100%;
    height: 100%;
}

.header{
    width: 100%;
    height: 10%;
}
.main{
    width: 100%;
    height: 85%;
}
.footer{
    width: 100%;
    height: 15%;
    max-height: 50%;
    position: fixed;
    bottom: 0;
    z-index: 9999;
}
</style>
