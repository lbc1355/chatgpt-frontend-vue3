import store from '@/store'
import router from '@/router'
import { ElMessage } from 'element-plus'

export const baseURL = require('../../config').API_BASE_URL
const OpenAI = 'https://api.openai.com/v1/chat/completions'
const key = require('../../config').Open_AI_Key

const login = require('../../config').Enable_Login
const RequestBuild = (url, method, submitData) => {
  const options = {
    method,
    headers: {}
  }
  const { profile } = store.state.User
  if (profile.token) {
    options.headers.Authorization = `Bearer ${profile.token}`
  }
  if (submitData) {
    if (method.toLowerCase() === 'get') {
      url += '?' + new URLSearchParams(submitData).toString()
    } else {
      options.body = JSON.stringify(submitData)
      options.headers['Content-Type'] = 'application/json'
    }
  }
  return { url, options }
}

const OpenAIRequestBuild = (url, method, submitData) => {
  const options = {
    method,
    headers: {}
  }
  options.headers.Authorization = 'Bearer ' + key
  options.body = JSON.stringify(submitData)
  options.headers['Content-Type'] = 'application/json'
  return { url, options }
}

const checkResponse = (res) => {
  if (login && res.status === 401) {
    store.commit('User/setUser', {})
    const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
    router.push('/login?redirectUrl=' + fullPath)
    throw new Error('Token expired')
  } else if (res.status === 200) {
    return res
  }
}

const checkOpenAIRes = (res) => {
  if (res.status === 200) {
    return res
  }
  try {
    const decoder = new TextDecoder()
    res.body.getReader().read().then(({ done, value }) => {
      const text = decoder.decode(value, { stream: true })
      const data = JSON.parse(text)
      ElMessage.error(data.error.code)
    })
  } catch (e) {
    console.log(e)
  }
}
// 普通请求
export const request = (url, method, submitData) => {
  const header = RequestBuild(url, method, submitData)
  return fetch(baseURL + header.url, header.options).then(res => checkResponse(res).json())
}
// 流请求
export const requestStream = (url, method, submitData) => {
  const header = RequestBuild(url, method, submitData)
  return fetch(baseURL + header.url, header.options).then(res => checkResponse(res))
}
// openai请求
export const requestStreamToOpenAI = (url, method, submitData) => {
  const header = OpenAIRequestBuild(url, method, submitData)
  return fetch(OpenAI, header.options).then(res => checkOpenAIRes(res))
}
