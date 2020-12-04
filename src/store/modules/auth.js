import api from '@/api'

const TOKEN_KEY = 'token'

const state = {

}

export function loadToken() {
  const token = localStorage.getItem('token')
  if (token) {
    api.auth.setAuthorizationHeader(token)
  }
}

const mutations = {
}

const actions = {
  // eslint-disable-next-line no-unused-vars
  login: ({commit}, {email, password}) => {
    return new Promise((resolve, reject) => {
      api.auth.login(email, password)
        .then(resp => {
          const token = resp.token
          localStorage.setItem(TOKEN_KEY, token)
          api.auth.setAuthorizationHeader(token)
          resolve(resp)
        })
        .catch(err => {
          localStorage.removeItem(TOKEN_KEY)
          reject(err)
        })
    })
  },
  
  // eslint-disable-next-line no-unused-vars
  signup: ({commit}, {email, username, password}) => {
    return new Promise((resolve, reject) => {
      api.auth.signup(email, username, password)
        .then(resp => {
          const token = resp.token
          localStorage.setItem(TOKEN_KEY, token)
          api.auth.setAuthorizationHeader(token)
          resolve(resp)
        })
        .catch(err => {
          localStorage.removeItem(TOKEN_KEY)
          reject(err)
        })
    })
  },
  
  // eslint-disable-next-line no-unused-vars
  logout: ({commit}) => {
    localStorage.removeItem(TOKEN_KEY)
    api.auth.removeAuthorizationHeader()
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}