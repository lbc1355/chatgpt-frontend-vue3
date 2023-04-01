<template>
  <el-menu mode="horizontal" @select="handleSelect" :ellipsis="false">
  <el-menu-item index="0">ChatGPT-Test</el-menu-item>
  <div class="flex-grow" />
  <div class="exit-div">
      <el-button type="info" @click="userExit" class="exitbtn" >退出</el-button>
  </div>
</el-menu>
</template>
<script>
export default {
  setup () {
    const handleSelect = (key, keyPath) => {
      console.log(key)
    }
    const userExit = () => {
      console.log('exit')
    }
    return { handleSelect, userExit }
  }
}
</script>
<style scoped lang="less">
.flex-grow {
flex-grow: 1;
}
.exit-div{
  margin-right: 20px;
}
.exitbtn{
  margin-top: 10px;
}
</style>
