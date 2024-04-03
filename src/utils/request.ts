import axios from 'axios'
import { showToast } from 'vant'
let baseURL = '/api'

const request = axios.create({
  baseURL: baseURL,
  timeout: 10000
})

//发起请求前的拦截器
request.interceptors.request.use(
  config => {
    const token = window.localStorage.getItem('token')
    if (token) {
      config.params = { 
        'token' : token
      }
    }
    return config
  },
  error => Promise.reject(error)
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    const res = response.data
    if (response.status !== 200) {
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      if (res.code === 200) {
        return res.result || res.data
      } else {
        showToast(res.success)
      }
    }
  },
  error => {
    return Promise.reject(error)
  }
)
export default request