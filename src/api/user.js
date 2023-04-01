import { request } from '@/utils/request-fetch'

export const apiLogin = (user) => {
  return request('/user/login', 'post', user)
}
