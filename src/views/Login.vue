<template>
    <div class="login-container">
      <el-form label-width="80px" class="login-form">
        <h3 class="login-title">用户登录</h3>
        <el-form-item label="用户名" >
          <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" >
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>
<script>
import { reactive } from 'vue'
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from 'element-plus'
import { apiLogin } from '@/api/user.js'
import store from '@/store'
import { useRoute, useRouter } from 'vue-router'
export default {
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElButton
  },
  setup () {
    const loginForm = reactive({
      username: '',
      password: ''
    })
    const router = useRouter()
    const route = useRoute()
    const handleSubmit = async () => {
      // 处理登录逻辑
      try {
        const data = await apiLogin(loginForm)
        // 登陆成功
        if (data.status === 405) {
          store.commit('User/setUser', { token: data.data })
          ElMessage.success(data.message)
          router.push(route.query.redirectUrl || '/')
        } else {
          ElMessage.warning(data.message)
        }
      } catch (e) {
        ElMessage.error('网络错误')
      }
    }
    return {
      loginForm,
      handleSubmit
    }
  }
}
</script>
<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
.login-form {
    width: 360px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 20px;
  }
.login-title {
    text-align: center;
    margin-bottom: 20px;
    font-size: 18px;
  }
  </style>
