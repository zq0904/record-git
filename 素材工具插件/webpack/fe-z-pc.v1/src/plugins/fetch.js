// import React from 'react' // 原型注入 不可用
import axios from 'axios'
import Qs from 'qs'

const $fetch = axios.create({
  withCredentials: true, // 跨域携带cookie
  timeout: 7000,
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded',
    'X-Requested-With': 'XMLHttpRequest',
  },
  transformRequest(data, headers) {
    if (!(data instanceof FormData)) return Qs.stringify(data)
    return data
  }
})

$fetch.interceptors.response.use(res => {
  // if (res.falg !== 1) return Promise.reject(res) // 自定义
  return Promise.resolve(res)
}, err => {
  return Promise.reject(err)
})

export default $fetch
