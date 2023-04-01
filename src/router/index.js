import { createRouter, createWebHashHistory } from 'vue-router'
import chatgpt from '../views/ChatGPT.vue'
import Login from '../views/Login.vue'
import store from '@/store'

const login = require('../../config').Enable_Login
let routes
if (login) {
  routes = [
    {
      path: '/',
      name: 'chat',
      component: chatgpt
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
} else {
  routes = [
    {
      path: '/',
      name: 'chat',
      component: chatgpt
    }
  ]
}

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

if (login) {
// 前置导航守卫
  router.beforeEach((to, from, next) => {
    const { profile } = store.state.User
    if (!profile.token && !to.path.startsWith('/login')) {
      return next('/login?redirectUrl=' + encodeURIComponent(to.fullPath))
    }
    next()
  })
}

export default router
