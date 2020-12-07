import api from '@/api';

const TOKEN_KEY = 'token';

const state = {
  loggedIn: false
};

const mutations = {
  authSuccess: (state) => {
    state.loggedIn = true;
  },
  authFailed: (state) => {
    state.loggedIn = false;
  }
};

const actions = {
  login: ({ commit }, { email, password }) => {
    return new Promise((resolve, reject) => {
      api.auth
        .login(email, password)
        .then((resp) => {
          commit('authSuccess');
          const token = resp.token;
          localStorage.setItem(TOKEN_KEY, token);
          api.auth.setAuthorizationHeader(token);
          resolve(resp);
        })
        .catch((err) => {
          commit('authFailed');
          localStorage.removeItem(TOKEN_KEY);
          reject(err);
        });
    });
  },
  
  signup: ({ commit }, { email, username, password }) => {
    return new Promise((resolve, reject) => {
      api.auth
        .signup(email, username, password)
        .then((resp) => {
          commit('authSuccess');
          const token = resp.token;
          localStorage.setItem(TOKEN_KEY, token);
          api.auth.setAuthorizationHeader(token);
          resolve(resp);
        })
        .catch((err) => {
          commit('authFailed');
          localStorage.removeItem(TOKEN_KEY);
          reject(err);
        });
    });
  },
  
  logout: ({ commit }) => {
    commit('authFailed');
    localStorage.removeItem(TOKEN_KEY);
    api.auth.removeAuthorizationHeader();
  },
  
  loadToken: ({ commit }) => {
    const token = localStorage.getItem('token');
    if (token) {
      commit('authSuccess');
      api.auth.setAuthorizationHeader(token);
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
