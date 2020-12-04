import axios from 'axios'
import {APIResponseError, APIResponseNotAsExpected} from "@/api";

const LOGIN_URL = 'users/login/'
const SIGNUP_URL = 'users/'

export default {
  // 发送登录请求
  login(email, password) {
    const data = {
      user: {
        email: email,
        password: password,
      }
    }
    return axios.post(LOGIN_URL, data)
      .then(resp => {
        const token = resp.data.user.token
        const username = resp.data.user.username
        const email = resp.data.user.email
        if (token && username && email) {
          return Promise.resolve({
            token,
            username,
            email,
          })
        } else {
          return APIResponseNotAsExpected(LOGIN_URL)
        }
      })
      .catch(err => {
        if (err.response) {
          const data = err.response.data
          if (data.errors) {
            return APIResponseError(data.errors.error)
          }
        }
        return Promise.reject(err)
      })
  },
  
  // 发送注册请求
  signup(email, username, password) {
    const data = {
      user: {
        email: email,
        username: username,
        password: password,
      }
    }
    return axios.post(SIGNUP_URL, data)
      .then(resp => {
        const token = resp.data.user.token
        const username = resp.data.user.username
        const email = resp.data.user.email
        if (token && username && email) {
          return Promise.resolve({
            token,
            username,
            email,
          })
        } else {
          return APIResponseNotAsExpected(SIGNUP_URL)
        }
      })
      .catch(err => {
        if (err.response) {
          const data = err.response.data
          if (data.errors) {
            if (data.errors.error) {
              return APIResponseError(data.errors.error)
            }
            const email = data.errors.email
            const username = data.errors.username
            const password = data.errors.password
            return Promise.reject({
              email,
              username,
              password,
            })
          }
        }
        return Promise.reject(err)
      })
  },
  
  // 设置 axios 默认请求头的认证信息
  setAuthorizationHeader(token) {
    axios.defaults.headers.common['Authorization'] = token
  },
  
  removeAuthorizationHeader() {
    delete axios.defaults.headers.common['Authorization']
  }
}