import api from '@/api'

const state = {

}

export function loadToken() {
  const token = localStorage.getItem('token')
  if (token) {
    api.auth.setAuthorizationHeader(token)
  }
}

const mutations = {
  auth_success: (state, {token, username}) => {
    console.log(token, username)
  },
  
  auth_error: (state, {err}) => {
    console.log(err)
  },
}

const actions = {
  // eslint-disable-next-line no-unused-vars
  login: ({commit}, {email, password}) => {
    return new Promise((resolve, reject) => {
      // commit('auth_request')
      api.auth.login(email, password)
        .then(resp => {
          const token = resp.token
          // const username = resp.username
          localStorage.setItem('token', token)
          api.auth.setAuthorizationHeader(token)
          // commit('auth_success', {token, username})
          resolve(resp)
        })
        .catch(err => {
          // commit('auth_error', {err})
          localStorage.removeItem('token')
          if (!err.message) {
            console.log(err)
            reject({message: 'Unknown Errors'})
          }
          reject(err)
        })
    })
  },
  
  signup: ({commit}, {email, username, password}) => {
    return new Promise((resolve, reject) => {
      api.auth.signup(email, username, password)
        .then(resp => {
          const token = resp.token
          const username = resp.username
          localStorage.setItem('token', token)
          api.auth.setAuthorizationHeader(token)
          commit('auth_success', token, username)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', {err})
          localStorage.removeItem('token')
          reject(err)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}